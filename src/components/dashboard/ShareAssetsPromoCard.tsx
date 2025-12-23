"use client";

import { useCallback } from "react";
import { Gift, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ShareAssetsPromoCardProps = {
  ambassadorsTotal: number;
  disabled?: boolean;
};

export function ShareAssetsPromoCard({
  ambassadorsTotal,
  disabled = false,
}: ShareAssetsPromoCardProps) {
  const handleOpen = useCallback(() => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(
      new CustomEvent("pep-open-step", {
        detail: { stepId: "view-campaigns", anchorId: "share-assets" },
      }),
    );
  }, []);

  return (
    <Card className="p-6 border-2 border-emerald-200 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-lg">
            <Gift className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-700">
              Quick Win
            </p>
            <h3 className="mt-1 text-2xl font-black text-slate-900">
              Share assets are ready
            </h3>
            <p className="mt-1 text-sm text-slate-700">
              Generate links, QR codes, and shareable tiles so ambassadors can start sharing before you send a campaign.
            </p>
            <p className="mt-2 text-xs text-slate-600">
              Ambassadors: <span className="font-semibold text-slate-800">{ambassadorsTotal}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col items-stretch gap-2 sm:items-end">
          <Button
            type="button"
            variant="cta"
            onClick={handleOpen}
            disabled={disabled}
            className="h-11 px-5"
          >
            Open Share Assets
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          {disabled && (
            <p className="text-xs text-slate-600">
              Add at least one ambassador to generate assets.
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}

