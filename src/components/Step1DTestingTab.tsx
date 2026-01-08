"use client";

import { useState } from "react";
import {
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Copy,
  Check,
  Link2,
  Target,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

type Step1DTestingTabProps = {
  businessId: string;
  siteUrl: string;
  businessName: string;
  discountCaptureSecret?: string | null;
  hasCustomers: boolean;
  hasProgramSettings: boolean;
};

export function Step1DTestingTab({
  businessId,
  siteUrl,
  businessName,
  discountCaptureSecret,
  hasCustomers,
  hasProgramSettings,
}: Step1DTestingTabProps) {
  const [testLandingUrl, setTestLandingUrl] = useState("");
  const [testReferralCode, setTestReferralCode] = useState("");
  const [testingStatus, setTestingStatus] = useState<"idle" | "testing" | "success" | "error">("idle");
  const [copiedLanding, setCopiedLanding] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const exampleLandingUrl = `${siteUrl}/landing`;
  const exampleReferralUrl = testReferralCode
    ? `${siteUrl}/r/${testReferralCode}`
    : `${siteUrl}/r/[ambassador-code]`;

  const copyToClipboard = async (text: string, type: "landing" | "code") => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "landing") {
        setCopiedLanding(true);
        setTimeout(() => setCopiedLanding(false), 2000);
      } else {
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
      }
      toast({
        title: "Copied!",
        description: "URL copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please copy manually",
        variant: "destructive",
      });
    }
  };

  const testAttributionCookies = async () => {
    setTestingStatus("testing");

    try {
      // Test if attribution endpoint is working
      const response = await fetch("/api/health/attribution");
      const data = await response.json();

      if (data.healthy) {
        setTestingStatus("success");
        toast({
          title: "Attribution System Healthy",
          description: `Attribution rate: ${data.metrics?.last7Days?.attributionRate || "N/A"}`,
        });
      } else {
        setTestingStatus("error");
        toast({
          title: "Attribution Issues Detected",
          description: data.recommendation || "Check your integration setup",
          variant: "destructive",
        });
      }
    } catch (error) {
      setTestingStatus("error");
      toast({
        title: "Test Failed",
        description: "Could not connect to attribution system",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-3xl border-2 border-blue-200 bg-white/95 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
          <div className="rounded-2xl bg-blue-600 p-3 shadow-lg">
            <ShieldCheck className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">
              Step 1D · Testing & QA
            </p>
            <h2 className="text-2xl font-black text-slate-900 leading-tight">
              Test your referral system end-to-end
            </h2>
            <p className="text-sm text-slate-600">
              Verify that landing pages, attribution cookies, and referral tracking are working correctly before going live.
            </p>
          </div>
        </div>
      </div>

      {/* Connect to Landing Page */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-3 mb-4">
          <div className="rounded-lg bg-emerald-100 p-2">
            <Link2 className="h-5 w-5 text-emerald-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-900">Connect to your landing page</p>
            <p className="text-xs text-slate-500 mt-1">
              Your ambassadors will send their network to this page with their unique referral code
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="landing-url" className="text-xs font-semibold text-slate-700">
              Landing Page URL
            </Label>
            <p className="text-xs text-slate-500 mb-2">
              This should be the page where you want referred customers to land (e.g., {exampleLandingUrl})
            </p>
            <div className="flex gap-2">
              <Input
                id="landing-url"
                type="url"
                placeholder={exampleLandingUrl}
                value={testLandingUrl}
                onChange={(e) => setTestLandingUrl(e.target.value)}
                className="flex-1"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(testLandingUrl || exampleLandingUrl, "landing")}
              >
                {copiedLanding ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="test-code" className="text-xs font-semibold text-slate-700">
              Test with Ambassador Code
            </Label>
            <p className="text-xs text-slate-500 mb-2">
              Enter an ambassador's referral code to test the full attribution flow
            </p>
            <div className="flex gap-2">
              <Input
                id="test-code"
                type="text"
                placeholder="ambassador-code"
                value={testReferralCode}
                onChange={(e) => setTestReferralCode(e.target.value)}
                className="flex-1"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(exampleReferralUrl, "code")}
              >
                {copiedCode ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {testReferralCode && (
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <p className="text-xs font-semibold text-blue-900 mb-2">Test URL Generated:</p>
              <code className="text-xs text-blue-700 break-all block">
                {exampleReferralUrl}
              </code>
              <p className="text-xs text-blue-600 mt-2">
                Open this link in incognito mode to test attribution cookie setting
              </p>
            </div>
          )}

          {(testLandingUrl || testReferralCode) && (
            <Button
              onClick={() => window.open(testLandingUrl || exampleLandingUrl, "_blank")}
              className="w-full"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Test Landing Page
            </Button>
          )}
        </div>
      </div>

      {/* System QA Snapshot */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-3 mb-4">
          <div className="rounded-lg bg-purple-100 p-2">
            <Target className="h-5 w-5 text-purple-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-900">System QA snapshot</p>
            <p className="text-xs text-slate-500 mt-1">
              Test attribution cookies and referral tracking
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            onClick={testAttributionCookies}
            disabled={testingStatus === "testing"}
            className="w-full"
            variant={testingStatus === "success" ? "default" : "outline"}
          >
            {testingStatus === "testing" && <Zap className="h-4 w-4 mr-2 animate-pulse" />}
            {testingStatus === "success" && <CheckCircle className="h-4 w-4 mr-2" />}
            {testingStatus === "error" && <AlertTriangle className="h-4 w-4 mr-2" />}
            {testingStatus === "idle" && "Run Attribution Test"}
            {testingStatus === "testing" && "Testing..."}
            {testingStatus === "success" && "Attribution Working"}
            {testingStatus === "error" && "Test Failed - Retry"}
          </Button>

          {testingStatus === "success" && (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
              <div className="flex items-center gap-2 text-emerald-800">
                <CheckCircle className="h-4 w-4" />
                <p className="text-xs font-semibold">Attribution system is operational</p>
              </div>
              <p className="text-xs text-emerald-700 mt-2">
                Cookies are being set correctly and referral tracking is active
              </p>
            </div>
          )}

          {testingStatus === "error" && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <div className="flex items-center gap-2 text-red-800">
                <AlertTriangle className="h-4 w-4" />
                <p className="text-xs font-semibold">Attribution issues detected</p>
              </div>
              <p className="text-xs text-red-700 mt-2">
                Check Step 1C integrations and ensure attribution tracking is configured
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Go-Live Sanity Check */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-3 mb-4">
          <div className="rounded-lg bg-amber-100 p-2">
            <ShieldCheck className="h-5 w-5 text-amber-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-900">Go-live sanity check</p>
            <p className="text-xs text-slate-500 mt-1">
              Verify all systems before launching campaigns
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 bg-slate-50">
            {hasProgramSettings ? (
              <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <p className="text-sm font-semibold text-slate-900">Program settings configured</p>
              <p className="text-xs text-slate-500">
                {hasProgramSettings
                  ? "Rewards and program details are set"
                  : "Complete Step 2 → Edit Program Settings"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 bg-slate-50">
            {hasCustomers ? (
              <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <p className="text-sm font-semibold text-slate-900">Ambassadors added</p>
              <p className="text-xs text-slate-500">
                {hasCustomers
                  ? "Ambassador base is ready for campaigns"
                  : "Add ambassadors in Step 2 before launching"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 bg-slate-50">
            {testingStatus === "success" ? (
              <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <p className="text-sm font-semibold text-slate-900">Attribution tracking tested</p>
              <p className="text-xs text-slate-500">
                {testingStatus === "success"
                  ? "Cookies and tracking are working correctly"
                  : "Run attribution test above to verify"}
              </p>
            </div>
          </div>

          {discountCaptureSecret && (
            <div className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 bg-slate-50">
              <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Discount capture configured</p>
                <p className="text-xs text-slate-500">
                  Secret key is set for tracking discount code usage
                </p>
              </div>
            </div>
          )}
        </div>

        {hasProgramSettings && hasCustomers && testingStatus === "success" && (
          <div className="mt-4 rounded-lg border-2 border-emerald-200 bg-emerald-50 p-4">
            <div className="flex items-center gap-2 text-emerald-800">
              <CheckCircle className="h-5 w-5" />
              <p className="text-sm font-bold">Ready to go live!</p>
            </div>
            <p className="text-xs text-emerald-700 mt-2">
              All systems are configured and tested. You can proceed to Step 3 to launch your first campaign.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
