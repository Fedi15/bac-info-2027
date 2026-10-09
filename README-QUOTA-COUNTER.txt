TORBAGA ADMIN — LIVE GMAIL QUOTA COUNTER

This update adds a live remaining-recipient quota counter to the admin email panel. It uses MailApp.getRemainingDailyQuota() from your Google Apps Script account. It does not send an email to check the number.

FILES INCLUDED
- public/admin.html: shows the counter and a “حدّث العدد” refresh button. It refreshes when admin requests load and after test/bulk sends.
- api/broadcast.js: adds an authenticated quota lookup action.
- google-apps-script/Code.gs: lets the existing Apps Script web app return the live quota after validating BROADCAST_SECRET.

INSTALL
1. Merge public/admin.html and api/broadcast.js into your existing project, replacing those files.
2. Open https://script.google.com/ and open your existing Torbaga email sender project.
3. Replace the contents of Code.gs with the included google-apps-script/Code.gs, but first preserve your current buildEmailHtml_ function if you have customized its design. The easiest safe method is to add the quota action block from the included Code.gs inside doPost(), immediately after the shared-secret validation and before subject/message validation:

    if (payload.action === 'quota') {
      return output_({ ok: true, remainingQuota: MailApp.getRemainingDailyQuota() });
    }

   Do not overwrite a customized email design just to add the quota feature.
4. Save the Apps Script project.
5. In Apps Script click Deploy > Manage deployments > Edit (pencil) > New version > Deploy. Keep the same /exec URL.
6. In your website project terminal run: npx wrangler deploy
7. Open the admin page, load requests, and check the counter in the email panel. Click “حدّث العدد” to refresh manually.

NOTES
- The value is Google's live remaining recipient quota for the account running the script, not a guaranteed inbox-delivery count.
- Test emails also consume quota.
- The counter needs the existing ADMIN_TOKEN, GMAIL_SCRIPT_URL, GMAIL_BROADCAST_SECRET, and Apps Script BROADCAST_SECRET setup to be valid.
- No live deployment or Gmail account test was performed while preparing these files; JavaScript syntax checks passed.
