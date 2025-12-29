# ✅ Partner Referral Flow Update - Complete

## Problem Solved

Partner referral links (like https://referlabs.com.au/r/xIP0b1MCwsQt) were redirecting to the partner recruitment page instead of a client acquisition landing page.

## Solution Implemented

### Referral Link Routing Logic

Partner referral links now route based on the referral code:

| Referral Code | Destination | Purpose |
|--------------|-------------|---------|
| `Jn9wjbn2kQlO` (Admin) | `/our-referral-program` | Recruit new partners |
| Other Refer Labs partners | `/` (Homepage) | Acquire new clients |
| Non-Refer Labs businesses | Referral submission form | Business-specific referrals |

### Homepage Transformation

**Before**: Generic "Start Getting Referrals" button → `/login`

**After**: Tracked conversion buttons with full attribution:
- **Schedule a Call** button → Calendly booking page
- **Contact Us** button → Email jarred@referlabs.com.au
- Both track attribution to the referring partner

### Attribution Tracking Flow

```
Partner shares link: https://referlabs.com.au/r/xIP0b1MCwsQt
                                  ↓
                        Prospect clicks link
                                  ↓
              Cookie set (ref_ambassador, 30-day window)
                                  ↓
                    Redirect to homepage (/)
                                  ↓
              Homepage reads cookie & shows:
              - Schedule a Call button
              - Contact Us button
              - "Referred by partner code: xIP0b1MCwsQt"
                                  ↓
                    Prospect clicks CTA
                                  ↓
          /api/track-conversion logs event
                                  ↓
     Creates pending referral record (for Schedule Call)
     Logs conversion event (for Contact Us)
                                  ↓
              Partner earns commission when deal closes
```

---

## Technical Implementation

### Files Changed

**1. `src/app/r/[code]/page.tsx`**
- Added logic to detect Refer Labs partners
- Separates admin code vs partner codes
- Admin → partner program
- Partners → client acquisition (homepage)

**2. `src/app/api/referral-redirect/route.ts`**
- Added `destination` parameter
- `destination=client` → Homepage
- `destination=partner` → Partner program
- Logs redirect destination in metadata

**3. `src/app/page.tsx`** (Homepage)
- Now async server component
- Reads `ref_ambassador` cookie
- Passes attribution data to TrackedCTA
- Replaced generic CTAs with tracked buttons

**4. `src/components/TrackedCTA.tsx`** (New)
- Client component with Schedule Call and Contact Us
- Tracks clicks via `/api/track-conversion`
- Shows partner code if attributed
- Redirects to Calendly or email

**5. `src/app/api/track-conversion/route.ts`** (New)
- POST endpoint for tracking conversions
- Logs events to `referral_events` table
- Creates pending referral for Schedule Call
- Handles attribution for Contact Us

---

## How It Works

### For Partners

1. Partner shares their link: `https://referlabs.com.au/r/[their_code]`
2. Link sets attribution cookie
3. Prospect lands on homepage
4. Homepage shows Refer Labs services with tracked CTAs
5. When prospect schedules call or contacts, partner gets credit

### Attribution Cookie

```javascript
{
  id: "ambassador_id",
  code: "xIP0b1MCwsQt",
  business_id: "bd8f6179-8507-4098-95eb-28389a96c8c0",
  timestamp: 1735516800000,
  source: "direct"
}
```

**Expiration**: 30 days
**Path**: `/`
**HttpOnly**: true
**Secure**: true (production)

### Conversion Events Tracked

| Event | Trigger | Action | Database Impact |
|-------|---------|--------|-----------------|
| `link_visit` | Click partner link | Log visit | `referral_events` |
| `schedule_call_clicked` | Click Schedule Call | Create pending referral | `referrals` + `referral_events` |
| `contact_us_clicked` | Click Contact Us | Log contact | `referral_events` |

---

## Testing Checklist

### Test 1: Partner Link Redirect
- [ ] Visit: https://referlabs.com.au/r/xIP0b1MCwsQt
- [ ] Should redirect to: https://referlabs.com.au/ (homepage)
- [ ] Should NOT redirect to partner program page
- [ ] Cookie `ref_ambassador` should be set

### Test 2: Homepage Shows Tracked CTAs
- [ ] Homepage displays "Schedule a Call" button
- [ ] Homepage displays "Contact Us" button
- [ ] If attributed, shows "Referred by partner code: xIP0b1MCwsQt"
- [ ] Both buttons are visible and styled correctly

### Test 3: Schedule Call Attribution
- [ ] Click "Schedule a Call" button
- [ ] Redirects to: https://calendly.com/jarredkro/30min
- [ ] Check Supabase `referrals` table
  - [ ] New record with `referred_name = "Calendly Lead"`
  - [ ] `ambassador_id` matches partner
  - [ ] `status = "pending"`
- [ ] Check `referral_events` table
  - [ ] Event `schedule_call_clicked` logged

### Test 4: Contact Us Attribution
- [ ] Click "Contact Us" button
- [ ] Opens email client to: jarred@referlabs.com.au
- [ ] Subject: "Interested in Refer Labs"
- [ ] Check `referral_events` table
  - [ ] Event `contact_us_clicked` logged
  - [ ] `ambassador_id` matches partner

### Test 5: Admin Code Still Works
- [ ] Visit: https://referlabs.com.au/r/Jn9wjbn2kQlO
- [ ] Should redirect to: https://referlabs.com.au/our-referral-program
- [ ] Partner recruitment page shows correctly

### Test 6: Cookie Expiration
- [ ] Set system clock +31 days
- [ ] Visit homepage
- [ ] Attribution should NOT show (cookie expired)
- [ ] CTAs still visible but no partner code shown

---

## Database Schema

### referrals Table
```sql
INSERT INTO referrals (
  business_id,
  ambassador_id,
  referred_name,
  referred_email,
  referred_phone,
  status,
  consent_given,
  locale,
  metadata
) VALUES (
  'bd8f6179-8507-4098-95eb-28389a96c8c0',
  'partner_ambassador_id',
  'Calendly Lead',
  NULL,
  NULL,
  'pending',
  false,
  'en',
  '{"source":"schedule_call","referral_code":"xIP0b1MCwsQt"}'
);
```

### referral_events Table
```sql
INSERT INTO referral_events (
  business_id,
  ambassador_id,
  event_type,
  source,
  device,
  metadata
) VALUES (
  'bd8f6179-8507-4098-95eb-28389a96c8c0',
  'partner_ambassador_id',
  'schedule_call_clicked',
  'website',
  'desktop',
  '{"referral_code":"xIP0b1MCwsQt","url":"https://referlabs.com.au/"}'
);
```

---

## Partner Commission Flow

### When Partner Earns Commission

1. **Prospect clicks partner link** → Cookie set, link_visit logged
2. **Prospect schedules call** → Pending referral created
3. **Sales call happens** → Jarred qualifies lead
4. **Deal closes** → Admin marks referral as "completed"
5. **Commission calculated** → 25% of subscription revenue
6. **Monthly payments** → Partner earns 25% every month

### Example Commission

```
Prospect becomes client at $500/month
Partner earns: $500 × 25% = $125/month
Lifetime value (3 years): $125 × 36 = $4,500
```

---

## Important URLs

| Purpose | URL |
|---------|-----|
| Partner link example | https://referlabs.com.au/r/xIP0b1MCwsQt |
| Admin partner recruitment | https://referlabs.com.au/r/Jn9wjbn2kQlO |
| Client landing page | https://referlabs.com.au/ |
| Schedule a call | https://calendly.com/jarredkro/30min |
| Contact email | jarred@referlabs.com.au |
| Partner program info | https://referlabs.com.au/our-referral-program |

---

## Configuration

### Environment Variables Required

```bash
PARTNER_PROGRAM_BUSINESS_ID=bd8f6179-8507-4098-95eb-28389a96c8c0
ADMIN_REFERRAL_CODE=Jn9wjbn2kQlO
NEXT_PUBLIC_SITE_URL=https://referlabs.com.au
```

### Calendly Integration

Update Calendly link if needed in:
- `src/components/TrackedCTA.tsx` line 21

### Contact Email

Update contact email if needed in:
- `src/components/TrackedCTA.tsx` line 41

---

## Monitoring & Analytics

### Key Metrics to Track

1. **Link Clicks** (referral_events: link_visit)
   - How many prospects click partner links
   - Source breakdown (social, email, direct)

2. **Schedule Call Rate** (schedule_call_clicked / link_visit)
   - Conversion rate from visit to booking
   - Target: 5-10%

3. **Contact Us Rate** (contact_us_clicked / link_visit)
   - Alternative conversion path
   - Target: 2-5%

4. **Call → Close Rate** (referrals: completed / pending)
   - Sales team effectiveness
   - Target: 20-30%

5. **Partner ROI**
   - Referrals per partner
   - Revenue per partner
   - Top performers

### Query Examples

**Count link visits by partner:**
```sql
SELECT
  ambassador_id,
  COUNT(*) as visits
FROM referral_events
WHERE event_type = 'link_visit'
AND business_id = 'bd8f6179-8507-4098-95eb-28389a96c8c0'
GROUP BY ambassador_id
ORDER BY visits DESC;
```

**Schedule call conversion rate:**
```sql
SELECT
  COUNT(CASE WHEN event_type = 'link_visit' THEN 1 END) as visits,
  COUNT(CASE WHEN event_type = 'schedule_call_clicked' THEN 1 END) as calls,
  ROUND(
    100.0 * COUNT(CASE WHEN event_type = 'schedule_call_clicked' THEN 1 END) /
    NULLIF(COUNT(CASE WHEN event_type = 'link_visit' THEN 1 END), 0),
    2
  ) as conversion_rate_pct
FROM referral_events
WHERE business_id = 'bd8f6179-8507-4098-95eb-28389a96c8c0';
```

---

## Next Steps

1. ✅ **Deploy Complete** (commit `9c9dbe5`)
2. **Test Partner Link**
   - Share xIP0b1MCwsQt link with test contact
   - Verify redirect to homepage
   - Test Schedule Call button
3. **Monitor First Week**
   - Track link clicks
   - Track conversion events
   - Identify top-performing partners
4. **Iterate Based on Data**
   - A/B test CTA copy
   - Optimize Calendly flow
   - Add more conversion paths (e.g., "Download Guide", "Start Free Trial")

---

## Troubleshooting

### Issue: Partner link redirects to wrong page
**Check**:
- Is business_id = PARTNER_PROGRAM_BUSINESS_ID?
- Is code matching correctly?
- Clear browser cache

### Issue: Attribution not working
**Check**:
- Cookie `ref_ambassador` set in browser?
- Cookie not expired (< 30 days)?
- Homepage running as async server component?

### Issue: Conversion events not logging
**Check**:
- `/api/track-conversion` endpoint accessible?
- ambassadorId and businessId present?
- Network tab shows successful POST?

### Issue: No referral record created
**Check**:
- Event type = "schedule_call_clicked"?
- Supabase permissions correct?
- Check server logs for errors

---

**Deployment**: commit `9c9dbe5`
**Status**: ✅ Live and Ready
**Next**: Test with real partner links
**Contact**: jarred@referlabs.com.au
