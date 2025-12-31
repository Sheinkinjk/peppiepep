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
        "rounded-2xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-md sm:flex sm:items-center sm:justify-between",
        isCompact ? "px-4 py-3 gap-3" : "px-6 py-5",
        className,
      )}
    >
      <div>
        <p className={cn("uppercase tracking-[0.3em] text-emerald-700 font-bold", isCompact ? "text-[10px]" : "text-[11px]")}>
          Create Campaign
        </p>
        <p
          className={cn(
            "font-black text-slate-900 leading-tight",
            isCompact ? "text-lg" : "text-xl",
          )}
        >
          Launch Email or SMS Campaign
        </p>
        <p className="mt-1 text-sm text-slate-600">
          Premium templates with personalized links and tracking
        </p>
      </div>
      <Button
        onClick={handleClick}
        variant="cta"
        className={cn(
          "mt-4 w-full sm:mt-0 sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 font-bold shadow-lg",
          isCompact ? "h-11 px-5 text-sm" : "h-12 px-6",
        )}
      >
        Launch Campaign
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
