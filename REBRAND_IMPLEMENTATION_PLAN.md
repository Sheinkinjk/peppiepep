# Rebrand Implementation Plan: Partner Ecosystem Strategy

## New Value Proposition
**FROM:** "Turn your customers into ambassadors"
**TO:** "Turn partners, clients, creators, and advisors into a fully tracked and rewarded referral channel"

---

## Strategic Rationale

### Why This Pivot Matters
1. **Broader Addressable Market**: Not just B2C businesses with "customers" - now includes B2B, agencies, consultants, SaaS
2. **More Accurate Positioning**: Most referrals come from partners/advisors, not just customers
3. **Premium Positioning**: "Referral channel" sounds more strategic than "ambassador program"
4. **Diverse Use Cases**:
   - **Partners**: Channel partners, resellers, affiliates
   - **Clients**: Existing customers who refer (B2B context)
   - **Creators**: Content creators, influencers, thought leaders
   - **Advisors**: Consultants, accountants, lawyers who refer clients

---

## Implementation Phases

### PHASE 1: Core Marketing Pages (Est. 2-3 hours)
**Priority: CRITICAL** - Highest traffic, sets market perception

#### Homepage (`/src/app/page.tsx`)
- [ ] **Hero Section** (Line ~100)
  - Current: "Turn Your Customers Into Your Best Sales Team"
  - New: "Turn Your Network Into a High-Performing Referral Channel"
  - Subheading: "Transform partners, clients, creators, and advisors into tracked and rewarded growth accelerators"

- [ ] **How It Works** (Line ~359)
  - Current: "Your next best customers are already in your existing customers' network"
  - New: "Your next best leads are already in your network of partners, clients, and advisors"

- [ ] **CTA Section** (Line ~391)
  - Current: "start activating the customers you already have"
  - New: "start activating the partners and advisors you already work with"

- [ ] **Social Proof** (Line ~417)
  - Current: "Turn your existing customers into a high-performing sales team"
  - New: "Turn your existing network into a structured referral engine"

#### How It Works Page (`/src/app/how-it-works/page.tsx`)
- [ ] **Page Title** (Line 25)
  - Current: "How Refer Labs turns customers into micro-influencers"
  - New: "How Refer Labs turns your network into a trackable referral channel"

- [ ] **Step 1** (Line 39-42)
  - Current: "Import your customers (activate your micro-influencers)"
  - New: "Import your network (activate your referral partners)"
  - Description: "Upload partners, clients, creators, or advisors. Instantly generate trackable referral links"

- [ ] **Step 2** (Line 140-149)
  - Current: "Customers become ambassadors"
  - New: "Your network becomes active referral partners"
  - Benefits: Update all "customer" references to "referral partner"

#### About Page (`/src/app/about/page.tsx`)
- [ ] **Problem Statement** (Line 37)
  - Current: "Your most loyal customers—the ones who truly love your brand"
  - New: "Your most valuable relationships—partners, clients, and advisors who already vouch for your work"

- [ ] **Value Prop** (Line 48)
  - Current: "turns these passionate customers into a structured growth engine"
  - New: "turns your network of partners, creators, and advisors into a structured, trackable referral channel"

#### FAQ Page (`/src/app/faq/page.tsx`)
- [ ] Update all "ambassador" references to "referral partner"
- [ ] Update "customer list" to "partner network"
- [ ] Line 45: "Campaigns, Ambassadors, Analytics" → "Campaigns, Partners, Analytics"

---

### PHASE 2: Dashboard UI & Core Components (Est. 3-4 hours)
**Priority: HIGH** - Daily user interaction

#### CustomersTable Component (`/src/components/CustomersTable.tsx`)
**Strategy**: Keep database/API as "customers", update ALL user-facing labels

- [ ] **Section Title** (Line 517)
  - `"Ambassador directory"` → `"Partner Directory"`

- [ ] **Count Label** (Line 520)
  - `"ambassador(s) total"` → `"referral partner(s) total"`

- [ ] **Status Legend** (New section added in Phase 1)
  - `"Pending"`, `"Verified"`, `"Active"`, `"Applicant"` - Keep as is (generic enough)

