alter table public.referrals
  add column if not exists consent_given boolean default false,
  add column if not exists locale text default 'en';
