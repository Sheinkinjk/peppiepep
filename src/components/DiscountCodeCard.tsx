'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy, ShieldCheck } from "lucide-react";

type DiscountCodeCardProps = {
  discountCode: string | null;
  businessName: string;
  fallbackInstructions: string;
  accentColor?: string;
};

export function DiscountCodeCard({
  discountCode,
  businessName,
  fallbackInstructions,
  accentColor = "#0abab5",
}: DiscountCodeCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!discountCode) return;
    try {
      await navigator.clipboard.writeText(discountCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error("Failed to copy discount code:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-semibold text-slate-900">Discount word</p>
        <p className="text-xs text-slate-500">
          Mention this at checkout or on the booking form so {businessName} instantly tags the referral.
        </p>
      </div>
      {discountCode ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-center space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
            Your code
          </p>
          <p
            className="text-3xl font-black tracking-[0.3em] text-slate-900"
            style={{ color: accentColor }}
          >
            {discountCode}
          </p>
          <Button
            type="button"
            onClick={handleCopy}
            className="w-full rounded-full bg-slate-900 text-white hover:bg-slate-800"
          >
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4" /> Code copied
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" /> Copy code
              </>
            )}
          </Button>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-4 text-sm text-slate-500">
          <p>{fallbackInstructions}</p>
        </div>
      )}
      <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 text-sm text-slate-600 flex items-start gap-3">
        <ShieldCheck className="h-5 w-5 text-emerald-500" />
        <p>
          After you complete your visit, both you and your ambassador get notified that the reward is secure.
        </p>
      </div>
    </div>
  );
}
