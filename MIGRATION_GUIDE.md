# Complete Supabase Migration Guide

## Current Situation

✅ **Your application is deployed and working**
⚠️ **Migrations cannot run automatically** due to:
1. Supabase access token showing "Unauthorized"
2. Direct database connection blocked by IPv6 routing issues
3. Supabase CLI version is outdated (v2.58.5, latest is v2.67.1)

## Fixed Issues

✅ Updated `POSTGRES_URL_NON_POOLING` to use correct direct connection format:
```bash
# Before (WRONG):
POSTGRES_URL_NON_POOLING="postgresql://postgres.ovpsgbstrdahrdcllswa:Sipabasepeppieper@aws-0-ap-southeast-2.pooler.supabase.com:5432/postgres"

# After (CORRECT):
POSTGRES_URL_NON_POOLING="postgresql://postgres:Sipabasepeppieper@db.ovpsgbstrdahrdcllswa.supabase.co:5432/postgres"
```

Now you need to sync this to Vercel production.

## Solutions (Choose One)

### Option 1: Apply Migrations via Supabase Dashboard ⭐ RECOMMENDED

This is the **easiest and most reliable** method:

**Steps:**

1. **Go to SQL Editor:**
   - https://supabase.com/dashboard/project/ovpsgbstrdahrdcllswa/editor/sql

2. **Check which migrations are already applied:**
   ```sql
   SELECT * FROM _supabase_migrations
   ORDER BY executed_at DESC;
   ```

3. **For each migration file in `supabase/migrations/` that's NOT in the list:**
   - Open the file from your local directory
   - Copy the SQL content
   - Paste into the SQL Editor
   - Click "Run"
   - Verify it succeeded

4. **Pending migration files to check:**
   ```
   supabase/migrations/20250306110000_business_onboarding_metadata.sql
   supabase/migrations/20250306131500_business_sign_on_bonus.sql
   supabase/migrations/20250306140000_partner_applications.sql
   supabase/migrations/20250321000000_stripe_integration.sql
   supabase/migrations/20250321000001_admin_rbac_system.sql
   supabase/migrations/20250324000000_credit_ledger.sql
   supabase/migrations/20250324000001_referrals_is_manual.sql
   supabase/migrations/20260102000000_add_referral_link_column.sql
   supabase/migrations/add_partner_approval_fields.sql
   supabase/migrations/create_campaigns_table.sql
   ```

**Pros:**
- ✅ Works 100% reliably
- ✅ No CLI or network issues
- ✅ Full control and visibility
- ✅ Can test queries before running

**Cons:**
- Manual process (but only needed when you have new migrations)

---

### Option 2: Fix Supabase CLI Authentication

**Steps:**

1. **Update Supabase CLI to latest version:**
   ```bash
   npm install -g supabase@latest
   # Or update in your project
   npm install --save-dev supabase@latest
   ```

2. **Generate a new access token:**
   - Go to https://supabase.com/dashboard/account/tokens
   - Click "Generate new token"
   - Give it a name like "Migration Token"
   - Copy the token (starts with `sbp_`)

3. **Update the token in `.env.local`:**
   ```bash
   SUPABASE_ACCESS_TOKEN="sbp_YOUR_NEW_TOKEN_HERE"
   ```

4. **Login with the new token:**
   ```bash
   SUPABASE_ACCESS_TOKEN="sbp_YOUR_NEW_TOKEN" ./node_modules/.bin/supabase login
   ```

5. **Link the project:**
   ```bash
   SUPABASE_ACCESS_TOKEN="sbp_YOUR_NEW_TOKEN" ./node_modules/.bin/supabase link --project-ref ovpsgbstrdahrdcllswa
   ```

6. **Test the migration:**
   ```bash
   ./node_modules/.bin/supabase db push
   ```

**Pros:**
- ✅ Automatic migrations during deployment
- ✅ Proper CLI integration

**Cons:**
- Requires token regeneration
- May still have network/IPv6 issues

---

### Option 3: Use Alternative Migration Script

Use the `scripts/run-migrations-manual.mjs` script that bypasses the CLI:

