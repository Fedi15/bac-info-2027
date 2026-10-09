Torbaga Sfax lycée detection fix

Changed files only:
- public/js.js: recognizes Tunisian public lycées commonly named "معهد ..." when OpenStreetMap tags them as a school, while excluding obvious primary schools, collèges and vocational training centres.
- src/worker.js: makes the Sfax administrative-area lookup less dependent on an exact relation name/admin level, queries school objects inside that area, and does not cache empty Overpass responses.

Install by extracting these files over the matching files in your project, then run:
  npx wrangler deploy

Checks performed: Node.js syntax checks for public/js.js and src/worker.js.
Not performed: live Overpass request or end-to-end GPS test. Results still depend on the map data and whether Overpass can resolve the Sfax administrative boundary.
