# 🔒 Ambassador Attribution Verification Guide

## Overview

This guide helps ambassadors verify that their referral links are working correctly and that they will receive proper credit for all referrals.

**Key Guarantee**: Every click on your referral link is tracked for 30 days. Any conversion during that window is attributed to you and counts toward your 25% recurring revenue.

---

## ✅ How to Verify Your Attribution is Working

### Step 1: Get Your Referral Link

Your unique referral link format:
```
https://referlabs.com.au/r/YOUR_CODE
```

**Example**: `https://referlabs.com.au/r/xIP0b1MCwsQt`

### Step 2: Test Your Link

1. **Open your referral link** in a browser (or incognito mode for clean test)
2. You should be **automatically redirected** to: `https://referlabs.com.au/referred`
3. The page should display a premium landing page with:
   - "Join the referral program revolution" headline
   - Your referred badge: "You've Been Personally Referred"
   - Two CTA buttons: "Submit Application" and "Book a Call"
   - At the bottom: "Referred by partner code: YOUR_CODE"

✅ **If you see this page with your code at the bottom**, attribution is working!

### Step 3: Verify Attribution Cookie (Technical)

For technical users who want to verify the cookie:

1. After clicking your referral link, open **Browser DevTools**:
   - Chrome/Edge: Press `F12` or `Cmd+Option+I` (Mac)
   - Firefox: Press `F12`
   - Safari: Enable Developer Menu first, then `Cmd+Option+I`

2. Go to **Application** tab → **Cookies** → `https://referlabs.com.au`

3. Look for cookie named: `ref_ambassador`

4. Click on it to see the value. It should contain:
   ```json
   {
     "id": "your-ambassador-id",
     "code": "YOUR_CODE",
     "business_id": "bd8f6179-8507-4098-95eb-28389a96c8c0",
     "timestamp": 1735516800000,
     "source": "direct"
   }
   ```

5. Check **Expires / Max-Age**: Should be 30 days from now

✅ **If cookie exists with your code**, you will get credit for any conversion in the next 30 days!

---

## 🎯 Conversion Paths (How You Earn Credit)

When someone clicks your referral link, they can convert in two ways:

### Path 1: Submit Application

1. User fills out comprehensive application form
2. Provides: business name, industry, revenue, team size, contact info, goals
3. Clicks "Submit Application"
4. Creates referral record in database with YOUR ambassador ID
5. You get credit when they become a customer

### Path 2: Book a Call

1. User clicks "Book a Call" button
2. Redirects to Calendly: `https://calendly.com/jarredkro/30min`
3. Creates pending referral record with YOUR ambassador ID
4. You get credit when they become a customer

**Both paths are fully tracked and attributed to you!**

---

## 📊 How to Verify You Got Credit

### Method 1: Check Your Dashboard

1. Log in to your ambassador dashboard
2. Go to: `https://referlabs.com.au/dashboard`
3. Look for your referral stats:
   - Total referrals
   - Pending referrals
   - Completed referrals
   - Commission earned

### Method 2: Contact Admin (If Unsure)

If you referred someone and want to confirm they're in the system:

**Email**: jarred@referlabs.com.au
**Subject**: "Verify Referral Attribution"

**Include**:
- Your referral code
- Name of person you referred
- Approximate date they submitted application or booked call

We'll verify they're in the system with your ambassador ID.

---

## 🔍 What Gets Tracked

Every interaction is logged in the system:

### Link Click (link_visit)
- Timestamp of click
- Device type (mobile/desktop/tablet)
- Source (direct/social/email)
- Your ambassador ID
- Your referral code

### Application Submission (signup_submitted)
- Full business details
- Contact information
- Goals and objectives
- Your ambassador ID
- Your referral code
- Creates referral record with status: "pending"

### Book a Call Click (schedule_call_clicked)
- Timestamp of click
- Calendly redirect
- Your ambassador ID
- Your referral code
- Creates referral record with status: "pending"

**All events stored permanently** - you can always verify attribution later!

---

## 🛡️ Attribution Protection (30-Day Window)

### How It Works

When someone clicks your link:
1. **Cookie is set** in their browser (secure, httpOnly)
2. **Lasts for 30 days**
3. **Any conversion** within 30 days is credited to you
4. Even if they:
   - Close the browser
   - Come back later
   - Browse other pages first
   - Take time to think about it

### What This Means for You

- **No rush pressure**: Prospects have 30 days to decide
- **Multiple touchpoints**: They can visit multiple times
- **Peace of mind**: Your attribution is protected

