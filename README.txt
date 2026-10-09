TORBAGA lycée detection fix

Files:
- src/worker.js: replaces the unreliable empty administrative-area Overpass query with a Sfax bounding-box query using the name terms confirmed by the user's console tests (معهد, lycée, lycee, lycce, ثانوية) plus school tags. Empty/error responses are not cached; returns HTTP 503 if all upstream endpoints fail.
- public/js.js: accepts standalone معهد names and lycce/lycée/lycee names, rejects obvious unrelated institutions and transit stops named after lycées, and retains nearest-by-GPS selection.

Install both files in the existing project, then deploy the Worker. This is a targeted fix; the bounding box is an approximation of urban Sfax and is not a precise governorate boundary. Overpass results depend on OpenStreetMap coverage and can include duplicate representations of the same school; the client deduplicates by name.

Validation: JavaScript syntax checks should be run before deployment. Live Overpass/Cloudflare deployment has not been tested from this patch environment.
