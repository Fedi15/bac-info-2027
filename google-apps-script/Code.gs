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

    // Admin-only quota lookup. This returns the live remaining recipient quota
    // without sending any email or querying student data.
    if (payload.action === 'quota') {
      return output_({ ok: true, remainingQuota: MailApp.getRemainingDailyQuota() });
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

function buildEmailHtml_(name, subject, message) {
  var safeSubject = escapeHtml_(subject);
  var safeName = escapeHtml_(name);
  var safeMessage = escapeHtml_(message).replace(/\r?\n/g, '<br>');
  return '<!doctype html><html><body style="margin:0;padding:0;background:#0b0b0c;font-family:Arial,Helvetica,sans-serif;color:#eee">' +
    '<div style="display:none;max-height:0;overflow:hidden;opacity:0">' + safeSubject + '</div>' +
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#0b0b0c;padding:32px 12px"><tr><td align="center">' +
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#111214;border:1px solid #39332a">' +
    '<tr><td style="padding:26px 28px;border-bottom:1px solid #3a3327"><div style="font-size:12px;letter-spacing:3px;color:#c7a66a;font-weight:bold">FEDI GHANMI <span style="color:#eee">(TORBAGA)</span></div>' +
    '<div style="font-size:10px;letter-spacing:2px;color:#8e8a81;margin-top:8px">COURS PARTICULIERS · INFORMATIQUE</div></td></tr>' +
    '<tr><td style="padding:34px 28px"><div style="font-size:10px;letter-spacing:2px;color:#c7a66a;font-weight:bold;margin-bottom:14px">MESSAGE AUX ÉLÈVES</div>' +
    '<h1 style="font-size:27px;line-height:1.25;font-weight:500;color:#f4ead6;margin:0 0 22px">' + safeSubject + '</h1>' +
    '<p style="font-size:15px;line-height:1.9;color:#d7d2c8;margin:0 0 18px">Bonjour ' + safeName + ',</p>' +
    '<div style="font-size:15px;line-height:1.9;color:#d7d2c8;overflow-wrap:anywhere">' + safeMessage + '</div>' +
    '<div style="height:1px;background:#3a3327;margin:28px 0 20px"></div>' +
    '<p style="font-size:12px;line-height:1.8;color:#9d978b;margin:0">Cours particuliers d’informatique à Sfax<br>Chez moi ou chez toi · Sur rendez-vous</p></td></tr>' +
    '<tr><td style="padding:18px 28px;background:#0d0d0e;border-top:1px solid #292621;font-size:10px;letter-spacing:1px;color:#8e887d">FEDI GHANMI (TORBAGA) · SFAX, TUNISIE</td></tr>' +
    '</table></td></tr></table></body></html>';
}

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
