# Dashboard & Cookie System Improvements

## Priority 1: Dashboard Enhancements

### 1.1 Partner Referral Tracking Section
**Location:** Add to `/dashboard` Step 4 (Track Campaigns)

**Features:**
- [ ] Separate tab for "Partner Referrals" vs "Customer Referrals"
- [ ] Show referrals with `source: "partner_program"`
- [ ] Display conversion funnel: Link Visit → Application → Active Customer
- [ ] Calculate potential commission (25% of subscription value)
- [ ] Show attribution source in referrals table

**Benefits:**
- Admin can see B2B partner referrals separately from B2C customer referrals
- Track ROI of partner recruitment efforts
- Monitor partner application conversion rates

### 1.2 Attribution Analytics Dashboard
**New Component:** `<AttributionDashboard />`

**Metrics to Track:**
```typescript
interface AttributionMetrics {
  totalVisits: number;           // All /r/Jn9wjbn2kQlO visits
  partnerApplications: number;   // Submitted applications with attribution
  conversionRate: number;        // Applications / Visits
  attributionSuccessRate: number; // Applications with cookie / Total applications
  avgTimeToConvert: number;      // Days from visit to application
  cookieExpiryLoss: number;      // Applications after 30 days
}
```

**Implementation:**
```sql
-- Query for attribution metrics
SELECT
  COUNT(DISTINCT CASE WHEN event_type = 'link_visit' THEN id END) as visits,
  COUNT(DISTINCT CASE WHEN event_type = 'signup_submitted' THEN id END) as signups,
  AVG(CASE WHEN event_type = 'signup_submitted'
    THEN EXTRACT(EPOCH FROM (created_at - visit_timestamp))/86400 END) as avg_days
FROM referral_events
WHERE ambassador_id = 'admin_customer_id'
  AND source = 'partner_program'
```

### 1.3 Real-Time Attribution Status
**Location:** Add banner to `/our-referral-program` page

**Display:**
- "✅ Tracked by: Jarred Krowitz" (when cookie present)
- "⚠️ Attribution expired - please use referral link again" (when cookie > 30 days)
- Cookie expiry countdown: "Attribution expires in 23 days"

---

## Priority 2: Cookie Reliability Improvements

### 2.1 Cookie Persistence Issues

**Current Issues:**
1. **Cookie might not survive subdomain changes** (if you add www.referlabs.com.au)
2. **Safari ITP (Intelligent Tracking Prevention)** may block cookies
3. **No fallback if cookies are disabled**
4. **No visibility into cookie failures**

**Solutions:**

#### A. Add Cookie Domain Configuration
```typescript
// In /api/referral-redirect/route.ts
response.cookies.set("ref_ambassador", JSON.stringify({
  id: ambassadorId,
  code,
  business_id: businessId,
  timestamp: Date.now(),
}), {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 30 * 24 * 60 * 60,
  path: "/",
  domain: ".referlabs.com.au", // ← ADD THIS for subdomain support
});
```

#### B. Add Cookie Verification Endpoint
**New File:** `/src/app/api/verify-attribution/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const cookies = request.cookies;
  const refCookie = cookies.get("ref_ambassador");

  if (!refCookie?.value) {
    return NextResponse.json({
      hasAttribution: false,
      reason: "no_cookie"
    });
  }

  try {
    const data = JSON.parse(refCookie.value);
    const ageMs = Date.now() - (data.timestamp || 0);
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;

    if (ageMs > thirtyDays) {
      return NextResponse.json({
        hasAttribution: false,
        reason: "expired",
        daysOld: Math.floor(ageMs / (24 * 60 * 60 * 1000))
      });
    }

    return NextResponse.json({
      hasAttribution: true,
      ambassador: {
        code: data.code,
        id: data.id
      },
      daysRemaining: Math.floor((thirtyDays - ageMs) / (24 * 60 * 60 * 1000))
    });
  } catch (err) {
    return NextResponse.json({
      hasAttribution: false,
      reason: "parse_error"
    });
  }
}
```

#### C. Add Client-Side Cookie Verification
**New Component:** `<AttributionBanner />` for `/our-referral-program`

```typescript
'use client'
import { useEffect, useState } from 'react';

export function AttributionBanner() {
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    fetch('/api/verify-attribution')
      .then(r => r.json())
      .then(setStatus);
  }, []);

  if (!status) return null;

  if (status.hasAttribution) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg">
        ✅ Referred by: {status.ambassador.code}
        <br />
        Attribution expires in {status.daysRemaining} days
      </div>
    );
  }

  return (
    <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
      ⚠️ No active referral attribution.
      <a href="/referral" className="underline">Get your referral link</a>
    </div>
  );
}
```

### 2.2 Safari ITP Mitigation

**Problem:** Safari blocks third-party cookies and limits first-party cookie lifespan

**Solutions:**

