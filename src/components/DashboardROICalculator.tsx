"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Calculator,
  TrendingUp,
  DollarSign,
  Users,
  Zap,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Target,
  Lightbulb,
  PieChart,
} from "lucide-react";
import { calculateROIForecast, compareRewardScenarios, type ROIInputs } from "@/lib/ai-roi-calculator";

const INDUSTRY_OPTIONS = [
  { value: "beauty", label: "Beauty & Wellness", conversionRate: "18%" },
  { value: "fitness", label: "Fitness & Health", conversionRate: "22%" },
  { value: "retail", label: "Retail & E-commerce", conversionRate: "12%" },
  { value: "hospitality", label: "Hospitality & Food", conversionRate: "15%" },
  { value: "other", label: "Other Services", conversionRate: "15%" },
] as const;

type DashboardROICalculatorProps = {
  initialAmbassadors?: number;
  businessName?: string;
};

export function DashboardROICalculator({ initialAmbassadors = 10 }: DashboardROICalculatorProps) {
  // User inputs
  const [industry, setIndustry] = useState<"beauty" | "fitness" | "retail" | "hospitality" | "other">("beauty");
  const [monthlyCustomers, setMonthlyCustomers] = useState<number>(50);
  const [avgTransactionValue, setAvgTransactionValue] = useState<number>(150);
  const [currentAmbassadors, setCurrentAmbassadors] = useState<number>(initialAmbassadors);
  const [rewardAmount, setRewardAmount] = useState<number>(25);
  const [showResults, setShowResults] = useState(false);

  // Calculate forecasts
  const forecast = useMemo(() => {
    if (!showResults) return null;

    const inputs: ROIInputs = {
      totalAmbassadors: currentAmbassadors,
      avgTransactionValue,
      rewardAmount,
      monthlyCustomers,
      industryType: industry,
    };

    return calculateROIForecast(inputs);
  }, [currentAmbassadors, avgTransactionValue, rewardAmount, monthlyCustomers, industry, showResults]);

  // Compare different reward amounts
  const rewardComparison = useMemo(() => {
    if (!showResults) return null;

    const inputs: ROIInputs = {
      totalAmbassadors: currentAmbassadors,
      avgTransactionValue,
      rewardAmount,
      monthlyCustomers,
      industryType: industry,
    };

    const conservativeReward = Math.round(avgTransactionValue * 0.10);
    const recommendedReward = Math.round(avgTransactionValue * 0.15);
    const aggressiveReward = Math.round(avgTransactionValue * 0.20);

    return compareRewardScenarios(inputs, [conservativeReward, recommendedReward, aggressiveReward]);
  }, [currentAmbassadors, avgTransactionValue, rewardAmount, monthlyCustomers, industry, showResults]);

  const recommendedReward = Math.round(avgTransactionValue * 0.15);
  const totalNetProfit = forecast ? forecast.month30.netProfit + forecast.month60.netProfit + forecast.month90.netProfit : 0;
  const totalReferrals = forecast ? forecast.month30.expectedReferrals + forecast.month60.expectedReferrals + forecast.month90.expectedReferrals : 0;

  const handleCalculate = () => {
    setShowResults(true);
  };

  return (
    <Card className="p-6 border-2 border-purple-200 hover:border-purple-400 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
          <PieChart className="h-6 w-6 text-white" />
        </div>
        <span className="px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">AI-Powered</span>
      </div>

      <h3 className="text-lg font-bold text-slate-900 mb-2">ROI Calculator</h3>
      <p className="text-sm text-slate-600 mb-4">
        Get AI-powered 90-day revenue forecasts and discover the perfect reward structure for your referral program.
      </p>

      {/* Inputs */}
      <div className="space-y-4 mb-4">
        {/* Industry Selection */}
        <div>
          <Label className="text-xs font-semibold text-slate-500 mb-2 block">Industry</Label>
          <div className="grid grid-cols-2 gap-2">
            {INDUSTRY_OPTIONS.slice(0, 4).map((option) => (
              <button
                key={option.value}
                onClick={() => setIndustry(option.value)}
                className={`p-2 rounded-lg border text-left text-xs transition-all ${
                  industry === option.value
                    ? "border-purple-600 bg-purple-50"
                    : "border-slate-200 hover:border-purple-300"
                }`}
              >
                <p className="font-semibold text-slate-900">{option.label}</p>
                <p className="text-slate-600">{option.conversionRate} avg</p>
              </button>
            ))}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs font-semibold text-slate-500">Monthly Customers</Label>
            <Input
              type="number"
              value={monthlyCustomers}
              onChange={(e) => setMonthlyCustomers(Math.max(1, Number(e.target.value) || 0))}
              className="mt-1"
              min={1}
            />
          </div>
          <div>
            <Label className="text-xs font-semibold text-slate-500">Avg Transaction ($)</Label>
            <Input
              type="number"
              value={avgTransactionValue}
              onChange={(e) => setAvgTransactionValue(Math.max(1, Number(e.target.value) || 0))}
              className="mt-1"
              min={1}
            />
          </div>
          <div>
            <Label className="text-xs font-semibold text-slate-500">Ambassadors</Label>
            <Input
              type="number"
              value={currentAmbassadors}
              onChange={(e) => setCurrentAmbassadors(Math.max(1, Number(e.target.value) || 0))}
              className="mt-1"
              min={1}
            />
          </div>
          <div>
            <Label className="text-xs font-semibold text-slate-500">Reward ($)</Label>
            <Input
              type="number"
              value={rewardAmount}
              onChange={(e) => setRewardAmount(Math.max(1, Number(e.target.value) || 0))}
              className="mt-1"
              min={1}
            />
          </div>
        </div>

        {/* Reward Recommendation */}
        <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
          <div className="flex items-center gap-2 mb-1">
            <Lightbulb className="h-4 w-4 text-purple-600" />
            <p className="text-xs font-semibold text-purple-900">Recommended</p>
          </div>
          <p className="text-sm text-purple-700">
            ${recommendedReward} per referral (15% of transaction) is optimal for your industry
          </p>
          {rewardAmount !== recommendedReward && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setRewardAmount(recommendedReward)}
              className="mt-2 text-xs h-7"
            >
              Apply Recommended
            </Button>
          )}
        </div>

        <Button
          onClick={handleCalculate}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
        >
          <Calculator className="mr-2 h-4 w-4" />
          Calculate ROI Forecast
        </Button>
      </div>

      {/* Results */}
      {showResults && forecast && (
        <div className="space-y-4 pt-4 border-t border-slate-200">
          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200">
              <p className="text-xs font-semibold text-emerald-700 uppercase mb-1">Net Profit</p>
              <p className="text-lg font-black text-emerald-900">${totalNetProfit.toLocaleString()}</p>
              <p className="text-xs text-emerald-600">90 days</p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200">
              <p className="text-xs font-semibold text-purple-700 uppercase mb-1">Referrals</p>
              <p className="text-lg font-black text-purple-900">{totalReferrals}</p>
              <p className="text-xs text-purple-600">New customers</p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200">
              <p className="text-xs font-semibold text-pink-700 uppercase mb-1">Break Even</p>
              <p className="text-lg font-black text-pink-900">{forecast.breakEvenDays}</p>
              <p className="text-xs text-pink-600">Days</p>
            </div>
          </div>

          {/* Monthly Breakdown */}
          <div className="space-y-2">
            <p className="text-sm font-bold text-slate-900">Monthly Forecast</p>
            {[
              { period: "Month 1", data: forecast.month30, color: "emerald" },
              { period: "Month 2", data: forecast.month60, color: "purple" },
              { period: "Month 3", data: forecast.month90, color: "pink" },
            ].map(({ period, data }) => (
              <div key={period} className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-slate-900">{period}</p>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                    {data.roi}% ROI
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <p className="text-slate-500">Referrals</p>
                    <p className="font-bold text-slate-900">{data.expectedReferrals}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Revenue</p>
                    <p className="font-bold text-emerald-600">${data.expectedRevenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Profit</p>
                    <p className="font-bold text-purple-600">${data.netProfit.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Reward Comparison */}
          {rewardComparison && (
            <div className="p-4 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200">
              <p className="text-sm font-bold text-indigo-900 mb-3">Compare Reward Strategies</p>
              <div className="grid grid-cols-3 gap-2">
                {rewardComparison.map(({ rewardAmount: amount, forecast: f }, index) => {
                  const strategy = index === 0 ? "10%" : index === 1 ? "15%" : "20%";
                  const isSelected = amount === rewardAmount;

                  return (
                    <div
                      key={amount}
                      className={`p-2 rounded-lg border ${
                        isSelected ? "border-indigo-600 bg-white" : "border-indigo-200 bg-white/60"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs font-semibold text-indigo-600">{strategy}</p>
                        {isSelected && <CheckCircle2 className="h-3 w-3 text-indigo-600" />}
                      </div>
                      <p className="text-lg font-black text-indigo-900">${amount}</p>
                      <div className="text-xs space-y-0.5 mt-2">
                        <div className="flex justify-between">
                          <span className="text-slate-600">ROI:</span>
                          <span className="font-bold">{f.month30.roi}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Profit:</span>
                          <span className="font-bold text-emerald-600">${f.month30.netProfit.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* AI Insights */}
          <div className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-purple-600" />
              <p className="text-sm font-bold text-purple-900">AI Insights</p>
            </div>
            <div className="space-y-2">
              {forecast.insights.slice(0, 3).map((insight, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-purple-600 mt-1.5 flex-shrink-0" />
                  <p className="text-xs text-slate-700 leading-relaxed">{insight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
