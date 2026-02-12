import {
  ArrowRight,
  Users,
  Handshake,
  FileSignature,
  Target,
  BarChart3,
  CheckCircle2,
  Calendar,
  Zap,
  Building2,
  Heart,
  ShoppingBag,
  Briefcase,
  CreditCard,
  TrendingUp,
  Shield,
  Settings,
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

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-16 pt-20 sm:pt-28 pb-28 sm:pb-40">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">
            {/* Left Column */}
            <div className="relative z-10 text-center lg:text-left">
              <h1 className="text-[2.25rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[3.75rem] xl:text-[4.25rem] font-black tracking-tight leading-[1.06] mb-6 text-white text-balance">
                We Are Your <span className="text-[#57E6FF]">APAC Expansion Partner.</span>
              </h1>

              <p className="text-base sm:text-lg text-white/70 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-10">
                We help overseas companies generate clients, partnerships, and distribution in Australia - without building a local team.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-8 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#22C0CD] shadow-xl shadow-black/20"
                >
                  <Calendar className="h-4 w-4" />
                  Book a Market Entry Call
                </a>
              </div>
            </div>

            {/* Right Column: Expansion Pipeline Visual */}
            <div className="relative hidden lg:block">
              <div className="absolute -inset-8 bg-gradient-to-br from-[#0AA7B5]/20 via-transparent to-[#22C0CD]/10 rounded-3xl blur-3xl" />
              <div className="relative">
                <div className="rounded-3xl border border-white/15 bg-white/[0.07] backdrop-blur-xl p-8 shadow-2xl">
                  <div className="flex items-center justify-between mb-6 pb-5 border-b border-white/10">
                    <div>
                      <p className="text-white font-bold text-base">Expansion Pipeline</p>
                      <p className="text-white/45 text-xs mt-0.5">Typical 90-day pilot results</p>
                    </div>
                    <div className="flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-400/25 rounded-lg px-3 py-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span className="text-xs text-emerald-300 font-semibold">Live</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[
                      { value: "10-20", label: "Client Leads" },
                      { value: "3-8", label: "Partners" },
                      { value: "1-3", label: "Distribution Deals" },
                    ].map((m) => (
                      <div key={m.label} className="rounded-xl bg-white/[0.06] border border-white/10 p-4 text-center">
                        <p className="text-2xl font-black text-white">{m.value}</p>
                        <p className="text-[10px] text-white/45 uppercase tracking-wider mt-1">{m.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 mb-6">
                    {[
                      { icon: Target, label: "Sales Representation", progress: 75, color: "bg-[#0AA7B5]" },
                      { icon: Handshake, label: "Partnerships & Distribution", progress: 60, color: "bg-[#22C0CD]" },
                      { icon: Shield, label: "Compliance & Setup", progress: 85, color: "bg-emerald-400" },
                      { icon: Settings, label: "Operations Management", progress: 45, color: "bg-[#57E6FF]" },
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
        <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            {[
              { value: "$1M-$50M", sub: "Client Revenue Range" },
              { value: "Retainer + %", sub: "Commission Model" },
              { value: "6 Verticals", sub: "SaaS, Fintech, Health & More" },
              { value: "Australia & APAC", sub: "Market Coverage" },
            ].map((item) => (
              <div key={item.value} className="text-center">
                <p className="text-lg sm:text-xl font-black text-[#0b2a34]">{item.value}</p>
                <p className="text-xs text-slate-500">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Four Core Services ── */}
      <section className="relative bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-14 sm:mb-20">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0AA7B5] mb-3">What we do</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0b2a34] mb-5">
              Why Refer Labs
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              We handle the sales, partnerships, compliance, and day-to-day operations required to win in Australia - without you hiring a local team.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Target,
                num: "01",
                title: "Sales Representation",
                desc: "We act as your on-the-ground sales arm in Australia.",
                items: ["Outbound prospecting to your ICP", "Warm introductions via our network", "Demo booking & pipeline creation", "Closing support on priority deals"],
                stat: "10-20",
                statLabel: "qualified conversations",
              },
              {
                icon: Handshake,
                num: "02",
                title: "Partnership & Distribution",
                desc: "We build partner, reseller, and distribution relationships.",
                items: ["Partner identification & outreach", "Strategic alliance development", "Reseller & referral partner activation", "Revenue-share & licensing negotiations"],
                stat: "3-8",
                statLabel: "partners or channels",
              },
              {
                icon: Shield,
                num: "03",
                title: "Compliance & Market Setup",
                desc: "We handle the legal and operational steps to sell in Australia.",
                items: ["Market entry structure guidance", "Local contract adjustments", "GST & pricing guidance", "Legal & accounting intros"],
                stat: "100%",
                statLabel: "market-ready setup",
              },
              {
                icon: Settings,
                num: "04",
                title: "Operations Management",
                desc: "We manage your ongoing commercial activities locally.",
                items: ["Deal coordination & execution", "Partner & client management", "Local onboarding coordination", "Monthly pipeline & revenue reporting"],
                stat: "Ongoing",
                statLabel: "commercial operation",
              },
            ].map((channel) => (
              <div
                key={channel.num}
                className="group relative rounded-3xl border border-slate-200/80 bg-white p-7 transition-all duration-300 hover:border-[#0AA7B5]/30 hover:shadow-xl hover:shadow-[#0AA7B5]/8"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#0AA7B5] to-[#00838F] flex items-center justify-center shadow-lg shadow-[#0AA7B5]/20">
                    <channel.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xs font-black text-[#0AA7B5]/40 tracking-widest">{channel.num}</span>
                </div>
                <h3 className="text-lg font-bold text-[#0b2a34] mb-2">{channel.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-5">{channel.desc}</p>
                <ul className="space-y-2 mb-6">
                  {channel.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#0AA7B5] flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-xs">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-5 border-t border-slate-100">
                  <p className="text-2xl font-black text-[#0AA7B5]">{channel.stat}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{channel.statLabel}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0AA7B5] hover:text-[#00838F] transition-colors"
            >
              Explore all services in detail
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Built for Overseas B2B ── */}
      <section className="relative bg-[#f6fdfe] py-14 sm:py-20 border-y border-slate-100">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-black text-[#0b2a34] mb-3">
              Built for Overseas B2B Companies Entering Australia
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: CheckCircle2, text: "No local hires required" },
              { icon: Zap, text: "Faster market entry" },
              { icon: TrendingUp, text: "Lower fixed costs" },
              { icon: Target, text: "Real pipeline and partners in 90 days" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-200/60">
                <item.icon className="h-5 w-5 text-[#0AA7B5] flex-shrink-0" />
                <p className="text-sm font-semibold text-[#0b2a34]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why This Exists ── */}
      <section className="relative bg-gradient-to-br from-[#04101a] via-[#081820] to-[#020508] py-20 sm:py-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(10,167,181,0.12),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(87,230,255,0.06),transparent_50%)]" />
        </div>
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#57E6FF] mb-4">The problem</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.08] mb-6">
                Most Australia Expansions Fail in the First Year
              </h2>
              <p className="text-white/55 text-sm sm:text-base leading-relaxed mb-8">
                Overseas companies try remote outreach, attend a conference, or hire one person too early. None of it works without sustained local execution across sales, partnerships, compliance, and operations.
              </p>
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#57E6FF] hover:text-white transition-colors"
              >
                Talk to us about your expansion
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="space-y-4">
              {[
                { num: "01", text: "Remote sales without local presence leads to zero trust and low conversion." },
                { num: "02", text: "Partnerships require ongoing activation, not one-off introductions at events." },
                { num: "03", text: "Hiring a full-time local rep too early is expensive and slow to ramp." },
                { num: "04", text: "Compliance, contracts, and pricing require local expertise from day one." },
              ].map((item) => (
                <div key={item.num} className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
                  <span className="text-[#57E6FF] text-sm font-black flex-shrink-0 mt-0.5">{item.num}</span>
                  <p className="text-white/80 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="relative bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-14 sm:mb-20">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0AA7B5] mb-3">90-day pilot</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0b2a34] mb-5">
              How It Works
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg">
              A structured approach to building your Australian pipeline, partnerships, compliance, and operations.
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-16 left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-0.5 bg-gradient-to-r from-[#0AA7B5] via-[#22C0CD] to-[#0AA7B5]" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Pilot Scoping", desc: "Align on your ICP, messaging, pricing, compliance needs, and success metrics." },
                { step: "02", title: "Target List Build", desc: "Customer, partner, and distribution targets built around your ideal profile." },
                { step: "03", title: "Outreach & Deals", desc: "We run outreach, book meetings, negotiate partnerships, and support deal closing." },
                { step: "04", title: "Operations & Reporting", desc: "Ongoing coordination, compliance, and weekly pipeline reporting." },
              ].map((item) => (
                <div key={item.step} className="relative text-center">
                  <div className="relative z-10 h-14 w-14 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-gradient-to-br from-[#0AA7B5] to-[#00838F] text-white shadow-lg shadow-[#0AA7B5]/25 ring-4 ring-white">
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
      <section className="relative bg-[#f6fdfe] py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0AA7B5] mb-3">Who we work with</p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0b2a34] mb-4">
              Built for Overseas Companies Entering Australia
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
              $1M-$50M in revenue, strong product-market fit overseas, and ready to test Australian distribution.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Building2, label: "B2B SaaS", desc: "Enterprise and mid-market software companies entering the ANZ market" },
              { icon: CreditCard, label: "Fintech", desc: "Payments, lending, and financial infrastructure seeking local distribution" },
              { icon: Heart, label: "Healthtech", desc: "Digital health platforms looking for provider and payer partnerships" },
              { icon: Zap, label: "Creator Economy", desc: "Creator tools and platforms expanding into the Australian creator market" },
              { icon: ShoppingBag, label: "E-commerce Tech", desc: "Commerce infrastructure and DTC brands testing Australian demand" },
              { icon: Briefcase, label: "Professional Services Software", desc: "Legal, accounting, and consulting tech entering Australian verticals" },
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

          <div className="text-center mt-10">
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
      <section className="relative bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#024b56] to-[#036572] p-10 sm:p-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(87,230,255,0.15),transparent_50%)]" />
            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
                  Retainer + Commission. Aligned Incentives.
                </h2>
                <p className="text-white/60 text-sm sm:text-base max-w-xl">
                  We earn when you earn. Choose from Australia Launch or Australia Growth engagement models.
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
      <section className="relative bg-gradient-to-b from-[#024b56] via-[#03606d] to-[#024b56] py-24 sm:py-32 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(10,167,181,0.15),transparent_45%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(87,230,255,0.08),transparent_45%)]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-5 sm:px-8 lg:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
            Ready to Enter the Australian Market?
          </h2>
          <p className="text-base sm:text-lg text-white/65 mb-10 max-w-xl mx-auto">
            Book a 15-minute call. We will discuss your product, your goals in Australia, and scope a 90-day pilot.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-8 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#22C0CD] shadow-xl shadow-black/20"
            >
              <Calendar className="h-4 w-4" />
              Book a Market Entry Call
            </a>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 backdrop-blur-sm px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-white/20"
            >
              Explore Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