### Example Timeline

```
Day 1:  Prospect clicks your link → Cookie set
Day 5:  They close browser, think about it
Day 10: They come back, browse the site
Day 15: They submit application → YOU GET CREDIT ✅
```

Even if they wait 29 days, you still get credit!

---

## ⚠️ What Breaks Attribution (How to Avoid)

### ❌ Cookie Gets Deleted

**What breaks it**:
- User clears browser cookies manually
- User uses private/incognito mode and closes browser
- Cookie expires after 30 days

**How to prevent**:
- Encourage prospects to convert within 30 days
- Follow up within the 30-day window
- If they show interest, send reminder before day 30

### ❌ User Accesses Site Directly

**What breaks it**:
- User types `referlabs.com.au` directly into browser (no cookie)
- User finds site via Google search (no cookie)
- User clicks someone else's referral link after yours

**How to prevent**:
- Always provide YOUR referral link in communications
- Don't just say "visit referlabs.com.au" - give full link
- Track when you send link, follow up before 30 days

### ❌ Different Device

**What breaks it**:
- User clicks on mobile, but submits application on desktop
- Cookies don't transfer between devices

**How to prevent**:
- Encourage them to convert on same device
- Or follow up on multiple devices with your link

---

## 🎁 Commission Structure (25% Recurring)

### How You Earn

When your referred client becomes a paying customer:

1. **Setup**: Client pays monthly subscription (e.g., $500/month)
2. **Your Cut**: 25% of every payment = $125/month
3. **Duration**: **Every month** they remain a customer
4. **Lifetime Value**: If they stay 3 years = $125 × 36 = **$4,500**

### Example Earnings

| Client Monthly Fee | Your Monthly Cut | Year 1 Total | 3-Year Total |
|-------------------|------------------|--------------|--------------|
| $200/month        | $50/month        | $600         | $1,800       |
| $500/month        | $125/month       | $1,500       | $4,500       |
| $1,000/month      | $250/month       | $3,000       | $9,000       |
| $2,000/month      | $500/month       | $6,000       | $18,000      |

### When You Get Paid

- Commission calculated monthly
- Paid out monthly via Stripe
- Full tracking in your dashboard
- Transparent reporting

---

## 🧪 Test Your Attribution Right Now

### Quick 5-Minute Test

1. **Copy your referral link**
2. **Open incognito/private browser**
3. **Paste and visit your link**
4. **Check you're redirected** to `/referred` page
5. **Check bottom of page** shows your code
6. **(Optional) Check DevTools** for `ref_ambassador` cookie

✅ If all above work, your attribution is 100% working!

### Test Application Submission (Optional)

If you want to test the full flow:

1. Fill out the application form with test data
2. Use real email you can access
3. Submit application
4. Check your email for confirmation
5. Contact jarred@referlabs.com.au to verify it's in system

**Note**: Let us know it's a test so we don't count it as a real lead!

---

## 📞 Support & Questions

### Common Questions

**Q: How do I know if my link is working?**
A: Visit your own link - you should be redirected to the premium landing page with your code shown at the bottom.

**Q: What if I forget to send my referral link?**
A: Without your link, there's no cookie, and no attribution. Always use your link!

**Q: Can I share my link on social media?**
A: Absolutely! Your link works anywhere - email, social media, DMs, text messages, etc.

**Q: What if someone clicks my link twice?**
A: The cookie refreshes with each click. Latest click wins, so multiple clicks from your link = still you!

**Q: Do I need to do anything special for tracking?**
A: No! Just share your link. The system handles everything automatically.

**Q: How long until I see the referral in my dashboard?**
A: Usually within 5 minutes of them submitting application or booking call.

**Q: What if they book a call but don't show up?**
A: Referral stays "pending" until they become a paying customer. No revenue = no commission (yet).

**Q: Can I refer multiple businesses?**
A: Yes! Unlimited referrals. Each one earns you 25% recurring revenue.

### Need Help?

**Email**: jarred@referlabs.com.au
**Subject Options**:
- "My referral link not working"
- "Can't see my referrals in dashboard"
- "Verify referral attribution"
- "Question about commission"

**Include**:
- Your name
- Your referral code
- Screenshot if applicable
- Describe the issue

We typically respond within 24 hours.

---

## 🔐 Attribution Guarantee

**We Guarantee**:
1. ✅ Your referral link sets a secure 30-day cookie
2. ✅ All conversions within 30 days are credited to you
3. ✅ Your ambassador ID is stored with every referral
4. ✅ Commission tracking is automatic and accurate
5. ✅ You can verify attribution anytime via dashboard
6. ✅ Full audit trail of all events (link clicks, applications, calls)

