import { ArrowRight, BadgeCheck, BarChart3, Building2, Handshake, Linkedin, Megaphone, Sparkles, Target, Users } from "lucide-react";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.leadHacking);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min";

function ScheduleCallCTA({ className = "" }: { className?: string }) {
  return (
    <a
      href={calendlyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        "inline-flex items-center justify-center gap-2 rounded-full bg-[#0ABAB5] px-8 py-4 text-base font-black text-slate-950 shadow-2xl shadow-[#0ABAB5]/25 transition hover:bg-[#2BD3CE] hover:shadow-[#0ABAB5]/35 hover:-translate-y-0.5",
        className,
      ].join(" ")}
    >
      Schedule A Call
      <ArrowRight className="h-5 w-5" />
    </a>
  );
}

const partnerTypes = [
  {
    icon: Linkedin,
    title: "LinkedIn Influencers",
    subtitle: "Creators with trust + attention in your niche",
    description:
      "We build performance-based partnerships with creators who already influence the exact people you want to sell to. The goal isn’t impressions—it’s tracked introductions, booked calls, and revenue you can attribute.",
    affiliateProgram: {
      heading: "How the affiliate program works",
      bullets: [
        "Creator gets a unique tracking link + affiliate code (plus approved messaging + offer positioning).",
        "Content drives intent to a dedicated handoff flow (landing page, booking link, or affiliate capture).",
        "You see every conversion (call booked, demo requested, signup, purchase) and double down on what performs.",
      ],
    },
    leadHacking: {
      heading: "How Lead Hacking supports it",
      bullets: [
        "Audience/ICP matching + creator scoring so you only pay for aligned reach.",
        "Structured affiliate offer + brief + creator pack with approved messaging and affiliate terms.",
        "Deal setup + tracking links so every click, booking, and conversion is attributed.",
      ],
    },
  },
  {
    icon: Building2,
    title: "Agencies & Strategic Partners",
    subtitle: "Service providers who already serve your ICP",
    description:
      "Agencies and ecosystem partners can become your most consistent source of qualified affiliates because they sit upstream of buying decisions. We help you turn that proximity into a structured affiliate motion.",
    affiliateProgram: {
      heading: "How the affiliate program works",
      bullets: [
        "Partner receives a simple partner kit: who to refer, qualifying signals, how to introduce, and what they earn.",
        "Affiliates are captured with partner-specific links/codes so attribution is clean and payouts are simple.",
        "You create a reliable co-selling lane: warm intros → fast qualification → booked calls → closed-loop updates back to partners.",
      ],
    },
    leadHacking: {
      heading: "How Lead Hacking supports it",
      bullets: [
        "Map agencies with overlapping clients + clear affiliate upside, not just logos.",
        "Run targeted outreach with a affiliate-first value prop, offer, and payout structure.",
        "Onboard with a partner kit (intro scripts, offers, tracking links) and measure activations week by week.",
      ],
    },
  },
  {
    icon: Handshake,
    title: "Consultants & Advisors",
    subtitle: "Trusted operators who influence buying decisions",
    description:
      "Consultants and advisors (fractional leaders, specialists, operators) are often the most credible referrers. We help you earn long-term trust-based distribution with clear incentives and low-friction handoffs.",
    affiliateProgram: {
      heading: "How the affiliate program works",
      bullets: [
        "Advisor receives an easy way to introduce you (intro script + affiliate link/code + qualification checklist).",
        "You keep the advisor in the loop: status updates, outcome reporting, and a predictable payout process.",
        "Because trust is everything, the program is designed to feel helpful—not salesy—with clear rules and transparency.",
      ],
    },
    leadHacking: {
      heading: "How Lead Hacking supports it",
      bullets: [
        "Map advisor ecosystems by influence + proof, not titles; prioritize those who steer buying decisions.",
        "Respect-first outreach that secures a warm intro path and sets affiliate rules up front.",
        "Handoff flows + attribution + reporting so advisors keep referring (and trust the process).",
      ],
    },
  },
];

