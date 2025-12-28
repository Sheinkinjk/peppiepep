# Refer Labs Referral System - Complete Overview

## 🎯 System Architecture

The referral system has two main tracks:

1. **Refer Labs Partner Program** - People referring businesses TO Refer Labs
2. **Business Ambassador Program** - Businesses using Refer Labs to manage their own ambassadors

---

## 🔄 Flow Diagram: Refer Labs Partner Program

```
┌─────────────────────────────────────────────────────────────────┐
│                    PARTNER PROGRAM FLOW                          │
└─────────────────────────────────────────────────────────────────┘

Step 1: Application
┌──────────────┐
│   Partner    │  Visits: referlabs.com.au/our-referral-program
│  Applicant   │  Fills form: name, email, company, audience, etc.
└──────┬───────┘  Clicks: Submit
       │
       ▼
┌──────────────────────────────────────────────────────────┐
│  Database Records Created:                               │
│  • customers table: status="pending", referral_code=XXX  │
│  • partner_applications table: status="pending"          │
│  • Auto-generated: referral_code, discount_code          │
└──────┬───────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────┐
│  Email Sent to Admin (jarred@referlabs.com.au)  │
│  Subject: "New referral program applicant"       │
│  Contains: All applicant details + referral link │
└──────────────────────────────────────────────────┘


Step 2: Admin Review & Approval
┌──────────────┐
│    Admin     │  Logs into: referlabs.com.au/dashboard
│   (Jarred)   │  Reviews: Partner Applications section
└──────┬───────┘  Clicks: "Approve" button
       │
       ▼
┌─────────────────────────────────────────────────────────┐
│  API Called: /api/admin/partner-applications/approve    │
│                                                          │
│  Database Updates:                                       │
│  • partner_applications: status="approved"               │
│  • customers: status="verified", credits=25000 ($250)   │
│  • Timestamps: approved_at, approved_by                  │
└──────┬──────────────────────────────────────────────────┘
       │
       ├──────────────────────┬───────────────────────────┐
       │                      │                           │
       ▼                      ▼                           ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  Email to        │  │  Email to Admin  │  │  Portal Access   │
│  Partner         │  │  (Confirmation)  │  │  Activated       │
│                  │  │                  │  │                  │
│  Subject:        │  │  Subject:        │  │  URL:            │
│  "You're Now a   │  │  "Partner        │  │  /r/referral?    │
│  Partner!"       │  │  Approved"       │  │  code=XXX        │
│                  │  │                  │  │                  │
│  Contains:       │  │  Contains:       │  │  Shows:          │
│  • $250 credit   │  │  • Partner name  │  │  • Referrals     │
│  • Referral link │  │  • Ref link      │  │  • Earnings      │
│  • Discount code │  │  • Credit amt    │  │  • Share tools   │
│  • How to start  │  │                  │  │                  │
└──────────────────┘  └──────────────────┘  └──────────────────┘


Step 3: Partner Shares Referral Link
┌──────────────┐
│   Partner    │  Shares: referlabs.com.au/r/[their_code]
│  (Approved)  │  Via: Email, social media, website
└──────┬───────┘  Audience: Their network (agencies, businesses)
       │
       ▼
┌──────────────────────────────────────────────────┐
│  Someone Clicks Partner's Link                   │
│  • Cookie set: ref_ambassador (30-day expiry)    │
│  • Redirects to: /our-referral-program           │
│  • Attribution: Tracked to partner               │
└──────┬───────────────────────────────────────────┘
       │
       ▼
┌──────────────┐
│  New Person  │  Fills out partner application form
│  Applies     │  Submits (cookie still active)
└──────┬───────┘
       │
       ▼
┌─────────────────────────────────────────────────────────┐
│  Database Records Created WITH Attribution:             │
│  • partner_applications table: new application          │
│  • referrals table: attributed to original partner      │
│  • stripe_commissions table: $100 signup bonus          │
│  • referral_events table: signup_submitted event        │
└──────┬──────────────────────────────────────────────────┘
       │
       ├──────────────────────┬─────────────────────────┐
       │                      │                         │
       ▼                      ▼                         ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  Email to Admin  │  │  Partner's       │  │  Commission      │
│                  │  │  Dashboard       │  │  Auto-Approved   │
│  Subject:        │  │  Updated         │  │                  │
│  "New applicant" │  │                  │  │  Amount: $100    │
│                  │  │  Shows:          │  │  Type: Signup    │
│  Contains:       │  │  • +1 referral   │  │  Status: Approved│
│  • "🎯 Referred  │  │  • +$100 earning │  │                  │
│    by Ambassador"│  │  • Attribution   │  │  Partner sees in │
│  • Ref code used │  │    visible       │  │  their portal    │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

---

## 🔄 Flow Diagram: Business Ambassador Program

```
┌─────────────────────────────────────────────────────────────────┐
│              BUSINESS AMBASSADOR PROGRAM FLOW                    │
└─────────────────────────────────────────────────────────────────┘

