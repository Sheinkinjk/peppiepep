# 🧪 Complete Testing Guide - Pepform
## Production Testing & Intern Onboarding

**Last Updated:** December 2024
**Purpose:** Comprehensive guide for testing all features before launch and onboarding team members

---

## 📋 PRE-TESTING CHECKLIST

Before you start testing, ensure:

- [ ] Production URL is live: https://peppiepep.vercel.app
- [ ] All environment variables are configured in Vercel
- [ ] Database indexes have been applied
- [ ] Demo referrals table exists with RLS policies
- [ ] You have the test CSV file ready (test-customers.csv)

---

## 🎯 COMPLETE TESTING FLOW

### **Test 1: Homepage & Navigation** (5 min)

#### Steps:
1. Visit https://peppiepep.vercel.app
2. Verify header appears with Pepform logo
3. Click all navigation links:
   - ✅ How it works → /how-it-works
   - ✅ Pricing → /pricing
   - ✅ About → /about
   - ✅ Security → /security
   - ✅ Contact → /contact
4. Click "Try demo dashboard" button → Should go to /dashboard-guest
5. Click "Schedule a Call" → Should open Calendly
6. Scroll to footer, verify all footer links work

#### Expected Results:
- All pages load without errors
- Navigation is smooth
- StickyHeader appears on all pages
- No broken links

---

### **Test 2: Demo Dashboard** (10 min)

#### Steps:
1. Visit https://peppiepep.vercel.app/dashboard-guest
2. Verify you see:
   - ✅ Investor-Ready Demo banner at top
   - ✅ Large "Start Campaign" button
   - ✅ 4 stat cards (Ambassadors, Referrals, Revenue, Rewards)
   - ✅ 4 tabs: Clients & Ambassadors, Referrals, Monthly Performance, Settings & Rewards

#### Test Import CSV:
1. Click "Import CSV" button
2. Upload `test-customers.csv` from your Desktop/Peppiepep folder
3. Click "Import 5 customers"
4. Verify:
   - ✅ Success message appears
   - ✅ 5 customers appear in the table
   - ✅ Ambassador count updates to 5
   - ✅ Each customer has a unique referral code

#### Test Quick Add Customer:
1. Click "Quick Add" button
2. Fill in:
   - Name: "Test Customer"
   - Phone: "+1234567890"
   - Email: "test@example.com"
3. Click "Add Customer"
4. Verify:
   - ✅ Customer appears in table
   - ✅ Ambassador count updates to 6

#### Test Monthly Performance Tab:
1. Click "Monthly Performance" tab
2. Verify:
   - ✅ Shows month-by-month breakdown
   - ✅ Displays revenue, ambassadors, avg value
   - ✅ Professional card design

#### Test Settings & Rewards Tab:
1. Click "Settings & Rewards" tab
2. Verify:
   - ✅ Can set offer text
   - ✅ Can set reward amount
   - ✅ Shows fulfillment options (Store Credit, Cash, Gift Cards)

#### Expected Results:
- All tabs work smoothly
- CSV import successful
- Data persists in localStorage
- No console errors

---

### **Test 3: Start Campaign Flow (CRITICAL)** (15 min)

This is the most important feature - test thoroughly!

#### Step 1: Campaign Name
1. Click the large **"Start Campaign"** button
2. Modal opens with step indicator (1/5)
3. Enter campaign name: "Holiday Promotion"
4. Click "Next"
5. Verify:
   - ✅ Modal advances to step 2
   - ✅ Step indicator shows 2/5

#### Step 2: Reward Configuration
1. Verify reward amount pre-filled from Settings
2. Change to: $25
3. Click "Next"
4. Verify:
   - ✅ Modal advances to step 3
   - ✅ Step indicator shows 3/5

#### Step 3: Select Recipients
1. You should see list of imported customers
2. Check 2-3 customers (e.g., Sarah Johnson, Michael Chen)
3. Click "Next"
4. Verify:
   - ✅ Modal advances to step 4
   - ✅ Selected customer count shows correctly

#### Step 4: Message & Channel
1. Review pre-filled message template
2. Verify SMS/Email toggle works
3. Keep SMS selected
4. Click "Next"
5. Verify:
   - ✅ Modal advances to step 5
   - ✅ Message preview looks good

#### Step 5: Review & Credit Check
1. Verify campaign summary shows:
   - ✅ Campaign name: "Holiday Promotion"
   - ✅ Recipients: 2-3 selected
   - ✅ Channel: SMS
   - ✅ Credit calculation (e.g., 3 customers × $0.05 = $0.15)
2. Check credit status:
   - ✅ If credits sufficient: Green box "Ready to Launch"
   - ✅ If insufficient: Red box "Additional Credits Needed"
3. Click "Launch Campaign" (or "Close" if testing)

