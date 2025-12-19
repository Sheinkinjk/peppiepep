// @ts-nocheck
export const dynamic = "force-dynamic";

import { createServerComponentClient } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { formatAmount } from "@/lib/stripe";
import Link from "next/link";

export default async function AdminPaymentsPage() {
  const supabase = createServerComponentClient();

  // Check if user is jarred@referlabs.com.au
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== "jarred@referlabs.com.au") {
    redirect("/dashboard");
  }

  // Fetch payments
  const { data: payments } = await supabase
    .from("stripe_payments")
    .select(
      `
      *,
      business:businesses(id, name)
    `
    )
    .order("created_at", { ascending: false })
    .limit(50);

  // Fetch commissions
  const { data: commissions } = await supabase
    .from("stripe_commissions")
    .select(
      `
      *,
      ambassador:customers!ambassador_id(id, email, name),
      referral:referrals(id, type),
      payment:stripe_payments(id, amount_total)
    `
    )
    .order("created_at", { ascending: false })
    .limit(50);

  // Fetch ambassador balances
  const { data: balances } = await supabase
    .from("ambassador_commission_balances")
    .select("*")
    .order("lifetime_earnings", { ascending: false });

  // Calculate totals
  const totalPayments = payments?.reduce((sum, p) => sum + (p.status === "succeeded" ? p.amount_total : 0), 0) || 0;
  const totalCommissions = commissions?.reduce((sum, c) => sum + c.amount, 0) || 0;
  const pendingCommissions = commissions?.filter(c => c.status === "approved").reduce((sum, c) => sum + c.amount, 0) || 0;
  const paidCommissions = commissions?.filter(c => c.status === "paid").reduce((sum, c) => sum + c.amount, 0) || 0;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Admin - Payments & Commissions
          </h1>
          <div className="flex gap-4">
            <Link
              href="/dashboard/admin-master"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold transition-colors"
            >
              Master Dashboard
            </Link>
            <Link
              href="/api/admin/export?type=payments"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition-colors"
              download
            >
              Export Payments
            </Link>
            <Link
              href="/api/admin/export?type=commissions"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
              download
            >
              Export Commissions
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold transition-colors"
            >
              ← Dashboard
            </Link>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Total Payments</p>
            <p className="text-3xl font-bold text-green-600">
              {formatAmount(totalPayments)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {payments?.filter(p => p.status === "succeeded").length || 0} successful
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Total Commissions</p>
            <p className="text-3xl font-bold text-blue-600">
              {formatAmount(totalCommissions)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {commissions?.length || 0} total
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Pending Payouts</p>
            <p className="text-3xl font-bold text-yellow-600">
              {formatAmount(pendingCommissions)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {commissions?.filter(c => c.status === "approved").length || 0} approved
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Paid Out</p>
            <p className="text-3xl font-bold text-purple-600">
              {formatAmount(paidCommissions)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {commissions?.filter(c => c.status === "paid").length || 0} paid
            </p>
          </div>
        </div>

        {/* Ambassador Balances */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              Ambassador Balances
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
                    Pending
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Paid
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Lifetime
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Commissions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {balances && balances.length > 0 ? (
                  balances.map((balance) => (
                    <tr key={balance.customer_id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {balance.ambassador_name || "N/A"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {balance.ambassador_email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600 font-semibold">
                        {formatAmount(balance.pending_balance || 0)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">
                        {formatAmount(balance.paid_total || 0)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-semibold">
                        {formatAmount(balance.lifetime_earnings || 0)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {balance.pending_commissions || 0} pending /{" "}
                        {balance.paid_commissions || 0} paid
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No ambassador balances found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Payments */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Recent Payments</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Business
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Stripe ID
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payments && payments.length > 0 ? (
                  payments.map((payment) => (
                    <tr key={payment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(payment.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payment.business?.name || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {formatAmount(payment.amount_total)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            payment.status === "succeeded"
                              ? "bg-green-100 text-green-800"
                              : payment.status === "failed"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 font-mono">
                        {payment.stripe_payment_intent_id}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No payments found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Commissions */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              Recent Commissions
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Ambassador
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {commissions && commissions.length > 0 ? (
                  commissions.map((commission) => (
                    <tr key={commission.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(commission.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {commission.ambassador?.name || "N/A"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {commission.ambassador?.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {commission.commission_type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {formatAmount(commission.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            commission.status === "paid"
                              ? "bg-green-100 text-green-800"
                              : commission.status === "approved"
                              ? "bg-blue-100 text-blue-800"
                              : commission.status === "cancelled"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {commission.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No commissions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
