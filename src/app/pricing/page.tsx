"use client";

/* eslint-disable react/no-unescaped-entities */
import { useMemo, useState } from "react";
import { ArrowRight, Check, Zap, Users, Crown } from "lucide-react";
import Link from "next/link";

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "monthly",
  );

  const pricing = useMemo(
    () => ({
      base: {
        monthly: 199,
        annual: Math.round(199 * 0.8), // 20% discount
      },
      scale: {
        monthly: 400,
        annual: Math.round(400 * 0.8),
      },
    }),
    [],
  );

  const basePrice = pricing.base[billingCycle];
  const scalePrice = pricing.scale[billingCycle];
  const annualLabel =
    billingCycle === "annual" ? " (billed annually, save 20%)" : "";

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
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-purple-200 transition hover:-translate-y-0.5 hover:shadow-purple-300"
          >
            Get started <ArrowRight className="h-4 w-4" />
          </Link>
        </header>

        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <div className="rounded-2xl bg-amber-50 text-amber-900 border border-amber-200 px-4 py-3 text-sm font-semibold shadow-sm">
            NOTE: Prices are waived during the testing period. Email <a href="mailto:jarredkrowitz@gmail.com" className="underline text-amber-800">jarredkrowitz@gmail.com</a> with any questions.
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-purple-700 shadow-sm ring-1 ring-purple-200">
            Simple, transparent pricing
          </div>
          <h1 className="text-balance text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Start free, scale as you grow
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-slate-600 mx-auto">
            No hidden fees. No setup costs. Cancel anytime. Get started in minutes and only pay when you're ready to scale.
          </p>
        </div>

        <div className="rounded-xl bg-white/80 p-2 shadow-sm ring-1 ring-slate-100 backdrop-blur inline-flex items-center justify-center mx-auto">
          <button
            type="button"
            onClick={() => setBillingCycle("monthly")}
            className={`rounded-lg px-4 py-2 text-sm font-semibold ${
              billingCycle === "monthly"
                ? "bg-slate-900 text-white"
                : "text-slate-600"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle("annual")}
            className={`px-4 py-2 text-sm font-semibold ${
              billingCycle === "annual"
                ? "bg-green-100 text-green-800 rounded-lg"
                : "text-slate-600"
            }`}
          >
            Annual <span className="ml-1 rounded-full bg-green-200 px-2 py-0.5 text-xs font-bold text-green-800">Save 20%</span>
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Base Plan */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-6">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
                <Zap className="h-3 w-3" />
                Base
              </div>
              <div className="mb-2 flex items-baseline gap-2">
                <span className="text-5xl font-bold text-slate-900">${basePrice}</span>
                <span className="text-slate-500">/month{annualLabel}</span>
              </div>
              <p className="text-sm text-slate-600">Launch-ready program for small teams</p>
            </div>

            <Link
              href="/login"
              className="mb-6 inline-flex w-full items-center justify-center rounded-full border-2 border-slate-900 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              Start free trial
            </Link>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Up to <strong>50 referrers</strong> enrolled</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700"><strong>5,000 SMS/WhatsApp messages</strong> included</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Real-time tracking dashboard</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Ambassador portals</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">CSV import/export</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Basic analytics & live referrals</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Email support</span>
              </div>
            </div>
          </div>

          {/* Scale Plan - Most Popular */}
          <div className="relative rounded-3xl border-2 border-purple-500 bg-white p-8 shadow-xl">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-1 text-xs font-bold text-white shadow-lg">
              MOST POPULAR
            </div>

            <div className="mb-6">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                <Users className="h-3 w-3" />
                Scale
              </div>
              <div className="mb-2 flex items-baseline gap-2">
                <span className="text-5xl font-bold text-slate-900">${scalePrice}</span>
                <span className="text-slate-500">/month{annualLabel}</span>
              </div>
              <p className="text-sm text-slate-600">For teams running steady campaigns</p>
            </div>

            <Link
              href="/login"
              className="mb-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-0.5 hover:shadow-purple-300"
            >
              Start free trial <ArrowRight className="h-4 w-4" />
            </Link>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Up to <strong>125 referrers</strong></span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700"><strong>Everything in Base</strong>, plus:</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700"><strong>12,500 messages/month</strong> included</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Auto-reward SMS/email notifications</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Advanced analytics & cohort reports</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Ambassador leaderboard</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Custom branding, domains, UTM tracking</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Priority email + chat support</span>
              </div>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white shadow-sm">
            <div className="mb-6">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                <Crown className="h-3 w-3" />
                Enterprise
              </div>
              <div className="mb-2 flex items-baseline gap-2">
                <span className="text-5xl font-bold">Custom</span>
                <span className="text-slate-300">/month</span>
              </div>
              <p className="text-sm text-slate-300">Built for large-scale campaigns</p>
            </div>

            <Link
              href="/login"
              className="mb-6 inline-flex w-full items-center justify-center rounded-full border-2 border-white bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              Talk to sales
            </Link>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-white"><strong>Unlimited referrers & messages</strong> with pooled pricing</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-white"><strong>Everything in Scale</strong>, plus:</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-white">Dedicated CSM and campaign strategy</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-white">SSO/SAML, audit logs, custom roles</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-white">White-label portals & multi-brand support</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-white">Advanced API limits & webhooks</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-white">Custom SLAs + 24/7 support</span>
              </div>
            </div>
          </div>
        </div>

        <section className="rounded-3xl bg-white/80 p-8 shadow-xl ring-1 ring-slate-100 backdrop-blur">
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Compare plans
              </h2>
              <p className="text-slate-600">Find the perfect fit for your business</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="pb-4 text-sm font-semibold text-slate-900">Features</th>
                    <th className="pb-4 text-center text-sm font-semibold text-slate-900">Starter</th>
                    <th className="pb-4 text-center text-sm font-semibold text-slate-900">Growth</th>
                    <th className="pb-4 text-center text-sm font-semibold text-slate-900">Pro</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-slate-100">
                    <td className="py-3 text-slate-700">Ambassadors</td>
                    <td className="py-3 text-center text-slate-600">50</td>
                    <td className="py-3 text-center text-slate-600">200</td>
                    <td className="py-3 text-center font-semibold text-slate-900">Unlimited</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 text-slate-700">SMS credits/month</td>
                    <td className="py-3 text-center text-slate-400">—</td>
                    <td className="py-3 text-center text-slate-600">500</td>
                    <td className="py-3 text-center font-semibold text-slate-900">2,000</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 text-slate-700">Analytics & reporting</td>
                    <td className="py-3 text-center text-slate-600">Basic</td>
                    <td className="py-3 text-center text-slate-600">Advanced</td>
                    <td className="py-3 text-center font-semibold text-slate-900">Advanced</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 text-slate-700">Custom branding</td>
                    <td className="py-3 text-center"><span className="text-slate-400">✗</span></td>
                    <td className="py-3 text-center"><Check className="h-4 w-4 text-green-600 mx-auto" /></td>
                    <td className="py-3 text-center"><Check className="h-4 w-4 text-green-600 mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 text-slate-700">White-label portals</td>
                    <td className="py-3 text-center"><span className="text-slate-400">✗</span></td>
                    <td className="py-3 text-center"><span className="text-slate-400">✗</span></td>
                    <td className="py-3 text-center"><Check className="h-4 w-4 text-green-600 mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 text-slate-700">API access</td>
                    <td className="py-3 text-center"><span className="text-slate-400">✗</span></td>
                    <td className="py-3 text-center"><span className="text-slate-400">✗</span></td>
                    <td className="py-3 text-center"><Check className="h-4 w-4 text-green-600 mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 text-slate-700">Support</td>
                    <td className="py-3 text-center text-slate-600">Email</td>
                    <td className="py-3 text-center text-slate-600">Priority email</td>
                    <td className="py-3 text-center font-semibold text-slate-900">Phone + chat</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-purple-50 p-8 ring-1 ring-purple-100">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              <details className="group rounded-xl bg-white p-4 shadow-sm">
                <summary className="cursor-pointer font-semibold text-slate-900 flex items-center justify-between">
                  What's included in the free trial?
                  <ArrowRight className="h-4 w-4 text-slate-400 group-open:rotate-90 transition" />
                </summary>
                <p className="mt-3 text-sm text-slate-600">
                  All plans include a 14-day free trial with full access to all features. No credit card required to start.
                </p>
              </details>

              <details className="group rounded-xl bg-white p-4 shadow-sm">
                <summary className="cursor-pointer font-semibold text-slate-900 flex items-center justify-between">
                  How does SMS pricing work?
                  <ArrowRight className="h-4 w-4 text-slate-400 group-open:rotate-90 transition" />
                </summary>
                <p className="mt-3 text-sm text-slate-600">
                  Growth and Pro plans include SMS credits each month. Additional credits are $0.05/SMS. Starter plan users can purchase SMS credits as needed.
                </p>
              </details>

              <details className="group rounded-xl bg-white p-4 shadow-sm">
                <summary className="cursor-pointer font-semibold text-slate-900 flex items-center justify-between">
                  Can I change plans later?
                  <ArrowRight className="h-4 w-4 text-slate-400 group-open:rotate-90 transition" />
                </summary>
                <p className="mt-3 text-sm text-slate-600">
                  Yes! Upgrade or downgrade anytime. Changes take effect immediately, and we'll pro-rate your billing accordingly.
                </p>
              </details>

              <details className="group rounded-xl bg-white p-4 shadow-sm">
                <summary className="cursor-pointer font-semibold text-slate-900 flex items-center justify-between">
                  What payment methods do you accept?
                  <ArrowRight className="h-4 w-4 text-slate-400 group-open:rotate-90 transition" />
                </summary>
                <p className="mt-3 text-sm text-slate-600">
                  We accept all major credit cards (Visa, Mastercard, Amex) and direct debit for annual plans.
                </p>
              </details>

              <details className="group rounded-xl bg-white p-4 shadow-sm">
                <summary className="cursor-pointer font-semibold text-slate-900 flex items-center justify-between">
                  Is there a setup fee?
                  <ArrowRight className="h-4 w-4 text-slate-400 group-open:rotate-90 transition" />
                </summary>
                <p className="mt-3 text-sm text-slate-600">
                  No setup fees, ever. Just choose your plan and start inviting ambassadors immediately.
                </p>
              </details>

              <details className="group rounded-xl bg-white p-4 shadow-sm">
                <summary className="cursor-pointer font-semibold text-slate-900 flex items-center justify-between">
                  What happens if I exceed my ambassador limit?
                  <ArrowRight className="h-4 w-4 text-slate-400 group-open:rotate-90 transition" />
                </summary>
                <p className="mt-3 text-sm text-slate-600">
                  We'll notify you when you're approaching your limit. You can upgrade anytime to add more ambassadors with no downtime.
                </p>
              </details>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 p-[1px] shadow-2xl">
          <div className="flex flex-col gap-6 rounded-3xl bg-white/90 p-8 text-slate-900 backdrop-blur md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-3xl font-bold mb-2">
                Still not sure which plan is right?
              </h3>
              <p className="text-lg text-slate-600">
                Start with a free trial or talk to our team to find the perfect fit for your business.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-0.5 hover:shadow-purple-300 whitespace-nowrap"
              >
                Start free trial <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center rounded-full border-2 border-slate-900 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 whitespace-nowrap"
              >
                See how it works
              </Link>
            </div>
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
            <Link className="hover:text-slate-900" href="/how-it-works">
              How it works
            </Link>
            <span className="text-slate-300">•</span>
            <Link className="hover:text-slate-900" href="/login">
              Sign in
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
