# Supabase Storage Setup - Logo Upload Bucket

## Quick Setup (2 minutes)

### Option 1: Via Supabase Dashboard (Recommended)

1. **Go to Storage:**
   - Open [Supabase Dashboard](https://supabase.com/dashboard)
   - Select your project
   - Click **Storage** in left sidebar

2. **Create Bucket:**
   - Click **New Bucket** button
   - Bucket name: `logos`
   - Check **Public bucket** ✅
   - Click **Create Bucket**

3. **Verify Policies:**
   The bucket should auto-create these policies:
   - ✅ Public read access
   - ✅ Authenticated upload access

4. **Test Upload:**
   - Go to your dashboard
   - Click "Program Settings"
   - Upload a logo file
   - Should succeed and show preview

---

### Option 2: Via SQL Editor

1. **Go to SQL Editor:**
   - Open [Supabase Dashboard](https://supabase.com/dashboard)
   - Select your project
   - Click **SQL Editor** in left sidebar

2. **Run Migration:**
   Copy and paste this SQL:

```sql
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

-- Policy: Allow users to delete their business logos
create policy "Users can delete their business logos"
on storage.objects for delete
using (
  bucket_id = 'logos' and
  auth.role() = 'authenticated'
);
```

3. **Click "Run"**

4. **Verify:**
   - Go to **Storage** in sidebar
   - You should see "logos" bucket listed
   - Public badge should show

---

## What This Enables

### Before Setup
- ❌ Logo upload button fails with error
- ❌ "Unable to upload logo. Please check your storage configuration."
- ✅ Logo URL input still works (fallback option)

### After Setup
- ✅ Logo upload button works
- ✅ Files stored at: `https://<project>.supabase.co/storage/v1/object/public/logos/<filename>`
- ✅ Auto-updates `business.logo_url` in database
- ✅ Logo appears in emails, campaign previews, and dashboard

---

## Security Policies Explained

### 1. Public Read Access
```sql
create policy "Public can view logos"
on storage.objects for select
using (bucket_id = 'logos');
```

**Why:** Logos need to be visible in emails sent to customers (no authentication headers).

**Safe because:** Logos are intentionally public (like your website logo).

---

### 2. Authenticated Upload
```sql
create policy "Authenticated users can upload logos"
on storage.objects for insert
with check (
  bucket_id = 'logos' and
  auth.role() = 'authenticated'
);
```

**Why:** Only logged-in business owners can upload.

**Prevents:** Random people uploading files to your storage.

---

### 3. Update & Delete
```sql
create policy "Users can update their business logos"
on storage.objects for update
using (
  bucket_id = 'logos' and
  auth.role() = 'authenticated'
);
```

**Why:** Allows replacing old logos.

**Note:** Currently allows any authenticated user to update any logo. For stricter control, add owner check:

```sql
-- Optional: Restrict to owner only
create policy "Users can update their business logos"
on storage.objects for update
using (
  bucket_id = 'logos' and
  auth.uid()::text = (storage.foldername(name))[1]
);
```

---

## File Upload Flow

### 1. User Action
```typescript
// Dashboard → Program Settings → Upload Logo
<input type="file" accept="image/*" />
```

### 2. Validation
```typescript
// src/app/dashboard/page.tsx:683-694
if (!(file instanceof File) || file.size === 0) {
  return { error: "Please choose a logo file to upload." };
}

if (file.size > 1 * 1024 * 1024) {
  return { error: "Logo too large. Please upload an image under 1MB." };
}
```

**Limits:**
- Max size: 1MB
- Accepted: png, jpg, jpeg, gif, svg

### 3. Upload to Storage
```typescript
// src/app/dashboard/page.tsx:697-705
const ext = file.name.split(".").pop() || "png";
const path = `business-${business.id}-${nanoid()}.${ext}`;

const { data: uploadResult, error: uploadError } = await supabase.storage
  .from("logos")
  .upload(path, file, {
    cacheControl: "3600",
    upsert: true,
  });
```

**File naming:**
- Format: `business-<uuid>-<random>.png`
- Example: `business-123e4567-e89b-12d3-a456-X8pQ2mK9hW0N.png`
- Prevents collisions
- Associates file with business

### 4. Get Public URL
```typescript
// src/app/dashboard/page.tsx:716-717
const { data: { publicUrl } } = supabase.storage
  .from("logos")
  .getPublicUrl(path);
```

**URL format:**
```
https://ovpsgbstrdahrdcllswa.supabase.co/storage/v1/object/public/logos/business-123e4567-e89b-12d3-a456-X8pQ2mK9hW0N.png
```

### 5. Save to Database
```typescript
// src/app/dashboard/page.tsx:720-724
await supabase
  .from("businesses")
  .update({ logo_url: publicUrl })
  .eq("id", business.id);
```

### 6. Revalidate & Display
```typescript
// src/app/dashboard/page.tsx:734
revalidatePath("/dashboard");
```

**Now appears in:**
- ✅ Dashboard header
- ✅ Email campaigns (header logo)
- ✅ Campaign preview modal
- ✅ Settings dialog preview

---

## Testing the Upload

### Test 1: Successful Upload
1. Log in to dashboard
2. Click "Program Settings"
3. Scroll to "Logo Upload" section
4. Click "Choose File"
5. Select an image (PNG, JPG, etc. under 1MB)
6. Click "Upload Logo"
7. Wait for success message: "Logo uploaded"
8. Verify logo appears in settings preview
9. Close settings dialog
10. Verify logo appears in dashboard header

**Expected:** Logo visible immediately after upload.

---

### Test 2: File Too Large
1. Try uploading file >1MB
2. Should show error: "Logo too large. Please upload an image under 1MB."

**Expected:** Upload rejected before API call.

---

### Test 3: Invalid File Type
1. Try uploading .zip or .txt file
2. Browser should prevent selection (accept="image/*")

**Expected:** Only image files selectable.

---

### Test 4: Logo in Email
1. Upload logo (if not already uploaded)
2. Create email campaign
3. Send to yourself
4. Open email
5. Check email header - logo should appear

**Expected:** Logo visible in email template.

---

## Storage Bucket Configuration

### Current Settings (Recommended)
```json
{
  "id": "logos",
  "name": "logos",
  "public": true,
  "file_size_limit": 1048576,
  "allowed_mime_types": [
    "image/png",
    "image/jpeg",
    "image/gif",
    "image/svg+xml",
    "image/webp"
  ]
}
```

### Optional: Restrict File Types via Bucket
1. Go to Storage → logos bucket → Settings
2. Under "Allowed MIME types", add:
   - `image/png`
   - `image/jpeg`
   - `image/gif`
   - `image/svg+xml`
   - `image/webp`
3. Save

**Benefit:** Server-side validation (in addition to client-side).

---

## Troubleshooting

### Error: "Bucket not found"
**Cause:** Bucket not created yet.

**Fix:**
1. Run SQL migration (see Option 2 above)
2. Or create via dashboard (see Option 1)

---

### Error: "Insufficient permissions"
**Cause:** Storage policies not set up.

**Fix:**
1. Go to Storage → logos bucket → Policies
2. Verify these policies exist:
   - "Public can view logos" (SELECT)
   - "Authenticated users can upload logos" (INSERT)
3. If missing, run SQL migration again

---

### Error: "Logo uploaded but not visible"
**Cause:** Bucket not public.

**Fix:**
1. Go to Storage → logos bucket → Settings
2. Check "Public bucket"
3. Save

---

### Logo Appears Broken in Email
**Cause:** URL not accessible publicly.

**Check:**
1. Copy logo URL from database
2. Open in incognito browser window
3. Should load without authentication

**Fix:** Ensure bucket is public (see above).

---

## Production Checklist

### Before Launch
- [ ] Create "logos" bucket in Supabase
- [ ] Verify bucket is public
- [ ] Run SQL policies migration
- [ ] Test upload in dashboard
- [ ] Verify logo appears in email preview
- [ ] Test logo URL loads in incognito browser

### After Launch
- [ ] Monitor storage usage (Supabase dashboard)
- [ ] Set up automatic cleanup of old logos (optional)
- [ ] Consider CDN caching for faster loads (optional)

---

## Storage Quota

### Supabase Free Tier
- **Storage:** 1GB total
- **Bandwidth:** 2GB/month
- **Files:** Unlimited

### Logo Size Estimates
- Average logo: ~50KB
- 1MB limit per file
- **Capacity:** ~20,000 logos per 1GB

**Recommendation:** Free tier is sufficient for most businesses.

---

## Advanced: Logo Optimization

### Optional: Auto-Resize on Upload
Add this edge function to automatically resize logos:

```typescript
// supabase/functions/resize-logo/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const { path } = await req.json();

  // Download original
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { data } = await supabase.storage
    .from("logos")
    .download(path);

  // Resize to max 200x200 (using image library)
  // ... resize logic ...

  // Re-upload
  await supabase.storage
    .from("logos")
    .upload(path, resizedBlob, { upsert: true });

  return new Response("OK");
});
```

**Benefit:** Reduces file sizes, faster email loads.

---

## Summary

### What You Get
✅ Logo upload button works in dashboard
✅ Logos stored securely in Supabase Storage
✅ Public URLs for use in emails
✅ 1MB file size limit enforced
✅ Authenticated upload only
✅ Logo appears across all emails and UI

### Setup Time
⏱️ **2 minutes** via Supabase dashboard
⏱️ **1 minute** via SQL editor

### Cost
💰 **Free** (included in Supabase free tier)

---

**Ready to enable logo uploads! Choose Option 1 (dashboard) or Option 2 (SQL) above and run it now.** 🎨
