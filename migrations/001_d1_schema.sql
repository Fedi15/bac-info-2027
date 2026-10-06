-- Cloudflare D1 / SQLite schema.
-- Run this against a fresh D1 database with:
-- npx wrangler d1 execute bac-info-2027 --remote --file=migrations/001_d1_schema.sql

CREATE TABLE IF NOT EXISTS student_leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  level TEXT NOT NULL,
  school TEXT,
  city TEXT NOT NULL DEFAULT 'Sfax',
  lesson_location TEXT NOT NULL,
  source TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_student_leads_created_at
  ON student_leads(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_student_leads_email
  ON student_leads(email);

CREATE INDEX IF NOT EXISTS idx_student_leads_lesson_location
  ON student_leads(lesson_location);
