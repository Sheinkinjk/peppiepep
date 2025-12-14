"use client";

import { DashboardExplainerDialog } from "@/components/DashboardExplainerDialog";
import { Users, Send, TrendingUp, DollarSign } from "lucide-react";

type DashboardHeaderProps = {
  ambassadorCount: number;
  referralCount: number;
  campaignsSent: number;
  revenue: number;
};

export function DashboardHeader({
  ambassadorCount,
  referralCount,
  campaignsSent,
  revenue,
}: DashboardHeaderProps) {
  return (
    <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Growth Dashboard</h1>
          <p className="text-sm text-slate-600 mt-1">
            Follow the 5 steps below to launch your referral program
          </p>
        </div>
        <DashboardExplainerDialog />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Ambassadors */}
        <StatCard
          label="Ambassadors"
          value={ambassadorCount}
          icon={<Users className="h-4 w-4" />}
          emptyMessage="No ambassadors yet"
          emptySubtext="Complete Step 2 to add your first ambassador"
        />

        {/* Referrals */}
        <StatCard
          label="Referrals"
          value={referralCount}
          icon={<TrendingUp className="h-4 w-4" />}
          emptyMessage="No referrals tracked"
          emptySubtext="Share referral links to start tracking"
        />

        {/* Campaigns */}
        <StatCard
          label="Campaigns"
          value={campaignsSent}
          icon={<Send className="h-4 w-4" />}
          emptyMessage="No campaigns sent"
          emptySubtext="Launch your first campaign in Step 3"
        />

        {/* Revenue */}
        <StatCard
          label="Revenue"
          value={`$${Math.round(revenue)}`}
          icon={<DollarSign className="h-4 w-4" />}
          isRevenue
          emptyMessage="$0 tracked"
          emptySubtext="Revenue appears when referrals convert"
        />
      </div>
    </div>
  );
}

type StatCardProps = {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  isRevenue?: boolean;
  emptyMessage: string;
  emptySubtext: string;
};

function StatCard({
  label,
  value,
  icon,
  isRevenue = false,
  emptyMessage,
  emptySubtext,
}: StatCardProps) {
  const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]/g, '')) : value;
  const isEmpty = numericValue === 0;

  return (
    <div
      className={`rounded-xl border p-5 transition-all duration-200 ${
        isRevenue
          ? "bg-emerald-50 border-emerald-200"
          : "bg-slate-50 border-slate-200"
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className={`${isRevenue ? 'text-emerald-700' : 'text-slate-500'}`}>
          {icon}
        </div>
        <p
          className={`text-xs font-semibold uppercase tracking-wide ${
            isRevenue ? "text-emerald-700" : "text-slate-500"
          }`}
        >
          {label}
        </p>
      </div>

      {isEmpty ? (
        <div>
          <p
            className={`text-2xl font-bold ${
              isRevenue ? "text-emerald-900" : "text-slate-900"
            }`}
          >
            {emptyMessage}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {emptySubtext}
          </p>
        </div>
      ) : (
        <p
          className={`text-4xl font-bold ${
            isRevenue ? "text-emerald-900" : "text-slate-900"
          }`}
        >
          {value}
        </p>
      )}
    </div>
  );
}
