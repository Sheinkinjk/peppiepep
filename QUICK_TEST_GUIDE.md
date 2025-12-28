# Quick Testing Guide for Refer Labs Referral System
**Admin**: jarred@referlabs.com.au

## ✅ System Status (from validation)
```
✅ All environment variables configured
✅ Database connection working
✅ All 8 critical tables accessible
✅ Partner program business configured (Refer Labs)
✅ Admin referral code active (Jn9wjbn2kQlO)
✅ API routes implemented

📊 Current Data:
- 45 Businesses
- 164 Customers/Ambassadors
- 4 Referrals
- 7 Partner Applications (ready to approve!)
```

---

## 🚀 Quick Start: Test in 15 Minutes

### Test 1: Partner Application & Approval (5 min)

**Step 1**: Submit test application
```
URL: https://referlabs.com.au/our-referral-program
Email: Use a test email you can check
Name: "Test Partner Dec 29"
Fill other fields with test data
```

**Step 2**: Check admin email (jarred@referlabs.com.au)
```
Expected: "New referral program applicant: Test Partner Dec 29"
Verify: All details shown, referral link generated
```

**Step 3**: Approve from admin dashboard
```
URL: https://referlabs.com.au/dashboard
Login as: jarred@referlabs.com.au
Find: Partner Applications section (admin-only)
Click: "Approve" on test application
```

**Step 4**: Verify approval emails
```
Test email inbox: "🎉 You're Now a Refer Labs Partner!"
Admin inbox: "✅ Partner Approved: Test Partner Dec 29"
Check: $250 credit mentioned, referral link present
```

---

### Test 2: Referral Attribution (5 min)

**Step 1**: Get approved partner's referral link
```
From approval email or dashboard
Format: https://referlabs.com.au/r/[code]
```

**Step 2**: Click link in incognito browser
```
Open: Partner's referral link
Verify: Redirects to partner program page
Check: Cookie set (dev tools > Application > Cookies)
```

**Step 3**: Submit another partner application
```
Use different email than Test 1
Submit via the attributed link
```

**Step 4**: Verify attribution
```
Admin email should show: "🎯 Referred by Ambassador"
Database referrals table: New referral record
Database stripe_commissions: $100 signup bonus
```

---

### Test 3: Business Ambassador Workflow (5 min)

**Step 1**: Login as a test business
```
Create a test business account if needed
Or use existing test business
```

**Step 2**: Add pending ambassador
```
Dashboard > Quick Add Customer
Name: "Test Ambassador Dec 29"
Email: test email you can check
Status will be: "pending"
```

**Step 3**: Approve ambassador
```
Select: Checkbox next to ambassador
Click: "Approve Ambassadors" button
Confirm: Dialog shows welcome email details
```

**Step 4**: Verify emails
```
Test email: "🎉 Welcome to [Business Name] Ambassador Program!"
Business owner: "✅ X Ambassador(s) Approved"
Check: Referral link, discount code, portal link present
```

---

## 📧 Email Checklist

All these emails should be working:

| #   | Email Type | Recipient | Trigger |
|-----|-----------|-----------|---------|
| 1   | Partner application notification | Admin | Application submitted |
| 2   | Partner approval welcome | Partner | Admin approves |
| 3   | Partner approval confirmation | Admin | Admin approves |
| 4   | Ambassador welcome | Ambassador | Business approves |
| 5   | Business owner approval summary | Business owner | Business approves |

---

## 🎯 Critical Flows to Validate

### Flow A: Partner → Approved → Referring
1. ✅ Partner applies
2. ✅ Admin receives notification
3. ✅ Admin approves from dashboard
4. ✅ Partner receives welcome + $250 credit
5. ✅ Partner's referral link is active
6. ✅ New applications via link are attributed
7. ✅ Partner earns $100 signup bonuses automatically

### Flow B: Business Ambassador → Approved → Referring
1. ✅ Business adds ambassador (pending status)
2. ✅ Business approves via dashboard
3. ✅ Ambassador receives welcome email
4. ✅ Ambassador has referral link + discount code
5. ✅ Ambassador can submit referrals
6. ✅ Business owner tracks referrals in dashboard

### Flow C: Referral Attribution
1. ✅ Click ambassador referral link
2. ✅ Cookie set for 30 days
3. ✅ Any signup within 30 days is attributed
4. ✅ Referral record created
5. ✅ Commission/bonus calculated
6. ✅ Ambassador sees referral in their portal

---

## 🔍 Where to Check Results

### Admin Dashboard
```
URL: https://referlabs.com.au/dashboard
Login: jarred@referlabs.com.au

Check:
- Partner Applications section (admin-only)
- Pending applications count
- Approved partners list
- Referral performance metrics
```

### Partner/Ambassador Portal
```
URL: https://referlabs.com.au/r/referral?code=[referral_code]
Or: Click link from welcome email

Check:
- Referral count
- Earnings ($100 signup bonuses)
- Conversion tracking
- Referral link sharing tools
```

### Database (Supabase)
```
Tables to verify:
- partner_applications: status changed to "approved"
- customers: status changed to "verified", credits = 25000
- referrals: attributed referrals logged
- stripe_commissions: signup bonuses ($100) created
- referral_events: link clicks and signups tracked
```

### Email Inbox
```
jarred@referlabs.com.au:
- Application notifications
- Approval confirmations

Test emails:
- Partner welcome emails
- Ambassador welcome emails
- Approval summaries
```

---

## 🐛 Common Issues & Solutions

### Issue: Emails not sending
**Check**: Resend API key in production environment (Vercel)
**Fix**: Verify RESEND_API_KEY in Vercel environment variables

### Issue: Attribution not working
**Check**: Cookie is being set (dev tools)
**Fix**: Ensure NEXT_PUBLIC_SITE_URL matches production domain

### Issue: Admin can't see Partner Applications
**Check**: Logged in as correct admin account
**Fix**: Use jarred@referlabs.com.au (admin account)

### Issue: Approval button doesn't work
**Check**: Browser console for errors
**Fix**: Ensure /api/ambassadors/approve endpoint is deployed

### Issue: Database connection errors
**Check**: Supabase credentials in environment
**Fix**: Verify NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY

---

## 📊 Success Metrics

After testing, you should verify:

✅ **Email Delivery**: 100% of test emails received
✅ **Attribution Accuracy**: All test referrals correctly attributed
✅ **Database Integrity**: All records created with correct status
✅ **User Experience**: Forms submit smoothly, no errors
✅ **Commission Accuracy**: Signup bonuses calculated correctly ($100)
✅ **Dashboard Visibility**: All data visible to appropriate users

---

## 🚀 Ready for Production?

If all tests pass:

1. ✅ Review existing partner applications (7 pending)
2. ✅ Approve real pending applications
3. ✅ Monitor first real partner referrals
4. ✅ Begin Phase 1 partner recruitment
5. ✅ Set up monitoring/alerts for system health

---

## 📞 Support

If you encounter issues during testing:

1. Check browser console for JavaScript errors
2. Check Vercel deployment logs for server errors
3. Check Supabase logs for database issues
4. Verify all environment variables in Vercel dashboard
5. Review PRODUCTION_TESTING_CHECKLIST.md for detailed scenarios

---

**Last Updated**: 2025-12-29
**System Version**: Production v1.0
**Validation Status**: ✅ Ready for Testing
