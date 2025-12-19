// @ts-nocheck
export const dynamic = "force-dynamic";

import { createServerComponentClient } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { formatAmount } from "@/lib/stripe";
import Link from "next/link";

export default async function MasterAdminDashboard() {
  const supabase = await createServerComponentClient();

  // Check if user is jarred@referlabs.com.au
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== "jarred@referlabs.com.au") {
    redirect("/dashboard");
  }

  // Fetch comprehensive cross-account data

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

  // 2. ALL PAYMENTS (no limit)
  const { data: allPayments } = await supabase
    .from("stripe_payments")
    .select(`
      *,
      business:businesses(id, name, owner_id)
    `)
    .order("created_at", { ascending: false });

  // 3. ALL COMMISSIONS
  const { data: allCommissions } = await supabase
    .from("stripe_commissions")
    .select(`
      *,
      ambassador:customers!ambassador_id(id, email, name),
      business:businesses(id, name)
    `)
    .order("created_at", { ascending: false });

  // 4. ALL REFERRALS
  const { data: allReferrals } = await supabase
    .from("referrals")
    .select(`
      *,
      business:businesses(id, name),
      customer:customers(id, email, name),
      ambassador:customers!referrer_id(id, email, name)
    `)
    .order("created_at", { ascending: false });

  // 5. ALL CAMPAIGNS
  const { data: allCampaigns } = await supabase
    .from("campaigns")
    .select(`
      *,
      business:businesses(id, name)
    `)
    .order("created_at", { ascending: false });

  // 6. AMBASSADOR BALANCES
  const { data: ambassadorBalances } = await supabase
    .from("ambassador_commission_balances")
    .select("*")
    .order("lifetime_earnings", { ascending: false });

  // Calculate Platform-Wide Metrics
  const totalUsers = allBusinesses?.length || 0;
  const activeBusinesses = allBusinesses?.filter(b => b.is_active !== false).length || 0;
  const totalCustomers = allCustomers?.length || 0;

  // Revenue Metrics
  const totalRevenue = allPayments?.reduce((sum, p) =>
    sum + (p.status === "succeeded" ? p.amount_total : 0), 0) || 0;
  const succeededPayments = allPayments?.filter(p => p.status === "succeeded") || [];
  const failedPayments = allPayments?.filter(p => p.status === "failed") || [];

  // Calculate MRR (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recentPayments = allPayments?.filter(p =>
    new Date(p.created_at) > thirtyDaysAgo && p.status === "succeeded"
  ) || [];
  const mrr = recentPayments.reduce((sum, p) => sum + p.amount_total, 0);

  // Commission Metrics
  const totalCommissionsValue = allCommissions?.reduce((sum, c) => sum + c.amount, 0) || 0;
  const pendingCommissionsValue = allCommissions?.filter(c => c.status === "approved")
    .reduce((sum, c) => sum + c.amount, 0) || 0;
  const paidCommissionsValue = allCommissions?.filter(c => c.status === "paid")
    .reduce((sum, c) => sum + c.amount, 0) || 0;

  // Referral Metrics
  const totalReferrals = allReferrals?.length || 0;
  const convertedReferrals = allReferrals?.filter(r => r.status === "converted").length || 0;
  const conversionRate = totalReferrals > 0
    ? ((convertedReferrals / totalReferrals) * 100).toFixed(1)
    : "0.0";

  // Campaign Metrics
  const activeCampaigns = allCampaigns?.filter(c => c.status === "active").length || 0;
  const totalCampaigns = allCampaigns?.length || 0;

  // Top Performing Ambassadors (by referrals)
  const referralsByAmbassador = allReferrals?.reduce((acc, ref) => {
    const ambassadorId = ref.referrer_id;
    if (!ambassadorId) return acc;
    if (!acc[ambassadorId]) {
      acc[ambassadorId] = {
        ambassador: ref.ambassador,
        count: 0,
        converted: 0,
      };
    }
    acc[ambassadorId].count++;
    if (ref.status === "converted") acc[ambassadorId].converted++;
    return acc;
  }, {} as Record<string, any>);

  const topAmbassadors = Object.values(referralsByAmbassador || {})
    .sort((a: any, b: any) => b.count - a.count)
    .slice(0, 10);

  // Revenue by Business
  const revenueByBusiness = allPayments?.reduce((acc, payment) => {
    if (payment.status !== "succeeded") return acc;
    const businessId = payment.business_id;
    if (!businessId) return acc;
    if (!acc[businessId]) {
      acc[businessId] = {
        business: payment.business,
        revenue: 0,
        payments: 0,
      };
    }
    acc[businessId].revenue += payment.amount_total;
    acc[businessId].payments++;
    return acc;
  }, {} as Record<string, any>);

  const topBusinesses = Object.values(revenueByBusiness || {})
    .sort((a: any, b: any) => b.revenue - a.revenue)
    .slice(0, 10);

  // Growth Metrics (last 7 days vs previous 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const fourteenDaysAgo = new Date();
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

  const newUsersThisWeek = allBusinesses?.filter(b =>
    new Date(b.created_at) > sevenDaysAgo
  ).length || 0;
  const newUsersLastWeek = allBusinesses?.filter(b =>
    new Date(b.created_at) > fourteenDaysAgo && new Date(b.created_at) <= sevenDaysAgo
  ).length || 0;
  const userGrowth = newUsersLastWeek > 0
    ? (((newUsersThisWeek - newUsersLastWeek) / newUsersLastWeek) * 100).toFixed(1)
    : newUsersThisWeek > 0 ? "+100" : "0";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-4 sm:p-8">
      <div className="max-w-[1920px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2">
              Master Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Platform-wide analytics and cross-account insights
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

        {/* Platform Overview Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <p className="text-sm font-semibold text-gray-600 mb-1">Total Users</p>
            <p className="text-4xl font-black text-blue-600">{totalUsers}</p>
            <p className="text-xs text-gray-500 mt-2">
              {activeBusinesses} active businesses
            </p>
            <p className="text-xs text-green-600 font-semibold mt-1">
              {userGrowth}% vs last week
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <p className="text-sm font-semibold text-gray-600 mb-1">Total Revenue</p>
            <p className="text-4xl font-black text-green-600">{formatAmount(totalRevenue)}</p>
            <p className="text-xs text-gray-500 mt-2">
              {succeededPayments.length} successful payments
            </p>
            <p className="text-xs text-gray-600 font-semibold mt-1">
              MRR: {formatAmount(mrr)}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <p className="text-sm font-semibold text-gray-600 mb-1">Total Referrals</p>
            <p className="text-4xl font-black text-purple-600">{totalReferrals}</p>
            <p className="text-xs text-gray-500 mt-2">
              {convertedReferrals} converted
            </p>
            <p className="text-xs text-purple-600 font-semibold mt-1">
              {conversionRate}% conversion rate
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
            <p className="text-sm font-semibold text-gray-600 mb-1">Total Customers</p>
            <p className="text-4xl font-black text-orange-600">{totalCustomers}</p>
            <p className="text-xs text-gray-500 mt-2">
              {ambassadorBalances?.length || 0} ambassadors with earnings
            </p>
            <p className="text-xs text-orange-600 font-semibold mt-1">
              {activeCampaigns} active campaigns
            </p>
          </div>
        </div>

        {/* Commission Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm font-semibold opacity-90 mb-1">Total Commissions</p>
            <p className="text-3xl font-black">{formatAmount(totalCommissionsValue)}</p>
            <p className="text-xs opacity-80 mt-2">
              {allCommissions?.length || 0} total commissions
            </p>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm font-semibold opacity-90 mb-1">Pending Payouts</p>
            <p className="text-3xl font-black">{formatAmount(pendingCommissionsValue)}</p>
            <p className="text-xs opacity-80 mt-2">
              {allCommissions?.filter(c => c.status === "approved").length || 0} approved
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm font-semibold opacity-90 mb-1">Paid Out</p>
            <p className="text-3xl font-black">{formatAmount(paidCommissionsValue)}</p>
            <p className="text-xs opacity-80 mt-2">
              {allCommissions?.filter(c => c.status === "paid").length || 0} paid commissions
            </p>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Businesses by Revenue */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white">
                Top Businesses by Revenue
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Business
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Revenue
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Payments
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {topBusinesses.length > 0 ? (
                    topBusinesses.map((item: any, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="text-sm font-semibold text-gray-900">
                            {item.business?.name || "Unknown"}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-green-600">
                          {formatAmount(item.revenue)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {item.payments}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                        No revenue data yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Ambassadors by Referrals */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white">
                Top Ambassadors by Referrals
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Ambassador
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Referrals
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Converted
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {topAmbassadors.length > 0 ? (
                    topAmbassadors.map((item: any, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="text-sm font-semibold text-gray-900">
                            {item.ambassador?.name || "Unknown"}
                          </div>
                          <div className="text-xs text-gray-500">
                            {item.ambassador?.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-purple-600">
                          {item.count}
                        </td>
                        <td className="px-6 py-4 text-sm text-green-600 font-semibold">
                          {item.converted}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                        No referral data yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* All Businesses Table */}
        <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700 to-slate-900 px-6 py-4">
            <h2 className="text-xl font-bold text-white">
              All Registered Businesses ({totalUsers})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Business Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Owner Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Last Sign In
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allBusinesses && allBusinesses.length > 0 ? (
                  allBusinesses.map((business) => (
                    <tr key={business.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-900">
                          {business.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          ID: {business.id}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {business.owner?.email || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(business.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {business.owner?.last_sign_in_at
                          ? new Date(business.owner.last_sign_in_at).toLocaleDateString()
                          : "Never"}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          business.is_active !== false
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                          {business.is_active !== false ? "Active" : "Inactive"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      No businesses found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Success/Failure Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Payment Status Distribution
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm font-semibold text-gray-700">Succeeded</p>
                  <p className="text-2xl font-black text-green-600">
                    {succeededPayments.length}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total Value</p>
                  <p className="text-lg font-bold text-green-700">
                    {formatAmount(totalRevenue)}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                <div>
                  <p className="text-sm font-semibold text-gray-700">Failed</p>
                  <p className="text-2xl font-black text-red-600">
                    {failedPayments.length}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Success Rate</p>
                  <p className="text-lg font-bold text-gray-700">
                    {allPayments && allPayments.length > 0
                      ? ((succeededPayments.length / allPayments.length) * 100).toFixed(1)
                      : "0"}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Campaign Activity
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm font-semibold text-gray-700">Active Campaigns</p>
                  <p className="text-2xl font-black text-blue-600">
                    {activeCampaigns}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-lg font-bold text-gray-700">
                    {totalCampaigns}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div>
                  <p className="text-sm font-semibold text-gray-700">Avg Referrals/Campaign</p>
                  <p className="text-2xl font-black text-purple-600">
                    {totalCampaigns > 0
                      ? (totalReferrals / totalCampaigns).toFixed(1)
                      : "0"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Conversion</p>
                  <p className="text-lg font-bold text-gray-700">
                    {conversionRate}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white">
              Recent Platform Activity (Last 50)
            </h2>
          </div>
          <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
            {allPayments && allPayments.slice(0, 20).map((payment) => (
              <div key={payment.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">
                      Payment {payment.status === "succeeded" ? "✅" : "❌"} - {payment.business?.name || "Unknown"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(payment.created_at).toLocaleString()} · {formatAmount(payment.amount_total)}
                    </p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                    payment.status === "succeeded"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {payment.status}
                  </span>
                </div>
              </div>
            ))}
            {allReferrals && allReferrals.slice(0, 20).map((referral) => (
              <div key={referral.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">
                      New Referral - {referral.ambassador?.name || "Unknown Ambassador"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(referral.created_at).toLocaleString()} · {referral.business?.name}
                    </p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                    referral.status === "converted"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {referral.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
