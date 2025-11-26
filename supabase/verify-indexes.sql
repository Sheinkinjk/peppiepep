-- Verify Database Indexes
-- Run this in Supabase SQL Editor to check all indexes are created

-- ============================================================================
-- CHECK ALL INDEXES
-- ============================================================================

SELECT
  schemaname,
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;

-- ============================================================================
-- EXPECTED INDEXES
-- ============================================================================

-- businesses table:
-- - businesses_pkey (primary key)
-- - businesses_owner_id_idx

-- customers table:
-- - customers_pkey (primary key)
-- - customers_business_id_idx ✓
-- - customers_referral_code_idx ✓
-- - customers_referral_code_key (unique constraint)
-- - customers_phone_idx
-- - customers_email_idx
-- - customers_status_credits_idx

-- referrals table:
-- - referrals_pkey (primary key)
-- - referrals_business_id_idx ✓
-- - referrals_ambassador_id_idx ✓
-- - referrals_business_status_idx
-- - referrals_status_created_idx
-- - referrals_business_ambassador_created_idx

-- demo_referrals table:
-- - demo_referrals_pkey (primary key)
-- - demo_referrals_created_idx
-- - demo_referrals_source_idx

-- ============================================================================
-- CHECK INDEX USAGE (After running for a while)
-- ============================================================================

SELECT
  schemaname,
  tablename,
  indexname,
  idx_scan as times_used,
  pg_size_pretty(pg_relation_size(indexrelid)) as index_size
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
ORDER BY idx_scan DESC, tablename;

-- High idx_scan = index is being used (good!)
-- Low idx_scan = index might not be needed (consider removing)

-- ============================================================================
-- CHECK TABLE SIZES
-- ============================================================================

SELECT
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS total_size,
  pg_size_pretty(pg_relation_size(schemaname||'.'||tablename)) AS table_size,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename) -
    pg_relation_size(schemaname||'.'||tablename)) AS indexes_size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
