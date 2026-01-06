# Dashboard Streamlining Plan: Centralize Attribution & Rewards in Section 5

**Date:** 2026-01-06
**Status:** Implementation Ready
**Goal:** Make Section 5 (Measure ROI) the single source of truth for attribution, performance, and rewards

---

## Problem Statement

### Current Issues

1. **User Confusion in Section 2 (Manage Ambassadors)**
   - Credits column shows balances but no context
   - "Adjust Credits" button exists but users don't understand when/why to use it
   - No connection between credits and actual referral performance
   - Credits feel like an isolated feature, not part of the attribution system

2. **Incomplete ROI Picture in Section 5**
   - Shows revenue and conversions
   - Tracks all attribution events (16 types including non-monetary)
   - **Missing**: Reward costs (credits issued to ambassadors)
   - **Missing**: True ROI calculation including reward expenses
   - **Missing**: Ambassador performance vs. rewards earned

3. **Disconnected Systems**
   - Credit adjustments in Section 2 don't trigger attribution events
   - Automated credit awards (from `completeReferralAttribution`) don't show in analytics
   - No visibility into credit ledger audit trail
   - Manual vs. automated credits are indistinguishable

---

## Solution Overview

### Phase 1: Add "Ambassador Rewards" Tab to Section 5 ✅

**New Tab:** `rewards` (4th tab after referrals, journey, analytics)

**Content:**
1. **Rewards Summary Card**
   - Total credits issued (all-time and windowed)
   - Total credits redeemed/spent
   - Outstanding credit liability
   - Average reward per conversion

2. **Ambassador Rewards Table**
   - Ambassador name + referral code
   - Total conversions delivered
   - Total credits earned (from attribution)
   - Manual adjustments (if any)
   - Last reward date
   - Status (active/inactive)
   - Sort by: Most credits, Most conversions, Recent activity

3. **Credit Ledger Timeline**
   - Chronological list of all credit events
   - Entry types: Issued (auto), Spent, Expired, Adjustment (manual)
   - Source attribution: Which referral triggered the credit
   - Transaction value that generated the credit
   - Admin notes for manual adjustments

4. **Quick Actions**
   - "Adjust Credits" button (moves from Section 2)
   - "Export Credit Report" CSV
   - Filter by ambassador, date range, entry type

### Phase 2: Enhance ROI Calculation ✅

**Current ROI Formula:**
```
ROI = Revenue ÷ Campaign Spend
Where Campaign Spend = (SMS count × $0.02) + (Email count × $0.01)
```

**New True ROI Formula:**
```
Total Program Cost = Campaign Spend + Credits Issued
True ROI = (Revenue - Total Program Cost) ÷ Total Program Cost
ROI Multiple = Revenue ÷ Total Program Cost
```

**New Metrics:**
- **Cost per Acquisition (CPA)**: Total Program Cost ÷ Completed Conversions
- **Customer Lifetime Value to CAC Ratio**: Avg Transaction Value ÷ CPA
- **Reward Efficiency**: Revenue Generated per Dollar of Rewards Issued

### Phase 3: Simplify Section 2 ✅

**Remove from CustomersTable:**
- Credits column (visual noise)
- Sort by credits options

**Keep in Section 2:**
- "Adjust Credits" action button (for quick admin access)
- Link to Section 5 Rewards tab: "View reward analytics →"

**Add Tooltip:**
- On "Adjust Credits" button: "Manually adjust ambassador credits. View full reward history in Analytics (Step 5)."

### Phase 4: Credit Ledger Integration ✅

**New Database Queries:**
```sql
-- Fetch credit ledger for business
SELECT
  cl.*,
  c.name as ambassador_name,
  c.referral_code,
  r.transaction_value,
  r.referred_name
FROM credit_ledger cl
LEFT JOIN customers c ON cl.customer_id = c.id
LEFT JOIN referrals r ON cl.referral_id = r.id
WHERE cl.business_id = ?
ORDER BY cl.created_at DESC

-- Calculate windowed reward costs
SELECT
  SUM(delta) FILTER (WHERE entry_type = 'issued') as total_issued,
  SUM(delta) FILTER (WHERE entry_type = 'spent') as total_spent,
  COUNT(*) FILTER (WHERE entry_type = 'adjustment') as manual_adjustments
FROM credit_ledger
WHERE business_id = ?
  AND created_at >= (NOW() - INTERVAL '30 days')
```

