# Resend Email Setup - Complete Guide

**For:** https://peppiepep.vercel.app/
**Date:** January 27, 2025
**Status:** Ready to Configure

---

## What is Resend?

Resend is a modern email API that makes it easy to send beautiful transactional and marketing emails. Your Peppiepep dashboard already has the code integrated - you just need to add your API key!

---

## Step 1: Sign Up for Resend (FREE)

### 1.1 Create Account
1. Go to **https://resend.com**
2. Click **"Get Started"** or **"Sign Up"**
3. Sign up with:
   - **Email:** Your business email (e.g., jarred@yourbusiness.com)
   - OR use **GitHub** login (faster)
4. Verify your email if required

### 1.2 Resend Pricing (Current)
- **Free Tier:**
  - 100 emails/day
  - 3,000 emails/month
  - Perfect for testing and small campaigns
- **Pro Tier:** $20/month
  - 50,000 emails/month
  - Custom domain support
  - Better deliverability

**Recommendation:** Start with FREE tier for testing!

---

## Step 2: Get Your API Key

### 2.1 Create API Key
1. Once logged in, click **"API Keys"** in the left sidebar
2. Click **"Create API Key"**
3. Give it a name: **"Peppiepep Production"**
4. Select permissions: **"Sending access"** (default)
5. Click **"Create"**

### 2.2 Copy Your API Key
⚠️ **IMPORTANT:** Copy the API key immediately - you won't see it again!

It looks like this:
```
re_123abc456def789ghi012jkl345mno678
```

**Keep this secret!** Don't share it or commit it to GitHub.

---

## Step 3: Add API Key to Your Project

### 3.1 Local Development (.env.local)
I'll add the variables to your local environment file now:

### 3.2 For Vercel Production
1. Go to **https://vercel.com/dashboard**
2. Select your **Peppiepep** project
3. Click **"Settings"** tab
4. Click **"Environment Variables"** in left sidebar
5. Add TWO new variables:

**Variable 1:**
- **Name:** `RESEND_API_KEY`
- **Value:** `re_your_actual_api_key_here` (paste from Step 2.2)
- **Environment:** Check all (Production, Preview, Development)
- Click **"Save"**

**Variable 2:**
- **Name:** `RESEND_FROM_EMAIL`
- **Value:** `noreply@peppiepep.com` (or your verified domain email)
- **Environment:** Check all (Production, Preview, Development)
- Click **"Save"**

### 3.3 Redeploy
After adding environment variables:
1. Go to **"Deployments"** tab
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**
4. OR just push a new commit to trigger deployment

---

## Step 4: Verify Your Domain (RECOMMENDED)

### Why Verify Your Domain?
- **Better Deliverability:** Emails less likely to go to spam
- **Professional Look:** Send from your@yourbusiness.com instead of noreply@peppiepep.com
- **Brand Trust:** Recipients see your real domain

### 4.1 Add Your Domain
1. In Resend dashboard, click **"Domains"** in left sidebar
2. Click **"Add Domain"**
3. Enter your domain: **yourbusiness.com** (without www)
4. Click **"Add"**

### 4.2 Add DNS Records
Resend will show you DNS records to add. You need to add these to your domain registrar (GoDaddy, Namecheap, etc.):

**Example DNS Records:**
```
Type: TXT
Name: _resend
Value: resend-verification=abc123xyz789

Type: TXT
Name: yourbusiness.com
Value: v=DKIM1; k=rsa; p=MIGfMA0GCS...

Type: CNAME
Name: resend._domainkey
Value: resend._domainkey.resend.com
```

### 4.3 Wait for Verification
- DNS propagation takes **5-30 minutes**
- Resend will automatically verify
- You'll see a green checkmark when ready

### 4.4 Update Your Email Address
Once verified, update `RESEND_FROM_EMAIL` in Vercel:
- Change from: `noreply@peppiepep.com`
- Change to: `hello@yourbusiness.com` (use YOUR verified domain)

---

## Step 5: Test Email Sending

