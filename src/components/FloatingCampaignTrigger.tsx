'use client';

import { useCallback } from "react";
import { Rocket } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FloatingCampaignTrigger() {
  const handleClick = useCallback(() => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("pep-open-campaign"));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
    if (typeof win.__pepOpenCampaignModal === "function") {
      win.__pepOpenCampaignModal();
    } else {
      win.__pepPendingCampaignModal = true;
    }
  }, []);

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Start a new campaign"
      className={cn(
        buttonVariants({ variant: "cta" }),
        "fixed bottom-5 left-4 sm:bottom-8 sm:left-8 z-40 shadow-xl shadow-teal-200/70",
      )}
    >
      <Rocket className="h-4 w-4" />
      <span className="hidden sm:inline">Start campaign</span>
    </button>
  );
}
