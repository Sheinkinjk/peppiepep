# 🚀 Pre-Launch Checklist

## 🚨 CRITICAL - Must Complete Before Launch

### 1. ❌ Database Migration (BLOCKING)

**Issue**: Partner approval will fail without this
**Status**: NOT YET RUN

**Action**: Run SQL in Supabase → See [URGENT_DATABASE_FIX.md](URGENT_DATABASE_FIX.md)

---

## ✅ Already Complete

- ✅ Attribution system (9/9 tests passed)
- ✅ Referral landing page (/referred)
- ✅ Partner program updated (25% recurring revenue)
- ✅ Email templates updated
- ✅ Comprehensive documentation
- ✅ Build passing
- ✅ Security reviewed

---

## ⚠️ Quick Checks Needed (20 minutes)

### 2. Database Migration
- [ ] Open Supabase SQL Editor
- [ ] Run ADD_MISSING_COLUMNS.sql
- [ ] Verify columns added

### 3. Test Partner Approval
- [ ] Login to dashboard
- [ ] Click "Approve" on partner application
- [ ] Verify success (no errors)
- [ ] Check emails sent

### 4. Test Attribution
- [ ] Visit: referlabs.com.au/r/xIP0b1MCwsQt
- [ ] Verify redirects to /referred
- [ ] Check attribution badge shows code
- [ ] Submit test application
- [ ] Verify database record created

### 5. Environment Variables
- [ ] Check Vercel has RESEND_API_KEY
- [ ] Verify NEXT_PUBLIC_SITE_URL set
- [ ] Confirm PARTNER_PROGRAM_BUSINESS_ID set

### 6. Mobile Quick Check
- [ ] Open /referred on mobile
- [ ] Verify forms work
- [ ] Check buttons are tappable

---

## 🚦 Launch Status

**Current**: 🔴 NOT READY
**Blocker**: Database migration
**Time to ready**: 20-30 minutes

**After migration**: 🟢 READY TO LAUNCH

---

## 📚 Documentation

- [URGENT_DATABASE_FIX.md](URGENT_DATABASE_FIX.md) - SQL migration
- [AMBASSADOR_ATTRIBUTION_GUIDE.md](AMBASSADOR_ATTRIBUTION_GUIDE.md) - Ambassador docs
- [ATTRIBUTION_TESTING_SUMMARY.md](ATTRIBUTION_TESTING_SUMMARY.md) - Test results

