"use client";

import { cn } from "@/lib/utils";

type DashboardStatProps = {
  label: string;
  value: React.ReactNode;
  detail?: string;
  tone?: "default" | "emerald" | "indigo" | "pink";
  className?: string;
};

const toneMap: Record<NonNullable<DashboardStatProps["tone"]>, string> = {
  default: "border-slate-200 bg-white/15 text-white",
  emerald: "border-emerald-100/70 bg-emerald-50 text-emerald-900",
  indigo: "border-indigo-100/70 bg-indigo-50 text-indigo-900",
  pink: "border-pink-100/70 bg-pink-50 text-pink-900",
};

export function DashboardStat({
  label,
  value,
  detail,
  tone = "default",
  className,
}: DashboardStatProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border px-3 py-2 shadow-sm",
        toneMap[tone],
        className,
      )}
    >
      <p className="text-[10px] uppercase tracking-[0.35em] opacity-80">
        {label}
      </p>
      <p className="text-lg font-black">{value}</p>
      {detail && <p className="text-xs opacity-80">{detail}</p>}
    </div>
  );
}
