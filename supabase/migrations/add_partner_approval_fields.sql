-- Add approved_at and approved_by columns to partner_applications table
-- These fields are required for tracking when and by whom a partner application was approved

ALTER TABLE partner_applications
ADD COLUMN IF NOT EXISTS approved_at timestamptz,
ADD COLUMN IF NOT EXISTS approved_by uuid REFERENCES auth.users(id);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_partner_applications_approved_at ON partner_applications(approved_at);
CREATE INDEX IF NOT EXISTS idx_partner_applications_approved_by ON partner_applications(approved_by);
CREATE INDEX IF NOT EXISTS idx_partner_applications_status ON partner_applications(status);

-- Add comment for documentation
COMMENT ON COLUMN partner_applications.approved_at IS 'Timestamp when the application was approved';
COMMENT ON COLUMN partner_applications.approved_by IS 'User ID of the admin who approved the application';
