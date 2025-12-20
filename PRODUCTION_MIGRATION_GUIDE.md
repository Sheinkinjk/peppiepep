# 🚀 Production Database Migration Guide

## Overview
This guide will walk you through running the two critical database migrations required for production launch.

---

## ⚠️ IMPORTANT: Pre-Migration Checklist

Before running migrations, ensure:
- [ ] You have access to your Supabase Dashboard
- [ ] You're logged in to the **production** project (not staging/dev)
- [ ] You have admin/owner access to run SQL queries
- [ ] You've backed up your database (optional but recommended)

---

## 📋 Migration #1: Stripe Integration

### What This Does
Creates all database tables required for the payment system:
- 6 Stripe tables (customers, payments, commissions, payouts, connect_accounts, webhook_events)
- 2 helper views for commission balances and payment summaries
- Full Row Level Security (RLS) policies
- Automated triggers for updated_at timestamps

### Steps to Run

1. **Open Supabase SQL Editor**
   - Go to: https://supabase.com/dashboard
   - Select your **production project**
   - Click **"SQL Editor"** in the left sidebar
   - Click **"New Query"**

2. **Copy the SQL**
   - Open: `supabase/migrations/20250321000000_stripe_integration.sql`
   - Copy the **entire file** (372 lines)

3. **Paste and Run**
   - Paste the SQL into the editor
   - Click **"Run"** (or press Cmd/Ctrl + Enter)
   - Wait for completion (~10-30 seconds)

4. **Verify Success**
   You should see messages like:
   ```
   ✅ CREATE TABLE stripe_customers
   ✅ CREATE TABLE stripe_payments
   ✅ CREATE TABLE stripe_commissions
   ✅ CREATE TABLE stripe_payouts
   ✅ CREATE TABLE stripe_connect_accounts
   ✅ CREATE TABLE stripe_webhook_events
   ✅ CREATE VIEW ambassador_commission_balances
   ✅ CREATE VIEW business_payment_summary
   ```

---

## 📋 Migration #2: Admin RBAC System

### What This Does
Implements role-based access control for admin users:
- Creates `admin_roles` table with 4 role types
- Creates `admin_role_audit_log` for tracking changes
- Adds helper functions (is_admin, has_admin_role, etc.)
- **Automatically seeds jarred@referlabs.com.au as super_admin**
- Full RLS policies for secure access

### Steps to Run

1. **In the same SQL Editor**
   - Click **"New Query"** again

2. **Copy the SQL**
   - Open: `supabase/migrations/20250321000001_admin_rbac_system.sql`
   - Copy the **entire file** (264 lines)

3. **Paste and Run**
   - Paste the SQL into the editor
   - Click **"Run"** (or press Cmd/Ctrl + Enter)
   - Wait for completion (~5-15 seconds)

4. **Verify Success**
   You should see messages like:
   ```
   ✅ CREATE TABLE admin_roles
   ✅ CREATE TABLE admin_role_audit_log
   ✅ CREATE FUNCTION is_admin
   ✅ CREATE FUNCTION has_admin_role
   ✅ CREATE FUNCTION is_current_user_admin
   ✅ CREATE FUNCTION get_current_user_admin_role
   ✅ INSERT 1 row (super_admin seed)
   ```

---

## ✅ Post-Migration Verification

### 1. Verify Stripe Tables Exist

Run this query in SQL Editor:
```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name LIKE 'stripe_%'
ORDER BY table_name;
```

**Expected result**: 6 tables
- stripe_commissions
- stripe_connect_accounts
- stripe_customers
- stripe_payments
- stripe_payouts
- stripe_webhook_events

---

### 2. Verify Admin Role Seeded

Run this query in SQL Editor:
```sql
SELECT email, role, is_active, created_at
FROM admin_roles
WHERE email = 'jarred@referlabs.com.au';
```

**Expected result**:
| email | role | is_active | created_at |
|-------|------|-----------|------------|
| jarred@referlabs.com.au | super_admin | true | [timestamp] |

---

### 3. Verify RLS Policies Active

Run this query in SQL Editor:
```sql
SELECT tablename, policyname
FROM pg_policies
WHERE tablename LIKE 'stripe_%' OR tablename LIKE 'admin_%'
ORDER BY tablename, policyname;
```

**Expected result**: Multiple RLS policies for each table

---

### 4. Verify Helper Views Work

Run this query in SQL Editor:
```sql
SELECT * FROM ambassador_commission_balances LIMIT 1;
SELECT * FROM business_payment_summary LIMIT 1;
```

**Expected result**: Query runs without error (may return 0 rows if no data yet)

---

## 🧪 Test the Application

After migrations complete, test these features:

### Test Admin Access
1. Log in to the app as `jarred@referlabs.com.au`
2. Navigate to `/dashboard/admin-master`
3. Verify you can access the admin dashboard
4. Check that the dashboard loads without errors

### Test Payout System
1. Log in as any customer/ambassador
2. Navigate to `/dashboard/payouts`
3. Verify the page loads without errors
4. Check that balance shows (even if $0.00)

---

## 🚨 Troubleshooting

### Error: "relation already exists"
**Solution**: Tables already exist. This is OK! The migrations use `CREATE TABLE IF NOT EXISTS` so they're safe to re-run.

### Error: "permission denied"
**Solution**: Make sure you're using the SQL Editor in your Supabase Dashboard, which has full admin access.

### Error: "jarred@referlabs.com.au user not found"
**Solution**: Make sure you've created an account with this email in production first. Sign up at your app's login page.

### No super_admin row inserted
**Solution**: The seed query only inserts if the user exists. Check:
```sql
SELECT id, email FROM auth.users WHERE email = 'jarred@referlabs.com.au';
```
If no row exists, create an account first, then re-run migration #2.

---

## 📊 Migration Summary

| Migration | Tables Created | Views Created | Functions Created | Time |
|-----------|----------------|---------------|-------------------|------|
| **Stripe Integration** | 6 | 2 | 1 | ~30s |
| **Admin RBAC** | 2 | 0 | 4 | ~15s |
| **Total** | **8** | **2** | **5** | **~45s** |

---

## ✨ Next Steps After Migration

1. **Test Payment Flows**
   - Create a test commission
   - Request a test payout
   - Verify Stripe webhook logging

2. **Add More Admins** (if needed)
   - Use the admin dashboard to grant roles
   - Or run SQL:
   ```sql
   INSERT INTO admin_roles (user_id, email, role, granted_by, is_active)
   SELECT
     id,
     'admin@example.com',
     'admin',
     (SELECT id FROM auth.users WHERE email = 'jarred@referlabs.com.au'),
     TRUE
   FROM auth.users
   WHERE email = 'admin@example.com';
   ```

3. **Monitor Production**
   - Check application logs for errors
   - Monitor Stripe webhook events table
   - Verify RLS is working correctly

---

## 🎉 You're Ready to Launch!

Once both migrations complete successfully and verification passes, your production database is ready for launch! 🚀

All code changes are already deployed to: https://peppiepep.vercel.app

The platform now has:
- ✅ Complete Stripe payment infrastructure
- ✅ Scalable admin role system
- ✅ Commission tracking and payouts
- ✅ Secure RLS policies
- ✅ Audit logging for admin changes

**Happy launching!** 🎊