#### Option 1: Use LocalStorage as Backup
```typescript
// On /api/referral-redirect, also return HTML that sets localStorage
export async function GET(request: NextRequest) {
  // ... existing code ...

  const html = `
    <!DOCTYPE html>
    <html>
      <head><title>Redirecting...</title></head>
      <body>
        <script>
          localStorage.setItem('ref_ambassador', JSON.stringify({
            id: '${ambassadorId}',
            code: '${code}',
            business_id: '${businessId}',
            timestamp: ${Date.now()}
          }));
          window.location.href = '/our-referral-program';
        </script>
        <p>Redirecting...</p>
      </body>
    </html>
  `;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
      'Set-Cookie': `ref_ambassador=${JSON.stringify({...})}; ...`
    }
  });
}
```

#### Option 2: URL Parameter Fallback
```typescript
// If cookie fails, append attribution to URL
redirect(`/our-referral-program?ref=${code}&ts=${timestamp}`);

// In partner form, check URL params if no cookie:
const urlRef = searchParams.get('ref');
const urlTs = searchParams.get('ts');

if (!attributedAmbassadorId && urlRef) {
  // Look up ambassador by ref code
  const { data } = await supabase
    .from('customers')
    .select('id, business_id')
    .eq('referral_code', urlRef)
    .single();

  if (data) {
    attributedAmbassadorId = data.id;
    attributedBusinessId = data.business_id;
  }
}
```

### 2.3 Add Cookie Debug Mode

**New File:** `/src/app/api/debug/cookies/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const cookies = request.cookies.getAll();
  const refCookie = request.cookies.get("ref_ambassador");

  return NextResponse.json({
    allCookies: cookies.map(c => ({
      name: c.name,
      value: c.value.substring(0, 50) + '...',
      hasValue: !!c.value
    })),
    refAttributionCookie: refCookie ? {
      exists: true,
      value: JSON.parse(refCookie.value),
      age: Date.now() - JSON.parse(refCookie.value).timestamp,
      valid: (Date.now() - JSON.parse(refCookie.value).timestamp) < (30 * 24 * 60 * 60 * 1000)
    } : {
      exists: false
    },
    userAgent: request.headers.get('user-agent'),
    origin: request.headers.get('origin'),
  });
}
```

Access at: `https://referlabs.com.au/api/debug/cookies`

---

## Priority 3: Production Deployment Issue Fix

### 3.1 Investigate Why Redirect Isn't Working

**Possible Issues:**

1. **Environment Variable Not Available:**
```bash
# Verify in production:
npx vercel env ls production | grep ADMIN_REFERRAL_CODE
```

2. **Case Sensitivity Issue:**
```typescript
// Current code uses toLowerCase() - should work
if (code.toLowerCase() === ADMIN_REFERRAL_CODE.toLowerCase())
```

3. **Edge Runtime Limitation:**
The `/r/[code]` page uses `redirect()` which might not work properly in Edge runtime.

**Solution:** Force Node.js runtime

```typescript
// Add to top of /src/app/r/[code]/page.tsx
export const runtime = "nodejs"; // Force Node.js runtime for redirects
```

4. **Vercel Caching:**
The production deployment might have cached the old version.

**Solution:** Add cache control headers

```typescript
// In /src/app/r/[code]/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = 'force-no-store'; // ← ADD THIS
```

### 3.2 Alternative: Middleware-Based Redirect

If page-level redirects don't work, move the logic to middleware:

```typescript
// In /src/middleware.ts
export async function middleware(request: NextRequest) {
  // ... existing code ...

  // Check for admin referral code redirect
  if (request.nextUrl.pathname.startsWith('/r/')) {
    const code = request.nextUrl.pathname.split('/r/')[1];
    const ADMIN_CODE = process.env.ADMIN_REFERRAL_CODE || 'Jn9wjbn2kQlO';

    if (code?.toLowerCase() === ADMIN_CODE.toLowerCase()) {
      // Fetch customer data
      const supabase = createServerClient(...);
      const { data } = await supabase
        .from('customers')
        .select('id, business_id, referral_code')
        .ilike('referral_code', code)
        .single();

      if (data) {
        // Redirect to API route that sets cookie
        const url = new URL('/api/referral-redirect', request.url);
        url.searchParams.set('code', data.referral_code);
        url.searchParams.set('ambassador_id', data.id);
        url.searchParams.set('business_id', data.business_id);

        // Preserve UTM params
        request.nextUrl.searchParams.forEach((value, key) => {
          url.searchParams.set(key, value);
        });

        return NextResponse.redirect(url);
      }
    }
  }

  return response;
}
```

---

## Priority 4: Enhanced Monitoring & Analytics

### 4.1 Add Attribution Logging

**New Table:** `attribution_logs`

