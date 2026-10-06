-- Availability remains in the existing TEXT column so multiple selected
-- time windows can be stored as a comma-separated value.
-- lesson_location is provided by migration 002.
CREATE INDEX IF NOT EXISTS idx_student_leads_lesson_location
ON student_leads(lesson_location);
