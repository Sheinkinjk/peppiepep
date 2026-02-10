"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, RefreshCcw, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

type BusinessRow = {
  id: string;
  owner_id: string;
  name: string | null;
  upgrade_name: string | null;
  reward_type: string | null;
  reward_amount: number | null;
  created_at: string;
  onboarding_metadata: any;
  owner?: {
    id: string;
    email: string | null;
    created_at: string | null;
    last_sign_in_at: string | null;
  } | null;
};

type BusinessesResponse = {
  data: BusinessRow[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  error?: string;
};

type BusinessStatsResponse = {
  business: BusinessRow;
  counts: {
    customersTotal: number;
    customersApplicants: number;
    referralsTotal: number;
    referralsCompleted: number;
    windowDays: number;
    events: {
      linkVisits: number;
      signups: number;
      meetings: number;
      conversions: number;
    };
  };
  error?: string;
};

export function AdminBusinessExplorerPanel() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(25);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rows, setRows] = useState<BusinessRow[]>([]);
  const [pagination, setPagination] = useState<BusinessesResponse["pagination"]>({
    page: 1,
    limit,
    total: 0,
    totalPages: 1,
  });

  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);
  const [stats, setStats] = useState<BusinessStatsResponse | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);

  const selectedBusiness = useMemo(
    () => rows.find((row) => row.id === selectedBusinessId) ?? null,
    [rows, selectedBusinessId],
  );

  const fetchBusinesses = async (opts?: { keepSelection?: boolean }) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (query.trim()) params.set("q", query.trim());
      params.set("page", String(page));
      params.set("limit", String(limit));

      const response = await fetch(`/api/admin/master/businesses?${params.toString()}`);
      const payload = (await response.json()) as BusinessesResponse;
      if (!response.ok) throw new Error(payload.error || "Failed to load businesses");

      setRows(payload.data ?? []);
      setPagination(payload.pagination);

      if (!opts?.keepSelection) {
        setSelectedBusinessId(payload.data?.[0]?.id ?? null);
      } else if (selectedBusinessId && !(payload.data ?? []).some((b) => b.id === selectedBusinessId)) {
        setSelectedBusinessId(payload.data?.[0]?.id ?? null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load businesses");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async (businessId: string) => {
    setStatsLoading(true);
    setStats(null);
    try {
      const response = await fetch(`/api/admin/master/businesses/${businessId}/stats?windowDays=30`);
      const payload = (await response.json()) as BusinessStatsResponse;
      if (!response.ok) throw new Error(payload.error || "Failed to load business stats");
      setStats(payload);
    } catch (err) {
      setStats({
        business: selectedBusiness as any,
        counts: {
          customersTotal: 0,
          customersApplicants: 0,
          referralsTotal: 0,
          referralsCompleted: 0,
          windowDays: 30,
          events: { linkVisits: 0, signups: 0, meetings: 0, conversions: 0 },
        },
        error: err instanceof Error ? err.message : "Failed to load business stats",
      });
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    void fetchBusinesses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (!selectedBusinessId) return;
    void fetchStats(selectedBusinessId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBusinessId]);

  const copyText = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast({ title: "Copied", description: `${label} copied to clipboard.` });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Copy manually instead." });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 mb-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Admin Explorer</p>
          <h2 className="text-xl font-black text-slate-900">Businesses</h2>
          <p className="text-sm text-slate-600 mt-1">Search accounts and inspect live stats without loading the full database.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search business name…"
              className="h-10 w-72 pl-9"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setPage(1);
              void fetchBusinesses();
            }}
            disabled={loading}
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
          {error}
        </div>
      )}

      <div className="mt-5 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              <span>Businesses</span>
              <span>{pagination.total}</span>
            </div>
            <div className="max-h-[520px] overflow-y-auto">
              {rows.length === 0 && !loading ? (
                <div className="px-4 py-6 text-sm text-slate-600">No businesses found.</div>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {rows.map((row) => {
                    const active = row.id === selectedBusinessId;
                    return (
                      <li key={row.id}>
                        <button
                          type="button"
                          onClick={() => setSelectedBusinessId(row.id)}
                          className={`w-full px-4 py-3 text-left transition ${
                            active ? "bg-slate-900 text-white" : "bg-white hover:bg-slate-50 text-slate-900"
                          }`}
                        >
                          <p className="text-sm font-semibold truncate">{row.name || "Unnamed business"}</p>
                          <p className={`mt-1 text-xs truncate ${active ? "text-slate-200" : "text-slate-500"}`}>
                            {row.owner?.email || row.owner_id} · {new Date(row.created_at).toLocaleDateString()}
                          </p>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            <div className="flex items-center justify-between border-t border-slate-200 bg-white px-3 py-2 text-xs text-slate-600">
              <Button type="button" size="sm" variant="outline" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1 || loading}>
                Prev
              </Button>
              <span>
                Page {pagination.page} / {pagination.totalPages}
              </span>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => setPage((p) => Math.min(p + 1, pagination.totalPages))}
                disabled={page >= pagination.totalPages || loading}
              >
                Next
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-xl border border-slate-200 p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Selected business</p>
                <h3 className="mt-1 text-lg font-black text-slate-900">{selectedBusiness?.name || "-"}</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Owner: <span className="font-semibold">{selectedBusiness?.owner?.email || "-"}</span>
                </p>
              </div>
              {selectedBusiness && (
                <div className="flex flex-wrap gap-2">
                  <Button type="button" size="sm" variant="outline" onClick={() => copyText("Business ID", selectedBusiness.id)}>
                    <Copy className="mr-2 h-3.5 w-3.5" />
                    Copy business ID
                  </Button>
                  <Button type="button" size="sm" variant="outline" onClick={() => copyText("Owner ID", selectedBusiness.owner_id)}>
                    <Copy className="mr-2 h-3.5 w-3.5" />
                    Copy owner ID
                  </Button>
                </div>
              )}
            </div>

            {stats?.error && (
              <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
                {stats.error}
              </div>
            )}

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-xs text-slate-500">Ambassadors</p>
                <p className="mt-1 text-2xl font-black text-slate-900">
                  {statsLoading ? "…" : stats?.counts.customersTotal ?? 0}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Applicants: {statsLoading ? "…" : stats?.counts.customersApplicants ?? 0}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-xs text-slate-500">Referrals</p>
                <p className="mt-1 text-2xl font-black text-slate-900">
                  {statsLoading ? "…" : stats?.counts.referralsTotal ?? 0}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Completed: {statsLoading ? "…" : stats?.counts.referralsCompleted ?? 0}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-xs text-slate-500">Events (last 30 days)</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  Visits: {statsLoading ? "…" : stats?.counts.events.linkVisits ?? 0} · Signups:{" "}
                  {statsLoading ? "…" : stats?.counts.events.signups ?? 0}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Meetings: {statsLoading ? "…" : stats?.counts.events.meetings ?? 0} · Conversions:{" "}
                  {statsLoading ? "…" : stats?.counts.events.conversions ?? 0}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-xs text-slate-500">Program setup</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  Reward: {stats?.business.reward_type || "-"} {stats?.business.reward_amount ?? ""}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Upgrade: {stats?.business.upgrade_name || "-"}
                </p>
              </div>
            </div>

            {selectedBusiness && (
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                <p>
                  Created: <span className="font-semibold text-slate-700">{new Date(selectedBusiness.created_at).toLocaleString()}</span>
                </p>
                <Button type="button" size="sm" variant="outline" onClick={() => fetchStats(selectedBusiness.id)} disabled={statsLoading}>
                  Refresh stats
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
