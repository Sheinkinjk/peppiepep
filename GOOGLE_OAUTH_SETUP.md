# Google OAuth Setup Guide for Refer Labs

This guide will walk you through setting up Google Sign-In for your Refer Labs application using Supabase.

## Prerequisites

- Access to [Google Cloud Console](https://console.cloud.google.com/)
- Access to your [Supabase Dashboard](https://supabase.com/dashboard)
- Admin access to the Refer Labs Supabase project

---

## Part 1: Configure Google Cloud OAuth

### Step 1: Create a Google Cloud Project (if needed)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with **jarred@referlabs.com.au**
3. Create a new project or select an existing one
   - Project name: `Refer Labs` (or similar)
   - Organization: Your organization

### Step 2: Enable Google+ API

1. In the Google Cloud Console, go to **APIs & Services** > **Library**
2. Search for "Google+ API"
3. Click **Enable**

### Step 3: Configure OAuth Consent Screen

1. Go to **APIs & Services** > **OAuth consent screen**
2. Choose **External** user type (unless you have Google Workspace)
3. Click **Create**
4. Fill in the required fields:
   - **App name**: `Refer Labs`
   - **User support email**: `jarred@referlabs.com.au`
   - **App logo**: Upload your Refer Labs logo (optional)
   - **Application home page**: `https://referlabs.com.au`
   - **Authorized domains**:
     - `referlabs.com.au`
     - `supabase.co` (for Supabase auth)
   - **Developer contact email**: `jarred@referlabs.com.au`
5. Click **Save and Continue**
6. **Scopes**: Click **Add or Remove Scopes**
   - Add: `email`
   - Add: `profile`
   - Add: `openid`
7. Click **Save and Continue**
8. **Test users** (optional for development):
   - Add `jarred@referlabs.com.au` and any other test emails
9. Click **Save and Continue**
10. Review and click **Back to Dashboard**

### Step 4: Create OAuth Credentials

1. Go to **APIs & Services** > **Credentials**
2. Click **+ CREATE CREDENTIALS** > **OAuth client ID**
3. Choose **Web application**
4. Fill in the details:
   - **Name**: `Refer Labs Web Client`
   - **Authorized JavaScript origins**:
     ```
     https://referlabs.com.au
     http://localhost:3000
     ```
   - **Authorized redirect URIs**:
     ```
     https://[YOUR-SUPABASE-PROJECT-REF].supabase.co/auth/v1/callback
     https://referlabs.com.au/auth/callback
     http://localhost:3000/auth/callback
     ```

     **Important**: Replace `[YOUR-SUPABASE-PROJECT-REF]` with your actual Supabase project reference ID (found in Supabase Settings > API > Project URL)

5. Click **Create**
6. **Save the credentials**:
   - Copy the **Client ID**
   - Copy the **Client Secret**
   - Store these securely - you'll need them for Supabase

---

## Part 2: Configure Supabase OAuth Provider

### Step 1: Enable Google Provider in Supabase

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your Refer Labs project
3. Navigate to **Authentication** > **Providers**
4. Find **Google** in the list
5. Toggle **Enable** to ON
6. Fill in the credentials:
   - **Client ID**: Paste the Client ID from Google Cloud Console
   - **Client Secret**: Paste the Client Secret from Google Cloud Console
7. Click **Save**
8. Double-check that the Google provider fields actually contain the workspace client ID (`1053863421786-nscteoa460rqbdtom2ub00bfmb9ldrmj.apps.googleusercontent.com`); if Supabase still references your old Gmail project, replace those values so Supabase talks to the Refer Labs project.

### Step 2: Configure Redirect URLs in Supabase

1. Still in **Authentication** settings, go to **URL Configuration**
2. Add the following to **Redirect URLs**:
   ```
   https://referlabs.com.au/auth/callback
   http://localhost:3000/auth/callback
   ```
3. Click **Save**

### Step 3: Configure Site URL

1. In **Authentication** > **URL Configuration**
2. Set **Site URL** to:
   ```
   https://referlabs.com.au
   ```
3. Click **Save**

---

## Part 3: Update Environment Variables

### Step 1: Verify Supabase Environment Variables

Make sure your `.env.local` file has the correct Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://[YOUR-PROJECT-REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[YOUR-ANON-KEY]
```

You can find these in Supabase Dashboard > **Settings** > **API**

---

## Part 4: Test the Integration

### Local Testing

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/login`

3. Click **Continue with Google**

4. You should be redirected to Google's consent screen

5. After signing in with Google, you should be redirected back to `/auth/callback`

6. If you don't have a business profile, you'll be prompted to complete onboarding

7. After onboarding, you should land on `/dashboard`

### Production Testing

1. Deploy your latest changes to Vercel:
   ```bash
   git push
   npx vercel --prod
   ```

2. Navigate to `https://referlabs.com.au/login`

3. Test the Google Sign-In flow

4. Verify the redirect works correctly

---

## Troubleshooting

### Common Issues

#### 1. "redirect_uri_mismatch" Error

**Problem**: The redirect URI doesn't match what's configured in Google Cloud Console.

**Solution**:
- Check that the redirect URI in Google Cloud Console matches exactly:
  ```
  https://[YOUR-SUPABASE-PROJECT-REF].supabase.co/auth/v1/callback
  ```
- Make sure there are no trailing slashes
- Wait a few minutes after making changes in Google Cloud Console

#### 2. "Access Blocked: This app's request is invalid"

**Problem**: The OAuth consent screen is not configured correctly.

**Solution**:
- Go back to Google Cloud Console > OAuth consent screen
- Make sure all required fields are filled in
- Add `referlabs.com.au` and `supabase.co` to authorized domains
- If testing, make sure you're signed in with a test user account

#### 3. "Invalid OAuth client" Error

**Problem**: Client ID or Client Secret is incorrect in Supabase.

**Solution**:
- Double-check that you copied the correct Client ID and Secret from Google Cloud Console
- Make sure there are no extra spaces or characters
- Try regenerating the credentials in Google Cloud Console
- Confirm Supabase is calling the Refer Labs workspace OAuth client (`1053863421786-nscteoa460rqbdtom2ub00bfmb9ldrmj.apps.googleusercontent.com`) by pasting that Client ID/Secret pair into the Google provider panel, and remove any legacy credentials tied to personal Gmail projects.

#### 4. User Creates Account but Can't Sign In

**Problem**: Email verification may be required.

**Solution**:
- Supabase should automatically verify emails from OAuth providers
- Check Supabase Dashboard > Authentication > Users to see if the user's email is verified
- If not, you can manually verify them or adjust email settings

#### 5. "Cross-Origin Request Blocked" Error

**Problem**: CORS configuration issue.

**Solution**:
- Make sure your domain is whitelisted in Supabase
- Check that Site URL and Redirect URLs are configured correctly in Supabase
- Clear your browser cache and cookies

---

## Email Verification Configuration

### Enable Email Confirmation (Already Implemented)

The code already requires email confirmation for password-based signups:

1. In Supabase Dashboard, go to **Authentication** > **Email Templates**
2. Customize the "Confirm signup" email template if desired
3. The confirmation link redirects to `/auth/callback`

### Disable Email Confirmation (Optional - Not Recommended)

If you want to disable email confirmation:

1. Go to Supabase Dashboard > **Authentication** > **Providers**
2. Click on **Email**
3. Toggle **Confirm email** to OFF
4. Click **Save**

**Note**: Keeping email confirmation enabled is recommended for security.

---

## Password Reset Configuration

The password reset flow is already implemented:

1. User clicks "Forgot password?" on login page
2. User enters their email
3. Supabase sends a reset email
4. User clicks the link, which redirects to `/auth/reset-password`
5. User enters and confirms new password
6. User is redirected to `/dashboard`

### Customize Reset Email Template

1. Go to Supabase Dashboard > **Authentication** > **Email Templates**
2. Find "Reset password" template
3. Customize the email content and styling
4. Make sure the reset link points to your domain:
   ```
   {{ .ConfirmationURL }}
   ```

   Should redirect to: `https://referlabs.com.au/auth/reset-password`

---

## Production Checklist

Before going live, verify:

- ✅ Google OAuth client has production redirect URIs configured
- ✅ Supabase has production redirect URLs whitelisted
- ✅ Site URL in Supabase is set to `https://referlabs.com.au`
- ✅ Environment variables are set in Vercel
- ✅ Email templates are customized with your branding
- ✅ OAuth consent screen is configured with correct branding
- ✅ Test users can sign up with email + password
- ✅ Test users can sign in with Google
- ✅ Password reset flow works end-to-end
- ✅ Email verification works for new signups

---

## Support

If you encounter issues not covered in this guide:

1. Check Supabase logs: Dashboard > **Logs** > **Auth**
2. Check browser console for errors
3. Check Network tab for failed requests
4. Contact Supabase support: [https://supabase.com/support](https://supabase.com/support)
5. Check Google OAuth documentation: [https://developers.google.com/identity/protocols/oauth2](https://developers.google.com/identity/protocols/oauth2)

---

## Next Steps

After Google OAuth is working:

1. Consider adding more OAuth providers (Apple, Microsoft, GitHub, etc.)
2. Set up role-based access control (RBAC) if needed
3. Configure session management and token refresh
4. Add social profile data to user metadata
5. Implement user profile settings page

---

**Last Updated**: December 11, 2025
**Maintained by**: Refer Labs Development Team
