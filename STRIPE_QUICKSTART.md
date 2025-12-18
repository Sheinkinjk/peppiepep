# Stripe Integration - Quick Start

**5-minute guide to get payments working**

## 1. Prerequisites Check ✅

```bash
# Verify environment variables
grep STRIPE .env.local

# Expected output:
# STRIPE_SECRET_KEY=sk_test_...
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## 2. Run Database Migration ✅

```bash
# Already completed! Verify with:
psql $DATABASE_URL -c "SELECT COUNT(*) FROM stripe_payments;"
```

## 3. Create Stripe Product (2 minutes)

1. Go to: https://dashboard.stripe.com/test/products
2. Click "Add product"
3. Fill in:
   - **Name:** Refer Labs - Base Plan
   - **Price:** 499 AUD
   - **Billing:** Monthly
4. Click "Save product"
5. **Copy the Price ID** (starts with `price_`)

## 4. Test Payment Flow (2 minutes)

### Option A: Using Browser Console

```javascript
// 1. Open http://localhost:3000
// 2. Open browser console (F12)
// 3. Run this code (replace YOUR_PRICE_ID):

fetch('/api/stripe/create-checkout', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    priceId: 'YOUR_PRICE_ID', // ← Replace this!
    successUrl: window.location.origin + '/payment/success?session_id={CHECKOUT_SESSION_ID}',
    cancelUrl: window.location.origin + '/payment/cancel'
  })
})
.then(r => r.json())
.then(data => {
  if (data.success) {
    window.location.href = data.url;
  } else {
    console.error('Error:', data.error);
  }
});
```

### Option B: Using cURL

```bash
curl -X POST http://localhost:3000/api/stripe/create-checkout \
  -H "Content-Type: application/json" \
  -d '{
    "priceId": "YOUR_PRICE_ID",
    "successUrl": "http://localhost:3000/payment/success?session_id={CHECKOUT_SESSION_ID}",
    "cancelUrl": "http://localhost:3000/payment/cancel"
  }'

# Copy the URL from response and open in browser
```

### Complete Payment

Use Stripe test card:
- **Card:** `4242 4242 4242 4242`
- **Expiry:** `12/34` (any future date)
- **CVC:** `123`
- **ZIP:** `12345`

## 5. Set Up Webhooks (1 minute)

### For Local Development

```bash
# Install Stripe CLI (if not already installed)
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Start listening
stripe listen --forward-to http://localhost:3000/api/stripe/webhook
```

**Copy the webhook secret** from output (starts with `whsec_`) and add to `.env.local`:

```bash
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

**Restart your dev server** after adding the secret.

## 6. Test Complete Flow (1 minute)

```bash
# In terminal with webhook listener running:
stripe trigger payment_intent.succeeded

# Check database:
psql $DATABASE_URL -c "SELECT * FROM stripe_payments ORDER BY created_at DESC LIMIT 1;"
```

**Expected:** Payment record created with status 'succeeded'

## 7. Test Commission Creation (2 minutes)

### Test Signup Bonus

```javascript
// 1. Open http://localhost:3000/our-referral-program
// 2. Open console and set referral cookie:
document.cookie = "referredBy=Jn9wjbn2kQlO; path=/; max-age=2592000";

// 3. Fill out partner application form and submit
// 4. Check database:
```

```sql
SELECT
  sc.amount / 100.0 as amount_aud,
  sc.commission_type,
  sc.status,
  c.email as ambassador_email
FROM stripe_commissions sc
JOIN customers c ON c.id = sc.ambassador_id
ORDER BY sc.created_at DESC LIMIT 1;
```

**Expected:** $100 signup bonus commission for jarred@referlabs.com.au

## 8. Verify Everything Works

```bash
# Test Stripe connection
curl http://localhost:3000/api/stripe/test

# Check webhook events
psql $DATABASE_URL -c "SELECT event_type, processed FROM stripe_webhook_events ORDER BY created_at DESC LIMIT 5;"

# Check commission balance
psql $DATABASE_URL -c "SELECT * FROM ambassador_commission_balances WHERE ambassador_email = 'jarred@referlabs.com.au';"
```

---

## Quick Reference

### Test Cards

| Card | Result |
|------|--------|
| `4242 4242 4242 4242` | ✅ Success |
| `4000 0000 0000 0002` | ❌ Decline |
| `4000 0025 0000 3155` | 🔐 Requires 3DS |

### Commission Rates

| Type | Amount |
|------|--------|
| Signup Bonus | $100 AUD |
| Revenue Share | 10% of payment |
| Minimum Payout | $500 AUD |

### Important URLs

| Service | URL |
|---------|-----|
| Stripe Dashboard | https://dashboard.stripe.com/test/dashboard |
| Products | https://dashboard.stripe.com/test/products |
| Payments | https://dashboard.stripe.com/test/payments |
| Webhooks | https://dashboard.stripe.com/test/webhooks |
| Connect | https://dashboard.stripe.com/test/connect |

### Database Tables

```sql
-- View all tables
\dt stripe_*

-- Quick checks
SELECT COUNT(*) FROM stripe_payments;
SELECT COUNT(*) FROM stripe_commissions;
SELECT COUNT(*) FROM stripe_webhook_events;
SELECT * FROM ambassador_commission_balances;
```

---

## Troubleshooting

### Payment not creating?

```bash
# Check API response
curl -v http://localhost:3000/api/stripe/test

# Check Stripe keys
echo $STRIPE_SECRET_KEY
```

### Webhook not processing?

```bash
# Make sure webhook listener is running
stripe listen --forward-to http://localhost:3000/api/stripe/webhook

# Check webhook secret in .env.local
grep STRIPE_WEBHOOK_SECRET .env.local

# Restart dev server after adding secret
```

### Commission not created?

```sql
-- Check referral exists
SELECT * FROM referrals ORDER BY created_at DESC LIMIT 1;

-- Check webhook processed
SELECT * FROM stripe_webhook_events WHERE processed = false;
```

---

## Next Steps

1. ✅ **Create more products** - Base, Scale, Enterprise plans
2. ✅ **Update pricing page** - Add real Price IDs
3. ✅ **Test end-to-end** - Partner signup → Payment → Commission → Payout
4. ✅ **Set up production** - Live keys, production webhook

**Full guides available:**
- `STRIPE_PAYMENT_SETUP_GUIDE.md` - Detailed setup
- `STRIPE_TESTING_GUIDE.md` - Complete test scenarios
- `STRIPE_INTEGRATION_SUMMARY.md` - Full implementation overview

---

**You're ready to accept payments!** 🎉
