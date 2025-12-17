# Dashboard Partner Tracking - Implementation Guide

## ✅ What's Been Added

### New Feature: Partner Referrals Tab

A dedicated tracking system for B2B partner referrals in the dashboard's "Step 4: Track Campaigns" section.

---

## 📊 Features Overview

### 1. **Metrics Dashboard**

Four key performance indicators displayed in cards:

**Total Referrals**
- Count of all partner applications referred
- Icon: Users (blue)

**Active Partners**
- Number of referrals that became paying customers
- Icon: CheckCircle (emerald)
- Status: `completed` in database

**Monthly Commission**
- Calculated as: `Active Partners × $200/mo × 25%`
- Assumes average subscription of $200/month
- Icon: DollarSign (green)

**Conversion Rate**
- Formula: `(Active Partners / Total Referrals) × 100`
- Shows application → customer conversion
- Icon: TrendingUp (purple)

### 2. **Revenue Projection Card**

Prominent gradient card showing:
- **Annual Recurring Revenue**: Monthly × 12
- **Monthly Breakdown**: Individual breakdown
- **Calculation Base**: Clear formula display

Example:
```
💰 Annual Recurring Revenue Projection
$6,000/year

Based on 10 active partners × $200/mo avg × 25% commission
Monthly breakdown: $500/mo
```

### 3. **Partner Referrals Table**

Full-width table showing:

**Columns:**
- Company / Contact
- Email (clickable mailto link)
- Phone (clickable tel link)
- Status (badge with icon)
- Date Applied

**Status Badges:**
- 🟢 **Active** (completed) - Green with CheckCircle
- 🟡 **Pending** - Amber with Clock
- 🔴 **Rejected** - Red with XCircle

### 4. **Empty State**

When no partner referrals exist:
- Building icon
- "No partner referrals yet" message
- Call-to-action button: "Get Your Referral Link"
- Links to `/referral` page

### 5. **Help Section**

Blue informational card explaining:
- 25% commission structure
- Monthly payment schedule
- Lifetime customer value
- Attribution tracking process

---

## 🎯 How It Works

### Attribution Logic

```typescript
// 1. Find admin customer by referral code
const adminReferralCode = process.env.ADMIN_REFERRAL_CODE || "Jn9wjbn2kQlO";
const adminCustomer = customers.find(c => c.referral_code === adminReferralCode);

// 2. Filter all referrals by admin's customer ID
const partnerReferrals = referrals.filter(r => r.ambassador_id === adminCustomer.id);

// 3. Display in Partner Referrals tab
<PartnerReferralsTab referrals={partnerReferrals} />
```

### Commission Calculation

```typescript
// Metrics calculation
const avgSubscription = 200;      // $200/month average
const commissionRate = 0.25;      // 25%
const completed = referrals.filter(r => r.status === 'completed').length;

const monthlyCommission = completed × avgSubscription × commissionRate;
// Example: 10 partners × $200 × 0.25 = $500/month

const annualCommission = monthlyCommission × 12;
// Example: $500 × 12 = $6,000/year
```

---

## 📱 User Experience

### Dashboard Navigation

1. Log into dashboard (`/dashboard`)
2. Navigate to **Step 4: Track Campaigns**
3. Click **"Partner Referrals (X)"** tab
4. View metrics and referral list

### Tab Badge

Shows count when referrals exist:
```
Partner Referrals (5)
```

Hidden when count is 0.

### Responsive Design

- **Mobile**: Single column metrics, stacked cards
- **Tablet**: 2-column metrics grid
- **Desktop**: 4-column metrics grid

---

## 🔧 Technical Details

### Component Location
`/src/components/PartnerReferralsTab.tsx`

### Props Interface
```typescript
interface PartnerReferralsTabProps {
  referrals: PartnerReferral[];
  adminName?: string;  // Defaults to "Admin"
}

interface PartnerReferral {
  id: string;
  referred_name: string | null;
  referred_email: string | null;
  referred_phone: string | null;
  status: string | null;  // 'pending' | 'completed' | 'rejected'
  created_at: string | null;
}
```

### Database Query
```sql
-- Filters referrals where ambassador_id matches admin customer
SELECT
  id,
  status,
  ambassador_id,
  referred_name,
  referred_email,
  referred_phone,
  created_at
FROM referrals
WHERE ambassador_id = 'admin_customer_id'
ORDER BY created_at DESC;
```

---

## 💡 Usage Scenarios

### Scenario 1: Track Partner Applications
**When**: After someone applies via `/r/Jn9wjbn2kQlO`
**What happens**:
1. Application creates referral record
2. Shows in Partner Referrals tab with "Pending" status
3. Metrics update: Total Referrals +1

