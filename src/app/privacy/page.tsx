/* eslint-disable react/no-unescaped-entities */
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import Link from "next/link";

export const metadata = generateSEOMetadata(seoConfig.privacy);

export default function Privacy() {
  return (
    <ConsumerShell>
      <main id="main-content" className="mx-auto max-w-3xl px-5 pb-20 pt-12 sm:px-8 sm:pt-16">
        <nav className="mb-8 flex items-center gap-2 text-sm text-[#9aa39c]">
          <Link href="/" className="hover:text-[#0a7c42]">Refer Labs</Link>
          <span>/</span>
          <span className="text-[#2b362f]">Privacy</span>
        </nav>

        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0a7c42]">Legal</p>
        <h1 className="mt-4 text-4xl font-bold leading-[1.07] tracking-[-0.01em] text-[#10251b] sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-[#9aa39c]">
          Last updated: 16 July 2026 · Version 2.4
        </p>

        <div className="mt-10 space-y-6">

            {/* Controller Information */}
            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">Data Controller</h2>
              <p className="text-[#2b362f] mb-2">
                Pepform Pty Ltd (trading as Refer Labs) is the data controller responsible for your personal information:
              </p>
              <ul className="list-none text-[#2b362f] space-y-1 pl-0">
                <li><strong>Entity:</strong> Pepform Pty Ltd (trading as Refer Labs)</li>
                <li><strong>ABN:</strong> 32 660 008 159</li>
                <li><strong>Email:</strong> <a href="mailto:jarred@referlabs.com.au" className="text-[#0a7c42] hover:underline">jarred@referlabs.com.au</a></li>
                <li><strong>Location:</strong> Australia</li>
                <li><strong>Privacy Officer:</strong> Available upon request via email</li>
              </ul>
            </div>

            {/* Information Collection */}
            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">1. Information We Collect</h2>

              <h3 className="text-lg font-semibold text-[#10251b] mt-4 mb-2">1.1 Information You Provide</h3>
              <ul className="list-disc list-inside text-[#2b362f] space-y-1">
                <li><strong>Contact Data:</strong> Email address and name, if you subscribe to the newsletter, buy from us, or send us an enquiry</li>
                
                
                <li><strong>Referral Attribution:</strong> Which page you came from when you follow a link to a provider, so a referral can be credited</li>
                <li><strong>Payment Data:</strong> Processed by Stripe (we do not store credit card details)</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#10251b] mt-4 mb-2">1.2 Automatically Collected Data</h3>
              <ul className="list-disc list-inside text-[#2b362f] space-y-1">
                <li><strong>Usage Data:</strong> Pages visited, features used, time spent</li>
                <li><strong>Device Data:</strong> Browser type, IP address, device type</li>
                <li><strong>Cookies:</strong> Authentication tokens, session identifiers (see Section 9)</li>
                <li><strong>Affiliate Attribution:</strong> UTM parameters, affiliate source tracking</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#10251b] mt-4 mb-2">1.3 Legal Basis for Processing</h3>
              <p className="text-[#2b362f]">We process your data based on:</p>
              <ul className="list-disc list-inside text-[#2b362f] space-y-1">
                <li><strong>Contract:</strong> To deliver anything you buy from us</li>
                <li><strong>Legitimate Interest:</strong> To improve our service, prevent fraud, and ensure security</li>
                <li><strong>Consent:</strong> For marketing communications such as our newsletter (where required)</li>
                <li><strong>Legal Obligation:</strong> To comply with tax, accounting, and legal requirements</li>
              </ul>
            </div>

            {/* How We Use Information */}
            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">2. How We Use Your Information</h2>
              <p className="text-[#2b362f] mb-2">We use collected information for:</p>
              <ul className="list-disc list-inside text-[#2b362f] space-y-1">
                <li><strong>Service Delivery:</strong> Publish the comparisons you read, deliver anything you purchase, and answer enquiries</li>
                <li><strong>Communications:</strong> Send transactional email such as receipts, and the newsletter if you subscribed</li>
                <li><strong>Customer Support:</strong> Respond to inquiries and troubleshoot issues</li>
                <li><strong>Improvements:</strong> Analyze usage patterns to enhance features and user experience</li>
                <li><strong>Security:</strong> Detect and prevent fraud, abuse, and security incidents</li>
                <li><strong>Legal Compliance:</strong> Meet tax, accounting, and regulatory obligations</li>
              </ul>
            </div>

            {/* Business Finance Enquiries */}
            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">2A. Business Finance Enquiries</h2>
              <p className="text-[#2b362f] mb-2">
                If you submit an enquiry through our <a href="/business-loans" className="text-[#0a7c42] hover:underline">business loans</a> section,
                additional handling applies. Refer Labs is an <strong>independent referrer, not a lender or credit provider</strong>, and does not
                provide credit assistance or credit advice.
              </p>
              <ul className="list-disc list-inside text-[#2b362f] space-y-1">
                <li><strong>What we collect:</strong> your contact details and high-level business information (such as loan amount band, business name, ABN, industry, revenue band and credit profile). We do <strong>not</strong> collect bank statements, identity documents, or account logins through this form.</li>
                <li><strong>Why:</strong> to understand your finance needs and, with your consent, pass your enquiry to lenders, and to finance brokers who submit applications to lenders, so it can be assessed.</li>
                <li><strong>Who we share it with:</strong> only the lenders and finance brokers relevant to your enquiry, and only as you consent. We record which consent wording you agreed to, together with the date, your IP address and browser, as proof of consent. We do not sell this data or use it for unrelated marketing.</li>
                <li><strong>Commission:</strong> if a lender we introduce you to funds your loan, that lender may pay us a commission. It does not change the rate or fees you are offered.</li>
                <li><strong>Your choices:</strong> you can withdraw consent, or ask us to access, correct or delete your enquiry, at any time by emailing <a href="mailto:jarred@referlabs.com.au" className="text-[#0a7c42] hover:underline">jarred@referlabs.com.au</a>. Once your details have been passed to a lender, that lender handles them under its own privacy policy.</li>
              </ul>
            </div>

            {/* Data Sharing */}
            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">3. Data Sharing and Third Parties</h2>

              <h3 className="text-lg font-semibold text-[#10251b] mt-4 mb-2">3.1 Service Providers</h3>
              <p className="text-[#2b362f] mb-2">We share data with trusted service providers who process data on our behalf:</p>

              <div className="space-y-3">
                <div className="bg-[#f5f8f6] rounded-lg p-4">
                  <p className="font-semibold text-[#10251b] mb-1">Supabase (Database & Authentication)</p>
                  <ul className="text-sm text-[#2b362f] list-disc list-inside space-y-0.5">
                    <li><strong>Data Shared:</strong> All user and customer data</li>
                    <li><strong>Purpose:</strong> Database hosting, user authentication</li>
                    <li><strong>Location:</strong> United States (AWS US-East-1)</li>
                    <li><strong>Privacy Policy:</strong> <a href="https://supabase.com/privacy" className="text-[#0a7c42] hover:underline" target="_blank" rel="noopener">supabase.com/privacy</a></li>
                  </ul>
                </div>

                <div className="bg-[#f5f8f6] rounded-lg p-4">
                  <p className="font-semibold text-[#10251b] mb-1">Resend (Email Delivery)</p>
                  <ul className="text-sm text-[#2b362f] list-disc list-inside space-y-0.5">
                    <li><strong>Data Shared:</strong> Email addresses and the content of emails we send you</li>
                    <li><strong>Purpose:</strong> Deliver the newsletter and transactional email such as receipts</li>
                    <li><strong>Location:</strong> United States</li>
                    <li><strong>Privacy Policy:</strong> <a href="https://resend.com/legal/privacy-policy" className="text-[#0a7c42] hover:underline" target="_blank" rel="noopener">resend.com/legal/privacy-policy</a></li>
                  </ul>
                </div>

                <div className="bg-[#f5f8f6] rounded-lg p-4">
                  <p className="font-semibold text-[#10251b] mb-1">Stripe (Billing)</p>
                  <ul className="text-sm text-[#2b362f] list-disc list-inside space-y-0.5">
                    <li><strong>Data Shared:</strong> Billing contact info, payment method tokens (card data stays with Stripe)</li>
                    <li><strong>Purpose:</strong> Subscription billing and payouts</li>
                    <li><strong>Location:</strong> United States, global</li>
                    <li><strong>Privacy Policy:</strong> <a href="https://stripe.com/privacy" className="text-[#0a7c42] hover:underline" target="_blank" rel="noopener">stripe.com/privacy</a></li>
                  </ul>
                </div>

                <div className="bg-[#f5f8f6] rounded-lg p-4">
                  <p className="font-semibold text-[#10251b] mb-1">OpenAI (Message Features)</p>
                  <ul className="text-sm text-[#2b362f] list-disc list-inside space-y-0.5">
                    <li><strong>Data Shared:</strong> Message content for response generation (anonymized)</li>
                    <li><strong>Purpose:</strong> Generate campaign message suggestions</li>
                    <li><strong>Location:</strong> United States</li>
                    <li><strong>Note:</strong> No customer PII is sent; only anonymized prompts</li>
                    <li><strong>Privacy Policy:</strong> <a href="https://openai.com/privacy" className="text-[#0a7c42] hover:underline" target="_blank" rel="noopener">openai.com/privacy</a></li>
                  </ul>
                </div>

                <div className="bg-[#f5f8f6] rounded-lg p-4">
                  <p className="font-semibold text-[#10251b] mb-1">Vercel (Hosting)</p>
                  <ul className="text-sm text-[#2b362f] list-disc list-inside space-y-0.5">
                    <li><strong>Data Shared:</strong> Request logs, IP addresses</li>
                    <li><strong>Purpose:</strong> Application hosting and delivery</li>
                    <li><strong>Location:</strong> Global CDN (including US, EU, Asia-Pacific)</li>
                    <li><strong>Privacy Policy:</strong> <a href="https://vercel.com/legal/privacy-policy" className="text-[#0a7c42] hover:underline" target="_blank" rel="noopener">vercel.com/legal/privacy-policy</a></li>
                  </ul>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-[#10251b] mt-4 mb-2">3.2 Legal Requirements</h3>
              <p className="text-[#2b362f]">We may disclose your information if required by law, legal process, or to:</p>
              <ul className="list-disc list-inside text-[#2b362f] space-y-1">
                <li>Comply with valid legal requests from authorities</li>
                <li>Enforce our Terms of Service</li>
                <li>Protect our rights, property, or safety and that of our users</li>
                <li>Prevent fraud or security threats</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#10251b] mt-4 mb-2">3.3 Business Transfers</h3>
              <p className="text-[#2b362f]">
                In the event of a merger, acquisition, or sale of assets, your data may be transferred. You will be notified via email of any such change and your options.
              </p>
            </div>

            {/* International Transfers */}
            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">4. International Data Transfers</h2>
              <p className="text-[#2b362f] mb-2">
                Your data may be processed in countries outside Australia, including:
              </p>
              <ul className="list-disc list-inside text-[#2b362f] space-y-1">
                <li><strong>United States:</strong> AWS (via Supabase), Resend, OpenAI, Vercel</li>
                <li><strong>European Union/United Kingdom:</strong> CDN points of presence for Vercel and email delivery</li>
                <li><strong>Asia-Pacific:</strong> CDN points of presence for latency and redundancy</li>
              </ul>
              <p className="text-[#2b362f] mt-2">
                We ensure appropriate safeguards are in place through:
              </p>
              <ul className="list-disc list-inside text-[#2b362f] space-y-1">
                <li>Standard Contractual Clauses (SCCs) with service providers</li>
                <li>Service providers certified under privacy frameworks (Privacy Shield successor mechanisms)</li>
                <li>Adequacy decisions from relevant data protection authorities where applicable</li>
              </ul>
              <p className="text-[#2b362f] mt-2 text-sm">
                By using the Service, you consent to the overseas transfer of personal information. We take reasonable steps under APP 8 to ensure overseas recipients do not breach the Australian Privacy Principles, and you must ensure your own customers are notified and consent where required under the Privacy Act 1988 (APP 5/APP 8).
              </p>
            </div>

            {/* Data Retention */}
            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">5. Data Retention</h2>
              <p className="text-[#2b362f] mb-2">
                We retain your data for as long as necessary to provide our services:
              </p>
              <ul className="list-disc list-inside text-[#2b362f] space-y-1">
                <li><strong>Active Accounts:</strong> Retained while your account is active</li>
                <li><strong>Deleted Accounts:</strong> 30 days grace period, then permanently deleted</li>
                <li><strong>Customer Data:</strong> Deleted when you delete it or 30 days after account deletion</li>
                <li><strong>Affiliate Data:</strong> Retained for 7 years for tax/accounting compliance</li>
                <li><strong>Payment Records:</strong> Retained for 7 years for legal/tax requirements</li>
                <li><strong>Marketing Contacts:</strong> Deleted or suppressed within 5 business days after you or a recipient withdraws consent</li>
                <li><strong>Logs and Analytics:</strong> Retained for 90 days, then anonymized or deleted</li>
              </ul>
              <p className="text-[#2b362f] mt-2">
                <strong>Note:</strong> Certain data may be retained longer where required by law (e.g., financial records, fraud prevention).
              </p>
            </div>

            {/* Data Security */}
            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">6. Data Security</h2>
              <p className="text-[#2b362f] mb-2">We implement industry-standard security measures:</p>
              <ul className="list-disc list-inside text-[#2b362f] space-y-1">
                <li><strong>Encryption:</strong> All data encrypted in transit (TLS 1.3) and at rest (AES-256)</li>
                <li><strong>Access Control:</strong> Row Level Security (RLS) ensures users only access their own data</li>
                <li><strong>Authentication:</strong> Secure password hashing (bcrypt), OAuth 2.0 support</li>
                <li><strong>Infrastructure:</strong> Hosted on SOC 2 compliant infrastructure (Supabase/AWS)</li>
                <li><strong>Monitoring:</strong> 24/7 security monitoring and incident response</li>
                <li><strong>Backups:</strong> Daily automated backups with 30-day retention</li>
              </ul>
              <p className="text-[#2b362f] mt-2 text-sm">
                <strong>Important:</strong> No security system is perfect. While we strive to protect your data, we cannot guarantee absolute security.
              </p>
            </div>

            {/* Notifiable Data Breaches (Australia) */}
            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">6A. Notifiable Data Breaches (Australia)</h2>
              <ul className="list-disc list-inside text-[#2b362f] space-y-1 mb-3">
                <li>We will promptly assess suspected eligible data breaches and aim to complete assessments within 30 days, as required by the Privacy Act 1988 (Cth).</li>
                <li>If an eligible data breach is likely to result in serious harm, we will notify affected individuals and the Office of the Australian Information Commissioner (OAIC) as soon as practicable.</li>
                <li>Notifications will include the nature of the breach, the kinds of information involved, recommended steps for individuals, and our contact details.</li>
                <li>You must promptly inform us of any suspected breach involving data you control and cooperate with our investigation and notifications.</li>
              </ul>
              <p className="text-[#2b362f] text-sm">
                Report incidents or concerns to <a href="mailto:jarred@referlabs.com.au" className="text-[#0a7c42] hover:underline">jarred@referlabs.com.au</a> using the subject line "Data Breach - Urgent".
              </p>
            </div>

            {/* Your Rights */}
            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">7. Your Privacy Rights</h2>
              <p className="text-[#2b362f] mb-2">
                Under GDPR, Australian Privacy Principles (APPs), and other privacy laws, you have the following rights:
              </p>

              <div className="space-y-3">
                <div className="bg-[#f5f8f6] rounded-lg p-4">
                  <p className="font-semibold text-[#10251b] mb-1">Right to Access</p>
                  <p className="text-sm text-[#2b362f]">Request a copy of your personal data we hold. Email us and we will provide it.</p>
                </div>

                <div className="bg-[#f5f8f6] rounded-lg p-4">
                  <p className="font-semibold text-[#10251b] mb-1">Right to Rectification</p>
                  <p className="text-sm text-[#2b362f]">Correct any inaccurate or incomplete data by contacting us.</p>
                </div>

                <div className="bg-[#f5f8f6] rounded-lg p-4">
                  <p className="font-semibold text-[#10251b] mb-1">Right to Erasure ("Right to be Forgotten")</p>
                  <p className="text-sm text-[#2b362f]">Request deletion of your personal data. Note: Some data may be retained for legal/compliance reasons.</p>
                </div>

                <div className="bg-[#f5f8f6] rounded-lg p-4">
                  <p className="font-semibold text-[#10251b] mb-1">Right to Data Portability</p>
                  <p className="text-sm text-[#2b362f]">Ask us and we will provide the personal data you gave us in a portable format.</p>
                </div>

                <div className="bg-[#f5f8f6] rounded-lg p-4">
                  <p className="font-semibold text-[#10251b] mb-1">Right to Object</p>
                  <p className="text-sm text-[#2b362f]">Object to processing based on legitimate interests, including for marketing purposes.</p>
                </div>

                <div className="bg-[#f5f8f6] rounded-lg p-4">
                  <p className="font-semibold text-[#10251b] mb-1">Right to Restrict Processing</p>
                  <p className="text-sm text-[#2b362f]">Request limitation of processing in certain circumstances (e.g., while disputing accuracy).</p>
                </div>

                <div className="bg-[#f5f8f6] rounded-lg p-4">
                  <p className="font-semibold text-[#10251b] mb-1">Right to Withdraw Consent</p>
                  <p className="text-sm text-[#2b362f]">Unsubscribe from marketing email at any time using the link in any email, or by contacting us.</p>
                </div>

                <div className="bg-[#f5f8f6] rounded-lg p-4">
                  <p className="font-semibold text-[#10251b] mb-1">Right to Lodge a Complaint</p>
                  <p className="text-sm text-[#2b362f]">
                    Contact your data protection authority:
                    <br />
                    <strong>Australia:</strong> Office of the Australian Information Commissioner (OAIC) - <a href="https://www.oaic.gov.au" className="text-[#0a7c42] hover:underline" target="_blank" rel="noopener">oaic.gov.au</a>
                    <br />
                    <strong>EU:</strong> Your local Data Protection Authority
                  </p>
                </div>
              </div>

              <p className="text-[#2b362f] mt-4">
                <strong>To exercise your rights:</strong> Email <a href="mailto:jarred@referlabs.com.au" className="text-[#0a7c42] hover:underline">jarred@referlabs.com.au</a> with "Privacy Rights Request" in the subject line. We will respond within 30 days.
              </p>
            </div>

            {/* Direct Marketing & Australian Spam Compliance */}
            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">7B. Direct Marketing & Australian Spam Compliance</h2>
              <ul className="list-disc list-inside text-[#2b362f] space-y-1 mb-3">
                <li>We comply with the Australian Spam Act 2003 and Do Not Call Register Act 2006. Commercial electronic messages require consent and must include a functional unsubscribe/STOP mechanism.</li>
                <li>Unsubscribes must remain functional for at least 30 days and be actioned within 5 working days. We enforce this SLA in our systems.</li>
                <li>If you use our platform to message your customers, you are responsible for obtaining and recording their consent, honouring opt-outs immediately (no later than 5 working days), and avoiding numbers on the Australian Do Not Call Register unless an exemption applies.</li>
                <li>For EU/UK customers, direct marketing is based on consent or legitimate interests; you must provide opt-out options in every message.</li>
                <li>Unsubscribe/opt-out instructions are included in our templates; removing them may result in suspension.</li>
              </ul>
              <p className="text-[#2b362f] text-sm">
                You can withdraw your marketing consent at any time using the unsubscribe link in any email, or by emailing us.
              </p>
            </div>

            {/* CCPA California Privacy Rights */}
            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">7A. California Privacy Rights (CCPA)</h2>
              <p className="text-[#2b362f] mb-3">
                If you are a California resident, you have additional privacy rights under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA). This section supplements the information in Section 7.
              </p>

              <h3 className="text-lg font-semibold text-[#10251b] mt-4 mb-2">7A.1 California-Specific Rights</h3>
              <p className="text-[#2b362f] mb-2">California residents have the right to:</p>
              <ul className="list-disc list-inside text-[#2b362f] space-y-1 mb-3">
                <li><strong>Know:</strong> Request disclosure of personal information we collect, use, disclose, and sell (categories and specific pieces)</li>
                <li><strong>Delete:</strong> Request deletion of personal information we hold about you (subject to certain exceptions)</li>
                <li><strong>Opt-Out of Sale/Sharing:</strong> Opt out of the "sale" or "sharing" of your personal information for targeted advertising</li>
                <li><strong>Correct:</strong> Request correction of inaccurate personal information</li>
                <li><strong>Limit Use of Sensitive Personal Information:</strong> Limit our use of sensitive personal information to necessary business purposes</li>
                <li><strong>Non-Discrimination:</strong> Not be discriminated against for exercising your CCPA rights</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#10251b] mt-4 mb-2">7A.2 Do Not Sell or Share My Personal Information</h3>
              <p className="text-[#2b362f] mb-3">
                <strong>Important Notice:</strong> Refer Labs does NOT sell your personal information to third parties. We do NOT share your personal information for cross-context behavioral advertising (targeted advertising).
              </p>
              <p className="text-[#2b362f] mb-3">
                We only share data with service providers (listed in Section 3.1) who are contractually required to use data solely for providing services to us and are prohibited from selling or sharing your information.
              </p>

              <h3 className="text-lg font-semibold text-[#10251b] mt-4 mb-2">7A.3 Categories of Personal Information Collected</h3>
              <p className="text-[#2b362f] mb-2">In the past 12 months, we have collected the following categories of personal information from California residents:</p>
              <ul className="list-disc list-inside text-[#2b362f] space-y-1 mb-3">
                <li><strong>Identifiers:</strong> Name, email address, IP address, unique identifiers</li>
                <li><strong>Commercial Information:</strong> Purchase history, subscription records, commission earnings</li>
                <li><strong>Internet Activity:</strong> Website interactions, usage patterns, affiliate link clicks</li>
                <li><strong>Professional Information:</strong> Business name, industry, job title (for B2B purposes)</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#10251b] mt-4 mb-2">7A.4 Business Purposes for Processing</h3>
              <p className="text-[#2b362f] mb-2">We use personal information for the following business purposes:</p>
              <ul className="list-disc list-inside text-[#2b362f] space-y-1 mb-3">
                <li>Providing and maintaining the Service</li>
                <li>Processing transactions and managing affiliate programs</li>
                <li>Communicating with you about your account and services</li>
                <li>Detecting, preventing, and responding to security incidents and fraud</li>
                <li>Debugging and repairing errors</li>
                <li>Internal research for technological development and demonstration</li>
                <li>Compliance with legal obligations</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#10251b] mt-4 mb-2">7A.5 Exercising Your California Rights</h3>
              <p className="text-[#2b362f] mb-2">
                To exercise your CCPA rights, contact us at:
              </p>
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-200 mb-3">
                <p className="text-[#2b362f]">
                  <strong>Email:</strong> <a href="mailto:jarred@referlabs.com.au" className="text-[#0a7c42] hover:underline">jarred@referlabs.com.au</a>
                  <br />
                  <strong>Subject Line:</strong> "CCPA Privacy Rights Request"
                  <br />
                  <strong>Required Information:</strong> Your name, email address, description of request, and sufficient information to verify your identity
                </p>
              </div>
              <p className="text-[#2b362f] mb-3">
                We will acknowledge your request within 10 business days and respond within 45 days (extendable by 45 additional days if necessary). We will not discriminate against you for exercising your CCPA rights.
              </p>

              <h3 className="text-lg font-semibold text-[#10251b] mt-4 mb-2">7A.6 Authorized Agent Requests</h3>
              <p className="text-[#2b362f] mb-3">
                You may designate an authorized agent to make a CCPA request on your behalf. The agent must provide proof of authorization (signed permission) and you may be required to verify your identity directly with us.
              </p>

              <h3 className="text-lg font-semibold text-[#10251b] mt-4 mb-2">7A.7 Retention Periods</h3>
              <p className="text-[#2b362f] mb-3">
                We retain personal information for as long as necessary to fulfill the purposes described in this Privacy Policy, unless a longer retention period is required or permitted by law. See Section 5 for specific retention periods.
              </p>
            </div>

            {/* Email Communications */}
            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">8. Email Communications & Consent</h2>
              <p className="text-[#2b362f] mb-2">
                We do not send SMS, WhatsApp or voice messages. The only messages we send are email:
              </p>
              <ul className="list-disc list-inside text-[#2b362f] space-y-1">
                <li><strong>Transactional:</strong> receipts, access details and replies relating to something you bought or asked us for. We send these because you asked us to.</li>
                <li><strong>Newsletter:</strong> sent only if you subscribe. Every one carries a working unsubscribe link.</li>
                <li><strong>Opt-out:</strong> unsubscribe from any marketing email, or email jarred@referlabs.com.au and we will remove you.</li>
                <li><strong>Our role:</strong> we are the data controller for the email address you give us. We do not sell it or share it for anyone else's marketing.</li>
              </ul>
            </div>

            {/* Cookies */}
            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">9. Cookies and Tracking</h2>

              <h3 className="text-lg font-semibold text-[#10251b] mt-4 mb-2">9.1 Cookie Consent</h3>
              <p className="text-[#2b362f] mb-3">
                When you first visit our website, you'll see a cookie consent banner that allows you to choose which types of cookies you want to accept. You can:
              </p>
              <ul className="list-disc list-inside text-[#2b362f] space-y-1 mb-3">
                <li><strong>Accept All:</strong> Consent to all cookie categories</li>
                <li><strong>Necessary Only:</strong> Accept only essential cookies required for the site to function</li>
                <li><strong>Customize:</strong> Choose specific cookie categories based on your preferences</li>
              </ul>
              <p className="text-[#2b362f] mb-3">
                Your cookie preferences are stored in your browser's local storage and will be remembered for future visits. You can change or withdraw your choice at any time using the <strong>Cookie Preferences</strong> link in the site footer.
              </p>

              <h3 className="text-lg font-semibold text-[#10251b] mt-4 mb-2">9.2 Essential Cookies (Always Active)</h3>
              <p className="text-[#2b362f] mb-2">These cookies are necessary for the website to function and cannot be disabled:</p>
              <ul className="list-disc list-inside text-[#2b362f] space-y-1 mb-3">
                <li><strong>Authentication (sb-*-auth-token):</strong> Session management and user authentication - 30 days</li>
                <li><strong>Affiliate Attribution (ref_ambassador):</strong> Tracks referral source for commission attribution - 30 days</li>
                <li><strong>Cookie Consent (referlabs_cookie_consent):</strong> Stores your cookie preferences - Persistent</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#10251b] mt-4 mb-2">9.3 Analytics Cookies (Optional)</h3>
              <p className="text-[#2b362f] mb-3">
                We use Google Analytics 4 (provided by Google LLC) to understand which comparisons and guides people
                actually find useful. These cookies are <strong>off by default</strong>. They are only set if you choose
                &ldquo;Accept all&rdquo; or switch Analytics on in the cookie banner:
              </p>
              <ul className="list-disc list-inside text-[#2b362f] space-y-1 mb-3">
                <li><strong>What it collects:</strong> pages viewed, approximate location, device and browser type, and clicks on affiliate links (_ga, _ga_* - up to 2 years)</li>
                <li><strong>What we do with it:</strong> aggregated reporting only, to decide what to write next. We do not sell it and we do not use it to identify you personally</li>
                <li><strong>Until you agree:</strong> Google Consent Mode keeps analytics storage denied, so no analytics cookies are written</li>
                <li><strong>Changing your mind:</strong> use the Cookie Preferences link in the footer at any time</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#10251b] mt-4 mb-2">9.4 Cookieless Analytics (No Cookies, No Consent Needed)</h3>
              <p className="text-[#2b362f] mb-3">
                Separately from the optional cookies above, we use two <strong>cookieless</strong>, privacy-first analytics
                services. They set no cookies, build no personal profiles, and do not track you across other websites.
                Because they store nothing on your device and are not used to identify you, they run without a consent prompt:
              </p>
              <ul className="list-disc list-inside text-[#2b362f] space-y-1 mb-3">
                <li><strong>Vercel Analytics</strong> (Vercel Inc.): aggregate page-view counts and site performance, so we can see real traffic even from visitors who decline analytics cookies.</li>
                <li><strong>Searchable Analytics</strong>: aggregate page views and how AI search engines and other crawlers reach our pages, so we can improve how our guides are discovered. It runs both in your browser (cookieless) and on our server, where it records request details such as the page requested, timestamp and browser type, together with a <strong>truncated, anonymised IP address</strong> (the last part is removed). We do not use it to identify you and we do not sell this data.</li>
              </ul>
              <p className="text-[#2b362f] mb-3 text-sm">
                These providers act as data processors on our behalf. If any analytics service ever begins setting cookies or collecting data that could identify you, we will move it behind the consent banner and update this policy first.
              </p>

              <h3 className="text-lg font-semibold text-[#10251b] mt-4 mb-2">9.5 Marketing Cookies (Optional)</h3>
              <p className="text-[#2b362f] mb-3">
                We currently do <strong>not</strong> use marketing or advertising cookies. Any future use will require your consent and will be clearly disclosed.
              </p>
              <p className="text-[#2b362f] mb-3 text-sm">
                Where consent is legally required for non-essential cookies/local storage, we will obtain it before activation and update this policy and the banner accordingly.
              </p>

              <h3 className="text-lg font-semibold text-[#10251b] mt-4 mb-2">9.6 Managing Cookies</h3>
              <p className="text-[#2b362f] mb-2">
                You can control cookies in several ways:
              </p>
              <ul className="list-disc list-inside text-[#2b362f] space-y-1 mb-3">
                <li><strong>Cookie Banner:</strong> Use our cookie consent banner when you first visit the site</li>
                <li><strong>Browser Settings:</strong> Most browsers allow you to refuse or delete cookies through settings</li>
                <li><strong>Contact Us:</strong> Email us at jarred@referlabs.com.au to update your cookie preferences</li>
              </ul>
              <p className="text-[#2b362f] bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm">
                <strong>Important:</strong> Disabling essential cookies will prevent core functionality and you will not be able to use the service properly.
              </p>
            </div>

            {/* Children's Privacy */}
            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">10. Children's Privacy</h2>
              <p className="text-[#2b362f]">
                Our Service is intended for business use only and not directed to individuals under 18 years of age. We do not knowingly collect personal information from children under 18. If you become aware that a child has provided us with personal data, please contact us immediately and we will delete such information.
              </p>
            </div>

            {/* Changes to Policy */}
            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">11. Changes to This Policy</h2>
              <p className="text-[#2b362f]">
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Material changes will be communicated via:
              </p>
              <ul className="list-disc list-inside text-[#2b362f] space-y-1">
                <li>Email notification to your account email</li>
                <li>Prominent notice in the dashboard</li>
                <li>Updated "Last updated" date at the top of this policy</li>
              </ul>
              <p className="text-[#2b362f] mt-2">
                Continued use of the service after changes constitutes acceptance of the updated policy.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-2xl font-bold text-[#10251b] mb-4">12. Contact Us</h2>
              <p className="text-[#2b362f] mb-2">
                For questions, concerns, or to exercise your privacy rights, contact us at:
              </p>
              <div className="bg-[#e8f5ee] rounded-lg p-4 border border-[#cfe6da]">
                <p className="text-[#2b362f]">
                  <strong>Email:</strong> <a href="mailto:jarred@referlabs.com.au" className="text-[#0a7c42] hover:underline">jarred@referlabs.com.au</a>
                  <br />
                  <strong>Subject Line:</strong> Include "Privacy" for general questions or "Privacy Rights Request" for rights requests
                  <br />
                  <strong>Response Time:</strong> We aim to respond within 5 business days for general inquiries, 30 days for rights requests
                </p>
              </div>
            </div>

        </div>
      </main>
    </ConsumerShell>
  );
}
