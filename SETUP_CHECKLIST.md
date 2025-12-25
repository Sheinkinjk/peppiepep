# Analytics Setup Checklist

Use this checklist to track your progress. **Total time: ~15 minutes**

---

## Part 1: Google Analytics 4 (5 minutes)

### Account Creation
- [ ] Go to https://analytics.google.com
- [ ] Create account named "Refer Labs"
- [ ] Create property named "Refer Labs"
- [ ] Select timezone: Australian Eastern Time - Sydney
- [ ] Select currency: USD or AUD

### Property Setup
- [ ] Select industry: Software & IT Services
- [ ] Select business size: Small or Medium
- [ ] Select objectives: "Generate leads" + "Examine user behavior"
- [ ] Accept Terms of Service

### Data Stream
- [ ] Create Web data stream
- [ ] Enter URL: https://referlabs.com.au
- [ ] Name stream: "Refer Labs Website"
- [ ] **Copy Measurement ID** (format: G-XXXXXXXXXX)
  - My ID: `_______________________`

---

## Part 2: Add to Vercel (3 minutes)

### Environment Variables
- [ ] Go to https://vercel.com/dashboard
- [ ] Open your Peppiepep project
- [ ] Go to Settings → Environment Variables
- [ ] Add: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
  - Value: `G-XXXXXXXXXX` (from Part 1)
  - Environment: ALL (Production, Preview, Development)
- [ ] Click "Save"

### Redeploy
- [ ] Go to Deployments tab
- [ ] Click "..." menu on latest deployment
- [ ] Click "Redeploy"
- [ ] Wait 2-3 minutes for completion
- [ ] Check deployment status: **Success** ✅

---

## Part 3: Google Search Console (5 minutes)

### Add Property
- [ ] Go to https://search.google.com/search-console
- [ ] Click "Add property"
- [ ] Select "URL prefix" method
- [ ] Enter: https://referlabs.com.au
- [ ] Click "Continue"

### Verification
- [ ] Select "HTML tag" verification method
- [ ] Copy the content value only (inside quotes after content=)
  - My code: `_______________________`
- [ ] Go back to Vercel → Environment Variables
- [ ] Add: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
  - Value: (paste the code you copied)
  - Environment: ALL
- [ ] Click "Save"

### Second Redeploy
- [ ] Go to Deployments tab
- [ ] Click "..." → "Redeploy"
- [ ] Wait 2-3 minutes
- [ ] Go back to Search Console
- [ ] Click "Verify"
- [ ] See success message ✅

### Submit Sitemap
- [ ] In Search Console, click "Sitemaps" (left sidebar)
- [ ] Enter: `sitemap.xml`
- [ ] Click "Submit"
- [ ] Status shows "Success" ✅

---

## Part 4: Testing (2 minutes)

### Test Analytics
- [ ] Open Google Analytics → Realtime report
- [ ] Open https://referlabs.com.au in incognito window
- [ ] See yourself in Realtime report (1 user active) ✅

### Test Search Console
- [ ] In Search Console → URL Inspection
- [ ] Enter: https://referlabs.com.au
- [ ] See "Sitemap: sitemap.xml" listed ✅

---

## Part 5: Optional Local Testing

### Add to Local Environment (Optional)
- [ ] Open `/Users/jarredkrowitz/Desktop/Peppiepep/.env.local`
- [ ] Add your Measurement ID to `NEXT_PUBLIC_GA_MEASUREMENT_ID=`
- [ ] Add your verification code to `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=`
- [ ] Restart your dev server

---

## Verification Summary

After completing all steps, you should have:

**In Vercel Environment Variables:**
- ✅ `NEXT_PUBLIC_GA_MEASUREMENT_ID` = G-XXXXXXXXXX
- ✅ `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` = XXXXXXXXXXXXXXXX

**In Google Analytics:**
- ✅ Property created
- ✅ Realtime report shows live visitors
- ✅ Data is being collected

**In Google Search Console:**
- ✅ Property verified
- ✅ Sitemap submitted
- ✅ Pages being indexed

---

## What's Tracking Now?

Once complete, your site automatically tracks:
- ✅ Every page view
- ✅ User sessions and duration
- ✅ Traffic sources (organic, direct, referral, social)
- ✅ Geographic location (country, city)
- ✅ Device type (mobile, desktop, tablet)
- ✅ Browser and OS
- ✅ User engagement metrics

---

## Quick Reference Links

**Setup Links:**
- Google Analytics: https://analytics.google.com
- Google Tag Manager: https://tagmanager.google.com
- Google Search Console: https://search.google.com/search-console
- Vercel Dashboard: https://vercel.com/dashboard

**Your Site:**
- Production: https://referlabs.com.au
- Sitemap: https://referlabs.com.au/sitemap.xml
- Robots: https://referlabs.com.au/robots.txt

**Documentation:**
- Quick Guide: [QUICK_SETUP_ANALYTICS.md](QUICK_SETUP_ANALYTICS.md)
- Detailed Guide: [ANALYTICS_SETUP_GUIDE.md](ANALYTICS_SETUP_GUIDE.md)
- Marketing Plan: [MARKETING_PLAN.md](MARKETING_PLAN.md)

---

## Next Steps After Setup

### Week 1: Monitor & Verify
- [ ] Check Google Analytics daily
- [ ] Verify all pages are tracking
- [ ] Review traffic sources
- [ ] Check for any errors

### Week 2: Set Up Goals
- [ ] Mark "sign_up" as conversion in GA4
- [ ] Mark "purchase" as conversion
- [ ] Mark "generate_lead" as conversion
- [ ] Set up custom audiences for remarketing

### Month 1: Optimize
- [ ] Review top-performing pages
- [ ] Identify high-bounce pages
- [ ] Check mobile vs desktop performance
- [ ] Analyze user flow through site

### Month 2: Scale
- [ ] Review Search Console performance
- [ ] Optimize low-CTR pages
- [ ] Create content for high-impression keywords
- [ ] Set up automated reports

---

**Last Updated:** 2025-12-26
**Status:** Ready for setup
**Estimated Time:** 15 minutes
