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
              Here's exactly how Pepform turns your happy customers into a predictable, compounding referral engine
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


        {/* Market Opportunity - Premium Redesign */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-purple-50/30 to-white" />
          <div className="relative space-y-10 sm:space-y-12 py-12 sm:py-16">

            {/* Section Header */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                Why smart businesses automate{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  referrals now
                </span>
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto font-medium">
                The referral economy is exploding. Businesses that capture it win. Those that don't, lose market share.
              </p>
            </div>

            {/* Stats Grid - Premium */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
              {/* Stat 1 */}
              <div className="group relative bg-white rounded-2xl border-2 border-slate-200 p-6 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300">
                <div className="absolute -top-3 -right-3 h-12 w-12 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center shadow-lg">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div className="space-y-2">
                  <p className="text-5xl font-black text-slate-900">$6B</p>
                  <p className="text-sm font-bold text-purple-600 uppercase tracking-wide">Market Size</p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Global referral marketing growing at 24% annually
                  </p>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="group relative bg-white rounded-2xl border-2 border-slate-200 p-6 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-300">
                <div className="absolute -top-3 -right-3 h-12 w-12 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="space-y-2">
                  <p className="text-5xl font-black text-slate-900">83%</p>
                  <p className="text-sm font-bold text-emerald-600 uppercase tracking-wide">Trust Factor</p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Of consumers trust peer recommendations over ads
                  </p>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="group relative bg-white rounded-2xl border-2 border-slate-200 p-6 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300">
                <div className="absolute -top-3 -right-3 h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div className="space-y-2">
                  <p className="text-5xl font-black text-slate-900">5X</p>
                  <p className="text-sm font-bold text-blue-600 uppercase tracking-wide">Higher LTV</p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Referred customers have 5x lifetime value vs. others
                  </p>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="group relative bg-white rounded-2xl border-2 border-slate-200 p-6 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-100/50 transition-all duration-300">
                <div className="absolute -top-3 -right-3 h-12 w-12 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center shadow-lg">
                  <Gift className="h-6 w-6 text-white" />
                </div>
                <div className="space-y-2">
                  <p className="text-5xl font-black text-slate-900">92%</p>
                  <p className="text-sm font-bold text-amber-600 uppercase tracking-wide">Higher ROI</p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Of businesses report referrals as top ROI channel
                  </p>
                </div>
              </div>
            </div>

            {/* Value Proposition Box */}
            <div className="max-w-4xl mx-auto">
              <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8 sm:p-10 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.2),transparent_50%)]" />
                <div className="relative z-10 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-purple-300" />
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
                        The opportunity is massive. The execution is broken.
                      </h3>
                      <p className="text-lg text-purple-100 leading-relaxed mb-4">
                        Service businesses know referrals drive their best customers—higher conversion rates, lower acquisition costs, better retention. Yet 87% still track referrals manually through spreadsheets, DMs, and memory.
                      </p>
                      <p className="text-lg text-purple-100 leading-relaxed">
                        <span className="font-bold text-white">The result?</span> Lost revenue, missed opportunities, and frustrated customers who never get rewarded. Pepform automates the entire lifecycle: activation, tracking, rewards, and re-engagement—turning referrals from a manual process into a predictable growth engine.
                      </p>
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
                Sign in <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/r/demo-referral"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-900 shadow-lg shadow-slate-200/50 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-xl"
              >
                View demo link
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
