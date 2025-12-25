import Link from "next/link";
import { stripe } from "@/lib/stripe";

interface PageProps {
  searchParams: Promise<{
    session_id?: string;
    status?: string;
    error?: string;
  }>;
}

export default async function PaymentCancelPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const sessionId = params.session_id;
  let status = params.status;
  const error = params.error;

  // Verify the session with Stripe if session ID is provided
  let verifiedStatus = status;
  let customerEmail = "";
  let amount = 0;
  let currency = "usd";

  if (sessionId && !error) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      verifiedStatus = session.payment_status || "unknown";
      customerEmail = session.customer_details?.email || "";
      amount = session.amount_total || 0;
      currency = session.currency || "usd";

      // Log the cancellation for analytics
      console.log("Payment cancelled:", {
        sessionId,
        status: verifiedStatus,
        email: customerEmail,
        amount,
      });
    } catch (stripeError) {
      console.error("Error verifying cancelled session:", stripeError);
      // If we can't verify, treat as invalid session
      verifiedStatus = "error";
    }
  }

  // Determine the cancellation reason
  let title = "Payment Cancelled";
  let message = "Your payment was cancelled. No charges were made to your account.";
  let reason = "";

  if (error === "invalid_session" || verifiedStatus === "error") {
    title = "Invalid Payment Session";
    message = "The payment session could not be verified. Please try again.";
    reason = "The payment link may have expired or is invalid.";
  } else if (verifiedStatus === "unpaid") {
    title = "Payment Incomplete";
    message = "Your payment was not completed.";
    reason = "The payment process was not finished.";
  } else if (verifiedStatus && verifiedStatus !== "paid") {
    title = "Payment Failed";
    message = "Your payment could not be processed.";
    reason = verifiedStatus === "unknown"
      ? "Unable to verify payment status."
      : `Payment status: ${verifiedStatus}`;
  }

  // Format amount if available
  const formattedAmount = amount > 0
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency.toUpperCase(),
      }).format(amount / 100)
    : null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-yellow-50 via-white to-white px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-yellow-100 p-8 text-center">
        {/* Warning Icon */}
        <div className="mb-6">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-yellow-100 to-amber-100 shadow-lg shadow-yellow-200/50">
            <svg
              className="h-10 w-10 text-yellow-600"
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
          </div>
        </div>

        {/* Title and Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {title}
        </h1>

        <p className="text-gray-600 mb-6">
          {message}
        </p>

        {/* Reason */}
        {reason && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-yellow-900 flex items-start gap-2">
              <svg className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{reason}</span>
            </p>
          </div>
        )}

        {/* Payment Details if available */}
        {formattedAmount && customerEmail && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
            <p className="text-sm font-semibold text-gray-900 mb-2">
              Transaction Details
            </p>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Amount: <span className="font-medium text-gray-900">{formattedAmount}</span></p>
              {customerEmail && (
                <p>Email: <span className="font-medium text-gray-900">{customerEmail}</span></p>
              )}
            </div>
          </div>
        )}

        {/* Session ID if available */}
        {sessionId && (
          <div className="bg-gray-50 rounded-lg p-3 mb-6">
            <p className="text-xs text-gray-500">
              Reference: {sessionId.substring(0, 20)}...
            </p>
          </div>
        )}

        {/* Help Section */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
          <p className="text-sm text-blue-900 font-medium mb-2">
            Need Help?
          </p>
          <p className="text-sm text-blue-800">
            If you experienced any issues or have questions about your payment, our support team is here to help.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            href="/pricing"
            className="inline-block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3.5 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
          >
            Try Again
          </Link>

          <Link
            href="/dashboard"
            className="inline-block w-full bg-white text-gray-700 font-semibold py-3 px-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Go to Dashboard
          </Link>

          <Link
            href="/contact"
            className="inline-block w-full text-gray-600 font-medium py-2 px-6 rounded-lg hover:text-gray-900 hover:bg-gray-50 transition-colors text-sm"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
