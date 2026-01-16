-- External Partners: discovery requests + trackable links

-- ============================================================================
-- TABLES
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.external_partner_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  submitted_by uuid NOT NULL,
  status text NOT NULL DEFAULT 'pending_review',
  assigned_to uuid NULL,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_external_partner_requests_business_id
  ON public.external_partner_requests(business_id);
CREATE INDEX IF NOT EXISTS idx_external_partner_requests_status
  ON public.external_partner_requests(status);

CREATE TABLE IF NOT EXISTS public.external_partner_request_datasets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id uuid NOT NULL REFERENCES public.external_partner_requests(id) ON DELETE CASCADE,
  business_id uuid NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  filename text NOT NULL,
  storage_bucket text NOT NULL,
  storage_path text NOT NULL,
  uploaded_by uuid NOT NULL,
  uploaded_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_external_partner_request_datasets_request_id
  ON public.external_partner_request_datasets(request_id);

CREATE TABLE IF NOT EXISTS public.external_partner_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  customer_id uuid NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  request_id uuid NULL REFERENCES public.external_partner_requests(id) ON DELETE SET NULL,
  landing_url text NOT NULL,
  campaign_goal text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_external_partner_links_unique_active
  ON public.external_partner_links(business_id, customer_id, campaign_goal, landing_url);

-- ============================================================================
-- UPDATED_AT
-- ============================================================================

CREATE OR REPLACE FUNCTION public.set_updated_at_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_external_partner_requests_updated_at
  ON public.external_partner_requests;
CREATE TRIGGER trg_external_partner_requests_updated_at
  BEFORE UPDATE ON public.external_partner_requests
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at_timestamp();

-- ============================================================================
-- RLS
-- ============================================================================

ALTER TABLE public.external_partner_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.external_partner_request_datasets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.external_partner_links ENABLE ROW LEVEL SECURITY;

-- Requests: owners can insert + select their own business' requests. No update/delete for non-admins.
DROP POLICY IF EXISTS "owners_select_external_partner_requests" ON public.external_partner_requests;
CREATE POLICY "owners_select_external_partner_requests"
  ON public.external_partner_requests
  FOR SELECT
  USING (
    business_id IN (SELECT id FROM public.businesses WHERE owner_id = auth.uid())
  );

DROP POLICY IF EXISTS "owners_insert_external_partner_requests" ON public.external_partner_requests;
CREATE POLICY "owners_insert_external_partner_requests"
  ON public.external_partner_requests
  FOR INSERT
  WITH CHECK (
    business_id IN (SELECT id FROM public.businesses WHERE owner_id = auth.uid())
    AND submitted_by = auth.uid()
  );

-- Datasets: only admins (service role bypass) should use these; deny all for anon/auth users.
DROP POLICY IF EXISTS "deny_external_partner_request_datasets" ON public.external_partner_request_datasets;
CREATE POLICY "deny_external_partner_request_datasets"
  ON public.external_partner_request_datasets
  FOR ALL
  USING (FALSE)
  WITH CHECK (FALSE);

-- Links: owners can select + insert links for their business.
DROP POLICY IF EXISTS "owners_select_external_partner_links" ON public.external_partner_links;
CREATE POLICY "owners_select_external_partner_links"
  ON public.external_partner_links
  FOR SELECT
  USING (
    business_id IN (SELECT id FROM public.businesses WHERE owner_id = auth.uid())
  );

DROP POLICY IF EXISTS "owners_insert_external_partner_links" ON public.external_partner_links;
CREATE POLICY "owners_insert_external_partner_links"
  ON public.external_partner_links
  FOR INSERT
  WITH CHECK (
    business_id IN (SELECT id FROM public.businesses WHERE owner_id = auth.uid())
  );

-- ============================================================================
-- STORAGE BUCKET (service uploads)
-- ============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('external-partner-datasets', 'external-partner-datasets', false)
ON CONFLICT (id) DO NOTHING;

