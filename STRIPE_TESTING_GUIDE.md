# Stripe Integration Testing Guide

Complete guide for testing the Stripe payment and commission system end-to-end.

## Prerequisites

- ✅ Database migration completed
- ✅ Environment variables configured
- ✅ Stripe CLI installed
- ✅ Development server running

## Test Scenarios

### Scenario 1: Partner Signup with Commission

**Objective:** Test that a partner signing up through a referral link creates a $100 signup bonus commission.

#### Steps:

1. **Set the referral cookie**
   ```bash
   # In browser console (http://localhost:3000)
   document.cookie = "referredBy=Jn9wjbn2kQlO; path=/; max-age=2592000";
   ```

2. **Navigate to partner application**
   ```
   http://localhost:3000/our-referral-program
   ```

3. **Fill out the form and submit**
   - Company name: Test Company Inc
   - Email: partner@test.com
   - Other required fields

4. **Verify in database**
   ```sql
   -- Check referral was created
   SELECT * FROM referrals WHERE type = 'partner' ORDER BY created_at DESC LIMIT 1;

   -- Check commission was created
   SELECT
     sc.id,
     sc.amount / 100.0 as amount_aud,
     sc.commission_type,
     sc.status,
     c.email as ambassador_email
   FROM stripe_commissions sc
   JOIN customers c ON c.id = sc.ambassador_id
   ORDER BY sc.created_at DESC LIMIT 1;
   ```

**Expected Results:**
- ✅ Referral record created with type 'partner'
- ✅ Commission record created for $100 AUD
- ✅ Commission status is 'approved'
- ✅ Ambassador is jarred@referlabs.com.au

---

### Scenario 2: Payment Collection Flow

**Objective:** Test Stripe Checkout payment flow and payment record creation.

#### Setup:

1. **Create a Stripe product and price**
   - Go to: https://dashboard.stripe.com/test/products
   - Create product: "Test Plan" - $100 AUD
   - Copy the Price ID (e.g., `price_1234567890`)

2. **Test the checkout API**
   ```bash
   curl -X POST http://localhost:3000/api/stripe/create-checkout \
     -H "Content-Type: application/json" \
     -d '{
       "priceId": "price_YOUR_PRICE_ID",
       "successUrl": "http://localhost:3000/payment/success?session_id={CHECKOUT_SESSION_ID}",
       "cancelUrl": "http://localhost:3000/payment/cancel"
     }'
   ```

3. **Or use in browser**
   ```javascript
   // Browser console
   fetch('/api/stripe/create-checkout', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       priceId: 'price_YOUR_PRICE_ID',
       successUrl: window.location.origin + '/payment/success?session_id={CHECKOUT_SESSION_ID}',
       cancelUrl: window.location.origin + '/payment/cancel',
       metadata: { test: 'true' }
     })
   })
   .then(r => r.json())
   .then(data => window.location.href = data.url);
   ```

#### Steps:

1. **Create checkout session** (using method above)

2. **Complete payment with test card**
   - Card: `4242 4242 4242 4242`
   - Expiry: `12/34`
   - CVC: `123`
   - ZIP: `12345`

3. **Verify webhook received**
   ```bash
   # Check Stripe CLI output
   # Should show: payment_intent.succeeded
   ```

4. **Verify in database**
   ```sql
   -- Check payment was recorded
   SELECT
     id,
     amount_total / 100.0 as amount_aud,
     status,
     paid_at,
     stripe_payment_intent_id
   FROM stripe_payments
   ORDER BY created_at DESC LIMIT 1;

   -- Check webhook was logged
   SELECT
     event_type,
     processed,
     processing_error,
     created_at
   FROM stripe_webhook_events
   ORDER BY created_at DESC LIMIT 5;
   ```

**Expected Results:**
- ✅ Redirects to Stripe Checkout
- ✅ Payment completes successfully
- ✅ Redirects to `/payment/success`
- ✅ Payment record created with status 'succeeded'
- ✅ Webhook event logged and processed

---

### Scenario 3: Revenue Share Commission

**Objective:** Test that payments for referred partners create 10% revenue share commissions.

#### Setup:

1. **Get partner business ID from Scenario 1**
   ```sql
   SELECT b.id, b.name, u.email
   FROM businesses b
   JOIN auth.users u ON u.id = b.owner_id
   WHERE u.email = 'partner@test.com';
   ```

2. **Note the business ID** (e.g., `bd8f6179-8507-4098-95eb-28389a96c8c0`)

#### Steps:

