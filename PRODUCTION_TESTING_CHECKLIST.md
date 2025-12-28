# Refer Labs Production Testing Checklist
## End-to-End Referral System Validation

**Test Date**: Ready for execution
**Admin Account**: jarred@referlabs.com.au
**Platform**: https://referlabs.com.au
**Objective**: Validate complete referral flows before onboarding real businesses and ambassadors

---

## 🎯 Test Scenario 1: Refer Labs Partner Application Flow

**Goal**: Test the flow where someone applies to become a Refer Labs partner/ambassador

### Steps:
1. ✅ **Submit Partner Application**
   - Navigate to: https://referlabs.com.au/our-referral-program
   - Fill in application form with test data:
     - Name: "Test Partner [Timestamp]"
     - Email: Use a test email you can access
     - Phone: Valid phone number
     - Company: "Test Marketing Agency"
     - Website: "https://testmarketingagency.com"
     - Instagram: "@testmarketing"
     - LinkedIn: "in/testpartner"
     - Audience Profile: "Small business owners in Australia"
     - Launch Plan: "Planning to share via email newsletter and LinkedIn"
   - Submit form

2. ✅ **Verify Admin Notification Email**
   - Check jarred@referlabs.com.au inbox
   - Subject should be: "New referral program applicant: Test Partner [Timestamp]"
   - Email should contain:
     - Applicant's details (name, email, phone, company, etc.)
     - Auto-generated referral link
     - Discount code
     - Snapshot section with all provided info

3. ✅ **Verify Database Records Created**
   - Check Supabase dashboard
   - Verify `customers` table has new record with status "applicant" or "pending"
   - Verify `partner_applications` table has new record with status "pending"
   - Verify referral_code and discount_code were generated

---

## 🎯 Test Scenario 2: Admin Partner Approval Workflow

**Goal**: Test the admin's ability to approve a partner application and trigger automated welcome emails

### Steps:
1. ✅ **Access Admin Dashboard**
   - Login as jarred@referlabs.com.au
   - Navigate to: https://referlabs.com.au/dashboard
   - Scroll to "Partner Applications" section (admin-only)

2. ✅ **Review Partner Applications**
   - Verify the test application appears in the list
   - Check stats cards show correct counts:
     - Pending Applications
     - Active Partners
     - Total Applications
   - Filter by "Pending" status

3. ✅ **Approve Partner Application**
   - Click "Approve" button on test application
   - Verify success message appears
   - Verify application status changes to "approved"

4. ✅ **Verify Applicant Welcome Email**
   - Check test email inbox
   - Subject should be: "🎉 You're Now a Refer Labs Partner!"
   - Email should contain:
     - Welcome message
     - $250 Account Credit notification
     - Unique referral link (clickable)
     - Discount code
     - Ambassador portal link
     - How to Get Started (3 steps)
     - Commission structure details

5. ✅ **Verify Admin Confirmation Email**
   - Check jarred@referlabs.com.au inbox
   - Subject should be: "✅ Partner Approved: Test Partner [Timestamp]"
   - Email should contain:
     - Partner details
     - Referral link
     - Account credit confirmation ($250)
     - Status: "Now active - can start referring"

6. ✅ **Verify Database Updates**
   - Check Supabase `partner_applications` table
     - status = "approved"
     - approved_at timestamp set
     - approved_by = admin user ID
   - Check Supabase `customers` table
     - status = "verified"
     - credits = 25000 (cents)

---

## 🎯 Test Scenario 3: Partner Referral Attribution Flow

**Goal**: Test that referrals are properly attributed when someone uses a partner's referral link

### Steps:
1. ✅ **Get Partner's Referral Link**
   - From the approval email or admin dashboard
   - Format: https://referlabs.com.au/r/[referral_code]

2. ✅ **Click Referral Link (Incognito/Private Browser)**
   - Open referral link in incognito/private browser window
   - Verify link redirects properly
   - Check browser cookies for `ref_ambassador` cookie

3. ✅ **Submit Partner Application via Attributed Link**
   - Fill out partner application form (different email than step 1)
   - Submit application

4. ✅ **Verify Attribution in Admin Notification**
   - Check jarred@referlabs.com.au inbox
   - New application email should show:
     - "🎯 Referred by Ambassador" section
     - Referral code that was used
     - Note about referral record created

5. ✅ **Verify Referral Tracking in Database**
   - Check Supabase `referrals` table
     - New referral record exists
     - ambassador_id matches original partner
     - referred_email matches new applicant
     - status = "pending"
   - Check `stripe_commissions` table
     - New commission record exists
     - amount = 10000 (cents) = $100 AUD signup bonus
     - commission_type = "signup_bonus"
     - status = "approved" (auto-approved)
   - Check `referral_events` table
     - event_type = "signup_submitted"
     - ambassador_id matches

