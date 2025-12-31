'use client';

import { useCallback } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type StartCampaignCTAProps = {
  className?: string;
  variant?: "default" | "compact";
};

export function StartCampaignCTA({ className = "", variant = "default" }: StartCampaignCTAProps) {
  const handleClick = useCallback(() => {
    if (typeof document === "undefined" || typeof window === "undefined") return;

    window.dispatchEvent(new CustomEvent("pep-open-campaign"));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
    if (typeof win.__pepOpenCampaignModal === "function") {
      win.__pepOpenCampaignModal();
    } else {
      win.__pepPendingCampaignModal = true;
    }
  }, []);

  const isCompact = variant === "compact";

  return (
    <div
      className={cn(
        "rounded-3xl border border-slate-200/70 bg-white/90 shadow-lg shadow-slate-200/60 sm:flex sm:items-center sm:justify-between",
        isCompact ? "px-4 py-3 gap-3" : "px-5 py-4",
        className,
      )}
    >
      <div>
        <p className={cn("uppercase tracking-[0.3em] text-slate-500", isCompact ? "text-[10px]" : "text-[11px]")}>
          Start New Campaign
        </p>
        <p
          className={cn(
            "font-semibold text-slate-900 leading-tight",
            isCompact ? "text-base" : "text-lg",
          )}
        >
          Launch a Resend-powered email or SMS campaign
        </p>
        {isCompact && (
          <p className="mt-1 text-xs text-slate-500">
            Opens the campaign composer with templates, tracking, and live delivery.
          </p>
        )}
      </div>
      <Button
        onClick={handleClick}
        variant="cta"
        className={cn(
          "mt-4 w-full sm:mt-0 sm:w-auto",
          isCompact && "h-10 px-4 text-sm font-semibold",
        )}
      >
        Start campaign
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
