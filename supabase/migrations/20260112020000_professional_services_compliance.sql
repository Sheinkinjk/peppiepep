-- Professional Services Compliance & Partner Tier System
-- This migration adds essential compliance tracking and partner management for professional services
-- Supports law firms, accounting practices, consulting firms, and other professional service providers

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- SERVICE PROVIDER TYPES TABLE
-- ============================================================================
-- Defines the types of professional services (law, accounting, consulting, etc.)
CREATE TABLE IF NOT EXISTS public.service_provider_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE, -- 'law', 'accounting', 'consulting', 'financial_advisory', 'insurance', 'recruiting', 'other'
  display_name TEXT NOT NULL, -- 'Law Firms', 'Accounting Practices', etc.
  description TEXT,
  compliance_framework TEXT, -- e.g., 'ABA Model Rules', 'AICPA Code of Conduct', etc.
  requires_professional_license BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default service provider types
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
-- Defines partner tiers (Bronze, Silver, Gold, Platinum) with different commission rates
CREATE TABLE IF NOT EXISTS public.partner_tiers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  tier_name TEXT NOT NULL, -- 'bronze', 'silver', 'gold', 'platinum', 'strategic'
  display_name TEXT NOT NULL, -- 'Bronze Partner', 'Gold Partner', etc.
  commission_rate_percentage NUMERIC(5,2) NOT NULL CHECK (commission_rate_percentage >= 0 AND commission_rate_percentage <= 100),
  min_referrals_required INTEGER DEFAULT 0,
  min_monthly_revenue INTEGER DEFAULT 0, -- in cents
  benefits TEXT, -- JSON or text description of tier benefits
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(business_id, tier_name)
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_partner_tiers_business_id ON public.partner_tiers(business_id);

-- ============================================================================
-- PARTNER AGREEMENTS TABLE
-- ============================================================================
-- Tracks versions of partner agreements that must be accepted
CREATE TABLE IF NOT EXISTS public.partner_agreements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  version TEXT NOT NULL, -- e.g., 'v1.0', 'v2.0'
  title TEXT NOT NULL,
  terms_text TEXT NOT NULL, -- Full agreement text
  terms_html TEXT, -- HTML version for display
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
-- Tracks when partners accept agreements (for compliance audit trail)
CREATE TABLE IF NOT EXISTS public.partner_agreement_acceptances (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  agreement_id UUID NOT NULL REFERENCES public.partner_agreements(id) ON DELETE CASCADE,
  accepted_at TIMESTAMPTZ DEFAULT NOW(),
  ip_address INET, -- IP address from which acceptance was made
  user_agent TEXT, -- Browser user agent for audit trail
  electronic_signature TEXT, -- Typed name or other signature method
  acceptance_method TEXT DEFAULT 'web', -- 'web', 'email', 'api'
  UNIQUE(customer_id, agreement_id)
);

CREATE INDEX IF NOT EXISTS idx_partner_acceptances_customer ON public.partner_agreement_acceptances(customer_id);
CREATE INDEX IF NOT EXISTS idx_partner_acceptances_agreement ON public.partner_agreement_acceptances(agreement_id);

-- ============================================================================
-- PARTNER COMPLIANCE STATUS TABLE
-- ============================================================================
-- Tracks compliance verification status for each partner
CREATE TABLE IF NOT EXISTS public.partner_compliance_status (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('pending', 'verified', 'expired', 'failed', 'not_required')),
  verification_type TEXT, -- 'license', 'certification', 'background_check', 'reference', 'dpa', 'other'
  verification_date TIMESTAMPTZ,
  expiry_date TIMESTAMPTZ,
  verified_by UUID REFERENCES auth.users(id), -- Admin who verified
  verification_notes TEXT,
  document_url TEXT, -- URL to uploaded verification document (if any)
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
-- Defines compliance requirements by service type
CREATE TABLE IF NOT EXISTS public.regulatory_requirements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_type_id UUID REFERENCES public.service_provider_types(id) ON DELETE CASCADE,
  requirement_name TEXT NOT NULL,
  requirement_code TEXT, -- e.g., 'ABA-1.5(e)', 'AICPA-1.520.001'
  description TEXT,
  jurisdiction TEXT, -- 'federal', 'state', 'all', or specific state code
  required_for_platform BOOLEAN DEFAULT TRUE,
  documentation_required BOOLEAN DEFAULT FALSE,
  renewal_period_days INTEGER, -- If verification expires (e.g., 365 for annual)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_regulatory_service_type ON public.regulatory_requirements(service_type_id);

-- Insert some default regulatory requirements
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

-- ============================================================================
-- EXTEND EXISTING TABLES
-- ============================================================================

-- Add compliance and service type fields to businesses table
ALTER TABLE public.businesses
  ADD COLUMN IF NOT EXISTS service_provider_type TEXT REFERENCES public.service_provider_types(name),
  ADD COLUMN IF NOT EXISTS regulated_industry BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS compliance_framework TEXT,
  ADD COLUMN IF NOT EXISTS dpa_accepted_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS dpa_version TEXT,
  ADD COLUMN IF NOT EXISTS soc2_certified BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS soc2_audit_date TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS data_residency_region TEXT DEFAULT 'us'; -- 'us', 'eu', 'au'

-- Add partner tier and compliance fields to customers table (partners/ambassadors)
ALTER TABLE public.customers
  ADD COLUMN IF NOT EXISTS partner_tier_id UUID REFERENCES public.partner_tiers(id),
  ADD COLUMN IF NOT EXISTS partner_tier TEXT, -- 'bronze', 'silver', 'gold', 'platinum' for quick access
  ADD COLUMN IF NOT EXISTS service_provider_type TEXT REFERENCES public.service_provider_types(name),
  ADD COLUMN IF NOT EXISTS compliance_verified_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS compliance_status TEXT DEFAULT 'pending' CHECK (compliance_status IN ('pending', 'verified', 'expired', 'failed')),
  ADD COLUMN IF NOT EXISTS partner_since_date TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS professional_license_number TEXT,
  ADD COLUMN IF NOT EXISTS license_jurisdiction TEXT,
  ADD COLUMN IF NOT EXISTS last_compliance_check TIMESTAMPTZ;

