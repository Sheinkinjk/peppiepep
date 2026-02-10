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
    <div className="relative min-h-screen overflow-hidden text-slate-900">

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-b from-[#e8f9fb] via-[#f0fcfd] to-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(10,167,181,0.14),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,131,143,0.08),transparent_50%)]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-8 lg:px-12 pt-10 sm:pt-20 pb-16 sm:pb-28">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left Column */}
            <div className="relative z-10 text-center lg:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0AA7B5] mb-4">
                Australia expansion partner
              </p>
              <h1 className="font-black text-[#0b2a34] tracking-tight mb-4 sm:mb-6">
                <span className="block text-[1.9rem] sm:text-[2.5rem] md:text-[2.9rem] lg:text-[3.2rem] xl:text-[3.4rem] leading-[1.05]">
                  Your Australian Sales &amp;
                </span>
                <span className="block text-[1.9rem] sm:text-[2.5rem] md:text-[2.9rem] lg:text-[3.2rem] xl:text-[3.4rem] leading-[1.05] text-[#0AA7B5]">
                  Partnerships Arm
                </span>
                <span className="block text-lg sm:text-xl md:text-2xl text-slate-600 font-semibold mt-3">
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
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0AA7B5] px-8 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#00838F] hover:shadow-lg shadow-lg shadow-[#0AA7B5]/30"
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
              <div className="absolute -inset-4 bg-gradient-to-br from-[#0AA7B5]/20 via-cyan-400/10 to-transparent rounded-3xl blur-3xl" />
              <div className="relative rounded-3xl border border-cyan-200 bg-white p-5 sm:p-8 shadow-[0_30px_120px_rgba(10,167,181,0.18)] backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-[#0AA7B5]/10 border border-[#0AA7B5]/25 flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-[#0AA7B5]" />
                  </div>
                  <div>
                    <p className="text-slate-900 font-semibold text-sm">Australia GTM Playbook</p>
                    <p className="text-slate-500 text-xs">Your expansion at a glance</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-cyan-50 to-white border border-cyan-200/60">
                    <Users className="h-5 w-5 text-[#0AA7B5] mx-auto mb-1.5" />
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">Customers</p>
                    <p className="text-lg font-bold text-slate-900 mt-0.5">Direct</p>
                  </div>
                  <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-teal-50 to-white border border-teal-200/60">
                    <Handshake className="h-5 w-5 text-teal-600 mx-auto mb-1.5" />
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">Partners</p>
                    <p className="text-lg font-bold text-slate-900 mt-0.5">Distribution</p>
                  </div>
                  <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-cyan-50 to-white border border-cyan-200/60">
                    <Share2 className="h-5 w-5 text-[#0AA7B5] mx-auto mb-1.5" />
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">Affiliates</p>
                    <p className="text-lg font-bold text-slate-900 mt-0.5">Referral</p>
                  </div>
                  <div className="text-center p-4 rounded-2xl bg-[#0AA7B5]/8 border border-[#0AA7B5]/20">
                    <BarChart3 className="h-5 w-5 text-[#0AA7B5] mx-auto mb-1.5" />
                    <p className="text-[10px] text-[#0AA7B5]/80 uppercase tracking-wider">Reporting</p>
                    <p className="text-lg font-bold text-[#00838F] mt-0.5">Weekly</p>
                  </div>
                </div>

                <div className="rounded-2xl bg-gradient-to-r from-[#0AA7B5]/8 to-cyan-50 border border-[#0AA7B5]/15 p-5">
                  <p className="text-[#00838F] text-xs uppercase tracking-wider mb-1 font-medium">90-Day Pilot</p>
                  <p className="text-slate-900 font-semibold text-sm">Pipeline, partners, and revenue signals - before you commit headcount.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Three Channels ── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-12">
          <div className="text-center mb-10 sm:mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0AA7B5] mb-3">Our approach</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0b2a34] mb-3 sm:mb-4">
              We Build Revenue in Australia Through Three Channels
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-lg">
              Each channel is managed end-to-end by our team. You get pipeline, partners, and revenue signals without building a local operation.
            </p>
          </div>

          <div className="space-y-5">
            {/* Channel 1 */}
            <div className="group relative overflow-hidden rounded-2xl border border-cyan-200/80 bg-gradient-to-r from-cyan-50/60 via-white to-white transition-all duration-300 hover:shadow-xl hover:shadow-[#0AA7B5]/10 hover:border-[#0AA7B5]/30">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0AA7B5]" />
              <div className="grid lg:grid-cols-[1fr_280px] gap-0">
                <div className="p-6 sm:p-10 pl-8 sm:pl-12">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="h-12 w-12 rounded-xl bg-[#0AA7B5]/10 border border-[#0AA7B5]/20 flex items-center justify-center flex-shrink-0">
                      <Target className="h-6 w-6 text-[#0AA7B5]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#0AA7B5] mb-1">Channel 1</p>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Direct Customer Acquisition</h3>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                    We act as your on-the-ground sales arm in Australia. From outbound prospecting to warm introductions and closing support, we build your customer pipeline so you can focus on product and strategy.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {["Outbound prospecting to your ICP", "Warm introductions via our network", "Pipeline creation and deal support", "Weekly conversion reporting"].map((item) => (
                      <div key={item} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-[#0AA7B5] flex-shrink-0 mt-0.5" />
                        <p className="text-slate-700 text-sm">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-[#0AA7B5]/8 to-cyan-50/50 border-l border-cyan-200/40 p-8">
                  <div className="text-center">
                    <p className="text-4xl font-black text-[#0AA7B5] mb-1">10-20</p>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Qualified conversations</p>
                    <p className="text-xs text-slate-400 mt-0.5">in 90 days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Channel 2 */}
            <div className="group relative overflow-hidden rounded-2xl border border-teal-200/80 bg-gradient-to-r from-teal-50/60 via-white to-white transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/10 hover:border-teal-400/30">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-500" />
              <div className="grid lg:grid-cols-[1fr_280px] gap-0">
                <div className="p-6 sm:p-10 pl-8 sm:pl-12">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="h-12 w-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center flex-shrink-0">
                      <Handshake className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-teal-600 mb-1">Channel 2</p>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Partnership Distribution</h3>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                    We source, pitch, and activate agencies, platforms, communities, and strategic partners who can distribute your product across Australia. We manage the relationships so partners keep performing.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {["Partner identification and outreach", "Agency and platform activation", "Partner terms and structure design", "Ongoing relationship management"].map((item) => (
                      <div key={item} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-teal-600 flex-shrink-0 mt-0.5" />
                        <p className="text-slate-700 text-sm">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-teal-500/8 to-teal-50/50 border-l border-teal-200/40 p-8">
                  <div className="text-center">
                    <p className="text-4xl font-black text-teal-600 mb-1">3-8</p>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Distribution partners</p>
                    <p className="text-xs text-slate-400 mt-0.5">activated per pilot</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Channel 3 */}
            <div className="group relative overflow-hidden rounded-2xl border border-cyan-200/80 bg-gradient-to-r from-cyan-50/60 via-white to-white transition-all duration-300 hover:shadow-xl hover:shadow-[#0AA7B5]/10 hover:border-[#0AA7B5]/30">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0AA7B5]" />
              <div className="grid lg:grid-cols-[1fr_280px] gap-0">
                <div className="p-6 sm:p-10 pl-8 sm:pl-12">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="h-12 w-12 rounded-xl bg-[#0AA7B5]/10 border border-[#0AA7B5]/20 flex items-center justify-center flex-shrink-0">
                      <Share2 className="h-6 w-6 text-[#0AA7B5]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#0AA7B5] mb-1">Channel 3</p>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Referral &amp; Affiliate Activation</h3>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                    We recruit high-trust referral partners and affiliates, set up attribution tracking, and manage performance monthly. You get a scalable, performance-based distribution channel in Australia.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {["Affiliate and referral recruitment", "Attribution and performance tracking", "Commission structure management", "Monthly channel optimisation"].map((item) => (
                      <div key={item} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-[#0AA7B5] flex-shrink-0 mt-0.5" />
                        <p className="text-slate-700 text-sm">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-[#0AA7B5]/8 to-cyan-50/50 border-l border-cyan-200/40 p-8">
                  <div className="text-center">
                    <p className="text-4xl font-black text-[#0AA7B5] mb-1">5-15</p>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Sales conversations</p>
                    <p className="text-xs text-slate-400 mt-0.5">from referral channels</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why This Exists (Dark Tiffany Section) ── */}
      <section className="relative bg-[#024b56] py-16 sm:py-24 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(10,167,181,0.2),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(34,192,205,0.1),transparent_50%)]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-8 lg:px-12">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-[1.1] mb-4">
              Why Overseas Expansion Into Australia Breaks Without Local Ownership
            </h2>
          </div>

          <div className="space-y-4">
            {[
              "Market entry stalls without local relationships and follow-through.",
              "Partnerships require ongoing activation, not one-off intros.",
              "Hiring locally too early is expensive and slow.",
              "You need revenue signals before you commit headcount.",
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-5 p-5 sm:p-6 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-sm">
                <div className="flex-shrink-0 h-9 w-9 rounded-full bg-[#0AA7B5]/20 border border-[#0AA7B5]/30 flex items-center justify-center">
                  <span className="text-[#57D3DE] text-sm font-bold">{i + 1}</span>
                </div>
                <p className="text-white/90 text-sm sm:text-base leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="relative bg-gradient-to-b from-[#f0fcfd] to-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-12">
          <div className="text-center mb-8 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0b2a34] mb-2 sm:mb-4">
              How It Works
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-lg">
              A clear, structured approach to building your Australia revenue.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 sm:gap-0">
            {[
              { step: "01", title: "Short Pilot Scope", desc: "90-day engagement with clear deliverables. Align on ICP, messaging, and success metrics." },
              { step: "02", title: "Target List Build", desc: "Partner + customer target list built around your ideal profile and Australia market specifics." },
              { step: "03", title: "Outreach + Closing", desc: "We run outreach, book introductions, and provide closing support on key opportunities." },
              { step: "04", title: "Weekly Reporting", desc: "Pipeline, partners, conversion, and next actions - reported weekly so you always know the score." },
            ].map((item, i) => (
              <div key={item.step} className={`relative p-6 sm:p-8 ${i < 3 ? "lg:border-r lg:border-[#0AA7B5]/15" : ""}`}>
                <div className="h-12 w-12 rounded-full flex items-center justify-center mb-5 bg-[#0AA7B5] text-white shadow-lg shadow-[#0AA7B5]/25">
                  <span className="text-sm font-black">{item.step}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who It's For ── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-8 lg:px-12">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0b2a34] mb-2 sm:mb-4">
              Built for Overseas Teams That Need Australian Traction Fast
            </h2>
          </div>

          <div className="space-y-3">
            {[
              { icon: Users, label: "Founder-led growth teams" },
              { icon: Handshake, label: "Heads of Partnerships / Growth" },
              { icon: TrendingUp, label: "Seed to Series B companies testing new markets" },
              { icon: CheckCircle2, label: "Brands with proven product-market fit elsewhere" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-5 p-5 rounded-xl hover:bg-cyan-50/50 transition-colors">
                <div className="h-11 w-11 rounded-xl bg-[#0AA7B5]/10 border border-[#0AA7B5]/20 flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-5 w-5 text-[#0AA7B5]" />
                </div>
                <p className="text-slate-800 font-medium text-base">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 90 Days (Tiffany Tinted) ── */}
      <section className="relative bg-gradient-to-b from-[#e8f9fb] via-[#f0fcfd] to-white py-16 sm:py-24 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(10,167,181,0.08),transparent_55%)]" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-8 lg:px-12">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0b2a34] mb-2 sm:mb-4">
              What a Successful First 90 Days Looks Like
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
              Typical targets we aim to deliver during a pilot engagement.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { value: "10-20", label: "Partner conversations" },
              { value: "3-8", label: "Qualified distribution opportunities" },
              { value: "5-15", label: "Sales conversations" },
              { value: "Clear", label: "Revenue signal + repeatable channel" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-5 sm:p-6 rounded-2xl bg-white border border-cyan-200/60 shadow-sm">
                <p className="text-2xl sm:text-3xl font-black text-[#0AA7B5]">{stat.value}</p>
                <p className="text-xs text-slate-500 mt-1.5 leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing Teaser ── */}
      <section className="relative bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-8 lg:px-12">
          <div className="relative overflow-hidden rounded-2xl border border-cyan-200/60 bg-gradient-to-r from-[#f0fcfd] via-white to-[#f0fcfd] p-6 sm:p-10">
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
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0AA7B5] px-6 sm:px-8 py-3 sm:py-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#00838F] hover:shadow-lg shadow-lg shadow-[#0AA7B5]/25 whitespace-nowrap"
              >
                View Pricing
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer CTA (Dark Tiffany) ── */}
      <section className="relative bg-[#024b56] py-16 sm:py-24 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(10,167,181,0.15),transparent_45%)]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 sm:px-8 lg:px-12 text-center">
          <h2 className="text-2xl sm:text-4xl font-black text-white mb-4 sm:mb-6">
            Want Australia Revenue Without Hiring Locally?
          </h2>
          <p className="text-sm sm:text-lg text-white/80 mb-6 sm:mb-8 max-w-xl mx-auto">
            We bring customers, partners, and distribution in Australia - so you don&apos;t have to hire before you have revenue.
          </p>
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0AA7B5] px-8 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#22C0CD] hover:shadow-lg shadow-lg shadow-[#0AA7B5]/40"
          >
            <Calendar className="h-4 w-4" />
            Book Call
          </a>
        </div>
      </section>

    </div>
  );
}
