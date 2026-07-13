/* eslint-disable react/no-unescaped-entities */
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import Link from "next/link";

export const metadata = generateSEOMetadata(seoConfig.terms);

export default function Terms() {
  return (
    <ConsumerShell>
      <main id="main-content" className="mx-auto max-w-3xl px-5 pb-20 pt-12 sm:px-8 sm:pt-16">
        <nav className="mb-8 flex items-center gap-2 text-sm text-[#9aa39c]">
          <Link href="/" className="hover:text-[#0a7c42]">Refer Labs</Link>
          <span>/</span>
          <span className="text-[#2b362f]">Terms</span>
        </nav>

        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0a7c42]">Legal</p>
        <h1 className="mt-4 text-4xl font-bold leading-[1.07] tracking-[-0.01em] text-[#10251b] sm:text-5xl">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-[#9aa39c]">
          Last updated: 12 February 2026
        </p>

        <div className="mt-10 space-y-8">

            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">1. Acceptance of Terms</h2>
              <p className="text-[#2b362f] mb-3">
                These Terms of Service ("Terms") constitute a legally binding agreement between you ("User", "you", or "your") and Pepform Pty Ltd ("Pepform", "we", "us", or "our") governing your access to and use of the Pepform platform, services, software, and any related documentation (collectively, the "Service").
              </p>
              <p className="text-[#2b362f] mb-3">
                BY ACCESSING OR USING THE SERVICE, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS. IF YOU DO NOT AGREE TO THESE TERMS, YOU MAY NOT ACCESS OR USE THE SERVICE.
              </p>
              <p className="text-[#2b362f]">
                You represent and warrant that you have the legal capacity to enter into this agreement. If you are entering into these Terms on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these Terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">2. Description of Service</h2>
              <p className="text-[#2b362f] mb-3">
                Pepform provides a SaaS-based affiliate marketing and growth network platform that enables businesses to create, manage, track, and optimize customer affiliate programs through automated messaging, analytics, campaign management tools, hosted affiliate/handoff pages (/r/[code], /referral, /referred), and embeddable experiences for common CMS platforms.
              </p>
              <p className="text-[#2b362f]">
                The Service may include features such as SMS/WhatsApp messaging, email campaigns, customer data management, affiliate tracking, analytics dashboards, and integration capabilities. Pepform reserves the right to modify, suspend, or discontinue any aspect of the Service at any time without prior notice.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">3. Eligibility and Account Registration</h2>
              <p className="text-[#2b362f] mb-2">
                To use the Service, you must:
              </p>
              <ul className="list-disc list-inside text-[#2b362f] space-y-2 mb-3">
                <li>Be at least 18 years of age or the age of majority in your jurisdiction</li>
                <li>Operate a legitimate business or organization</li>
                <li>Provide accurate, current, and complete registration information</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security and confidentiality of your account credentials</li>
                <li>Be solely responsible for all activities occurring under your account</li>
                <li>Immediately notify us of any unauthorized access to your account</li>
              </ul>
              <p className="text-[#2b362f]">
                You may not transfer or share your account credentials with any third party. Pepform reserves the right to suspend or terminate accounts that violate these requirements.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">4. Prohibited Uses and Restricted Parties</h2>
              <p className="text-[#2b362f] mb-3 font-semibold">
                You agree NOT to use the Service for any unlawful, fraudulent, or prohibited purpose, including but not limited to:
              </p>

              <h3 className="text-lg font-bold text-[#10251b] mb-2">4.1 Prohibited Business Activities</h3>
              <ul className="list-disc list-inside text-[#2b362f] space-y-2 mb-4">
                <li>Illegal gambling, unlicensed gaming, or casino operations</li>
                <li>Multi-level marketing (MLM), pyramid schemes, or Ponzi schemes</li>
                <li>Cryptocurrency scams, pump-and-dump schemes, or fraudulent ICOs</li>
                <li>Adult entertainment, escort services, or pornography</li>
                <li>Illegal substances, controlled substances, or drug paraphernalia</li>
                <li>Weapons, firearms, explosives, or military equipment</li>
                <li>Counterfeit goods, intellectual property infringement, or trademark violations</li>
                <li>Money laundering, terrorist financing, or sanctions evasion</li>
                <li>Fake documents, identity theft services, or credential stuffing</li>
                <li>Human trafficking, forced labor, or exploitation</li>
                <li>Hate speech, discriminatory practices, or extremist content</li>
                <li>Unauthorized pharmaceutical sales or medical services</li>
                <li>Fraudulent investment schemes or financial scams</li>
                <li>High-yield investment programs (HYIPs) or get-rich-quick schemes</li>
              </ul>

              <h3 className="text-lg font-bold text-[#10251b] mb-2">4.2 Prohibited Technical Activities</h3>
              <ul className="list-disc list-inside text-[#2b362f] space-y-2 mb-4">
                <li>Sending spam, unsolicited communications, or violating CAN-SPAM Act/GDPR</li>
                <li>Phishing, social engineering, or fraudulent impersonation</li>
                <li>Deploying malware, viruses, ransomware, or malicious code</li>
                <li>Conducting DDoS attacks or network disruption</li>
                <li>Scraping, harvesting, or unauthorized data collection</li>
                <li>Reverse engineering, decompiling, or attempting to access source code</li>
                <li>Bypassing security measures, rate limits, or access controls</li>
                <li>Using automated bots, scripts, or crawlers without authorization</li>
                <li>Interfering with other users' access to the Service</li>
                <li>Exploiting vulnerabilities or conducting penetration testing without permission</li>
              </ul>

              <h3 className="text-lg font-bold text-[#10251b] mb-2">4.3 Compliance Violations</h3>
              <ul className="list-disc list-inside text-[#2b362f] space-y-2 mb-4">
                <li>Violating GDPR, CCPA, TCPA, CAN-SPAM, or other privacy regulations</li>
                <li>Violating OFAC sanctions, export controls, or trade restrictions</li>
                <li>Violating anti-money laundering (AML) or know-your-customer (KYC) requirements</li>
                <li>Sending messages to numbers on Do Not Call (DNC) registries without consent</li>
                <li>Failing to obtain proper consent for SMS/email marketing</li>
                <li>Violating telecommunications regulations or carrier guidelines</li>
                <li>Misrepresenting sender identity or spoofing caller ID</li>
              </ul>

              <h3 className="text-lg font-bold text-[#10251b] mb-2">4.4 Restricted Parties</h3>
              <p className="text-[#2b362f] mb-2">
                You may not use the Service if you or your organization:
              </p>
              <ul className="list-disc list-inside text-[#2b362f] space-y-2 mb-3">
                <li>Are located in or operating from sanctioned countries (e.g., North Korea, Iran, Syria, Cuba, Crimea)</li>
                <li>Appear on OFAC SDN list, UN sanctions list, or other restricted party lists</li>
                <li>Have been previously banned or suspended from the Service</li>
                <li>Are subject to active litigation or investigation related to fraud or illegal activity</li>
                <li>Have had previous accounts terminated for Terms violations</li>
              </ul>

              <h3 className="text-lg font-bold text-[#10251b] mb-2">4.5 Doxxing and Targeted Harms</h3>
              <p className="text-[#2b362f] mb-2">
                You must not use the Service to publish or distribute personal information with the intent to intimidate, menace, harass, or facilitate doxxing. We may suspend or terminate accounts and preserve evidence where we reasonably suspect doxxing or related misuse, and we may cooperate with law enforcement.
              </p>

              <p className="text-[#2b362f] font-semibold">
                Violation of this section will result in immediate account termination, forfeiture of all fees paid, and potential legal action. Pepform reserves the right to report violations to law enforcement authorities.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">5. User Content and Data Responsibilities</h2>
              <p className="text-[#2b362f] mb-2">
                You are solely responsible for all content, data, and information you upload, transmit, or store through the Service ("User Content"). You represent and warrant that:
              </p>
              <ul className="list-disc list-inside text-[#2b362f] space-y-2 mb-3">
                <li>You own or have the necessary rights, licenses, and consents to use and share all User Content</li>
                <li>You have obtained explicit, verifiable consent from all individuals before uploading their personal information</li>
                <li>Your User Content does not violate any laws, regulations, or third-party rights</li>
                <li>You have properly secured all customer data and comply with applicable privacy laws</li>
                <li>You will not upload false, misleading, or fraudulent information</li>
                <li>You maintain records of consent for all recipients of marketing messages</li>
              </ul>
              <p className="text-[#2b362f]">
                Pepform does not claim ownership of your User Content but requires a limited license to provide the Service. You grant Pepform a worldwide, non-exclusive, royalty-free license to use, process, and transmit your User Content solely for the purpose of providing and improving the Service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">6. SMS and Email Messaging Compliance</h2>
              <p className="text-[#2b362f] mb-2">
                By using our messaging features, you agree to:
              </p>
              <ul className="list-disc list-inside text-[#2b362f] space-y-2 mb-3">
                <li>Comply with all applicable laws including Spam Act 2003 (Cth), Do Not Call Register Act 2006 (Cth), TCPA, CAN-SPAM Act, GDPR, and carrier guidelines</li>
                <li>Obtain prior express consent (or express written consent where required) before sending marketing messages</li>
                <li>Provide clear opt-out mechanisms in every message (e.g., "Reply STOP to unsubscribe") that remain functional for at least 30 days</li>
                <li>Honor opt-out requests immediately and no later than 5 working days; maintain accurate suppression lists</li>
                <li>Not send messages to numbers on Do Not Call registries without proper exemption or consent</li>
                <li>Accurately identify yourself as the sender in all messages</li>
                <li>Not use shared short codes or spoofed sender IDs</li>
                <li>Maintain records of consent for a minimum of 4 years</li>
              </ul>
              <p className="text-[#2b362f] font-semibold">
                Violation of messaging compliance may result in carrier filtering, fines up to $1,500 per message under TCPA, immediate account suspension, and liability for all damages incurred by Pepform.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">7. Fees, Billing, and Payment Terms</h2>
              <p className="text-[#2b362f] mb-2">
                You agree to pay all fees associated with your use of the Service as outlined in your selected subscription plan. All fees are:
              </p>
              <ul className="list-disc list-inside text-[#2b362f] space-y-2 mb-3">
                <li>Non-refundable except as required by law or explicitly stated</li>
                <li>Charged in advance on a recurring basis (monthly or annually)</li>
                <li>Subject to change with 30 days' prior written notice</li>
                <li>Exclusive of all applicable taxes, which you are responsible for paying</li>
              </ul>
              <p className="text-[#2b362f] mb-3">
                If payment fails or your account becomes past due, Pepform may suspend or terminate your access to the Service. You remain liable for all unpaid fees plus interest at 1.5% per month or the maximum rate permitted by law, whichever is lower.
              </p>
              <p className="text-[#2b362f]">
                Pepform may offer promotional discounts or credit-based allowances at its discretion. Such promotions do not create any ongoing entitlement or expectation of continued free service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">8. Service Availability and Updates</h2>
              <p className="text-[#2b362f] mb-2">
                We continually evolve the Service, so please review your plan documents for the most current commitments. During these adjustments:
              </p>
              <ul className="list-disc list-inside text-[#2b362f] space-y-2 mb-3">
                <li>The Service is provided "AS IS" and "AS AVAILABLE" without warranties of any kind</li>
                <li>Features, functionality, and pricing may change with notice to customers</li>
                <li>Service availability, uptime, and performance are not guaranteed</li>
                <li>We may collect usage data, feedback, and analytics to improve the platform</li>
                <li>We may reset, modify, or delete experimental data at our discretion</li>
                <li>We may invite or restrict access to specialized programs at our sole discretion</li>
              </ul>
              <p className="text-[#2b362f]">
                Pepform may update, retire, or replace features as our roadmap evolves; we will communicate significant changes and any data preservation windows where feasible.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">8A. Affiliate Program and Commission Structure</h2>
              <p className="text-[#2b362f] mb-3">
                Refer Labs operates a affiliate partner program that allows ambassadors to earn commissions by referring new partners and clients to the platform. By participating as an ambassador, you agree to the following commission terms:
              </p>

              <h3 className="text-lg font-bold text-[#10251b] mb-2">8A.1 Commission Schedule</h3>
              <ul className="list-disc list-inside text-[#2b362f] space-y-2 mb-4">
                <li><strong>Partner Signup Bonus:</strong> $100 AUD per new partner who completes registration through your unique affiliate link and is verified by Refer Labs</li>
                <li><strong>Revenue Share:</strong> 10% commission on all subscription payments made by partners you refer, calculated on the gross payment amount (excluding taxes and fees)</li>
                <li><strong>Payout Threshold:</strong> Minimum balance of $500 AUD required to request a payout</li>
                <li><strong>Payment Terms:</strong> Payouts processed within 14 business days of approved payout requests</li>
                <li><strong>Currency:</strong> All commissions calculated and paid in Australian Dollars (AUD)</li>
              </ul>

              <h3 className="text-lg font-bold text-[#10251b] mb-2">8A.2 Commission Approval Process</h3>
              <p className="text-[#2b362f] mb-2">
                All commissions require manual approval to prevent fraud and ensure compliance:
              </p>
              <ul className="list-disc list-inside text-[#2b362f] space-y-2 mb-4">
                <li>Commissions are initially marked as "pending" upon the qualifying event (signup or payment)</li>
                <li>Refer Labs reviews and approves commissions within 3 business days</li>
                <li>Approved commissions become available for payout once they reach the minimum threshold</li>
                <li>Refer Labs reserves the right to withhold, reduce, or cancel commissions for suspected fraud, violation of terms, chargebacks, refunds, or invalid affiliates</li>
                <li>Commission disputes must be submitted in writing within 30 days of the commission event</li>
              </ul>

              <h3 className="text-lg font-bold text-[#10251b] mb-2">8A.3 Ambassador Obligations</h3>
              <p className="text-[#2b362f] mb-2">
                As an ambassador, you agree to:
              </p>
              <ul className="list-disc list-inside text-[#2b362f] space-y-2 mb-4">
                <li>Promote Refer Labs in good faith and comply with all applicable laws and regulations</li>
                <li>Not engage in fraudulent affiliates, self-referrals, or artificial inflation of commissions</li>
                <li>Not misrepresent the Service, pricing, or commission structure to potential affiliates</li>
                <li>Maintain accurate tax information and be responsible for all tax obligations on commission earnings</li>
                <li>Comply with advertising standards and obtain proper disclosures for sponsored content where required</li>
              </ul>

              <h3 className="text-lg font-bold text-[#10251b] mb-2">8A.4 Tax Reporting and Compliance</h3>
              <p className="text-[#2b362f] mb-3">
                <strong>Important:</strong> Commission earnings may be taxable income in your jurisdiction. You are solely responsible for:
              </p>
              <ul className="list-disc list-inside text-[#2b362f] space-y-2 mb-4">
                <li>Reporting all commission income to tax authorities as required by law</li>
                <li>Paying all applicable income taxes, VAT, GST, or other taxes on commission earnings</li>
                <li>Providing accurate tax identification information (ABN for Australian businesses, TFN where applicable)</li>
                <li>Maintaining records of commission earnings for tax reporting purposes</li>
              </ul>
              <p className="text-[#2b362f] mb-4">
                For Australian ambassadors earning over $75,000 AUD annually, GST may apply to commission payments. For ambassadors in countries requiring tax reporting (such as 1099-NEC forms in the United States), Refer Labs will issue required tax documentation for earnings exceeding applicable thresholds. You are required to provide valid tax information upon request.
              </p>

              <h3 className="text-lg font-bold text-[#10251b] mb-2">8A.5 Commission Modifications</h3>
              <p className="text-[#2b362f] mb-4">
                Refer Labs reserves the right to modify commission rates, payout thresholds, and program terms at any time with 30 days' notice to active ambassadors. Changes will not affect commissions already earned and approved prior to the modification date.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">8B. Refund and Cancellation Policy</h2>

              <h3 className="text-lg font-bold text-[#10251b] mb-2">8B.1 Subscription Cancellations</h3>
              <p className="text-[#2b362f] mb-3">
                You may cancel your subscription at any time by contacting support at jarred@referlabs.com.au or through your account dashboard. Upon cancellation:
              </p>
              <ul className="list-disc list-inside text-[#2b362f] space-y-2 mb-4">
                <li>Your subscription will remain active until the end of the current billing period</li>
                <li>You will retain access to the Service until the end of the paid period</li>
                <li>No refunds will be provided for the unused portion of the current billing period unless required by law</li>
                <li>Recurring billing will be stopped and no further charges will be made</li>
                <li>Your account and data may be deleted 30 days after the subscription ends unless otherwise requested</li>
              </ul>

              <h3 className="text-lg font-bold text-[#10251b] mb-2">8B.2 Refund Eligibility</h3>
              <p className="text-[#2b362f] mb-3">
                Refunds are generally not provided except in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-[#2b362f] space-y-2 mb-4">
                <li><strong>Service Failure:</strong> If the Service is unavailable for more than 72 consecutive hours due to issues within Refer Labs' control, you may request a pro-rata refund for the downtime period</li>
                <li><strong>Billing Errors:</strong> If you were incorrectly charged due to a billing system error, the erroneous charge will be refunded in full</li>
                <li><strong>Duplicate Charges:</strong> If you were charged multiple times for the same billing period, duplicate charges will be refunded</li>
                <li><strong>Unauthorized Charges:</strong> If unauthorized charges were made to your account due to fraud or unauthorized access, charges will be refunded upon verification</li>
                <li><strong>Major Failures under Australian Consumer Law (ACL):</strong> If the Service fails to meet a consumer guarantee and the failure is major, you may cancel and obtain a refund for the unused portion or compensation for the reduction in value</li>
                <li><strong>Legal Requirements:</strong> Where required by applicable consumer protection laws (such as Australian Consumer Law)</li>
              </ul>

              <h3 className="text-lg font-bold text-[#10251b] mb-2">8B.3 Refund Process</h3>
              <p className="text-[#2b362f] mb-3">
                To request a refund, contact support at jarred@referlabs.com.au with:
              </p>
              <ul className="list-disc list-inside text-[#2b362f] space-y-2 mb-4">
                <li>Your account email and business name</li>
                <li>Invoice number or transaction ID</li>
                <li>Detailed explanation of why the refund is being requested</li>
                <li>Supporting documentation if applicable</li>
              </ul>
              <p className="text-[#2b362f] mb-4">
                Refund requests will be reviewed within 5 business days. Approved refunds will be processed to the original payment method within 14 business days. Refunds may take additional time to appear in your account depending on your financial institution.
              </p>

              <h3 className="text-lg font-bold text-[#10251b] mb-2">8B.4 Australian Consumer Law Rights</h3>
              <p className="text-[#2b362f] mb-4">
                Nothing in these Terms excludes, restricts, or modifies any consumer guarantee, right, or remedy under the Australian Consumer Law (ACL) or other applicable consumer protection legislation that cannot be excluded, restricted, or modified by agreement. If the Service fails to meet a consumer guarantee, you may be entitled to a remedy under the ACL.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">9. Intellectual Property Rights</h2>
              <p className="text-[#2b362f] mb-3">
                All intellectual property rights in the Service, including but not limited to software, algorithms, user interfaces, designs, trademarks, logos, documentation, and proprietary methodologies, are owned exclusively by Pepform or its licensors. These Terms do not grant you any ownership rights in the Service.
              </p>
              <p className="text-[#2b362f] mb-2">
                You are granted a limited, non-exclusive, non-transferable, revocable license to access and use the Service solely for your internal business purposes in accordance with these Terms. You may not:
              </p>
              <ul className="list-disc list-inside text-[#2b362f] space-y-2 mb-3">
                <li>Copy, modify, distribute, sell, or lease any part of the Service</li>
                <li>Reverse engineer, decompile, or attempt to extract source code</li>
                <li>Remove or alter any copyright, trademark, or proprietary notices</li>
                <li>Use Pepform's trademarks, logos, or branding without written permission</li>
                <li>Create derivative works based on the Service</li>
                <li>Frame, mirror, or republish any part of the Service</li>
              </ul>
              <p className="text-[#2b362f]">
                If you provide feedback, suggestions, or ideas about the Service, you grant Pepform an unlimited, irrevocable, perpetual, royalty-free license to use, implement, and commercialize such feedback without compensation or attribution.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">10. Privacy and Data Protection</h2>
              <p className="text-[#2b362f] mb-3">
                Your use of the Service is governed by our Privacy Policy, which is incorporated into these Terms by reference. You acknowledge that Pepform will process personal data in accordance with applicable privacy laws including the Australian Privacy Act 1988 (and Australian Privacy Principles), Spam Act 2003, GDPR, and CCPA.
              </p>
              <p className="text-[#2b362f] mb-3">
                For EU/UK users: Pepform acts as a data processor when handling customer data you upload. You are the data controller and are responsible for ensuring you have a lawful basis for processing and transferring personal data to Pepform.
              </p>
              <p className="text-[#2b362f]">
                Pepform implements reasonable security measures but cannot guarantee absolute security. You are responsible for implementing appropriate security practices for your account and data, including ensuring you have consent to transfer personal information overseas (e.g., to the United States) for hosting and processing.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">10A. Australian Privacy, Spam, and Consumer Compliance</h2>
              <ul className="list-disc list-inside text-[#2b362f] space-y-2 mb-3">
                <li><strong>Privacy Act 1988 (Cth) & APPs:</strong> We handle personal information in accordance with the Australian Privacy Principles. You must only upload data you are permitted to share and must give required privacy notices to individuals.</li>
                <li><strong>Spam Act 2003 & Do Not Call Register Act 2006:</strong> You must obtain consent before sending commercial electronic messages or calls via the Service. Include functional unsubscribe/STOP mechanisms, honour opt-outs immediately, and do not contact numbers on the Australian Do Not Call Register unless an exemption applies.</li>
                <li><strong>Australian Consumer Law (ACL):</strong> Nothing in these Terms limits your non-excludable consumer guarantees under the ACL. Remedies under the ACL apply in addition to any limitations stated here.</li>
                <li><strong>Overseas disclosures:</strong> Personal information may be processed outside Australia (e.g., United States). By using the Service, you consent to overseas transfers and must ensure your end customers are notified/consent where required.</li>
              </ul>
              <p className="text-[#2b362f]">If you have privacy concerns, you may contact us (Section 24) or lodge a complaint with the Office of the Australian Information Commissioner (oaic.gov.au).</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">10B. Data Processing & Security Commitments</h2>
              <ul className="list-disc list-inside text-[#2b362f] space-y-2 mb-3">
                <li><strong>Role allocation:</strong> For customer or end-recipient data you upload, you are the data controller; Pepform acts as data processor/service provider.</li>
                <li><strong>Lawful basis and notices:</strong> You must provide required notices under APP 5 and ensure a lawful basis/consent for processing and for overseas transfers under APP 8.</li>
                <li><strong>Security measures:</strong> We maintain reasonable technical and organisational measures (encryption in transit/at rest, RLS, backups, access controls) and review them periodically.</li>
                <li><strong>Breach handling:</strong> We will assess suspected eligible data breaches and, where required, notify affected users and the OAIC as soon as practicable, consistent with the Notifiable Data Breaches scheme.</li>
                <li><strong>Subprocessors:</strong> We use vetted subprocessors (e.g., Supabase, Twilio, Resend, Vercel, OpenAI) bound by written terms that limit use to providing the Service.</li>
                <li><strong>Data subject/consumer requests:</strong> We will reasonably assist you in responding to privacy rights requests where the data relates to your end users.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">11. Third-Party Services and Integrations</h2>
              <p className="text-[#2b362f] mb-3">
                The Service may integrate with or rely on third-party services including Twilio (SMS), Resend (email), Supabase (database), and Vercel (hosting). Your use of these third-party services may be subject to their respective terms of service.
              </p>
              <p className="text-[#2b362f]">
                Pepform is not responsible for the availability, performance, or actions of third-party services. Any disputes with third-party providers are solely between you and that provider. Pepform disclaims all liability for third-party service failures or interruptions.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">12. Service Level and Uptime</h2>
              <p className="text-[#2b362f] mb-3">
                While Pepform strives to maintain high availability, we do not guarantee uninterrupted access to the Service. Pepform may suspend the Service for maintenance, upgrades, security patches, or other operational reasons with or without notice.
              </p>
              <p className="text-[#2b362f]">
                Pepform is not liable for any downtime, data loss, or business interruption caused by service outages, force majeure events, third-party failures, or circumstances beyond our reasonable control.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">13. Indemnification</h2>
              <p className="text-[#2b362f] mb-3">
                You agree to indemnify, defend, and hold harmless Pepform, its affiliates, officers, directors, employees, agents, and licensors from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising from:
              </p>
              <ul className="list-disc list-inside text-[#2b362f] space-y-2">
                <li>Your use or misuse of the Service</li>
                <li>Your violation of these Terms or applicable laws</li>
                <li>Your User Content or data you upload to the Service</li>
                <li>Your violation of any third-party rights including intellectual property or privacy rights</li>
                <li>Your marketing messages sent through the Service</li>
                <li>Any claims brought by your customers, ambassadors, or message recipients</li>
                <li>Your breach of compliance obligations including TCPA, CAN-SPAM, or GDPR</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">14. Disclaimer of Warranties</h2>
              <p className="text-[#2b362f] mb-3 uppercase font-bold">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY.
              </p>
              <p className="text-[#2b362f] mb-2">
                PEPFORM EXPRESSLY DISCLAIMS ALL WARRANTIES INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc list-inside text-[#2b362f] space-y-2 mb-3">
                <li>IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT</li>
                <li>WARRANTIES REGARDING ACCURACY, RELIABILITY, OR COMPLETENESS OF THE SERVICE</li>
                <li>WARRANTIES THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE</li>
                <li>WARRANTIES THAT DEFECTS WILL BE CORRECTED</li>
                <li>WARRANTIES REGARDING THE RESULTS OBTAINED FROM USING THE SERVICE</li>
              </ul>
              <p className="text-[#2b362f]">
                No advice or information obtained from Pepform shall create any warranty not expressly stated in these Terms. Some jurisdictions do not allow the exclusion of implied warranties, so some of the above exclusions may not apply to you. Nothing in this section limits any non-excludable consumer guarantees under the ACL.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">15. Limitation of Liability</h2>
              <p className="text-[#2b362f] mb-3 uppercase font-bold">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, PEPFORM SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc list-inside text-[#2b362f] space-y-2 mb-3">
                <li>LOSS OF PROFITS, REVENUE, DATA, GOODWILL, OR BUSINESS OPPORTUNITIES</li>
                <li>BUSINESS INTERRUPTION OR SERVICE DOWNTIME</li>
                <li>COST OF SUBSTITUTE SERVICES OR PROCUREMENT</li>
                <li>REGULATORY FINES OR PENALTIES RESULTING FROM YOUR USE OF THE SERVICE</li>
                <li>DAMAGES ARISING FROM THIRD-PARTY CLAIMS OR ACTIONS</li>
              </ul>
              <p className="text-[#2b362f] mb-3 font-bold">
                SUBJECT TO ANY NON-EXCLUDABLE RIGHTS (INCLUDING UNDER THE ACL), PEPFORM'S TOTAL AGGREGATE LIABILITY IS CAPPED AT THE GREATER OF (A) THE AMOUNT YOU PAID TO PEPFORM IN THE 12 MONTHS PRECEDING THE CLAIM, OR (B) $100 AUD.
              </p>
              <p className="text-[#2b362f]">
                This limitation applies regardless of the legal theory (contract, tort, negligence, strict liability, or otherwise) and even if Pepform has been advised of the possibility of such damages. Some jurisdictions do not allow limitations on liability, so some of the above may not apply to you. To the extent permitted by law, this limitation does not apply to liability that cannot be limited under the ACL (including guarantees for services) or to losses caused by our gross negligence, fraud, or wilful misconduct. Where the ACL applies and permits limitation, our liability is limited to resupplying the services or paying the cost of resupply.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">16. Termination and Suspension</h2>
              <p className="text-[#2b362f] mb-3">
                Pepform reserves the right to suspend or terminate your access to the Service immediately, without prior notice or liability, for any reason including but not limited to:
              </p>
              <ul className="list-disc list-inside text-[#2b362f] space-y-2 mb-3">
                <li>Breach of these Terms or applicable laws</li>
                <li>Fraudulent, abusive, or illegal activity</li>
                <li>Non-payment of fees</li>
                <li>Excessive use that impacts Service performance</li>
                <li>Complaints from message recipients or carriers</li>
                <li>At our sole discretion for operational or business reasons</li>
              </ul>
              <p className="text-[#2b362f] mb-3">
                You may terminate your account at any time by contacting support. Upon termination:
              </p>
              <ul className="list-disc list-inside text-[#2b362f] space-y-2 mb-3">
                <li>Your access to the Service will cease immediately</li>
                <li>You remain liable for all outstanding fees and obligations</li>
                <li>We may delete your User Content after 30 days unless legally required to retain it</li>
                <li>No refunds will be provided for pre-paid fees unless required by law</li>
                <li>Provisions that by their nature should survive (indemnification, limitation of liability, etc.) will continue to apply</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">17. Modifications to Terms and Service</h2>
              <p className="text-[#2b362f] mb-3">
                Pepform reserves the right to modify these Terms at any time in our sole discretion. We will provide notice of material changes by:
              </p>
              <ul className="list-disc list-inside text-[#2b362f] space-y-2 mb-3">
                <li>Posting updated Terms on our website with a new "Last updated" date</li>
                <li>Sending email notification to your registered email address</li>
                <li>Displaying a notification within the Service</li>
              </ul>
              <p className="text-[#2b362f] mb-3">
                Your continued use of the Service after modifications become effective constitutes your acceptance of the revised Terms. If you do not agree to the modifications, you must stop using the Service and terminate your account. Where required by law, material changes will give you a reasonable opportunity to terminate without penalty.
              </p>
              <p className="text-[#2b362f]">
                Pepform may also modify, suspend, or discontinue any aspect of the Service at any time without liability. We are not obligated to provide any specific features or maintain backwards compatibility.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">18. Dispute Resolution and Governing Law</h2>

              <h3 className="text-lg font-bold text-[#10251b] mb-2">18.1 Governing Law</h3>
              <p className="text-[#2b362f] mb-4">
                These Terms shall be governed by and construed in accordance with the laws of New South Wales, Australia, without regard to conflict of law principles. The United Nations Convention on Contracts for the International Sale of Goods shall not apply.
              </p>

              <h3 className="text-lg font-bold text-[#10251b] mb-2">18.2 Informal Dispute Resolution</h3>
              <p className="text-[#2b362f] mb-4">
                Before initiating formal proceedings, you agree to first attempt to resolve any dispute informally by contacting us at jarred@referlabs.com.au with a detailed description of the dispute. We will make good faith efforts to resolve the dispute within 30 days of notification.
              </p>

              <h3 className="text-lg font-bold text-[#10251b] mb-2">18.3 Jurisdiction and Venue</h3>
              <p className="text-[#2b362f] mb-4">
                If informal resolution fails, any dispute arising from these Terms or the Service shall be resolved exclusively in the courts located in Sydney, New South Wales, Australia. You irrevocably submit to the exclusive jurisdiction of those courts and waive any objection to venue or inconvenient forum. Service of notices may be effected by email to jarred@referlabs.com.au; a postal address for formal service is available on request.
              </p>

              <h3 className="text-lg font-bold text-[#10251b] mb-2">18.4 Time Limit for Claims</h3>
              <p className="text-[#2b362f] mb-4">
                Any claim relating to the Service must be filed within one (1) year after the cause of action arises, or such claim is permanently barred. This limitation period applies to the fullest extent permitted by applicable law.
              </p>

              <h3 className="text-lg font-bold text-[#10251b] mb-2">18.5 Class Action Waiver</h3>
              <p className="text-[#2b362f] mb-4">
                To the fullest extent permitted by law, you agree to bring any dispute against Refer Labs in your individual capacity only, and not as a plaintiff or class member in any purported class, representative, or collective proceeding. This waiver does not apply where prohibited by law, including under Australian Consumer Law.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">19. Export Controls and Sanctions Compliance</h2>
              <p className="text-[#2b362f] mb-3">
                The Service may be subject to export control laws and regulations including those of Australia, the United States, and the European Union. You agree not to use or access the Service in any country or jurisdiction subject to comprehensive sanctions, or if you are a restricted party under applicable sanctions regulations.
              </p>
              <p className="text-[#2b362f]">
                You represent that you are not located in, organized under the laws of, or owned or controlled by persons or entities in any sanctioned country, and that you are not on any restricted party list including the OFAC SDN list, EU sanctions list, or UN sanctions list.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">20. Assignment and Transfer</h2>
              <p className="text-[#2b362f] mb-3">
                You may not assign, transfer, delegate, or sublicense these Terms or your rights under these Terms without Pepform's prior written consent. Any attempted assignment in violation of this provision is void.
              </p>
              <p className="text-[#2b362f]">
                Pepform may freely assign or transfer these Terms and all rights and obligations hereunder in connection with a merger, acquisition, corporate reorganization, or sale of all or substantially all of our assets without your consent.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">21. Severability and Waiver</h2>
              <p className="text-[#2b362f] mb-3">
                If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable while preserving the parties' intent.
              </p>
              <p className="text-[#2b362f]">
                No waiver of any term or condition shall be deemed a continuing waiver or waiver of any other term. Pepform's failure to enforce any right or provision shall not constitute a waiver of such right or provision.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">22. Entire Agreement</h2>
              <p className="text-[#2b362f]">
                These Terms, together with our Privacy Policy and any other policies incorporated by reference, constitute the entire agreement between you and Pepform regarding the Service and supersede all prior agreements, understandings, negotiations, and discussions, whether oral or written. No representations, warranties, or inducements have been made by either party except as expressly stated herein.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">23. Force Majeure</h2>
              <p className="text-[#2b362f]">
                Pepform shall not be liable for any failure or delay in performance due to causes beyond our reasonable control including acts of God, natural disasters, war, terrorism, civil unrest, labor disputes, government actions, internet or telecommunications failures, third-party service outages, cyberattacks, or pandemics.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">24. Contact Information</h2>
              <p className="text-[#2b362f] mb-3">
                For questions, concerns, or notices regarding these Terms, please contact us at:
              </p>
              <div className="bg-[#e8f5ee] p-4 rounded-lg">
                <p className="text-[#2b362f] font-semibold">Pepform Pty Ltd (trading as Refer Labs)</p>
                <p className="text-[#2b362f]">ABN: 32 660 008 159</p>
                <p className="text-[#2b362f]">Email: <a href="mailto:jarred@referlabs.com.au" className="text-[#0a7c42] hover:underline">jarred@referlabs.com.au</a></p>
                <p className="text-[#2b362f]">Website: <a href="https://referlabs.com.au" className="text-[#0a7c42] hover:underline">referlabs.com.au</a></p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-amber-50 border-l-4 border-amber-500 rounded-lg">
              <p className="text-sm font-bold text-amber-900 mb-2">IMPORTANT NOTICE</p>
              <p className="text-sm text-amber-800">
                BY USING THE SERVICE, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS OF SERVICE. IF YOU DO NOT AGREE, YOU MUST IMMEDIATELY DISCONTINUE USE OF THE SERVICE.
              </p>
            </div>

        </div>
      </main>
    </ConsumerShell>
  );
}
