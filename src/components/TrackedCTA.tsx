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
  const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

  const openCalendly = () => {
    window.open(calendlyUrl, "_blank", "noopener,noreferrer");
  };

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
      openCalendly();
    } catch (error) {
      console.error("Error tracking schedule call:", error);
      // Still redirect even if tracking fails
      openCalendly();
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
    <Button
      onClick={handleScheduleCall}
      disabled={loading}
      size="lg"
      variant="outline"
      className="rounded-xl border-2 border-slate-300 bg-white hover:bg-slate-50 text-slate-900 font-bold px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
    >
      <Calendar className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
      Schedule a Call
    </Button>
  );
}
