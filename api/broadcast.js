function json(data, status = 200) {
  return Response.json(data, { status });
}

function authorize(request, env) {
  const expected = env.ADMIN_TOKEN;
  const header = request.headers.get("Authorization") || "";
  const supplied = header.startsWith("Bearer ") ? header.slice(7) : "";
  return Boolean(expected && supplied && supplied === expected);
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, ch => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[ch]);
}

export async function sendBroadcast(request, env) {
  if (request.method !== "POST") return json({ ok: false, error: "Method not allowed" }, 405);
  if (!authorize(request, env)) return json({ ok: false, error: "Unauthorized" }, 401);
  if (!env.RESEND_API_KEY || !env.MAIL_FROM) {
    return json({ ok: false, error: "Email is not configured. Set RESEND_API_KEY and MAIL_FROM in Cloudflare." }, 503);
  }

  let body;
  try { body = await request.json(); } catch { return json({ ok: false, error: "Invalid JSON" }, 400); }
  const subject = String(body.subject || "").trim();
  const message = String(body.message || "").trim();
  if (subject.length < 2 || subject.length > 180) return json({ ok: false, error: "Subject must be 2–180 characters." }, 400);
  if (message.length < 2 || message.length > 8000) return json({ ok: false, error: "Message must be 2–8000 characters." }, 400);

  const result = await env.DB.prepare(`
    SELECT id, full_name, email FROM student_leads
    WHERE email IS NOT NULL AND trim(email) <> ''
    ORDER BY created_at DESC, id DESC
  `).all();
  const leads = result.results || [];
  if (!leads.length) return json({ ok: false, error: "No student email addresses were found." }, 400);
  if (leads.length > 500) return json({ ok: false, error: "There are more than 500 recipients. Send a smaller batch to avoid provider limits." }, 413);

  const escapedSubject = escapeHtml(subject);
  const messageHtml = escapeHtml(message).replace(/\r?\n/g, "<br>");
  let sent = 0;
  const failed = [];
  const messages = leads.map(lead => {
    const html = `<!doctype html><html><body style="margin:0;padding:0;background:#0b0b0c;font-family:Arial,Helvetica,sans-serif;color:#eee"><div style="display:none;max-height:0;overflow:hidden;opacity:0">${escapedSubject}</div><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#0b0b0c;padding:32px 12px"><tr><td align="center"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#111214;border:1px solid #39332a"><tr><td style="padding:26px 28px;border-bottom:1px solid #3a3327"><div style="font-size:12px;letter-spacing:3px;color:#c7a66a;font-weight:bold">FEDI GHANMI <span style="color:#eee">(TORBAGA)</span></div><div style="font-size:10px;letter-spacing:2px;color:#8e8a81;margin-top:8px">COURS PARTICULIERS · INFORMATIQUE</div></td></tr><tr><td style="padding:34px 28px"><div style="font-size:10px;letter-spacing:2px;color:#c7a66a;font-weight:bold;margin-bottom:14px">MESSAGE AUX ÉLÈVES</div><h1 style="font-size:27px;line-height:1.25;font-weight:500;color:#f4ead6;margin:0 0 22px">${escapedSubject}</h1><p style="font-size:15px;line-height:1.9;color:#d7d2c8;margin:0 0 18px">Bonjour ${escapeHtml(lead.full_name || "")},</p><div style="font-size:15px;line-height:1.9;color:#d7d2c8;overflow-wrap:anywhere">${messageHtml}</div><div style="height:1px;background:#3a3327;margin:28px 0 20px"></div><p style="font-size:12px;line-height:1.8;color:#9d978b;margin:0">Cours particuliers d'informatique à Sfax<br>Chez moi ou chez toi · Sur rendez-vous</p></td></tr><tr><td style="padding:18px 28px;background:#0d0d0e;border-top:1px solid #292621;font-size:10px;letter-spacing:1px;color:#8e887d">FEDI GHANMI (TORBAGA) · SFAX, TUNISIE</td></tr></table></td></tr></table></body></html>`;
    return { from: env.MAIL_FROM, to: [lead.email], subject, html };
  });

  // Resend's batch endpoint lets us deliver individually without exceeding Worker subrequest limits.
  for (let offset = 0; offset < messages.length; offset += 100) {
    const batch = messages.slice(offset, offset + 100);
    try {
      const response = await fetch("https://api.resend.com/emails/batch", {
        method: "POST",
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify(batch)
      });
      if (!response.ok) {
        const detail = await response.text().catch(() => "");
        for (const lead of leads.slice(offset, offset + batch.length)) {
          failed.push({ email: lead.email, error: `Provider returned ${response.status}${detail ? `: ${detail.slice(0, 160)}` : ""}` });
        }
      } else {
        sent += batch.length;
      }
    } catch (error) {
      for (const lead of leads.slice(offset, offset + batch.length)) {
        failed.push({ email: lead.email, error: String(error?.message || "Network error") });
      }
    }
  }

  return json({ ok: failed.length === 0, sent, failed: failed.length, failures: failed.slice(0, 20), total: leads.length });
}
