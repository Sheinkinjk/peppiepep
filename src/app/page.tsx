import { ArrowRight, Gift, Sparkles, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const referralPillars = [
  {
    number: "01",
    title: "Introductions that skip cold outreach",
    copy:
      "Brand evangelists text concierge-quality links that do the heavy lifting. Most prospects arrive already primed with context, social proof, and urgency.",
    highlight: "Close deals in 1–3 touches",
    highlightColor: "text-emerald-600",
    chipBg: "bg-indigo-50 text-indigo-600",
  },
  {
    number: "02",
    title: "VIP incentives that feel on-brand",
    copy:
      "Refer Labs issues wallet cards, QR lounges, and luxury-grade perks automatically so the experience feels bespoke—never like a generic promo code blast.",
    highlight: "Bespoke perks auto-issued",
    highlightColor: "text-blue-600",
    chipBg: "bg-emerald-50 text-emerald-600",
  },
  {
    number: "03",
    title: "CRM imports become referral fuel",
    copy:
      "Upload spreadsheets or sync a CRM export and Refer Labs immediately assigns links, discount words, and share kits for every contact without manual ops.",
    highlight: "Millions of contacts supported",
    highlightColor: "text-slate-500",
    chipBg: "bg-sky-50 text-sky-600",
  },
  {
    number: "04",
    title: "Automated concierge follow-ups",
    copy:
      "SMS + email journeys keep ambassadors nudged at the perfect cadence with AI-drafted talking points, brand gradients, and instant proofs of reward.",
    highlight: "15+ touchpoints handled",
    highlightColor: "text-indigo-600",
    chipBg: "bg-rose-50 text-rose-600",
  },
  {
    number: "05",
    title: "Payouts & compliance in one ledger",
    copy:
      "Every referral event syncs to a live ledger so finance teams see status, clawbacks, and pending credits. Approvals take minutes, not days.",
    highlight: "Finance-ready audit trails",
    highlightColor: "text-emerald-600",
    chipBg: "bg-amber-50 text-amber-600",
  },
  {
    number: "06",
    title: "Intelligence on what to scale next",
    copy:
      "Track who referred who, which assets drove highest AOV, and when advocates go quiet—so you know exactly where to double down for your next drop.",
    highlight: "Signals, not guesswork",
    highlightColor: "text-slate-500",
    chipBg: "bg-purple-50 text-purple-600",
  },
];

const referralNumbers = [
  {
    value: "70%",
    title: "Lower Acquisition Costs",
    copy:
      "Referral-driven customers require significantly less marketing spend because trust is already established.",
    gradient: "from-white/95 to-purple-50/95",
    accentIcon: TrendingUp,
    accentBg: "from-emerald-500 to-emerald-600",
  },
  {
    value: "3×",
    title: "Higher Conversion Rates",
    copy:
      "Referred leads come pre-qualified, making them three times more likely to convert than cold traffic.",
    gradient: "from-white/95 to-blue-50/95",
    accentIcon: Users,
    accentBg: "from-blue-500 to-blue-600",
  },
  {
    value: "2×",
    title: "Better Long-Term Retention",
    copy:
      "Customers acquired through referrals stay longer and become more profitable over time.",
    gradient: "from-white/95 to-pink-50/95",
    accentIcon: Gift,
    accentBg: "from-pink-500 to-pink-600",
  },
  {
    value: "82%",
    title: "Customers Willing to Refer",
    copy:
      "Most customers are happy to recommend a brand they like — they just need an easy way to do it.",
    gradient: "from-white/95 to-amber-50/95",
    accentIcon: Users,
    accentBg: "from-amber-500 to-amber-600",
  },
  {
    value: "35%",
    title: "Faster Revenue Growth",
    copy:
      "Businesses that use referral programs grow significantly faster than those relying only on paid ads.",
    gradient: "from-white/95 to-purple-50/95",
    accentIcon: Sparkles,
    accentBg: "from-purple-500 to-purple-600",
  },
  {
    value: "5 Minutes",
    title: "To Launch With Pepform",
    copy:
      "No coding. No complexity. Turn on your referral program and let your customers become your growth engine.",
    gradient: "from-white/95 to-indigo-50/95",
    accentIcon: TrendingUp,
    accentBg: "from-indigo-500 to-indigo-600",
  },
];


export default function Home() {
  return (
    <div className="aurora tiffany-hero relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(0,131,143,0.12),transparent_32%),radial-gradient(circle_at_90%_10%,rgba(77,208,225,0.18),transparent_35%)]" />

      <main className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-24 pt-8 md:px-10 lg:px-16">

        {/* Hero Section */}
        <div className="mx-auto max-w-4xl text-center space-y-8 py-12 sm:py-16 sm:space-y-10">
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-[3.35rem] lg:text-[3.75rem] xl:text-[3.85rem]">
              <span className="block text-balance text-[#00343a]">We help launch successful</span>
              <span className="block text-[#0a727f] drop-shadow-[0_6px_20px_rgba(9,81,93,0.25)]">
                referral programs
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-700 leading-relaxed max-w-3xl mx-auto font-semibold">
              Activate a growth network that plugs into your sales and marketing to generate new business.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 pt-6 px-4">
            <Link
              href="/login"
              className={cn(buttonVariants({ variant: "cta" }), "group w-full sm:w-auto text-lg font-bold px-8 py-4 shadow-xl shadow-teal-300/50 hover:shadow-2xl hover:shadow-teal-400/60 hover:scale-105 transition-all duration-300")}
            >
              Start Getting Referrals
              <ArrowRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* How It Works Section - Premium Redesign */}
        <section className="space-y-12 sm:space-y-16 relative">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 px-6 py-10 shadow-xl sm:px-10 sm:py-12">
            <div className="pointer-events-none absolute inset-x-16 -top-24 h-64 bg-gradient-to-br from-indigo-500/15 via-sky-500/10 to-emerald-400/10 blur-3xl" />
            <div className="relative z-10 space-y-10">
              <div className="text-left sm:text-center">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Why a referral program is your best resource for growth hacking
                </h2>
                <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-0 sm:mx-auto">
                  Your next best customers are already in your existing customers’ network. Pepform
                  helps you turn that network into a structured, trackable growth engine that feels
                  natural for them and powerful for you.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {referralPillars.map((pillar) => (
                  <div
                    key={pillar.number}
                    className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
                  >
                    <div>
                      <div
                        className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold mb-3 ${pillar.chipBg}`}
                      >
                        {pillar.number}
                      </div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        {pillar.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600">
                        {pillar.copy}
                      </p>
                    </div>
                    <p className={`mt-3 text-xs font-medium uppercase tracking-wide ${pillar.highlightColor}`}>
                      {pillar.highlight}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    Ready to make referrals your highest-ROI channel?
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Plug Pepform into your existing sales and marketing stack and start activating the
                    customers you already have.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/login"
                    className={cn(buttonVariants({ variant: "default", size: "default" }), "min-w-[220px]")}
                  >
                    Start Getting Referrals
                    <ArrowRight className="h-4 w-4" />
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
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white drop-shadow-lg">
                Referral Programs By The Numbers
              </h2>
              <p className="text-xl sm:text-2xl text-purple-100 max-w-4xl mx-auto font-medium leading-relaxed">
                Turn your existing customers into a high-performing sales team—without the overhead, training, or payroll costs
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-4">
              {referralNumbers.map((stat) => (
                <div
                  key={stat.title}
                  className={`group relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br ${stat.gradient} backdrop-blur p-8 hover:scale-105 hover:shadow-2xl hover:shadow-teal-400/20 transition-all duration-500`}
                >
                  <div
                    className={`absolute -top-4 -right-4 h-16 w-16 rounded-2xl bg-gradient-to-br ${stat.accentBg} flex items-center justify-center shadow-2xl shadow-black/30 rotate-12 group-hover:rotate-0 transition-transform duration-500`}
                  >
                    <stat.accentIcon className="h-8 w-8 text-white" />
                  </div>
                  <div className="relative space-y-3">
                    <p className="text-6xl font-black text-[#024b56]">{stat.value}</p>
                    <p className="text-sm font-black uppercase tracking-wide text-[#024b56]">
                      {stat.title}
                    </p>
                    <p className="text-base text-slate-700 leading-relaxed font-medium">
                      {stat.copy}
                    </p>
                  </div>
                </div>
              ))}
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
                      Instead of pouring budget into ads that get ignored, activate the people who already love your brand—this is{" "}
                      <span className="text-[#5ce1e6] font-black tracking-tight drop-shadow-[0_0_18px_rgba(92,225,230,0.35)]">growth hacking</span>{" "}
                      powered by trust and proof from real customers.
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
                        href="/login"
                        className={cn(buttonVariants({ variant: "cta" }), "group w-full sm:w-auto text-base font-bold")}
                      >
                        Launch my dashboard
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Link>
                      <Link
                        href="/referral"
                        className={cn(buttonVariants({ variant: "outline" }), "group w-full sm:w-auto text-base font-bold")}
                      >
                        Preview referral landing
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ROI Calculator CTA */}
        <section className="rounded-[32px] border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50 shadow-xl shadow-purple-200/50 px-8 py-10 sm:px-12 sm:py-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3 max-w-2xl">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900">
                Calculate your referral program ROI in 4 steps
              </h3>
              <p className="text-base text-slate-600 leading-relaxed font-medium">
                Get AI-powered revenue and growth forecasts and discover the perfect reward structure for your business.
                No signup required.
              </p>
            </div>
            <Link
              href="/roi-calculator"
              className={cn(buttonVariants({ variant: "cta" }), "group self-start md:self-center text-base font-bold pointer-events-auto cursor-pointer")}
            >
              Calculate ROI <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </section>


      </main>
    </div>
  );
}
