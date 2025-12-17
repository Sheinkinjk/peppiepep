# URGENT: Vercel Environment Variable Fix Required

## 🚨 Critical Issue Found

The `ADMIN_REFERRAL_CODE` environment variable is **completely missing** from Vercel's production environment, causing the entire admin referral attribution system to fail.

## Impact

Without this variable:
- ❌ Admin referral link won't be detected
- ❌ Health monitoring endpoint fails (500 error)
- ❌ Dashboard Partner Referrals tab won't load data
- ❌ B2B partner attribution tracking is broken

## Required Action

### Step 1: Add Missing Environment Variable

1. Go to [Vercel Dashboard](https://vercel.com/jarred-krowitzs-projects/peppiepep/settings/environment-variables)

2. Click **"Add New"**

3. Enter the following details:
   ```
   Name: ADMIN_REFERRAL_CODE
   Value: Jn9wjbn2kQlO
   ```

   **⚠️ IMPORTANT:** Make sure there is NO trailing newline or whitespace after the value!

4. Select environments:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

5. Click **"Save"**

### Step 2: Fix Existing Variables with Trailing Newlines

The following environment variables have trailing `\n` characters and should be cleaned up:

1. **AMBASSADOR_API_SECRET**
   - Current value ends with: `...bc0b\n`
   - Fix: Remove the `\n`

2. **RESEND_REPLY_TO**
   - Current value ends with: `...dev\n`
   - Fix: Remove the `\n`

3. **RESEND_WEBHOOK_TOKEN**
   - Current value ends with: `...afb\n`
   - Fix: Remove the `\n`

4. **TWILIO_WEBHOOK_TOKEN**
   - Current value ends with: `...d281\n`
   - Fix: Remove the `\n`

**How to fix:**
1. Go to each environment variable in Vercel
2. Click "Edit"
3. Remove any trailing whitespace/newlines
4. Save

### Step 3: Redeploy

After adding/fixing environment variables:

1. Go to [Deployments](https://vercel.com/jarred-krowitzs-projects/peppiepep)
2. Click "Redeploy" on the latest deployment
3. Wait for deployment to complete

### Step 4: Verify Fix

Run this command to verify the fix worked:

```bash
curl https://referlabs.com.au/api/health/attribution | jq .
```

**Expected result:**
```json
{
  "healthy": true,
  "status": "good" or "no_data",
  "admin": {
    "code": "Jn9wjbn2kQlO",
    "customerId": "...",
    "name": "Jarred Krowitz",
    "email": "jarred@referlabs.com.au"
  }
}
```

**If still broken, check:**
- Environment variable has no trailing whitespace
- Redeployment completed successfully
- No typos in the value

## Alternative: Use Vercel CLI (Faster)

If you have Vercel CLI installed:

```bash
# Add the missing variable
vercel env add ADMIN_REFERRAL_CODE production
# When prompted, enter: Jn9wjbn2kQlO

# Trigger redeployment
vercel --prod
```

## Local Environment Check

For reference, your local environment is correctly configured:

**File:** `.env.local`
```
ADMIN_REFERRAL_CODE=Jn9wjbn2kQlO
```

The issue is **only in Vercel production environment**.

## Why This Happened

The environment variable was likely never added to Vercel, or was deleted at some point. The code has a fallback value (`"Jn9wjbn2kQlO"`), but if the environment variable exists with a newline, the fallback isn't used.

## Prevention

To prevent this in the future:

1. **Audit all environment variables** for trailing whitespace
2. **Use Vercel CLI** for setting variables programmatically
3. **Add environment variable validation** to CI/CD
4. **Document all required environment variables** in repository

## Reference

- Vercel Project: [peppiepep](https://vercel.com/jarred-krowitzs-projects/peppiepep)
- Project ID: `prj_4EBbfeQs6QP9bgYwi5MpnANW1NQn`
- QA Report: [QA_REPORT.md](./QA_REPORT.md)
- Dashboard Guide: [DASHBOARD_PARTNER_TRACKING_GUIDE.md](./DASHBOARD_PARTNER_TRACKING_GUIDE.md)

---

**Time to Fix:** ~5 minutes
**Priority:** 🔴 CRITICAL
**Required Before:** Go-live deployment
