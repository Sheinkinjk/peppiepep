export default function FAQPage() {
  const faqSections = [
    {
      title: "Platform Overview",
      questions: [
        {
          question: "What is Refer Labs and who is it built for?",
          answer:
            "Refer Labs is a concierge-grade referral marketing platform designed for service businesses, agencies, and ambitious teams that want to turn delighted customers into measurable promoters without juggling spreadsheets.",
        },
        {
          question: "How does onboarding work once I create an account?",
          answer:
            "After signing up you meet the Refer Labs implementation team, share your customer roster, and we help you configure rewards, brand colors, and automation. We handle the CSV import, ambassador assignment, and referral tracking so the dashboard begins reporting instantly.",
        },
        {
          question: "Do I need a developer to launch Refer Labs?",
          answer:
            "No. The platform focuses on non-technical teams—most setup is done via the onboarding form and shared branding assets. If you need custom webhook routing or advanced API calls, Refer Labs engineers can assist through concierge services.",
        },
        {
          question: "Is Refer Labs compliant with messaging and privacy regulations?",
          answer:
            "Yes. Every campaign includes opt-out controls, double opt-in verification, and consent tracking so you stay compliant with TCPA, CASL, GDPR, and other regional rules. Privacy and data handling references live in the Terms and Privacy pages linked from every footer.",
        },
        {
          question: "How does the support experience work?",
          answer:
            "Support is available via the chatbot in the lower-right corner, scheduled calls, or priority Slack access depending on your plan. During onboarding we guide you through every dashboard area and supply playbooks for recurring referral initiatives.",
        },
      ],
    },
    {
      title: "Dashboard Areas & Features",
      questions: [
        {
          question: "What are the main tabs in the dashboard?",
          answer:
            "The dashboard centers around Campaigns, Ambassadors, Analytics, Rewards, and Settings. Campaigns organizes the referral journeys, Ambassadors surfaces top referrers, Analytics shows ROI, Rewards manages incentives, and Settings keeps integrations and branding aligned.",
        },
        {
          question: "How do I import or add ambassadors?",
          answer:
            "Use the CSV import inside the Campaigns tab or manually invite ambassadors from the People panel. Refer Labs automatically generates personalized landing pages and trackable links once a contact is onboarded.",
        },
        {
          question: "Can I customize ambassador rewards per campaign?",
          answer:
            "Yes. When building a campaign you pick reward type (credit, gift card, discount), amount, and payout cadence. You may also create tiers and special incentives for VIP referrers directly within the Reward settings.",
        },
        {
          question: "How do I monitor referral progress?",
          answer:
            "The Analytics tab provides live referral feed, conversion trends, credit balances, and breakdowns by ambassador. Use the filters to see yesterday’s performance, high-intent programs, or campaign-specific attribution.",
        },
        {
          question: "Where do I configure integrations?",
          answer:
            "Integrations live under Settings → Connections. Hook Refer Labs into Shopify, Klaviyo, Mailchimp, Resend, HubSpot, Salesforce, or your preferred CRM via pre-built connectors. You can also sync via CSV exports or the Refer Labs API/webhooks.",
        },
        {
          question: "What does the Notifications area show?",
          answer:
            "Notifications surface invite deliveries, reward approvals, and any compliance warnings from the campaign automation engine so you can act before a customer response window closes.",
        },
      ],
    },
    {
      title: "Referral Concepts & Campaign Setup",
      questions: [
        {
          question: "What is a referral campaign in Refer Labs?",
          answer:
            "A campaign orchestrates how ambassadors share unique links, what messages they send, which rewards they earn, and how conversions are validated. It bundles messaging templates, reward logic, and compliance checks.",
        },
        {
          question: "How are referral links generated and tracked?",
          answer:
            "Every ambassador receives a link embedded with a referral_code. Refer Labs tracks clicks, purchases, and conversions automatically, attributing them back to the ambassador and campaign in real time.",
        },
        {
          question: "Can I customize messaging for each channel?",
          answer:
            "Yes. Campaign builders let you craft different copy for email, SMS, WhatsApp, and web invite overlays. You can toggle channel delivery, schedule send times, and review preview templates before launching.",
        },
        {
          question: "What happens when a referred customer converts?",
          answer:
            "The conversion triggers a pipeline: the ambassador earns credits, the customer receives a thank-you, and the analytics ledger updates immediately. You can also automate follow-up sequences or CRM syncs via integrations.",
        },
        {
          question: "How do I manage reward budgets?",
          answer:
            "Use the Rewards tab to set caps, play with varied credit amounts, and pause payouts once a budget threshold hits. Finance teams love the payout ledger because it exports directly to accounting systems.",
        },
        {
          question: "Is there an approval flow for reward releases?",
          answer:
            "Yes. You can route reward release approvals to managers or finance within the Rewards configuration, so no ambassador is paid before verification is complete.",
        },
        {
          question: "How does Refer Labs prevent fraudulent referrals?",
          answer:
            "Refer Labs detects duplicate emails, IP addresses, and suspicious spending patterns. Automated flags pause reward issuance until a human reviewer clears the activity.",
        },
        {
          question: "What are hero tiles and calendar-style automations?",
          answer:
            "Hero tiles highlight KPI snapshots (link clicks, active ambassadors, projected revenue), while calendar automations let you schedule campaigns around launches, holidays, or product drops with recurring checks.",
        },
        {
          question: "Can I pause or duplicate campaigns?",
          answer:
            "Yes—each campaign card offers Pause, Duplicate, or Archive controls. Use the Duplicate option to replicate high-performing flows and tweak messages without rebuilding from scratch.",
        },
        {
          question: "How do leaderboards and performance tiers function?",
          answer:
            "Leaderboards rank ambassadors by conversions or revenue. You can assign tiers (Bronze/Silver/Gold) so top contributors receive bonus rewards automatically from the reward pipeline.",
        },
        {
          question: "How does Refer Labs handle multi-brand or multi-location setups?",
          answer:
            "Duplicate your base configuration into regional campaigns. Use custom brand colors, domain-specific landing pages, and location filters so each team sees only their referrals.",
        },
      ],
    },
    {
      title: "Advanced Insights & Best Practices",
      questions: [
        {
          question: "What's the best way to grow my ambassador list?",
          answer:
            "Start by importing your top customers and tagging them as VIP ambassadors, then use automated nurture sequences to invite additional advocates. Refer Labs can also host referral signup pages with on-brand messaging.",
        },
        {
          question: "How do I calculate campaign ROI?",
          answer:
            "Use the ROI calculator inside the dashboard or export revenue + reward data into your analytics tool. Refer Labs surfaces acquisition cost, conversion lift, and recurring value per ambassador.",
        },
        {
          question: "Can I integrate Refer Labs with my CRM?",
          answer:
            "Yes—use the CRM Integrations tab to sync data bi-directionally. Refer Labs can push referral events, reward statuses, and lifetime value into Salesforce, HubSpot, or other systems via native connectors or webhooks.",
        },
        {
          question: "Are there templates for compliance messaging?",
          answer:
            "Every campaign comes with regulatory-friendly templates that mention opt-out prompts and consent verbiage. You can edit them per region or replicate language across multiple channels.",
        },
        {
          question: "What reporting is available for finance and ops?",
          answer:
            "Live exportable ledgers display earned credits, fulfilled rewards, and pause reasons. Finance can download CSVs for reconciliation, while ops teams monitor ambassador health via built-in dashboards.",
        },
        {
          question: "How do I keep team members aligned on referral goals?",
          answer:
            "Use shared dashboards, scheduled summary emails, and segment-specific leaderboards so everyone sees the same KPIs. Comment threads and notifications within Refer Labs keep teams synchronized.",
        },
      ],
    },
  ];

  return (
    <div className="aurora relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white px-6 py-10 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="space-y-3 text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-slate-500">Educate</p>
          <h1 className="text-4xl font-black text-slate-900 sm:text-5xl lg:text-6xl">
            Refer Labs FAQ
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Everything you need to know about the platform, dashboard features, and referral campaigns so you can launch confidently and manage every moment with clarity.
          </p>
        </header>

        <div className="space-y-10">
          {faqSections.map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{section.title}</h2>
              <div className="space-y-6 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-lg">
                {section.questions.map((faq) => (
                  <article key={faq.question}>
                    <h3 className="text-lg font-semibold text-slate-900">{faq.question}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-900/95 p-6 text-white shadow-2xl">
          <h2 className="text-xl font-bold">Need a deeper dive?</h2>
          <p className="mt-3 text-sm text-slate-200">
            Reach out via the chatbot or book a session with our concierge team for guided walkthroughs, tailored dashboards, and proactive strategy adjustments.
          </p>
        </div>
      </div>
    </div>
  );
}
