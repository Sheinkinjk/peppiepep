import Link from "next/link";
import { ArrowRight, BarChart3, CheckCircle2, Route, Send, Target, Users, Wrench, Zap } from "lucide-react";

import { AutomateLeadToolForm } from "./sections/AutomateLeadToolForm";

const coreServices = [
  {
    icon: Target,
    title: "Ideal Client Targeting",
    description:
      "Get clarity on exactly who you want to reach, what makes them a fit, and what message will earn attention.",
    bullets: [
      "Ideal client profile (ICP) + targeting criteria",
      "Offer + positioning aligned to buying intent",
      "Message angles you can reuse across channels",
    ],
  },
  {
    icon: Wrench,
    title: "Lead Capture Tool + Automation",
    description:
      "Turn interest into structured enquiries with a form that captures fit, routes leads instantly, and triggers follow-up.",
    bullets: [
      "Lead capture form tailored to your ICP",
      "Automated routing to email/CRM + notifications",
      "Simple tracking to measure what converts",
    ],
  },
  {
    icon: Send,
    title: "Outbound + Nurture Sequences",
    description:
      "Launch repeatable outreach and follow-ups that move the right prospects into booked conversations.",
    bullets: [
      "Outreach sequences (email, LinkedIn, referral prompts)",
      "Follow-up + nurture flows for warm leads",
      "A process your team can run consistently",
    ],
  },
];

const growthTactics = [
  {
    tactic: "Lead capture + routing",
    summary: "Capture ICP-fit details and route enquiries to the right place instantly.",
    details: "Form → qualification fields → routing → follow-up triggers",
  },
  {
    tactic: "Cold email sequences",
    summary: "Targeted outreach that starts conversations, not vanity metrics.",
    details: "Copy + sequencing + deliverability fundamentals",
  },
  {
    tactic: "LinkedIn outreach",
    summary: "Connection + messaging workflows that keep your pipeline clean.",
    details: "Connection workflow + messaging + follow-up hygiene",
  },
  {
    tactic: "Content → lead funnels",
    summary: "Pages and lead magnets that capture intent and hand off to automation.",
    details: "Landing page + form + nurture sequence",
  },
  {
    tactic: "Paid acquisition",
    summary: "Use ads when the capture flow is ready to convert and be tracked.",
    details: "Tracking + funnel structure before scaling spend",
  },
  {
    tactic: "Sales follow-up sequences",
    summary: "Make sure no enquiry gets lost or forgotten.",
    details: "Automated reminders + handoff + simple reporting",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Define your ideal client",
    description:
      "We capture the key details of your best-fit clients and the exact audience you want to reach, then turn that into targeting and messaging.",
    deliverable: "ICP + targeting + messaging brief",
  },
  {
    step: "02",
    title: "Automate the lead capture tool",
    description:
      "We build the form, qualification fields, and routing—so enquiries arrive structured and ready for follow-up.",
    deliverable: "Lead capture form + routing automation",
  },
  {
    step: "03",
    title: "Launch outreach + nurture",
    description:
      "With capture and routing in place, we roll out outreach and follow-ups that move leads into booked conversations.",
    deliverable: "Sequences + follow-up workflow",
  },
  {
    step: "04",
    title: "Improve what converts",
    description:
      "We iterate on targeting, form questions, and follow-ups so the system gets sharper over time—without adding complexity.",
    deliverable: "Iteration plan + playbook",
  },
];

