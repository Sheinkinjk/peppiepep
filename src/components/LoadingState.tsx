import { Skeleton } from "@/components/Skeleton";
import { Spinner } from "@/components/ui/spinner";
import { ReactNode } from "react";

interface LoadingStateProps {
  loading: boolean;
  children: ReactNode;
  type?: "spinner" | "skeleton" | "table" | "grid";
  rows?: number;
  message?: string;
}

export function LoadingState({
  loading,
  children,
  type = "spinner",
  rows = 5,
  message = "Loading...",
}: LoadingStateProps) {
  if (!loading) {
    return <>{children}</>;
  }

  if (type === "spinner") {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Spinner size="lg" className="mb-4" />
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    );
  }

  if (type === "table") {
    return (
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 border-b border-slate-100 py-3">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex-1 space-y-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-48" />
            </div>
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-7 w-20" />
          </div>
        ))}
      </div>
    );
  }

  if (type === "grid") {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6">
            <Skeleton className="h-12 w-12 rounded-xl mb-4" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ))}
      </div>
    );
  }

  // Default skeleton type
  return (
    <div className="space-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="rounded-lg border border-slate-200 p-4">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      ))}
    </div>
  );
}
