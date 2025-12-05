"use client";

import { cn } from "@/lib/utils";

type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%]",
        className
      )}
      style={{
        animation: "shimmer 2s ease-in-out infinite",
      }}
    />
  );
}

// Specialized skeleton components for common patterns
export function SkeletonText({ className }: SkeletonProps) {
  return <Skeleton className={cn("h-4 w-full", className)} />;
}

export function SkeletonAvatar({ className }: SkeletonProps) {
  return <Skeleton className={cn("h-10 w-10 rounded-full", className)} />;
}

export function SkeletonButton({ className }: SkeletonProps) {
  return <Skeleton className={cn("h-9 w-20", className)} />;
}

export function SkeletonBadge({ className }: SkeletonProps) {
  return <Skeleton className={cn("h-6 w-16 rounded-full", className)} />;
}

export function SkeletonCard({ className }: SkeletonProps) {
  return (
    <div className={cn("rounded-lg border border-slate-200 bg-white p-6", className)}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-32" />
        </div>
        <Skeleton className="h-20 w-full" />
      </div>
    </div>
  );
}

// Table row skeleton
export function SkeletonTableRow({ columns = 5 }: { columns?: number }) {
  return (
    <div className="flex items-center gap-4 border-b border-slate-100 px-4 py-3">
      {Array.from({ length: columns }).map((_, i) => (
        <div key={i} className="flex-1">
          <Skeleton className={cn("h-4", i === 0 ? "w-3/4" : "w-full")} />
        </div>
      ))}
    </div>
  );
}

// Stats card skeleton
export function SkeletonStatsCard() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <SkeletonText className="w-24 h-3" />
          <Skeleton className="h-7 w-20" />
        </div>
        <Skeleton className="h-10 w-10 rounded-lg" />
      </div>
      <div className="mt-3">
        <Skeleton className="h-3 w-32" />
      </div>
    </div>
  );
}
