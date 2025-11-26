# Pepform Compliance Checklist

**Last Updated:** January 2025
**Purpose:** Comprehensive compliance roadmap for Pepform to ensure legal operation and regulatory adherence

---

## 🔴 CRITICAL - Must Complete Before Launch

### 1. Business Registration & Legal Structure
- [ ] **Register business entity** (Pepform Pty Ltd in Australia)
- [ ] **Obtain ABN (Australian Business Number)**
- [ ] **Register for GST** (if turnover > $75,000 AUD)
- [ ] **Set up business bank account**
- [ ] **Obtain appropriate business insurance** (Professional Indemnity, Cyber Liability, Public Liability)
- [ ] **Trademark registration** for "Pepform" brand (Australia + international if needed)

### 2. Privacy & Data Protection Compliance

#### Australian Privacy Principles (APPs)
- [ ] **Implement Privacy Policy** compliant with Privacy Act 1988
- [ ] **Appoint Privacy Officer** or designate responsible person
- [ ] **Conduct Privacy Impact Assessment (PIA)**
- [ ] **Implement data breach notification procedures** (Notifiable Data Breaches scheme)
- [ ] **Ensure collection notices** inform users about data collection
- [ ] **Implement data access and correction procedures**
- [ ] **Establish data retention and deletion policies**
- [ ] **Document cross-border data transfer safeguards**

#### GDPR (if serving EU/UK customers)
- [ ] **Appoint EU Representative** (if required for non-EU company)
- [ ] **Conduct Data Protection Impact Assessment (DPIA)**
- [ ] **Implement GDPR-compliant Privacy Policy**
- [ ] **Establish lawful basis for processing** (consent, legitimate interest, etc.)
- [ ] **Implement data subject rights procedures** (access, rectification, erasure, portability)
- [ ] **Ensure adequacy of data transfers** (Standard Contractual Clauses, BCRs)
- [ ] **Maintain Records of Processing Activities (ROPA)**
- [ ] **Implement consent management** with granular opt-in/opt-out
- [ ] **Maximum 72-hour data breach notification** to supervisory authority
- [ ] **Ensure "Privacy by Design" and "Privacy by Default"**

#### CCPA/CPRA (California Consumer Privacy Act)
- [ ] **Implement "Do Not Sell My Personal Information" option**
- [ ] **Provide access to personal information** collected about users
- [ ] **Honor deletion requests** within 45 days
- [ ] **Disclose data collection practices** in Privacy Policy
- [ ] **Implement opt-out mechanisms** for data sharing
- [ ] **Maintain 12-month lookback** for personal information requests

### 3. SMS/Messaging Compliance

#### TCPA (Telephone Consumer Protection Act) - US
- [ ] **Obtain prior express written consent** before sending marketing SMS
- [ ] **Implement clear opt-in mechanisms** (not pre-checked boxes)
- [ ] **Include opt-out instructions** in every message (e.g., "Reply STOP to unsubscribe")
- [ ] **Honor opt-out requests immediately** (within 1 message cycle)
- [ ] **Maintain suppression lists** for opt-outs
- [ ] **Do not send to Do Not Call (DNC) registry numbers** without exemption
- [ ] **Maintain consent records** for minimum 4 years
- [ ] **Use 10-digit long codes or approved short codes** (no spoofing)
- [ ] **Implement time restrictions** (8am-9pm recipient local time)
- [ ] **Document consent audit trail** (who, when, how, what they consented to)

#### CAN-SPAM Act (Email Marketing) - US
- [ ] **Include accurate "From" information** (no spoofing)
- [ ] **Use truthful subject lines** (no misleading headers)
- [ ] **Identify messages as advertisements** (if applicable)
- [ ] **Include physical postal address** in every email
- [ ] **Provide clear opt-out mechanism** (unsubscribe link)
- [ ] **Honor opt-out requests within 10 business days**
- [ ] **Monitor third-party email senders** (ensure compliance)

#### Spam Act 2003 (Australia)
- [ ] **Obtain consent** before sending commercial electronic messages
- [ ] **Include functional unsubscribe facility** in every message
- [ ] **Include accurate sender information** (business name, contact details)
- [ ] **Honor unsubscribe requests within 5 business days**
- [ ] **Maintain records of consent**

#### Mobile Carrier Guidelines
- [ ] **Register with carrier aggregators** (Twilio handles most of this)
- [ ] **Implement carrier-compliant message templates**
- [ ] **Avoid prohibited content** (profanity, adult content, deceptive practices)
- [ ] **Monitor delivery rates and spam complaints**
- [ ] **Implement A2P 10DLC registration** (US) if using Twilio
- [ ] **Comply with throughput limits** and carrier restrictions

### 4. Financial & Payment Compliance

