"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock, ExternalLink, Mail, Phone, Globe, Users, TrendingUp } from "lucide-react";

interface PartnerApplication {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  website: string | null;
  instagram_handle: string | null;
  linkedin_handle: string | null;
  audience_profile: string | null;
  notes: string | null;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  approved_at: string | null;
  customer: {
    id: string;
    name: string;
    email: string;
    referral_code: string | null;
    discount_code: string | null;
    credits: number | null;
    status: string;
  } | null;
  referralCount: number;
  totalEarnings: number;
}

export function PartnerApplicationsManager() {
  const [applications, setApplications] = useState<PartnerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [approving, setApproving] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

  useEffect(() => {
    fetchApplications();
  }, []);

  async function fetchApplications() {
    try {
      const response = await fetch("/api/admin/partner-applications");
      if (!response.ok) throw new Error("Failed to fetch applications");

      const data = await response.json();
      setApplications(data.applications || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  }

  async function approveApplication(applicationId: string) {
    if (!confirm("Approve this partner application? They will earn 25% recurring revenue for every client they refer.")) {
      return;
    }

    setApproving(applicationId);
    try {
      const response = await fetch("/api/admin/partner-applications/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to approve application");
      }

      alert("Partner approved! Approval email sent with 25% recurring revenue details.");
      await fetchApplications();
    } catch (error) {
      console.error("Error approving application:", error);
      alert(`Error: ${error instanceof Error ? error.message : "Failed to approve"}`);
    } finally {
      setApproving(null);
    }
  }

  async function rejectApplication(applicationId: string) {
    if (!confirm("Reject this partner application? This action cannot be undone.")) {
      return;
    }

    setApproving(applicationId);
    try {
      const response = await fetch("/api/admin/partner-applications/reject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to reject application");
      }

      alert("Partner application rejected.");
      await fetchApplications();
    } catch (error) {
      console.error("Error rejecting application:", error);
      alert(`Error: ${error instanceof Error ? error.message : "Failed to reject"}`);
    } finally {
      setApproving(null);
    }
  }

  const filteredApplications = applications.filter((app) => {
    if (filter === "all") return true;
    return app.status === filter;
  });

  const pendingCount = applications.filter((app) => app.status === "pending").length;
  const approvedCount = applications.filter((app) => app.status === "approved").length;

  if (loading) {
    return (
      <Card className="p-8">
        <div className="text-center text-slate-600">Loading partner applications...</div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-100 rounded-lg">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Pending Review</p>
              <p className="text-2xl font-bold text-slate-900">{pendingCount}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-100 rounded-lg">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Active Partners</p>
              <p className="text-2xl font-bold text-slate-900">{approvedCount}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Applications</p>
              <p className="text-2xl font-bold text-slate-900">{applications.length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filter Tabs */}
      <Card className="p-4">
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            All ({applications.length})
          </Button>
          <Button
            variant={filter === "pending" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("pending")}
          >
            Pending ({pendingCount})
          </Button>
          <Button
            variant={filter === "approved" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("approved")}
          >
            Approved ({approvedCount})
          </Button>
        </div>
      </Card>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.length === 0 ? (
          <Card className="p-8">
            <div className="text-center text-slate-600">
              No {filter !== "all" && filter} applications found.
            </div>
          </Card>
        ) : (
          filteredApplications.map((app) => (
            <Card key={app.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-slate-900">{app.name}</h3>
                    {app.status === "pending" && (
                      <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                        Pending Review
                      </span>
                    )}
                    {app.status === "approved" && (
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Approved
                      </span>
                    )}
                  </div>
                  {app.company && (
                    <p className="text-slate-600 font-medium">{app.company}</p>
                  )}
                  <p className="text-sm text-slate-500">
                    Applied {new Date(app.created_at).toLocaleDateString()}
                    {app.approved_at && ` • Approved ${new Date(app.approved_at).toLocaleDateString()}`}
                  </p>
                </div>

                {app.status === "pending" && (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => approveApplication(app.id)}
                      disabled={approving === app.id}
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {approving === app.id ? "Approving..." : "Approve"}
                    </Button>
                    <Button
                      onClick={() => rejectApplication(app.id)}
                      disabled={approving === app.id}
                      variant="destructive"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <a href={`mailto:${app.email}`} className="hover:text-blue-600 underline">
                    {app.email}
                  </a>
                </div>
                {app.phone && (
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Phone className="h-4 w-4 text-slate-400" />
                    {app.phone}
                  </div>
                )}
                {app.website && (
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Globe className="h-4 w-4 text-slate-400" />
                    <a
                      href={app.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 underline flex items-center gap-1"
                    >
                      {app.website}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>

              {/* Social Media */}
              {(app.instagram_handle || app.linkedin_handle) && (
                <div className="flex gap-4 mb-4 text-sm">
                  {app.instagram_handle && (
                    <span className="text-slate-600">
                      Instagram: <span className="font-medium">@{app.instagram_handle}</span>
                    </span>
                  )}
                  {app.linkedin_handle && (
                    <span className="text-slate-600">
                      LinkedIn: <span className="font-medium">{app.linkedin_handle}</span>
                    </span>
                  )}
                </div>
              )}

              {/* Audience Profile */}
              {app.audience_profile && (
                <div className="mb-4 p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm font-semibold text-slate-700 mb-1">Target Audience:</p>
                  <p className="text-sm text-slate-600">{app.audience_profile}</p>
                </div>
              )}

              {/* Launch Plan */}
              {app.notes && (
                <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm font-semibold text-blue-900 mb-1">Launch Plan:</p>
                  <p className="text-sm text-blue-800">{app.notes}</p>
                </div>
              )}

              {/* Partner Stats (if approved) */}
              {app.status === "approved" && app.customer && (
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Referral Link</p>
                      {app.customer.referral_code ? (
                        <a
                          href={`${window.location.origin}/r/${app.customer.referral_code}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline font-mono flex items-center gap-1"
                        >
                          /r/{app.customer.referral_code}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : (
                        <p className="text-sm text-slate-400">Not generated</p>
                      )}
                    </div>

                    <div>
                      <p className="text-xs text-slate-500 mb-1">Discount Code</p>
                      <p className="text-sm font-mono font-semibold text-slate-900">
                        {app.customer.discount_code || "N/A"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500 mb-1">Total Referrals</p>
                      <p className="text-sm font-bold text-slate-900 flex items-center gap-1">
                        <Users className="h-4 w-4 text-blue-500" />
                        {app.referralCount}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500 mb-1">Total Earnings</p>
                      <p className="text-sm font-bold text-emerald-600 flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        ${app.totalEarnings.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {app.customer.credits && app.customer.credits > 0 && (
                    <div className="mt-3 p-3 bg-emerald-50 rounded-lg">
                      <p className="text-sm text-emerald-800">
                        💰 Account Credit: <span className="font-bold">${(app.customer.credits / 100).toFixed(2)}</span>
                      </p>
                    </div>
                  )}
                </div>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