1. **Create checkout with business metadata**
   ```bash
   curl -X POST http://localhost:3000/api/stripe/create-checkout \
     -H "Content-Type: application/json" \
     -d '{
       "priceId": "price_YOUR_PRICE_ID",
       "businessId": "PARTNER_BUSINESS_ID_FROM_ABOVE",
       "successUrl": "http://localhost:3000/payment/success?session_id={CHECKOUT_SESSION_ID}",
       "cancelUrl": "http://localhost:3000/payment/cancel"
     }'
   ```

2. **Complete payment** (test card as above)

3. **Verify revenue share commission**
   ```sql
   SELECT
     sc.id,
     sc.amount / 100.0 as commission_aud,
     sc.commission_type,
     sc.commission_rate,
     sc.original_payment_amount / 100.0 as payment_aud,
     c.email as ambassador_email
   FROM stripe_commissions sc
   JOIN customers c ON c.id = sc.ambassador_id
   WHERE sc.commission_type = 'revenue_share'
   ORDER BY sc.created_at DESC LIMIT 1;
   ```

**Expected Results:**
- ✅ Payment successful ($100 AUD)
- ✅ Commission created for 10% = $10 AUD
- ✅ Commission type is 'revenue_share'
- ✅ Commission rate is 10.00
- ✅ Status is 'approved'

**Full Commission Check:**
```sql
-- Check all commissions for admin
SELECT
  sc.commission_type,
  sc.amount / 100.0 as amount_aud,
  sc.status,
  sc.created_at
FROM stripe_commissions sc
JOIN customers c ON c.id = sc.ambassador_id
WHERE c.email = 'jarred@referlabs.com.au'
ORDER BY sc.created_at DESC;

-- Expected: 2 rows
-- 1. signup_bonus: $100 (from partner application)
-- 2. revenue_share: $10 (from partner payment)
```

---

### Scenario 4: Ambassador Balance View

**Objective:** Test the commission balance view.

```sql
-- View ambassador balance
SELECT * FROM ambassador_commission_balances
WHERE ambassador_email = 'jarred@referlabs.com.au';
```

**Expected Output:**
```
pending_balance: 11000 ($110 in cents)
paid_total: 0
lifetime_earnings: 11000
pending_commissions: 2
paid_commissions: 0
last_payout_date: null
```

---

### Scenario 5: Stripe Connect Onboarding

**Objective:** Test Stripe Connect account creation for payouts.

#### Steps:

1. **Create Connect account**
   ```bash
   curl -X POST http://localhost:3000/api/stripe/create-connect-account \
     -H "Content-Type: application/json" \
     -d '{
       "customerId": "AMBASSADOR_CUSTOMER_ID",
       "email": "jarred@referlabs.com.au",
       "refreshUrl": "http://localhost:3000/dashboard/payouts?refresh=true",
       "returnUrl": "http://localhost:3000/dashboard/payouts?setup=complete"
     }'
   ```

2. **Open onboarding URL** (from response)

3. **Complete Stripe onboarding**
   - Use test data:
     - Business type: Individual
     - Country: Australia
     - First name: Test
     - Last name: User
     - DOB: 01/01/1990
     - Address: Any Australian address
     - Phone: Any phone number
     - Bank: Use Stripe test bank account
       - BSB: `000-000`
       - Account number: `000123456`

4. **Verify Connect account**
   ```sql
   SELECT
     stripe_account_id,
     payouts_enabled,
     charges_enabled,
     details_submitted,
     onboarding_completed
   FROM stripe_connect_accounts
   WHERE customer_id = 'AMBASSADOR_CUSTOMER_ID';
   ```

**Expected Results:**
- ✅ Connect account created
- ✅ Onboarding URL generated
- ✅ After completion: `payouts_enabled = true`
- ✅ After completion: `details_submitted = true`

---

### Scenario 6: Payout Creation

**Objective:** Test creating a payout to an ambassador.

#### Prerequisites:
- ✅ Ambassador has Connect account with `payouts_enabled = true`
- ✅ Ambassador has at least $500 AUD in approved commissions

#### Steps:

1. **Check if minimum met** ($500 minimum)
   ```sql
   SELECT
     SUM(amount) / 100.0 as total_aud
   FROM stripe_commissions
   WHERE ambassador_id = 'AMBASSADOR_ID'
     AND status = 'approved'
     AND payout_id IS NULL;
   ```

2. **If less than $500, create more commissions** (for testing)
   ```sql
   -- Manually create test commission (for testing only!)
   INSERT INTO stripe_commissions (
     ambassador_id,
     amount,
     currency,
     commission_type,
     status,
     approved_at,
     metadata
   ) VALUES (
     'AMBASSADOR_CUSTOMER_ID',
     49000, -- $490 to reach $500 minimum
     'aud',
     'one_time',
     'approved',
     NOW(),
     '{"test": true, "manual": true}'
   );
   ```

