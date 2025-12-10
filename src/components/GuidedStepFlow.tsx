"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronRight,
  Settings,
  Users,
  Mail,
  BarChart3,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

type StepStatus = "incomplete" | "in_progress" | "complete";

export type GuidedStep = {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: StepStatus;
  content: React.ReactNode;
  helpText?: string;
};

type GuidedStepFlowProps = {
  steps: GuidedStep[];
  onStepChange?: (stepId: string) => void;
  defaultOpenStep?: string | null;
};

export function GuidedStepFlow({ steps, onStepChange, defaultOpenStep }: GuidedStepFlowProps) {
  const [expandedStep, setExpandedStep] = useState<string | null>(defaultOpenStep || null);

  useEffect(() => {
    if (defaultOpenStep) {
      setExpandedStep(defaultOpenStep);
    }
  }, [defaultOpenStep]);

  const handleStepToggle = (stepId: string) => {
    const newStep = expandedStep === stepId ? null : stepId;
    setExpandedStep(newStep);
    if (newStep && onStepChange) {
      onStepChange(newStep);
    }
  };

  const getStepGradient = (number: number) => {
    const gradients = [
      "from-emerald-500 to-teal-600", // Step 1: Setup
      "from-blue-500 to-indigo-600",  // Step 2: Clients
      "from-purple-500 to-pink-600",  // Step 3: CRM
      "from-amber-500 to-orange-600", // Step 4: Campaigns
      "from-cyan-500 to-blue-600",    // Step 5: Performance
    ];
    return gradients[number - 1] || gradients[0];
  };

  const getStepBorderColor = (number: number) => {
    const borders = [
      "border-emerald-200",
      "border-blue-200",
      "border-purple-200",
      "border-amber-200",
      "border-cyan-200",
    ];
    return borders[number - 1] || borders[0];
  };

  const getStepBgColor = (number: number) => {
    const backgrounds = [
      "from-emerald-50 to-teal-50",
      "from-blue-50 to-indigo-50",
      "from-purple-50 to-pink-50",
      "from-amber-50 to-orange-50",
      "from-cyan-50 to-blue-50",
    ];
    return backgrounds[number - 1] || backgrounds[0];
  };

  return (
    <div className="space-y-4">
      {steps.map((step) => {
        const isExpanded = expandedStep === step.id;
        const gradient = getStepGradient(step.number);
        const borderColor = getStepBorderColor(step.number);
        const bgColor = getStepBgColor(step.number);

        return (
          <Card
            key={step.id}
            className={cn(
              "rounded-3xl border-2 overflow-hidden transition-all duration-300",
              borderColor,
              isExpanded ? "shadow-2xl" : "shadow-lg hover:shadow-xl"
            )}
          >
            {/* Step Header - Always Visible */}
            <button
              onClick={() => handleStepToggle(step.id)}
              className={cn(
                "w-full text-left transition-all duration-300",
                isExpanded ? "pb-0" : "pb-0"
              )}
            >
              <div className={cn("bg-gradient-to-br p-6", isExpanded ? "" : "pb-6", bgColor)}>
                <div className="flex items-start gap-4">
                  {/* Step Number Badge */}
                  <div
                    className={cn(
                      "flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg",
                      gradient
                    )}
                  >
                    <span className="text-2xl font-black">{step.number}</span>
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={cn("p-2 rounded-xl bg-white shadow-md")}>
                            {step.icon}
                          </div>
                          <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                          {step.description}
                        </p>
                      </div>

                      {/* Expand/Collapse Icon */}
                      <div className="flex-shrink-0">
                        <div className={cn(
                          "rounded-full p-2 transition-all duration-300",
                          isExpanded
                            ? "bg-white shadow-lg rotate-180"
                            : "bg-white/50 hover:bg-white"
                        )}>
                          <ChevronDown className={cn(
                            "h-6 w-6 transition-transform duration-300",
                            isExpanded ? "text-slate-900" : "text-slate-600"
                          )} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>

            {/* Step Content - Expandable */}
            <div
              className={cn(
                "transition-all duration-500 ease-in-out overflow-hidden",
                isExpanded ? "max-h-[10000px] opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="p-6 pt-0 pb-8 bg-gradient-to-b from-white to-slate-50/30">
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
