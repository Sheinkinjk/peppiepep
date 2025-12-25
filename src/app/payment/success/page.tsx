import { redirect } from "next/navigation";
import Link from "next/link";
import { stripe } from "@/lib/stripe";

interface PageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function PaymentSuccessPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const sessionId = params.session_id;

  // Redirect to dashboard if no session ID provided
  if (!sessionId) {
    redirect("/dashboard");
  }

  // Verify the payment session with Stripe server-side
  let session;
  let paymentStatus = "unknown";
  let amount = 0;
  let currency = "usd";
  let customerEmail = "";

  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
    paymentStatus = session.payment_status || "unknown";
    amount = session.amount_total || 0;
    currency = session.currency || "usd";
    customerEmail = session.customer_details?.email || "";

    // Redirect to error page if payment not successful
    if (paymentStatus !== "paid") {
      redirect(`/payment/cancel?session_id=${sessionId}&status=${paymentStatus}`);
    }
  } catch (error) {
    console.error("Error verifying payment session:", error);
    // Redirect to cancel page if session is invalid
    redirect("/payment/cancel?error=invalid_session");
  }

  // Format amount for display
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 via-white to-white px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-green-100 p-8 text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 shadow-lg shadow-green-200/50">
            <svg
              className="h-10 w-10 text-green-600"
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
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Payment Successful!
        </h1>

        <p className="text-gray-600 mb-8">
          Thank you for your payment. Your transaction has been completed and verified.
        </p>

        {/* Payment Details */}
        <div className="bg-gradient-to-br from-gray-50 to-green-50/30 rounded-xl p-6 mb-6 border border-gray-100">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Amount Paid</span>
              <span className="text-lg font-bold text-gray-900">{formattedAmount}</span>
            </div>

            {customerEmail && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Receipt Email</span>
                <span className="text-sm font-medium text-gray-900">{customerEmail}</span>
              </div>
            )}

            <div className="flex justify-between items-center pt-3 border-t border-gray-200">
              <span className="text-sm text-gray-600">Payment Status</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-semibold">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Verified
              </span>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-4 mb-6">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <p className="text-sm text-blue-900 flex items-start gap-2">
              <svg className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>A confirmation email with receipt has been sent to <strong>{customerEmail || "your email address"}</strong>.</span>
            </p>
          </div>

          <p className="text-xs text-gray-500">
            Transaction ID: {sessionId.substring(0, 20)}...
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            href="/dashboard"
            className="inline-block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3.5 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
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
