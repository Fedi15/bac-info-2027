import { registerLead } from "../api/register.js";
import { listLeads } from "../api/leads.js";
import { sendBroadcast } from "../api/broadcast.js";
import { getStats } from "../api/stats.js";

const VISITOR_COOKIE = "site_visitor_id";

async function trackVisitor(request, env) {
  const cookieHeader = request.headers.get("Cookie") || "";

  const match = cookieHeader.match(
    /(?:^|;\s*)site_visitor_id=([^;]+)/
  );

  // Already counted in this browser
  if (match?.[1]) {
    return null;
  }

  const visitorId = crypto.randomUUID();

  await env.DB.prepare(`
    INSERT OR IGNORE INTO site_visitors (visitor_id)
    VALUES (?)
  `)
    .bind(visitorId)
    .run();

  return visitorId;
}

function withVisitorCookie(response, visitorId) {
  if (!visitorId) {
    return response;
  }

  const headers = new Headers(response.headers);

  headers.append(
    "Set-Cookie",
    `${VISITOR_COOKIE}=${visitorId}; Path=/; Max-Age=31536000; HttpOnly; Secure; SameSite=Lax`
  );

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

/*
 * Public statistics
 *
 * Only returns numbers.
 * It does NOT expose student names, emails,
 * phone numbers, or other lead information.
 */
async function getPublicStats(env) {
  const result = await env.DB.prepare(`
    SELECT
      (SELECT COUNT(*) FROM site_visitors) AS unique_visitors,

      (
        SELECT COUNT(*)
        FROM site_visitors
        WHERE date(first_seen_at, 'localtime')
              = date('now', 'localtime')
      ) AS today_visitors,

      (SELECT COUNT(*) FROM student_leads) AS student_requests
  `).first();

  return Response.json({
    ok: true,
    unique_visitors: Number(result?.unique_visitors || 0),
    today_visitors: Number(result?.today_visitors || 0),
    student_requests: Number(result?.student_requests || 0)
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    try {

      /*
       * =========================
       * API ROUTES
       * =========================
       */

      // Student registration
      if (url.pathname === "/api/register") {
        return await registerLead(request, env);
      }

      // Admin: student requests
      if (url.pathname === "/api/leads") {
        return await listLeads(request, env);
      }

      // Admin: email all registered students (individual messages)
      if (url.pathname === "/api/broadcast") {
        return await sendBroadcast(request, env);
      }

      // Admin: protected statistics
      if (url.pathname === "/api/stats") {
        return await getStats(request, env);
      }

      // Public homepage statistics
      if (url.pathname === "/api/public-stats") {
        if (request.method !== "GET") {
          return Response.json(
            {
              ok: false,
              error: "Method not allowed"
            },
            {
              status: 405
            }
          );
        }

        return await getPublicStats(env);
      }

      /*
       * =========================
       * VISITOR TRACKING
       * =========================
       *
       * Only count normal HTML page requests.
       *
       * Do NOT count:
       * - API requests
       * - admin pages
       * - CSS
       * - JS
       * - images
       * - fonts
       * - other assets
       */

      const isVisitorRequest =
        request.method === "GET" &&
        (
          url.pathname === "/" ||
          url.pathname === "/index.html"
        );

      let visitorId = null;

      if (isVisitorRequest) {
        visitorId = await trackVisitor(request, env);
      }

      /*
       * =========================
       * WEBSITE ASSETS
       * =========================
       */

      const response = await env.ASSETS.fetch(request);

      return withVisitorCookie(response, visitorId);

    } catch (error) {
      console.error("Worker error:", error);

      return Response.json(
        {
          ok: false,
          error: "Server error"
        },
        {
          status: 500
        }
      );
    }
  }
};