- [ ] **Status Labels** (Lines 606-613 in tooltip, 768-776 in table)
  - `"Ambassador pending"` → `"Partner pending"`
  - `"Verified ambassador"` → `"Verified partner"`
  - `"New applicant"` → Keep as is

- [ ] **Empty State** (Line 709)
  - `"No ambassadors yet"` → `"No referral partners yet"`
  - Description: "Start building your referral network by importing partners, clients, or advisors"

- [ ] **Export Filename** (Line 306)
  - `ambassadors-${date}.csv` → `referral-partners-${date}.csv`

- [ ] **Toast Messages** (Lines 346, 381, etc.)
  - All "ambassador(s)" → "referral partner(s)"

- [ ] **Button Labels** (Line 585)
  - `"Approve Ambassadors"` → `"Approve Partners"`

- [ ] **Dialog Titles** (Lines 1067, 1091)
  - Update all to use "referral partners"

- [ ] **Selection Count** (Line 563)
  - `"${selectedCount} ambassador(s) selected"` → `"${selectedCount} partner(s) selected"`

#### CampaignBuilder Component (`/src/components/CampaignBuilder.tsx`)
- [ ] **Description** (Line 598)
  - `"Segment ambassadors"` → `"Segment your referral network"`

- [ ] **Email Ready Count** (Line 616)
  - `"Ambassadors with verified email"` → `"Partners with verified email"`

- [ ] **Toast Messages** (Line 133)
  - `"Loaded ${rows.length} ambassadors"` → `"Loaded ${rows.length} referral partners"`

- [ ] **Success Messages** (Line 362)
  - Update `recipientsText` to use "referral partner(s)"

- [ ] **Selection Count** (Line 1153)
  - `"${selectedCount} ambassador(s) selected"` → `"${selectedCount} partner(s) selected"`

- [ ] **Load All Button** (Line 1201)
  - `"Load all ambassadors"` → `"Load all partners"`

#### ReferralsTable Component (`/src/components/ReferralsTable.tsx`)
- [ ] **CSV Column Headers** (Line 66)
  - `"Ambassador"` → `"Referral Partner"`
  - `"Ambassador Email"` → `"Partner Email"`

- [ ] **Table Column Header** (Line 479)
  - `"Ambassador"` → `"Referral Partner"`

#### Step2Content (`/src/components/dashboard/steps/Step2Content.tsx`)
- [ ] **Card Heading** (Line 115)
  - `"Import Customers"` → `"Import Your Network"`
  - Description: "Upload partners, clients, creators, or advisors. Generate unique referral links instantly."

- [ ] **Active Count** (Line 126)
  - `"Active ambassadors:"` → `"Active partners:"`

- [ ] **Partner Applications** (Line 149)
  - `"customer/ambassador"` → `"referral partner"`

#### Step3Content (`/src/components/dashboard/steps/Step3Content.tsx`)
- [ ] **Integration Guide** (Line 116)
  - `"Export ambassador data"` → `"Export partner data"`

#### QuickAddCustomerForm (`/src/components/QuickAddCustomerForm.tsx`)
- [ ] **Form Label** (Line 103)
  - `"Quick Add Customer"` → `"Quick Add Partner"`

- [ ] **Success Toast** (Line 63)
  - Keep variable name `customerName`, but context is clear from new value prop

- [ ] **Button Label** (Line 133)
  - `"Add Customer"` → `"Add Partner"`

- [ ] **Description** (Line 138)
  - Update to reference "referral link"

#### DashboardOnboardingChecklist (`/src/components/DashboardOnboardingChecklist.tsx`)
- [ ] **Step Labels** (Lines 101, 111)
  - `"Import your clients list"` → `"Import your network"`
  - `"Upload a CSV or add a few ambassadors manually"` → `"Upload a CSV or add partners manually"`

- [ ] **Active Count** - Already says "Ambassador base is ready" - update to "Partner network is ready"

