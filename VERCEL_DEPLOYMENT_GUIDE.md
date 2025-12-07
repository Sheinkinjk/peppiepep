# Vercel Deployment Guide

## Issue: Failed Production Deployments

### Root Cause
Vercel deployment failures were occurring because **partial commits** left the repository in an inconsistent state:

1. **Deleted files** (e.g., demo routes) weren't removed in commits
2. **New dependencies** in package.json weren't committed with the code that uses them
3. **New files** (components, utilities) weren't included in feature commits
4. **File references** pointed to deleted or uncommitted files

### Solution: Atomic Commits

Always commit **all related changes together** in a single atomic commit:

```bash
# ❌ BAD - Partial commit (causes deployment failures)
git add src/components/NewFeature.tsx
git commit -m "Add new feature"
git push

# ✅ GOOD - Atomic commit with all changes
git add -A
git status  # Review all changes
npm run build  # Verify build succeeds locally
git commit -m "Add new feature with all dependencies"
git push
```

## Pre-Deployment Checklist

Before pushing to production, **always** run these commands:

### 1. Check for Uncommitted Changes
```bash
git status
```

Look for:
- ❌ Deleted files (lines starting with `D`)
- ❌ Modified files not staged (red text)
- ❌ Untracked files (new components, utilities)

### 2. Verify Local Build
```bash
npm run build
```

- Must complete without errors
- Check output for all expected routes
- No TypeScript errors
- No missing dependencies

### 3. Stage All Changes
```bash
# Stage everything
git add -A

# Or selectively stage related files
git add package.json package-lock.json src/components/Feature.tsx
```

### 4. Commit with Descriptive Message
```bash
git commit -m "Descriptive message covering all changes"
```

### 5. Push to Production
```bash
git push origin main
```

## Common Failure Scenarios

### Scenario 1: Deleted Demo Files
**Problem:** Demo routes deleted locally but not committed
**Solution:**
```bash
git add src/app/api/demo-dashboard/route.ts  # Stage deletion
git add -A  # Or stage all changes
git commit -m "Remove demo features"
```

### Scenario 2: New Dependencies
**Problem:** Added new npm packages but didn't commit package.json
**Solution:**
```bash
git add package.json package-lock.json
git commit -m "Add dependencies for new feature"
```

### Scenario 3: File References
**Problem:** New code references files that aren't committed
**Solution:**
```bash
# Always commit referenced files together
git add src/lib/new-utility.ts src/components/ComponentUsingUtility.tsx
git commit -m "Add utility and component together"
```

## Monitoring Deployments

### Check Deployment Status
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select the `peppiepep` project
3. View recent deployments
4. Check build logs for errors

### Failed Deployment Email
If you receive "Failed production deployment":

1. **Don't panic** - the previous deployment is still live
2. Check Vercel logs for specific error
3. Fix locally and test with `npm run build`
4. Commit ALL related changes
5. Push again

## Best Practices

### 1. Commit Frequently
- Commit after completing each feature
- Don't accumulate 50+ uncommitted files
- Use meaningful commit messages

### 2. Test Locally First
```bash
npm run build  # Always test before committing
npm run dev    # Verify in development
```

### 3. Review Before Pushing
```bash
git status           # See what's changing
git diff             # Review actual changes
git log --oneline -5 # Check recent commits
```

### 4. Group Related Changes
Commit together:
- ✅ New component + its utility functions
- ✅ API route + its types
- ✅ Feature + updated tests
- ✅ Code changes + package.json updates
- ✅ File deletions + files that referenced them

### 5. Use Descriptive Messages
```bash
# ❌ Bad
git commit -m "fix"
git commit -m "update"

# ✅ Good
git commit -m "Add rate limiting to campaign endpoints (5 req/min)"
git commit -m "Remove demo features and add production chatbot"
```

## Emergency Rollback

If a deployment fails and causes issues:

```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or reset to specific commit
git reset --hard <commit-sha>
git push --force origin main  # Use with caution!
```

## Vercel-Specific Tips

### Environment Variables
- Set in Vercel Dashboard → Settings → Environment Variables
- Not in git (use .env.local for local dev)
- Redeploy after changing env vars

### Build Settings
- Framework: Next.js
- Node version: 20.x (automatic)
- Build command: `npm run build` (default)
- Output directory: `.next` (default)

### Cache Issues
If seeing stale code:
1. Clear Vercel cache: Dashboard → Settings → Clear Cache
2. Redeploy: Dashboard → Deployments → Redeploy

## Quick Reference

```bash
# Complete deployment workflow
git status                    # Check changes
npm run build                 # Test locally
git add -A                    # Stage all
git commit -m "Description"   # Commit
git push origin main          # Deploy
```

## Summary

**Golden Rule:** Never commit partial changes that break the build.

Always ensure:
- ✅ All files committed together
- ✅ Build succeeds locally
- ✅ No deleted file references
- ✅ Dependencies in package.json
- ✅ Descriptive commit message

Following this guide will prevent "Failed production deployment" emails and ensure smooth deployments to https://peppiepep.vercel.app.