Step 1: Business Adds Ambassador
┌──────────────┐
│   Business   │  Logs into their dashboard
│     Owner    │  Uses "Quick Add Customer" feature
└──────┬───────┘  Enters: Name, email, phone
       │
       ▼
┌──────────────────────────────────────────────────────────┐
│  Database Record Created:                                │
│  • customers table: business_id=XXX, status="pending"    │
│  • Auto-generated: referral_code, discount_code          │
└──────┬───────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────┐
│  Ambassador appears in Customers table   │
│  Status: "pending" (awaiting approval)   │
│  Shows in: Business owner's dashboard    │
└──────────────────────────────────────────┘


Step 2: Business Approves Ambassador
┌──────────────┐
│   Business   │  Selects ambassador(s) via checkbox
│     Owner    │  Clicks: "Approve Ambassadors" button
└──────┬───────┘  Confirms: Dialog with details
       │
       ▼
┌─────────────────────────────────────────────────────────┐
│  API Called: /api/ambassadors/approve                   │
│                                                          │
│  Database Updates:                                       │
│  • customers: status="verified"                          │
│  • Bulk update for all selected ambassadors             │
└──────┬──────────────────────────────────────────────────┘
       │
       ├──────────────────────┬────────────────────────┐
       │                      │                        │
       ▼                      ▼                        ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  Email to        │  │  Email to        │  │  Ambassador      │
│  Ambassador      │  │  Business Owner  │  │  Portal Active   │
│                  │  │                  │  │                  │
│  Subject:        │  │  Subject:        │  │  URL:            │
│  "Welcome to     │  │  "X Ambassadors  │  │  /r/referral?    │
│  [Business]      │  │  Approved"       │  │  code=XXX        │
│  Ambassador      │  │                  │  │                  │
│  Program!"       │  │  Contains:       │  │  Shows:          │
│                  │  │  • Names list    │  │  • Business info │
│  Contains:       │  │  • Email stats   │  │  • Referrals     │
│  • Business name │  │  • Dashboard link│  │  • Share tools   │
│  • Referral link │  │                  │  │  • Performance   │
│  • Discount code │  │                  │  │                  │
│  • Portal link   │  │                  │  │                  │
│  • How-to guide  │  │                  │  │                  │
│  • Amb tips      │  │                  │  │                  │
└──────────────────┘  └──────────────────┘  └──────────────────┘


Step 3: Ambassador Shares & Refers
┌──────────────┐
│  Ambassador  │  Shares: business's referral link
│  (Approved)  │  Via: Social media, email, word-of-mouth
└──────┬───────┘  Uses: Discount code in conversations
       │
       ▼
┌──────────────────────────────────────────────────┐
│  Customer Clicks Ambassador's Link                │
│  • Cookie set with ambassador attribution        │
│  • Customer fills out business's form/signup     │
│  • Discount code may be entered                  │
└──────┬───────────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────────────────┐
│  Referral Submitted (via form or API)                   │
│  • referrals table: new record with ambassador_id       │
│  • Attribution: Linked to ambassador                    │
│  • Status: "pending" → waiting for completion           │
└──────┬──────────────────────────────────────────────────┘
       │
       ▼
┌──────────────┐
│   Business   │  Reviews referral in dashboard
│     Owner    │  Completes service/sale
└──────┬───────┘  Marks referral as "completed"
       │
       ▼