### 5.1 From Dashboard
1. Go to https://peppiepep.vercel.app/dashboard
2. Click **"Campaigns & AI"** tab
3. Click **"Start New Campaign"**
4. Fill in:
   - **Campaign Name:** "Test Email Campaign"
   - **Channel:** Select **"Email"** (important!)
   - **Message:**
     ```
     Hi {{name}}!

     Testing our new email system. Share your referral link and earn rewards!

     Your unique link: {{referral_link}}
     ```
5. **Select Recipients:** Click on 1-2 customers with valid email addresses
6. Click **"Send Campaign"**

### 5.2 Check Results
- You should see: **"✅ Campaign sent successfully! Sent to X recipients"**
- Check the recipient's inbox (might be in spam folder first time)
- Check Resend dashboard for delivery logs

### 5.3 If It Fails
Check the error message:
- **"Email service not configured"** → API key not added to Vercel
- **"Failed to send email"** → Check Resend dashboard logs
- **Emails go to spam** → Verify your domain (Step 4)

---

## Step 6: Understanding the Email Template

### Current Email Design
Your emails use a beautiful, responsive HTML template:

**Features:**
- 📱 Mobile-friendly responsive design
- 🎨 Purple/pink gradient header with your business name
- 💬 Personalized message content
- 🔗 Clickable referral links
- 📝 Professional footer

**Example Preview:**
```
┌─────────────────────────────┐
│  [Purple Gradient Header]   │
│  Your Business Name          │
├─────────────────────────────┤
│                             │
│  Hi John!                   │
│                             │
│  Share your referral link   │
│  and earn rewards!          │
│                             │
│  Your link: [Click Here]    │
│                             │
├─────────────────────────────┤
│  [Footer]                   │
│  Your Business Name         │
│  You received this email... │
└─────────────────────────────┘
```

### Personalization
The template automatically replaces:
- `{{name}}` → Customer's actual name
- `{{referral_link}}` → Customer's unique referral link

---

## Current Implementation Details

### Code Location
All email logic is in: [src/app/dashboard/page.tsx](src/app/dashboard/page.tsx:434-527)

### Email Features Already Implemented ✅
- ✅ HTML + Plain text versions
- ✅ Responsive mobile design
- ✅ Personalization (name, referral link)
- ✅ Professional template with your business branding
- ✅ Error handling and retry logic
- ✅ Campaign tracking (success/failure counts)

### Environment Variables Used
```bash
RESEND_API_KEY=re_your_key_here
RESEND_FROM_EMAIL=noreply@peppiepep.com  # Or your verified domain
```

---

## Troubleshooting Common Issues

### Issue 1: "Email service not configured"
**Problem:** RESEND_API_KEY not found
**Solution:**
1. Check Vercel environment variables are saved
2. Redeploy after adding variables
3. Make sure variable name is exactly `RESEND_API_KEY` (case-sensitive)

### Issue 2: Emails going to spam
**Problem:** Domain not verified
**Solution:**
1. Follow Step 4 to verify your domain
2. Add all required DNS records
3. Wait 30 minutes for propagation
4. Send test email after verification

### Issue 3: "Failed to send email"
**Problem:** API key invalid or account suspended
**Solution:**
1. Check Resend dashboard: https://resend.com/emails
2. Verify API key is active (not deleted)
3. Check if you've hit free tier limit (100/day)
4. Look at error logs in Resend dashboard

### Issue 4: Customer has no email address
**Problem:** Customer record missing email
**Solution:**
1. Go to "Clients & Ambassadors" tab
2. Upload CSV with email column
3. Or add emails manually to existing customers

---

## Testing Checklist

### Before Going Live:
- [ ] Resend account created
- [ ] API key copied and saved securely
- [ ] `RESEND_API_KEY` added to Vercel
- [ ] `RESEND_FROM_EMAIL` added to Vercel
- [ ] Project redeployed on Vercel
- [ ] Test email sent successfully
- [ ] Email received in inbox (not spam)
- [ ] Email looks good on mobile
- [ ] Referral link in email works
- [ ] (Optional) Domain verified for better deliverability

