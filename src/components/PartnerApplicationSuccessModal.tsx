"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

function PartnerApplicationSuccessModalContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (searchParams.get("applied") === "1") {
      setIsOpen(true);
    }
  }, [searchParams]);

  const handleClose = () => {
    setIsOpen(false);
    // Remove the query parameter from URL without page reload
    const url = new URL(window.location.href);
    url.searchParams.delete("applied");
    router.replace(url.pathname + url.search, { scroll: false });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5 text-slate-500" />
        </button>

        {/* Success icon */}
        <div className="flex flex-col items-center text-center p-8">
          <div className="rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 p-4 mb-6 shadow-lg">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-black text-slate-900 mb-3">
            Application Received!
          </h2>

          {/* Message */}
          <p className="text-slate-600 mb-6 leading-relaxed">
            Thank you for applying to our partner program. We'll review your application and be in touch within 24 hours regarding your registration.
          </p>

          {/* Additional info */}
          <div className="w-full p-4 bg-emerald-50 border border-emerald-200 rounded-2xl mb-6">
            <p className="text-sm text-emerald-900">
              <strong>What's next?</strong> Check your email for confirmation details and your unique partner resources.
            </p>
          </div>

          {/* Close button */}
          <Button
            onClick={handleClose}
            className="w-full bg-gradient-to-r from-[#0abab5] to-[#24d9e2] hover:from-[#099a95] hover:to-[#1fc8d1] text-white font-bold py-3 rounded-2xl"
          >
            Got it, thanks!
          </Button>
        </div>
      </div>
    </div>
  );
}

export function PartnerApplicationSuccessModal() {
  return (
    <Suspense fallback={null}>
      <PartnerApplicationSuccessModalContent />
    </Suspense>
  );
}
