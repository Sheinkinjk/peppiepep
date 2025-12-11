alter table public.businesses
  add column if not exists onboarding_metadata jsonb;
