"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

type ResultState = {
  loading: boolean;
  data: unknown | null;
  error: string | null;
};

async function fetchJson(url: string) {
  const response = await fetch(url, { method: "GET" });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message =
      typeof payload?.error === "string" ? payload.error : `Request failed (${response.status})`;
    throw new Error(message);
  }
  return payload;
}

export function AdminDiagnosticsPanel() {
  const [debug, setDebug] = useState<ResultState>({ loading: false, data: null, error: null });
  const [health, setHealth] = useState<ResultState>({ loading: false, data: null, error: null });

  const run = async (kind: "debug" | "health") => {
    const setter = kind === "debug" ? setDebug : setHealth;
    setter({ loading: true, data: null, error: null });
    try {
      const data =
        kind === "debug"
          ? await fetchJson("/api/admin/debug")
          : await fetchJson("/api/admin/db-health-lite");
      setter({ loading: false, data, error: null });
      toast({ title: "Diagnostics updated" });
    } catch (error) {
      setter({ loading: false, data: null, error: error instanceof Error ? error.message : "Failed" });
      toast({
        variant: "destructive",
        title: "Diagnostics failed",
        description: error instanceof Error ? error.message : "Failed",
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 mb-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Admin diagnostics</p>
          <h2 className="text-xl font-black text-slate-900">Run live checks</h2>
          <p className="text-sm text-slate-600 mt-1">
            Verify admin auth wiring and database health without leaving the panel.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" onClick={() => run("debug")} disabled={debug.loading}>
            {debug.loading ? "Running…" : "Run admin debug"}
          </Button>
          <Button type="button" variant="outline" onClick={() => run("health")} disabled={health.loading}>
            {health.loading ? "Running…" : "Run DB health"}
          </Button>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Admin debug</p>
          {debug.error ? (
            <p className="mt-2 text-sm text-rose-700">{debug.error}</p>
          ) : (
            <pre className="mt-2 max-h-[320px] overflow-auto whitespace-pre-wrap rounded-lg bg-white p-3 text-xs text-slate-700">
              {debug.data ? JSON.stringify(debug.data, null, 2) : "Not run yet."}
            </pre>
          )}
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">DB health</p>
          {health.error ? (
            <p className="mt-2 text-sm text-rose-700">{health.error}</p>
          ) : (
            <pre className="mt-2 max-h-[320px] overflow-auto whitespace-pre-wrap rounded-lg bg-white p-3 text-xs text-slate-700">
              {health.data ? JSON.stringify(health.data, null, 2) : "Not run yet."}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}

