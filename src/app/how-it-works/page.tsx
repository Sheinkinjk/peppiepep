/* eslint-disable react/no-unescaped-entities */
import {
  ArrowRight,
  CheckCircle2,
  Upload,
  Link as LinkIcon,
  Gift,
  Bell,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

export default function HowItWorks() {
  return (
    <div className="aurora relative min-h-screen overflow-hidden bg-gradient-to-b from-purple-50 via-white to-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(124,58,237,0.08),transparent_32%),radial-gradient(circle_at_90%_10%,rgba(236,72,153,0.1),transparent_35%)]" />

      <main className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-20 pt-16 md:px-10 lg:px-16">
        <header className="flex items-center justify-between rounded-full border border-white/80 bg-white/80 px-4 py-3 shadow-sm backdrop-blur">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 shadow-lg" />
            <div className="">
              <p className="text-sm font-semibold text-slate-900">Pepform</p>
              <p className="text-[11px] font-medium uppercase tracking-wide text-purple-700">
                Referrals OS
              </p>
            </div>
          </Link>
          <div className="hidden items-center gap-3 text-sm font-semibold text-slate-700 sm:flex">
            <Link className="rounded-full px-3 py-1.5 text-purple-700 ring-1 ring-purple-200 bg-purple-50" href="/how-it-works">
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
              <ArrowRight className="h-4 w-4 rotate-180" />
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
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-purple-200"
            >
              Go to app <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </header>

        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-purple-700 shadow-sm ring-1 ring-purple-200">
            Step-by-step guide
          </div>
          <h1 className="text-balance text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            How Pepform turns customers into micro‑influencers
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-slate-600">
            From upload to reward in minutes. See how we plug referrals into your marketing campaigns so every happy customer promotes you across SMS, email, and social.
          </p>
        </div>

        <section className="space-y-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 mb-4">
                <span className="text-xl font-bold text-purple-700">1</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Import your customers (activate your micro‑influencers)
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Upload a simple CSV (name, phone, email). Pepform instantly turns every customer into a trackable, campaign-connected micro‑influencer.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-900">Instant processing</p>
                    <p className="text-sm text-slate-600">Pepform reads your file and sets everything up in seconds</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-900">Campaign-ready links</p>
                    <p className="text-sm text-slate-600">Every customer gets a link you can drop into SMS, email, or ads</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-900">Ready to share</p>
                    <p className="text-sm text-slate-600">Links are live immediately—no waiting, no approval process</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="glass relative rounded-3xl p-6 shadow-xl ring-1 ring-white/60">
                <div className="flex items-center gap-3 mb-4">
                  <Upload className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="text-sm text-slate-500">Step 1</p>
                    <p className="text-lg font-semibold text-slate-900">Upload CSV</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-xs font-mono text-slate-500 mb-2">customers.csv</p>
                    <div className="space-y-1 text-xs font-mono">
                      <p className="text-slate-700">name, phone, email</p>
                      <p className="text-slate-500">Sarah Jones, +447..., sarah@...</p>
                      <p className="text-slate-500">Mike Chen, +447..., mike@...</p>
                      <p className="text-slate-500">Emma Davis, +447..., emma@...</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center py-2">
                    <ArrowRight className="h-6 w-6 text-purple-500" />
                  </div>
                  <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <p className="font-semibold text-green-900">38 links generated</p>
                    </div>
                    <p className="text-xs text-green-700 mt-1">Ready to share with customers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="glass relative rounded-3xl p-6 shadow-xl ring-1 ring-white/60">
                <div className="flex items-center gap-3 mb-4">
                  <LinkIcon className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="text-sm text-slate-500">Step 2</p>
                    <p className="text-lg font-semibold text-slate-900">Ambassador portal</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-sm font-semibold text-slate-900 mb-3">Sarah's portal</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-600">Your link:</span>
                      </div>
                      <div className="rounded-lg bg-purple-50 p-2 font-mono text-xs text-purple-700 break-all">
                        pepform.com/r/abc123
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="rounded-lg bg-green-500 p-2 text-center text-xs font-semibold text-white">
                          WhatsApp
                        </div>
                        <div className="rounded-lg bg-blue-500 p-2 text-center text-xs font-semibold text-white">
                          SMS
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 mb-4">
                <span className="text-xl font-bold text-purple-700">2</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Customers become ambassadors (micro‑influencers)
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Send customers their unique link via text, email, or embed it inside your campaigns. Their personal portal makes sharing to friends effortless.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-900">Personal portal for each customer</p>
                    <p className="text-sm text-slate-600">Track their referrals, credits earned, and share buttons</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-900">One-tap sharing</p>
                    <p className="text-sm text-slate-600">WhatsApp, SMS, Instagram, Facebook—all built in</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-900">Beautiful referral pages</p>
                    <p className="text-sm text-slate-600">When friends click the link, they see your offer and can claim it instantly</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 mb-4">
                <span className="text-xl font-bold text-purple-700">3</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Track referrals in real-time
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Every click and referral shows up instantly. See who referred who, which campaign drove it, and reward them automatically—all from one dashboard.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-900">Live referral feed</p>
                    <p className="text-sm text-slate-600">Know exactly who's bringing you new business</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-900">Pending vs completed</p>
                    <p className="text-sm text-slate-600">Clear view of what needs action and what's done</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-900">Ambassador leaderboard</p>
                    <p className="text-sm text-slate-600">See your top referrers and total credits earned</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="glass relative rounded-3xl p-6 shadow-xl ring-1 ring-white/60">
                <div className="flex items-center gap-3 mb-4">
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="text-sm text-slate-500">Step 3</p>
                    <p className="text-lg font-semibold text-slate-900">Dashboard view</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-slate-200 bg-white p-3">
                      <p className="text-xs text-slate-500">Pending</p>
                      <p className="text-2xl font-bold text-orange-600">12</p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-3">
                      <p className="text-xs text-slate-500">Completed</p>
                      <p className="text-2xl font-bold text-green-600">38</p>
                    </div>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-3">
                    <p className="text-xs text-slate-500 mb-2">Recent referral</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Emma → Lucy</p>
                        <p className="text-xs text-slate-500">2 minutes ago</p>
                      </div>
                      <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-semibold text-orange-700">
                        Pending
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="glass relative rounded-3xl p-6 shadow-xl ring-1 ring-white/60">
                <div className="flex items-center gap-3 mb-4">
                  <Gift className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="text-sm text-slate-500">Step 4</p>
                    <p className="text-lg font-semibold text-slate-900">Auto-rewards</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <p className="font-semibold text-green-900">Referral completed!</p>
                    </div>
                    <p className="text-sm text-green-700">Lucy booked an appointment</p>
                  </div>
                  <div className="flex items-center justify-center py-1">
                    <ArrowRight className="h-5 w-5 text-purple-500" />
                  </div>
                  <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Bell className="h-5 w-5 text-blue-600" />
                      <p className="font-semibold text-blue-900">Emma notified</p>
                    </div>
                    <p className="text-xs text-blue-700 font-mono bg-blue-100 rounded p-2">
                      "Amazing! Your friend just booked – you've earned £10 credit! 🎉"
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 mb-4">
                <span className="text-xl font-bold text-purple-700">4</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Rewards happen automatically
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                When a referred customer books or completes their first purchase, just mark it complete in your dashboard. Pepform instantly credits the ambassador and sends them a celebration SMS.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-900">One-click completion</p>
                    <p className="text-sm text-slate-600">Just hit "Mark completed" in your dashboard</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-900">Credits applied instantly</p>
                    <p className="text-sm text-slate-600">Ambassador's account updates in real-time</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-900">SMS notification sent</p>
                    <p className="text-sm text-slate-600">Keeps ambassadors excited and motivated to share more</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 p-[1px] shadow-2xl">
          <div className="flex flex-col gap-6 rounded-3xl bg-white/90 p-8 text-slate-900 backdrop-blur md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-3xl font-bold mb-2">
                That's it. Four simple steps.
              </h3>
              <p className="text-lg text-slate-600">
                No complicated setup, no integrations, no ongoing maintenance. Just upload once and watch your referral program run itself.
              </p>
            </div>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-0.5 hover:shadow-purple-300 whitespace-nowrap"
            >
              Start for free <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <footer className="flex flex-col items-start justify-between gap-4 border-t border-slate-200/70 pt-6 text-sm text-slate-600 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 shadow-md" />
            <div>
              <p className="text-sm font-semibold text-slate-900">Pepform</p>
              <p className="text-xs text-slate-500">Referrals that compound</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link className="hover:text-slate-900" href="/">
              Home
            </Link>
            <span className="text-slate-300">•</span>
            <Link className="hover:text-slate-900" href="/login">
              Sign in
            </Link>
            <span className="text-slate-300">•</span>
            <Link className="hover:text-slate-900" href="/r/demo-referral">
              Demo link
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
