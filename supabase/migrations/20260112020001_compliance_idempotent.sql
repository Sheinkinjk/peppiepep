-- Professional Services Compliance Migration (Idempotent Version)
-- Safe to run multiple times - checks for existing objects

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- SERVICE PROVIDER TYPES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.service_provider_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  description TEXT,
  compliance_framework TEXT,
  requires_professional_license BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default service provider types (safe - ON CONFLICT DO NOTHING)
INSERT INTO public.service_provider_types (name, display_name, description, compliance_framework, requires_professional_license) VALUES
  ('law', 'Law Firms', 'Legal services including litigation, corporate law, estate planning, family law, etc.', 'ABA Model Rules of Professional Conduct', TRUE),
  ('accounting', 'Accounting Practices', 'CPA firms, tax preparation, audit services, financial reporting', 'AICPA Code of Professional Conduct', TRUE),
  ('consulting', 'Consulting Firms', 'Management consulting, strategy consulting, operational advisory', NULL, FALSE),
  ('financial_advisory', 'Financial Advisors', 'Wealth management, financial planning, investment advisory', 'SEC/FINRA Regulations', TRUE),
  ('insurance', 'Insurance Brokers', 'Insurance brokerage, risk management, benefits consulting', 'State Insurance Regulations', TRUE),
  ('recruiting', 'Recruiters & Staffing', 'Executive search, talent acquisition, staffing agencies', NULL, FALSE),
  ('other', 'Other Professional Services', 'Other professional service providers', NULL, FALSE)
ON CONFLICT (name) DO NOTHING;

-- ============================================================================
-- PARTNER TIERS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.partner_tiers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  tier_name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  commission_rate_percentage NUMERIC(5,2) NOT NULL CHECK (commission_rate_percentage >= 0 AND commission_rate_percentage <= 100),
  min_referrals_required INTEGER DEFAULT 0,
  min_monthly_revenue INTEGER DEFAULT 0,
  benefits TEXT,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(business_id, tier_name)
);

CREATE INDEX IF NOT EXISTS idx_partner_tiers_business_id ON public.partner_tiers(business_id);

-- ============================================================================
-- PARTNER AGREEMENTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.partner_agreements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  version TEXT NOT NULL,
  title TEXT NOT NULL,
  terms_text TEXT NOT NULL,
  terms_html TEXT,
  effective_date TIMESTAMPTZ NOT NULL,
  expires_date TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  requires_acceptance BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  UNIQUE(business_id, version)
);

CREATE INDEX IF NOT EXISTS idx_partner_agreements_business_id ON public.partner_agreements(business_id);
CREATE INDEX IF NOT EXISTS idx_partner_agreements_active ON public.partner_agreements(business_id, is_active) WHERE is_active = TRUE;

-- ============================================================================
-- PARTNER AGREEMENT ACCEPTANCES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.partner_agreement_acceptances (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  agreement_id UUID NOT NULL REFERENCES public.partner_agreements(id) ON DELETE CASCADE,
  accepted_at TIMESTAMPTZ DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT,
  electronic_signature TEXT,
  acceptance_method TEXT DEFAULT 'web',
  UNIQUE(customer_id, agreement_id)
);

CREATE INDEX IF NOT EXISTS idx_partner_acceptances_customer ON public.partner_agreement_acceptances(customer_id);
CREATE INDEX IF NOT EXISTS idx_partner_acceptances_agreement ON public.partner_agreement_acceptances(agreement_id);

-- ============================================================================
-- PARTNER COMPLIANCE STATUS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.partner_compliance_status (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('pending', 'verified', 'expired', 'failed', 'not_required')),
  verification_type TEXT,
  verification_date TIMESTAMPTZ,
  expiry_date TIMESTAMPTZ,
  verified_by UUID REFERENCES auth.users(id),
  verification_notes TEXT,
  document_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_compliance_customer ON public.partner_compliance_status(customer_id);
CREATE INDEX IF NOT EXISTS idx_compliance_business ON public.partner_compliance_status(business_id);
CREATE INDEX IF NOT EXISTS idx_compliance_status ON public.partner_compliance_status(status);
CREATE INDEX IF NOT EXISTS idx_compliance_expiry ON public.partner_compliance_status(expiry_date) WHERE expiry_date IS NOT NULL;

-- ============================================================================
-- REGULATORY REQUIREMENTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.regulatory_requirements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_type_id UUID REFERENCES public.service_provider_types(id) ON DELETE CASCADE,
  requirement_name TEXT NOT NULL,
  requirement_code TEXT,
  description TEXT,
  jurisdiction TEXT,
  required_for_platform BOOLEAN DEFAULT TRUE,
  documentation_required BOOLEAN DEFAULT FALSE,
  renewal_period_days INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_regulatory_service_type ON public.regulatory_requirements(service_type_id);

