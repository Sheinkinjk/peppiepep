-- Add reusable discount codes for ambassadors and an API secret for webhook captures
alter table public.customers
  add column if not exists discount_code text unique;

alter table public.businesses
  add column if not exists discount_capture_secret text default md5(gen_random_uuid()::text || clock_timestamp()::text);

update public.businesses
set discount_capture_secret = md5(gen_random_uuid()::text || clock_timestamp()::text || coalesce(name, '') || id::text)
where discount_capture_secret is null;

create table if not exists public.discount_redemptions (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  customer_id uuid references public.customers(id) on delete set null,
  discount_code text not null,
  order_reference text,
  capture_source text,
  notes text,
  metadata jsonb,
  amount numeric(12,2),
  captured_at timestamptz default now()
);

create index if not exists discount_redemptions_business_id_idx
  on public.discount_redemptions (business_id);

create index if not exists discount_redemptions_code_idx
  on public.discount_redemptions (discount_code);
