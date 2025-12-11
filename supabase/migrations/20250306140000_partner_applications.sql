alter table public.customers
  add column if not exists company text,
  add column if not exists website text,
  add column if not exists instagram_handle text,
  add column if not exists linkedin_handle text,
  add column if not exists audience_profile text,
  add column if not exists source text,
  add column if not exists notes text;

create table if not exists public.partner_applications (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses (id) on delete cascade,
  customer_id uuid references public.customers (id) on delete set null,
  name text,
  email text,
  phone text,
  company text,
  website text,
  instagram_handle text,
  linkedin_handle text,
  audience_profile text,
  notes text,
  source text,
  status text default 'pending' check (status in ('pending','under_review','approved','rejected')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists partner_applications_business_id_idx on public.partner_applications (business_id);
create index if not exists partner_applications_customer_id_idx on public.partner_applications (customer_id);

create trigger partner_applications_set_updated_at
before update on public.partner_applications
for each row execute function public.set_updated_at();

alter table public.partner_applications enable row level security;

drop policy if exists "Owners can select partner applications" on public.partner_applications;
create policy "Owners can select partner applications"
  on public.partner_applications for select
  using (exists (
    select 1
    from public.businesses b
    where b.id = business_id
      and b.owner_id = auth.uid()
  ));

drop policy if exists "Owners can update partner applications" on public.partner_applications;
create policy "Owners can update partner applications"
  on public.partner_applications for update
  using (exists (
    select 1
    from public.businesses b
    where b.id = business_id
      and b.owner_id = auth.uid()
  ));
