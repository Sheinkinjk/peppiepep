/* eslint-disable react/no-unescaped-entities */
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
    <div className="aurora relative min-h-screen overflow-hidden bg-gradient-to-b from-purple-50 via-white to-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(124,58,237,0.08),transparent_32%),radial-gradient(circle_at_90%_10%,rgba(236,72,153,0.1),transparent_35%)]" />

      <main className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-24 pt-8 md:px-10 lg:px-16">

        {/* Hero Section */}
        <div className="mx-auto max-w-4xl text-center space-y-8 py-12 sm:py-16 sm:space-y-10">
          <div className="space-y-6">
            <h1 className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl xl:text-7xl">
              Turn happy customers into your{" "}
              <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                growth network
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl lg:text-2xl px-4 font-medium">
              Launch a referral program that plugs into your sales and marketing strategies
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 px-4">
            <Link
              href="/dashboard-guest"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border-2 border-purple-600/80 bg-gradient-to-b from-white to-purple-50/50 px-8 py-4 text-base font-bold text-purple-700 shadow-xl shadow-purple-200/60 ring-1 ring-purple-100 transition-all duration-300 hover:-translate-y-1 hover:border-purple-600 hover:shadow-2xl hover:shadow-purple-300/70"
            >
              Try demo dashboard
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/login"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-slate-800 to-slate-900 px-8 py-4 text-base font-bold text-white shadow-xl shadow-slate-900/30 ring-1 ring-slate-700/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/50"
            >
              Get started
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* How It Works Section - Premium Redesign */}
        <section className="space-y-12 sm:space-y-16 relative">
          {/* Section Header */}
          <div className="text-center space-y-4 px-4">
            <h2 className="text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl tracking-tight">
              How Pepform creates{" "}
              <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Micro Influencers
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-medium">
              How Pepform turns your happy customers into a predictable, compounding referral engine
            </p>
          </div>

          {/* Premium Step Cards */}
          <div className="relative max-w-5xl mx-auto">
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="group relative bg-white rounded-2xl border border-slate-200 p-8 hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-100/50 transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center shadow-lg shadow-purple-200">
                      <Upload className="h-7 w-7 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                        Import & Activate
                      </h3>
                      <span className="text-xs font-black text-purple-600 bg-purple-50 px-3 py-1 rounded-full">STEP 1</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      Upload your customer list via CSV or Excel. Every customer instantly gets their own unique referral link and becomes an active micro-influencer for your brand.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-3 py-1.5 rounded-lg">One-click upload</span>
                      <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-3 py-1.5 rounded-lg">Auto-generate links</span>
                      <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-3 py-1.5 rounded-lg">2-minute setup</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="group relative bg-white rounded-2xl border border-slate-200 p-8 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-200">
                      <MessageSquare className="h-7 w-7 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                        Launch Campaigns
                      </h3>
                      <span className="text-xs font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full">STEP 2</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      Send personalized referral invitations via SMS or email. Customers receive their unique link with your custom offer, ready to share with their network.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg">Custom templates</span>
                      <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg">SMS & Email</span>
                      <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg">Scheduled sending</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="group relative bg-white rounded-2xl border border-slate-200 p-8 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-100/50 transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-200">
                      <TrendingUp className="h-7 w-7 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                        Track Real-Time
                      </h3>
                      <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">STEP 3</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      Watch your referral network expand with live tracking. Identify top performers, see conversion rates, and understand which micro-influencers drive the most value.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg">Live dashboard</span>
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg">Leaderboards</span>
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg">Analytics</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="group relative bg-white rounded-2xl border border-slate-200 p-8 hover:border-amber-300 hover:shadow-2xl hover:shadow-amber-100/50 transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-200">
                      <Gift className="h-7 w-7 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                        Automate Rewards
                      </h3>
                      <span className="text-xs font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-full">STEP 4</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      Credits automatically flow to influencers when referrals convert. Instant notifications encourage more sharing. The flywheel accelerates with zero manual work.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg">Instant credits</span>
                      <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg">Auto notifications</span>
                      <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg">Self-serve</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results CTA */}
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-10 sm:p-12 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.15),transparent_50%)]" />
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
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(168,85,247,0.15),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(236,72,153,0.12),transparent_50%)]" />

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
              <div className="group relative bg-gradient-to-br from-white/95 to-purple-50/95 backdrop-blur-xl rounded-3xl border border-white/20 p-8 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500">
                <div className="absolute -top-4 -right-4 h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-2xl shadow-emerald-500/40 rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-3">
                  <p className="text-6xl font-black bg-gradient-to-br from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
                    16X
                  </p>
                  <p className="text-sm font-black text-emerald-600 uppercase tracking-wide">Lower CAC</p>
                  <p className="text-base text-slate-700 leading-relaxed font-medium">
                    Referred customers cost <span className="font-bold text-slate-900">$24 to acquire</span> vs. <span className="font-bold text-slate-900">$385 for paid ads</span> (2024 Harvard Business Review)
                  </p>
                </div>
              </div>

              {/* Stat 2 - Conversion Rate */}
              <div className="group relative bg-gradient-to-br from-white/95 to-blue-50/95 backdrop-blur-xl rounded-3xl border border-white/20 p-8 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-500">
                <div className="absolute -top-4 -right-4 h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-2xl shadow-blue-500/40 rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-3">
                  <p className="text-6xl font-black bg-gradient-to-br from-blue-600 to-blue-700 bg-clip-text text-transparent">
                    4X
                  </p>
                  <p className="text-sm font-black text-blue-600 uppercase tracking-wide">Conversion Rate</p>
                  <p className="text-base text-slate-700 leading-relaxed font-medium">
                    Referrals convert at <span className="font-bold text-slate-900">30%</span> compared to <span className="font-bold text-slate-900">7.4%</span> for cold traffic (Nielsen Study)
                  </p>
                </div>
              </div>

              {/* Stat 3 - Lifetime Value */}
              <div className="group relative bg-gradient-to-br from-white/95 to-purple-50/95 backdrop-blur-xl rounded-3xl border border-white/20 p-8 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500">
                <div className="absolute -top-4 -right-4 h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-purple-500/40 rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-3">
                  <p className="text-6xl font-black bg-gradient-to-br from-purple-600 to-purple-700 bg-clip-text text-transparent">
                    25%
                  </p>
                  <p className="text-sm font-black text-purple-600 uppercase tracking-wide">Higher LTV</p>
                  <p className="text-base text-slate-700 leading-relaxed font-medium">
                    Referred customers have <span className="font-bold text-slate-900">25% higher profit margins</span> and stay 37% longer (Wharton School)
                  </p>
                </div>
              </div>

              {/* Stat 4 - Trust Factor */}
              <div className="group relative bg-gradient-to-br from-white/95 to-amber-50/95 backdrop-blur-xl rounded-3xl border border-white/20 p-8 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-500">
                <div className="absolute -top-4 -right-4 h-16 w-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-2xl shadow-amber-500/40 rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <ShieldCheck className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-3">
                  <p className="text-6xl font-black bg-gradient-to-br from-amber-600 to-amber-700 bg-clip-text text-transparent">
                    92%
                  </p>
                  <p className="text-sm font-black text-amber-600 uppercase tracking-wide">Trust Referrals</p>
                  <p className="text-base text-slate-700 leading-relaxed font-medium">
                    <span className="font-bold text-slate-900">92% of consumers</span> trust recommendations from people they know over all forms of advertising (Nielsen)
                  </p>
                </div>
              </div>

              {/* Stat 5 - Retention Rate */}
              <div className="group relative bg-gradient-to-br from-white/95 to-pink-50/95 backdrop-blur-xl rounded-3xl border border-white/20 p-8 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/30 transition-all duration-500">
                <div className="absolute -top-4 -right-4 h-16 w-16 rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center shadow-2xl shadow-pink-500/40 rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <Gift className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-3">
                  <p className="text-6xl font-black bg-gradient-to-br from-pink-600 to-pink-700 bg-clip-text text-transparent">
                    37%
                  </p>
                  <p className="text-sm font-black text-pink-600 uppercase tracking-wide">Better Retention</p>
                  <p className="text-base text-slate-700 leading-relaxed font-medium">
                    Referred customers have <span className="font-bold text-slate-900">37% higher retention</span> rates than other acquisition channels (Deloitte)
                  </p>
                </div>
              </div>

              {/* Stat 6 - Revenue Growth */}
              <div className="group relative bg-gradient-to-br from-white/95 to-indigo-50/95 backdrop-blur-xl rounded-3xl border border-white/20 p-8 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-500">
                <div className="absolute -top-4 -right-4 h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-2xl shadow-indigo-500/40 rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-3">
                  <p className="text-6xl font-black bg-gradient-to-br from-indigo-600 to-indigo-700 bg-clip-text text-transparent">
                    86%
                  </p>
                  <p className="text-sm font-black text-indigo-600 uppercase tracking-wide">Revenue Impact</p>
                  <p className="text-base text-slate-700 leading-relaxed font-medium">
                    Businesses with referral programs see <span className="font-bold text-slate-900">86% revenue growth</span> in 2 years vs. 16% without (Texas Tech)
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
                    <div className="rounded-2xl bg-slate-900/50 backdrop-blur p-6 border border-slate-700/50">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="h-10 w-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                          <span className="text-2xl">❌</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white mb-1">Traditional Marketing</h4>
                          <p className="text-sm text-slate-400">High cost, low trust, diminishing returns</p>
                        </div>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2 text-slate-300">
                          <span className="text-red-400 mt-0.5">•</span>
                          <span className="text-sm">Facebook/Instagram ads: <span className="font-bold text-white">$200-500 CAC</span></span>
                        </li>
                        <li className="flex items-start gap-2 text-slate-300">
                          <span className="text-red-400 mt-0.5">•</span>
                          <span className="text-sm">Google Ads: <span className="font-bold text-white">$150-400 CAC</span> + ongoing spend</span>
                        </li>
                        <li className="flex items-start gap-2 text-slate-300">
                          <span className="text-red-400 mt-0.5">•</span>
                          <span className="text-sm">Sales team: <span className="font-bold text-white">$60K+ per rep</span> + commission + training</span>
                        </li>
                        <li className="flex items-start gap-2 text-slate-300">
                          <span className="text-red-400 mt-0.5">•</span>
                          <span className="text-sm">Cold outreach: <span className="font-bold text-white">1-3% response rate</span>, low trust</span>
                        </li>
                        <li className="flex items-start gap-2 text-slate-300">
                          <span className="text-red-400 mt-0.5">•</span>
                          <span className="text-sm">Ad costs rising <span className="font-bold text-white">30% year-over-year</span></span>
                        </li>
                      </ul>
                    </div>

                    {/* Referral Programs */}
                    <div className="rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 backdrop-blur p-6 border border-emerald-400/30">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="h-10 w-10 rounded-lg bg-emerald-500/30 flex items-center justify-center">
                          <span className="text-2xl">✅</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white mb-1">Referral Marketing</h4>
                          <p className="text-sm text-emerald-200">Low cost, high trust, compounding growth</p>
                        </div>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2 text-purple-100">
                          <span className="text-emerald-400 mt-0.5">•</span>
                          <span className="text-sm">Customer referrals: <span className="font-bold text-white">$15-30 CAC</span> (16x cheaper)</span>
                        </li>
                        <li className="flex items-start gap-2 text-purple-100">
                          <span className="text-emerald-400 mt-0.5">•</span>
                          <span className="text-sm">Existing customers = free sales force: <span className="font-bold text-white">$0 payroll</span></span>
                        </li>
                        <li className="flex items-start gap-2 text-purple-100">
                          <span className="text-emerald-400 mt-0.5">•</span>
                          <span className="text-sm">Warm introductions: <span className="font-bold text-white">30% conversion rate</span> (4x higher)</span>
                        </li>
                        <li className="flex items-start gap-2 text-purple-100">
                          <span className="text-emerald-400 mt-0.5">•</span>
                          <span className="text-sm">Compounding network effects: <span className="font-bold text-white">Each customer recruits 2-3 more</span></span>
                        </li>
                        <li className="flex items-start gap-2 text-purple-100">
                          <span className="text-emerald-400 mt-0.5">•</span>
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

        <section className="rounded-3xl bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 p-[2px] shadow-2xl shadow-purple-500/30">
          <div className="flex flex-col gap-6 rounded-3xl bg-gradient-to-b from-white to-slate-50 p-8 sm:p-10 text-slate-900 md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-2">
                Ready to grow?
              </p>
              <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold mb-3 tracking-tight">
                Launch your referral program in under 5 minutes
              </h3>
              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                Import your customers, set your reward, and go. Pepform handles everything else—tracking, notifications, and rewarding your ambassadors automatically.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:shrink-0">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-slate-800 to-slate-900 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-slate-900/30 ring-1 ring-slate-700/50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-slate-900/40"
              >
                Register Now <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="rounded-xl bg-slate-50 p-6 border border-slate-100">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-green-600" />
              <span className="font-medium text-slate-700">GDPR Compliant</span>
            </div>
            <div className="h-4 w-px bg-slate-300" />
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-slate-700">256-bit SSL</span>
            </div>
            <div className="h-4 w-px bg-slate-300" />
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-purple-600" />
              <span className="font-medium text-slate-700">99.9% Uptime</span>
            </div>
            <div className="h-4 w-px bg-slate-300" />
            <Link href="/security" className="flex items-center gap-2 hover:text-slate-900 transition">
              <ShieldCheck className="h-4 w-4 text-slate-400" />
              <span className="font-medium">View security →</span>
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}
