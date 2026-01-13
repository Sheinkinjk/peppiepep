"use client";

import { useState, useEffect, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
  Mail,
  Phone,
  Globe,
  Users,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { createBrowserSupabaseClient } from "@/lib/supabase-browser";
import { Pagination } from "@/components/Pagination";

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
  referralSource?: string | null;
  referralUtmCampaign?: string | null;
}

const replyTemplates = [
  {
    id: "need-icp",
    label: "Request: ICP details",
    subject: "Quick follow-up on your partner application",
    body:
      "Thanks for applying to the Refer Labs partner program. Could you share your ideal customer profile (industry, company size, buyer persona) so we can match you correctly?",
  },
  {
    id: "need-service-type",
    label: "Request: Professional service type",
    subject: "Clarifying your professional services focus",
    body:
      "Thanks for applying. To ensure we set up your referral program correctly, can you confirm your primary professional service area (law, accounting, consulting, or other) and any specific practice areas or specializations?",
  },
  {
    id: "need-compliance",
    label: "Request: Compliance details",
    subject: "Compliance requirements for your industry",
    body:
      "Thanks for your application. For professional services, we need to understand any compliance or regulatory requirements you have (e.g., bar association rules, CPA ethics, industry certifications). Could you provide details on what compliance frameworks apply to your practice?",
  },
  {
    id: "need-partner-tier",
    label: "Request: Partner tier preferences",
    subject: "Partner program tier selection",
    body:
      "We'd like to understand your expected referral volume and partner tier preferences. Are you looking for a standard partner arrangement or would you prefer a strategic partnership with higher commission rates based on volume?",
  },
  {
    id: "need-audience",
    label: "Request: Audience details",
    subject: "Clarifying your audience fit",
    body:
      "We love the application. Can you share more detail on your audience (job titles, regions, and engagement style) so we can finalize approval?",
  },
  {
    id: "reject-not-fit",
    label: "Reject: Not a fit right now",
    subject: "Update on your partner application",
    body:
      "Thanks for applying to the Refer Labs partner program. After review, we are not the right fit at this time. We will keep your details on file and reach out if a future opportunity aligns.",
  },
  {
    id: "reject-compliance",
    label: "Reject: Compliance concerns",
    subject: "Update on your partner application",
    body:
      "Thank you for your interest in partnering with us. After reviewing your application, we have concerns about compliance alignment with your professional regulatory requirements. We recommend exploring this partnership at a later time when we can better support your industry's specific compliance needs.",
  },
];

