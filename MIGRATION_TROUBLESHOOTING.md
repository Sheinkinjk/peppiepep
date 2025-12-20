# 🔧 Migration Troubleshooting Guide

## Common Issues and Solutions

---

### ❌ Issue: "relation already exists"

**Error Message**:
```
ERROR: relation "stripe_customers" already exists
```

**Cause**: Tables already exist from a previous migration attempt.

**Solution**:
✅ **This is OK!** The migrations use `CREATE TABLE IF NOT EXISTS` so they're safe to re-run. You can ignore this error.

**Verification**: Run the verification script to confirm tables exist correctly:
```sql
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public' AND table_name LIKE 'stripe_%';
```

---

### ❌ Issue: "permission denied for schema public"

**Error Message**:
```
ERROR: permission denied for schema public
```

**Cause**: You're not using the correct Supabase account or don't have admin access.

**Solution**:
1. Make sure you're logged into **Supabase Dashboard**: https://supabase.com/dashboard
2. Select your **production project** (not staging/dev)
3. Use the **SQL Editor** (not external tools)
4. Make sure you're logged in as the project **owner** or **admin**

---

### ❌ Issue: No super_admin row inserted

**Error Message**: Verification shows 0 rows for super_admin check.

**Cause**: User `jarred@referlabs.com.au` doesn't exist in `auth.users` table yet.

**Solution**:
1. **First**, create an account in your production app:
   - Go to: https://peppiepep.vercel.app/login
   - Sign up with email: `jarred@referlabs.com.au`
   - Verify your email

2. **Then**, re-run the admin RBAC migration (just the INSERT part):
   ```sql
   INSERT INTO admin_roles (user_id, email, role, permissions, is_active, notes)
   SELECT
     id,
     email,
     'super_admin',
     '{"full_access": true, "can_grant_roles": true, "can_revoke_roles": true}'::jsonb,
     TRUE,
     'Initial super admin created during RBAC migration'
   FROM auth.users
   WHERE email = 'jarred@referlabs.com.au'
   ON CONFLICT (user_id) DO NOTHING;
   ```

3. **Verify** it worked:
   ```sql
   SELECT email, role, is_active FROM admin_roles
   WHERE email = 'jarred@referlabs.com.au';
   ```

---

### ❌ Issue: "function update_updated_at_column() does not exist"

**Error Message**:
```
ERROR: function update_updated_at_column() does not exist
```

**Cause**: The Stripe migration wasn't run first (it creates this function).

**Solution**:
1. **Run migrations in order**:
   - First: `20250321000000_stripe_integration.sql`
   - Second: `20250321000001_admin_rbac_system.sql`

2. The Stripe migration creates the `update_updated_at_column()` function that the admin migration needs.

---

### ❌ Issue: "constraint violates foreign key constraint"

**Error Message**:
```
ERROR: insert or update on table "admin_roles" violates foreign key constraint
```

**Cause**: Referenced tables don't exist yet.

**Solution**:
Make sure you've run the Stripe migration first, which creates the base tables and functions that other migrations depend on.

---

### ❌ Issue: RLS policies not working

**Symptom**: Users can see data they shouldn't be able to see.

**Solution**:
1. **Verify RLS is enabled**:
   ```sql
   SELECT tablename, rowsecurity
   FROM pg_tables
   WHERE schemaname = 'public'
   AND (tablename LIKE 'stripe_%' OR tablename LIKE 'admin_%');
   ```
   All tables should show `rowsecurity = true`

2. **Verify policies exist**:
   ```sql
   SELECT tablename, policyname
   FROM pg_policies
   WHERE schemaname = 'public'
   AND (tablename LIKE 'stripe_%' OR tablename LIKE 'admin_%')
   ORDER BY tablename;
   ```

3. **If policies are missing**, re-run the RLS section of the migration.

---

### ❌ Issue: Views return errors

**Error Message**:
```
ERROR: relation "stripe_commissions" does not exist
```

**Cause**: Base tables weren't created before views.

**Solution**:
Views depend on tables existing. Run the full Stripe migration again:
1. The migration creates tables first
2. Then creates views at the end
3. Views reference the tables created earlier in the same migration

---

