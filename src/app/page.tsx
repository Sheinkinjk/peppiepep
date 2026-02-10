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
  const stepTone: Record<string, { chip: string; text: string }> = {
    cyan: {
      chip: "bg-cyan-500/10 border border-cyan-500/30",
      text: "text-cyan-700",
    },
    teal: {
      chip: "bg-teal-500/10 border border-teal-500/30",
      text: "text-teal-700",
    },
    slate: {
      chip: "bg-slate-500/10 border border-slate-500/30",
      text: "text-slate-700",
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#f2fdff] via-[#e8f9fb] to-[#f7fcfd] text-slate-900">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,148,170,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,139,149,0.07),transparent_55%)]" />
        <div className="absolute inset-y-0 left-1/2 w-[420px] -translate-x-1/2 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.65),transparent_60%)]" />
      </div>

      <main className="relative mx-auto max-w-6xl px-4 sm:px-8 lg:px-12 pb-16 sm:pb-24 pt-4 sm:pt-8">

        {/* Announcement Banner */}
        <div className="mb-6 sm:mb-10 flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-800 shadow-sm ring-1 ring-white/70">
            <MapPin className="h-3.5 w-3.5" />
            Australia expansion studio
          </div>
        </div>

        {/* ─── Hero Section ─── */}
        <section className="relative py-8 sm:py-16 lg:py-20 mb-10 sm:mb-24">
          <div className="relative grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left Column: Text + CTA */}
            <div className="relative z-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 shadow-sm ring-1 ring-white/60">
                Your local partner
              </div>
              <h1 className="font-black text-[#0b2a34] tracking-tight mb-4 sm:mb-6">
                <span className="block text-[1.9rem] sm:text-[2.5rem] md:text-[2.9rem] lg:text-[3.2rem] xl:text-[3.4rem] leading-[1.05]">
                  Your Australian Sales &amp;
                </span>
                <span className="block text-[1.9rem] sm:text-[2.5rem] md:text-[2.9rem] lg:text-[3.2rem] xl:text-[3.4rem] leading-[1.05] text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 via-teal-700 to-cyan-900">
                  Partnerships Arm
                </span>
                <span className="block text-lg sm:text-xl md:text-2xl lg:text-2xl text-slate-600 font-semibold mt-3">
                  Without hiring locally
                </span>
              </h1>
              <p className="text-sm sm:text-lg md:text-xl text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-6 sm:mb-8">
                We help overseas companies enter Australia by sourcing customers, forming distribution partnerships, and running local GTM - on a pilot retainer + success basis.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#008b8b] px-8 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#00767a] hover:shadow-lg shadow-cyan-500/30"
                >
                  <Calendar className="h-4 w-4" />
                  Book a 15-min Expansion Call
                </a>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-900/10 bg-white/70 px-8 py-4 text-sm font-semibold text-slate-900 transition-all hover:bg-white"
                >
                  See How It Works
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right Column: Pipeline Visual */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-cyan-300/30 via-cyan-400/10 to-transparent rounded-3xl blur-3xl" />
              <div className="relative rounded-3xl border border-white/70 bg-white/80 p-5 sm:p-8 shadow-[0_30px_120px_rgba(6,16,32,0.12)] backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/30 flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-cyan-700" />
                  </div>
                  <div>
                    <p className="text-slate-900 font-semibold text-sm">Australia GTM Playbook</p>
                    <p className="text-slate-500 text-xs">Your expansion at a glance</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="text-center p-4 rounded-2xl bg-white shadow-sm shadow-cyan-900/5 border border-slate-200/70">
                    <Users className="h-5 w-5 text-cyan-700 mx-auto mb-1.5" />
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">Customers</p>
                    <p className="text-lg font-bold text-slate-900 mt-0.5">Direct</p>
                  </div>
                  <div className="text-center p-4 rounded-2xl bg-white shadow-sm shadow-teal-900/5 border border-slate-200/70">
                    <Handshake className="h-5 w-5 text-teal-700 mx-auto mb-1.5" />
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">Partners</p>
                    <p className="text-lg font-bold text-slate-900 mt-0.5">Distribution</p>
                  </div>
                  <div className="text-center p-4 rounded-2xl bg-white shadow-sm shadow-cyan-900/5 border border-slate-200/70">
                    <Share2 className="h-5 w-5 text-cyan-700 mx-auto mb-1.5" />
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">Affiliates</p>
                    <p className="text-lg font-bold text-slate-900 mt-0.5">Referral</p>
                  </div>
                  <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-cyan-50 to-white border border-cyan-200/80">
                    <BarChart3 className="h-5 w-5 text-cyan-700 mx-auto mb-1.5" />
                    <p className="text-[10px] text-cyan-700/80 uppercase tracking-wider">Reporting</p>
                    <p className="text-lg font-bold text-cyan-700 mt-0.5">Weekly</p>
                  </div>
                </div>

                <div className="rounded-2xl bg-gradient-to-r from-cyan-100 via-white to-cyan-50 border border-cyan-200/80 p-5">
                  <p className="text-slate-600 text-xs uppercase tracking-wider mb-1">90-Day Pilot</p>
                  <p className="text-slate-900 font-semibold text-sm">Pipeline, partners, and revenue signals - before you commit headcount.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── What We Do (3 Pillars) ─── */}
        <section className="mb-16 sm:mb-28">
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-[#0b2a34] mb-2 sm:mb-4">
              We Build Revenue in Australia Through <span className="text-cyan-700">Three Channels</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            {/* Pillar 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/12 to-cyan-500/0 rounded-2xl sm:rounded-3xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white/80 p-5 sm:p-8 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-900/8 transition-all duration-300 h-full backdrop-blur">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-500/15 to-cyan-500/5 border border-cyan-500/20 flex items-center justify-center mb-5">
                  <Target className="h-6 w-6 text-cyan-700" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Direct Customer Acquisition</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Outbound + intros + closing support to win your first Australian customers. We do the prospecting, you join the key calls.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/12 to-teal-500/0 rounded-2xl sm:rounded-3xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white/80 p-5 sm:p-8 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-900/8 transition-all duration-300 h-full backdrop-blur">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-teal-500/15 to-teal-500/5 border border-teal-500/20 flex items-center justify-center mb-5">
                  <Handshake className="h-6 w-6 text-teal-700" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Partnership Distribution</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  We secure agencies, communities, platforms, and strategic partners that drive recurring pipeline into your business.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/12 to-cyan-500/0 rounded-2xl sm:rounded-3xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white/80 p-5 sm:p-8 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-900/8 transition-all duration-300 h-full backdrop-blur">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-500/15 to-cyan-500/5 border border-cyan-500/20 flex items-center justify-center mb-5">
                  <Share2 className="h-6 w-6 text-cyan-700" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Referral &amp; Affiliate Activation</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  We recruit and manage high-trust referral partners and track performance with full attribution and reporting.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Why This Exists ─── */}
        <section className="mb-16 sm:mb-30">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white/85 p-6 sm:p-12 shadow-[0_24px_90px_rgba(6,16,32,0.08)] backdrop-blur">
            <div className="text-center mb-6 sm:mb-10">
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-[#0b2a34] leading-[1.1] mb-3 sm:mb-4">
                Why Overseas Expansion Into Australia <span className="text-cyan-700">Breaks Without Local Ownership</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-4 p-5 rounded-xl bg-white shadow-sm border border-slate-200/70">
                <div className="flex-shrink-0 h-9 w-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <span className="text-red-500 text-sm font-bold">1</span>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed">Market entry stalls without local relationships and follow-through.</p>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-xl bg-white shadow-sm border border-slate-200/70">
                <div className="flex-shrink-0 h-9 w-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <span className="text-red-500 text-sm font-bold">2</span>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed">Partnerships require ongoing activation, not one-off intros.</p>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-xl bg-white shadow-sm border border-slate-200/70">
                <div className="flex-shrink-0 h-9 w-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <span className="text-red-500 text-sm font-bold">3</span>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed">Hiring locally too early is expensive and slow.</p>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-xl bg-white shadow-sm border border-slate-200/70">
                <div className="flex-shrink-0 h-9 w-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <span className="text-red-500 text-sm font-bold">4</span>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed">You need revenue signals before you commit headcount.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── How It Works (4 Steps) ─── */}
        <section className="mb-16 sm:mb-32">
          <div className="text-center mb-6 sm:mb-12">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-[#0b2a34] mb-2 sm:mb-4">
              How It <span className="text-cyan-700">Works</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-lg">
              A clear, structured approach to building your Australia revenue.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { step: "01", title: "Short Pilot Scope", desc: "90-day engagement with clear deliverables. Align on ICP, messaging, and success metrics.", color: "cyan" },
              { step: "02", title: "Target List Build", desc: "Partner + customer target list built around your ideal profile and Australia market specifics.", color: "teal" },
              { step: "03", title: "Outreach + Closing", desc: "We run outreach, book introductions, and provide closing support on key opportunities.", color: "cyan" },
              { step: "04", title: "Weekly Reporting", desc: "Pipeline, partners, conversion, and next actions - reported weekly so you always know the score.", color: "slate" },
            ].map((item) => (
              <div key={item.step} className="rounded-2xl border border-slate-200/80 bg-white/85 p-5 sm:p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center mb-4 ${stepTone[item.color].chip}`}>
                  <span className={`text-sm font-black ${stepTone[item.color].text}`}>{item.step}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Who It's For ─── */}
        <section className="mb-16 sm:mb-32">
          <div className="text-center mb-6 sm:mb-12">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-[#0b2a34] mb-2 sm:mb-4">
              Built for Overseas Teams That Need <span className="text-cyan-700">Australian Traction Fast</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              { icon: Users, label: "Founder-led growth teams" },
              { icon: Handshake, label: "Heads of Partnerships / Growth" },
              { icon: TrendingUp, label: "Seed to Series B companies testing new markets" },
              { icon: CheckCircle2, label: "Brands with proven product-market fit elsewhere" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4 p-4 rounded-xl border border-slate-200/70 bg-white/85 shadow-sm">
                <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-5 w-5 text-cyan-700" />
                </div>
                <p className="text-slate-800 font-medium text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── What a Successful First 90 Days Looks Like ─── */}
        <section className="mb-16 sm:mb-32">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-cyan-200/80 bg-gradient-to-br from-white via-cyan-50 to-white p-6 sm:p-12 shadow-[0_24px_90px_rgba(6,16,32,0.08)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(92,225,230,0.12),transparent_55%)]" />
            <div className="relative z-10">
              <div className="text-center mb-6 sm:mb-10">
                <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-[#0b2a34] mb-2 sm:mb-4">
                  What a Successful First <span className="text-cyan-700">90 Days</span> Looks Like
                </h2>
                <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
                  Typical targets we aim to deliver during a pilot engagement.
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                <div className="text-center p-4 rounded-2xl bg-white border border-slate-200/70 shadow-sm">
                  <p className="text-2xl sm:text-3xl font-black text-cyan-700">10-20</p>
                  <p className="text-xs text-slate-500 mt-1">Partner conversations</p>
                </div>
                <div className="text-center p-4 rounded-2xl bg-white border border-slate-200/70 shadow-sm">
                  <p className="text-2xl sm:text-3xl font-black text-cyan-700">3-8</p>
                  <p className="text-xs text-slate-500 mt-1">Qualified distribution opportunities</p>
                </div>
                <div className="text-center p-4 rounded-2xl bg-white border border-slate-200/70 shadow-sm">
                  <p className="text-2xl sm:text-3xl font-black text-cyan-700">5-15</p>
                  <p className="text-xs text-slate-500 mt-1">Sales conversations</p>
                </div>
                <div className="text-center p-4 rounded-2xl bg-white border border-slate-200/70 shadow-sm">
                  <p className="text-2xl sm:text-3xl font-black text-teal-700">Clear</p>
                  <p className="text-xs text-slate-500 mt-1">Revenue signal + repeatable channel</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Pricing Teaser ─── */}
        <section className="mb-12 sm:mb-24">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white/85 p-5 sm:p-10 shadow-[0_24px_90px_rgba(6,16,32,0.06)]">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-8">
              <div className="text-center lg:text-left">
                <h2 className="text-lg sm:text-2xl font-black text-[#0b2a34] mb-2">
                  Choose a Pilot or Retainer Model
                </h2>
                <p className="text-slate-600 text-sm max-w-xl">
                  Transparent, services-led pricing. No hidden fees. Start with a 90-day pilot.
                </p>
              </div>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#008b8b] px-6 sm:px-8 py-3 sm:py-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#00767a] hover:shadow-lg shadow-cyan-500/30 whitespace-nowrap"
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
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-200/60 via-white to-cyan-100 rounded-2xl sm:rounded-3xl blur-3xl" />
            <div className="relative rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white/85 px-5 py-10 sm:px-12 sm:py-16 text-center shadow-[0_24px_90px_rgba(6,16,32,0.08)]">
              <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
                <h2 className="text-xl sm:text-4xl font-black text-[#0b2a34]">
                  Want Australia Revenue Without Hiring Locally?
                </h2>
                <p className="text-sm sm:text-lg text-slate-600">
                  We bring customers, partners, and distribution in Australia - so you don&apos;t have to hire before you have revenue.
                </p>
                <div className="pt-2 sm:pt-4">
                  <a
                    href={calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#008b8b] px-6 sm:px-8 py-3 sm:py-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#00767a] hover:shadow-lg shadow-cyan-500/30"
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
