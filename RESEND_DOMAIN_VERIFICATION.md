# Resend Domain Verification Guide

**Domain:** referlabs.com.au
**Status:** Needs Verification
**Last Updated:** 2026-01-03

---

## Overview

To ensure emails sent from `jarred@referlabs.com.au` have maximum deliverability and don't end up in spam, you need to verify your domain with Resend by adding DNS records.

---

## Step 1: Access Resend Dashboard

1. Go to https://resend.com/domains
2. Log in with your Resend account
3. Look for `referlabs.com.au` in your domains list

---

## Step 2: Get DNS Records

Resend will provide you with DNS records that need to be added to your domain registrar. You'll typically need:

### Required DNS Records:

1. **SPF Record (TXT)**
   - Purpose: Authorizes Resend to send emails on behalf of your domain
   - Example: `v=spf1 include:sendgrid.net ~all`

2. **DKIM Record (TXT)**
   - Purpose: Email authentication to prevent spoofing
   - Format: `resend._domainkey.referlabs.com.au`
   - Example: `k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC...`

3. **DMARC Record (TXT)**
   - Purpose: Policy for handling failed authentication
   - Format: `_dmarc.referlabs.com.au`
   - Example: `v=DMARC1; p=quarantine; rua=mailto:jarred@referlabs.com.au`

4. **Custom Return-Path (CNAME)** (Optional but recommended)
   - Purpose: Track bounces and complaints
   - Format: `bounce.referlabs.com.au` → `resend.net`

---

## Step 3: Add DNS Records to Your Domain Registrar

### Where to Add Records

You need to add these DNS records wherever your domain `referlabs.com.au` is registered or managed. Common registrars:

- **Namecheap**: https://www.namecheap.com → Domain List → Manage → Advanced DNS
- **GoDaddy**: https://dcc.godaddy.com/domains → DNS → Add Record
- **Cloudflare**: https://dash.cloudflare.com → DNS → Records
- **AWS Route 53**: https://console.aws.amazon.com/route53
- **Google Domains**: https://domains.google.com

### How to Add Records

1. Log into your domain registrar
2. Navigate to DNS settings / DNS management
3. Click "Add Record" or "Add DNS Record"
4. For each record type:
   - **Type**: Select TXT or CNAME
   - **Name/Host**: Enter the subdomain (e.g., `resend._domainkey` or `_dmarc`)
   - **Value/Points To**: Copy-paste the value from Resend dashboard
   - **TTL**: Use 3600 (1 hour) or leave default

### Example SPF Record:
```
Type: TXT
Name: @
Value: v=spf1 include:resend.net ~all
TTL: 3600
```

### Example DKIM Record:
```
Type: TXT
Name: resend._domainkey
Value: [long string from Resend dashboard]
TTL: 3600
```

### Example DMARC Record:
```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=quarantine; rua=mailto:jarred@referlabs.com.au
TTL: 3600
```

---

## Step 4: Verify DNS Propagation

After adding the records, DNS changes can take 5 minutes to 48 hours to propagate globally (usually 15-30 minutes).

### Check DNS Propagation:

1. **Use Online Tools:**
   - https://mxtoolbox.com/SuperTool.aspx
   - https://dnschecker.org
   - https://www.whatsmydns.net

2. **Check Specific Records:**
   - SPF: `nslookup -type=txt referlabs.com.au`
   - DKIM: `nslookup -type=txt resend._domainkey.referlabs.com.au`
   - DMARC: `nslookup -type=txt _dmarc.referlabs.com.au`

3. **From Terminal:**
```bash
# Check SPF
dig referlabs.com.au TXT

# Check DKIM
dig resend._domainkey.referlabs.com.au TXT

# Check DMARC
dig _dmarc.referlabs.com.au TXT
```

---

## Step 5: Verify in Resend Dashboard

1. Return to https://resend.com/domains
2. Find `referlabs.com.au`
3. Click "Verify" or "Check DNS"
4. If all records are detected, domain status will change to "Verified" ✅

---

## Step 6: Test Email Deliverability

Once verified, send a test email to ensure everything works:

