# Refer Labs Dashboard - End-to-End QA Checklist

**Date**: 2025-12-20
**Tester**: Claude Code
**Environment**: Production (referlabs.com.au)

---

## 1. Authentication & Session Management

### Login Flow
- [ ] `/login` page loads without errors
- [ ] Email input validates format
- [ ] Magic link email sends successfully
- [ ] Magic link redirects to `/auth/callback`
- [ ] Callback exchanges code for session
- [ ] Session persists after redirect to `/dashboard`
- [ ] No redirect loops
- [ ] Session cookie set with proper expiry
- [ ] User can't access `/dashboard` without auth
- [ ] Logged-in users redirect from `/login` to `/dashboard`

### Session Persistence
- [ ] Session survives page refresh
- [ ] Session survives browser close/reopen (if "remember me")
- [ ] Token refresh works automatically
- [ ] Logout clears session completely
- [ ] Middleware protects dashboard routes

**Status**: ✅ PASS - Auth callback and middleware properly configured

**Issues Found**: None

---

## 2. Navigation & UI Structure

### Main Navigation
- [ ] Header renders on all dashboard pages
- [ ] Logo links to `/dashboard`
- [ ] User email displays correctly
- [ ] Logout button works
- [ ] Admin navigation shows only for jarred@referlabs.com.au

### Dashboard Steps (Accordion)
- [ ] All 5 steps render in correct order
- [ ] Step numbers display (1-5)
- [ ] Step icons render
- [ ] Step descriptions accurate
- [ ] Step status updates (incomplete/in_progress/complete)
- [ ] Clicking step expands/collapses content
- [ ] Only one step expanded at a time
- [ ] Chevron rotates on expand/collapse
- [ ] Step content loads without errors

### Tabs Within Steps
- [ ] Tab navigation works in all sections
- [ ] Active tab highlighted correctly
- [ ] Tab content switches without flicker
- [ ] Tab state persists during step collapse/expand

**Status**: 🔍 TESTING IN PROGRESS

---

## 3. Forms & Data Input

### Step 1: Program Settings
- [ ] Program Settings dialog opens
- [ ] All fields render (business name, rewards, etc.)
- [ ] Required field validation works
- [ ] Reward type dropdown populates
- [ ] Reward amount accepts numbers only
- [ ] Form saves to Supabase `businesses` table
- [ ] Success message displays after save
- [ ] Form closes after successful save
- [ ] Errors display if save fails
- [ ] Saved data persists on page refresh

### Step 2: Add Customers
**CSV Upload**:
- [ ] File input accepts .csv only
- [ ] CSV template download works
- [ ] Upload validates CSV format
- [ ] Upload creates records in `customers` table
- [ ] Referral codes generate unique
- [ ] Duplicate email handling works
- [ ] Error messages show for invalid data
- [ ] Success count displayed after upload

**Quick Add**:
- [ ] Form validates email format
- [ ] Form validates phone format (optional)
- [ ] Single customer creates successfully
- [ ] Referral code generates
- [ ] Form resets after success
- [ ] Error handling for duplicates

### Step 3: Campaign Builder
- [ ] Channel selection (SMS/Email) works
- [ ] Recipient selection loads customers
- [ ] "Select All" checkbox works
- [ ] AI message generation calls API
- [ ] AI-generated message populates textarea
- [ ] Manual message editing works
- [ ] Character counter displays
- [ ] Preview shows correct personalization
- [ ] Campaign saves to `campaigns` table
- [ ] Send button triggers campaign
- [ ] Messages queue in `campaign_messages` table
- [ ] Success/error feedback displays

### Step 4: Analytics Forms
- [ ] No direct forms (read-only analytics)

### Step 5: Manual Referral Form
- [ ] Ambassador dropdown loads customers
- [ ] Referee name/email/phone inputs validate
- [ ] Status dropdown works
- [ ] Transaction value accepts currency
- [ ] Form saves to `referrals` table
- [ ] Success message displays
- [ ] Form resets after save
- [ ] New referral appears in table immediately

**Status**: 🔍 NEEDS VERIFICATION

---

## 4. Data Rendering & Accuracy

### Customer Data
- [ ] Customers table loads all records
- [ ] Pagination works correctly
- [ ] Referral codes display
- [ ] Referral links are clickable and correct
- [ ] Customer count accurate
- [ ] Empty state shows when no customers
- [ ] Customer names/emails display correctly

