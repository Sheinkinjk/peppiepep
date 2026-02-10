import {
  ArrowRight,
  Users,
  Handshake,
  Share2,
  Target,
  BarChart3,
  MessageSquare,
  MapPin,
  TrendingUp,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import Link from "next/link";

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#04101a] via-[#081820] to-[#020508] text-slate-50">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(10,186,181,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(87,230,255,0.06),transparent_50%)]" />
      </div>

      <main className="relative mx-auto max-w-6xl px-4 sm:px-8 lg:px-12 pb-16 sm:pb-24 pt-4 sm:pt-8">

        {/* Announcement Banner */}
        <div className="mb-6 sm:mb-10 flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-500/20 text-sm text-cyan-300">
            <MapPin className="h-3.5 w-3.5" />
            Now focused on Australia expansion for overseas companies
          </div>
        </div>

        {/* ─── Hero Section ─── */}
        <section className="relative py-6 sm:py-16 lg:py-20 mb-10 sm:mb-24">
          <div className="relative grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left Column: Text + CTA */}
            <div className="relative z-10 text-center lg:text-left">
              <h1 className="font-black text-white tracking-tight mb-6">
                <span className="block text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3rem] xl:text-[3.25rem] leading-[1.1]">
                  Your Australian Sales &amp;
                </span>
                <span className="block text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3rem] xl:text-[3.25rem] leading-[1.1]">
                  <span className="text-cyan-400">Partnerships Arm</span>
                </span>
                <span className="block text-lg sm:text-xl md:text-2xl lg:text-2xl text-slate-300 font-semibold mt-2">
                  Without Hiring Locally
                </span>
              </h1>
              <p className="text-sm sm:text-lg md:text-xl text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-5 sm:mb-8">
                We help overseas companies enter Australia by sourcing customers, forming distribution partnerships, and running local GTM — on a pilot retainer + success basis.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-8 py-4 text-sm font-semibold text-slate-900 transition-all hover:bg-cyan-300 shadow-lg shadow-cyan-500/20"
                >
                  <Calendar className="h-4 w-4" />
                  Book a 15-min Expansion Call
                </a>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-white/10"
                >
                  See How It Works
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right Column: Pipeline Visual */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/20 via-cyan-500/5 to-transparent rounded-3xl blur-2xl" />
              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-slate-800/80 p-5 sm:p-8 shadow-2xl shadow-black/40">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-500/30 to-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Australia GTM Playbook</p>
                    <p className="text-slate-500 text-xs">Your expansion at a glance</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="text-center p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                    <Users className="h-5 w-5 text-cyan-400 mx-auto mb-1.5" />
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Customers</p>
                    <p className="text-lg font-bold text-white mt-0.5">Direct</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                    <Handshake className="h-5 w-5 text-emerald-400 mx-auto mb-1.5" />
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Partners</p>
                    <p className="text-lg font-bold text-white mt-0.5">Distribution</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                    <Share2 className="h-5 w-5 text-purple-400 mx-auto mb-1.5" />
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Affiliates</p>
                    <p className="text-lg font-bold text-white mt-0.5">Referral</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                    <BarChart3 className="h-5 w-5 text-cyan-400 mx-auto mb-1.5" />
                    <p className="text-[10px] text-cyan-400/70 uppercase tracking-wider">Reporting</p>
                    <p className="text-lg font-bold text-cyan-400 mt-0.5">Weekly</p>
                  </div>
                </div>

                <div className="rounded-xl bg-gradient-to-r from-cyan-500/10 via-teal-500/10 to-cyan-500/10 border border-cyan-500/20 p-4">
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">90-Day Pilot</p>
                  <p className="text-white font-semibold text-sm">Pipeline, partners, and revenue signals — before you commit headcount.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── What We Do (3 Pillars) ─── */}
        <section className="mb-16 sm:mb-32">
          <div className="text-center mb-6 sm:mb-12">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-white mb-2 sm:mb-4">
              We Build Revenue in Australia Through <span className="text-cyan-400">Three Channels</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            {/* Pillar 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-cyan-500/0 rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-5 sm:p-8 hover:border-cyan-500/30 transition-all duration-300 h-full">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/20 flex items-center justify-center mb-5">
                  <Target className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Direct Customer Acquisition</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Outbound + intros + closing support to win your first Australian customers. We do the prospecting, you join the key calls.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-emerald-500/0 rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-5 sm:p-8 hover:border-emerald-500/30 transition-all duration-300 h-full">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/20 flex items-center justify-center mb-5">
                  <Handshake className="h-6 w-6 text-emerald-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Partnership Distribution</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  We secure agencies, communities, platforms, and strategic partners that drive recurring pipeline into your business.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-purple-500/0 rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-5 sm:p-8 hover:border-purple-500/30 transition-all duration-300 h-full">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/20 flex items-center justify-center mb-5">
                  <Share2 className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Referral &amp; Affiliate Activation</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  We recruit and manage high-trust referral partners and track performance with full attribution and reporting.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Why This Exists ─── */}
        <section className="mb-16 sm:mb-32">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 sm:p-12">
            <div className="text-center mb-6 sm:mb-10">
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-white leading-[1.1] mb-3 sm:mb-4">
                Why Overseas Expansion Into Australia <span className="text-cyan-400">Breaks Without Local Ownership</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                <div className="flex-shrink-0 h-9 w-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <span className="text-red-400 text-sm font-bold">1</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">Market entry stalls without local relationships and follow-through.</p>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                <div className="flex-shrink-0 h-9 w-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <span className="text-red-400 text-sm font-bold">2</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">Partnerships require ongoing activation, not one-off intros.</p>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                <div className="flex-shrink-0 h-9 w-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <span className="text-red-400 text-sm font-bold">3</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">Hiring locally too early is expensive and slow.</p>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                <div className="flex-shrink-0 h-9 w-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <span className="text-red-400 text-sm font-bold">4</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">You need revenue signals before you commit headcount.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── How It Works (4 Steps) ─── */}
        <section className="mb-16 sm:mb-32">
          <div className="text-center mb-6 sm:mb-12">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-white mb-2 sm:mb-4">
              How It <span className="text-cyan-400">Works</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-lg">
              A clear, structured approach to building your Australia revenue.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { step: "01", title: "Short Pilot Scope", desc: "90-day engagement with clear deliverables. Align on ICP, messaging, and success metrics.", color: "cyan" },
              { step: "02", title: "Target List Build", desc: "Partner + customer target list built around your ideal profile and Australia market specifics.", color: "emerald" },
              { step: "03", title: "Outreach + Closing", desc: "We run outreach, book introductions, and provide closing support on key opportunities.", color: "purple" },
              { step: "04", title: "Weekly Reporting", desc: "Pipeline, partners, conversion, and next actions — reported weekly so you always know the score.", color: "amber" },
            ].map((item) => (
              <div key={item.step} className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-5 sm:p-6">
                <div className={`h-10 w-10 rounded-xl bg-${item.color}-500/10 border border-${item.color}-500/20 flex items-center justify-center mb-4`}>
                  <span className={`text-${item.color}-400 text-sm font-black`}>{item.step}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Who It's For ─── */}
        <section className="mb-16 sm:mb-32">
          <div className="text-center mb-6 sm:mb-12">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-white mb-2 sm:mb-4">
              Built for Overseas Teams That Need <span className="text-cyan-400">Australian Traction Fast</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              { icon: Users, label: "Founder-led growth teams" },
              { icon: Handshake, label: "Heads of Partnerships / Growth" },
              { icon: TrendingUp, label: "Seed to Series B companies testing new markets" },
              { icon: CheckCircle2, label: "Brands with proven product-market fit elsewhere" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.08] bg-white/[0.03]">
                <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-5 w-5 text-cyan-400" />
                </div>
                <p className="text-white font-medium text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── What a Successful First 90 Days Looks Like ─── */}
        <section className="mb-16 sm:mb-32">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-white/[0.03] to-transparent p-6 sm:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(92,225,230,0.1),transparent_50%)]" />
            <div className="relative z-10">
              <div className="text-center mb-6 sm:mb-10">
                <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-white mb-2 sm:mb-4">
                  What a Successful First <span className="text-cyan-400">90 Days</span> Looks Like
                </h2>
                <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
                  Typical targets we aim to deliver during a pilot engagement.
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                <div className="text-center p-4 rounded-xl bg-white/[0.05] border border-white/[0.08]">
                  <p className="text-2xl sm:text-3xl font-black text-cyan-400">10-20</p>
                  <p className="text-xs text-slate-400 mt-1">Partner conversations</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/[0.05] border border-white/[0.08]">
                  <p className="text-2xl sm:text-3xl font-black text-cyan-400">3-8</p>
                  <p className="text-xs text-slate-400 mt-1">Qualified distribution opportunities</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/[0.05] border border-white/[0.08]">
                  <p className="text-2xl sm:text-3xl font-black text-cyan-400">5-15</p>
                  <p className="text-xs text-slate-400 mt-1">Sales conversations</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/[0.05] border border-white/[0.08]">
                  <p className="text-2xl sm:text-3xl font-black text-emerald-400">Clear</p>
                  <p className="text-xs text-slate-400 mt-1">Revenue signal + repeatable channel</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Pricing Teaser ─── */}
        <section className="mb-12 sm:mb-24">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-5 sm:p-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-8">
              <div className="text-center lg:text-left">
                <h2 className="text-lg sm:text-2xl font-black text-white mb-2">
                  Choose a Pilot or Retainer Model
                </h2>
                <p className="text-slate-400 text-sm max-w-xl">
                  Transparent, services-led pricing. No hidden fees. Start with a 90-day pilot.
                </p>
              </div>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 sm:px-8 py-3 sm:py-4 text-sm font-semibold text-slate-900 transition-all hover:bg-cyan-300 whitespace-nowrap"
              >
                View Pricing
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Footer CTA ─── */}
        <section>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-teal-500/10 to-cyan-500/10 rounded-2xl sm:rounded-3xl blur-3xl" />
            <div className="relative rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] px-5 py-10 sm:px-12 sm:py-16 text-center">
              <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
                <h2 className="text-xl sm:text-4xl font-black text-white">
                  Want Australia Revenue Without Hiring Locally?
                </h2>
                <p className="text-sm sm:text-lg text-slate-300">
                  We bring customers, partners, and distribution in Australia — so you don&apos;t have to hire before you have revenue.
                </p>
                <div className="pt-2 sm:pt-4">
                  <a
                    href={calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 sm:px-8 py-3 sm:py-4 text-sm font-semibold text-slate-900 transition-all hover:bg-cyan-300"
                  >
                    <Calendar className="h-4 w-4" />
                    Book Call
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