**You Can Trust**:
- The system is built by Refer Labs engineers
- Automated testing runs daily
- Every click is logged permanently
- Database records include your ID
- Transparent reporting

---

## 📋 Attribution Checklist for Ambassadors

Before sharing your link:
- [ ] I tested my referral link in incognito mode
- [ ] Link redirects to `/referred` page
- [ ] My code shows at bottom of page
- [ ] Cookie is set correctly (optional: verified in DevTools)

When sharing:
- [ ] I'm sharing the FULL link (https://referlabs.com.au/r/YOUR_CODE)
- [ ] Not just saying "visit referlabs.com.au"
- [ ] Encouraging them to use the link I sent

After someone shows interest:
- [ ] I noted when I sent the link (for 30-day tracking)
- [ ] I'll follow up before day 30 if no conversion
- [ ] I'll check my dashboard after they convert

If there's an issue:
- [ ] I tested my link again to confirm it works
- [ ] I checked my dashboard for the referral
- [ ] I contacted support with details

---

## 🚀 Best Practices for Maximum Attribution

### 1. Always Use Your Full Link
❌ "Check out Refer Labs"
✅ "Check out Refer Labs: https://referlabs.com.au/r/YOUR_CODE"

### 2. Track Your Referrals
- Keep a simple spreadsheet
- Columns: Name, Date Sent Link, Date Converted, Status
- Follow up before day 30

### 3. Multiple Touchpoints
- Send link via email first
- Follow up in DM with same link
- Mention in call, then send link again
- More touches = higher conversion

### 4. Use UTM Parameters (Advanced)
Add tracking to see which channel performs best:
```
https://referlabs.com.au/r/YOUR_CODE?utm_source=linkedin
https://referlabs.com.au/r/YOUR_CODE?utm_source=email
https://referlabs.com.au/r/YOUR_CODE?utm_source=dm
```

### 5. Optimize Your Pitch
The landing page is optimized to convert. Your job:
- Warm them up before sending link
- Explain the problem Refer Labs solves
- Send link with clear CTA: "Book a call" or "Apply now"

---

## 📊 Technical Details (For Advanced Users)

### Cookie Structure
```javascript
{
  id: "f085d2ee-7ff0-46da-9d2a-859b6558fec2",      // Your ambassador ID
  code: "xIP0b1MCwsQt",                              // Your referral code
  business_id: "bd8f6179-8507-4098-95eb-28389a96c8c0", // Refer Labs business ID
  timestamp: 1735516800000,                          // When cookie was set
  source: "direct"                                   // Traffic source
}
```

### Cookie Properties
- **Name**: `ref_ambassador`
- **Max-Age**: 2,592,000 seconds (30 days)
- **Path**: `/` (works on all pages)
- **HttpOnly**: `true` (protected from JavaScript)
- **Secure**: `true` (HTTPS only in production)
- **SameSite**: `lax` (prevents CSRF)

### Database Tables

**referrals**:
- `id` - Unique referral ID
- `ambassador_id` - **YOUR ID** (this is how you get credit!)
- `business_id` - Refer Labs business ID
- `referred_name` - Name of person you referred
- `referred_email` - Their email
- `referred_phone` - Their phone
- `status` - pending/completed/rejected
- `metadata` - Includes your referral code, source, business details

**referral_events**:
- `event_type` - link_visit, signup_submitted, schedule_call_clicked
- `ambassador_id` - **YOUR ID**
- `metadata` - Includes your referral code, device, source
- `created_at` - Timestamp of event

### API Endpoints

- `/api/referral-redirect` - Sets cookie and redirects
- `/api/track-conversion` - Tracks Book a Call clicks
- `/api/referred/submit-application` - Processes application submissions

All endpoints validate and store your ambassador ID.

---

## ✅ Attribution System Status

**Last Tested**: 2025-12-29
**Status**: ✅ ALL SYSTEMS OPERATIONAL

**Test Results**:
- ✅ Cookie setting: Working
- ✅ 30-day expiration: Working
- ✅ Redirect logic: Working
- ✅ Application submission: Working
- ✅ Book a Call tracking: Working
- ✅ Database attribution: Working
- ✅ Email notifications: Working

**Confidence Level**: 100%

You can share your links with complete confidence that attribution is working correctly.

---

**Questions?** Email jarred@referlabs.com.au

**Start Earning**: Share your link today!

**Your Success = Our Success** 🚀
