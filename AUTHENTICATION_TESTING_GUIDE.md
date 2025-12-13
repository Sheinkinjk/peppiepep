# Authentication Testing Guide for Refer Labs

## Prerequisites
Before testing, verify these settings in Supabase Dashboard:

### 1. Authentication Settings (https://supabase.com/dashboard/project/ovpsgbstrdahrdcllswa/auth/url-configuration)
- **Site URL**: `https://referlabs.com.au`
- **Redirect URLs**: Add these URLs to the allowed list:
  - `https://referlabs.com.au/auth/callback`
  - `https://referlabs.com.au/auth/reset-password`

### 2. Email Provider (https://supabase.com/dashboard/project/ovpsgbstrdahrdcllswa/auth/providers)
- Confirm **Enable Email Provider** is ON
- Confirm **Email confirmations** is enabled

### 3. Google OAuth Provider (https://supabase.com/dashboard/project/ovpsgbstrdahrdcllswa/auth/providers)
- Confirm **Google** provider is enabled
- Verify Client ID and Client Secret are configured
- Redirect URL should be: `https://ovpsgbstrdahrdcllswa.supabase.co/auth/v1/callback`

### 4. Email Templates
Check these templates are configured correctly:
- **Confirm signup**: Should redirect to `{{ .SiteURL }}/auth/callback`
- **Reset password**: Should redirect to `{{ .SiteURL }}/auth/reset-password`

---

## Test Cases

### Test 1: New User Sign-Up with Email/Password

**Steps:**
1. Go to https://referlabs.com.au/login
2. Click "Don't have an account? Sign up"
3. Enter email: `test+[timestamp]@referlabs.com.au`
4. Enter password (min 6 characters)
5. Check "I agree to the Terms of Service and Privacy Policy"
6. Click "Create Account"

**Expected Results:**
- ✅ Green success message appears: "We sent a confirmation link to [email]"
- ✅ Email arrives at inbox from "Refer Labs <jarred@referlabs.com.au>"
- ✅ Email contains verification link
- ✅ Clicking link redirects to `/auth/callback` then `/login?needs_onboarding=true`
- ✅ Onboarding form appears with business details
- ✅ After completing onboarding, redirects to `/dashboard`

**Potential Issues:**
- ❌ Email doesn't arrive → Check Resend dashboard, verify sender domain
- ❌ "Invalid email" error → Check email provider enabled in Supabase
- ❌ Callback fails → Check redirect URLs in Supabase configuration

---

### Test 2: Existing User Sign-In

**Steps:**
1. Go to https://referlabs.com.au/login
2. Enter existing user email
3. Enter password
4. Click "Sign In"

**Expected Results:**
- ✅ If email not confirmed: Error message "Confirm your email before signing in"
- ✅ If email confirmed: Redirects to `/dashboard`
- ✅ Dashboard loads with user's business data
- ✅ User stays logged in on page refresh

**Potential Issues:**
- ❌ "Invalid credentials" → Verify password, check user exists in Supabase
- ❌ Infinite redirect loop → Check auth middleware, session handling
- ❌ Dashboard shows "no business" → Check businesses table has record for user

---

### Test 3: Google OAuth Sign-In (New User)

**Steps:**
1. Go to https://referlabs.com.au/login
2. Click "Continue with Google"
3. Select Google account (or sign in)
4. Authorize the application

**Expected Results:**
- ✅ Redirects to Google OAuth consent screen
- ✅ After authorization, redirects to `/auth/callback`
- ✅ If new user (no business), redirects to `/login?needs_onboarding=true`
- ✅ Onboarding form appears
- ✅ After completing onboarding, redirects to `/dashboard`

**Potential Issues:**
- ❌ "OAuth error" → Check Google OAuth credentials in Supabase
- ❌ Redirect fails → Verify callback URL in Google Console matches Supabase
- ❌ Stuck at callback → Check callback route handler logic

---

### Test 4: Google OAuth Sign-In (Existing User)

**Steps:**
1. Use Google account that has already completed onboarding
2. Go to https://referlabs.com.au/login
3. Click "Continue with Google"
4. Select Google account

**Expected Results:**
- ✅ Redirects to Google OAuth consent screen
- ✅ After authorization, redirects to `/auth/callback`
- ✅ Checks user has business, redirects directly to `/dashboard`
- ✅ No onboarding form shown

---

### Test 5: Forgot Password Flow

**Steps:**
1. Go to https://referlabs.com.au/login
2. Click "Forgot password?"
3. Enter email address
4. Click "Send reset link"

**Expected Results:**
- ✅ Success message: "Check your email - We sent a password reset link"
- ✅ Email arrives from "Refer Labs <jarred@referlabs.com.au>"
- ✅ Email subject: "Refer Labs password reset"
- ✅ Email contains reset link button
- ✅ Clicking link redirects to `/auth/reset-password` with session token

