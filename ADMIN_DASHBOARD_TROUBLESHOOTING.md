# Admin Dashboard Troubleshooting Guide

**Issue:** Master Admin Dashboard redirects to `/dashboard` instead of loading
**URL:** https://peppiepep.vercel.app/dashboard/admin-master or https://referlabs.com.au/dashboard/admin-master

---

## 🔍 Root Cause Analysis

The redirect is happening in [src/lib/admin-auth.ts:66](src/lib/admin-auth.ts#L66):

```typescript
export async function requireAdmin(): Promise<AdminUser> {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect('/dashboard');  // ⬅️ THIS IS CAUSING THE REDIRECT
  }

  return admin;
}
```

The `getCurrentAdmin()` function returns `null` when:
1. User is not logged in, OR
2. User is logged in BUT doesn't have an entry in the `admin_roles` table

---

## ✅ Solution Steps

### Option 1: Run Fix SQL (RECOMMENDED - 30 seconds)

1. **Log into Supabase Dashboard**
   - Go to: https://supabase.com/dashboard/project/ovpsgbstrdahrdcllswa
   - Navigate to: SQL Editor

2. **Open the Fix SQL File**
   - File: [FIX_ADMIN_ACCESS.sql](FIX_ADMIN_ACCESS.sql)

3. **Copy and Paste the ENTIRE file into SQL Editor**

4. **Click "Run"**

5. **Review the Output:**
   - ✅ Step 1: Should show your user exists in `auth.users`
   - ✅ Step 2: Should show your admin role (or create it if missing)
   - ✅ Step 5: Should show "✅ ADMIN ACCESS GRANTED"

6. **Test the Dashboard:**
   - Go to: https://peppiepep.vercel.app/dashboard/admin-master
   - Should now load the admin dashboard instead of redirecting

---

### Option 2: Use Debug Endpoint (ADVANCED)

If you want to diagnose the issue programmatically:

1. **Deploy the latest changes to Vercel**
   ```bash
   git push
   ```

2. **Access the debug endpoint:**
   - URL: https://peppiepep.vercel.app/api/admin/debug
   - This will show:
     - Current user information
     - Admin role status
     - All admin roles in the database
     - Stripe configuration status

3. **Review the JSON output:**
   ```json
   {
     "currentUser": {
       "id": "...",
       "email": "jarred@referlabs.com.au"
     },
     "adminRoleQuery": {
       "found": false,  // ⬅️ If false, admin role is missing
       "error": "..."
     },
     "getCurrentAdminResult": {
       "isAdmin": false  // ⬅️ If false, you can't access admin dashboard
     }
   }
   ```

---

## 🔐 Why This Happened

The admin role seeding in [RUN_THIS_SECOND_admin.sql:77-80](RUN_THIS_SECOND_admin.sql#L77-L80) uses this query:

```sql
INSERT INTO admin_roles (user_id, email, role, permissions, is_active, notes)
SELECT id, email, 'super_admin', '{"full_access": true}'::jsonb, TRUE, 'Initial super admin'
FROM auth.users WHERE email = 'jarred@referlabs.com.au'
ON CONFLICT (user_id) DO NOTHING;
```

**This query only works if:**
1. A user with email `jarred@referlabs.com.au` exists in `auth.users`
2. The email is EXACTLY `jarred@referlabs.com.au` (case-sensitive)

**If the user didn't exist when you ran the migration:**
- The SELECT finds 0 rows
- The INSERT adds 0 rows
- No admin role is created
- Dashboard redirects because you're not an admin

---

## 🧪 Testing After Fix

### Test 1: Admin Dashboard Access
- URL: https://peppiepep.vercel.app/dashboard/admin-master
- Expected: Dashboard loads with platform-wide metrics
- Shows: Total businesses, customers, payments, commissions, etc.

### Test 2: Admin API Endpoints
All these should return data (not 401 Unauthorized):
- `/api/admin/analytics` - Platform metrics
- `/api/admin/commissions` - All commissions
- `/api/admin/payments` - All payments
- `/api/admin/export?type=payments` - CSV export

### Test 3: Non-Admin User
- Log in as a different user (not jarred@referlabs.com.au)
- Try to access `/dashboard/admin-master`
- Expected: Redirects to `/dashboard` (this is correct behavior)

---

## 🔧 Alternative: Manual Admin Grant (If SQL Doesn't Work)

If the SQL script doesn't work, you can manually insert the admin role using Supabase Table Editor:

1. **Go to Supabase Dashboard → Database → Tables**
2. **Select `admin_roles` table**
3. **Click "Insert row"**
4. **Fill in:**
   - `user_id`: Copy from auth.users table (your user ID)
   - `email`: jarred@referlabs.com.au
   - `role`: super_admin
   - `permissions`: `{"full_access": true, "can_grant_roles": true, "can_revoke_roles": true}`
   - `is_active`: true
   - `revoked_at`: (leave blank/null)
5. **Click "Save"**

---

## 📝 Verification Checklist

After running the fix:

- [ ] Log in as jarred@referlabs.com.au
- [ ] Navigate to `/dashboard/admin-master`
- [ ] Dashboard loads without redirect
- [ ] Can see platform-wide metrics
- [ ] Can see all businesses listed
- [ ] No console errors in browser DevTools
- [ ] Admin API endpoints return data (test with `/api/admin/analytics`)

---

## 🚨 If Still Not Working

If the dashboard still redirects after running the fix:

1. **Check Browser Console** (F12 → Console tab)
   - Look for authentication errors
   - Look for API 401 errors

2. **Log Out and Log Back In**
   - Sometimes the session needs to refresh
   - Clear cookies if needed

3. **Verify Email Matches Exactly**
   - Check that your user email is exactly `jarred@referlabs.com.au`
   - No extra spaces, different casing, etc.

4. **Check RLS Policies**
   - The admin_roles table has RLS enabled
   - Make sure the service role can access it
   - The policies should allow users to see their own admin role

5. **Check Supabase Logs**
   - Go to Supabase Dashboard → Logs
   - Look for errors when accessing admin_roles table

---

## 💡 Future Prevention

To prevent this issue in the future:

1. **Always create admin user FIRST** before running admin migrations
2. **Verify admin seeding** after running migrations:
   ```sql
   SELECT * FROM admin_roles WHERE email = 'jarred@referlabs.com.au';
   ```
3. **Use the debug endpoint** to verify admin status after deployments

---

## 📞 Need Help?

If you're still stuck after trying these steps:

1. Run the debug endpoint and share the output
2. Check Supabase logs for errors
3. Verify you're logged in to the correct account
4. Make sure you're accessing the production site (not localhost)

---

**Last Updated:** 2025-12-21
**Status:** Solution provided - awaiting user testing
