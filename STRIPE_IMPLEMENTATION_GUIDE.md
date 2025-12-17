# Stripe Implementation Guide - Step by Step

**Target:** Complete Stripe integration for payments and commission payouts
**Timeline:** 5-7 days
**Status:** 🚀 Ready to begin

---

## Quick Start: What You'll Build

By the end of this guide, you'll have:
- ✅ Payment collection system for subscriptions
- ✅ Automated commission tracking
- ✅ Payout system for ambassadors
- ✅ Admin dashboard for payment management
- ✅ Real-time webhook handling

---

## Day 1: Account Setup & Initial Configuration

### ⏱️ Estimated Time: 2-3 hours

### Step 1: Create Stripe Account (30 mins)

1. **Go to Stripe:**
   - Visit [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)
   - Sign up with: `jarred@referlabs.com.au`

2. **Complete Business Profile:**
   - Business name: **Refer Labs**
   - Business type: **Company**
   - Industry: **Software - SaaS**
   - Country: **Australia**
   - Website: **https://referlabs.com.au**

3. **Business Verification:**
   - Provide ABN/ACN
   - Upload business documents
   - Add bank account for payouts
   - **Note:** Verification can take 1-2 business days

### Step 2: Get API Keys (10 mins)

1. **Navigate to:**
   - Dashboard → Developers → API keys

2. **Copy Test Keys:**
   ```
   Publishable key: pk_test_51...
   Secret key: sk_test_51...
   ```

3. **Add to Vercel:**
   ```bash
   # Go to Vercel dashboard → Settings → Environment Variables
   STRIPE_SECRET_KEY=sk_test_51...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51...
   ```

   Or via CLI:
   ```bash
   vercel env add STRIPE_SECRET_KEY
   vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
   ```

4. **Add to Local `.env.local`:**
   ```env
   STRIPE_SECRET_KEY=sk_test_51...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51...
   ```

### Step 3: Enable Stripe Connect (20 mins)

1. **Navigate to:**
   - Dashboard → Connect → Settings

2. **Enable Express Accounts:**
   - Click "Get Started" on Express
   - Platform name: **Refer Labs**
   - Support email: **support@referlabs.com.au**
   - Platform website: **https://referlabs.com.au**

3. **Configure Branding:**
   - Upload logo
   - Set brand color: `#0abab5` (your teal)
   - Icon: Use Refer Labs icon

4. **Set Capabilities:**
   - ✅ Card payments
   - ✅ Transfers
   - ✅ Payouts

### Step 4: Install Dependencies (15 mins)

```bash
cd /Users/jarredkrowitz/Desktop/Peppiepep

# Install Stripe packages
npm install stripe @stripe/stripe-js

# Install TypeScript types
npm install --save-dev @types/stripe

# Verify installation
npm list stripe @stripe/stripe-js
```

### Step 5: Create Stripe Client (30 mins)

Create the Stripe initialization file:

```bash
# I'll create this file for you
```

**File:** `src/lib/stripe.ts`
```typescript
import Stripe from 'stripe';

// Validate environment variables
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable');
}

// Initialize Stripe with latest API version
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
  appInfo: {
    name: 'Refer Labs',
    version: '1.0.0',
    url: 'https://referlabs.com.au',
  },
});

// Helper to get publishable key
export function getStripePublishableKey(): string {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!key) {
    throw new Error('Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable');
  }
  return key;
}

// Currency helper
export const STRIPE_CURRENCY = 'aud';

// Format amount for display
export function formatAmount(amount: number, currency: string = STRIPE_CURRENCY): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

// Convert dollars to cents
export function dollarsToCents(dollars: number): number {
  return Math.round(dollars * 100);
}

// Convert cents to dollars
export function centsToDollars(cents: number): number {
  return cents / 100;
}
```

### Step 6: Test Stripe Connection (15 mins)

Create a simple test endpoint:

**File:** `src/app/api/stripe/test/route.ts`
```typescript
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function GET() {
  try {
    // Test Stripe connection by fetching account
    const account = await stripe.accounts.retrieve();

    return NextResponse.json({
      success: true,
      account: {
        id: account.id,
        email: account.email,
        country: account.country,
        charges_enabled: account.charges_enabled,
        payouts_enabled: account.payouts_enabled,
      },
    });
  } catch (error) {
    console.error('Stripe test failed:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
```

**Test it:**
```bash
npm run dev
curl http://localhost:3000/api/stripe/test
```