6. ✅ **Verify Ambassador Dashboard Shows Referral**
   - Login as the original partner (use ambassador portal link from their email)
   - Or navigate to: https://referlabs.com.au/r/referral?code=[referral_code]
   - Verify referral appears in their dashboard
   - Verify $100 signup bonus shows in earnings

---

## 🎯 Test Scenario 4: Business Ambassador Approval Workflow

**Goal**: Test the flow where a business owner approves their own ambassadors

### Prerequisites:
- Have a test business account created
- Login as that business owner

### Steps:
1. ✅ **Add Test Ambassador to Business**
   - Login to business dashboard
   - Navigate to "Ambassadors" or "Customers" section
   - Use "Quick Add" feature to add test ambassador:
     - Name: "Test Ambassador [Timestamp]"
     - Email: Test email you can access
     - Phone: Valid phone
   - Ambassador should be created with status "pending"

2. ✅ **Approve Ambassador from Dashboard**
   - Select the pending ambassador (checkbox)
   - Click "Approve Ambassadors" button in toolbar
   - Verify dialog appears:
     - Title: "Approve Ambassadors"
     - Description explains approval process and welcome emails
     - Action button: "Approve & Send Welcome Emails"
   - Click to confirm

3. ✅ **Verify Success Notification**
   - Toast notification should appear:
     - "Ambassadors approved!"
     - Shows count of ambassadors approved
     - Shows count of welcome emails sent

4. ✅ **Verify Ambassador Welcome Email**
   - Check test email inbox
   - Subject: "🎉 Welcome to [Business Name] Ambassador Program!"
   - Email should contain:
     - Welcome message personalized with business name
     - Unique referral link for the business
     - Ambassador discount code
     - Ambassador portal link
     - How to Get Started (3 numbered steps)
     - Ambassador tips section
     - Professional gradient design

5. ✅ **Verify Business Owner Notification**
   - Check business owner's email inbox
   - Subject: "✅ X Ambassador(s) Approved"
   - Email should contain:
     - List of approved ambassador names
     - Email delivery confirmation
     - Link to dashboard

6. ✅ **Verify Database Updates**
   - Check Supabase `customers` table
     - Ambassador status changed to "verified"
   - Refresh business dashboard
     - Ambassador now shows as "verified" status
     - Can be included in campaigns

---

## 🎯 Test Scenario 5: Referral Completion & Rewards Flow

**Goal**: Test complete referral lifecycle from submission to completion

### Steps:
1. ✅ **Submit Test Referral via Ambassador Portal**
   - Access ambassador portal with referral code
   - Submit a referral for a test contact
   - Verify referral appears as "pending"

2. ✅ **Business Owner Marks Referral as Complete**
   - Login as business owner
   - Navigate to referrals section
   - Find the test referral
   - Mark as "completed" (or appropriate completion status)
   - Add revenue amount if applicable

3. ✅ **Verify Completion Notifications**
   - Check for automated notifications
   - Verify ambassador receives notification of completed referral
   - Verify business owner receives confirmation

4. ✅ **Verify Commission Calculation**
   - Check `stripe_commissions` table
   - Verify commission record created based on revenue
   - Verify correct percentage applied
   - Verify status workflow (pending → approved)

5. ✅ **Verify Ambassador Dashboard Updates**
   - Access ambassador portal
   - Verify completed referral appears
   - Verify earnings reflected
   - Verify statistics updated (total referrals, conversion rate, etc.)

---

## 🎯 Test Scenario 6: Email Automation System Validation

**Goal**: Verify all automated emails are working correctly

### Email Checklist:

| Email Type | Trigger | Recipient | Status |
|-----------|---------|-----------|--------|
| Partner Application Notification | Partner application submitted | Admin (jarred@referlabs.com.au) | ⬜ |
| Partner Approval Welcome | Admin approves partner | Partner applicant | ⬜ |
| Partner Approval Confirmation | Admin approves partner | Admin (jarred@referlabs.com.au) | ⬜ |
| Business Ambassador Welcome | Business approves ambassador | Ambassador | ⬜ |
| Business Owner Approval Summary | Business approves ambassadors | Business owner | ⬜ |
| Referral Completion (if implemented) | Referral marked complete | Ambassador | ⬜ |
| First Referral Received | First referral submitted | Business owner | ⬜ |
| First Conversion Captured | First referral completed | Business owner | ⬜ |
| Campaign Delivery Summary | Campaign sent | Business owner | ⬜ |

