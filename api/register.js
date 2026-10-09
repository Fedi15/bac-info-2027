function clean(value, max = 500) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function json(data, status = 200) {
  return Response.json(data, { status });
}

const ALLOWED_LOCATIONS = [
  "Chez moi", "Chez l'élève",
  "At my place", "At the student's place",
  "عندي", "عندك", "عند التلميذ"
];

export async function registerLead(request, env) {
  if (request.method !== "POST") {
    return json({ ok: false, error: "Method not allowed" }, 405);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON" }, 400);
  }

  const full_name = clean(body.full_name, 120);
  const phone = clean(body.phone, 30);
  const email = clean(body.email, 160).toLowerCase();
  const level = clean(body.level, 100);
  const school = clean(body.school, 150);
  const city = "Sfax";
  const lesson_location = clean(body.lesson_location, 120);
  const source = clean(body.source, 100);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!full_name || !phone || !email || !level || !lesson_location) {
    return json({ ok: false, error: "Missing required fields" }, 400);
  }
  if (!emailOk) {
    return json({ ok: false, error: "Invalid email" }, 400);
  }
  if (!ALLOWED_LOCATIONS.includes(lesson_location)) {
    return json({ ok: false, error: "Invalid lesson location" }, 400);
  }

  // Prevent accidental repeat submissions while allowing family members to share an email.
  // Compare normalized phone digits and normalized name against records matching this email/phone.
  const normalizePhone = value => String(value || "").replace(/\D/g, "");
  const normalizeName = value => String(value || "").normalize("NFKC").trim().replace(/\s+/g, " ").toLocaleLowerCase();
  const phoneDigits = normalizePhone(phone);
  const normalizedName = normalizeName(full_name);
  const possibleDuplicates = await env.DB.prepare(`
    SELECT full_name, phone, email
    FROM student_leads
    WHERE lower(email) = ?
       OR (? <> '' AND replace(replace(replace(replace(replace(phone, ' ', ''), '-', ''), '(', ''), ')', ''), '+', '') = ?)
    ORDER BY created_at DESC
    LIMIT 50
  `).bind(email, phoneDigits.length >= 6 ? phoneDigits : "", phoneDigits).all();

  const duplicate = (possibleDuplicates.results || []).some(existing => {
    const sameEmail = String(existing.email || "").trim().toLowerCase() === email;
    const samePhone = phoneDigits.length >= 6 && normalizePhone(existing.phone) === phoneDigits;
    const sameName = normalizeName(existing.full_name) === normalizedName;
    return (sameEmail && samePhone) || (samePhone && sameName) || (sameEmail && sameName);
  });
  if (duplicate) {
    return json({ ok: false, error: "duplicate_registration" }, 409);
  }

  await env.DB.prepare(`
    INSERT INTO student_leads
      (full_name, phone, email, level, school, city, lesson_location, source)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    full_name,
    phone,
    email,
    level,
    school,
    city,
    lesson_location,
    source
  ).run();

  return json({ ok: true }, 201);
}
