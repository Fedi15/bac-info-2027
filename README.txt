Torbaga Admin Enhancements — changed files only

Files:
- public/admin.html: updated standalone admin page. Its CSS and JavaScript are embedded in this HTML file, so the public site js.js and style.css do not need to be replaced for these admin-only features.

New features:
- Search across name, phone, email, level, school, city, lesson location and source.
- Filters for level/section, school, lesson location, source and date range.
- Sort by newest, oldest, or name.
- Export the currently filtered results to UTF-8 CSV.
- Copy valid email addresses from the currently filtered results.
- Quick-click phone and email links.
- Dashboard counts for valid email addresses and requests missing a valid email.
- Clear filters button and a visible count of filtered results.

Existing behavior retained:
- Admin token persistence and forget-key button.
- Student request loading and visitor stats.
- Gmail quota refresh, test email, bulk email, preview and delete controls.

Important:
- Filtering affects the table, CSV export, and copy-email action only. The existing "send to all students" action intentionally continues to send to all valid email addresses in the loaded list, regardless of table filters.
- This update changes only the admin page; it does not change API routes, database schema, or the email sender.
- JavaScript syntax was checked with Node.js. The updated page was not deployed or tested against the live Cloudflare project.

Install:
1. Back up your current public/admin.html.
2. Replace it with the included public/admin.html.
3. Run `npx wrangler deploy` from the project root.
4. Reload the admin page. If the old page remains cached, do a hard refresh (Ctrl+Shift+R).