#### Expected Results:
- All 5 steps work smoothly
- Navigation (Back/Next) works
- Validation prevents empty fields
- Credit calculation is accurate
- Professional UI throughout

---

### **Test 4: Authentication & Onboarding** (10 min)

#### Test Sign Up:
1. Visit https://peppiepep.vercel.app/login
2. Verify two cards:
   - ✅ Left: Guest Mode (purple, prominent)
   - ✅ Right: Cloud Account (white)

#### Test Guest Mode:
1. Click "Start Testing Now (Guest Mode)"
2. Fill in onboarding:
   - Business name: "Test Salon"
   - Business email: "test@testsalon.com"
   - Phone: "+1234567890" (optional)
3. Click "Launch Dashboard"
4. Verify:
   - ✅ Redirects to /dashboard-guest
   - ✅ Data persists in localStorage

#### Test Email Sign Up:
1. Click "Sign up" toggle
2. Fill in:
   - Email: your test email
   - Password: secure password
3. Click "Create Account"
4. Verify:
   - ✅ Onboarding screen appears
   - ✅ Requires business name AND email
5. Fill in onboarding details
6. Click "Launch Dashboard"
7. Check email for verification link

#### Test Google Sign-In (if configured):
1. Click "Continue with Google"
2. Sign in with Google account
3. Complete onboarding
4. Verify redirect to dashboard

#### Expected Results:
- Guest mode works without database
- Email signup creates account
- Onboarding validates required fields
- Google sign-in works (if configured)

---

### **Test 5: Demo Referral Page** (5 min)

#### Steps:
1. Visit https://peppiepep.vercel.app/r/demo-referral
2. Verify premium design:
   - ✅ Dark gradient background
   - ✅ Glow Beauty Studio branding
   - ✅ "20% off" offer displayed
3. Fill in form:
   - Name: "Test User"
   - Phone: "+1234567890"
   - Email: "testuser@example.com"
4. Click "Claim my 20% off"
5. Verify:
   - ✅ Success page appears
   - ✅ Shows confirmation message
   - ✅ Displays next steps
   - ✅ No "Failed to save" error

#### Expected Results:
- Form submits successfully
- Data saved to Supabase demo_referrals table
- Success page looks professional
- No errors in console

---

### **Test 6: Mobile Responsiveness** (5 min)

#### Steps:
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl/Cmd + Shift + M)
3. Test on different devices:
   - iPhone SE (375px)
   - iPad (768px)
   - Desktop (1920px)

#### Test these pages on mobile:
- ✅ Homepage - hero section, navigation
- ✅ Dashboard - tabs stack vertically
- ✅ Login page - cards stack vertically
- ✅ Start Campaign modal - responsive

#### Expected Results:
- All pages responsive
- No horizontal scroll
- Buttons/text properly sized
- Modal fits on screen

---

### **Test 7: Performance & Console** (5 min)

#### Steps:
1. Open DevTools Console (F12)
2. Navigate through all main pages
3. Check for:
   - ❌ Red errors
   - ⚠️ Warnings (some are okay)
   - 🔴 Failed network requests

#### Test page load speed:
1. Open Network tab
2. Hard refresh (Ctrl/Cmd + Shift + R)
3. Check load time:
   - ✅ Homepage: < 3 seconds
   - ✅ Dashboard: < 3 seconds

#### Expected Results:
- No critical errors in console
- Pages load reasonably fast
- No 404s or failed API calls

---

### **Test 8: CRM Integration Export & Tracking** (15 min)

#### Steps:
1. Log into https://peppiepep.vercel.app/dashboard with an account that has at least 3 ambassadors (import `test-customers.csv` if needed).
2. Navigate to the **CRM Integration** tab (new 6th tab) and confirm the hero shows the correct ambassador counts.
3. Click **Export referral codes (CSV)** and verify a file named `pepf-crm-export-YYYY-MM-DD.csv` downloads.
4. Open the CSV and confirm it includes the columns: `name,email,phone,status,referral_code,referral_link,discount_code,credits`.
5. Inspect at least one row to make sure `referral_link` contains `utm_source=crm&utm_medium=email` so CRM sends are tracked correctly.
6. Click **Copy capture endpoint** and paste the snippet into a terminal. Replace `YOUR_SECRET` with the value from Program Settings → Website capture, along with a real `referral_code`/`discount_code` from the CSV.
7. Run the curl command; expect a `200 OK` response.
8. Return to the dashboard, open **Performance → Journey tracker**, and confirm the conversion logs against the ambassador used in the payload (may take up to 30 seconds).
9. Optional: upload the CSV to a staging Klaviyo/Mailchimp list and map custom fields (`pepform_code`, `pepform_link`) to confirm merge tags match what appears in Pepform.

