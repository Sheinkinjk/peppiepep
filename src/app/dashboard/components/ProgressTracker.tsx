"use client";

import { useMemo } from "react";
import { CheckCircle2, Circle, Info, Sparkles, AlertTriangle } from "lucide-react";
import { type StepChecklistItem, type StepChecklistItemKind, type StepValidations } from "@/lib/step-validation";

type ProgressTrackerProps = {
  validations: StepValidations;
  currentStep: string | null;
  overallProgress: number;
};

export function ProgressTracker({
  validations,
  currentStep,
  overallProgress,
}: ProgressTrackerProps) {
  const steps = [
    { id: 'setup-integration', number: 1, label: 'Setup' },
    { id: 'clients-ambassadors', number: 2, label: 'Ambassadors' },
    { id: 'crm-integration', number: 3, label: 'Campaigns' },
    { id: 'view-campaigns', number: 4, label: 'Track' },
    { id: 'performance', number: 5, label: 'ROI' },
  ];

  const activeValidation = currentStep ? validations[currentStep as keyof StepValidations] : null;

  const groupedItems = useMemo(() => {
    if (!activeValidation) return null;
    const groups: Record<StepChecklistItemKind, StepChecklistItem[]> = {
      action_required: [],
      recommended: [],
      info_only: [],
    };
    activeValidation.items.forEach((item) => groups[item.kind].push(item));
    return groups;
  }, [activeValidation]);

  const openStep = (stepId: string) => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("pep-open-step", { detail: { stepId } }));
  };

  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Overall Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold text-slate-700">Setup Progress</h2>
          <span className="text-sm font-bold text-teal-700">{overallProgress}% Complete</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-600 to-teal-500 transition-all duration-500 ease-out"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const validation = validations[step.id as keyof StepValidations];
          const isActive = currentStep === step.id;
          const isComplete = validation.isComplete;
          const hasActionRequired = validation.items.some((item) => item.kind === "action_required");

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                {/* Step Icon */}
                <div
                  className={`flex items-center justify-center h-10 w-10 rounded-full border-2 transition-all duration-300 ${
                    isComplete
                      ? 'bg-teal-600 border-teal-600'
                      : isActive
                      ? 'bg-white border-teal-600'
                      : hasActionRequired
                      ? 'bg-white border-slate-300'
                      : 'bg-white border-slate-300'
                  }`}
                >
                  {isComplete ? (
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  ) : (
                    <span
                      className={`text-sm font-bold ${
                        isActive ? 'text-teal-700' : 'text-slate-400'
                      }`}
                    >
                      {step.number}
                    </span>
                  )}
                </div>

                {/* Step Label */}
                <span
                  className={`mt-2 text-xs font-medium text-center ${
                    isActive ? 'text-teal-700' : isComplete ? 'text-slate-700' : 'text-slate-400'
                  }`}
                >
                  {step.label}
                </span>

                {/* Completion Percentage (only for active incomplete step) */}
                {isActive && !isComplete && validation.completionPercentage > 0 && (
                  <span className="mt-1 text-xs text-teal-600 font-semibold">
                    {validation.completionPercentage}%
                  </span>
                )}
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-2 -mt-10">
                  <div
                    className={`h-full transition-all duration-300 ${
                      validation.isComplete ? 'bg-teal-600' : 'bg-slate-200'
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Active Step Info */}
      {currentStep && activeValidation && (
        <div className="mt-6 border-t border-slate-200 pt-4">
          {activeValidation.isComplete ? (
            <div className="flex items-center gap-2 text-sm text-teal-700">
              <CheckCircle2 className="h-4 w-4" />
              <span className="font-medium">Step completed! Expand the next step below.</span>
            </div>
          ) : (
            <div className="space-y-4">
              {groupedItems && groupedItems.action_required.length > 0 && (
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      Action Required
                    </span>
                    <span className="text-xs text-slate-500">Must-do items</span>
                  </div>
                  <ul className="space-y-2">
                    {groupedItems.action_required.map((item, idx) => (
                      <li key={idx} className="rounded-xl border border-rose-100 bg-rose-50/40 p-3">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                            <p className="mt-0.5 text-xs text-slate-600">Where: {item.where}</p>
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
              )}

              {groupedItems && groupedItems.recommended.length > 0 && (
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                      <Sparkles className="h-3.5 w-3.5" />
                      Recommended
                    </span>
                    <span className="text-xs text-slate-500">Optional, improves outcomes</span>
                  </div>
                  <ul className="space-y-2">
                    {groupedItems.recommended.map((item, idx) => (
                      <li key={idx} className="rounded-xl border border-amber-100 bg-amber-50/40 p-3">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                            <p className="mt-0.5 text-xs text-slate-600">Where: {item.where}</p>
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
          )}
        </div>
      )}
    </div>
  );
}
