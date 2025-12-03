-- Ensure business branding fields exist for campaign theming
alter table public.businesses
  add column if not exists brand_highlight_color text,
  add column if not exists brand_tone text;

-- Seed defaults for existing rows so downstream renders have safe values
update public.businesses
set
  brand_highlight_color = coalesce(brand_highlight_color, '#7c3aed'),
  brand_tone = coalesce(brand_tone, 'modern')
where brand_highlight_color is null
   or brand_tone is null;
