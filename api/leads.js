function json(data, status = 200) {
  return Response.json(data, { status });
}

function isAuthorized(request, env) {
  const configuredToken = env.ADMIN_TOKEN;
  if (!configuredToken) {
    return { ok: false, response: json({ ok: false, error: "Admin access is not configured" }, 503) };
  }
  const authorization = request.headers.get("Authorization") || "";
  const token = authorization.startsWith("Bearer ") ? authorization.slice(7) : "";
  if (!token || token !== configuredToken) {
    return { ok: false, response: json({ ok: false, error: "Unauthorized" }, 401) };
  }
  return { ok: true };
}

export async function listLeads(request, env) {
  if (request.method !== "GET" && request.method !== "DELETE") {
    return json({ ok: false, error: "Method not allowed" }, 405);
  }

  const auth = isAuthorized(request, env);
  if (!auth.ok) return auth.response;

  if (request.method === "DELETE") {
    const url = new URL(request.url);
    const rawId = url.searchParams.get("id");
    if (!rawId || !/^\d+$/.test(rawId) || Number(rawId) < 1) {
      return json({ ok: false, error: "A valid student ID is required" }, 400);
    }
    const result = await env.DB.prepare("DELETE FROM student_leads WHERE id = ?")
      .bind(Number(rawId))
      .run();
    if (!result.meta?.changes) {
      return json({ ok: false, error: "Student request not found" }, 404);
    }
    return json({ ok: true, deleted_id: Number(rawId) });
  }

  const result = await env.DB.prepare(`
    SELECT id, full_name, phone, email, level, school, city,
           lesson_location, source, created_at
    FROM student_leads
    ORDER BY created_at DESC, id DESC
  `).all();

  return json({ ok: true, leads: result.results });
}