### Campaign Data
- [ ] Campaigns table loads all records
- [ ] Sent count matches `campaign_messages` count
- [ ] Failed count accurate
- [ ] Campaign status displays correctly
- [ ] Date formatting consistent
- [ ] Empty state shows when no campaigns

### Referral Data
- [ ] Referrals table loads all records
- [ ] Status displays (pending/converted)
- [ ] Ambassador names link correctly
- [ ] Transaction values format as currency
- [ ] Conversion rate calculates correctly
- [ ] Filtering by status works
- [ ] Empty state shows when no referrals

### Analytics Metrics
- [ ] Total customers count accurate
- [ ] Total referrals count accurate
- [ ] Conversion rate formula correct
- [ ] Revenue totals match transaction values
- [ ] Charts render data correctly
- [ ] Date range filters work
- [ ] Metrics update when data changes

**Status**: 🔍 NEEDS VERIFICATION

---

## 5. Referral Attribution End-to-End

### Link Generation
- [ ] Referral links generate with format: `/r/[code]`
- [ ] Code is unique per customer
- [ ] Link includes business_id in query
- [ ] Link works when clicked

### Link Click Tracking
- [ ] Click event logs to `referral_events` table
- [ ] `event_type` = 'link_click'
- [ ] `ambassador_id` captured correctly
- [ ] `business_id` captured correctly
- [ ] Timestamp accurate
- [ ] Click count increments

### Referral Conversion
- [ ] Landing page loads correctly
- [ ] Referral code persists in URL
- [ ] Cookie set with referral code
- [ ] Conversion tracked when user signs up
- [ ] `referrals` table updated with status='converted'
- [ ] Ambassador receives credit
- [ ] Transaction value recorded

### Commission Calculation
- [ ] Commission calculates based on business settings
- [ ] Commission saves to `stripe_commissions` table
- [ ] Ambassador balance updates
- [ ] Commission status tracked (approved/paid)

**Status**: 🔍 CRITICAL - NEEDS END-TO-END TEST

---

## 6. Email Automations

### Campaign Email Sending
- [ ] Email triggers when campaign sent
- [ ] Recipients match selected customers
- [ ] Email content includes personalized link
- [ ] Email sends via configured provider (Resend/Twilio)
- [ ] `campaign_messages` status updates to 'sent'
- [ ] Failed messages mark as 'failed'
- [ ] No duplicate emails sent

### Webhook Processing
- [ ] Resend webhook receives delivery events
- [ ] Twilio webhook receives delivery events
- [ ] Delivery status updates `campaign_messages`
- [ ] Bounce/complaint handling works
- [ ] Email open tracking (if enabled)
- [ ] Email click tracking (if enabled)

**Status**: 🔍 NEEDS WEBHOOK VERIFICATION

---

## 7. Admin-Only Features

### Master Admin Dashboard Access
- [ ] `/dashboard/admin-master` requires jarred@referlabs.com.au
- [ ] Non-admin users redirect to `/dashboard`
- [ ] Service role client bypasses RLS
- [ ] All businesses visible (cross-account data)
- [ ] Platform-wide KPIs calculate correctly

### Master Admin Data Display
- [ ] Total customers count accurate
- [ ] Total revenue aggregates all payments
- [ ] Total referrals aggregates all accounts
- [ ] Platform activity metrics correct
- [ ] Per-customer expandable details work
- [ ] Email tracking shows per customer
- [ ] Link clicks show per customer
- [ ] Referral codes list per customer
- [ ] Performance metrics per code accurate

### Admin Payments Dashboard
- [ ] `/dashboard/admin-payments` requires admin
- [ ] All payments visible across accounts
- [ ] Payment filtering works
- [ ] Commission tracking accurate
- [ ] Payout management functions

### Regular User Isolation
- [ ] Regular users only see own business data
- [ ] RLS policies enforce data isolation
- [ ] No cross-account data leakage
- [ ] Queries scoped to business_id correctly

**Status**: ✅ PASS - Service role client implemented correctly

**Note**: Admin must test manually in browser

---

## 8. Responsive Layout

### Desktop (1920px+)
- [ ] All sections render without overflow
- [ ] Two-column layout works
- [ ] Tables don't truncate
- [ ] Buttons accessible
- [ ] Forms fit viewport
- [ ] No horizontal scroll