#### Payment Processing (if accepting payments)
- [ ] **PCI DSS Compliance** (if storing/processing card data)
- [ ] **Partner with PCI-compliant payment processor** (Stripe, PayPal)
- [ ] **Never store full credit card numbers** or CVV codes
- [ ] **Implement secure payment forms** (SSL/TLS encryption)
- [ ] **Conduct annual PCI compliance assessment**

#### Tax Compliance
- [ ] **Register for GST** (Australia - if applicable)
- [ ] **Determine tax nexus** for international sales (VAT, sales tax)
- [ ] **Implement tax calculation** for subscriptions (GST/VAT inclusive or exclusive)
- [ ] **Issue tax invoices** for Australian customers
- [ ] **File BAS (Business Activity Statements)** quarterly/monthly
- [ ] **Track R&D expenses** for potential R&D Tax Incentive (Australia)

#### Anti-Money Laundering (AML)
- [ ] **Implement Customer Due Diligence (CDD)** for high-value accounts
- [ ] **Screen against sanctions lists** (OFAC, UN, EU)
- [ ] **Report suspicious transactions** if required (AUSTRAC for Australia)
- [ ] **Maintain transaction monitoring** for unusual patterns

---

## 🟡 HIGH PRIORITY - Complete Within 3 Months

### 5. Security & Cybersecurity

#### Essential Security Measures
- [ ] **Conduct penetration testing** (annual or bi-annual)
- [ ] **Implement Web Application Firewall (WAF)**
- [ ] **Enable DDoS protection** (Cloudflare, Vercel Enterprise)
- [ ] **Implement rate limiting** on API endpoints
- [ ] **Conduct vulnerability scanning** (automated tools)
- [ ] **Implement Security Information and Event Management (SIEM)**
- [ ] **Establish incident response plan**
- [ ] **Conduct employee security training** (if hiring team)
- [ ] **Implement multi-factor authentication (MFA)** for admin accounts
- [ ] **Encrypt data at rest and in transit** (TLS 1.3, AES-256)
- [ ] **Implement database encryption** (Supabase RLS, field-level encryption)
- [ ] **Regular security audits** of third-party dependencies
- [ ] **Implement secrets management** (avoid hardcoding API keys)

#### Certifications & Audits
- [ ] **SOC 2 Type II audit** (if serving enterprise clients) - costly but valuable
- [ ] **ISO 27001 certification** (information security management) - optional but impressive
- [ ] **OWASP Top 10 compliance** (web application security)

### 6. Accessibility Compliance
- [ ] **WCAG 2.1 Level AA compliance** (Web Content Accessibility Guidelines)
- [ ] **Keyboard navigation support**
- [ ] **Screen reader compatibility**
- [ ] **Color contrast requirements** (minimum 4.5:1 for text)
- [ ] **Alt text for images**
- [ ] **Accessible form labels**
- [ ] **Skip navigation links**
- [ ] **Conduct accessibility audit** (automated + manual testing)

### 7. Intellectual Property Protection
- [ ] **Register trademarks** for brand name, logo, tagline
- [ ] **Copyright notice** on all original content
- [ ] **Protect source code** (private repositories, IP assignment agreements)
- [ ] **Implement DMCA takedown procedures** (if user-generated content)
- [ ] **Conduct trademark clearance search** (ensure no conflicts)
- [ ] **File provisional patent** (if applicable for unique algorithms/methods)

### 8. Terms of Service & Legal Documentation
- [x] **Comprehensive Terms of Service** ✅ Completed
- [ ] **Privacy Policy** (comprehensive, jurisdiction-specific)
- [ ] **Cookie Policy** (if using cookies beyond essential)
- [ ] **Acceptable Use Policy** (additional detail beyond ToS)
- [ ] **Data Processing Agreement (DPA)** for GDPR customers
- [ ] **Service Level Agreement (SLA)** for enterprise customers
- [ ] **Refund/Cancellation Policy**
- [ ] **Subprocessor list** (Twilio, Resend, Supabase, Vercel)

---

## 🟢 MEDIUM PRIORITY - Complete Within 6 Months

### 9. Employment & HR Compliance (if hiring)
- [ ] **Register as employer** (with ATO in Australia)
- [ ] **Implement Fair Work Act compliance** (Australia)
- [ ] **SuperStream-compliant superannuation** payments
- [ ] **Workers' compensation insurance**
- [ ] **Contractor vs employee classification** (ensure compliance)
- [ ] **IP assignment agreements** for employees/contractors
- [ ] **Non-disclosure agreements (NDAs)**
- [ ] **Background checks** for security-sensitive roles

