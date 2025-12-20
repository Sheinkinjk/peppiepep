# ✅ Quick Start Migration Checklist

**Total Time**: ~5-10 minutes
**Difficulty**: Easy (copy-paste only)

---

## 🚀 Before You Start

- [ ] Open Supabase Dashboard: https://supabase.com/dashboard
- [ ] Select your **PRODUCTION** project
- [ ] Navigate to **SQL Editor** in left sidebar
- [ ] Have these files ready:
  - `supabase/migrations/20250321000000_stripe_integration.sql`
  - `supabase/migrations/20250321000001_admin_rbac_system.sql`
  - `VERIFY_MIGRATIONS.sql`

---

## 📋 Step-by-Step Checklist

### Step 1: Run Stripe Migration
- [ ] Click "New Query" in SQL Editor
- [ ] Open `20250321000000_stripe_integration.sql`
- [ ] Copy ALL 372 lines
- [ ] Paste into SQL Editor
- [ ] Click "Run" (Cmd/Ctrl + Enter)
- [ ] Wait ~30 seconds
- [ ] Verify you see success messages (CREATE TABLE, CREATE VIEW, etc.)

**Expected output**: 6 tables, 2 views, triggers, RLS policies created

---

### Step 2: Run Admin RBAC Migration
- [ ] Click "New Query" again
- [ ] Open `20250321000001_admin_rbac_system.sql`
- [ ] Copy ALL 264 lines
- [ ] Paste into SQL Editor
- [ ] Click "Run" (Cmd/Ctrl + Enter)
- [ ] Wait ~15 seconds
- [ ] Verify you see success messages (CREATE TABLE, CREATE FUNCTION, etc.)

**Expected output**: 2 tables, 4 functions, 1 INSERT (super_admin seed)

---

### Step 3: Run Verification
- [ ] Click "New Query" again
- [ ] Open `VERIFY_MIGRATIONS.sql`
- [ ] Copy entire file
- [ ] Paste into SQL Editor
- [ ] Click "Run" (Cmd/Ctrl + Enter)
- [ ] Review all check results

**Expected output**: "✅ ALL CHECKS PASSED - READY FOR PRODUCTION!"

---

### Step 4: Quick Verification Queries

Run these one at a time to double-check:

**Check 1: Stripe tables exist**
```sql
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public' AND table_name LIKE 'stripe_%';
```
- [ ] Returns 6 rows ✅

**Check 2: Super admin exists**
```sql
SELECT email, role, is_active FROM admin_roles
WHERE email = 'jarred@referlabs.com.au';
```
- [ ] Returns 1 row with role='super_admin' and is_active=true ✅

**Check 3: Views work**
```sql
SELECT * FROM ambassador_commission_balances LIMIT 1;
```
- [ ] Runs without error (may return 0 rows) ✅

---

### Step 5: Test in Application

**Test Admin Access**:
- [ ] Go to: https://peppiepep.vercel.app/login
- [ ] Log in as: `jarred@referlabs.com.au`
- [ ] Navigate to: `/dashboard/admin-master`
- [ ] Verify admin dashboard loads ✅
- [ ] Check for any console errors ✅

**Test Payout System**:
- [ ] Navigate to: `/dashboard/payouts`
- [ ] Verify page loads without errors ✅
- [ ] Check balance displays (even if $0.00) ✅
- [ ] No "REPLACE_WITH_ACTUAL_CUSTOMER_ID" errors ✅

---

## 🎉 Success Criteria

All boxes checked = Ready for production! 🚀

If ANY check fails, see `MIGRATION_TROUBLESHOOTING.md`

---

## ⏱️ Time Breakdown

| Task | Time |
|------|------|
| Open Supabase Dashboard | 30 seconds |
| Run Stripe migration | 1 minute |
| Run Admin RBAC migration | 1 minute |
| Run verification script | 1 minute |
| Test in application | 2-3 minutes |
| **Total** | **5-6 minutes** |

---

## 🔄 If Something Goes Wrong

1. **Don't panic** - migrations are safe to re-run
2. **Check** `MIGRATION_TROUBLESHOOTING.md`
3. **Re-run** verification script to see what's missing
4. **Most common issue**: User doesn't exist → Sign up first, then re-run admin migration

---

## 📞 Quick Help

**Error: "relation already exists"**
→ Safe to ignore, tables already created ✅

**Error: "user not found"**
→ Sign up at app first, then re-run admin migration

**Verification fails**
→ Check which specific check failed in verification output
→ Re-run that specific migration

---

## ✨ After Migrations Complete

You'll have:
- ✅ Complete Stripe payment infrastructure (6 tables)
- ✅ Commission tracking and payouts
- ✅ Admin role-based access control (RBAC)
- ✅ Secure Row Level Security (RLS) on all tables
- ✅ Helper functions and views for easy queries
- ✅ Audit logging for admin changes
- ✅ Production-ready database schema

**Your platform is now ready to launch!** 🎊

---

**Remember**: All code changes are already deployed to production.
This is just the database setup to match the code! 🚀