```sql
CREATE TABLE attribution_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ambassador_id UUID REFERENCES customers(id),
  event_type TEXT NOT NULL, -- 'cookie_set', 'cookie_read', 'cookie_expired', 'fallback_used'
  success BOOLEAN NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Log Events:**
- When cookie is set (in `/api/referral-redirect`)
- When cookie is read (in partner application form)
- When cookie parse fails
- When fallback attribution is used

### 4.2 Dashboard Alert System

**Add alerts for:**
- Low attribution rate (< 80% of applications have attribution)
- High cookie failure rate
- Safari users with failed attribution
- Applications after cookie expiry (need to shorten funnel)

---

## Priority 5: Testing Improvements

### 5.1 Create Attribution Test Suite

**New File:** `/scripts/test-attribution.js`

```javascript
#!/usr/bin/env node

const puppeteer = require('puppeteer');

async function testAttributionFlow() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  console.log('Testing attribution flow...');

  // Step 1: Visit referral link
  await page.goto('https://referlabs.com.au/r/Jn9wjbn2kQlO');
  await page.waitForNavigation();

  // Step 2: Check cookie was set
  const cookies = await page.cookies();
  const refCookie = cookies.find(c => c.name === 'ref_ambassador');

  if (!refCookie) {
    console.error('❌ Cookie not set after redirect');
    return false;
  }

  console.log('✅ Cookie set:', refCookie.value.substring(0, 50));

  // Step 3: Verify redirect to partner program
  const url = page.url();
  if (!url.includes('/our-referral-program')) {
    console.error('❌ Did not redirect to partner program');
    return false;
  }

  console.log('✅ Redirected to:', url);

  // Step 4: Fill out form
  await page.type('input[name="name"]', 'Test Partner');
  await page.type('input[name="email"]', 'test@example.com');
  await page.type('input[name="company"]', 'Test Company');
  await page.type('input[name="website"]', 'https://test.com');

  await page.click('button[type="submit"]');
  await page.waitForNavigation();

  console.log('✅ Form submitted');
  console.log('\n✅ All tests passed!');

  await browser.close();
  return true;
}

testAttributionFlow().catch(console.error);
```

### 5.2 Add Health Check Endpoint

**New File:** `/src/app/api/health/attribution/route.ts`

```typescript
import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

export async function GET() {
  const supabase = await createServiceClient();
  const ADMIN_CODE = process.env.ADMIN_REFERRAL_CODE;

  if (!ADMIN_CODE) {
    return NextResponse.json({
      healthy: false,
      error: "ADMIN_REFERRAL_CODE not set"
    }, { status: 500 });
  }

  // Check if admin customer exists
  const { data: admin } = await supabase
    .from('customers')
    .select('id, referral_code')
    .eq('referral_code', ADMIN_CODE)
    .single();

  if (!admin) {
    return NextResponse.json({
      healthy: false,
      error: "Admin customer not found"
    }, { status: 500 });
  }

  // Check recent attribution success rate
  const { data: recentApps } = await supabase
    .from('partner_applications')
    .select('id, created_at')
    .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
    .limit(100);

  const { data: attributedApps } = await supabase
    .from('referrals')
    .select('id')
    .eq('ambassador_id', admin.id)
    .eq('source', 'partner_program')
    .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

  const attributionRate = recentApps && attributedApps
    ? (attributedApps.length / recentApps.length * 100).toFixed(1)
    : 0;

  return NextResponse.json({
    healthy: true,
    adminCode: ADMIN_CODE,
    adminCustomerId: admin.id,
    recentApplications: recentApps?.length || 0,
    attributedApplications: attributedApps?.length || 0,
    attributionRate: `${attributionRate}%`,
    status: attributionRate > 80 ? 'good' : attributionRate > 50 ? 'warning' : 'critical'
  });
}
```

---

## Implementation Priority

### Phase 1 (Immediate - Fix Production Issue):
1. ✅ Add `export const runtime = "nodejs"` to `/r/[code]/page.tsx`
2. ✅ Add `export const fetchCache = 'force-no-store'`
3. ✅ Redeploy and test
4. ✅ Create health check endpoint

### Phase 2 (This Week - Cookie Reliability):
1. Add domain configuration to cookie
2. Create cookie verification endpoint
3. Add attribution banner to partner program page
4. Implement URL parameter fallback
5. Add cookie debug endpoint

### Phase 3 (Next Week - Dashboard Enhancements):
1. Add Partner Referrals section to dashboard
2. Create Attribution Analytics component
3. Add real-time metrics
4. Build attribution funnel visualization

### Phase 4 (Ongoing - Monitoring):
1. Add attribution logging table
2. Create automated testing script
3. Set up alerts for low attribution rates
4. Build attribution health dashboard

---

## Quick Wins (Can Implement Now)

1. **Add runtime declaration to fix redirect issue**
2. **Create verification endpoint for debugging**
3. **Add simple attribution banner**
4. **Set up health check monitoring**

Would you like me to implement any of these improvements?
