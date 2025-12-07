"use client";

import { cn } from "@/lib/utils";

type DashboardSurfaceVariant = "hero" | "card" | "panel";

type DashboardSurfaceProps = {
  variant?: DashboardSurfaceVariant;
  className?: string;
  children: React.ReactNode;
};

const VARIANT_CLASSES: Record<DashboardSurfaceVariant, string> = {
  hero: "rounded-3xl border border-cyan-200 bg-gradient-to-br from-[#0abab5] via-[#11c6d4] to-[#12d1e3] text-white shadow-[0_25px_60px_rgba(10,171,181,0.25)]",
  card: "rounded-3xl border border-slate-200 bg-white/95 text-slate-900 shadow-xl shadow-slate-200/60",
  panel: "rounded-3xl border border-slate-200 bg-slate-50/90 text-slate-900 shadow-inner",
};

export function DashboardSurface({ variant = "card", className, children }: DashboardSurfaceProps) {
  return (
    <div className={cn(VARIANT_CLASSES[variant], className)}>
      {children}
    </div>
  );
}
