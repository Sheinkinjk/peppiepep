# Production Launch Checklist - Refer Labs

## ✅ Completed Tasks

- [x] Deploy latest code to production
- [x] Set production alias for peppiepep.vercel.app
- [x] Update copyright year to 2025
- [x] Verify SEO meta tags on all pages
- [x] Verify all navigation links work

## 🔧 Environment Variables Required

### Supabase (Database)
- [ ] `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public anon key
- [ ] `SUPABASE_SERVICE_ROLE_KEY` - Service role key (server-side only)

### Resend (Email)
- [ ] `RESEND_API_KEY` - API key for sending emails
- [ ] `RESEND_FROM_EMAIL` - From email address (e.g., "noreply@referlabs.com")
- [ ] `RESEND_REPLY_TO` - (Optional) Reply-to email address

### Twilio (SMS)
- [ ] `TWILIO_ACCOUNT_SID` - Your Twilio account SID
- [ ] `TWILIO_AUTH_TOKEN` - Your Twilio auth token
- [ ] `TWILIO_PHONE_NUMBER` - Your Twilio phone number (E.164 format)

### Optional/Advanced
- [ ] `UPSTASH_REDIS_REST_URL` - (Optional) For rate limiting
- [ ] `UPSTASH_REDIS_REST_TOKEN` - (Optional) For rate limiting
- [ ] `NEXT_PUBLIC_SITE_URL` - Your production domain (e.g., "https://referlabs.com.au")
- [ ] `AMBASSADOR_API_SECRET` - (Optional) Custom auth secret
- [ ] `NEXT_PUBLIC_CAMPAIGN_SCHEDULER_READY` - (Optional) Feature flag

## 🧪 Manual Testing Required

### Core Functionality
- [ ] **Login/Logout Flow** - Visit /login, authenticate, verify redirect to dashboard
- [ ] **Dashboard Access** - Ensure authenticated users can access /dashboard
- [ ] **Navigation** - Click through all header and footer links

### Customer Management
- [ ] **Quick Add Customer** - Add a test customer via the form
- [ ] **CSV Upload** - Upload a sample CSV with customer data
- [ ] **Customer Table** - Verify customer list displays correctly
- [ ] **Referral Link Copy** - Copy a customer's referral link

### Campaign System
- [ ] **Start Campaign Button** - Click "Start Campaign" from dashboard
- [ ] **Campaign Builder** - Go through all 5 steps:
  1. Template selection
  2. Channel selection (SMS/Email)
  3. Recipient filtering
  4. Message preview
  5. Send confirmation
- [ ] **SMS Campaign** - Send a test SMS campaign (1-2 recipients)
- [ ] **Email Campaign** - Send a test email campaign (1-2 recipients)
- [ ] **Campaign History** - Verify campaigns appear in Step 4 table

### Referral Tracking
- [ ] **Referral Link Visit** - Visit a referral link, submit form
- [ ] **Journey Timeline** - Check Step 5 → Journey timeline tab for events
- [ ] **Manual Referral** - Add a manual referral in Step 5
- [ ] **Referral Table** - Verify referrals appear in Step 5 table
- [ ] **Mark Complete** - Mark a referral as completed

### Forms & Communication
- [ ] **Contact Form** - Submit contact form, verify email delivery
- [ ] **Partner Application** - Submit partner form, verify email to jarred@referlabs.com.au
- [ ] **Support Chatbot** - Test chatbot on a few pages
- [ ] **Program Settings** - Update settings, verify save works

### Mobile Testing
- [ ] **Homepage** - Test on mobile device
- [ ] **Dashboard** - Verify responsive layout on mobile
- [ ] **Navigation Menu** - Test mobile menu
- [ ] **Forms** - Submit forms on mobile
- [ ] **Campaign Flow** - Test campaign creation on mobile

## 🌐 Domain Configuration

### DNS (GoDaddy)
- [ ] A record: `@` → `76.76.21.21` (TTL: 600)
- [ ] CNAME record: `www` → `cname.vercel-dns.com` (TTL: 600)
- [ ] Remove any conflicting records

### Vercel Dashboard
- [ ] Add referlabs.com.au to project domains
- [ ] Add www.referlabs.com.au to project domains
- [ ] Verify both domains show "Valid Configuration"
- [ ] Assign latest deployment to both domains
- [ ] Enable auto-assignment for future deployments

## 📊 Performance & SEO
- [ ] Run Lighthouse audit on homepage
- [ ] Run Lighthouse audit on dashboard
- [ ] Verify meta tags in browser
- [ ] Check OpenGraph preview
- [ ] Test page load speed

## 🔒 Security
- [ ] Verify API routes require authentication where needed
- [ ] Check that service role keys are server-side only
- [ ] Verify discount capture secret is not exposed
- [ ] Test rate limiting (if configured)

## 🚀 Final Steps
- [ ] Assign production deployment to custom domains
- [ ] Test www.referlabs.com.au loads correctly
- [ ] Test referlabs.com.au loads correctly
- [ ] Verify both show latest version (2025 copyright)
- [ ] Clear browser cache and test again
- [ ] Test on different browser (Chrome, Safari, Firefox)

## 📝 Post-Launch Monitoring
- [ ] Monitor Vercel deployment logs
- [ ] Check Supabase for database connections
- [ ] Verify email delivery in Resend dashboard
- [ ] Monitor SMS delivery in Twilio console
- [ ] Watch for any error reports

---

**Latest Deployment:** peppiepep-9s7zhst7f-jarred-krowitzs-projects.vercel.app
**Production Alias:** https://peppiepep.vercel.app
**Target Domain:** https://referlabs.com.au (pending assignment)

**Launch Date:** 2025-12-11 (Tomorrow)
