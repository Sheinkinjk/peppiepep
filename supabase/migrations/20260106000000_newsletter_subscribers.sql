create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text default 'landing_page',
  created_at timestamptz default now()
);

create unique index if not exists newsletter_subscribers_email_key on public.newsletter_subscribers (email);
