"use client";

import { useState } from "react";
import { TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Rocket, Send } from "lucide-react";
import type { Database } from "@/types/supabase";
import { EmptyState } from "@/components/EmptyState";
import { Skeleton } from "@/components/Skeleton";

type CampaignRow = Database["public"]["Tables"]["campaigns"]["Row"];
type ReferralRow = Database["public"]["Tables"]["referrals"]["Row"];

type CampaignEventStats = Record<
  string,
  {
    clicks: number;
    signups: number;
    conversions: number;
  }
>;

type CampaignsTableProps = {
  campaigns: CampaignRow[];
  referrals: ReferralRow[];
  eventStats: CampaignEventStats;
  isLoading?: boolean;
};

export function CampaignsTable({ campaigns, referrals, eventStats, isLoading = false }: CampaignsTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (isLoading && campaigns.length === 0) {
    return (
      <TableBody>
        {Array.from({ length: 3 }).map((_, i) => (
          <TableRow key={i}>
            <TableCell>
              <Skeleton className="h-4 w-32" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-16" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-20 rounded-full" />
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="h-4 w-12 ml-auto" />
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="h-4 w-12 ml-auto" />
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="h-4 w-12 ml-auto" />
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="h-4 w-16 ml-auto" />
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="h-4 w-12 ml-auto" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  }

  if (campaigns.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={8} className="p-0">
            <EmptyState
              icon={Rocket}
              title="No campaigns sent yet"
              description="Launch your first SMS or email campaign to activate your ambassador network and start driving referrals. Your first campaign is just a few clicks away!"
              primaryAction={{
                label: "Create Campaign",
                onClick: () => {
                  const campaignsTab = document.querySelector('[data-tab-target="campaigns"]') as HTMLElement;
                  campaignsTab?.click();
                  setTimeout(() => {
                    if (typeof window !== "undefined") {
                      const win = window as any;
                      if (typeof win.__pepOpenCampaignModal === "function") {
                        win.__pepOpenCampaignModal();
                      }
                    }
                  }, 100);
                },
                icon: Send,
              }}
            />
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {campaigns.map((campaign, index) => {
        const isExpanded = expandedId === campaign.id;
        const campaignKey = campaign.id ?? "";
        const offer = campaign.snapshot_offer_text;
        const newUserReward = campaign.snapshot_new_user_reward_text;
        const clientReward = campaign.snapshot_client_reward_text;
        const rewardType = campaign.snapshot_reward_type;
        const rewardAmount = campaign.snapshot_reward_amount;
        const upgradeName = campaign.snapshot_upgrade_name;
        const rewardTerms = campaign.snapshot_reward_terms;

        const currentCreatedAt = campaign.created_at
          ? new Date(campaign.created_at).getTime()
          : null;
        const nextCampaignCreatedAt =
          index + 1 < campaigns.length
            ? campaigns[index + 1]?.created_at
            : null;
        const nextCreatedAt = nextCampaignCreatedAt
          ? new Date(nextCampaignCreatedAt).getTime()
          : null;

        const fallbackReferrals = referrals.filter((referral) => {
          const baseDateRaw = referral.transaction_date || referral.created_at;
          if (!baseDateRaw || currentCreatedAt === null) return false;

          const ts = new Date(baseDateRaw).getTime();
          if (Number.isNaN(ts)) return false;

          if (nextCreatedAt) {
            return ts >= currentCreatedAt && ts < nextCreatedAt;
          }
          return ts >= currentCreatedAt;
        });

        const referralsByCampaignId = campaign.id
          ? referrals.filter((referral) => referral.campaign_id === campaign.id)
          : [];
        const campaignReferrals =
          referralsByCampaignId.length > 0 ? referralsByCampaignId : fallbackReferrals;

        const completedForCampaign = campaignReferrals.filter(
          (ref) => ref.status === "completed",
        ).length;
        const revenueForCampaign = campaignReferrals.reduce(
          (sum, ref) => sum + (ref.transaction_value ?? 0),
          0,
        );
        const costPerMessage = campaign.channel === "sms" ? 0.02 : 0.01;
        const estimatedSendSpend = (campaign.sent_count ?? 0) * costPerMessage;
        const eventStatsForCampaign = eventStats[campaignKey] ?? {
          clicks: 0,
          signups: 0,
          conversions: 0,
        };
        const conversionsCount =
          completedForCampaign > 0
            ? completedForCampaign
            : eventStatsForCampaign.conversions;
        const rewardPerConversion =
          rewardType === "credit" ? rewardAmount ?? 0 : 0;
        const rewardSpend = conversionsCount * rewardPerConversion;
        const totalCost = estimatedSendSpend + rewardSpend;
        const roiMultiple =
          totalCost > 0 ? revenueForCampaign / totalCost : null;

        return (
          <>
            <TableRow
              key={campaign.id}
              className="cursor-pointer hover:bg-slate-50"
              onClick={() =>
                setExpandedId(isExpanded ? null : (campaign.id as string))
              }
            >
              <TableCell className="font-medium">
                {campaign.name ?? "Untitled campaign"}
              </TableCell>
              <TableCell className="capitalize">
                {campaign.channel ?? "—"}
              </TableCell>
              <TableCell className="capitalize">
                {campaign.status ?? "—"}
              </TableCell>
              <TableCell className="text-right text-sm">
                {campaign.total_recipients ?? 0}
              </TableCell>
              <TableCell className="text-right text-sm">
                {eventStatsForCampaign.clicks}
              </TableCell>
              <TableCell className="text-right text-sm text-emerald-700">
                {conversionsCount}
              </TableCell>
              <TableCell className="text-right text-sm text-slate-900">
                ${rewardSpend.toFixed(0)}
              </TableCell>
              <TableCell className="text-right text-sm">
                {roiMultiple ? `${roiMultiple.toFixed(1)}×` : "—"}
              </TableCell>
            </TableRow>
            {isExpanded && (
              <TableRow>
                <TableCell colSpan={6} className="bg-slate-50">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 text-xs text-slate-700 space-y-3">
                    <p className="font-semibold text-slate-900">
                      Settings &amp; rewards snapshot
                    </p>
                    <div className="grid gap-2 sm:grid-cols-2">
                      <div>
                        <p className="font-semibold text-slate-800">
                          Headline / offer
                        </p>
                        <p className="text-slate-700">
                          {offer || "Not captured"}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">
                          New customer reward
                        </p>
                        <p className="text-slate-700">
                          {newUserReward || "Not captured"}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">
                          Ambassador reward
                        </p>
                        <p className="text-slate-700">
                          {clientReward || "Not captured"}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">
                          Reward structure
                        </p>
                        <p className="text-slate-700">
                          {rewardType === "credit"
                            ? `$${rewardAmount ?? 0} credit`
                            : rewardType === "upgrade"
                            ? upgradeName || "Upgrade reward"
                            : rewardType === "discount"
                            ? `${rewardAmount ?? 0}% discount`
                            : rewardType === "points"
                            ? `${rewardAmount ?? 0} points`
                            : "Not captured"}
                        </p>
                      </div>
                    </div>
                    {rewardTerms && (
                      <div>
                        <p className="font-semibold text-slate-800">Terms</p>
                        <p className="text-slate-700">{rewardTerms}</p>
                      </div>
                    )}
                    <div className="mt-3 border-t border-dashed border-slate-200 pt-3">
                      <p className="mb-2 font-semibold text-slate-900">
                        Performance summary
                      </p>
                      <div className="grid gap-2 sm:grid-cols-4">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                            Created
                          </p>
                          <p className="text-slate-800">
                            {campaign.created_at
                              ? new Date(
                                  campaign.created_at,
                                ).toLocaleDateString()
                              : "—"}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            Channel: {campaign.channel ?? "—"}
                          </p>
                        </div>
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                            Sends
                          </p>
                          <p className="text-slate-800">
                            {campaign.sent_count ?? 0} sent •{" "}
                            {campaign.failed_count ?? 0} failed
                          </p>
                          <p className="text-[11px] text-slate-500">
                            Recipients: {campaign.total_recipients ?? 0}
                          </p>
                        </div>
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                            Engagement
                          </p>
                          <p className="text-slate-800">
                            {eventStatsForCampaign.clicks} clicks •{" "}
                            {eventStatsForCampaign.signups} signups
                          </p>
                          <p className="text-[11px] text-slate-500">
                            {campaign.channel ?? "—"} channel
                          </p>
                        </div>
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                            Outcomes
                          </p>
                          <p className="text-slate-800">
                            {conversionsCount} conversions
                          </p>
                          <p className="text-[11px] text-slate-500">
                            Revenue: ${Math.round(revenueForCampaign)} • Reward spend: $
                            {rewardSpend.toFixed(0)}{" "}
                            {roiMultiple && roiMultiple > 0 ? `• ROI ~${roiMultiple.toFixed(1)}×` : ""}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </>
        );
      })}
    </TableBody>
  );
}
