# Deployment Checklist - Peppiepep Production

**Status:** ✅ Code Deployed to GitHub
**Vercel:** Auto-deploying now
**URL:** https://peppiepep.vercel.app

---

## ✅ What Just Happened

1. **✅ All code committed to GitHub**
   - Dashboard upgrades (4-tab premium design)
   - Email integration with Resend
   - Enhanced settings and recipient selection
   - All documentation files

2. **✅ Pushed to main branch**
   - Commit: `ddc9014`
   - This automatically triggers Vercel deployment

3. **🚀 Vercel is deploying now**
   - Monitor at: https://vercel.com/dashboard
   - Usually takes 2-3 minutes

---

## 📋 What YOU Need to Do Now

### Step 1: Check Deployment Status (2 minutes)

1. Go to **https://vercel.com/dashboard**
2. Click on **Peppiepep** project
3. Look for deployment with message:
   ```
   "Upgrade to premium 4-tab dashboard with Resend email integration"
   ```
4. Wait for status to show **"Ready"** (usually 2-3 minutes)

**What you'll see:**
```
┌────────────────────────────────────────┐
│ Peppiepep                              │
│ ────────────────────────────────────   │
│                                        │
│ Production                             │
│ ┌────────────────────────────────┐    │
│ │ ddc9014 - Upgrade to premium   │    │
│ │ Building...  ←── Wait for this │    │
│ │ 1 minute ago                   │    │
│ └────────────────────────────────┘    │
│                                        │
│ Will change to:                        │
│ ┌────────────────────────────────┐    │
│ │ ddc9014 - Upgrade to premium   │    │
│ │ ✓ Ready     ←── Success!       │    │
│ │ 3 minutes ago                  │    │
│ └────────────────────────────────┘    │
└────────────────────────────────────────┘
```

---

### Step 2: Add Resend Environment Variables (5 minutes)

**IMPORTANT:** You need to add Resend API key for email campaigns to work!

#### 2.1 Get Resend API Key
1. Go to **https://resend.com/signup** (if not already signed up)
2. Sign up (free, no credit card)
3. Dashboard → **API Keys** → **Create API Key**
4. Copy the key (starts with `re_`)

#### 2.2 Add to Vercel
1. In Vercel dashboard, go to **Peppiepep** project
2. Click **Settings** tab
3. Click **Environment Variables** in sidebar
4. Add **TWO** new variables:

**Variable 1:**
```
Name: RESEND_API_KEY
Value: re_your_actual_api_key_here
Environments: ✓ Production ✓ Preview ✓ Development
```

**Variable 2:**
```
Name: RESEND_FROM_EMAIL
Value: noreply@peppiepep.com
Environments: ✓ Production ✓ Preview ✓ Development
```

5. Click **Save** for each

#### 2.3 Redeploy (Required!)
After adding environment variables, you MUST redeploy:
1. Go to **Deployments** tab
2. Find the latest deployment (ddc9014)
3. Click **"..."** menu
4. Click **Redeploy**
5. Wait 2 minutes for redeployment

**Why?** Environment variables only apply to NEW deployments, not existing ones.

---

### Step 3: Update Production Environment Variables

Make sure these are ALL set in Vercel:

#### Required Variables:
- [✓] `NEXT_PUBLIC_SUPABASE_URL`
- [✓] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [✓] `SUPABASE_SERVICE_ROLE_KEY`
- [✓] `TWILIO_ACCOUNT_SID`
- [✓] `TWILIO_AUTH_TOKEN`
- [✓] `TWILIO_PHONE_NUMBER`
- [✓] `OPENAI_API_KEY`
- [ ] `RESEND_API_KEY` ← **ADD THIS!**
- [ ] `RESEND_FROM_EMAIL` ← **ADD THIS!**

#### Optional (but Recommended):
- [ ] `NEXT_PUBLIC_SITE_URL` = https://peppiepep.vercel.app

---

### Step 4: Verify Deployment (5 minutes)

#### 4.1 Check Homepage
1. Go to **https://peppiepep.vercel.app**
2. Should load without errors
3. Check navigation works

