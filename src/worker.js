import { registerLead } from "../api/register.js";
import { listLeads } from "../api/leads.js";
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
    `site_visitor_id=${visitorId}; Path=/; Max-Age=31536000; HttpOnly; Secure; SameSite=Lax`
  );

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    try {
      // API routes
      if (url.pathname === "/api/register") {
        return await registerLead(request, env);
      }

      if (url.pathname === "/api/leads") {
        return await listLeads(request, env);
      }

      if (url.pathname === "/api/stats") {
        return await getStats(request, env);
      }

      /*
       * Count normal website visits.
       *
       * Don't count admin pages, API calls, files/assets,
       * images, CSS, JS, etc.
       */
      const isVisitorRequest =
  request.method === "GET" &&
  !url.pathname.startsWith("/api/") &&
  !url.pathname.startsWith("/admin");
      let visitorId = null;

if (isVisitorRequest) {
  visitorId = await trackVisitor(request, env);
}

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