### Scenario 2: Partner Becomes Customer
**When**: Approved application becomes paying customer
**What happens**:
1. Status updates to "completed"
2. Active Partners count increases
3. Monthly/Annual commission recalculates
4. Conversion rate updates

### Scenario 3: Monitor Performance
**When**: Regular dashboard check-ins
**What to review**:
- Conversion rate trend
- Monthly commission growth
- Recent applications
- Partner contact details for follow-up

---

## 📈 Metrics Interpretation

### Healthy Metrics
- **Conversion Rate**: > 40%
  - Indicates good partner quality
  - Shows effective screening

- **Monthly Commission**: Growing trend
  - More active partners over time
  - Successful recruitment efforts

- **Total Referrals**: Steady increase
  - Consistent referral activity
  - Link sharing effectiveness

### Warning Signs
- **Conversion Rate**: < 20%
  - Too many low-quality applications
  - May need better partner vetting

- **All "Pending"**: No completed referrals
  - Applications not converting
  - Follow-up needed

- **Flat Growth**: No new referrals
  - Link not being shared
  - Need more promotion

---

## 🎨 Customization Options

### Adjust Average Subscription
```typescript
// In PartnerReferralsTab.tsx
const avgSubscription = 200;  // Change to your average
```

### Modify Commission Rate
```typescript
// In PartnerReferralsTab.tsx
const commissionRate = 0.25;  // 25% - adjust as needed
```

### Change Empty State CTA
```tsx
<a href="/referral">  {/* Change destination */}
  Get Your Referral Link
</a>
```

---

## 🔗 Related Features

### Works With:
1. **Attribution System**
   - Cookie-based tracking
   - 30-day attribution window
   - `/api/referral-redirect` endpoint

2. **Health Monitoring**
   - `/api/health/attribution` metrics
   - Real-time success rate tracking

3. **Email Notifications**
   - Admin receives application emails
   - Attribution details highlighted

---

## 🚀 Next Steps

### Recommended Enhancements

1. **Add Filtering**
   ```typescript
   // Filter by status
   <select onChange={handleStatusFilter}>
     <option value="all">All Statuses</option>
     <option value="pending">Pending Only</option>
     <option value="completed">Active Only</option>
   </select>
   ```

2. **Export Functionality**
   ```typescript
   // CSV export button
   <Button onClick={exportToCSV}>
     Export Partner List
   </Button>
   ```

3. **Date Range Selector**
   ```typescript
   // Filter by date range
   <DateRangePicker
     onChange={handleDateChange}
   />
   ```

4. **Individual Partner Pages**
   ```typescript
   // Click row to see details
   <TableRow
     onClick={() => router.push(`/partners/${referral.id}`)}
   />
   ```

---

## 📋 Testing Checklist

- [ ] Tab appears in Step 4
- [ ] Metrics calculate correctly
- [ ] Empty state shows when no referrals
- [ ] Table populates with partner data
- [ ] Status badges display correct colors
- [ ] Email/phone links work
- [ ] Commission math is accurate
- [ ] Responsive on mobile
- [ ] Badge count shows in tab label
- [ ] Help text is clear and accurate

---

## 🐛 Troubleshooting

### Problem: No referrals showing
**Check:**
1. Admin customer exists in database
2. `ADMIN_REFERRAL_CODE` env variable is set
3. Referrals have matching `ambassador_id`
4. User has permission to view dashboard

### Problem: Wrong commission amounts
**Check:**
1. `avgSubscription` value (currently $200)
2. `commissionRate` value (currently 0.25)
3. Status field is "completed" not "complete"

### Problem: Tab not appearing
**Check:**
1. Build succeeded without errors
2. Component imported correctly
3. TabsList has 4 columns: `md:grid-cols-4`
4. Page refreshed after deployment

---

## 📚 Documentation Links

- [Main Improvement Plan](./IMPROVEMENT_PLAN.md)
- [Cookie System Guide](./DASHBOARD_IMPROVEMENTS_SUMMARY.md)
- [Referral System Guide](./REFERRAL_SYSTEM_GUIDE.md)
- [QA Checklist](./REFERRAL_QA_CHECKLIST.md)

---

## ✨ Summary

You now have a complete B2B partner referral tracking system that:
- Shows partner applications in a dedicated tab
- Calculates commission revenue automatically
- Tracks conversion from application to customer
- Provides clear performance metrics
- Separates B2B and B2C referral tracking

The system is production-ready and automatically updates as new referrals come in through your admin referral link.
