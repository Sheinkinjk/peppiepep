import {
  ArrowRight,
  Users,
  Handshake,
  Share2,
  Target,
  BarChart3,
  TrendingUp,
  CheckCircle2,
  Calendar,
  Globe,
  Zap,
  Shield,
  Clock,
} from "lucide-react";
import Link from "next/link";

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden text-slate-900">

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-b from-[#024b56] via-[#03616e] to-[#047a87] overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(10,167,181,0.3),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_100%,rgba(34,192,205,0.15),transparent_50%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-8 lg:px-12 pt-16 sm:pt-24 pb-24 sm:pb-36">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column */}
            <div className="relative z-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-lg bg-white/10 border border-white/20 px-4 py-1.5 mb-6 backdrop-blur-sm">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-white/90 tracking-wide">Accepting new pilot clients</span>
              </div>
              <h1 className="font-black tracking-tight mb-6">
                <span className="block text-[2rem] sm:text-[2.6rem] md:text-[3rem] lg:text-[3.2rem] xl:text-[3.6rem] leading-[1.08] text-white">
                  Your Australian Sales
                </span>
                <span className="block text-[2rem] sm:text-[2.6rem] md:text-[3rem] lg:text-[3.2rem] xl:text-[3.6rem] leading-[1.08] text-[#57E6FF]">
                  &amp; Partnerships Arm
                </span>
              </h1>
              <p className="text-base sm:text-lg text-white/75 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8">
                We help overseas companies enter Australia by sourcing customers, forming distribution partnerships, and running local GTM.
              </p>
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-8 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#22C0CD] shadow-xl shadow-black/20"
              >
                <Calendar className="h-4 w-4" />
                Schedule A Call
              </a>

              {/* Trust indicators */}
              <div className="mt-10 flex flex-wrap gap-6 justify-center lg:justify-start">
                {[
                  { icon: Globe, text: "Serving US, UK & EU companies" },
                  { icon: Clock, text: "90-day structured pilot" },
                  { icon: Shield, text: "No lock-in contracts" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2">
                    <item.icon className="h-3.5 w-3.5 text-[#57E6FF]" />
                    <span className="text-xs text-white/60 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Pilot Pipeline Visual */}
            <div className="relative hidden lg:block">
              <div className="absolute -inset-8 bg-gradient-to-br from-[#0AA7B5]/20 via-transparent to-[#22C0CD]/10 rounded-2xl blur-3xl" />
              <div className="relative">
                <div className="rounded-2xl border border-white/15 bg-white/[0.07] backdrop-blur-xl p-7 shadow-2xl">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6 pb-5 border-b border-white/10">
                    <div>
                      <p className="text-white font-bold text-base">Pilot Pipeline</p>
                      <p className="text-white/45 text-xs mt-0.5">Typical 90-day engagement results</p>
                    </div>
                    <div className="flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-400/25 rounded-lg px-3 py-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span className="text-xs text-emerald-300 font-semibold">Live</span>
                    </div>
                  </div>

                  {/* Metrics row */}
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    <div className="rounded-xl bg-white/[0.06] border border-white/10 p-4 text-center">
                      <p className="text-2xl font-black text-white">10-20</p>
                      <p className="text-[10px] text-white/45 uppercase tracking-wider mt-1">Conversations</p>
                    </div>
                    <div className="rounded-xl bg-white/[0.06] border border-white/10 p-4 text-center">
                      <p className="text-2xl font-black text-white">3-8</p>
                      <p className="text-[10px] text-white/45 uppercase tracking-wider mt-1">Partners</p>
                    </div>
                    <div className="rounded-xl bg-white/[0.06] border border-white/10 p-4 text-center">
                      <p className="text-2xl font-black text-white">5-15</p>
                      <p className="text-[10px] text-white/45 uppercase tracking-wider mt-1">Referral Leads</p>
                    </div>
                  </div>

                  {/* Channel breakdown */}
                  <div className="space-y-3 mb-5">
                    {[
                      { icon: Target, label: "Direct Sales", progress: 75, color: "bg-[#0AA7B5]" },
                      { icon: Handshake, label: "Partnerships", progress: 55, color: "bg-[#22C0CD]" },
                      { icon: Share2, label: "Referral & Affiliate", progress: 40, color: "bg-[#57E6FF]" },
                    ].map((ch) => (
                      <div key={ch.label} className="flex items-center gap-3">
                        <ch.icon className="h-4 w-4 text-white/50 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs text-white/70 font-medium">{ch.label}</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                            <div className={`h-full rounded-full ${ch.color}`} style={{ width: `${ch.progress}%` }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="rounded-xl bg-[#0AA7B5]/10 border border-[#0AA7B5]/20 p-4 flex items-center gap-3">
                    <BarChart3 className="h-5 w-5 text-[#57E6FF] flex-shrink-0" />
                    <div>
                      <p className="text-white/90 text-sm font-semibold">Weekly reporting included</p>
                      <p className="text-white/45 text-xs">Pipeline, conversion, and partner updates</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Social Proof Bar ── */}
      <section className="relative bg-white py-8 sm:py-10 border-b border-slate-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            {[
              { value: "B2B SaaS", sub: "Fintech & Marketplaces" },
              { value: "US, UK & EU", sub: "Companies Served" },
              { value: "90 Days", sub: "Structured Pilot" },
              { value: "3 Channels", sub: "Sales, Partners & Affiliates" },
            ].map((item) => (
              <div key={item.value} className="text-center">
                <p className="text-lg sm:text-xl font-black text-[#0b2a34]">{item.value}</p>
                <p className="text-xs text-slate-500">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Three Channels ── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-12">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0AA7B5] mb-3">Three revenue channels</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0b2a34] mb-4">
              How We Build Your Australian Revenue
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg">
              Each channel is managed end-to-end. You get pipeline, partners, and revenue signals without building a local team.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                num: "01",
                title: "Direct Customer Acquisition",
                desc: "We act as your on-the-ground sales arm. Outbound prospecting, warm introductions, pipeline creation, and closing support.",
                items: ["Outbound prospecting to your ICP", "Warm intros via our network", "Pipeline creation & deal support", "Weekly conversion reporting"],
                stat: "10-20",
                statLabel: "qualified conversations",
              },
              {
                icon: Handshake,
                num: "02",
                title: "Partnership Distribution",
                desc: "We source and activate agencies, platforms, and strategic partners who can distribute your product across Australia.",
                items: ["Partner identification & outreach", "Agency & platform activation", "Partner terms & structure", "Ongoing relationship management"],
                stat: "3-8",
                statLabel: "distribution partners",
              },
              {
                icon: Share2,
                num: "03",
                title: "Referral & Affiliate Activation",
                desc: "We recruit high-trust referral partners, set up attribution tracking, and manage performance monthly.",
                items: ["Affiliate & referral recruitment", "Attribution & tracking setup", "Commission structure management", "Monthly channel optimisation"],
                stat: "5-15",
                statLabel: "referral-driven leads",
              },
            ].map((channel) => (
              <div
                key={channel.num}
                className="group relative rounded-2xl border border-slate-200/80 bg-white p-8 transition-all duration-300 hover:border-[#0AA7B5]/30 hover:shadow-xl hover:shadow-[#0AA7B5]/8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#0AA7B5] to-[#00838F] flex items-center justify-center shadow-lg shadow-[#0AA7B5]/20">
                    <channel.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xs font-black text-[#0AA7B5]/40 tracking-widest">{channel.num}</span>
                </div>
                <h3 className="text-xl font-bold text-[#0b2a34] mb-3">{channel.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">{channel.desc}</p>
                <ul className="space-y-2.5 mb-8">
                  {channel.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-[#0AA7B5] flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6 border-t border-slate-100">
                  <p className="text-3xl font-black text-[#0AA7B5]">{channel.stat}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{channel.statLabel} per pilot</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why This Exists ── */}
      <section className="relative bg-[#024b56] py-16 sm:py-24 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(10,167,181,0.2),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(87,230,255,0.08),transparent_50%)]" />
        </div>
        <div className="relative mx-auto max-w-5xl px-4 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#57E6FF] mb-4">The problem</p>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-[1.1] mb-6">
                Why Australia Expansion Breaks Without Local Ownership
              </h2>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                Most overseas companies try remote outreach, attend a conference, or hire one person too early. None of it works without sustained local execution across sales and partnerships.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { num: "01", text: "Market entry stalls without local relationships and follow-through." },
                { num: "02", text: "Partnerships require ongoing activation, not one-off introductions." },
                { num: "03", text: "Hiring locally too early is expensive and slow to ramp." },
                { num: "04", text: "You need revenue signals before you commit headcount." },
              ].map((item) => (
                <div key={item.num} className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.06] border border-white/10">
                  <span className="text-[#57E6FF] text-sm font-black flex-shrink-0 mt-0.5">{item.num}</span>
                  <p className="text-white/85 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="relative bg-gradient-to-b from-white via-[#f8fefe] to-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-12">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0AA7B5] mb-3">90-day pilot</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0b2a34] mb-4">
              How It Works
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg">
              A structured approach to building your Australia pipeline.
            </p>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-16 left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-0.5 bg-gradient-to-r from-[#0AA7B5] via-[#22C0CD] to-[#0AA7B5]" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Pilot Scoping", desc: "Align on your ICP, messaging, pricing, and success metrics for Australia." },
                { step: "02", title: "Target List Build", desc: "Customer and partner target lists built around your ideal profile and market specifics." },
                { step: "03", title: "Outreach & Closing", desc: "We run outreach, book intros, and provide closing support on key opportunities." },
                { step: "04", title: "Weekly Reporting", desc: "Pipeline, partners, conversion, and next actions — reported weekly." },
              ].map((item) => (
                <div key={item.step} className="relative text-center">
                  <div className="relative z-10 h-14 w-14 rounded-xl flex items-center justify-center mx-auto mb-6 bg-gradient-to-br from-[#0AA7B5] to-[#00838F] text-white shadow-lg shadow-[#0AA7B5]/25 ring-4 ring-white">
                    <span className="text-sm font-black">{item.step}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0b2a34] mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0AA7B5]/30 bg-[#0AA7B5]/5 px-8 py-3.5 text-sm font-semibold text-[#0AA7B5] transition-all hover:bg-[#0AA7B5]/10 hover:border-[#0AA7B5]/50"
            >
              See Full Pilot Breakdown
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Who It's For ── */}
      <section className="relative bg-[#f6fdfe] py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0AA7B5] mb-3">Who we work with</p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0b2a34] mb-4">
              Built for Overseas Teams Entering Australia
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Users, label: "Founder-led growth teams", desc: "Testing a new market with limited resources" },
              { icon: Handshake, label: "Heads of Partnerships", desc: "Need local channel expertise and execution" },
              { icon: TrendingUp, label: "Seed to Series B", desc: "Ready to expand but not to hire locally yet" },
              { icon: CheckCircle2, label: "Proven PMF elsewhere", desc: "Product works — need distribution in Australia" },
            ].map((item) => (
              <div key={item.label} className="group p-6 rounded-2xl bg-white border border-slate-200/60 transition-all duration-300 hover:border-[#0AA7B5]/30 hover:shadow-lg hover:shadow-[#0AA7B5]/5">
                <div className="h-12 w-12 rounded-xl bg-[#0AA7B5]/10 flex items-center justify-center mb-4 group-hover:bg-[#0AA7B5]/15 transition-colors">
                  <item.icon className="h-5 w-5 text-[#0AA7B5]" />
                </div>
                <p className="text-[#0b2a34] font-bold text-sm mb-1">{item.label}</p>
                <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/who-its-for"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0AA7B5] hover:text-[#00838F] transition-colors"
            >
              See all company profiles we work with
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Pricing Teaser ── */}
      <section className="relative bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-8 lg:px-12">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#024b56] to-[#036572] p-8 sm:p-12">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(87,230,255,0.15),transparent_50%)]" />
            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
                  Pilot or Retainer — You Choose
                </h2>
                <p className="text-white/65 text-sm sm:text-base max-w-xl">
                  Transparent, services-led pricing. Start with a 90-day pilot, scale into a retainer.
                </p>
              </div>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-8 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#22C0CD] shadow-xl shadow-black/20 whitespace-nowrap"
              >
                View Pricing
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="relative bg-gradient-to-b from-[#024b56] via-[#03606d] to-[#024b56] py-20 sm:py-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(10,167,181,0.15),transparent_45%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(87,230,255,0.08),transparent_45%)]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 sm:px-8 lg:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
            Ready to Build Australian Revenue?
          </h2>
          <p className="text-base sm:text-lg text-white/70 mb-8 max-w-xl mx-auto">
            Book a 15-minute call. We&apos;ll discuss your product, your goals in Australia, and whether a pilot makes sense.
          </p>
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-8 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#22C0CD] shadow-xl shadow-black/20"
          >
            <Calendar className="h-4 w-4" />
            Schedule A Call
          </a>
        </div>
      </section>

    </div>
  );
}
