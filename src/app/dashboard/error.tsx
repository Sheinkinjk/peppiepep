'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Dashboard error caught:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 via-white to-white px-4">
      <Card className="max-w-md w-full p-8 text-center">
        {/* Error Icon */}
        <div className="mb-6">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-red-100 to-rose-100 shadow-lg shadow-red-200/50">
            <AlertTriangle className="h-10 w-10 text-red-600" />
          </div>
        </div>

        {/* Title and Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Dashboard Error
        </h1>

        <p className="text-gray-600 mb-6">
          We couldn't load your dashboard. This error has been logged and we'll investigate.
        </p>

        {/* Error Details (only in development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 text-left">
            <p className="text-xs font-mono text-gray-700 break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-gray-500 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Help Section */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 text-left">
          <p className="text-sm text-blue-900 font-medium mb-2">
            What you can try:
          </p>
          <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
            <li>Refresh the page to try loading again</li>
            <li>Check your internet connection</li>
            <li>Clear your browser cache and cookies</li>
            <li>Contact support if the issue persists</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={reset}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3.5 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/30"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-full border-2 border-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-50"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go to Homepage
            </Link>
          </Button>

          <Button
            asChild
            variant="link"
            className="w-full text-gray-600 font-medium py-2 px-6 rounded-lg hover:text-gray-900 text-sm"
          >
            <Link href="/contact">
              Contact Support
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
