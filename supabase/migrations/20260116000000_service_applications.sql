-- Service Applications table for storing Apply Now form submissions from service landing pages
-- These submissions are displayed in the admin dashboard and trigger email notifications

CREATE TABLE IF NOT EXISTS service_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  goals TEXT,
  partner_types TEXT,
  reward_model TEXT,
  notes TEXT,
  source_page TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for admin dashboard queries
CREATE INDEX IF NOT EXISTS idx_service_applications_created_at ON service_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_service_applications_status ON service_applications(status);

-- Enable RLS
ALTER TABLE service_applications ENABLE ROW LEVEL SECURITY;

-- Admin-only access policy (service role can always access)
CREATE POLICY "Service applications are admin-only"
  ON service_applications
  FOR ALL
  USING (false)
  WITH CHECK (false);

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_service_applications_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS service_applications_updated_at ON service_applications;
CREATE TRIGGER service_applications_updated_at
  BEFORE UPDATE ON service_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_service_applications_updated_at();
