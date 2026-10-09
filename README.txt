TORBAGA lycée detection filter fix

Replace public/js.js with the file in this package, then deploy the site assets.
This loosens the Tunisian institute matching rule to include entries tagged as
amenity=school, building=school, or with education/school-level metadata, while
continuing to reject clearly primary, preparatory, college, university, and
vocational entries.

This patch changes only the browser-side filter. The Worker endpoint /api/sfax-lycees
must also be deployed and return school elements. If the endpoint itself returns
an empty list or 503, this change alone cannot create missing map data.