### 10. Industry-Specific Regulations
- [ ] **Telecommunications regulations** compliance (check with ACMA in Australia)
- [ ] **Marketing automation regulations** (ensure compliance with local laws)
- [ ] **Affiliate marketing disclosure** (FTC guidelines if operating in US)
- [ ] **Sweepstakes/contest regulations** (if running referral campaigns with prizes)

### 11. Export Controls & Sanctions
- [ ] **Screen customers against sanctions lists** (OFAC SDN, UN, EU)
- [ ] **Implement geoblocking** for sanctioned countries (North Korea, Iran, Syria, Cuba, Crimea)
- [ ] **Review export control regulations** (ITAR, EAR, DFAT controls)
- [ ] **Establish denied party screening** procedures
- [ ] **Document export compliance procedures**

### 12. Environmental & Sustainability (Optional but Recommended)
- [ ] **Carbon offset program** for data center usage
- [ ] **Sustainability statement** (for B2B clients who care about ESG)
- [ ] **Choose green hosting providers** (Vercel is carbon neutral)

---

## 🔵 ONGOING COMPLIANCE - Continuous Monitoring

### 13. Ongoing Audits & Reviews
- [ ] **Quarterly compliance reviews** (privacy, security, legal)
- [ ] **Annual Terms of Service review** and updates
- [ ] **Annual Privacy Policy review** and updates
- [ ] **Monthly security vulnerability scans**
- [ ] **Quarterly penetration testing** (for critical systems)
- [ ] **Annual third-party audits** (SOC 2, ISO 27001)
- [ ] **Weekly monitoring of regulatory changes** (GDPR, CCPA, TCPA updates)

### 14. Training & Documentation
- [ ] **Employee compliance training** (annual refreshers)
- [ ] **Document compliance procedures** (data breach response, GDPR requests)
- [ ] **Maintain compliance calendar** (filing deadlines, renewal dates)
- [ ] **Create compliance runbook** for common scenarios

### 15. Customer Trust & Transparency
- [ ] **Transparency reports** (data requests, breaches, downtime)
- [ ] **Security page** on website (certifications, security practices)
- [ ] **Trust center** (SOC 2 reports, privacy practices)
- [ ] **Bug bounty program** (HackerOne, Bugcrowd)
- [ ] **Responsible disclosure policy** for security vulnerabilities

---

## 📊 Compliance by Jurisdiction

### Australia (Primary Market)
- [x] Australian Privacy Principles (APPs) ✅ Planned
- [ ] Spam Act 2003
- [ ] Australian Consumer Law (ACL)
- [ ] Australian Competition and Consumer Commission (ACCC) guidelines
- [ ] AUSTRAC reporting (if large transactions)
- [ ] Notifiable Data Breaches (NDB) scheme

### United States
- [ ] TCPA (SMS compliance)
- [ ] CAN-SPAM Act (email compliance)
- [ ] CCPA/CPRA (California)
- [ ] Virginia CDPA (Virginia privacy law)
- [ ] Colorado Privacy Act (CPA)
- [ ] Connecticut Data Privacy Act
- [ ] State-specific data breach notification laws (all 50 states)

### European Union / United Kingdom
- [ ] GDPR (EU/UK)
- [ ] ePrivacy Directive (Cookie consent)
- [ ] UK Data Protection Act 2018
- [ ] UK ICO registration (if processing UK data)

### Canada
- [ ] CASL (Canadian Anti-Spam Legislation)
- [ ] PIPEDA (Personal Information Protection and Electronic Documents Act)

---

## 🛠️ Recommended Tools & Services

### Legal & Compliance
- **Termly** - Privacy policy, Terms generator (starting point)
- **OneTrust** - Enterprise compliance management
- **TrustArc** - Privacy compliance platform
- **Ironclad** - Contract management
- **LawPath** (Australia) - Legal documentation and compliance

### Security & Monitoring
- **Snyk** - Dependency vulnerability scanning
- **OWASP ZAP** - Web application security testing
- **Burp Suite** - Penetration testing
- **Vanta** - SOC 2 compliance automation
- **Drata** - Continuous compliance monitoring
- **1Password** / **Bitwarden** - Secrets management

### Privacy & Consent Management
- **OneTrust Cookie Consent** - Cookie banners
- **Cookiebot** - GDPR cookie compliance
- **Osano** - Consent management platform
- **Termly** - Cookie scanner

### SMS/Email Compliance
- **Twilio** (already using) - Built-in carrier compliance
- **Resend** (already using) - CAN-SPAM compliant
- **ZeroBounce** - Email validation and compliance
- **Hiya Protect** - STIR/SHAKEN compliance (phone number reputation)

### Sanctions Screening
- **ComplyAdvantage** - AML and sanctions screening
- **Jumio** - KYC/identity verification
- **Trulioo** - Global identity verification
- **OFAC Sanctions List API** - Free government screening

---

