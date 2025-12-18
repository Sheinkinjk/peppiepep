# Stripe Payment Setup Guide

This guide walks you through setting up payment collection with Stripe for the Refer Labs platform.

## Prerequisites

✅ Stripe account created and verified
✅ API keys added to `.env.local`
✅ Database migration completed
✅ Commission tracking system implemented

## Step 1: Create Products and Prices in Stripe Dashboard

### 1.1 Navigate to Stripe Products

1. Go to https://dashboard.stripe.com/test/products
2. Click "Add product"

### 1.2 Create Base Plan

**Product Details:**
- Name: `Refer Labs - Base Plan`
- Description: `Launch-ready program for small teams`
- Image: Upload product image (optional)

**Pricing:**
- Price: `$499` AUD
- Billing period: `Monthly` (or create both monthly and annual)
- Currency: `AUD`

Click "Save product"

**IMPORTANT:** Copy the Price ID (starts with `price_`) - you'll need this

### 1.3 Create Scale Plan

Repeat the above process with:
- Name: `Refer Labs - Scale Plan`
- Description: `For teams running steady campaigns`
- Price: `$599` AUD (monthly)

**IMPORTANT:** Copy the Price ID

### 1.4 Example Price IDs You'll Get

```
Base Plan Monthly: price_1AbCdEfGhIjKlMnO
Scale Plan Monthly: price_2XyZaBcDeFgHiJkL
```

## Step 2: Update Environment Variables

Add the webhook secret to `.env.local`:

```bash
# Add this line (you'll get the value in Step 3)
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

## Step 3: Set Up Stripe Webhook

### 3.1 Install Stripe CLI (for local testing)

```bash
brew install stripe/stripe-cli/stripe
```

### 3.2 Login to Stripe CLI

```bash
stripe login
```

### 3.3 Test Webhooks Locally

In a new terminal window, run:

```bash
stripe listen --forward-to http://localhost:3000/api/stripe/webhook
```

This will output a webhook signing secret like:
```
> Ready! Your webhook signing secret is whsec_xxxxxxxxxxxxx
```

Copy this secret and add it to your `.env.local` file as `STRIPE_WEBHOOK_SECRET`

### 3.4 Set Up Production Webhook (when deploying)

1. Go to https://dashboard.stripe.com/test/webhooks
2. Click "Add endpoint"
3. Endpoint URL: `https://yourdomain.com/api/stripe/webhook`
4. Select events to listen to:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `customer.created`
   - `charge.refunded`
5. Click "Add endpoint"
6. Copy the "Signing secret" and add it to your production environment variables

## Step 4: Integrate Checkout into Your Application

### 4.1 Update the Pricing Page

The existing pricing page at `/pricing` needs to be updated to use actual Stripe Price IDs.

Edit `src/app/pricing/page.tsx` and add checkout functionality:

```typescript
import { redirectToCheckout } from '@/lib/stripe-checkout';

// Add this function
async function handleSubscribe(priceId: string, planName: string) {
  try {
    setLoading(true);

    // Get current user and business from your auth context
    const user = await getCurrentUser(); // Implement this
    const business = await getUserBusiness(); // Implement this

    await redirectToCheckout({
      priceId: priceId,
      customerId: user.id,
      businessId: business.id,
      metadata: {
        plan: planName,
      },
    });
  } catch (error) {
    console.error('Checkout error:', error);
    alert('Failed to start checkout. Please try again.');
  } finally {
    setLoading(false);
  }
}
```

### 4.2 Example: Add "Subscribe" Button

Replace the current "Register Now" links with:

```typescript
<button
  onClick={() => handleSubscribe('price_YOUR_ACTUAL_PRICE_ID', 'Base')}
  className="..."
>
  Subscribe Now
</button>
```

## Step 5: Test the Payment Flow

### 5.1 Start Your Development Server

```bash
npm run dev
```

### 5.2 Start Stripe Webhook Forwarding

In another terminal:

```bash
stripe listen --forward-to http://localhost:3000/api/stripe/webhook
```

### 5.3 Test a Payment

1. Go to http://localhost:3000/pricing
2. Click "Subscribe Now" on any plan
3. Use Stripe test card: `4242 4242 4242 4242`
   - Expiry: Any future date (e.g., 12/34)
   - CVC: Any 3 digits (e.g., 123)
   - ZIP: Any 5 digits (e.g., 12345)

### 5.4 Verify the Flow

**What Should Happen:**

1. ✅ Redirects to Stripe Checkout
2. ✅ Payment completes successfully
3. ✅ Redirects to `/payment/success?session_id=cs_xxx`
4. ✅ Webhook receives `payment_intent.succeeded` event
5. ✅ Payment record created in `stripe_payments` table
6. ✅ If business was referred, commission created in `stripe_commissions`

**Check the Database:**

```sql
-- Check payment was recorded
SELECT * FROM stripe_payments ORDER BY created_at DESC LIMIT 1;

-- Check webhook was logged
SELECT * FROM stripe_webhook_events ORDER BY created_at DESC LIMIT 5;

-- Check commission was created (if applicable)
SELECT * FROM stripe_commissions ORDER BY created_at DESC LIMIT 1;
```

### 5.5 Test Webhook Events

You can trigger test events manually:

