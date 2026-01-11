"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sparkles, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { logger } from "@/lib/logger";

interface ScorePartnersButtonProps {
  businessId: string;
  onScoreComplete?: () => void;
  className?: string;
}

export function ScorePartnersButton({ businessId, onScoreComplete, className }: ScorePartnersButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScoring, setIsScoring] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "scoring" | "completed" | "error">("idle");
  const [scoredCount, setScoredCount] = useState<number>(0);

  const triggerScoring = async () => {
    setIsScoring(true);
    setStatus("scoring");

    try {
      // Trigger scoring job
      const response = await fetch("/api/ai/score-referrals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessId,
          forceRescore: false,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to start scoring");
      }

      const result = await response.json();
      setJobId(result.jobId);

      // Poll for completion
      await pollJobStatus(result.jobId);
    } catch (error) {
      logger.error("Failed to score partners:", error);
      setStatus("error");
      toast({
        title: "Scoring failed",
        description: error instanceof Error ? error.message : "Failed to score referral partners",
        variant: "destructive",
      });
    } finally {
      setIsScoring(false);
    }
  };

  const pollJobStatus = async (jobId: string) => {
    const maxAttempts = 60; // 60 seconds max
    let attempts = 0;

    const poll = async (): Promise<void> => {
      if (attempts >= maxAttempts) {
        setStatus("error");
        toast({
          title: "Scoring timeout",
          description: "Scoring is taking longer than expected. Check back in a few minutes.",
          variant: "destructive",
        });
        return;
      }

      attempts++;

      try {
        const response = await fetch(`/api/ai/score-referrals?jobId=${jobId}`);

        if (!response.ok) {
          throw new Error("Failed to check job status");
        }

        const status = await response.json();

        if (status.status === "completed") {
          setStatus("completed");
          setScoredCount(status.output?.scored || 0);
          toast({
            title: "Scoring complete!",
            description: `${status.output?.scored || 0} referral partners analyzed successfully.`,
          });

          // Trigger refresh
          if (onScoreComplete) {
            onScoreComplete();
          }
          return;
        } else if (status.status === "failed") {
          throw new Error(status.error || "Scoring job failed");
        }

        // Still processing, check again in 1 second
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await poll();
      } catch (error) {
        logger.error("Error polling job status:", error);
        setStatus("error");
        toast({
          title: "Error checking status",
          description: error instanceof Error ? error.message : "Failed to check scoring status",
          variant: "destructive",
        });
      }
    };

    await poll();
  };

  const handleClose = () => {
    setIsOpen(false);
    // Reset state after closing
    setTimeout(() => {
      setStatus("idle");
      setJobId(null);
      setScoredCount(0);
    }, 300);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className={className}
        variant="outline"
        size="sm"
      >
        <Sparkles className="mr-2 h-4 w-4 text-purple-500" />
        Score with AI
      </Button>

      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              AI Referral Scoring
            </DialogTitle>
            <DialogDescription>
              Analyze your referral partners to identify high-value contacts and get personalized outreach recommendations.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {status === "idle" && (
              <div className="space-y-3">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-sm font-semibold text-slate-900 mb-2">What gets analyzed:</p>
                  <ul className="space-y-1 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500">•</span>
                      <span>Network size & quality (30%)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500">•</span>
                      <span>Influence & authority (25%)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500">•</span>
                      <span>Engagement likelihood (20%)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500">•</span>
                      <span>Conversion potential (15%)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500">•</span>
                      <span>Historical performance (10%)</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
                  <p className="text-xs text-blue-900">
                    <span className="font-semibold">💡 Tip:</span> This will only score partners that haven't been scored yet. Cost: ~$0.0045 per partner.
                  </p>
                </div>
              </div>
            )}

            {status === "scoring" && (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="h-12 w-12 animate-spin text-purple-500 mb-4" />
                <p className="text-sm font-semibold text-slate-900">Analyzing partners...</p>
                <p className="text-xs text-slate-500 mt-1">This may take 10-30 seconds</p>
              </div>
            )}

            {status === "completed" && (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="rounded-full bg-emerald-100 p-3 mb-4">
                  <CheckCircle2 className="h-12 w-12 text-emerald-600" />
                </div>
                <p className="text-sm font-semibold text-slate-900">Scoring complete!</p>
                <p className="text-xs text-slate-600 mt-1">
                  {scoredCount} partner{scoredCount === 1 ? "" : "s"} analyzed successfully
                </p>
                <p className="text-xs text-slate-500 mt-3">
                  Refresh the table to see AI scores and recommendations
                </p>
              </div>
            )}

            {status === "error" && (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="rounded-full bg-red-100 p-3 mb-4">
                  <XCircle className="h-12 w-12 text-red-600" />
                </div>
                <p className="text-sm font-semibold text-slate-900">Scoring failed</p>
                <p className="text-xs text-slate-600 mt-1">
                  Please try again or contact support if the issue persists
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            {status === "idle" && (
              <>
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button onClick={triggerScoring} disabled={isScoring}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Start AI Scoring
                </Button>
              </>
            )}
            {status === "completed" && (
              <Button onClick={handleClose}>
                Close
              </Button>
            )}
            {status === "error" && (
              <>
                <Button variant="outline" onClick={handleClose}>
                  Close
                </Button>
                <Button onClick={triggerScoring} disabled={isScoring}>
                  Try Again
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
