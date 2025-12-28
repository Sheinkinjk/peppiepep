"use client";

import { useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";

import { createBrowserSupabaseClient } from "@/lib/supabase-browser";

type DashboardRealtimeSyncProps = {
  businessId: string;
  enabled?: boolean;
};

const DEFAULT_TABLES = [
  "customers",
  "referrals",
  "referral_events",
  "campaigns",
  "campaign_messages",
  "discount_redemptions",
  "stripe_commissions",
] as const;

export function DashboardRealtimeSync({ businessId, enabled = true }: DashboardRealtimeSyncProps) {
  const router = useRouter();
  const hasSupabaseConfig = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
  const supabase = useMemo(
    () => (hasSupabaseConfig ? createBrowserSupabaseClient() : null),
    [hasSupabaseConfig],
  );
  const refreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastRefreshAtRef = useRef<number>(0);

  useEffect(() => {
    if (!enabled) return;
    if (!businessId) return;
    if (!supabase) return;

    const minRefreshIntervalMs = 2000;
    const debounceMs = 600;

    const requestRefresh = () => {
      if (typeof document !== "undefined" && document.hidden) return;

      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("pep-refresh-start", { detail: { source: "realtime" } }));
      }

      const now = Date.now();
      const sinceLast = now - lastRefreshAtRef.current;
      if (sinceLast < minRefreshIntervalMs) {
        if (refreshTimerRef.current) return;
        refreshTimerRef.current = setTimeout(() => {
          refreshTimerRef.current = null;
          lastRefreshAtRef.current = Date.now();
          router.refresh();
          if (typeof window !== "undefined") {
            window.setTimeout(() => {
              window.dispatchEvent(new CustomEvent("pep-refresh-end", { detail: { source: "realtime", ok: true } }));
            }, 800);
          }
        }, minRefreshIntervalMs - sinceLast);
        return;
      }

      if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
      refreshTimerRef.current = setTimeout(() => {
        refreshTimerRef.current = null;
        lastRefreshAtRef.current = Date.now();
        router.refresh();
        if (typeof window !== "undefined") {
          window.setTimeout(() => {
            window.dispatchEvent(new CustomEvent("pep-refresh-end", { detail: { source: "realtime", ok: true } }));
          }, 800);
        }
      }, debounceMs);
    };

    const channel = supabase.channel(`dashboard-realtime-${businessId}`);

    DEFAULT_TABLES.forEach((table) => {
      channel.on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table,
          filter: `business_id=eq.${businessId}`,
        },
        requestRefresh,
      );
    });

    channel.subscribe();

    const onVisibilityChange = () => {
      if (!document.hidden) requestRefresh();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
      refreshTimerRef.current = null;
      void supabase.removeChannel(channel);
    };
  }, [businessId, enabled, router, supabase]);

  return null;
}
