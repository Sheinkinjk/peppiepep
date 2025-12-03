-- Allow each campaign to control whether the QR module renders
alter table public.campaigns
  add column if not exists snapshot_include_qr boolean default true;

update public.campaigns
set snapshot_include_qr = true
where snapshot_include_qr is null;