### After Domain Verification:
- [ ] DNS records added to domain registrar
- [ ] Domain shows "Verified" in Resend dashboard
- [ ] `RESEND_FROM_EMAIL` updated to use your domain
- [ ] Test email sent from verified domain
- [ ] Email deliverability improved (not in spam)

---

## Quick Start Summary

**If you just want to test quickly (5 minutes):**

1. **Sign up:** https://resend.com
2. **Get API key:** Dashboard → API Keys → Create
3. **Add to Vercel:**
   - Go to project settings
   - Add `RESEND_API_KEY` = your key
   - Add `RESEND_FROM_EMAIL` = noreply@peppiepep.com
4. **Redeploy** on Vercel
5. **Test:** Dashboard → Campaigns → Email campaign

**For production (30 minutes extra):**
- Follow Step 4 to verify your domain
- Update `RESEND_FROM_EMAIL` to use your domain
- Much better email deliverability!

---

## Pricing Comparison

### Free Tier (Perfect for Testing)
- ✅ 100 emails/day
- ✅ 3,000 emails/month
- ✅ All features included
- ✅ Good deliverability
- ❌ No custom domain
- **Cost:** $0/month

### Pro Tier (For Scaling)
- ✅ 50,000 emails/month
- ✅ Custom domain support
- ✅ Better deliverability
- ✅ Priority support
- ✅ Advanced analytics
- **Cost:** $20/month

**Recommendation:** Start FREE, upgrade when sending 100+ emails/day

---

## Support Resources

### Resend Resources:
- **Dashboard:** https://resend.com/dashboard
- **Documentation:** https://resend.com/docs
- **Email Logs:** https://resend.com/emails
- **Domain Setup:** https://resend.com/docs/dashboard/domains/introduction

### Peppiepep Resources:
- **Campaign Testing:** See [CAMPAIGN_FLOW_TEST_GUIDE.md](CAMPAIGN_FLOW_TEST_GUIDE.md)
- **Deployment:** See [DEPLOYMENT_SUMMARY.md](DEPLOYMENT_SUMMARY.md)
- **Dashboard Updates:** See [DASHBOARD_UPGRADE_SUMMARY.md](DASHBOARD_UPGRADE_SUMMARY.md)

---

## What Happens When You Send an Email Campaign?

### Behind the Scenes:
1. You click "Send Campaign" with Email channel selected
2. Dashboard sends request to Resend API with your API key
3. Resend processes each email:
   - Personalizes with customer name
   - Adds unique referral link
   - Renders beautiful HTML template
   - Sends from your configured email address
4. Resend delivers emails to recipients
5. Dashboard shows success/failure count
6. You can track deliveries in Resend dashboard

### Email Journey:
```
Your Dashboard → Resend API → Recipient's Inbox
     ↓              ↓              ↓
  Compose      Process &       Opens &
  Campaign      Deliver        Clicks
```

---

## Next Steps After Setup

### 1. Send Test Campaign
- Send to yourself first
- Verify email looks good
- Check spam score

### 2. Verify Domain (Recommended)
- Better deliverability
- Professional appearance
- Build sender reputation

### 3. Start Real Campaigns
- Segment your customers
- Write compelling messages
- Track results in dashboard

### 4. Monitor Performance
- Check open rates in Resend
- Track referral conversions
- Optimize message content

---

## Need Help?

**If you get stuck:**
1. Check the error message in dashboard
2. Look at Resend email logs: https://resend.com/emails
3. Verify environment variables in Vercel
4. Try the troubleshooting section above

**Still stuck?** Check that:
- ✅ Resend account is active
- ✅ API key is valid and copied correctly
- ✅ Environment variables are saved in Vercel
- ✅ Project was redeployed after adding variables
- ✅ Customers have valid email addresses

---

**You're all set! Email campaigns are ready to send once you add your Resend API key to Vercel.** 🚀

**Last Updated:** January 27, 2025
