import { db } from "hatchable";

export const access = "public";
export const methods = ["POST"];

function clean(value, max = 500) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export default async function(req, res) {
  const body = req.body || {};

  const full_name = clean(body.full_name, 120);
  const phone = clean(body.phone, 30);
  const email = clean(body.email, 160);
  const level = clean(body.level, 80);
  const school = clean(body.school, 150);
  const city = clean(body.city, 100);
  const interest = clean(body.interest, 120);
  const lesson_location = clean(body.lesson_location, 120);
  const availability = clean(body.availability, 200);
  const source = clean(body.source, 100);

  const allowedLocations = ["Chez moi", "Chez l'élève", "At my place", "At the student's place", "عندي", "عند التلميذ"];
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return res.status(400).json({ ok: false, error: "Invalid email" });
  }
  if (lesson_location && !allowedLocations.includes(lesson_location)) {
    return res.status(400).json({ ok: false, error: "Invalid lesson location" });
  }

  if (!full_name || !phone || !email || !level || !interest || !lesson_location || !availability) {
    return res.status(400).json({
      ok: false,
      error: "Missing required fields"
    });
  }

  await db.query(
    `INSERT INTO student_leads
      (full_name, phone, email, level, school, city, interest, lesson_location, availability, source)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
    [
      full_name,
      phone,
      email,
      level,
      school,
      city,
      interest,
      lesson_location,
      availability,
      source
    ]
  );

  res.status(201).json({ ok: true });
}