#### RoiSummaryCards (`/src/components/dashboard/RoiSummaryCards.tsx`)
- [ ] **Active Ambassadors Card** (Line 82-92)
  - `"Active Ambassadors"` → `"Active Partners"`
  - `"Ambassadors with referrals"` → `"Partners with referrals"`

- [ ] **Top Ambassador Spotlight** (Line 106)
  - `"🏆 Top Ambassador"` → `"🏆 Top Referral Partner"`

---

### PHASE 3: Onboarding, Emails & Supporting Content (Est. 2-3 hours)
**Priority: MEDIUM** - Important for user journey

#### Email Templates (`/src/lib/email-notifications.ts`, `/src/lib/campaigns.ts`)
- [ ] Search for all "ambassador" and "customer" references in email bodies
- [ ] Update to contextually appropriate terms:
  - Campaign emails: "referral partner"
  - Notification emails: "partner" or keep "customer" where referring to the company's customer

#### Integration Pages
- [ ] **Klaviyo Page** (`/src/app/klaviyo/page.tsx`)
  - Update "ambassadors" → "referral partners"

- [ ] **Mailchimp Page** (`/src/app/mailchimp/page.tsx`)
  - Update "ambassadors" → "referral partners"

- [ ] **HubSpot, Stripe, etc.**
  - Audit and update consistently

#### Portal Pages
- [ ] **AmbassadorPortalClient** (`/src/components/AmbassadorPortalClient.tsx`)
  - Line 34: `"Your personal ambassador portal"` → `"Your personal referral portal"`
  - Consider renaming file to `PartnerPortalClient.tsx` (breaking change)

#### CSV Upload Component
- [ ] **CSVUploadForm** (`/src/components/CSVUploadForm.tsx`)
  - Update helper text to mention "partners, clients, or advisors"
  - Template download should have updated column headers

---

### PHASE 4: Advanced & Optional Updates (Est. 1-2 hours)
**Priority: LOW** - Internal or low visibility

#### File Renaming (Breaking Changes - Optional)
Consider these renames if time permits:
- `AmbassadorPortalClient.tsx` → `PartnerPortalClient.tsx`
- `QuickAddCustomerForm.tsx` → `QuickAddPartnerForm.tsx`
- `/app/r/ambassador-join/` → `/app/r/partner-join/` (creates new route, keep old for backwards compatibility)

#### Type Aliases
Add to `/src/types/index.ts` or relevant type file:
```typescript
// Type aliases for better semantics without breaking DB schema
export type ReferralPartner = Customer;
export type PartnerNetwork = Customer[];
```

#### Database Considerations
- **DO NOT** rename database tables/columns - keep as "customers" and "ambassadors"
- **DO** add comments in schema documentation explaining semantic meaning

---

## Testing Checklist

After implementation, test these critical flows:

### User-Facing
- [ ] Homepage loads and displays new value prop
- [ ] Dashboard shows "Partner Directory" not "Ambassador Directory"
- [ ] Adding a partner shows "🎉 [Name] is now a referral partner!"
- [ ] Campaign builder says "Partners with verified email"
- [ ] ROI dashboard shows "Active Partners" and "Top Referral Partner"
- [ ] Status legend shows "Partner pending" / "Verified partner"
- [ ] Email campaigns use "referral partner" terminology
- [ ] CSV export filename is `referral-partners-[date].csv`

### Internal Integrity
- [ ] API endpoints still work (`/api/customers`, `/api/ambassadors`)
- [ ] Database queries unaffected
- [ ] Authentication flows unchanged
- [ ] Referral attribution tracking still works
- [ ] Campaign sending works with new labels
- [ ] ROI calculations accurate

