"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const session_id = searchParams.get("session_id");
    setSessionId(session_id);
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
            <svg
              className="h-8 w-8 text-green-600"
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

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Successful!
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for your payment. Your transaction has been completed successfully.
        </p>

        {sessionId && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 mb-1">Session ID</p>
            <p className="text-xs font-mono text-gray-700 break-all">
              {sessionId}
            </p>
          </div>
        )}

        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            A confirmation email has been sent to your email address.
          </p>

          <div className="pt-4">
            <Link
              href="/dashboard"
              className="inline-block w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
