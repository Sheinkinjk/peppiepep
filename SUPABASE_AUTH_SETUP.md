# Supabase Authentication Setup Guide

This guide will help you fix the authentication issues with both Google OAuth and email/password login.

## 🔴 CRITICAL: Issues Found

1. **Missing auth callback handler** - OAuth won't work without this (✅ NOW FIXED)
2. **Google OAuth not configured in Supabase**
3. **Email confirmation may be enabled** - prevents immediate login after signup

---

## Step 1: Configure Email Authentication (Fix Email/Password Login)

### Go to Supabase Dashboard

1. Navigate to https://supabase.com/dashboard
2. Select your **Refer Labs** project
3. Go to **Authentication** → **Providers** → **Email**

### Disable Email Confirmation (For MVP Testing)

**Important:** Email confirmation requires users to click a link in their email before they can login. For MVP testing, you should disable this.

1. In the Email provider settings, find **"Confirm email"**
2. **Uncheck** "Confirm email"
3. Click **Save**

### Configure Email Templates (Optional but Recommended)

1. Go to **Authentication** → **Email Templates**
2. Customize the templates for:
   - Confirm signup
   - Magic Link
   - Change Email Address
   - Reset Password

---

## Step 2: Configure Google OAuth

### A. Create Google OAuth Credentials

1. Go to **Google Cloud Console**: https://console.cloud.google.com
2. Select or create a project for Refer Labs (jarred@referlabs.com.au)

#### Enable Google+ API

3. Go to **APIs & Services** → **Library**
4. Search for "Google+ API"
5. Click **Enable**

#### Create OAuth Consent Screen

6. Go to **APIs & Services** → **OAuth consent screen**
7. Select **External** user type
8. Fill in the form:
   - **App name:** Refer Labs
   - **User support email:** jarred@referlabs.com.au
   - **Developer contact:** jarred@referlabs.com.au
   - **Authorized domains:** referlabs.com.au, supabase.co
9. Click **Save and Continue**
10. On **Scopes** page, click **Save and Continue** (use defaults)
11. On **Test users** page, add your email: jarred@referlabs.com.au
12. Click **Save and Continue**

#### Create OAuth Client ID

13. Go to **APIs & Services** → **Credentials**
14. Click **Create Credentials** → **OAuth client ID**
15. Select **Web application**
16. Fill in the form:
    - **Name:** Refer Labs Web Client
    - **Authorized JavaScript origins:**
      ```
      https://referlabs.com.au
      http://localhost:3000
      ```
    - **Authorized redirect URIs:**
      ```
      https://ovpsgbstrdahrdcllswa.supabase.co/auth/v1/callback
      https://referlabs.com.au/auth/callback
      http://localhost:3000/auth/callback
      ```
17. Click **Create**
18. **Copy the Client ID and Client Secret** - you'll need these next
    - Keep the Refer Labs workspace Client ID handy: `1053863421786-nscteoa460rqbdtom2ub00bfmb9ldrmj.apps.googleusercontent.com`

### B. Configure Google OAuth in Supabase

1. Go to your **Supabase Dashboard**
2. Navigate to **Authentication** → **Providers**
3. Find **Google** in the list
4. Click to expand Google settings
5. **Enable** the Google provider
6. Paste your **Client ID** (`1053863421786-nscteoa460rqbdtom2ub00bfmb9ldrmj.apps.googleusercontent.com`)
7. Paste your **Client Secret** (from Google Cloud Console)
8. The **Redirect URL** should be: `https://ovpsgbstrdahrdcllswa.supabase.co/auth/v1/callback`
9. Click **Save**

### C. Update Google OAuth Redirect URI

**IMPORTANT:** You need to get your actual Supabase project URL

1. In Supabase, go to **Settings** → **API**
2. Copy your **Project URL** (looks like `https://xxxxxxxxxxxxx.supabase.co`)
3. Go back to **Google Cloud Console** → **Credentials**
4. Edit your OAuth 2.0 Client ID
5. Update the **Authorized redirect URIs** to include:
   ```
   https://xxxxxxxxxxxxx.supabase.co/auth/v1/callback
   ```
   (Replace `xxxxxxxxxxxxx` with your actual project ID)
6. Click **Save**

---

## Step 3: Configure Site URL in Supabase

1. In Supabase Dashboard, go to **Authentication** → **URL Configuration**
2. Set **Site URL** to: `https://referlabs.com.au`
3. Add **Redirect URLs**:
   ```
   https://referlabs.com.au/auth/callback
   https://referlabs.com.au/dashboard
   http://localhost:3000/auth/callback
   http://localhost:3000/dashboard
   ```
4. Click **Save**

---

## Step 4: Verify Environment Variables

Make sure your `.env.local` file and any deployed environment variables point at the Refer Labs Supabase project:

```env
NEXT_PUBLIC_SUPABASE_URL=https://ovpsgbstrdahrdcllswa.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
NEXT_PUBLIC_SITE_URL=https://referlabs.com.au
```

You can find these in **Supabase Dashboard** → **Settings** → **API**

---

## Step 5: Test Email/Password Login

### Create a Test Account

