-- =====================================================
-- FIX ADMIN ACCESS FOR MASTER DASHBOARD
-- Run this in Supabase SQL Editor to diagnose and fix admin access
-- =====================================================

-- STEP 1: Check if your user exists in auth.users
SELECT
  '1️⃣ USER EXISTS CHECK' as step,
  id as user_id,
  email,
  created_at,
  email_confirmed_at,
  last_sign_in_at
FROM auth.users
WHERE email = 'jarred@referlabs.com.au';

-- STEP 2: Check if admin role exists
SELECT
  '2️⃣ ADMIN ROLE CHECK' as step,
  ar.id,
  ar.user_id,
  ar.email,
  ar.role,
  ar.is_active,
  ar.revoked_at,
  ar.created_at
FROM admin_roles ar
WHERE ar.email = 'jarred@referlabs.com.au';

-- STEP 3: Check ALL admin roles (to see if any exist)
SELECT
  '3️⃣ ALL ADMIN ROLES' as step,
  COUNT(*) as total_admin_roles
FROM admin_roles;

-- STEP 4: If admin role doesn't exist, create it manually
-- (This will only work if you're logged in as the user or have service role access)
INSERT INTO admin_roles (user_id, email, role, permissions, is_active, notes)
SELECT
  id,
  email,
  'super_admin',
  '{"full_access": true, "can_grant_roles": true, "can_revoke_roles": true}'::jsonb,
  TRUE,
  'Manual super admin creation - troubleshooting dashboard access'
FROM auth.users
WHERE email = 'jarred@referlabs.com.au'
ON CONFLICT (user_id)
DO UPDATE SET
  role = 'super_admin',
  is_active = TRUE,
  revoked_at = NULL,
  updated_at = NOW(),
  notes = 'Re-activated during troubleshooting';

-- STEP 5: Verify the fix worked
SELECT
  '✅ VERIFICATION' as step,
  ar.user_id,
  ar.email,
  ar.role,
  ar.is_active,
  u.email as user_email_confirmed,
  CASE
    WHEN ar.is_active = TRUE AND ar.revoked_at IS NULL THEN '✅ ADMIN ACCESS GRANTED'
    ELSE '❌ ADMIN ACCESS DENIED'
  END as status
FROM admin_roles ar
JOIN auth.users u ON u.id = ar.user_id
WHERE ar.email = 'jarred@referlabs.com.au';

-- STEP 6: Test the helper function
SELECT
  '6️⃣ HELPER FUNCTION TEST' as step,
  is_admin(id) as is_admin_result,
  has_admin_role(id, 'super_admin') as has_super_admin_role
FROM auth.users
WHERE email = 'jarred@referlabs.com.au';

-- =====================================================
-- TROUBLESHOOTING NOTES:
-- =====================================================
-- If STEP 1 returns no rows:
--   → You need to sign up first at https://peppiepep.vercel.app/signup
--   → Use the email: jarred@referlabs.com.au
--
-- If STEP 2 returns no rows but STEP 4 succeeded:
--   → Admin role has been created, try accessing /dashboard/admin-master again
--
-- If STEP 2 shows is_active = FALSE:
--   → Admin role exists but is deactivated
--   → STEP 4 should have reactivated it
--
-- If you still can't access the dashboard after running this:
--   → Log out and log back in
--   → Clear browser cache
--   → Check browser console for errors
-- =====================================================
