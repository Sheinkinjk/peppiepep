# Analytics & Search Console Setup Guide

This guide will help you set up Google Analytics 4, Google Tag Manager, and Google Search Console for Refer Labs.

---

## 1. Google Analytics 4 Setup

### Step 1: Create Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com)
2. Click **"Start measuring"** or **"Admin"** (bottom left)
3. Create a new **Account**:
   - Account name: `Refer Labs`
   - Data sharing settings: Enable all recommended options

### Step 2: Create GA4 Property

1. Click **"Create Property"**
2. Property details:
   - Property name: `Refer Labs Production`
   - Reporting time zone: `Australia/Sydney` (or your timezone)
   - Currency: `Australian Dollar (AUD)` or `US Dollar (USD)`
3. Click **"Next"**

### Step 3: Business Information

1. Industry category: **Software and IT Services**
2. Business size: **Small** or **Medium** (based on your team)
3. Click **"Next"**

### Step 4: Business Objectives

Select:
- ✅ **Generate leads**
- ✅ **Raise brand awareness**
- ✅ **Examine user behavior**

Click **"Create"**

### Step 5: Data Stream Setup

1. Select **"Web"**
2. Enter:
   - Website URL: `https://referlabs.com.au`
   - Stream name: `Refer Labs Production Website`
3. Click **"Create stream"**

### Step 6: Get Measurement ID

1. You'll see your **Measurement ID** (format: `G-XXXXXXXXXX`)
2. Copy this ID

### Step 7: Add to Environment Variables

Add to your `.env.local` file:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID.

### Step 8: Verify Installation

1. Save and redeploy your application
2. In Google Analytics, go to **Realtime** report
3. Visit your website
4. You should see yourself in the realtime report within 30 seconds

---

## 2. Google Tag Manager Setup (Optional but Recommended)

GTM provides more flexibility for managing multiple tracking tools.

### Step 1: Create GTM Account

