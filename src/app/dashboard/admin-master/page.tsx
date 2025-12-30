/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck - Complex Supabase type inference with multiple joined queries
export const dynamic = "force-dynamic";

import { createServiceClient } from "@/lib/supabase";
import { requireAdmin } from "@/lib/admin-auth";
import { formatAmount } from "@/lib/stripe";
import Link from "next/link";
import { ChevronDown, Mail, Users, Link as LinkIcon, TrendingUp, DollarSign, Activity } from "lucide-react";

export default async function MasterAdminDashboard() {
  // Require admin access using RBAC system
  await requireAdmin();

  // Use service client to bypass RLS and fetch ALL data across all accounts
  const supabase = await createServiceClient();

  // Fetch comprehensive cross-account data with deep relationships

  // 1. ALL USERS & BUSINESSES
  const { data: allBusinesses } = await supabase
    .from("businesses")
    .select(`
      *,
      owner:users!owner_id(id, email, created_at, last_sign_in_at)
    `)
    .order("created_at", { ascending: false });

  const { data: allCustomers } = await supabase
    .from("customers")
    .select("*")
    .order("created_at", { ascending: false });

  // 2. ALL CAMPAIGNS WITH MESSAGE COUNTS
  const { data: allCampaigns } = await supabase
    .from("campaigns")
    .select(`
      *,
      business:businesses(id, name)
    `)
    .order("created_at", { ascending: false });

  // 3. ALL CAMPAIGN MESSAGES (email tracking)
  const { data: allCampaignMessages } = await supabase
    .from("campaign_messages")
    .select(`
      *,
      campaign:campaigns(id, name, business_id),
      customer:customers(id, name, email)
    `)
    .order("created_at", { ascending: false });

  // 4. ALL REFERRAL EVENTS (link clicks, conversions)
  const { data: allReferralEvents } = await supabase
    .from("referral_events")
    .select(`
      *,
      business:businesses(id, name),
      ambassador:customers!ambassador_id(id, name, email, referral_code)
    `)
    .order("created_at", { ascending: false });

  // 5. ALL REFERRALS
  const { data: allReferrals } = await supabase
    .from("referrals")
    .select(`
      *,
      business:businesses(id, name),
      customer:customers(id, email, name),
      ambassador:customers!referrer_id(id, email, name, referral_code)
    `)
    .order("created_at", { ascending: false });

  // 6. ALL PAYMENTS
  const { data: allPayments } = await supabase
    .from("stripe_payments")
    .select(`
      *,
      business:businesses(id, name, owner_id)
    `)
    .order("created_at", { ascending: false });

  // 7. ALL COMMISSIONS
  const { data: allCommissions } = await supabase
    .from("stripe_commissions")
    .select(`
      *,
      ambassador:customers!ambassador_id(id, email, name),
      business:businesses(id, name)
    `)
    .order("created_at", { ascending: false });

  // Calculate comprehensive per-customer metrics
  const businessMetrics = allBusinesses?.map((business: any) => {
    // Customers/Ambassadors for this business
    const businessCustomers = allCustomers?.filter((c: any) => c.business_id === business.id) || [];
    const totalAmbassadors = businessCustomers.length;

    // Campaigns for this business
    const businessCampaigns = allCampaigns?.filter((c: any) => c.business_id === business.id) || [];
    const totalCampaigns = businessCampaigns.length;
    const activeCampaigns = businessCampaigns.filter((c: any) => c.status === "active").length;

    // Campaign messages (emails sent)
    const campaignIds = businessCampaigns.map((c: any) => c.id);
    const businessMessages = allCampaignMessages?.filter((m: any) =>
      campaignIds.includes(m.campaign_id)
    ) || [];
    const totalEmailsSent = businessMessages.length;
    const emailsDelivered = businessMessages.filter((m: any) => m.status === "delivered" || m.status === "sent").length;
    const emailsFailed = businessMessages.filter((m: any) => m.status === "failed").length;

    // Referral events (link clicks, page views)
    const businessEvents = allReferralEvents?.filter((e: any) => e.business_id === business.id) || [];
    const linkClicks = businessEvents.filter((e: any) => e.event_type === "link_click").length;
    const pageViews = businessEvents.filter((e: any) => e.event_type === "page_view").length;

    // Referrals and conversions
    const businessReferrals = allReferrals?.filter((r: any) => r.business_id === business.id) || [];
    const totalReferrals = businessReferrals.length;
    const convertedReferrals = businessReferrals.filter((r: any) => r.status === "converted").length;
    const conversionRate = totalReferrals > 0 ? ((convertedReferrals / totalReferrals) * 100).toFixed(1) : "0.0";

    // Payments and revenue
    const businessPayments = allPayments?.filter((p: any) => p.business_id === business.id) || [];
    const totalRevenue = businessPayments
      .filter((p: any) => p.status === "succeeded")
      .reduce((sum: number, p: any) => sum + p.amount_total, 0);
    const succeededPayments = businessPayments.filter((p: any) => p.status === "succeeded").length;

    // Commissions
    const businessCommissions = allCommissions?.filter((c: any) => c.business_id === business.id) || [];
    const totalCommissions = businessCommissions.reduce((sum: number, c: any) => sum + c.amount, 0);
    const paidCommissions = businessCommissions.filter((c: any) => c.status === "paid").reduce((sum: number, c: any) => sum + c.amount, 0);

    // Get unique referral codes used by this business's ambassadors
    const referralCodes = businessCustomers
      .filter((c: any) => c.referral_code)
      .map((c: any) => ({
        code: c.referral_code,
        ambassadorName: c.name,
        ambassadorEmail: c.email,
        ambassadorId: c.id,
        // Get events for this specific code
        clicks: businessEvents.filter((e: any) => e.ambassador_id === c.id && e.event_type === "link_click").length,
        referrals: businessReferrals.filter((r: any) => r.referrer_id === c.id).length,
        conversions: businessReferrals.filter((r: any) => r.referrer_id === c.id && r.status === "converted").length,
      }));

    return {
      business,
      metrics: {
        totalAmbassadors,
        totalCampaigns,
        activeCampaigns,
        totalEmailsSent,
        emailsDelivered,
        emailsFailed,
        emailDeliveryRate: totalEmailsSent > 0 ? ((emailsDelivered / totalEmailsSent) * 100).toFixed(1) : "0.0",
        linkClicks,
        pageViews,
        totalReferrals,
        convertedReferrals,
        conversionRate,
        totalRevenue,
        succeededPayments,
        totalCommissions,
        paidCommissions,
        referralCodes,
      }
    };
  }) || [];

  // Platform-wide aggregates
  const totalUsers = allBusinesses?.length || 0;
  const activeBusinesses = allBusinesses?.filter((b: any) => b.is_active !== false).length || 0;
  const totalCustomers = allCustomers?.length || 0;
  const totalEmailsSent = allCampaignMessages?.length || 0;
  const totalLinkClicks = allReferralEvents?.filter((e: any) => e.event_type === "link_click").length || 0;
  const totalReferrals = allReferrals?.length || 0;
  const convertedReferrals = allReferrals?.filter((r: any) => r.status === "converted").length || 0;
  const platformConversionRate = totalReferrals > 0
    ? ((convertedReferrals / totalReferrals) * 100).toFixed(1)
    : "0.0";

  const totalRevenue = allPayments?.reduce((sum: number, p: any) =>
    sum + (p.status === "succeeded" ? p.amount_total : 0), 0) || 0;
  const totalCommissions = allCommissions?.reduce((sum: number, c: any) => sum + c.amount, 0) || 0;

  // Sort businesses by activity (most active first)
  const sortedBusinessMetrics = businessMetrics.sort((a, b) => {
    const scoreA = a.metrics.totalEmailsSent + a.metrics.linkClicks + a.metrics.totalReferrals;
    const scoreB = b.metrics.totalEmailsSent + b.metrics.linkClicks + b.metrics.totalReferrals;
    return scoreB - scoreA;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-4 sm:p-8">
      <div className="max-w-[1920px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2">
              Enterprise Control Center
            </h1>
            <p className="text-gray-600 text-lg">
              Deep insights, real-time tracking, complete platform visibility
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/dashboard/admin-payments"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
            >
              Payments View
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold transition-colors"
            >
              ← Main Dashboard
            </Link>
          </div>
        </div>

        {/* Platform-Wide KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-sm font-semibold text-gray-600">Total Customers</p>
            </div>
            <p className="text-4xl font-black text-blue-600">{totalUsers}</p>
            <p className="text-xs text-gray-500 mt-2">{activeBusinesses} active · {totalCustomers} total ambassadors</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-sm font-semibold text-gray-600">Total Revenue</p>
            </div>
            <p className="text-4xl font-black text-green-600">{formatAmount(totalRevenue)}</p>
            <p className="text-xs text-gray-500 mt-2">Commissions: {formatAmount(totalCommissions)}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <p className="text-sm font-semibold text-gray-600">Referrals</p>
            </div>
            <p className="text-4xl font-black text-purple-600">{totalReferrals}</p>
            <p className="text-xs text-gray-500 mt-2">{convertedReferrals} converted · {platformConversionRate}% rate</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Activity className="h-6 w-6 text-orange-600" />
              </div>
              <p className="text-sm font-semibold text-gray-600">Platform Activity</p>
            </div>
            <p className="text-4xl font-black text-orange-600">{totalLinkClicks}</p>
            <p className="text-xs text-gray-500 mt-2">{totalEmailsSent} emails sent</p>
          </div>
        </div>

        {/* Customer Deep Dive Section */}
        <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700 to-slate-900 px-6 py-5">
            <h2 className="text-2xl font-bold text-white">
              Customer Deep Dive ({totalUsers} Accounts)
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              Comprehensive per-customer metrics, email tracking, referral performance, and transaction data
            </p>
          </div>

          <div className="divide-y divide-gray-200">
            {sortedBusinessMetrics.map((item) => {
              const { business, metrics } = item;

              return (
                <details key={business.id} className="group">
                  <summary className="px-6 py-5 hover:bg-slate-50 cursor-pointer transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">{business.name}</h3>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            business.is_active !== false
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}>
                            {business.is_active !== false ? "Active" : "Inactive"}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{business.owner?.email}</p>

                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-3">
                          <div className="bg-blue-50 rounded-lg p-3">
                            <p className="text-xs text-blue-600 font-semibold mb-1">Ambassadors</p>
                            <p className="text-2xl font-black text-blue-700">{metrics.totalAmbassadors}</p>
                          </div>
                          <div className="bg-purple-50 rounded-lg p-3">
                            <p className="text-xs text-purple-600 font-semibold mb-1">Emails Sent</p>
                            <p className="text-2xl font-black text-purple-700">{metrics.totalEmailsSent}</p>
                          </div>
                          <div className="bg-orange-50 rounded-lg p-3">
                            <p className="text-xs text-orange-600 font-semibold mb-1">Link Clicks</p>
                            <p className="text-2xl font-black text-orange-700">{metrics.linkClicks}</p>
                          </div>
                          <div className="bg-pink-50 rounded-lg p-3">
                            <p className="text-xs text-pink-600 font-semibold mb-1">Referrals</p>
                            <p className="text-2xl font-black text-pink-700">{metrics.totalReferrals}</p>
                          </div>
                          <div className="bg-green-50 rounded-lg p-3">
                            <p className="text-xs text-green-600 font-semibold mb-1">Revenue</p>
                            <p className="text-lg font-black text-green-700">{formatAmount(metrics.totalRevenue)}</p>
                          </div>
                          <div className="bg-emerald-50 rounded-lg p-3">
                            <p className="text-xs text-emerald-600 font-semibold mb-1">Conv. Rate</p>
                            <p className="text-2xl font-black text-emerald-700">{metrics.conversionRate}%</p>
                          </div>
                        </div>
                      </div>
                      <ChevronDown className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform ml-4 flex-shrink-0" />
                    </div>
                  </summary>

                  {/* Expanded Details */}
                  <div className="px-6 py-6 bg-slate-50 border-t border-slate-200">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                      {/* Email & Campaign Metrics */}
                      <div className="bg-white rounded-lg p-5 shadow-sm border border-slate-200">
                        <div className="flex items-center gap-2 mb-4">
                          <Mail className="h-5 w-5 text-purple-600" />
                          <h4 className="text-md font-bold text-gray-900">Email & Campaign Performance</h4>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Total Campaigns</span>
                            <span className="font-bold text-gray-900">{metrics.totalCampaigns}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Active Campaigns</span>
                            <span className="font-bold text-green-600">{metrics.activeCampaigns}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Emails Sent</span>
                            <span className="font-bold text-purple-600">{metrics.totalEmailsSent}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Delivered</span>
                            <span className="font-bold text-green-600">{metrics.emailsDelivered}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Failed</span>
                            <span className="font-bold text-red-600">{metrics.emailsFailed}</span>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t">
                            <span className="text-sm font-semibold text-gray-700">Delivery Rate</span>
                            <span className="font-black text-blue-600">{metrics.emailDeliveryRate}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Referral & Conversion Metrics */}
                      <div className="bg-white rounded-lg p-5 shadow-sm border border-slate-200">
                        <div className="flex items-center gap-2 mb-4">
                          <TrendingUp className="h-5 w-5 text-emerald-600" />
                          <h4 className="text-md font-bold text-gray-900">Referral & Conversion Tracking</h4>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Link Clicks</span>
                            <span className="font-bold text-orange-600">{metrics.linkClicks}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Page Views</span>
                            <span className="font-bold text-gray-900">{metrics.pageViews}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Total Referrals</span>
                            <span className="font-bold text-purple-600">{metrics.totalReferrals}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Converted</span>
                            <span className="font-bold text-green-600">{metrics.convertedReferrals}</span>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t">
                            <span className="text-sm font-semibold text-gray-700">Conversion Rate</span>
                            <span className="font-black text-emerald-600">{metrics.conversionRate}%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold text-gray-700">Click-to-Referral</span>
                            <span className="font-bold text-blue-600">
                              {metrics.linkClicks > 0 ? ((metrics.totalReferrals / metrics.linkClicks) * 100).toFixed(1) : "0.0"}%
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Revenue & Commissions */}
                      <div className="bg-white rounded-lg p-5 shadow-sm border border-slate-200">
                        <div className="flex items-center gap-2 mb-4">
                          <DollarSign className="h-5 w-5 text-green-600" />
                          <h4 className="text-md font-bold text-gray-900">Revenue & Commissions</h4>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Total Revenue</span>
                            <span className="font-bold text-green-600">{formatAmount(metrics.totalRevenue)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Successful Payments</span>
                            <span className="font-bold text-gray-900">{metrics.succeededPayments}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Total Commissions</span>
                            <span className="font-bold text-purple-600">{formatAmount(metrics.totalCommissions)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Paid Out</span>
                            <span className="font-bold text-emerald-600">{formatAmount(metrics.paidCommissions)}</span>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t">
                            <span className="text-sm font-semibold text-gray-700">Net Revenue</span>
                            <span className="font-black text-blue-600">
                              {formatAmount(metrics.totalRevenue - metrics.totalCommissions)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Referral Codes & Links Performance */}
                      <div className="bg-white rounded-lg p-5 shadow-sm border border-slate-200">
                        <div className="flex items-center gap-2 mb-4">
                          <LinkIcon className="h-5 w-5 text-blue-600" />
                          <h4 className="text-md font-bold text-gray-900">Active Referral Codes ({metrics.referralCodes.length})</h4>
                        </div>
                        {metrics.referralCodes.length > 0 ? (
                          <div className="space-y-2 max-h-64 overflow-y-auto">
                            {metrics.referralCodes.slice(0, 10).map((codeData, i) => (
                              <div key={i} className="bg-slate-50 rounded p-3 border border-slate-200">
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex-1">
                                    <p className="font-mono text-sm font-bold text-blue-600">{codeData.code}</p>
                                    <p className="text-xs text-gray-600 mt-0.5">{codeData.ambassadorName || codeData.ambassadorEmail}</p>
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 gap-2 mt-2">
                                  <div className="text-center">
                                    <p className="text-xs text-gray-500">Clicks</p>
                                    <p className="text-sm font-bold text-orange-600">{codeData.clicks}</p>
                                  </div>
                                  <div className="text-center">
                                    <p className="text-xs text-gray-500">Referrals</p>
                                    <p className="text-sm font-bold text-purple-600">{codeData.referrals}</p>
                                  </div>
                                  <div className="text-center">
                                    <p className="text-xs text-gray-500">Converted</p>
                                    <p className="text-sm font-bold text-green-600">{codeData.conversions}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                            {metrics.referralCodes.length > 10 && (
                              <p className="text-xs text-gray-500 text-center py-2">
                                + {metrics.referralCodes.length - 10} more codes
                              </p>
                            )}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500 text-center py-4">No referral codes yet</p>
                        )}
                      </div>

                    </div>

                    {/* Account Details Footer */}
                    <div className="mt-6 pt-4 border-t border-slate-200">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500 text-xs">Account Created</p>
                          <p className="font-semibold text-gray-900">{new Date(business.created_at).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs">Last Login</p>
                          <p className="font-semibold text-gray-900">
                            {business.owner?.last_sign_in_at
                              ? new Date(business.owner.last_sign_in_at).toLocaleDateString()
                              : "Never"}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs">Business ID</p>
                          <p className="font-mono text-xs text-gray-600">{business.id.slice(0, 8)}...</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs">Owner ID</p>
                          <p className="font-mono text-xs text-gray-600">{business.owner_id.slice(0, 8)}...</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </details>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
