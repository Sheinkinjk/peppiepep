# Dashboard Error Troubleshooting Guide

## Current Status

You're experiencing a "Dashboard error - We couldn't load your dashboard" message when accessing:
https://referlabs.com.au/dashboard?section=clients-ambassadors&window=30

## What We've Verified ✅

1. **Build Status**: ✅ Build passes without errors
2. **TypeScript**: ✅ No type errors
3. **Database Tables**: ✅ All tables accessible (tested with script)
   - audit_logs: ✅ Working
   - businesses: ✅ Working
   - customers: ✅ Working
   - campaigns: ✅ Working
   - referrals: ✅ Working
   - admin_roles: ✅ Working
4. **Audit Logging**: ✅ Insert test successful
5. **Environment Variables**: ✅ All set correctly
6. **Authentication**: ✅ Redirect to login works for unauthenticated users

## Possible Causes

Since all database connectivity and builds are working, the error is likely:

### 1. **Migration Not Applied in Production**
The compliance migration adds columns to existing tables. If code tries to query these columns but they don't exist, it will fail.

**Solution**: Apply the compliance migration first
```sql
-- Run in Supabase SQL Editor:
-- File: supabase/migrations/20260112020001_compliance_idempotent.sql
```

### 2. **Cached Build or Stale Deployment**
Vercel might be serving an old version with bugs that have since been fixed.

**Solution**: Force a rebuild
```bash
# Option A: Push a dummy commit
git commit --allow-empty -m "trigger rebuild"
git push

# Option B: Redeploy via Vercel dashboard
```

### 3. **Browser Cache**
Your browser might be caching the error page.

**Solution**: Hard refresh
- Chrome/Edge: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Or open in incognito/private window

### 4. **Specific User Data Issue**
Your specific user account might have data that triggers an edge case.

**Solution**: Check Vercel logs for your specific user
- Go to Vercel Dashboard
- Click on your project
- Go to "Logs" or "Functions"
- Filter by time when you tried to access dashboard
- Look for error messages

## Immediate Steps to Debug

### Step 1: Check Vercel Deployment Status
1. Go to: https://vercel.com/sheinkinjks-projects/peppiepep
2. Check if latest deployment (commit 745bd15) is live
3. If not, click "Redeploy"

### Step 2: Check Vercel Function Logs
1. In Vercel dashboard, go to "Logs"
2. Filter to "Functions"
3. Try accessing the dashboard
4. Look for error traces

### Step 3: Apply Compliance Migration (If Not Applied)
1. Open: https://supabase.com/dashboard/project/ovpsgbstrdahrdcllswa/sql
2. Check if these tables exist:
   ```sql
   SELECT table_name FROM information_schema.tables
   WHERE table_schema = 'public'
   AND table_name IN (
     'service_provider_types',
     'partner_tiers',
     'partner_agreements',
     'partner_compliance_status'
   );
   ```
3. If they don't exist, run the compliance migration

### Step 4: Test with Different URL
Try accessing the dashboard without query parameters:
- https://referlabs.com.au/dashboard

If this works, the issue is specific to the query parameters `?section=clients-ambassadors&window=30`

### Step 5: Check Browser Console
1. Open browser DevTools (F12)
2. Go to Console tab
3. Try loading dashboard
4. Look for JavaScript errors (red messages)
5. Share any error messages you see

## What I Need From You

To help diagnose further, please provide:

1. **Screenshot of the error page** (especially if there are additional details)
2. **Browser console errors** (F12 → Console tab)
3. **Result of this SQL query**:
   ```sql
   SELECT table_name FROM information_schema.tables
   WHERE table_schema = 'public'
   AND table_name LIKE '%compliance%' OR table_name LIKE '%service%';
   ```
4. **Vercel deployment status**: Is commit `745bd15` deployed and live?
5. **Does it work without query parameters?**: https://referlabs.com.au/dashboard

## Quick Fixes to Try (In Order)

### Fix 1: Force Redeploy (30 seconds)
```bash
cd /Users/jarredkrowitz/Desktop/Peppiepep
git commit --allow-empty -m "force redeploy"
git push
```
Wait 2 minutes for deployment, then test.

### Fix 2: Apply ALL Missing Migrations (2 minutes)
Run both migrations in Supabase SQL Editor in this order:
1. `20260112020001_compliance_idempotent.sql` (18KB)
2. `20260113000000_audit_logs.sql` (Already applied ✓)

### Fix 3: Clear All Caches (10 seconds)
- Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Or try in Incognito/Private window

### Fix 4: Check Specific Error (via Vercel Logs)
Look for the actual error message in Vercel function logs to know exactly what's failing.

---

## Next Steps

Based on what we've verified, **the most likely issue is that the compliance migration hasn't been applied in production**. This is because:

1. The code references database structures
2. All local tests pass
3. Build passes
4. Only production shows the error

**Recommended Action**: Apply the compliance migration first, then redeploy if needed.
