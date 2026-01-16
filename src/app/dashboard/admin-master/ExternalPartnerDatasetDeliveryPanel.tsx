"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

type ExternalPartnerRequestSummary = {
  id: string;
  created_at: string;
  status: string;
  businessName: string;
};

export function ExternalPartnerDatasetDeliveryPanel({
  requests,
}: {
  requests: ExternalPartnerRequestSummary[];
}) {
  const [requestId, setRequestId] = useState(requests[0]?.id ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const requestOptions = useMemo(
    () =>
      requests.map((req) => ({
        id: req.id,
        label: `${req.businessName || "Business"} · ${req.status} · ${new Date(req.created_at).toLocaleString()}`,
      })),
    [requests],
  );

  const submit = async () => {
    if (!requestId) {
      toast({ variant: "destructive", title: "Missing request id", description: "Select a request first." });
      return;
    }
    if (!file) {
      toast({ variant: "destructive", title: "Missing file", description: "Choose an Excel file to upload." });
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.set("requestId", requestId);
      formData.set("file", file);

      const response = await fetch("/api/external-partners/admin/deliver-dataset", {
        method: "POST",
        body: formData,
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.error || "Upload failed");
      }

      toast({
        title: "Dataset delivered",
        description: "Request marked as delivered and the client was notified (if email is available).",
      });
      setFile(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Delivery failed",
        description: error instanceof Error ? error.message : "Dataset upload failed.",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 mb-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">External Partners</p>
          <h2 className="text-xl font-black text-slate-900">Deliver Partner Dataset (Admin)</h2>
          <p className="text-sm text-slate-600 mt-1">
            Upload a curated Excel dataset for a request and mark it as <span className="font-semibold">Delivered</span>.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <select
            className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm"
            value={requestId}
            onChange={(e) => setRequestId(e.target.value)}
            disabled={requestOptions.length === 0}
          >
            {requestOptions.length === 0 ? (
              <option value="">No requests yet</option>
            ) : (
              requestOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))
            )}
          </select>
          <input
            type="file"
            accept=".xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv"
            className="text-sm"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
          <Button type="button" onClick={submit} disabled={uploading || !requestId}>
            {uploading ? "Uploading…" : "Deliver dataset"}
          </Button>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-xs uppercase tracking-[0.2em] text-slate-400">
            <tr>
              <th className="py-2 text-left">Created</th>
              <th className="py-2 text-left">Business</th>
              <th className="py-2 text-left">Status</th>
              <th className="py-2 text-left">Request ID</th>
            </tr>
          </thead>
          <tbody className="text-slate-700">
            {requests.length === 0 ? (
              <tr>
                <td className="py-3 text-slate-500" colSpan={4}>
                  No external partner requests found.
                </td>
              </tr>
            ) : (
              requests.slice(0, 12).map((req) => (
                <tr key={req.id} className="border-t border-slate-100">
                  <td className="py-3">{new Date(req.created_at).toLocaleString()}</td>
                  <td className="py-3">{req.businessName || "—"}</td>
                  <td className="py-3">{req.status}</td>
                  <td className="py-3 font-mono text-xs">{req.id}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

