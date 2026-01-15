"use client";

import { ErrorBoundary } from "@/components/ErrorBoundary";

type DashboardSectionBoundaryProps = {
  children: React.ReactNode;
  title: string;
  message: string;
};

export function DashboardSectionBoundary({
  children,
  title,
  message,
}: DashboardSectionBoundaryProps) {
  return (
    <ErrorBoundary
      fallback={
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-900">
          <p className="font-semibold">{title}</p>
          <p className="mt-1 text-rose-800">{message}</p>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}