#### 4.2 Check Dashboard
1. Go to **https://peppiepep.vercel.app/dashboard**
2. Log in with your account
3. Verify you see **4 TABS:**
   - Campaigns & AI (purple gradient)
   - Clients & Ambassadors (emerald gradient)
   - Performance (blue gradient)
   - Settings (amber gradient)

#### 4.3 Check Each Tab
**Campaigns & AI:**
- [ ] "Start New Campaign" button visible
- [ ] Campaign builder modal opens
- [ ] AI Tools section visible below

**Clients & Ambassadors:**
- [ ] CSV upload form works
- [ ] Customer table shows with "Copy" buttons on referral links
- [ ] Copy button changes to "Copied!" when clicked

**Performance:**
- [ ] Referrals table visible at top
- [ ] Performance metrics cards visible below
- [ ] Stats show correctly

**Settings:**
- [ ] Business Settings card (with website URL and custom landing URL fields)
- [ ] Rewards Configuration card
- [ ] Advanced Settings card

---

### Step 5: Test Campaigns (10 minutes)

#### Test SMS Campaign:
1. Go to **Campaigns & AI** tab
2. Click **Start New Campaign**
3. Select **SMS** channel
4. Write message with {{name}} and {{referral_link}}
5. **Select 1-2 customers individually** (click on specific rows)
6. Verify rows turn purple with "✓ Selected" badge
7. Click **Send Campaign**
8. Check Twilio logs: https://console.twilio.com/us1/monitor/logs/messages

#### Test Email Campaign:
1. Go to **Campaigns & AI** tab
2. Click **Start New Campaign**
3. Select **EMAIL** channel (important!)
4. Write test message
5. Select customers with email addresses
6. Click **Send Campaign**
7. Check recipient's inbox (may be in spam first time)
8. Check Resend logs: https://resend.com/emails

---

### Step 6: Database Migration (REQUIRED!)

Add new columns to your Supabase database:

1. Ensure the deployment script has Supabase credentials (`SUPABASE_DB_URL` or `SUPABASE_PROJECT_ID`) so `npm run deploy:prod` can run `supabase db push` automatically.
2. If credentials aren't set yet, export them locally before running the deploy command:
   ```bash
   export SUPABASE_DB_URL="postgresql://..."
   # or
   export SUPABASE_PROJECT_ID="your-project-id"
   ```
3. Run `npm run deploy:prod` – it will execute `supabase db push` before Vercel.
4. **Only if automation fails** (e.g., missing env vars), run the following SQL manually in Supabase:
   ```sql
   -- Add new business settings columns
   ALTER TABLE businesses
   ADD COLUMN IF NOT EXISTS website_url TEXT,
   ADD COLUMN IF NOT EXISTS custom_landing_url TEXT;

   -- Add index for better performance
   CREATE INDEX IF NOT EXISTS idx_businesses_website_url ON businesses(website_url);
   ```
5. Verify the migration succeeded either via the CLI output or Supabase dashboard logs.

---

## 🎯 Success Checklist

### Deployment:
- [ ] Vercel deployment shows "Ready" status
- [ ] No build errors in Vercel logs
- [ ] Homepage loads at https://peppiepep.vercel.app
- [ ] Dashboard accessible and shows 4 tabs

### Environment Variables:
- [ ] RESEND_API_KEY added to Vercel
- [ ] RESEND_FROM_EMAIL added to Vercel
- [ ] Project redeployed after adding env vars

### Database:
- [ ] SQL migration run in Supabase
- [ ] website_url and custom_landing_url columns exist

### Features Working:
- [ ] Can select individual recipients (4 out of 9, etc.)
- [ ] Selected recipients show purple background
- [ ] Copy buttons work for referral links
- [ ] Settings tab shows all new fields
- [ ] SMS campaigns send successfully
- [ ] Email campaigns send successfully (after Resend setup)

---

## 🚨 Troubleshooting

### If deployment fails:
1. Check Vercel deployment logs for errors
2. Look for build errors or missing dependencies
3. Check this file for details: **DEPLOYMENT_SUMMARY.md**

