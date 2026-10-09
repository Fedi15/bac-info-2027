TORBAGA BULK EMAIL — GMAIL / GOOGLE APPS SCRIPT SETUP

This replaces the Resend sender with Google Apps Script MailApp. It keeps the existing Cloudflare admin page and its branded HTML template. No custom sending domain is required, but Google account quotas apply.

A. CREATE THE GOOGLE APPS SCRIPT
1. Sign in to the Google account you want emails to come from.
2. Open https://script.google.com/ and create a New project.
3. Rename it to: Torbaga Student Email Sender
4. Open the default Code.gs file, replace its contents with the full contents of GmailBroadcast.gs from this ZIP, and save.
5. In Apps Script, open Project Settings (gear icon), find Script Properties, and add:
   Property: BROADCAST_SECRET
   Value: generate a long random secret (at least 32 characters). Do not reuse your ADMIN_TOKEN or Resend API key. Save it somewhere safe because you must enter the same value in Cloudflare.
6. In the function dropdown, select authorizeMailService and click Run. Approve the requested Google permissions. This function only checks quota; it does not send an email.
7. Click Deploy > New deployment. Select the gear/type dropdown and choose Web app.
   - Execute as: Me
   - Who has access: Anyone
   Deploy and approve authorization if prompted.
8. Copy the Web app URL ending in /exec. Do not use the /dev test URL.

B. CONFIGURE CLOUDFLARE WORKER SECRETS
Open a terminal in your project folder and run:
   npx wrangler secret put GMAIL_SCRIPT_URL
Paste the Web app URL ending in /exec and press Enter.
Then run:
   npx wrangler secret put GMAIL_BROADCAST_SECRET
Paste the exact same value you saved in Script Properties as BROADCAST_SECRET.
Do not put either value in public/admin.html or commit secrets to GitHub.

C. DEPLOY THE WEBSITE
Merge the changed files from this ZIP into your project, preserving your other files, then run:
   npx wrangler deploy

D. TEST SAFELY
1. Open the admin panel and load student requests.
2. Enter your own email in the “send one test” field and click the test button. This mode sends only to the address you enter; it does not query or email the student list.
3. Confirm the test arrives and the formatting looks right.
4. Only after the test works, use the “send to all students” button.

IMPORTANT LIMITS / PRIVACY
- Consumer Gmail / Apps Script accounts typically have a daily quota of 100 email recipients, but the live quota depends on the Google account and may change. The script checks remaining quota before sending and reports recipients it could not attempt.
- Every message is sent separately; students do not see one another's addresses.
- Do not repeatedly click Send to work around quota limits. If some recipients remain, send them later after quota resets, taking care not to resend to students who already received the email. The current UI does not yet maintain a sent-history list, so avoid retrying the full list blindly.
- Send only messages students have agreed to receive, and provide a way to opt out of recurring announcements.
- The Google Apps Script Web App is accessible publicly at the URL, but it rejects requests without the shared secret. Protect that secret and use a long random value.
- No live Gmail delivery or Cloudflare deployment was performed when preparing these files. Syntax checks do not guarantee Google's deployment settings or mail delivery are correct.
