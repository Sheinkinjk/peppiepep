/* eslint-disable react/no-unescaped-entities */
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

export default function About() {
  return (
    <div className="aurora relative min-h-screen overflow-hidden bg-gradient-to-b from-purple-50 via-white to-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(124,58,237,0.08),transparent_32%),radial-gradient(circle_at_90%_10%,rgba(236,72,153,0.1),transparent_35%)]" />

      <main className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-20 pt-8 md:px-10 lg:px-16">

        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-purple-700 shadow-sm ring-1 ring-purple-200">
            Our Story
          </div>
          <h1 className="text-balance text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Building the referral engine every service business deserves
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-slate-600 mx-auto">
            We started Pepform because we saw thousands of service businesses losing revenue to the same problem: broken referral systems.
          </p>
        </div>

        <section className="rounded-3xl bg-white/80 p-8 shadow-xl ring-1 ring-slate-100 backdrop-blur">
          <div className="mx-auto max-w-3xl space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">The Problem We Saw</h2>
            <div className="space-y-4 text-lg leading-relaxed text-slate-700">
              <p>
                In 2023, we interviewed 200+ service business owners—from beauty salons to fitness studios to wellness centers. We heard the same story over and over:
              </p>
              <div className="rounded-xl bg-purple-50 p-6 border-l-4 border-purple-500">
                <p className="italic text-slate-800">
                  "My clients love referring their friends, but I have no idea who's actually bringing me business. I track referrals in a spreadsheet when I remember, but half the time I forget who referred who. And rewards? I just give discounts manually when someone reminds me."
                </p>
              </div>
              <p>
                The result? <strong>82% of potential referrals were lost</strong> to poor tracking. Customers who wanted to refer didn't know how. Ambassadors who drove revenue never got rewarded. Service businesses left millions on the table.
              </p>
              <p>
                Meanwhile, e-commerce had sophisticated referral platforms. But service businesses—who depend even more on word-of-mouth—were stuck with spreadsheets or expensive, complex enterprise software built for different industries.
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
              Make referral revenue accessible to every service business—regardless of size, budget, or technical skill.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <Lightbulb className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Our Vision</h3>
            <p className="text-slate-600">
              A world where service businesses grow organically through happy customers, not expensive ads—and every referral is tracked, rewarded, and celebrated.
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
            <h2 className="text-3xl font-bold">The Pepform Difference</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <Rocket className="h-5 w-5 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Built for service businesses</p>
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

        <section className="rounded-3xl bg-white/80 p-8 shadow-xl ring-1 ring-slate-100 backdrop-blur">
          <div className="mx-auto max-w-3xl space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Meet the Team</h2>
              <p className="text-slate-600">Small team, big ambition</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="text-center">
                <div className="mb-4 mx-auto h-32 w-32 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 shadow-lg" />
                <h3 className="text-xl font-bold text-slate-900">Founder & CEO</h3>
                <p className="text-purple-600 font-medium mb-2">Building the vision</p>
                <p className="text-sm text-slate-600">
                  Former salon owner who lost $50k+ in referrals to poor tracking. Built Pepform to solve the problem that cost thousands of businesses millions.
                </p>
              </div>

              <div className="text-center">
                <div className="mb-4 mx-auto h-32 w-32 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 shadow-lg" />
                <h3 className="text-xl font-bold text-slate-900">Head of Product</h3>
                <p className="text-blue-600 font-medium mb-2">Obsessed with simplicity</p>
                <p className="text-sm text-slate-600">
                  10+ years building SaaS products. Believes the best software is invisible—it just works. Champions "feature deletion" over feature bloat.
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-purple-50 p-6 text-center">
              <p className="text-slate-700 mb-4">
                <strong>We're hiring!</strong> Love service businesses? Want to help them grow? We're looking for engineers, designers, and growth folks who care about impact over resumes.
              </p>
              <Link
                href="mailto:hello@pepform.com"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-white/80 p-8 shadow-xl ring-1 ring-slate-100 backdrop-blur">
          <div className="mx-auto max-w-3xl space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">Our Journey</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24 text-sm font-semibold text-purple-700">Q1 2024</div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 mb-1">Research & validation</p>
                  <p className="text-sm text-slate-600">Interviewed 200+ service businesses. Validated the problem was real and expensive.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24 text-sm font-semibold text-purple-700">Q2 2024</div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 mb-1">Built MVP in 6 weeks</p>
                  <p className="text-sm text-slate-600">Launched with 10 beta customers. Focused on core workflow: upload, share, reward.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24 text-sm font-semibold text-purple-700">Q3 2024</div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 mb-1">Hit 100 businesses</p>
                  <p className="text-sm text-slate-600">Tracked 1,000+ referrals. Added SMS notifications and advanced analytics based on customer requests.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24 text-sm font-semibold text-purple-700">Q4 2024</div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 mb-1">180+ businesses, $94k attributed</p>
                  <p className="text-sm text-slate-600">Proven product-market fit. Preparing for scale. Building team.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24 text-sm font-semibold text-purple-700">2025</div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 mb-1">Goal: 1,000 businesses</p>
                  <p className="text-sm text-slate-600">White-label portals, integrations, and enterprise features. Becoming the referral OS for service businesses worldwide.</p>
                </div>
              </div>
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
                We're just getting started. Help us build the referral engine every service business deserves.
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

      </main>
    </div>
  );
}
