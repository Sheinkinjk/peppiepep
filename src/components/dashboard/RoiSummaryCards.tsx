import { Card } from "@/components/ui/card";
import { TrendingUp, DollarSign, Target, Users } from "lucide-react";
import type { Database } from "@/types/supabase";

type Referral = Database["public"]["Tables"]["referrals"]["Row"];
type Customer = Database["public"]["Tables"]["customers"]["Row"];

type RoiSummaryCardsProps = {
  allReferrals: Referral[];
  safeCustomers: Customer[];
};

export function RoiSummaryCards({ allReferrals, safeCustomers }: RoiSummaryCardsProps) {
  const completedReferrals = allReferrals.filter((r) => r.status === "completed");
  const totalRevenue = completedReferrals
    .filter((r) => r.transaction_value)
    .reduce((sum, r) => sum + (Number(r.transaction_value) || 0), 0);
  const conversionsWithValue = completedReferrals.filter((r) => r.transaction_value).length;
  const conversionRate = allReferrals.length > 0
    ? Math.round((completedReferrals.length / allReferrals.length) * 100)
    : 0;
  const activeAmbassadorCount = new Set(allReferrals.map((r) => r.ambassador_id).filter(Boolean)).size;

  // Calculate top ambassador
  const ambassadorStats = completedReferrals
    .filter((r) => r.ambassador_id && r.transaction_value)
    .reduce((acc, r) => {
      const id = r.ambassador_id!;
      if (!acc[id]) {
        acc[id] = {
          ambassador_id: id,
          name: safeCustomers.find((c) => c.id === id)?.name || "Unknown",
          revenue: 0,
          count: 0,
        };
      }
      acc[id].revenue += Number(r.transaction_value) || 0;
      acc[id].count += 1;
      return acc;
    }, {} as Record<string, { ambassador_id: string; name: string; revenue: number; count: number }>);

  const topAmbassador = Object.values(ambassadorStats).sort((a, b) => b.revenue - a.revenue)[0];

  return (
    <>
      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">Total Referrals</p>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-black text-slate-900">{allReferrals.length}</p>
          <p className="text-xs text-slate-600 mt-1">
            {completedReferrals.length} completed
          </p>
        </Card>

        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">Total Revenue</p>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </div>
          <p className="text-3xl font-black text-slate-900">
            ${totalRevenue.toLocaleString()}
          </p>
          <p className="text-xs text-slate-600 mt-1">
            From {conversionsWithValue} conversions
          </p>
        </Card>

        <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-purple-700">Conversion Rate</p>
            <Target className="h-4 w-4 text-purple-600" />
          </div>
          <p className="text-3xl font-black text-slate-900">{conversionRate}%</p>
          <p className="text-xs text-slate-600 mt-1">
            {completedReferrals.length} of {allReferrals.length} referrals
          </p>
        </Card>

        <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">Active Ambassadors</p>
            <Users className="h-4 w-4 text-amber-600" />
          </div>
          <p className="text-3xl font-black text-slate-900">{activeAmbassadorCount}</p>
          <p className="text-xs text-slate-600 mt-1">
            Ambassadors with referrals
          </p>
        </Card>
      </div>

      {/* Top Ambassador Spotlight */}
      {topAmbassador && (
        <Card className="border-2 border-slate-200 bg-gradient-to-r from-slate-50 to-white p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 p-3 shadow-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 mb-1">
                🏆 Top Ambassador
              </p>
              <p className="text-xl font-black text-slate-900">{topAmbassador.name}</p>
              <div className="mt-3 flex flex-wrap gap-6 text-sm">
                <div>
                  <p className="text-xs text-slate-500">Revenue Generated</p>
                  <p className="text-lg font-bold text-emerald-600">${topAmbassador.revenue.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Successful Referrals</p>
                  <p className="text-lg font-bold text-blue-600">{topAmbassador.count}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Avg Deal Size</p>
                  <p className="text-lg font-bold text-purple-600">
                    ${Math.round(topAmbassador.revenue / topAmbassador.count).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
