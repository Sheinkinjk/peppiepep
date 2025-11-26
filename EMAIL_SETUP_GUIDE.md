# Email Campaign Setup Guide

Email campaigns are now fully implemented! Follow these steps to enable email sending.

## Step 1: Sign Up for Resend

1. Go to https://resend.com
2. Click "Start Building for Free"
3. Sign up with your email or GitHub account
4. Verify your email address

**Free Tier:** 3,000 emails/month, 100 emails/day (no credit card required)

## Step 2: Get Your API Key

1. After logging in, go to **API Keys** in the sidebar
2. Click **Create API Key**
3. Give it a name (e.g., "Peppiepep Production")
4. Select **Sending access** permission
5. Click **Create**
6. **IMPORTANT:** Copy the API key immediately (it won't be shown again)

## Step 3: Verify Your Domain (Recommended)

For production use, verify your domain to avoid spam filters:

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain: `peppiepep.com` or `peppiepep.vercel.app`
4. Add the DNS records provided to your domain registrar
5. Wait for verification (usually 1-5 minutes)

**For Testing:** You can skip this and use `onboarding@resend.dev` (free tier only)

## Step 4: Add Environment Variables

### Option A: Vercel (Production)

1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@peppiepep.com
```

**Notes:**
- Use your actual API key from Step 2
- Use `onboarding@resend.dev` for testing (free tier)
- Use `noreply@peppiepep.com` after verifying your domain

5. Redeploy your application

### Option B: Local Development

Add to your `.env.local` file:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@peppiepep.com
```

## Step 5: Test Email Sending

1. Log into your dashboard at https://peppiepep.vercel.app/dashboard
2. Go to the **Campaigns** tab
3. Click **Start New Campaign**
4. Select **Email** channel
5. Write a test message with placeholders:
   ```
   Hi {{name}}!

   Share your referral link and earn rewards: {{referral_link}}

   Thanks for being awesome!
   ```
6. Select a customer (make sure they have an email address)
7. Click **Send Campaign**

## Email Template Features

✅ **Professional HTML design** with gradient header
✅ **Responsive** - works on desktop and mobile
✅ **Personalization** - {{name}} and {{referral_link}} replaced
✅ **Plain text fallback** - for email clients that don't support HTML
✅ **Business branding** - shows your business name
✅ **Subject line** - uses campaign name as subject

## Pricing

**Resend Free Tier:**
- 3,000 emails per month
- 100 emails per day
- No credit card required

**Resend Pro ($20/month):**
- 50,000 emails per month
- 1,000 emails per day
- Custom domain sending

## Troubleshooting

### "Email service not configured" error
**Solution:** Add `RESEND_API_KEY` to environment variables (see Step 4)

### Emails going to spam
**Solutions:**
1. Verify your domain in Resend (see Step 3)
2. Add SPF and DKIM records (provided by Resend)
3. Use a professional "from" address (not @gmail.com)
4. Avoid spam trigger words in subject/content

### "No customers have email addresses"
**Solution:** Import customers with email addresses, or add emails to existing customers

### Rate limiting
**Solution:** Free tier allows 100 emails/day. Upgrade to Pro for 1,000/day.

## Email vs SMS Costs

| Channel | Cost per Message | Use Case |
|---------|-----------------|----------|
| **SMS** | $0.02 | Urgent, high open rates (98%) |
| **Email** | $0.0007 | Cost-effective, detailed content |

**Example Campaign Costs:**
- 100 SMS messages: $2.00
- 100 Email messages: $0.07

Email is 28x cheaper than SMS!

## What's Included

✅ **Bulk email sending** to selected customers
✅ **HTML email templates** with professional design
✅ **Personalization** with {{name}} and {{referral_link}}
✅ **Error handling** for failed sends
✅ **Success/failure tracking** per campaign
✅ **Campaign history** in database

## Next Steps

1. Complete Steps 1-4 above
2. Test with your own email first
3. Send your first real campaign!
4. Monitor deliverability in Resend dashboard

## Support

- **Resend Docs:** https://resend.com/docs
- **Resend Support:** support@resend.com
- **Email Deliverability Guide:** https://resend.com/docs/knowledge-base/deliverability-best-practices

---

**Ready to launch?** Just add your Resend API key to Vercel environment variables and you're live! 🚀
