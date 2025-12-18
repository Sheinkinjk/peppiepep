"use client";

/* eslint-disable react/no-unescaped-entities */
import { useMemo, useState } from "react";
import { ArrowRight, Check, Zap, Users, Crown } from "lucide-react";
import Link from "next/link";
import { redirectToCheckout } from "@/lib/stripe-checkout";

// Stripe Price IDs from environment
const PRICE_IDS = {
  base: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_BASE_MONTHLY!,
    annual: process.env.NEXT_PUBLIC_STRIPE_PRICE_BASE_ANNUAL!,
  },
  scale: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_SCALE_MONTHLY!,
    annual: process.env.NEXT_PUBLIC_STRIPE_PRICE_SCALE_ANNUAL!,
  },
};

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [loading, setLoading] = useState<string | null>(null);

  const pricing = useMemo(
    () => ({
      base: {
        monthly: 499,
        annual: 399, // 20% discount: $4,790.40/year = $399.20/month
      },
      scale: {
        monthly: 599,
        annual: 479, // 20% discount: $5,750.40/year = $479.20/month
      },
    }),
    [],
  );

  const basePrice = pricing.base[billingCycle];
  const scalePrice = pricing.scale[billingCycle];
  const baseSavings =
    billingCycle === "annual"
      ? Math.round(pricing.base.monthly * 12 - pricing.base.annual * 12)
      : 0;
  const scaleSavings =
    billingCycle === "annual"
      ? Math.round(pricing.scale.monthly * 12 - pricing.scale.annual * 12)
      : 0;

  async function handleSubscribe(plan: "base" | "scale") {
    try {
      setLoading(plan);
      const priceId = PRICE_IDS[plan][billingCycle];

      if (!priceId) {
        throw new Error(`Price ID not configured for ${plan} ${billingCycle}`);
      }

      await redirectToCheckout({
        priceId,
        metadata: {
          plan,
          billing: billingCycle,
        },
      });
    } catch (error) {
      console.error("Checkout error:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to start checkout. Please try again."
      );
      setLoading(null);
    }
  }

  return (
    <div className="aurora relative min-h-screen overflow-x-hidden overflow-y-auto bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      {/* Premium gradient overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(168,85,247,0.15),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(236,72,153,0.15),transparent_45%),radial-gradient(circle_at_40%_80%,rgba(59,130,246,0.1),transparent_50%)]" />

      {/* Animated gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <main className="relative mx-auto flex max-w-7xl flex-col gap-12 sm:gap-16 px-4 sm:px-6 pb-16 sm:pb-24 pt-12 sm:pt-16 md:px-10 lg:px-16">
        <div className="mx-auto max-w-4xl space-y-6 sm:space-y-10 text-center">
          <h1 className="text-balance text-3xl sm:text-5xl font-black leading-tight tracking-tight lg:text-7xl">
            <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent drop-shadow-2xl">
              Growth Network
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Platform Pricing
            </span>
          </h1>

          <p className="max-w-3xl text-base sm:text-xl lg:text-2xl leading-relaxed text-purple-100 mx-auto font-medium px-4">
            Refer Labs are your partner in optimising the next phase of your
            marketing and sales strategy
          </p>
        </div>

        {/* Premium billing toggle */}
        <div className="relative mx-auto px-4">
          <div className="rounded-2xl bg-gradient-to-b from-slate-800/80 to-slate-900/80 p-1.5 shadow-2xl shadow-purple-500/20 ring-1 ring-purple-500/30 backdrop-blur-xl inline-flex flex-col sm:flex-row items-stretch sm:items-end justify-center gap-2 sm:gap-3 w-full sm:w-auto">
            <div className="relative">
              <button
                type="button"
                onClick={() => setBillingCycle("monthly")}
                disabled={loading !== null}
                className={`relative rounded-xl px-6 sm:px-8 py-3 text-sm sm:text-base font-bold transition-all duration-300 w-full sm:w-40 lg:w-48 disabled:opacity-50 ${
                  billingCycle === "monthly"
                    ? "bg-gradient-to-b from-purple-600 to-purple-700 text-white shadow-2xl shadow-purple-500/50 scale-105"
                    : "text-purple-300 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                Monthly billing
              </button>
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={() => setBillingCycle("annual")}
                disabled={loading !== null}
                className={`relative rounded-xl px-6 sm:px-8 py-3 text-sm sm:text-base font-bold transition-all duration-300 w-full sm:w-40 lg:w-48 disabled:opacity-50 ${
                  billingCycle === "annual"
                    ? "bg-gradient-to-b from-emerald-500 to-green-600 text-white shadow-2xl shadow-emerald-500/60 scale-105 ring-2 ring-emerald-400/50"
                    : "text-purple-300 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <span className="absolute -top-3 -right-2 rounded-xl bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-400 px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-black uppercase tracking-wide text-white shadow-2xl shadow-emerald-500/60 animate-pulse ring-2 ring-white/30">
                  Save 20%
                </span>
                Annual billing
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
          {/* Base Plan */}
          <div className="group relative rounded-3xl border border-purple-500/30 bg-gradient-to-b from-slate-800/90 to-slate-900/90 p-6 sm:p-10 shadow-2xl shadow-purple-900/30 ring-1 ring-purple-400/20 hover:shadow-purple-500/40 hover:ring-purple-400/40 transition-all duration-500 backdrop-blur-xl hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative mb-8">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500/20 to-purple-600/20 px-4 py-2 text-sm font-bold text-purple-300 ring-1 ring-purple-400/30 shadow-lg backdrop-blur-sm">
                <Zap className="h-4 w-4" />
                Base
              </div>
              <div className="mb-4 flex items-baseline gap-2 sm:gap-3">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
                  ${basePrice}
                </span>
                <div className="flex flex-col">
                  <span className="text-purple-300 font-bold text-sm sm:text-base">
                    /{billingCycle === "monthly" ? "month" : "year"}
                  </span>
                  {billingCycle === "annual" && (
                    <span className="text-[10px] sm:text-xs text-green-400 font-semibold">
                      Save ${baseSavings}/year
                    </span>
                  )}
                </div>
              </div>
              <p className="text-sm sm:text-base text-purple-200 font-medium">
                Launch-ready program for small teams
              </p>
            </div>

            <button
              onClick={() => handleSubscribe("base")}
              disabled={loading !== null}
              className="mb-10 inline-flex w-full items-center justify-center rounded-full border-2 border-purple-400/50 bg-gradient-to-b from-slate-700 to-slate-800 px-8 py-4 text-base font-bold text-white shadow-xl shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1 hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-400/40 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading === "base" ? "Loading..." : "Subscribe Now"}
            </button>
            <p className="text-center text-xs font-semibold text-purple-200">
              30-day money-back guarantee
            </p>

            <div className="space-y-4 text-base mt-8">
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-purple-100">
                  Up to <strong className="text-white">50 referrers</strong> enrolled
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-purple-100">
                  <strong className="text-white">5,000 SMS/WhatsApp messages</strong> included
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-purple-100">Real-time tracking dashboard</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-purple-100">Ambassador portals</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-purple-100">CSV import/export</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-purple-100">Basic analytics & live referrals</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-purple-100">Email support</span>
              </div>
            </div>
          </div>

          {/* Scale Plan - Most Popular */}
          <div className="group relative rounded-3xl border-2 border-purple-400 bg-gradient-to-b from-purple-600/20 via-pink-600/10 to-slate-900/90 p-6 sm:p-10 shadow-2xl shadow-purple-500/50 ring-2 ring-purple-400/50 transform hover:scale-110 transition-all duration-500 backdrop-blur-xl z-10">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 px-8 py-2.5 text-sm font-black text-white shadow-2xl shadow-purple-500/50 ring-2 ring-white/20 backdrop-blur-sm animate-pulse">
              ⭐ MOST POPULAR
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-pink-500/10 to-transparent rounded-3xl" />

            <div className="relative mb-8 mt-4">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-400/30 to-pink-400/30 px-4 py-2 text-sm font-bold text-purple-200 ring-1 ring-purple-300/50 shadow-lg backdrop-blur-sm">
                <Users className="h-4 w-4" />
                Scale
              </div>
              <div className="mb-4 flex items-baseline gap-2 sm:gap-3">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-2xl">
                  ${scalePrice}
                </span>
                <div className="flex flex-col">
                  <span className="text-purple-200 font-bold text-sm sm:text-base">
                    /{billingCycle === "monthly" ? "month" : "year"}
                  </span>
                  {billingCycle === "annual" && (
                    <span className="text-[10px] sm:text-xs text-green-400 font-semibold">
                      Save ${scaleSavings}/year
                    </span>
                  )}
                </div>
              </div>
              <p className="text-sm sm:text-base text-purple-100 font-medium">
                For teams running steady campaigns
              </p>
            </div>

            <button
              onClick={() => handleSubscribe("scale")}
              disabled={loading !== null}
              className="relative mb-10 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 px-8 py-4 text-base font-bold text-white shadow-2xl shadow-purple-500/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-pink-500/70 overflow-hidden group/button disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300" />
              <span className="relative">
                {loading === "scale" ? "Loading..." : "Subscribe Now"}
              </span>
              {loading !== "scale" && <ArrowRight className="relative h-5 w-5" />}
            </button>
            <p className="relative text-center text-xs font-semibold text-purple-100">
              30-day money-back guarantee
            </p>

            <div className="relative space-y-4 text-base mt-8">
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-purple-100">
                  Up to <strong className="text-white">125 referrers</strong>
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-purple-100">
                  <strong className="text-white">Everything in Base</strong>, plus:
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-purple-100">
                  <strong className="text-white">12,500 messages/month</strong> included
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-purple-100">Auto-reward SMS/email notifications</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-purple-100">Advanced analytics & cohort reports</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-purple-100">Ambassador leaderboard</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-purple-100">Custom branding, domains, UTM tracking</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-purple-100">Priority email + chat support</span>
              </div>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="group relative rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-black/90 p-6 sm:p-10 shadow-2xl shadow-slate-900/50 ring-1 ring-slate-700/30 hover:ring-slate-600/50 transition-all duration-500 backdrop-blur-xl hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-700/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative mb-8">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-slate-700/50 to-slate-600/50 px-4 py-2 text-sm font-bold text-slate-300 backdrop-blur-sm ring-1 ring-slate-600/50 shadow-lg">
                <Crown className="h-4 w-4 text-yellow-500" />
                Enterprise
              </div>
              <div className="mb-4 flex items-baseline gap-2 sm:gap-3">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
                  Custom
                </span>
                <span className="text-slate-400 font-bold text-sm sm:text-base">/month</span>
              </div>
              <p className="text-sm sm:text-base text-slate-300 font-medium">
                Built for large-scale campaigns
              </p>
            </div>

            <Link
              href="/login"
              className="mb-10 inline-flex w-full items-center justify-center rounded-full border-2 border-white/80 bg-white px-8 py-4 text-base font-bold text-slate-900 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-slate-50 hover:shadow-2xl hover:border-white"
            >
              Talk to sales
            </Link>

            <div className="relative space-y-4 text-base mt-8">
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-200">
                  <strong className="text-white">Unlimited referrers & messages</strong> with pooled
                  pricing
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-200">
                  <strong className="text-white">Everything in Scale</strong>, plus:
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-200">Dedicated CSM and campaign strategy</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-200">SSO/SAML, audit logs, custom roles</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-200">White-label portals & multi-brand support</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-200">Advanced API limits & webhooks</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-200">Custom SLAs + 24/7 support</span>
              </div>
            </div>
          </div>
        </div>

        <section className="rounded-3xl bg-gradient-to-b from-slate-800/50 to-slate-900/50 p-8 sm:p-12 shadow-2xl ring-1 ring-purple-500/20 backdrop-blur-xl">
          <div className="mx-auto max-w-3xl space-y-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
                Compare plans
              </h2>
              <p className="text-purple-200 text-base sm:text-lg">Find the perfect fit for your business</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-purple-500/30">
                    <th className="pb-4 text-sm sm:text-base font-bold text-purple-200">Features</th>
                    <th className="pb-4 text-center text-sm sm:text-base font-bold text-purple-200">Base</th>
                    <th className="pb-4 text-center text-sm sm:text-base font-bold text-purple-200">Scale</th>
                    <th className="pb-4 text-center text-sm sm:text-base font-bold text-purple-200">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="text-sm sm:text-base">
                  <tr className="border-b border-slate-700/50">
                    <td className="py-4 text-purple-100">Ambassadors</td>
                    <td className="py-4 text-center text-purple-200">50</td>
                    <td className="py-4 text-center text-purple-200">125</td>
                    <td className="py-4 text-center font-bold text-white">Unlimited</td>
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-4 text-purple-100">SMS credits/month</td>
                    <td className="py-4 text-center text-purple-200">5,000</td>
                    <td className="py-4 text-center text-purple-200">12,500</td>
                    <td className="py-4 text-center font-bold text-white">Unlimited</td>
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-4 text-purple-100">Analytics & reporting</td>
                    <td className="py-4 text-center text-purple-200">Basic</td>
                    <td className="py-4 text-center text-purple-200">Advanced</td>
                    <td className="py-4 text-center font-bold text-white">Advanced</td>
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-4 text-purple-100">Custom branding</td>
                    <td className="py-4 text-center"><span className="text-slate-500">✗</span></td>
                    <td className="py-4 text-center"><Check className="h-5 w-5 text-green-400 mx-auto" /></td>
                    <td className="py-4 text-center"><Check className="h-5 w-5 text-green-400 mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-4 text-purple-100">White-label portals</td>
                    <td className="py-4 text-center"><span className="text-slate-500">✗</span></td>
                    <td className="py-4 text-center"><span className="text-slate-500">✗</span></td>
                    <td className="py-4 text-center"><Check className="h-5 w-5 text-green-400 mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-4 text-purple-100">API access</td>
                    <td className="py-4 text-center"><span className="text-slate-500">✗</span></td>
                    <td className="py-4 text-center"><span className="text-slate-500">✗</span></td>
                    <td className="py-4 text-center"><Check className="h-5 w-5 text-green-400 mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-4 text-purple-100">Support</td>
                    <td className="py-4 text-center text-purple-200">Email</td>
                    <td className="py-4 text-center text-purple-200">Priority email</td>
                    <td className="py-4 text-center font-bold text-white">Phone + chat</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-gradient-to-b from-purple-600/20 to-purple-800/20 p-8 sm:p-12 ring-1 ring-purple-400/30 backdrop-blur-xl">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-6 sm:mb-8 text-center">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              <details className="group rounded-2xl bg-slate-800/50 p-4 sm:p-6 shadow-xl ring-1 ring-purple-500/20 backdrop-blur-sm hover:ring-purple-400/40 transition-all">
                <summary className="cursor-pointer font-bold text-white flex items-center justify-between text-sm sm:text-base">
                  What's included in the free trial?
                  <ArrowRight className="h-5 w-5 text-purple-400 group-open:rotate-90 transition-transform duration-300" />
                </summary>
                <p className="mt-4 text-sm sm:text-base text-purple-200 leading-relaxed">
                  All plans include a 14-day free trial with full access to all features. No credit card required to start.
                </p>
              </details>

              <details className="group rounded-2xl bg-slate-800/50 p-4 sm:p-6 shadow-xl ring-1 ring-purple-500/20 backdrop-blur-sm hover:ring-purple-400/40 transition-all">
                <summary className="cursor-pointer font-bold text-white flex items-center justify-between text-sm sm:text-base">
                  How does SMS pricing work?
                  <ArrowRight className="h-5 w-5 text-purple-400 group-open:rotate-90 transition-transform duration-300" />
                </summary>
                <p className="mt-4 text-sm sm:text-base text-purple-200 leading-relaxed">
                  Scale and Enterprise plans include SMS credits each month. Additional credits are $0.05/SMS. Base plan users can purchase SMS credits as needed.
                </p>
              </details>

              <details className="group rounded-2xl bg-slate-800/50 p-4 sm:p-6 shadow-xl ring-1 ring-purple-500/20 backdrop-blur-sm hover:ring-purple-400/40 transition-all">
                <summary className="cursor-pointer font-bold text-white flex items-center justify-between text-sm sm:text-base">
                  Can I change plans later?
                  <ArrowRight className="h-5 w-5 text-purple-400 group-open:rotate-90 transition-transform duration-300" />
                </summary>
                <p className="mt-4 text-sm sm:text-base text-purple-200 leading-relaxed">
                  Yes! Upgrade or downgrade anytime. Changes take effect immediately, and we'll pro-rate your billing accordingly.
                </p>
              </details>

              <details className="group rounded-2xl bg-slate-800/50 p-4 sm:p-6 shadow-xl ring-1 ring-purple-500/20 backdrop-blur-sm hover:ring-purple-400/40 transition-all">
                <summary className="cursor-pointer font-bold text-white flex items-center justify-between text-sm sm:text-base">
                  What payment methods do you accept?
                  <ArrowRight className="h-5 w-5 text-purple-400 group-open:rotate-90 transition-transform duration-300" />
                </summary>
                <p className="mt-4 text-sm sm:text-base text-purple-200 leading-relaxed">
                  We accept all major credit cards (Visa, Mastercard, Amex) and direct debit for annual plans.
                </p>
              </details>

              <details className="group rounded-2xl bg-slate-800/50 p-4 sm:p-6 shadow-xl ring-1 ring-purple-500/20 backdrop-blur-sm hover:ring-purple-400/40 transition-all">
                <summary className="cursor-pointer font-bold text-white flex items-center justify-between text-sm sm:text-base">
                  What happens if I exceed my ambassador limit?
                  <ArrowRight className="h-5 w-5 text-purple-400 group-open:rotate-90 transition-transform duration-300" />
                </summary>
                <p className="mt-4 text-sm sm:text-base text-purple-200 leading-relaxed">
                  We'll notify you when you're approaching your limit. You can upgrade anytime to add more ambassadors with no downtime.
                </p>
              </details>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 p-[2px] shadow-2xl">
          <div className="flex flex-col gap-6 sm:gap-8 rounded-3xl bg-slate-900/95 p-8 sm:p-12 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-2 sm:mb-3">
                Still not sure which plan is right?
              </h3>
              <p className="text-base sm:text-lg lg:text-xl text-purple-200">
                Start with a free trial or talk to our team to find the perfect fit for your business.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-white shadow-2xl shadow-purple-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-purple-400/70 whitespace-nowrap"
              >
                Start free trial <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center rounded-full border-2 border-white bg-transparent px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 whitespace-nowrap"
              >
                See how it works
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
