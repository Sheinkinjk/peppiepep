import { ArrowRight, BadgeCheck, BarChart3, Building2, Calendar, CheckCircle2, Handshake, Linkedin, Megaphone, Sparkles, Target, Users } from "lucide-react";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import Link from "next/link";

export const metadata = generateSEOMetadata(seoConfig.leadHacking);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min";

const partnerTypes = [
  {
    icon: Building2,
    title: "Agency Partners",
    subtitle: "Australian agencies serving your ideal customers",
    description:
      "Australian agencies and service providers sit upstream of buying decisions. They already have relationships with the companies you want to sell to. We identify, approach, and activate the right agencies as distribution partners for your product.",
    how: {
      heading: "How we source and activate",
      bullets: [
        "Map Australian agencies with overlapping client bases and clear partnership upside",
        "Run targeted outreach with a partnership-first value proposition and deal structure",
        "Onboard partners with intro scripts, tracking links, and enablement materials",
      ],
    },
    outcome: {
      heading: "What you get",
      bullets: [
        "3-8 qualified agency conversations per quarter",
        "Structured partnership terms and co-selling framework",
        "Ongoing partner communication and performance tracking",
      ],
    },
  },
  {
    icon: Linkedin,
    title: "LinkedIn Creators",
    subtitle: "Australian creators with trust and attention in your niche",
    description:
      "We build performance-based partnerships with Australian creators who already influence the exact people you want to sell to. The goal is tracked introductions, booked calls, and revenue you can attribute - not impressions.",
    how: {
      heading: "How we source and activate",
      bullets: [
        "Audience/ICP matching and creator scoring so you only pay for aligned reach",
        "Structured partnership offer with approved messaging and performance terms",
        "Deal setup with tracking links so every click, booking, and conversion is attributed",
      ],
    },
    outcome: {
      heading: "What you get",
      bullets: [
        "5-15 vetted creator profiles matched to your ICP",
        "Performance-tracked campaigns with clear attribution",
        "Scalable creator channel with weekly optimisation",
      ],
    },
  },
  {
    icon: Handshake,
    title: "Consultants & Advisors",
    subtitle: "Trusted Australian operators who influence buying decisions",
    description:
      "Consultants, fractional leaders, and specialist advisors are often the most credible referrers in Australia. They steer buying decisions daily. We help you earn long-term, trust-based distribution with clear incentives and low-friction handoffs.",
    how: {
      heading: "How we source and activate",
      bullets: [
        "Map advisor ecosystems by influence and proof - not just titles",
        "Respect-first outreach that secures a warm intro path and sets terms upfront",
        "Handoff flows with attribution and reporting so advisors keep referring",
      ],
    },
    outcome: {
      heading: "What you get",
      bullets: [
        "10-20 advisor conversations per quarter",
        "Structured referral terms with transparent payout process",
        "Trust-based channel that compounds over time",
      ],
    },
  },
];

const sourcingProcess = [
  {
    icon: Target,
    title: "Define the ICP and partner fit",
    description:
      "We align on your ideal Australian customer, what triggers a good referral, and which partner type is most likely to deliver it (agency, creator, advisor).",
    deliverable: "ICP brief, partner profile, and qualification rules",
  },
  {
    icon: Sparkles,
    title: "Build a targeted partner list",
    description:
      "Systematic sourcing: we research, shortlist, and prioritise Australian partners based on client overlap, credibility, and distribution potential.",
    deliverable: "Vetted shortlist and prioritised outreach pipeline",
  },
  {
    icon: Megaphone,
    title: "Outreach and deal structuring",
    description:
      "We open the conversation with clear value, define partnership mechanics, and remove ambiguity so partners know exactly what to do and what they earn.",
    deliverable: "Outreach sequences, partner offer, and terms",
  },
  {
    icon: BadgeCheck,
    title: "Onboard and enable partners",
    description:
      "Partners get the assets and clarity they need: intro scripts, messaging angles, proof points, FAQs, and tracking links - so activation is immediate.",
    deliverable: "Partner kit, tracking setup, and activation plan",
  },
  {
    icon: BarChart3,
    title: "Track, report, and optimise",
    description:
      "Closed-loop attribution and regular partner communication turns a one-off intro into a repeatable channel. We refine partners, offers, and handoffs based on performance data.",
    deliverable: "Attribution dashboard, reporting, and optimisation roadmap",
  },
];

const partnershipBlueprint = [
  {
    title: "Clear partner promise",
    details:
      "Partners need a simple 'why partner' story: who it helps, what makes it different, and what is in it for them (and their clients).",
  },
  {
    title: "Low-friction handoff",
    details:
      "A referral should take seconds: intro script, tracking link, and a capture flow that qualifies without friction.",
  },
  {
    title: "Attribution you can trust",
    details:
      "Partner-specific tracking links, conversion events (call booked, demo, signup, deal closed), and transparent reporting.",
  },
  {
    title: "Enablement assets",
    details:
      "Co-branded collateral, proof points, FAQs, talk tracks, and campaign angles that partners can use without extra work.",
  },
  {
    title: "Clear terms and governance",
    details:
      "Commission rules, payout timing, compliance requirements, and a simple system to prevent disputes and maintain trust.",
  },
];

