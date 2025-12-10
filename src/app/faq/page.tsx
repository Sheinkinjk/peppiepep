"use client";

import Link from "next/link";
import { useState } from "react";

export default function FAQPage() {
  const faqSections = [
    {
      title: "Platform Overview",
      questions: [
        {
          question: "What is Refer Labs and who is it built for?",
          answer:
            "Refer Labs is a concierge-grade referral platform for growth-minded teams across industries. It stitches together celebratory hero alerts, the ROI calculator, and partner automation so happy customers turn into measurable promoters without juggling spreadsheets.",
        },
        {
          question: "How does onboarding work once I create an account?",
          answer:
            "Complete the signup form, share your customer roster, and our concierge team configures branding, rewards, automations, and the $250 sign-on credit you can offer new users. We handle CSV imports, ambassador assignment, and launch-ready campaigns so the dashboard is reporting immediately.",
        },
        {
          question: "Do I need a developer to launch Refer Labs?",
          answer:
            "No—everything in the onboarding form, dashboard, and ROI calculator is drag-and-drop friendly. We import your data, set up messaging, and even provision integrations for you. If you want to extend the system, our team can hand you Supabase hooks or Zapier templates.",
        },
        {
          question: "Is Refer Labs compliant with messaging and privacy regulations?",
          answer:
            "Yes. Every campaign includes opt-out controls, double opt-in verification, and consent tracking so you stay compliant with TCPA, CASL, GDPR, and local Australian privacy rules. Details live in the Terms and Privacy pages linked in every footer.",
        },
        {
          question: "How does the support experience work?",
          answer:
            "Support starts with the chatbot and expands into dedicated concierge calls, playbooks, and walkthroughs. We guide you through every dashboard area, schedules, and best practices so you’re never guessing what to do next.",
        },
      ],
    },
    {
      title: "Dashboard Areas & Features",
      questions: [
        {
          question: "What are the main tabs in the dashboard?",
          answer:
            "Campaigns, Ambassadors, Analytics, Rewards, and Settings, plus an ROI module that mirrors the ‘Calculate your referral program ROI in 4 steps’ panel on the landing page. Campaigns manages flows, Ambassadors surfaces top referrers, Analytics tracks conversions, Rewards handles incentives, and Settings keeps branding and integrations aligned.",
        },
        {
          question: "How do I import or add ambassadors?",
          answer:
            "Upload a CSV, paste a list, or invite ambassadors manually from the People panel. Each contact gets a landing page, tracking link, and share kit automatically so you can start nurturing them today—the how-it-works walkthrough highlights every step.",
        },
        {
          question: "Can I customize ambassador rewards per campaign?",
          answer:
            "Absolutely. Choose reward types (credit, gift card, discount), set payout cadences, and build tiers or one-time boosts within the Reward builder. You can even preview the reward ledger before the campaign launches.",
        },
        {
          question: "How do I monitor referral progress?",
          answer:
            "Analytics provides a live referral feed, conversion trends, credit balances, and campaign-attribution breakdowns. Filters let you inspect yesterday, the last week, or any specific campaign’s ROI.",
        },
        {
          question: "Where do I configure integrations?",
          answer:
            "Head to Settings → Connections to plug in Shopify, Klaviyo, Mailchimp, Resend, Attentive, PaperRun, Loop, HubSpot, Salesforce, or your own webhook/API destination. The new “Who We Work With” strip highlights the primary partners you can enable today.",
        },
        {
          question: "What does the Notifications area show?",
          answer:
            "Notifications flag invite deliveries, reward approvals, compliance warnings, and automation issues. Each alert links back to the campaign, ambassador, and ROI ledger so you can resolve problems before they impact revenue.",
        },
      ],
    },
    {
      title: "Referral Concepts & Campaign Setup",
      questions: [
        {
          question: "What is a referral campaign in Refer Labs?",
          answer:
            "A campaign bundles ambassador invites, messaging templates, reward logic, and compliance checks into one flow. It mirrors the how-it-works steps from import to reward and keeps everything tied to a single ROI ledger.",
        },
        {
          question: "How are referral links generated and tracked?",
          answer:
            "Every ambassador receives a unique URL (and QR/short code) that automatically captures clicks, purchases, and conversions. Refer Labs attributes that revenue back to both the ambassador and the campaign in real time.",
        },
        {
          question: "Can I customize messaging for each channel?",
          answer:
            "Yes—campaign builders let you craft separate copy for email, SMS, WhatsApp, and web overlays, toggle channel delivery, schedule sends, and preview each template before launching.",
        },
        {
          question: "What happens when a referred customer converts?",
          answer:
            "The conversion triggers a thank-you sequence, credits the ambassador, updates the analytics ledger, and can optionally sync back to your CRM via an integration.",
        },
        {
          question: "How do I manage reward budgets?",
          answer:
            "Reward controls let you cap spend per campaign, pause payouts when thresholds hit, and export ledger data for accounting. The live reward feed shows earned credits, payout statuses, and remaining budget.",
        },
        {
          question: "Is there an approval flow for reward releases?",
          answer:
            "Yes—route approvals to finance or ops so no ambassador is paid before a reviewer signs off. The system logs who approved what and when.",
        },
        {
          question: "How does Refer Labs prevent fraudulent referrals?",
          answer:
            "Duplicate emails, shared IP addresses, or suspicious spend patterns are flagged and auto-paused until a reviewer clears the activity.",
        },
        {
          question: "Can I pause or duplicate campaigns?",
          answer:
            "Each campaign card offers Pause, Duplicate, or Archive controls. Duplicate a high-performing flow and tweak the copy without rebuilding the reward logic.",
        },
        {
          question: "How do leaderboards and performance tiers function?",
          answer:
            "Leaderboards rank ambassadors by conversions, revenue, or custom metrics. Tiered incentives (Bronze/Silver/Gold) automatically bump rewards for your top catalysts.",
        },
        {
          question: "How does Refer Labs handle multi-brand or multi-location setups?",
          answer:
            "Clone your base configuration into regional campaigns, apply location filters, and customize landing pages so each team only sees the referrals that matter to them.",
        },
      ],
    },
    {
      title: "Advanced Insights & Best Practices",
      questions: [
        {
          question: "What's the best way to grow my ambassador list?",
          answer:
            "Import your top customers, tag VIPs, and use automated nurture sequences to invite new advocates. Launch referral sign-up pages and celebrate their wins with the hero-style notifications showcased on the how-it-works page.",
        },
        {
          question: "How do I calculate campaign ROI?",
          answer:
            "Use the dashboard’s ROI module or the Calculate ROI CTA on the homepage to test scenarios. Refer Labs forecasts acquisition cost, conversion lift, and recurring value per ambassador.",
        },
        {
          question: "Can I integrate Refer Labs with my CRM?",
          answer:
            "Yes—connect Salesforce, HubSpot, or any webhook-ready platform. Refer Labs pushes referral events, reward statuses, and revenue data back into your CRM so every team sees the same numbers.",
        },
        {
          question: "Are there templates for compliance messaging?",
          answer:
            "Every campaign ships with opt-out-friendly, lawyers-reviewed templates that can be adapted per region and reused across channels.",
        },
        {
          question: "What reporting is available for finance and ops?",
          answer:
            "Downloadable ledgers show earned credits, fulfilled rewards, paused conversions, and approval notes. Scheduled summary emails keep finance or leadership aligned with referral KPIs.",
        },
        {
          question: "How do I keep team members aligned on referral goals?",
          answer:
            "Share dashboards, pin leaderboard snapshots, and rely on scheduled updates. Comments and notifications within Refer Labs keep everyone on the same page.",
        },
      ],
    },
  ];

  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const handleToggle = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id],
    );
  };

  return (
    <div className="aurora relative min-h-screen bg-gradient-to-b from-[#d5f9ff] via-white to-[#d9f7fe] px-6 py-12 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="space-y-3 text-center">
          <p className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#0abab5] via-[#5fd9e4] to-[#1a9eb7] px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-white shadow-lg shadow-[#0a9fb3]/40">
            Tiffany-Blue Transparency
          </p>
          <h1 className="text-4xl font-black text-slate-900 sm:text-5xl lg:text-[3.5rem] leading-tight">
            Refer Labs FAQ
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Clear answers to every workflow we highlight on the site—from the hero moments and ROI calculator to the dashboard tabs, referral arcs, and integrations—so you can trust every promise before you launch a program.
          </p>
        </header>

        <div className="space-y-10">
          {faqSections.map((section) => (
            <section key={section.title} className="space-y-4">
              <div className="rounded-[44px] border border-white/70 bg-gradient-to-br from-[#e0f7ff] via-[#c5eef6] to-white/80 px-6 py-7 shadow-[0_25px_60px_rgba(15,23,42,0.08)]">
                <div className="flex flex-col gap-1">
                  <p className="text-xs uppercase tracking-[0.4em] text-[#0a9fb3]">
                    {section.title}
                  </p>
                  <p className="text-lg font-semibold text-slate-900">
                    {section.questions.length > 8
                      ? "Deep dives on the workflows you see across the dashboard"
                      : "Focused answers for that area of the product"}
                  </p>
                </div>
                <div className="mt-5 space-y-4">
                  {section.questions.map((faq) => {
                    const id = `${section.title}-${faq.question}`;
                    const isExpanded = expandedIds.includes(id);
                    return (
                      <article
                        key={id}
                        className="overflow-hidden rounded-3xl border border-[#c7eaf1] bg-white/90 p-5 shadow-[0_16px_35px_rgba(15,23,42,0.08)] transition-all duration-200 hover:shadow-[0_20px_45px_rgba(15,23,42,0.15)]"
                      >
                        <button
                          type="button"
                          onClick={() => handleToggle(id)}
                          className="flex w-full items-center justify-between gap-4 text-left"
                          aria-expanded={isExpanded}
                        >
                          <h3 className="text-base font-semibold text-slate-900">
                            {faq.question}
                          </h3>
                          <span
                            className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-lg font-black text-white transition-all duration-200 ${
                              isExpanded ? "bg-[#0a95a6] rotate-45" : "bg-[#47c8df]"
                            }`}
                          >
                            +
                          </span>
                        </button>
                        <div
                          className={`mt-4 text-sm leading-relaxed text-slate-600 transition-[max-height] duration-300 ease-in-out overflow-hidden ${
                            isExpanded ? "max-h-96" : "max-h-0"
                          }`}
                        >
                          <p>{faq.answer}</p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#53c2ef] via-[#37a9e0] to-[#0d869d] px-8 py-3 text-base font-semibold text-white shadow-lg shadow-teal-400/40 transition-transform duration-200 hover:-translate-y-0.5"
          >
            Would you like to learn more?
          </Link>
        </div>
      </div>
    </div>
  );
}
