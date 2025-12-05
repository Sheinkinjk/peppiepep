"use client";

import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
  illustration?: "default" | "search" | "filter";
};

export function EmptyState({
  icon: Icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  illustration = "default",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {/* Icon/Illustration */}
      <div className="relative mb-6">
        {/* Background decoration */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-32 w-32 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 opacity-40 blur-2xl" />
        </div>

        {/* Main icon */}
        <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-200/60 shadow-sm">
          <Icon className="h-12 w-12 text-slate-400" strokeWidth={1.5} />
        </div>

        {/* Decorative elements based on illustration type */}
        {illustration === "default" && (
          <>
            <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-purple-100 border-2 border-white animate-pulse" />
            <div className="absolute -bottom-1 -left-1 h-4 w-4 rounded-full bg-cyan-100 border-2 border-white animate-pulse delay-150" />
          </>
        )}
        {illustration === "search" && (
          <div className="absolute -top-3 right-0 text-2xl animate-bounce">🔍</div>
        )}
        {illustration === "filter" && (
          <div className="absolute -top-3 right-0 text-2xl animate-bounce">🎯</div>
        )}
      </div>

      {/* Content */}
      <div className="max-w-md space-y-3">
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">
          {title}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Actions */}
      {(primaryAction || secondaryAction) && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {primaryAction && (
            <Button
              onClick={primaryAction.onClick}
              size="lg"
              className="shadow-sm hover:shadow-md transition-shadow"
            >
              {primaryAction.icon && (
                <primaryAction.icon className="mr-2 h-4 w-4" />
              )}
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              onClick={secondaryAction.onClick}
              variant="outline"
              size="lg"
              className="shadow-sm"
            >
              {secondaryAction.icon && (
                <secondaryAction.icon className="mr-2 h-4 w-4" />
              )}
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}

      {/* Helper text */}
      {(primaryAction || secondaryAction) && (
        <p className="mt-4 text-xs text-slate-500">
          Need help getting started?{" "}
          <button
            className="font-medium text-purple-600 hover:text-purple-700 underline underline-offset-2"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.open("/docs", "_blank");
              }
            }}
          >
            View documentation
          </button>
        </p>
      )}
    </div>
  );
}
