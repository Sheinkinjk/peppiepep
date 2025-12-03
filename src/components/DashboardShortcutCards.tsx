'use client';

import { Rocket, Users, ArrowRight } from "lucide-react";
import { useCallback, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface ShortcutCard {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  target: string;
  badge: string;
  cta: string;
  ctaClassName?: string;
}

const cards: ShortcutCard[] = [
  {
    id: "campaigns",
    title: "Start New Campaign",
    description: "Open the composer to launch SMS or email blasts instantly.",
    icon: <Rocket className="h-6 w-6 text-indigo-600" />,
    target: "campaigns",
    badge: "Live messaging",
    cta: "Start campaign",
    ctaClassName: "bg-[#00bcd4] hover:bg-[#00a3ba] text-slate-900 border border-[#00bcd4]",
  },
  {
    id: "clients",
    title: "Clients & Ambassadors",
    description: "Manage customer data, referral links, and VIP enrollments.",
    icon: <Users className="h-6 w-6 text-emerald-600" />,
    target: "clients",
    badge: "Roster control",
    cta: "Go to clients",
  },
];

export function DashboardShortcutCards() {
  const handleClick = useCallback((target: string) => {
    const activateTab = () => {
      const tab = document.querySelector(
        `[data-tab-target="${target}"]`,
      ) as HTMLElement | null;
      if (!tab) return false;
      tab.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      tab.click();
      return true;
    };

    if (typeof document !== "undefined") {
      activateTab();
      const scrollToPanel = () => {
        const targetSection = document.getElementById(`tab-section-${target}`);
        if (targetSection) {
          const offset = 80;
          const top = targetSection.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: "smooth" });
          return true;
        }
        return false;
      };
      setTimeout(() => {
        if (!scrollToPanel()) {
          const tabSectionFallback = document.getElementById("dashboard-tabs");
          tabSectionFallback?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 220);
    }

    if (typeof window !== "undefined" && target === "campaigns") {
      window.dispatchEvent(new CustomEvent("pep-open-campaign"));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const win = window as any;
      if (typeof win.__pepOpenCampaignModal === "function") {
        win.__pepOpenCampaignModal();
      } else {
        win.__pepPendingCampaignModal = true;
        setTimeout(() => activateTab(), 10);
      }
    }
  }, []);

  return (
    <div className="grid gap-4 lg:grid-cols-2 mb-10">
      {cards.map((card) => (
        <div
          key={card.id}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-slate-500 mb-3">
              {card.icon}
              <span>{card.badge}</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">{card.title}</h2>
            <p className="text-sm text-slate-600">{card.description}</p>
          </div>
          <Button
            onClick={() => handleClick(card.target)}
            className={`mt-6 w-full font-semibold ${card.ctaClassName || "bg-slate-900 hover:bg-slate-800 text-white"}`}
          >
            {card.cta}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
