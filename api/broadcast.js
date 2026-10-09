function json(data, status = 200) {
  return Response.json(data, { status });
}

function authorize(request, env) {
  const expected = env.ADMIN_TOKEN;
  const header = request.headers.get("Authorization") || "";
  const supplied = header.startsWith("Bearer ") ? header.slice(7) : "";
  return Boolean(expected && supplied && supplied === expected);
}


export async function sendBroadcast(request, env) {
  if (request.method !== "POST") return json({ ok: false, error: "Method not allowed" }, 405);
  if (!authorize(request, env)) return json({ ok: false, error: "Unauthorized" }, 401);
  if (!env.GMAIL_SCRIPT_URL || !env.GMAIL_BROADCAST_SECRET) {
    return json({ ok: false, error: "Gmail is not configured. Set GMAIL_SCRIPT_URL and GMAIL_BROADCAST_SECRET in Cloudflare." }, 503);
  }

  let body;
  try { body = await request.json(); } catch { return json({ ok: false, error: "Invalid JSON" }, 400); }
  // Live Gmail quota lookup for the authenticated admin panel.
  if (body.action === "quota") {
    try {
      const response = await fetch(env.GMAIL_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: env.GMAIL_BROADCAST_SECRET, action: "quota" })
      });
      const raw = await response.text();
      let result;
      try { result = JSON.parse(raw); } catch { result = null; }
      if (!response.ok || !result || result.ok !== true || !Number.isFinite(Number(result.remainingQuota))) {
        return json({ ok: false, error: result?.error || "Could not read Gmail's remaining quota. Check the Apps Script deployment." }, 502);
      }
      return json({ ok: true, remainingQuota: Number(result.remainingQuota) });
    } catch (error) {
      return json({ ok: false, error: `Could not contact Google Apps Script: ${String(error?.message || "network error")}` }, 502);
    }
  }

  const subject = String(body.subject || "").trim();
  const message = String(body.message || "").trim();
  if (subject.length < 2 || subject.length > 180) return json({ ok: false, error: "Subject must be 2–180 characters." }, 400);
  if (message.length < 2 || message.length > 8000) return json({ ok: false, error: "Message must be 2–8000 characters." }, 400);

  let recipients;
  if (body.testOnly === true) {
    const testEmail = String(body.testEmail || "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(testEmail)) {
      return json({ ok: false, error: "Enter a valid email address for the test." }, 400);
    }
    recipients = [{ name: "Test message", email: testEmail }];
  } else {
    const result = await env.DB.prepare(`
      SELECT id, full_name, email FROM student_leads
      WHERE email IS NOT NULL AND trim(email) <> ''
      ORDER BY created_at DESC, id DESC
    `).all();
    const leads = result.results || [];
    if (!leads.length) return json({ ok: false, error: "No student email addresses were found." }, 400);
    if (leads.length > 500) return json({ ok: false, error: "There are more than 500 recipients. Send a smaller batch to avoid provider limits." }, 413);

    recipients = leads
      .filter(lead => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(lead.email || "").trim()))
      .map(lead => ({ name: String(lead.full_name || "").slice(0, 160), email: String(lead.email).trim() }));
    if (!recipients.length) return json({ ok: false, error: "No valid student email addresses were found." }, 400);
    if (recipients.length > 500) return json({ ok: false, error: "There are more than 500 recipients. Remove invalid/old requests or send a smaller batch." }, 413);
  }

  try {
    const response = await fetch(env.GMAIL_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: env.GMAIL_BROADCAST_SECRET,
        subject,
        message,
        recipients,
        testOnly: body.testOnly === true
      })
    });
    const raw = await response.text();
    let result;
    try { result = JSON.parse(raw); } catch { result = null; }
    if (!response.ok || !result) {
      return json({ ok: false, error: `Google Apps Script returned an unexpected response (${response.status}). Check the script deployment and logs.` }, 502);
    }
    if (!result.ok && !Number.isFinite(Number(result.sent))) {
      return json({ ok: false, error: result.error || "Gmail sending failed." }, 502);
    }
    return json({
      ok: Boolean(result.ok),
      sent: Number(result.sent || 0),
      failed: Number(result.failed || 0),
      failures: Array.isArray(result.failures) ? result.failures.slice(0, 20) : [],
      total: recipients.length,
      remaining: Number(result.remaining || 0),
      note: String(result.note || "")
    }, 200);
  } catch (error) {
    return json({ ok: false, error: `Could not contact Google Apps Script: ${String(error?.message || "network error")}` }, 502);
  }
}