-- Insert regulatory requirements (safe - will skip if service types don't exist yet)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM public.service_provider_types WHERE name = 'law') THEN
    INSERT INTO public.regulatory_requirements (service_type_id, requirement_name, requirement_code, description, jurisdiction, required_for_platform)
    SELECT
      id,
      'Referral Fee Compliance',
      'ABA-1.5(e)',
      'Compliance with ABA Model Rule 1.5(e) for division of fees between lawyers',
      'state',
      TRUE
    FROM public.service_provider_types WHERE name = 'law'
    ON CONFLICT DO NOTHING;
  END IF;

  IF EXISTS (SELECT 1 FROM public.service_provider_types WHERE name = 'accounting') THEN
    INSERT INTO public.regulatory_requirements (service_type_id, requirement_name, requirement_code, description, jurisdiction, required_for_platform)
    SELECT
      id,
      'Commission Restrictions',
      'AICPA-1.520',
      'Compliance with AICPA ethics rules regarding commissions and contingent fees',
      'federal',
      TRUE
    FROM public.service_provider_types WHERE name = 'accounting'
    ON CONFLICT DO NOTHING;
  END IF;
END $$;

-- ============================================================================
-- EXTEND EXISTING TABLES
-- ============================================================================
ALTER TABLE public.businesses
  ADD COLUMN IF NOT EXISTS service_provider_type TEXT REFERENCES public.service_provider_types(name),
  ADD COLUMN IF NOT EXISTS regulated_industry BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS compliance_framework TEXT,
  ADD COLUMN IF NOT EXISTS dpa_accepted_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS dpa_version TEXT,
  ADD COLUMN IF NOT EXISTS soc2_certified BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS soc2_audit_date TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS data_residency_region TEXT DEFAULT 'us';

ALTER TABLE public.customers
  ADD COLUMN IF NOT EXISTS partner_tier_id UUID REFERENCES public.partner_tiers(id),
  ADD COLUMN IF NOT EXISTS partner_tier TEXT,
  ADD COLUMN IF NOT EXISTS service_provider_type TEXT REFERENCES public.service_provider_types(name),
  ADD COLUMN IF NOT EXISTS compliance_verified_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS compliance_status TEXT DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS partner_since_date TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS professional_license_number TEXT,
  ADD COLUMN IF NOT EXISTS license_jurisdiction TEXT,
  ADD COLUMN IF NOT EXISTS last_compliance_check TIMESTAMPTZ;

-- Add constraint only if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'customers_compliance_status_check'
  ) THEN
    ALTER TABLE public.customers
      ADD CONSTRAINT customers_compliance_status_check
      CHECK (compliance_status IN ('pending', 'verified', 'expired', 'failed'));
  END IF;
END $$;

ALTER TABLE public.partner_applications
  ADD COLUMN IF NOT EXISTS service_provider_type TEXT REFERENCES public.service_provider_types(name),
  ADD COLUMN IF NOT EXISTS compliance_notes TEXT,
  ADD COLUMN IF NOT EXISTS professional_license_number TEXT,
  ADD COLUMN IF NOT EXISTS approved_by UUID REFERENCES auth.users(id),
  ADD COLUMN IF NOT EXISTS approved_tier TEXT;

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_businesses_service_type ON public.businesses(service_provider_type);
CREATE INDEX IF NOT EXISTS idx_businesses_regulated ON public.businesses(regulated_industry) WHERE regulated_industry = TRUE;
CREATE INDEX IF NOT EXISTS idx_customers_partner_tier ON public.customers(partner_tier_id);
CREATE INDEX IF NOT EXISTS idx_customers_service_type ON public.customers(service_provider_type);
CREATE INDEX IF NOT EXISTS idx_customers_compliance_status ON public.customers(compliance_status);
CREATE INDEX IF NOT EXISTS idx_partner_applications_service_type ON public.partner_applications(service_provider_type);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES (Idempotent)
-- ============================================================================
ALTER TABLE public.service_provider_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_agreements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_agreement_acceptances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_compliance_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.regulatory_requirements ENABLE ROW LEVEL SECURITY;

-- Drop and recreate policies to ensure idempotency
DROP POLICY IF EXISTS "Service provider types are viewable by everyone"
  ON public.service_provider_types;
CREATE POLICY "Service provider types are viewable by everyone"
  ON public.service_provider_types FOR SELECT
  USING (TRUE);