**Potential Issues:**
- ❌ Email doesn't arrive → Check Resend API key, verify sender domain
- ❌ "Error sending recovery email" → Check `/api/auth/send-recovery` logs
- ❌ Reset link expired → Links expire after 1 hour by default

---

### Test 6: Password Reset Page

**Steps:**
1. Click reset link from forgot password email
2. Enter new password (min 6 characters)
3. Confirm new password
4. Click "Update password"

**Expected Results:**
- ✅ Page loads at `/auth/reset-password`
- ✅ If valid session: Form appears
- ✅ If invalid/expired link: Error "Invalid or expired reset link"
- ✅ Password validation:
  - Shows error if < 6 characters
  - Shows error if passwords don't match
- ✅ Success message: "Password updated successfully!"
- ✅ Auto-redirects to `/dashboard` after 2 seconds

**Potential Issues:**
- ❌ "Invalid session" → Link may be expired, request new reset email
- ❌ Update fails → Check Supabase auth logs

---

### Test 7: Email Not Confirmed - Sign In Blocked

**Steps:**
1. Create new account but DON'T click verification email
2. Try to sign in with email/password

**Expected Results:**
- ✅ Error message: "Confirm your email before signing in – the verification link just hit your inbox"
- ✅ User is signed out automatically
- ✅ Cannot access dashboard

---

### Test 8: Onboarding Flow

**Steps:**
1. Complete sign-up (email or Google) as new user
2. After verification, you should land on onboarding form
3. Fill in:
   - Business name
   - Business email
   - Phone number
4. Click "Launch Dashboard"

**Expected Results:**
- ✅ Form validates all required fields
- ✅ Draft data persists in localStorage (refresh page to verify)
- ✅ Creates record in `businesses` table
- ✅ Sets current user as `owner_id`
- ✅ Redirects to `/dashboard`
- ✅ localStorage draft is cleared after successful creation

**Potential Issues:**
- ❌ "Failed to create business" → Check businesses table permissions
- ❌ Form data lost on refresh → localStorage should persist draft
- ❌ Duplicate business error → Check unique constraints on businesses table

---

## Common Issues & Solutions

### Issue: "Error sending recovery email"
**Solution:**
1. Check Resend API key is set in Vercel environment variables
2. Verify sender email `jarred@referlabs.com.au` is verified in Resend
3. Check `/api/auth/send-recovery` route logs

### Issue: OAuth redirect fails
**Solution:**
1. Verify in Supabase → Authentication → URL Configuration:
   - Site URL matches production URL exactly
   - Redirect URLs include callback URLs
2. Check Google OAuth console redirect URIs match Supabase callback

### Issue: Email confirmation link doesn't work
**Solution:**
1. Check Supabase email template for "Confirm signup"
2. Verify template redirects to `{{ .SiteURL }}/auth/callback`
3. Confirm `NEXT_PUBLIC_SITE_URL` is `https://referlabs.com.au` in production

### Issue: User stuck in onboarding loop
**Solution:**
1. Verify business was created in Supabase `businesses` table
2. Check `owner_id` matches authenticated user's ID
3. Manually query: `SELECT * FROM businesses WHERE owner_id = '[user-id]'`

---

## Environment Variables Checklist

Verify these are set in Vercel (Production):
- ✅ `NEXT_PUBLIC_SITE_URL` = `https://referlabs.com.au`
- ✅ `NEXT_PUBLIC_SUPABASE_URL` = `https://ovpsgbstrdahrdcllswa.supabase.co`
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (set)
- ✅ `SUPABASE_SERVICE_ROLE_KEY` = (set)
- ✅ `RESEND_API_KEY` = (set)
- ✅ `RESEND_FROM_EMAIL` = `Refer Labs <jarred@referlabs.com.au>`
- ✅ `RESEND_REPLY_TO` = `jarred@referlabs.com.au`

---

## Quick Test Commands

### Check if user exists:
```sql
SELECT id, email, email_confirmed_at, created_at
FROM auth.users
WHERE email = 'test@example.com';
```

### Check if business exists for user:
```sql
SELECT * FROM businesses
WHERE owner_id = '[user-id]';
```

### Manually confirm user email (for testing):
```sql
UPDATE auth.users
SET email_confirmed_at = NOW()
WHERE email = 'test@example.com';
```

---

## Testing Checklist

- [ ] New user sign-up with email/password
- [ ] Email confirmation link works
- [ ] Existing user sign-in
- [ ] Sign-in blocked if email not confirmed
- [ ] Google OAuth sign-in (new user)
- [ ] Google OAuth sign-in (existing user)
- [ ] Forgot password flow
- [ ] Password reset email delivery
- [ ] Password reset page
- [ ] Onboarding form (new users)
- [ ] Onboarding draft persistence
- [ ] Dashboard access after authentication
- [ ] Session persistence on page refresh
- [ ] Sign-out functionality

---

## Next Steps

After testing, report results:
1. ✅ Which tests passed
2. ❌ Which tests failed
3. 🔍 Error messages encountered
4. 📋 Screenshots of any issues

This will help identify exactly what needs fixing!
