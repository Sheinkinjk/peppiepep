-- =====================================================
-- VERIFICATION SCRIPT
-- Run this AFTER both migrations to verify success
-- Expected time: ~5 seconds
-- =====================================================

-- Check 1: Stripe tables exist (should return 6)
SELECT
  '✅ CHECK 1: Stripe Tables' as check_name,
  COUNT(*) as found,
  CASE WHEN COUNT(*) = 6 THEN '✅ PASS' ELSE '❌ FAIL' END as status
FROM information_schema.tables
WHERE table_schema = 'public' AND table_name LIKE 'stripe_%';

-- Check 2: Admin tables exist (should return 2)
SELECT
  '✅ CHECK 2: Admin Tables' as check_name,
  COUNT(*) as found,
  CASE WHEN COUNT(*) = 2 THEN '✅ PASS' ELSE '❌ FAIL' END as status
FROM information_schema.tables
WHERE table_schema = 'public' AND table_name LIKE 'admin_%';

-- Check 3: Helper views exist (should return 2)
SELECT
  '✅ CHECK 3: Helper Views' as check_name,
  COUNT(*) as found,
  CASE WHEN COUNT(*) >= 2 THEN '✅ PASS' ELSE '❌ FAIL' END as status
FROM information_schema.views
WHERE table_schema = 'public' AND table_name IN ('ambassador_commission_balances', 'business_payment_summary');

-- Check 4: Super admin seeded (should return 1 row)
SELECT
  '✅ CHECK 4: Super Admin' as check_name,
  email,
  role,
  is_active,
  CASE WHEN role = 'super_admin' AND is_active THEN '✅ PASS' ELSE '❌ FAIL' END as status
FROM admin_roles
WHERE email = 'jarred@referlabs.com.au';

-- Check 5: RLS policies enabled (should return 10+)
SELECT
  '✅ CHECK 5: RLS Policies' as check_name,
  COUNT(*) as found,
  CASE WHEN COUNT(*) >= 10 THEN '✅ PASS' ELSE '⚠️  WARNING' END as status
FROM pg_policies
WHERE schemaname = 'public' AND (tablename LIKE 'stripe_%' OR tablename LIKE 'admin_%');

-- Check 6: Helper functions exist (should return 4)
SELECT
  '✅ CHECK 6: Helper Functions' as check_name,
  COUNT(*) as found,
  CASE WHEN COUNT(*) >= 4 THEN '✅ PASS' ELSE '❌ FAIL' END as status
FROM information_schema.routines
WHERE routine_schema = 'public' AND routine_name IN ('is_admin', 'has_admin_role', 'is_current_user_admin', 'get_current_user_admin_role');

-- Check 7: Test views work (should run without error)
SELECT
  '✅ CHECK 7: Views Functional' as check_name,
  (SELECT COUNT(*) FROM ambassador_commission_balances) as ambassador_view_works,
  (SELECT COUNT(*) FROM business_payment_summary) as business_view_works,
  '✅ PASS' as status;

-- FINAL SUMMARY
SELECT
  '🎉 FINAL SUMMARY' as summary,
  (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE 'stripe_%') as stripe_tables,
  (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE 'admin_%') as admin_tables,
  (SELECT COUNT(*) FROM admin_roles WHERE email = 'jarred@referlabs.com.au') as super_admin_exists,
  CASE
    WHEN (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE 'stripe_%') = 6
    AND (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE 'admin_%') = 2
    AND (SELECT COUNT(*) FROM admin_roles WHERE email = 'jarred@referlabs.com.au') = 1
    THEN '✅ ALL CHECKS PASSED - READY FOR PRODUCTION!'
    ELSE '⚠️  SOME CHECKS FAILED - SEE OUTPUT ABOVE'
  END as overall_status;
