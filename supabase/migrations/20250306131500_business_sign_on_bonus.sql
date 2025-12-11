alter table public.businesses
  add column if not exists sign_on_bonus_enabled boolean default false,
  add column if not exists sign_on_bonus_amount numeric(12,2),
  add column if not exists sign_on_bonus_type text,
  add column if not exists sign_on_bonus_description text;
