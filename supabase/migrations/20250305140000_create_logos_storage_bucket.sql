-- Create storage bucket for business logos
insert into storage.buckets (id, name, public)
values ('logos', 'logos', true)
on conflict (id) do nothing;

-- Policy: Allow public read access to logos
create policy "Public can view logos"
on storage.objects for select
using (bucket_id = 'logos');

-- Policy: Allow authenticated users to upload logos
create policy "Authenticated users can upload logos"
on storage.objects for insert
with check (
  bucket_id = 'logos' and
  auth.role() = 'authenticated'
);

-- Policy: Allow users to update their own business logos
create policy "Users can update their business logos"
on storage.objects for update
using (
  bucket_id = 'logos' and
  auth.role() = 'authenticated'
);

-- Policy: Allow users to delete their own business logos
create policy "Users can delete their business logos"
on storage.objects for delete
using (
  bucket_id = 'logos' and
  auth.role() = 'authenticated'
);
