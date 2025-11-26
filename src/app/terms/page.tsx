/* eslint-disable react/no-unescaped-entities */

export default function Terms() {
  return (
    <div className="aurora relative min-h-screen overflow-hidden bg-gradient-to-b from-purple-50 via-white to-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(124,58,237,0.08),transparent_32%),radial-gradient(circle_at_90%_10%,rgba(236,72,153,0.1),transparent_35%)]" />

      <main className="relative mx-auto flex max-w-4xl flex-col gap-12 px-6 pb-20 pt-8 md:px-10">

        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-purple-700 shadow-sm ring-1 ring-purple-200">
            Legal
          </div>
          <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            Terms of Service
          </h1>
          <p className="text-sm text-slate-500">
            Last updated: January 2025
          </p>
        </div>

        <div className="prose prose-slate max-w-3xl mx-auto">
          <section className="rounded-3xl bg-white/80 p-8 shadow-xl ring-1 ring-slate-100 backdrop-blur space-y-8">

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-slate-600 mb-3">
                These Terms of Service ("Terms") constitute a legally binding agreement between you ("User", "you", or "your") and Pepform Pty Ltd ("Pepform", "we", "us", or "our") governing your access to and use of the Pepform platform, services, software, and any related documentation (collectively, the "Service").
              </p>
              <p className="text-slate-600 mb-3">
                BY ACCESSING OR USING THE SERVICE, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS. IF YOU DO NOT AGREE TO THESE TERMS, YOU MAY NOT ACCESS OR USE THE SERVICE.
              </p>
              <p className="text-slate-600">
                You represent and warrant that you have the legal capacity to enter into this agreement. If you are entering into these Terms on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these Terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Description of Service</h2>
              <p className="text-slate-600 mb-3">
                Pepform provides a SaaS-based referral marketing and growth network platform that enables businesses to create, manage, track, and optimize customer referral programs through automated messaging, analytics, and campaign management tools.
              </p>
              <p className="text-slate-600">
                The Service may include features such as SMS/WhatsApp messaging, email campaigns, customer data management, referral tracking, analytics dashboards, and integration capabilities. Pepform reserves the right to modify, suspend, or discontinue any aspect of the Service at any time without prior notice.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Eligibility and Account Registration</h2>
              <p className="text-slate-600 mb-2">
                To use the Service, you must:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-3">
                <li>Be at least 18 years of age or the age of majority in your jurisdiction</li>
                <li>Operate a legitimate business or organization</li>
                <li>Provide accurate, current, and complete registration information</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security and confidentiality of your account credentials</li>
                <li>Be solely responsible for all activities occurring under your account</li>
                <li>Immediately notify us of any unauthorized access to your account</li>
              </ul>
              <p className="text-slate-600">
                You may not transfer or share your account credentials with any third party. Pepform reserves the right to suspend or terminate accounts that violate these requirements.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Prohibited Uses and Restricted Parties</h2>
              <p className="text-slate-600 mb-3 font-semibold">
                You agree NOT to use the Service for any unlawful, fraudulent, or prohibited purpose, including but not limited to:
              </p>

              <h3 className="text-lg font-bold text-slate-900 mb-2">4.1 Prohibited Business Activities</h3>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4">
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

              <h3 className="text-lg font-bold text-slate-900 mb-2">4.2 Prohibited Technical Activities</h3>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4">
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

              <h3 className="text-lg font-bold text-slate-900 mb-2">4.3 Compliance Violations</h3>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4">
                <li>Violating GDPR, CCPA, TCPA, CAN-SPAM, or other privacy regulations</li>
                <li>Violating OFAC sanctions, export controls, or trade restrictions</li>
                <li>Violating anti-money laundering (AML) or know-your-customer (KYC) requirements</li>
                <li>Sending messages to numbers on Do Not Call (DNC) registries without consent</li>
                <li>Failing to obtain proper consent for SMS/email marketing</li>
                <li>Violating telecommunications regulations or carrier guidelines</li>
                <li>Misrepresenting sender identity or spoofing caller ID</li>
              </ul>

              <h3 className="text-lg font-bold text-slate-900 mb-2">4.4 Restricted Parties</h3>
              <p className="text-slate-600 mb-2">
                You may not use the Service if you or your organization:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-3">
                <li>Are located in or operating from sanctioned countries (e.g., North Korea, Iran, Syria, Cuba, Crimea)</li>
                <li>Appear on OFAC SDN list, UN sanctions list, or other restricted party lists</li>
                <li>Have been previously banned or suspended from the Service</li>
                <li>Are subject to active litigation or investigation related to fraud or illegal activity</li>
                <li>Have had previous accounts terminated for Terms violations</li>
              </ul>

              <p className="text-slate-600 font-semibold">
                Violation of this section will result in immediate account termination, forfeiture of all fees paid, and potential legal action. Pepform reserves the right to report violations to law enforcement authorities.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. User Content and Data Responsibilities</h2>
              <p className="text-slate-600 mb-2">
                You are solely responsible for all content, data, and information you upload, transmit, or store through the Service ("User Content"). You represent and warrant that:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-3">
                <li>You own or have the necessary rights, licenses, and consents to use and share all User Content</li>
                <li>You have obtained explicit, verifiable consent from all individuals before uploading their personal information</li>
                <li>Your User Content does not violate any laws, regulations, or third-party rights</li>
                <li>You have properly secured all customer data and comply with applicable privacy laws</li>
                <li>You will not upload false, misleading, or fraudulent information</li>
                <li>You maintain records of consent for all recipients of marketing messages</li>
              </ul>
              <p className="text-slate-600">
                Pepform does not claim ownership of your User Content but requires a limited license to provide the Service. You grant Pepform a worldwide, non-exclusive, royalty-free license to use, process, and transmit your User Content solely for the purpose of providing and improving the Service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. SMS and Email Messaging Compliance</h2>
              <p className="text-slate-600 mb-2">
                By using our messaging features, you agree to:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-3">
                <li>Comply with all applicable laws including TCPA, CAN-SPAM Act, GDPR, and carrier guidelines</li>
                <li>Obtain prior express written consent before sending marketing messages</li>
                <li>Provide clear opt-out mechanisms in every message (e.g., "Reply STOP to unsubscribe")</li>
                <li>Honor opt-out requests immediately and maintain suppression lists</li>
                <li>Not send messages to numbers on Do Not Call registries without proper exemption</li>
                <li>Accurately identify yourself as the sender in all messages</li>
                <li>Not use shared short codes or spoofed sender IDs</li>
                <li>Maintain records of consent for a minimum of 4 years</li>
              </ul>
              <p className="text-slate-600 font-semibold">
                Violation of messaging compliance may result in carrier filtering, fines up to $1,500 per message under TCPA, immediate account suspension, and liability for all damages incurred by Pepform.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Fees, Billing, and Payment Terms</h2>
              <p className="text-slate-600 mb-2">
                You agree to pay all fees associated with your use of the Service as outlined in your selected subscription plan. All fees are:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-3">
                <li>Non-refundable except as required by law or explicitly stated</li>
                <li>Charged in advance on a recurring basis (monthly or annually)</li>
                <li>Subject to change with 30 days' prior written notice</li>
                <li>Exclusive of all applicable taxes, which you are responsible for paying</li>
              </ul>
              <p className="text-slate-600 mb-3">
                If payment fails or your account becomes past due, Pepform may suspend or terminate your access to the Service. You remain liable for all unpaid fees plus interest at 1.5% per month or the maximum rate permitted by law, whichever is lower.
              </p>
              <p className="text-slate-600">
                During our beta testing period, certain fees may be waived at Pepform's discretion. Waived fees do not create any ongoing entitlement or expectation of continued free service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Beta Testing and Service Availability</h2>
              <p className="text-slate-600 mb-2">
                The Service is currently in beta testing. During this period:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-3">
                <li>The Service is provided "AS IS" and "AS AVAILABLE" without warranties of any kind</li>
                <li>Features, functionality, and pricing are subject to change without notice</li>
                <li>Service availability, uptime, and performance are not guaranteed</li>
                <li>We may collect usage data, feedback, and analytics to improve the platform</li>
                <li>We may reset, modify, or delete test data without liability</li>
                <li>We may invite or restrict beta access at our sole discretion</li>
              </ul>
              <p className="text-slate-600">
                Pepform makes no guarantees regarding the transition from beta to general availability or the preservation of beta accounts and data.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Intellectual Property Rights</h2>
              <p className="text-slate-600 mb-3">
                All intellectual property rights in the Service, including but not limited to software, algorithms, user interfaces, designs, trademarks, logos, documentation, and proprietary methodologies, are owned exclusively by Pepform or its licensors. These Terms do not grant you any ownership rights in the Service.
              </p>
              <p className="text-slate-600 mb-2">
                You are granted a limited, non-exclusive, non-transferable, revocable license to access and use the Service solely for your internal business purposes in accordance with these Terms. You may not:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-3">
                <li>Copy, modify, distribute, sell, or lease any part of the Service</li>
                <li>Reverse engineer, decompile, or attempt to extract source code</li>
                <li>Remove or alter any copyright, trademark, or proprietary notices</li>
                <li>Use Pepform's trademarks, logos, or branding without written permission</li>
                <li>Create derivative works based on the Service</li>
                <li>Frame, mirror, or republish any part of the Service</li>
              </ul>
              <p className="text-slate-600">
                If you provide feedback, suggestions, or ideas about the Service, you grant Pepform an unlimited, irrevocable, perpetual, royalty-free license to use, implement, and commercialize such feedback without compensation or attribution.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Privacy and Data Protection</h2>
              <p className="text-slate-600 mb-3">
                Your use of the Service is governed by our Privacy Policy, which is incorporated into these Terms by reference. You acknowledge that Pepform will process personal data in accordance with applicable privacy laws including GDPR, CCPA, and Australian Privacy Principles.
              </p>
              <p className="text-slate-600 mb-3">
                For EU/UK users: Pepform acts as a data processor when handling customer data you upload. You are the data controller and are responsible for ensuring you have a lawful basis for processing and transferring personal data to Pepform.
              </p>
              <p className="text-slate-600">
                Pepform implements reasonable security measures but cannot guarantee absolute security. You are responsible for implementing appropriate security practices for your account and data.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Third-Party Services and Integrations</h2>
              <p className="text-slate-600 mb-3">
                The Service may integrate with or rely on third-party services including Twilio (SMS), Resend (email), Supabase (database), and Vercel (hosting). Your use of these third-party services may be subject to their respective terms of service.
              </p>
              <p className="text-slate-600">
                Pepform is not responsible for the availability, performance, or actions of third-party services. Any disputes with third-party providers are solely between you and that provider. Pepform disclaims all liability for third-party service failures or interruptions.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Service Level and Uptime</h2>
              <p className="text-slate-600 mb-3">
                While Pepform strives to maintain high availability, we do not guarantee uninterrupted access to the Service. Pepform may suspend the Service for maintenance, upgrades, security patches, or other operational reasons with or without notice.
              </p>
              <p className="text-slate-600">
                Pepform is not liable for any downtime, data loss, or business interruption caused by service outages, force majeure events, third-party failures, or circumstances beyond our reasonable control.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">13. Indemnification</h2>
              <p className="text-slate-600 mb-3">
                You agree to indemnify, defend, and hold harmless Pepform, its affiliates, officers, directors, employees, agents, and licensors from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising from:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2">
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
              <h2 className="text-2xl font-bold text-slate-900 mb-4">14. Disclaimer of Warranties</h2>
              <p className="text-slate-600 mb-3 uppercase font-bold">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY.
              </p>
              <p className="text-slate-600 mb-2">
                PEPFORM EXPRESSLY DISCLAIMS ALL WARRANTIES INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-3">
                <li>IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT</li>
                <li>WARRANTIES REGARDING ACCURACY, RELIABILITY, OR COMPLETENESS OF THE SERVICE</li>
                <li>WARRANTIES THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE</li>
                <li>WARRANTIES THAT DEFECTS WILL BE CORRECTED</li>
                <li>WARRANTIES REGARDING THE RESULTS OBTAINED FROM USING THE SERVICE</li>
              </ul>
              <p className="text-slate-600">
                No advice or information obtained from Pepform shall create any warranty not expressly stated in these Terms. Some jurisdictions do not allow the exclusion of implied warranties, so some of the above exclusions may not apply to you.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">15. Limitation of Liability</h2>
              <p className="text-slate-600 mb-3 uppercase font-bold">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, PEPFORM SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-3">
                <li>LOSS OF PROFITS, REVENUE, DATA, GOODWILL, OR BUSINESS OPPORTUNITIES</li>
                <li>BUSINESS INTERRUPTION OR SERVICE DOWNTIME</li>
                <li>COST OF SUBSTITUTE SERVICES OR PROCUREMENT</li>
                <li>REGULATORY FINES OR PENALTIES RESULTING FROM YOUR USE OF THE SERVICE</li>
                <li>DAMAGES ARISING FROM THIRD-PARTY CLAIMS OR ACTIONS</li>
              </ul>
              <p className="text-slate-600 mb-3 font-bold">
                IN NO EVENT SHALL PEPFORM'S TOTAL AGGREGATE LIABILITY EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID TO PEPFORM IN THE 12 MONTHS PRECEDING THE CLAIM, OR (B) $100 AUD.
              </p>
              <p className="text-slate-600">
                This limitation applies regardless of the legal theory (contract, tort, negligence, strict liability, or otherwise) and even if Pepform has been advised of the possibility of such damages. Some jurisdictions do not allow limitations on liability, so some of the above may not apply to you.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">16. Termination and Suspension</h2>
              <p className="text-slate-600 mb-3">
                Pepform reserves the right to suspend or terminate your access to the Service immediately, without prior notice or liability, for any reason including but not limited to:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-3">
                <li>Breach of these Terms or applicable laws</li>
                <li>Fraudulent, abusive, or illegal activity</li>
                <li>Non-payment of fees</li>
                <li>Excessive use that impacts Service performance</li>
                <li>Complaints from message recipients or carriers</li>
                <li>At our sole discretion for operational or business reasons</li>
              </ul>
              <p className="text-slate-600 mb-3">
                You may terminate your account at any time by contacting support. Upon termination:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-3">
                <li>Your access to the Service will cease immediately</li>
                <li>You remain liable for all outstanding fees and obligations</li>
                <li>We may delete your User Content after 30 days unless legally required to retain it</li>
                <li>No refunds will be provided for pre-paid fees unless required by law</li>
                <li>Provisions that by their nature should survive (indemnification, limitation of liability, etc.) will continue to apply</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">17. Modifications to Terms and Service</h2>
              <p className="text-slate-600 mb-3">
                Pepform reserves the right to modify these Terms at any time in our sole discretion. We will provide notice of material changes by:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-3">
                <li>Posting updated Terms on our website with a new "Last updated" date</li>
                <li>Sending email notification to your registered email address</li>
                <li>Displaying a notification within the Service</li>
              </ul>
              <p className="text-slate-600 mb-3">
                Your continued use of the Service after modifications become effective constitutes your acceptance of the revised Terms. If you do not agree to the modifications, you must stop using the Service and terminate your account.
              </p>
              <p className="text-slate-600">
                Pepform may also modify, suspend, or discontinue any aspect of the Service at any time without liability. We are not obligated to provide any specific features or maintain backwards compatibility.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">18. Dispute Resolution and Governing Law</h2>
              <p className="text-slate-600 mb-3">
                These Terms shall be governed by and construed in accordance with the laws of Australia, without regard to conflict of law principles. The United Nations Convention on Contracts for the International Sale of Goods shall not apply.
              </p>
              <p className="text-slate-600 mb-3">
                Any dispute arising from these Terms or the Service shall be resolved exclusively in the courts located in Sydney, Australia. You irrevocably submit to the exclusive jurisdiction of those courts and waive any objection to venue or inconvenient forum.
              </p>
              <p className="text-slate-600 mb-3 font-bold">
                Mandatory Arbitration (if applicable): For users in jurisdictions requiring arbitration, disputes shall be resolved through binding arbitration under the rules of the Australian Dispute Resolution Association. You agree to arbitrate on an individual basis and waive any right to participate in class actions.
              </p>
              <p className="text-slate-600">
                Time Limit for Claims: Any claim relating to the Service must be filed within one (1) year after the cause of action arises, or such claim is permanently barred.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">19. Export Controls and Sanctions Compliance</h2>
              <p className="text-slate-600 mb-3">
                The Service may be subject to export control laws and regulations including those of Australia, the United States, and the European Union. You agree not to use or access the Service in any country or jurisdiction subject to comprehensive sanctions, or if you are a restricted party under applicable sanctions regulations.
              </p>
              <p className="text-slate-600">
                You represent that you are not located in, organized under the laws of, or owned or controlled by persons or entities in any sanctioned country, and that you are not on any restricted party list including the OFAC SDN list, EU sanctions list, or UN sanctions list.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">20. Assignment and Transfer</h2>
              <p className="text-slate-600 mb-3">
                You may not assign, transfer, delegate, or sublicense these Terms or your rights under these Terms without Pepform's prior written consent. Any attempted assignment in violation of this provision is void.
              </p>
              <p className="text-slate-600">
                Pepform may freely assign or transfer these Terms and all rights and obligations hereunder in connection with a merger, acquisition, corporate reorganization, or sale of all or substantially all of our assets without your consent.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">21. Severability and Waiver</h2>
              <p className="text-slate-600 mb-3">
                If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable while preserving the parties' intent.
              </p>
              <p className="text-slate-600">
                No waiver of any term or condition shall be deemed a continuing waiver or waiver of any other term. Pepform's failure to enforce any right or provision shall not constitute a waiver of such right or provision.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">22. Entire Agreement</h2>
              <p className="text-slate-600">
                These Terms, together with our Privacy Policy and any other policies incorporated by reference, constitute the entire agreement between you and Pepform regarding the Service and supersede all prior agreements, understandings, negotiations, and discussions, whether oral or written. No representations, warranties, or inducements have been made by either party except as expressly stated herein.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">23. Force Majeure</h2>
              <p className="text-slate-600">
                Pepform shall not be liable for any failure or delay in performance due to causes beyond our reasonable control including acts of God, natural disasters, war, terrorism, civil unrest, labor disputes, government actions, internet or telecommunications failures, third-party service outages, cyberattacks, or pandemics.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">24. Contact Information</h2>
              <p className="text-slate-600 mb-3">
                For questions, concerns, or notices regarding these Terms, please contact us at:
              </p>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-slate-700 font-semibold">Pepform Pty Ltd</p>
                <p className="text-slate-700">Email: <a href="mailto:jarredkrowitz@gmail.com" className="text-purple-700 hover:underline">jarredkrowitz@gmail.com</a></p>
                <p className="text-slate-700">Website: <a href="https://peppiepep.vercel.app" className="text-purple-700 hover:underline">peppiepep.vercel.app</a></p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-amber-50 border-l-4 border-amber-500 rounded-lg">
              <p className="text-sm font-bold text-amber-900 mb-2">IMPORTANT NOTICE</p>
              <p className="text-sm text-amber-800">
                BY USING THE SERVICE, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS OF SERVICE. IF YOU DO NOT AGREE, YOU MUST IMMEDIATELY DISCONTINUE USE OF THE SERVICE.
              </p>
            </div>

          </section>
        </div>

      </main>
    </div>
  );
}