┌─────────────────────────────────────────────────────────┐
│  Referral Completion Flow:                              │
│  • referrals table: status="completed", revenue tracked │
│  • Commission calculated (based on business rules)      │
│  • Ambassador sees completed referral in portal         │
│  • Business owner sees ROI metrics                      │
└──────────────────────────────────────────────────────────┘
```

---

## 📊 Database Schema Overview

### Key Tables

**businesses**
```
- id (uuid, primary key)
- name
- owner_id (auth.users reference)
- onboarding_metadata (JSONB - tracks notifications sent)
```

**customers**
```
- id (uuid, primary key)
- business_id (references businesses)
- name, email, phone
- referral_code (unique, indexed)
- discount_code (unique)
- status (pending | verified | applicant | inactive)
- credits (integer, in cents)
- company, website, instagram_handle, linkedin_handle
- audience_profile
```

**partner_applications**
```
- id (uuid, primary key)
- business_id (Refer Labs business ID)
- customer_id (references customers)
- name, email, phone, company, website
- instagram_handle, linkedin_handle
- audience_profile, notes
- status (pending | approved | rejected)
- approved_at, approved_by
- source
```

**referrals**
```
- id (uuid, primary key)
- business_id (references businesses)
- ambassador_id (references customers)
- referred_name, referred_email, referred_phone
- status (pending | contacted | qualified | completed | lost)
- revenue (decimal)
- campaign_id (optional)
- metadata (JSONB)
```

**stripe_commissions**
```
- id (uuid, primary key)
- business_id (references businesses)
- ambassador_id (references customers)
- referral_id (references referrals, optional for signup bonuses)
- amount (integer, in cents)
- currency
- commission_type (signup_bonus | revenue_share | tier_bonus)
- status (pending | approved | paid | rejected)
- approved_at, paid_at
```

**referral_events**
```
- id (uuid, primary key)
- business_id (references businesses)
- ambassador_id (references customers)
- event_type (link_visit | signup_submitted | referral_submitted | etc.)
- source (campaign_id, partner_program, etc.)
- device, metadata
- created_at (timestamptz)
```

---

## 🔐 Authentication & Authorization

### Admin Access (jarred@referlabs.com.au)
- Full access to all businesses
- Partner Applications Manager
- Can approve/reject partner applications
- Sees aggregated analytics across platform

### Business Owner Access
- Access to their own business dashboard
- Can add/approve their own ambassadors
- Can view/manage their own referrals
- Can send campaigns to their ambassadors

### Ambassador/Partner Access
- Access to their referral portal
- Can see their own referrals and earnings
- Can access sharing tools
- Can track their performance metrics

---

## 📧 Email Automation System

### Automated Emails

| Email ID | Name | Trigger | Recipient | Template Location |
|----------|------|---------|-----------|-------------------|
| E1 | Partner Application Alert | Partner applies | Admin | `/our-referral-program/page.tsx` line 296 |
| E2 | Partner Approval Welcome | Admin approves partner | Partner applicant | `/api/admin/partner-applications/approve/route.ts` line 110 |
| E3 | Partner Approval Confirmation | Admin approves partner | Admin | `/api/admin/partner-applications/approve/route.ts` line 229 |
| E4 | Ambassador Welcome | Business approves ambassador | Ambassador | `/api/ambassadors/approve/route.ts` line 122 |
| E5 | Ambassador Approval Summary | Business approves ambassadors | Business owner | `/api/ambassadors/approve/route.ts` line 148 |
| E6 | First Referral Received | First referral submitted | Business owner | `/lib/business-notifications.ts` line 117 |
| E7 | First Conversion Captured | First referral completed | Business owner | `/lib/business-notifications.ts` line 166 |
| E8 | Go Live Confirmation | QA complete + conversion | Business owner | `/lib/business-notifications.ts` line 218 |
| E9 | Campaign Delivery Summary | Campaign sent | Business owner | `/lib/business-notifications.ts` line 275 |
| E10 | Integration Health Alert | Integration issue detected | Business owner + admin | `/lib/business-notifications.ts` line 380 |

### Email Service: Resend
- API Key: Configured in environment
- From Email: jarred@referlabs.com.au
- Reply-To: jarred@referlabs.com.au
- Domain: referlabs.com.au (must be verified in Resend)

---

## 🎨 UI Components

### Admin Components
- `PartnerApplicationsManager.tsx` - Full partner application management UI
- Stats cards, filter tabs, approval buttons
- Shows referral performance for approved partners

### Business Dashboard Components
- `CustomersTable.tsx` - Ambassador management with bulk approval
- `QuickAddCustomerForm.tsx` - Fast ambassador onboarding
- `CampaignBuilder.tsx` - Send campaigns to ambassadors
- `ReferralsTable.tsx` - Track referral submissions

### Public/Ambassador Components
- `ReferralSubmissionForm.tsx` - Submit referrals
- `ReferralShareCard.tsx` - Share referral links
- `DiscountCodeCard.tsx` - Display discount codes
- `PartnerApplicationSuccessModal.tsx` - Application confirmation

---

## 🚀 API Endpoints

### Admin Endpoints
```
GET  /api/admin/partner-applications
     - List all partner applications with stats
     - Auth: Admin only

POST /api/admin/partner-applications/approve
     - Approve a partner application
     - Sends welcome emails, adds $250 credit
     - Auth: Admin only
```

### Business Endpoints
```
POST /api/ambassadors/approve
     - Bulk approve ambassadors for a business
     - Sends welcome emails to ambassadors
     - Auth: Business owner

GET  /api/customers/route
     - List customers/ambassadors for business
     - Supports pagination, filtering

POST /api/customers/upload
     - Bulk upload ambassadors via CSV
