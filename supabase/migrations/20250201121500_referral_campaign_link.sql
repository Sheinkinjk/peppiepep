alter table public.referrals
  add column if not exists campaign_id uuid references public.campaigns (id);

create index if not exists referrals_campaign_id_idx on public.referrals (campaign_id);