```bash
# Trigger a test payment success
stripe trigger payment_intent.succeeded

# Trigger a test refund
stripe trigger charge.refunded
```

## Step 6: API Endpoints Reference

### Create Checkout Session

**Endpoint:** `POST /api/stripe/create-checkout`

**Request:**
```json
{
  "priceId": "price_1AbCdEfGhIjKlMnO",
  "customerId": "uuid-of-customer",
  "businessId": "uuid-of-business",
  "metadata": {
    "plan": "base",
    "source": "pricing_page"
  }
}
```

**Response:**
```json
{
  "success": true,
  "sessionId": "cs_test_xxxxx",
  "url": "https://checkout.stripe.com/c/pay/cs_test_xxxxx"
}
```

### Webhook Endpoint

**Endpoint:** `POST /api/stripe/webhook`

Automatically receives and processes Stripe events:
- Logs all events to `stripe_webhook_events`
- Creates payment records
- Creates revenue share commissions automatically
- Handles refunds

## Step 7: Testing Revenue Share Commissions

### 7.1 Set Up Test Scenario

1. Create a partner application through the admin referral link
   - Go to `/our-referral-program` with cookie `referredBy=Jn9wjbn2kQlO`
   - Fill out partner application
   - ✅ This creates a $100 signup bonus commission

2. Get the partner's business ID from the database:
```sql
SELECT b.id, b.name, c.email
FROM businesses b
JOIN auth.users u ON u.id = b.owner_id
JOIN customers c ON c.email = u.email
WHERE c.email = 'partner@example.com';
```

### 7.2 Simulate Partner Payment

Use the webhook test endpoint or make a payment with that business_id in metadata:

```typescript
await redirectToCheckout({
  priceId: 'price_YOUR_PRICE_ID',
  customerId: 'partner-customer-id',
  businessId: 'partner-business-id', // This is key!
  metadata: {
    plan: 'base',
  },
});
```

### 7.3 Verify Commissions

```sql
-- Check all commissions for admin ambassador
SELECT
  sc.*,
  c.name as ambassador_name,
  c.email as ambassador_email
FROM stripe_commissions sc
JOIN customers c ON c.id = sc.ambassador_id
WHERE c.email = 'jarred@referlabs.com.au'
ORDER BY sc.created_at DESC;
```

You should see:
1. **Signup bonus:** $100 (created when partner applied)
2. **Revenue share:** 10% of $499 = $49.90 (created when payment succeeded)

## Step 8: Monitor and Debug

### 8.1 Check Webhook Logs

```sql
SELECT
  event_type,
  processed,
  processing_error,
  created_at
FROM stripe_webhook_events
ORDER BY created_at DESC
LIMIT 10;
```

### 8.2 Check Payment Records

```sql
SELECT
  p.id,
  p.amount_total / 100.0 as amount_aud,
  p.status,
  p.paid_at,
  b.name as business_name
FROM stripe_payments p
LEFT JOIN businesses b ON b.id = p.business_id
ORDER BY p.created_at DESC;
```

### 8.3 Check Commission Balances

```sql
SELECT * FROM ambassador_commission_balances
WHERE ambassador_email = 'jarred@referlabs.com.au';
```

## Step 9: Common Issues and Solutions

### Issue: Webhook signature verification failed

**Solution:** Make sure `STRIPE_WEBHOOK_SECRET` in `.env.local` matches the secret from `stripe listen` or your webhook endpoint settings.

### Issue: Payment created but no commission

**Check:**
1. Does the referral exist? `SELECT * FROM referrals WHERE referred_to = 'business-id';`
2. Is the referral type 'partner'?
3. Check webhook logs for errors: `SELECT * FROM stripe_webhook_events WHERE processed = false;`

### Issue: Checkout session not creating

**Check:**
1. Valid Price ID? Check Stripe Dashboard
2. Customer exists in database?
3. Console logs in browser DevTools
4. Network tab for API errors

## Next Steps

Once payment collection is working:

1. ✅ **Build Payout System** - Allow ambassadors to cash out commissions
2. ✅ **Create Payment Dashboard** - UI for viewing payments and commissions
3. ✅ **Set Up Stripe Connect** - Enable direct payouts to ambassadors
4. ✅ **Add Subscription Support** - Change from one-time to recurring billing
5. ✅ **Production Deployment** - Move from test mode to live mode

---

## Quick Reference

### Test Card Numbers

- **Success:** `4242 4242 4242 4242`
- **Decline:** `4000 0000 0000 0002`
- **Requires 3D Secure:** `4000 0025 0000 3155`

### Stripe CLI Commands

```bash
# Login
stripe login

# Listen for webhooks
stripe listen --forward-to http://localhost:3000/api/stripe/webhook

# Trigger test events
stripe trigger payment_intent.succeeded
stripe trigger payment_intent.payment_failed
stripe trigger charge.refunded

# View logs
stripe logs tail
```

### Important URLs

- **Stripe Dashboard:** https://dashboard.stripe.com/test/dashboard
- **Products:** https://dashboard.stripe.com/test/products
- **Payments:** https://dashboard.stripe.com/test/payments
- **Webhooks:** https://dashboard.stripe.com/test/webhooks
- **Test Cards:** https://stripe.com/docs/testing

---

**Status:** Ready to accept payments and create commissions automatically! 🎉