#### Expected Results:
- CSV exports successfully with accurate data for every ambassador.
- Referral links retain Pepform tracking parameters when opened.
- Discount capture endpoint accepts the payload and records an event in the dashboard.
- Journey tracker / Referrals tab reflect the conversion without any manual adjustments.
- The CRM playbooks remain accurate for Klaviyo, Mailchimp, and custom SMS tooling.

---

## 🚨 COMMON ISSUES & FIXES

### Issue 1: "Failed to save demo referral"
**Fix:** Run the demo_referrals table creation SQL in Supabase
- See previous message for SQL script
- Check RLS policies are created

### Issue 2: CSV import doesn't work
**Fix:**
- Ensure CSV has headers: name,phone,email
- Check file is UTF-8 encoded
- Verify localStorage isn't full

### Issue 3: Start Campaign modal doesn't open
**Fix:**
- Check console for errors
- Verify React state management
- Hard refresh the page (Ctrl/Cmd + F5)

### Issue 4: Google sign-in fails
**Fix:**
- Verify Google OAuth is configured in Supabase
- Check redirect URI is correct
- Ensure domain is authorized in Google Console

### Issue 5: Navigation links broken
**Fix:**
- Verify all pages exist in src/app/
- Check Next.js build completed successfully
- Ensure no TypeScript errors

---

## 📊 TESTING COMPLETION CHECKLIST

After completing all tests, verify:

### Core Features:
- [ ] Homepage loads and all links work
- [ ] Demo dashboard displays correctly
- [ ] CSV import works (test with 5 customers)
- [ ] Quick add customer works
- [ ] All 4 tabs work (Clients, Referrals, Performance, Settings)
- [ ] Start Campaign modal (all 5 steps work)
- [ ] Campaign credit calculation is accurate
- [ ] CRM Integration tab exports CSV + renders data
- [ ] Discount capture endpoint logs events in dashboard
- [ ] Login/signup flow works
- [ ] Onboarding captures business name and email
- [ ] Demo referral page submits successfully
- [ ] Mobile responsive on all pages

### Polish:
- [ ] No console errors on any page
- [ ] All images/icons load
- [ ] Animations smooth (hover effects, transitions)
- [ ] Typography consistent across pages
- [ ] Colors match design system
- [ ] Footer shows on all pages

### Production Ready:
- [ ] Environment variables set in Vercel
- [ ] Database tables created with RLS policies
- [ ] Performance indexes applied
- [ ] All builds succeed
- [ ] No TypeScript errors
- [ ] Rate limiting works on API routes

---

## 🎓 INTERN ONBOARDING INSTRUCTIONS

### For New Team Members Testing Pepform

#### Setup (5 min):
1. Bookmark: https://peppiepep.vercel.app
2. Download test CSV from project: `test-customers.csv`
3. Create a test Google account (if testing OAuth)
4. Have phone number ready for SMS testing (optional)

#### Your Testing Mission:
1. **Day 1: Basic Flow (30 min)**
   - Complete Test 1-3 above
   - Try breaking things (edge cases)
   - Report any bugs you find

2. **Day 2: User Perspective (30 min)**
   - Go through full user journey
   - Sign up as new user
   - Create a campaign
   - Note any confusing UX

3. **Day 3: Advanced Features (30 min)**
   - Test all tabs in dashboard
   - Try different CSV formats
   - Test on mobile device
   - Check performance

#### How to Report Issues:
1. Take screenshot
2. Note URL where issue occurred
3. Describe steps to reproduce
4. Share in team Slack/Email

#### Questions to Answer:
- Is the value proposition clear on homepage?
- Is the campaign flow intuitive?
- Would you trust this platform with your customers?
- What would you change?

---

## 🚀 PRODUCTION LAUNCH READINESS

### Final Checks Before Launch:

#### Technical:
- [ ] All tests pass
- [ ] Google OAuth configured (if using)
- [ ] Twilio SMS configured (if using)
- [ ] Database backup created
- [ ] Monitoring set up (Vercel Analytics)

#### Content:
- [ ] Privacy policy reviewed
- [ ] Terms of service reviewed
- [ ] Contact email monitored
- [ ] Calendly link works

#### Marketing:
- [ ] Demo script prepared
- [ ] Test data cleared from production
- [ ] Analytics tracking enabled
- [ ] Feedback form ready

---

## 📞 SUPPORT

**If you encounter issues during testing:**
- Check this guide first
- Review console for errors
- Test in incognito mode
- Contact: jarredkrowitz@gmail.com

---

## 🎉 YOU'RE READY!

Once all tests pass, Pepform is ready for:
- ✅ Live demos to prospects
- ✅ Investor presentations
- ✅ Beta user onboarding
- ✅ Public launch

**Good luck with launch! 🚀**