1. Go to [Google Tag Manager](https://tagmanager.google.com)
2. Click **"Create Account"**
3. Account setup:
   - Account Name: `Refer Labs`
   - Country: `Australia`
   - Container name: `referlabs.com.au`
   - Target platform: **Web**

### Step 2: Get Container ID

1. After creation, you'll see your **Container ID** (format: `GTM-XXXXXXX`)
2. Copy this ID

### Step 3: Add to Environment Variables

Add to your `.env.local` file:

```bash
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

### Step 4: Install GA4 via GTM

Instead of using `NEXT_PUBLIC_GA_MEASUREMENT_ID`, you can manage GA4 through GTM:

1. In GTM, click **"Add a new tag"**
2. Tag Configuration:
   - Choose **Google Analytics: GA4 Configuration**
   - Measurement ID: Your GA4 Measurement ID (`G-XXXXXXXXXX`)
3. Triggering:
   - Choose **All Pages**
4. Name: `GA4 - Configuration`
5. Click **"Save"**

### Step 5: Publish Container

1. Click **"Submit"** (top right)
2. Version name: `Initial Setup with GA4`
3. Click **"Publish"**

---

## 3. Google Search Console Setup

### Step 1: Add Property

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click **"Add property"**
3. Choose **"URL prefix"** option
4. Enter: `https://referlabs.com.au`

### Step 2: Verify Ownership

**Method 1: HTML Tag (Recommended - Already Configured)**

1. Select **"HTML tag"** verification method
2. You'll see a meta tag like:
   ```html
   <meta name="google-site-verification" content="XXXXXXXXXXXXXXXX" />
   ```
3. Copy the `content` value (the `XXXXXXXXXXXXXXXX` part)
4. Add to your `.env.local`:
   ```bash
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=XXXXXXXXXXXXXXXX
   ```
5. Redeploy your site
6. Go back to Search Console and click **"Verify"**

**Method 2: Upload HTML File**

1. Download the verification HTML file
2. Add it to `/public/` directory
3. Commit and deploy
4. Click **"Verify"** in Search Console

**Method 3: Via Google Analytics**

If you've already set up GA4 with the same Google account:
1. Select **"Google Analytics"**
2. Click **"Verify"** (automatic)

### Step 3: Submit Sitemap

1. After verification, go to **Sitemaps** (left sidebar)
2. Enter: `sitemap.xml`
3. Click **"Submit"**

Your sitemap is automatically generated at `https://referlabs.com.au/sitemap.xml`

### Step 4: Configure Settings

**URL Inspection:**
- Test your homepage: `https://referlabs.com.au`
- Request indexing for important pages

**Performance:**
- Monitor clicks, impressions, CTR, and position
- Filter by page, query, country, device

**Coverage:**
- Check for indexing errors
- Fix any "Excluded" pages that should be indexed

---

## 4. Environment Variables Summary

Add these to your `.env.local` file:

```bash
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Tag Manager (optional, use OR GA4 direct)
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Google Search Console Verification
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=XXXXXXXXXXXXXXXX

# Site URL (already configured)
NEXT_PUBLIC_SITE_URL=https://referlabs.com.au
```

**Important:**
- Never commit `.env.local` to Git (it's in `.gitignore`)
- Add these same variables to your production environment (Vercel/hosting platform)
- Redeploy after adding environment variables

---

## 5. Vercel Environment Variables Setup

If you're using Vercel:

1. Go to your project dashboard
2. Click **"Settings"** → **"Environment Variables"**
3. Add each variable:
   - Key: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - Value: `G-XXXXXXXXXX`
   - Environment: **Production**, **Preview**, **Development**
4. Click **"Save"**
5. Redeploy your application

---

## 6. Testing Your Setup

### Test Google Analytics

1. Open your website in **Incognito/Private browsing**
2. Open Google Analytics → **Realtime** report
3. Navigate through your site
4. You should see your session appear within 30 seconds
5. Check:
   - Page views are tracked
   - Events are firing (if you've set them up)
   - User properties are correct

### Test Google Tag Manager

1. Install [Google Tag Assistant](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk) Chrome extension
2. Visit your website
3. Click the Tag Assistant icon
4. Click **"Enable"** and refresh the page
5. You should see:
   - ✅ Google Tag Manager container firing
   - ✅ GA4 Configuration tag firing

### Test Search Console

1. Go to **URL Inspection** in Search Console
2. Enter: `https://referlabs.com.au`
3. Check:
   - ✅ URL is on Google
   - ✅ Sitemap is discoverable
   - ✅ No indexing errors

---

## 7. Custom Event Tracking

The application includes pre-built event tracking functions. Here's how to use them:

### In Your Components

```typescript
import { analytics } from '@/components/Analytics';

// Track pricing plan click
analytics.trackPricingPlanClick('base', 'annual');

// Track trial signup
analytics.trackTrialSignup('scale');

// Track purchase
analytics.trackPurchase('base', 399, 'txn_123456');

// Track ROI calculator usage
analytics.trackROICalculator(100, 0.15, 50000);

// Track contact form
analytics.trackContactFormSubmit();
```

### Example: Track Pricing Page Button Click

In `/src/app/pricing/page.tsx`:

```typescript
import { analytics } from '@/components/Analytics';

async function handleSubscribe(plan: "base" | "scale") {
  // Track the event
  analytics.trackPricingPlanClick(plan, billingCycle);

  // Continue with checkout
  await redirectToCheckout({ ... });
}
```

---

## 8. Key Metrics to Monitor

### Google Analytics 4 - Key Reports

**Acquisition:**
- Where users come from (organic, paid, direct, referral)
- Best-performing traffic sources

**Engagement:**
- Average engagement time
- Pages per session
- Top-performing pages

**Conversion:**
- Trial signups (set up as conversion event)
- Purchases (already tracked)
- Lead generation (contact forms, ROI calculator)

**Retention:**
- Returning users vs new users
- User retention cohorts

### Google Search Console - Key Metrics

**Performance:**
- Total clicks and impressions
- Average CTR (target: 3-5%)
- Average position (target: top 10 for branded terms)

**Top Queries:**
- What people search to find you
- Opportunity: Create content for high-impression, low-click queries

**Top Pages:**
- Which pages get the most search traffic
- Optimize meta descriptions for low-CTR pages

**Coverage:**
- Total indexed pages (should match your sitemap)
- Fix any "Excluded" errors

---

## 9. Recommended Goals & Conversions

Set these up in Google Analytics:

1. **Trial Signup** (High value)
   - Event: `sign_up`
   - Mark as conversion: Yes

2. **Purchase** (Critical)
   - Event: `purchase`
   - Mark as conversion: Yes
   - Revenue tracking: Enabled

3. **ROI Calculator Usage** (Lead indicator)
   - Event: `roi_calculator_used`
   - Mark as conversion: Yes

4. **Contact Form Submission** (Lead generation)
   - Event: `generate_lead`
   - Mark as conversion: Yes

5. **Pricing Page View** (Intent signal)
   - Event: `page_view`
   - Filter: Page path contains `/pricing`

---

## 10. Monthly Reporting Checklist

### Week 1: Traffic Analysis
- [ ] Review total sessions vs last month
- [ ] Check bounce rate trends
- [ ] Analyze top traffic sources
- [ ] Review mobile vs desktop split

### Week 2: Conversion Analysis
- [ ] Trial signup rate
- [ ] Trial-to-paid conversion rate
- [ ] Cost per acquisition (if running ads)
- [ ] Revenue attribution by channel

### Week 3: SEO Performance
- [ ] Search Console clicks trend
- [ ] New keywords ranking
- [ ] Top-performing blog posts
- [ ] Indexing coverage status

### Week 4: Optimization Opportunities
- [ ] High-traffic, low-conversion pages
- [ ] High bounce rate pages
- [ ] Slow-loading pages (Core Web Vitals)
- [ ] Mobile usability issues

---

## 11. Troubleshooting

### Analytics Not Tracking

**Check:**
1. Environment variables are set correctly
2. Application has been redeployed after adding variables
3. You're testing in production mode (analytics disabled in development)
4. Ad blockers are disabled during testing
5. Browser console for any JavaScript errors

### Search Console Not Verifying

**Try:**
1. Wait 24-48 hours after deploying verification tag
2. Clear cache and hard refresh your homepage
3. Use "URL Inspection" tool to see what Google sees
4. Try alternative verification method (HTML file upload)

### Events Not Firing

**Debug:**
1. Open browser DevTools → Console
2. Look for analytics errors
3. Check Network tab for `gtag` or `gtm` requests
4. Install Google Tag Assistant for detailed debugging

---

## 12. Next Steps After Setup

1. **Week 1:**
   - Monitor real-time traffic
   - Verify all pages are being tracked
   - Test conversion events manually

2. **Week 2-4:**
   - Set up custom audiences for retargeting
   - Create conversion goals
   - Set up automated reports

3. **Month 2:**
   - Review first month's data
   - Identify optimization opportunities
   - Set up A/B testing (Google Optimize)

4. **Month 3:**
   - Build custom dashboards
   - Set up goal funnels
   - Compare to industry benchmarks

---

## Support & Resources

- **Google Analytics Help:** https://support.google.com/analytics
- **GTM Documentation:** https://developers.google.com/tag-platform/tag-manager
- **Search Console Help:** https://support.google.com/webmasters
- **GA4 YouTube Channel:** https://www.youtube.com/@googleanalytics

---

**Last Updated:** 2025-12-26
**Maintained By:** Marketing Team
