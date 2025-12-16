import { Metadata } from "next";
import Link from "next/link";
import {
  Gift,
  TrendingUp,
  Users,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Share2,
  DollarSign,
  BarChart3,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Refer Labs Referral Program | Earn Rewards by Sharing",
  description: "Join the Refer Labs referral program and earn rewards for every business you refer. Track your referrals, monitor your earnings, and grow your passive income.",
};

export default function ReferralProgramPage() {
  const adminReferralCode = process.env.ADMIN_REFERRAL_CODE || "Jn9wjbn2kQlO";
  const referralLink = `https://referlabs.com.au/r/${adminReferralCode}`;

  const benefits = [
    {
      icon: DollarSign,
      title: "Earn 25% Recurring Revenue",
      description: "Get 25% of every payment from businesses you refer, month after month. Your passive income grows as they grow.",
    },
    {
      icon: Gift,
      title: "$250 Sign-On Credit",
      description: "Every business you refer gets a $250 credit to start their referral program. Makes it easy to share the value.",
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics",
      description: "Track every referral, monitor conversions, and watch your earnings grow with our comprehensive dashboard.",
    },
    {
      icon: Zap,
      title: "Instant Attribution",
      description: "Automatic tracking from click to conversion. Never miss credit for a referral you sent our way.",
    },
  ];

  const howItWorks = [
    {
      number: "1",
      title: "Share Your Unique Link",
      description: "Copy your personalized referral link and share it with businesses who could benefit from Refer Labs.",
    },
    {
      number: "2",
      title: "They Sign Up & Launch",
      description: "When they click your link and create an account, they get $250 credit and you get automatically attributed.",
    },
    {
      number: "3",
      title: "You Earn Forever",
      description: "Earn 25% recurring commission on all their payments. Track everything in your dashboard.",
    },
  ];

  const stats = [
    { label: "Active Ambassadors", value: "500+" },
    { label: "Total Referrals", value: "2,400+" },
    { label: "Average Monthly Earnings", value: "$850" },
    { label: "Top Ambassador Earnings", value: "$4,200/mo" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0abab5] via-[#24d9e2] to-[#0abab5] py-20 sm:py-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white/90 mb-6">
              <Sparkles className="h-4 w-4" />
              Exclusive Referral Program
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-white mb-6 leading-tight">
              Earn 25% Recurring Revenue<br />
              <span className="text-[#0a4b53]">For Every Business You Refer</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Share Refer Labs with businesses and earn passive income for life. No limits on referrals, no caps on earnings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-[#0abab5] hover:bg-white/90 text-lg px-8 py-6 rounded-2xl font-bold shadow-2xl"
              >
                <Link href={referralLink}>
                  Get Your Referral Link
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 rounded-2xl font-bold"
              >
                <Link href="/login">
                  Access Dashboard
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-6 text-center">
                <p className="text-3xl font-black text-white mb-1">{stat.value}</p>
                <p className="text-sm text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4">
              Why Join Our Referral Program?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Built for partners who want to earn passive income by sharing a product they believe in.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-8 rounded-3xl border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-gradient-to-br from-[#0abab5] to-[#24d9e2] p-3 text-white">
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-black text-slate-900 mb-2">{benefit.title}</h3>
                    <p className="text-slate-600">{benefit.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 sm:py-32 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Start earning in three simple steps. No complicated setup, no hidden requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#0abab5] to-[#24d9e2] text-white text-2xl font-black mb-6">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600">{step.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-[#0abab5] to-[#24d9e2] opacity-20" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Your Referral Link */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Card className="p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-2xl bg-gradient-to-br from-white to-slate-50">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 mb-4">
                <Share2 className="h-4 w-4" />
                Ready to Get Started
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-4">
                Your Unique Referral Link
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Share this link with businesses and start earning. It's automatically tracked to your account.
              </p>
            </div>

            <div className="rounded-2xl border-2 border-[#0abab5]/20 bg-white p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                <code className="flex-1 text-base sm:text-lg font-mono text-slate-900 break-all">
                  {referralLink}
                </code>
                <a
                  href={referralLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-xl bg-gradient-to-r from-[#0abab5] to-[#24d9e2] px-4 py-2 text-sm font-bold text-white shadow transition-colors hover:from-[#099a95] hover:to-[#1fc8d1]"
                >
                  Visit Link
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-emerald-600">
                <CheckCircle className="h-4 w-4" />
                <span>Automatic attribution enabled</span>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-[#0abab5] to-[#24d9e2] hover:from-[#099a95] hover:to-[#1fc8d1] text-white text-lg px-8 py-6 rounded-2xl font-bold shadow-lg"
              >
                <Link href="/login">
                  View Full Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-20 sm:py-32 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4">
              Program Details
            </h2>
            <p className="text-xl text-slate-600">
              Everything you need to know about earning with Refer Labs.
            </p>
          </div>

          <div className="space-y-6">
            <Card className="p-6 rounded-2xl border border-slate-200">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-emerald-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Commission Structure</h3>
                  <p className="text-slate-600">
                    Earn 25% recurring commission on all payments from referred businesses. No commission caps, no time limits.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 rounded-2xl border border-slate-200">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-emerald-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Referral Attribution</h3>
                  <p className="text-slate-600">
                    30-day cookie window ensures you get credit even if the business doesn't sign up immediately. Cross-device tracking included.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 rounded-2xl border border-slate-200">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-emerald-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Payment Terms</h3>
                  <p className="text-slate-600">
                    Commissions paid monthly via bank transfer or PayPal. Minimum payout threshold of $50.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 rounded-2xl border border-slate-200">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-emerald-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Dashboard & Analytics</h3>
                  <p className="text-slate-600">
                    Real-time tracking of clicks, sign-ups, conversions, and earnings. Export reports anytime.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 rounded-2xl border border-slate-200">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-emerald-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Support & Resources</h3>
                  <p className="text-slate-600">
                    Access to marketing materials, email templates, and dedicated partner support to help you succeed.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Card className="relative overflow-hidden rounded-3xl border-0 p-12 text-center shadow-2xl">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "linear-gradient(135deg, #0abab5, #24d9e2)",
              }}
            />
            <div className="relative">
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4">
                Ready to Start Earning?
              </h2>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                Join hundreds of partners already earning passive income with Refer Labs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-[#0abab5] to-[#24d9e2] hover:from-[#099a95] hover:to-[#1fc8d1] text-white text-lg px-8 py-6 rounded-2xl font-bold shadow-lg"
                >
                  <Link href={referralLink}>
                    Get Started Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-slate-200 text-slate-900 hover:bg-slate-50 text-lg px-8 py-6 rounded-2xl font-bold"
                >
                  <Link href="/contact">
                    Questions? Contact Us
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
