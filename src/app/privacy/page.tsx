/* eslint-disable react/no-unescaped-entities */
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.privacy);

export default function Privacy() {
  return (
    <div className="aurora relative min-h-screen overflow-hidden bg-gradient-to-b from-purple-50 via-white to-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(124,58,237,0.08),transparent_32%),radial-gradient(circle_at_90%_10%,rgba(236,72,153,0.1),transparent_35%)]" />

      <main className="relative mx-auto flex max-w-4xl flex-col gap-12 px-6 pb-20 pt-8 md:px-10">

        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-purple-700 shadow-sm ring-1 ring-purple-200">
            Legal · GDPR Compliant
          </div>
          <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-500">
            Last updated: January 2025 · Version 2.0
          </p>
        </div>

        <div className="prose prose-slate max-w-3xl mx-auto">
          <section className="rounded-3xl bg-white/80 p-8 shadow-xl ring-1 ring-slate-100 backdrop-blur space-y-6">

            {/* Controller Information */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Data Controller</h2>
              <p className="text-slate-600 mb-2">
                Pepform Pty Ltd (trading as Refer Labs) is the data controller responsible for your personal information:
              </p>
              <ul className="list-none text-slate-600 space-y-1 pl-0">
                <li><strong>Entity:</strong> Pepform Pty Ltd (trading as Refer Labs)</li>
                <li><strong>ABN:</strong> 32 660 008 159</li>
                <li><strong>Email:</strong> <a href="mailto:jarred@referlabs.com.au" className="text-purple-700 hover:underline">jarred@referlabs.com.au</a></li>
                <li><strong>Location:</strong> Australia</li>
                <li><strong>Privacy Officer:</strong> Available upon request via email</li>
              </ul>
            </div>

            {/* Information Collection */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Information We Collect</h2>

              <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-2">1.1 Information You Provide</h3>
              <ul className="list-disc list-inside text-slate-600 space-y-1">
                <li><strong>Account Data:</strong> Email address, name, business name, password (encrypted)</li>
                <li><strong>Business Profile:</strong> Website URL, referral program settings, reward amounts</li>
                <li><strong>Customer Data:</strong> Names, email addresses, phone numbers you upload for your referral program</li>
                <li><strong>Referral Data:</strong> Referral codes, referral events, conversion tracking</li>
                <li><strong>Payment Data:</strong> Processed by Stripe (we do not store credit card details)</li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-2">1.2 Automatically Collected Data</h3>
              <ul className="list-disc list-inside text-slate-600 space-y-1">
                <li><strong>Usage Data:</strong> Pages visited, features used, time spent</li>
                <li><strong>Device Data:</strong> Browser type, IP address, device type</li>
                <li><strong>Cookies:</strong> Authentication tokens, session identifiers (see Section 9)</li>
                <li><strong>Referral Attribution:</strong> UTM parameters, referral source tracking</li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-2">1.3 Legal Basis for Processing</h3>
              <p className="text-slate-600">We process your data based on:</p>
              <ul className="list-disc list-inside text-slate-600 space-y-1">
                <li><strong>Contract:</strong> To provide our referral platform services</li>
                <li><strong>Legitimate Interest:</strong> To improve our service, prevent fraud, and ensure security</li>
                <li><strong>Consent:</strong> For SMS notifications and marketing communications (where required)</li>
                <li><strong>Legal Obligation:</strong> To comply with tax, accounting, and legal requirements</li>
              </ul>
            </div>

            {/* How We Use Information */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-slate-600 mb-2">We use collected information for:</p>
              <ul className="list-disc list-inside text-slate-600 space-y-1">
                <li><strong>Service Delivery:</strong> Provide referral tracking, campaign management, and analytics</li>
                <li><strong>Communications:</strong> Send transactional emails, referral notifications, and service updates</li>
                <li><strong>Customer Support:</strong> Respond to inquiries and troubleshoot issues</li>
                <li><strong>Improvements:</strong> Analyze usage patterns to enhance features and user experience</li>
                <li><strong>Security:</strong> Detect and prevent fraud, abuse, and security incidents</li>
                <li><strong>Legal Compliance:</strong> Meet tax, accounting, and regulatory obligations</li>
              </ul>
            </div>

            {/* Data Sharing */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Data Sharing and Third Parties</h2>

              <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-2">3.1 Service Providers</h3>
              <p className="text-slate-600 mb-2">We share data with trusted service providers who process data on our behalf:</p>

              <div className="space-y-3">
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="font-semibold text-slate-800 mb-1">Supabase (Database & Authentication)</p>
                  <ul className="text-sm text-slate-600 list-disc list-inside space-y-0.5">
                    <li><strong>Data Shared:</strong> All user and customer data</li>
                    <li><strong>Purpose:</strong> Database hosting, user authentication</li>
                    <li><strong>Location:</strong> United States (AWS US-East-1)</li>
                    <li><strong>Privacy Policy:</strong> <a href="https://supabase.com/privacy" className="text-purple-700 hover:underline" target="_blank" rel="noopener">supabase.com/privacy</a></li>
                  </ul>
                </div>

                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="font-semibold text-slate-800 mb-1">Resend (Email Delivery)</p>
                  <ul className="text-sm text-slate-600 list-disc list-inside space-y-0.5">
                    <li><strong>Data Shared:</strong> Email addresses, message content you create</li>
                    <li><strong>Purpose:</strong> Deliver campaign emails and transactional notifications</li>
                    <li><strong>Location:</strong> United States</li>
                    <li><strong>Privacy Policy:</strong> <a href="https://resend.com/legal/privacy-policy" className="text-purple-700 hover:underline" target="_blank" rel="noopener">resend.com/legal/privacy-policy</a></li>
                  </ul>
                </div>

                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="font-semibold text-slate-800 mb-1">OpenAI (AI Features)</p>
                  <ul className="text-sm text-slate-600 list-disc list-inside space-y-0.5">
                    <li><strong>Data Shared:</strong> Message content for AI generation (anonymized)</li>
                    <li><strong>Purpose:</strong> Generate campaign message suggestions</li>
                    <li><strong>Location:</strong> United States</li>
                    <li><strong>Note:</strong> No customer PII is sent; only anonymized prompts</li>
                    <li><strong>Privacy Policy:</strong> <a href="https://openai.com/privacy" className="text-purple-700 hover:underline" target="_blank" rel="noopener">openai.com/privacy</a></li>
                  </ul>
                </div>

                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="font-semibold text-slate-800 mb-1">Vercel (Hosting)</p>
                  <ul className="text-sm text-slate-600 list-disc list-inside space-y-0.5">
                    <li><strong>Data Shared:</strong> Request logs, IP addresses</li>
                    <li><strong>Purpose:</strong> Application hosting and delivery</li>
                    <li><strong>Location:</strong> Global CDN (including US, EU, Asia-Pacific)</li>
                    <li><strong>Privacy Policy:</strong> <a href="https://vercel.com/legal/privacy-policy" className="text-purple-700 hover:underline" target="_blank" rel="noopener">vercel.com/legal/privacy-policy</a></li>
                  </ul>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-2">3.2 Legal Requirements</h3>
              <p className="text-slate-600">We may disclose your information if required by law, legal process, or to:</p>
              <ul className="list-disc list-inside text-slate-600 space-y-1">
                <li>Comply with valid legal requests from authorities</li>
                <li>Enforce our Terms of Service</li>
                <li>Protect our rights, property, or safety and that of our users</li>
                <li>Prevent fraud or security threats</li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-2">3.3 Business Transfers</h3>
              <p className="text-slate-600">
                In the event of a merger, acquisition, or sale of assets, your data may be transferred. You will be notified via email of any such change and your options.
              </p>
            </div>

            {/* International Transfers */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. International Data Transfers</h2>
              <p className="text-slate-600 mb-2">
                Your data may be processed in countries outside Australia, including:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-1">
                <li><strong>United States:</strong> AWS (via Supabase), Resend, OpenAI, Vercel</li>
              </ul>
              <p className="text-slate-600 mt-2">
                We ensure appropriate safeguards are in place through:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-1">
                <li>Standard Contractual Clauses (SCCs) with service providers</li>
                <li>Service providers certified under privacy frameworks (Privacy Shield successor mechanisms)</li>
                <li>Adequacy decisions from relevant data protection authorities where applicable</li>
              </ul>
            </div>

            {/* Data Retention */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Data Retention</h2>
              <p className="text-slate-600 mb-2">
                We retain your data for as long as necessary to provide our services:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-1">
                <li><strong>Active Accounts:</strong> Retained while your account is active</li>
                <li><strong>Deleted Accounts:</strong> 30 days grace period, then permanently deleted</li>
                <li><strong>Customer Data:</strong> Deleted when you delete it or 30 days after account deletion</li>
                <li><strong>Referral Data:</strong> Retained for 7 years for tax/accounting compliance</li>
                <li><strong>Payment Records:</strong> Retained for 7 years for legal/tax requirements</li>
                <li><strong>Logs and Analytics:</strong> Retained for 90 days, then anonymized or deleted</li>
              </ul>
              <p className="text-slate-600 mt-2">
                <strong>Note:</strong> Certain data may be retained longer where required by law (e.g., financial records, fraud prevention).
              </p>
            </div>

            {/* Data Security */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Data Security</h2>
              <p className="text-slate-600 mb-2">We implement industry-standard security measures:</p>
              <ul className="list-disc list-inside text-slate-600 space-y-1">
                <li><strong>Encryption:</strong> All data encrypted in transit (TLS 1.3) and at rest (AES-256)</li>
                <li><strong>Access Control:</strong> Row Level Security (RLS) ensures users only access their own data</li>
                <li><strong>Authentication:</strong> Secure password hashing (bcrypt), OAuth 2.0 support</li>
                <li><strong>Infrastructure:</strong> Hosted on SOC 2 compliant infrastructure (Supabase/AWS)</li>
                <li><strong>Monitoring:</strong> 24/7 security monitoring and incident response</li>
                <li><strong>Backups:</strong> Daily automated backups with 30-day retention</li>
              </ul>
              <p className="text-slate-600 mt-2 text-sm">
                <strong>Important:</strong> No security system is perfect. While we strive to protect your data, we cannot guarantee absolute security.
              </p>
            </div>

            {/* Your Rights */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Your Privacy Rights</h2>
              <p className="text-slate-600 mb-2">
                Under GDPR, Australian Privacy Principles (APPs), and other privacy laws, you have the following rights:
              </p>

              <div className="space-y-3">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="font-semibold text-blue-900 mb-1">Right to Access</p>
                  <p className="text-sm text-blue-800">Request a copy of your personal data we hold. You can export data via the dashboard or contact us.</p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="font-semibold text-blue-900 mb-1">Right to Rectification</p>
                  <p className="text-sm text-blue-800">Correct any inaccurate or incomplete data through your account settings or by contacting us.</p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="font-semibold text-blue-900 mb-1">Right to Erasure ("Right to be Forgotten")</p>
                  <p className="text-sm text-blue-800">Request deletion of your personal data. Note: Some data may be retained for legal/compliance reasons.</p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="font-semibold text-blue-900 mb-1">Right to Data Portability</p>
                  <p className="text-sm text-blue-800">Export your data in CSV format via the dashboard's CRM integration tab.</p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="font-semibold text-blue-900 mb-1">Right to Object</p>
                  <p className="text-sm text-blue-800">Object to processing based on legitimate interests, including for marketing purposes.</p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="font-semibold text-blue-900 mb-1">Right to Restrict Processing</p>
                  <p className="text-sm text-blue-800">Request limitation of processing in certain circumstances (e.g., while disputing accuracy).</p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="font-semibold text-blue-900 mb-1">Right to Withdraw Consent</p>
                  <p className="text-sm text-blue-800">Withdraw consent for SMS notifications or marketing emails at any time via account settings.</p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="font-semibold text-blue-900 mb-1">Right to Lodge a Complaint</p>
                  <p className="text-sm text-blue-800">
                    Contact your data protection authority:
                    <br />
                    <strong>Australia:</strong> Office of the Australian Information Commissioner (OAIC) - <a href="https://www.oaic.gov.au" className="text-blue-700 hover:underline" target="_blank" rel="noopener">oaic.gov.au</a>
                    <br />
                    <strong>EU:</strong> Your local Data Protection Authority
                  </p>
                </div>
              </div>

              <p className="text-slate-600 mt-4">
                <strong>To exercise your rights:</strong> Email <a href="mailto:jarred@referlabs.com.au" className="text-purple-700 hover:underline">jarred@referlabs.com.au</a> with "Privacy Rights Request" in the subject line. We will respond within 30 days.
              </p>
            </div>

            {/* CCPA California Privacy Rights */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">7A. California Privacy Rights (CCPA)</h2>
              <p className="text-slate-600 mb-3">
                If you are a California resident, you have additional privacy rights under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA). This section supplements the information in Section 7.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-2">7A.1 California-Specific Rights</h3>
              <p className="text-slate-600 mb-2">California residents have the right to:</p>
              <ul className="list-disc list-inside text-slate-600 space-y-1 mb-3">
                <li><strong>Know:</strong> Request disclosure of personal information we collect, use, disclose, and sell (categories and specific pieces)</li>
                <li><strong>Delete:</strong> Request deletion of personal information we hold about you (subject to certain exceptions)</li>
                <li><strong>Opt-Out of Sale/Sharing:</strong> Opt out of the "sale" or "sharing" of your personal information for targeted advertising</li>
                <li><strong>Correct:</strong> Request correction of inaccurate personal information</li>
                <li><strong>Limit Use of Sensitive Personal Information:</strong> Limit our use of sensitive personal information to necessary business purposes</li>
                <li><strong>Non-Discrimination:</strong> Not be discriminated against for exercising your CCPA rights</li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-2">7A.2 Do Not Sell or Share My Personal Information</h3>
              <p className="text-slate-600 mb-3">
                <strong>Important Notice:</strong> Refer Labs does NOT sell your personal information to third parties. We do NOT share your personal information for cross-context behavioral advertising (targeted advertising).
              </p>
              <p className="text-slate-600 mb-3">
                We only share data with service providers (listed in Section 3.1) who are contractually required to use data solely for providing services to us and are prohibited from selling or sharing your information.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-2">7A.3 Categories of Personal Information Collected</h3>
              <p className="text-slate-600 mb-2">In the past 12 months, we have collected the following categories of personal information from California residents:</p>
              <ul className="list-disc list-inside text-slate-600 space-y-1 mb-3">
                <li><strong>Identifiers:</strong> Name, email address, IP address, unique identifiers</li>
                <li><strong>Commercial Information:</strong> Purchase history, subscription records, commission earnings</li>
                <li><strong>Internet Activity:</strong> Website interactions, usage patterns, referral link clicks</li>
                <li><strong>Professional Information:</strong> Business name, industry, job title (for B2B purposes)</li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-2">7A.4 Business Purposes for Processing</h3>
              <p className="text-slate-600 mb-2">We use personal information for the following business purposes:</p>
              <ul className="list-disc list-inside text-slate-600 space-y-1 mb-3">
                <li>Providing and maintaining the Service</li>
                <li>Processing transactions and managing referral programs</li>
                <li>Communicating with you about your account and services</li>
                <li>Detecting, preventing, and responding to security incidents and fraud</li>
                <li>Debugging and repairing errors</li>
                <li>Internal research for technological development and demonstration</li>
                <li>Compliance with legal obligations</li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-2">7A.5 Exercising Your California Rights</h3>
              <p className="text-slate-600 mb-2">
                To exercise your CCPA rights, contact us at:
              </p>
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-200 mb-3">
                <p className="text-slate-700">
                  <strong>Email:</strong> <a href="mailto:jarred@referlabs.com.au" className="text-purple-700 hover:underline">jarred@referlabs.com.au</a>
                  <br />
                  <strong>Subject Line:</strong> "CCPA Privacy Rights Request"
                  <br />
                  <strong>Required Information:</strong> Your name, email address, description of request, and sufficient information to verify your identity
                </p>
              </div>
              <p className="text-slate-600 mb-3">
                We will acknowledge your request within 10 business days and respond within 45 days (extendable by 45 additional days if necessary). We will not discriminate against you for exercising your CCPA rights.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-2">7A.6 Authorized Agent Requests</h3>
              <p className="text-slate-600 mb-3">
                You may designate an authorized agent to make a CCPA request on your behalf. The agent must provide proof of authorization (signed permission) and you may be required to verify your identity directly with us.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-2">7A.7 Retention Periods</h3>
              <p className="text-slate-600 mb-3">
                We retain personal information for as long as necessary to fulfill the purposes described in this Privacy Policy, unless a longer retention period is required or permitted by law. See Section 5 for specific retention periods.
              </p>
            </div>

            {/* SMS Communications */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">8. SMS Communications & Consent</h2>
              <p className="text-slate-600 mb-2">
                When you use our SMS notification features:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-1">
                <li><strong>Your Responsibility:</strong> You must obtain proper consent from your customers before uploading their phone numbers</li>
                <li><strong>Compliance:</strong> You are responsible for compliance with SMS marketing laws (TCPA, Australian Spam Act, etc.)</li>
                <li><strong>Opt-Out:</strong> Your SMS messages must include opt-out instructions</li>
                <li><strong>Our Role:</strong> We are a data processor; you are the data controller for your customer data</li>
              </ul>
              <p className="text-slate-600 mt-2 bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm">
                <strong>Important:</strong> Sending unsolicited SMS messages may result in account suspension and legal liability. Always obtain consent first.
              </p>
            </div>

            {/* Cookies */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Cookies and Tracking</h2>

              <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-2">9.1 Essential Cookies</h3>
              <p className="text-slate-600 mb-2">We use essential cookies required for the service to function:</p>
              <ul className="list-disc list-inside text-slate-600 space-y-1">
                <li><strong>Authentication (sb-*-auth-token):</strong> Session management - 30 days</li>
                <li><strong>Referral Attribution (ref_ambassador):</strong> Tracks referral source - 30 days</li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-2">9.2 Analytics</h3>
              <p className="text-slate-600">
                We currently do <strong>not</strong> use third-party analytics or advertising cookies. Any future addition of analytics tools will be disclosed here and require your consent where legally required.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-2">9.3 Managing Cookies</h3>
              <p className="text-slate-600">
                You can control cookies through your browser settings. Note: Disabling essential cookies will prevent you from using the service.
              </p>
            </div>

            {/* Children's Privacy */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Children's Privacy</h2>
              <p className="text-slate-600">
                Our Service is intended for business use only and not directed to individuals under 18 years of age. We do not knowingly collect personal information from children under 18. If you become aware that a child has provided us with personal data, please contact us immediately and we will delete such information.
              </p>
            </div>

            {/* Changes to Policy */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Changes to This Policy</h2>
              <p className="text-slate-600">
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Material changes will be communicated via:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-1">
                <li>Email notification to your account email</li>
                <li>Prominent notice in the dashboard</li>
                <li>Updated "Last updated" date at the top of this policy</li>
              </ul>
              <p className="text-slate-600 mt-2">
                Continued use of the service after changes constitutes acceptance of the updated policy.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Contact Us</h2>
              <p className="text-slate-600 mb-2">
                For questions, concerns, or to exercise your privacy rights, contact us at:
              </p>
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <p className="text-slate-700">
                  <strong>Email:</strong> <a href="mailto:jarred@referlabs.com.au" className="text-purple-700 hover:underline">jarred@referlabs.com.au</a>
                  <br />
                  <strong>Subject Line:</strong> Include "Privacy" for general questions or "Privacy Rights Request" for rights requests
                  <br />
                  <strong>Response Time:</strong> We aim to respond within 5 business days for general inquiries, 30 days for rights requests
                </p>
              </div>
            </div>

          </section>
        </div>

      </main>
    </div>
  );
}
