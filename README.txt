TORBAGA — QUOTA COUNTER DIAGNOSTIC PATCH

This patch changes only api/broadcast.js to show the actual category of the Apps Script quota-response failure. It does not change the email design or the sending loop.

INSTALL:
1. Replace api/broadcast.js in your existing project with the included file.
2. From the project root run: npx wrangler deploy
3. Refresh the admin page and click the quota counter refresh button.
4. Copy the exact error and diagnostic fields shown by the admin/API response, but never share API keys, ADMIN_TOKEN, GMAIL_BROADCAST_SECRET, or BROADCAST_SECRET.