### Cross-Browser
- [ ] Test on Chrome, Safari, Firefox
- [ ] Mobile responsive (terminology doesn't break layout)
- [ ] Toast messages display correctly

---

## Rollout Strategy

### Option A: Big Bang (Recommended)
- Deploy all Phase 1 & 2 changes together
- Clearest messaging consistency
- Single deployment event
- Coordinate with marketing announcement

### Option B: Gradual Rollout
- Week 1: Marketing pages (Phase 1)
- Week 2: Dashboard UI (Phase 2)
- Week 3: Emails & onboarding (Phase 3)
- Allows for monitoring user feedback between phases

---

## Communication Plan

### Internal
- [ ] Notify team of terminology changes
- [ ] Update internal documentation
- [ ] Train support team on new messaging

### External
- [ ] Blog post: "Introducing Partner Network Management"
- [ ] Email existing customers explaining the pivot
- [ ] Update help docs and tutorials
- [ ] Social media announcements

### SEO Considerations
- [ ] Update page titles and meta descriptions
- [ ] Add 301 redirects if renaming URL paths
- [ ] Update structured data/schema markup
- [ ] Revise keyword strategy (shift from "customer referrals" to "partner referrals", "referral channel")

---

## Estimated Timeline

| Phase | Scope | Time | Complexity |
|-------|-------|------|------------|
| Phase 1 | Marketing pages | 2-3 hours | Low |
| Phase 2 | Dashboard UI | 3-4 hours | Medium |
| Phase 3 | Emails & onboarding | 2-3 hours | Medium |
| Phase 4 | Optional polish | 1-2 hours | Low |
| **TOTAL** | **Complete rebrand** | **8-12 hours** | **Medium** |

**Testing & QA**: Add 2-3 hours
**Deployment & Monitoring**: Add 1-2 hours

**Total Project Time: 11-17 hours**

---

## Risk Mitigation

### High Risk Items
1. **Breaking Changes**: File renames could break imports
   - **Mitigation**: Do file renames last, test thoroughly

2. **SEO Impact**: Changing core value prop could affect rankings
   - **Mitigation**: Keep meta descriptions optimized, monitor Search Console

3. **User Confusion**: Existing users may be confused by new terminology
   - **Mitigation**: In-app tooltip: "We now use 'partners' to include clients, creators, and advisors"

4. **Email Template Variables**: Changing merge tags could break campaigns
   - **Mitigation**: Test email rendering before deployment

### Medium Risk Items
1. **CSV Export/Import**: Users may have old templates
   - **Mitigation**: Accept both old and new column names in CSV parser

2. **Translation/i18n**: If app is multilingual, all translations need updates
   - **Mitigation**: Audit all locale files

---

## Success Metrics

Track these KPIs post-rebrand:

### Business Metrics
- [ ] New signups from partner-focused segments (B2B, agencies, consultants)
- [ ] Landing page conversion rate (should improve with clearer positioning)
- [ ] User engagement with partner directory vs old "customers" page
- [ ] Support ticket volume (spike expected, should normalize after 1 week)

### Technical Metrics
- [ ] Zero 404 errors from renamed routes
- [ ] All API endpoints functioning
- [ ] Campaign send success rate unchanged
- [ ] Referral attribution accuracy maintained

---

## Reversion Plan

If rollout causes issues:

1. **Marketing Pages**: Can revert via git in <10 minutes
2. **Dashboard**: Revert component changes via git
3. **Database**: No changes needed (terminology only affected UI)
4. **API**: No changes (internal routes unchanged)

**Recovery Time Objective (RTO): 30 minutes**

---

## Next Steps

1. **Review & Approve**: Stakeholder sign-off on plan
2. **Branch Strategy**: Create feature branch `feature/partner-ecosystem-rebrand`
3. **Implementation**: Work through phases 1-3 systematically
4. **QA & Testing**: Full regression test
5. **Deployment**: Coordinate with marketing launch
6. **Monitor**: Watch analytics, support tickets, error logs for 48 hours

---

## Notes

- **Database Schema**: Intentionally NOT changing - "customers" table is internal
- **API Routes**: Intentionally keeping `/api/customers` - it's an internal endpoint
- **Backwards Compatibility**: Old terminology in URLs (like `/r/ambassador-join`) should redirect but not break
- **Component Names**: Prioritize user-facing labels over internal file names
- **Marketing Alignment**: Ensure sales decks, one-pagers, and pitch materials update simultaneously

---

*Document Version: 1.0*
*Last Updated: 2026-01-09*
*Owner: Product Team*
