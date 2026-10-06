CREATE TABLE IF NOT EXISTS student_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  level TEXT NOT NULL,
  school TEXT,
  city TEXT,
  interest TEXT NOT NULL,
  availability TEXT,
  source TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
)