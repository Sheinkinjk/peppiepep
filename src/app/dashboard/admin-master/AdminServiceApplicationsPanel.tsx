"use client";

import { useState, useEffect } from "react";
import { FileText, RefreshCw, Mail, ExternalLink } from "lucide-react";

type ServiceApplication = {
  id: string;
  company: string;
  contact_name: string;
  email: string;
  goals: string | null;
  partner_types: string | null;
  reward_model: string | null;
  notes: string | null;
  source_page: string | null;
  status: string;
  created_at: string;
};

export function AdminServiceApplicationsPanel() {
  const [applications, setApplications] = useState<ServiceApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchApplications = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/service-applications");
      if (!response.ok) throw new Error("Failed to fetch applications");
      const data = await response.json();
      setApplications(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load applications");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("en-AU", {
      timeZone: "Australia/Sydney",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-slate-100 p-2">
            <FileText className="h-5 w-5 text-slate-700" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Leads
            </p>
            <h2 className="text-xl font-black text-slate-900">
              Service Applications
            </h2>
          </div>
        </div>
        <button
          onClick={fetchApplications}
          disabled={isLoading}
          className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="py-8 text-center text-slate-500">Loading applications...</div>
      ) : applications.length === 0 ? (
        <div className="py-8 text-center text-slate-500">
          No service applications yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-xs uppercase tracking-[0.2em] text-slate-400">
              <tr>
                <th className="py-2 text-left">Date</th>
                <th className="py-2 text-left">Company</th>
                <th className="py-2 text-left">Contact</th>
                <th className="py-2 text-left">Source</th>
                <th className="py-2 text-left">Goals</th>
                <th className="py-2 text-left">Status</th>
                <th className="py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {applications.map((app) => (
                <tr key={app.id} className="border-t border-slate-100">
                  <td className="whitespace-nowrap py-3 text-xs text-slate-500">
                    {formatDate(app.created_at)}
                  </td>
                  <td className="py-3 font-medium">{app.company}</td>
                  <td className="py-3">
                    <div>{app.contact_name}</div>
                    <div className="text-xs text-slate-500">{app.email}</div>
                  </td>
                  <td className="py-3 text-xs">
                    {app.source_page || "—"}
                  </td>
                  <td className="max-w-[200px] truncate py-3 text-xs text-slate-500">
                    {app.goals || "—"}
                  </td>
                  <td className="py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        app.status === "new"
                          ? "bg-cyan-100 text-cyan-800"
                          : app.status === "contacted"
                          ? "bg-amber-100 text-amber-800"
                          : app.status === "converted"
                          ? "bg-green-100 text-green-800"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <a
                        href={`mailto:${app.email}?subject=Re: Your Refer Labs Application&body=Hi ${app.contact_name},%0A%0AThank you for your interest in Refer Labs.%0A%0A`}
                        className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                        title="Send email"
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {applications.length > 0 && (
        <div className="mt-4 text-xs text-slate-500">
          Showing {applications.length} application{applications.length !== 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
}