export default function LeadHackingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.15),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(249,115,22,0.12),transparent_50%)]" />
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-gradient-to-br from-emerald-500/20 to-transparent blur-3xl animate-pulse" />
      <div
        className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-gradient-to-br from-orange-500/20 to-transparent blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <main className="relative mx-auto max-w-7xl px-6 pb-24 pt-12 sm:px-10 lg:px-16">
        {/* Hero */}
        <section className="mb-20 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-400">
              <Zap className="h-3.5 w-3.5" />
              Lead Hacking
            </div>

            <h1 className="text-balance text-5xl font-black leading-[1.1] sm:text-6xl lg:text-7xl">
              Grow Your Pool Of{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Prospective Clients.
              </span>
            </h1>

            <p className="text-xl leading-relaxed text-slate-300">
              We build an automated lead capture tool, targeting, and follow-up flow—so you can consistently start more qualified conversations without manual chasing.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Clarify your ideal client and targeting",
                "Capture leads with a tailored form + routing",
                "Automate follow-up so leads don’t go cold",
                "Track what converts and improve over time",
              ].map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-start gap-3 rounded-2xl border border-slate-700/50 bg-slate-800/40 p-4 backdrop-blur"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                  <span className="text-sm text-slate-200">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="#automate-tool"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-4 text-base font-bold text-white shadow-2xl shadow-emerald-500/30 transition hover:shadow-emerald-500/50 hover:scale-105"
              >
                Automate My Lead Tool
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-slate-600 bg-slate-800/50 px-8 py-4 text-base font-bold text-white backdrop-blur transition hover:border-slate-500 hover:bg-slate-700/50"
              >
                Talk To Us
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-8 shadow-2xl backdrop-blur">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600">
                  <Route className="h-7 w-7 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">The Outcome</p>
                  <p className="text-2xl font-black text-white">A Repeatable Lead Flow</p>
                </div>
              </div>

              <p className="mb-6 text-slate-300">
                A lead capture tool and follow-up workflow that collects the right information, routes leads instantly, and keeps your pipeline moving.
              </p>

              <div className="space-y-3">
                {[
                  "A form that captures ICP-fit details",
                  "Automatic routing to email/CRM",
                  "A follow-up sequence that runs consistently",
                  "Simple tracking so you can improve what converts",
                ].map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                    <span className="text-sm text-slate-200">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Automate section */}
        <section id="automate-tool" className="mb-20">
          <div className="mb-12">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-emerald-400">
              Automate a Lead Generating Tool
            </p>
            <h2 className="text-4xl font-black text-white sm:text-5xl">Tell us who you want to reach.</h2>
            <p className="mt-4 max-w-3xl text-lg text-slate-300">
              Complete the form below to capture the key details of your ideal clients and the exact audience you want to target. We&apos;ll use it to map your targeting, build the right capture fields, and automate the routing + follow-up.
            </p>
          </div>

          <AutomateLeadToolForm />
        </section>

        {/* What we build */}
        <section className="mb-20">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-emerald-400">What We Build</p>
            <h2 className="text-4xl font-black text-white sm:text-5xl">Lead Systems You Can Run Weekly</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
              A simple, automated setup that captures fit, routes leads, and supports consistent follow-up.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {coreServices.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="group relative overflow-hidden rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-8 shadow-xl backdrop-blur transition hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/10"
                >
                  <Icon className="mb-6 h-12 w-12 text-emerald-400" />
                  <h3 className="mb-3 text-2xl font-black text-white">{service.title}</h3>
                  <p className="mb-6 text-sm leading-relaxed text-slate-300">{service.description}</p>
                  <div className="space-y-2 border-t border-slate-700/50 pt-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">What you get:</p>
                    {service.bullets.map((bullet) => (
                      <div key={bullet} className="flex items-start gap-2">
                        <BarChart3 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        <span className="text-sm text-slate-200">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Tactics */}
        <section className="mb-20">
          <div className="mb-12">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-emerald-400">Tactics</p>
            <h2 className="text-4xl font-black text-white sm:text-5xl">Growth Tactics We Deploy</h2>
            <p className="mt-4 max-w-3xl text-lg text-slate-300">
              We use the right mix of channels for your audience, then automate capture and follow-up so the work is repeatable.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {growthTactics.map((tactic) => (
              <div
                key={tactic.tactic}
                className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur"
              >
                <h3 className="mb-2 text-lg font-bold text-white">{tactic.tactic}</h3>
                <p className="mb-3 text-sm text-slate-300">{tactic.summary}</p>
                <div className="rounded-lg bg-emerald-500/10 px-3 py-2">
                  <p className="text-xs font-semibold text-emerald-400">{tactic.details}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="mb-20">
          <div className="mb-12">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-emerald-400">How It Works</p>
            <h2 className="text-4xl font-black text-white sm:text-5xl">From Brief to Booked Conversations</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="flex gap-6 rounded-3xl border border-slate-700/50 bg-slate-800/50 p-8 backdrop-blur"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-2xl font-black text-white">
                  {step.step}
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-white">{step.title}</h3>
                  <p className="mb-4 text-sm text-slate-300">{step.description}</p>
                  <div className="rounded-lg bg-emerald-500/10 px-3 py-2">
                    <p className="text-xs font-semibold text-emerald-400">Deliverable: {step.deliverable}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-900/30 via-slate-900/80 to-slate-900/80 p-12 text-center shadow-2xl backdrop-blur">
          <Users className="mx-auto mb-6 h-16 w-16 text-emerald-400" />
          <h2 className="mb-4 text-4xl font-black text-white sm:text-5xl">Ready to automate lead flow?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-300">
            Tell us who you want to reach and we&apos;ll map the capture fields, routing, and follow-up workflow needed to turn targeting into booked conversations.
          </p>
          <Link
            href="#automate-tool"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-10 py-5 text-lg font-bold text-white shadow-2xl shadow-emerald-500/30 transition hover:shadow-emerald-500/50 hover:scale-105"
          >
            Start The Automation Brief
            <ArrowRight className="h-6 w-6" />
          </Link>
          <p className="mt-6 text-sm text-slate-400">
            Prefer email? Use the form above or reach us via the contact page.
          </p>
        </section>
      </main>
    </div>
  );
}
