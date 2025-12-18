"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  getConnectAccountStatus,
  startOnboarding,
  requestPayout,
  formatPayoutAmount,
  meetsMinimumPayout,
  MINIMUM_PAYOUT,
  type ConnectAccountStatus,
} from "@/lib/stripe-payouts";

interface CommissionBalance {
  pending_balance: number;
  paid_total: number;
  lifetime_earnings: number;
  pending_commissions: number;
  paid_commissions: number;
  last_payout_date: string | null;
}

export default function PayoutsPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [connectStatus, setConnectStatus] = useState<ConnectAccountStatus | null>(null);
  const [balance, setBalance] = useState<CommissionBalance | null>(null);
  const [payoutLoading, setPayoutLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // TODO: Get these from your auth context
  const customerId = "REPLACE_WITH_ACTUAL_CUSTOMER_ID";
  const ambassadorId = "REPLACE_WITH_ACTUAL_CUSTOMER_ID";
  const userEmail = "REPLACE_WITH_ACTUAL_EMAIL";

  useEffect(() => {
    loadData();

    // Check for setup completion
    if (searchParams.get("setup") === "complete") {
      setSuccess("Payout account setup complete! You can now request payouts.");
    }
  }, [searchParams]);

  async function loadData() {
    try {
      setLoading(true);
      setError(null);

      // Load Connect account status
      const status = await getConnectAccountStatus(customerId);
      setConnectStatus(status);

      // Load commission balance
      // TODO: Create an API endpoint to fetch this
      // For now, using placeholder data
      setBalance({
        pending_balance: 15000, // $150 in cents
        paid_total: 0,
        lifetime_earnings: 15000,
        pending_commissions: 2,
        paid_commissions: 0,
        last_payout_date: null,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  async function handleSetupPayout() {
    try {
      setLoading(true);
      setError(null);
      await startOnboarding(customerId, userEmail);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start onboarding");
      setLoading(false);
    }
  }

  async function handleRequestPayout() {
    try {
      setPayoutLoading(true);
      setError(null);
      setSuccess(null);

      const result = await requestPayout(ambassadorId);

      if (result.success && result.payout) {
        setSuccess(
          `Payout of ${formatPayoutAmount(result.payout.amount)} initiated successfully! ` +
            `${result.payout.commissions_paid} commission(s) will be paid to your account.`
        );
        // Reload data
        await loadData();
      } else {
        setError(result.error || "Failed to create payout");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to request payout");
    } finally {
      setPayoutLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const needsOnboarding =
    !connectStatus?.exists || !connectStatus?.account?.payouts_enabled;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Commission Payouts
        </h1>

        {/* Alerts */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800">{success}</p>
          </div>
        )}

        {/* Balance Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Your Commission Balance
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pending Balance</p>
              <p className="text-3xl font-bold text-blue-600">
                {formatPayoutAmount(balance?.pending_balance || 0)}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Total Paid</p>
              <p className="text-3xl font-bold text-green-600">
                {formatPayoutAmount(balance?.paid_total || 0)}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Lifetime Earnings</p>
              <p className="text-3xl font-bold text-gray-900">
                {formatPayoutAmount(balance?.lifetime_earnings || 0)}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                {balance?.pending_commissions || 0} pending commission(s)
              </p>
              <p className="text-sm text-gray-600">
                {balance?.paid_commissions || 0} commission(s) paid out
              </p>
            </div>
            {balance?.last_payout_date && (
              <p className="text-sm text-gray-600">
                Last payout:{" "}
                {new Date(balance.last_payout_date).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>

        {/* Onboarding Card */}
        {needsOnboarding ? (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg
                  className="h-12 w-12 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Set Up Payouts
                </h3>
                <p className="text-gray-600 mb-6">
                  To receive commission payouts, you need to set up your payout
                  account with Stripe. This is a one-time setup that takes just
                  a few minutes.
                </p>
                <button
                  onClick={handleSetupPayout}
                  disabled={loading}
                  className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? "Loading..." : "Set Up Payout Account"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Request Payout
            </h3>

            {meetsMinimumPayout(balance?.pending_balance || 0) ? (
              <div>
                <p className="text-gray-600 mb-6">
                  You have {formatPayoutAmount(balance?.pending_balance || 0)}{" "}
                  available for payout. Funds will be transferred to your
                  connected bank account within 2-3 business days.
                </p>
                <button
                  onClick={handleRequestPayout}
                  disabled={payoutLoading}
                  className="bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {payoutLoading
                    ? "Processing..."
                    : `Request Payout of ${formatPayoutAmount(balance?.pending_balance || 0)}`}
                </button>
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <svg
                    className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold text-yellow-900 mb-1">
                      Minimum Payout Not Met
                    </p>
                    <p className="text-yellow-800">
                      You need at least {formatPayoutAmount(MINIMUM_PAYOUT)} to
                      request a payout. Your current balance is{" "}
                      {formatPayoutAmount(balance?.pending_balance || 0)}.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Account Status */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                Payout Account Status
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {connectStatus?.account?.payouts_enabled ? (
                    <svg
                      className="h-5 w-5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                  <span className="text-sm text-gray-600">Payouts enabled</span>
                </div>
                <div className="flex items-center gap-2">
                  {connectStatus?.account?.details_submitted ? (
                    <svg
                      className="h-5 w-5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                  <span className="text-sm text-gray-600">Details submitted</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
