"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { analytics } from "@/components/Analytics";

function Tracker() {
  const params = useSearchParams();
  useEffect(() => {
    const sessionId = params.get("session_id") ?? undefined;
    analytics.blueprintPurchaseCompleted(sessionId);
  }, [params]);
  return null;
}

export default function PurchaseTracker() {
  return (
    <Suspense fallback={null}>
      <Tracker />
    </Suspense>
  );
}
