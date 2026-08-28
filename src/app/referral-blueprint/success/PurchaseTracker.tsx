"use client";

/**
 * WARNING, 28 Aug 2026: this fires a $799 GA4 `purchase` on ANY visit to this
 * page. It never verified that a payment happened, and since the Blueprint shut
 * down on 26 Aug 2026 (Supabase project deleted, checkout route removed) no
 * payment can happen, so every event it now sends is phantom revenue. The page
 * itself stays alive on purpose, because buyers hold the link in their receipts.
 *
 * Left in place only because removing it is a behaviour change on a live page
 * and is Jarred's call. When it goes, delete `analytics.blueprintPurchaseCompleted`
 * in src/components/Analytics.tsx with it; that helper exists only for this file.
 */

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