### Validation Points for Each Email:
- ✅ Subject line is clear and relevant
- ✅ Sender is correctly configured (no-reply or jarred@referlabs.com.au)
- ✅ HTML formatting renders correctly in Gmail, Outlook, mobile
- ✅ All links are clickable and functional
- ✅ Dynamic content (names, codes, links) populates correctly
- ✅ Branding is consistent (colors, logo, gradients)
- ✅ Call-to-action buttons work
- ✅ Mobile responsive design

---

## 🎯 Test Scenario 7: Admin Dashboard Visibility & Controls

**Goal**: Verify admin has complete visibility into all referral activity

### Dashboard Features to Test:

1. ✅ **Partner Applications Manager**
   - Access via admin dashboard
   - Stats cards show accurate counts
   - Filter tabs work (All, Pending, Approved)
   - Application cards display all details
   - Approve button functions correctly
   - Referral performance metrics visible for approved partners

2. ✅ **Referral Tracking**
   - View all referrals across all businesses
   - Filter by status, ambassador, date range
   - Attribution is clearly visible
   - Conversion tracking works

3. ✅ **Commission Management**
   - View all commissions
   - Approve/reject commissions
   - Track payout status
   - Export commission reports

4. ✅ **Analytics & Reporting**
   - Total referrals count
   - Conversion rates
   - Revenue attributed
   - Top performing ambassadors/partners
   - ROI calculations

5. ✅ **Business Management**
   - View all businesses on platform
   - Access any business dashboard (admin privilege)
   - Monitor business health metrics
   - Track active ambassador counts per business

---

## 🎯 Test Scenario 8: Referral Link Attribution & Cookie Tracking

**Goal**: Verify attribution cookies work correctly across different scenarios

### Test Cases:

1. ✅ **30-Day Cookie Persistence**
   - Click referral link
   - Wait 5 minutes (simulate time passing)
   - Submit application
   - Verify attribution still works
   - Check cookie expiration (should be 30 days)

2. ✅ **Cross-Device Attribution (if applicable)**
   - Click link on mobile
   - Submit application on desktop (same user)
   - Verify if attribution persists (may need email-based tracking)

3. ✅ **Cookie Override Behavior**
   - Click referral link A
   - Click referral link B
   - Submit application
   - Verify attribution goes to most recent link (B)

4. ✅ **Direct Application (No Attribution)**
   - Clear all cookies
   - Go directly to partner program page
   - Submit application
   - Verify no attribution recorded (no false positives)

---

## 🎯 Production Readiness Checklist

Before launching to real businesses and partners:

### Infrastructure
- [ ] All environment variables set in production (Vercel)
  - [ ] `RESEND_API_KEY` configured
  - [ ] `RESEND_FROM_EMAIL` set to jarred@referlabs.com.au
  - [ ] `NEXT_PUBLIC_SITE_URL` set to https://referlabs.com.au
  - [ ] `PARTNER_PROGRAM_BUSINESS_ID` configured
  - [ ] `ADMIN_REFERRAL_CODE` set
- [ ] Database migrations completed
- [ ] All indexes created for performance
- [ ] Backup strategy in place
- [ ] Monitoring/alerting configured (Sentry, LogRocket, etc.)

### Email Configuration
- [ ] Resend domain verified
- [ ] SPF/DKIM/DMARC records configured
- [ ] Email sending limits checked
- [ ] Bounce handling configured
- [ ] Unsubscribe links present (if required)

### Security
- [ ] Admin authentication working correctly
- [ ] RLS (Row Level Security) policies active in Supabase
- [ ] API rate limiting configured
- [ ] CORS policies set correctly
- [ ] SQL injection prevention verified
- [ ] XSS protection in place

### Performance
- [ ] Page load times acceptable (< 3 seconds)
- [ ] API response times acceptable (< 500ms)
- [ ] Database query optimization complete
- [ ] Caching strategy implemented
- [ ] CDN configured for static assets

### Legal & Compliance
- [ ] Privacy policy updated with referral program details
- [ ] Terms of service include ambassador/partner terms
- [ ] GDPR compliance verified (if applicable)
- [ ] Cookie consent banner functioning
- [ ] Data retention policies defined

### User Experience
- [ ] Mobile responsive design verified on iOS/Android
- [ ] Cross-browser testing (Chrome, Safari, Firefox, Edge)
- [ ] Error messages are user-friendly
- [ ] Loading states prevent double submissions
- [ ] Form validation is clear and helpful
- [ ] Success states are celebratory and clear

