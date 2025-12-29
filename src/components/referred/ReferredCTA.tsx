"use client";

import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ReferredCTAProps {
  ambassadorId: string;
  businessId: string;
  referralCode: string;
}

export function ReferredCTA({
  ambassadorId,
  businessId,
  referralCode,
}: ReferredCTAProps) {
  const [loading, setLoading] = useState(false);

  async function handleScheduleCall() {
    setLoading(true);

    try {
      await fetch("/api/track-conversion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType: "schedule_call_clicked",
          ambassadorId,
          businessId,
          referralCode,
          metadata: { source: "referred_final_cta" },
        }),
      });

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
    <section className="py-20 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
          Ready to Unlock Your Referral Revenue?
        </h2>
        <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
          Join 500+ businesses generating millions in referral revenue. Get started today.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Button
            onClick={scrollToForm}
            size="lg"
            className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-bold px-10 py-7 text-lg shadow-2xl shadow-teal-500/50 hover:-translate-y-1 transition-all duration-300"
          >
            Complete Application
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
            {loading ? "Booking..." : "Schedule Strategy Call"}
          </Button>
        </div>

        <p className="text-slate-400 text-sm mt-8">
          No credit card required • 30-day money-back guarantee
        </p>
      </div>
    </section>
  );
}
