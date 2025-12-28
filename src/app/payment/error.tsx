'use client';

import { ErrorShell } from "@/components/errors/ErrorShell";

export default function PaymentError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorShell
      title="Payment page error"
      message="We hit an issue loading payment information. If you attempted a payment, contact support before retrying."
      error={error}
      reset={reset}
      primaryCtaLabel="Retry"
    />
  );
}