### Documentation
- [ ] Internal documentation for admin processes
- [ ] Partner/ambassador onboarding guide
- [ ] Business owner setup guide
- [ ] API documentation (if exposing APIs)
- [ ] Troubleshooting guide

---

## 🚀 Launch Strategy: Hyper-Scale Growth Plan

### Phase 1: Proof of Concept (2-4 weeks)
**Objective**: Prove the referral system works with real users

1. **Recruit 5-10 Initial Partners**
   - Target: Marketing agencies, consultants, SaaS influencers
   - Incentive: Early adopter status + higher commission (30% instead of 25%)
   - Goal: Each partner refers 2-3 businesses

2. **Onboard 10-20 Initial Businesses**
   - Target: Small businesses ready to implement referral programs
   - Offer: White-glove onboarding + first month free
   - Goal: Each business recruits 10+ ambassadors

3. **Success Metrics**
   - 50+ total referrals submitted
   - 10+ completed conversions
   - $10,000+ in attributed revenue
   - 4+ partner testimonials captured

### Phase 2: Network Effects (Weeks 5-12)
**Objective**: Leverage proof points to accelerate growth

1. **Partner Recruitment Campaign**
   - Create case study from Phase 1 top performer
   - Launch LinkedIn ads targeting consultants/agencies
   - Host webinar: "How to Earn $5K+/month Referring Businesses"
   - Goal: 50+ active partners

2. **Business Acquisition**
   - Partners actively referring businesses
   - Content marketing: "How [Business X] grew 40% with referrals"
   - Industry-specific outreach (e.g., dental practices, real estate)
   - Goal: 100+ businesses on platform

3. **Optimize & Automate**
   - A/B test welcome emails
   - Optimize commission structure based on data
   - Add partner leaderboard for gamification
   - Build out ambassador training resources

### Phase 3: Hyper-Scale (Month 4+)
**Objective**: Compound growth through network effects

1. **Partner-of-Partners Program**
   - Top partners can recruit sub-partners
   - Multi-level commission structure
   - Partner success manager assigned to top 10 partners

2. **Industry Vertical Expansion**
   - Launch industry-specific landing pages
   - Create vertical-specific ambassador playbooks
   - Partner with industry associations

3. **Platform as a Product**
   - Public API for integrations
   - White-label options for enterprise
   - Marketplace of pre-built ambassador campaigns

### Key Metrics to Track

| Metric | Week 1 | Week 4 | Week 12 | Week 24 |
|--------|--------|--------|---------|---------|
| Active Partners | 5 | 20 | 75 | 200 |
| Active Businesses | 10 | 30 | 100 | 300 |
| Total Ambassadors | 50 | 200 | 800 | 2,500 |
| Monthly Referrals | 20 | 100 | 500 | 2,000 |
| Conversion Rate | 15% | 20% | 25% | 30% |
| Monthly Revenue | $5K | $25K | $100K | $350K |

---

## 📋 Testing Sign-Off

### Test Execution Results

| Test Scenario | Status | Tester | Date | Notes |
|--------------|--------|--------|------|-------|
| 1. Partner Application Flow | ⬜ Pending | | | |
| 2. Admin Partner Approval | ⬜ Pending | | | |
| 3. Partner Referral Attribution | ⬜ Pending | | | |
| 4. Business Ambassador Approval | ⬜ Pending | | | |
| 5. Referral Completion & Rewards | ⬜ Pending | | | |
| 6. Email Automation System | ⬜ Pending | | | |
| 7. Admin Dashboard Visibility | ⬜ Pending | | | |
| 8. Attribution & Cookie Tracking | ⬜ Pending | | | |

### Critical Issues Found
*Document any blockers or critical bugs discovered during testing*

---

### Production Launch Approval

**QA Lead**: _________________________ Date: _________

**Technical Lead**: _________________________ Date: _________

**Business Owner (Jarred)**: _________________________ Date: _________

---

## 🎯 Next Steps After Testing

Once all test scenarios pass:

1. [ ] Fix any critical issues discovered
2. [ ] Re-test affected areas
3. [ ] Create partner recruitment email templates
4. [ ] Set up partner onboarding automation
5. [ ] Prepare launch announcement content
6. [ ] Schedule launch date
7. [ ] Begin Phase 1 partner recruitment
8. [ ] Monitor system health during first week
9. [ ] Iterate based on real user feedback

---

**Document Version**: 1.0
**Last Updated**: 2025-12-29
**Maintained By**: Claude Code (AI Assistant)
