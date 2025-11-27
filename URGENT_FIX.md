# 🚨 URGENT FIX - Dashboard Error 808386835

**Error:** "Application error: a server-side exception has occurred"
**URL:** https://peppiepep.vercel.app/dashboard

---

## What Happened

The deployment included new database columns (`website_url`, `custom_landing_url`) that don't exist yet in your Supabase database. When the dashboard tries to read these fields, it causes a server error.

---

## Quick Fix (2 Minutes)

### Step 1: Add Missing Database Columns

1. **Go to Supabase:**
   - Visit: https://supabase.com/dashboard
   - Select your Peppiepep project
   - Click **"SQL Editor"** in left sidebar

2. **Run This SQL:**
   ```sql
   -- Add missing columns to businesses table
   ALTER TABLE businesses
   ADD COLUMN IF NOT EXISTS website_url TEXT,
   ADD COLUMN IF NOT EXISTS custom_landing_url TEXT;

   -- Verify columns were added
   SELECT column_name, data_type
   FROM information_schema.columns
   WHERE table_name = 'businesses';
   ```

3. **Click "Run"**
   - You should see the columns listed in the results
   - Look for `website_url` and `custom_landing_url`

### Step 2: Verify Fix
1. Wait 10 seconds for database to update
2. Go to: https://peppiepep.vercel.app/dashboard
3. Dashboard should now load without errors!

---

## Alternative: Rollback Code (If SQL Doesn't Work)

If the SQL fix doesn't work immediately, I can rollback the code to remove the new fields:

1. Tell me and I'll push a hotfix
2. This will restore the old Settings page without the new fields
3. You can add the database columns later when ready

---

## Why This Happened

The deployment included code that reads `business.website_url` and `business.custom_landing_url`, but these columns don't exist in the database yet. This causes a server error when the Settings page tries to load.

**Normal Process:**
1. Add database columns first
2. Then deploy code that uses them

**What happened:**
1. Deployed code with new fields
2. Database columns don't exist yet
3. Server error when reading non-existent fields

---

## Vercel Logs (For Debugging)

If you want to see the exact error:
1. Go to https://vercel.com/dashboard
2. Click on Peppiepep project
3. Go to latest deployment
4. Click "View Function Logs"
5. Look for error message mentioning `website_url` or `custom_landing_url`

---

## Quick Commands

**To run the SQL migration:**
```sql
ALTER TABLE businesses
ADD COLUMN IF NOT EXISTS website_url TEXT,
ADD COLUMN IF NOT EXISTS custom_landing_url TEXT;
```

**To verify columns exist:**
```sql
SELECT * FROM information_schema.columns
WHERE table_name = 'businesses'
AND column_name IN ('website_url', 'custom_landing_url');
```

---

## Expected Result After Fix

Dashboard should load with:
- ✅ 4 premium tabs visible
- ✅ All features working
- ✅ Settings tab shows new Website URL and Custom Landing Page fields
- ✅ No more server errors

---

**Run the SQL migration now and your dashboard will be back online in 10 seconds!** 🚀

If it doesn't work, let me know and I'll create a rollback commit.
