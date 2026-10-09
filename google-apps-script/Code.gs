/**
 * Torbaga student broadcast sender.
 * Deploy this project as a Web App that executes as your Google account.
 * Keep BROADCAST_SECRET in Script Properties; never put it in client-side code.
 */
function doPost(e) {
  try {
    var configuredSecret = PropertiesService.getScriptProperties().getProperty('BROADCAST_SECRET');
    if (!configuredSecret) return output_({ ok: false, error: 'BROADCAST_SECRET is not configured.' });

    var payload = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (!payload.secret || !constantTimeEqual_(String(payload.secret), configuredSecret)) {
      return output_({ ok: false, error: 'Unauthorized.' });
    }

    var subject = String(payload.subject || '').trim();
    var message = String(payload.message || '').trim();
    var recipients = Array.isArray(payload.recipients) ? payload.recipients : [];
    if (subject.length < 2 || subject.length > 180) return output_({ ok: false, error: 'Subject must be 2–180 characters.' });
    if (message.length < 2 || message.length > 8000) return output_({ ok: false, error: 'Message must be 2–8000 characters.' });
    if (!recipients.length) return output_({ ok: false, error: 'No recipients were supplied.' });
    if (recipients.length > 500) return output_({ ok: false, error: 'A maximum of 500 recipients is allowed per run.' });

    // Deduplicate addresses before counting/sending.
    var seen = {};
    recipients = recipients.filter(function (r) {
      var email = String((r && r.email) || '').trim();
      var key = email.toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || seen[key]) return false;
      seen[key] = true;
      r.email = email;
      r.name = String((r && r.name) || '').slice(0, 160);
      return true;
    });
    if (!recipients.length) return output_({ ok: false, error: 'No valid recipient email addresses were supplied.' });

    var quota = MailApp.getRemainingDailyQuota();
    var allowed = Math.min(recipients.length, quota);
    if (allowed < 1) {
      return output_({ ok: false, sent: 0, failed: 0, remaining: recipients.length, total: recipients.length,
        note: 'Gmail daily sending quota is exhausted. Try again after the quota resets.' });
    }

    var sent = 0;
    var failures = [];
    for (var i = 0; i < allowed; i++) {
      var recipient = recipients[i];
      try {
        var htmlBody = buildEmailHtml_(recipient.name, subject, message);
        var plainBody = 'Bonjour ' + recipient.name + ',\n\n' + message + '\n\nFEDI GHANMI (TORBAGA) · Sfax, Tunisie';
        MailApp.sendEmail({
          to: recipient.email,
          subject: subject,
          body: plainBody,
          htmlBody: htmlBody,
          name: 'Fedi Ghanmi (Torbaga)'
        });
        sent++;
      } catch (err) {
        failures.push({ email: recipient.email, error: String(err && err.message ? err.message : 'Send failed').slice(0, 180) });
      }
    }

    var notAttempted = recipients.length - allowed;
    var remaining = notAttempted + failures.length;
    var note = '';
    if (notAttempted > 0) note = 'Gmail daily quota allowed ' + allowed + ' attempts. ' + notAttempted + ' recipient(s) were not attempted and can be tried after the quota resets.';
    return output_({
      ok: failures.length === 0 && notAttempted === 0,
      sent: sent,
      failed: failures.length,
      failures: failures.slice(0, 20),
      total: recipients.length,
      remaining: remaining,
      note: note
    });
  } catch (err) {
    return output_({ ok: false, error: String(err && err.message ? err.message : 'Unexpected script error').slice(0, 300) });
  }
}

