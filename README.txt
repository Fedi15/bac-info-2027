TORBAGA Prof Informatique — Combined Registration Upgrade

Changed files only:
- public/index.html
- public/js.js
- public/style.css
- api/register.js

Features:
1. Email composer: username before @, selectable common domains, custom domain, and paste-full-email support. It submits a normal email field to the existing registration endpoint.
2. Duplicate protection: the API returns HTTP 409 with duplicate_registration when the same student appears to submit again using matching email/phone/name signals. Students who share an email but have different names and phone numbers are not automatically blocked.
3. Mobile registration refinements: smaller-screen navigation/form spacing, single-column form rows, compact email composer, responsive confirmation dialog, and wrapped footer.
4. Preserves the current lycée detection code and previous divider/school-field styling fixes.

Deploy:
- Copy the files into the matching paths in your project.
- From the project root (where wrangler.toml is located), run: npx wrangler deploy
- Then hard-refresh the site with Ctrl+F5.

Notes:
- No database migration is required; duplicate detection checks existing records before inserting.
- Syntax checks passed for public/js.js and api/register.js. This patch has not been deployed or end-to-end tested against the live Cloudflare D1 database.
