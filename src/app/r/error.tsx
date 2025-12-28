'use client';

import { ErrorShell } from "@/components/errors/ErrorShell";

export default function ReferralPageError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorShell
      title="Referral link error"
      message="We couldn’t load this referral page. It may be an invalid link or a temporary issue."
      error={error}
      reset={reset}
      primaryCtaLabel="Retry"
    />
  );
}
