import Link from "next/link";
import { ArrowRight, Target, Radar, Sparkles, Shield, Users } from "lucide-react";

const offerings = [
  {
    title: "Lead Hacking Engine",
    label: "Core Offering",
    description:
      "A lead-generation engine built to identify, source, and unlock new revenue opportunities. We combine precision data sourcing with hands-on campaign building so every outbound motion is designed to create real pipeline.",
    bullets: [
      "New-market discovery: lookalike data, intent signals, and affiliate ecosystems.",
      "Campaign architecture: positioning, sequencing, and multi-touch touchpoints.",
      "Execution support: scripts, creative, and channel setup to ship fast.",
      "Performance loops: learnings, iteration, and handoff to your team.",
    ],
  },
  {
    title: "Affiliate Partner Ignition",
    label: "Expansion Track",
    description:
      "Focused on affiliate and referral ecosystems where partner-led growth unlocks high-quality leads faster than cold outbound alone.",
    bullets: [
      "Affiliate program mapping and tiering strategy.",
      "Partner sourcing with qualification-ready profiles.",
      "Outreach assets tailored for affiliates and strategic partners.",
      "Revenue-share positioning that attracts premium partners.",
    ],
  },
  {
    title: "Revenue Ops Signal Layer",
    label: "Enablement",
    description:
      "We install a lightweight signal layer that tells you which lead sources convert, which partners drive momentum, and where revenue stalls.",
    bullets: [
      "Campaign tracking architecture for channel attribution.",
      "Lead scoring cues for speed-to-lead priorities.",
      "Deal stage diagnostics with clear next actions.",
    ],
  },
];

const process = [
  {
    title: "Intelligence Sprint",
    detail: "We analyze the market, affiliate landscape, and data signals to identify the highest-probability lead segments.",
  },
  {
    title: "Campaign Build",
    detail: "We build positioning, messaging, and sequencing that is engineered to start conversations with the right decision-makers.",
  },
  {
    title: "Launch + Optimization",
    detail: "Execution support stays on through launch to iterate fast and lift conversion across channels.",
  },
  {
    title: "Revenue Handoff",
    detail: "We provide documentation, insights, and playbooks so your team can scale the engine internally.",
  },
];

const differentiators = [
  {
    title: "Not a generic agency",
    detail:
      "We focus on lead sourcing precision and affiliate-powered growth, not spray-and-pray outbound.",
  },
  {
    title: "Built for revenue teams",
    detail:
      "Every campaign is designed to align with pipeline goals, stage velocity, and high-intent conversion.",
  },
  {
    title: "Strategic and hands-on",
    detail:
      "We do the work alongside you, from source mapping to full campaign execution.",
  },
];

