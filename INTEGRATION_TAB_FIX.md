# Integration Tab Crash Fix

## Problem
Dashboard loads initially but crashes when navigating to:
`https://referlabs.com.au/dashboard?section=setup-integration&window=30#step-1c-integrations`

Error: "Dashboard error" (caught by error boundary)

## Likely Causes

1. **Client-side React error** - Something in IntegrationTab component fails during render
2. **Missing data** - A required prop is undefined/null unexpectedly
3. **State mismatch** - Server and client state are out of sync
4. **Browser cache** - Old React component code cached

## Quick Fixes to Try

### Fix 1: Hard Refresh (30 seconds)
The simplest fix - clear React's client-side cache:

1. Go to: https://referlabs.com.au/dashboard
2. Press `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows)
3. OR open Incognito window
4. Log in again
5. Navigate to integrations tab

**Why this works**: Clears any stale React state or cached components

### Fix 2: Clear All Browser Data (1 minute)
If hard refresh doesn't work:

1. Chrome: Settings → Privacy → Clear browsing data
2. Select "Cached images and files" AND "Cookies and site data"
3. Time range: "All time"
4. Click "Clear data"
5. Close all browser windows
6. Reopen and test

### Fix 3: Try Different Browser (30 seconds)
- If Safari/Chrome fails, try Firefox or Edge
- Use Incognito/Private mode
- This confirms if it's browser-specific

## Diagnostic Steps

### Step 1: Check Browser Console
1. Open dashboard
2. Press F12 (opens DevTools)
3. Click "Console" tab
4. Navigate to integrations tab
5. **Look for red error messages**

Common errors to look for:
- `TypeError: Cannot read property 'X' of undefined`
- `ReferenceError: X is not defined`
- `Error: Hydration failed`
- Any error mentioning "IntegrationTab"

**Share these errors with me** - they'll tell us exactly what's breaking

### Step 2: Check Network Tab
1. F12 → Network tab
2. Navigate to integrations tab
3. Look for:
   - Failed API calls (red status codes like 500, 404)
   - Requests to `/api/` endpoints that fail

### Step 3: Test Preview URL
Does this work?
```
https://peppiepep-30pdjz82y-jarred-krowitzs-projects.vercel.app/dashboard?section=setup-integration
```

If YES → Production domain has caching issue
If NO → Code bug affecting both

## Code-Level Fix

If browser fixes don't work, the issue is in the code. Most likely causes:

### Cause 1: Undefined Props
IntegrationTab receives many props. If any are unexpectedly undefined:

```typescript
// Line 1811-1836 in dashboard/page.tsx
<IntegrationTab
  businessId={business.id} // Could be undefined?
  siteUrl={businessWebsiteUrl} // Could be undefined?
  businessName={business.name || "Your Business"}
  // ... 20+ more props
/>
```

**Fix**: Add null checks before rendering IntegrationTab

### Cause 2: Server Action Failure
The tab uses server actions:
- `updateSettingsAction`
- `uploadLogoAction`
- `updateOnboardingAction`

If these throw errors, the component crashes.

**Fix**: Wrap server actions in try-catch

### Cause 3: URL Hash Issue
Line 147-150 in IntegrationTab.tsx:
```typescript
useEffect(() => {
  const nextUrl = `${window.location.pathname}${window.location.search}#step-1c-integrations`;
  window.history.replaceState(null, "", nextUrl);
}, [integrationsOpen]);
```

This modifies the URL. If it fails, component crashes.

**Fix**: Add try-catch around history manipulation

## Recommended Action

**Option A: Quick User Fix (Try First)**
1. Hard refresh with Cmd+Shift+R
2. Or use Incognito mode
3. If this works → problem solved, just browser cache

**Option B: Get Error Details**
1. Open F12 console
2. Navigate to integrations tab
3. Screenshot the error
4. Share with me
5. I'll create targeted fix

**Option C: Code Fix (If A & B Don't Work)**
I'll add defensive error handling:
- Null checks on all props
- Try-catch around server actions
- Error boundary for IntegrationTab specifically
- Fallback UI if component fails

## Status

Waiting for:
1. Result of hard refresh (Cmd+Shift+R)
2. OR browser console error message
3. OR confirmation that preview URL works/doesn't work

Once I have this info, I can provide exact fix.

## Temporary Workaround

If integrations tab is unusable, you can still:
- Use other dashboard tabs (Partners, Campaigns, ROI)
- Access settings directly at `/dashboard?section=overview`
- Skip integrations tab for now, come back after fix

The crash only affects that one tab, rest of dashboard should work.