**Expected output:**
```json
{
  "success": true,
  "account": {
    "id": "acct_...",
    "email": "jarred@referlabs.com.au",
    "country": "AU",
    "charges_enabled": false,
    "payouts_enabled": false
  }
}
```

---

## Day 2: Database Schema Implementation

### ⏱️ Estimated Time: 3-4 hours

### Step 7: Create Database Migrations (2 hours)

I'll run these SQL commands in Supabase for you. First, let me create a migration file:

**File:** `supabase/migrations/stripe_integration.sql`

```sql
-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Stripe Customers Table
-- Links platform customers to Stripe customer IDs
CREATE TABLE stripe_customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

COMMENT ON TABLE stripe_customers IS 'Maps platform customers to Stripe customer IDs';

-- 2. Stripe Payments Table
-- Tracks all payment transactions
CREATE TABLE stripe_payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  stripe_customer_id TEXT REFERENCES stripe_customers(stripe_customer_id),
  stripe_payment_intent_id TEXT UNIQUE NOT NULL,
  stripe_checkout_session_id TEXT,
  stripe_subscription_id TEXT,
  amount_total INTEGER NOT NULL, -- in cents
  amount_subtotal INTEGER NOT NULL,
  currency TEXT DEFAULT 'aud',
  status TEXT NOT NULL CHECK (status IN ('pending', 'processing', 'succeeded', 'failed', 'refunded', 'cancelled')),
  payment_method TEXT,
  payment_method_type TEXT, -- 'card', 'bank_transfer', etc.
  description TEXT,
  receipt_url TEXT,
  metadata JSONB DEFAULT '{}',
  paid_at TIMESTAMPTZ,
  refunded_at TIMESTAMPTZ,
  refund_amount INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_stripe_payments_business ON stripe_payments(business_id);
CREATE INDEX idx_stripe_payments_customer ON stripe_payments(stripe_customer_id);
CREATE INDEX idx_stripe_payments_status ON stripe_payments(status);
CREATE INDEX idx_stripe_payments_intent ON stripe_payments(stripe_payment_intent_id);
CREATE INDEX idx_stripe_payments_paid_at ON stripe_payments(paid_at DESC);

COMMENT ON TABLE stripe_payments IS 'All payment transactions processed through Stripe';

-- 3. Stripe Commissions Table
-- Tracks commissions earned by ambassadors
CREATE TABLE stripe_commissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  ambassador_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  referral_id UUID REFERENCES referrals(id) ON DELETE SET NULL,
  payment_id UUID REFERENCES stripe_payments(id) ON DELETE SET NULL,
  amount INTEGER NOT NULL, -- in cents
  currency TEXT DEFAULT 'aud',
  commission_type TEXT NOT NULL CHECK (commission_type IN ('signup_bonus', 'revenue_share', 'one_time', 'recurring')),
  commission_rate DECIMAL(5,2), -- percentage (e.g., 10.00 = 10%)
  original_payment_amount INTEGER, -- original payment this commission is based on
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'paid', 'cancelled', 'disputed')),
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMPTZ,
  paid_at TIMESTAMPTZ,
  payout_id UUID, -- references stripe_payouts(id), added later
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_stripe_commissions_ambassador ON stripe_commissions(ambassador_id);
CREATE INDEX idx_stripe_commissions_status ON stripe_commissions(status);
CREATE INDEX idx_stripe_commissions_referral ON stripe_commissions(referral_id);
CREATE INDEX idx_stripe_commissions_payment ON stripe_commissions(payment_id);
CREATE INDEX idx_stripe_commissions_created ON stripe_commissions(created_at DESC);

COMMENT ON TABLE stripe_commissions IS 'Commission earnings for ambassadors from referrals';

-- 4. Stripe Payouts Table
-- Tracks payouts to ambassadors
CREATE TABLE stripe_payouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  ambassador_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  stripe_payout_id TEXT UNIQUE,
  stripe_transfer_id TEXT UNIQUE,
  stripe_connect_account_id TEXT NOT NULL,
  amount INTEGER NOT NULL, -- in cents
  currency TEXT DEFAULT 'aud',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_transit', 'paid', 'failed', 'cancelled', 'reversed')),
  failure_code TEXT,
  failure_message TEXT,
  arrival_date TIMESTAMPTZ,
  method TEXT DEFAULT 'standard' CHECK (method IN ('standard', 'instant')),
  description TEXT,
  initiated_by UUID REFERENCES auth.users(id),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_stripe_payouts_ambassador ON stripe_payouts(ambassador_id);
CREATE INDEX idx_stripe_payouts_status ON stripe_payouts(status);
CREATE INDEX idx_stripe_payouts_stripe_payout_id ON stripe_payouts(stripe_payout_id);
CREATE INDEX idx_stripe_payouts_created ON stripe_payouts(created_at DESC);

COMMENT ON TABLE stripe_payouts IS 'Payout transactions to ambassador bank accounts';

-- Add foreign key from commissions to payouts (now that payouts table exists)
ALTER TABLE stripe_commissions
  ADD CONSTRAINT fk_commission_payout
  FOREIGN KEY (payout_id)
  REFERENCES stripe_payouts(id)
  ON DELETE SET NULL;

CREATE INDEX idx_stripe_commissions_payout ON stripe_commissions(payout_id);

-- 5. Stripe Connect Accounts Table
-- Manages Stripe Connect accounts for ambassadors
CREATE TABLE stripe_connect_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE UNIQUE,
  stripe_account_id TEXT UNIQUE NOT NULL,
  account_type TEXT DEFAULT 'express' CHECK (account_type IN ('express', 'standard', 'custom')),
  charges_enabled BOOLEAN DEFAULT FALSE,
  payouts_enabled BOOLEAN DEFAULT FALSE,
  details_submitted BOOLEAN DEFAULT FALSE,
  country TEXT,
  email TEXT,
  business_name TEXT,
  individual_name TEXT,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  onboarding_url TEXT,
  onboarding_expires_at TIMESTAMPTZ,
  requirements JSONB DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_stripe_connect_customer ON stripe_connect_accounts(customer_id);
CREATE INDEX idx_stripe_connect_stripe_id ON stripe_connect_accounts(stripe_account_id);
CREATE INDEX idx_stripe_connect_onboarding ON stripe_connect_accounts(onboarding_completed);

COMMENT ON TABLE stripe_connect_accounts IS 'Stripe Connect accounts for receiving payouts';

-- 6. Stripe Webhook Events Table
-- Logs all webhook events for debugging and audit
CREATE TABLE stripe_webhook_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stripe_event_id TEXT UNIQUE NOT NULL,
  event_type TEXT NOT NULL,
  object_type TEXT,
  object_id TEXT,
  processed BOOLEAN DEFAULT FALSE,
  processing_error TEXT,
  retry_count INTEGER DEFAULT 0,
  payload JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  processed_at TIMESTAMPTZ
);

CREATE INDEX idx_stripe_webhooks_event_type ON stripe_webhook_events(event_type);
CREATE INDEX idx_stripe_webhooks_processed ON stripe_webhook_events(processed);
CREATE INDEX idx_stripe_webhooks_stripe_id ON stripe_webhook_events(stripe_event_id);
CREATE INDEX idx_stripe_webhooks_created ON stripe_webhook_events(created_at DESC);

COMMENT ON TABLE stripe_webhook_events IS 'Log of all Stripe webhook events received';

-- 7. Create updated_at trigger function (if not exists)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers to all tables
CREATE TRIGGER update_stripe_customers_updated_at BEFORE UPDATE ON stripe_customers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_stripe_payments_updated_at BEFORE UPDATE ON stripe_payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_stripe_commissions_updated_at BEFORE UPDATE ON stripe_commissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_stripe_payouts_updated_at BEFORE UPDATE ON stripe_payouts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_stripe_connect_accounts_updated_at BEFORE UPDATE ON stripe_connect_accounts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 8. Create helper views for common queries

-- View: Ambassador commission balance
CREATE OR REPLACE VIEW ambassador_commission_balances AS
SELECT
  c.id as customer_id,
  c.name as ambassador_name,
  c.email as ambassador_email,
  COALESCE(SUM(CASE WHEN sc.status IN ('pending', 'approved') THEN sc.amount ELSE 0 END), 0) as pending_balance,
  COALESCE(SUM(CASE WHEN sc.status = 'paid' THEN sc.amount ELSE 0 END), 0) as paid_total,
  COALESCE(SUM(sc.amount), 0) as lifetime_earnings,
  COUNT(CASE WHEN sc.status IN ('pending', 'approved') THEN 1 END) as pending_commissions,
  COUNT(CASE WHEN sc.status = 'paid' THEN 1 END) as paid_commissions,
  MAX(sc.paid_at) as last_payout_date
FROM customers c
LEFT JOIN stripe_commissions sc ON sc.ambassador_id = c.id
GROUP BY c.id, c.name, c.email;

COMMENT ON VIEW ambassador_commission_balances IS 'Summary of commission balances for each ambassador';

-- View: Payment summary by business
CREATE OR REPLACE VIEW business_payment_summary AS
SELECT
  b.id as business_id,
  b.name as business_name,
  COUNT(sp.id) as total_payments,
  COUNT(CASE WHEN sp.status = 'succeeded' THEN 1 END) as successful_payments,
  COALESCE(SUM(CASE WHEN sp.status = 'succeeded' THEN sp.amount_total ELSE 0 END), 0) as total_revenue,
  COALESCE(SUM(CASE WHEN sp.status = 'refunded' THEN sp.refund_amount ELSE 0 END), 0) as total_refunds,
  MAX(sp.paid_at) as last_payment_date
FROM businesses b
LEFT JOIN stripe_payments sp ON sp.business_id = b.id
GROUP BY b.id, b.name;

COMMENT ON VIEW business_payment_summary IS 'Payment summary statistics for each business';

-- 9. Row Level Security (RLS)

-- Enable RLS on all tables
ALTER TABLE stripe_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_connect_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_webhook_events ENABLE ROW LEVEL SECURITY;

-- Policies for stripe_customers
CREATE POLICY "Users can view their own Stripe customers"
  ON stripe_customers FOR SELECT
  USING (business_id IN (SELECT id FROM businesses WHERE user_id = auth.uid()));

CREATE POLICY "Service role has full access to stripe_customers"
  ON stripe_customers FOR ALL
  USING (auth.role() = 'service_role');

-- Policies for stripe_payments
CREATE POLICY "Users can view their own payments"
  ON stripe_payments FOR SELECT
  USING (business_id IN (SELECT id FROM businesses WHERE user_id = auth.uid()));

CREATE POLICY "Service role has full access to stripe_payments"
  ON stripe_payments FOR ALL
  USING (auth.role() = 'service_role');

-- Policies for stripe_commissions
CREATE POLICY "Ambassadors can view their own commissions"
  ON stripe_commissions FOR SELECT
  USING (ambassador_id IN (SELECT id FROM customers WHERE email = auth.jwt()->>'email'));

CREATE POLICY "Business owners can view their commissions"
  ON stripe_commissions FOR SELECT
  USING (business_id IN (SELECT id FROM businesses WHERE user_id = auth.uid()));

CREATE POLICY "Service role has full access to stripe_commissions"
  ON stripe_commissions FOR ALL
  USING (auth.role() = 'service_role');

-- Policies for stripe_payouts
CREATE POLICY "Ambassadors can view their own payouts"
  ON stripe_payouts FOR SELECT
  USING (ambassador_id IN (SELECT id FROM customers WHERE email = auth.jwt()->>'email'));

CREATE POLICY "Business owners can view their payouts"
  ON stripe_payouts FOR SELECT
  USING (business_id IN (SELECT id FROM businesses WHERE user_id = auth.uid()));

CREATE POLICY "Service role has full access to stripe_payouts"
  ON stripe_payouts FOR ALL
  USING (auth.role() = 'service_role');

-- Policies for stripe_connect_accounts
CREATE POLICY "Users can view their own Connect account"
  ON stripe_connect_accounts FOR SELECT
  USING (customer_id IN (SELECT id FROM customers WHERE email = auth.jwt()->>'email'));

CREATE POLICY "Service role has full access to stripe_connect_accounts"
  ON stripe_connect_accounts FOR ALL
  USING (auth.role() = 'service_role');

-- Policies for stripe_webhook_events (admin only)
CREATE POLICY "Service role has full access to stripe_webhook_events"
  ON stripe_webhook_events FOR ALL
  USING (auth.role() = 'service_role');
```

**To run this migration:**
1. Go to Supabase Dashboard
2. Navigate to SQL Editor
3. Paste the migration
4. Click "Run"

---

## Day 3: Payment Collection Implementation

*(Implementation continues in next section)*

Would you like me to:
1. Continue with the full implementation guide?
2. Start implementing the code files immediately?
3. Focus on a specific part (payments, payouts, webhooks)?

Let me know how you'd like to proceed!
