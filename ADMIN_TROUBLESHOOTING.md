# Admin Dashboard Button Troubleshooting Guide

## Issue
Admin Dashboard and Admin Payments buttons not appearing for jarred@referlabs.com.au

## Quick Diagnosis

### Step 1: Check Admin Status
Visit this URL while logged in as jarred@referlabs.com.au:
```
https://referlabs.com.au/api/admin/debug
```

This will show you:
- Current user authentication status
- Admin role query results
- Whether `getCurrentAdmin()` is working
- All admin roles in the database

### Step 2: Expected Response
You should see:
```json
{
  "status": "success",
  "currentUser": {
    "id": "...",
    "email": "jarred@referlabs.com.au"
  },
  "adminRoleQuery": {
    "found": true,
    "data": { ... }
  },
  "getCurrentAdminResult": {
    "isAdmin": true,
    "admin": { ... }
  }
}
```

## If Admin Role Not Found

The admin role may not be seeded in the production database. Run this SQL in Supabase SQL Editor:

```sql
-- Check if admin role exists
SELECT * FROM admin_roles WHERE email = 'jarred@referlabs.com.au';

-- If no result, seed the admin role:
INSERT INTO admin_roles (user_id, email, role, permissions, is_active, notes)
SELECT
  id,
  email,
  'super_admin',
  '{"full_access": true, "can_grant_roles": true, "can_revoke_roles": true}'::jsonb,
  TRUE,
  'Super admin - system owner'
FROM auth.users
WHERE email = 'jarred@referlabs.com.au'
ON CONFLICT (user_id)
DO UPDATE SET
  role = 'super_admin',
  is_active = TRUE,
  revoked_at = NULL,
  updated_at = NOW();

-- Verify the role was created:
SELECT * FROM admin_roles WHERE email = 'jarred@referlabs.com.au';
```

### After Seeding

1. Hard refresh the dashboard page (Cmd+Shift+R or Ctrl+Shift+F5)
2. You should now see both buttons:
   - "Master Admin Dashboard" (purple button)
   - "Admin Payments" (blue button)

## How the Admin Button Works

Location: [src/app/dashboard/page.tsx:1808-1825](src/app/dashboard/page.tsx#L1808-L1825)

```typescript
// Line 235: Check admin status
const currentAdmin = await getCurrentAdmin();

// Lines 1808-1825: Conditional rendering
{currentAdmin && (
  <div className="mb-6 flex gap-4 justify-end">
    <Link href="/dashboard/admin-master">
      Master Admin Dashboard
    </Link>
    <Link href="/dashboard/admin-payments">
      Admin Payments
    </Link>
  </div>
)}
```

The buttons only show if `getCurrentAdmin()` returns a valid admin object, which requires:
1. User is authenticated
2. Admin role exists in `admin_roles` table
3. Role has `is_active = true`
4. Role has `revoked_at IS NULL`

## Common Issues

### Issue 1: Database Not Seeded
**Symptom:** Debug endpoint shows `"found": false`
**Fix:** Run the SQL script above to seed the admin role

### Issue 2: Cache/Session Issue
**Symptom:** Admin role exists but buttons don't show
**Fix:**
1. Log out completely
2. Clear browser cookies for referlabs.com.au
3. Log back in
4. Hard refresh the dashboard

### Issue 3: RLS Policies Blocking Access
**Symptom:** SQL query works but API returns nothing
**Fix:** Check RLS policies on `admin_roles` table:
```sql
-- This should exist:
CREATE POLICY "Service role can read all admin roles"
ON admin_roles FOR SELECT
TO service_role
USING (true);
```

## Verification Checklist

After fixing:
- [ ] Navigate to `/api/admin/debug` - shows `"isAdmin": true`
- [ ] Dashboard shows "Master Admin Dashboard" button
- [ ] Dashboard shows "Admin Payments" button
- [ ] Clicking "Master Admin Dashboard" → redirects to `/dashboard/admin-master` (not login page)
- [ ] Clicking "Admin Payments" → redirects to `/dashboard/admin-payments` (not login page)

## Production Environment Check

Verify these environment variables are set in Vercel:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key (for server-side admin queries)

Missing the service role key will cause `getCurrentAdmin()` to fail.

## Still Not Working?

If the above doesn't work:

1. Check Vercel deployment logs for errors
2. Check browser console for JavaScript errors
3. Verify the latest code is deployed (commit `ebedfba` or later)
4. Contact support with the output from `/api/admin/debug`
