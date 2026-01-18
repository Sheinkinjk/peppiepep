"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Copy,
  Check,
  Link2,
  Target,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

type AttributionHealth = {
  healthy: boolean;
  status?: "good" | "warning" | "critical" | "no_data";
  recommendation?: string;
  metrics?: {
    last7Days?: {
      linkVisits?: number;
      linkVisitsAttributed?: number;
      signups?: number;
      signupsAttributed?: number;
      conversions?: number;
      conversionsAttributed?: number;
      referrals?: number;
      referralsAttributed?: number;
      attributionRate?: string;
    };
  };
  error?: string;
};

type AttributionCookieStatus = {
  hasAttribution: boolean;
  reason?: string;
  message?: string;
  daysRemaining?: number;
};

type QaSummary = {
  lastDetectedAt: string | null;
  recentCount: number;
  eventTypes: string[];
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
  const [copiedLanding, setCopiedLanding] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [qaConfirmOpen, setQaConfirmOpen] = useState(false);
  const [qaCleanupConfirmOpen, setQaCleanupConfirmOpen] = useState(false);
  const [qaResultsHint, setQaResultsHint] = useState(false);
  const [qaSummary, setQaSummary] = useState<QaSummary>({
    lastDetectedAt: null,
    recentCount: 0,
    eventTypes: [],
  });
  const [isQaRunning, setIsQaRunning] = useState(false);
  const [isQaCleanupRunning, setIsQaCleanupRunning] = useState(false);
  const [healthCheck, setHealthCheck] = useState<AttributionHealth | null>(null);
  const [healthCheckedAt, setHealthCheckedAt] = useState<string | null>(null);
  const [cookieCheck, setCookieCheck] = useState<AttributionCookieStatus | null>(null);
  const [isHealthRunning, setIsHealthRunning] = useState(false);
  const [isCookieRunning, setIsCookieRunning] = useState(false);

  const normalizedSite = siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl;
  const exampleLandingUrl = `${normalizedSite}/landing`;
  const exampleReferralUrl = testReferralCode
    ? `${normalizedSite}/r/${testReferralCode}`
    : `${normalizedSite}/r/[ambassador-code]`;
  const referredPageUrl = `${normalizedSite}/referred`;

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

  const runHealthCheck = async () => {
    if (isHealthRunning) return null;
    setIsHealthRunning(true);
    try {
      const response = await fetch("/api/health/attribution");
      const data = (await response.json()) as AttributionHealth;
      setHealthCheck(data);
      setHealthCheckedAt(new Date().toISOString());
      return data;
    } catch {
      setHealthCheck({ healthy: false, error: "Unable to load attribution health." });
      return null;
    } finally {
      setIsHealthRunning(false);
    }
  };

  const runCookieCheck = async () => {
    if (isCookieRunning) return;
    setIsCookieRunning(true);
    try {
      const response = await fetch("/api/verify-attribution");
      const data = (await response.json()) as AttributionCookieStatus;
      setCookieCheck(data);
    } catch {
      setCookieCheck({ hasAttribution: false, reason: "error", message: "Unable to read attribution cookie." });
    } finally {
      setIsCookieRunning(false);
    }
  };

  const checkRecentQaEvents = useCallback(async () => {
    try {
      const response = await fetch("/api/referral-events");
      if (!response.ok) return;
      const payload = (await response.json()) as {
        events?: Array<{
          created_at?: string | null;
          event_type?: string | null;
          source?: string | null;
          metadata?: Record<string, unknown> | null;
        }>;
      };
      const events = payload.events ?? [];
      const cutoff = Date.now() - 10 * 60 * 1000;
      const recentQaEvents = events
        .filter((event) => {
          const createdAt = event.created_at ? Date.parse(event.created_at) : 0;
          const isQaSource = event.source === "integration_qa";
          const isQaMeta = Boolean(event.metadata && event.metadata["qa_simulated"]);
          return createdAt >= cutoff && (isQaSource || isQaMeta);
        })
        .sort((a, b) => Date.parse(b.created_at ?? "") - Date.parse(a.created_at ?? ""));

      const uniqueTypes: string[] = [];
      for (const event of recentQaEvents) {
        const type = event.event_type?.trim();
        if (!type) continue;
        if (!uniqueTypes.includes(type)) uniqueTypes.push(type);
      }

      setQaSummary({
        lastDetectedAt: recentQaEvents[0]?.created_at ?? null,
        recentCount: recentQaEvents.length,
        eventTypes: uniqueTypes.slice(0, 8),
      });
    } catch {
      setQaSummary({ lastDetectedAt: null, recentCount: 0, eventTypes: [] });
    }
  }, []);

  useEffect(() => {
    checkRecentQaEvents();
  }, [checkRecentQaEvents]);

  const formatRelativeTime = (iso: string | null) => {
    if (!iso) return "No QA yet";
    const date = new Date(iso);
    const delta = Date.now() - date.getTime();
    const mins = Math.floor(delta / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const runIntegrationQa = async () => {
    if (isQaRunning) return;
    setIsQaRunning(true);
    const events = [
      { eventType: "link_visit", label: "Referral link opened" },
      { eventType: "signup_submitted", label: "Form submitted" },
      { eventType: "schedule_call_clicked", label: "Meeting booked" },
      { eventType: "conversion_completed", label: "Order completed" },
    ];

    try {
      for (const event of events) {
        const response = await fetch("/api/referral-events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            businessId,
            eventType: event.eventType,
            source: "integration_qa",
            device: "dashboard",
            metadata: {
              qa_simulated: true,
              qa_label: event.label,
              qa_step: "1D",
            },
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to log ${event.eventType}`);
        }
      }

      toast({
        title: "Integration QA logged",
        description: "Test events are now visible in Measure ROI and Recent Activity.",
      });
      setQaResultsHint(true);
      await checkRecentQaEvents();
    } catch (error) {
      console.error("Integration QA failed:", error);
      toast({
        variant: "destructive",
        title: "Integration QA failed",
        description: "We couldn't log the test events. Please try again.",
      });
    } finally {
      setIsQaRunning(false);
    }
  };

  const cleanupIntegrationQa = async () => {
    if (isQaCleanupRunning) return;
    setIsQaCleanupRunning(true);
    try {
      const response = await fetch("/api/referral-events/cleanup-qa", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to clean QA events");
      }

      const result = await response.json().catch(() => ({}));
      toast({
        title: "Integration QA cleared",
        description: `${result.deleted ?? 0} QA events removed from Measure ROI.`,
      });
      setQaResultsHint(false);
      setQaSummary({ lastDetectedAt: null, recentCount: 0, eventTypes: [] });
    } catch (error) {
      console.error("QA cleanup failed:", error);
      toast({
        variant: "destructive",
        title: "Cleanup failed",
        description: "We couldn't remove QA events. Please try again.",
      });
    } finally {
      setIsQaCleanupRunning(false);
    }
  };

  const handleJumpToQaResults = () => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(
      new CustomEvent("dashboard:navigate", {
        detail: { section: "performance", scrollTo: "measure-roi-interaction-hub" },
      }),
    );
  };

  const qaStatusItems = [
    {
      label: "Program settings saved",
      status: hasProgramSettings ? "pass" : "fail",
      detail: hasProgramSettings ? "Rewards + offer configured" : "Complete Step 1B settings",
    },
    {
      label: "Ambassadors added",
      status: hasCustomers ? "pass" : "fail",
      detail: hasCustomers ? "Referral links active" : "Add ambassadors in Step 2",
    },
    {
      label: "Attribution health",
      status: healthCheck ? (healthCheck.healthy ? "pass" : "fail") : "pending",
      detail: healthCheck?.recommendation || healthCheck?.error || "Run attribution health check",
    },
    {
      label: "Attribution cookie",
      status: cookieCheck ? (cookieCheck.hasAttribution ? "pass" : "fail") : "pending",
      detail: cookieCheck?.message || "Open a referral link then check cookie",
    },
    {
      label: "QA events logged",
      status: qaSummary.recentCount > 0 ? "pass" : "pending",
      detail:
        qaSummary.recentCount > 0
          ? `${qaSummary.recentCount} events in last 10 min`
          : "Run Integration QA to log test events",
    },
  ] as const;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
        <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
          QA status
        </span>
        <span className="font-semibold text-slate-800">
          {qaSummary.recentCount > 0
            ? `${qaSummary.recentCount} QA event${qaSummary.recentCount > 1 ? "s" : ""} in last 10m`
            : "No QA events detected in last 10m"}
        </span>
        <span className="text-xs text-slate-500">
          Last seen: {formatRelativeTime(qaSummary.lastDetectedAt)}
        </span>
      </div>
      {/* Header */}
      <div className="rounded-3xl border border-blue-200 bg-white p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-blue-600 p-2">
            <ShieldCheck className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">Testing & QA</p>
            <h2 className="text-lg font-black text-slate-900 leading-tight">Confirm referral tracking works</h2>
            <p className="text-xs text-slate-600">
              Run the quick checks below: open landing pages, verify cookies, and log QA events.
            </p>
          </div>
        </div>
      </div>

      <Dialog open={qaConfirmOpen} onOpenChange={setQaConfirmOpen}>
        <DialogContent className="max-w-md md:max-w-lg max-h-[80vh] overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-black text-slate-900">Run Integration QA</DialogTitle>
            <DialogDescription className="text-sm text-slate-600">
              This will simulate the full QA flow and log test events into Measure ROI so you can confirm attribution end-to-end.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 text-sm text-emerald-900">
            <p className="font-semibold">Events that will be logged:</p>
            <ul className="space-y-1 text-sm text-emerald-900/90">
              <li>• Referral link opened</li>
              <li>• Form submitted</li>
              <li>• Meeting booked</li>
              <li>• Order completed</li>
            </ul>
          </div>
          <div className="mt-4 space-y-2 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Where the test data should appear:</p>
            <ul className="space-y-1">
              <li>• Measure ROI → Interaction Hub (counts increment)</li>
              <li>• Measure ROI → Recent Interaction Activity (source shows “integration_qa”)</li>
              <li>• Measure ROI → Journey timeline (events listed per ambassador)</li>
            </ul>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              onClick={() => {
                setQaConfirmOpen(false);
                handleJumpToQaResults();
              }}
            >
              Jump to QA results
            </Button>
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              onClick={() => setQaConfirmOpen(false)}
              disabled={isQaRunning}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="rounded-full bg-emerald-600 text-white hover:bg-emerald-700"
              onClick={async () => {
                setQaConfirmOpen(false);
                await runIntegrationQa();
              }}
              disabled={isQaRunning}
            >
              {isQaRunning ? "Running..." : "Confirm & run QA"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={qaCleanupConfirmOpen} onOpenChange={setQaCleanupConfirmOpen}>
        <DialogContent className="max-w-md md:max-w-lg max-h-[80vh] overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-black text-slate-900">Clear QA Events</DialogTitle>
            <DialogDescription className="text-sm text-slate-600">
              This removes QA test events from Measure ROI and Recent Activity so your dashboard reflects only live traffic.
            </DialogDescription>
          </DialogHeader>
	          <div className="mt-4 space-y-2 rounded-2xl border border-rose-200 bg-rose-50/70 p-4 text-sm text-rose-900">
	            <p className="font-semibold">This will delete QA data from:</p>
            <ul className="space-y-1 text-rose-900/90">
              <li>• Measure ROI → Interaction Hub counts</li>
              <li>• Measure ROI → Recent Interaction Activity list</li>
              <li>• Measure ROI → Journey timeline</li>
            </ul>
	            <p className="mt-2 text-xs text-rose-900/80">
	              Only events tagged as simulated QA (<span className="font-semibold">source = integration_qa</span> and{" "}
	              <span className="font-semibold">metadata.qa_simulated = true</span>) are removed. This does not touch
	              referrals, customers, conversions, or revenue data.
	            </p>
	          </div>
          <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              onClick={() => setQaCleanupConfirmOpen(false)}
              disabled={isQaCleanupRunning}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="rounded-full bg-slate-900 text-white hover:bg-slate-800"
              onClick={async () => {
                setQaCleanupConfirmOpen(false);
                await cleanupIntegrationQa();
              }}
              disabled={isQaCleanupRunning}
            >
              {isQaCleanupRunning ? "Clearing..." : "Confirm & clear QA"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Step 1D-1: Landing page build */}
      <div className="rounded-2xl border border-purple-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-3 mb-4">
          <div className="rounded-lg bg-purple-600 p-2">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-900">Create my referral landing page</p>
            <p className="text-xs text-slate-500 mt-1">
              This is the page ambassadors share. It must load fast, show the offer clearly, and keep attribution intact.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border border-purple-200 bg-purple-50/60 p-4 text-xs text-slate-700">
            <p className="font-semibold text-purple-900 mb-2">Landing page structure</p>
            <div className="space-y-2">
              <p>
                <strong>URL format:</strong>{" "}
                <code className="bg-white px-2 py-1 rounded text-xs">{exampleLandingUrl}</code>
              </p>
              <p>
                <strong>Ambassador link:</strong>{" "}
                <code className="bg-white px-2 py-1 rounded text-xs">{exampleReferralUrl}</code>
              </p>
              <p className="text-slate-600">
                Ambassador links redirect to your landing page and set the attribution cookie.
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold text-slate-900 mb-3">Landing page checklist</p>
            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Clear offer + CTA</p>
                  <p className="text-slate-600">Use one primary CTA and highlight the referral reward.</p>
                </div>
              </div>
              <div className="flex gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Mobile-first layout</p>
                  <p className="text-slate-600">Most ambassador traffic comes from mobile shares.</p>
                </div>
              </div>
              <div className="flex gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Attribution intact</p>
                  <p className="text-slate-600">No stripping of UTM parameters or query strings.</p>
                </div>
              </div>
            </div>
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
            <div className="grid gap-2 sm:grid-cols-2">
              <Button
                onClick={() => window.open(exampleReferralUrl, "_blank")}
                variant="outline"
                className="w-full"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open referral link
              </Button>
              <Button
                onClick={() => window.open(testLandingUrl || exampleLandingUrl, "_blank")}
                className="w-full"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Test Landing Page
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Step 1D-2: Referred page test */}
      <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-6 shadow-sm">
        <div className="flex items-start gap-3 mb-4">
          <div className="rounded-lg bg-blue-600 p-2">
            <ExternalLink className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-blue-900">Test the ambassador handoff page</p>
            <p className="text-xs text-blue-800/80 mt-1">
              This is the page prospects see once attribution is set (ex: <span className="font-semibold">{referredPageUrl}</span>).
            </p>
          </div>
        </div>

        <ol className="space-y-2 text-xs text-blue-900 list-decimal list-inside">
          <li>Open an ambassador link (ex: <code className="bg-white px-1.5 py-0.5 rounded">{exampleReferralUrl}</code>) to set the cookie.</li>
          <li>Confirm the landing page loads with the offer and CTA.</li>
          <li>Open the referred page to verify attribution + form load.</li>
        </ol>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <Button type="button" onClick={() => window.open(exampleReferralUrl, "_blank")} variant="outline">
            Open ambassador link
          </Button>
          <Button type="button" onClick={() => window.open(referredPageUrl, "_blank")}>
            Open /referred page
          </Button>
        </div>
        <p className="mt-3 text-xs text-blue-800/80">
          If /referred redirects to the home page, the attribution cookie is missing—open the ambassador link again.
        </p>
      </div>

	      {/* QA Readiness Checks */}
	      <div
	        id="integration-qa-panel"
	        className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6 shadow-sm"
	      >
        <div className="flex items-start gap-3 mb-4">
          <div className="rounded-lg bg-emerald-600 p-2">
            <Target className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-emerald-900">QA readiness checks</p>
            <p className="text-xs text-emerald-800/80 mt-1">
              Confirm attribution health, cookie setup, and test events before inviting ambassadors.
            </p>
            {qaSummary.lastDetectedAt && (
              <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-[11px] font-semibold text-emerald-800">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                QA verified in the last 10 minutes ({qaSummary.recentCount} events)
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {qaStatusItems.map((item) => {
            const tone =
              item.status === "pass"
                ? "border-emerald-200 bg-white"
                : item.status === "fail"
                  ? "border-amber-200 bg-amber-50"
                  : "border-slate-200 bg-white";
            return (
              <div key={item.label} className={`rounded-xl border px-4 py-3 text-xs text-slate-700 ${tone}`}>
                <div className="flex items-start gap-2">
                  {item.status === "pass" ? (
                    <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5" />
                  ) : item.status === "fail" ? (
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                  ) : (
                    <ShieldCheck className="h-4 w-4 text-slate-400 mt-0.5" />
                  )}
                  <div>
                    <p className="font-semibold text-slate-900">{item.label}</p>
                    <p className="text-[11px] text-slate-500">{item.detail}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            onClick={() => setQaConfirmOpen(true)}
            className="rounded-full bg-emerald-700 text-white hover:bg-emerald-800"
            disabled={isQaRunning || isQaCleanupRunning}
          >
            {isQaRunning ? "Running QA..." : "Run Integration QA"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setQaCleanupConfirmOpen(true)}
            className="rounded-full"
            disabled={isQaCleanupRunning || isQaRunning}
          >
            {isQaCleanupRunning ? "Clearing..." : "Clear QA Events"}
          </Button>
        </div>

        {qaResultsHint && (
          <div className="mt-3 rounded-xl border border-emerald-200 bg-white px-3 py-2 text-xs text-emerald-900">
            <span className="font-semibold">QA events logged.</span>{" "}
            Navigate to Measure ROI to verify Interaction Hub + Recent Activity.
          </div>
        )}

        {qaSummary.lastDetectedAt && (
          <div className="mt-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-700">
            <p className="font-semibold text-slate-900">Latest QA snapshot</p>
            <p className="mt-1 text-[11px] text-slate-500">
              Last event: {new Date(qaSummary.lastDetectedAt).toLocaleString()} · {qaSummary.recentCount} events in the last 10 minutes
            </p>
            {qaSummary.eventTypes.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {qaSummary.eventTypes.map((type) => (
                  <span key={type} className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-semibold text-slate-700">
                    {type}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-2">
              <Button type="button" size="sm" variant="outline" className="rounded-full" onClick={handleJumpToQaResults}>
                Jump to QA results
              </Button>
            </div>
          </div>
        )}

        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Attribution health</p>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="rounded-full"
                onClick={runHealthCheck}
                disabled={isHealthRunning}
              >
                {isHealthRunning ? "Running..." : "Run check"}
              </Button>
            </div>
            {healthCheck ? (
              <div className="mt-2 text-xs text-slate-700">
                <p className="font-semibold">
                  Status:{" "}
                  <span className="uppercase">
                    {healthCheck.status ?? (healthCheck.healthy ? "good" : "error")}
                  </span>
                </p>
                <p>{healthCheck.recommendation ?? healthCheck.error}</p>
                {healthCheckedAt && (
                  <p className="text-[11px] text-slate-400">
                    Last checked {new Date(healthCheckedAt).toLocaleString()}
                  </p>
                )}
                {healthCheck.metrics?.last7Days && (
                  <div className="mt-2 space-y-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2 text-[11px] text-slate-700">
                    <p>
                      Link opens: {healthCheck.metrics.last7Days.linkVisitsAttributed ?? 0}/
                      {healthCheck.metrics.last7Days.linkVisits ?? 0} attributed
                    </p>
                    <p>
                      Form submits: {healthCheck.metrics.last7Days.signupsAttributed ?? 0}/
                      {healthCheck.metrics.last7Days.signups ?? 0} attributed
                    </p>
                    <p>
                      Orders: {healthCheck.metrics.last7Days.conversionsAttributed ?? 0}/
                      {healthCheck.metrics.last7Days.conversions ?? 0} attributed
                    </p>
                    <p>
                      Referrals: {healthCheck.metrics.last7Days.referralsAttributed ?? 0}/
                      {healthCheck.metrics.last7Days.referrals ?? 0} attributed
                    </p>
                    <p className="font-semibold">
                      Attribution rate: {healthCheck.metrics.last7Days.attributionRate ?? "N/A"}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <p className="mt-2 text-xs text-slate-600">
                Confirms your attribution health and recent link activity.
              </p>
            )}
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Attribution cookie</p>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="rounded-full"
                onClick={runCookieCheck}
                disabled={isCookieRunning}
              >
                {isCookieRunning ? "Checking..." : "Check cookie"}
              </Button>
            </div>
            {cookieCheck ? (
              <div className="mt-2 flex items-start gap-2 text-xs text-slate-700">
                {cookieCheck.hasAttribution ? (
                  <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                )}
                <div>
                  <p className="font-semibold">
                    {cookieCheck.hasAttribution ? "Attribution active" : "No attribution cookie"}
                  </p>
                  <p>{cookieCheck.message ?? "Open a referral link to set the cookie."}</p>
                </div>
              </div>
            ) : (
              <p className="mt-2 text-xs text-slate-600">
                Open a referral link, then check to confirm tracking is stored.
              </p>
            )}
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-600">
          <p className="font-semibold text-slate-900">Where to confirm results:</p>
          <ul className="mt-2 space-y-1">
            <li>• Measure ROI → Interaction Hub (counts increment)</li>
            <li>• Measure ROI → Recent Interaction Activity (source shows “integration_qa”)</li>
            <li>• Measure ROI → Journey timeline (events listed per ambassador)</li>
          </ul>
        </div>
      </div>

    </div>
  );
}
