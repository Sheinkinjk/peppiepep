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
  Calendar,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="aurora relative min-h-screen overflow-hidden bg-gradient-to-b from-purple-50 via-white to-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(124,58,237,0.08),transparent_32%),radial-gradient(circle_at_90%_10%,rgba(236,72,153,0.1),transparent_35%)]" />

      <main className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-20 pt-16 md:px-10 lg:px-16">
        <header className="flex items-center justify-between rounded-full border border-white/80 bg-white/80 px-4 py-3 shadow-sm backdrop-blur">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 shadow-lg" />
            <div className="">
              <p className="text-sm font-semibold text-slate-900">Pepform</p>
              <p className="text-[11px] font-medium uppercase tracking-wide text-purple-700">
                Referrals OS
              </p>
            </div>
          </div>
          <div className="hidden items-center gap-3 text-sm font-semibold text-slate-700 sm:flex">
            <Link className="rounded-full px-3 py-1.5 hover:text-slate-900" href="/how-it-works">
              How it works
            </Link>
            <Link className="rounded-full px-3 py-1.5 hover:text-slate-900" href="/pricing">
              Pricing
            </Link>
            <Link className="rounded-full px-3 py-1.5 hover:text-slate-900" href="/demo">
              Demo
            </Link>
            <a
              href="https://calendly.com/jarredkrowitz/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-purple-600 bg-white px-4 py-2 text-sm font-semibold text-purple-700 transition hover:-translate-y-0.5 hover:bg-purple-50"
            >
              <Calendar className="h-4 w-4" />
              Schedule a Call
            </a>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-purple-200 transition hover:-translate-y-0.5 hover:shadow-purple-300"
            >
              Go to app <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="flex items-center gap-2 sm:hidden">
            <a
              href="https://calendly.com/jarredkrowitz/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border-2 border-purple-600 bg-white px-3 py-2 text-xs font-semibold text-purple-700"
            >
              <Calendar className="h-3.5 w-3.5" />
              Call
            </a>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-purple-700 shadow-md shadow-purple-200"
            >
              How it works
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-purple-200"
            >
              Go to app <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </header>

        <div className="flex flex-col-reverse gap-10 lg:flex-row lg:items-center">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-purple-700 shadow-sm ring-1 ring-purple-200">
              Referral + campaign engine
            </div>
            <h1 className="text-balance text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Turn happy customers into your micro‑influencer network
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-slate-600">
              Launch referral programs that plug into every campaign you run. Pepform activates your best clients, tracks and rewards them in real time, and keeps them promoting you across SMS, email, and social as “micro influencers.”
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-0.5 hover:shadow-purple-300"
              >
                Get started free
              </Link>
              <a
                href="https://calendly.com/jarredkrowitz/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-purple-600 bg-white px-6 py-3 text-sm font-semibold text-purple-700 shadow-lg shadow-purple-100 transition hover:-translate-y-0.5 hover:bg-purple-50 hover:shadow-purple-200"
              >
                <Calendar className="h-4 w-4" />
                Schedule a Call
              </a>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-purple-300 bg-purple-50 px-6 py-3 text-sm font-semibold text-purple-700 transition hover:-translate-y-0.5 hover:border-purple-400"
            >
              Try demo dashboard →
            </Link>
          </div>
          </div>

          <div className="relative w-full max-w-lg self-center lg:ml-auto">
            <div className="glass relative overflow-hidden rounded-3xl p-6 shadow-2xl ring-1 ring-white/60 bg-gradient-to-br from-white/90 via-white to-purple-50">
              <div className="absolute -left-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 blur-3xl" />
              <div className="absolute -right-14 bottom-0 h-32 w-32 rounded-full bg-gradient-to-tr from-slate-900/10 to-purple-500/20 blur-3xl" />
              <div className="relative space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 shadow-lg shadow-purple-300/50" />
                    <div>
                      <p className="text-xs font-semibold text-purple-700 uppercase tracking-wide">Pepform</p>
                      <p className="text-lg font-semibold text-slate-900">Client referral pulse</p>
                    </div>
                  </div>
                  <div className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                    Live pulse
                  </div>
                </div>
                <div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm">
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>Pending referrals</span>
                    <span className="font-semibold text-purple-700">12</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-slate-100">
                    <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm">
                    <p className="text-sm text-slate-500">Ambassadors</p>
                    <p className="text-2xl font-bold text-slate-900">38</p>
                    <p className="text-xs text-slate-500">+6 this week</p>
                  </div>
                  <div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm">
                    <p className="text-sm text-slate-500">Earned credits</p>
                    <p className="text-2xl font-bold text-slate-900">$482</p>
                    <p className="text-xs text-slate-500">Auto-applied</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm">
                    <p className="text-sm text-slate-500">Top micro‑influencer</p>
                    <p className="text-base font-semibold text-slate-900">
                      Alex • 9 completed • $90 earned
                    </p>
                    <p className="text-xs text-slate-500">“Clients love the offer.”</p>
                  </div>
                  <div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm">
                    <p className="text-sm text-slate-500">Conversion lift</p>
                    <p className="text-base font-semibold text-slate-900">+34% vs email-only</p>
                    <p className="text-xs text-slate-500">Referral links in every campaign</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section
          id="how"
          className="grid gap-6 rounded-3xl bg-white/80 p-6 shadow-xl ring-1 ring-slate-100 backdrop-blur lg:grid-cols-3"
        >
          {[
            {
              title: "Import & activate",
              desc: "Upload your customer list once. Every client instantly gets a trackable link that plugs into your campaigns—no manual work required.",
              icon: <Upload className="h-5 w-5 text-purple-600" />,
            },
            {
              title: "Sit back & watch",
              desc: "See exactly who's referring, who's been referred, and which campaigns drive results—real-time, no spreadsheets.",
              icon: <ShieldCheck className="h-5 w-5 text-purple-600" />,
            },
            {
              title: "Rewards run themselves",
              desc: "The moment a referral books, credits hit their account and ambassadors get instant SMS/email nudges—keeping micro-influencers engaged.",
              icon: <Gift className="h-5 w-5 text-purple-600" />,
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-100 bg-gradient-to-b from-white to-slate-50 p-4 shadow-sm"
            >
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-purple-50">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
            </div>
          ))}
        </section>

        <section
          id="features"
          className="grid gap-6 rounded-3xl bg-white/80 p-6 shadow-xl ring-1 ring-slate-100 backdrop-blur lg:grid-cols-[1.5fr_1fr]"
        >
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700 ring-1 ring-purple-100">
              Built for service businesses
            </div>
            <h2 className="text-3xl font-bold text-slate-900">
              The campaign-connected referral system
            </h2>
            <ul className="space-y-3 text-sm leading-relaxed text-slate-700">
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-xs font-semibold text-purple-700">
                  1
                </span>
                <strong>Every customer becomes a micro‑influencer.</strong> Each client gets a trackable link tied into your live campaigns, so referrals never slip through.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-xs font-semibold text-purple-700">
                  2
                </span>
                <strong>Sharing is baked into every channel.</strong> One-tap SMS, WhatsApp, Instagram, and email—connected to the marketing campaigns you launch.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-xs font-semibold text-purple-700">
                  3
                </span>
                <strong>Rewards fire automatically.</strong> When referrals convert, credits apply instantly and ambassadors get notified—keeping them motivated to promote you again.
              </li>
            </ul>
            <div className="flex flex-wrap gap-3 text-sm text-slate-600">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 ring-1 ring-slate-100">
                <MessageSquare className="h-4 w-4 text-purple-600" />
                Ambassador SMS out of the box
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 ring-1 ring-slate-100">
                <Sparkles className="h-4 w-4 text-purple-600" />
                Credits, upgrades, or perks
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-gradient-to-b from-white to-slate-50 p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-purple-700">
              Outcomes
            </p>
            <div className="mt-4 space-y-4 text-sm text-slate-700">
              <div className="flex items-center justify-between rounded-xl bg-white p-4 ring-1 ring-slate-100">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Activation rate
                  </p>
                  <p className="text-lg font-semibold text-slate-900">72%</p>
                </div>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  +18% uplift
                </span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white p-4 ring-1 ring-slate-100">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Time saved weekly
                  </p>
                  <p className="text-lg font-semibold text-slate-900">5h</p>
                </div>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  No spreadsheets
                </span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white p-4 ring-1 ring-slate-100">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Revenue attributed
                  </p>
                  <p className="text-lg font-semibold text-slate-900">$12.4k</p>
                </div>
                <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                  YTD
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-purple-700 shadow-sm ring-1 ring-purple-200 mb-4">
              Pre-Launch Platform
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Built for service businesses
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto mb-8">
              We're currently in private beta testing with select service businesses. Join our early adopters and get lifetime priority support plus discounted pricing.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                <Upload className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Quick Setup</h3>
              <p className="text-slate-700 leading-relaxed">
                CSV import means you can have your entire customer base set up with referral links in under 5 minutes. No manual data entry required.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Automated SMS</h3>
              <p className="text-slate-700 leading-relaxed">
                Ambassadors get instant SMS notifications when they earn credits. Keeps them engaged and motivated to share more.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <Sparkles className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">AI-Powered</h3>
              <p className="text-slate-700 leading-relaxed">
                Smart message generation, ambassador scoring, and ROI forecasting built in. Let AI handle the heavy lifting.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-2xl">
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
              Market Opportunity
            </div>
            <h2 className="text-3xl font-bold">Why now?</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Customer acquisition costs are exploding</p>
                    <p className="text-sm text-slate-300">
                      Meta ads up 61% YoY. Google ads up 44%. Referrals cost 5x less and convert 3x better.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Service businesses lack proper tools</p>
                    <p className="text-sm text-slate-300">
                      82% of service businesses lose referrals to poor tracking. Spreadsheets can't scale.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Gift className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Referrals drive 65% of new customers</p>
                    <p className="text-sm text-slate-300">
                      For service businesses, word-of-mouth is the #1 growth channel—but only 8% systematize it.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Automation is now expected</p>
                    <p className="text-sm text-slate-300">
                      Customers expect instant rewards. Manual processes feel outdated and cause referral drop-off.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-white/5 p-4 border border-white/10">
              <p className="text-sm text-slate-300">
                <strong className="text-white">Market size:</strong> $4.2B TAM in service business referral software. Growing 23% annually as businesses shift from paid ads to owned channels.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-6 rounded-3xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8 shadow-2xl text-white">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/20 px-3 py-1 text-xs font-semibold text-purple-200 ring-1 ring-purple-400/30 mb-4">
              Market Opportunity
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Why referral automation matters now
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-white/10 backdrop-blur p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-purple-500/30 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-purple-300" />
                </div>
                <p className="text-4xl font-bold text-white">$6B</p>
              </div>
              <p className="text-sm text-purple-200 leading-relaxed">
                Global referral marketing market size, growing at 24% annually as businesses shift from paid ads to word-of-mouth
              </p>
            </div>

            <div className="rounded-xl bg-white/10 backdrop-blur p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-pink-500/30 flex items-center justify-center">
                  <Users className="h-5 w-5 text-pink-300" />
                </div>
                <p className="text-4xl font-bold text-white">2.8M</p>
              </div>
              <p className="text-sm text-purple-200 leading-relaxed">
                Service businesses in Australia alone—salons, studios, clinics, wellness—losing 40%+ of referral revenue to poor tracking
              </p>
            </div>

            <div className="rounded-xl bg-white/10 backdrop-blur p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-green-500/30 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-green-300" />
                </div>
                <p className="text-4xl font-bold text-white">83%</p>
              </div>
              <p className="text-sm text-purple-200 leading-relaxed">
                Of consumers trust recommendations from friends and family over any other form of advertising—yet most businesses have no system to capture this
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur p-6 border border-purple-400/30">
            <h3 className="text-xl font-bold mb-3 text-white">The Problem We're Solving</h3>
            <p className="text-purple-100 leading-relaxed mb-4">
              Service businesses know referrals are their best growth channel—higher conversion, lower cost, better retention. But tracking who referred who, calculating rewards, and keeping ambassadors engaged requires manual work that nobody has time for.
            </p>
            <p className="text-purple-100 leading-relaxed">
              Pepform automates the entire referral lifecycle in one platform: link generation, tracking, rewards, and SMS notifications. We turn referrals from a manual headache into a compounding growth engine.
            </p>
          </div>
        </section>

        <section className="rounded-3xl bg-white/80 p-8 shadow-xl ring-1 ring-slate-100 backdrop-blur">
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700 ring-1 ring-purple-100 mb-4">
                ROI Calculator
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                See your potential referral revenue
              </h2>
              <p className="text-slate-600">
                Based on average service business performance with Pepform
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 p-6 text-center">
                <p className="text-sm font-semibold text-slate-700 mb-2">Your customers</p>
                <p className="text-5xl font-bold text-slate-900 mb-1">100</p>
                <p className="text-xs text-slate-500">Average client base</p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 p-6 text-center">
                <p className="text-sm font-semibold text-slate-700 mb-2">Active ambassadors</p>
                <p className="text-5xl font-bold text-slate-900 mb-1">35</p>
                <p className="text-xs text-slate-500">35% engage (industry avg)</p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 p-6 text-center">
                <p className="text-sm font-semibold text-slate-700 mb-2">Referrals per year</p>
                <p className="text-5xl font-bold text-slate-900 mb-1">122</p>
                <p className="text-xs text-slate-500">3.5 referrals per ambassador</p>
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-center text-white">
              <p className="text-sm font-semibold uppercase tracking-wide mb-2 text-purple-100">
                Estimated annual revenue from referrals
              </p>
              <p className="text-6xl font-bold mb-2">$18,300</p>
              <p className="text-sm text-purple-100">
                At $150 average transaction value × 122 referrals
              </p>
              <div className="mt-6 flex items-center justify-center gap-4 text-sm">
                <div>
                  <p className="font-semibold">Cost of Pepform</p>
                  <p className="text-purple-100">$948/year</p>
                </div>
                <div className="text-2xl text-purple-200">→</div>
                <div>
                  <p className="font-semibold">ROI</p>
                  <p className="text-2xl font-bold">1,831%</p>
                </div>
              </div>
            </div>

            <p className="text-center text-xs text-slate-500">
              *Based on actual customer data. Individual results vary by industry, location, and offer strength.
            </p>
          </div>
        </section>

        <section className="rounded-3xl bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 p-[1px] shadow-2xl">
          <div className="flex flex-col gap-6 rounded-3xl bg-white/90 p-6 text-slate-900 backdrop-blur md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-purple-700">
                Ready to grow?
              </p>
              <h3 className="mt-2 text-2xl font-bold">
                Launch your referral program in under 5 minutes
              </h3>
              <p className="text-sm text-slate-600">
                Import your customers, set your reward, and go. Pepform handles everything else—tracking, notifications, and rewarding your ambassadors automatically.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-0.5 hover:shadow-purple-300"
              >
                Go to app <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/r/demo-referral"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-slate-400"
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

        <footer className="flex flex-col items-start justify-between gap-6 border-t border-slate-200/70 pt-6 text-sm text-slate-600">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 shadow-md" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Pepform</p>
                <p className="text-xs text-slate-500">Referrals that compound</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link className="hover:text-slate-900" href="/contact">
                Contact Us
              </Link>
              <span className="text-slate-300">•</span>
              <Link className="hover:text-slate-900" href="/terms">
                Terms of Service
              </Link>
              <span className="text-slate-300">•</span>
              <Link className="hover:text-slate-900" href="/privacy">
                Privacy Policy
              </Link>
              <span className="text-slate-300">•</span>
              <a
                href="https://calendly.com/jarredkrowitz/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900"
              >
                Schedule a Call
              </a>
              <span className="text-slate-300">•</span>
              <Link className="hover:text-slate-900" href="/login">
                Sign in
              </Link>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            © 2024 Pepform. All rights reserved. Built for service businesses who want referrals that compound.
          </p>
        </footer>
      </main>
    </div>
  );
}