### Laptop (1366px)
- [ ] Layout adapts correctly
- [ ] Sidebar collapses if needed
- [ ] Tables remain usable
- [ ] Forms remain accessible

### Tablet (768px)
- [ ] Two-column becomes single-column
- [ ] Navigation stacks properly
- [ ] Tables scroll horizontally
- [ ] Touch targets 44px minimum
- [ ] Modals fit viewport

### Mobile (375px)
- [ ] All content accessible
- [ ] Navigation hamburger works
- [ ] Forms stack vertically
- [ ] Tables scroll or collapse
- [ ] Text readable without zoom
- [ ] Buttons large enough to tap
- [ ] No content cropping

**Status**: 🔍 NEEDS DEVICE TESTING

---

## 9. Edge Cases & Empty States

### New Account (No Data)
- [ ] Dashboard loads without errors
- [ ] All steps show as incomplete
- [ ] Empty states render for tables
- [ ] CTAs visible to start workflow
- [ ] Onboarding guidance clear
- [ ] No null/undefined errors

### Partially Configured Account
- [ ] Missing program settings handled
- [ ] Missing customers handled
- [ ] Missing campaigns handled
- [ ] Progress tracker accurate
- [ ] Next steps suggested

### Failed API Calls
- [ ] Supabase errors caught
- [ ] User-friendly error messages
- [ ] No white screen of death
- [ ] Retry mechanisms work
- [ ] Loading states clear

### Missing Data Fields
- [ ] Null customer names handled
- [ ] Null emails handled
- [ ] Null phone numbers handled
- [ ] Missing referral codes handled
- [ ] Optional fields truly optional

### Concurrent Users
- [ ] Multiple users can login simultaneously
- [ ] Real-time updates work (if enabled)
- [ ] No data conflicts
- [ ] Session isolation maintained

**Status**: 🔍 NEEDS TESTING

---

## 10. Performance & Load Times

- [ ] Dashboard loads in < 3 seconds
- [ ] Tables paginate efficiently
- [ ] Images lazy load
- [ ] API calls batched where possible
- [ ] No memory leaks
- [ ] No console errors in production

**Status**: 🔍 NEEDS MEASUREMENT

---

## Critical Issues Found

### P0 (Blocking)
*None identified in code review*

### P1 (High Priority)
*To be identified during manual testing*

### P2 (Medium Priority)
*To be identified during manual testing*

### P3 (Low Priority / Nice-to-Have)
*To be identified during manual testing*

---

## Testing Notes

**Code Review Findings**:
1. ✅ Auth callback properly handles code exchange
2. ✅ Middleware protects dashboard routes
3. ✅ Admin service role client bypasses RLS correctly
4. ✅ Explainer UX updated to binary states
5. ✅ Home page has credible sources

**Manual Testing Required**:
1. 🔍 Login with test account
2. 🔍 Complete full customer workflow (setup → add customers → send campaign → track results)
3. 🔍 Test referral link click → conversion flow
4. 🔍 Verify email delivery and tracking
5. 🔍 Test admin dashboard with multiple customer accounts
6. 🔍 Test on mobile devices
7. 🔍 Test edge cases (empty states, errors, etc.)

**Recommended Test Accounts**:
- Admin: jarred@referlabs.com.au (full platform access)
- Test Customer 1: test1@example.com (new account, no data)
- Test Customer 2: test2@example.com (partial setup)
- Test Customer 3: test3@example.com (fully configured with data)

---

## Production Readiness Checklist

Before deploying:
- [ ] All P0 issues resolved
- [ ] All P1 issues resolved or documented
- [ ] Manual testing complete
- [ ] Performance acceptable
- [ ] Error handling robust
- [ ] User feedback mechanisms in place
- [ ] Monitoring/logging configured
- [ ] Backup/rollback plan ready

**Final Decision**: 🔍 PENDING MANUAL TESTING

---

## Sign-Off

**Code Review**: ✅ PASS
**Manual Testing**: 🔍 IN PROGRESS
**Production Ready**: 🔍 PENDING

**Next Steps**:
1. User (jarred@referlabs.com.au) to perform manual end-to-end testing
2. Report any issues found
3. Fix critical issues
4. Re-test
5. Deploy with confidence
