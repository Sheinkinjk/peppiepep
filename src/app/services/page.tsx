import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Globe,
  Handshake,
  Megaphone,
  FileSignature,
  Target,
  Users,
  Zap,
  BarChart3,
  Building2,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.services);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#04101a] via-[#081820] to-[#020508] text-slate-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(10,186,181,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(87,230,255,0.06),transparent_50%)]" />
      </div>

      <main id="main-content" className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-12 pb-24 pt-16">

        {/* Hero */}
        <section className="text-center space-y-8 mb-28">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] border border-white/10 px-4 py-1.5 backdrop-blur-sm">
            <Zap className="h-3.5 w-3.5 text-cyan-400" />
            <span className="text-xs font-semibold text-white/80 tracking-wide">Three managed services</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.08] text-white max-w-4xl mx-auto tracking-tight">
            Services Built to Drive{" "}
            <span className="text-cyan-400">Australian &amp; APAC Revenue</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Sales representation, partnership development, and distribution deals - each delivered as a managed engagement with full reporting and attribution.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-8 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#22C0CD] shadow-xl shadow-black/20"
            >
              <Calendar className="h-4 w-4" />
              Schedule a Call
            </a>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              View Pricing
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Service 1: Sales Representation */}
        <section className="mb-28 space-y-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                <Target className="h-5 w-5 text-cyan-400" />
                <span className="text-sm font-semibold text-cyan-300">01 - Sales Representation</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Your On-the-Ground Sales Arm in Australia
              </h2>
              <p className="text-slate-300 leading-relaxed">
                We run outbound prospecting, make warm introductions, book demos, build pipeline, and provide closing support - acting as your dedicated Australian sales team from day one.
              </p>
              <div className="space-y-4">
                <p className="text-sm font-semibold text-cyan-300 uppercase tracking-wide">
                  What We Deliver
                </p>
                <ul className="space-y-3">
                  {[
                    "Outbound prospecting to your Australian ICP",
                    "Warm introductions via our local network",
                    "Demo booking and meeting coordination",
                    "Pipeline creation with weekly CRM updates",
                    "Closing support on key opportunities",
                    "Weekly pipeline and conversion reporting",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-300">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-teal-500/10 rounded-3xl blur-3xl" />
              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/50 p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <Target className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Sales Pipeline Dashboard</p>
                    <p className="text-sm text-slate-400">Typical 90-day pilot outcomes</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Prospects contacted", value: "150-300" },
                    { label: "Meetings booked", value: "10-20" },
                    { label: "Qualified pipeline", value: "5-12" },
                    { label: "Deals supported", value: "2-5" },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between items-center py-3 border-b border-white/10 last:border-0">
                      <span className="text-slate-400">{row.label}</span>
                      <span className="font-bold text-white">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Service 2: Partnership Development */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/10 rounded-3xl blur-3xl" />
              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/50 p-8">
                <div className="space-y-5">
                  {[
                    { icon: Building2, color: "bg-purple-500/20", iconColor: "text-purple-400", title: "Agency Partners", desc: "Refer, co-sell, and white-label your product to their clients" },
                    { icon: Users, color: "bg-pink-500/20", iconColor: "text-pink-400", title: "Consultancy Partners", desc: "Recommend your solution during advisory engagements" },
                    { icon: Handshake, color: "bg-cyan-500/20", iconColor: "text-cyan-400", title: "Platform Partners", desc: "Integrate and distribute through established Australian platforms" },
                  ].map((partner) => (
                    <div key={partner.title} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className={`h-10 w-10 rounded-lg ${partner.color} flex items-center justify-center flex-shrink-0`}>
                        <partner.icon className={`h-5 w-5 ${partner.iconColor}`} />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{partner.title}</p>
                        <p className="text-sm text-slate-400 mt-1">{partner.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20">
                <Handshake className="h-5 w-5 text-purple-400" />
                <span className="text-sm font-semibold text-purple-300">02 - Partnership Development</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Source &amp; Activate Strategic Australian Partners
              </h2>
              <p className="text-slate-300 leading-relaxed">
                We identify, pitch, onboard, and manage agencies, consultancies, platforms, and strategic partners who can resell, co-sell, or refer your product across Australia and APAC.
              </p>
              <ul className="space-y-3">
                {[
                  "Partner identification and qualification",
                  "Strategic alliance development and activation",
                  "Partner enablement materials and onboarding",
                  "Partner terms, structure, and revenue share design",
                  "Ongoing partner relationship management",
                  "Quarterly partner reviews and optimisation",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300">
                    <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Service 3: Distribution Deals */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <FileSignature className="h-5 w-5 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-300">03 - Distribution Deals</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Structure Deals That Embed Your Product Into Local Channels
              </h2>
              <p className="text-slate-300 leading-relaxed">
                We negotiate white-label deals, reseller agreements, and enterprise distribution contracts that embed your product into established Australian channels and customer bases.
              </p>
              <ul className="space-y-3">
                {[
                  "White-label deal structuring and negotiation",
                  "Reseller agreement terms and activation",
                  "Enterprise introductions and pitching",
                  "Revenue-share and licensing terms",
                  "Contract support and deal closing",
                  "Distribution channel tracking and optimisation",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300">
                    <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-teal-500/10 rounded-3xl blur-3xl" />
              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/50 p-8 space-y-6">
                <p className="text-sm font-semibold text-emerald-300 uppercase tracking-wide">
                  Distribution Deal Flow
                </p>
                <div className="space-y-4">
                  {[
                    { step: "1", title: "Identify distribution partners", desc: "Map resellers, platforms, and enterprise accounts" },
                    { step: "2", title: "Pitch and negotiate terms", desc: "White-label, reseller, or licensing structure" },
                    { step: "3", title: "Activate and launch", desc: "Partner onboarding, materials, and go-live" },
                    { step: "4", title: "Track and optimise", desc: "Revenue attribution and channel performance" },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-emerald-300">{item.step}</span>
                      </div>
                      <div>
                        <p className="font-medium text-white">{item.title}</p>
                        <p className="text-sm text-slate-400">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-28">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Why This Approach Works
              </h2>
              <p className="text-slate-400">
                Three channels running in parallel produce compounding results.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-8 text-center">
              {[
                { value: "3-5x", label: "Higher Conversion", desc: "Warm introductions and partner referrals convert at dramatically higher rates" },
                { value: "40%", label: "Lower CAC", desc: "Performance-based model means you only pay for results" },
                { value: "90 Days", label: "To Revenue Signals", desc: "Structured pilot delivers pipeline, partners, and deals in 12 weeks" },
              ].map((stat) => (
                <div key={stat.value} className="space-y-3">
                  <div className="text-5xl font-black bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <p className="text-white font-medium">{stat.label}</p>
                  <p className="text-sm text-slate-400">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Optional Add-ons */}
        <section className="mb-28">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Optional Add-ons
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Layer these on top of any core service for a more comprehensive engagement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Globe, title: "Landing Page Localisation", desc: "Copy, pricing, and positioning adapted for the Australian and APAC market." },
              { icon: Users, title: "Partner Program Design", desc: "Terms, commissions, tiering, and partner playbook creation." },
              { icon: Megaphone, title: "Event & Community Entry", desc: "Introductions to relevant Australian events, communities, and industry groups." },
              { icon: Handshake, title: "Intro-Only Mode", desc: "Lighter touch - we make the introductions, you take it from there." },
            ].map((addon) => (
              <div
                key={addon.title}
                className="flex gap-5 p-6 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="h-12 w-12 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                  <addon.icon className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{addon.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{addon.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-teal-500/10 to-cyan-500/10 rounded-3xl blur-3xl" />
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] px-8 py-16 sm:px-12 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Ready to Build Australian Revenue?
              </h2>
              <p className="text-lg text-slate-300">
                Tell us what you sell and where you are today. We will recommend the right service mix and scope your 90-day pilot.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-8 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#22C0CD] shadow-xl shadow-black/20"
                >
                  <Calendar className="h-4 w-4" />
                  Schedule a Call
                </a>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-white/10"
                >
                  View Pricing
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
