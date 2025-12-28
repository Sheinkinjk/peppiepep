# Refer Labs Partner Commission Structure

## 💰 Commission Model: 25% Recurring Revenue

### Overview
Partners earn **25% of all revenue generated** through their referral link or discount code for the **lifetime of each referred customer**.

---

## How It Works

### 1. Partner Shares Referral Link
```
Partner's unique link: https://referlabs.com.au/r/[partner_code]
```

When someone clicks this link:
- Attribution cookie set (30-day window)
- Any business signup within 30 days is attributed to the partner

### 2. Business Signs Up & Subscribes
When the referred business:
- Completes onboarding
- Subscribes to a Refer Labs plan ($400-600/month typical)
- Starts paying monthly subscription

### 3. Partner Earns 25% Monthly
**Example calculation**:
```
Business Plan: $500/month
Partner Commission: $500 × 25% = $125/month
Partner Lifetime Value: $125 × 12 months = $1,500/year
If customer stays 3 years: $125 × 36 = $4,500 total
```

### 4. Commission Tracking
All commissions are tracked in the `stripe_commissions` table:
```javascript
{
  ambassador_id: "partner_id",
  referral_id: "referral_id",
  amount: 12500, // $125 in cents
  currency: "aud",
  commission_type: "recurring_revenue",
  status: "approved",
  metadata: {
    subscription_id: "sub_xxx",
    subscription_amount: 50000, // $500 in cents
    commission_percentage: 25,
  }
}
```

---

## Commission Types

### Primary: Recurring Revenue (25%)
- **Trigger**: Monthly subscription payment from referred business
- **Amount**: 25% of monthly subscription fee
- **Duration**: Lifetime of customer (as long as they stay subscribed)
- **Status**: Auto-approved each month
- **Payout**: Monthly via direct deposit or account credit

### Bonus: Signup Incentive ($100)
- **Trigger**: When referred business completes first payment
- **Amount**: $100 AUD one-time bonus
- **Status**: Auto-approved
- **Purpose**: Immediate reward to encourage partner activity
- **Note**: This is in ADDITION to the 25% recurring revenue

---

## Example Scenarios

### Scenario 1: Standard Subscription ($500/month)
```
Month 1: $100 signup bonus + $125 recurring = $225
Month 2: $125 recurring
Month 3: $125 recurring
...continuing monthly

Year 1 Total: $100 + ($125 × 12) = $1,600
Year 2 Total: $125 × 12 = $1,500
Year 3 Total: $125 × 12 = $1,500

3-Year Total: $4,600
```

### Scenario 2: Premium Subscription ($800/month)
```
Month 1: $100 signup bonus + $200 recurring = $300
Month 2: $200 recurring
Month 3: $200 recurring
...continuing monthly

Year 1 Total: $100 + ($200 × 12) = $2,500
Year 2 Total: $200 × 12 = $2,400
Year 3 Total: $200 × 12 = $2,400

3-Year Total: $7,300
```

### Scenario 3: Partner Refers 10 Businesses
```
Assuming average $500/month subscriptions:
Monthly Recurring: 10 × $125 = $1,250/month
Annual Recurring: $1,250 × 12 = $15,000/year
Plus Signup Bonuses: 10 × $100 = $1,000 (one-time)

First Year Total: $16,000
```

---

## Partner Dashboard Visibility

Partners can track their earnings in real-time:

### Portal: https://referlabs.com.au/r/referral?code=[partner_code]

**Shows**:
- Total referrals (pending, active, churned)
- Monthly recurring revenue
- Lifetime earnings
- Upcoming payout amount
- Payment history

---

## Payout Schedule

### Monthly Payouts
- **When**: 5th of each month for previous month's commissions
- **Minimum**: $50 AUD threshold
- **Method**: Direct deposit to bank account OR account credit
- **Currency**: AUD (Australian Dollars)

### Payment Methods

**Option 1: Direct Deposit (Recommended)**
- Partner provides bank details
- Automatic monthly transfer
- 1-3 business days processing

**Option 2: Account Credit**
- Applied to partner's own Refer Labs subscription
- Can be transferred to referred businesses as sign-on bonuses
- Useful for partners who are also Refer Labs customers

---

## Commission Calculation Details

### What Counts as Revenue?
✅ **Included**:
- Monthly subscription fees
- Annual subscription fees (prorated monthly)
- Plan upgrades (new amount going forward)

❌ **Excluded**:
- One-time setup fees
- Refunds or chargebacks
- Credits or discounts applied

### Commission Attribution
Commissions are attributed to partners based on:

1. **Referral Link**: Customer clicked partner's unique link
2. **Discount Code**: Customer used partner's discount code
3. **Cookie Attribution**: Within 30-day cookie window
4. **Manual Attribution**: Admin manually assigns (rare cases)

**Priority**: Referral link > Discount code > Manual attribution

---

## Tracking & Verification

### Database Tables

**stripe_commissions**: All commission records
```sql
SELECT
  ambassador_id,
  SUM(amount) as total_earnings,
  COUNT(*) as total_payments,
  AVG(amount) as avg_commission
FROM stripe_commissions
WHERE status = 'approved'
GROUP BY ambassador_id;
```

**referrals**: Attribution tracking
```sql
SELECT
  ambassador_id,
  COUNT(*) as total_referrals,
  SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as active_referrals
FROM referrals
GROUP BY ambassador_id;
```

---

## Partner Earnings Potential

### Conservative Scenario (5 referrals/year)
```
Average subscription: $500/month
Partner earnings per customer: $125/month

Year 1:
- 5 customers × $125 = $625/month by December
- Total for year: ~$3,750 + $500 bonuses = $4,250

Year 2:
- All 5 retained + 5 new = 10 customers
- 10 × $125 = $1,250/month
- Total for year: $15,000 + $500 bonuses = $15,500

Year 3:
- All 10 retained + 5 new = 15 customers
- 15 × $125 = $1,875/month
- Total for year: $22,500 + $500 bonuses = $23,000
```

### Aggressive Scenario (20 referrals/year)
```
Year 1: ~$15,000
Year 2: ~$60,000
Year 3: ~$120,000
```

### Top Performer (50 referrals/year)
```
Year 1: ~$37,500
Year 2: ~$150,000
Year 3: ~$300,000+
```

---

## Commission Lifecycle

```
┌─────────────────────────────────────────────┐
│   Customer Subscribes via Partner Link      │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│  Stripe Webhook: invoice.payment_succeeded  │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│  Commission Calculation (25% of payment)    │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│  stripe_commissions record created          │
│  - amount: calculated commission            │
│  - status: "approved" (auto-approved)       │
│  - commission_type: "recurring_revenue"     │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│  Partner Dashboard Updates (real-time)      │
│  - Monthly earnings updated                 │
│  - Total lifetime value increased           │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│  Monthly Payout Processing (5th of month)   │
│  - Aggregate all approved commissions       │
│  - Check minimum threshold ($50)            │
│  - Transfer to partner's bank account       │
└─────────────────────────────────────────────┘
```

---

## Important Notes

### 1. Lifetime Revenue
Partners earn for the **entire lifetime** of the customer:
- If customer stays 1 year: 12 months of commissions
- If customer stays 5 years: 60 months of commissions
- No time limit or cap on total earnings

### 2. Churn Handling
If a referred customer cancels:
- Partner stops receiving commissions for that customer
- All previous commissions remain (no clawback)
- Other active referrals continue generating revenue

### 3. Plan Changes
If customer upgrades or downgrades:
- Commission adjusts to 25% of new plan amount
- Effective from next billing cycle
- Partner notified of change

### 4. Transparency
Partners can see:
- Each referred customer (anonymized after privacy period)
- Individual commission per customer
- Payment dates and amounts
- Total pending payout

---

## Getting Started as a Partner

1. **Apply**: https://referlabs.com.au/our-referral-program
2. **Get Approved**: Admin reviews and approves (usually within 24 hours)
3. **Receive Welcome Email**: Contains referral link and discount code
4. **Start Sharing**: Share link with your network
5. **Track Performance**: Monitor dashboard for real-time stats
6. **Get Paid**: Monthly payouts on the 5th of each month

---

## FAQ

**Q: When does the 25% commission start?**
A: From the customer's first payment and continuing every month they remain subscribed.

**Q: What if a customer pauses their subscription?**
A: Commissions pause during the pause period and resume when they reactivate.

**Q: Can I earn commissions on my own subscription?**
A: No, partners cannot earn commissions on their own account.

**Q: Is there a limit to how many businesses I can refer?**
A: No limit! Refer unlimited businesses and earn 25% on all of them.

**Q: What happens if I stop being a partner?**
A: You continue earning on all customers you referred before leaving the program.

**Q: Can I see which specific businesses I referred?**
A: Yes, via your partner dashboard (privacy restrictions apply after certain periods).

**Q: How are disputes handled?**
A: Attribution is automatically tracked. Manual review available for edge cases.

---

**Last Updated**: 2025-12-29
**Commission Rate**: 25% recurring revenue
**Signup Bonus**: $100 AUD
**Payout Schedule**: Monthly (5th of month)
**Currency**: AUD (Australian Dollars)
