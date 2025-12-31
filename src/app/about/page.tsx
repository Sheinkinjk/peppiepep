/* eslint-disable react/no-unescaped-entities */
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import {
  ArrowRight,
  Target,
  Lightbulb,
  Rocket,
  Users,
  Shield,
  Heart,
} from "lucide-react";
import Link from "next/link";

export const metadata = generateSEOMetadata(seoConfig.about);

export default function About() {
  return (
    <div className="aurora relative min-h-screen overflow-hidden bg-gradient-to-b from-purple-50 via-white to-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(124,58,237,0.08),transparent_32%),radial-gradient(circle_at_90%_10%,rgba(236,72,153,0.1),transparent_35%)]" />

      <main className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-20 pt-8 md:px-10 lg:px-16">

        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <h1 className="text-balance text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            We are the referral engine to build your future<br />and monetise word-of-mouth referrals
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-slate-600 mx-auto">
            We started Refer Labs because we saw thousands of operators losing revenue to the same problem: broken referral systems.
          </p>
        </div>

        <section className="rounded-3xl bg-white/80 p-8 shadow-xl ring-1 ring-slate-100 backdrop-blur">
          <div className="mx-auto max-w-3xl space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">The Problem We Saw</h2>
            <div className="space-y-4 text-lg leading-relaxed text-slate-700">
              <p>
                Word-of-mouth has always grown communities, but the traditional referral model is broken. Your most loyal customers—the ones who truly love your brand and genuinely vouch for your offering—have no structured way to share their enthusiasm.
              </p>
              <div className="rounded-xl bg-purple-50 p-6 border-l-4 border-purple-500">
                <p className="italic text-slate-800">
                  "My best clients constantly send me new customers, but I have no system to thank them properly. They're my true beacons of growth, yet I'm stuck manually tracking who referred who in spreadsheets. These loyal ambassadors deserve better—they're driving real revenue and I'm barely acknowledging it."
                </p>
              </div>
              <p>
                We built Refer Labs to solve this: <strong>create an engagement system that rewards your loyal customers</strong> who are the true beacons of growth. These are the people who authentically vouch for your offering because they've experienced real value. They deserve recognition, rewards, and a frictionless way to share what they love.
              </p>
              <p>
                Your loyal customers aren't just satisfied—they're advocates. But without a proper engagement system, their word-of-mouth referrals go untracked, unrewarded, and unmotivated. Refer Labs turns these passionate customers into a structured growth engine, ensuring every referral is captured and every ambassador is celebrated.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Our Mission</h3>
            <p className="text-slate-600">
              Make referral revenue accessible to every team—regardless of size, budget, or technical skill.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <Lightbulb className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Our Vision</h3>
            <p className="text-slate-600">
              A world where brands grow organically through happy customers, not expensive ads—and every referral is tracked, rewarded, and celebrated.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <Heart className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Our Values</h3>
            <p className="text-slate-600">
              Simplicity over complexity. Speed over perfection. Customer success over feature bloat. We build for real businesses, not tech portfolios.
            </p>
          </div>
        </section>

        <section className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-2xl">
          <div className="mx-auto max-w-3xl space-y-6">
            <h2 className="text-3xl font-bold text-[#5ce1e6]">The Refer Labs Difference</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <Rocket className="h-5 w-5 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Built for relationship-first teams</p>
                    <p className="text-sm text-slate-300">Not e-commerce. Not SaaS. We understand your workflow.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Customer-obsessed</p>
                    <p className="text-sm text-slate-300">Every feature comes from real customer requests.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Privacy-first</p>
                    <p className="text-sm text-slate-300">Your customer data stays yours. No selling, no tracking.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <Rocket className="h-5 w-5 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Launch in minutes</p>
                    <p className="text-sm text-slate-300">No consultants. No setup calls. Import and go.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-gradient-to-br from-[#5ce1e6] via-teal-400 to-cyan-500 p-6 sm:p-8 shadow-2xl">
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur px-4 py-2 text-sm font-bold text-white ring-1 ring-white/30">
                <Users className="h-4 w-4" />
                PARTNER WITH US
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">Become a Refer Labs Partner</h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Join our partner program and earn recurring revenue by referring businesses to Refer Labs.
              </p>
            </div>

            <div className="rounded-2xl bg-white/95 backdrop-blur p-6 text-center space-y-4">
              <div className="grid gap-3 sm:grid-cols-3 text-left">
                <div>
                  <p className="font-semibold text-slate-900 mb-1">💰 Earn Revenue</p>
                  <p className="text-sm text-slate-600">Get paid for every business you refer that joins Refer Labs</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 mb-1">🎯 Track Everything</p>
                  <p className="text-sm text-slate-600">Full dashboard to see all your referrals and commissions</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 mb-1">🚀 Grow Together</p>
                  <p className="text-sm text-slate-600">Help businesses unlock referral revenue while building yours</p>
                </div>
              </div>
              <Link
                href="https://calendly.com/jarredkro/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-slate-800 to-slate-900 px-8 py-4 text-base font-bold text-white shadow-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl"
              >
                Schedule a Call <ArrowRight className="h-5 w-5" />
              </Link>
              <p className="text-sm text-slate-600">
                Learn more about our <Link href="/our-referral-program" className="underline font-semibold text-slate-900 hover:text-purple-600">partner program</Link>
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 p-[1px] shadow-2xl">
          <div className="flex flex-col gap-6 rounded-3xl bg-white/90 p-8 text-slate-900 backdrop-blur md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-3xl font-bold mb-2">
                Join us on the journey
              </h3>
              <p className="text-lg text-slate-600">
                We're just getting started. Help us build the referral engine every modern growth team deserves.
              </p>
            </div>
            <a
              href="mailto:jarred@referlabs.com.au"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-0.5 hover:shadow-purple-300 whitespace-nowrap"
            >
              Contact Us <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

      </main>
    </div>
  );
}
