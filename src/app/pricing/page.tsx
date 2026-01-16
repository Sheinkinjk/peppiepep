"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const faqs = [
  {
    q: "How should I choose between Starter, Growth, and Enterprise?",
    a: "Starter is ideal for lean teams building their first referral program. Growth adds automation, segmentation, and integrations for scaling marketing motions. Enterprise unlocks bespoke onboarding, account coverage, SLAs, and API/custom embed work for complex partner ecosystems.",
  },
  {
    q: "Can I move between plans later?",
    a: "Absolutely. Starter and Growth are flexible (monthly or annual). Enterprise includes a tailored kickoff and support cadence but can still scale up or down as your strategy evolves.",
  },
  {
    q: "What does every plan share in common?",
    a: "Every plan includes Refer Labs’ tracking fabric, partner portal, analytics, compliance guardrails, and the ability to route rewards, SMS/email, and integrations without extra configuration.",
  },
  {
    q: "What makes Referral Partnerships different?",
    a: "It’s a premium, high-touch engagement where we map partner strategy, enable the right contributors, automate tracking and payouts, and deliver executive-ready reporting with ongoing optimization.",
  },
  {
    q: "Is there a minimum commitment for Referral Partnerships?",
    a: "Referral Partnerships engagements are scoped and quoted per business; they typically start with a three-month growth sprint tied to measurable KPIs, then roll into an ongoing retainer or support cadence.",
  },
];

const partnershipFlow = [
  {
    title: "Discovery & Objectives",
    detail: "We map your ideal partners, business targets, and compliance guardrails so every introduction has a measurable outcome.",
    result: "Strategy ready in days",
  },
  {
    title: "Enablement & Activation",
    detail: "Refer Labs humanizes offers, creates partner playbooks, automates links/payments, and delivers concierge outreach.",
    result: "Partners activated with confidence",
  },
  {
    title: "Measurement & Optimization",
    detail: "Performance dashboards, payout audits, and scheduled review sessions keep your program accountable and high-leverage.",
    result: "ROI visibility & growth",
  },
];

