# 🔴 URGENT FIX: Change Supabase Site URL

## The Problem

Your Supabase Site URL is set to `http://localhost:3000` which means:
- ❌ OAuth redirects go to localhost (not your live site)
- ❌ Email confirmation links go to localhost
- ❌ Password reset links go to localhost
- ❌ Nobody can login to `https://peppiepep.vercel.app`

## The Fix (2 minutes)

### Step 1: Change Site URL in Supabase

1. Go to https://supabase.com/dashboard
2. Select your **Peppiepep** project
3. Go to **Authentication** → **URL Configuration**
4. Change **Site URL** from:
   ```
   http://localhost:3000
   ```
   To:
   ```
   https://peppiepep.vercel.app
   ```
5. Click **Save**

### Step 2: Add Redirect URLs

In the same **URL Configuration** page, add these **Redirect URLs**:

```
https://peppiepep.vercel.app/*
https://peppiepep.vercel.app/auth/callback
https://peppiepep.vercel.app/dashboard
http://localhost:3000/*
http://localhost:3000/auth/callback
http://localhost:3000/dashboard
```

**Important:** The `/*` wildcard allows all paths under that domain.

Click **Save**

### Step 3: Disable Email Confirmation (Optional but Recommended for Testing)

While you're in the Supabase dashboard:

1. Go to **Authentication** → **Providers** → **Email**
2. **UNCHECK** "Confirm email"
3. Click **Save**

This allows you to login immediately after signup without checking email.

---

## Test After Fix

### Try Email/Password Login:

1. Go to https://peppiepep.vercel.app/login
2. Click **"Don't have an account? Sign up"**
3. Enter email and password
4. Click **Create Account**
5. ✅ You should see the onboarding screen immediately

### Try Google OAuth:

1. Go to https://peppiepep.vercel.app/login
2. Click **Continue with Google**
3. Select your account
4. ✅ You should be redirected to the live site (not localhost!)

---

## Why This Happened

When you first set up Supabase, it defaults to `http://localhost:3000` because most developers test locally first. You need to change it to your production URL for the live site to work.

---

## If You Want BOTH Local and Production to Work

**Good news:** You can use both! The setup above includes both localhost and production URLs in the Redirect URLs list.

**Site URL** should be set to your **primary/production** URL:
- ✅ Production: `https://peppiepep.vercel.app`
- ❌ Local: `http://localhost:3000`

The **Redirect URLs** can include both, so OAuth will work in both environments.

---

## Still Not Working?

If after changing the Site URL you still can't login:

### 1. Clear Browser Cache
- Chrome: Cmd+Shift+Delete (Mac) or Ctrl+Shift+Delete (Windows)
- Clear "Cookies and other site data"
- Clear "Cached images and files"

### 2. Try Incognito/Private Browsing
- This bypasses any cached redirects

### 3. Check Supabase Auth Logs
- Go to **Supabase Dashboard** → **Logs** → **Auth Logs**
- Look for recent login attempts
- Check for error messages

### 4. Verify the Change Took Effect
- Go back to **Authentication** → **URL Configuration**
- Make sure Site URL shows `https://peppiepep.vercel.app` (not localhost)

---

## Expected Behavior After Fix

**Before Fix:**
- Login attempts redirect to `http://localhost:3000` ❌
- OAuth fails with "redirect_uri_mismatch" error ❌
- Can't login to live site ❌

**After Fix:**
- Login attempts redirect to `https://peppiepep.vercel.app` ✅
- OAuth redirects to live site ✅
- Can login and access dashboard ✅

---

**This is the most common authentication issue!** Once you change the Site URL, everything should work immediately.

Let me know if you still have issues after making this change!