3. **Create payout**
   ```bash
   curl -X POST http://localhost:3000/api/stripe/create-payout \
     -H "Content-Type: application/json" \
     -d '{
       "ambassadorId": "AMBASSADOR_CUSTOMER_ID"
     }'
   ```

4. **Verify payout**
   ```sql
   -- Check payout record
   SELECT
     id,
     amount / 100.0 as amount_aud,
     status,
     stripe_transfer_id,
     created_at
   FROM stripe_payouts
   ORDER BY created_at DESC LIMIT 1;

   -- Check commissions were marked as paid
   SELECT
     id,
     amount / 100.0 as amount_aud,
     status,
     paid_at,
     payout_id
   FROM stripe_commissions
   WHERE payout_id IS NOT NULL
   ORDER BY paid_at DESC;

   -- Check updated balance
   SELECT * FROM ambassador_commission_balances
   WHERE ambassador_email = 'jarred@referlabs.com.au';
   ```

5. **Verify in Stripe Dashboard**
   - Go to: https://dashboard.stripe.com/test/connect/transfers
   - Should see the transfer to connected account

**Expected Results:**
- ✅ Payout created with status 'in_transit'
- ✅ Commissions marked as 'paid'
- ✅ `paid_at` timestamp set
- ✅ `payout_id` linked to payout record
- ✅ Balance updated: `pending_balance = 0`, `paid_total = 500`
- ✅ Transfer visible in Stripe Dashboard

---

## Testing Webhooks

### Start Webhook Listener

```bash
stripe listen --forward-to http://localhost:3000/api/stripe/webhook
```

### Trigger Test Events

```bash
# Test successful payment
stripe trigger payment_intent.succeeded

# Test failed payment
stripe trigger payment_intent.payment_failed

# Test refund
stripe trigger charge.refunded

# Test customer creation
stripe trigger customer.created
```

### Verify Webhook Processing

```sql
-- Check all webhook events
SELECT
  event_type,
  processed,
  processing_error,
  retry_count,
  created_at,
  processed_at
FROM stripe_webhook_events
ORDER BY created_at DESC
LIMIT 10;

-- Check failed webhooks
SELECT * FROM stripe_webhook_events
WHERE processed = false OR processing_error IS NOT NULL;
```

---

## Common Test Cards

```
✅ Success: 4242 4242 4242 4242
❌ Decline: 4000 0000 0000 0002
🔐 Requires 3DS: 4000 0025 0000 3155
💳 Insufficient funds: 4000 0000 0000 9995
```

---

## Database Cleanup (Reset for Fresh Test)

```sql
-- WARNING: Deletes all test data!

DELETE FROM stripe_webhook_events;
DELETE FROM stripe_payouts;
DELETE FROM stripe_commissions;
DELETE FROM stripe_payments;
DELETE FROM stripe_customers;
DELETE FROM stripe_connect_accounts;

-- Also clean up referrals if needed
DELETE FROM referrals WHERE type = 'partner';
```

---

## End-to-End Test Checklist

Run through all scenarios in order:

- [ ] Scenario 1: Partner signup creates $100 commission ✅
- [ ] Scenario 2: Payment collection works ✅
- [ ] Scenario 3: Revenue share commission created ✅
- [ ] Scenario 4: Balance view shows correct totals ✅
- [ ] Scenario 5: Connect account onboarding ✅
- [ ] Scenario 6: Payout succeeds ✅
- [ ] Webhooks process correctly ✅
- [ ] No errors in webhook logs ✅

---

## Monitoring and Debugging

### Check Application Logs

```bash
# Terminal running npm run dev
# Watch for errors or console.logs
```

### Check Stripe Logs

```bash
# Real-time event stream
stripe logs tail

# Or in Stripe Dashboard
https://dashboard.stripe.com/test/logs
```

### Check Database Logs

```sql
-- Payments by status
SELECT status, COUNT(*), SUM(amount_total) / 100.0 as total_aud
FROM stripe_payments
GROUP BY status;

-- Commissions by type
SELECT commission_type, status, COUNT(*), SUM(amount) / 100.0 as total_aud
FROM stripe_commissions
GROUP BY commission_type, status;

-- Payout summary
SELECT status, COUNT(*), SUM(amount) / 100.0 as total_aud
FROM stripe_payouts
GROUP BY status;
```

---

## Production Readiness Checklist

Before going live:

- [ ] Replace test API keys with live keys
- [ ] Set up production webhook endpoint
- [ ] Update `STRIPE_WEBHOOK_SECRET` with production value
- [ ] Test with small real payment
- [ ] Monitor webhook processing
- [ ] Set up Stripe Dashboard alerts
- [ ] Document payout process for ambassadors
- [ ] Train team on commission approval workflow

---

**Status:** Testing framework complete! 🎉