-- Add service type and compliance notes to partner_applications
ALTER TABLE public.partner_applications
  ADD COLUMN IF NOT EXISTS service_provider_type TEXT REFERENCES public.service_provider_types(name),
  ADD COLUMN IF NOT EXISTS compliance_notes TEXT,
  ADD COLUMN IF NOT EXISTS professional_license_number TEXT,
  ADD COLUMN IF NOT EXISTS approved_by UUID REFERENCES auth.users(id),
  ADD COLUMN IF NOT EXISTS approved_tier TEXT; -- Which tier they were approved for

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
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on new tables
ALTER TABLE public.service_provider_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_agreements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_agreement_acceptances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_compliance_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.regulatory_requirements ENABLE ROW LEVEL SECURITY;

-- Service Provider Types - Public read access
CREATE POLICY "Service provider types are viewable by everyone"
  ON public.service_provider_types FOR SELECT
  USING (TRUE);

-- Partner Tiers - Business owners can manage their tiers
CREATE POLICY "Business owners can view their partner tiers"
  ON public.partner_tiers FOR SELECT
  USING (
    business_id IN (
      SELECT id FROM public.businesses WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Business owners can manage their partner tiers"
  ON public.partner_tiers FOR ALL
  USING (
    business_id IN (
      SELECT id FROM public.businesses WHERE owner_id = auth.uid()
    )
  );

-- Partner Agreements - Business owners manage agreements
CREATE POLICY "Business owners can view their partner agreements"
  ON public.partner_agreements FOR SELECT
  USING (
    business_id IN (
      SELECT id FROM public.businesses WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Business owners can manage their partner agreements"
  ON public.partner_agreements FOR ALL
  USING (
    business_id IN (
      SELECT id FROM public.businesses WHERE owner_id = auth.uid()
    )
  );

-- Partner Agreement Acceptances - Partners can view their own acceptances
CREATE POLICY "Partners can view their own agreement acceptances"
  ON public.partner_agreement_acceptances FOR SELECT
  USING (
    customer_id IN (
      SELECT id FROM public.customers WHERE business_id IN (
        SELECT id FROM public.businesses WHERE owner_id = auth.uid()
      )
    )
  );

CREATE POLICY "Partners can accept agreements"
  ON public.partner_agreement_acceptances FOR INSERT
  WITH CHECK (
    customer_id IN (
      SELECT id FROM public.customers WHERE business_id IN (
        SELECT id FROM public.businesses WHERE owner_id = auth.uid()
      )
    )
  );

-- Partner Compliance Status - Business owners can view and manage
CREATE POLICY "Business owners can view partner compliance"
  ON public.partner_compliance_status FOR SELECT
  USING (
    business_id IN (
      SELECT id FROM public.businesses WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Business owners can manage partner compliance"
  ON public.partner_compliance_status FOR ALL
  USING (
    business_id IN (
      SELECT id FROM public.businesses WHERE owner_id = auth.uid()
    )
  );

-- Regulatory Requirements - Public read access
CREATE POLICY "Regulatory requirements are viewable by everyone"
  ON public.regulatory_requirements FOR SELECT
  USING (TRUE);

-- ============================================================================
-- TRIGGERS FOR UPDATED_AT TIMESTAMPS
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_service_provider_types_updated_at
  BEFORE UPDATE ON public.service_provider_types
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_partner_tiers_updated_at
  BEFORE UPDATE ON public.partner_tiers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_partner_compliance_status_updated_at
  BEFORE UPDATE ON public.partner_compliance_status
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_regulatory_requirements_updated_at
  BEFORE UPDATE ON public.regulatory_requirements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to check if partner needs compliance renewal
CREATE OR REPLACE FUNCTION check_partner_compliance_expiry()
RETURNS TRIGGER AS $$
BEGIN
  -- If compliance has an expiry date and it's passed, mark as expired
  IF NEW.expiry_date IS NOT NULL AND NEW.expiry_date < NOW() AND NEW.status = 'verified' THEN
    NEW.status := 'expired';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_compliance_expiry_on_update
  BEFORE UPDATE ON public.partner_compliance_status
  FOR EACH ROW EXECUTE FUNCTION check_partner_compliance_expiry();

-- Function to automatically set partner_since_date when first approved
CREATE OR REPLACE FUNCTION set_partner_since_date()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.compliance_status = 'verified' AND OLD.compliance_status != 'verified' AND NEW.partner_since_date IS NULL THEN
    NEW.partner_since_date := NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

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

COMMENT ON COLUMN public.businesses.service_provider_type IS 'Type of professional service (law, accounting, consulting, etc.)';
COMMENT ON COLUMN public.businesses.regulated_industry IS 'Whether this business operates in a regulated industry requiring compliance tracking';
COMMENT ON COLUMN public.businesses.data_residency_region IS 'Data residency preference for compliance (us, eu, au)';

COMMENT ON COLUMN public.customers.partner_tier IS 'Partner tier level for quick access (bronze, silver, gold, platinum)';
COMMENT ON COLUMN public.customers.compliance_status IS 'Current compliance verification status (pending, verified, expired, failed)';
COMMENT ON COLUMN public.customers.partner_since_date IS 'Date when partner was first approved and became active';
COMMENT ON COLUMN public.customers.professional_license_number IS 'Professional license number (bar number, CPA license, etc.)';
