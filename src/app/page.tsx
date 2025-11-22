/* eslint-disable react/no-unescaped-entities */
import {
  ArrowRight,
  Gift,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Upload,
  Star,
  TrendingUp,
  Users,
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
            <Link className="rounded-full px-3 py-1.5 hover:text-slate-900" href="#features">
              Product
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-purple-200 transition hover:-translate-y-0.5 hover:shadow-purple-300"
            >
              Go to app <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <Link
            href="/login"
            className="sm:hidden inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-purple-200 transition hover:-translate-y-0.5 hover:shadow-purple-300"
          >
            Go to app <ArrowRight className="h-4 w-4" />
          </Link>
        </header>

        <div className="flex flex-col-reverse gap-10 lg:flex-row lg:items-center">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-purple-700 shadow-sm ring-1 ring-purple-200">
              The referral system that runs itself
            </div>
            <h1 className="text-balance text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Turn happy customers into your most powerful growth engine
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-slate-600">
              Stop losing referrals to forgotten conversations. Pepform automatically invites your best clients to become ambassadors, tracks every referral, and rewards them instantly—so you can focus on delivering great service while your business grows.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-0.5 hover:shadow-purple-300"
              >
                Get started free
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-purple-300 bg-purple-50 px-6 py-3 text-sm font-semibold text-purple-700 transition hover:-translate-y-0.5 hover:border-purple-400"
              >
                Try demo dashboard →
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-slate-600">
              <div className="rounded-full bg-white px-3 py-2 shadow ring-1 ring-slate-100">
                ✓ 5 minutes to launch
              </div>
              <div className="rounded-full bg-white px-3 py-2 shadow ring-1 ring-slate-100">
                ✓ Zero manual tracking
              </div>
              <div className="rounded-full bg-white px-3 py-2 shadow ring-1 ring-slate-100">
                ✓ Instant ambassador rewards
              </div>
            </div>
          </div>

          <div className="relative w-full max-w-lg self-center lg:ml-auto">
            <div className="glass relative rounded-3xl p-6 shadow-xl ring-1 ring-white/60">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg" />
                <div>
                  <p className="text-sm text-slate-500">Pepform</p>
                  <p className="text-lg font-semibold text-slate-900">Client referral pulse</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/70 bg-white/70 p-4 shadow-sm">
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>Pending referrals</span>
                    <span className="font-semibold text-purple-700">12</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-slate-100">
                    <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-1 rounded-2xl border border-white/70 bg-white/70 p-4 shadow-sm">
                    <p className="text-sm text-slate-500">Ambassadors</p>
                    <p className="text-2xl font-bold text-slate-900">38</p>
                    <p className="text-xs text-slate-500">+6 this week</p>
                  </div>
                  <div className="flex-1 rounded-2xl border border-white/70 bg-white/70 p-4 shadow-sm">
                    <p className="text-sm text-slate-500">Earned credits</p>
                    <p className="text-2xl font-bold text-slate-900">$482</p>
                    <p className="text-xs text-slate-500">Auto-applied</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/70 bg-white/70 p-4 shadow-sm">
                  <p className="text-sm text-slate-500">Top ambassador</p>
                  <p className="text-base font-semibold text-slate-900">
                    Alex • 9 completed • $90 earned
                  </p>
                  <p className="text-xs text-slate-500">“Clients love the offer.”</p>
                </div>
              </div>
            </div>
            <div className="absolute -left-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 blur-3xl" />
          </div>
        </div>

        <section
          id="how"
          className="grid gap-6 rounded-3xl bg-white/80 p-6 shadow-xl ring-1 ring-slate-100 backdrop-blur lg:grid-cols-3"
        >
          {[
            {
              title: "Import & activate",
              desc: "Upload your customer list once. Every client instantly gets their own beautiful referral link—no manual work required.",
              icon: <Upload className="h-5 w-5 text-purple-600" />,
            },
            {
              title: "Sit back & watch",
              desc: "See exactly who's referring, who's been referred, and what rewards are earned—all in real-time, zero spreadsheets.",
              icon: <ShieldCheck className="h-5 w-5 text-purple-600" />,
            },
            {
              title: "Rewards run themselves",
              desc: "The moment a referral books, credits hit their account and ambassadors get an instant SMS notification. Completely automatic.",
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
              The complete system that turns referrals into revenue
            </h2>
            <ul className="space-y-3 text-sm leading-relaxed text-slate-700">
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-xs font-semibold text-purple-700">
                  1
                </span>
                <strong>Never lose a referral opportunity.</strong> Every customer gets their own trackable link they can share anywhere.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-xs font-semibold text-purple-700">
                  2
                </span>
                <strong>Ambassadors share effortlessly.</strong> One-tap sharing to SMS, WhatsApp, Instagram, and Facebook—no tech skills needed.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-xs font-semibold text-purple-700">
                  3
                </span>
                <strong>Rewards happen instantly.</strong> When referrals convert, credits apply automatically and ambassadors get notified by SMS—keeping them motivated to share more.
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
              Trusted by service businesses
            </div>
            <div className="flex items-center justify-center gap-8 text-sm text-slate-600 mb-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-slate-900">2,400+</p>
                <p className="text-sm">Referrals tracked</p>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div className="text-center">
                <p className="text-3xl font-bold text-slate-900">180+</p>
                <p className="text-sm">Active businesses</p>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div className="text-center">
                <p className="text-3xl font-bold text-slate-900">$94k+</p>
                <p className="text-sm">Revenue attributed</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="mb-4 text-slate-700 leading-relaxed">
                "We went from tracking referrals in a messy spreadsheet to having a proper system in 10 minutes. In 3 months, referrals went from 15% to 42% of new bookings."
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400" />
                <div>
                  <p className="font-semibold text-slate-900">Sarah Mitchell</p>
                  <p className="text-sm text-slate-500">Owner, Glow Beauty Studio</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="mb-4 text-slate-700 leading-relaxed">
                "The SMS notifications keep our clients engaged. They actually share their links now because it's so easy. Our best month: 28 referrals, $3.2k revenue."
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400" />
                <div>
                  <p className="font-semibold text-slate-900">James Chen</p>
                  <p className="text-sm text-slate-500">Director, Elite Fitness Co.</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="mb-4 text-slate-700 leading-relaxed">
                "Saves me 5 hours a week I used to spend tracking who referred who. The automatic rewards are brilliant—clients love getting their credits instantly."
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-400" />
                <div>
                  <p className="font-semibold text-slate-900">Emma Rodriguez</p>
                  <p className="text-sm text-slate-500">Founder, Verde Wellness</p>
                </div>
              </div>
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
              <Link className="hover:text-slate-900" href="/about">
                About
              </Link>
              <span className="text-slate-300">•</span>
              <Link className="hover:text-slate-900" href="/security">
                Security
              </Link>
              <span className="text-slate-300">•</span>
              <Link className="hover:text-slate-900" href="/pricing">
                Pricing
              </Link>
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
