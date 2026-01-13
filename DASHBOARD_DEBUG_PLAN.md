# Dashboard Debug Plan - New Approach

## Current Status
- ✅ All database tables exist
- ✅ All migrations applied
- ✅ Build passes locally
- ❌ Dashboard still shows "Dashboard error" in production

## New Theory

The error is likely happening during **SERVER-SIDE RENDERING** (SSR), not client-side. This explains why:
1. Hard refresh doesn't fix it
2. Incognito doesn't fix it
3. The error happens before React even hydrates
4. Browser console shows minified error (not source code)

## Root Cause Hypothesis

The dashboard page is a **Server Component** that runs `getBusiness()` and fetches data on the server. If ANY of these fail on the server, Next.js throws an error BEFORE sending HTML to the browser.

Possible issues:
1. **Database query timeout** - Page is fetching too much data
2. **Missing environment variables** in production
3. **RLS policies blocking queries** with service role
4. **Server action failing** during page load
5. **Memory limit exceeded** - File is 3126 lines

## Debug Strategy

### Step 1: Check Vercel Function Logs (Most Important!)

Go to: https://vercel.com/sheinkinjks-projects/peppiepep

Click: **Logs** → **Functions**

Filter to show errors for `/dashboard` route

**Look for**:
- Stack traces
- Error messages
- Timeout errors
- Memory errors

**This will show the ACTUAL server-side error!**

### Step 2: Add Server-Side Logging

I'll add console.logs at key points in getBusiness() to see where it fails:

```typescript
async function getBusiness() {
  console.log('[DEBUG] getBusiness started');
  const supabase = await createServerComponentClient();

  console.log('[DEBUG] Getting user...');
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    console.log('[DEBUG] No user, redirecting to login');
    redirect("/login");
  }

  console.log(`[DEBUG] User found: ${user.id}`);
  // ... rest of function
}
```

These logs appear in Vercel Function Logs, not browser console!

### Step 3: Simplify Page Temporarily

Create a minimal version that just returns "Hello" to confirm routing works:

```typescript
export default async function Dashboard() {
  return <div>Dashboard Test</div>;
}
```

If this works → error is in the page logic
If this fails → error is in routing/middleware/auth

### Step 4: Binary Search the Problem

Comment out half the page content, test. If it works, the error is in the commented half. Keep bisecting until you find the exact line.

## Most Likely Culprits

Based on the symptoms:

1. **`getBusiness()` query failing** (most likely)
   - Selecting columns that don't exist
   - RLS policy blocking
   - Timeout from fetching too much data

2. **Promise.all() with fetchWithLog failing**
   - One of the 6 parallel queries timing out
   - Database connection pool exhausted

3. **Server actions being called during render**
   - `updateSettings`, `uploadLogo`, etc. shouldn't run during render
   - But if they're defined incorrectly, they might

4. **parseBusinessMetadata() failing**
   - If onboarding_metadata has unexpected structure
   - JSON parsing error

5. **createServerComponentClient() failing**
   - Environment variables not set in production
   - Supabase connection failing

## Action Items

### For You (User)
1. **Check Vercel Function Logs** (CRITICAL!)
   - Go to Vercel dashboard
   - Click Logs → Functions
   - Look for errors when accessing /dashboard
   - Screenshot any error messages

2. **Try the preview URL again**
   ```
   https://peppiepep-30pdjz82y-jarred-krowitzs-projects.vercel.app/dashboard
   ```
   Does it work? This helps isolate if it's domain-specific.

3. **Check if /dashboard redirects to /login**
   - If you're not logged in, what happens?
   - If you ARE logged in, what happens?

### For Me (Next Steps)
1. Add server-side debug logging
2. Create minimal reproduction
3. Binary search to find exact failing line
4. Once found, create targeted fix

## Quick Tests

Try accessing these URLs and tell me which work/fail:

1. https://referlabs.com.au/ (homepage)
2. https://referlabs.com.au/login (login page)
3. https://referlabs.com.au/dashboard (dashboard - currently fails)
4. https://referlabs.com.au/api/debug/env (API route)

This tells us if:
- Static pages work ✓
- Auth pages work ✓
- Server components work?
- API routes work?

## Expected Outcome

Once we see the Vercel Function Logs, we'll know:
- Exact error message
- Exact line number
- Exact stack trace

Then I can create a precise fix in < 5 minutes.

---

**IMMEDIATE ACTION**: Check Vercel Function Logs for /dashboard errors. That's where the answer is.