**Link Events to Credits:**
- When `payout_released` event is logged, also log to `credit_ledger` with `entry_type='issued'`
- Include `referral_id` and `source` for attribution
- Store transaction_value in metadata for context

---

## Implementation Steps

### Step 1: Create Rewards Tab Component ✅

**File:** Keep inline in `dashboard/page.tsx` (or extract if >200 lines)

**Key Features:**
- Server-side data fetching for credit_ledger
- Real-time credit balance calculations
- Attribution linking (credit → referral → ambassador)
- Export functionality

### Step 2: Update ROI Calculations ✅

**Files to Modify:**
- `/src/app/dashboard/page.tsx` (lines 1258-1306 for trend calculations)
- Add credit ledger queries to windowed metrics
- Update ROI formula to include reward costs

### Step 3: Modify CustomersTable ✅

**File:** `/src/components/CustomersTable.tsx`

**Changes:**
- Remove credits column from table
- Keep "Adjust Credits" button with updated tooltip
- Add info icon linking to Section 5 Rewards tab

### Step 4: Link Credit Adjustments to Events ✅

**File:** `/src/app/dashboard/page.tsx` (adjustCustomerCredits function)

**Add:**
```typescript
// After credit update, log to credit_ledger
await supabase.from('credit_ledger').insert({
  business_id: businessId,
  customer_id: customerId,
  delta: creditDelta,
  entry_type: creditDelta > 0 ? 'issued' : 'adjustment',
  source: 'manual_adjustment',
  note: formData.get('note') || null
});
```

### Step 5: Enhance Attribution Event Logging ✅

**File:** `/src/lib/referral-revenue.ts` (completeReferralAttribution function)

**Add credit ledger entry when releasing payouts:**
```typescript
// After incrementing customer.credits
await supabase.from('credit_ledger').insert({
  business_id,
  customer_id: ambassadorId,
  referral_id: referralId,
  delta: rewardAmount,
  entry_type: 'issued',
  source: 'referral_completion',
  note: `Reward for referring ${referral.referred_name}`
});
```

---

## Testing Plan

### Test 1: Credit Ledger Audit Trail ✅
1. Complete a referral (triggers automated credit award)
2. Verify credit_ledger entry created with entry_type='issued'
3. Verify referral_id linked correctly
4. Check Rewards tab shows the credit with attribution

### Test 2: Manual Credit Adjustment ✅
1. Use "Adjust Credits" button in Section 2
2. Add $50 credit with note "Bonus for VIP referral"
3. Verify credit_ledger entry with entry_type='adjustment'
4. Check customer.credits updated correctly
5. Verify Rewards tab shows manual adjustment with note

### Test 3: ROI Calculation Accuracy ✅
1. Set up business with known data:
   - 10 completed referrals at $100 each = $1,000 revenue
   - 5 SMS campaigns at $0.02 each = $0.10 campaign spend
   - Total credits issued = $250 (10 × $25 reward)
2. Expected True ROI = ($1,000 - $250.10) / $250.10 = 2.998x
3. Verify Section 5 Metrics tab shows correct calculation

### Test 4: Ambassador Rewards Table ✅
1. Check table displays all ambassadors with credits > 0
2. Verify sorting by credits (desc/asc)
3. Verify sorting by conversions
4. Test filtering by date range
5. Export CSV and verify data accuracy

### Test 5: Non-Monetary Attribution Events ✅
1. Trigger `schedule_call_clicked` event
2. Trigger `contact_us_clicked` event
3. Trigger `signup_submitted` event (no conversion)
4. Verify all appear in Journey Timeline
5. Verify they DON'T create credit_ledger entries (no conversion yet)
6. Complete the referral manually
7. Verify credit_ledger entry created

### Test 6: Credit Ledger Timeline Display ✅
1. View Rewards tab Credit Ledger section
2. Verify events sorted chronologically (newest first)
3. Check attribution links (click referral ID to see details)
4. Verify manual adjustments show admin notes
5. Test filtering by entry_type (issued/spent/adjustment)

### Test 7: Backward Compatibility ✅
1. Test existing ambassadors with credits (no ledger entries)
2. Verify credits display correctly in Rewards tab
3. Adjust credits manually - creates first ledger entry
4. Verify historical balance preserved

---

## Database Schema Requirements

