"use client";

import { Skeleton } from "@/components/Skeleton";

export default function PricingLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="mx-auto w-full max-w-6xl space-y-10 px-4 py-12 sm:px-6 lg:px-8 animate-pulse">
        <section className="rounded-3xl border border-purple-500/20 bg-slate-900/70 p-8 shadow-2xl shadow-purple-900/40 backdrop-blur-xl">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="mt-4 h-12 w-3/4" />
          <Skeleton className="mt-3 h-4 w-full" />
          <Skeleton className="mt-3 h-4 w-5/6" />
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            {Array.from({ length: 3 }).map((_, idx) => (
              <Skeleton key={idx} className="h-10 w-40 rounded-full" />
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-purple-500/20 bg-slate-900/60 p-6 shadow-xl backdrop-blur">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Skeleton className="h-12 w-48 rounded-2xl" />
            <Skeleton className="h-12 w-48 rounded-2xl" />
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-purple-500/20 bg-slate-900/70 p-6 shadow-2xl shadow-purple-900/30"
            >
              <Skeleton className="h-4 w-24 rounded-full" />
              <Skeleton className="mt-4 h-10 w-1/2" />
              <Skeleton className="mt-2 h-4 w-2/3" />
              <Skeleton className="mt-2 h-4 w-1/3" />
              <Skeleton className="mt-6 h-12 w-full rounded-full" />
              <Skeleton className="mt-3 h-3 w-1/2" />

              <div className="mt-6 space-y-3">
                {Array.from({ length: 6 }).map((_, featureIdx) => (
                  <div key={featureIdx} className="flex items-center gap-3">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-4 flex-1" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="rounded-3xl border border-purple-500/20 bg-slate-900/70 p-8 shadow-2xl shadow-slate-900/50">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="mt-3 h-10 w-2/3" />
          <div className="mt-6 overflow-hidden rounded-2xl border border-purple-500/20">
            {Array.from({ length: 5 }).map((_, rowIdx) => (
              <div
                key={rowIdx}
                className="grid gap-4 border-b border-white/5 px-6 py-4 text-sm sm:grid-cols-4"
              >
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-purple-500/20 bg-slate-900/70 p-8 shadow-2xl shadow-purple-900/30">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="mt-3 h-8 w-1/2" />
          <div className="mt-6 space-y-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/5 bg-slate-800/70 p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-5 w-5 rounded-full" />
                </div>
                <Skeleton className="mt-3 h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-5/6" />
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-purple-500/20 bg-gradient-to-r from-purple-700/30 via-pink-600/30 to-purple-700/30 p-[2px] shadow-2xl shadow-purple-900/60">
          <div className="rounded-3xl bg-slate-950/90 p-8">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="mt-3 h-10 w-2/3" />
            <Skeleton className="mt-2 h-4 w-3/4" />
            <div className="mt-6 flex flex-wrap gap-4">
              <Skeleton className="h-12 w-48 rounded-full" />
              <Skeleton className="h-12 w-48 rounded-full" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
