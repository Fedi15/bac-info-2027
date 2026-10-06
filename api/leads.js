function json(data, status = 200) {
  return Response.json(data, { status });
}

export async function listLeads(request, env) {
  if (request.method !== "GET") {
    return json({ ok: false, error: "Method not allowed" }, 405);
  }

  const configuredToken = env.ADMIN_TOKEN;
  if (!configuredToken) {
    return json({ ok: false, error: "Admin access is not configured" }, 503);
  }

  const authorization = request.headers.get("Authorization") || "";
  const token = authorization.startsWith("Bearer ") ? authorization.slice(7) : "";
  if (!token || token !== configuredToken) {
    return json({ ok: false, error: "Unauthorized" }, 401);
  }

  const result = await env.DB.prepare(`
    SELECT
      id,
      full_name,
      phone,
      email,
      level,
      school,
      city,
      lesson_location,
      availability,
      source,
      created_at
    FROM student_leads
    ORDER BY created_at DESC, id DESC
  `).all();

  return json({ ok: true, leads: result.results });
}
