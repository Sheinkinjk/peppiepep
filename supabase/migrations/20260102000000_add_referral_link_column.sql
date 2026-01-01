-- Add referral_link as a generated column to customers table
-- This resolves the discrepancy where CSV exports include referral_link
-- but the database schema doesn't have this field

-- Add the computed referral_link column
ALTER TABLE customers
ADD COLUMN referral_link TEXT GENERATED ALWAYS AS (
  CASE
    WHEN referral_code IS NOT NULL
    THEN 'https://referlabs.com.au/r/' || referral_code
    ELSE NULL
  END
) STORED;

-- Add comment to document the column
COMMENT ON COLUMN customers.referral_link IS
'Auto-generated referral link based on referral_code. Format: https://referlabs.com.au/r/{referral_code}';

-- Create index for faster lookups if needed
CREATE INDEX IF NOT EXISTS idx_customers_referral_link ON customers(referral_link)
WHERE referral_link IS NOT NULL;
