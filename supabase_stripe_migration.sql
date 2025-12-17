-- =====================================================
-- Stripe Integration Database Migration
-- For Refer Labs Platform
-- Date: December 17, 2025
-- =====================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLE 1: stripe_customers
-- Links platform customers/businesses to Stripe customer IDs
-- =====================================================

CREATE TABLE IF NOT EXISTS stripe_customers (
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

CREATE INDEX IF NOT EXISTS idx_stripe_customers_business ON stripe_customers(business_id);
CREATE INDEX IF NOT EXISTS idx_stripe_customers_customer ON stripe_customers(customer_id);
CREATE INDEX IF NOT EXISTS idx_stripe_customers_stripe_id ON stripe_customers(stripe_customer_id);

COMMENT ON TABLE stripe_customers IS 'Maps platform customers to Stripe customer IDs for payment processing';

-- =====================================================
-- TABLE 2: stripe_payments
-- Tracks all payment transactions
-- =====================================================

CREATE TABLE IF NOT EXISTS stripe_payments (
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

CREATE INDEX IF NOT EXISTS idx_stripe_payments_business ON stripe_payments(business_id);
CREATE INDEX IF NOT EXISTS idx_stripe_payments_customer ON stripe_payments(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_stripe_payments_status ON stripe_payments(status);
CREATE INDEX IF NOT EXISTS idx_stripe_payments_intent ON stripe_payments(stripe_payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_stripe_payments_paid_at ON stripe_payments(paid_at DESC);

COMMENT ON TABLE stripe_payments IS 'All payment transactions processed through Stripe';

-- =====================================================
-- TABLE 3: stripe_commissions
-- Tracks commissions earned by ambassadors
-- =====================================================

CREATE TABLE IF NOT EXISTS stripe_commissions (
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
  payout_id UUID, -- references stripe_payouts(id), will add constraint later
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_stripe_commissions_ambassador ON stripe_commissions(ambassador_id);
CREATE INDEX IF NOT EXISTS idx_stripe_commissions_status ON stripe_commissions(status);
CREATE INDEX IF NOT EXISTS idx_stripe_commissions_referral ON stripe_commissions(referral_id);
CREATE INDEX IF NOT EXISTS idx_stripe_commissions_payment ON stripe_commissions(payment_id);
CREATE INDEX IF NOT EXISTS idx_stripe_commissions_created ON stripe_commissions(created_at DESC);

COMMENT ON TABLE stripe_commissions IS 'Commission earnings for ambassadors from referrals';

-- =====================================================
-- TABLE 4: stripe_payouts
-- Tracks payouts to ambassadors
-- =====================================================

CREATE TABLE IF NOT EXISTS stripe_payouts (
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

CREATE INDEX IF NOT EXISTS idx_stripe_payouts_ambassador ON stripe_payouts(ambassador_id);
CREATE INDEX IF NOT EXISTS idx_stripe_payouts_status ON stripe_payouts(status);
CREATE INDEX IF NOT EXISTS idx_stripe_payouts_stripe_payout_id ON stripe_payouts(stripe_payout_id);
CREATE INDEX IF NOT EXISTS idx_stripe_payouts_created ON stripe_payouts(created_at DESC);

COMMENT ON TABLE stripe_payouts IS 'Payout transactions to ambassador bank accounts via Stripe Connect';

-- Add foreign key from commissions to payouts (now that payouts table exists)
ALTER TABLE stripe_commissions
  DROP CONSTRAINT IF EXISTS fk_commission_payout;

ALTER TABLE stripe_commissions
  ADD CONSTRAINT fk_commission_payout
  FOREIGN KEY (payout_id)
  REFERENCES stripe_payouts(id)
  ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_stripe_commissions_payout ON stripe_commissions(payout_id);

-- =====================================================
-- TABLE 5: stripe_connect_accounts
-- Manages Stripe Connect accounts for ambassadors
-- =====================================================

CREATE TABLE IF NOT EXISTS stripe_connect_accounts (
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

CREATE INDEX IF NOT EXISTS idx_stripe_connect_customer ON stripe_connect_accounts(customer_id);
CREATE INDEX IF NOT EXISTS idx_stripe_connect_stripe_id ON stripe_connect_accounts(stripe_account_id);
CREATE INDEX IF NOT EXISTS idx_stripe_connect_onboarding ON stripe_connect_accounts(onboarding_completed);

COMMENT ON TABLE stripe_connect_accounts IS 'Stripe Connect accounts for ambassadors to receive payouts';

-- =====================================================
-- TABLE 6: stripe_webhook_events
-- Logs all webhook events for debugging and audit
-- =====================================================

CREATE TABLE IF NOT EXISTS stripe_webhook_events (
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

CREATE INDEX IF NOT EXISTS idx_stripe_webhooks_event_type ON stripe_webhook_events(event_type);
CREATE INDEX IF NOT EXISTS idx_stripe_webhooks_processed ON stripe_webhook_events(processed);
CREATE INDEX IF NOT EXISTS idx_stripe_webhooks_stripe_id ON stripe_webhook_events(stripe_event_id);
CREATE INDEX IF NOT EXISTS idx_stripe_webhooks_created ON stripe_webhook_events(created_at DESC);

COMMENT ON TABLE stripe_webhook_events IS 'Log of all Stripe webhook events received for debugging and audit';

-- =====================================================
-- TRIGGERS: Updated_at automation
-- =====================================================

-- Create updated_at trigger function (if not exists)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers to all tables
DROP TRIGGER IF EXISTS update_stripe_customers_updated_at ON stripe_customers;
CREATE TRIGGER update_stripe_customers_updated_at
  BEFORE UPDATE ON stripe_customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_stripe_payments_updated_at ON stripe_payments;
CREATE TRIGGER update_stripe_payments_updated_at
  BEFORE UPDATE ON stripe_payments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_stripe_commissions_updated_at ON stripe_commissions;
CREATE TRIGGER update_stripe_commissions_updated_at
  BEFORE UPDATE ON stripe_commissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_stripe_payouts_updated_at ON stripe_payouts;
CREATE TRIGGER update_stripe_payouts_updated_at
  BEFORE UPDATE ON stripe_payouts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_stripe_connect_accounts_updated_at ON stripe_connect_accounts;
CREATE TRIGGER update_stripe_connect_accounts_updated_at
  BEFORE UPDATE ON stripe_connect_accounts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- VIEWS: Helper views for common queries
-- =====================================================

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

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE stripe_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_connect_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_webhook_events ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can view their own Stripe customers" ON stripe_customers;
DROP POLICY IF EXISTS "Service role has full access to stripe_customers" ON stripe_customers;
DROP POLICY IF EXISTS "Users can view their own payments" ON stripe_payments;
DROP POLICY IF EXISTS "Service role has full access to stripe_payments" ON stripe_payments;
DROP POLICY IF EXISTS "Ambassadors can view their own commissions" ON stripe_commissions;
DROP POLICY IF EXISTS "Business owners can view their commissions" ON stripe_commissions;
DROP POLICY IF EXISTS "Service role has full access to stripe_commissions" ON stripe_commissions;
DROP POLICY IF EXISTS "Ambassadors can view their own payouts" ON stripe_payouts;
DROP POLICY IF EXISTS "Business owners can view their payouts" ON stripe_payouts;
DROP POLICY IF EXISTS "Service role has full access to stripe_payouts" ON stripe_payouts;
DROP POLICY IF EXISTS "Users can view their own Connect account" ON stripe_connect_accounts;
DROP POLICY IF EXISTS "Service role has full access to stripe_connect_accounts" ON stripe_connect_accounts;
DROP POLICY IF EXISTS "Service role has full access to stripe_webhook_events" ON stripe_webhook_events;

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

-- =====================================================
-- COMPLETE!
-- =====================================================

-- Verify migration
SELECT
  'stripe_customers' as table_name, COUNT(*) as row_count FROM stripe_customers
UNION ALL
SELECT 'stripe_payments', COUNT(*) FROM stripe_payments
UNION ALL
SELECT 'stripe_commissions', COUNT(*) FROM stripe_commissions
UNION ALL
SELECT 'stripe_payouts', COUNT(*) FROM stripe_payouts
UNION ALL
SELECT 'stripe_connect_accounts', COUNT(*) FROM stripe_connect_accounts
UNION ALL
SELECT 'stripe_webhook_events', COUNT(*) FROM stripe_webhook_events;

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Stripe Integration Migration Complete!';
  RAISE NOTICE 'Tables created: 6';
  RAISE NOTICE 'Views created: 2';
  RAISE NOTICE 'RLS policies: Enabled';
  RAISE NOTICE 'Ready for payment processing and commission payouts!';
END $$;
