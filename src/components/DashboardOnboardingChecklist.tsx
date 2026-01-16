"use client";

import { useSyncExternalStore } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Settings as SettingsIcon, Rocket, TrendingUp, CheckCircle2 } from "lucide-react";

const HIDDEN_STORAGE_KEY = "pep_dashboard_onboarding_hidden";
type HiddenStoreListener = () => void;

const hiddenStoreListeners = new Set<HiddenStoreListener>();

const emitHiddenStoreChange = () => {
  hiddenStoreListeners.forEach((listener) => {
    try {
      listener();
    } catch (error) {
      console.error("Hidden store listener failed", error);
    }
  });
};

const subscribeToHiddenStore = (listener: HiddenStoreListener) => {
  if (typeof window === "undefined") {
    return () => {};
  }

  hiddenStoreListeners.add(listener);

  const handleStorage = (event: StorageEvent) => {
    if (event.key === HIDDEN_STORAGE_KEY) {
      emitHiddenStoreChange();
    }
  };

  window.addEventListener("storage", handleStorage);

  return () => {
    hiddenStoreListeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
};

const readHiddenSnapshot = () => {
  if (typeof window === "undefined") {
    return true;
  }
  return window.localStorage.getItem(HIDDEN_STORAGE_KEY) === "1";
};

type DashboardOnboardingChecklistProps = {
  hasCustomers: boolean;
  hasProgramSettings: boolean;
  hasCampaigns: boolean;
  hasReferrals: boolean;
};

export function DashboardOnboardingChecklist({
  hasCustomers,
  hasProgramSettings,
  hasCampaigns,
  hasReferrals,
}: DashboardOnboardingChecklistProps) {
  const hidden = useSyncExternalStore(
    subscribeToHiddenStore,
    readHiddenSnapshot,
    () => true,
  );

  const markHidden = () => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(HIDDEN_STORAGE_KEY, "1");
    emitHiddenStoreChange();
  };

  const navigate = (section: string, scrollTo?: string) => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(
      new CustomEvent("dashboard:navigate", {
        detail: { section, scrollTo },
      }),
    );
  };

  const openCampaignBuilder = () => {
    navigate("crm-integration");
    if (typeof window === "undefined") return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
    if (typeof win.__pepOpenCampaignModal === "function") {
      setTimeout(() => {
        win.__pepOpenCampaignModal();
      }, 50);
    }
  };

  const steps = [
    {
      id: "customers",
      label: "Import your network",
      description: "Upload a CSV or add a few partners manually.",
      icon: Users,
      done: hasCustomers,
      action: () => navigate("clients-ambassadors", "partner-csv-upload"),
      cta: "Open partners",
    },
    {
      id: "settings",
      label: "Configure program settings",
      description:
        "Set your headline, new client reward, and partner reward.",
      icon: SettingsIcon,
      done: hasProgramSettings,
      action: () => navigate("setup-integration"),
      cta: "Edit settings",
    },
    {
      id: "campaigns",
      label: "Send your first campaign",
      description: "Launch a real SMS or email blast to your partners.",
      icon: Rocket,
      done: hasCampaigns,
      action: openCampaignBuilder,
      cta: "Start campaign",
    },
    {
      id: "referrals",
      label: "Record your first referral",
      description:
        "Mark a referral as completed or add a manual conversion.",
      icon: TrendingUp,
      done: hasReferrals,
      action: () => navigate("performance", "measure-roi-interaction-hub"),
      cta: "View performance",
    },
  ];
  const completedCount = steps.filter((step) => step.done).length;
  const completionPercent = Math.round((completedCount / steps.length) * 100);

  // Auto-hide when 100% complete, but always show if progress < 100%
  if (completionPercent === 100) {
    // Mark as hidden after 100% so it doesn't reappear
    if (typeof window !== "undefined" && !hidden) {
      window.localStorage.setItem(HIDDEN_STORAGE_KEY, "1");
    }
    return null;
  }

  return (
    <Card className="mb-8 border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-4 shadow-md sm:p-5">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">
            Getting started
          </p>
          <div className="rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white">
            {completedCount}/{steps.length}
          </div>
        </div>
        <h2 className="text-base font-bold text-slate-900 sm:text-lg">
          Complete these 4 steps to go live
        </h2>
        <p className="mt-1 text-xs text-slate-600">
          Each step takes less than 5 minutes. Your progress is saved automatically.
        </p>
        <div className="mt-3 flex items-center gap-3">
          <div className="h-2.5 flex-1 max-w-xs overflow-hidden rounded-full bg-emerald-200">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-500"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
          <span className="text-xs font-bold text-emerald-700">
            {completionPercent}%
          </span>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {steps.map((step) => {
          const Icon = step.icon;
          const cardTone = step.done
            ? "border-emerald-200 bg-emerald-50/70 hover:border-emerald-300"
            : "border-slate-200 bg-white hover:border-slate-300";
          const iconTone = step.done ? "bg-emerald-600/10 text-emerald-700" : "bg-slate-100 text-slate-700";
          return (
            <button
              key={step.id}
              type="button"
              onClick={step.action}
              className={`group flex items-start gap-3 rounded-2xl border px-3 py-3 text-left transition hover:-translate-y-0.5 hover:shadow-md ${cardTone}`}
            >
              <div className={`mt-0.5 flex h-9 w-9 items-center justify-center rounded-full shadow-sm ${iconTone}`}>
                {step.done ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                ) : (
                  <Icon className="h-4 w-4 text-slate-600" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900">
                  {step.label}
                </p>
                <p className="text-xs text-slate-600">{step.description}</p>
                <div className="mt-2 flex items-center justify-between">
                  <p className={`text-[11px] font-semibold ${step.done ? "text-emerald-700" : "text-purple-600"}`}>
                    {step.done ? "Completed" : step.cta}
                  </p>
                  <span className={`text-[10px] uppercase tracking-[0.12em] ${step.done ? "text-emerald-600" : "text-slate-400"}`}>
                    {step.done ? "Done" : "Next"}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
