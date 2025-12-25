import { Skeleton } from "@/components/Skeleton";

export default function PaymentLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 via-white to-white px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-blue-100 p-8 text-center">
        {/* Loading Icon */}
        <div className="mb-6">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-blue-100 to-sky-100 shadow-lg shadow-blue-200/50">
            <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full" />
          </div>
        </div>

        {/* Title Skeleton */}
        <Skeleton className="h-8 w-64 mx-auto mb-3" />

        {/* Message Skeleton */}
        <Skeleton className="h-4 w-80 max-w-full mx-auto mb-8" />

        {/* Payment Details Skeleton */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl p-6 mb-6 border border-gray-100">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-20" />
            </div>
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-gray-200">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <p className="text-sm text-gray-500 animate-pulse">
          Verifying payment details...
        </p>
      </div>
    </div>
  );
}
