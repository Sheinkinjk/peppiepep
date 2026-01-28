"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, ArrowRight, X, CheckCircle2, Globe2, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PrerequisiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
  pagesPublished: boolean;
  hostConfigured: boolean;
}

export function PrerequisiteModal({
  isOpen,
  onClose,
  onProceed,
  pagesPublished,
  hostConfigured,
}: PrerequisiteModalProps) {
  const [isClosing, setIsClosing] = useState(false);

  const allPrerequisitesMet = pagesPublished && hostConfigured;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  };

  const handleNavigateToPages = () => {
    handleClose();
    // Navigate to Pages tab
    window.dispatchEvent(
      new CustomEvent("dashboard:navigate", {
        detail: { section: "pages", scrollTo: "page-builder-panel" },
      })
    );
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-200",
        isClosing ? "opacity-0" : "opacity-100"
      )}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={cn(
          "relative mx-4 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl transition-all duration-200",
          isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
        )}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className={cn(
            "h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0",
            allPrerequisitesMet ? "bg-emerald-100" : "bg-amber-100"
          )}>
            {allPrerequisitesMet ? (
              <CheckCircle2 className="h-6 w-6 text-emerald-600" />
            ) : (
              <AlertTriangle className="h-6 w-6 text-amber-600" />
            )}
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900">
              {allPrerequisitesMet ? "Ready to Add Partners" : "Setup Required First"}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              {allPrerequisitesMet
                ? "Your pages are configured. You can now add partners and generate referral links."
                : "Before adding partners, you need to configure where your referral pages will live."
              }
            </p>
          </div>
        </div>

        {/* Prerequisites checklist */}
        <div className="space-y-3 mb-6">
          <div className={cn(
            "flex items-center gap-3 p-3 rounded-xl border",
            hostConfigured
              ? "border-emerald-200 bg-emerald-50"
              : "border-amber-200 bg-amber-50"
          )}>
            <div className={cn(
              "h-8 w-8 rounded-lg flex items-center justify-center",
              hostConfigured ? "bg-emerald-100" : "bg-amber-100"
            )}>
              <Globe2 className={cn("h-4 w-4", hostConfigured ? "text-emerald-600" : "text-amber-600")} />
            </div>
            <div className="flex-1">
              <p className={cn(
                "text-sm font-semibold",
                hostConfigured ? "text-emerald-900" : "text-amber-900"
              )}>
                Website host configured
              </p>
              <p className={cn(
                "text-xs",
                hostConfigured ? "text-emerald-700" : "text-amber-700"
              )}>
                {hostConfigured
                  ? "Your domain or hosting is set up"
                  : "Set your domain in Pages → Host & Paths"
                }
              </p>
            </div>
            {hostConfigured && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
          </div>

          <div className={cn(
            "flex items-center gap-3 p-3 rounded-xl border",
            pagesPublished
              ? "border-emerald-200 bg-emerald-50"
              : "border-amber-200 bg-amber-50"
          )}>
            <div className={cn(
              "h-8 w-8 rounded-lg flex items-center justify-center",
              pagesPublished ? "bg-emerald-100" : "bg-amber-100"
            )}>
              <Link2 className={cn("h-4 w-4", pagesPublished ? "text-emerald-600" : "text-amber-600")} />
            </div>
            <div className="flex-1">
              <p className={cn(
                "text-sm font-semibold",
                pagesPublished ? "text-emerald-900" : "text-amber-900"
              )}>
                Pages published
              </p>
              <p className={cn(
                "text-xs",
                pagesPublished ? "text-emerald-700" : "text-amber-700"
              )}>
                {pagesPublished
                  ? "/referral and /referred are ready"
                  : "Save & publish your pages first"
                }
              </p>
            </div>
            {pagesPublished && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
          </div>
        </div>

        {/* Explanation */}
        {!allPrerequisitesMet && (
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 mb-6">
            <p className="text-sm text-blue-900 font-semibold mb-2">Why is this needed?</p>
            <p className="text-xs text-blue-800 leading-relaxed">
              Referral links (like /r/abc123) redirect to your /referral page. Without a configured host and published pages, your partner links won&apos;t work correctly. Set up your pages first, then add partners.
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          {allPrerequisitesMet ? (
            <>
              <Button
                onClick={handleClose}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  handleClose();
                  onProceed();
                }}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              >
                Continue Adding Partners
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={handleClose}
                variant="outline"
                className="flex-1"
              >
                I&apos;ll do this later
              </Button>
              <Button
                onClick={handleNavigateToPages}
                className="flex-1 bg-slate-900 hover:bg-slate-800"
              >
                Go to Pages Setup
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
