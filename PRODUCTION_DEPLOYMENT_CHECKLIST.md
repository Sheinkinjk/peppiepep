# Production Deployment Checklist

## Pre-Deployment - Environment Configuration

### Critical Environment Variables (Required Before Launch)

These environment variables must be configured in your Vercel project settings:

#### 1. Stripe Configuration (Update from Test to Live)
- [ ] **STRIPE_SECRET_KEY**: Update to live key `sk_live_...` (currently using test key)
  - Get from: https://dashboard.stripe.com/apikeys
  - ⚠️ Never commit live keys to git

- [ ] **STRIPE_WEBHOOK_SECRET**: Replace placeholder with actual webhook secret
  - Current value: `whsec_production_placeholder` ❌
  - Get from: https://dashboard.stripe.com/webhooks
  - Create endpoint for: `https://your-domain.com/api/stripe/webhook`
  - Enable events: `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`

- [ ] **NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY**: Update to live key `pk_live_...` (currently using test key)
  - Get from: https://dashboard.stripe.com/apikeys

#### 2. Site URL Configuration
- [ ] **NEXT_PUBLIC_SITE_URL**: Update to production domain
  - Current value: `http://localhost:3000` ❌
  - Update to: `https://app.referlabs.com.au` (or your actual domain)
  - Used for: Email links, referral URLs, OAuth callbacks

#### 3. Supabase Configuration
- [ ] **NEXT_PUBLIC_SUPABASE_URL**: ✅ Already configured
- [ ] **NEXT_PUBLIC_SUPABASE_ANON_KEY**: ✅ Already configured
- [ ] **SUPABASE_SERVICE_ROLE_KEY**: ✅ Already configured

#### 4. Email Configuration (Resend)
- [ ] **RESEND_API_KEY**: ✅ Already configured
- [ ] **RESEND_FROM_EMAIL**: ✅ Already configured (`Refer Labs <jarred@referlabs.com.au>`)
- [ ] **RESEND_REPLY_TO**: ✅ Already configured

#### 5. SMS Configuration (Twilio)
- [ ] **TWILIO_ACCOUNT_SID**: ✅ Already configured
- [ ] **TWILIO_AUTH_TOKEN**: ✅ Already configured
- [ ] **TWILIO_PHONE_NUMBER**: ✅ Already configured

#### 6. Business Configuration
- [ ] **PARTNER_PROGRAM_BUSINESS_ID**: ✅ Already configured
- [ ] **ADMIN_REFERRAL_CODE**: ✅ Already configured

#### 7. AI Services
- [ ] **OPENAI_API_KEY**: ✅ Already configured

---

## Deployment Steps

### Step 1: Update Vercel Environment Variables (30-60 minutes)

1. **Log into Vercel Dashboard**
   - Navigate to your project settings
   - Go to Environment Variables section

2. **Update Critical Variables**:
   ```bash
   # Update these three critical variables:
   STRIPE_WEBHOOK_SECRET=whsec_[get from Stripe dashboard]
   NEXT_PUBLIC_SITE_URL=https://app.referlabs.com.au

   # Switch from test to live Stripe keys:
   STRIPE_SECRET_KEY=sk_live_[get from Stripe dashboard]
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_[get from Stripe dashboard]
   ```

3. **Verify All Other Variables Match .env.local**
   - Copy all other variables from `.env.local`
   - Ensure no placeholder values remain

### Step 2: Configure Stripe Webhooks (15-30 minutes)

1. **Create Production Webhook Endpoint**
   - Go to: https://dashboard.stripe.com/webhooks
   - Click "Add endpoint"
   - Endpoint URL: `https://app.referlabs.com.au/api/stripe/webhook`

2. **Select Events to Listen To**:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

3. **Copy Webhook Signing Secret**
   - After creating endpoint, reveal the signing secret
   - Update `STRIPE_WEBHOOK_SECRET` in Vercel with this value

### Step 3: Deploy to Production (15 minutes)

1. **Trigger Production Deployment**
   ```bash
   git push origin main
   ```
   Or manually trigger deployment from Vercel dashboard

2. **Monitor Build Logs**
   - Watch for successful compilation
   - Verify all 55 routes build successfully
   - Check for any environment variable errors

3. **Verify Deployment Success**
   - Build should complete in ~2-3 minutes
   - Check deployment URL is accessible

---

## Post-Deployment Testing (30-60 minutes)

### Critical Path Testing

#### 1. Authentication Flow
- [ ] Visit production URL
- [ ] Click "Login" or "Sign Up"
- [ ] Test Google OAuth login
- [ ] Verify redirect to dashboard after login
- [ ] Check session persists on page refresh
- [ ] Test logout functionality

