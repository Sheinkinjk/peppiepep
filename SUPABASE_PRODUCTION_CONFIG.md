# Supabase Production Configuration Checklist

## Quick Access Links

- **Project Dashboard**: https://supabase.com/dashboard/project/ovpsgbstrdahrdcllswa
- **Auth Settings**: https://supabase.com/dashboard/project/ovpsgbstrdahrdcllswa/auth/url-configuration
- **Providers**: https://supabase.com/dashboard/project/ovpsgbstrdahrdcllswa/auth/providers
- **Email Templates**: https://supabase.com/dashboard/project/ovpsgbstrdahrdcllswa/auth/templates

---

## 1. URL Configuration

### Navigate to: Authentication → URL Configuration

**Site URL:**
```
https://referlabs.com.au
```

**Redirect URLs (add all of these):**
```
https://referlabs.com.au/auth/callback
https://referlabs.com.au/auth/reset-password
https://referlabs.com.au/**
```

> ⚠️ **Important**: Remove any localhost URLs from production to prevent security issues

---

## 2. Email Provider Configuration

### Navigate to: Authentication → Providers → Email

**Settings:**
- ✅ Enable Email Provider: **ON**
- ✅ Confirm email: **ENABLED**
- ✅ Secure email change: **ENABLED** (recommended)

### SMTP Settings

If using custom SMTP (optional - Supabase has built-in):
- Host: (your SMTP host)
- Port: 587
- Username: (your SMTP username)
- Password: (your SMTP password)

> 💡 You can use Supabase's built-in email for dev, but for production volume you may want custom SMTP

---

## 3. Google OAuth Provider

### Navigate to: Authentication → Providers → Google

**Enable Google Provider:**
- ✅ Enabled for Sign in: **ON**

**OAuth Credentials:**
You'll need to get these from Google Cloud Console:

1. Go to: https://console.cloud.google.com/
2. Select your project (or create one)
3. Navigate to: APIs & Services → Credentials
4. Create OAuth 2.0 Client ID (Web application)

**Authorized redirect URIs (add this to Google Console):**
```
https://ovpsgbstrdahrdcllswa.supabase.co/auth/v1/callback
```

**Then in Supabase, enter:**
- Client ID (OAuth): `[from Google Console]`
- Client Secret (OAuth): `[from Google Console]`

### Google Cloud Console Setup (if not done)

1. **Create OAuth consent screen:**
   - User Type: External
   - App name: Refer Labs
   - User support email: jarred@referlabs.com.au
   - Developer contact: jarred@referlabs.com.au
   - Scopes: email, profile, openid

2. **Create OAuth 2.0 Client:**
   - Application type: Web application
   - Name: Refer Labs Production
   - Authorized redirect URIs: `https://ovpsgbstrdahrdcllswa.supabase.co/auth/v1/callback`

---

## 4. Email Templates

### Navigate to: Authentication → Email Templates

### Template: Confirm signup

**Subject:**
```
Confirm your Refer Labs account
```

**Body (HTML):**
```html
<h2>Welcome to Refer Labs!</h2>
<p>Click the link below to confirm your email address and access your dashboard.</p>
<p><a href="{{ .ConfirmationURL }}">Confirm your email</a></p>
<p>If you didn't create a Refer Labs account, you can safely ignore this email.</p>
```

**Important Variables:**
- `{{ .ConfirmationURL }}` - Auto-generated confirmation link
- Redirect in Supabase should point to: `{{ .SiteURL }}/auth/callback`

---

### Template: Reset password (Magic Link)

**Subject:**
```
Reset your Refer Labs password
```

**Body (HTML):**
```html
<h2>Password Reset Request</h2>
<p>Click the button below to reset your password.</p>
<p><a href="{{ .ConfirmationURL }}" style="display:inline-block;padding:12px 24px;background:#6d28d9;color:#fff;text-decoration:none;border-radius:6px;">Reset Password</a></p>
<p>This link expires in 1 hour.</p>
<p>If you didn't request a password reset, you can safely ignore this email.</p>
```

> **Note**: The recovery email is now handled by `/api/auth/send-recovery` using Resend, so this template may not be actively used. But it's good to have configured as a backup.

---

## 5. Password Settings

### Navigate to: Authentication → Policies

**Recommended Settings:**
- Minimum password length: **6 characters** (matches current validation)
- Password strength: Medium or Strong (recommended)
- Enable email confirmations: **Yes**
- Enable email change confirmations: **Yes** (security)

---

## 6. Rate Limiting (Security)

### Navigate to: Authentication → Rate Limits

**Recommended Settings:**
- Email signups: 4 per hour per IP
- Email logins: 10 per hour per email
- Password recovery: 3 per hour per email
- Email OTP: 4 per hour per email

> These prevent abuse while allowing legitimate users to retry

---

## 7. Security Settings

### Navigate to: Authentication → Policies

**Session Settings:**
- JWT expiry: 3600 seconds (1 hour) - default is fine
- Refresh token rotation: **Enabled** (security)
- Reuse interval: 10 seconds

**Additional Security:**
- Enable CAPTCHA: Consider enabling for production (optional)
- Enable MFA: Available for users who want extra security (optional)

---

## 8. Database Policies (Row Level Security)

Ensure these policies are set on the `businesses` table:

### SELECT policy:
```sql
CREATE POLICY "Users can view their own business"
ON businesses FOR SELECT
USING (auth.uid() = owner_id);
```

### INSERT policy:
```sql
CREATE POLICY "Users can create their own business"
ON businesses FOR INSERT
WITH CHECK (auth.uid() = owner_id);
```

### UPDATE policy:
```sql
CREATE POLICY "Users can update their own business"
ON businesses FOR UPDATE
USING (auth.uid() = owner_id);
```

---

## 9. Verification Checklist

After configuration, verify:

- [ ] Can access https://referlabs.com.au/login
- [ ] "Continue with Google" button visible
- [ ] Email/password sign-up form works
- [ ] "Forgot password?" link visible
- [ ] All redirect URLs whitelisted
- [ ] Google OAuth credentials set
- [ ] Email templates configured
- [ ] Rate limits set appropriately
- [ ] RLS policies enabled on businesses table

---

## 10. Testing Commands

### Check Supabase connection:
```bash
npx vercel env pull .env.production --environment production
grep SUPABASE .env.production
```

### Test authentication locally (using production config):
```bash
# Copy production env to .env.local
cp .env.production .env.local
# Update NEXT_PUBLIC_SITE_URL to localhost for local testing
# Then run dev server
npm run dev
```

---

## Common Configuration Errors

### Error: "Email rate limit exceeded"
**Fix**: Increase rate limits in Authentication → Rate Limits

### Error: "redirect_uri_mismatch" (Google OAuth)
**Fix**: Verify redirect URI in Google Console matches: `https://ovpsgbstrdahrdcllswa.supabase.co/auth/v1/callback`

### Error: "Invalid Redirect URL"
**Fix**: Add the exact URL to Redirect URLs list in Supabase

### Error: "Email not confirmed"
**Fix**: Check email template is sending correctly, verify SMTP settings

---

## Support

If you encounter issues:
1. Check Supabase logs: Dashboard → Logs → Auth
2. Check Vercel deployment logs
3. Verify environment variables match in Vercel
4. Test with a fresh incognito browser session

---

**Last Updated**: December 12, 2024
**Production URL**: https://referlabs.com.au
**Supabase Project**: ovpsgbstrdahrdcllswa