1. Go to https://referlabs.com.au/login
2. Click **"Don't have an account? Sign up"**
3. Enter:
   - Email: jarred@referlabs.com.au
   - Password: (choose a strong password)
4. Click **Create Account**

### What Should Happen

- ✅ If email confirmation is **disabled**: You should immediately see the onboarding screen
- ❌ If email confirmation is **enabled**: You'll need to check your email and click the confirmation link first

### If Login Fails

1. Go to **Supabase Dashboard** → **Authentication** → **Users**
2. Check if your user appears in the list
3. If user exists but email isn't confirmed:
   - Manually confirm the email in Supabase (click on user → confirm email)
   - OR disable email confirmation (Step 1 above)

---

## Step 6: Test Google OAuth Login

1. Go to https://referlabs.com.au/login
2. Click **Continue with Google**
3. Select your Google account
4. Authorize the app

### What Should Happen

- ✅ You should be redirected to `/auth/callback`
- ✅ Then redirected to either onboarding (if new user) or dashboard (if existing user)

### If OAuth Fails

**Check Google Cloud Console:**
1. Verify OAuth consent screen is configured
2. Verify your email is added as a test user (if app is in testing mode)
3. Verify redirect URIs match exactly

**Check Supabase:**
1. Authentication → Providers → Google is enabled
2. Client ID and Secret are correct
3. Redirect URLs include your Supabase callback URL

**Check Browser Console:**
1. Open DevTools (F12)
2. Look for errors in Console tab
3. Share any error messages

---

## Step 7: Deploy Changes

After configuring Supabase, you need to deploy the code changes:

```bash
git add -A
git commit -m "Add auth callback handler for OAuth support"
git push
```

Wait 1-2 minutes for Vercel to deploy, then test again.

---

## 🐛 Troubleshooting Common Issues

### "Invalid login credentials" Error
- **Cause:** Wrong email/password OR user not confirmed
- **Fix:**
  - Check email/password are correct
  - Disable email confirmation in Supabase
  - Manually confirm user email in Supabase Dashboard

### "OAuth client was not found" Error
- **Cause:** Google OAuth credentials not configured correctly
- **Fix:**
  - Verify Client ID and Secret in Supabase match Google Cloud Console
  - Verify redirect URIs match exactly (no trailing slashes)
  - Make sure Google+ API is enabled

### Redirect Loop
- **Cause:** Auth callback handler not working
- **Fix:**
  - Verify `/auth/callback/route.ts` file exists
  - Check Supabase redirect URLs include `/auth/callback`
  - Clear browser cookies and try again

### "User already registered" but Can't Login
- **Cause:** Email confirmation pending
- **Fix:**
  - Go to Supabase Dashboard → Authentication → Users
  - Find your user
  - Click on the user → Confirm email manually
  - OR disable email confirmation

### Still Can't Login After All Steps
1. **Clear browser cache and cookies**
2. **Try incognito/private browsing**
3. **Check Supabase logs:**
   - Go to **Supabase Dashboard** → **Logs** → **Auth Logs**
   - Look for error messages
4. **Check browser console for errors**
5. **Verify environment variables** are correct in Vercel:
   - Go to Vercel Dashboard → Refer Labs project → Settings → Environment Variables
   - Make sure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set

---

## ✅ Quick Checklist

Before testing, verify:

- [ ] Email confirmation is **disabled** in Supabase (for testing)
- [ ] Google OAuth provider is **enabled** in Supabase
- [ ] Google OAuth Client ID and Secret are **configured** in Supabase
- [ ] Redirect URLs are **configured** in both Google Cloud and Supabase
- [ ] Site URL is set to `https://referlabs.com.au` in Supabase
- [ ] `/auth/callback/route.ts` file exists in your codebase
- [ ] Changes are **deployed** to Vercel
- [ ] Environment variables are correct in `.env.local` and Vercel

---

## 📞 Need Help?

If you're still stuck after following this guide:

1. **Check Supabase Auth Logs:**
   - Dashboard → Logs → Auth Logs
   - Look for recent authentication attempts and errors

2. **Check Browser Console:**
   - Open DevTools (F12)
   - Go to Console tab
   - Share any red error messages

3. **Check Vercel Deployment Logs:**
   - Vercel Dashboard → Your Project → Deployments
   - Click latest deployment → View Function Logs
   - Look for errors in `/auth/callback` route

4. **Share the exact error message** you're seeing and at which step it fails

---

## 🎯 Expected Flow After Setup

### Email/Password Signup Flow:
1. User enters email/password → clicks "Create Account"
2. Account created in Supabase
3. User sees onboarding screen
4. User enters business details → clicks "Launch Dashboard"
5. Business created in database
6. User redirected to `/dashboard`

### Email/Password Login Flow:
1. User enters email/password → clicks "Sign In"
2. Supabase validates credentials
3. User redirected to `/dashboard`

### Google OAuth Flow:
1. User clicks "Continue with Google"
2. Redirected to Google login
3. User authorizes app
4. Redirected to `/auth/callback`
5. Code exchanged for session
6. If new user: redirected to onboarding
7. If existing user: redirected to `/dashboard`

---

**Document Version:** 1.0
**Last Updated:** January 2025
**For:** Pepform Authentication Setup