## 💰 Estimated Costs (Annual)

| Category | Estimated Cost (AUD) |
|----------|---------------------|
| Business Registration & Trademarks | $2,000 - $5,000 |
| Legal Consultation (attorney review) | $5,000 - $15,000 |
| Insurance (PI, Cyber, Public Liability) | $3,000 - $10,000 |
| SOC 2 Type II Audit (if needed) | $20,000 - $50,000 |
| Privacy/Compliance Software | $5,000 - $20,000 |
| Security Tools & Audits | $3,000 - $10,000 |
| **Total (excluding SOC 2)** | **$18,000 - $60,000** |
| **Total (including SOC 2)** | **$38,000 - $110,000** |

**Note:** Start with critical compliance (privacy, SMS, security basics) and scale up as revenue grows. SOC 2 is typically only needed for enterprise sales.

---

## 🚦 Priority Action Plan (First 90 Days)

### Week 1-2: Legal Foundation
1. Register business entity (Pepform Pty Ltd)
2. Obtain ABN and register for GST
3. Set up business bank account
4. Purchase business insurance (PI + Cyber)

### Week 3-4: Privacy & Data Protection
5. Finalize Privacy Policy (review with attorney)
6. Implement cookie consent banner
7. Set up GDPR consent mechanisms
8. Document data processing procedures

### Week 5-6: Messaging Compliance
9. Audit Twilio configuration for TCPA compliance
10. Implement opt-in/opt-out workflows
11. Create suppression list management
12. Test consent recording and retention

### Week 7-8: Security Hardening
13. Enable MFA on all admin accounts
14. Conduct initial vulnerability scan
15. Implement rate limiting on APIs
16. Review and rotate all API keys/secrets

### Week 9-10: Documentation & Policies
17. Finalize all legal documentation
18. Create compliance runbook
19. Set up compliance calendar
20. Train team (if applicable) on compliance

### Week 11-12: Testing & Launch Prep
21. Conduct internal compliance audit
22. Test data subject access request (DSAR) workflow
23. Test data breach notification procedure
24. Final attorney review of all legal docs

---

## ⚠️ Red Flags to Avoid

### Prohibited Practices
- ❌ **Never** send marketing SMS without explicit consent
- ❌ **Never** buy or rent email/SMS lists
- ❌ **Never** ignore unsubscribe requests
- ❌ **Never** share user data with third parties without disclosure
- ❌ **Never** store plaintext passwords or payment card data
- ❌ **Never** use pre-checked consent boxes
- ❌ **Never** send messages outside permitted hours (8am-9pm local time)
- ❌ **Never** spoof sender ID or caller ID
- ❌ **Never** operate in sanctioned countries
- ❌ **Never** ignore data breach incidents (must report within 72 hours under GDPR)

### High-Risk Activities to Monitor
- ⚠️ Cross-border data transfers (ensure adequacy mechanisms)
- ⚠️ Processing children's data (under 16 in EU, under 13 in US)
- ⚠️ Sensitive personal information (health, financial, biometric)
- ⚠️ Automated decision-making (requires GDPR disclosure)
- ⚠️ High-volume messaging (increased TCPA risk)

---

## 📞 Compliance Contacts & Resources

### Australian Regulators
- **OAIC (Office of the Australian Information Commissioner)** - Privacy: https://www.oaic.gov.au
- **ACMA (Australian Communications and Media Authority)** - Spam: https://www.acma.gov.au
- **ACCC (Australian Competition and Consumer Commission)** - Consumer law: https://www.accc.gov.au
- **AUSTRAC** - AML/CTF: https://www.austrac.gov.au

### International Regulators
- **FTC (US Federal Trade Commission)** - CAN-SPAM, TCPA: https://www.ftc.gov
- **ICO (UK Information Commissioner's Office)** - GDPR: https://ico.org.uk
- **CNIL (France)** - GDPR: https://www.cnil.fr
- **EDPB (European Data Protection Board)** - GDPR: https://edpb.europa.eu

### Legal Resources
- **LawPath** (Australia): https://lawpath.com.au
- **IAPP (International Association of Privacy Professionals)**: https://iapp.org
- **Privacy Shield Framework**: https://www.privacyshield.gov (replaced by EU-US DPF)

---

## ✅ Compliance Checklist Summary

**Total Items:** 150+
**Critical (Pre-Launch):** 40 items
**High Priority (3 months):** 35 items
**Medium Priority (6 months):** 25 items
**Ongoing:** 20+ items

**Recommended:** Engage a compliance attorney to review this checklist and customize it for your specific business model and target markets.

---

**Document Version:** 1.0
**Next Review Date:** April 2025
**Owner:** Pepform Pty Ltd
**Contact:** jarredkrowitz@gmail.com
