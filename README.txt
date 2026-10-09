TORBAGA lycée detector: Overpass CORS / rate-limit fix

Changed files only:
- public/js.js
- src/worker.js

Why this fixes the reported errors:
- The browser no longer calls Overpass directly, so the browser CORS error is avoided.
- Cloudflare Worker calls Overpass server-side and tries several public instances if one returns 429/500.
- Successful catalogue responses are cached for 12 hours, reducing repeated requests.

Install by extracting into your project root and replacing the matching files. Then run:
  npx wrangler deploy

Checks: node --check passed for both JavaScript files. Live Overpass availability and GPS selection were not tested here. Public Overpass services can still temporarily be unavailable; the proxy reports a controlled 503 instead of an uncaught browser fetch error.
