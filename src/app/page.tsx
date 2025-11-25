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

      <main className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-24 pt-16 md:px-10 lg:px-16">
        <header className="flex items-center justify-between rounded-full border border-white/60 bg-white/70 px-5 py-3.5 shadow-lg shadow-purple-100/50 backdrop-blur-xl ring-1 ring-black/5">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 shadow-xl shadow-purple-400/30" />
            <div className="">
              <p className="text-sm font-bold text-slate-900 tracking-tight">Pepform</p>
              <p className="text-[10.5px] font-semibold uppercase tracking-wider text-purple-600">
                Referrals OS
              </p>
            </div>
          </div>
          <div className="hidden items-center gap-3 text-sm font-semibold text-slate-700 sm:flex">
            <Link className="rounded-full px-3.5 py-2 hover:text-slate-900 hover:bg-slate-50/80 transition-all duration-200" href="/how-it-works">
              How it works
            </Link>
            <Link className="rounded-full px-3.5 py-2 hover:text-slate-900 hover:bg-slate-50/80 transition-all duration-200" href="/pricing">
              Pricing
            </Link>
            <Link className="rounded-full px-3.5 py-2 hover:text-slate-900 hover:bg-slate-50/80 transition-all duration-200" href="/demo">
              Demo
            </Link>
            <a
              href="https://calendly.com/jarredkrowitz/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-purple-600/80 bg-gradient-to-b from-white to-purple-50/30 px-4 py-2 text-sm font-semibold text-purple-700 shadow-md shadow-purple-200/50 transition-all duration-200 hover:-translate-y-0.5 hover:border-purple-600 hover:shadow-lg hover:shadow-purple-300/60"
            >
              <Calendar className="h-4 w-4" />
              Schedule a Call
            </a>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-slate-800 to-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/30 ring-1 ring-slate-700/50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-900/40"
            >
              Go to app <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="flex items-center gap-2 sm:hidden">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-b from-slate-800 to-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-slate-900/30 ring-1 ring-slate-700/50"
            >
              Sign in
            </Link>
          </div>
        </header>

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
              href="/demo"
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

        {/* How It Works Section */}
        <section className="space-y-8 sm:space-y-12">
          <div className="text-center space-y-4 px-4">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl tracking-tight">
              How it works
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-medium">
              Four simple steps to turn your customers into your growth network
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="group rounded-3xl border border-slate-200/80 bg-gradient-to-b from-white to-slate-50/50 p-7 shadow-lg shadow-slate-200/50 ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-200/40 hover:ring-purple-100">
              <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-xl font-extrabold text-white shadow-lg shadow-purple-300/50">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Import & activate</h3>
              <p className="text-slate-600 leading-relaxed mb-4 text-sm">
                Upload your customer list. Your customers now become your ambassadors.
              </p>
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-50 to-purple-100/50 px-3.5 py-1.5 text-xs font-bold text-purple-700 ring-1 ring-purple-200/50">
                <Upload className="h-3.5 w-3.5" />
                Quick Setup
              </div>
            </div>

            <div className="group rounded-3xl border border-slate-200/80 bg-gradient-to-b from-white to-slate-50/50 p-7 shadow-lg shadow-slate-200/50 ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-200/40 hover:ring-blue-100">
              <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-xl font-extrabold text-white shadow-lg shadow-blue-300/50">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Create campaign</h3>
              <p className="text-slate-600 leading-relaxed mb-4 text-sm">
                Create messaging, upload your client base, and send out campaigns through email or SMS.
              </p>
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-50 to-blue-100/50 px-3.5 py-1.5 text-xs font-bold text-blue-700 ring-1 ring-blue-200/50">
                <MessageSquare className="h-3.5 w-3.5" />
                Automated SMS & Email
              </div>
            </div>

            <div className="group rounded-3xl border border-slate-200/80 bg-gradient-to-b from-white to-slate-50/50 p-7 shadow-lg shadow-slate-200/50 ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-200/40 hover:ring-green-100">
              <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-xl font-extrabold text-white shadow-lg shadow-green-300/50">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Track referrals</h3>
              <p className="text-slate-600 leading-relaxed mb-4 text-sm">
                See exactly who's referring, who's been referred, and which campaigns drive results in real-time.
              </p>
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-50 to-green-100/50 px-3.5 py-1.5 text-xs font-bold text-green-700 ring-1 ring-green-200/50">
                <ShieldCheck className="h-3.5 w-3.5" />
                Sit back & watch
              </div>
            </div>

            <div className="group rounded-3xl border border-slate-200/80 bg-gradient-to-b from-white to-slate-50/50 p-7 shadow-lg shadow-slate-200/50 ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-200/40 hover:ring-orange-100">
              <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-xl font-extrabold text-white shadow-lg shadow-orange-300/50">
                4
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Rewards fly</h3>
              <p className="text-slate-600 leading-relaxed mb-4 text-sm">
                Credits are applied instantly, ambassadors get notified, and the flywheel kicks into action.
              </p>
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-50 to-orange-100/50 px-3.5 py-1.5 text-xs font-bold text-orange-700 ring-1 ring-orange-200/50">
                <Gift className="h-3.5 w-3.5" />
                Automatic rewards
              </div>
            </div>
          </div>
        </section>


        <section className="space-y-6 sm:space-y-8 rounded-3xl bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 p-8 sm:p-12 shadow-2xl shadow-slate-900/50 ring-1 ring-white/10 text-white">
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 px-4 py-1.5 text-xs font-bold text-purple-200 ring-1 ring-purple-400/40 shadow-lg shadow-purple-500/20 mb-5">
              Market Opportunity
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">
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

          <div className="rounded-2xl bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-purple-500/20 backdrop-blur-sm p-6 sm:p-8 border border-purple-400/30 shadow-xl shadow-purple-500/10 ring-1 ring-white/10">
            <h3 className="text-xl sm:text-2xl font-extrabold mb-4 text-white tracking-tight">The Problem We're Solving</h3>
            <p className="text-sm sm:text-base text-purple-50 leading-relaxed mb-4 font-medium">
              Service businesses know referrals are their best growth channel—higher conversion, lower cost, better retention. But tracking who referred who, calculating rewards, and keeping ambassadors engaged requires manual work that nobody has time for.
            </p>
            <p className="text-sm sm:text-base text-purple-50 leading-relaxed font-medium">
              Pepform automates the entire referral lifecycle in one platform: link generation, tracking, rewards, and SMS notifications. We turn referrals from a manual headache into a compounding growth engine.
            </p>
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
                Go to app <ArrowRight className="h-4 w-4" />
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