### If SMS doesn't work:
1. Verify TWILIO credentials in Vercel env vars
2. Check Twilio console for error messages
3. Ensure Australian phone numbers are in correct format (+61...)

### If Email doesn't work:
1. Verify RESEND_API_KEY is set in Vercel
2. Verify you redeployed after adding the key
3. Check Resend dashboard for error logs
4. Make sure you selected "Email" channel (not SMS)

### If recipient selection doesn't work:
1. Hard refresh the page (Cmd+Shift+R or Ctrl+Shift+R)
2. Clear browser cache
3. Check browser console for JavaScript errors

---

## 📊 Monitoring

### Check These After Deployment:

**Vercel Dashboard:**
- https://vercel.com/dashboard
- Monitor deployment status
- Check for runtime errors

**Twilio Console:**
- https://console.twilio.com/us1/monitor/logs/messages
- Monitor SMS delivery
- Check for errors

**Resend Dashboard:**
- https://resend.com/emails
- Monitor email delivery
- Check spam rates

**Supabase Dashboard:**
- https://supabase.com/dashboard
- Monitor database queries
- Check for errors

---

## 📝 Post-Deployment Tasks

### Immediate (Required):
1. ⚡ Add Resend API key to Vercel
2. ⚡ Redeploy after adding API key
3. ⚡ Run database migration SQL
4. ⚡ Test SMS campaign
5. ⚡ Test email campaign

### Soon (Recommended):
6. 📧 Verify domain in Resend for better deliverability
7. 📊 Monitor first campaign performance
8. 🎯 Add business website URL in Settings
9. ✨ Test all features with real customers

### Later (When Ready):
10. 💰 Upgrade Resend if sending 100+ emails/day
11. 📈 Set up analytics tracking
12. 🎨 Add business logo and branding

---

## 🎉 What's New in This Deployment

### Dashboard:
- ✅ 4 premium tabs instead of 6
- ✅ Beautiful gradient styling on tabs
- ✅ Better organization of features

### Recipient Selection:
- ✅ Can select individual customers (e.g., 4 out of 9)
- ✅ Purple background when selected
- ✅ "✓ Selected" badge
- ✅ Visual feedback

### Settings:
- ✅ Website URL field
- ✅ Custom landing page URL field
- ✅ Better organized with 3 cards
- ✅ More reward type options

### Email Campaigns:
- ✅ Full Resend integration
- ✅ Beautiful HTML templates
- ✅ Mobile-responsive
- ✅ Auto-personalization

### Documentation:
- ✅ Complete Resend setup guides
- ✅ Visual step-by-step instructions
- ✅ Troubleshooting help
- ✅ This deployment checklist

---

## 📞 Support

**Deployment Issues:**
- Check Vercel deployment logs
- See: DEPLOYMENT_SUMMARY.md

**Email Setup:**
- See: RESEND_QUICK_START.md
- See: RESEND_SETUP_COMPLETE_GUIDE.md

**Dashboard Features:**
- See: DASHBOARD_UPGRADE_SUMMARY.md

**Campaign Testing:**
- See: CAMPAIGN_FLOW_TEST_GUIDE.md

---

## ⏱️ Estimated Time to Complete

- **Step 1 (Check Deployment):** 2 minutes
- **Step 2 (Add Resend API Key):** 5 minutes
- **Step 3 (Verify Variables):** 2 minutes
- **Step 4 (Verify Deployment):** 5 minutes
- **Step 5 (Test Campaigns):** 10 minutes
- **Step 6 (Database Migration):** 3 minutes

**Total:** ~27 minutes to full production readiness

---

## 🎯 Your Current Status

```
┌──────────────────────────────────────┐
│ ✅ Code deployed to GitHub           │
│ 🚀 Vercel deploying automatically    │
│ ⏳ Waiting for "Ready" status        │
│ 📋 Need to add Resend API key        │
│ 📋 Need to run database migration    │
│ 📋 Need to test campaigns            │
└──────────────────────────────────────┘
```

---

**Your website is deploying now! Follow the steps above to complete the setup.** 🚀

**Next Step:** Check Vercel dashboard for "Ready" status, then add Resend API key!

**Last Updated:** January 27, 2025