### Existing Table: `credit_ledger` ✅
```sql
CREATE TABLE credit_ledger (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  referral_id uuid REFERENCES referrals(id) ON DELETE SET NULL,
  delta numeric NOT NULL,
  entry_type text NOT NULL CHECK (entry_type IN ('issued', 'spent', 'expired', 'adjustment')),
  source text,
  note text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX credit_ledger_business_id_idx ON credit_ledger(business_id);
CREATE INDEX credit_ledger_customer_id_idx ON credit_ledger(customer_id);
CREATE INDEX credit_ledger_entry_type_idx ON credit_ledger(entry_type);
CREATE INDEX credit_ledger_created_at_idx ON credit_ledger(created_at DESC);
```

**Already exists:** ✅ (Migration file: `20250324000000_credit_ledger.sql`)

---

## UI/UX Improvements

### Section 5: New Rewards Tab ✅

**Header:**
```
💰 Ambassador Rewards
Track credits issued, program costs, and reward performance
```

**Cards:**
1. **Total Credits Issued** (emerald card)
   - Large number: $2,450
   - Subtitle: "From 98 completed referrals"
   - Trend: +12% vs last period

2. **Outstanding Credits** (amber card)
   - Large number: $1,230
   - Subtitle: "Across 15 active ambassadors"
   - Info: "Credits ambassadors can redeem"

3. **Credits Spent** (slate card)
   - Large number: $1,220
   - Subtitle: "Redeemed by ambassadors"
   - Trend: Based on redemption rate

4. **Avg Reward per Conversion** (blue card)
   - Large number: $25.00
   - Subtitle: "Based on reward settings"
   - Info: Link to Step 1 to adjust

**Ambassador Rewards Table Columns:**
- Ambassador Name
- Referral Code
- Total Conversions
- Credits Earned
- Manual Adjustments
- Last Reward
- Actions: Adjust Credits, View Details

**Credit Ledger Timeline:**
- Event icon (+ for issued, - for spent, ⚙️ for adjustment)
- Amount with color coding (green/red/gray)
- Ambassador name + referral code
- Attribution: "From referral: [Name]" (linked)
- Timestamp (relative: "2 hours ago")
- Admin note (if manual adjustment)

### Section 2: Simplified Customer Table ✅

**Remove:**
- Credits column

**Keep:**
- "Adjust Credits" button in Actions column
- Tooltip: "Manually adjust credits. View full analytics in Step 5 → Rewards."

**Add:**
- Info banner above table:
  ```
  💡 View ambassador reward analytics, credit history, and program costs in Step 5 → Rewards tab
  ```

---

## Success Metrics

### User Experience ✅
- [ ] Users understand what credits are and why they matter
- [ ] Clear connection between conversions → credits → ROI
- [ ] One place (Section 5) for all performance data
- [ ] Reduced confusion about "Adjust Credits" purpose

### Data Integrity ✅
- [ ] All credit changes logged to credit_ledger
- [ ] Attribution preserved (credit → referral → ambassador)
- [ ] Audit trail for compliance/accounting
- [ ] Historical data preserved

### Analytics Quality ✅
- [ ] True ROI includes reward costs
- [ ] Ambassador performance visible with reward context
- [ ] Non-monetary events properly tracked
- [ ] Comprehensive export capabilities

---

## Timeline

1. **Database Setup** (if needed): 0 min (already exists)
2. **Backend Changes**: 20 min
   - Update `adjustCustomerCredits` to log to ledger
   - Update `completeReferralAttribution` to log to ledger
   - Add credit ledger queries to dashboard
3. **Frontend Changes**: 40 min
   - Add Rewards tab to Section 5
   - Build Ambassador Rewards Table component
   - Build Credit Ledger Timeline component
   - Update ROI calculations
   - Simplify Section 2 CustomersTable
4. **Testing**: 30 min
   - Test all 7 test scenarios
   - Verify backward compatibility
   - Check exports
5. **Deployment**: 5 min
   - Build and deploy
   - Monitor for errors

**Total Estimated Time:** 95 minutes

---

## Rollback Plan

If issues arise:
1. Revert dashboard/page.tsx changes
2. Revert CustomersTable.tsx changes
3. Keep credit_ledger table (no harm, just unused)
4. Users revert to old Section 2 credits view

---

## Next Steps

1. ✅ Review and approve this plan
2. ⏳ Implement backend credit ledger integration
3. ⏳ Build Rewards tab UI
4. ⏳ Update ROI calculations
5. ⏳ Simplify Section 2
6. ⏳ Test end-to-end
7. ⏳ Deploy to production
8. ⏳ Monitor user feedback

---

**Approval:** Pending
**Implementation Start:** Ready to begin