### Option 1: Send Test via Resend Dashboard
1. Go to https://resend.com/emails
2. Click "Send Email"
3. From: `jarred@referlabs.com.au`
4. To: Your personal email (Gmail, Outlook, etc.)
5. Subject: "Resend Domain Verification Test"
6. Send and check:
   - ✅ Email arrives in inbox (not spam)
   - ✅ No warning banners ("This email may not be from...")
   - ✅ Shows as sent from `jarred@referlabs.com.au`

### Option 2: Send Test via Application
1. Log into your Refer Labs dashboard
2. Navigate to any feature that sends emails (e.g., campaign builder)
3. Send a test campaign to yourself
4. Verify email arrives in inbox

---

## Step 7: Monitor Deliverability

After verification, monitor your email deliverability:

### Resend Dashboard Metrics:
- **Delivery Rate:** Should be 95%+
- **Bounce Rate:** Should be <2%
- **Spam Complaints:** Should be <0.1%

### Check Sender Reputation:
- https://www.senderscore.org
- https://postmaster.google.com (for Gmail deliverability)
- https://postmaster.live.com (for Outlook deliverability)

---

## Common Issues & Troubleshooting

### Issue 1: DNS Records Not Detected
**Solution:**
- Wait 30 minutes and try again (DNS propagation delay)
- Verify you added records to the correct domain
- Check for typos in record values
- Ensure no extra spaces in record values

### Issue 2: SPF Record Conflict
**Solution:**
- You can only have ONE SPF record per domain
- If you already have an SPF record, merge it with Resend's:
  ```
  v=spf1 include:resend.net include:other-service.com ~all
  ```

### Issue 3: Emails Still Going to Spam
**Solution:**
- Ensure DMARC policy is set (helps with Gmail/Outlook)
- Warm up your domain by sending gradually (start with 50 emails/day)
- Avoid spam trigger words in subject lines
- Include unsubscribe links in all marketing emails
- Monitor bounce rates and clean your list

### Issue 4: "From" Address Mismatch
**Solution:**
- Ensure `RESEND_FROM_EMAIL` matches your verified domain:
  ```
  RESEND_FROM_EMAIL="Refer Labs <jarred@referlabs.com.au>"
  ```
- Cannot send from unverified domains (e.g., `@gmail.com` won't work)

---

## Current Configuration

Based on your `.env.local`:

```bash
RESEND_API_KEY="re_cn72vTKs_GhhP3xDHQjQezoVAEpniKDuN"
RESEND_FROM_EMAIL="Refer Labs <jarred@referlabs.com.au>"
RESEND_REPLY_TO="jarred@referlabs.com.au"
RESEND_WEBHOOK_TOKEN="c8c712bccf68f172c6213d5100a8e4f8174355e2a00681807bfcbf49ff407afb"
```

✅ Configuration looks correct
⚠️ Domain verification status unknown - check Resend dashboard

---

## Next Steps

- [ ] Log into https://resend.com/domains
- [ ] Get DNS records for `referlabs.com.au`
- [ ] Add DNS records to your domain registrar
- [ ] Wait 15-30 minutes for DNS propagation
- [ ] Verify domain in Resend dashboard
- [ ] Send test email to verify deliverability
- [ ] Monitor delivery rates for first 24 hours

---

## Support Resources

- **Resend Documentation:** https://resend.com/docs/dashboard/domains/introduction
- **Resend Support:** support@resend.com
- **DNS Help:** Check with your domain registrar's support

---

## Estimated Time

- **Adding DNS records:** 10 minutes
- **DNS propagation:** 15-30 minutes (up to 48 hours)
- **Verification:** 2 minutes
- **Testing:** 5 minutes

**Total:** ~30-60 minutes

---

## Status Checklist

- [ ] Logged into Resend dashboard
- [ ] Retrieved DNS records (SPF, DKIM, DMARC)
- [ ] Added SPF record to DNS
- [ ] Added DKIM record to DNS
- [ ] Added DMARC record to DNS
- [ ] Verified DNS propagation
- [ ] Verified domain in Resend
- [ ] Sent test email successfully
- [ ] Email arrived in inbox (not spam)
- [ ] Monitoring deliverability metrics

Once all items are checked, your domain is production-ready for email sending! ✅