const leadHackingLoop = [
  {
    icon: Target,
    title: "Define the ICP + partner fit",
    description:
      "We align on who you want (ICP), what triggers a good affiliate, and which partner type is most likely to deliver it (creator, agency, advisor).",
    deliverable: "ICP + partner profile + qualification rules",
  },
  {
    icon: Sparkles,
    title: "Build a targeted partner list",
    description:
      "Lead Hacking means systematic sourcing: we research, shortlist, and prioritise partners based on overlap, incentives, credibility, and distribution.",
    deliverable: "Vetted shortlist + prioritised outreach pipeline",
  },
  {
    icon: Megaphone,
    title: "Outreach + deal structuring",
    description:
      "We open the conversation with clear value, define affiliate mechanics, and remove ambiguity so partners know exactly what to do and what they earn.",
    deliverable: "Outreach sequences + partner offer + terms",
  },
  {
    icon: BadgeCheck,
    title: "Onboard + enable partners",
    description:
      "Partners get the assets and clarity they need: intros, messaging angles, proof points, FAQs, and tracking links—so you can activate quickly.",
    deliverable: "Partner kit + tracking setup + activation plan",
  },
  {
    icon: BarChart3,
    title: "Track, report, and optimise",
    description:
      "Closed-loop attribution (and partner communication) turns a one-off intro into a repeatable channel. We refine partners, offers, and handoffs based on data.",
    deliverable: "Attribution + reporting + optimisation roadmap",
  },
];

const affiliateProgramBlueprint = [
  {
    title: "Clear partner promise",
    details:
      "Partners need a simple “why partner with you” story: who it helps, what’s unique, and what’s in it for them (and their audience/clients).",
  },
  {
    title: "Low-friction handoff",
    details:
      "A affiliate should take seconds: intro script, affiliate link/code, and a capture flow that qualifies without feeling like a form-funnel.",
  },
  {
    title: "Attribution you can trust",
    details:
      "Partner-specific tracking links/codes, conversion events (call booked, demo, signup, purchase), and a transparent reporting cadence.",
  },
  {
    title: "Enablement assets",
    details:
      "Co-branded collateral, proof points, FAQs, talk tracks, and campaign angles that partners can use without extra work.",
  },
  {
    title: "Payouts + governance",
    details:
      "Clear commission rules, payout timing, compliance requirements, and a simple system to prevent disputes and maintain trust.",
  },
];

