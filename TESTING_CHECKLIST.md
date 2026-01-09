# Pre-Launch Testing Checklist

## Critical User Flows to Test

### 1. New User Onboarding Flow ✓ Test This First
**Path:** Sign up → Dashboard → Complete 4 steps

**Expected Experience:**
- [ ] Welcome! See onboarding checklist (4 steps, 0% complete)
- [ ] Step 1: Auto-expanded, shows Partner Directory (empty state)
- [ ] Add first partner via Quick Add form
- [ ] See celebration toast: "🎉 [Name] is now a referral partner!"
- [ ] Partner appears in Partner Directory table
- [ ] Onboarding checklist updates to 25% (1/4 complete)
- [ ] No confusing "ambassador" terminology anywhere

**Key Verification Points:**
- ✓ "Partner Directory" (not "Ambassador Directory")
- ✓ "Import your network" (not "Import clients list")
- ✓ "Add a few partners manually" (not "ambassadors")
- ✓ Celebration message uses "referral partner"

---

### 2. Campaign Creation Flow
**Path:** Dashboard → Step 3 → Quick Send → Send Campaign

**Expected Experience:**
- [ ] Click Step 3 "Launch Campaigns"
- [ ] See two clear options: "Quick Send" (RECOMMENDED) + "Use My Email Tool"
- [ ] Click "Start Campaign" on Quick Send
- [ ] Campaign builder opens
- [ ] See "Launch omnichannel campaigns" header
- [ ] Default view shows 4 fields (name, subject, preview, message)
- [ ] "Show advanced options" link available
- [ ] Select recipients: Shows "[X] referral partners selected"
- [ ] Send campaign
- [ ] See success toast: "✅ Campaign sent!"
- [ ] Message: "Your campaign just went out to [X] referral partners"

**Key Verification Points:**
- ✓ No "Path 1/2" confusion
- ✓ "Quick Send" clearly marked as recommended
- ✓ "referral partners" (not "ambassadors")
- ✓ Advanced options collapsed by default
- ✓ Celebration toast on success

---

### 3. Email Received by Partner
**Path:** Partner receives campaign email

**Expected Content:**
- [ ] Subject line: Custom or default
- [ ] Email body opens correctly
- [ ] Header: "You're Invited to Join Our Referral Partner Program" (default)
- [ ] Testimonial section: "Partner spotlight" (not "Ambassador")
- [ ] FAQ: "In your partner portal" (not "ambassador portal")
- [ ] Button: "Open Partner Portal" (not "Ambassador Portal")
- [ ] All branding and colors correct

**Key Verification Points:**
- ✓ "Referral Partner Program" (not "Ambassador Program")
- ✓ "Partner Portal" throughout
- ✓ Professional tone matches new positioning

---

### 4. ROI Dashboard View
**Path:** Dashboard → Step 5 → Measure ROI

**Expected Experience:**
- [ ] See 4 metric cards at top:
  - Total Referrals
  - Total Revenue
  - Conversion Rate
  - Active Partners (not "Active Ambassadors")
- [ ] If data exists: See "Top Referral Partner" spotlight card
- [ ] Shows partner name, revenue, referrals, avg deal size
- [ ] All formatting correct
- [ ] Numbers calculate correctly

**Key Verification Points:**
- ✓ "Active Partners" (not "Active Ambassadors")
- ✓ "Top Referral Partner" (not "Top Ambassador")
- ✓ Metrics display correctly

---

### 5. Partner Directory Management
**Path:** Dashboard → Step 2 → Partner Directory table

**Expected Experience:**
- [ ] Table header: "Partner Directory" (not "Ambassador Directory")
- [ ] Count shows: "[X] referral partner(s) total"
- [ ] Status legend visible above table:
  - Pending, Verified, Active, Applicant
- [ ] Can filter by status
- [ ] Can search partners
- [ ] Can select multiple partners
- [ ] Bulk actions: "Approve Partners", "Add to Campaign"
- [ ] Status tooltips correct

**Key Verification Points:**
- ✓ All "ambassador" → "partner" or "referral partner"
- ✓ Status legend always visible
- ✓ Bulk actions use correct terminology
- ✓ Toast messages use "referral partner"

---

### 6. Homepage & Marketing Pages
**Path:** Visit homepage and key landing pages

**Expected Experience:**

**Homepage:**
- [ ] Hero section mentions new positioning
- [ ] Feature #4: "keep referral partners nudged" (not "ambassadors")
- [ ] Stats: "start inviting referral partners" (not "ambassadors")
- [ ] Testimonial: "which referral partners are driving" (not "ambassadors")
- [ ] All other content loads correctly

**SEO Meta Tags:**
- [ ] Title: "Refer Labs - Referrals that compound"
- [ ] Description: "Turn partners, clients, creators, and advisors into your most powerful growth engine"

**Key Verification Points:**
- ✓ New positioning visible and clear
- ✓ No "customers → ambassadors" messaging
- ✓ Broader appeal (B2B, agencies, creators)

---

## Quick Smoke Tests (5 minutes)

Run these after deploying to production:

```bash
# 1. Homepage loads
curl -I https://referlabs.com.au

# 2. Dashboard loads (logged in)
# Visit /dashboard in browser

# 3. Can add partner
# Use Quick Add form

# 4. Can view Partner Directory
# Check Step 2

# 5. Email sends correctly
# Send test campaign to yourself
```

---

## Browser Testing

Test in these browsers:
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

---

## Known Issues / Expected Behavior

**Internal API endpoints still use "ambassador":**
- `/api/ambassadors/*` - This is intentional for backward compatibility
- Database tables: `ambassadors`, `customers` - Unchanged
- Only UI-facing text was updated

**Some technical docs may still reference "ambassador":**
- Implementation guides for developers
- These are low priority and don't affect user experience

---

## Success Criteria

✅ **Launch is successful if:**
1. Zero TypeScript/build errors
2. All user-facing text uses "referral partner" or "partner"
3. Email templates render correctly
4. Dashboard onboarding flows smoothly
5. No user confusion about terminology
6. Celebration moments appear correctly
7. ROI dashboard shows correct metrics

---

## Emergency Rollback

If critical issues are found:

```bash
# Quick rollback of all rebrand changes
git revert e3ce4b7  # Phase 3: Email Templates
git revert f7954ca  # Phase 2: Marketing & SEO  
git revert 4a03aea  # Phase 1B: Dashboard Secondary
git revert b8dc36c  # Phase 1A: Dashboard Core
git push
```

Then redeploy previous version.

---

## Post-Launch Monitoring (First 48 Hours)

**Monitor these metrics:**
- [ ] Error rate (should be <0.1%)
- [ ] Page load times (should be <2s)
- [ ] New user activation rate
- [ ] Campaign send success rate
- [ ] Support tickets about terminology

**Check these logs:**
- [ ] Supabase error logs
- [ ] Email delivery logs (Resend)
- [ ] Application error logs
- [ ] User feedback/support tickets

---

**Testing completed by:** _________________  
**Date:** _________________  
**Production deploy approved:** ☐ Yes  ☐ No
