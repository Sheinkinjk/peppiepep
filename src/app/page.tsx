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
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white shadow-md"
            >
              Sign in
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <div className="mx-auto max-w-4xl text-center space-y-6 py-8 sm:py-12 sm:space-y-8">
          <h1 className="text-balance text-3xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl xl:text-7xl">
            Turn happy customers into your growth network
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg lg:text-xl px-4">
            Launch a referral program that plugs into your sales and marketing strategies
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4 px-4">
            <Link
              href="/demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border-2 border-purple-600 bg-white px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-purple-700 shadow-lg shadow-purple-100 transition hover:-translate-y-0.5 hover:bg-purple-50 hover:shadow-purple-200"
            >
              Try demo dashboard
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-0.5 hover:shadow-purple-300"
            >
              Get started
            </Link>
          </div>
        </div>

        {/* How It Works Section */}
        <section className="space-y-6 sm:space-y-8">
          <div className="text-center space-y-3 px-4">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              How it works
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Four simple steps to turn your customers into your growth network
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 text-xl font-bold text-purple-700">
                1
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Import & activate</h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                Upload your customer list. Your customers now become your ambassadors.
              </p>
              <div className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
                <Upload className="h-3.5 w-3.5" />
                Quick Setup
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-700">
                2
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Create campaign</h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                Create messaging, upload your client base, and send out campaigns through email or SMS.
              </p>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                <MessageSquare className="h-3.5 w-3.5" />
                Automated SMS & Email
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-xl font-bold text-green-700">
                3
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Track referrals</h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                See exactly who's referring, who's been referred, and which campaigns drive results in real-time.
              </p>
              <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                <ShieldCheck className="h-3.5 w-3.5" />
                Sit back & watch
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-xl font-bold text-orange-700">
                4
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Rewards fly</h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                Credits are applied instantly, ambassadors get notified, and the flywheel kicks into action.
              </p>
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                <Gift className="h-3.5 w-3.5" />
                Automatic rewards
              </div>
            </div>
          </div>
        </section>


        <section className="space-y-4 sm:space-y-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 sm:p-8 shadow-2xl text-white">
          <div className="text-center mb-4 sm:mb-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/20 px-3 py-1 text-xs font-semibold text-purple-200 ring-1 ring-purple-400/30 mb-4">
              Market Opportunity
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Why referral automation matters now
            </h2>
          </div>

          <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
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

          <div className="rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur p-5 sm:p-6 border border-purple-400/30">
            <h3 className="text-lg sm:text-xl font-bold mb-3 text-white">The Problem We're Solving</h3>
            <p className="text-sm sm:text-base text-purple-100 leading-relaxed mb-4">
              Service businesses know referrals are their best growth channel—higher conversion, lower cost, better retention. But tracking who referred who, calculating rewards, and keeping ambassadors engaged requires manual work that nobody has time for.
            </p>
            <p className="text-sm sm:text-base text-purple-100 leading-relaxed">
              Pepform automates the entire referral lifecycle in one platform: link generation, tracking, rewards, and SMS notifications. We turn referrals from a manual headache into a compounding growth engine.
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
