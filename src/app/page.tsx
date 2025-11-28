import {
  ArrowRight,
  Gift,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Upload,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="aurora tiffany-hero relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(0,131,143,0.12),transparent_32%),radial-gradient(circle_at_90%_10%,rgba(77,208,225,0.18),transparent_35%)]" />

      <main className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-24 pt-8 md:px-10 lg:px-16">

        {/* Hero Section */}
        <div className="mx-auto w-full max-w-5xl py-12 sm:py-16">
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#021519] via-[#013a44] to-[#026272] p-8 sm:p-12 text-white shadow-[0_25px_80px_rgba(1,40,47,0.45)]">
            <div className="pointer-events-none absolute inset-0 opacity-30">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(77,208,225,0.35),transparent_40%),radial-gradient(circle_at_85%_30%,rgba(0,131,143,0.35),transparent_45%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[length:140px_140px]" />
            </div>
            <div className="relative flex flex-col gap-8">
              <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-[#B2EBF2]">
                <span className="rounded-full border border-white/30 px-4 py-1">Private beta</span>
                <span>Trusted by salons, clinics & premium retailers</span>
              </div>
              <div className="space-y-6">
                <h1 className="text-left text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                  Turn happy customers into your{" "}
                  <span className="text-[#4DD0E1]">growth network</span>
                </h1>
                <p className="max-w-3xl text-left text-lg leading-relaxed text-white/75 sm:text-xl lg:text-2xl font-medium">
                  Launch a referral program that plugs into your sales and marketing strategies. Reward advocates, track every conversion, and grow with predictable word-of-mouth.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/dashboard-guest"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-[#00505B] shadow-lg shadow-[#023842]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  Try demo dashboard
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
                >
                  Get started
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-left">
                {[
                  { label: "Customers imported", value: "5K+" },
                  { label: "Rewards automated", value: "$420K" },
                  { label: "Avg referral lift", value: "38%" },
                  { label: "Communications sent", value: "250K+" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/15 bg-white/5 p-4 shadow-inner shadow-black/10"
                  >
                    <p className="text-3xl font-black text-white">{item.value}</p>
                    <p className="text-xs uppercase tracking-wide text-white/70">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section - Premium Redesign */}
        <section className="space-y-12 sm:space-y-16 relative">
          {/* Section Header */}
          <div className="text-center space-y-4 px-4">
            <h2 className="text-3xl font-black sm:text-4xl lg:text-5xl tracking-tight">
              How Pepform creates{" "}
              <span className="text-[#00838F]">Micro Influencers</span>
            </h2>
            <p className="text-base sm:text-lg text-[#35535A] max-w-2xl mx-auto font-medium">
              How Pepform turns your happy customers into a predictable, compounding referral engine
            </p>
          </div>

          {/* Premium Step Cards */}
          <div className="relative max-w-5xl mx-auto">
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="group relative bg-white/95 rounded-2xl border border-[#DCF4F8] p-8 hover:border-[#0B7785] hover:shadow-[0_25px_60px_rgba(2,47,53,0.15)] transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="h-14 w-14 rounded-xl bg-[#E0F7FA] flex items-center justify-center shadow-lg shadow-[#C4EFF6]">
                      <Upload className="h-7 w-7 text-[#00838F]" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-[#024B56]">
                        Import & Activate
                      </h3>
                      <span className="text-xs font-black text-[#00838F] bg-[#E0F7FA] px-3 py-1 rounded-full">STEP 1</span>
                    </div>
                    <p className="text-[#3C5C62] leading-relaxed mb-4">
                      Upload your customer list via CSV or Excel. Every customer instantly gets their own unique referral link and becomes an active micro-influencer for your brand.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs font-semibold text-[#00838F] bg-[#E0F7FA] px-3 py-1.5 rounded-lg">One-click upload</span>
                      <span className="text-xs font-semibold text-[#00838F] bg-[#E0F7FA] px-3 py-1.5 rounded-lg">Auto-generate links</span>
                      <span className="text-xs font-semibold text-[#00838F] bg-[#E0F7FA] px-3 py-1.5 rounded-lg">2-minute setup</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="group relative bg-white/95 rounded-2xl border border-[#DDEFFC] p-8 hover:border-[#0A7BA2] hover:shadow-[0_25px_60px_rgba(7,84,109,0.15)] transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="h-14 w-14 rounded-xl bg-[#E1F2FE] flex items-center justify-center shadow-lg shadow-[#BFDFF6]">
                      <MessageSquare className="h-7 w-7 text-[#00789D]" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-[#024B56]">
                        Launch Campaigns
                      </h3>
                      <span className="text-xs font-black text-[#00789D] bg-[#E1F2FE] px-3 py-1 rounded-full">STEP 2</span>
                    </div>
                    <p className="text-[#3C5C62] leading-relaxed mb-4">
                      Send personalized referral invitations via SMS or email. Customers receive their unique link with your custom offer, ready to share with their network.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs font-semibold text-[#00789D] bg-[#E1F2FE] px-3 py-1.5 rounded-lg">Custom templates</span>
                      <span className="text-xs font-semibold text-[#00789D] bg-[#E1F2FE] px-3 py-1.5 rounded-lg">SMS & Email</span>
                      <span className="text-xs font-semibold text-[#00789D] bg-[#E1F2FE] px-3 py-1.5 rounded-lg">Scheduled sending</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="group relative bg-white/95 rounded-2xl border border-[#D8F5ED] p-8 hover:border-[#0A836F] hover:shadow-[0_25px_60px_rgba(6,73,63,0.15)] transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="h-14 w-14 rounded-xl bg-[#DFF8F1] flex items-center justify-center shadow-lg shadow-[#C0EEDD]">
                      <TrendingUp className="h-7 w-7 text-[#0A836F]" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-[#024B56]">
                        Track Real-Time
                      </h3>
                      <span className="text-xs font-black text-[#0A836F] bg-[#DFF8F1] px-3 py-1 rounded-full">STEP 3</span>
                    </div>
                    <p className="text-[#3C5C62] leading-relaxed mb-4">
                      Watch your referral network expand with live tracking. Identify top performers, see conversion rates, and understand which micro-influencers drive the most value.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs font-semibold text-[#0A836F] bg-[#DFF8F1] px-3 py-1.5 rounded-lg">Live dashboard</span>
                      <span className="text-xs font-semibold text-[#0A836F] bg-[#DFF8F1] px-3 py-1.5 rounded-lg">Leaderboards</span>
                      <span className="text-xs font-semibold text-[#0A836F] bg-[#DFF8F1] px-3 py-1.5 rounded-lg">Analytics</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="group relative bg-white/95 rounded-2xl border border-[#FDEFD9] p-8 hover:border-[#C58019] hover:shadow-[0_25px_60px_rgba(96,50,0,0.15)] transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="h-14 w-14 rounded-xl bg-[#FFF4E5] flex items-center justify-center shadow-lg shadow-[#F9E3C3]">
                      <Gift className="h-7 w-7 text-[#B06D0A]" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-[#024B56]">
                        Automate Rewards
                      </h3>
                      <span className="text-xs font-black text-[#B06D0A] bg-[#FFF4E5] px-3 py-1 rounded-full">STEP 4</span>
                    </div>
                    <p className="text-[#3C5C62] leading-relaxed mb-4">
                      Credits automatically flow to influencers when referrals convert. Instant notifications encourage more sharing. The flywheel accelerates with zero manual work.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs font-semibold text-[#B06D0A] bg-[#FFF4E5] px-3 py-1.5 rounded-lg">Instant credits</span>
                      <span className="text-xs font-semibold text-[#B06D0A] bg-[#FFF4E5] px-3 py-1.5 rounded-lg">Auto notifications</span>
                      <span className="text-xs font-semibold text-[#B06D0A] bg-[#FFF4E5] px-3 py-1.5 rounded-lg">Self-serve</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results CTA */}
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative rounded-2xl bg-gradient-to-br from-[#03181B] via-[#004652] to-[#03181B] p-10 sm:p-12 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(77,208,225,0.15),transparent_50%)]" />
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">
                  Growth becomes predictable, trackable, automatic
                </h3>
                <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
                  Your best customers become your best marketers. Every referral creates a new micro-influencer.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/dashboard-guest"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-slate-900 shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    See it in action
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                  <Link
                    href="/login"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:bg-white/20"
                  >
                    Start for free
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Why Start a Referral Program - Premium Section */}
        <section className="relative overflow-hidden">
          {/* Premium Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#021013] via-[#01343C] to-[#031C20]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,131,143,0.22),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(77,208,225,0.18),transparent_50%)]" />

          <div className="relative space-y-12 sm:space-y-16 py-16 sm:py-24">

            {/* Section Header */}
            <div className="text-center space-y-6 px-4">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent drop-shadow-2xl">
                  Why Start a Referral Program?
                </span>
              </h2>
              <p className="text-xl sm:text-2xl text-purple-100 max-w-4xl mx-auto font-medium leading-relaxed">
                Turn your existing customers into a high-performing sales team—without the overhead, training, or payroll costs
              </p>
            </div>

            {/* Stats Grid - Ultra Premium */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-4">

              {/* Stat 1 - CAC Reduction */}
              <div className="group relative rounded-3xl border border-[#D7F5EF] bg-white/98 backdrop-blur-xl p-8 hover:scale-105 hover:shadow-[0_35px_90px_rgba(2,52,59,0.2)] transition-all duration-500">
                <div className="absolute -top-4 -right-4 h-16 w-16 rounded-2xl bg-[#E0FBF4] flex items-center justify-center shadow-2xl shadow-[#BCEAD9] rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <TrendingUp className="h-8 w-8 text-[#0A836F]" />
                </div>
                <div className="space-y-3">
                  <p className="text-6xl font-black text-[#00505B]">
                    16X
                  </p>
                  <p className="text-sm font-black text-[#0A836F] uppercase tracking-wide">Lower CAC</p>
                  <p className="text-base text-[#3B5F65] leading-relaxed font-medium">
                    Referred customers cost <span className="font-bold text-[#022B30]">$24 to acquire</span> vs. <span className="font-bold text-[#022B30]">$385 for paid ads</span> (2024 Harvard Business Review)
                  </p>
                </div>
              </div>

              {/* Stat 2 - Conversion Rate */}
              <div className="group relative rounded-3xl border border-[#DDEFFC] bg-white/98 backdrop-blur-xl p-8 hover:scale-105 hover:shadow-[0_35px_90px_rgba(6,73,108,0.18)] transition-all duration-500">
                <div className="absolute -top-4 -right-4 h-16 w-16 rounded-2xl bg-[#E2F2FD] flex items-center justify-center shadow-2xl shadow-[#BFDFF6] rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <Users className="h-8 w-8 text-[#0A7BA2]" />
                </div>
                <div className="space-y-3">
                  <p className="text-6xl font-black text-[#00505B]">
                    4X
                  </p>
                  <p className="text-sm font-black text-[#0A7BA2] uppercase tracking-wide">Conversion Rate</p>
                  <p className="text-base text-[#3B5F65] leading-relaxed font-medium">
                    Referrals convert at <span className="font-bold text-[#022B30]">30%</span> compared to <span className="font-bold text-[#022B30]">7.4%</span> for cold traffic (Nielsen Study)
                  </p>
                </div>
              </div>

              {/* Stat 3 - Lifetime Value */}
              <div className="group relative rounded-3xl border border-[#EDE4FF] bg-white/98 backdrop-blur-xl p-8 hover:scale-105 hover:shadow-[0_35px_90px_rgba(57,37,99,0.15)] transition-all duration-500">
                <div className="absolute -top-4 -right-4 h-16 w-16 rounded-2xl bg-[#F4E8FF] flex items-center justify-center shadow-2xl shadow-[#D8C8F6] rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <Sparkles className="h-8 w-8 text-[#7A4AE0]" />
                </div>
                <div className="space-y-3">
                  <p className="text-6xl font-black text-[#00505B]">
                    25%
                  </p>
                  <p className="text-sm font-black text-[#7A4AE0] uppercase tracking-wide">Higher LTV</p>
                  <p className="text-base text-[#3B5F65] leading-relaxed font-medium">
                    Referred customers have <span className="font-bold text-[#022B30]">25% higher profit margins</span> and stay 37% longer (Wharton School)
                  </p>
                </div>
              </div>

              {/* Stat 4 - Trust Factor */}
              <div className="group relative rounded-3xl border border-[#FDEFD9] bg-white/98 backdrop-blur-xl p-8 hover:scale-105 hover:shadow-[0_35px_90px_rgba(96,50,0,0.15)] transition-all duration-500">
                <div className="absolute -top-4 -right-4 h-16 w-16 rounded-2xl bg-[#FFF4E5] flex items-center justify-center shadow-2xl shadow-[#F3DEBC] rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <ShieldCheck className="h-8 w-8 text-[#B06D0A]" />
                </div>
                <div className="space-y-3">
                  <p className="text-6xl font-black text-[#00505B]">
                    92%
                  </p>
                  <p className="text-sm font-black text-[#B06D0A] uppercase tracking-wide">Trust Referrals</p>
                  <p className="text-base text-[#3B5F65] leading-relaxed font-medium">
                    <span className="font-bold text-[#022B30]">92% of consumers</span> trust recommendations from people they know over all forms of advertising (Nielsen)
                  </p>
                </div>
              </div>

              {/* Stat 5 - Retention Rate */}
              <div className="group relative rounded-3xl border border-[#FCE5F1] bg-white/98 backdrop-blur-xl p-8 hover:scale-105 hover:shadow-[0_35px_90px_rgba(112,20,62,0.15)] transition-all duration-500">
                <div className="absolute -top-4 -right-4 h-16 w-16 rounded-2xl bg-[#FFE8F3] flex items-center justify-center shadow-2xl shadow-[#F3C8DC] rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <Gift className="h-8 w-8 text-[#B73471]" />
                </div>
                <div className="space-y-3">
                  <p className="text-6xl font-black text-[#00505B]">
                    37%
                  </p>
                  <p className="text-sm font-black text-[#B73471] uppercase tracking-wide">Better Retention</p>
                  <p className="text-base text-[#3B5F65] leading-relaxed font-medium">
                    Referred customers have <span className="font-bold text-[#022B30]">37% higher retention</span> rates than other acquisition channels (Deloitte)
                  </p>
                </div>
              </div>

              {/* Stat 6 - Revenue Growth */}
              <div className="group relative rounded-3xl border border-[#DDEFFC] bg-white/98 backdrop-blur-xl p-8 hover:scale-105 hover:shadow-[0_35px_90px_rgba(6,73,108,0.15)] transition-all duration-500">
                <div className="absolute -top-4 -right-4 h-16 w-16 rounded-2xl bg-[#E2F2FD] flex items-center justify-center shadow-2xl shadow-[#BFDFF6] rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <TrendingUp className="h-8 w-8 text-[#0A7BA2]" />
                </div>
                <div className="space-y-3">
                  <p className="text-6xl font-black text-[#00505B]">
                    86%
                  </p>
                  <p className="text-sm font-black text-[#0A7BA2] uppercase tracking-wide">Revenue Impact</p>
                  <p className="text-base text-[#3B5F65] leading-relaxed font-medium">
                    Businesses with referral programs see <span className="font-bold text-[#022B30]">86% revenue growth</span> in 2 years vs. 16% without (Texas Tech)
                  </p>
                </div>
              </div>

            </div>

            {/* Growth Hacking Value Proposition */}
            <div className="max-w-6xl mx-auto px-4">
              <div className="relative rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-10 sm:p-12 shadow-2xl overflow-hidden border border-white/20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.15),transparent_60%),radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.12),transparent_60%)]" />

                <div className="relative z-10 space-y-8">
                  <div className="text-center space-y-4">
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
                      Your Customers Are Your Best Sales Team
                    </h3>
                    <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
                      Instead of pouring budget into ads that get ignored, activate the people who already love your brand
                    </p>
                  </div>

                  {/* Comparison Grid */}
                  <div className="grid md:grid-cols-2 gap-6 mt-10">
                    {/* Traditional Methods */}
                    <div className="rounded-2xl bg-[#032730] p-6 border border-[#0C444E] text-white">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center">
                          <span className="text-2xl">❌</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold mb-1">Traditional Marketing</h4>
                          <p className="text-sm text-white/70">High cost, low trust, diminishing returns</p>
                        </div>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2 text-white/70">
                          <span className="mt-0.5 text-[#FF8A80]">•</span>
                          <span className="text-sm">Facebook/Instagram ads: <span className="font-bold">$200-500 CAC</span></span>
                        </li>
                        <li className="flex items-start gap-2 text-white/70">
                          <span className="mt-0.5 text-[#FF8A80]">•</span>
                          <span className="text-sm">Google Ads: <span className="font-bold">$150-400 CAC</span> + ongoing spend</span>
                        </li>
                        <li className="flex items-start gap-2 text-white/70">
                          <span className="mt-0.5 text-[#FF8A80]">•</span>
                          <span className="text-sm">Sales team: <span className="font-bold">$60K+ per rep</span> + commission + training</span>
                        </li>
                        <li className="flex items-start gap-2 text-white/70">
                          <span className="mt-0.5 text-[#FF8A80]">•</span>
                          <span className="text-sm">Cold outreach: <span className="font-bold">1-3% response rate</span>, low trust</span>
                        </li>
                        <li className="flex items-start gap-2 text-white/70">
                          <span className="mt-0.5 text-[#FF8A80]">•</span>
                          <span className="text-sm">Ad costs rising <span className="font-bold">30% year-over-year</span></span>
                        </li>
                      </ul>
                    </div>

                    {/* Referral Programs */}
                    <div className="rounded-2xl bg-[#E6FBFE] p-6 border border-[#C6F1F8] text-[#024B56]">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="h-10 w-10 rounded-lg bg-white/70 flex items-center justify-center">
                          <span className="text-2xl text-[#0A836F]">✅</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold mb-1">Referral Marketing</h4>
                          <p className="text-sm text-[#4A6A70]">Low cost, high trust, compounding growth</p>
                        </div>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2 text-[#3F5E63]">
                          <span className="text-[#0A836F] mt-0.5">•</span>
                          <span className="text-sm">Customer referrals: <span className="font-bold text-[#024B56]">$15-30 CAC</span> (16x cheaper)</span>
                        </li>
                        <li className="flex items-start gap-2 text-[#3F5E63]">
                          <span className="text-[#0A836F] mt-0.5">•</span>
                          <span className="text-sm">Existing customers = free sales force: <span className="font-bold text-[#024B56]">$0 payroll</span></span>
                        </li>
                        <li className="flex items-start gap-2 text-[#3F5E63]">
                          <span className="text-[#0A836F] mt-0.5">•</span>
                          <span className="text-sm">Warm introductions: <span className="font-bold text-[#024B56]">30% conversion rate</span> (4x higher)</span>
                        </li>
                        <li className="flex items-start gap-2 text-[#3F5E63]">
                          <span className="text-[#0A836F] mt-0.5">•</span>
                          <span className="text-sm">Compounding network effects: <span className="font-bold text-[#024B56]">Each customer recruits 2-3 more</span></span>
                        </li>
                        <li className="flex items-start gap-2 text-[#3F5E63]">
                          <span className="text-[#0A836F] mt-0.5">•</span>
                          <span className="text-sm">Cost stays flat while growth accelerates</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Bottom CTA */}
                  <div className="mt-10 text-center">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <Link
                        href="/dashboard-guest"
                        className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-slate-900 shadow-2xl shadow-white/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-white/50"
                      >
                        View Demo Dashboard
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Link>
                      <Link
                        href="/r/demo-referral"
                        className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/20"
                      >
                        View Demo Referral
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        <section className="rounded-3xl border border-[#CFEFF5] bg-white/95 shadow-[0_25px_80px_rgba(2,52,59,0.08)]">
          <div className="flex flex-col gap-6 rounded-3xl p-8 sm:p-10 text-[#024B56] md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-wider text-[#00838F] mb-2">
                Ready to grow?
              </p>
              <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold mb-3 tracking-tight">
                Launch your referral program in under 5 minutes
              </h3>
              <p className="text-sm sm:text-base text-[#4A6A70] font-medium leading-relaxed">
                Import your customers, set your reward, and go. Pepform handles everything else—tracking, notifications, and rewarding your ambassadors automatically.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:shrink-0">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#00838F] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#A0DBE4]/70 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl"
              >
                Register Now <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="rounded-xl bg-[#F1FDFF] p-6 border border-[#C8EFF5]">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#3F5E63]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#0A836F]" />
              <span className="font-medium text-[#024B56]">GDPR Compliant</span>
            </div>
            <div className="h-4 w-px bg-[#B7DDE4]" />
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#0A7BA2]" />
              <span className="font-medium text-[#024B56]">256-bit SSL</span>
            </div>
            <div className="h-4 w-px bg-[#B7DDE4]" />
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#7A4AE0]" />
              <span className="font-medium text-[#024B56]">99.9% Uptime</span>
            </div>
            <div className="h-4 w-px bg-[#B7DDE4]" />
            <Link href="/security" className="flex items-center gap-2 text-[#00838F] hover:text-[#005C66] transition">
              <ShieldCheck className="h-4 w-4 text-[#00838F]" />
              <span className="font-medium">View security →</span>
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}
