# Pepform - Referrals that compound

### Deployment issue log

We discovered that Vercel was still serving an old build (the hero still shows “Private beta / Trusted by …” despite the updated Tiffany design). Locally, `npm run build` succeeds and the hero uses the new copy/gradients. To unblock future deploys from this repo:

1. Ensure this workspace is linked to the right project (`peppiepep98`) by running `npx vercel pull --yes --environment=production`.
2. Delete `.next` if present and rebuild: `npm run build`.
3. Deploy from here with `npx vercel --prod`. The resulting preview should show the updated UI; once confirmed, promote it to production.

If the production site still shows the old badge after the new build finishes, flush browser cache or test in a private window—the prefetcher might have cached the prior bundle.

## Referral flow testing

We ship a Vitest integration that provisions temporary businesses and ambassadors, simulates a referral submission, and asserts that the referral is linked to the correct ambassador. To keep production data clean, point the test runner at a staging Supabase project:

1. Create a new Supabase project (or branch) dedicated to automated tests.
2. Add env vars before running the tests:

   ```bash
   export TEST_SUPABASE_URL="https://<staging-project>.supabase.co"
   export TEST_SUPABASE_SERVICE_ROLE_KEY="<staging-service-role>"
   ```

3. Run the suite locally:

   ```bash
   npm install
   npm run test
   ```

The test file lives at `tests/referral-flow.test.ts`. It creates unique records and cleans up after itself, but it **will refuse to run** unless the `TEST_*` variables are defined so we never touch production data by mistake.
# Dashboard improvements deployed - build 1766533375
