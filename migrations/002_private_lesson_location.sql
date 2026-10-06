ALTER TABLE student_leads
ADD COLUMN IF NOT EXISTS lesson_location TEXT;

CREATE INDEX IF NOT EXISTS idx_student_leads_created_at
ON student_leads(created_at DESC);
