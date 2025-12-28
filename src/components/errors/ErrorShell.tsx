"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { AlertTriangle, ArrowLeft, Activity, Home, LogIn, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

function buildNextParam(pathname: string | null, searchParams: URLSearchParams | null) {
  const safePathname = pathname ?? "/";
  const search = searchParams?.toString() ?? "";
  return `${safePathname}${search ? `?${search}` : ""}`;
}

function looksLikeConfigOrIntegrationIssue(error?: Error | null) {
  const message = error?.message ?? "";
  return /ADMIN_REFERRAL_CODE|SUPABASE|STRIPE|RESEND|TWILIO|WEBHOOK|environment variable|not set|missing/i.test(
    message,
  );
}

type ErrorShellProps = {
  title: string;
  message: string;
  error?: (Error & { digest?: string }) | null;
  reset?: (() => void) | null;
  primaryCtaLabel?: string;
  showGoHome?: boolean;
  showGoBack?: boolean;
  showLogin?: boolean;
};

export function ErrorShell({
  title,
  message,
  error,
  reset,
  primaryCtaLabel = "Try again",
  showGoHome = true,
  showGoBack = true,
  showLogin = true,
}: ErrorShellProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const nextParam = useMemo(
    () => buildNextParam(pathname, searchParams),
    [pathname, searchParams],
  );

  const showIntegrationHelp = looksLikeConfigOrIntegrationIssue(error);

  useEffect(() => {
    if (!error) return;
    console.error("Error caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 via-white to-white px-4">
      <Card className="max-w-md w-full p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-red-100 to-rose-100 shadow-lg shadow-red-200/50">
            <AlertTriangle className="h-10 w-10 text-red-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3">{title}</h1>
        <p className="text-gray-600 mb-6">{message}</p>

        {showIntegrationHelp && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-left">
            <p className="text-sm text-amber-900 font-semibold mb-2">
              This looks like a configuration or integration issue.
            </p>
            <ul className="text-sm text-amber-800 space-y-1 list-disc list-inside">
              <li>Open the Status page to see what’s missing</li>
              <li>Confirm env vars are set in Vercel (then redeploy)</li>
              <li>If this is a webhook, confirm the signing token matches</li>
            </ul>
          </div>
        )}

        {process.env.NODE_ENV === "development" && error && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 text-left">
            <p className="text-xs font-mono text-gray-700 break-all">{error.message}</p>
            {error.digest && (
              <p className="text-xs text-gray-500 mt-2">Error ID: {error.digest}</p>
            )}
          </div>
        )}

        <div className="space-y-3">
          {reset && (
            <Button
              onClick={reset}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3.5 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/30"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              {primaryCtaLabel}
            </Button>
          )}

          <Button
            asChild
            variant="outline"
            className="w-full border-2 border-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-50"
          >
            <Link href="/status">
              <Activity className="mr-2 h-4 w-4" />
              Status page
            </Link>
          </Button>

          {showLogin && (
            <Button
              asChild
              variant="outline"
              className="w-full border-2 border-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-50"
            >
              <Link href={`/login?next=${encodeURIComponent(nextParam)}`}>
                <LogIn className="mr-2 h-4 w-4" />
                Log in and continue
              </Link>
            </Button>
          )}

          {showGoBack && (
            <Button
              type="button"
              onClick={() => window.history.back()}
              variant="outline"
              className="w-full border-2 border-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go back
            </Button>
          )}

          {showGoHome && (
            <Button
              asChild
              variant="outline"
              className="w-full border-2 border-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-50"
            >
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go to homepage
              </Link>
            </Button>
          )}

          <Button
            asChild
            variant="link"
            className="w-full text-gray-600 font-medium py-2 px-6 rounded-lg hover:text-gray-900 text-sm"
          >
            <Link href="/contact">Contact support</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}

