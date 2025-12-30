"use client";

import { useCallback, useMemo, useState } from "react";
import { Activity, CheckCircle2, RefreshCw, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type CheckState =
  | { status: "idle" }
  | { status: "running" }
  | { status: "ok"; detail?: string }
  | { status: "error"; detail?: string };

type CheckDefinition = {
  id: string;
  label: string;
  url: string;
  describeOk?: (payload: unknown) => string | undefined;
  describeError?: (payload: unknown) => string | undefined;
};

function asString(value: unknown) {
  if (typeof value === "string") return value;
  return undefined;
}

function iconForStatus(status: CheckState["status"]) {
  if (status === "ok") return <CheckCircle2 className="h-4 w-4 text-emerald-600" />;
  if (status === "error") return <XCircle className="h-4 w-4 text-rose-600" />;
  if (status === "running") return <RefreshCw className="h-4 w-4 animate-spin text-slate-500" />;
  return <Activity className="h-4 w-4 text-slate-500" />;
}

export function StatusChecks() {
  const checks: CheckDefinition[] = useMemo(
    () => [
      {
        id: "verify",
        label: "App server responding",
        url: "/api/verify-attribution",
        describeOk: () => "OK",
      },
      {
        id: "attribution-health",
        label: "Attribution health",
        url: "/api/health/attribution",
        describeOk: (payload) => {
          if (typeof payload === "object" && payload && "status" in payload) {
            const record = payload as Record<string, unknown>;
            return `Healthy (${String(record.status)})`;
          }
          return "Healthy";
        },
        describeError: (payload) => {
          if (typeof payload === "object" && payload && "error" in payload) {
            const record = payload as Record<string, unknown>;
            return asString(record.error) ?? "Unhealthy";
          }
          return "Unhealthy";
        },
      },
    ],
    [],
  );

  const [state, setState] = useState<Record<string, CheckState>>(() =>
    Object.fromEntries(checks.map((check) => [check.id, { status: "idle" }])),
  );

  const runCheck = useCallback(async (check: CheckDefinition) => {
    setState((prev) => ({ ...prev, [check.id]: { status: "running" } }));
    try {
      const response = await fetch(check.url, { cache: "no-store" });
      const contentType = response.headers.get("content-type") ?? "";
      const payload =
        contentType.includes("application/json")
          ? await response.json().catch(() => null)
          : await response.text().catch(() => null);

      if (response.ok) {
        const detail = check.describeOk?.(payload);
        setState((prev) => ({ ...prev, [check.id]: { status: "ok", detail } }));
        return;
      }

      const detail =
        check.describeError?.(payload) ??
        (typeof payload === "string" ? payload : `HTTP ${response.status}`);
      setState((prev) => ({ ...prev, [check.id]: { status: "error", detail } }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        [check.id]: { status: "error", detail: error instanceof Error ? error.message : "Request failed" },
      }));
    }
  }, []);

  const runAll = useCallback(async () => {
    for (const check of checks) {
      // eslint-disable-next-line no-await-in-loop
      await runCheck(check);
    }
  }, [checks, runCheck]);

  return (
    <Card className="p-6 rounded-2xl border border-slate-200 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Live checks</h2>
          <p className="text-sm text-slate-600">
            Run these checks before contacting support.
          </p>
        </div>
        <Button onClick={runAll} className="font-bold">
          <RefreshCw className="mr-2 h-4 w-4" />
          Run checks
        </Button>
      </div>

      <div className="mt-4 space-y-3">
        {checks.map((check) => {
          const current = state[check.id] ?? { status: "idle" };
          return (
            <div
              key={check.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  {iconForStatus(current.status)}
                  <p className="font-semibold text-slate-900">{check.label}</p>
                </div>
                {("detail" in current && current.detail) && (
                  <p className="mt-1 text-xs text-slate-600 break-words">{current.detail}</p>
                )}
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => runCheck(check)}
                disabled={current.status === "running"}
                className="font-semibold"
              >
                Retry
              </Button>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
