"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { type StepValidations } from "@/lib/step-validation";

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
          const hasBlockers = validation.blockers.length > 0;

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
                      : hasBlockers
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
      {currentStep && (
        <div className="mt-6 pt-4 border-t border-slate-200">
          {(() => {
            const validation = validations[currentStep as keyof StepValidations];

            if (validation.isComplete) {
              return (
                <div className="flex items-center gap-2 text-sm text-teal-700">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="font-medium">Step completed! Expand the next step below.</span>
                </div>
              );
            }

            return (
              <div className="space-y-2">
                {validation.blockers.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-slate-600 mb-1">To complete this step:</p>
                    <ul className="space-y-1">
                      {validation.blockers.map((blocker, idx) => (
                        <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                          <Circle className="h-3 w-3 mt-0.5 flex-shrink-0 fill-teal-600 text-teal-600" />
                          <span>{blocker}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {validation.warnings.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-amber-700 mb-1">Optional improvements:</p>
                    <ul className="space-y-1">
                      {validation.warnings.map((warning, idx) => (
                        <li key={idx} className="text-xs text-amber-700 flex items-start gap-2">
                          <Circle className="h-3 w-3 mt-0.5 flex-shrink-0 fill-amber-500 text-amber-500" />
                          <span>{warning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
