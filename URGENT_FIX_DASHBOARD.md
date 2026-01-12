# 🚨 URGENT: Dashboard Fix Required

## Problem
The dashboard at https://referlabs.com.au/dashboard is not loading because:
1. Code was deployed that writes to `audit_logs` table
2. The `audit_logs` table doesn't exist in production database yet
3. When admin APIs try to create audit logs, they fail and break the dashboard

## Root Cause
- **Commit 49e6487** enabled database-backed audit logging
- **Migration file** exists but hasn't been applied to production: `/supabase/migrations/20260113000000_audit_logs.sql`
- Code is trying to insert into non-existent table

## Immediate Fix (5 minutes)

### Step 1: Apply the Audit Logs Migration

1. **Open Supabase SQL Editor**:
   - Go to: https://supabase.com/dashboard/project/ovpsgbstrdahrdcllswa/sql

2. **Copy the migration SQL**:
   - Open: `/supabase/migrations/20260113000000_audit_logs.sql`
   - Select ALL content (93 lines)
   - Copy to clipboard

3. **Run the migration**:
   - Paste into Supabase SQL Editor
   - Click "Run" button
   - Should see: "Success. No rows returned" (~2 seconds)

4. **Verify table was created**:
   ```sql
   SELECT COUNT(*) FROM audit_logs;
   ```
   Should return: `0` (table exists, no rows yet)

### Step 2: Test Dashboard
1. Visit: https://referlabs.com.au/dashboard
2. Dashboard should load normally now
3. Check that no error message appears

## Alternative: Temporary Rollback (If migration can't be applied immediately)

If you can't apply the migration right now, here's a quick rollback:

### Option A: Disable Audit Logging Temporarily

```bash
git revert 49e6487 --no-commit
git commit -m "temp: revert audit logging until migration applied"
git push
```

This will revert audit logging changes and restore console-only logging.

### Option B: Make Audit Logging More Resilient

Edit `src/lib/security.ts` to check if table exists first:

```typescript
export async function createAuditLog(params: {
  action: AuditAction;
  userId?: string;
  targetUserId?: string;
  targetResourceId?: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}): Promise<void> {
  try {
    const supabase = await createServiceClient();
    const ipAddress = params.ipAddress || (await getClientIp());
    const userAgent = params.userAgent || (await getUserAgent());

    // Try to insert, but don't fail if table doesn't exist
    const { error } = await supabase.from("audit_logs").insert({
      action: params.action,
      user_id: params.userId,
      target_user_id: params.targetUserId,
      target_resource_id: params.targetResourceId,
      metadata: params.metadata,
      ip_address: ipAddress,
      user_agent: userAgent,
    });

    if (error) {
      // Check if error is "relation does not exist" (table missing)
      if (error.message?.includes('relation "public.audit_logs" does not exist')) {
        console.warn("[AUDIT] Table audit_logs does not exist yet. Run migration: 20260113000000_audit_logs.sql");
      } else {
        console.error("Failed to create audit log:", error);
      }

      // Always fall back to console logging
      console.log("[AUDIT]", {
        action: params.action,
        user_id: params.userId,
        target_user_id: params.targetUserId,
        target_resource_id: params.targetResourceId,
        metadata: params.metadata,
        ip_address: ipAddress,
        user_agent: userAgent,
        created_at: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error("Error creating audit log:", error);
    // Don't throw - audit logging should not break the main flow
  }
}
```

## Recommended Solution

**Apply the migration** (Step 1 above) - this is the cleanest fix and takes 2 minutes.

## After Fix

Once the migration is applied:
1. Dashboard will work normally
2. Audit logs will be stored in database
3. You can view audit logs with:
   ```sql
   SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 10;
   ```

## Why This Happened

The deployment process was:
1. ✅ Created migration file
2. ✅ Updated TypeScript types
3. ✅ Enabled database-backed logging in code
4. ✅ Deployed to production (build passed)
5. ❌ **Forgot to apply migration to production database**

This is a common deployment issue - the code and migration are out of sync.

## Prevention

For future deployments:
1. Apply migrations BEFORE deploying code that uses them
2. Or: Use feature flags to enable features after migrations are applied
3. Or: Check if table exists before trying to use it

---

**TLDR**: Run the SQL in `/supabase/migrations/20260113000000_audit_logs.sql` in your Supabase dashboard, and the dashboard will work again.