DROP POLICY IF EXISTS "Business owners can view their partner tiers" ON public.partner_tiers;
CREATE POLICY "Business owners can view their partner tiers"
  ON public.partner_tiers FOR SELECT
  USING (
    business_id IN (
      SELECT id FROM public.businesses WHERE owner_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Business owners can manage their partner tiers" ON public.partner_tiers;
CREATE POLICY "Business owners can manage their partner tiers"
  ON public.partner_tiers FOR ALL
  USING (
    business_id IN (
      SELECT id FROM public.businesses WHERE owner_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Business owners can view their partner agreements" ON public.partner_agreements;
CREATE POLICY "Business owners can view their partner agreements"
  ON public.partner_agreements FOR SELECT
  USING (
    business_id IN (
      SELECT id FROM public.businesses WHERE owner_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Business owners can manage their partner agreements" ON public.partner_agreements;
CREATE POLICY "Business owners can manage their partner agreements"
  ON public.partner_agreements FOR ALL
  USING (
    business_id IN (
      SELECT id FROM public.businesses WHERE owner_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Partners can view their own agreement acceptances" ON public.partner_agreement_acceptances;
CREATE POLICY "Partners can view their own agreement acceptances"
  ON public.partner_agreement_acceptances FOR SELECT
  USING (
    customer_id IN (
      SELECT id FROM public.customers WHERE business_id IN (
        SELECT id FROM public.businesses WHERE owner_id = auth.uid()
      )
    )
  );

DROP POLICY IF EXISTS "Partners can accept agreements" ON public.partner_agreement_acceptances;
CREATE POLICY "Partners can accept agreements"
  ON public.partner_agreement_acceptances FOR INSERT
  WITH CHECK (
    customer_id IN (
      SELECT id FROM public.customers WHERE business_id IN (
        SELECT id FROM public.businesses WHERE owner_id = auth.uid()
      )
    )
  );

DROP POLICY IF EXISTS "Business owners can view partner compliance" ON public.partner_compliance_status;
CREATE POLICY "Business owners can view partner compliance"
  ON public.partner_compliance_status FOR SELECT
  USING (
    business_id IN (
      SELECT id FROM public.businesses WHERE owner_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Business owners can manage partner compliance" ON public.partner_compliance_status;
CREATE POLICY "Business owners can manage partner compliance"
  ON public.partner_compliance_status FOR ALL
  USING (
    business_id IN (
      SELECT id FROM public.businesses WHERE owner_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Regulatory requirements are viewable by everyone" ON public.regulatory_requirements;
CREATE POLICY "Regulatory requirements are viewable by everyone"
  ON public.regulatory_requirements FOR SELECT
  USING (TRUE);

-- ============================================================================
-- TRIGGERS (Idempotent)
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_service_provider_types_updated_at ON public.service_provider_types;
CREATE TRIGGER update_service_provider_types_updated_at
  BEFORE UPDATE ON public.service_provider_types
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_partner_tiers_updated_at ON public.partner_tiers;
CREATE TRIGGER update_partner_tiers_updated_at
  BEFORE UPDATE ON public.partner_tiers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_partner_compliance_status_updated_at ON public.partner_compliance_status;
CREATE TRIGGER update_partner_compliance_status_updated_at
  BEFORE UPDATE ON public.partner_compliance_status
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_regulatory_requirements_updated_at ON public.regulatory_requirements;
CREATE TRIGGER update_regulatory_requirements_updated_at
  BEFORE UPDATE ON public.regulatory_requirements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- HELPER FUNCTIONS (Idempotent)
-- ============================================================================
CREATE OR REPLACE FUNCTION check_partner_compliance_expiry()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.expiry_date IS NOT NULL AND NEW.expiry_date < NOW() AND NEW.status = 'verified' THEN
    NEW.status := 'expired';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS check_compliance_expiry_on_update ON public.partner_compliance_status;
CREATE TRIGGER check_compliance_expiry_on_update
  BEFORE UPDATE ON public.partner_compliance_status
  FOR EACH ROW EXECUTE FUNCTION check_partner_compliance_expiry();

CREATE OR REPLACE FUNCTION set_partner_since_date()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.compliance_status = 'verified' AND (OLD.compliance_status IS NULL OR OLD.compliance_status != 'verified') AND NEW.partner_since_date IS NULL THEN
    NEW.partner_since_date := NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_partner_since_date_trigger ON public.customers;
CREATE TRIGGER set_partner_since_date_trigger
  BEFORE UPDATE ON public.customers
  FOR EACH ROW EXECUTE FUNCTION set_partner_since_date();

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================
COMMENT ON TABLE public.service_provider_types IS 'Defines types of professional services (law, accounting, consulting, etc.) with their compliance frameworks';
COMMENT ON TABLE public.partner_tiers IS 'Partner tier definitions (Bronze, Silver, Gold, Platinum) with commission rates and requirements';
COMMENT ON TABLE public.partner_agreements IS 'Versioned partner agreements that must be accepted by partners';
COMMENT ON TABLE public.partner_agreement_acceptances IS 'Audit trail of partner agreement acceptances with IP and timestamp';
COMMENT ON TABLE public.partner_compliance_status IS 'Tracks compliance verification status for each partner (licenses, certifications, background checks)';
COMMENT ON TABLE public.regulatory_requirements IS 'Compliance requirements by service type (ABA rules, AICPA ethics, etc.)';
