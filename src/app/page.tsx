import {
  ArrowRight,
  Users,
  Handshake,
  Share2,
  Target,
  BarChart3,
  MapPin,
  TrendingUp,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import Link from "next/link";

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#f2fdff] via-[#e8f9fb] to-[#f7fcfd] text-slate-900">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,148,170,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,139,149,0.07),transparent_55%)]" />
        <div className="absolute inset-y-0 left-1/2 w-[420px] -translate-x-1/2 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.65),transparent_60%)]" />
      </div>

      <main className="relative mx-auto max-w-6xl px-4 sm:px-8 lg:px-12 pb-16 sm:pb-24 pt-8 sm:pt-16">

        {/* Hero Section */}
        <section className="relative py-8 sm:py-16 lg:py-20 mb-16 sm:mb-28">
          <div className="relative grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left Column */}
            <div className="relative z-10 text-center lg:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 mb-4">
                Australia expansion partner
              </p>
              <h1 className="font-black text-[#0b2a34] tracking-tight mb-4 sm:mb-6">
                <span className="block text-[1.9rem] sm:text-[2.5rem] md:text-[2.9rem] lg:text-[3.2rem] xl:text-[3.4rem] leading-[1.05]">
                  Your Australian Sales &amp;
                </span>
                <span className="block text-[1.9rem] sm:text-[2.5rem] md:text-[2.9rem] lg:text-[3.2rem] xl:text-[3.4rem] leading-[1.05] text-cyan-700">
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
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#008b8b] px-8 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#00767a] hover:shadow-lg shadow-[#008b8b]/25"
                >
                  <Calendar className="h-4 w-4" />
                  Book a 15-min Expansion Call
                </a>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/80 px-8 py-4 text-sm font-semibold text-slate-900 transition-all hover:bg-white hover:shadow-md"
                >
                  See How It Works
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right Column: Pipeline Visual */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-cyan-300/30 via-cyan-400/10 to-transparent rounded-3xl blur-3xl" />
              <div className="relative rounded-3xl border border-slate-200/80 bg-white/90 p-5 sm:p-8 shadow-[0_30px_120px_rgba(6,16,32,0.12)] backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-cyan-700" />
                  </div>
                  <div>
                    <p className="text-slate-900 font-semibold text-sm">Australia GTM Playbook</p>
                    <p className="text-slate-500 text-xs">Your expansion at a glance</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="text-center p-4 rounded-2xl bg-white shadow-sm border border-slate-200/80">
                    <Users className="h-5 w-5 text-cyan-700 mx-auto mb-1.5" />
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">Customers</p>
                    <p className="text-lg font-bold text-slate-900 mt-0.5">Direct</p>
                  </div>
                  <div className="text-center p-4 rounded-2xl bg-white shadow-sm border border-slate-200/80">
                    <Handshake className="h-5 w-5 text-cyan-700 mx-auto mb-1.5" />
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">Partners</p>
                    <p className="text-lg font-bold text-slate-900 mt-0.5">Distribution</p>
                  </div>
                  <div className="text-center p-4 rounded-2xl bg-white shadow-sm border border-slate-200/80">
                    <Share2 className="h-5 w-5 text-cyan-700 mx-auto mb-1.5" />
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">Affiliates</p>
                    <p className="text-lg font-bold text-slate-900 mt-0.5">Referral</p>
                  </div>
                  <div className="text-center p-4 rounded-2xl bg-cyan-50 border border-cyan-200/80">
                    <BarChart3 className="h-5 w-5 text-cyan-700 mx-auto mb-1.5" />
                    <p className="text-[10px] text-cyan-700/80 uppercase tracking-wider">Reporting</p>
                    <p className="text-lg font-bold text-cyan-700 mt-0.5">Weekly</p>
                  </div>
                </div>

                <div className="rounded-2xl bg-cyan-50 border border-cyan-200/80 p-5">
                  <p className="text-slate-600 text-xs uppercase tracking-wider mb-1">90-Day Pilot</p>
                  <p className="text-slate-900 font-semibold text-sm">Pipeline, partners, and revenue signals - before you commit headcount.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Three Channels - Expanded Premium Section */}
        <section className="mb-20 sm:mb-32">
          <div className="text-center mb-10 sm:mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 mb-3">Our approach</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0b2a34] mb-3 sm:mb-4">
              We Build Revenue in Australia Through Three Channels
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-lg">
              Each channel is managed end-to-end by our team. You get pipeline, partners, and revenue signals without building a local operation.
            </p>
          </div>

          <div className="space-y-6">
            {/* Channel 1 */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur transition-all duration-300 hover:shadow-xl hover:shadow-cyan-900/8">
              <div className="grid lg:grid-cols-[1fr_320px] gap-0">
                <div className="p-6 sm:p-10">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="h-12 w-12 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center flex-shrink-0">
                      <Target className="h-6 w-6 text-cyan-700" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-700 mb-1">Channel 1</p>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Direct Customer Acquisition</h3>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                    We act as your on-the-ground sales arm in Australia. From outbound prospecting to warm introductions and closing support, we build your customer pipeline so you can focus on product and strategy.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {["Outbound prospecting to your ICP", "Warm introductions via our network", "Pipeline creation and deal support", "Weekly conversion reporting"].map((item) => (
                      <div key={item} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-cyan-700 flex-shrink-0 mt-0.5" />
                        <p className="text-slate-700 text-sm">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="hidden lg:flex items-center justify-center bg-cyan-50/50 border-l border-slate-200/60 p-8">
                  <div className="text-center">
                    <p className="text-4xl font-black text-cyan-700 mb-1">10-20</p>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Qualified conversations</p>
                    <p className="text-xs text-slate-400 mt-0.5">in 90 days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Channel 2 */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur transition-all duration-300 hover:shadow-xl hover:shadow-cyan-900/8">
              <div className="grid lg:grid-cols-[1fr_320px] gap-0">
                <div className="p-6 sm:p-10">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="h-12 w-12 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center flex-shrink-0">
                      <Handshake className="h-6 w-6 text-teal-700" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-teal-700 mb-1">Channel 2</p>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Partnership Distribution</h3>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                    We source, pitch, and activate agencies, platforms, communities, and strategic partners who can distribute your product across Australia. We manage the relationships so partners keep performing.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {["Partner identification and outreach", "Agency and platform activation", "Partner terms and structure design", "Ongoing relationship management"].map((item) => (
                      <div key={item} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-teal-700 flex-shrink-0 mt-0.5" />
                        <p className="text-slate-700 text-sm">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="hidden lg:flex items-center justify-center bg-teal-50/50 border-l border-slate-200/60 p-8">
                  <div className="text-center">
                    <p className="text-4xl font-black text-teal-700 mb-1">3-8</p>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Distribution partners</p>
                    <p className="text-xs text-slate-400 mt-0.5">activated per pilot</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Channel 3 */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur transition-all duration-300 hover:shadow-xl hover:shadow-cyan-900/8">
              <div className="grid lg:grid-cols-[1fr_320px] gap-0">
                <div className="p-6 sm:p-10">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="h-12 w-12 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center flex-shrink-0">
                      <Share2 className="h-6 w-6 text-cyan-700" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-700 mb-1">Channel 3</p>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Referral &amp; Affiliate Activation</h3>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                    We recruit high-trust referral partners and affiliates, set up attribution tracking, and manage performance monthly. You get a scalable, performance-based distribution channel in Australia.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {["Affiliate and referral recruitment", "Attribution and performance tracking", "Commission structure management", "Monthly channel optimisation"].map((item) => (
                      <div key={item} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-cyan-700 flex-shrink-0 mt-0.5" />
                        <p className="text-slate-700 text-sm">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="hidden lg:flex items-center justify-center bg-cyan-50/50 border-l border-slate-200/60 p-8">
                  <div className="text-center">
                    <p className="text-4xl font-black text-cyan-700 mb-1">5-15</p>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Sales conversations</p>
                    <p className="text-xs text-slate-400 mt-0.5">from referral channels</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why This Exists */}
        <section className="mb-20 sm:mb-32">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-6 sm:p-12 shadow-sm backdrop-blur">
            <div className="text-center mb-6 sm:mb-10">
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-[#0b2a34] leading-[1.1] mb-3 sm:mb-4">
                Why Overseas Expansion Into Australia Breaks Without Local Ownership
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
              {[
                "Market entry stalls without local relationships and follow-through.",
                "Partnerships require ongoing activation, not one-off intros.",
                "Hiring locally too early is expensive and slow.",
                "You need revenue signals before you commit headcount.",
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-xl bg-white shadow-sm border border-slate-200/80">
                  <div className="flex-shrink-0 h-9 w-9 rounded-lg bg-red-50 border border-red-200/80 flex items-center justify-center">
                    <span className="text-red-600 text-sm font-bold">{i + 1}</span>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-20 sm:mb-32">
          <div className="text-center mb-6 sm:mb-12">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-[#0b2a34] mb-2 sm:mb-4">
              How It Works
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-lg">
              A clear, structured approach to building your Australia revenue.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { step: "01", title: "Short Pilot Scope", desc: "90-day engagement with clear deliverables. Align on ICP, messaging, and success metrics." },
              { step: "02", title: "Target List Build", desc: "Partner + customer target list built around your ideal profile and Australia market specifics." },
              { step: "03", title: "Outreach + Closing", desc: "We run outreach, book introductions, and provide closing support on key opportunities." },
              { step: "04", title: "Weekly Reporting", desc: "Pipeline, partners, conversion, and next actions - reported weekly so you always know the score." },
            ].map((item) => (
              <div key={item.step} className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="h-10 w-10 rounded-xl flex items-center justify-center mb-4 bg-cyan-50 border border-cyan-200">
                  <span className="text-sm font-black text-cyan-700">{item.step}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Who It's For */}
        <section className="mb-20 sm:mb-32">
          <div className="text-center mb-6 sm:mb-12">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-[#0b2a34] mb-2 sm:mb-4">
              Built for Overseas Teams That Need Australian Traction Fast
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              { icon: Users, label: "Founder-led growth teams" },
              { icon: Handshake, label: "Heads of Partnerships / Growth" },
              { icon: TrendingUp, label: "Seed to Series B companies testing new markets" },
              { icon: CheckCircle2, label: "Brands with proven product-market fit elsewhere" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4 p-4 rounded-xl border border-slate-200/80 bg-white/90 shadow-sm">
                <div className="h-10 w-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-5 w-5 text-cyan-700" />
                </div>
                <p className="text-slate-800 font-medium text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 90 Days */}
        <section className="mb-20 sm:mb-32">
          <div className="relative overflow-hidden rounded-2xl border border-cyan-200/80 bg-white/90 p-6 sm:p-12 shadow-sm">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(92,225,230,0.08),transparent_55%)]" />
            <div className="relative z-10">
              <div className="text-center mb-6 sm:mb-10">
                <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-[#0b2a34] mb-2 sm:mb-4">
                  What a Successful First 90 Days Looks Like
                </h2>
                <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
                  Typical targets we aim to deliver during a pilot engagement.
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {[
                  { value: "10-20", label: "Partner conversations" },
                  { value: "3-8", label: "Qualified distribution opportunities" },
                  { value: "5-15", label: "Sales conversations" },
                  { value: "Clear", label: "Revenue signal + repeatable channel" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                    <p className="text-2xl sm:text-3xl font-black text-cyan-700">{stat.value}</p>
                    <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Teaser */}
        <section className="mb-16 sm:mb-24">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-5 sm:p-10 shadow-sm">
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
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#008b8b] px-6 sm:px-8 py-3 sm:py-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#00767a] hover:shadow-lg shadow-[#008b8b]/25 whitespace-nowrap"
              >
                View Pricing
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section>
          <div className="relative rounded-2xl border border-slate-200/80 bg-white/90 px-5 py-10 sm:px-12 sm:py-16 text-center shadow-sm">
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
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#008b8b] px-6 sm:px-8 py-3 sm:py-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#00767a] hover:shadow-lg shadow-[#008b8b]/25"
                >
                  <Calendar className="h-4 w-4" />
                  Book Call
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
