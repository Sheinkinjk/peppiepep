# CI/CD Setup Instructions

## Overview
The E2E referral test suite has been created and is ready for CI integration. However, GitHub Actions workflows require special permissions to push.

## ✅ What's Already Deployed

**E2E Test Suite:** `tests/e2e-referral-flow.test.ts`
- 11 comprehensive end-to-end tests
- All tests passing (11/11 ✅)
- Tests complete referral journey from ambassador creation to reward distribution
- Deployed to https://peppiepep.vercel.app (commit e408042)

## 🔧 CI Workflows to Add

Two GitHub Actions workflow files have been created locally at:
- `.github/workflows/ci.yml` - Main CI pipeline
- `.github/workflows/pre-deploy.yml` - Pre-deployment checks

### Option 1: Add via GitHub Web UI (Recommended)

1. Go to your GitHub repository: https://github.com/Sheinkinjk/peppiepep
2. Click "Add file" → "Create new file"
3. Name it: `.github/workflows/ci.yml`
4. Copy the contents from `.github/workflows/ci.yml` (see below)
5. Commit directly to main branch
6. Repeat for `.github/workflows/pre-deploy.yml`

### Option 2: Push Locally (Requires PAT with workflow scope)

```bash
# Update your GitHub token to include 'workflow' scope
# Then run:
git add .github/workflows/
git commit -m "Add CI/CD workflows for automated testing"
git push origin main
```

## 📋 CI Workflow Contents

### File: `.github/workflows/ci.yml`

```yaml
name: CI - Build and Test

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  build:
    name: Build and Type Check
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run TypeScript type check
        run: npx tsc --noEmit

      - name: Build application
        run: npm run build
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}

  test:
    name: Run Tests
    runs-on: ubuntu-latest
    needs: build

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests
        run: npm test
        env:
          TEST_SUPABASE_URL: ${{ secrets.TEST_SUPABASE_URL }}
          TEST_SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.TEST_SUPABASE_SERVICE_ROLE_KEY }}

  e2e-referral:
    name: E2E Referral Flow Tests
    runs-on: ubuntu-latest
    needs: build
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run E2E referral flow tests
        run: npm test -- tests/e2e-referral-flow.test.ts
        env:
          TEST_SUPABASE_URL: ${{ secrets.TEST_SUPABASE_URL }}
          TEST_SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.TEST_SUPABASE_SERVICE_ROLE_KEY }}
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: e2e-test-results
          path: test-results/

  lint:
    name: Lint Code
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint
```

### File: `.github/workflows/pre-deploy.yml`

```yaml
name: Pre-Deployment Checks

on:
  push:
    branches: [main]

jobs:
  pre-deploy-checks:
    name: Run Pre-Deployment Checks
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Check for uncommitted changes
        run: |
          if [[ -n $(git status --porcelain) ]]; then
            echo "❌ Uncommitted changes detected!"
            git status
            exit 1
          fi
          echo "✅ No uncommitted changes"

      - name: TypeScript type check
        run: npx tsc --noEmit

      - name: Build check
        run: npm run build
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}

      - name: Run all tests
        run: npm test
        env:
          TEST_SUPABASE_URL: ${{ secrets.TEST_SUPABASE_URL }}
          TEST_SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.TEST_SUPABASE_SERVICE_ROLE_KEY }}
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}

      - name: E2E Referral Flow
        run: npm test -- tests/e2e-referral-flow.test.ts
        env:
          TEST_SUPABASE_URL: ${{ secrets.TEST_SUPABASE_URL }}
          TEST_SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.TEST_SUPABASE_SERVICE_ROLE_KEY }}
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}

      - name: Deployment readiness check
        run: |
          echo "✅ All pre-deployment checks passed!"
          echo "🚀 Ready to deploy to Vercel"

      - name: Notify on failure
        if: failure()
        run: |
          echo "❌ Pre-deployment checks failed!"
          echo "⚠️  Do not deploy until all checks pass"
          exit 1
```

## 🔐 Required GitHub Secrets

Add these secrets in your GitHub repository settings (Settings → Secrets and variables → Actions):

1. `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
2. `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
3. `TEST_SUPABASE_URL` - Test database URL (can be same as production for now)
4. `TEST_SUPABASE_SERVICE_ROLE_KEY` - Service role key for test operations

## ✅ Benefits Once Enabled

1. **Automated Testing:** Every push runs full test suite
2. **Build Verification:** Catches TypeScript and build errors
3. **E2E Coverage:** Complete referral flow tested on main branch
4. **Quality Gates:** PRs must pass tests before merge
5. **Deployment Safety:** Pre-deployment checks prevent broken code

## 📊 Test Coverage

The E2E suite tests:
- ✅ Business owner account creation
- ✅ Ambassador creation with referral codes
- ✅ Referral submission and tracking
- ✅ Referral completion and rewards
- ✅ Credit attribution to ambassadors
- ✅ Revenue calculations
- ✅ Multiple referrals per ambassador
- ✅ Owner operations (view, delete)
- ✅ Referral code validation
- ✅ Invalid code handling
- ✅ Ambassador deletion (soft delete)

## 🚀 Next Steps

1. Add the workflow files to GitHub (Option 1 or 2 above)
2. Add the required secrets to your repository
3. Push a commit to trigger the workflows
4. Verify the workflows run successfully in the Actions tab
5. All future pushes will automatically run tests!

## 📝 Manual Testing

You can always run tests locally:

```bash
# Run all tests
npm test

# Run only E2E tests
npm test -- tests/e2e-referral-flow.test.ts

# Run with coverage
npm test -- --coverage
```

---

**Status:** E2E tests deployed ✅ | CI workflows ready for manual addition ⏳
