"use client";

import { Calendar, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ReferredLandingHeroProps {
  ambassadorId: string;
  businessId: string;
  referralCode: string;
}

export function ReferredLandingHero({
  ambassadorId,
  businessId,
  referralCode,
}: ReferredLandingHeroProps) {
  const [loading, setLoading] = useState(false);

  async function handleScheduleCall() {
    setLoading(true);

    try {
      // Track the schedule call event
      await fetch("/api/track-conversion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType: "schedule_call_clicked",
          ambassadorId,
          businessId,
          referralCode,
          metadata: { source: "referred_landing_page" },
        }),
      });

      // Redirect to Calendly
      window.location.href = "https://calendly.com/jarredkro/30min";
    } catch (error) {
      console.error("Error tracking schedule call:", error);
      window.location.href = "https://calendly.com/jarredkro/30min";
    }
  }

  const scrollToForm = () => {
    const formSection = document.getElementById("application-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-60 -left-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute bottom-20 right-1/3 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 backdrop-blur-sm mb-8">
            <Sparkles className="h-4 w-4 text-teal-400" />
            <span className="text-sm font-semibold text-teal-300">
              You've Been Personally Referred
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Join the referral program{" "}
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              revolution
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            We unlock additional revenue by integrating directly with your sales and marketing strategy.
          </p>

          {/* Key Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="text-4xl font-black text-teal-400 mb-2">25%</div>
              <div className="text-white font-semibold mb-1">Revenue Share</div>
              <div className="text-slate-400 text-sm">For every customer you refer</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="text-4xl font-black text-cyan-400 mb-2">30min</div>
              <div className="text-white font-semibold mb-1">Quick Setup</div>
              <div className="text-slate-400 text-sm">Get started in one call</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="text-4xl font-black text-emerald-400 mb-2">∞</div>
              <div className="text-white font-semibold mb-1">Unlimited Scale</div>
              <div className="text-slate-400 text-sm">No cap on your earnings</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Button
              onClick={scrollToForm}
              size="lg"
              className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-bold px-10 py-7 text-lg shadow-2xl shadow-teal-500/50 hover:-translate-y-1 transition-all duration-300 border-0"
            >
              Submit Application
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              onClick={handleScheduleCall}
              disabled={loading}
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 text-white font-bold px-10 py-7 text-lg transition-all duration-300"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Book a Call
            </Button>
          </div>

          {/* Trust indicator */}
          <p className="text-slate-400 text-sm mt-8">
            Trusted by 500+ businesses generating $2M+ in referral revenue
          </p>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
            fill="rgb(248, 250, 252)"
          />
        </svg>
      </div>
    </section>
  );
}
