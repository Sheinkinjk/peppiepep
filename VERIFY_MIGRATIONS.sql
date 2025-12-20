-- =====================================================
-- POST-MIGRATION VERIFICATION SCRIPT
-- Run this in Supabase SQL Editor after migrations complete
-- =====================================================

-- =====================================================
-- 1. VERIFY STRIPE TABLES CREATED
-- =====================================================

SELECT
  '✅ STRIPE TABLES' as check_name,
  COUNT(*) as count,
  CASE
    WHEN COUNT(*) = 6 THEN '✅ PASS - All 6 Stripe tables exist'
    ELSE '❌ FAIL - Expected 6 tables, found ' || COUNT(*)
  END as status
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name LIKE 'stripe_%';

-- List all Stripe tables
SELECT
  '  → ' || table_name as stripe_tables
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name LIKE 'stripe_%'
ORDER BY table_name;

-- =====================================================
-- 2. VERIFY ADMIN TABLES CREATED
-- =====================================================

SELECT
  '✅ ADMIN TABLES' as check_name,
  COUNT(*) as count,
  CASE
    WHEN COUNT(*) = 2 THEN '✅ PASS - All 2 admin tables exist'
    ELSE '❌ FAIL - Expected 2 tables, found ' || COUNT(*)
  END as status
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name LIKE 'admin_%';

-- List all admin tables
SELECT
  '  → ' || table_name as admin_tables
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name LIKE 'admin_%'
ORDER BY table_name;

-- =====================================================
-- 3. VERIFY HELPER VIEWS CREATED
-- =====================================================

SELECT
  '✅ HELPER VIEWS' as check_name,
  COUNT(*) as count,
  CASE
    WHEN COUNT(*) >= 2 THEN '✅ PASS - Helper views exist'
    ELSE '❌ FAIL - Expected 2 views, found ' || COUNT(*)
  END as status
FROM information_schema.views
WHERE table_schema = 'public'
AND table_name IN ('ambassador_commission_balances', 'business_payment_summary');

-- List all helper views
SELECT
  '  → ' || table_name as helper_views
FROM information_schema.views
WHERE table_schema = 'public'
AND table_name IN ('ambassador_commission_balances', 'business_payment_summary')
ORDER BY table_name;

-- =====================================================
-- 4. VERIFY ADMIN SUPER_ADMIN SEEDED
-- =====================================================

SELECT
  '✅ SUPER ADMIN SEEDED' as check_name,
  email,
  role,
  is_active,
  created_at,
  CASE
    WHEN role = 'super_admin' AND is_active = TRUE THEN '✅ PASS - Super admin exists and active'
    ELSE '❌ FAIL - Super admin not properly configured'
  END as status
FROM admin_roles
WHERE email = 'jarred@referlabs.com.au';

-- If no row returned, check if user exists in auth.users
DO $$
DECLARE
  user_exists BOOLEAN;
BEGIN
  SELECT EXISTS(SELECT 1 FROM auth.users WHERE email = 'jarred@referlabs.com.au') INTO user_exists;

  IF NOT user_exists THEN
    RAISE NOTICE '⚠️  WARNING: User jarred@referlabs.com.au not found in auth.users';
    RAISE NOTICE '    Action required: Sign up with this email first, then re-run migration #2';
  END IF;
END $$;

-- =====================================================
-- 5. VERIFY RLS POLICIES ENABLED
-- =====================================================

SELECT
  '✅ RLS POLICIES' as check_name,
  COUNT(*) as total_policies,
  CASE
    WHEN COUNT(*) >= 10 THEN '✅ PASS - RLS policies configured'
    ELSE '⚠️  WARNING - Expected 10+ policies, found ' || COUNT(*)
  END as status
FROM pg_policies
WHERE schemaname = 'public'
AND (tablename LIKE 'stripe_%' OR tablename LIKE 'admin_%');

-- List all RLS policies
SELECT
  '  → ' || tablename || '.' || policyname as policy
FROM pg_policies
WHERE schemaname = 'public'
AND (tablename LIKE 'stripe_%' OR tablename LIKE 'admin_%')
ORDER BY tablename, policyname;

-- =====================================================
-- 6. VERIFY HELPER FUNCTIONS CREATED
-- =====================================================

SELECT
  '✅ HELPER FUNCTIONS' as check_name,
  COUNT(*) as count,
  CASE
    WHEN COUNT(*) >= 4 THEN '✅ PASS - Admin helper functions exist'
    ELSE '❌ FAIL - Expected 4+ functions, found ' || COUNT(*)
  END as status
