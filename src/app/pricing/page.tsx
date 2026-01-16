"use client";

import { useMemo, useState, Suspense } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2, ArrowRight, Sparkles, Calculator, Shield, Users, BarChart3, Zap } from "lucide-react";

// Lazy load ROI Calculator for performance
const ROICalculator = dynamic(() => import("@/components/ROICalculator").then(mod => ({ default: mod.ROICalculator })), {
  loading: () => (
    <div className="flex items-center justify-center py-20">
      <div className="animate-pulse text-cyan-300">Loading calculator...</div>
    </div>
  ),
  ssr: false,
});

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
    a: "Every plan includes Refer Labs' tracking fabric, partner portal, analytics, compliance guardrails, and the ability to route rewards, SMS/email, and integrations without extra configuration.",
  },
  {
    q: "What makes Referral Partnerships different?",
    a: "It's a premium, high-touch engagement where we map partner strategy, enable the right contributors, automate tracking and payouts, and deliver executive-ready reporting with ongoing optimization.",
  },
  {
    q: "Is there a minimum commitment for Referral Partnerships?",
    a: "Referral Partnerships engagements are scoped and quoted per business; they typically start with a three-month growth sprint tied to measurable KPIs, then roll into an ongoing retainer or support cadence.",
  },
  {
    q: "Do I need a long-term contract?",
    a: "Starter and Growth are month-to-month or annual. Enterprise and Referral Partnerships are scoped engagements with agreed terms.",
  },
  {
    q: "Can we add Referral Partnerships to any SaaS plan?",
    a: "Yes. Referral Partnerships is a premium add-on layered over any SaaS plan. Pricing is custom based on objectives and partner volume.",
  },
  {
    q: "What integrations are included?",
    a: "All plans include our core integrations (Shopify, WordPress, Mailchimp, Zapier). Growth and Enterprise include advanced CRM integrations, API access, and custom webhook configurations.",
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

const trustBadges = [
  { icon: Shield, label: "Bank-grade security", detail: "SOC 2 compliant infrastructure" },
  { icon: Users, label: "10,000+ partners", detail: "Active on our platform" },
  { icon: BarChart3, label: "$2M+ tracked", detail: "In referral revenue monthly" },
  { icon: Zap, label: "99.9% uptime", detail: "Enterprise reliability" },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [showROICalculator, setShowROICalculator] = useState(false);

  const tiers = useMemo(
    () => [
      {
        name: "Starter",
        monthly: 249,
        annual: 199,
        subtext: "For individuals & small teams",
        features: [
          "Core referral tracking & attribution",
          "Unlimited referral links",
          "Basic partner portal",
          "Email & chat support",
          "Standard analytics dashboard",
          "Mobile-responsive partner pages",
        ],
        cta: "Get Started",
        highlight: false,
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
          "CRM & marketing integrations",
          "Priority email support",
          "A/B testing for campaigns",
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
          "Dedicated account manager",
          "Full API access & webhooks",
          "Custom onboarding & training",
          "SLA & priority support",
          "Advanced security controls",
          "Custom contract terms",
        ],
        cta: "Contact Sales",
        highlight: false,
      },
    ],
    [],
  );

  const compareRows = [
    { feature: "Core referral tracking", starter: true, growth: true, enterprise: true },
    { feature: "Unlimited referral links", starter: true, growth: true, enterprise: true },
    { feature: "Partner portal", starter: true, growth: true, enterprise: true },
    { feature: "Analytics dashboard", starter: true, growth: true, enterprise: true },
    { feature: "Advanced partner segmentation", starter: false, growth: true, enterprise: true },
    { feature: "Automated reward workflows", starter: false, growth: true, enterprise: true },
    { feature: "Custom referral link domains", starter: false, growth: true, enterprise: true },
    { feature: "CRM integrations", starter: false, growth: true, enterprise: true },
    { feature: "A/B testing", starter: false, growth: true, enterprise: true },
    { feature: "Full API access", starter: false, growth: false, enterprise: true },
    { feature: "Dedicated account manager", starter: false, growth: false, enterprise: true },
    { feature: "SLA & priority support", starter: false, growth: false, enterprise: true },
    { feature: "Advanced security controls", starter: false, growth: false, enterprise: true },
    { feature: "Custom contract terms", starter: false, growth: false, enterprise: true },
  ];

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
    <div className="relative min-h-screen bg-gradient-to-br from-[#04101a] via-[#081820] to-[#020508] text-slate-50 overflow-hidden">
      {/* Premium background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(87,230,255,0.08),transparent_35%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(10,186,181,0.12),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.05),transparent_50%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent blur-3xl" />
      </div>

      <main className="relative mx-auto flex max-w-7xl flex-col gap-16 px-4 sm:px-6 lg:px-8 pb-24 pt-20">
        {/* Application Dialog */}
        <Dialog open={isApplicationOpen} onOpenChange={setIsApplicationOpen}>
          <DialogContent className="max-w-2xl border border-white/10 bg-gradient-to-br from-[#07131e] via-[#0c1c29] to-[#03080f] text-slate-50 shadow-2xl shadow-black/60 max-h-[90vh] overflow-y-auto">
            <DialogHeader className="space-y-2">
              <DialogTitle className="text-2xl font-black text-white">Referral Partnerships Application</DialogTitle>
              <DialogDescription className="text-slate-200">
                Share a few details and we&apos;ll email the full submission to <span className="font-semibold text-white">jarred@referlabs.com.au</span>.
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
                    className="mt-1 w-full rounded-xl border border-white/20 bg-slate-950/30 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/40 transition-all"
                  />
                </label>
                <label className="block text-sm font-semibold text-slate-200">
                  Work email
                  <input
                    type="email"
                    value={applicationData.email}
                    onChange={(event) => handleApplicationChange("email", event.target.value)}
                    required
                    className="mt-1 w-full rounded-xl border border-white/20 bg-slate-950/30 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/40 transition-all"
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
                    className="mt-1 w-full rounded-xl border border-white/20 bg-slate-950/30 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/40 transition-all"
                  />
                </label>
                <label className="block text-sm font-semibold text-slate-200">
                  Company / practice
                  <input
                    type="text"
                    value={applicationData.company}
                    onChange={(event) => handleApplicationChange("company", event.target.value)}
                    required
                    className="mt-1 w-full rounded-xl border border-white/20 bg-slate-950/30 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/40 transition-all"
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
                  className="mt-1 w-full rounded-xl border border-white/20 bg-slate-950/30 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/40 transition-all"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-semibold text-slate-200">
                  Current plan
                  <select
                    value={applicationData.currentPlan}
                    onChange={(event) => handleApplicationChange("currentPlan", event.target.value)}
                    className="mt-1 w-full rounded-xl border border-white/20 bg-slate-950/30 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/40 transition-all"
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
                    className="mt-1 w-full rounded-xl border border-white/20 bg-slate-950/30 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/40 transition-all"
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
                  className="mt-1 w-full rounded-xl border border-white/20 bg-slate-950/30 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/40 transition-all resize-none"
                />
              </label>
              <label className="block text-sm font-semibold text-slate-200">
                Additional context
                <textarea
                  value={applicationData.message}
                  onChange={(event) => handleApplicationChange("message", event.target.value)}
                  rows={3}
                  className="mt-1 w-full rounded-xl border border-white/20 bg-slate-950/30 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/40 transition-all resize-none"
                />
              </label>

              {formError && <p className="text-xs text-rose-300">{formError}</p>}

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <a
                  href="https://calendly.com/jarred-referlabs/30min?month=2026-01"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200 hover:text-cyan-100 transition-colors"
                >
                  Prefer to book first? Open Calendly
                </a>
                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-300 px-6 py-3 text-sm font-semibold text-slate-900 transition-all hover:from-cyan-300 hover:to-cyan-200 disabled:opacity-60 shadow-lg shadow-cyan-500/20"
                >
                  {formStatus === "success" ? "Submitted" : formStatus === "submitting" ? "Submitting..." : "Submit Application"}
                </button>
              </div>
              {formStatus === "success" && (
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-100/85">
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
        <header className="text-center space-y-6">
          <h1 className="text-balance text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] text-white tracking-tight">
            Referral Intelligence
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-cyan-200 to-teal-300 bg-clip-text text-transparent">
              Built for Growth
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Transform your referral network into a measurable growth engine. Clear pricing, enterprise security, and partner expertise included.
          </p>
        </header>

        {/* Trust badges */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto w-full">
          {trustBadges.map((badge) => (
            <div
              key={badge.label}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm text-center"
            >
              <badge.icon className="h-6 w-6 text-cyan-300" />
              <p className="text-sm font-semibold text-white">{badge.label}</p>
              <p className="text-xs text-slate-400">{badge.detail}</p>
            </div>
          ))}
        </section>

        {/* Core SaaS Pricing */}
        <section className="space-y-8">
          {/* Billing toggle */}
          <div className="flex flex-col items-center gap-4">
            <div className="inline-flex rounded-full border border-white/15 bg-white/5 backdrop-blur-xl p-1.5 shadow-lg shadow-black/20">
              {(["monthly", "annual"] as const).map((cycle) => (
                <button
                  key={cycle}
                  type="button"
                  onClick={() => setBillingCycle(cycle)}
                  className={`px-5 sm:px-8 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    billingCycle === cycle
                      ? "bg-gradient-to-r from-cyan-400 to-cyan-300 text-slate-900 shadow-md shadow-cyan-500/20"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {cycle === "monthly" ? "Monthly" : "Annual"}
                </button>
              ))}
            </div>
            {billingCycle === "annual" && (
              <p className="text-sm text-cyan-300 font-medium">Save up to 20% with annual billing</p>
            )}
          </div>

          {/* Pricing cards */}
          <div className="grid gap-6 lg:grid-cols-3 max-w-6xl mx-auto">
            {tiers.map((tier) => {
              const price =
                tier.monthly === null
                  ? "Custom"
                  : billingCycle === "monthly"
                    ? `$${tier.monthly}`
                    : `$${tier.annual}`;
              const period = tier.monthly === null ? "" : "/mo";

              return (
                <div
                  key={tier.name}
                  className={`relative overflow-hidden rounded-3xl transition-all duration-300 hover:scale-[1.02] ${
                    tier.highlight
                      ? "border-2 border-cyan-400/50 shadow-2xl shadow-cyan-500/20"
                      : "border border-white/10"
                  }`}
                >
                  {tier.highlight && (
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-400 via-cyan-300 to-teal-400" />
                  )}
                  <div className={`h-full p-6 sm:p-8 flex flex-col ${
                    tier.highlight
                      ? "bg-gradient-to-br from-white/12 via-white/8 to-white/4"
                      : "bg-gradient-to-br from-white/8 via-white/4 to-white/2"
                  }`}>
                    {tier.highlight && (
                      <div className="inline-flex self-start items-center gap-1.5 px-3 py-1 mb-4 rounded-full bg-cyan-400/20 text-cyan-300 text-xs font-semibold">
                        <Sparkles className="h-3 w-3" />
                        Most Popular
                      </div>
                    )}

                    <div className="mb-6">
                      <h3 className="text-xl sm:text-2xl font-black text-white">{tier.name}</h3>
                      <p className="text-sm text-slate-300 mt-1">{tier.subtext}</p>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl sm:text-5xl font-black text-white">{price}</span>
                        <span className="text-slate-400 text-lg">{period}</span>
                      </div>
                      {billingCycle === "annual" && tier.monthly && (
                        <p className="text-xs text-slate-400 mt-1">Billed annually</p>
                      )}
                    </div>

                    <ul className="space-y-3 mb-8 flex-1">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm text-slate-200">
                          <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      onClick={() => openApplication(tier.name)}
                      className={`w-full py-4 px-6 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                        tier.highlight
                          ? "bg-gradient-to-r from-cyan-400 to-cyan-300 text-slate-900 hover:from-cyan-300 hover:to-cyan-200 shadow-lg shadow-cyan-500/20"
                          : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                      }`}
                    >
                      {tier.cta}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Referral Partnerships Section */}
        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/8 via-white/4 to-transparent p-6 sm:p-10 lg:p-14 shadow-2xl shadow-black/40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(0,210,190,0.12),transparent_45%),radial-gradient(circle_at_85%_10%,rgba(92,225,230,0.08),transparent_50%)]" />
          <div className="relative z-10 space-y-10">
            <div className="space-y-4 text-center max-w-3xl mx-auto">
              <h2 className="text-balance text-3xl sm:text-4xl lg:text-5xl font-black text-white">
                Referral Partnerships
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                A white-glove partnership motion for professional services teams who want more qualified introductions—without guessing, without spreadsheets, and with reporting your finance team can defend.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://calendly.com/jarred-referlabs/30min?month=2026-01"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-300 px-8 py-4 text-sm font-semibold text-slate-900 shadow-lg shadow-cyan-500/20 transition-all hover:from-cyan-300 hover:to-cyan-200 gap-2"
              >
                Book a Strategy Call
                <ArrowRight className="h-4 w-4" />
              </a>
              <button
                type="button"
                onClick={() => openApplication("Referral Partnerships")}
                className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                Apply Now
              </button>
            </div>

            {/* Two-column layout for How We Help and After the Call */}
            <div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
              {/* How We Help */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-400/20 to-cyan-500/10 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-cyan-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white">How We Help</h3>
                </div>
                <div className="space-y-4">
                  {partnershipFlow.map((stage, idx) => (
                    <div key={stage.title} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="h-8 w-8 rounded-full bg-cyan-400/20 flex items-center justify-center text-sm font-bold text-cyan-300">
                          {idx + 1}
                        </div>
                        {idx < partnershipFlow.length - 1 && (
                          <div className="w-px h-full bg-gradient-to-b from-cyan-400/30 to-transparent mt-2" />
                        )}
                      </div>
                      <div className="pb-6">
                        <p className="font-semibold text-white">{stage.title}</p>
                        <p className="text-sm text-slate-300 mt-1 leading-relaxed">{stage.detail}</p>
                        <p className="text-xs font-medium text-cyan-300 mt-2">{stage.result}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* After the Call */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-400/20 to-cyan-500/10 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-cyan-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white">After the Call</h3>
                </div>
                <div className="space-y-4">
                  {partnershipFollowUp.map((item, idx) => (
                    <div key={item.title} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="h-8 w-8 rounded-full bg-cyan-400/20 flex items-center justify-center text-sm font-bold text-cyan-300">
                          {idx + 1}
                        </div>
                        {idx < partnershipFollowUp.length - 1 && (
                          <div className="w-px h-full bg-gradient-to-b from-cyan-400/30 to-transparent mt-2" />
                        )}
                      </div>
                      <div className="pb-6">
                        <p className="font-semibold text-white">{item.title}</p>
                        <p className="text-sm text-slate-300 mt-1 leading-relaxed">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ROI Calculator Section */}
        <section className="space-y-6">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-white">Calculate Your Referral ROI</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              See exactly how much revenue your referral program could generate with our AI-powered calculator.
            </p>
          </div>

          {!showROICalculator ? (
            <div className="flex justify-center">
              <button
                onClick={() => setShowROICalculator(true)}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-lg shadow-purple-500/20 hover:from-purple-500 hover:to-indigo-500 transition-all"
              >
                <Calculator className="h-5 w-5" />
                Open ROI Calculator
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="rounded-3xl overflow-hidden border border-white/10 bg-white shadow-2xl">
              <Suspense fallback={
                <div className="flex items-center justify-center py-20 bg-slate-50">
                  <div className="animate-pulse text-purple-600">Loading calculator...</div>
                </div>
              }>
                <ROICalculator />
              </Suspense>
            </div>
          )}
        </section>

        {/* Compare table */}
        <section className="space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black text-white text-center">Compare Plans</h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg shadow-black/25">
            <table className="min-w-full text-left text-sm text-slate-100/90">
              <thead>
                <tr className="text-xs uppercase tracking-[0.12em] text-slate-400 border-b border-white/10">
                  <th className="px-4 sm:px-6 py-4 font-semibold">Feature</th>
                  <th className="px-4 sm:px-6 py-4 font-semibold text-center">Starter</th>
                  <th className="px-4 sm:px-6 py-4 font-semibold text-center bg-cyan-400/10">Growth</th>
                  <th className="px-4 sm:px-6 py-4 font-semibold text-center">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, idx) => (
                  <tr key={row.feature} className={`border-b border-white/5 ${idx % 2 === 0 ? "bg-white/[0.02]" : ""}`}>
                    <td className="px-4 sm:px-6 py-4 font-medium text-white">{row.feature}</td>
                    <td className="px-4 sm:px-6 py-4 text-center">
                      {row.starter ? <CheckCircle2 className="h-5 w-5 text-cyan-400 mx-auto" /> : <span className="text-slate-500">—</span>}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-center bg-cyan-400/5">
                      {row.growth ? <CheckCircle2 className="h-5 w-5 text-cyan-400 mx-auto" /> : <span className="text-slate-500">—</span>}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-center">
                      {row.enterprise ? <CheckCircle2 className="h-5 w-5 text-cyan-400 mx-auto" /> : <span className="text-slate-500">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-6 max-w-4xl mx-auto w-full">
          <h2 className="text-3xl sm:text-4xl font-black text-white text-center">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-6 py-5 shadow-md shadow-black/20 transition-all hover:bg-white/[0.07]"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer text-left list-none">
                  <h3 className="text-base sm:text-lg font-semibold text-white pr-4">{faq.q}</h3>
                  <span className="text-cyan-300 text-xl font-light group-open:rotate-45 transition-transform duration-200 flex-shrink-0">+</span>
                </summary>
                <p className="mt-4 text-sm text-slate-300 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-gradient-to-br from-white/10 via-white/6 to-white/10 px-6 sm:px-10 py-12 sm:py-16 shadow-2xl shadow-black/35 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(87,230,255,0.12),transparent_40%),radial-gradient(circle_at_75%_15%,rgba(10,186,181,0.12),transparent_45%)]" />
          <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              Ready to Transform Your Referral Network?
            </h2>
            <p className="text-base sm:text-lg text-slate-200">
              Join 500+ professional services firms already growing with Refer Labs.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
              <button
                onClick={() => openApplication("Referral Partnerships")}
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-300 text-slate-900 px-8 py-4 text-sm font-semibold hover:from-cyan-300 hover:to-cyan-200 transition-all shadow-lg shadow-cyan-500/20 gap-2"
              >
                Start Your Application
                <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/5 text-white px-8 py-4 text-sm font-semibold hover:bg-white/10 transition-all"
              >
                Talk to Sales
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
