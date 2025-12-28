'use client';

import { ErrorShell } from "@/components/errors/ErrorShell";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorShell
      title="Dashboard error"
      message="We couldn’t load your dashboard. Try again, or check Status for any missing integrations."
      error={error}
      reset={reset}
      primaryCtaLabel="Reload dashboard"
      showGoHome={false}
    />
  );
}