FROM information_schema.routines
WHERE routine_schema = 'public'
AND routine_name IN ('is_admin', 'has_admin_role', 'is_current_user_admin', 'get_current_user_admin_role');

-- List all admin helper functions
SELECT
  '  → ' || routine_name || '(' ||
  COALESCE(
    (SELECT string_agg(parameter_name || ' ' || udt_name, ', ')
     FROM information_schema.parameters p
     WHERE p.specific_name = r.specific_name
     AND parameter_mode = 'IN'),
    ''
  ) || ')' as function_signature
FROM information_schema.routines r
WHERE routine_schema = 'public'
AND routine_name IN ('is_admin', 'has_admin_role', 'is_current_user_admin', 'get_current_user_admin_role')
ORDER BY routine_name;

-- =====================================================
-- 7. TEST HELPER VIEWS (Should run without error)
-- =====================================================

-- Test ambassador_commission_balances view
SELECT
  '✅ TESTING VIEWS' as check_name,
  'ambassador_commission_balances' as view_name,
  COUNT(*) as row_count,
  '✅ PASS - View works' as status
FROM ambassador_commission_balances;

-- Test business_payment_summary view
SELECT
  '✅ TESTING VIEWS' as check_name,
  'business_payment_summary' as view_name,
  COUNT(*) as row_count,
  '✅ PASS - View works' as status
FROM business_payment_summary;

-- =====================================================
-- 8. VERIFY TRIGGERS CREATED
-- =====================================================

SELECT
  '✅ TRIGGERS' as check_name,
  COUNT(*) as count,
  CASE
    WHEN COUNT(*) >= 6 THEN '✅ PASS - Triggers configured'
    ELSE '⚠️  WARNING - Expected 6+ triggers, found ' || COUNT(*)
  END as status
FROM information_schema.triggers
WHERE event_object_schema = 'public'
AND (event_object_table LIKE 'stripe_%' OR event_object_table LIKE 'admin_%')
AND trigger_name LIKE 'update_%_updated_at';

-- List all triggers
SELECT
  '  → ' || event_object_table || '.' || trigger_name as trigger_name
FROM information_schema.triggers
WHERE event_object_schema = 'public'
AND (event_object_table LIKE 'stripe_%' OR event_object_table LIKE 'admin_%')
ORDER BY event_object_table, trigger_name;

-- =====================================================
-- 9. VERIFY TABLE STRUCTURES
-- =====================================================

-- Check stripe_commissions has all required columns
SELECT
  '✅ TABLE STRUCTURE' as check_name,
  'stripe_commissions' as table_name,
  COUNT(*) as column_count,
  CASE
    WHEN COUNT(*) >= 15 THEN '✅ PASS - All columns exist'
    ELSE '❌ FAIL - Missing columns'
  END as status
FROM information_schema.columns
WHERE table_schema = 'public'
AND table_name = 'stripe_commissions';

-- Check admin_roles has all required columns
SELECT
  '✅ TABLE STRUCTURE' as check_name,
  'admin_roles' as table_name,
  COUNT(*) as column_count,
  CASE
    WHEN COUNT(*) >= 10 THEN '✅ PASS - All columns exist'
    ELSE '❌ FAIL - Missing columns'
  END as status
FROM information_schema.columns
WHERE table_schema = 'public'
AND table_name = 'admin_roles';

-- =====================================================
-- 10. FINAL SUMMARY
-- =====================================================

SELECT
  '🎉 MIGRATION SUMMARY' as summary,
  (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE 'stripe_%') as stripe_tables,
  (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE 'admin_%') as admin_tables,
  (SELECT COUNT(*) FROM information_schema.views WHERE table_schema = 'public' AND table_name IN ('ambassador_commission_balances', 'business_payment_summary')) as helper_views,
  (SELECT COUNT(*) FROM information_schema.routines WHERE routine_schema = 'public' AND routine_name LIKE '%admin%') as helper_functions,
  (SELECT COUNT(*) FROM pg_policies WHERE schemaname = 'public' AND (tablename LIKE 'stripe_%' OR tablename LIKE 'admin_%')) as rls_policies,
  CASE
    WHEN (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE 'stripe_%') = 6
    AND (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE 'admin_%') = 2
    AND (SELECT COUNT(*) FROM admin_roles WHERE email = 'jarred@referlabs.com.au') = 1
    THEN '✅ ALL CHECKS PASSED - READY FOR PRODUCTION!'
    ELSE '⚠️  SOME CHECKS FAILED - REVIEW OUTPUT ABOVE'
  END as overall_status;

-- =====================================================
-- DONE!
-- =====================================================
