# Manual Payout Workflow Guide

**Date:** 2026-01-06
**Status:** Production Ready
**Purpose:** Guide for manually paying ambassadors and recording payouts in the dashboard

---

## Overview

When ambassadors earn credits through successful referrals, those credits represent money owed to them. This guide explains how to manually pay ambassadors (via bank transfer, PayPal, etc.) and properly record the payout in the system.

---

## Understanding the Credit System

### Credit Flow:
1. **Ambassador refers customer** → Referral created with status="pending"
2. **Admin marks referral complete** → Credits issued to ambassador
3. **Credits accumulate** → Shown in Step 5 → Rewards tab
4. **Ambassador requests payout** → Admin pays manually outside platform
5. **Admin records payout** → Credits deducted, ledger updated

### Tables Involved:
- `customers.credits` - Current credit balance for each ambassador
- `credit_ledger` - Complete audit trail of all credit transactions
- `referral_events` - Timeline of all attribution events

---

## How Credits Are Issued (Automated)

When you mark a referral as "completed" in the dashboard:

1. **Referral Status Updated**: `referrals.status` → "completed"
2. **Transaction Value Recorded**: `referrals.transaction_value` set
3. **Credits Awarded**: `customers.credits` increased by `reward_amount`
4. **Ledger Entry Created**:
   ```
   entry_type: "issued"
   source: "referral_reward"
   delta: +$25 (or your reward_amount)
   referral_id: [linked to specific referral]
   note: "Reward for successful referral"
   ```
5. **Event Logged**: `referral_events.event_type` → "payout_released"
6. **Ambassador Notified**: Email sent with credit amount

This is **fully automated** by the `completeReferralAttribution()` function.

---

## How to Pay Ambassadors Manually

### Option 1: Use the Programmatic API (Recommended)

Use the `recordManualPayout()` function from `/src/lib/credits-ledger.ts`:

```typescript
import { createServerComponentClient } from "@/lib/supabase-server";
import { recordManualPayout } from "@/lib/credits-ledger";

const supabase = await createServerComponentClient();

const result = await recordManualPayout(supabase, {
  businessId: "uuid-of-business",
  customerId: "uuid-of-ambassador",
  amount: 50.00, // Amount to pay out
  paymentMethod: "Bank Transfer", // or "PayPal", "Cash", etc.
  note: "December 2025 payout via Commonwealth Bank", // Optional
});

if (result.success) {
  console.log(`Payout successful. New balance: $${result.newBalance}`);
} else {
  console.error(`Payout failed: ${result.error}`);
}
```

**What This Does:**
1. Validates ambassador has sufficient balance
2. Deducts amount from `customers.credits`
3. Creates ledger entry with `entry_type: "spent"`
4. Returns new balance or error message

---

### Option 2: Manual Database Update (For Emergencies)

If you need to manually update via SQL:

```sql
-- 1. Check current balance
SELECT id, name, credits FROM customers WHERE email = 'ambassador@example.com';

-- 2. Deduct payout amount
UPDATE customers
SET credits = credits - 50.00
WHERE id = 'uuid-of-ambassador';

-- 3. Log to credit ledger
INSERT INTO credit_ledger (
  business_id,
  customer_id,
  referral_id,
  delta,
  entry_type,
  source,
  note
) VALUES (
  'uuid-of-business',
  'uuid-of-ambassador',
  NULL, -- Manual payouts don't link to specific referrals
  -50.00, -- Negative delta for spent credits
  'spent',
  'manual_payout_bank_transfer',
  'December 2025 payout via Commonwealth Bank'
);
```

**⚠️ Important:** Always log to `credit_ledger` when updating credits manually. This preserves the audit trail.

---

## Viewing Payout History in Dashboard

### For Admins:

1. Navigate to **Step 5: Measure ROI**
2. Click **Rewards** tab
3. View **Credit History Timeline**

Each payout will appear as:
```
📤 -$50.00 | Ambassador Name
   Source: manual_payout_bank_transfer
   Note: December 2025 payout via Commonwealth Bank
   2 hours ago
```

### For Ambassadors:

Currently, ambassadors see their current credit balance in the portal but not detailed transaction history. This is a future enhancement.

---

## Credit Ledger Entry Types

| Type | Delta | Use Case | Example |
|------|-------|----------|---------|
| `issued` | Positive | Automatic reward for completed referral | +$25 for referral completion |
| `spent` | Negative | Manual payout to ambassador | -$50 via bank transfer |
| `adjustment` | Positive or Negative | Admin correction (bonus/penalty) | +$10 bonus for VIP referral |
| `expired` | Negative | Credits expired (not yet implemented) | -$5 from 2024 credits |

---

## Payout Reconciliation

### Monthly Reconciliation Report

Run this query to reconcile payouts:

