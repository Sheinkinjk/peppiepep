"use client";

import { useState } from "react";
import { ShieldCheck, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface QAReadinessStep {
  id: string;
  title: string;
  detail: string;
  status: string;
  explainer: string | null;
  actionLabel?: string | null;
  actionSection?: string | null;
  actionScroll?: string | null;
  tone: string;
}

interface CollapsibleQAReadinessProps {
  qaReadinessSteps: QAReadinessStep[];
  overallProgress: number;
  SectionLink: React.ComponentType<{
    section: string;
    scrollTo?: string;
    className?: string;
    children: React.ReactNode;
  }>;
}

export function CollapsibleQAReadiness({
  qaReadinessSteps,
  overallProgress,
  SectionLink,
}: CollapsibleQAReadinessProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600">
            <ShieldCheck className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              QA Readiness
            </p>
            <h3 className="text-lg font-black text-slate-900">Core setup signals</h3>
            <p className="text-sm text-slate-600">
              Follow each step to confirm attribution, campaign flow, and ROI monitoring are fully connected.
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 transition-all hover:bg-slate-100 hover:border-slate-300"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-4 w-4" />
              Collapse
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4" />
              Expand
            </>
          )}
        </button>
      </div>

      {/* Progress bar - always visible */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Overall QA readiness</span>
          <span className="font-semibold text-slate-700">{overallProgress}%</span>
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-slate-100">
          <div
            className="h-2 rounded-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      {/* Collapsible content */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isExpanded ? "max-h-[2000px] opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
        )}
      >
        <div className="grid gap-3 lg:grid-cols-3">
          {qaReadinessSteps.map((step) => (
            <div
              key={step.id}
              className={`rounded-xl border px-4 py-3 transition-all ${
                step.tone === "emerald"
                  ? "border-emerald-200 bg-emerald-50/50"
                  : step.tone === "amber"
                    ? "border-amber-200 bg-amber-50/50"
                    : "border-slate-200 bg-slate-50"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 truncate">
                    {step.title}
                  </p>
                  <p className="mt-1.5 text-xs font-semibold text-slate-900 leading-snug">{step.detail}</p>
                </div>
                <div className="relative group flex-shrink-0">
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] cursor-default ${
                      step.tone === "emerald"
                        ? "border-emerald-200 bg-emerald-100 text-emerald-700"
                        : step.tone === "amber"
                          ? "border-amber-200 bg-amber-100 text-amber-700"
                          : "border-slate-200 bg-white text-slate-500"
                    }`}
                  >
                    {step.status}
                  </span>
                  {step.explainer && (
                    <div className="absolute right-0 top-full mt-1 z-50 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none">
                      <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[11px] text-slate-600 shadow-lg leading-relaxed">
                        {step.explainer}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {step.actionLabel && step.actionSection && (
                <div className="mt-2.5">
                  <SectionLink
                    section={step.actionSection}
                    scrollTo={step.actionScroll ?? undefined}
                    className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    {step.actionLabel}
                    <ArrowRight className="h-3 w-3" />
                  </SectionLink>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
