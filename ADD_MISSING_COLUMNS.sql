-- Run this SQL in Supabase SQL Editor to add missing columns
-- This fixes the "Failed to update application status" error

-- Add approved_at and approved_by columns if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = 'partner_applications'
        AND column_name = 'approved_at'
    ) THEN
        ALTER TABLE partner_applications ADD COLUMN approved_at timestamptz;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = 'partner_applications'
        AND column_name = 'approved_by'
    ) THEN
        ALTER TABLE partner_applications ADD COLUMN approved_by uuid REFERENCES auth.users(id);
    END IF;
END $$;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_partner_applications_approved_at ON partner_applications(approved_at);
CREATE INDEX IF NOT EXISTS idx_partner_applications_approved_by ON partner_applications(approved_by);
CREATE INDEX IF NOT EXISTS idx_partner_applications_status ON partner_applications(status);

-- Add comments for documentation
COMMENT ON COLUMN partner_applications.approved_at IS 'Timestamp when the application was approved or rejected';
COMMENT ON COLUMN partner_applications.approved_by IS 'User ID of the admin who approved or rejected the application';

-- Verify columns were added
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
AND table_name = 'partner_applications'
AND column_name IN ('approved_at', 'approved_by')
ORDER BY ordinal_position;