```javascript
function buildEmailHtml_(name, subject, message) {
  var safeSubject = escapeHtml_(subject);
  var safeName = escapeHtml_(name);
  var safeMessage = escapeHtml_(message).replace(/\r?\n/g, '<br>');

  var gold = '#c7a66a';
  var ivory = '#f4ead6';
  var muted = '#a7a195';
  var background = '#090909';
  var card = '#111110';

  return '<!doctype html>' +
    '<html><body style="margin:0;padding:0;background:' + background +
    ';font-family:Arial,Helvetica,sans-serif;color:' + ivory + ';">' +

    // Preview text shown in supported email clients
    '<div style="display:none;max-height:0;overflow:hidden;opacity:0;">' +
    safeSubject + '</div>' +

    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" ' +
    'style="width:100%;background:' + background + ';">' +
    '<tr><td align="center" style="padding:32px 12px;">' +

    // Main frame
    '<table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" ' +
    'style="width:100%;max-width:600px;background:' + card +
    ';border:1px solid #393328;">' +

    // Gold top accent
    '<tr><td style="height:4px;background:' + gold +
    ';font-size:0;line-height:0;">&nbsp;</td></tr>' +

    // Brand header
    '<tr><td style="padding:30px 28px 25px;border-bottom:1px solid #332e25;">' +
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">' +
    '<tr><td align="left" valign="middle">' +
    '<div style="font-size:11px;line-height:1.5;letter-spacing:4px;color:' +
    gold + ';font-weight:bold;">TORBAGA</div>' +
    '<div style="font-size:25px;line-height:1.3;letter-spacing:1px;color:' +
    ivory + ';font-weight:normal;margin-top:5px;">FEDI GHANMI</div>' +
    '<div style="font-size:10px;line-height:1.8;letter-spacing:2px;color:' +
    muted + ';margin-top:8px;">COURS PARTICULIERS · INFORMATIQUE</div>' +
    '</td><td align="right" valign="top" style="padding-left:10px;">' +
    '<div style="border:1px solid #51432b;padding:7px 9px;color:' +
    gold + ';font-size:9px;line-height:1.5;letter-spacing:1px;">' +
    'SFAX<br>TUNISIE</div>' +
    '</td></tr></table></td></tr>' +

    // Message heading
    '<tr><td style="padding:35px 28px 10px;">' +
    '<div style="font-size:10px;line-height:1.8;letter-spacing:3px;color:' +
    gold + ';font-weight:bold;">INFORMATION AUX ÉLÈVES</div>' +
    '<div style="width:48px;height:2px;background:' + gold +
    ';margin-top:15px;font-size:0;line-height:0;">&nbsp;</div>' +
    '<h1 style="font-size:29px;line-height:1.3;font-weight:normal;letter-spacing:-0.5px;' +
    'color:' + ivory + ';margin:22px 0 0;">' + safeSubject + '</h1>' +
    '</td></tr>' +

    // Greeting and body
    '<tr><td style="padding:20px 28px 34px;">' +
    '<p style="font-size:15px;line-height:1.9;color:#e1dbcf;margin:0 0 19px;">' +
    'Bonjour ' + safeName + ',</p>' +

    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" ' +
    'style="width:100%;border-left:3px solid ' + gold +
    ';background:#181714;">' +
    '<tr><td style="padding:19px 18px;font-size:15px;line-height:1.95;' +
    'color:#d9d3c7;overflow-wrap:anywhere;word-break:break-word;">' +
    safeMessage + '</td></tr></table>' +

    // Signature
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">' +
    '<tr><td style="padding-top:27px;">' +
    '<p style="font-size:12px;line-height:1.8;color:' + muted +
    ';margin:0 0 5px;">À bientôt,</p>' +
    '<p style="font-size:16px;line-height:1.6;color:' + ivory +
    ';font-weight:bold;letter-spacing:0.5px;margin:0;">Fedi Ghanmi ' +
    '<span style="color:' + gold + ';">(Torbaga)</span></p>' +
    '</td></tr></table>' +

    '</td></tr>' +

    // Footer
    '<tr><td style="padding:23px 28px;background:#0c0c0b;border-top:1px solid #332e25;">' +
    '<div style="font-size:10px;line-height:1.8;letter-spacing:2px;color:' +
    gold + ';font-weight:bold;">TORBAGA · PROF INFORMATIQUE</div>' +
    '<p style="font-size:12px;line-height:1.9;color:' + muted +
    ';margin:10px 0 0;">Cours particuliers d’informatique à Sfax.<br>' +
    'Chez moi ou chez toi · Sur rendez-vous.</p>' +
    '<div style="font-size:10px;line-height:1.8;color:#716c62;margin-top:20px;' +
    'padding-top:14px;border-top:1px solid #292720;letter-spacing:0.5px;">' +
    'SFAX, TUNISIE &nbsp;·&nbsp; APPRENDRE. PROGRESSER. RÉUSSIR.</div>' +
    '</td></tr>' +

    // Bottom accent
    '<tr><td style="height:3px;background:' + gold +
    ';font-size:0;line-height:0;">&nbsp;</td></tr>' +

    '</table></td></tr></table></body></html>';
}
```

function escapeHtml_(value) {
  return String(value == null ? '' : value).replace(/[&<>"']/g, function (ch) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
  });
}

function constantTimeEqual_(a, b) {
  if (a.length !== b.length) return false;
  var diff = 0;
  for (var i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function output_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

// Run this once from the Apps Script editor to trigger the Google authorization prompt.
function authorizeMailService() {
  Logger.log('Remaining daily recipient quota: ' + MailApp.getRemainingDailyQuota());
}