**Steps:**

1. **Ensure you have the service role key:**
   ```bash
   # Already in .env.local
   SUPABASE_SERVICE_ROLE_KEY="sb_secret_HGjUulKB9KyNgWDbiG0cBw_8Paci8sZ"
   ```

2. **Run the migration script:**
   ```bash
   node scripts/run-migrations-manual.mjs
   ```

**Note:** This script may need refinement to work properly with your migration files.

**Pros:**
- ✅ Bypasses CLI authentication
- ✅ Uses API instead of direct database connection

**Cons:**
- Script is experimental and may need debugging
- Doesn't track migration history automatically

---

## Immediate Action Required

### Update Vercel Production Environment

The fixed `POSTGRES_URL_NON_POOLING` needs to be synced to Vercel:

```bash
# Remove old value
npx vercel env rm POSTGRES_URL_NON_POOLING production

# Add corrected value
echo "postgresql://postgres:Sipabasepeppieper@db.ovpsgbstrdahrdcllswa.supabase.co:5432/postgres" | npx vercel env add POSTGRES_URL_NON_POOLING production
```

---

## Understanding the Connection URLs

Your project has **THREE** types of database connections:

### 1. Pooled Connection (Application Runtime)
```bash
POSTGRES_URL="postgresql://postgres.ovpsgbstrdahrdcllswa:Sipabasepeppieper@aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true"
```
- **User format:** `postgres.PROJECT_ID`
- **Host:** `aws-0-ap-southeast-2.pooler.supabase.com`
- **Port:** 6543 (PgBouncer)
- **Use for:** Application queries (Next.js API routes, server actions)

### 2. Prisma Pooled Connection (Application with Connection Limit)
```bash
POSTGRES_PRISMA_URL="postgresql://postgres.ovpsgbstrdahrdcllswa:Sipabasepeppieper@aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
```
- Same as above but with connection_limit=1 for Prisma
- **Use for:** Prisma ORM queries

### 3. Direct Connection (Migrations & Admin)
```bash
POSTGRES_URL_NON_POOLING="postgresql://postgres:Sipabasepeppieper@db.ovpsgbstrdahrdcllswa.supabase.co:5432/postgres"
```
- **User format:** `postgres` (no project ID suffix)
- **Host:** `db.ovpsgbstrdahrdcllswa.supabase.co` (direct database)
- **Port:** 5432 (standard PostgreSQL)
- **Use for:** Migrations, database schema changes, admin operations

---

## Why Migrations Are Failing

1. **Access Token Issue:**
   ```
   Unexpected error retrieving remote project status: {"message":"Unauthorized"}
   ```
   - The token may be expired
   - The token may not have management API permissions
   - **Solution:** Generate new token with proper permissions

2. **Network/IPv6 Issue:**
   ```
   dial tcp [2406:da14:271:9901:ded6:e11e:834c:fe8c]:5432: connect: no route to host
   ```
   - IPv6 connection is being blocked
   - Direct database access may be disabled in Supabase project settings
   - **Solution:** Use Supabase Dashboard instead of direct connection

---

## Recommended Path Forward

**For now:**
1. ✅ Use **Option 1** (Supabase Dashboard) to apply any critical migrations manually
2. ✅ Update `POSTGRES_URL_NON_POOLING` in Vercel production (see command above)
3. ✅ Your deployments will continue to work fine

**For long-term:**
1. Update Supabase CLI to latest version
2. Generate new access token
3. Test if migrations work with updated CLI
4. If still failing, continue using Dashboard method (perfectly fine!)

---

## Migration Files Reference

Located in: `supabase/migrations/`

Check which are applied:
```sql
SELECT name, executed_at FROM _supabase_migrations ORDER BY name;
```

Apply missing ones via Dashboard SQL Editor.

---

## Summary

**Current Status:**
- ✅ Application deployed and running
- ✅ All environment variables synced
- ✅ Deploy script won't block on migration failures
- ⚠️ Migrations need manual application OR CLI fix

**Next Step:**
Choose **Option 1** (Dashboard) for immediate needs, or **Option 2** (fix CLI) for automation.
