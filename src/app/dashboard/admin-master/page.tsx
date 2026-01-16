/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = "force-dynamic";

import Link from "next/link";
import { Activity, Building2, ClipboardList, Link as LinkIcon, Users } from "lucide-react";

import { requireAdmin } from "@/lib/admin-auth";
import { createServiceClient } from "@/lib/supabase";
import { AdminDiagnosticsPanel } from "./AdminDiagnosticsPanel";
import { ExternalPartnerDatasetDeliveryPanel } from "./ExternalPartnerDatasetDeliveryPanel";
import { AdminBusinessExplorerPanel } from "./AdminBusinessExplorerPanel";
import { AdminExternalPartnerRequestsPanel } from "./AdminExternalPartnerRequestsPanel";
import { AdminServiceApplicationsPanel } from "./AdminServiceApplicationsPanel";

export default async function MasterAdminDashboard() {
  const admin = await requireAdmin();
  const supabase = await createServiceClient();

  const since30Days = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

  const [
    businessesCountResult,
    customersCountResult,
    referralsCountResult,
    referralsCompletedCountResult,
    campaignsCountResult,
    linkVisits30Result,
    externalPartnerRequestsResult,
    recentEventsResult,
  ] = await Promise.all([
    supabase.from("businesses").select("id", { head: true, count: "exact" }),
    supabase.from("customers").select("id", { head: true, count: "exact" }),
    supabase.from("referrals").select("id", { head: true, count: "exact" }),
    supabase.from("referrals").select("id", { head: true, count: "exact" }).eq("status", "completed"),
    supabase.from("campaigns").select("id", { head: true, count: "exact" }),
    supabase
      .from("referral_events")
      .select("id", { head: true, count: "exact" })
      .eq("event_type", "link_visit")
      .gte("created_at", since30Days),
    supabase
      .from("external_partner_requests")
      .select(
        `
          id,
          status,
          created_at,
          business_id,
          businesses (
            name
          )
        `,
      )
      .order("created_at", { ascending: false })
      .limit(50),
    supabase
      .from("referral_events")
      .select(
        `
          id,
          business_id,
          ambassador_id,
          event_type,
          source,
          created_at,
          business:businesses(id, name),
          ambassador:customers!ambassador_id(id, name, email, referral_code)
        `,
      )
      .order("created_at", { ascending: false })
      .limit(60),
  ]);

  const totalBusinesses = businessesCountResult.count ?? 0;
  const totalCustomers = customersCountResult.count ?? 0;
  const totalReferrals = referralsCountResult.count ?? 0;
  const completedReferrals = referralsCompletedCountResult.count ?? 0;
  const totalCampaigns = campaignsCountResult.count ?? 0;
  const linkVisitsLast30 = linkVisits30Result.count ?? 0;

  const externalPartnerRequests = (externalPartnerRequestsResult.data ?? []) as Array<{
    id: string;
    status: string;
    created_at: string;
    businesses?: { name?: string | null } | null;
  }>;

  const recentEvents = (recentEventsResult.data ?? []) as Array<{
    id: string;
    created_at: string;
    event_type: string;
    source: string | null;
    business?: { id: string; name: string | null } | null;
    ambassador?: { id: string; name: string | null; email: string | null; referral_code: string | null } | null;
  }>;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Master Admin</p>
            <h1 className="text-3xl font-black text-slate-900">Platform Control Center</h1>
            <p className="text-sm text-slate-600 mt-1">
              Cross-account diagnostics, business explorer, and operational tools.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Back to dashboard
            </Link>
          </div>
        </div>

        <AdminDiagnosticsPanel />

        <div className="grid gap-4 lg:grid-cols-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-slate-100 rounded-lg">
                <Building2 className="h-5 w-5 text-slate-700" />
              </div>
              <p className="text-sm font-semibold text-slate-600">Businesses</p>
            </div>
            <p className="text-4xl font-black text-slate-900">{totalBusinesses}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-slate-100 rounded-lg">
                <Users className="h-5 w-5 text-slate-700" />
              </div>
              <p className="text-sm font-semibold text-slate-600">Customers</p>
            </div>
            <p className="text-4xl font-black text-slate-900">{totalCustomers}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-slate-100 rounded-lg">
                <ClipboardList className="h-5 w-5 text-slate-700" />
              </div>
              <p className="text-sm font-semibold text-slate-600">Referrals</p>
            </div>
            <p className="text-4xl font-black text-slate-900">{totalReferrals}</p>
            <p className="text-xs text-slate-500 mt-2">{completedReferrals} completed</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-slate-100 rounded-lg">
                <LinkIcon className="h-5 w-5 text-slate-700" />
              </div>
              <p className="text-sm font-semibold text-slate-600">Activity</p>
            </div>
            <p className="text-4xl font-black text-slate-900">{linkVisitsLast30}</p>
            <p className="text-xs text-slate-500 mt-2">{totalCampaigns} campaigns total</p>
          </div>
        </div>

        <AdminBusinessExplorerPanel />

        <AdminServiceApplicationsPanel />

        <AdminExternalPartnerRequestsPanel currentAdminId={admin.id} />

        <ExternalPartnerDatasetDeliveryPanel
          requests={externalPartnerRequests.map((req) => ({
            id: req.id,
            created_at: req.created_at,
            status: req.status,
            businessName: req.businesses?.name ?? "—",
          }))}
        />

        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-slate-100 rounded-lg">
              <Activity className="h-5 w-5 text-slate-700" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Activity</p>
              <h2 className="text-xl font-black text-slate-900">Recent referral events</h2>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-xs uppercase tracking-[0.2em] text-slate-400">
                <tr>
                  <th className="py-2 text-left">Time</th>
                  <th className="py-2 text-left">Business</th>
                  <th className="py-2 text-left">Ambassador</th>
                  <th className="py-2 text-left">Event</th>
                  <th className="py-2 text-left">Source</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                {recentEvents.length === 0 ? (
                  <tr>
                    <td className="py-3 text-slate-500" colSpan={5}>
                      No recent events found.
                    </td>
                  </tr>
                ) : (
                  recentEvents.map((event) => (
                    <tr key={event.id} className="border-t border-slate-100">
                      <td className="py-3 whitespace-nowrap">{new Date(event.created_at).toLocaleString()}</td>
                      <td className="py-3">{event.business?.name ?? "—"}</td>
                      <td className="py-3">
                        {event.ambassador?.name ?? event.ambassador?.email ?? event.ambassador?.referral_code ?? "—"}
                      </td>
                      <td className="py-3 font-mono text-xs">{event.event_type}</td>
                      <td className="py-3">{event.source ?? "—"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
