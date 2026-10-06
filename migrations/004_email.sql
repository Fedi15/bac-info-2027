ALTER TABLE student_leads
ADD COLUMN IF NOT EXISTS email TEXT;

CREATE INDEX IF NOT EXISTS idx_student_leads_email
ON student_leads(email);
