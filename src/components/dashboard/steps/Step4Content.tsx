import { Card } from "@/components/ui/card";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CampaignAnalyticsDashboard } from "@/components/CampaignAnalyticsDashboard";
import { CampaignsTable } from "@/components/CampaignsTable";
import { PartnerReferralsTab } from "@/components/PartnerReferralsTab";
import { ShareReferralCard } from "@/components/ShareReferralCard";
import { BarChart3, Mail } from "lucide-react";
import type { Database } from "@/types/supabase";

type Campaign = Database["public"]["Tables"]["campaigns"]["Row"];
type Referral = Database["public"]["Tables"]["referrals"]["Row"];
type CampaignEventStats = Record<
  string,
  {
    clicks: number;
    signups: number;
    conversions: number;
  }
>;

interface Step4ContentProps {
  campaignsData: Campaign[];
  safeReferrals: Referral[];
  campaignEventStats: CampaignEventStats;
  safePartnerReferrals: Referral[];
  safeCustomers: Database["public"]["Tables"]["customers"]["Row"][];
  siteUrl: string;
  businessName: string | null;
  clientRewardText: string | null;
  newUserRewardText: string | null;
  rewardAmount: number | null;
  offerText: string | null;
}

export function Step4Content({
  campaignsData,
  safeReferrals,
  campaignEventStats,
  safePartnerReferrals,
  safeCustomers,
  siteUrl,
  businessName,
  clientRewardText,
  newUserRewardText,
  rewardAmount,
  offerText,
}: Step4ContentProps) {
  return (
    <>
      <Tabs defaultValue="analytics">
        <div className="border border-slate-200 bg-white p-4 rounded-lg">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-3">
            Campaign insights
          </div>
          <TabsList className="grid gap-3 border-none bg-transparent p-0 text-left md:grid-cols-4">
            <TabsTrigger
              value="analytics"
              className="border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 rounded-md data-[state=active]:border-blue-500 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 rounded-md data-[state=active]:border-blue-500 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              Campaign History
            </TabsTrigger>
            <TabsTrigger
              value="partner-referrals"
              className="border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 rounded-md data-[state=active]:border-blue-500 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              Partner Referrals {safePartnerReferrals.length > 0 && `(${safePartnerReferrals.length})`}
            </TabsTrigger>
            <TabsTrigger
              value="share"
              className="border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 rounded-md data-[state=active]:border-blue-500 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              Share Assets
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="analytics" className="space-y-6">
          {campaignsData.length === 0 ? (
            <Card className="p-6 border border-slate-200 rounded-lg bg-white">
              <div className="py-16 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                  <BarChart3 className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">No campaigns yet</h3>
                <p className="mb-6 text-sm text-slate-600 max-w-md mx-auto">
                  Launch your first campaign to start tracking analytics and performance metrics.
                </p>
                <a href="#crm-integration" className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors">
                  <Mail className="h-4 w-4" />
                  Launch First Campaign
                </a>
              </div>
            </Card>
          ) : (
            <CampaignAnalyticsDashboard
              campaigns={campaignsData}
              referrals={safeReferrals}
              eventStats={campaignEventStats}
            />
          )}
        </TabsContent>

        <TabsContent value="history">
          <Card className="p-6 border border-slate-200 rounded-lg bg-white">
            <h3 className="text-xl font-black text-slate-900 mb-4">
              Campaign History
            </h3>
            {campaignsData.length === 0 ? (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                  <Mail className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">No campaigns yet</h3>
                <p className="mb-6 text-sm text-slate-600 max-w-md mx-auto">
                  Launch your first campaign to start building your campaign history and tracking performance over time.
                </p>
                <a href="#crm-integration" className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors">
                  <Mail className="h-4 w-4" />
                  Launch First Campaign
                </a>
              </div>
            ) : (
              <div className="overflow-x-auto -mx-6 px-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Channel</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Recipients</TableHead>
                      <TableHead className="text-right">Clicks</TableHead>
                      <TableHead className="text-right">Conversions</TableHead>
                      <TableHead className="text-right">Reward Spend</TableHead>
                      <TableHead className="text-right">ROI</TableHead>
                    </TableRow>
                  </TableHeader>
                  <CampaignsTable
                    campaigns={campaignsData}
                    referrals={safeReferrals}
                    eventStats={campaignEventStats}
                  />
                </Table>
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="partner-referrals">
          <PartnerReferralsTab referrals={safePartnerReferrals} />
        </TabsContent>

        <TabsContent value="share">
          <ShareReferralCard
            customers={safeCustomers.map((customer) => ({
              id: customer.id,
              name: customer.name,
              referral_code: customer.referral_code,
              discount_code: customer.discount_code,
            }))}
            siteUrl={siteUrl}
            clientRewardText={clientRewardText}
            newUserRewardText={newUserRewardText}
            rewardAmount={rewardAmount}
            offerText={offerText}
            businessName={businessName}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}
