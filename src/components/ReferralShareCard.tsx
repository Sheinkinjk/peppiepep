'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy, Share2 } from "lucide-react";

type ReferralShareCardProps = {
  referralUrl: string;
  shareMessage: string;
  accentColor?: string;
};

export function ReferralShareCard({
  referralUrl,
  shareMessage,
  accentColor = "#0abab5",
}: ReferralShareCardProps) {
  const [linkCopied, setLinkCopied] = useState(false);
  const [messageCopied, setMessageCopied] = useState(false);
  const [shareFallback, setShareFallback] = useState<string | null>(null);

  const handleCopy = async (value: string, setter: (state: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(value);
      setter(true);
      window.setTimeout(() => setter(false), 1800);
    } catch (error) {
      console.error("Failed to copy text:", error);
      setShareFallback("Copy failed. Please try manually.");
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Referral invite",
          text: shareMessage,
          url: referralUrl,
        });
        setShareFallback(null);
        return;
      } catch (error) {
        console.error("Native share failed:", error);
      }
    }
    await handleCopy(shareMessage, setMessageCopied);
    setShareFallback("Sharing not supported—message copied instead.");
  };

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-semibold text-slate-900">Referral link</p>
        <p className="text-xs text-slate-500">
          Send the exact link below so rewards stay tied to your profile.
        </p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white/70 p-4">
        <p className="font-mono text-xs text-slate-900 break-all">{referralUrl}</p>
        <Button
          type="button"
          onClick={() => handleCopy(referralUrl, setLinkCopied)}
          className="mt-3 w-full rounded-full bg-slate-900 text-white hover:bg-slate-800"
        >
          {linkCopied ? (
            <>
              <Check className="mr-2 h-4 w-4" /> Link copied
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" /> Copy link
            </>
          )}
        </Button>
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-900">Share this message</p>
        <p className="text-xs text-slate-500">
          Paste anywhere—text, WhatsApp, Instagram DMs, or email.
        </p>
      </div>
      <div
        className="rounded-2xl border border-slate-200 p-4 text-sm text-slate-700 bg-white/80"
        style={{
          boxShadow: `0 15px 40px rgba(2, 75, 86, 0.08)`,
        }}
      >
        <p className="whitespace-pre-line">{shareMessage}</p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          type="button"
          onClick={() => handleCopy(shareMessage, setMessageCopied)}
          className="w-full rounded-full bg-slate-900 text-white hover:bg-slate-800"
        >
          {messageCopied ? (
            <>
              <Check className="mr-2 h-4 w-4" /> Message copied
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" /> Copy message
            </>
          )}
        </Button>
        <Button
          type="button"
          onClick={handleNativeShare}
          variant="outline"
          className="w-full rounded-full border-slate-300 text-slate-800"
          style={{
            borderColor: accentColor,
            color: accentColor,
          }}
        >
          <Share2 className="mr-2 h-4 w-4" /> Share now
        </Button>
      </div>
      {shareFallback && (
        <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-xl p-2 text-center">
          {shareFallback}
        </p>
      )}
    </div>
  );
}