export default function LeadHackingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#031619] via-[#062A2E] to-[#031619] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(10,186,181,0.28),transparent_55%),radial-gradient(circle_at_85%_80%,rgba(43,211,206,0.18),transparent_55%),radial-gradient(circle_at_60%_40%,rgba(79,209,197,0.14),transparent_55%)]" />
      <div className="absolute -top-24 right-0 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-[#0ABAB5]/30 via-cyan-400/14 to-transparent blur-3xl" />
      <div className="absolute -bottom-28 left-0 h-[32rem] w-[32rem] rounded-full bg-gradient-to-br from-cyan-400/18 via-[#0ABAB5]/12 to-transparent blur-3xl" />

      <main className="relative mx-auto max-w-7xl px-6 pb-24 pt-14 sm:px-10 lg:px-16">
        {/* Hero */}
        <section className="mb-20 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/80 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[#0ABAB5]" />
              Lead Hacking + Affiliate Partnerships
            </div>

            <h1 className="text-balance text-4xl font-black leading-[1.06] sm:text-5xl lg:text-6xl">
              Source The Right{" "}
              <span className="bg-gradient-to-r from-[#0ABAB5] via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                Affiliate Partners
              </span>{" "}
              And Turn Them Into Revenue
            </h1>

            <p className="text-xl leading-relaxed text-slate-200/90">
              Refer Labs builds affiliate programs and then runs Lead Hacking to source, qualify, and activate the partners that fit your ICP—so you get warm introductions and booked conversations without “spray and pray” outreach.
            </p>

            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 to-white/[0.04] p-6 backdrop-blur">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#7DE7E3]">
                The upside
              </p>
              <p className="mt-2 text-slate-200/90">
                Instead of building a pipeline one cold message at a time, you build distribution through partners that already have trust, access, and context—then you track performance like a channel.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  { label: "Partner-sourced deals", detail: "Warm intros from trusted people" },
                  { label: "Higher close rates", detail: "Affiliates arrive pre-qualified" },
                  { label: "Repeatable pipeline", detail: "A channel you can scale" },
                  { label: "Clear attribution", detail: "Know what partners convert" },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
                    <p className="text-sm font-bold text-white">{item.label}</p>
                    <p className="mt-1 text-xs text-slate-300">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <ScheduleCallCTA />
              <p className="text-sm text-slate-400">
                30 minutes. We’ll map the best partner type for your ICP and the affiliate program mechanics to activate it.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-[#0ABAB5]/30 bg-gradient-to-br from-slate-900/70 to-slate-950/40 p-8 shadow-2xl shadow-[#0ABAB5]/25 backdrop-blur">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0ABAB5] to-cyan-400">
                  <Users className="h-7 w-7 text-slate-950" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">What we actually do</p>
                  <p className="text-2xl font-black text-white">Partner Channel Engineering</p>
                </div>
              </div>

              <p className="mb-6 text-slate-300">
                Affiliate partnerships only work when the program is clear and the partner list is targeted. Lead Hacking is how we source the right partners and activate them with tracking, assets, and a repeatable process.
              </p>

              <div className="grid gap-3">
                {[
                  "Affiliate program design (rules, incentives, handoffs)",
                  "Partner sourcing + qualification (fit first, volume second)",
                  "Partner onboarding + enablement assets",
                  "Attribution + reporting so you can scale winners",
                ].map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#0ABAB5]" />
                    <span className="text-sm text-slate-200">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-7 rounded-2xl border border-white/10 bg-slate-950/40 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">If you’re a good fit</p>
                <p className="mt-2 text-sm text-slate-300">
                  You have a proven offer, you know who you want to sell to (or we can help define it), and you want a partner channel you can run quarter after quarter.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Partner types */}
        <section className="mb-20">
          <div className="mb-10">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#7DE7E3]">
              Affiliate Partnerships We Provide
            </p>
            <h2 className="text-4xl font-black text-white sm:text-5xl">Three Partner Lanes, One Affiliate Engine</h2>
            <p className="mt-4 max-w-3xl text-lg text-slate-200/90">
              Each lane has its own affiliate motion. We design the affiliate program (links, rewards, handoffs) and Lead Hacking sources and activates the right partners so you see booked calls and tracked revenue—not just “reach”.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {partnerTypes.map((partner) => {
              const Icon = partner.icon;
              return (
                <div
                  key={partner.title}
                  className="rounded-3xl border border-[#0ABAB5]/25 bg-gradient-to-br from-slate-900/60 to-slate-950/45 p-7 shadow-xl shadow-[#0ABAB5]/20 backdrop-blur"
                >
                  <div className="mb-5 flex items-start gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0ABAB5] via-cyan-300 to-[#4FD1C5] shadow-lg shadow-[#0ABAB5]/30">
                      <Icon className="h-6 w-6 text-slate-950" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white">{partner.title}</h3>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                        {partner.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-slate-200/95">{partner.description}</p>

                  <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/30 p-5">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#7DE7E3]">{partner.affiliateProgram.heading}</p>
                    <div className="mt-3 space-y-2">
                      {partner.affiliateProgram.bullets.map((bullet) => (
                        <div key={bullet} className="flex gap-3">
                          <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#0ABAB5]" />
                          <p className="text-sm text-slate-200">{bullet}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#7DE7E3]">{partner.leadHacking.heading}</p>
                    <div className="mt-3 space-y-2">
                      {partner.leadHacking.bullets.map((bullet) => (
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

          <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0ABAB5]/10 via-slate-950/40 to-slate-950/40 p-8 backdrop-blur">
            <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
              <div className="max-w-3xl">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#7DE7E3]">Not sure which lane is best?</p>
                <p className="mt-2 text-lg text-slate-200/90">
                  We’ll recommend the highest-leverage partner type for your offer and ICP, then design the affiliate program mechanics and sourcing plan around it.
                </p>
              </div>
              <ScheduleCallCTA className="w-full md:w-auto" />
            </div>
          </div>
        </section>

        {/* Lead Hacking loop */}
        <section className="mb-20">
          <div className="mb-10">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#7DE7E3]">How Lead Hacking Works</p>
            <h2 className="text-4xl font-black text-white sm:text-5xl">Sourcing, Activation, Optimisation</h2>
            <p className="mt-4 max-w-3xl text-lg text-slate-300">
              “Lead Hacking” isn’t a channel. It’s the operating system that finds the right partners, turns interest into affiliates, and gives you the data to scale what performs.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {leadHackingLoop.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex gap-6 rounded-3xl border border-[#0ABAB5]/25 bg-slate-900/60 p-8 shadow-xl shadow-[#0ABAB5]/20 backdrop-blur"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0ABAB5] to-cyan-400 text-lg font-black text-slate-950">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-[#7DE7E3]" />
                      <h3 className="text-xl font-black text-white">{item.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.description}</p>
                    <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Deliverable</p>
                      <p className="mt-1 text-sm text-slate-200">{item.deliverable}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Blueprint */}
        <section className="mb-20">
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#7DE7E3]">Affiliate Program Blueprint</p>
            <h2 className="text-4xl font-black text-white sm:text-5xl">What Makes Partnerships Actually Work</h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-300">
              Partners don’t refer because you asked—they refer because the program is easy, the offer is credible, and the attribution is transparent. Lead Hacking connects the blueprint to the right partner list.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {affiliateProgramBlueprint.map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur">
                <p className="text-lg font-black text-white">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.details}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tiffany blue explanation */}
        <section className="mb-20 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0ABAB5]/12 via-slate-950/40 to-slate-950/40 p-10 shadow-2xl shadow-black/30 backdrop-blur">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#7DE7E3]">Design System</p>
              <h2 className="text-4xl font-black text-white sm:text-5xl">Why More Tiffany Blue?</h2>
              <p className="mt-4 text-lg text-slate-200/90">
                Affiliate partnerships are built on trust and recognition. We use Tiffany blue as the “partner signal” across your affiliate assets—so the same visual cue shows up in creator posts, partner decks, and enablement docs. The goal is consistency: partners instantly recognise the program, and prospects experience a coherent handoff.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/35 p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Where it shows up</p>
              <div className="mt-4 space-y-3">
                {[
                  "Partner kit + co-branded one-pagers",
                  "Creator campaign brief + tracking pages",
                  "Affiliate capture + booking flow styling",
                  "Dashboards and performance reporting highlights",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#0ABAB5]" />
                    <p className="text-sm text-slate-200">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-7">
                <ScheduleCallCTA className="w-full" />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0ABAB5]/12 via-slate-950/40 to-slate-950/40 p-12 text-center shadow-2xl shadow-black/40 backdrop-blur">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-[#0ABAB5] to-cyan-400">
            <Users className="h-8 w-8 text-slate-950" />
          </div>
          <h2 className="mb-4 text-4xl font-black text-white sm:text-5xl">Want affiliate partners that actually convert?</h2>
          <p className="mx-auto mb-8 max-w-3xl text-lg text-slate-300">
            We’ll map your best partner lane, design the affiliate program mechanics, and show you what Lead Hacking looks like to source and activate partners consistently—with clear attribution.
          </p>
          <div className="flex justify-center">
            <ScheduleCallCTA />
          </div>
          <p className="mt-6 text-sm text-slate-400">
            No forms. No multiple CTAs. Just a call to map fit and next steps.
          </p>
        </section>
      </main>
    </div>
  );
}