```

### Referral Endpoints
```
GET  /api/referrals/route
     - List referrals for business or ambassador
     - Supports filtering by status

POST /api/referrals/route
     - Submit a new referral
     - Creates referral record, tracks attribution

POST /api/referrals/[id]/update-status
     - Update referral status (pending → completed)
     - Triggers commission calculation
```

### Public Endpoints
```
GET  /r/[code]
     - Referral link landing page
     - Sets attribution cookie
     - Redirects appropriately

GET  /r/referral?code=XXX
     - Ambassador portal
     - Shows referrals, earnings, share tools
```

---

## 💰 Commission Structure

### Refer Labs Partner Program
```
Signup Bonus: $100 AUD (auto-approved)
- Triggered when: Attributed signup becomes paying customer
- Type: One-time bonus
- Status: Automatically approved

Recurring Revenue: 25% monthly
- Applies to: Lifetime of referred customer
- Calculation: 25% of monthly subscription
- Payout: Monthly, direct deposit or account credit
```

### Business Ambassador Programs
```
Customizable per business:
- Flat fee per referral
- Percentage of sale
- Tiered bonuses
- Credit-based rewards
- Custom structures via metadata
```

---

## 📈 Analytics & Tracking

### Partner/Ambassador Metrics
- Total referrals submitted
- Conversion rate (submitted → completed)
- Total earnings (signup bonuses + commissions)
- Top performing ambassadors
- Referral sources (link, code, campaign)

### Business Metrics
- Ambassador count (pending, active, total)
- Referrals received (by status)
- Revenue attributed to referrals
- ROI on ambassador rewards
- Campaign performance

### Platform Metrics (Admin)
- Total businesses onboarded
- Total active partners
- Platform-wide referral count
- Total commissions paid
- Growth rates, trends

---

## 🔧 Configuration

### Environment Variables (Production - Vercel)
```
NEXT_PUBLIC_SITE_URL=https://referlabs.com.au
NEXT_PUBLIC_SUPABASE_URL=https://[project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=Refer Labs <jarred@referlabs.com.au>
RESEND_REPLY_TO=jarred@referlabs.com.au
PARTNER_PROGRAM_BUSINESS_ID=bd8f6179-8507-4098-95eb-28389a96c8c0
ADMIN_REFERRAL_CODE=Jn9wjbn2kQlO
ADMIN_ALERT_EMAILS=jarred@referlabs.com.au
```

### Feature Flags (in code or DB)
- Email automation enabled/disabled
- Auto-approve signup bonuses (currently: true)
- Commission auto-calculation (based on business settings)
- Cookie attribution window (currently: 30 days)

---

## 🛡️ Security Considerations

### Data Protection
- Row Level Security (RLS) on all Supabase tables
- Admin auth check on sensitive endpoints
- Business owners can only access their own data
- Ambassadors can only see their own referrals

### Input Validation
- Email format validation
- Phone number format validation
- SQL injection prevention (Supabase parameterized queries)
- XSS protection (React escapes by default)

### API Rate Limiting
- Rate limit presets configured
- Client identifier tracking
- Prevents spam submissions

---

## 📱 Mobile Responsiveness

All components are mobile-responsive:
- Gradient headers stack properly
- Tables become scrollable cards
- Forms resize for mobile screens
- Email templates render on mobile email clients

---

## 🎯 Success Criteria for Production Launch

Before going live with real partners:

✅ **Technical**
- All 8 test scenarios pass
- Email delivery rate: 100%
- Attribution accuracy: 100%
- No critical bugs in admin or business dashboards

✅ **Business**
- Partner onboarding flow is clear
- Commission structure is documented
- Legal/terms updated
- Support process defined

✅ **Operational**
- Admin can approve partners in < 2 minutes
- Monitoring/alerts configured
- Backup strategy in place
- Rollback plan ready

---

## 🚀 Growth Strategy Summary

### Phase 1: Proof of Concept (Weeks 1-4)
- 5-10 initial partners
- 10-20 initial businesses
- 50+ total referrals
- Capture testimonials

### Phase 2: Network Effects (Weeks 5-12)
- 50+ active partners
- 100+ businesses
- Content marketing push
- Optimize based on data

### Phase 3: Hyper-Scale (Month 4+)
- Partner-of-partners program
- Industry verticals
- Platform as product
- White-label options

### Target Metrics (Month 6)
- 200 active partners
- 300 businesses
- 2,500 ambassadors
- 2,000 monthly referrals
- $350K monthly revenue

---

**Last Updated**: 2025-12-29
**System Status**: ✅ Production Ready
**Next Action**: Execute tests from QUICK_TEST_GUIDE.md
