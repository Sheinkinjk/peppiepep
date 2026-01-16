"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Gift,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Share2,
  DollarSign,
  BarChart3,
  Zap,
  TrendingUp,
  Award,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type ProgramContext = {
  businessName: string | null;
  offerText: string | null;
  clientReward: string | null;
  newUserReward: string | null;
  rewardTerms: string | null;
  logoUrl: string | null;
  brandHighlightColor: string | null;
};

export default function ReferralProgramPage() {
  const searchParams = useSearchParams();
  const [tracked, setTracked] = useState(false);
  const [programContext, setProgramContext] = useState<ProgramContext | null>(null);

  // Extract URL parameters
  const code = searchParams?.get("code") || process.env.NEXT_PUBLIC_ADMIN_REFERRAL_CODE || "Jn9wjbn2kQlO";
  const project = searchParams?.get("project");
  const utmCampaign = searchParams?.get("utm_campaign");
  const utmMedium = searchParams?.get("utm_medium");
  const utmSource = searchParams?.get("utm_source");

  const referralLink = `https://referlabs.com.au/r/${code}`;

  // Build query params for attribution
  const buildQueryString = () => {
    const params = new URLSearchParams();
    if (code) params.set("code", code);
    if (project) params.set("project", project);
    if (utmCampaign) params.set("utm_campaign", utmCampaign);
    if (utmMedium) params.set("utm_medium", utmMedium);
    if (utmSource) params.set("utm_source", utmSource);
    return params.toString() ? `?${params.toString()}` : "";
  };

  const queryString = buildQueryString();

  useEffect(() => {
    if (!code) return;
    fetch(`/api/ambassadors/${encodeURIComponent(code)}`)
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (!data || data.error) return;
        setProgramContext({
          businessName: data.businessName ?? null,
          offerText: data.offerText ?? null,
          clientReward: data.clientReward ?? null,
          newUserReward: data.newUserReward ?? null,
          rewardTerms: data.rewardTerms ?? null,
          logoUrl: data.logoUrl ?? null,
          brandHighlightColor: data.brandHighlightColor ?? null,
        });
      })
      .catch((error) => {
        console.error("Failed to load referral context:", error);
      })
      .finally(() => {});
  }, [code]);

  // Track page view
  useEffect(() => {
    if (tracked || !project) return;

    async function trackView() {
      try {
        await fetch("/api/referral-events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            businessId: project,
            eventType: "link_visit",
            source: utmSource || "referral_page",
            device: /mobile/i.test(navigator.userAgent) ? "mobile" : "desktop",
            metadata: {
              page: "referral_landing",
              code,
              utm_campaign: utmCampaign,
              utm_medium: utmMedium,
              utm_source: utmSource,
            },
          }),
        });
        setTracked(true);
      } catch (error) {
        console.error("Failed to track page view:", error);
      }
    }

    trackView();
  }, [tracked, project, code, utmCampaign, utmMedium, utmSource]);

  // Track button clicks
  const trackButtonClick = async (buttonLabel: string, destination: string) => {
    if (!project) return;

    try {
      await fetch("/api/referral-events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessId: project,
          eventType: buttonLabel.includes("Contact") ? "contact_us_clicked" : "schedule_call_clicked",
          source: utmSource || "referral_page",
          device: /mobile/i.test(navigator.userAgent) ? "mobile" : "desktop",
          metadata: {
            button_label: buttonLabel,
            destination,
            code,
            utm_campaign: utmCampaign,
            utm_medium: utmMedium,
            utm_source: utmSource,
          },
        }),
      });
    } catch (error) {
      console.error("Failed to track button click:", error);
    }
  };

  const programBusinessName = programContext?.businessName ?? "Refer Labs";
  const heroRewardHeadline = programContext?.clientReward
    ? `Earn ${programContext.clientReward}`
    : "Earn 25% Recurring Revenue";
  const heroRewardSubheadline = programContext?.businessName
    ? `For every business you refer to ${programContext.businessName}`
    : "For Every Business You Refer";
  const heroDescription =
    programContext?.offerText ||
    `Share ${programBusinessName} with businesses and earn passive income for life. No limits on referrals, no caps on earnings.`;
  const partnerRewardDescription = programContext?.clientReward
    ? `Earn ${programContext.clientReward} for every qualified referral. Track everything in your dashboard.`
    : "Get 25% of every payment from businesses you refer, month after month. Your passive income grows as they grow.";
  const newUserRewardDescription = programContext?.newUserReward
    ? `New referrals receive ${programContext.newUserReward} when they sign up.`
    : "Every business you refer gets a $250 credit to start their referral program. Makes it easy to share the value.";
  const shareStepDescription = `Copy your personalized referral link and share it with businesses who could benefit from ${programBusinessName}.`;
  const signupStepDescription = programContext?.newUserReward
    ? `When they click your link and create an account, they receive ${programContext.newUserReward} and you get automatically attributed.`
    : "When they click your link and create an account, they get $250 credit and you get automatically attributed.";
  const earningsStepDescription = programContext?.clientReward
    ? `Earn ${programContext.clientReward} for every completed referral. Track everything in your dashboard.`
    : "Earn 25% recurring commission on all their payments. Track everything in your dashboard.";
  const commissionDescription = programContext?.clientReward
    ? `Earn ${programContext.clientReward} on every qualified referral. No commission caps, no time limits. Your earnings grow as your referrals succeed.`
    : "Earn 25% recurring commission on all payments from referred businesses. No commission caps, no time limits. Your earnings grow as your referrals succeed.";

  const benefits = [
    {
      icon: DollarSign,
      title: programContext?.clientReward ? "Partner reward" : "Earn 25% Recurring Revenue",
      description: partnerRewardDescription,
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      icon: Gift,
      title: programContext?.newUserReward ? "New client reward" : "$250 Sign-On Credit",
      description: newUserRewardDescription,
      gradient: "from-purple-500 to-pink-600",
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics",
      description: "Track every referral, monitor conversions, and watch your earnings grow with our comprehensive dashboard.",
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      icon: Zap,
      title: "Instant Attribution",
      description: "Automatic tracking from click to conversion. Never miss credit for a referral you sent our way.",
      gradient: "from-amber-500 to-orange-600",
    },
  ];

  const howItWorks = [
    {
      number: "1",
      title: "Share Your Unique Link",
      description: shareStepDescription,
      icon: Share2,
    },
    {
      number: "2",
      title: "They Sign Up & Launch",
      description: signupStepDescription,
      icon: Users,
    },
    {
      number: "3",
      title: "You Earn Forever",
      description: earningsStepDescription,
      icon: TrendingUp,
    },
  ];

  const stats = [
    { label: "Active Ambassadors", value: "500+", icon: Users },
    { label: "Total Referrals", value: "2,400+", icon: Share2 },
    { label: "Avg Monthly Earnings", value: "$850", icon: DollarSign },
    { label: "Top Earnings", value: "$4.2k/mo", icon: Award },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section - Premium Upgrade */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0abab5] via-[#1cc9cf] to-[#24d9e2] py-24 sm:py-36">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-5 py-2.5 text-sm font-bold text-white mb-8 shadow-lg border border-white/20">
              <Sparkles className="h-4 w-4 animate-pulse" />
              Exclusive Referral Program
              <Sparkles className="h-4 w-4 animate-pulse" />
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight tracking-tight">
              {heroRewardHeadline}<br />
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">{heroRewardSubheadline}</span>
            </h1>
            <p className="text-xl sm:text-2xl text-white/95 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
              {heroDescription}
            </p>
            {programContext && (
              <div className="mx-auto mb-10 max-w-3xl rounded-3xl border border-white/30 bg-white/15 px-6 py-5 text-white shadow-xl backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
                  Referral offer
                </p>
                <h2 className="mt-2 text-2xl font-black">
                  {programContext.businessName || "This business"} referral program
                </h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 text-sm">
                  <div className="rounded-2xl border border-white/30 bg-white/10 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-white/70">New client reward</p>
                    <p className="mt-1 text-lg font-bold">
                      {programContext.newUserReward || "Exclusive offer"}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/30 bg-white/10 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-white/70">Partner reward</p>
                    <p className="mt-1 text-lg font-bold">
                      {programContext.clientReward || "Partner incentives"}
                    </p>
                  </div>
                </div>
                {programContext.rewardTerms && (
                  <p className="mt-3 text-xs text-white/80">{programContext.rewardTerms}</p>
                )}
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-[#0abab5] hover:bg-white/90 hover:scale-105 text-lg px-10 py-7 rounded-2xl font-black shadow-2xl transition-all duration-300"
                onClick={() => trackButtonClick("Get Your Referral Link", referralLink)}
              >
                <Link href={`${referralLink}${queryString}`}>
                  Get Your Referral Link
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white/40 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:scale-105 text-lg px-10 py-7 rounded-2xl font-black transition-all duration-300"
                onClick={() => trackButtonClick("Access Dashboard", "/login")}
              >
                <Link href={`/login${queryString}`}>
                  Access Dashboard
                </Link>
              </Button>
            </div>
          </div>

          {/* Premium Stats Cards */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-5">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group rounded-3xl border-2 border-white/30 bg-white/15 backdrop-blur-md p-7 text-center hover:bg-white/25 hover:scale-105 transition-all duration-300 shadow-xl"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm mb-3 group-hover:scale-110 transition-transform">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <p className="text-3xl sm:text-4xl font-black text-white mb-2">{stat.value}</p>
                <p className="text-sm text-white/80 font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - Premium Upgrade */}
      <section className="py-24 sm:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-6xl font-black text-slate-900 mb-6 tracking-tight">
              Why Join Our Referral Program?
            </h2>
            <p className="text-xl sm:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Built for partners who want to earn passive income by sharing a product they believe in.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="group p-10 rounded-3xl border-2 border-slate-200 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 bg-gradient-to-br from-white to-slate-50/50"
              >
                <div className="flex items-start gap-6">
                  <div className={`rounded-2xl bg-gradient-to-br ${benefit.gradient} p-4 text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    <benefit.icon className="h-7 w-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-slate-900 mb-3">{benefit.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-lg">{benefit.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Premium Upgrade */}
      <section className="py-24 sm:py-36 bg-gradient-to-b from-white to-slate-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-6xl font-black text-slate-900 mb-6 tracking-tight">
              How It Works
            </h2>
            <p className="text-xl sm:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Start earning in three simple steps. No complicated setup, no hidden requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative group">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-[#0abab5] to-[#24d9e2] text-white text-3xl font-black mb-8 shadow-xl group-hover:scale-110 transition-transform">
                    {step.number}
                  </div>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 mb-6 group-hover:scale-110 transition-transform">
                    <step.icon className="h-8 w-8 text-slate-700" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">{step.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-1/2 w-full h-1 bg-gradient-to-r from-[#0abab5] via-[#1cc9cf] to-[#24d9e2] opacity-20 rounded-full" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Your Referral Link - Premium Upgrade */}
      <section className="py-24 sm:py-36">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Card className="relative overflow-hidden p-10 sm:p-16 rounded-3xl border-0 shadow-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#0abab5]/20 rounded-full blur-3xl"></div>

            <div className="relative text-center mb-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 backdrop-blur-sm px-5 py-2.5 text-sm font-bold text-emerald-300 mb-6 border border-emerald-500/30">
                <Share2 className="h-4 w-4" />
                Ready to Get Started
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white mb-5 tracking-tight">
                Your Unique Referral Link
              </h2>
              <p className="text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed">
                Share this link with businesses and start earning. It&apos;s automatically tracked to your account.
              </p>
            </div>

            <div className="relative rounded-2xl border-2 border-[#0abab5]/40 bg-white/5 backdrop-blur-sm p-8 mb-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-5">
                <code className="flex-1 text-base sm:text-lg font-mono text-white break-all bg-white/10 rounded-xl p-4">
                  {referralLink}
                </code>
                <a
                  href={`${referralLink}${queryString}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackButtonClick("Visit Referral Link", referralLink)}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-xl bg-gradient-to-r from-[#0abab5] to-[#24d9e2] px-6 py-3.5 text-sm font-black text-white shadow-lg transition-all hover:from-[#099a95] hover:to-[#1fc8d1] hover:scale-105"
                >
                  Visit Link
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-emerald-400 font-semibold">
                <CheckCircle className="h-5 w-5" />
                <span>Automatic attribution enabled • 30-day tracking window</span>
              </div>
            </div>

            <div className="relative text-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-slate-900 hover:bg-slate-100 hover:scale-105 text-lg px-10 py-7 rounded-2xl font-black shadow-xl transition-all"
                onClick={() => trackButtonClick("View Full Dashboard", "/login")}
              >
                <Link href={`/login${queryString}`}>
                  View Full Dashboard
                  <BarChart3 className="ml-2 h-6 w-6" />
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Program Details - Premium Upgrade */}
      <section className="py-24 sm:py-36 bg-gradient-to-b from-slate-50/50 to-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-6xl font-black text-slate-900 mb-6 tracking-tight">
              Program Details
            </h2>
            <p className="text-xl sm:text-2xl text-slate-600 leading-relaxed">
              Everything you need to know about earning with {programBusinessName}.
            </p>
          </div>

          <div className="space-y-5">
            {[
              {
                title: "Commission Structure",
                description: commissionDescription,
              },
              {
                title: "Referral Attribution",
                description: "30-day cookie window ensures you get credit even if the business doesn't sign up immediately. Cross-device tracking and automatic attribution included.",
              },
              {
                title: "Payment Terms",
                description: "Commissions paid monthly via bank transfer or PayPal. Minimum payout threshold of $50. View pending and completed payments in your dashboard.",
              },
              {
                title: "Dashboard & Analytics",
                description: "Real-time tracking of clicks, sign-ups, conversions, and earnings. Export detailed reports anytime. Monitor your entire referral funnel.",
              },
              {
                title: "Support & Resources",
                description: "Access to marketing materials, email templates, and dedicated partner support. We help you succeed with proven strategies and ongoing guidance.",
              },
            ].map((item, index) => (
              <Card key={index} className="group p-8 rounded-2xl border-2 border-slate-200 hover:border-[#0abab5] hover:shadow-xl transition-all duration-300 bg-white">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#0abab5] to-[#24d9e2] group-hover:scale-150 transition-transform"></div>
                  </div>
                  <div>
                    <h3 className="font-black text-xl text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-lg">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Premium Upgrade */}
      <section className="py-24 sm:py-36">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Card className="relative overflow-hidden rounded-3xl border-0 p-16 sm:p-20 text-center shadow-2xl bg-gradient-to-br from-[#0abab5] via-[#1cc9cf] to-[#24d9e2]">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl"></div>

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-5 py-2.5 text-sm font-bold text-white mb-8 border border-white/20">
                <Award className="h-4 w-4" />
                Join Our Partner Network
              </div>
              <h2 className="text-4xl sm:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
                Ready to Start Earning?
              </h2>
              <p className="text-xl sm:text-2xl text-white/95 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                Join hundreds of partners already earning passive income with {programBusinessName}.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-[#0abab5] hover:bg-slate-50 hover:scale-105 text-lg px-10 py-7 rounded-2xl font-black shadow-2xl transition-all"
                  onClick={() => trackButtonClick("Get Started Now (CTA)", referralLink)}
                >
                  <Link href={`${referralLink}${queryString}`}>
                    Get Started Now
                    <ArrowRight className="ml-2 h-6 w-6" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/40 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:scale-105 text-lg px-10 py-7 rounded-2xl font-black transition-all"
                  onClick={() => trackButtonClick("Questions? Contact Us", "/contact")}
                >
                  <Link href={`/contact${queryString}`}>
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