export default function LeadHackingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#012e36] via-[#03424d] to-[#02272f] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(10,186,181,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(87,230,255,0.06),transparent_50%)]" />
      </div>

      <main
        id="main-content"
        className="relative mx-auto max-w-6xl px-6 pb-24 pt-16 sm:px-10 lg:px-16"
      >
        {/* Hero */}
        <section className="mb-24 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8">
            <h1 className="text-4xl font-black leading-[1.08] sm:text-5xl lg:text-[3.5rem] text-white">
              Source The Right{" "}
              <span className="text-cyan-400">
                Australian Partners
              </span>{" "}
              And Turn Them Into Revenue
            </h1>

            <p className="text-xl leading-relaxed text-slate-200/90">
              We systematically source, qualify, and activate Australian partners - agencies, LinkedIn creators,
              and advisors - so you get warm introductions and booked conversations without cold outreach.
            </p>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-slate-200/90 mb-5">
                Instead of building a pipeline one cold message at a time, you build distribution through partners
                that already have trust, access, and context in the Australian market.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { label: "Partner-sourced deals", detail: "Warm intros from trusted people" },
                  { label: "Higher close rates", detail: "Leads arrive pre-qualified" },
                  { label: "Repeatable pipeline", detail: "A channel you can scale" },
                  { label: "Clear attribution", detail: "Know which partners convert" },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-white/10 bg-slate-950/30 p-4">
                    <p className="text-sm font-bold text-white">{item.label}</p>
                    <p className="mt-1 text-xs text-slate-300">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#0AA7B5]/30 transition hover:bg-[#00838F]"
              >
                <Calendar className="h-5 w-5" />
                Book a Call
              </a>
              <p className="text-sm text-slate-400">
                30 minutes. We will map the best partner type for your ICP and the mechanics to activate it.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-slate-900/70 to-slate-950/40 p-8 shadow-2xl shadow-cyan-500/10">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0AA7B5] to-cyan-400">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-black text-white">Partner Channel Engineering</p>
                </div>
              </div>

              <p className="mb-6 text-slate-300">
                Partnerships only work when the program is clear and the partner list is targeted.
                We source the right Australian partners and activate them with tracking, assets, and a repeatable process.
              </p>

              <div className="grid gap-3">
                {[
                  "Partnership program design (rules, incentives, handoffs)",
                  "Partner sourcing and qualification (fit first, volume second)",
                  "Partner onboarding and enablement assets",
                  "Attribution and reporting so you can scale winners",
                ].map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                    <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-200">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Three Partner Lanes */}
        <section className="mb-24">
          <div className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Three Partner Lanes, One Activation Engine</h2>
            <p className="max-w-3xl text-lg text-slate-200/90">
              Each lane has its own partnership motion. We design the program (terms, handoffs, tracking)
              and source the right Australian partners so you see booked calls and tracked revenue.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {partnerTypes.map((partner) => {
              const Icon = partner.icon;
              return (
                <div
                  key={partner.title}
                  className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-slate-900/60 to-slate-950/45 p-7"
                >
                  <div className="mb-5 flex items-start gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#0AA7B5] to-cyan-400">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white">{partner.title}</h3>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-slate-200/95">{partner.description}</p>

                  <div className="mt-6 rounded-xl border border-white/10 bg-slate-950/30 p-5">
                    <div className="mt-3 space-y-2">
                      {partner.how.bullets.map((bullet) => (
                        <div key={bullet} className="flex gap-3">
                          <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-cyan-400" />
                          <p className="text-sm text-slate-200">{bullet}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-5">
                    <div className="mt-3 space-y-2">
                      {partner.outcome.bullets.map((bullet) => (
                        <div key={bullet} className="flex gap-3">
                          <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-cyan-300/90" />
                          <p className="text-sm text-slate-200">{bullet}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-white/[0.02] to-transparent p-8">
            <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
              <div className="max-w-3xl">
                <p className="mt-2 text-lg text-slate-200/90">
                  We will recommend the highest-leverage partner type for your product and ICP in Australia,
                  then design the partnership mechanics and sourcing plan around it.
                </p>
              </div>
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#0AA7B5]/30 transition hover:bg-[#00838F] w-full md:w-auto"
              >
                Book a Call
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </section>

        {/* Sourcing Process */}
        <section className="mb-24">
          <div className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Sourcing, Activation, Optimisation</h2>
            <p className="max-w-3xl text-lg text-slate-300">
              Our partner sourcing process finds the right Australian partners, turns interest into partnerships,
              and gives you the data to scale what performs.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {sourcingProcess.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex gap-6 rounded-2xl border border-cyan-500/20 bg-slate-900/60 p-8"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0AA7B5] to-cyan-400 text-lg font-black text-white">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-cyan-300" />
                      <h3 className="text-xl font-black text-white">{item.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.description}</p>
                    <div className="mt-5 rounded-xl border border-white/10 bg-slate-950/30 px-4 py-3">
                      <p className="mt-1 text-sm text-slate-200">{item.deliverable}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Partnership Blueprint */}
        <section className="mb-24">
          <div className="mb-10 text-center">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">What Makes Partnerships Actually Work</h2>
            <p className="mx-auto max-w-3xl text-lg text-slate-300">
              Partners refer because the program is easy, the offer is credible, and the attribution is transparent.
              We connect this blueprint to the right Australian partner list.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {partnershipBlueprint.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-7">
                <p className="text-lg font-black text-white">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.details}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-400/10 via-white/[0.02] to-transparent p-12 text-center">
          <h2 className="mb-4 text-3xl sm:text-4xl font-black text-white">Want Australian Partners That Actually Convert?</h2>
          <p className="mx-auto mb-8 max-w-3xl text-lg text-slate-300">
            We will map your best partner lane, design the partnership mechanics, and show you what our sourcing
            process looks like to activate partners consistently - with clear attribution.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#0AA7B5]/30 transition hover:bg-[#00838F]"
            >
              <Calendar className="h-5 w-5" />
              Book a Call
            </a>
            <Link
              href="/for-business"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-bold text-white transition hover:bg-white/10"
            >
              View All Services
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
