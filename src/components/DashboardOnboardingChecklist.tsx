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

  const openTab = (tab: "campaigns" | "clients" | "performance") => {
    if (typeof document === "undefined") return;
    const trigger = document.querySelector<HTMLElement>(
      `[data-tab-target="${tab}"]`,
    );
    trigger?.click();
  };

  const openCampaignBuilder = () => {
    openTab("campaigns");
    if (typeof window === "undefined") return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
    if (typeof win.__pepOpenCampaignModal === "function") {
      setTimeout(() => {
        win.__pepOpenCampaignModal();
      }, 50);
    }
  };

  if (hidden) return null;

  const steps = [
    {
      id: "customers",
      label: "Import your clients list",
      description: "Upload a CSV or add a few ambassadors manually.",
      icon: Users,
      done: hasCustomers,
      action: () => openTab("clients"),
      cta: "Open Clients tab",
    },
    {
      id: "settings",
      label: "Configure program settings",
      description:
        "Set your headline, new client reward, and ambassador reward.",
      icon: SettingsIcon,
      done: hasProgramSettings,
      action: () => openTab("clients"),
      cta: "Edit settings",
    },
    {
      id: "campaigns",
      label: "Send your first campaign",
      description: "Launch a real SMS or email blast to your ambassadors.",
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
      action: () => openTab("performance"),
      cta: "View performance",
    },
  ];
  const completedCount = steps.filter((step) => step.done).length;
  const completionPercent = Math.round((completedCount / steps.length) * 100);

  return (
    <Card className="mb-8 border-dashed border-slate-200 bg-white/80 p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            Getting started
          </p>
          <h2 className="text-base font-bold text-slate-900 sm:text-lg">
            Launch checklist
          </h2>
          <p className="mt-1 text-xs text-slate-600">
            Follow these four steps once and your dashboard will stay fully
            live and connected.
          </p>
          <div className="mt-3 flex items-center gap-3">
            <div className="h-2 w-36 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
            <span className="text-[11px] font-semibold text-slate-500">
              {completedCount}/{steps.length} complete
            </span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-slate-500 hover:text-slate-700"
          onClick={markHidden}
        >
          Hide checklist
        </Button>
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
