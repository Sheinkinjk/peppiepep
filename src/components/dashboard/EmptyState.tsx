"use client";

import { ReactNode } from "react";
import {
  Users,
  Mail,
  TrendingUp,
  FileText,
  Settings,
  Globe,
  ShieldCheck,
  Target,
  Handshake,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

type EmptyStateVariant =
  | "partners"
  | "campaigns"
  | "referrals"
  | "pages"
  | "settings"
  | "testing"
  | "tracking"
  | "external-partners"
  | "generic";

interface EmptyStateProps {
  variant?: EmptyStateVariant;
  title?: string;
  description?: string;
  icon?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  children?: ReactNode;
  compact?: boolean;
}

const variantConfig: Record<EmptyStateVariant, { icon: ReactNode; title: string; description: string }> = {
  partners: {
    icon: <Users className="h-8 w-8" />,
    title: "No partners yet",
    description: "Add your first ambassador or partner to generate referral links and start tracking referrals.",
  },
  campaigns: {
    icon: <Mail className="h-8 w-8" />,
    title: "No campaigns sent",
    description: "Create and send your first referral campaign to notify partners about your program.",
  },
  referrals: {
    icon: <TrendingUp className="h-8 w-8" />,
    title: "No referrals tracked",
    description: "Once partners share their links and you get referrals, they'll appear here with full attribution.",
  },
  pages: {
    icon: <Globe className="h-8 w-8" />,
    title: "No pages published",
    description: "Create and publish your /referral and /referred landing pages to start accepting referrals.",
  },
  settings: {
    icon: <Settings className="h-8 w-8" />,
    title: "Setup incomplete",
    description: "Complete your business profile and configure rewards to enable your referral program.",
  },
  testing: {
    icon: <ShieldCheck className="h-8 w-8" />,
    title: "Ready for testing",
    description: "Run the QA flow to verify your referral pages, attribution cookies, and tracking are working correctly.",
  },
  tracking: {
    icon: <Target className="h-8 w-8" />,
    title: "No campaign data",
    description: "Campaign performance metrics will appear here once you've sent your first campaign.",
  },
  "external-partners": {
    icon: <Handshake className="h-8 w-8" />,
    title: "No external partners",
    description: "Source and activate external partners to expand your referral network without losing attribution.",
  },
  generic: {
    icon: <FileText className="h-8 w-8" />,
    title: "Nothing here yet",
    description: "Content will appear here once you've completed the required setup steps.",
  },
};

export function EmptyState({
  variant = "generic",
  title,
  description,
  icon,
  actionLabel,
  onAction,
  actionHref,
  secondaryActionLabel,
  onSecondaryAction,
  children,
  compact = false,
}: EmptyStateProps) {
  const config = variantConfig[variant];
  const displayIcon = icon ?? config.icon;
  const displayTitle = title ?? config.title;
  const displayDescription = description ?? config.description;

  if (compact) {
    return (
      <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-200 text-slate-500">
          {displayIcon}
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-900">{displayTitle}</p>
          <p className="text-xs text-slate-600">{displayDescription}</p>
        </div>
        {actionLabel && (
          <ActionButton
            actionLabel={actionLabel}
            actionHref={actionHref}
            onAction={onAction}
          />
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/50 p-8">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
          {displayIcon}
        </div>
        <h3 className="text-lg font-bold text-slate-900">{displayTitle}</h3>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">{displayDescription}</p>

        {children && <div className="mt-4">{children}</div>}

        {(actionLabel || secondaryActionLabel) && (
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <ActionButton
              actionLabel={actionLabel}
              actionHref={actionHref}
              onAction={onAction}
            />
            {secondaryActionLabel && onSecondaryAction && (
              <button
                onClick={onSecondaryAction}
                className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                {secondaryActionLabel}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ActionButton({
  actionLabel,
  actionHref,
  onAction,
}: {
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}) {
  if (!actionLabel) return null;

  const buttonClasses = cn(
    "inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all",
    "bg-slate-900 text-white hover:bg-slate-800 shadow-sm"
  );

  if (actionHref) {
    return (
      <a href={actionHref} className={buttonClasses}>
        {actionLabel}
        <ArrowRight className="h-4 w-4" />
      </a>
    );
  }

  return (
    <button onClick={onAction} className={buttonClasses}>
      {actionLabel}
      <ArrowRight className="h-4 w-4" />
    </button>
  );
}

/**
 * Empty state with tips for getting started
 */
export function EmptyStateWithTips({
  variant,
  title,
  description,
  tips,
  actionLabel,
  onAction,
}: EmptyStateProps & { tips: string[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/50 p-8">
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
          {variantConfig[variant || "generic"].icon}
        </div>
        <h3 className="text-lg font-bold text-slate-900">
          {title ?? variantConfig[variant || "generic"].title}
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          {description ?? variantConfig[variant || "generic"].description}
        </p>

        {tips.length > 0 && (
          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 text-left">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <Sparkles className="h-4 w-4 text-amber-500" />
              Quick tips
            </p>
            <ul className="mt-3 space-y-2">
              {tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                    {idx + 1}
                  </span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-all"
          >
            {actionLabel}
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * Inline empty state for smaller sections
 */
export function InlineEmptyState({
  message,
  actionLabel,
  onAction,
}: {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-3">
      <p className="text-sm text-slate-600">{message}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="text-sm font-medium text-slate-700 hover:text-slate-900 underline underline-offset-2"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
