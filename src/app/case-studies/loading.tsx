"use client";

import { Skeleton } from "@/components/Skeleton";

export default function CaseStudiesLoading() {
  return (
    <main
      className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100"
      aria-busy="true"
      aria-labelledby="case-studies-loading-heading"
    >
      <h1 id="case-studies-loading-heading" className="sr-only">
        Loading case studies
      </h1>
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 space-y-10 animate-pulse">
        <div className="rounded-3xl border border-cyan-200 bg-white/80 p-6 shadow-lg shadow-cyan-100/60">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="mt-3 h-10 w-3/4" />
          <Skeleton className="mt-2 h-4 w-full" />
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, idx) => (
              <Skeleton key={idx} className="h-8 w-full rounded-full" />
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="mt-2 h-6 w-3/4" />
              <Skeleton className="mt-2 h-4 w-full" />
              <div className="mt-4 grid gap-3">
                {Array.from({ length: 3 }).map((_, metricIdx) => (
                  <div key={metricIdx} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3">
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="mt-2 h-5 w-1/3" />
                    <Skeleton className="mt-1 h-3 w-2/3" />
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                {Array.from({ length: 4 }).map((_, flowIdx) => (
                  <Skeleton key={flowIdx} className="h-4 w-full" />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="mt-2 h-7 w-2/3" />
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="mt-3 h-10 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