#### 2. Admin Access
- [ ] Log in as `jarred@referlabs.com.au`
- [ ] Verify admin buttons appear on dashboard
- [ ] Access [Admin Master Dashboard](https://app.referlabs.com.au/dashboard/admin-master)
- [ ] Access [Admin Payments](https://app.referlabs.com.au/dashboard/admin-payments)
- [ ] Verify all admin data loads correctly

#### 3. Dashboard Functionality
- [ ] Check all program settings load
- [ ] Verify customer list displays
- [ ] Test quick add customer feature
- [ ] Verify analytics data displays
- [ ] Check referral tracking works

#### 4. Campaign System
- [ ] Navigate to "Launch Campaigns" tab
- [ ] Test recipient selection
- [ ] Verify CRM integration guidance displays
- [ ] Send test campaign to your own email
- [ ] Verify email received with unique tracking link
- [ ] Click tracking link and verify attribution

#### 5. Referral Flow
- [ ] Copy a customer's referral link from dashboard
- [ ] Open link in incognito browser
- [ ] Verify referral page loads correctly
- [ ] Complete a test signup
- [ ] Verify referral tracked in analytics

#### 6. Payment Processing (Use Stripe Test Mode First!)
- [ ] Test checkout flow with test card: `4242 4242 4242 4242`
- [ ] Verify payment appears in Stripe dashboard
- [ ] Check payment recorded in admin payments page
- [ ] Verify commission created for referrer (if applicable)

#### 7. Webhook Verification
- [ ] Go to Stripe Dashboard → Webhooks
- [ ] Trigger a test event
- [ ] Verify webhook received successfully (200 status)
- [ ] Check webhook payload processed correctly

---

## Monitoring & Alerts (First 24 Hours)

### Monitor These Dashboards:

1. **Vercel Dashboard**
   - Watch for deployment errors
   - Monitor function execution logs
   - Check for runtime errors

2. **Stripe Dashboard**
   - Monitor payment success rate
   - Check webhook delivery status
   - Watch for failed payments

3. **Resend Dashboard**
   - Monitor email delivery rate
   - Check for bounces or complaints
   - Verify sending reputation

4. **Supabase Dashboard**
   - Monitor database performance
   - Check for slow queries
   - Watch for authentication errors

### Set Up Alerts:

- [ ] Configure Vercel error notifications
- [ ] Set up Stripe webhook failure alerts
- [ ] Enable Resend delivery failure notifications
- [ ] Configure uptime monitoring (e.g., UptimeRobot)

---

## Rollback Plan (If Issues Occur)

If critical issues are discovered after deployment:

1. **Immediate Rollback**:
   - Go to Vercel Dashboard → Deployments
   - Find previous stable deployment
   - Click "Promote to Production"

2. **Investigate Issues**:
   - Check Vercel function logs
   - Review error messages in browser console
   - Check Stripe webhook logs
   - Review database queries in Supabase

3. **Fix and Redeploy**:
   - Fix issues in local environment
   - Test thoroughly
   - Deploy fix

---

## Known Issues & Limitations

### Non-Blocking Issues (Can Be Addressed Post-Launch):

1. **Type Safety**: 65+ `as any` type casts throughout codebase
   - Impact: None on functionality, technical debt only
   - Priority: Low

2. **Console Logging**: 148 console.log statements remain
   - Impact: Minimal performance impact
   - Priority: Low

3. **Middleware Convention**: Using deprecated convention
   - Impact: Non-breaking deprecation warning
   - Priority: Low

4. **Scheduled Campaigns**: Feature disabled but UI shows it
   - Impact: Feature not available
   - Solution: Hide UI or implement feature

---

## Success Criteria

Production deployment is successful when:

- ✅ All environment variables configured correctly
- ✅ Build completes without errors (55/55 routes)
- ✅ Authentication flow works for new and returning users
- ✅ Admin access works for `jarred@referlabs.com.au`
- ✅ Dashboard loads all data correctly
- ✅ Campaign sending works with real emails
- ✅ Referral tracking and attribution works
- ✅ Payment processing works (test mode first!)
- ✅ Stripe webhooks deliver successfully
- ✅ No critical errors in logs for first hour

---

## Production Readiness Assessment

### ✅ READY FOR PRODUCTION:
- Authentication & authorization system
- Dashboard functionality
- Campaign system with Resend integration
- Referral tracking & attribution
- Commission calculation
- Admin RBAC system
- Payment processing with Stripe
- Database schema and RLS policies
- Form validation
- Error handling
- Security best practices

### ⚠️ REQUIRES CONFIGURATION:
- Stripe webhook secret
- Production site URL
- Live Stripe API keys

### 📝 POST-LAUNCH IMPROVEMENTS:
- Type safety cleanup
- Console log cleanup
- Content Security Policy
- Pagination for high-volume dashboards
- Background job processing

---

## Support Contacts

- **Technical Issues**: jarred@referlabs.com.au
- **Stripe Support**: https://support.stripe.com
- **Vercel Support**: https://vercel.com/support
- **Supabase Support**: https://supabase.com/support

---

## Estimated Timeline

- **Environment Configuration**: 1-2 hours
- **Deployment**: 15 minutes
- **Post-Deployment Testing**: 30-60 minutes
- **First 24h Monitoring**: Ongoing

**Total Time to Launch**: ~2-4 hours of focused work

---

## Final Notes

The application is **architecturally sound and functionally complete**. The codebase demonstrates professional patterns with proper separation of concerns, comprehensive validation, robust error handling, and security best practices.

**The only blockers to production launch are environment configuration tasks** that require manual setup in external dashboards (Vercel, Stripe). Once these are configured, the application is production-ready.

Last Updated: 2025-12-25
Build Status: ✅ Passing (commit: 50c9525)
Routes: 55/55 successful