export default function LeadHackingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f3fbfb] text-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(1,94,102,0.18),transparent_45%),radial-gradient(circle_at_80%_5%,rgba(250,204,21,0.18),transparent_40%),radial-gradient(circle_at_40%_90%,rgba(14,116,144,0.16),transparent_45%)]" />
      <div className="absolute -top-16 right-0 h-64 w-64 rounded-full bg-gradient-to-br from-[#0f766e] to-[#115e59] opacity-10 blur-3xl" />
      <div className="absolute bottom-0 left-[-10%] h-72 w-72 rounded-full bg-gradient-to-br from-[#f59e0b] to-[#f97316] opacity-10 blur-3xl" />

      <main className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-20 pt-12 md:px-10 lg:px-16">
        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#0f4c5c] shadow-sm">
              Lead Hacking
              <span className="h-1.5 w-1.5 rounded-full bg-[#f59e0b]" />
              Affiliate-forward growth
            </div>
            <h1 className="text-balance text-4xl font-black leading-tight text-[#073b43] sm:text-5xl lg:text-6xl">
              A lead-generation engine built to unlock revenue your team has not seen yet.
            </h1>
            <p className="text-lg leading-relaxed text-slate-700">
              Lead Hacking is a strategic growth offering for companies that want a repeatable,
              high-quality pipeline. We identify and source premium leads, then build the campaigns
              that convert them. Execution support is included, but the core value is a revenue
              engine that keeps compounding.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0f766e]/25 transition hover:bg-[#115e59]"
              >
                Request a strategy call
                <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="flex items-center gap-2 rounded-full border border-[#0f766e]/30 bg-white/70 px-5 py-3 text-sm font-semibold text-[#0f4c5c]">
                No pricing listed. Built for performance.
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl backdrop-blur">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0f766e]/10">
                  <Target className="h-6 w-6 text-[#0f766e]" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Primary Focus</p>
                  <p className="text-xl font-bold text-[#073b43]">New high-quality lead sourcing</p>
                </div>
              </div>
              <p className="text-sm text-slate-600">
                We map new segments, identify affiliate-driven demand, and build the campaigns that
                turn those leads into qualified conversations.
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl bg-[#f8fafc] p-4">
                  <p className="text-xs font-semibold uppercase text-[#0f4c5c]">Signals</p>
                  <p className="text-sm text-slate-600">Intent data, partner fit, and deal velocity.</p>
                </div>
                <div className="rounded-2xl bg-[#f8fafc] p-4">
                  <p className="text-xs font-semibold uppercase text-[#0f4c5c]">Campaigns</p>
                  <p className="text-sm text-slate-600">Outbound, affiliate, and co-marketed flows.</p>
                </div>
                <div className="rounded-2xl bg-[#f8fafc] p-4">
                  <p className="text-xs font-semibold uppercase text-[#0f4c5c]">Execution</p>
                  <p className="text-sm text-slate-600">Messaging, sequences, and conversion tests.</p>
                </div>
                <div className="rounded-2xl bg-[#f8fafc] p-4">
                  <p className="text-xs font-semibold uppercase text-[#0f4c5c]">Outcomes</p>
                  <p className="text-sm text-slate-600">Predictable lead flow and revenue lift.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {offerings.map((offering) => (
            <div
              key={offering.title}
              className="flex flex-col justify-between rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl backdrop-blur"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0f4c5c]">
                    {offering.label}
                  </p>
                  <span className="rounded-full bg-[#0f766e]/10 px-3 py-1 text-xs font-semibold text-[#0f4c5c]">
                    Performance
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-[#073b43]">{offering.title}</h2>
                <p className="text-sm text-slate-600">{offering.description}</p>
                <ul className="space-y-2 text-sm text-slate-700">
                  {offering.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-[#0f766e]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="rounded-3xl border border-white/70 bg-[#0b3b3f] p-8 text-white shadow-2xl">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#fef3c7]">
                Invite-only
              </div>
              <h2 className="text-3xl font-bold">Remote Booking Setter</h2>
              <p className="text-sm text-slate-200">
                This is a selective, hands-on partnership where we operate as your remote booking
                setter. We only accept businesses where we want deeper involvement and can control
                the entire outreach-to-booking flow.
              </p>
              <ul className="space-y-3 text-sm text-slate-100">
                <li className="flex items-start gap-3">
                  <Sparkles className="mt-0.5 h-4 w-4 text-[#f59e0b]" />
                  Reserved for teams with clear ICP alignment and strong backend sales follow-up.
                </li>
                <li className="flex items-start gap-3">
                  <Users className="mt-0.5 h-4 w-4 text-[#f59e0b]" />
                  We build and operate the booking motion with real-time reporting.
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="mt-0.5 h-4 w-4 text-[#f59e0b]" />
                  The goal is focused: high-quality booked calls, not vanity metrics.
                </li>
              </ul>
              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 text-xs text-slate-200">
                Acceptance is limited. We prioritize affiliate-ready companies with strong lifetime
                value and clear conversion infrastructure.
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#073b43]">How Lead Hacking Works</h2>
            <div className="grid gap-4">
              {process.map((step) => (
                <div
                  key={step.title}
                  className="flex gap-4 rounded-2xl border border-white/70 bg-white/80 p-5 shadow-lg backdrop-blur"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0f766e]/10">
                    <Radar className="h-5 w-5 text-[#0f766e]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0f4c5c]">
                      {step.title}
                    </p>
                    <p className="text-sm text-slate-600">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/70 bg-white/80 p-8 shadow-xl backdrop-blur">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-[#073b43]">
                Built for affiliate-driven revenue teams
              </h2>
              <p className="text-sm text-slate-600">
                Our approach is anchored in affiliate ecosystems and partner-led growth. We’re not an
                outsourced SDR team. We treat affiliate programs as a revenue amplifier, then build
                lead sourcing and campaigns around that advantage.
              </p>
              <div className="grid gap-3 md:grid-cols-3">
                {differentiators.map((item) => (
                  <div key={item.title} className="rounded-2xl bg-[#f8fafc] p-4">
                    <p className="text-sm font-semibold text-[#0f4c5c]">{item.title}</p>
                    <p className="text-xs text-slate-600">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-[#0f766e] via-[#0c4a6e] to-[#0b3b3f] p-8 text-white shadow-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#fcd34d]">
                Lead Hacking Focus
              </p>
              <h3 className="mt-3 text-2xl font-bold">Pipeline outcomes, not busywork.</h3>
              <p className="mt-3 text-sm text-slate-100">
                We treat every campaign as a revenue asset. From affiliate partner lead sourcing to
                launch-ready sequences, the goal is simple: more qualified conversations that turn
                into revenue.
              </p>
              <div className="mt-6 rounded-2xl bg-white/10 p-4 text-xs text-slate-100">
                No pricing on the page. Each engagement is scoped around revenue objectives and
                growth constraints.
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col items-center gap-4 rounded-3xl border border-white/70 bg-white/80 p-8 text-center shadow-xl backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#0f4c5c]">
            Ready to explore Lead Hacking?
          </p>
          <h2 className="text-3xl font-bold text-[#073b43]">
            Let’s identify new revenue opportunities together.
          </h2>
          <p className="max-w-2xl text-sm text-slate-600">
            If you’re serious about affiliate-driven lead generation and want a strategic, premium
            execution partner, we should talk.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#f59e0b] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#f59e0b]/30 transition hover:bg-[#f97316]"
          >
            Start the conversation
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </main>
    </div>
  );
}
