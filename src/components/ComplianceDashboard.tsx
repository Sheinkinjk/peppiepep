"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  FileText,
  AlertCircle,
} from "lucide-react";

interface ComplianceStats {
  total_partners: number;
  pending_verification: number;
  verified: number;
  expired: number;
  failed: number;
  by_service_type: Record<string, number>;
  expiring_soon: number;
}

interface Partner {
  id: string;
  name: string;
  email: string;
  service_provider_type: string | null;
  compliance_status: string;
  compliance_verified_at: string | null;
  partner_since_date: string | null;
  professional_license_number: string | null;
  license_jurisdiction: string | null;
  last_compliance_check: string | null;
  partner_tier: string | null;
  businesses: {
    id: string;
    name: string;
    service_provider_type: string | null;
    regulated_industry: boolean;
  } | null;
}

export function ComplianceDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<ComplianceStats | null>(null);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "verified" | "expired" | "failed">("all");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchComplianceData();
  }, [filter]);

  async function fetchComplianceData() {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filter !== "all") {
        params.set("status", filter);
      }

      const response = await fetch(`/api/admin/compliance?${params.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch compliance data");
      }

      const data = await response.json();
      setStats(data.stats);
      setPartners(data.partners || []);
    } catch (err) {
      console.error("Error fetching compliance data:", err);
      setError(err instanceof Error ? err.message : "Failed to load compliance data");
    } finally {
      setLoading(false);
    }
  }

  async function updateCompliance(
    customerId: string,
    status: string,
    verificationType?: string,
    notes?: string
  ) {
    try {
      const response = await fetch("/api/admin/compliance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_id: customerId,
          status,
          verification_type: verificationType,
          verification_notes: notes,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update compliance");
      }

      // Refresh data
      await fetchComplianceData();
    } catch (err) {
      console.error("Error updating compliance:", err);
      alert("Failed to update compliance status");
    }
  }

  if (loading) {
    return (
      <Card className="p-8">
        <div className="text-center text-slate-600">Loading compliance dashboard...</div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-8 border-red-200 bg-red-50">
        <div className="text-center text-red-800">{error}</div>
      </Card>
    );
  }

  const serviceTypeLabels: Record<string, string> = {
    law: "Law Firms",
    accounting: "Accounting",
    consulting: "Consulting",
    financial_advisory: "Financial Advisory",
    insurance: "Insurance",
    recruiting: "Recruiting",
    other: "Other",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Compliance Dashboard</h2>
          <p className="text-sm text-slate-600 mt-1">
            Manage professional services partner compliance and verification
          </p>
        </div>
        <Button onClick={fetchComplianceData} variant="outline" size="sm">
          Refresh
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <ShieldCheck className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Partners</p>
              <p className="text-2xl font-bold text-slate-900">{stats?.total_partners || 0}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-100 rounded-lg">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Pending</p>
              <p className="text-2xl font-bold text-slate-900">{stats?.pending_verification || 0}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-100 rounded-lg">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Verified</p>
              <p className="text-2xl font-bold text-slate-900">{stats?.verified || 0}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Expired</p>
              <p className="text-2xl font-bold text-slate-900">{stats?.expired || 0}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Failed</p>
              <p className="text-2xl font-bold text-slate-900">{stats?.failed || 0}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Service Type Breakdown */}
      {stats && Object.keys(stats.by_service_type).length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Partners by Service Type</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(stats.by_service_type).map(([type, count]) => (
              <div key={type} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-sm text-slate-600 mb-1">
                  {serviceTypeLabels[type] || type}
                </p>
                <p className="text-2xl font-bold text-slate-900">{count}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Expiring Soon Alert */}
      {stats && stats.expiring_soon > 0 && (
        <Card className="p-4 border-orange-200 bg-orange-50">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            <div>
              <p className="text-sm font-semibold text-orange-900">
                {stats.expiring_soon} compliance record(s) expiring in the next 30 days
              </p>
              <p className="text-xs text-orange-700">Review and renew before expiration</p>
            </div>
          </div>
        </Card>
      )}

      {/* Filter Buttons */}
      <Card className="p-4">
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            All ({stats?.total_partners || 0})
          </Button>
          <Button
            variant={filter === "pending" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("pending")}
          >
            Pending ({stats?.pending_verification || 0})
          </Button>
          <Button
            variant={filter === "verified" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("verified")}
          >
            Verified ({stats?.verified || 0})
          </Button>
          <Button
            variant={filter === "expired" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("expired")}
          >
            Expired ({stats?.expired || 0})
          </Button>
          <Button
            variant={filter === "failed" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("failed")}
          >
            Failed ({stats?.failed || 0})
          </Button>
        </div>
      </Card>

      {/* Partners List */}
      <div className="space-y-4">
        {partners.length === 0 ? (
          <Card className="p-8">
            <div className="text-center text-slate-600">
              No partners found with selected filter.
            </div>
          </Card>
        ) : (
          partners.map((partner) => (
            <Card key={partner.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-slate-900">{partner.name}</h3>
                    {partner.compliance_status === "pending" && (
                      <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                        Pending Verification
                      </span>
                    )}
                    {partner.compliance_status === "verified" && (
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Verified
                      </span>
                    )}
                    {partner.compliance_status === "expired" && (
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
                        Expired
                      </span>
                    )}
                    {partner.compliance_status === "failed" && (
                      <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                        Failed
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600">{partner.email}</p>
                  {partner.businesses && (
                    <p className="text-sm text-slate-500 mt-1">
                      Business: {partner.businesses.name}
                      {partner.businesses.regulated_industry && (
                        <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                          Regulated Industry
                        </span>
                      )}
                    </p>
                  )}
                </div>

                {partner.compliance_status === "pending" && (
                  <div className="flex gap-2">
                    <Button
                      onClick={() =>
                        updateCompliance(partner.id, "verified", "manual_review", "Manually verified by admin")
                      }
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Verify
                    </Button>
                    <Button
                      onClick={() =>
                        updateCompliance(partner.id, "failed", "manual_review", "Failed verification")
                      }
                      size="sm"
                      variant="destructive"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>

              {/* Partner Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Service Type</p>
                  <p className="font-medium text-slate-900">
                    {partner.service_provider_type
                      ? serviceTypeLabels[partner.service_provider_type] || partner.service_provider_type
                      : "Not specified"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Partner Tier</p>
                  <p className="font-medium text-slate-900 capitalize">
                    {partner.partner_tier || "Standard"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">License Number</p>
                  <p className="font-medium text-slate-900">
                    {partner.professional_license_number || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Jurisdiction</p>
                  <p className="font-medium text-slate-900">
                    {partner.license_jurisdiction || "N/A"}
                  </p>
                </div>
              </div>

              {/* Timestamps */}
              <div className="mt-4 pt-4 border-t border-slate-200 flex flex-wrap gap-4 text-xs text-slate-500">
                {partner.partner_since_date && (
                  <span>
                    Partner since: {new Date(partner.partner_since_date).toLocaleDateString()}
                  </span>
                )}
                {partner.compliance_verified_at && (
                  <span>
                    Verified: {new Date(partner.compliance_verified_at).toLocaleDateString()}
                  </span>
                )}
                {partner.last_compliance_check && (
                  <span>
                    Last checked: {new Date(partner.last_compliance_check).toLocaleDateString()}
                  </span>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
