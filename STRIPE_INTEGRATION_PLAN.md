# Stripe Integration Plan - Refer Labs

**Date:** December 17, 2025
**Status:** 📋 Planning Phase
**Priority:** 🔴 CRITICAL - Required before go-live

---

## Table of Contents
1. [Overview](#overview)
2. [Use Cases](#use-cases)
3. [Architecture](#architecture)
4. [Implementation Steps](#implementation-steps)
5. [Database Schema](#database-schema)
6. [API Endpoints](#api-endpoints)
7. [Security Considerations](#security-considerations)
8. [Testing Strategy](#testing-strategy)

---

## Overview

### Objectives
Integrate Stripe to handle:
1. **Payment Collection** - Collect payments from customers for referral program services
2. **Commission Payouts** - Pay referral commissions to ambassadors (especially admin partner referrals)

### Key Requirements
- ✅ Secure payment processing
- ✅ Automated commission calculations
- ✅ Payout tracking and management
- ✅ Admin dashboard for payment oversight
- ✅ Webhook handling for real-time updates
- ✅ Support for multiple currencies (start with AUD)
- ✅ Compliance with Australian regulations

---

## Use Cases

### Use Case 1: Customer Payment Collection
**Scenario:** Business pays for referral program subscription or usage

**Flow:**
1. Customer selects pricing plan on pricing page
2. Redirected to Stripe Checkout
3. Payment processed by Stripe
4. Webhook confirms payment success
5. Customer account activated/upgraded
6. Receipt sent via email

**Key Features:**
- One-time payments and subscriptions
- Multiple payment methods (card, bank transfer)
- Automatic invoice generation
- Payment retry logic for failed payments

### Use Case 2: Partner Referral Commission Payouts
**Scenario:** Admin (jarred@referlabs.com.au) refers partners and earns commissions

**Flow:**
1. Partner application submitted through admin referral link
2. Partner becomes paying customer
3. Commission calculated based on partner tier/revenue
4. Commission tracked in database
5. Admin triggers payout manually or automatically (threshold-based)
6. Stripe Connect payout initiated
7. Funds transferred to admin's bank account

**Commission Structure (Example):**
- **Partner Sign-up Bonus:** $100 AUD (one-time)
- **Revenue Share:** 10% of partner's monthly subscription (recurring)
- **Payout Threshold:** $500 AUD minimum balance
- **Payout Frequency:** Monthly (on 1st) or manual trigger

### Use Case 3: Ambassador Commission Payouts
**Scenario:** Regular ambassadors earn commissions from successful referrals

**Flow:**
1. Ambassador refers new customer via referral link
2. New customer makes first purchase
3. Commission earned and tracked
4. Ambassadors can view balance in dashboard
5. Ambassador requests payout (or automatic at threshold)
6. Stripe payout processed
7. Funds sent to ambassador's connected account

---

## Architecture

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                     Refer Labs Platform                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐         ┌──────────────┐                 │
│  │   Customer   │────────▶│   Checkout   │                 │
│  │   Portal     │         │     Flow     │                 │
│  └──────────────┘         └──────┬───────┘                 │
│                                   │                          │
│                                   ▼                          │
│                          ┌─────────────────┐                │
│                          │  Stripe API     │                │
│  ┌──────────────┐        │  Integration    │                │
│  │   Admin      │───────▶│                 │                │
│  │  Dashboard   │        │  - Payments     │                │
│  └──────────────┘        │  - Payouts      │                │
│                          │  - Webhooks     │                │
│  ┌──────────────┐        └────────┬────────┘                │
│  │ Ambassador   │                 │                          │
│  │   Portal     │◀────────────────┘                          │
│  └──────────────┘                                            │
│                                                              │
└──────────────────────────┬───────────────────────────────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │  Stripe Account  │
                  ├─────────────────┤
                  │  - Payments      │
                  │  - Connect       │
                  │  - Webhooks      │
                  └─────────────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │   Bank Account   │
                  │   (AUD/USD)      │
                  └─────────────────┘
```

### Integration Approach

**Option 1: Stripe Checkout (Recommended for Payments)**
- Pre-built, hosted payment page
- PCI compliance handled by Stripe
- Quick implementation
- Professional UI/UX

**Option 2: Stripe Elements (Custom UI)**
- Embedded payment form
- More control over design
- Still PCI compliant
- More development effort

**For This Project: Use Stripe Checkout for speed and security**

**Payout Method: Stripe Connect**
- Create Express accounts for ambassadors
- Automated onboarding flow
- Compliance handled by Stripe
- Support for multiple countries

---

## Implementation Steps

### Phase 1: Setup & Configuration (Day 1)

#### Step 1.1: Create Stripe Account
1. Go to [stripe.com](https://stripe.com)
2. Sign up for account (use jarred@referlabs.com.au)
3. Complete business verification
4. Set business details:
   - Business name: Refer Labs
   - Country: Australia
   - Currency: AUD (primary)
   - Industry: Software/SaaS

#### Step 1.2: Obtain API Keys
1. Navigate to Developers → API Keys
2. Copy keys:
   - **Publishable Key** (test): `pk_test_...`
   - **Secret Key** (test): `sk_test_...`
3. Add to Vercel environment variables:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_... (after webhook setup)
   ```

#### Step 1.3: Enable Stripe Connect
1. Go to Connect → Settings
2. Enable Express accounts
3. Configure platform settings:
   - Platform name: Refer Labs
   - Support email: support@referlabs.com.au
   - Branding (logo, colors)

#### Step 1.4: Install Dependencies
```bash
npm install stripe @stripe/stripe-js
npm install --save-dev @types/stripe
```

---

### Phase 2: Database Schema (Day 1-2)

#### New Tables

**1. stripe_customers**
```sql
CREATE TABLE stripe_customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  stripe_customer_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  name TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_stripe_customers_business ON stripe_customers(business_id);
CREATE INDEX idx_stripe_customers_customer ON stripe_customers(customer_id);
CREATE INDEX idx_stripe_customers_stripe_id ON stripe_customers(stripe_customer_id);
```

**2. stripe_payments**
```sql
CREATE TABLE stripe_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  stripe_customer_id TEXT REFERENCES stripe_customers(stripe_customer_id),
  stripe_payment_intent_id TEXT UNIQUE NOT NULL,
  stripe_checkout_session_id TEXT,
  amount_total INTEGER NOT NULL, -- in cents
  amount_subtotal INTEGER NOT NULL,
  currency TEXT DEFAULT 'aud',
  status TEXT NOT NULL, -- 'pending', 'succeeded', 'failed', 'refunded'
  payment_method TEXT, -- 'card', 'bank_transfer', etc.
  description TEXT,
  metadata JSONB DEFAULT '{}',
  paid_at TIMESTAMPTZ,
  refunded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_stripe_payments_business ON stripe_payments(business_id);
CREATE INDEX idx_stripe_payments_customer ON stripe_payments(stripe_customer_id);
CREATE INDEX idx_stripe_payments_status ON stripe_payments(status);
CREATE INDEX idx_stripe_payments_paid_at ON stripe_payments(paid_at);
```

**3. stripe_commissions**
```sql
CREATE TABLE stripe_commissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  ambassador_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  referral_id UUID REFERENCES referrals(id) ON DELETE SET NULL,
  payment_id UUID REFERENCES stripe_payments(id) ON DELETE SET NULL,
  amount INTEGER NOT NULL, -- in cents
  currency TEXT DEFAULT 'aud',
  commission_type TEXT NOT NULL, -- 'signup_bonus', 'revenue_share', 'one_time'
  commission_rate DECIMAL(5,2), -- percentage (e.g., 10.00 = 10%)
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'paid', 'cancelled'
  approved_at TIMESTAMPTZ,
  paid_at TIMESTAMPTZ,
  payout_id UUID REFERENCES stripe_payouts(id),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_stripe_commissions_ambassador ON stripe_commissions(ambassador_id);
CREATE INDEX idx_stripe_commissions_status ON stripe_commissions(status);
CREATE INDEX idx_stripe_commissions_referral ON stripe_commissions(referral_id);
```

**4. stripe_payouts**
```sql
CREATE TABLE stripe_payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  ambassador_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  stripe_payout_id TEXT UNIQUE NOT NULL,
  stripe_connect_account_id TEXT NOT NULL,
  amount INTEGER NOT NULL, -- in cents
  currency TEXT DEFAULT 'aud',
  status TEXT DEFAULT 'pending', -- 'pending', 'in_transit', 'paid', 'failed', 'cancelled'
  failure_reason TEXT,
  arrival_date TIMESTAMPTZ,
  method TEXT, -- 'standard', 'instant'
  description TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_stripe_payouts_ambassador ON stripe_payouts(ambassador_id);
CREATE INDEX idx_stripe_payouts_status ON stripe_payouts(status);
CREATE INDEX idx_stripe_payouts_stripe_id ON stripe_payouts(stripe_payout_id);
```

**5. stripe_connect_accounts**
```sql
CREATE TABLE stripe_connect_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE UNIQUE,
  stripe_account_id TEXT UNIQUE NOT NULL,
  account_type TEXT DEFAULT 'express', -- 'express', 'standard'
  charges_enabled BOOLEAN DEFAULT FALSE,
  payouts_enabled BOOLEAN DEFAULT FALSE,
  details_submitted BOOLEAN DEFAULT FALSE,
  country TEXT,
  email TEXT,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  onboarding_url TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_stripe_connect_customer ON stripe_connect_accounts(customer_id);
CREATE INDEX idx_stripe_connect_stripe_id ON stripe_connect_accounts(stripe_account_id);
```

**6. stripe_webhook_events**
```sql
CREATE TABLE stripe_webhook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_event_id TEXT UNIQUE NOT NULL,
  event_type TEXT NOT NULL,
  object_id TEXT,
  processed BOOLEAN DEFAULT FALSE,
  processing_error TEXT,
  payload JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  processed_at TIMESTAMPTZ
);

CREATE INDEX idx_stripe_webhooks_event_type ON stripe_webhook_events(event_type);
CREATE INDEX idx_stripe_webhooks_processed ON stripe_webhook_events(processed);
CREATE INDEX idx_stripe_webhooks_stripe_id ON stripe_webhook_events(stripe_event_id);
```

---

### Phase 3: Core API Implementation (Day 2-3)

#### 3.1: Stripe Client Setup

**File:** `src/lib/stripe.ts`
```typescript
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
});

export const getStripePublishableKey = () => {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!key) {
    throw new Error('Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY');
  }
  return key;
};
```

#### 3.2: Payment Collection Flow

**File:** `src/app/api/stripe/create-checkout/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createServerComponentClient } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const supabase = createServerComponentClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { priceId, successUrl, cancelUrl } = body;

    // Get or create Stripe customer
    const { data: business } = await supabase
      .from('businesses')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 });
    }

    let stripeCustomerId: string;

    const { data: existingStripeCustomer } = await supabase
      .from('stripe_customers')
      .select('stripe_customer_id')
      .eq('business_id', business.id)
      .single();

    if (existingStripeCustomer) {
      stripeCustomerId = existingStripeCustomer.stripe_customer_id;
    } else {
      // Create new Stripe customer
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          business_id: business.id,
          user_id: user.id,
        },
      });

      await supabase.from('stripe_customers').insert({
        business_id: business.id,
        stripe_customer_id: customer.id,
        email: user.email,
        name: business.name,
      });

      stripeCustomerId = customer.id;
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      mode: 'subscription', // or 'payment' for one-time
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        business_id: business.id,
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
```

#### 3.3: Commission Calculation

**File:** `src/lib/stripe-commissions.ts`
```typescript
import { createServerComponentClient } from '@/lib/supabase';

export interface CommissionRule {
  type: 'signup_bonus' | 'revenue_share' | 'one_time';
  amount?: number; // fixed amount in cents
  rate?: number; // percentage (0-100)
  description: string;
}

export const ADMIN_COMMISSION_RULES: CommissionRule[] = [
  {
    type: 'signup_bonus',
    amount: 10000, // $100 AUD
    description: 'Partner sign-up bonus',
  },
  {
    type: 'revenue_share',
    rate: 10, // 10%
    description: 'Monthly revenue share',
  },
];

export async function calculateCommission(
  referralId: string,
  paymentAmount: number,
  commissionType: 'signup_bonus' | 'revenue_share'
): Promise<number> {
  const rule = ADMIN_COMMISSION_RULES.find(r => r.type === commissionType);

  if (!rule) {
    throw new Error(`No commission rule found for type: ${commissionType}`);
  }

  if (rule.amount) {
    return rule.amount;
  }

  if (rule.rate) {
    return Math.round((paymentAmount * rule.rate) / 100);
  }

  return 0;
}

export async function createCommission(
  ambassadorId: string,
  referralId: string,
  paymentId: string,
  amount: number,
  commissionType: 'signup_bonus' | 'revenue_share'
) {
  const supabase = createServerComponentClient();

  const { data: referral } = await supabase
    .from('referrals')
    .select('business_id')
    .eq('id', referralId)
    .single();

  if (!referral) {
    throw new Error('Referral not found');
  }

  const rule = ADMIN_COMMISSION_RULES.find(r => r.type === commissionType);

  const { data, error } = await supabase
    .from('stripe_commissions')
    .insert({
      business_id: referral.business_id,
      ambassador_id: ambassadorId,
      referral_id: referralId,
      payment_id: paymentId,
      amount,
      commission_type: commissionType,
      commission_rate: rule?.rate,
      status: 'pending',
      metadata: {
        rule_description: rule?.description,
      },
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
```

#### 3.4: Payout Management

**File:** `src/lib/stripe-payouts.ts`
```typescript
import { stripe } from '@/lib/stripe';
import { createServerComponentClient } from '@/lib/supabase';

export const PAYOUT_THRESHOLD = 50000; // $500 AUD in cents
export const PAYOUT_CURRENCY = 'aud';

export async function getAmbassadorBalance(ambassadorId: string) {
  const supabase = createServerComponentClient();

  const { data: commissions } = await supabase
    .from('stripe_commissions')
    .select('amount, status')
    .eq('ambassador_id', ambassadorId);

  const pending = commissions
    ?.filter(c => c.status === 'pending' || c.status === 'approved')
    .reduce((sum, c) => sum + c.amount, 0) || 0;

  const paid = commissions
    ?.filter(c => c.status === 'paid')
    .reduce((sum, c) => sum + c.amount, 0) || 0;

  return {
    pending,
    paid,
    total: pending + paid,
    canPayout: pending >= PAYOUT_THRESHOLD,
  };
}

export async function createPayout(ambassadorId: string) {
  const supabase = createServerComponentClient();

  // Get Connect account
  const { data: connectAccount } = await supabase
    .from('stripe_connect_accounts')
    .select('*')
    .eq('customer_id', ambassadorId)
    .single();

  if (!connectAccount || !connectAccount.payouts_enabled) {
    throw new Error('Ambassador must complete Stripe onboarding first');
  }

  // Get pending commissions
  const { data: pendingCommissions } = await supabase
    .from('stripe_commissions')
    .select('*')
    .eq('ambassador_id', ambassadorId)
    .in('status', ['pending', 'approved']);

  const totalAmount = pendingCommissions?.reduce((sum, c) => sum + c.amount, 0) || 0;

  if (totalAmount < PAYOUT_THRESHOLD) {
    throw new Error(`Minimum payout threshold is $${PAYOUT_THRESHOLD / 100}`);
  }

  // Create Stripe transfer
  const transfer = await stripe.transfers.create({
    amount: totalAmount,
    currency: PAYOUT_CURRENCY,
    destination: connectAccount.stripe_account_id,
    description: `Commission payout for ${pendingCommissions?.length} referrals`,
  });

  // Record payout
  const { data: payout } = await supabase
    .from('stripe_payouts')
    .insert({
      business_id: pendingCommissions![0].business_id,
      ambassador_id: ambassadorId,
      stripe_payout_id: transfer.id,
      stripe_connect_account_id: connectAccount.stripe_account_id,
      amount: totalAmount,
      currency: PAYOUT_CURRENCY,
      status: 'pending',
      description: `Payout for ${pendingCommissions?.length} commissions`,
    })
    .select()
    .single();

  // Update commissions
  const commissionIds = pendingCommissions?.map(c => c.id) || [];
  await supabase
    .from('stripe_commissions')
    .update({ status: 'paid', payout_id: payout!.id, paid_at: new Date().toISOString() })
    .in('id', commissionIds);

  return payout;
}
```

---

### Phase 4: Webhook Implementation (Day 3)

**File:** `src/app/api/stripe/webhooks/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createServerComponentClient } from '@/lib/supabase';
import Stripe from 'stripe';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const supabase = createServerComponentClient();

  // Log webhook event
  await supabase.from('stripe_webhook_events').insert({
    stripe_event_id: event.id,
    event_type: event.type,
    object_id: (event.data.object as any).id,
    payload: event.data.object as any,
  });

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case 'payment_intent.succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.PaymentIntent);
        break;

      case 'account.updated':
        await handleAccountUpdated(event.data.object as Stripe.Account);
        break;

      case 'transfer.created':
      case 'transfer.updated':
        await handleTransferUpdate(event.data.object as Stripe.Transfer);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Mark as processed
    await supabase
      .from('stripe_webhook_events')
      .update({ processed: true, processed_at: new Date().toISOString() })
      .eq('stripe_event_id', event.id);

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    await supabase
      .from('stripe_webhook_events')
      .update({ processing_error: (error as Error).message })
      .eq('stripe_event_id', event.id);

    return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const supabase = createServerComponentClient();

  // Record payment
  await supabase.from('stripe_payments').insert({
    business_id: session.metadata?.business_id,
    stripe_customer_id: session.customer as string,
    stripe_payment_intent_id: session.payment_intent as string,
    stripe_checkout_session_id: session.id,
    amount_total: session.amount_total || 0,
    amount_subtotal: session.amount_subtotal || 0,
    currency: session.currency || 'aud',
    status: 'succeeded',
    paid_at: new Date().toISOString(),
  });

  // TODO: Activate subscription, send confirmation email, etc.
}

async function handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  // Update payment status
  // Calculate and create commissions if this is a referred customer
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  // Update payment status
  // Send notification
}

async function handleAccountUpdated(account: Stripe.Account) {
  const supabase = createServerComponentClient();

  await supabase
    .from('stripe_connect_accounts')
    .update({
      charges_enabled: account.charges_enabled,
      payouts_enabled: account.payouts_enabled,
      details_submitted: account.details_submitted,
    })
    .eq('stripe_account_id', account.id);
}

async function handleTransferUpdate(transfer: Stripe.Transfer) {
  const supabase = createServerComponentClient();

  await supabase
    .from('stripe_payouts')
    .update({
      status: transfer.status === 'paid' ? 'paid' : 'in_transit',
      arrival_date: transfer.arrival_date ? new Date(transfer.arrival_date * 1000).toISOString() : null,
    })
    .eq('stripe_payout_id', transfer.id);
}
```

---

### Phase 5: UI Components (Day 4-5)

#### 5.1: Checkout Button Component
#### 5.2: Commission Dashboard
#### 5.3: Payout Request UI
#### 5.4: Admin Payment Management

*(Components will be detailed in next section)*

---

## Security Considerations

### API Key Security
- ✅ Never expose secret keys in client-side code
- ✅ Store in environment variables only
- ✅ Use different keys for test/production
- ✅ Rotate keys regularly

### Webhook Security
- ✅ Verify webhook signatures
- ✅ Use HTTPS only
- ✅ Implement idempotency checks
- ✅ Log all webhook events

### Payment Security
- ✅ PCI compliance through Stripe Checkout
- ✅ Never store card details
- ✅ Use Stripe.js for tokenization
- ✅ Implement 3D Secure when required

### Payout Security
- ✅ Verify ambassador identity
- ✅ Implement approval workflows for large payouts
- ✅ Two-factor authentication for admin actions
- ✅ Audit log all payout requests

---

## Testing Strategy

### Test Mode
- Use Stripe test keys: `sk_test_...`, `pk_test_...`
- Test card numbers: `4242 4242 4242 4242`
- Trigger webhooks manually via Stripe CLI

### Test Cases
1. **Payment Collection**
   - ✅ Successful payment
   - ✅ Failed payment
   - ✅ Subscription creation
   - ✅ Subscription renewal
   - ✅ Refund processing

2. **Commission Calculation**
   - ✅ Sign-up bonus creation
   - ✅ Revenue share calculation
   - ✅ Multiple commission tiers
   - ✅ Edge cases (zero amount, negative)

3. **Payout Processing**
   - ✅ Below threshold (should fail)
   - ✅ Above threshold (should succeed)
   - ✅ Failed payout handling
   - ✅ Duplicate payout prevention

4. **Webhook Processing**
   - ✅ Event deduplication
   - ✅ Failed webhook retry
   - ✅ Invalid signature rejection
   - ✅ All event types handled

---

## Go-Live Checklist

### Before Production
- [ ] Complete Stripe account verification
- [ ] Set up production environment variables
- [ ] Configure webhook endpoints
- [ ] Test all payment flows end-to-end
- [ ] Test all payout flows end-to-end
- [ ] Verify commission calculations
- [ ] Set up monitoring and alerts
- [ ] Document admin procedures
- [ ] Train support team
- [ ] Legal review (terms, privacy policy)

### Production Monitoring
- [ ] Monitor webhook success rate
- [ ] Track failed payments
- [ ] Monitor payout errors
- [ ] Alert on commission calculation issues
- [ ] Daily reconciliation checks

---

## Next Steps

1. **Review this plan** with stakeholders
2. **Obtain Stripe account approval**
3. **Begin Phase 1 implementation**
4. **Set up test environment**
5. **Develop and test payment flow**
6. **Develop and test payout flow**
7. **QA testing**
8. **Production deployment**

---

**Questions? Contact:** jarred@referlabs.com.au
**Documentation:** [Stripe Docs](https://stripe.com/docs)
