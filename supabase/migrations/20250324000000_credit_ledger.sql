-- Track credits issued/spent/expired for accurate "credits issued" reporting.

create table if not exists public.credit_ledger (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses (id) on delete cascade,
  customer_id uuid not null references public.customers (id) on delete cascade,
  referral_id uuid references public.referrals (id) on delete set null,
  delta numeric(12,2) not null,
  entry_type text not null check (entry_type in ('issued', 'spent', 'expired', 'adjustment')),
  source text not null,
  note text,
  created_at timestamptz default now()
);

create index if not exists credit_ledger_business_id_idx on public.credit_ledger (business_id);
create index if not exists credit_ledger_customer_id_idx on public.credit_ledger (customer_id);
create index if not exists credit_ledger_entry_type_idx on public.credit_ledger (entry_type);
create index if not exists credit_ledger_created_at_idx on public.credit_ledger (created_at desc);
create index if not exists credit_ledger_business_type_idx on public.credit_ledger (business_id, entry_type);

alter table public.credit_ledger enable row level security;

drop policy if exists "Owners can select credit ledger" on public.credit_ledger;
create policy "Owners can select credit ledger"
  on public.credit_ledger for select
  using (
    exists (
      select 1
      from public.businesses b
      where b.id = business_id
        and b.owner_id = auth.uid()
    )
  );

drop policy if exists "Owners can insert credit ledger" on public.credit_ledger;
create policy "Owners can insert credit ledger"
  on public.credit_ledger for insert
  with check (
    exists (
      select 1
      from public.businesses b
      where b.id = business_id
        and b.owner_id = auth.uid()
    )
  );

drop policy if exists "Service role has full access to credit_ledger" on public.credit_ledger;
create policy "Service role has full access to credit_ledger"
  on public.credit_ledger for all
  using (auth.role() = 'service_role');

