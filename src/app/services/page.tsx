import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Globe,
  Handshake,
  FileSignature,
  Target,
  Users,
  Zap,
  BarChart3,
  Building2,
  TrendingUp,
  Shield,
  Settings,
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
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.08] text-white max-w-4xl mx-auto tracking-tight">
            Your Australian{" "}
            <span className="text-cyan-400">Commercial Arm</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Four services that cover everything required to enter and operate in the Australian market.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
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
                We act as your on-the-ground sales arm in Australia. Outbound prospecting, warm introductions, demo bookings, pipeline creation, and closing support on priority deals.
              </p>
              <div className="space-y-4">
                <p className="text-sm font-semibold text-cyan-300 uppercase tracking-wide">
                  What We Deliver
                </p>
                <ul className="space-y-3">
                  {[
                    "Outbound prospecting to your ICP",
                    "Warm introductions via our network",
                    "Demo booking and pipeline creation",
                    "Closing support on priority deals",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-300">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-2">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Pilot outcome</p>
                <p className="text-lg font-bold text-cyan-400">10-20 qualified client conversations</p>
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

          {/* Service 2: Partnership & Distribution Development */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/10 rounded-3xl blur-3xl" />
              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/50 p-8">
                <div className="space-y-5">
                  {[
                    { icon: Building2, color: "bg-purple-500/20", iconColor: "text-purple-400", title: "Agency Partners", desc: "Refer, co-sell, and white-label your product to their clients" },
                    { icon: Users, color: "bg-pink-500/20", iconColor: "text-pink-400", title: "Reseller Partners", desc: "License and distribute through local reseller networks" },
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
                <span className="text-sm font-semibold text-purple-300">02 - Partnership &amp; Distribution Development</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Build Partner, Reseller &amp; Distribution Relationships
              </h2>
              <p className="text-slate-300 leading-relaxed">
                We build partner, reseller, and distribution relationships that embed your product into the Australian market. From identification to activation to revenue-share negotiations.
              </p>
              <ul className="space-y-3">
                {[
                  "Partner identification and outreach",
                  "Strategic alliance development",
                  "Reseller and referral partner activation",
                  "White-label and distribution deal structuring",
                  "Revenue-share and licensing negotiations",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300">
                    <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Pilot outcome</p>
                <p className="text-lg font-bold text-purple-400">3-8 strategic partners or distribution channels</p>
              </div>
            </div>
          </div>

          {/* Service 3: Compliance & Market Setup */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <Shield className="h-5 w-5 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-300">03 - Compliance &amp; Market Setup</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Handle the Legal and Operational Steps to Sell in Australia
              </h2>
              <p className="text-slate-300 leading-relaxed">
                We handle the legal, structural, and operational steps required to sell into Australia. From market entry structure to GST guidance to local contract adjustments.
              </p>
              <ul className="space-y-3">
                {[
                  "Market entry structure guidance",
                  "Local contract and commercial term adjustments",
                  "GST and pricing guidance",
                  "Introductions to legal, tax, and accounting partners",
                  "Compliance checklist for your business model",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300">
                    <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Outcome</p>
                <p className="text-lg font-bold text-emerald-400">Fully compliant, market-ready setup</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-teal-500/10 rounded-3xl blur-3xl" />
              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/50 p-8 space-y-6">
                <p className="text-sm font-semibold text-emerald-300 uppercase tracking-wide">
                  Compliance Checklist
                </p>
                <div className="space-y-4">
                  {[
                    { step: "1", title: "Market entry structure", desc: "Entity, branch, or partner-led entry" },
                    { step: "2", title: "Contract localisation", desc: "Terms, pricing, and SLAs for Australian market" },
                    { step: "3", title: "Tax & GST setup", desc: "Registration, pricing adjustments, compliance" },
                    { step: "4", title: "Professional network", desc: "Legal, tax, and accounting partner intros" },
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

          {/* Service 4: Australian Operations Management */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-transparent to-orange-500/10 rounded-3xl blur-3xl" />
              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/50 p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <Settings className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Operations Dashboard</p>
                    <p className="text-sm text-slate-400">Ongoing commercial management</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Deal coordination", status: "Active" },
                    { label: "Partner management", status: "Active" },
                    { label: "Client onboarding", status: "Active" },
                    { label: "Monthly reporting", status: "Scheduled" },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between items-center py-3 border-b border-white/10 last:border-0">
                      <span className="text-slate-400">{row.label}</span>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${row.status === "Active" ? "bg-emerald-500/15 text-emerald-400" : "bg-amber-500/15 text-amber-400"}`}>
                        {row.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20">
                <Settings className="h-5 w-5 text-amber-400" />
                <span className="text-sm font-semibold text-amber-300">04 - Australian Operations Management</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Manage Your Ongoing Commercial Activities Locally
              </h2>
              <p className="text-slate-300 leading-relaxed">
                We manage your ongoing commercial activities in Australia as your local team. Deal coordination, partner management, client onboarding, and monthly reporting.
              </p>
              <ul className="space-y-3">
                {[
                  "Deal coordination and execution",
                  "Partner and client relationship management",
                  "Local onboarding coordination",
                  "Monthly pipeline and revenue reporting",
                  "Market expansion planning",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300">
                    <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Outcome</p>
                <p className="text-lg font-bold text-amber-400">A functioning Australian commercial operation</p>
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
                Four services running in parallel produce compounding results.
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
              { icon: TrendingUp, title: "Event & Community Entry", desc: "Introductions to relevant Australian events, communities, and industry groups." },
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
                  Book a Market Entry Call
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
