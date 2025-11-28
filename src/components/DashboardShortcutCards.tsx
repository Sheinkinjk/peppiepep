'use client';

import { Rocket, Users } from "lucide-react";
import { useCallback, type ReactNode } from "react";

interface ShortcutCard {
  id: string;
  title: string;
  description: string;
  gradientClass: string;
  icon: ReactNode;
  target: string;
}

const cards: ShortcutCard[] = [
  {
    id: "campaigns",
    title: "Start New Campaign",
    description: "Send SMS/Email to ambassadors and boost referrals",
    gradientClass: "bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 hover:shadow-purple-500/50",
    icon: <Rocket className="h-8 w-8 text-white" />,
    target: "campaigns",
  },
  {
    id: "clients",
    title: "Clients & Ambassadors",
    description: "Manage customers and view referral links",
    gradientClass: "bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500 hover:shadow-emerald-500/50",
    icon: <Users className="h-8 w-8 text-white" />,
    target: "clients",
  },
];

export function DashboardShortcutCards() {
  const handleClick = useCallback((target: string) => {
    const tab = document.querySelector(`[value="${target}"]`) as HTMLElement | null;
    tab?.click();
  }, []);

  return (
    <div className="grid gap-4 sm:grid-cols-2 mb-8">
      {cards.map((card) => (
        <button
          key={card.id}
          type="button"
          onClick={() => handleClick(card.target)}
          className={`group relative overflow-hidden rounded-2xl ${card.gradientClass} p-8 shadow-2xl transition-all duration-300 hover:scale-[1.02]`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_50%)]" />
          <div className="relative flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-white mb-2">{card.title}</h2>
              <p className="text-sm text-white/90">{card.description}</p>
            </div>
            <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center group-hover:bg-white/30 transition-all">
              {card.icon}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
