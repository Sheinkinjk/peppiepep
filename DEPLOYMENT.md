# Pepform Deployment Guide

## The Problem

Vercel creates a new deployment for every push to the `main` branch, but **the production domain `peppiepep.vercel.app` does not automatically update to point to the latest deployment**. This means:

- ✅ Code is pushed to GitHub
- ✅ Vercel builds successfully
- ❌ **But the production URL still shows old code**

## Why This Happens

The `vercel.json` configuration has `"github": { "silent": true }` which prevents automatic alias updates. Additionally, Vercel may not automatically assign the production domain alias to new deployments.

## Solution Options

### Option 1: Use the Automated Script (Recommended)

We've created a deployment script that handles everything automatically:

```bash
./deploy.sh
```

This script will:
1. Push your changes to GitHub
2. Wait for Vercel to build
3. Automatically update the production alias to the latest deployment
4. Verify the deployment is live

### Option 2: Manual Deployment Process

If you prefer to do it manually:

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

2. **Wait for Vercel to build** (check https://vercel.com/dashboard)

3. **Get the latest deployment URL:**
   ```bash
   npx vercel ls --yes | head -30
   ```

4. **Manually update the production alias:**
   ```bash
   npx vercel alias set <deployment-url> peppiepep.vercel.app
   ```

   Example:
   ```bash
   npx vercel alias set peppiepep-q5y1reobn-jarred-krowitzs-projects.vercel.app peppiepep.vercel.app
   ```

5. **Verify it worked:**
   ```bash
   npx vercel inspect peppiepep.vercel.app
   ```

### Option 3: Fix the Vercel Configuration (Long-term Fix)

To enable automatic production deployments, you can either:

**A. Update vercel.json:**

Remove the `"silent": true` setting:

```json
{
  "version": 2,
  "framework": "nextjs",
  "alias": [
    "peppiepep.vercel.app"
  ],
  "github": {
    "enabled": true
  }
}
```

**B. Configure in Vercel Dashboard:**

1. Go to https://vercel.com/dashboard
2. Select the `peppiepep` project
3. Go to Settings → Domains
4. Ensure `peppiepep.vercel.app` is set as the production domain
5. Go to Settings → Git
6. Ensure "Production Branch" is set to `main`
7. Enable "Automatically assign production domain to latest deployment"

## Verification

After any deployment, verify it worked:

```bash
# Check what the production domain points to
npx vercel inspect peppiepep.vercel.app

# The "created" timestamp should match your latest push
```

## Quick Reference

| Command | Purpose |
|---------|---------|
| `./deploy.sh` | Automated deployment with alias update |
| `npx vercel ls` | List all deployments |
| `npx vercel inspect peppiepep.vercel.app` | Check production deployment |
| `npx vercel alias set <url> peppiepep.vercel.app` | Manually update production |
| `git log --oneline -5` | Check recent commits |

## Troubleshooting

### "Changes aren't showing on peppiepep.vercel.app"

1. Check the deployment list: `npx vercel ls --yes | head -30`
2. Find the latest deployment (should be at the top, marked "Production")
3. Run: `npx vercel inspect peppiepep.vercel.app`
4. Compare the "created" timestamp - if it's old, the alias needs updating
5. Use `./deploy.sh` or manually update the alias

### "Deployment failed"

1. Check GitHub Actions: https://github.com/Sheinkinjk/peppiepep/actions
2. Check Vercel dashboard for build logs
3. Ensure all environment variables are set in Vercel

### "DNS propagation is slow"

- Clear your browser cache (Cmd+Shift+R on Mac)
- Try in incognito/private mode
- Wait 5-10 minutes for CDN to update
- Check the direct deployment URL (works immediately)

## Best Practices

1. **Always use `./deploy.sh`** for production deployments
2. **Verify deployment** before telling users changes are live
3. **Check the timestamp** in `npx vercel inspect peppiepep.vercel.app`
4. **Clear browser cache** when testing
5. **Use direct deployment URLs** for immediate testing

## Environment Variables

Ensure these are set in Vercel dashboard:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Any other secrets needed by the app

---

**Last Updated:** December 7, 2025
**Issue Status:** Workaround implemented with `deploy.sh`
