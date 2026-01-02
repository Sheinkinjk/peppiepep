# Stripe Live Mode Setup Guide

**Current Status:** Test Mode (pk_test_..., sk_test_...)
**Target:** Live Mode (pk_live_..., sk_live_...)
**Last Updated:** 2026-01-03

---

## 🚨 CRITICAL: Why This Matters

Your application is currently in **Stripe Test Mode**, which means:
- ❌ Real credit cards will be declined
- ❌ No actual money will be processed
- ❌ Customers will see "TEST MODE" banners in checkout
- ❌ Subscriptions won't create real recurring charges

**You MUST switch to live mode before accepting real customers.**

---

## Step 1: Activate Your Stripe Account

Before you can get live keys, your Stripe account must be fully activated.

### 1.1 Complete Account Activation

1. Go to https://dashboard.stripe.com/account/onboarding
2. Provide required business information:
   - **Business Type:** Individual / Company / Non-profit
   - **Business Address:** Your Australian address
   - **Business Website:** https://referlabs.com.au
   - **Product Description:** "Referral marketing platform for e-commerce and SaaS businesses"
   - **Expected Volume:** Estimate monthly transaction volume

3. Provide personal information:
   - **Full Legal Name**
   - **Date of Birth**
   - **Address**
   - **Phone Number**
   - **Last 4 digits of SSN/Tax ID** (or Australian TFN/ABN)

4. Add bank account for payouts:
   - **Account Holder Name**
   - **BSB:** 6-digit bank code
   - **Account Number:** Your Australian bank account
   - **Bank Name**

