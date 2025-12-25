'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 via-white to-white px-4">
      <Card className="max-w-md w-full p-8 text-center">
        {/* 404 Icon */}
        <div className="mb-6">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-slate-100 to-gray-100 shadow-lg shadow-slate-200/50">
            <Search className="h-10 w-10 text-slate-600" />
          </div>
        </div>

        {/* Title and Message */}
        <h1 className="text-6xl font-black text-slate-900 mb-3">
          404
        </h1>

        <h2 className="text-2xl font-bold text-slate-800 mb-3">
          Page Not Found
        </h2>

        <p className="text-slate-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Help Section */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 text-left">
          <p className="text-sm text-blue-900 font-medium mb-2">
            What you can do:
          </p>
          <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
            <li>Check the URL for typos</li>
            <li>Go back to the previous page</li>
            <li>Visit our homepage to start fresh</li>
            <li>Contact support if you believe this is an error</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            asChild
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3.5 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/30"
          >
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go to Homepage
            </Link>
          </Button>

          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="w-full border-2 border-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
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