export function PartnerApplicationsManager() {
  const [applications, setApplications] = useState<PartnerApplication[]>([]);
  const [incomingFeed, setIncomingFeed] = useState<PartnerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [approving, setApproving] = useState<string | null>(null);
  const [replySelection, setReplySelection] = useState<Record<string, string>>({});
  const [actionErrors, setActionErrors] = useState<Record<string, string>>({});
  const [lastError, setLastError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const hasSupabaseConfig = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
  const supabase = useMemo(
    () => (hasSupabaseConfig ? createBrowserSupabaseClient() : null),
    [hasSupabaseConfig],
  );

  useEffect(() => {
    fetchApplications();
  }, [currentPage, filter]);

  async function fetchApplications() {
    try {
      const statusParam = filter !== "all" ? `&status=${filter}` : "";
      const response = await fetch(
        `/api/admin/partner-applications?page=${currentPage}&limit=${itemsPerPage}${statusParam}`
      );
      if (!response.ok) throw new Error("Failed to fetch applications");

      const data = await response.json();
      setApplications(data.data || []);
      setTotalItems(data.pagination?.total || 0);
      setTotalPages(data.pagination?.totalPages || 1);
      setIncomingFeed(
        (data.data || []).slice(0, 5),
      );
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    if (!supabase) return;

    const channel = supabase
      .channel("partner-applications-feed")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "partner_applications" },
        (payload) => {
          const incoming = payload.new as PartnerApplication;
          setIncomingFeed((prev) => [incoming, ...prev].slice(0, 5));
          void fetchApplications();
        },
      );

    channel.subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [supabase]);

  async function approveApplication(applicationId: string) {
    if (!confirm("Approve this professional services partner? They will join your referral network and earn commissions for qualified referrals. Ensure all compliance requirements are met before approval.")) {
      return;
    }

    setApproving(applicationId);
    setLastError(null);
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

      setActionErrors((prev) => ({ ...prev, [applicationId]: "" }));
      await fetchApplications();
    } catch (error) {
      console.error("Error approving application:", error);
      const message = error instanceof Error ? error.message : "Failed to approve";
      setActionErrors((prev) => ({ ...prev, [applicationId]: message }));
      setLastError(message);
    } finally {
      setApproving(null);
    }
  }

  async function rejectApplication(applicationId: string, message?: string, subject?: string) {
    if (!confirm("Reject this partner application? This action cannot be undone.")) {
      return;
    }

    setApproving(applicationId);
    setLastError(null);
    try {
      const response = await fetch("/api/admin/partner-applications/reject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId, message, subject }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to reject application");
      }

      setActionErrors((prev) => ({ ...prev, [applicationId]: "" }));
      await fetchApplications();
    } catch (error) {
      console.error("Error rejecting application:", error);
      const message = error instanceof Error ? error.message : "Failed to reject";
      setActionErrors((prev) => ({ ...prev, [applicationId]: message }));
      setLastError(message);
    } finally {
      setApproving(null);
    }
  }

  async function requestMoreInfo(applicationId: string, message: string, subject: string) {
    if (!confirm("Send a request for more info to this applicant?")) {
      return;
    }

    setApproving(applicationId);
    setLastError(null);
    try {
      const response = await fetch("/api/admin/partner-applications/request-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId, message, subject }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to send request");
      }

      setActionErrors((prev) => ({ ...prev, [applicationId]: "" }));
      await fetchApplications();
    } catch (error) {
      console.error("Error requesting more info:", error);
      const errMessage = error instanceof Error ? error.message : "Failed to send request";
      setActionErrors((prev) => ({ ...prev, [applicationId]: errMessage }));
      setLastError(errMessage);
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

  const formatRelativeTime = (dateString: string) => {
    const timestamp = Date.parse(dateString);
    if (Number.isNaN(timestamp)) return "Just now";
    const minutes = Math.floor((Date.now() - timestamp) / 60000);
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

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
              <p className="text-sm text-slate-600">Active Professional Partners</p>
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

      {/* Incoming Applications Feed */}
      <Card className="p-5 border border-blue-200/70 bg-blue-50/60">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-700">
              Incoming Applications
            </p>
            <p className="text-sm text-blue-900">Live feed updates when new applications arrive.</p>
          </div>
          <span className="text-xs font-semibold text-blue-700">
            {incomingFeed.length} recent
          </span>
        </div>
        {incomingFeed.length === 0 ? (
          <div className="rounded-lg border border-dashed border-blue-200 bg-white px-4 py-5 text-sm text-blue-700">
            No new applications yet.
          </div>
        ) : (
          <div className="space-y-3">
            {incomingFeed.map((app) => (
              <div key={app.id} className="rounded-lg border border-blue-200/70 bg-white px-4 py-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {app.name || "New applicant"}
                    </p>
                    <p className="text-xs text-slate-500">
                      {app.company || "Company pending"} · {app.email}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-blue-700">
                    {formatRelativeTime(app.created_at)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {lastError && (
        <Card className="border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <span className="font-semibold">Last error:</span> {lastError}
          </div>
        </Card>
      )}

      {/* Filter Tabs */}
      <Card className="p-4">
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setFilter("all");
              setCurrentPage(1);
            }}
          >
            All ({totalItems})
          </Button>
          <Button
            variant={filter === "pending" ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setFilter("pending");
              setCurrentPage(1);
            }}
          >
            Pending ({pendingCount})
          </Button>
          <Button
            variant={filter === "approved" ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setFilter("approved");
              setCurrentPage(1);
            }}
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
                      onClick={() => {
                        const templateId = replySelection[app.id];
                        const template = replyTemplates.find((item) => item.id === templateId);
                        void rejectApplication(app.id, template?.body, template?.subject);
                      }}
                      disabled={approving === app.id}
                      variant="destructive"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                    <Button
                      onClick={() => {
                        const templateId = replySelection[app.id];
                        const template = replyTemplates.find((item) => item.id === templateId);
                        if (!template) {
                          alert("Select a reply template before requesting more info.");
                          return;
                        }
                        if (template.id.startsWith("reject")) {
                          alert("Select a request template (not a reject template).");
                          return;
                        }
                        void requestMoreInfo(app.id, template.body, template.subject);
                      }}
                      disabled={approving === app.id}
                      variant="outline"
                    >
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Request Info
                    </Button>
                  </div>
                )}
              </div>
              {actionErrors[app.id] && (
                <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
                  {actionErrors[app.id]}
                </div>
              )}

              {app.status === "pending" && (
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <label className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-600">
                    Quick reply template
                  </label>
                  <select
                    value={replySelection[app.id] ?? ""}
                    onChange={(event) =>
                      setReplySelection((prev) => ({
                        ...prev,
                        [app.id]: event.target.value,
                      }))
                    }
                    className="min-w-[240px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                  >
                    <option value="">Select a template...</option>
                    {replyTemplates.map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

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

              {(app.referralSource || app.referralUtmCampaign) && (
                <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold">
                  <span className="uppercase tracking-[0.08em] text-slate-600">Referral Source</span>
                  {app.referralSource && (
                    <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-blue-700">
                      {app.referralSource.replaceAll("_", " ")}
                    </span>
                  )}
                  {app.referralUtmCampaign && (
                    <span className="rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-slate-600">
                      utm_campaign: {app.referralUtmCampaign}
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
                          href={`/r/${app.customer.referral_code}`}
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
          />
        </div>
      )}
    </div>
  );
}
