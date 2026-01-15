"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type SectionItem = {
  id: string;
  label: string;
};

type StepItem = {
  id: string;
  number: number;
  title: string;
  description: string;
  content: React.ReactNode;
};

type SectionSwitcherProps = {
  sectionItems: SectionItem[];
  steps: StepItem[];
  overviewContent: React.ReactNode;
  extraSections?: Array<{
    id: string;
    title: string;
    description?: string;
    content: React.ReactNode;
    hideHeader?: boolean;
  }>;
  defaultSection: string;
  selectedWindow: number;
  showAdminLinks: boolean;
};

type SectionNavContextValue = {
  setSection: (id: string, scrollTo?: string) => void;
  selectedWindow: number;
};

const SectionNavContext = createContext<SectionNavContextValue | null>(null);

export function useSectionNav() {
  const ctx = useContext(SectionNavContext);
  if (!ctx) {
    throw new Error("useSectionNav must be used within DashboardSectionSwitcher");
  }
  return ctx;
}

export function SectionLink({
  section,
  children,
  className = "",
  scrollTo,
}: {
  section: string;
  children: React.ReactNode;
  className?: string;
  scrollTo?: string;
}) {
  const { setSection } = useSectionNav();
  return (
    <button
      type="button"
      className={className}
      onClick={() => setSection(section, scrollTo)}
    >
      {children}
    </button>
  );
}

export function DashboardSectionSwitcher({
  sectionItems,
  steps,
  overviewContent,
  extraSections = [],
  defaultSection,
  selectedWindow,
  showAdminLinks,
}: SectionSwitcherProps) {
  const [activeSection, setActiveSection] = useState(defaultSection || "overview");

  const stepMap = useMemo(
    () => new Map(steps.map((step) => [step.id, step])),
    [steps],
  );
  const extraSectionMap = useMemo(
    () => new Map(extraSections.map((section) => [section.id, section])),
    [extraSections],
  );

  const updateUrl = useCallback(
    (sectionId: string) => {
      if (typeof window === "undefined") return;
      const params = new URLSearchParams(window.location.search);
      params.set("section", sectionId);
      if (selectedWindow === 7) {
        params.set("window", "7");
      } else if (selectedWindow === 30) {
        params.set("window", "30");
      } else {
        params.delete("window");
      }
      const nextUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.pushState({}, "", nextUrl);
      window.localStorage.setItem("dashboard:lastSection", sectionId);
    },
    [selectedWindow],
  );

  const setSection = useCallback(
    (sectionId: string, scrollTo?: string, options?: { updateUrl?: boolean }) => {
      setActiveSection(sectionId);
      if (options?.updateUrl !== false) {
        updateUrl(sectionId);
      }
      if (scrollTo) {
        window.setTimeout(() => {
          document.getElementById(scrollTo)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    },
    [updateUrl],
  );

  useEffect(() => {
    const handler = () => {
      const params = new URLSearchParams(window.location.search);
      const sectionId = params.get("section") || "overview";
      setActiveSection(sectionId);
    };
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (defaultSection && defaultSection !== "overview") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("section")) return;
    const stored = window.localStorage.getItem("dashboard:lastSection");
    if (stored && stored !== activeSection) {
      setSection(stored, undefined, { updateUrl: false });
    }
  }, [defaultSection, activeSection, setSection]);

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<{ section?: string; scrollTo?: string }>).detail;
      if (!detail?.section) return;
      setSection(detail.section, detail.scrollTo);
    };
    window.addEventListener("dashboard:navigate", handler);
    return () => window.removeEventListener("dashboard:navigate", handler);
  }, [setSection]);

  const activeStep = stepMap.get(activeSection);
  const activeExtra = extraSectionMap.get(activeSection);

  return (
    <SectionNavContext.Provider value={{ setSection, selectedWindow }}>
      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Dashboard
            </p>
            <p className="text-lg font-black text-slate-900">Navigation</p>
          </div>
          <nav className="space-y-1">
            {sectionItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSection(item.id)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-semibold transition ${
                  activeSection === item.id
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span>{item.label}</span>
                {activeSection === item.id && <ArrowRight className="h-4 w-4" />}
              </button>
            ))}
          </nav>

          {showAdminLinks && (
            <div className="mt-6 border-t border-slate-200 pt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Admin</p>
              <div className="mt-2 space-y-1">
                <Link
                  href="/dashboard/admin-master"
                  className="block rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Master Admin
                </Link>
                <Link
                  href="/dashboard/admin-payments"
                  className="block rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Admin Payments
                </Link>
              </div>
            </div>
          )}
        </aside>

        <section className="space-y-6">
          {activeSection === "overview" && overviewContent}

          {activeSection !== "overview" && activeExtra && (
            <div className="space-y-6">
              {!activeExtra.hideHeader && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Dashboard
                  </p>
                  <h2 className="mt-2 text-2xl font-black text-slate-900">{activeExtra.title}</h2>
                  {activeExtra.description && (
                    <p className="mt-2 text-sm text-slate-600">{activeExtra.description}</p>
                  )}
                </div>
              )}
              {activeExtra.content}
            </div>
          )}

          {activeSection !== "overview" && activeStep && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Step {activeStep.number}
                </p>
                <h2 className="mt-2 text-2xl font-black text-slate-900">{activeStep.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{activeStep.description}</p>
              </div>
              {activeStep.content}
            </div>
          )}

          {activeSection !== "overview" && !activeStep && !activeExtra && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-600">Select a section from the sidebar to begin.</p>
            </div>
          )}
        </section>
      </div>
    </SectionNavContext.Provider>
  );
}
