"use client";

import { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Send,
  MousePointerClick,
  CheckCircle2,
  MessageSquare,
  Calendar,
  Download,
  Filter,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Database } from "@/types/supabase";

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

type CampaignAnalyticsDashboardProps = {
  campaigns: CampaignRow[];
  referrals: ReferralRow[];
  eventStats: CampaignEventStats;
};

type TimeRange = "7d" | "30d" | "90d" | "all";

const COLORS = {
  primary: "#0ea5e9",
  success: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
  purple: "#8b5cf6",
  pink: "#ec4899",
};

export function CampaignAnalyticsDashboard({
  campaigns,
  referrals,
  eventStats,
}: CampaignAnalyticsDashboardProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>("30d");
  const [channelFilter, setChannelFilter] = useState<"all" | "sms" | "email">("all");

  const filteredCampaigns = useMemo(() => {
    let filtered = campaigns;

    // Filter by channel
    if (channelFilter !== "all") {
      filtered = filtered.filter((c) => c.channel === channelFilter);
    }

    // Filter by time range
    if (timeRange !== "all") {
      const now = new Date();
      const daysAgo = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;
      const cutoffDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);

      filtered = filtered.filter((c) => {
        if (!c.created_at) return false;
        return new Date(c.created_at) >= cutoffDate;
      });
    }

    return filtered;
  }, [campaigns, timeRange, channelFilter]);

  const analytics = useMemo(() => {
    const totalSent = filteredCampaigns.reduce((sum, c) => sum + (c.sent_count ?? 0), 0);
    const totalRecipients = filteredCampaigns.reduce(
      (sum, c) => sum + (c.total_recipients ?? 0),
      0
    );
    const totalFailed = filteredCampaigns.reduce((sum, c) => sum + (c.failed_count ?? 0), 0);

    let totalClicks = 0;
    let totalSignups = 0;
    let totalConversions = 0;

    filteredCampaigns.forEach((campaign) => {
      const stats = eventStats[campaign.id] ?? { clicks: 0, signups: 0, conversions: 0 };
      totalClicks += stats.clicks;
      totalSignups += stats.signups;
      totalConversions += stats.conversions;
    });

    // Calculate campaign-attributed referrals
    const campaignReferrals = referrals.filter((ref) =>
      filteredCampaigns.some((c) => c.id === ref.campaign_id)
    );

    const completedReferrals = campaignReferrals.filter((r) => r.status === "completed");
    const totalRevenue = completedReferrals.reduce(
      (sum, r) => sum + (r.transaction_value ?? 0),
      0
    );

    // Calculate costs
    const smsCost = filteredCampaigns
      .filter((c) => c.channel === "sms")
      .reduce((sum, c) => sum + (c.sent_count ?? 0) * 0.02, 0);

    const emailCost = filteredCampaigns
      .filter((c) => c.channel === "email")
      .reduce((sum, c) => sum + (c.sent_count ?? 0) * 0.01, 0);

    const totalCost = smsCost + emailCost;

    // ROI calculation
    const roi = totalCost > 0 ? ((totalRevenue - totalCost) / totalCost) * 100 : 0;

    // Calculate rates
    const deliveryRate = totalRecipients > 0 ? ((totalSent - totalFailed) / totalSent) * 100 : 0;
    const clickRate = totalSent > 0 ? (totalClicks / totalSent) * 100 : 0;
    const conversionRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;

    return {
      totalCampaigns: filteredCampaigns.length,
      totalSent,
      totalRecipients,
      totalFailed,
      totalClicks,
      totalSignups,
      totalConversions,
      totalRevenue,
      totalCost,
      roi,
      deliveryRate,
      clickRate,
      conversionRate,
      avgRevenuePerCampaign: filteredCampaigns.length > 0 ? totalRevenue / filteredCampaigns.length : 0,
    };
  }, [filteredCampaigns, referrals, eventStats]);

  // Performance over time data
  const performanceData = useMemo(() => {
    const dataMap = new Map<string, {
      date: string;
      sent: number;
      clicks: number;
      conversions: number;
      revenue: number;
    }>();

    filteredCampaigns.forEach((campaign) => {
      if (!campaign.created_at) return;

      const date = new Date(campaign.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      const existing = dataMap.get(date) ?? {
        date,
        sent: 0,
        clicks: 0,
        conversions: 0,
        revenue: 0,
      };

      const stats = eventStats[campaign.id] ?? { clicks: 0, signups: 0, conversions: 0 };
      const campaignReferrals = referrals.filter((r) => r.campaign_id === campaign.id);
      const revenue = campaignReferrals
        .filter((r) => r.status === "completed")
        .reduce((sum, r) => sum + (r.transaction_value ?? 0), 0);

      dataMap.set(date, {
        date,
        sent: existing.sent + (campaign.sent_count ?? 0),
        clicks: existing.clicks + stats.clicks,
        conversions: existing.conversions + stats.conversions,
        revenue: existing.revenue + revenue,
      });
    });

    return Array.from(dataMap.values()).sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });
  }, [filteredCampaigns, referrals, eventStats]);

  // Channel breakdown
  const channelData = useMemo(() => {
    const sms = filteredCampaigns.filter((c) => c.channel === "sms");
    const email = filteredCampaigns.filter((c) => c.channel === "email");

    return [
      { name: "SMS", value: sms.length, color: COLORS.primary },
      { name: "Email", value: email.length, color: COLORS.success },
    ];
  }, [filteredCampaigns]);

  // Top performing campaigns
  const topCampaigns = useMemo(() => {
    return filteredCampaigns
      .map((campaign) => {
        const stats = eventStats[campaign.id] ?? { clicks: 0, signups: 0, conversions: 0 };
        const campaignReferrals = referrals.filter((r) => r.campaign_id === campaign.id);
        const revenue = campaignReferrals
          .filter((r) => r.status === "completed")
          .reduce((sum, r) => sum + (r.transaction_value ?? 0), 0);

        return {
          name: campaign.name || "Untitled",
          conversions: stats.conversions,
          revenue,
          clicks: stats.clicks,
        };
      })
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }, [filteredCampaigns, referrals, eventStats]);

  const exportData = () => {
    const csvContent = [
      ["Campaign", "Channel", "Sent", "Clicks", "Conversions", "Revenue", "ROI"].join(","),
      ...filteredCampaigns.map((campaign) => {
        const stats = eventStats[campaign.id] ?? { clicks: 0, signups: 0, conversions: 0 };
        const campaignReferrals = referrals.filter((r) => r.campaign_id === campaign.id);
        const revenue = campaignReferrals
          .filter((r) => r.status === "completed")
          .reduce((sum, r) => sum + (r.transaction_value ?? 0), 0);
        const cost = (campaign.sent_count ?? 0) * (campaign.channel === "sms" ? 0.02 : 0.01);
        const roi = cost > 0 ? ((revenue - cost) / cost * 100).toFixed(1) : "0";

        return [
          campaign.name || "Untitled",
          campaign.channel || "—",
          campaign.sent_count ?? 0,
          stats.clicks,
          stats.conversions,
          revenue.toFixed(2),
          `${roi}%`,
        ].join(",");
      }),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `campaign-analytics-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Campaign Analytics</h2>
          <p className="text-sm text-slate-600 mt-1">
            Track performance, ROI, and engagement across all campaigns
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Select value={channelFilter} onValueChange={(v) => setChannelFilter(v as typeof channelFilter)}>
            <SelectTrigger className="w-32">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Channels</SelectItem>
              <SelectItem value="sms">SMS Only</SelectItem>
              <SelectItem value="email">Email Only</SelectItem>
            </SelectContent>
          </Select>

          <Select value={timeRange} onValueChange={(v) => setTimeRange(v as TimeRange)}>
            <SelectTrigger className="w-32">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={exportData} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-blue-900">Total Campaigns</p>
            <Send className="h-5 w-5 text-blue-600" />
          </div>
          <p className="text-3xl font-black text-blue-900">{analytics.totalCampaigns}</p>
          <p className="text-xs text-blue-700 mt-1">
            {analytics.totalSent.toLocaleString()} messages sent
          </p>
        </Card>

        <Card className="p-6 border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-emerald-900">Click Rate</p>
            <MousePointerClick className="h-5 w-5 text-emerald-600" />
          </div>
          <p className="text-3xl font-black text-emerald-900">
            {analytics.clickRate.toFixed(1)}%
          </p>
          <p className="text-xs text-emerald-700 mt-1">
            {analytics.totalClicks.toLocaleString()} total clicks
          </p>
        </Card>

        <Card className="p-6 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-purple-900">Conversion Rate</p>
            <CheckCircle2 className="h-5 w-5 text-purple-600" />
          </div>
          <p className="text-3xl font-black text-purple-900">
            {analytics.conversionRate.toFixed(1)}%
          </p>
          <p className="text-xs text-purple-700 mt-1">
            {analytics.totalConversions.toLocaleString()} conversions
          </p>
        </Card>

        <Card className="p-6 border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-amber-900">ROI</p>
            {analytics.roi >= 0 ? (
              <TrendingUp className="h-5 w-5 text-amber-600" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-600" />
            )}
          </div>
          <p className="text-3xl font-black text-amber-900">
            {analytics.roi > 0 ? "+" : ""}{analytics.roi.toFixed(0)}%
          </p>
          <p className="text-xs text-amber-700 mt-1">
            ${analytics.totalRevenue.toLocaleString()} revenue
          </p>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Performance Over Time */}
        <Card className="p-6">
          <h3 className="text-lg font-black text-slate-900 mb-4">Performance Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" style={{ fontSize: 12 }} />
              <YAxis style={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sent" stroke={COLORS.primary} name="Sent" />
              <Line type="monotone" dataKey="clicks" stroke={COLORS.success} name="Clicks" />
              <Line type="monotone" dataKey="conversions" stroke={COLORS.purple} name="Conversions" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Channel Breakdown */}
        <Card className="p-6">
          <h3 className="text-lg font-black text-slate-900 mb-4">Channel Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={channelData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${entry.value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {channelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Top Performing Campaigns */}
      <Card className="p-6">
        <h3 className="text-lg font-black text-slate-900 mb-4">Top Performing Campaigns</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topCampaigns}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" style={{ fontSize: 12 }} />
            <YAxis style={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill={COLORS.success} name="Revenue ($)" />
            <Bar dataKey="conversions" fill={COLORS.purple} name="Conversions" />
            <Bar dataKey="clicks" fill={COLORS.primary} name="Clicks" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Additional Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-5 bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="rounded-full bg-blue-600 p-2">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-600">Delivery Rate</p>
              <p className="text-2xl font-black text-slate-900">
                {analytics.deliveryRate.toFixed(1)}%
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-600">
            {(analytics.totalSent - analytics.totalFailed).toLocaleString()} of{" "}
            {analytics.totalSent.toLocaleString()} delivered
          </p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="rounded-full bg-emerald-600 p-2">
              <DollarSign className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-600">Avg Revenue/Campaign</p>
              <p className="text-2xl font-black text-slate-900">
                ${analytics.avgRevenuePerCampaign.toFixed(0)}
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-600">
            Total cost: ${analytics.totalCost.toFixed(2)}
          </p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="rounded-full bg-purple-600 p-2">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-600">Total Signups</p>
              <p className="text-2xl font-black text-slate-900">
                {analytics.totalSignups.toLocaleString()}
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-600">
            From {analytics.totalClicks.toLocaleString()} clicks
          </p>
        </Card>
      </div>
    </div>
  );
}
