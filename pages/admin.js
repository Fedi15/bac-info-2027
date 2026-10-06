export const access = "admin";

export default async function(req,res){
  const html = '<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
  '<title>Admin — Bac Info 2027</title><style>' +
  'body{margin:0;background:#090b10;color:#f4f5f7;font-family:Arial,sans-serif}.wrap{max-width:1100px;margin:auto;padding:30px 20px}' +
  'h1{margin:0 0 8px}.muted{color:#9da6b3}.top{display:flex;justify-content:space-between;align-items:end;gap:20px;margin-bottom:25px}' +
  '.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:20px}.card{background:#131720;border:1px solid #29313e;border-radius:14px;padding:18px}.card b{font-size:28px;display:block}' +
  '.table{overflow:auto;background:#11151d;border:1px solid #29313e;border-radius:14px}table{border-collapse:collapse;width:100%;min-width:850px}th,td{text-align:left;padding:13px;border-bottom:1px solid #252d39;font-size:13px}th{color:#6aa9ff;font-size:12px;text-transform:uppercase}td{color:#dbe1e8}.pill{display:inline-block;padding:4px 8px;border-radius:999px;background:#183c68;color:#a9d2ff}' +
  '</style></head><body><div class="wrap"><div class="top"><div><h1>Student leads</h1><div class="muted">Bac Informatique 2027</div></div><div class="muted" id="status">Chargement...</div></div>' +
  '<div class="cards"><div class="card"><span class="muted">Total</span><b id="total">—</b></div><div class="card"><span class="muted">Aujourd’hui</span><b id="today">—</b></div><div class="card"><span class="muted">Sources QR</span><b id="qr">—</b></div></div>' +
  '<div class="table"><table><thead><tr><th>Date</th><th>Nom</th><th>Téléphone</th><th>Niveau</th><th>Lycée</th><th>Ville</th><th>Demande</th><th>Disponibilité</th><th>Source</th></tr></thead><tbody id="rows"></tbody></table></div></div>' +
  '<script>' +
  'function esc(v){return String(v).replace(/[&<>"\x27]/g,function(m){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","\x27":"&#39;"}[m]})}' +
  '(async function(){try{var r=await fetch("/api/leads");var data=await r.json();if(!r.ok||!data.ok)throw new Error();var leads=data.leads||[],now=new Date();var today=leads.filter(function(x){return new Date(x.created_at).toDateString()===now.toDateString()}).length;document.getElementById("total").textContent=leads.length;document.getElementById("today").textContent=today;document.getElementById("qr").textContent=leads.filter(function(x){return (x.source||"").indexOf("qr")>=0}).length;document.getElementById("status").textContent="Mis à jour à l’ouverture";document.getElementById("rows").innerHTML=leads.map(function(x){return "<tr><td>"+new Date(x.created_at).toLocaleString("fr-FR")+"</td><td><b>"+esc(x.full_name)+"</b></td><td>"+esc(x.phone)+"</td><td><span class=\"pill\">"+esc(x.level)+"</span></td><td>"+esc(x.school||"—")+"</td><td>"+esc(x.city||"—")+"</td><td>"+esc(x.interest)+"</td><td>"+esc(x.availability||"—")+"</td><td>"+esc(x.source||"—")+"</td></tr>"}).join("")}catch(e){document.getElementById("status").textContent="Erreur de chargement"}})();' +
  '</script></body></html>';
  res.send(html);
}