### ❌ Issue: Admin dashboard shows "Unauthorized"

**Symptom**: After logging in as `jarred@referlabs.com.au`, admin dashboard redirects or shows unauthorized.

**Debugging Steps**:

1. **Check if admin role exists**:
   ```sql
   SELECT * FROM admin_roles WHERE email = 'jarred@referlabs.com.au';
   ```
   Should return 1 row with `role = 'super_admin'` and `is_active = true`

2. **Check if user_id matches**:
   ```sql
   SELECT
     u.id as user_id,
     u.email as user_email,
     ar.id as admin_role_id,
     ar.role as admin_role
   FROM auth.users u
   LEFT JOIN admin_roles ar ON ar.user_id = u.id
   WHERE u.email = 'jarred@referlabs.com.au';
   ```
   Should show matching user_id and admin_role

3. **Test the helper function**:
   ```sql
   SELECT is_admin(id) as is_admin_result
   FROM auth.users
   WHERE email = 'jarred@referlabs.com.au';
   ```
   Should return `true`

4. **If all checks pass but still unauthorized**, check application logs for errors.

---

### ❌ Issue: Payout page shows errors

**Symptom**: `/dashboard/payouts` page shows errors or doesn't load commission balance.

**Debugging Steps**:

1. **Check if commission balance view works**:
   ```sql
   SELECT * FROM ambassador_commission_balances LIMIT 5;
   ```
   Should run without error (may return 0 rows if no commissions yet)

2. **Check if API endpoint is accessible**:
   - Open browser console
   - Navigate to `/dashboard/payouts`
   - Check Network tab for `/api/commissions/balance` request
   - Look for 401/403/500 errors

3. **Verify RLS policies on stripe_commissions**:
   ```sql
   SELECT policyname, cmd, qual
   FROM pg_policies
   WHERE tablename = 'stripe_commissions';
   ```

---

### ⚠️ Issue: Migration runs but some features missing

**Symptom**: Migration completes but some tables/functions are missing.

**Solution**:
Run the comprehensive verification script to identify what's missing:

1. Copy contents of `VERIFY_MIGRATIONS.sql`
2. Paste into Supabase SQL Editor
3. Run the entire script
4. Review output to see which checks failed
5. Re-run the specific migration that failed

---

## 🔍 General Debugging Approach

If you encounter any issue:

1. **Run the verification script first**:
   - File: `VERIFY_MIGRATIONS.sql`
   - This will show you exactly what's missing

2. **Check migration order**:
   - Stripe migration MUST run before admin migration
   - Don't skip steps

3. **Read error messages carefully**:
   - They usually tell you exactly what's wrong
   - Look for table names, function names, or constraint names

4. **Use Supabase Logs**:
   - Dashboard → Logs
   - Look for errors related to your migrations

5. **Test incrementally**:
   - Don't run everything at once
   - Run one migration, verify it worked, then proceed

---

## 📞 Still Having Issues?

If you're still stuck:

1. **Run diagnostic query**:
   ```sql
   -- Shows current database state
   SELECT
     'Tables' as type,
     COUNT(*) as count
   FROM information_schema.tables
   WHERE table_schema = 'public'
   UNION ALL
   SELECT
     'Views' as type,
     COUNT(*) as count
   FROM information_schema.views
   WHERE table_schema = 'public'
   UNION ALL
   SELECT
     'Functions' as type,
     COUNT(*) as count
   FROM information_schema.routines
   WHERE routine_schema = 'public'
   UNION ALL
   SELECT
     'Policies' as type,
     COUNT(*) as count
   FROM pg_policies
   WHERE schemaname = 'public';
   ```

2. **Check Supabase status**: https://status.supabase.com

3. **Review the migration files** to understand what should exist

---

## ✅ Success Indicators

You'll know migrations succeeded when:

- ✅ All 6 Stripe tables exist
- ✅ All 2 admin tables exist
- ✅ 2 helper views work
- ✅ 4+ helper functions exist
- ✅ 10+ RLS policies configured
- ✅ Super admin row exists for your email
- ✅ Verification script shows "ALL CHECKS PASSED"

---

**Most issues are resolved by running migrations in the correct order and ensuring user accounts exist before seeding admin roles.**
