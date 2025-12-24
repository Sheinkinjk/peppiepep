"use client";

import { useEffect, useState, type KeyboardEvent, type ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { ChevronDown, CheckCircle2, Circle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type StepStatus = "incomplete" | "in_progress" | "complete";

export type GuidedStep = {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: ReactNode;
  status: StepStatus;
  content: ReactNode;
  helpText?: string;
};

type GuidedStepFlowProps = {
  steps: GuidedStep[];
  onStepChange?: (stepId: string) => void;
  defaultOpenStep?: string | null;
};

export function GuidedStepFlow({ steps, onStepChange, defaultOpenStep }: GuidedStepFlowProps) {
  // Always use internal state for managing expanded step
  const [expandedStep, setExpandedStep] = useState<string | null>(() => defaultOpenStep || null);

  useEffect(() => {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<{ stepId?: string; anchorId?: string }>;
      const stepId = customEvent.detail?.stepId;
      if (!stepId) return;

      setExpandedStep(stepId);
      if (onStepChange) onStepChange(stepId);

      const anchorId = customEvent.detail?.anchorId;
      const targetId = anchorId || `step-${stepId}`;

      // Allow the UI to expand before scrolling.
      setTimeout(() => {
        const node = document.getElementById(targetId);
        node?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    };

    window.addEventListener("pep-open-step", handler);
    return () => window.removeEventListener("pep-open-step", handler);
  }, [onStepChange]);

  const handleStepToggle = (stepId: string) => {
    const nextValue = expandedStep === stepId ? null : stepId;
    setExpandedStep(nextValue);
    if (onStepChange) {
      onStepChange(nextValue || "");
    }
  };

  const getStepGradient = () => {
    // Simplified: single teal gradient for all steps
    return "from-teal-600 to-teal-700";
  };

  const getStepBorderColor = () => {
    // Simplified: single border color
    return "border-slate-200";
  };

  const getStepBgColor = () => {
    // Simplified: white background instead of gradients
    return "from-white to-slate-50";
  };

  return (
    <div className="space-y-4">
      {steps.map((step) => {
        const isExpanded = expandedStep === step.id;
        const gradient = getStepGradient();
        const borderColor = getStepBorderColor();
        const bgColor = getStepBgColor();

        const handleHeaderKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleStepToggle(step.id);
          }
        };

        return (
          <Card
            key={step.id}
            id={`step-${step.id}`}
            className={cn(
              "rounded-2xl border overflow-hidden transition-all duration-300",
              borderColor,
              isExpanded ? "shadow-lg" : "shadow-md hover:shadow-lg"
            )}
          >
            {/* Step Header - Always Visible */}
            <div
              role="button"
              tabIndex={0}
              aria-expanded={isExpanded}
              onClick={() => handleStepToggle(step.id)}
              onKeyDown={handleHeaderKeyDown}
              className={cn(
                "group w-full text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-200/60",
                isExpanded ? "pb-0" : "pb-0"
              )}
            >
              <div
                className={cn(
                  "flex w-full items-center justify-between gap-4 p-6 transition-all duration-300",
                  "bg-gradient-to-br",
                  bgColor,
                  "group-hover:bg-slate-50"
                )}
              >
                <div className="flex items-start gap-4">
                  {/* Step Number Badge */}
                  <div
                    className={cn(
                      "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md",
                      gradient
                    )}
                  >
                    <span className="text-xl font-bold">{step.number}</span>
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={cn("p-1.5 rounded-lg bg-white shadow-sm")}>
                            {step.icon}
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                            {step.title}
                          </h3>
                          {/* Status Badge */}
                          {step.status === "complete" && (
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 border border-emerald-200">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700" />
                              <span className="text-xs font-semibold text-emerald-700">Complete</span>
                            </div>
                          )}
                          {step.status === "in_progress" && (
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-100 border border-teal-200">
                              <Circle className="h-3.5 w-3.5 text-teal-700 fill-teal-700" />
                              <span className="text-xs font-semibold text-teal-700">In Progress</span>
                            </div>
                          )}
                          {step.status === "incomplete" && (
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200">
                              <AlertCircle className="h-3.5 w-3.5 text-slate-500" />
                              <span className="text-xs font-semibold text-slate-500">Locked</span>
                            </div>
                          )}
                        </div>
                        {/* Description - Only show when expanded */}
                        {isExpanded && (
                          <p className="text-sm text-slate-600 leading-relaxed mt-2">
                            {step.description}
                          </p>
                        )}
                      </div>

                      {/* Expand/Collapse Icon */}
                      <div className="flex-shrink-0">
                        <div className={cn(
                          "rounded-full p-2 transition-all duration-300",
                          isExpanded
                            ? "bg-slate-100 rotate-180"
                            : "bg-slate-50 hover:bg-slate-100"
                        )}>
                          <ChevronDown className={cn(
                            "h-5 w-5 transition-transform duration-300",
                            "text-slate-600"
                          )} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step Content - Expandable */}
            <div
              className={cn(
                "transition-all duration-500 ease-in-out overflow-hidden",
                isExpanded ? "max-h-[10000px] opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="p-6 pt-4 pb-6 bg-white border-t border-slate-100">
                <div className="space-y-6">
                  {step.content}
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
