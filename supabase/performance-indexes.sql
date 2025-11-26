-- Performance Optimization Indexes for Peppiepep
-- Run this to add additional performance indexes beyond the base schema
-- Apply with: Run in Supabase SQL Editor

-- ============================================================================
-- EXISTING INDEXES (Already in schema.sql - for reference)
-- ============================================================================
-- ✅ customers_business_id_idx on customers(business_id)
-- ✅ customers_referral_code_idx on customers(referral_code)
-- ✅ referrals_business_id_idx on referrals(business_id)
-- ✅ referrals_ambassador_id_idx on referrals(ambassador_id)

-- ============================================================================
-- ADDITIONAL PERFORMANCE INDEXES
-- ============================================================================

-- Index for finding pending referrals by business (dashboard view)
CREATE INDEX IF NOT EXISTS referrals_business_status_idx
ON public.referrals (business_id, status)
WHERE status = 'pending';

-- Index for finding referrals by status and created date (recent first)
CREATE INDEX IF NOT EXISTS referrals_status_created_idx
ON public.referrals (status, created_at DESC);

-- Index for customer lookups by phone (for referral matching)
CREATE INDEX IF NOT EXISTS customers_phone_idx
ON public.customers (phone)
WHERE phone IS NOT NULL;

-- Index for customer lookups by email
CREATE INDEX IF NOT EXISTS customers_email_idx
ON public.customers (email)
WHERE email IS NOT NULL;

-- Index for active customers with credits (for ambassador portal)
CREATE INDEX IF NOT EXISTS customers_status_credits_idx
ON public.customers (business_id, status, credits DESC)
WHERE status = 'active' AND credits > 0;

-- Index for businesses by owner (faster dashboard loads)
CREATE INDEX IF NOT EXISTS businesses_owner_id_idx
ON public.businesses (owner_id);

-- Composite index for referral analytics
CREATE INDEX IF NOT EXISTS referrals_business_ambassador_created_idx
ON public.referrals (business_id, ambassador_id, created_at DESC);

-- Index for demo referrals by creation date (for analytics)
CREATE INDEX IF NOT EXISTS demo_referrals_created_idx
ON public.demo_referrals (created_at DESC);

-- Index for demo referrals by source (tracking where referrals come from)
CREATE INDEX IF NOT EXISTS demo_referrals_source_idx
ON public.demo_referrals (source)
WHERE source IS NOT NULL;

-- ============================================================================
-- PERFORMANCE STATISTICS
-- ============================================================================
-- After running these indexes, you can check their usage with:
-- SELECT schemaname, tablename, indexname, idx_scan
-- FROM pg_stat_user_indexes
-- WHERE schemaname = 'public'
-- ORDER BY idx_scan DESC;

-- ============================================================================
-- VACUUM AND ANALYZE (Optional - run periodically)
-- ============================================================================
-- Run these commands to optimize database performance:
-- VACUUM ANALYZE public.businesses;
-- VACUUM ANALYZE public.customers;
-- VACUUM ANALYZE public.referrals;
-- VACUUM ANALYZE public.demo_referrals;

-- Note: Supabase automatically runs VACUUM on a schedule, but you can
-- run it manually after bulk operations (like CSV imports)
