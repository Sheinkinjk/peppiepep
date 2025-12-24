-- Dedicated flag for manual-only referrals (so dashboard counts don't rely on created_by).

alter table public.referrals
  add column if not exists is_manual boolean not null default false;

create index if not exists referrals_business_manual_idx
  on public.referrals (business_id, is_manual);

