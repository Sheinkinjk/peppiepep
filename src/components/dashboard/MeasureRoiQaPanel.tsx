"use client";

import { useState } from "react";
import { ShieldCheck, AlertTriangle, CheckCircle } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type AttributionHealth = {
  healthy: boolean;
  status?: "good" | "warning" | "critical" | "no_data";
  recommendation?: string;
  metrics?: {
    last7Days?: {
      totalApplications?: number;
      attributedApplications?: number;
      attributionRate?: string;
      linkVisits?: number;
    };
  };
  error?: string;
  timestamp?: string;
};

type AttributionCookieStatus = {
  hasAttribution: boolean;
  reason?: string;
  message?: string;
  daysRemaining?: number;
};

export function MeasureRoiQaPanel() {
  const [health, setHealth] = useState<AttributionHealth | null>(null);
  const [cookieStatus, setCookieStatus] = useState<AttributionCookieStatus | null>(null);
  const [healthLoading, setHealthLoading] = useState(false);
  const [cookieLoading, setCookieLoading] = useState(false);

  const runHealthCheck = async () => {
    if (healthLoading) return;
    setHealthLoading(true);
    try {
      const response = await fetch("/api/health/attribution");
      const data = (await response.json()) as AttributionHealth;
      setHealth(data);
    } catch {
      setHealth({ healthy: false, error: "Failed to load health check." });
    } finally {
      setHealthLoading(false);
    }
  };

  const runCookieCheck = async () => {
    if (cookieLoading) return;
    setCookieLoading(true);
    try {
      const response = await fetch("/api/verify-attribution");
      const data = (await response.json()) as AttributionCookieStatus;
      setCookieStatus(data);
    } catch {
      setCookieStatus({ hasAttribution: false, reason: "error", message: "Unable to read attribution cookie." });
    } finally {
      setCookieLoading(false);
    }
  };

  const healthTone =
    health?.status === "critical"
      ? "border-rose-200 bg-rose-50 text-rose-900"
      : health?.status === "warning"
        ? "border-amber-200 bg-amber-50 text-amber-900"
        : health?.status === "no_data"
          ? "border-slate-200 bg-slate-50 text-slate-700"
          : "border-emerald-200 bg-emerald-50 text-emerald-900";

  return (
    <Card className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600">
          <ShieldCheck className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Measure ROI QA
          </p>
          <h3 className="text-lg font-black text-slate-900">Live attribution integrity</h3>
          <p className="mt-1 text-sm text-slate-600">
            Run quick system checks to confirm attribution, tracking, and visibility before go-live.
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className={`rounded-2xl border px-4 py-3 text-sm ${healthTone}`}>
          <div className="flex items-center justify-between gap-3">
            <p className="font-semibold">Attribution health</p>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="rounded-full"
              onClick={runHealthCheck}
              disabled={healthLoading}
            >
              {healthLoading ? "Running..." : "Run health check"}
            </Button>
          </div>
          {health ? (
            <div className="mt-2 space-y-1 text-xs">
              <p>
                Status:{" "}
                <span className="font-semibold uppercase">
                  {health.status ?? (health.healthy ? "good" : "error")}
                </span>
              </p>
              {health.metrics?.last7Days && (
                <p>
                  Last 7 days: {health.metrics.last7Days.attributedApplications ?? 0}/
                  {health.metrics.last7Days.totalApplications ?? 0} attributed •{" "}
                  {health.metrics.last7Days.attributionRate ?? "N/A"} rate
                </p>
              )}
              <p>{health.recommendation ?? health.error}</p>
            </div>
          ) : (
            <p className="mt-2 text-xs text-slate-600">
              Checks admin attribution health, recent link visits, and conversion rate.
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
          <div className="flex items-center justify-between gap-3">
            <p className="font-semibold">Attribution cookie</p>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="rounded-full"
              onClick={runCookieCheck}
              disabled={cookieLoading}
            >
              {cookieLoading ? "Checking..." : "Check cookie"}
            </Button>
          </div>
          {cookieStatus ? (
            <div className="mt-2 flex items-start gap-2 text-xs">
              {cookieStatus.hasAttribution ? (
                <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
              )}
              <div>
                <p className="font-semibold">
                  {cookieStatus.hasAttribution ? "Attribution active" : "No attribution cookie"}
                </p>
                <p>{cookieStatus.message ?? "Open a referral link to set the cookie."}</p>
              </div>
            </div>
          ) : (
            <p className="mt-2 text-xs text-slate-600">
              Use after opening a referral link to confirm the cookie is stored.
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
