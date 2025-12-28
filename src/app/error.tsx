'use client';

import { useEffect } from 'react';
import { ErrorShell } from "@/components/errors/ErrorShell";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Global error caught:', error);
  }, [error]);

  return (
    <html>
      <body>
        <ErrorShell
          title="Something went wrong"
          message="We hit an unexpected error. Try again, or check system status to confirm integrations are configured."
          error={error}
          reset={reset}
          primaryCtaLabel="Try again"
        />
      </body>
    </html>
  );
}
