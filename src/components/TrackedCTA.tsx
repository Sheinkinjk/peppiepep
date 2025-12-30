"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, ArrowRight } from "lucide-react";

interface TrackedCTAProps {
  ambassadorId?: string | null;
  businessId?: string | null;
  referralCode?: string | null;
}

export function TrackedCTA({ ambassadorId, businessId, referralCode }: TrackedCTAProps) {
  const [loading, setLoading] = useState(false);

  async function handleScheduleCall() {
    setLoading(true);

    try {
      // Track the schedule call event
      if (ambassadorId && businessId) {
        await fetch("/api/track-conversion", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventType: "schedule_call_clicked",
            ambassadorId,
            businessId,
            referralCode,
          }),
        });
      }

      // Redirect to Calendly or booking page
      window.location.href = "https://calendly.com/jarredkro/30min";
    } catch (error) {
      console.error("Error tracking schedule call:", error);
      // Still redirect even if tracking fails
      window.location.href = "https://calendly.com/jarredkro/30min";
    }
  }

  async function handleContactUs() {
    setLoading(true);

    try {
      // Track the contact us event
      if (ambassadorId && businessId) {
        await fetch("/api/track-conversion", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventType: "contact_us_clicked",
            ambassadorId,
            businessId,
            referralCode,
          }),
        });
      }

      // Redirect to contact page or open email client
      window.location.href = "mailto:jarred@referlabs.com.au?subject=Interested in Refer Labs";
    } catch (error) {
      console.error("Error tracking contact us:", error);
      // Still redirect even if tracking fails
      window.location.href = "mailto:jarred@referlabs.com.au?subject=Interested in Refer Labs";
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
      <Button
        onClick={handleScheduleCall}
        disabled={loading}
        size="lg"
        className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-bold px-8 py-6 text-lg shadow-xl hover:-translate-y-1 transition-all duration-300"
      >
        <Calendar className="mr-2 h-5 w-5" />
        Schedule a Call
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>

      <Button
        onClick={handleContactUs}
        disabled={loading}
        size="lg"
        variant="outline"
        className="border-2 border-slate-300 hover:border-teal-500 hover:bg-teal-50 font-bold px-8 py-6 text-lg transition-all duration-300"
      >
        <MessageSquare className="mr-2 h-5 w-5" />
        Contact Us
      </Button>
    </div>
  );
}
