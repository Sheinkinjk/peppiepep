"use client";

import { DashboardExplainerDialog } from "@/components/DashboardExplainerDialog";
import Link from "next/link";
import { Users, Send, TrendingUp, DollarSign, CheckCircle2, Circle, AlertCircle, ArrowRight, Info, Sparkles, Settings, CreditCard } from "lucide-react";
import { type StepChecklistItem, type StepChecklistItemKind, type StepValidations } from "@/lib/step-validation";
import { DashboardFreshnessIndicator } from "./DashboardFreshnessIndicator";

type DashboardHeaderProps = {
  ambassadorCount: number;
  referralCount: number;
  campaignsSent: number;
  revenue: number;
  validations: StepValidations;
  currentStep: string | null;
  overallProgress: number;
  showAdminLinks?: boolean;
};

export function DashboardHeader({
  ambassadorCount,
  referralCount,
  campaignsSent,
  revenue,
  validations,
  currentStep,
  overallProgress,
  showAdminLinks = false,
}: DashboardHeaderProps) {
  const steps = [
    { id: 'setup-integration', number: 1, label: 'Setup' },
    { id: 'clients-ambassadors', number: 2, label: 'Ambassadors' },
    { id: 'crm-integration', number: 3, label: 'Campaigns' },
    { id: 'view-campaigns', number: 4, label: 'Track' },
    { id: 'performance', number: 5, label: 'ROI' },
  ] as const;

  const openNextStep = () => {
    if (!currentStep || typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("pep-open-step", { detail: { stepId: currentStep } }));
  };

  const openStep = (stepId: string) => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("pep-open-step", { detail: { stepId } }));
  };

  const activeValidation = currentStep ? validations[currentStep as keyof StepValidations] : null;
  const groupedItems = (() => {
    if (!activeValidation) return null;
    const groups: Record<StepChecklistItemKind, StepChecklistItem[]> = {
      action_required: [],
      recommended: [],
      info_only: [],
    };
    activeValidation.items.forEach((item) => groups[item.kind].push(item));
    return groups;
  })();

  const nextActionsSummary = (() => {
    if (!activeValidation) return null;
    const required = activeValidation.items.filter((item) => item.kind === "action_required").length;
    const recommended = activeValidation.items.filter((item) => item.kind === "recommended").length;
    const info = activeValidation.items.filter((item) => item.kind === "info_only").length;
    return { required, recommended, info };
  })();

  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-xs text-slate-600 mt-1">
            See your status, your next step, and what to do next.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {showAdminLinks && (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/dashboard/admin-master"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50"
              >
                <Settings className="h-4 w-4" />
                Master Admin
              </Link>
              <Link
                href="/dashboard/admin-payments"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50"
              >
                <CreditCard className="h-4 w-4" />
                Admin Payments
              </Link>
            </div>
          )}
          <DashboardFreshnessIndicator />
          {currentStep && (
            <button
              type="button"
              onClick={openNextStep}
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-teal-600 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-teal-700"
            >
              Go to next step
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
          <DashboardExplainerDialog />
        </div>
      </div>

      {/* Setup Progress (merged into header) */}
      <div className="mb-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
        <div className="mb-2 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-slate-800">Setup Progress</h2>
            {currentStep && (
              <p className="mt-1 text-xs text-slate-600">
                Next up:{" "}
                <span className="font-semibold text-slate-900">
                  {steps.find((step) => step.id === currentStep)?.label ?? "Step"}
                </span>
              </p>
            )}
          </div>
          <span className="text-sm font-bold text-teal-700">{overallProgress}% Complete</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-200/70">
          <div
            className="h-full bg-gradient-to-r from-teal-600 to-teal-500 transition-all duration-500 ease-out"
            style={{ width: `${overallProgress}%` }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between">
          {steps.map((step, index) => {
            const validation = validations[step.id as keyof StepValidations];
            const isActive = currentStep === step.id;
            const isComplete = validation.isComplete;
            const hasActionRequired = validation.items.some((item) => item.kind === "action_required");

            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      isComplete
                        ? "border-teal-600 bg-teal-600"
                        : isActive
                          ? "border-teal-600 bg-white"
                          : hasActionRequired
                            ? "border-slate-300 bg-white"
                            : "border-slate-300 bg-white"
                    }`}
                    aria-label={`Step ${step.number}: ${step.label}`}
                  >
                    {isComplete ? (
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    ) : (
                      <span className={`text-xs font-bold ${isActive ? "text-teal-700" : "text-slate-400"}`}>
                        {step.number}
                      </span>
                    )}
                  </div>

                  <span
                    className={`mt-2 hidden text-xs font-medium text-center md:block ${
                      isActive ? "text-teal-700" : isComplete ? "text-slate-700" : "text-slate-400"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>

                {index < steps.length - 1 && (
                  <div className="mx-2 -mt-8 h-0.5 flex-1">
                    <div className={`h-full transition-all duration-300 ${isComplete ? "bg-teal-600" : "bg-slate-200"}`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Next actions (required vs optional vs info) */}
      {currentStep && activeValidation && (
        <details className="mb-4 rounded-2xl border border-slate-200 bg-white">
          <summary className="cursor-pointer list-none px-4 py-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Your next actions</p>
                <p className="mt-1 text-xs text-slate-700">
                  {nextActionsSummary
                    ? `${nextActionsSummary.required} required • ${nextActionsSummary.recommended} recommended • ${nextActionsSummary.info} info`
                    : "Open to see action items."}
                </p>
              </div>
              <button
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  openNextStep();
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-3 py-2 text-xs font-bold text-white hover:bg-teal-700"
              >
                Open step
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </summary>
          <div className="border-t border-slate-200 px-4 py-4">
            <p className="mb-4 text-xs text-slate-600">
              Focus on what&apos;s required first. Everything else is optional or informational.
            </p>
            <div className="space-y-4">
            {groupedItems && groupedItems.action_required.length > 0 ? (
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700">
                    <AlertCircle className="h-3.5 w-3.5" />
                    Action Required
                  </span>
                  <span className="text-xs text-slate-500">Must do</span>
                </div>
                <ul className="space-y-2">
                  {groupedItems.action_required.map((item, idx) => (
                    <li key={idx} className="rounded-xl border border-rose-100 bg-rose-50/30 p-3">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                        </div>
                        {item.cta && (
                          <button
                            type="button"
                            onClick={() => openStep(item.cta!.stepId)}
                            className="shrink-0 rounded-lg bg-rose-600 px-3 py-2 text-xs font-bold text-white hover:bg-rose-700"
                          >
                            {item.cta.label}
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3">
                <p className="text-sm font-semibold text-emerald-900">No required actions right now.</p>
                <p className="mt-0.5 text-xs text-emerald-900/80">
                  Move on to recommended improvements or open the next step.
                </p>
              </div>
            )}

            {groupedItems && groupedItems.recommended.length > 0 && (
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                    <Sparkles className="h-3.5 w-3.5" />
                    Recommended
                  </span>
                  <span className="text-xs text-slate-500">Optional</span>
                </div>
                <ul className="space-y-2">
                  {groupedItems.recommended.map((item, idx) => (
                    <li key={idx} className="rounded-xl border border-amber-100 bg-amber-50/30 p-3">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                        </div>
                        {item.cta && (
                          <button
                            type="button"
                            onClick={() => openStep(item.cta!.stepId)}
                            className="shrink-0 rounded-lg border border-amber-300 bg-white px-3 py-2 text-xs font-bold text-amber-800 hover:bg-amber-50"
                          >
                            {item.cta.label}
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {groupedItems && groupedItems.info_only.length > 0 && (
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                    <Info className="h-3.5 w-3.5" />
                    Info Only
                  </span>
                  <span className="text-xs text-slate-500">Context</span>
                </div>
                <ul className="space-y-2">
                  {groupedItems.info_only.map((item, idx) => (
                    <li key={idx} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <div className="flex items-start gap-2">
                        <Circle className="mt-0.5 h-3.5 w-3.5 shrink-0 fill-slate-400 text-slate-400" />
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                          <p className="mt-0.5 text-xs text-slate-600">{item.where}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          </div>
        </details>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Ambassadors */}
        <StatCard
          label="Ambassadors"
          value={ambassadorCount}
          icon={<Users className="h-4 w-4" />}
          emptyMessage="No ambassadors yet"
          emptySubtext="Complete Step 2 to add your first ambassador"
        />

        {/* Referrals */}
        <StatCard
          label="Referrals"
          value={referralCount}
          icon={<TrendingUp className="h-4 w-4" />}
          emptyMessage="No referrals tracked"
          emptySubtext="Share referral links to start tracking"
        />

        {/* Campaigns */}
        <StatCard
          label="Campaigns"
          value={campaignsSent}
          icon={<Send className="h-4 w-4" />}
          emptyMessage="No campaigns sent"
          emptySubtext="Launch your first campaign in Step 3"
        />

        {/* Revenue */}
        <StatCard
          label="Revenue"
          value={`$${Math.round(revenue)}`}
          icon={<DollarSign className="h-4 w-4" />}
          isRevenue
          emptyMessage="$0 tracked"
          emptySubtext="Revenue appears when referrals convert"
        />
      </div>
    </div>
  );
}

type StatCardProps = {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  isRevenue?: boolean;
  emptyMessage: string;
  emptySubtext: string;
};

function StatCard({
  label,
  value,
  icon,
  isRevenue = false,
  emptyMessage,
  emptySubtext,
}: StatCardProps) {
  const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]/g, '')) : value;
  const isEmpty = numericValue === 0;

  return (
    <div
      className={`rounded-xl border p-5 transition-all duration-200 ${
        isRevenue
          ? "bg-emerald-50 border-emerald-200"
          : "bg-slate-50 border-slate-200"
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className={`${isRevenue ? 'text-emerald-700' : 'text-slate-500'}`}>
          {icon}
        </div>
        <p
          className={`text-xs font-semibold uppercase tracking-wide ${
            isRevenue ? "text-emerald-700" : "text-slate-500"
          }`}
        >
          {label}
        </p>
      </div>

      {isEmpty ? (
        <div>
          <p
            className={`text-2xl font-bold ${
              isRevenue ? "text-emerald-900" : "text-slate-900"
            }`}
          >
            {emptyMessage}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {emptySubtext}
          </p>
        </div>
      ) : (
        <p
          className={`text-4xl font-bold ${
            isRevenue ? "text-emerald-900" : "text-slate-900"
          }`}
        >
          {value}
        </p>
      )}
    </div>
  );
}
