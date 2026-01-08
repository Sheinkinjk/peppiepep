"use client";

import { useMemo, useState } from "react";
import { ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

type QaResult = {
  totalCustomers: number;
  missingReferralCodes: number;
  missingDiscountCodes: number;
  duplicateReferralCodes: number;
  duplicateDiscountCodes: number;
  sampleReferralLink: string | null;
  sampleReferralCode: string | null;
  sampleDiscountCode: string | null;
  referralLinksOk: boolean;
  discountCodesOk: boolean;
  directoryOk: boolean;
  issues: string[];
};

type AttributionCookieStatus = {
  hasAttribution: boolean;
  reason?: string;
  message?: string;
  daysRemaining?: number;
};

export function Step2QaButton() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<QaResult | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([false, false, false, false]);
  const [cookieStatus, setCookieStatus] = useState<AttributionCookieStatus | null>(null);
  const [cookieLoading, setCookieLoading] = useState(false);

  const canRunWalkthrough = useMemo(
    () => Boolean(result?.sampleReferralLink),
    [result],
  );

  const resetWalkthrough = () => {
    setCurrentStep(0);
    setCompletedSteps([false, false, false, false]);
  };

  const runQa = async () => {
    if (isRunning) return;
    setIsRunning(true);
    try {
      const response = await fetch("/api/qa/clients-ambassadors", { method: "POST" });
      if (!response.ok) {
        throw new Error("QA request failed");
      }
      const data = (await response.json()) as QaResult;
      setResult(data);
      resetWalkthrough();
      toast({
        title: "Ambassador QA complete",
        description: "Review the results below before moving to Launch Campaigns.",
      });
    } catch (error) {
      console.error("Step 2 QA failed:", error);
      toast({
        variant: "destructive",
        title: "QA failed",
        description: "We couldn't run the check. Please try again.",
      });
    } finally {
      setIsRunning(false);
    }
  };

  const logQaEvent = async (eventType: string, label: string) => {
    try {
      const response = await fetch("/api/qa/ambassadors/log-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType,
          label,
          referralCode: result?.sampleReferralCode ?? null,
          discountCode: result?.sampleDiscountCode ?? null,
        }),
      });

      if (!response.ok) {
        throw new Error("QA event logging failed");
      }

      toast({
        title: "QA event logged",
        description: `${label} is now visible in Measure ROI → Recent Activity.`,
      });
    } catch (error) {
      console.error("Failed to log QA event:", error);
      toast({
        variant: "destructive",
        title: "QA event failed",
        description: "We couldn't log that event. Please try again.",
      });
    }
  };

  const markStepComplete = (stepIndex: number) => {
    setCompletedSteps((prev) => {
      const next = [...prev];
      next[stepIndex] = true;
      return next;
    });
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const verifyAttributionCookie = async () => {
    if (cookieLoading) return;
    setCookieLoading(true);
    try {
      const response = await fetch("/api/verify-attribution");
      const data = (await response.json()) as AttributionCookieStatus;
      setCookieStatus(data);
      toast({
        title: data.hasAttribution ? "Attribution active" : "No attribution cookie",
        description: data.message ?? "Open a referral link first.",
      });
    } catch (error) {
      console.error("Failed to verify attribution cookie:", error);
      toast({
        variant: "destructive",
        title: "Cookie check failed",
        description: "We couldn't verify attribution. Please try again.",
      });
    } finally {
      setCookieLoading(false);
    }
  };

  return (
    <>
      <Button
        type="button"
        onClick={() => {
          setDialogOpen(true);
          resetWalkthrough();
        }}
        className="rounded-full bg-gradient-to-r from-slate-900 to-slate-700 text-white shadow-sm hover:from-slate-800 hover:to-slate-600"
      >
        <ShieldCheck className="mr-2 h-4 w-4" />
        Run Ambassador QA
      </Button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-slate-200 bg-white p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-black text-slate-900">
              Step 2 QA — Clients & Ambassadors
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-600">
              This verifies referral links, discount codes, and your ambassador directory are
              ready before you launch campaigns. Then it walks you through a live, end‑to‑end
              test using a real referral link.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            <div>
              <p className="font-semibold text-slate-900">What this checks:</p>
              <ul className="mt-2 space-y-1">
                <li>• Every ambassador has a referral code (link generation)</li>
                <li>• Discount codes exist and are unique</li>
                <li>• Ambassador directory is populated</li>
              </ul>
            </div>
            <Button
              type="button"
              className="rounded-full bg-slate-900 text-white hover:bg-slate-800"
              onClick={runQa}
              disabled={isRunning}
            >
              {isRunning ? "Running QA..." : "Start QA Check"}
            </Button>
          </div>

          {result && (
            <div className="mt-4 space-y-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 text-sm text-emerald-900">
              <p className="font-semibold">Results</p>
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-emerald-800">Ambassadors</p>
                  <p className="text-lg font-black text-emerald-900">{result.totalCustomers}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-emerald-800">Missing referral codes</p>
                  <p className="text-lg font-black text-emerald-900">{result.missingReferralCodes}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-emerald-800">Missing discount codes</p>
                  <p className="text-lg font-black text-emerald-900">{result.missingDiscountCodes}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-emerald-800">Duplicate codes</p>
                  <p className="text-lg font-black text-emerald-900">
                    {result.duplicateReferralCodes + result.duplicateDiscountCodes}
                  </p>
                </div>
              </div>
              {result.sampleReferralLink && (
                <div className="mt-2 rounded-xl border border-emerald-200 bg-white px-3 py-2 text-xs">
                  Sample referral link:{" "}
                  <span className="font-mono text-emerald-800">{result.sampleReferralLink}</span>
                </div>
              )}
              {result.sampleDiscountCode && (
                <div className="rounded-xl border border-emerald-200 bg-white px-3 py-2 text-xs">
                  Sample discount code:{" "}
                  <span className="font-mono text-emerald-800">{result.sampleDiscountCode}</span>
                </div>
              )}
              {result.issues.length > 0 && (
                <div className="mt-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
                  <p className="font-semibold">Issues to resolve:</p>
                  <ul className="mt-1 space-y-1">
                    {result.issues.map((issue) => (
                      <li key={issue}>• {issue}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="mt-4 space-y-4 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900">Guided live QA walkthrough</p>
                <p className="text-xs text-slate-500">
                  Follow each step in order. The checklist will unlock as you complete actions.
                </p>
              </div>
              <button
                type="button"
                className="text-xs font-semibold text-slate-500 hover:text-slate-700"
                onClick={resetWalkthrough}
                disabled={!canRunWalkthrough}
              >
                Reset steps
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              {["Link", "Form", "Meeting", "Order"].map((label, index) => (
                <div key={label} className="flex items-center gap-2">
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full border text-[11px] ${
                      completedSteps[index]
                        ? "border-emerald-300 bg-emerald-100 text-emerald-700"
                        : currentStep === index
                          ? "border-slate-900 bg-slate-900 text-white"
                          : "border-slate-200 bg-slate-100 text-slate-500"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span className="hidden sm:inline">{label}</span>
                  {index < 3 && <span className="h-px w-6 bg-slate-200" />}
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              {currentStep === 0 && (
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Step 1</p>
                  <p className="text-lg font-bold text-slate-900">Open a live referral link</p>
                  <p className="text-xs text-slate-600">
                    This should load the ambassador referral page in a new tab.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-full"
                      disabled={!canRunWalkthrough}
                      onClick={() => {
                        if (result?.sampleReferralLink) {
                          window.open(result.sampleReferralLink, "_blank", "noopener,noreferrer");
                        }
                      }}
                    >
                      Open referral page
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-full"
                      disabled={!canRunWalkthrough}
                      onClick={verifyAttributionCookie}
                    >
                      {cookieLoading ? "Checking..." : "Check attribution cookie"}
                    </Button>
                    <Button
                      type="button"
                      className="rounded-full bg-slate-900 text-white hover:bg-slate-800"
                      disabled={!canRunWalkthrough}
                      onClick={async () => {
                        await logQaEvent("link_visit", "Referral link opened");
                        markStepComplete(0);
                      }}
                    >
                      Mark step complete
                    </Button>
                  </div>
                  {cookieStatus && (
                    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700">
                      {cookieStatus.hasAttribution
                        ? `Attribution active (${cookieStatus.daysRemaining ?? 0} days left).`
                        : cookieStatus.message ?? "No attribution cookie found yet."}
                    </div>
                  )}
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Step 2</p>
                  <p className="text-lg font-bold text-slate-900">Submit a test signup</p>
                  <p className="text-xs text-slate-600">
                    Complete the referral form on the page, then log the submission.
                  </p>
                  <Button
                    type="button"
                    className="rounded-full bg-slate-900 text-white hover:bg-slate-800"
                    disabled={!canRunWalkthrough}
                    onClick={async () => {
                      await logQaEvent("signup_submitted", "Form submitted");
                      markStepComplete(1);
                    }}
                  >
                    Mark step complete
                  </Button>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Step 3</p>
                  <p className="text-lg font-bold text-slate-900">Book a meeting (if applicable)</p>
                  <p className="text-xs text-slate-600">
                    Click the scheduling CTA from the referral flow.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-full"
                      disabled={!canRunWalkthrough}
                      onClick={() => markStepComplete(2)}
                    >
                      Skip this step
                    </Button>
                    <Button
                      type="button"
                      className="rounded-full bg-slate-900 text-white hover:bg-slate-800"
                      disabled={!canRunWalkthrough}
                      onClick={async () => {
                        await logQaEvent("schedule_call_clicked", "Meeting booked");
                        markStepComplete(2);
                      }}
                    >
                      Mark step complete
                    </Button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Step 4</p>
                  <p className="text-lg font-bold text-slate-900">Complete a test transaction</p>
                  <p className="text-xs text-slate-600">
                    Use the discount code in your checkout or booking flow, then confirm the
                    conversion was captured.
                  </p>
                  <Button
                    type="button"
                    className="rounded-full bg-slate-900 text-white hover:bg-slate-800"
                    disabled={!canRunWalkthrough}
                    onClick={async () => {
                      await logQaEvent("conversion_completed", "Order completed");
                      markStepComplete(3);
                    }}
                  >
                    Mark step complete
                  </Button>
                </div>
              )}
            </div>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 px-3 py-3 text-xs text-emerald-900">
              After each step, check Measure ROI → Interaction Hub + Recent Activity to confirm
              attribution. Your QA events are labeled “ambassador_qa”.
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              onClick={() => setDialogOpen(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
