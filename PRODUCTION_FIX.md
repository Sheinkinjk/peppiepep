# Production Domain Fix - referlabs.com.au

## Problem Identified

**Production domain (referlabs.com.au) shows "Dashboard error"**
**Preview domain (peppiepep-30pdjz82y.vercel.app) works correctly**

## Root Cause

The production domain is serving a **stale/cached deployment** that contains the audit logging bug from commit `49e6487`. The preview URL has the latest fix from commit `745bd15`.

## Evidence

1. ✅ Preview URL works perfectly
2. ❌ Production domain fails
3. ✅ All database tables exist and work
4. ✅ Build passes locally
5. ✅ Audit logging code is fixed in latest commit
6. Different cache headers between domains

## Solution

### Step 1: Apply Compliance Migration (CRITICAL)

The compliance migration must be applied before any deployments:

1. Open Supabase SQL Editor: https://supabase.com/dashboard/project/ovpsgbstrdahrdcllswa/sql

2. Copy ALL content from: `supabase/migrations/20260112020001_compliance_idempotent.sql`

3. Paste and run in SQL Editor

4. Verify success:
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
Should return 4 tables.

### Step 2: Force Fresh Deployment

Option A: Via Git (Recommended)
```bash
cd /Users/jarredkrowitz/Desktop/Peppiepep

# Add cache busting commit
git commit --allow-empty -m "fix: force fresh deployment to referlabs.com.au domain"

# Push to trigger deployment
git push
```

Option B: Via Vercel Dashboard
1. Go to: https://vercel.com/sheinkinjks-projects/peppiepep
2. Find the deployment for commit `745bd15` (latest)
3. Click "..." menu → "Redeploy"
4. Select "Redeploy with existing Build Cache" unchecked
5. Click "Redeploy"

### Step 3: Clear Vercel Edge Cache

After deployment completes:

1. Go to Vercel dashboard → Your project
2. Click "Settings" → "Domains"
3. Find `referlabs.com.au`
4. Click "..." → "Purge Cache" (if available)

OR use Vercel CLI:
```bash
npx vercel env pull
npx vercel --prod
```

### Step 4: Verify Fix

After deployment (wait 2-3 minutes):

1. **Clear browser cache** (important!)
   - Chrome/Edge: Cmd/Ctrl + Shift + R
   - Or open incognito/private window

2. **Test production domain**:
   ```
   https://referlabs.com.au/dashboard
   ```

3. **Check debug endpoint** (as admin):
   ```
   https://referlabs.com.au/api/debug/env
   ```
   Verify all environment variables are set

4. **Test dashboard functions**:
   - [ ] Dashboard loads without error
   - [ ] Can view clients/ambassadors section
   - [ ] Can switch between tabs
   - [ ] No console errors

## What Was Fixed

### Commit 745bd15 Changes:
- Made audit logging resilient to missing tables
- Added PostgreSQL error code detection (42P01)
- Graceful fallback to console logging
- Clear warning messages instead of crashes

### Files Changed:
- `src/lib/security.ts` - Enhanced error handling
- `src/types/supabase.ts` - Added audit_logs types
- `src/app/api/debug/env/route.ts` - NEW debug endpoint

## Prevention

Going forward, to avoid this issue:

1. **Always apply migrations BEFORE deploying code that uses them**
2. **Test on preview URL before promoting to production**
3. **Use Vercel's deployment promotion workflow**
4. **Monitor Vercel function logs for errors**

## Rollback Plan (If Needed)

If the fix doesn't work:

```bash
# Revert to previous working state
git revert HEAD --no-commit
git commit -m "rollback: temporary revert while investigating"
git push
```

Then investigate using:
- Vercel function logs
- Debug endpoint: /api/debug/env
- Browser console errors (F12)

## Technical Details

### Why Preview Works But Production Doesn't

Vercel creates separate deployments for:
- **Production branch (main)**: Deployed to custom domain (referlabs.com.au)
- **Preview branches**: Deployed to preview URLs

When code is pushed, Vercel:
1. Builds the new version
2. Deploys to preview URL immediately
3. Promotes to production domain **after** checks pass
4. **BUT**: Can serve stale cache on production domain

The production domain may have:
- Cached the error page
- Not received the latest deployment
- Different environment variables
- Edge cache serving old content

### Why Audit Logging Broke Production

Timeline:
1. Commit `49e6487`: Enabled DB audit logging WITHOUT checking if table exists
2. Code tried to INSERT into non-existent `audit_logs` table
3. PostgreSQL returned error: "relation does not exist"
4. Error wasn't caught gracefully → dashboard crashed
5. Commit `745bd15`: Added error handling → dashboard works
6. Preview got `745bd15` → works ✅
7. Production still cached `49e6487` → broken ❌

---

## TL;DR - Quick Fix

```bash
# 1. Apply migration in Supabase SQL Editor
# (Run supabase/migrations/20260112020001_compliance_idempotent.sql)

# 2. Force fresh deployment
git commit --allow-empty -m "fix: force refresh for referlabs.com.au"
git push

# 3. Wait 2-3 minutes

# 4. Hard refresh browser (Cmd+Shift+R)

# 5. Test: https://referlabs.com.au/dashboard
```

**Expected result**: Dashboard loads successfully ✅
