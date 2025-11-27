# Resend Email Setup - Quick Start (5 Minutes)

**Your dashboard is already configured for email sending - you just need to add your Resend API key!**

---

## Step 1: Get Resend API Key (2 minutes)

1. Go to **https://resend.com/signup**
2. Sign up (free - no credit card needed)
3. Click **"API Keys"** in sidebar
4. Click **"Create API Key"**
5. Copy the key (starts with `re_`)

**Example:** `re_abc123xyz789...`

---

## Step 2: Add to Vercel Production (2 minutes)

1. Go to **https://vercel.com/dashboard**
2. Select **Peppiepep** project
3. **Settings** → **Environment Variables**
4. Add these TWO variables:

```
Name: RESEND_API_KEY
Value: [paste your API key from Step 1]
Environments: Production, Preview, Development

Name: RESEND_FROM_EMAIL
Value: noreply@peppiepep.com
Environments: Production, Preview, Development
```

5. Click **Save** for each
6. Go to **Deployments** → Click **"..."** → **Redeploy**

---

## Step 3: Add to Local Development (1 minute)

I've already added placeholders to your `.env.local` file. Just replace the API key:

**In `.env.local` line 12:**
```bash
RESEND_API_KEY=re_PASTE_YOUR_ACTUAL_KEY_HERE
```

Then restart your dev server:
```bash
# Stop the server (Ctrl+C)
npm run dev
```

---

## Step 4: Test It! (2 minutes)

1. Go to **https://peppiepep.vercel.app/dashboard**
2. Click **"Campaigns & AI"** tab
3. Click **"Start New Campaign"**
4. Select **"Email"** channel (important!)
5. Write a test message:
   ```
   Hi {{name}}!

   Testing our email system.
   Your referral link: {{referral_link}}
   ```
6. Select 1-2 customers with email addresses
7. Click **"Send Campaign"**
8. Check your customer's email inbox!

---

## What You Get

✅ Beautiful HTML emails with your branding
✅ Mobile-responsive design
✅ Automatic personalization (name, referral links)
✅ Professional template with purple gradient header
✅ Plain text fallback for old email clients

---

## Troubleshooting

**"Email service not configured"**
→ Check Vercel environment variables and redeploy

**Emails in spam folder**
→ Normal for first few emails. See full guide for domain verification.

**"Failed to send email"**
→ Check customer has valid email address in database

---

## Want Better Deliverability?

**Verify your domain** (takes 20 extra minutes):
- Emails won't go to spam
- Send from hello@yourdomain.com instead of noreply@peppiepep.com
- Looks more professional

**See full guide:** [RESEND_SETUP_COMPLETE_GUIDE.md](RESEND_SETUP_COMPLETE_GUIDE.md)

---

## Pricing

**Free Tier (You're on this):**
- 100 emails/day
- 3,000 emails/month
- All features included
- **Cost: $0/month**

**Pro Tier (When you need more):**
- 50,000 emails/month
- Better deliverability
- Priority support
- **Cost: $20/month**

Start free, upgrade when needed!

---

## Support

**Full Documentation:** [RESEND_SETUP_COMPLETE_GUIDE.md](RESEND_SETUP_COMPLETE_GUIDE.md)

**Resend Dashboard:** https://resend.com/emails

**Need help?** Check error message in dashboard or Resend logs

---

**That's it! You're ready to send email campaigns.** 🚀

Last Updated: January 27, 2025
