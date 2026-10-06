export const access = "admin";

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export default async function(req, res) {
  const response = await fetch(new URL("/api/leads", req.url), {
    headers: { cookie: req.headers.cookie || "" }
  });

  const data = await response.json();
  const leads = data.leads || [];

  const rows = leads.map(lead => `
    <tr>
      <td>${escapeHtml(new Date(lead.created_at).toLocaleString())}</td>
      <td>${escapeHtml(lead.full_name)}</td>
      <td>${escapeHtml(lead.phone)}</td>
      <td>${escapeHtml(lead.email)}</td>
      <td>${escapeHtml(lead.level)}</td>
      <td>${escapeHtml(lead.school)}</td>
      <td>${escapeHtml(lead.city)}</td>
      <td>${escapeHtml(lead.interest)}</td>
      <td>${escapeHtml(lead.lesson_location)}</td>
      <td>${escapeHtml(lead.availability)}</td>
      <td>${escapeHtml(lead.source)}</td>
    </tr>
  `).join("");

  res.status(200).send(`
<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Leads — Bac Info 2027</title>
<style>
body{margin:0;background:#0b0b0c;color:#f4f0e8;font-family:Arial,sans-serif;padding:30px}
h1{font-family:Georgia,serif;font-weight:500}
.wrap{overflow:auto;border:1px solid #302e2a}
table{width:100%;border-collapse:collapse;min-width:1100px}
th,td{padding:12px;border-bottom:1px solid #302e2a;text-align:left;font-size:12px}
th{color:#d8b56a;background:#111112}
td{background:#0e0e0f}
</style>
</head>
<body>
<h1>Demandes de séances</h1>
<div class="wrap">
<table>
<thead><tr>
<th>Date</th><th>Nom</th><th>Téléphone</th><th>E-mail</th><th>Niveau</th><th>Établissement</th>
<th>Zone</th><th>Besoin</th><th>Lieu</th><th>Disponibilité</th><th>Source</th>
</tr></thead>
<tbody>${rows}</tbody>
</table>
</div>
</body>
</html>
  `);
}
