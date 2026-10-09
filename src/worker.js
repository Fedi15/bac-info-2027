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


// Public lycée catalogue proxy. Cache successful Overpass results to avoid
// asking the public map service on every student's click.
async function getSfaxLycees(request, env) {
  if (request.method !== "GET") {
    return Response.json({ ok: false, error: "Method not allowed" }, { status: 405 });
  }

  const cache = caches.default;
  const cacheKey = new Request(new URL("/api/sfax-lycees", request.url).toString(), { method: "GET" });
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  // First query Overpass area objects directly. The previous relation->area
  // expression can produce an empty set on some Overpass instances, even when
  // Sfax schools exist. Query named administrative areas and collect school
  // features from those areas.
  const queries = [
    `[out:json][timeout:60];area["name"~"Sfax|صفاقس",i]["boundary"="administrative"]["admin_level"~"4|6|7|8"]->.sfaxArea;(nwr(area.sfaxArea)["amenity"="school"];nwr(area.sfaxArea)["building"="school"];nwr(area.sfaxArea)["school:level"];nwr(area.sfaxArea)["isced:level"];nwr(area.sfaxArea)["name"~"lycée|lycee|ثانوية|معهد|المعهد|high school|secondary school",i];nwr(area.sfaxArea)["name:ar"~"ثانوية|معهد|المعهد",i];);out center tags;`,
    // Fallback: query school objects in the Sfax urban area when an Overpass
    // instance cannot resolve the administrative area. Results are not cached
    // when empty. The client still filters candidates to secondary lycées.
    `[out:json][timeout:60];(nwr(34.55,10.55,34.95,11.05)["amenity"="school"];nwr(34.55,10.55,34.95,11.05)["building"="school"];nwr(34.55,10.55,34.95,11.05)["school:level"];nwr(34.55,10.55,34.95,11.05)["isced:level"];nwr(34.55,10.55,34.95,11.05)["name"~"lycée|lycee|ثانوية|معهد|المعهد|high school|secondary school",i];nwr(34.55,10.55,34.95,11.05)["name:ar"~"ثانوية|معهد|المعهد",i];);out center tags;`
  ];
  const endpoints = ["https://overpass-api.de/api/interpreter", "https://overpass.kumi.systems/api/interpreter", "https://overpass.private.coffee/api/interpreter"];
  let lastError = null;
  for (const endpoint of endpoints) {
    for (const query of queries) {
      try {
        const upstream = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=UTF-8", "User-Agent": "TorbagaProfInformatique/1.0" },
          body: query,
          signal: AbortSignal.timeout(65000)
        });
        if (!upstream.ok) throw new Error(`Overpass returned ${upstream.status}`);
        const payload = await upstream.json();
        // Do not cache empty responses; try the next query/server instead.
        if (!Array.isArray(payload.elements) || payload.elements.length === 0) {
          lastError = new Error("Overpass returned no school objects");
          console.warn("Sfax school query returned no elements:", endpoint);
          continue;
        }
        const response = Response.json(payload, { headers: { "Cache-Control": "public, max-age=43200" } });
        await cache.put(cacheKey, response.clone());
        return response;
      } catch (error) {
        lastError = error;
        console.warn("Sfax lycée catalogue upstream failed:", endpoint, String(error));
      }
    }
  }
  return Response.json({ ok: false, error: "The lycée catalogue is temporarily unavailable. Please retry." }, { status: 503 });
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

      // Public Sfax secondary-school catalogue (proxied and cached server-side)
      if (url.pathname === "/api/sfax-lycees") {
        return await getSfaxLycees(request, env);
      }

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