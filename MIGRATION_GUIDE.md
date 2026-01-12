# Professional Services Compliance Migration Guide

## Overview

This guide will help you apply the professional services compliance migration that adds:
- ✅ 6 new tables for compliance tracking (service types, partner tiers, agreements, etc.)
- ✅ Extended columns on existing tables (businesses, customers, partner_applications)
- ✅ Full Row Level Security policies
- ✅ Automated triggers for compliance expiry and date tracking
- ✅ Default data for service provider types and regulatory requirements

## Migration File Location

`supabase/migrations/20260112020000_professional_services_compliance.sql`

## Quick Start: Apply Migration via Supabase Dashboard ⭐ RECOMMENDED

This is the **easiest and most reliable** method:

**Steps:**

1. **Open Supabase SQL Editor:**
   - Navigate to: https://supabase.com/dashboard/project/ovpsgbstrdahrdcllswa/editor/sql

2. **Open the migration file locally:**
   - Open `supabase/migrations/20260112020000_professional_services_compliance.sql`
   - Select all and copy the entire SQL content

3. **Run the migration:**
   - Paste the SQL into the Supabase SQL Editor
   - Click "Run" button
   - Wait for confirmation (should take 5-10 seconds)

4. **Verify success:**
   ```sql
   -- Check that new tables were created
   SELECT table_name
   FROM information_schema.tables
   WHERE table_schema = 'public'
   AND table_name IN (
     'service_provider_types',
     'partner_tiers',
     'partner_agreements',
     'partner_agreement_acceptances',
     'partner_compliance_status',
     'regulatory_requirements'
   );

   -- Should return 6 rows
   ```

5. **Verify data was inserted:**
   ```sql
   -- Check default service provider types
   SELECT name, display_name, requires_professional_license
   FROM service_provider_types;

   -- Should see: law, accounting, consulting, financial_advisory, insurance, recruiting, other
   ```

---

## What This Migration Enables

After running the migration, the following features become fully functional:

### 1. Compliance Dashboard
- Access at: [/src/components/ComplianceDashboard.tsx](src/components/ComplianceDashboard.tsx)
- Admin can view all partner compliance statuses
- One-click verify/reject actions
- Filter by verification status
- Track expiring compliance records

### 2. API Endpoints
- `GET /api/admin/compliance` - Returns compliance overview with statistics
- `POST /api/admin/compliance` - Update partner compliance status
- Both require admin authentication

### 3. Database Tables Created

**service_provider_types** - Professional service categories
- 7 default types: law, accounting, consulting, financial_advisory, insurance, recruiting, other
- Each has compliance framework (ABA Model Rules, AICPA Code, etc.)
- Tracks if professional license required

**partner_tiers** - Partner tier system
- Define custom tiers per business (Bronze, Silver, Gold, Platinum)
- Set commission rates per tier
- Set minimum requirements (referrals, revenue)

**partner_agreements** - Versioned partner agreements
- Store multiple versions of terms
- Track effective dates
- Require partner acceptance

**partner_agreement_acceptances** - Audit trail
- IP address logging
- Timestamp tracking
- Electronic signature capture

**partner_compliance_status** - Verification tracking
- License verification
- Background checks
- DPA acceptance
- Expiry date tracking

**regulatory_requirements** - Compliance rules
- ABA Model Rule 1.5(e) for law firms
- AICPA ethics for accounting
- State-specific requirements

### 4. Extended Existing Tables

**businesses table** gets:
- service_provider_type
- regulated_industry flag
- compliance_framework
- dpa_accepted_at
- soc2_certified flag
- data_residency_region

**customers table** gets:
- partner_tier
- service_provider_type
- compliance_status
- compliance_verified_at
- partner_since_date
- professional_license_number
- license_jurisdiction
- last_compliance_check

**partner_applications table** gets:
- service_provider_type
- compliance_notes
- professional_license_number
- approved_by
- approved_tier

---

## Post-Migration Setup (Optional)

### Create Default Partner Tiers for Your Business

After migration, you can create standard partner tiers:

```sql
-- Replace YOUR_BUSINESS_ID with actual UUID from businesses table
INSERT INTO partner_tiers (
  business_id,
  tier_name,
  display_name,
  commission_rate_percentage,
  min_referrals_required,
  min_monthly_revenue,
  description
) VALUES
  (
    'YOUR_BUSINESS_ID',
    'bronze',
    'Bronze Partner',
    10.00,
    0,
    0,
    'Entry-level partner tier with 10% commission'
  ),
  (
    'YOUR_BUSINESS_ID',
    'silver',
    'Silver Partner',
    15.00,
    10,
    50000,
    'Mid-level partner tier with 15% commission (10+ referrals, $500/mo revenue)'
  ),
  (
    'YOUR_BUSINESS_ID',
    'gold',
    'Gold Partner',
    20.00,
    25,
    100000,
    'Premium partner tier with 20% commission (25+ referrals, $1000/mo revenue)'
  ),
  (
    'YOUR_BUSINESS_ID',
    'platinum',
    'Platinum Partner',
    25.00,
    50,
    250000,
    'Elite partner tier with 25% commission (50+ referrals, $2500/mo revenue)'
  );
```

