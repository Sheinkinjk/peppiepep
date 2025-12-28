# 🚨 URGENT: Fix Partner Approval Database Issue

## Problem
Partner approval fails with error: **"Failed to update application status"**

## Root Cause
The `partner_applications` table is missing two required columns:
- `approved_at` (timestamp)
- `approved_by` (user ID reference)

## Solution: Run This SQL Now

### Step 1: Open Supabase SQL Editor
1. Go to: https://supabase.com/dashboard
2. Select your project
3. Click "SQL Editor" in the left sidebar
4. Click "New query"

### Step 2: Copy and Run This SQL

```sql
-- Add approved_at and approved_by columns if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = 'partner_applications'
        AND column_name = 'approved_at'
    ) THEN
        ALTER TABLE partner_applications ADD COLUMN approved_at timestamptz;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = 'partner_applications'
        AND column_name = 'approved_by'
    ) THEN
        ALTER TABLE partner_applications ADD COLUMN approved_by uuid REFERENCES auth.users(id);
    END IF;
END $$;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_partner_applications_approved_at ON partner_applications(approved_at);
CREATE INDEX IF NOT EXISTS idx_partner_applications_approved_by ON partner_applications(approved_by);
CREATE INDEX IF NOT EXISTS idx_partner_applications_status ON partner_applications(status);

-- Add comments for documentation
COMMENT ON COLUMN partner_applications.approved_at IS 'Timestamp when the application was approved or rejected';
COMMENT ON COLUMN partner_applications.approved_by IS 'User ID of the admin who approved or rejected the application';

-- Verify columns were added
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
AND table_name = 'partner_applications'
AND column_name IN ('approved_at', 'approved_by')
ORDER BY ordinal_position;
```

### Step 3: Verify Success
After running the SQL, you should see output like:

```
column_name  | data_type                | is_nullable
-------------+--------------------------+-------------
approved_at  | timestamp with time zone | YES
approved_by  | uuid                     | YES
```

### Step 4: Test Partner Approval
1. Go to: https://referlabs.com.au/dashboard
2. Login as: jarred@referlabs.com.au
3. Scroll to "Partner Applications" section
4. Click "Approve" on a pending application
5. Should work without errors now! ✅

---

## What Changed in the Code (Already Deployed)

### 1. ✅ Removed $250 Credit
- No more account credits given to partners
- 100% focus on 25% recurring revenue model

### 2. ✅ Updated Email Templates
**Before**:
> "Welcome Bonus Applied - $250 Account Credit"

**After**:
> "25% Recurring Revenue - Earn 25% of every payment from businesses you refer, for the lifetime of their subscription"

### 3. ✅ Updated Approval Dialog
**Before**:
> "Approve this partner application? They will receive their referral link and $250 credit."

**After**:
> "Approve this partner application? They will earn 25% recurring revenue for every client they refer."

### 4. ✅ Added Reject Button
- New "Reject" button next to "Approve" button
- Red color with X icon
- Confirmation dialog before rejecting
- Updates status to "rejected" in database

### 5. ✅ New API Endpoint
- `/api/admin/partner-applications/reject` (POST)
- Handles rejection logic
- Tracks who rejected and when

---

## Partner Commission Structure (Final)

### What Partners Earn

**25% Recurring Revenue**
- Applies to ALL revenue from referred businesses
- Calculated on monthly subscription payments
- Paid for the lifetime of each referred customer
- No time limit or cap on earnings

**Example**:
```
Business subscribes at $500/month
Partner earns: $500 × 25% = $125/month
Year 1: $125 × 12 = $1,500
Year 2: $125 × 12 = $1,500
Year 3: $125 × 12 = $1,500
Total (3 years): $4,500

If partner refers 10 businesses:
Monthly income: 10 × $125 = $1,250/month
Annual income: $15,000/year
```

### What Partners DON'T Earn
❌ No signup bonus
❌ No account credits
❌ No one-time payments

### How Commission is Tracked
1. Business signs up via partner's referral link
2. Business subscribes to Refer Labs plan
3. Each monthly payment triggers commission calculation
4. 25% of payment amount added to `stripe_commissions` table
5. Partner sees earnings in their dashboard
6. Monthly payout on 5th of each month

---

## Testing Checklist

After running the SQL migration:

- [ ] Approve 1 partner application
- [ ] Verify success message: "Partner approved! Approval email sent with 25% recurring revenue details."
- [ ] Check partner's email inbox
  - [ ] Subject: "🎉 You're Now a Refer Labs Partner!"
  - [ ] Contains: Large "25%" display
  - [ ] Contains: "Earn 25% of every payment from businesses you refer"
  - [ ] Does NOT contain: "$250 credit" or "account credit"
- [ ] Check your email inbox (jarred@referlabs.com.au)
  - [ ] Subject: "✅ Partner Approved: [Name]"
  - [ ] Contains: "Commission: 25% recurring revenue on all referrals"
  - [ ] Does NOT contain: "$250 credit"
- [ ] Test reject functionality
  - [ ] Click "Reject" button
  - [ ] Confirm rejection dialog
  - [ ] Verify status changes to "rejected"
- [ ] Verify database updates
  - [ ] Open Supabase > Table Editor > partner_applications
  - [ ] Find approved application
  - [ ] Check: status = "approved"
  - [ ] Check: approved_at has timestamp
  - [ ] Check: approved_by has your user ID

---

## If You Still Get Errors

### Error: "Failed to update application status"
**Solution**: The SQL migration didn't run. Go back to Step 2 and run the SQL again.

### Error: Column "approved_at" does not exist
**Solution**: Run the SQL migration in Supabase SQL Editor (Step 2).

### Error: "Unauthorized - Admin access required"
**Solution**: Make sure you're logged in as jarred@referlabs.com.au (the admin account).

### Emails not sending
**Check**:
1. Vercel environment variables include RESEND_API_KEY
2. RESEND_FROM_EMAIL is set to jarred@referlabs.com.au
3. Domain is verified in Resend dashboard

### Partner sees "$250 credit" in old emails
**Note**: Emails already sent can't be changed. Only NEW approvals will have the updated template.

---

## Summary

1. ✅ Run the SQL migration (5 minutes)
2. ✅ Test partner approval (works now!)
3. ✅ Partner program is 25% recurring revenue only
4. ✅ No more $250 credits
5. ✅ Reject functionality added
6. ✅ All changes deployed to production

**Next Steps**:
- Run the SQL migration
- Approve your 7 pending partner applications
- Start testing the complete referral flow
- Monitor first real partner referrals

---

**Created**: 2025-12-29
**Deployment**: commit `2ecaa15`
**Status**: 🚨 Requires SQL migration before approvals work