```sql
-- Credits issued vs. spent in the last month
SELECT
  SUM(delta) FILTER (WHERE entry_type = 'issued') as total_issued,
  SUM(ABS(delta)) FILTER (WHERE entry_type = 'spent') as total_paid_out,
  SUM(delta) as net_outstanding
FROM credit_ledger
WHERE business_id = 'your-business-id'
  AND created_at >= NOW() - INTERVAL '30 days';
```

### Ambassador Balance Verification

Verify an ambassador's balance matches the ledger:

```sql
-- Check if customer.credits matches ledger sum
WITH ledger_sum AS (
  SELECT
    customer_id,
    SUM(delta) as calculated_balance
  FROM credit_ledger
  WHERE business_id = 'your-business-id'
  GROUP BY customer_id
)
SELECT
  c.id,
  c.name,
  c.credits as displayed_balance,
  COALESCE(l.calculated_balance, 0) as ledger_balance,
  c.credits - COALESCE(l.calculated_balance, 0) as discrepancy
FROM customers c
LEFT JOIN ledger_sum l ON c.id = l.customer_id
WHERE c.business_id = 'your-business-id'
  AND ABS(c.credits - COALESCE(l.calculated_balance, 0)) > 0.01; -- More than 1 cent difference
```

If discrepancies exist, use `entry_type: 'adjustment'` to correct them.

---

## Best Practices

### 1. **Always Use `recordManualPayout()`**
- Ensures balance validation
- Prevents negative balances
- Maintains audit trail automatically

### 2. **Include Detailed Notes**
```typescript
note: "December 2025 payout. Bank: Commonwealth. Ref: TXN123456. Paid 2025-12-15"
```

### 3. **Payment Method Naming Convention**
Use consistent names:
- `Bank Transfer`
- `PayPal`
- `Stripe Transfer`
- `Cash`
- `Check`

### 4. **Batch Payouts**
For multiple ambassadors:
```typescript
const ambassadors = [
  { customerId: "uuid-1", amount: 50 },
  { customerId: "uuid-2", amount: 75 },
];

for (const { customerId, amount } of ambassadors) {
  await recordManualPayout(supabase, {
    businessId,
    customerId,
    amount,
    paymentMethod: "Bank Transfer",
    note: `December 2025 batch payout`,
  });
}
```

### 5. **Notify Ambassadors**
After payout, send confirmation email:
```typescript
await sendTransactionalEmail({
  to: ambassador.email,
  subject: "Your payout has been processed",
  html: `
    <p>Hi ${ambassador.name},</p>
    <p>Your payout of $${amount} has been processed via ${paymentMethod}.</p>
    <p>Your new credit balance is $${newBalance}.</p>
  `,
});
```

---

## Common Scenarios

### Scenario 1: Ambassador Requests Payout

**Steps:**
1. Ambassador emails: "I have $150 credits, please pay me"
2. Verify balance in dashboard (Step 5 → Rewards tab)
3. Process payment via your preferred method (bank, PayPal)
4. Record payout using `recordManualPayout()`
5. Confirm with ambassador via email

### Scenario 2: Accidental Double Credit

**Problem:** Referral marked complete twice, credits issued twice

**Solution:**
```typescript
// Deduct the duplicate amount
await recordManualPayout(supabase, {
  businessId,
  customerId: ambassadorId,
  amount: duplicateAmount,
  paymentMethod: "Adjustment",
  note: "Correction: Duplicate credit from referral XYZ",
});
```

Or use `adjustCustomerCredits` with negative delta.

### Scenario 3: Bonus Credit for Exceptional Performance

**Use `adjustCustomerCredits` instead of `recordManualPayout`:**
```typescript
await adjustCustomerCredits(formData); // From dashboard
// Creates entry_type: "adjustment" with positive delta
```

---

## Troubleshooting

### Problem: "Insufficient balance" error

**Cause:** Ambassador's current balance is less than payout amount

**Solution:**
```typescript
// Check current balance first
const { data } = await supabase
  .from("customers")
  .select("credits")
  .eq("id", customerId)
  .single();

console.log(`Current balance: $${data.credits}`);
```

### Problem: Payout recorded but payment failed

**Cause:** Bank transfer was rejected after recording in system

**Solution:** Reverse the payout
```typescript
// Re-credit the ambassador
import { tryInsertCreditLedgerEntry } from "@/lib/credits-ledger";

await tryInsertCreditLedgerEntry(supabase, {
  businessId,
  customerId,
  referralId: null,
  delta: amount, // Positive to reverse the deduction
  type: "adjustment",
  source: "payout_reversal",
  note: "Reversal: Bank transfer failed, re-crediting ambassador",
});

// Manually update customer.credits
await supabase
  .from("customers")
  .update({ credits: originalBalance })
  .eq("id", customerId);
```

### Problem: Credit ledger and customer balance don't match

**Cause:** Manual SQL update bypassed ledger logging

