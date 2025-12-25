# Quick Analytics Setup - 15 Minutes

Follow these steps to complete your analytics setup. **You need to do this to start tracking visitors.**

---

## Step 1: Google Analytics 4 Setup (5 minutes)

### 1.1 Create Your Account

1. Go to: **https://analytics.google.com**
2. Click **"Start measuring"** (or **"Admin"** if you have an account)
3. Click **"Create Account"**
   - Account name: `Refer Labs`
   - Check all data sharing boxes
   - Click **"Next"**

### 1.2 Create Property

1. Property name: `Refer Labs`
2. Timezone: `(GMT+10:00) Australian Eastern Time - Sydney`
3. Currency: `US Dollar ($)` (or `Australian Dollar (A$)`)
4. Click **"Next"**

### 1.3 Business Details

1. Industry: **Internet & Telecom > Software & IT Services**
2. Business size: **Small (1-10 employees)** or **Medium (11-100)**
3. Click **"Next"**

### 1.4 Objectives

Select:
- ✅ **Generate leads**
- ✅ **Examine user behavior**

Click **"Create"** → Accept Terms of Service

### 1.5 Set Up Data Stream

1. Platform: Select **"Web"**
2. Website URL: `https://referlabs.com.au`
3. Stream name: `Refer Labs Website`
4. ✅ Enable **Enhanced measurement** (should be on by default)
5. Click **"Create stream"**

### 1.6 Copy Your Measurement ID

You'll see a screen with your **Measurement ID**. It looks like: `G-XXXXXXXXXX`

**Copy this ID** - you'll need it in the next step.

---

## Step 2: Add to Vercel (3 minutes)

### 2.1 Go to Vercel Dashboard

1. Open: **https://vercel.com/dashboard**
2. Select your **Peppiepep** project
3. Click **"Settings"** (top navigation)
4. Click **"Environment Variables"** (left sidebar)

### 2.2 Add Google Analytics ID

1. Click **"Add New"**
2. Key: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
3. Value: `G-XXXXXXXXXX` (paste your ID from Step 1.6)
4. Environment: Select **ALL three** (Production, Preview, Development)
5. Click **"Save"**

### 2.3 Redeploy

1. Go to **"Deployments"** tab
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**
4. Wait 2-3 minutes for deployment to complete

---

## Step 3: Google Search Console Setup (5 minutes)

### 3.1 Add Your Property

1. Go to: **https://search.google.com/search-console**
2. Click **"Add property"**
3. Select **"URL prefix"** (right side)
4. Enter: `https://referlabs.com.au`
5. Click **"Continue"**

### 3.2 Verify Ownership

1. Select **"HTML tag"** method (should be selected by default)
2. You'll see a meta tag like:
   ```html
   <meta name="google-site-verification" content="ABC123XYZ456..." />
   ```
3. **Copy only the content value** (the part inside the quotes after `content=`)
   - Example: If you see `content="ABC123XYZ456"`, copy `ABC123XYZ456`

### 3.3 Add to Vercel

1. Go back to **Vercel → Settings → Environment Variables**
2. Click **"Add New"**
3. Key: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
4. Value: `ABC123XYZ456` (paste the code you copied)
5. Environment: Select **ALL three**
6. Click **"Save"**

### 3.4 Redeploy Again

1. Go to **"Deployments"** tab
2. Click **"..."** → **"Redeploy"**
3. Wait 2-3 minutes

### 3.5 Verify in Search Console

1. Go back to **Search Console verification page**
2. Click **"Verify"**
3. You should see: ✅ **"Ownership verified"**

### 3.6 Submit Sitemap

1. In Search Console, click **"Sitemaps"** (left sidebar)
2. Enter: `sitemap.xml`
3. Click **"Submit"**
4. Status should show: **"Success"**

---

## Step 4: Test Everything (2 minutes)

### 4.1 Test Google Analytics

1. Open **Google Analytics → Reports → Realtime**
2. In a **new private/incognito window**, visit: `https://referlabs.com.au`
3. In the Realtime report, you should see:
   - **1 user active** (you)
   - Your current page path

If you see this, ✅ **Analytics is working!**

### 4.2 Test Search Console

1. In Search Console, go to **"URL Inspection"** (left sidebar)
2. Enter: `https://referlabs.com.au`
3. You should see:
   - **"URL is on Google"** (might say "URL is not on Google" if brand new - this is normal)
   - **"Sitemap: sitemap.xml"**

---

## ✅ You're Done!

### What's Tracking Now:

- ✅ **Page views** - Every page visit
- ✅ **User sessions** - How long people stay
- ✅ **Traffic sources** - Where visitors come from
- ✅ **Device types** - Mobile vs Desktop
- ✅ **Geographic location** - Country/city
- ✅ **Events** - When you add event tracking code

### What to Check Daily (Week 1):

1. **Google Analytics → Realtime**
   - See live visitors on your site

2. **Google Analytics → Reports → Acquisition**
   - Where traffic comes from

3. **Google Analytics → Reports → Engagement**
   - Most popular pages

### What to Check Weekly:

1. **Search Console → Performance**
   - Search impressions, clicks, position
   - Top search queries
   - Pages getting traffic

2. **Search Console → Coverage**
   - Pages indexed by Google
   - Any indexing errors

---

## Environment Variables Summary

After completing the steps above, you should have these set in Vercel:

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=ABC123XYZ456
```

**Note:** If you want to test locally, also add these to `/Users/jarredkrowitz/Desktop/Peppiepep/.env.local`

---

## Troubleshooting

### "Analytics not showing in Realtime"

**Wait 5 minutes after redeployment**, then:
1. Make sure you're using **incognito/private mode**
2. Check browser console for errors (F12)
3. Verify environment variable is set in Vercel
4. Check deployment logs for build errors

### "Search Console won't verify"

1. Wait 10 minutes after redeployment
2. Make sure you copied **only the content value** (no quotes, no `content=`)
3. Try clearing your browser cache
4. Use **URL Inspection** tool to see what Google sees

### "Sitemap not found"

1. Visit: `https://referlabs.com.au/sitemap.xml` directly
2. You should see XML content
3. If you see a 404, redeploy the application

---

## Next Steps (Optional)

### Set Up Conversion Goals (Recommended)

In Google Analytics:
1. Go to **Admin → Events**
2. Mark these as conversions:
   - ✅ `sign_up` (trial signups)
   - ✅ `purchase` (paid conversions)
   - ✅ `generate_lead` (contact forms)

### Add Google Tag Manager (Advanced)

If you want more flexibility:
1. Create GTM container at: https://tagmanager.google.com
2. Get Container ID (GTM-XXXXXXX)
3. Add to Vercel: `NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX`
4. Redeploy

---

**Questions?** See the full [ANALYTICS_SETUP_GUIDE.md](ANALYTICS_SETUP_GUIDE.md) for detailed troubleshooting.
