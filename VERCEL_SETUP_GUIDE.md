# Complete Vercel Auto-Deployment Setup Guide

## The Problem

Your Vercel deployments build successfully but the production URL `peppiepep.vercel.app` doesn't automatically update to the latest deployment. This means:
- ✅ Code pushes to GitHub
- ✅ Vercel builds the code
- ❌ **Production URL still shows old version**

## Root Cause

The `vercel.json` file had `"github": { "silent": true }` which prevented automatic production alias updates.

## Solution (3 Steps)

### Step 1: Update vercel.json (Already Done ✅)

The `vercel.json` file has been updated to enable auto-aliasing:

```json
{
  "version": 2,
  "framework": "nextjs",
  "alias": [
    "peppiepep.vercel.app"
  ],
  "github": {
    "enabled": true,
    "autoAlias": true
  }
}
```

### Step 2: Configure Vercel Dashboard Settings

**You need to do this in the Vercel dashboard:**

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/dashboard
   - Select the `peppiepep` project

2. **Configure Production Branch:**
   - Click **Settings** (left sidebar)
   - Click **Git** section
   - Under "Production Branch", ensure it's set to `main`
   - Make sure "Automatically expose System Environment Variables" is enabled

3. **Configure Domains:**
   - Click **Settings** > **Domains**
   - Find `peppiepep.vercel.app` in the list
   - Click the three dots menu (⋮) next to it
   - Select **"Set as Production Domain"** if not already set
   - Verify it shows a checkmark or "Production" label

4. **Configure Deployment Settings:**
   - Click **Settings** > **Git**
   - Scroll to "Deploy Hooks" section
   - Under "Production Deployments":
     - ✅ Enable "Automatically deploy Production commits to production"
     - ✅ Enable "Auto-assign production domain"

5. **Save Changes:**
   - Click "Save" at the bottom of each section

### Step 3: Test the Auto-Deployment

After completing Steps 1-2, test the deployment:

```bash
# Make a small test change
echo "# Test" >> README.md

# Commit and push
git add README.md vercel.json
git commit -m "Test auto-deployment setup"
git push origin main

# Wait 1-2 minutes, then check
npx vercel inspect peppiepep.vercel.app
```

The deployment timestamp should match your push time.

## Verification Commands

```bash
# Check what production points to
npx vercel inspect peppiepep.vercel.app

# List recent deployments
npx vercel ls --yes | head -20

# Check current git commit
git log --oneline -1
```

## If Auto-Deployment Still Doesn't Work

If after following all steps, deployments still don't auto-update:

### Option A: Use the Deployment Script (Temporary Workaround)

```bash
./deploy.sh
```

This script automatically:
1. Pushes to GitHub
2. Waits for Vercel build
3. Updates the production alias
4. Verifies deployment

### Option B: Manual Alias Update

```bash
# Get latest deployment URL
npx vercel ls --yes | head -1

# Update alias (replace with actual URL)
npx vercel alias set <deployment-url> peppiepep.vercel.app
```

### Option C: Contact Vercel Support

If the issue persists:

1. Go to https://vercel.com/support
2. Describe the issue:
   ```
   Subject: Production domain not auto-updating for project "peppiepep"

   Issue: When I push to main branch, Vercel builds successfully
   but peppiepep.vercel.app doesn't automatically point to the
   latest deployment. I have to manually run:
   vercel alias set <deployment> peppiepep.vercel.app

   Project ID: prj_4EBbfeQs6QP9bgYwi5MpnANW1NQn
   GitHub Repo: github.com/Sheinkinjk/peppiepep
   ```

## Additional Vercel Dashboard Checks

### Check GitHub Integration

1. **Settings** > **Git**
2. Under "Connected Git Repository":
   - Should show: `github.com/Sheinkinjk/peppiepep`
   - Branch: `main`
3. If not connected:
   - Click "Connect Git Repository"
   - Select GitHub
   - Authorize Vercel
   - Select `Sheinkinjk/peppiepep` repository

### Check Build Settings

1. **Settings** > **General**
2. Verify:
   - **Framework Preset:** Next.js
   - **Build Command:** (leave default or `npm run build`)
   - **Output Directory:** (leave default or `.next`)
   - **Install Command:** (leave default or `npm install`)

### Check Environment Variables

1. **Settings** > **Environment Variables**
2. Ensure these are set for **Production**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Any other secrets your app needs

## Troubleshooting

### Issue: "Deployment succeeds but domain doesn't update"

**Solution:**
1. Check Vercel dashboard deployment logs
2. Look for alias assignment messages
3. If missing, manually trigger alias update:
   ```bash
   npx vercel alias set <latest-deployment> peppiepep.vercel.app
   ```

### Issue: "Build fails in Vercel"

**Solution:**
1. Check build logs in Vercel dashboard
2. Common fixes:
   ```bash
   # Clear Vercel cache
   npx vercel --force

   # Ensure dependencies are up to date
   npm install
   git add package-lock.json
   git commit -m "Update dependencies"
   git push
   ```

### Issue: "Changes take a long time to appear"

**Solution:**
- Clear browser cache: `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows)
- CDN propagation can take 1-5 minutes
- Check deployment URL directly first (from `vercel ls`)

## Best Practices Going Forward

1. **Always verify deployment after push:**
   ```bash
   git push origin main
   sleep 60  # Wait 1 minute
   npx vercel inspect peppiepep.vercel.app
   ```

2. **Use the deployment script for important changes:**
   ```bash
   ./deploy.sh
   ```

3. **Monitor deployments in Vercel dashboard:**
   - https://vercel.com/dashboard/deployments

4. **Keep vercel.json committed:**
   - The updated `vercel.json` with `autoAlias: true` must stay in git

## Expected Behavior After Fix

After completing this setup:

1. **Push to `main` branch:**
   ```bash
   git push origin main
   ```

2. **Vercel automatically:**
   - Detects the push
   - Builds the project
   - Deploys to production
   - **Updates `peppiepep.vercel.app` to point to new deployment**

3. **Within 2-3 minutes:**
   - Changes are live on `peppiepep.vercel.app`
   - No manual intervention needed

## Quick Reference

| Task | Command |
|------|---------|
| Check production deployment | `npx vercel inspect peppiepep.vercel.app` |
| List deployments | `npx vercel ls --yes` |
| Manual alias update | `npx vercel alias set <url> peppiepep.vercel.app` |
| Auto-deploy script | `./deploy.sh` |
| Vercel dashboard | https://vercel.com/dashboard |
| Force new deployment | `npx vercel --prod` |

---

**Last Updated:** December 7, 2025
**Status:** Configuration file updated, dashboard settings need manual configuration