5. Complete identity verification:
   - Upload government-issued ID (Driver's License, Passport)
   - May require additional business documentation (ABN registration, business license)

### 1.2 Wait for Approval

- **Timeline:** Usually instant to 24 hours
- **Status Check:** https://dashboard.stripe.com/account/onboarding
- **Email:** Stripe will send confirmation when activated

---

## Step 2: Get Live API Keys

Once your account is activated:

### 2.1 Access Live Keys

1. Go to https://dashboard.stripe.com/apikeys
2. Toggle to "Live mode" (switch in top-right corner)
3. You'll see two keys:
   - **Publishable key** (starts with `pk_live_...`) - Safe to expose publicly
   - **Secret key** (starts with `sk_live_...`) - NEVER expose publicly

### 2.2 Reveal and Copy Keys

1. Click "Reveal test key token" for the secret key
2. Copy both keys to a secure location (password manager recommended)

---

## Step 3: Update Environment Variables

You need to update these keys in **both** `.env.local` AND Vercel production environment.

### 3.1 Update Local Environment (.env.local)

Replace the test keys with live keys:

```bash
# BEFORE (Test Mode):
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_YOUR_TEST_KEY_HERE"
STRIPE_SECRET_KEY="sk_test_YOUR_TEST_KEY_HERE"

# AFTER (Live Mode):
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_YOUR_LIVE_KEY_HERE"
STRIPE_SECRET_KEY="sk_live_YOUR_LIVE_KEY_HERE"
```

### 3.2 Update Vercel Production Environment

**Option A: Via Vercel Dashboard (Recommended)**

1. Go to https://vercel.com/jarred-krowitz-projects/peppiepep/settings/environment-variables
2. Find `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Click "Edit" (pencil icon)
   - Replace with `pk_live_...`
   - Save
3. Find `STRIPE_SECRET_KEY`
   - Click "Edit"
   - Replace with `sk_live_...`
   - Save
4. **Important:** Redeploy your application after updating

**Option B: Via Vercel CLI**

```bash
# Update publishable key
npx vercel env rm NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production
echo "pk_live_YOUR_ACTUAL_LIVE_KEY" | npx vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production

# Update secret key
npx vercel env rm STRIPE_SECRET_KEY production
echo "sk_live_YOUR_ACTUAL_LIVE_KEY" | npx vercel env add STRIPE_SECRET_KEY production

# Redeploy
npx vercel --prod
```

---

## Step 4: Configure Webhook Endpoint

Currently, your `STRIPE_WEBHOOK_SECRET` is a placeholder. You need to create a real webhook endpoint.

### 4.1 Create Webhook Endpoint

1. Go to https://dashboard.stripe.com/webhooks
2. Toggle to "Live mode" (top-right)
3. Click "+ Add endpoint"
4. Enter endpoint URL:
   ```
   https://referlabs.com.au/api/stripe/webhook
   ```
5. Select events to listen for:
   - ✅ `payment_intent.succeeded`
   - ✅ `payment_intent.payment_failed`
   - ✅ `customer.subscription.created`
   - ✅ `customer.subscription.updated`
   - ✅ `customer.subscription.deleted`
   - ✅ `invoice.paid`
   - ✅ `invoice.payment_failed`
   - ✅ `checkout.session.completed`

6. Click "Add endpoint"

### 4.2 Get Signing Secret

1. After creating the endpoint, click on it
2. Scroll down to "Signing secret"
3. Click "Reveal"
4. Copy the secret (starts with `whsec_...`)

### 4.3 Update Webhook Secret

**In .env.local:**
```bash
# BEFORE:
STRIPE_WEBHOOK_SECRET="whsec_production_placeholder"

# AFTER:
STRIPE_WEBHOOK_SECRET="whsec_YOUR_ACTUAL_SECRET_HERE"
```

**In Vercel:**
```bash
npx vercel env rm STRIPE_WEBHOOK_SECRET production
echo "whsec_YOUR_ACTUAL_SECRET_HERE" | npx vercel env add STRIPE_WEBHOOK_SECRET production
```

Or update via dashboard: https://vercel.com/jarred-krowitz-projects/peppiepep/settings/environment-variables

---

## Step 5: Update Product Prices (If Needed)

Your current price IDs are for test mode. In live mode, you'll need live price IDs.

### 5.1 Check Existing Products

1. Go to https://dashboard.stripe.com/products
2. Toggle to "Live mode"
3. Check if your products exist:
   - Base Plan (Monthly)
   - Base Plan (Annual)
   - Scale Plan (Monthly)
   - Scale Plan (Annual)

### 5.2 Create Products (If Missing)

If products don't exist in live mode:

1. Click "Add product"
2. **Base Plan:**
   - Name: "Base Plan"
   - Description: "Essential referral marketing features"
   - Pricing:
     - Monthly: Create recurring price → copy price ID
     - Annual: Create recurring price → copy price ID

3. **Scale Plan:**
   - Name: "Scale Plan"
   - Description: "Advanced features for scaling businesses"
   - Pricing:
     - Monthly: Create recurring price → copy price ID
     - Annual: Create recurring price → copy price ID

### 5.3 Update Price IDs

If you created new products, update these in `.env.local` and Vercel:

```bash
NEXT_PUBLIC_STRIPE_PRICE_BASE_MONTHLY="price_LIVE_BASE_MONTHLY_ID"
NEXT_PUBLIC_STRIPE_PRICE_BASE_ANNUAL="price_LIVE_BASE_ANNUAL_ID"
NEXT_PUBLIC_STRIPE_PRICE_SCALE_MONTHLY="price_LIVE_SCALE_MONTHLY_ID"
NEXT_PUBLIC_STRIPE_PRICE_SCALE_ANNUAL="price_LIVE_SCALE_ANNUAL_ID"
```

**Note:** Your test price IDs might work in live mode if you recreated the same products. Test to verify.

---

## Step 6: Test Live Mode

Before going fully live, test with a real card in a controlled environment.

### 6.1 Test Subscription Flow

1. Deploy updated environment variables to Vercel
2. Open https://referlabs.com.au in incognito/private mode
3. Sign up for a new account
4. Attempt to subscribe to Base Plan (monthly)
5. Use a real credit card with small amount OR use Stripe test card:
   - **Card Number:** 4242 4242 4242 4242
   - **Expiry:** Any future date
   - **CVC:** Any 3 digits
   - **ZIP:** Any valid ZIP

6. Verify in Stripe dashboard:
   - Go to https://dashboard.stripe.com/payments
   - Toggle to "Live mode"
   - Check if payment appears
   - Verify amount is correct
   - Check customer was created

### 6.2 Test Webhook Delivery

1. Go to https://dashboard.stripe.com/webhooks
2. Click on your webhook endpoint
3. Check "Events" tab
4. Verify events are being sent successfully (200 response)
5. If failures occur:
   - Check endpoint URL is correct
   - Check webhook secret matches environment variable
   - Review Vercel logs for errors

### 6.3 Test Subscription Creation

1. After successful payment, check your database:
   - Log into Supabase: https://supabase.com/dashboard/project/ovpsgbstrdahrdcllswa
   - Navigate to Table Editor → `subscriptions` table
   - Verify subscription record was created
   - Check `status` = 'active'
   - Check `stripe_subscription_id` matches Stripe dashboard

---

## Step 7: Redeploy Application

After all environment variables are updated:

### 7.1 Redeploy via Vercel

```bash
# Trigger production deployment
npx vercel --prod
```

Or via Vercel dashboard:
1. Go to https://vercel.com/jarred-krowitz-projects/peppiepep
2. Click "Deployments" tab
3. Find latest deployment
4. Click "..." → "Redeploy"
5. Check "Use existing build cache" (faster)
6. Click "Redeploy"

### 7.2 Verify Deployment

1. Wait for deployment to complete (~2 minutes)
2. Visit https://referlabs.com.au
3. Check browser console for errors
4. Verify no "Test Mode" banners appear in Stripe checkout

---

## Step 8: Monitor First Transactions

After going live, closely monitor for the first 24-48 hours:

### 8.1 Monitor Stripe Dashboard

- **Payments:** https://dashboard.stripe.com/payments
- **Subscriptions:** https://dashboard.stripe.com/subscriptions
- **Webhooks:** https://dashboard.stripe.com/webhooks (check for failures)
- **Disputes:** https://dashboard.stripe.com/disputes

### 8.2 Monitor Application Logs

- **Vercel Logs:** https://vercel.com/jarred-krowitz-projects/peppiepep/logs
- **Supabase Logs:** https://supabase.com/dashboard/project/ovpsgbstrdahrdcllswa/logs/explorer
- Look for webhook errors, payment failures, subscription issues

### 8.3 Set Up Alerts

1. **Stripe Alerts:**
   - Go to https://dashboard.stripe.com/settings/notifications
   - Enable email notifications for:
     - Payment failures
     - Disputed charges
     - Webhook failures

2. **Vercel Alerts:**
   - Go to https://vercel.com/jarred-krowitz-projects/peppiepep/settings/notifications
   - Enable deployment failure alerts

---

## Rollback Plan (If Issues Occur)

If you encounter critical issues after switching to live mode:

### Emergency Rollback

1. **Revert to test keys immediately:**
   ```bash
   # Update Vercel environment variables back to test keys
   npx vercel env rm NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production
   echo "pk_test_YOUR_TEST_KEY" | npx vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production

   npx vercel env rm STRIPE_SECRET_KEY production
   echo "sk_test_YOUR_TEST_KEY" | npx vercel env add STRIPE_SECRET_KEY production
   ```

2. **Redeploy:**
   ```bash
   npx vercel --prod
   ```

3. **Notify users:**
   - Post banner on website: "Payment processing temporarily unavailable"
   - Send email to any customers who attempted to subscribe

4. **Debug issue:**
   - Review Vercel logs
   - Review Stripe webhook events
   - Check database for inconsistencies
   - Fix issue in development environment first

5. **Re-attempt live mode switch** once issue is resolved

---

## Common Issues & Solutions

### Issue 1: "No such price" Error

**Cause:** Using test mode price IDs in live mode

**Solution:**
- Create new products in live mode
- Update price IDs in environment variables
- Redeploy application

---

### Issue 2: Webhooks Failing (401/403)

**Cause:** Webhook secret mismatch

**Solution:**
- Verify `STRIPE_WEBHOOK_SECRET` in Vercel matches Stripe dashboard
- Check for trailing spaces or newlines in secret
- Redeploy after fixing

---

### Issue 3: Payments Succeed but Subscriptions Not Created

**Cause:** Webhook not triggering subscription creation

**Solution:**
- Check webhook endpoint is receiving events
- Review application logs for errors in webhook handler
- Verify database permissions (RLS policies)
- Check `customer.subscription.created` event is enabled

---

### Issue 4: "Account Not Activated" Error

**Cause:** Stripe account not fully activated

**Solution:**
- Complete account activation at https://dashboard.stripe.com/account/onboarding
- Provide all required business information
- Wait for approval (usually 24 hours)

---

## Security Checklist

Before going live, verify:

- [ ] Secret key (`sk_live_...`) is NEVER exposed in client-side code
- [ ] Secret key is stored in environment variables, not committed to git
- [ ] Webhook signature verification is enabled in your API route
- [ ] HTTPS is enforced on all pages (Vercel does this automatically)
- [ ] Rate limiting is enabled on payment endpoints
- [ ] Subscription creation requires authentication
- [ ] User can only access their own subscription data (RLS policies)

---

## Final Checklist

- [ ] Stripe account fully activated
- [ ] Live API keys obtained from Stripe dashboard
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` updated in .env.local
- [ ] `STRIPE_SECRET_KEY` updated in .env.local
- [ ] Both keys updated in Vercel production environment
- [ ] Webhook endpoint created at https://dashboard.stripe.com/webhooks
- [ ] Webhook secret obtained and updated
- [ ] `STRIPE_WEBHOOK_SECRET` updated in .env.local and Vercel
- [ ] Live products and prices created (if needed)
- [ ] Price IDs updated in environment variables
- [ ] Application redeployed to Vercel
- [ ] Test subscription completed successfully
- [ ] Webhook events delivering successfully (200 responses)
- [ ] Subscription record created in database
- [ ] Monitoring enabled for payments, webhooks, and logs
- [ ] Rollback plan documented and understood

---

## Support Resources

- **Stripe Documentation:** https://stripe.com/docs/keys
- **Stripe Support:** https://support.stripe.com
- **Webhook Testing:** https://stripe.com/docs/webhooks/test
- **Vercel Environment Variables:** https://vercel.com/docs/concepts/projects/environment-variables

---

## Estimated Time to Complete

- **Account activation:** 5-10 minutes (+ wait for approval)
- **Getting live keys:** 2 minutes
- **Updating environment variables:** 10 minutes
- **Creating webhook endpoint:** 5 minutes
- **Updating webhook secret:** 5 minutes
- **Creating live products (if needed):** 10 minutes
- **Redeployment:** 3 minutes
- **Testing:** 15 minutes

**Total:** ~1 hour (excluding account activation wait time)

---

## Status: Ready to Execute

All prerequisites are met. Follow the steps above sequentially to switch from test mode to live mode safely.

**IMPORTANT:** Do NOT skip testing step. Always verify with a test transaction before announcing live mode to customers.

Good luck with your live launch! 🚀
