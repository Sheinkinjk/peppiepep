"use client";

import { useEffect, useMemo, useState } from "react";
import { Building2, Users2, Globe, TrendingUp, RefreshCcw, AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

type BreakdownChannel = "partners" | "external_partners" | "linkedin_influencer";

type SummaryResponse = {
  windowDays: number;
  rewardType: string | null;
  breakdown: Record<
    BreakdownChannel,
    { referrals: number; completed: number; revenue: number; rewardsEst: number }
  >;
  topPartners: Array<{
    ambassadorId: string;
    name: string;
    channel: BreakdownChannel;
    completed: number;
    revenue: number;
    rewardsEst: number;
  }>;
  meta?: { fetchedRows: number; capped: boolean };
  error?: string;
};

function formatCurrency(amount: number) {
  return `$${Math.round(amount).toLocaleString()}`;
}

const channelLabels: Record<BreakdownChannel, { label: string; icon: React.ReactNode }> = {
  partners: { label: "Partners", icon: <Users2 className="h-4 w-4" /> },
  external_partners: { label: "External Partners", icon: <Globe className="h-4 w-4" /> },
  linkedin_influencer: { label: "LinkedIn Influencer", icon: <Building2 className="h-4 w-4" /> },
};

export function MeasureRoiPartnerBreakdownPanel({ windowDays }: { windowDays: number }) {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<SummaryResponse | null>(null);

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/referrals/summary?windowDays=${encodeURIComponent(String(windowDays))}`);
      const payload = (await response.json()) as SummaryResponse;
      if (!response.ok) throw new Error(payload.error || "Failed to load summary");
      setSummary(payload);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Measure ROI breakdown failed",
        description: error instanceof Error ? error.message : "Could not load breakdown.",
      });
      setSummary(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowDays]);

  const totals = useMemo(() => {
    const base = { referrals: 0, completed: 0, revenue: 0, rewardsEst: 0 };
    if (!summary) return base;
    for (const channel of Object.keys(summary.breakdown) as BreakdownChannel[]) {
      base.referrals += summary.breakdown[channel].referrals;
      base.completed += summary.breakdown[channel].completed;
      base.revenue += summary.breakdown[channel].revenue;
      base.rewardsEst += summary.breakdown[channel].rewardsEst;
    }
    return base;
  }, [summary]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Inbound ROI</p>
          <h3 className="text-lg font-black text-slate-900">Partners vs External Partners</h3>
          <p className="text-sm text-slate-600">
            Breaks down referrals + revenue by partner channel in the last {windowDays} days.
          </p>
        </div>
        <Button type="button" variant="outline" onClick={fetchSummary} disabled={loading}>
          <RefreshCcw className="mr-2 h-4 w-4" />
          {loading ? "Refreshing…" : "Refresh"}
        </Button>
      </div>

      {summary?.meta?.capped && (
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <div className="flex items-start gap-2">
            <AlertTriangle className="mt-0.5 h-4 w-4" />
            <p>
              Large account detected: this breakdown is capped for performance. If you want exact totals, we should add a DB aggregate function.
            </p>
          </div>
        </div>
      )}

      <div className="mt-4 grid gap-3 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-xs text-slate-500">Total referrals</p>
          <p className="mt-1 text-2xl font-black text-slate-900">{totals.referrals}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-xs text-slate-500">Completed</p>
          <p className="mt-1 text-2xl font-black text-slate-900">{totals.completed}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-xs text-slate-500">Revenue</p>
          <p className="mt-1 text-2xl font-black text-slate-900">{formatCurrency(totals.revenue)}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-xs text-slate-500">Rewards (est.)</p>
          <p className="mt-1 text-2xl font-black text-slate-900">
            {summary?.rewardType === "revenue_share" ? formatCurrency(totals.rewardsEst) : "-"}
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            {summary?.rewardType === "revenue_share" ? "Based on revenue share %" : "Shown for revenue share only"}
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {(Object.keys(channelLabels) as BreakdownChannel[]).map((channel) => {
          const channelData = summary?.breakdown?.[channel] ?? { referrals: 0, completed: 0, revenue: 0, rewardsEst: 0 };
          return (
            <div key={channel} className="rounded-xl border border-slate-200 bg-white px-4 py-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                {channelLabels[channel].icon}
                <span>{channelLabels[channel].label}</span>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
                <div>
                  <p className="text-[11px] text-slate-500">Refs</p>
                  <p className="font-semibold text-slate-900">{channelData.referrals}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500">Completed</p>
                  <p className="font-semibold text-slate-900">{channelData.completed}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500">Revenue</p>
                  <p className="font-semibold text-slate-900">{formatCurrency(channelData.revenue)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-[0.08em]">Top inbound partners</h4>
          <span className="text-xs text-slate-400">Completed + revenue</span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-xs uppercase tracking-[0.2em] text-slate-400">
              <tr>
                <th className="py-2 text-left">Partner</th>
                <th className="py-2 text-left">Channel</th>
                <th className="py-2 text-left">Completed</th>
                <th className="py-2 text-left">Revenue</th>
                <th className="py-2 text-left">Rewards (est.)</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {!summary || summary.topPartners.length === 0 ? (
                <tr>
                  <td className="py-3 text-slate-500" colSpan={5}>
                    No completed referrals yet in this window.
                  </td>
                </tr>
              ) : (
                summary.topPartners.map((partner) => (
                  <tr key={partner.ambassadorId} className="border-t border-slate-100">
                    <td className="py-3 font-semibold text-slate-900">{partner.name}</td>
                    <td className="py-3">{channelLabels[partner.channel].label}</td>
                    <td className="py-3">{partner.completed}</td>
                    <td className="py-3">{formatCurrency(partner.revenue)}</td>
                    <td className="py-3">
                      {summary.rewardType === "revenue_share" ? formatCurrency(partner.rewardsEst) : "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

