"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { RefreshCw } from "lucide-react";

type RefreshDetail = {
  source?: string;
  ok?: boolean;
};

function formatRelative(msAgo: number) {
  if (msAgo < 5_000) return "just now";
  if (msAgo < 60_000) return `${Math.max(1, Math.floor(msAgo / 1_000))}s ago`;
  if (msAgo < 60 * 60_000) return `${Math.floor(msAgo / 60_000)}m ago`;
  return `${Math.floor(msAgo / (60 * 60_000))}h ago`;
}

export function DashboardFreshnessIndicator() {
  const [lastUpdatedAt, setLastUpdatedAt] = useState(() => Date.now());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const inFlightRef = useRef(0);

  const label = useMemo(() => {
    const msAgo = now - lastUpdatedAt;
    return `Last updated: ${formatRelative(msAgo)}`;
  }, [lastUpdatedAt, now]);

  useEffect(() => {
    const tick = setInterval(() => {
      setNow(Date.now());
    }, 5_000);

    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    const handleStart = (event: Event) => {
      void (event as CustomEvent<RefreshDetail>).detail;
      inFlightRef.current += 1;
      setIsRefreshing(true);
    };

    const handleEnd = (event: Event) => {
      const detail = (event as CustomEvent<RefreshDetail>).detail;
      if (!detail || detail.ok !== false) {
        setLastUpdatedAt(Date.now());
      }
      inFlightRef.current = Math.max(0, inFlightRef.current - 1);
      setIsRefreshing(inFlightRef.current > 0);
    };

    window.addEventListener("pep-refresh-start", handleStart);
    window.addEventListener("pep-refresh-end", handleEnd);

    return () => {
      window.removeEventListener("pep-refresh-start", handleStart);
      window.removeEventListener("pep-refresh-end", handleEnd);
    };
  }, []);

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 shadow-sm">
      <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin text-teal-600" : "text-slate-400"}`} />
      <span>{label}</span>
    </div>
  );
}