**Solution:** Create adjustment entry to sync
```typescript
const discrepancy = displayedBalance - ledgerSum;

await tryInsertCreditLedgerEntry(supabase, {
  businessId,
  customerId,
  referralId: null,
  delta: discrepancy,
  type: "adjustment",
  source: "reconciliation",
  note: `Reconciliation adjustment to sync ledger with displayed balance`,
});
```

---

## Security Considerations

### Row-Level Security (RLS)

The `credit_ledger` table has RLS policies:

```sql
-- Only business owners can view their credit ledger
CREATE POLICY "Owners can select credit ledger"
  ON credit_ledger FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM businesses b
      WHERE b.id = business_id AND b.owner_id = auth.uid()
    )
  );

-- Only business owners can insert ledger entries
CREATE POLICY "Owners can insert credit ledger"
  ON credit_ledger FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM businesses b
      WHERE b.id = business_id AND b.owner_id = auth.uid()
    )
  );
```

**This means:** Only authenticated business owners can record payouts for their own ambassadors.

### Preventing Fraud

- ✅ **Idempotency**: `completeReferralAttribution()` checks if referral already completed
- ✅ **Balance Validation**: `recordManualPayout()` prevents negative balances
- ✅ **Audit Trail**: Every credit movement logged to `credit_ledger`
- ⚠️ **No User Attribution**: Ledger doesn't track *who* performed the action (future enhancement)

---

## Future Enhancements

### Planned Features:

1. **Automated Payout Scheduling**
   - Monthly/weekly auto-payouts via Stripe Connect
   - Ambassadors opt-in to auto-payout threshold ($100 minimum)

2. **Payout Requests**
   - Ambassadors request payout via portal
   - Admin approves/rejects via dashboard

3. **Multi-Currency Support**
   - Store credits in USD, pay out in AUD/EUR/GBP
   - Exchange rate tracking

4. **Accounting Integration**
   - Export credit ledger to Xero/QuickBooks
   - Automated tax reporting (1099/W9 generation)

5. **Ambassador Payout History**
   - Ambassadors see full transaction history in portal
   - Download PDF statements

---

## API Reference

### `recordManualPayout()`

**File:** `/src/lib/credits-ledger.ts`

**Signature:**
```typescript
async function recordManualPayout(
  supabase: SupabaseClient<Database>,
  params: {
    businessId: string;
    customerId: string;
    amount: number;
    paymentMethod: string;
    note?: string;
  }
): Promise<{ success: boolean; error?: string; newBalance?: number }>
```

**Parameters:**
- `businessId` (string): UUID of the business
- `customerId` (string): UUID of the ambassador
- `amount` (number): Positive dollar amount to pay out
- `paymentMethod` (string): How payment was made (e.g., "Bank Transfer")
- `note` (string, optional): Additional details for audit trail

**Returns:**
- `success` (boolean): Whether payout succeeded
- `error` (string, optional): Error message if failed
- `newBalance` (number, optional): Ambassador's new credit balance after payout

**Example:**
```typescript
const result = await recordManualPayout(supabase, {
  businessId: "550e8400-e29b-41d4-a716-446655440000",
  customerId: "660e8400-e29b-41d4-a716-446655440000",
  amount: 100.00,
  paymentMethod: "PayPal",
  note: "December 2025 payout to jane@example.com",
});

if (result.success) {
  console.log(`Paid $100. New balance: $${result.newBalance}`);
} else {
  console.error(result.error);
}
```

---

## Testing Manual Payouts

### Test Scenario 1: Successful Payout

```typescript
// Setup: Ambassador has $150 credits
const result = await recordManualPayout(supabase, {
  businessId: testBusinessId,
  customerId: testCustomerId,
  amount: 50,
  paymentMethod: "Test Payment",
  note: "Test payout",
});

// Expected: success: true, newBalance: 100
```

### Test Scenario 2: Insufficient Balance

```typescript
// Setup: Ambassador has $25 credits
const result = await recordManualPayout(supabase, {
  businessId: testBusinessId,
  customerId: testCustomerId,
  amount: 50, // More than balance
  paymentMethod: "Test Payment",
});

// Expected: success: false, error: "Insufficient balance..."
```

### Test Scenario 3: Ledger Validation

```typescript
// After payout, verify ledger entry exists
const { data: ledgerEntries } = await supabase
  .from("credit_ledger")
  .select("*")
  .eq("customer_id", testCustomerId)
  .eq("entry_type", "spent")
  .order("created_at", { ascending: false })
  .limit(1);

// Expected: entry with delta: -50, source: "manual_payout_test_payment"
```

---

## Contact & Support

For questions about manual payouts:
- **Technical Issues**: Check `/src/lib/credits-ledger.ts` source code
- **Business Logic**: Review this document
- **Database Issues**: Check Supabase logs and RLS policies

---

**Document Version:** 1.0
**Last Updated:** 2026-01-06
**Next Review:** 2026-02-06
