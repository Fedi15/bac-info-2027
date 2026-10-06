import { db } from "hatchable";

export const access = "admin";
export const methods = ["GET"];

export default async function(req, res) {
  const { rows } = await db.query(
    `SELECT
      id,
      full_name,
      phone,
      email,
      level,
      school,
      city,
      interest,
      lesson_location,
      availability,
      source,
      created_at
     FROM student_leads
     ORDER BY created_at DESC`
  );

  res.json({ ok: true, leads: rows });
}
