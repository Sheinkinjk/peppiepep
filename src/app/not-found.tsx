'use client';

import { ErrorShell } from "@/components/errors/ErrorShell";

export default function NotFound() {
  return (
    <ErrorShell
      title="Page not found"
      message="That page doesn’t exist or has been moved. Use the Status page to confirm everything is healthy, or log in and continue."
      reset={null}
      error={null}
      showGoHome
      showGoBack
      showLogin
    />
  );
}