const partnershipFollowUp = [
  {
    title: "Prep Call",
    detail: "We review your growth goals, partner targets, and hand you a launch plan before the call ends.",
  },
  {
    title: "Strategy Delivery",
    detail: "You receive a tailored partner playbook, compliance checklist, and rollout schedule that syncs with your team.",
  },
  {
    title: "Launch Support",
    detail: "Refer Labs manages onboarding, communications, payout workflows, and executive reporting for every referrer.",
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);

  const tiers = useMemo(
    () => [
      {
        name: "Starter",
        monthly: 249,
        annual: 199,
        subtext: "For individuals & small teams",
        features: [
          "Core referral tracking",
          "Unlimited referral links",
          "Basic partner portal",
          "Email support",
          "Standard analytics dashboard",
        ],
        cta: "Get Started",
      },
      {
        name: "Growth",
        monthly: 399,
        annual: 319,
        subtext: "For scaling teams & SMBs",
        features: [
          "Everything in Starter",
          "Advanced partner segmentation",
          "Automated reward workflows",
          "Custom referral link domains",
          "Integrations (Shopify, WordPress, Mailchimp)",
        ],
        cta: "Choose Growth",
        highlight: true,
      },
      {
        name: "Enterprise",
        monthly: null,
        annual: null,
        subtext: "For complex, high-volume growth",
        features: [
          "Everything in Growth",
          "Dedicated account support",
          "API access & custom onboarding",
          "SLA & priority support",
          "Advanced security controls",
        ],
        cta: "Contact Sales",
      },
    ],
    [],
  );

  const compareRows = [
    { feature: "Core referral tracking", starter: true, growth: true, enterprise: true },
    { feature: "Unlimited referral links", starter: true, growth: true, enterprise: true },
    { feature: "Partner portal", starter: true, growth: true, enterprise: true },
    { feature: "Advanced partner segmentation", starter: false, growth: true, enterprise: true },
    { feature: "Automated reward workflows", starter: false, growth: true, enterprise: true },
    { feature: "Custom referral link domains", starter: false, growth: true, enterprise: true },
    { feature: "API access", starter: false, growth: false, enterprise: true },
    { feature: "SLA & priority support", starter: false, growth: false, enterprise: true },
    { feature: "Advanced security controls", starter: false, growth: false, enterprise: true },
  ];

  const referralAddOn = {
    tagline: "Turn trusted advisors, creators, and agencies into measurable growth engines.",
    summary:
      "A white-glove coaching and activation engagement layered on any Refer Labs plan. We design partner programs, handle campaign assets, certify compliance, and deliver payouts/reports that finance teams can trust.",
    pillars: [
      {
        title: "Strategy & Enablement",
        detail: "We map partner archetypes, craft offers, and train stakeholders with role-based playbooks.",
      },
      {
        title: "Automated payouts",
        detail: "Custom reward structures (revenue share, credits, cash, upgrades) with audit-ready ledgers.",
      },
      {
        title: "Performance intelligence",
        detail: "Live partner dashboards, compliance tracking, and integration-ready reporting for finance.",
      },
      {
        title: "Concierge support",
        detail: "Expert onboarding, quarterly optimization workshops, and priority SLAs keep momentum.",
      },
    ],
    cta: {
      label: "Request Partnership Pricing",
      href: "/contact",
    },
  };

  const initialFormState = {
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    currentPlan: "Starter",
    goals: "",
    timeline: "",
    message: "",
  };

  const [applicationData, setApplicationData] = useState(initialFormState);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formError, setFormError] = useState<string | null>(null);

  const handleApplicationChange = (field: keyof typeof initialFormState, value: string) => {
    setApplicationData((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplicationSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("submitting");
    setFormError(null);

    try {
      const response = await fetch("/api/referral-partnership-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicationData),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error || "Failed to submit application.");
      }

      setFormStatus("success");
      setApplicationData(initialFormState);
    } catch (error) {
      setFormStatus("error");
      setFormError(error instanceof Error ? error.message : "Something went wrong.");
    }
  };

  const openApplication = (planName: string) => {
    setFormStatus("idle");
    setFormError(null);
    setApplicationData((prev) => ({
      ...prev,
      currentPlan: planName,
    }));
    setIsApplicationOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#07131e] via-[#0c1c29] to-[#03080f] text-slate-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(87,230,255,0.12),transparent_40%),radial-gradient(circle_at_85%_10%,rgba(10,186,181,0.18),transparent_45%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.1),transparent_55%)]" />
      <main className="relative mx-auto flex max-w-6xl flex-col gap-14 px-6 pb-20 pt-16 sm:px-10 lg:px-16">
        <Dialog open={isApplicationOpen} onOpenChange={setIsApplicationOpen}>
          <DialogContent className="max-w-2xl border border-white/10 bg-gradient-to-br from-[#07131e] via-[#0c1c29] to-[#03080f] text-slate-50 shadow-2xl shadow-black/60">
            <DialogHeader className="space-y-2">
              <DialogTitle className="text-2xl font-black text-white">Referral Partnerships Application</DialogTitle>
              <DialogDescription className="text-slate-200">
                Share a few details and we’ll email the full submission to <span className="font-semibold text-white">jarred@referlabs.com.au</span>.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleApplicationSubmit} className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-semibold text-slate-200">
                  Full name
                  <input
                    type="text"
                    value={applicationData.name}
                    onChange={(event) => handleApplicationChange("name", event.target.value)}
                    required
                    className="mt-1 w-full rounded-2xl border border-white/20 bg-slate-950/30 px-4 py-2 text-sm text-white outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/40"
                  />
                </label>
                <label className="block text-sm font-semibold text-slate-200">
                  Work email
                  <input
                    type="email"
                    value={applicationData.email}
                    onChange={(event) => handleApplicationChange("email", event.target.value)}
                    required
                    className="mt-1 w-full rounded-2xl border border-white/20 bg-slate-950/30 px-4 py-2 text-sm text-white outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/40"
                  />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-semibold text-slate-200">
                  Phone number
                  <input
                    type="text"
                    value={applicationData.phone}
                    onChange={(event) => handleApplicationChange("phone", event.target.value)}
                    required
                    className="mt-1 w-full rounded-2xl border border-white/20 bg-slate-950/30 px-4 py-2 text-sm text-white outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/40"
                  />
                </label>
                <label className="block text-sm font-semibold text-slate-200">
                  Company / practice
                  <input
                    type="text"
                    value={applicationData.company}
                    onChange={(event) => handleApplicationChange("company", event.target.value)}
                    required
                    className="mt-1 w-full rounded-2xl border border-white/20 bg-slate-950/30 px-4 py-2 text-sm text-white outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/40"
                  />
                </label>
              </div>
              <label className="block text-sm font-semibold text-slate-200">
                Role / function
                <input
                  type="text"
                  value={applicationData.role}
                  onChange={(event) => handleApplicationChange("role", event.target.value)}
                  required
                  className="mt-1 w-full rounded-2xl border border-white/20 bg-slate-950/30 px-4 py-2 text-sm text-white outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/40"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-semibold text-slate-200">
                  Current plan
                  <select
                    value={applicationData.currentPlan}
                    onChange={(event) => handleApplicationChange("currentPlan", event.target.value)}
                    className="mt-1 w-full rounded-2xl border border-white/20 bg-slate-950/30 px-4 py-2 text-sm text-white outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/40"
                  >
                    {tiers.map((tier) => (
                      <option key={tier.name} value={tier.name}>
                        {tier.name}
                      </option>
                    ))}
                    <option value="Not yet a customer">Not yet a customer</option>
                    <option value="Referral Partnerships">Referral Partnerships</option>
                  </select>
                </label>
                <label className="block text-sm font-semibold text-slate-200">
                  Ideal timeline
                  <input
                    type="text"
                    value={applicationData.timeline}
                    onChange={(event) => handleApplicationChange("timeline", event.target.value)}
                    required
                    className="mt-1 w-full rounded-2xl border border-white/20 bg-slate-950/30 px-4 py-2 text-sm text-white outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/40"
                  />
                </label>
              </div>
              <label className="block text-sm font-semibold text-slate-200">
                Key goals
                <textarea
                  value={applicationData.goals}
                  onChange={(event) => handleApplicationChange("goals", event.target.value)}
                  required
                  rows={3}
                  className="mt-1 w-full rounded-2xl border border-white/20 bg-slate-950/30 px-4 py-2 text-sm text-white outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/40"
                />
              </label>
              <label className="block text-sm font-semibold text-slate-200">
                Additional context
                <textarea
                  value={applicationData.message}
                  onChange={(event) => handleApplicationChange("message", event.target.value)}
                  rows={3}
                  className="mt-1 w-full rounded-2xl border border-white/20 bg-slate-950/30 px-4 py-2 text-sm text-white outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/40"
                />
              </label>

              {formError && <p className="text-xs text-rose-300">{formError}</p>}

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <a
                  href="https://calendly.com/jarred-referlabs/30min?month=2026-01"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200 hover:text-cyan-100"
                >
                  Prefer to book first? Open Calendly
                </a>
                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="inline-flex items-center justify-center rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-cyan-200 disabled:opacity-60"
                >
                  {formStatus === "success" ? "Submitted" : formStatus === "submitting" ? "Submitting..." : "Submit Application"}
                </button>
              </div>
              {formStatus === "success" && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-100/85">
                  <p className="font-semibold text-white">Application received.</p>
                  <p className="mt-1">
                    Next step: <a className="text-cyan-200 underline" href="https://calendly.com/jarred-referlabs/30min?month=2026-01" target="_blank" rel="noreferrer">book your call</a>.
                  </p>
                </div>
              )}
            </form>
          </DialogContent>
        </Dialog>

        {/* Hero */}
        <header className="text-center space-y-3">
          <h1 className="text-balance text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] text-white">
            Professional Services Referral Intelligence Pricing
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl mx-auto">
            Pricing you can read in seconds, backed by Refer Labs’ security, compliance, and partner expertise.
          </p>
        </header>

        {/* Core SaaS Pricing */}
        <section className="space-y-6">
          <div className="flex justify-center">
            <div className="inline-flex rounded-full border border-white/15 bg-white/10 backdrop-blur-xl p-1 shadow-lg shadow-black/20">
              {(["monthly", "annual"] as const).map((cycle) => (
                <button
                  key={cycle}
                  type="button"
                  onClick={() => setBillingCycle(cycle)}
                  className={`px-4 sm:px-6 py-2 rounded-full text-sm font-semibold transition ${
                    billingCycle === cycle
                      ? "bg-cyan-300 text-slate-900 shadow-md"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {cycle === "monthly" ? "Monthly billing" : "Annual billing"}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {tiers.map((tier) => {
              const price =
                tier.monthly === null
                  ? "Custom pricing"
                  : billingCycle === "monthly"
                    ? `$${tier.monthly} / month`
                    : `$${tier.annual} / month (annual)`;
              return (
                <div
                  key={tier.name}
                  className={`relative overflow-hidden rounded-3xl border ${tier.highlight ? "border-cyan-300/40 shadow-cyan-900/30" : "border-white/10"} bg-white/8 backdrop-blur-2xl p-[1px] shadow-xl shadow-black/30`}
                >
                  <div className="rounded-[1.6rem] bg-gradient-to-br from-white/12 via-white/6 to-white/4 border border-white/10 px-6 py-6 flex flex-col gap-4 h-full">
                    <div className="flex items-baseline justify-between gap-3">
                      <div>
                        <p className="text-lg font-black text-white">{tier.name}</p>
                        <p className="text-sm text-slate-100/80">{tier.subtext}</p>
                      </div>
                      <p className="text-xl font-bold text-white">{price}</p>
                    </div>
                    <ul className="space-y-2 text-sm text-slate-100/85">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex gap-2">
                          <span className="text-cyan-200">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => openApplication(tier.name)}
                        className={`inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${
                          tier.highlight
                            ? "bg-cyan-300 text-slate-900 hover:bg-cyan-200"
                            : "bg-white/90 text-slate-900 hover:bg-white"
                        }`}
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <section className="relative overflow-hidden rounded-4xl border border-white/10 bg-gradient-to-br from-white/10 via-white/6 to-transparent p-8 sm:p-12 shadow-2xl shadow-black/40">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(0,210,190,0.16),transparent_45%),radial-gradient(circle_at_85%_10%,rgba(92,225,230,0.12),transparent_50%)]" />
            <div className="relative z-10 space-y-10">
              <div className="space-y-3 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-cyan-200">Referral Partnerships</p>
                <h2 className="text-balance text-3xl sm:text-4xl font-black text-white">
                  Set up a Call to Discuss Your Referral Partnership Goals
                </h2>
                <p className="text-sm sm:text-base text-slate-100/85 max-w-4xl mx-auto">
                  A premium partnership motion for professional services teams who want more qualified introductions—without guessing, without spreadsheets, and with reporting your finance team can defend.
                </p>
              </div>

              <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row">
                <a
                  href="https://calendly.com/jarred-referlabs/30min?month=2026-01"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-cyan-300 px-8 py-4 text-sm font-semibold text-slate-900 shadow-lg shadow-cyan-900/40 transition hover:bg-cyan-200"
                >
                  Book a Call
                </a>
                <button
                  type="button"
                  onClick={() => openApplication("Referral Partnerships")}
                  className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Apply Now
                </button>
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                <div className="rounded-3xl border border-white/10 bg-black/20 p-6 backdrop-blur-xl shadow-lg shadow-black/30">
                  <h3 className="text-lg font-semibold text-white">Who It’s For</h3>
                  <div className="mt-4 space-y-3 text-sm text-slate-100/85">
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <p className="font-semibold text-white">Professional services firms</p>
                      <p className="text-xs text-slate-200">Law, accounting, advisory, insurance, and recruiters.</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <p className="font-semibold text-white">Partner-led growth teams</p>
                      <p className="text-xs text-slate-200">Need defensible attribution and repeatable partner operations.</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <p className="font-semibold text-white">High-intent inbound engines</p>
                      <p className="text-xs text-slate-200">Creators, advisors, agencies, consultants driving qualified demos.</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/20 p-6 backdrop-blur-xl shadow-lg shadow-black/30">
                  <h3 className="text-lg font-semibold text-white">How Refer Labs Facilitates It</h3>
                  <div className="mt-4 space-y-3">
                    {partnershipFlow.map((stage) => (
                      <div key={stage.title} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">{stage.result}</p>
                        <p className="mt-1 font-semibold text-white">{stage.title}</p>
                        <p className="mt-1 text-xs text-slate-200 leading-relaxed">{stage.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/20 p-6 backdrop-blur-xl shadow-lg shadow-black/30">
                  <h3 className="text-lg font-semibold text-white">What Happens After the Call</h3>
                  <div className="mt-4 space-y-3">
                    {partnershipFollowUp.map((item) => (
                      <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                        <p className="font-semibold text-white">{item.title}</p>
                        <p className="mt-1 text-xs text-slate-200 leading-relaxed">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/20">
                <div className="grid gap-0 sm:grid-cols-3">
                  {[
                    {
                      title: "At a Glance",
                      items: ["Partner briefs + onboarding", "Offer + reward structure", "Compliance guardrails"],
                    },
                    {
                      title: "Operations",
                      items: ["Unique links + tracking", "Approvals + payouts ledger", "Partner dashboards"],
                    },
                    {
                      title: "Outcomes",
                      items: ["Qualified demos", "Clear attribution", "Defensible ROI reporting"],
                    },
                  ].map((col) => (
                    <div key={col.title} className="border-t border-white/10 sm:border-t-0 sm:border-l border-white/10 p-6 first:border-l-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">{col.title}</p>
                      <ul className="mt-4 space-y-2 text-sm text-slate-100/85">
                        {col.items.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="text-cyan-200">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </section>

        {/* Compare table */}
        <section className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-black text-white text-center">Compare plans</h2>
          <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/6 backdrop-blur-2xl shadow-lg shadow-black/25">
            <table className="min-w-full text-left text-sm text-slate-100/90">
              <thead>
                <tr className="text-xs uppercase tracking-[0.14em] text-slate-200/70">
                  <th className="px-4 py-3">Feature</th>
                  <th className="px-4 py-3">Starter</th>
                  <th className="px-4 py-3">Growth</th>
                  <th className="px-4 py-3">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, idx) => (
                  <tr key={row.feature} className={idx % 2 === 0 ? "bg-white/4" : "bg-transparent"}>
                    <td className="px-4 py-3 font-semibold text-white">{row.feature}</td>
                    <td className="px-4 py-3">{row.starter ? "•" : "—"}</td>
                    <td className="px-4 py-3">{row.growth ? "•" : "—"}</td>
                    <td className="px-4 py-3">{row.enterprise ? "•" : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-black text-white text-center">Pricing Questions We Get Often</h2>
          <div className="space-y-3">
            {[
              ...faqs,
              {
                q: "Do I need a long-term contract?",
                a: "Starter and Growth are month-to-month or annual. Enterprise and Referral Partnerships are scoped engagements with agreed terms.",
              },
              {
                q: "Can we add Referral Partnerships to any SaaS plan?",
                a: "Yes. Referral Partnerships is a premium add-on layered over any SaaS plan. Pricing is custom based on objectives and partner volume.",
              },
            ].map((faq) => (
              <details
                key={faq.q}
                className="group rounded-3xl border border-white/10 bg-white/6 backdrop-blur-2xl px-5 py-4 shadow-md shadow-black/20"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer text-left">
                  <h3 className="text-base sm:text-lg font-semibold text-white">{faq.q}</h3>
                  <span className="text-cyan-100 group-open:rotate-45 transition">+</span>
                </summary>
                <p className="mt-3 text-sm text-slate-100/85 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden rounded-4xl border border-white/12 bg-gradient-to-br from-white/10 via-white/6 to-white/12 px-8 py-12 sm:px-12 sm:py-14 shadow-2xl shadow-black/35 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(87,230,255,0.18),transparent_40%),radial-gradient(circle_at_75%_15%,rgba(10,186,181,0.18),transparent_45%)]" />
          <div className="relative z-10 space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">Ready to Build Better Partnerships and Grow Revenue?</h2>
            <p className="text-sm sm:text-base text-slate-100/85">Need help choosing? Contact our team for a custom recommendation.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-cyan-300 text-slate-900 px-6 py-3 text-sm font-semibold hover:bg-cyan-200"
              >
                Apply for Referral Partnerships
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-transparent text-white px-6 py-3 text-sm font-semibold hover:bg-white/10"
              >
                Choose a SaaS Plan
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
