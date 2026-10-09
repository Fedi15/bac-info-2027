EMAIL BROADCAST SETUP — Cloudflare Worker / Resend

This feature sends an individually addressed HTML email to every student record with a valid email address. It uses Resend from the Worker so the provider API key is never exposed in public/admin JavaScript.

Required setup before the button can send:
1. Create/verify a sending domain in Resend: https://resend.com/domains
2. In the project directory run:
   npx wrangler secret put RESEND_API_KEY
   Enter your Resend API key when prompted.
3. Configure MAIL_FROM as a Cloudflare Worker variable with a verified sender, e.g.:
   npx wrangler secret put MAIL_FROM
   Enter: Torbaga — Prof Informatique <contact@your-verified-domain.tld>
   (Use an address on your domain verified with Resend; do not use the example literally.)
4. Deploy the Worker.

The admin page must first load requests with a valid ADMIN_TOKEN. The composer shows a preview and requires confirmation before sending. Each student is sent a separate email, so recipient addresses are not exposed to other students. Up to 500 recipients are allowed per run; the Worker reports partial failures if any.

Only email students who have agreed to receive these updates. This is a broadcast feature; check local privacy/anti-spam requirements and include an appropriate opt-out process for recurring/promotional messages.
