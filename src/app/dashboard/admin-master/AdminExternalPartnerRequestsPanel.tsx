"use client";

import { useEffect, useMemo, useState } from "react";
import { RefreshCcw, UserCheck, ClipboardCopy, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

type RequestRow = {
  id: string;
  business_id: string;
  submitted_by: string;
  status: string;
  assigned_to: string | null;
  payload: any;
  created_at: string;
  updated_at: string;
  businesses?: { id: string; name: string | null; owner_id: string | null } | null;
};

export function AdminExternalPartnerRequestsPanel({ currentAdminId }: { currentAdminId: string }) {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<RequestRow[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter.trim()) params.set("status", statusFilter.trim());
      params.set("limit", "100");
      const response = await fetch(`/api/external-partners/admin/requests?${params.toString()}`);
      const payload = (await response.json()) as { data?: RequestRow[]; error?: string };
      if (!response.ok) throw new Error(payload.error || "Failed to load requests");
      setRows(payload.data ?? []);
      if (!selectedId && payload.data?.[0]?.id) setSelectedId(payload.data[0].id);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to load requests",
        description: error instanceof Error ? error.message : "Could not load requests.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const requestId = url.searchParams.get("request");
    if (requestId && typeof requestId === "string") {
      setSelectedId(requestId);
    }
  }, []);

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) => {
      const name = row.businesses?.name ?? "";
      return (
        row.id.toLowerCase().includes(q) ||
        row.business_id.toLowerCase().includes(q) ||
        name.toLowerCase().includes(q) ||
        (row.status ?? "").toLowerCase().includes(q)
      );
    });
  }, [rows, search]);

  const selected = useMemo(
    () => filteredRows.find((row) => row.id === selectedId) ?? null,
    [filteredRows, selectedId],
  );

  useEffect(() => {
    const notes = selected?.payload?.admin?.notes;
    setAdminNotes(typeof notes === "string" ? notes : "");
  }, [selected?.id]);

  const copyText = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast({ title: "Copied", description: `${label} copied.` });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Copy manually instead." });
    }
  };

  const updateRequest = async (patch: { status?: string; assignedTo?: string | null; adminNotes?: string }) => {
    if (!selected?.id) return;
    setSaving(true);
    try {
      const response = await fetch("/api/external-partners/admin/requests", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          requestId: selected.id,
          ...patch,
        }),
      });
      const payload = (await response.json()) as { data?: RequestRow; error?: string };
      if (!response.ok) throw new Error(payload.error || "Update failed");

      toast({ title: "Request updated", description: "Saved changes." });
      await fetchRequests();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: error instanceof Error ? error.message : "Could not update request.",
      });
    } finally {
      setSaving(false);
    }
  };

  const requestKind: string =
    typeof selected?.payload?.requestKind === "string" ? selected.payload.requestKind : "partner_discovery";

  const summary = useMemo(() => {
    if (!selected) return "";
    if (requestKind === "partner_activation") {
      const partnerName = selected.payload?.partnerName || "—";
      const partnerType = selected.payload?.partnerType || "—";
      const landingUrl = selected.payload?.landingUrl || "—";
      return `Activation · ${partnerType} · ${partnerName} · ${landingUrl}`;
    }
    const goal = selected.payload?.primaryGoal || "—";
    const types = Array.isArray(selected.payload?.partnerTypes) ? selected.payload.partnerTypes.join(", ") : "—";
    return `Discovery · ${goal} · ${types}`;
  }, [selected, requestKind]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 mb-8" id="external-partners-requests">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">External Partners</p>
          <h2 className="text-xl font-black text-slate-900">Requests inbox (Admin)</h2>
          <p className="text-sm text-slate-600 mt-1">Everything submitted to Refer Labs appears here for triage and delivery.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by business, status, or request id…"
            className="h-10 w-72"
          />
          <select
            className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All statuses</option>
            <option value="pending_review">pending_review</option>
            <option value="delivered">delivered</option>
            <option value="in_progress">in_progress</option>
            <option value="rejected">rejected</option>
          </select>
          <Button type="button" variant="outline" onClick={fetchRequests} disabled={loading}>
            <RefreshCcw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="mt-5 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              <span>Requests</span>
              <span>{filteredRows.length}</span>
            </div>
            <div className="max-h-[520px] overflow-y-auto">
              {filteredRows.length === 0 ? (
                <div className="px-4 py-6 text-sm text-slate-600">No matching requests.</div>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {filteredRows.map((row) => {
                    const active = row.id === selectedId;
                    const businessName = row.businesses?.name || "Business";
                    const kind =
                      typeof row.payload?.requestKind === "string" ? row.payload.requestKind : "partner_discovery";
                    return (
                      <li key={row.id}>
                        <button
                          type="button"
                          onClick={() => setSelectedId(row.id)}
                          className={`w-full px-4 py-3 text-left transition ${
                            active ? "bg-slate-900 text-white" : "bg-white hover:bg-slate-50 text-slate-900"
                          }`}
                        >
                          <p className="text-sm font-semibold truncate">{businessName}</p>
                          <p className={`mt-1 text-xs truncate ${active ? "text-slate-200" : "text-slate-500"}`}>
                            {row.status} · {kind} · {new Date(row.created_at).toLocaleString()}
                          </p>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-xl border border-slate-200 p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Selected request</p>
                <h3 className="mt-1 text-lg font-black text-slate-900">{selected?.businesses?.name || "—"}</h3>
                <p className="mt-1 text-sm text-slate-600">{summary}</p>
                <p className="mt-1 text-xs text-slate-500">
                  Status: <span className="font-semibold text-slate-700">{selected?.status || "—"}</span> · Assigned:{" "}
                  <span className="font-semibold text-slate-700">{selected?.assigned_to || "—"}</span>
                </p>
              </div>
              {selected && (
                <div className="flex flex-wrap gap-2">
                  <Button type="button" size="sm" variant="outline" onClick={() => copyText("Request ID", selected.id)}>
                    <ClipboardCopy className="mr-2 h-3.5 w-3.5" />
                    Copy request ID
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => updateRequest({ assignedTo: currentAdminId })}
                    disabled={saving}
                  >
                    <UserCheck className="mr-2 h-3.5 w-3.5" />
                    Assign to me
                  </Button>
                </div>
              )}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-xs text-slate-500">Business ID</p>
                <p className="mt-1 font-mono text-xs text-slate-900 break-all">{selected?.business_id || "—"}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-xs text-slate-500">Request ID</p>
                <p className="mt-1 font-mono text-xs text-slate-900 break-all">{selected?.id || "—"}</p>
              </div>
            </div>

            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Admin notes</p>
              <textarea
                className="mt-2 w-full min-h-[120px] rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Triage notes, next steps, dataset status, outreach notes…"
              />
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => updateRequest({ status: "in_progress" })}
                    disabled={!selected || saving}
                  >
                    Mark in_progress
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => updateRequest({ status: "pending_review" })}
                    disabled={!selected || saving}
                  >
                    Mark pending_review
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => updateRequest({ status: "rejected" })}
                    disabled={!selected || saving}
                  >
                    Mark rejected
                  </Button>
                </div>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => updateRequest({ adminNotes })}
                  disabled={!selected || saving}
                >
                  <Save className="mr-2 h-3.5 w-3.5" />
                  Save notes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
