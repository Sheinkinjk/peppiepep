import { Skeleton } from "@/components/Skeleton";
import { Crown } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div
        className="mx-auto max-w-7xl space-y-8 p-4 sm:p-6 lg:p-8"
        aria-busy="true"
        aria-live="polite"
      >
        {/* Hero skeleton */}
        <div className="relative overflow-hidden rounded-[28px] border border-[#20d7e3]/30 bg-gradient-to-br from-[#0abab5] via-[#11c6d4] to-[#0abab5] p-5 shadow-[0_20px_60px_rgba(10,171,181,0.2)]">
          <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),transparent_60%),radial-gradient(circle_at_bottom,_rgba(255,255,255,0.15),transparent_70%)]" />
          <div className="absolute -right-12 top-1/3 h-40 w-40 rounded-full bg-white/25 blur-3xl" />
          <div className="absolute -left-20 bottom-0 h-28 w-28 rounded-full bg-[#7ff6ff]/35 blur-3xl" />
          <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/70">
                <Crown className="h-4 w-4 text-[#1de9b6]" />
                <span>Welcome to your referral dashboard.</span>
              </div>
              <div>
                <Skeleton className="h-8 w-48 bg-white/20" />
                <Skeleton className="mt-2 h-4 w-64 bg-white/15" />
                <Skeleton className="mt-2 h-4 w-96 max-w-full bg-white/15" />
              </div>
            </div>
            <div className="grid w-full gap-3 sm:w-auto sm:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-white/20 bg-white/5 p-3">
                  <Skeleton className="h-3 w-20 bg-white/20" />
                  <Skeleton className="mt-2 h-6 w-12 bg-white/30" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Onboarding checklist skeleton */}
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white/80 p-4 sm:p-5">
          <div className="mb-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="mt-2 h-6 w-48" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/60 px-3 py-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tab navigation skeleton */}
        <div className="rounded-3xl border border-slate-200 bg-white/95 p-2 shadow-2xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-2xl" />
            ))}
          </div>
        </div>

        {/* Content cards skeleton */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200/80 bg-white/95 p-6 sm:p-8 shadow-xl">
            <div className="flex items-start gap-3 mb-6">
              <Skeleton className="h-12 w-12 rounded-2xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-10 rounded-lg" />
              <Skeleton className="h-10 rounded-lg" />
              <Skeleton className="h-24 rounded-xl" />
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200/80 bg-white/95 p-6 sm:p-8 shadow-xl">
            <div className="flex items-start gap-3 mb-6">
              <Skeleton className="h-12 w-12 rounded-2xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-10 rounded-lg" />
              <Skeleton className="h-10 rounded-lg" />
              <Skeleton className="h-24 rounded-xl" />
            </div>
          </div>
        </div>

        {/* Table skeleton */}
        <div className="rounded-3xl border border-slate-200/80 bg-white/95 p-6 sm:p-8 shadow-xl">
          <Skeleton className="mb-4 h-7 w-48" />
          <div className="space-y-3">
            <div className="flex gap-3">
              <Skeleton className="h-8 w-64 rounded-lg" />
              <Skeleton className="h-8 w-32 rounded-2xl" />
            </div>
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
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
          </div>
        </div>
      </div>
    </div>
  );
}
