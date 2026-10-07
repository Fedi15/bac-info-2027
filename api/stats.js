function json(data, status = 200) {
  return Response.json(data, { status });
}

function requireAdmin(request, env) {
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

export async function getStats(request, env) {
  if (request.method !== "GET") {
    return json({ ok: false, error: "Method not allowed" }, 405);
  }

  const auth = requireAdmin(request, env);
  if (!auth.ok) return auth.response;

  const result = await env.DB.prepare(`
    SELECT
      (SELECT COUNT(*) FROM site_visitors) AS unique_visitors,
      (
        SELECT COUNT(*)
        FROM site_visitors
        WHERE date(first_seen_at, 'localtime') = date('now', 'localtime')
      ) AS today_visitors
  `).first();

  return json({
    ok: true,
    unique_visitors: Number(result?.unique_visitors || 0),
    today_visitors: Number(result?.today_visitors || 0)
  });
}