### Set Service Type for Existing Businesses

Update your business to indicate service type:

```sql
UPDATE businesses
SET
  service_provider_type = 'consulting', -- or 'law', 'accounting', etc.
  regulated_industry = false, -- or true if applicable
  data_residency_region = 'us'
WHERE id = 'YOUR_BUSINESS_ID';
```

### Mark Existing Partners with Service Types

Update existing customers who are partners:

```sql
UPDATE customers
SET
  service_provider_type = 'consulting',
  compliance_status = 'verified',
  compliance_verified_at = NOW(),
  partner_since_date = created_at
WHERE
  status = 'active'
  AND business_id = 'YOUR_BUSINESS_ID';
```

---

## Alternative: Apply via Supabase CLI (If Available)

If you have Supabase CLI set up, you can push the migration:

```bash
# Push all pending migrations
supabase db push

# Or apply specific migration
supabase migration up --version 20260112020000
```

**Note:** Based on previous attempts, you may encounter authentication issues. If so, use the Dashboard method above.

---

## Testing After Migration

Once the migration is applied, test the new functionality:

### 1. Test API Endpoints

```bash
# Get compliance overview (requires admin auth)
curl https://peppiepep.vercel.app/api/admin/compliance

# Expected response:
{
  "partners": [...],
  "compliance_records": [],
  "stats": {
    "total_partners": 0,
    "pending_verification": 0,
    "verified": 0,
    "expired": 0,
    "failed": 0,
    "by_service_type": {},
    "expiring_soon": 0
  }
}
```

### 2. Test Database Queries

```sql
-- Check service provider types are loaded
SELECT COUNT(*) FROM service_provider_types;
-- Should return 7

-- Check regulatory requirements
SELECT COUNT(*) FROM regulatory_requirements;
-- Should return 2 (law and accounting rules)

-- Verify RLS policies exist
SELECT schemaname, tablename, policyname
FROM pg_policies
WHERE tablename IN (
  'service_provider_types',
  'partner_tiers',
  'partner_compliance_status'
);
-- Should return multiple rows
```

### 3. Test UI Components

After migration, you can integrate the ComplianceDashboard component:

```typescript
// In an admin page (e.g., /src/app/admin/compliance/page.tsx)
import { ComplianceDashboard } from "@/components/ComplianceDashboard";

export default function CompliancePage() {
  return (
    <div className="p-8">
      <ComplianceDashboard />
    </div>
  );
}
```

---

## Rollback (If Needed)

If you need to undo the migration:

```sql
-- Drop new tables (order matters due to foreign keys)
DROP TABLE IF EXISTS public.partner_agreement_acceptances CASCADE;
DROP TABLE IF EXISTS public.partner_agreements CASCADE;
DROP TABLE IF EXISTS public.partner_compliance_status CASCADE;
DROP TABLE IF EXISTS public.partner_tiers CASCADE;
DROP TABLE IF EXISTS public.regulatory_requirements CASCADE;
DROP TABLE IF EXISTS public.service_provider_types CASCADE;

-- Remove added columns from businesses
ALTER TABLE public.businesses
  DROP COLUMN IF EXISTS service_provider_type,
  DROP COLUMN IF EXISTS regulated_industry,
  DROP COLUMN IF EXISTS compliance_framework,
  DROP COLUMN IF EXISTS dpa_accepted_at,
  DROP COLUMN IF EXISTS dpa_version,
  DROP COLUMN IF EXISTS soc2_certified,
  DROP COLUMN IF EXISTS soc2_audit_date,
  DROP COLUMN IF EXISTS data_residency_region;

-- Remove added columns from customers
ALTER TABLE public.customers
  DROP COLUMN IF EXISTS partner_tier_id,
  DROP COLUMN IF EXISTS partner_tier,
  DROP COLUMN IF EXISTS service_provider_type,
  DROP COLUMN IF EXISTS compliance_verified_at,
  DROP COLUMN IF EXISTS compliance_status,
  DROP COLUMN IF EXISTS partner_since_date,
  DROP COLUMN IF EXISTS professional_license_number,
  DROP COLUMN IF EXISTS license_jurisdiction,
  DROP COLUMN IF EXISTS last_compliance_check;

-- Remove added columns from partner_applications
ALTER TABLE public.partner_applications
  DROP COLUMN IF EXISTS service_provider_type,
  DROP COLUMN IF EXISTS compliance_notes,
  DROP COLUMN IF EXISTS professional_license_number,
  DROP COLUMN IF EXISTS approved_by,
  DROP COLUMN IF EXISTS approved_tier;
```

---

## Summary

**Current Status:**
- ✅ Professional services dashboard UI deployed and live
- ✅ Compliance API endpoints ready (will show placeholder data until migration runs)
- ✅ Migration file created and ready to apply
- ⏳ Database migration needs to be applied manually via Supabase Dashboard

**To Complete Setup:**
1. Copy migration SQL from local file
2. Paste and run in Supabase SQL Editor
3. Verify tables created successfully
4. Optionally create default partner tiers
5. Test API endpoints and UI

**Result:**
Full enterprise-grade compliance tracking system for professional services partnerships.
