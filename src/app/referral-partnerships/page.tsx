/* eslint-disable react/no-unescaped-entities */
import {
  BarChart3,
  ClipboardList,
  Gauge,
  Link2,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import { ReferralPartnershipsCTA } from "@/components/marketing/ReferralPartnershipsCTA";

export const metadata = generateSEOMetadata(seoConfig.referralPartnerships);
export const revalidate = 3600;

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

const valuePillars = [
  {
    title: "Structured Partner Onboarding",
    detail: "Briefs, offers, and approvals handled for you—so every partner starts with clarity and compliance.",
    icon: ClipboardList,
  },
  {
    title: "Full-Funnel Attribution",
    detail: "Unique links and events tracked from click to revenue with partner, campaign, and link IDs.",
    icon: Sparkles,
  },
  {
    title: "Performance-Based Rewards",
    detail: "Revenue share, credits, discounts, upgrades, points, or cash-per-demo—automated and auditable.",
    icon: Gauge,
  },
  {
    title: "Measure ROI With Confidence",
    detail: "Link opens, forms, demos, conversions, and payouts roll into Measure ROI for executive-ready reporting.",
    icon: BarChart3,
  },
] as const;

const referralFlowSteps = [
  {
    title: "Referral Partner",
    summary: "Partners receive briefs, offers, and unique links inside External Partners.",
    icon: Users,
  },
  {
    title: "Tracked interaction or transaction",
    summary: "Clicks, form submissions, demos, and revenue events are captured in real time.",
    icon: Link2,
  },
  {
    title: "Attribution",
    summary: "Partner, campaign, and link IDs flow into Measure ROI with audit-ready tracking.",
    icon: Sparkles,
  },
  {
    title: "Reward / Payout",
    summary: "Revenue share, credits, discounts, upgrades, points, or cash-per-demo settle with ledgers.",
    icon: ShieldCheck,
  },
] as const;

const capabilities = [
  {
    title: "Unique Referral Attribution",
    detail: "Partner, campaign, and link IDs stamped on every event—no duplicate credit.",
  },
  {
    title: "Partner-Level Tracking",
    detail: "Per-partner performance for opens, views, demos, conversions, and revenue.",
  },
  {
    title: "Performance-Based Rewards",
    detail: "Configure revenue share, credits, discounts, upgrades, points, or cash-per-demo payouts.",
  },
  {
    title: "End-to-End ROI Visibility",
    detail: "Executive-ready reporting inside Measure ROI with payout ledgers.",
  },
  {
    title: "Compliance Guardrails",
    detail: "Disclosures, approvals, and audit trails baked into the workflow.",
  },
  {
    title: "Dataset Delivery For Admins",
    detail: "Admins deliver curated partner datasets and update statuses in one place.",
  },
] as const;

const faqs = [
  {
    question: "How are referrals tracked end-to-end?",
    answer:
      "Every partner gets unique links tied to landing pages and CTAs. All events—opens, views, form submissions, demos, conversions, and revenue—carry partner, campaign, and link IDs into Measure ROI.",
  },
  {
    question: "How do partners get rewarded?",
    answer:
      "Choose from revenue share, credits, discounts, upgrades, points, or monetary rewards per booked demo. Payouts are logged with clear ledgers for finance and compliance.",
  },
  {
    question: "Can this work with LinkedIn influencers and external partners?",
    answer:
      "Yes. We onboard LinkedIn influencers, creators, consultants, advisors, agencies, and strategic partners with briefs, approvals, and unique referral links.",
  },
  {
    question: "What transparency do I get?",
    answer:
      "Partner-level dashboards show traffic, demos, conversions, revenue, and rewards. Admins can deliver curated datasets and status updates directly in External Partners.",
  },
  {
    question: "How do we start?",
    answer:
      "Apply with your objectives and ideal partners. We align on offers, links, compliance guardrails, and launch with full attribution on day one.",
  },
] as const;

export default function ReferralPartnershipsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#07131e] via-[#0c1c29] to-[#03080f] text-slate-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(87,230,255,0.08),transparent_38%),radial-gradient(circle_at_85%_10%,rgba(10,186,181,0.12),transparent_45%),radial-gradient(circle_at_50%_86%,rgba(255,255,255,0.12),transparent_55%)]" />

      <main className="relative mx-auto max-w-6xl px-6 pb-24 pt-16 sm:px-10 lg:px-16 space-y-16 sm:space-y-20">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-4xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent px-6 py-12 sm:px-10 sm:py-16 shadow-2xl shadow-black/40">
          <div className="relative z-10 space-y-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-cyan-200">Refer Labs Partnership Studio</p>
            <h1 className="text-balance text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] text-white">
              Referral Partnerships For Professional Services Leaders
            </h1>
            <p className="text-lg sm:text-xl text-slate-100/80 leading-relaxed max-w-3xl mx-auto">
              We source, activate, and track external partners—LinkedIn influencers, creators, advisors, consultants—with airtight attribution, ROI, and reward models you can defend.
            </p>
            <div className="flex justify-center">
              <ReferralPartnershipsCTA calendlyUrl={calendlyUrl} primaryLabel="Apply for Referral Partnerships" showScheduleCall={false} />
            </div>
          </div>
        </section>

        {/* Value pillars */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black text-[#00d2be]">Built For Measurable Partner-Led Growth</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {valuePillars.map((item) => (
              <div
                key={item.title}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-[1px] shadow-xl shadow-black/30"
              >
                <div className="relative h-full rounded-[1.6rem] bg-gradient-to-br from-white/8 via-white/4 to-white/6 border border-white/10 px-6 py-6 flex gap-4">
                  <div className="rounded-2xl bg-white/10 p-3 h-fit">
                    <item.icon className="h-6 w-6 text-cyan-100" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-black text-white">{item.title}</p>
                    <p className="text-sm text-slate-100/85 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Flow anchor */}
        <section id="referral-flow" className="relative overflow-hidden rounded-4xl border border-cyan-900/30 bg-gradient-to-br from-[#0b1f2a] via-[#0c2a38] to-[#020911] px-4 py-10 sm:px-8 sm:py-14 shadow-2xl shadow-cyan-900/30">
          <div className="pointer-events-none absolute inset-0">
            {/* Horizontal for md+ */}
            <div className="hidden md:block absolute left-[5%] right-[5%] top-1/2 h-[2px] bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent blur-[2px]" />
            <div className="hidden md:block">
              {[12, 38, 63, 88].map((left, idx) => (
                <div
                  key={`h-node-${idx}`}
                  className="absolute h-9 w-9 rounded-full bg-cyan-300/50 blur-xl"
                  style={{ left: `${left}%`, top: "50%", transform: "translate(-50%, -50%)" }}
                />
              ))}
            </div>
            {/* Vertical for mobile */}
            <div className="md:hidden absolute top-10 bottom-10 left-1/2 w-[2px] bg-gradient-to-b from-transparent via-cyan-300/70 to-transparent blur-[2px]" />
            <div className="md:hidden">
              {[14, 40, 66, 90].map((top, idx) => (
                <div
                  key={`v-node-${idx}`}
                  className="absolute h-9 w-9 rounded-full bg-cyan-300/50 blur-xl"
                  style={{ top: `${top}%`, left: "50%", transform: "translate(-50%, -50%)" }}
                />
              ))}
            </div>
          </div>

          <div className="relative z-10 flex flex-col gap-8">
            <div className="text-center space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100/90">How the Referrals Flow</p>
            </div>
            <div className="grid gap-6 md:grid-cols-4">
              {referralFlowSteps.map((step, idx) => (
                <div key={step.title} className="relative">
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/20 via-white/8 to-white/0 p-[1px] backdrop-blur">
                    <div className="h-full rounded-[1.65rem] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-xl shadow-black/25 px-5 py-6 flex flex-col gap-3">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="rounded-2xl bg-white/15 p-3 shadow-sm">
                            <step.icon className="h-5 w-5 text-cyan-100" />
                          </div>
                          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-100/80">
                            Step {String(idx + 1).padStart(2, "0")}
                          </span>
                        </div>
                      </div>
                      <p className="text-xl font-black text-white">{step.title}</p>
                      <p className="text-sm text-slate-100/90 leading-relaxed">{step.summary}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black text-[#00d2be]">What Refer Labs Enables</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {capabilities.map((cap) => (
              <div
                key={cap.title}
                className="rounded-3xl border border-white/10 bg-white/4 backdrop-blur-2xl px-5 py-5 shadow-lg shadow-black/25"
              >
                <p className="text-base font-semibold text-white">{cap.title}</p>
                <p className="mt-2 text-sm text-slate-100/85 leading-relaxed">{cap.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black text-[#00d2be]">Referral Partnerships FAQs</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-3xl border border-white/10 bg-white/4 backdrop-blur-2xl px-5 py-4 shadow-md shadow-black/20"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer text-left">
                  <h3 className="text-base sm:text-lg font-semibold text-white">{faq.question}</h3>
                  <span className="text-cyan-100 group-open:rotate-45 transition">+</span>
                </summary>
                <p className="mt-3 text-sm text-slate-100/85 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden rounded-4xl border border-white/12 bg-gradient-to-br from-white/10 via-white/6 to-white/12 px-8 py-12 sm:px-12 sm:py-14 shadow-2xl shadow-black/35 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(87,230,255,0.18),transparent_40%),radial-gradient(circle_at_75%_15%,rgba(10,186,181,0.18),transparent_45%)]" />
          <div className="relative z-10 space-y-4 max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">Apply for Referral Partnerships</h2>
            <p className="text-base sm:text-lg text-slate-100/85">
              Tell us your objectives and ideal partners. We’ll launch with attribution, compliance, and payouts ready on day one.
            </p>
            <div className="flex justify-center">
              <ReferralPartnershipsCTA calendlyUrl={calendlyUrl} primaryLabel="Apply for Referral Partnerships" showScheduleCall={false} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
