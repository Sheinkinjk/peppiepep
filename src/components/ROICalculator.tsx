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
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Target,
  Lightbulb,
} from "lucide-react";
import { calculateROIForecast, compareRewardScenarios, type ROIInputs } from "@/lib/ai-roi-calculator";

const INDUSTRY_OPTIONS = [
  { value: "beauty", label: "Beauty & Wellness", conversionRate: "18%", description: "Salons, spas, aesthetics" },
  { value: "fitness", label: "Fitness & Health", conversionRate: "22%", description: "Gyms, studios, trainers" },
  { value: "retail", label: "Retail & E-commerce", conversionRate: "12%", description: "Boutiques, online stores" },
  { value: "hospitality", label: "Hospitality & Food", conversionRate: "15%", description: "Restaurants, cafes, hotels" },
  { value: "other", label: "Other Services", conversionRate: "15%", description: "General service businesses" },
] as const;

export function ROICalculator() {
  // Step tracking
  const [currentStep, setCurrentStep] = useState(1);

  // User inputs
  const [industry, setIndustry] = useState<"beauty" | "fitness" | "retail" | "hospitality" | "other">("beauty");
  const [monthlyCustomers, setMonthlyCustomers] = useState<number>(50);
  const [avgTransactionValue, setAvgTransactionValue] = useState<number>(150);
  const [currentAmbassadors, setCurrentAmbassadors] = useState<number>(10);
  const [rewardAmount, setRewardAmount] = useState<number>(25);

  // Calculate forecasts
  const forecast = useMemo(() => {
    if (currentStep < 4) return null;

    const inputs: ROIInputs = {
      totalAmbassadors: currentAmbassadors,
      avgTransactionValue,
      rewardAmount,
      monthlyCustomers,
      industryType: industry,
    };

    return calculateROIForecast(inputs);
  }, [currentAmbassadors, avgTransactionValue, rewardAmount, monthlyCustomers, industry, currentStep]);

  // Compare different reward amounts
  const rewardComparison = useMemo(() => {
    if (currentStep < 4) return null;

    const inputs: ROIInputs = {
      totalAmbassadors: currentAmbassadors,
      avgTransactionValue,
      rewardAmount,
      monthlyCustomers,
      industryType: industry,
    };

    const conservativeReward = Math.round(avgTransactionValue * 0.10); // 10%
    const recommendedReward = Math.round(avgTransactionValue * 0.15); // 15%
    const aggressiveReward = Math.round(avgTransactionValue * 0.20); // 20%

    return compareRewardScenarios(inputs, [conservativeReward, recommendedReward, aggressiveReward]);
  }, [currentAmbassadors, avgTransactionValue, rewardAmount, monthlyCustomers, industry, currentStep]);

  const recommendedReward = Math.round(avgTransactionValue * 0.15);
  const recommendedSignOnBonus = Math.round(avgTransactionValue * 0.30);

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600">
          <Users className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-black text-slate-900">What industry are you in?</h3>
        <p className="text-slate-600 max-w-xl mx-auto">
          Different industries have different referral behaviors. We'll use industry benchmarks to give you accurate predictions.
        </p>
      </div>

      <div className="grid gap-3 max-w-2xl mx-auto">
        {INDUSTRY_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => setIndustry(option.value)}
            className={`p-5 rounded-2xl border-2 text-left transition-all hover:scale-[1.02] ${
              industry === option.value
                ? "border-purple-600 bg-purple-50 shadow-lg shadow-purple-200/50"
                : "border-slate-200 bg-white hover:border-purple-300"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="font-bold text-slate-900 mb-1">{option.label}</p>
                <p className="text-sm text-slate-600">{option.description}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs font-semibold text-purple-600 uppercase">Avg Conversion</p>
                  <p className="text-lg font-black text-purple-700">{option.conversionRate}</p>
                </div>
                {industry === option.value && (
                  <CheckCircle2 className="h-6 w-6 text-purple-600" />
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-center pt-4">
        <Button
          size="lg"
          onClick={() => setCurrentStep(2)}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-8 py-6 text-base font-bold"
        >
          Continue
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600">
          <DollarSign className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-black text-slate-900">Tell us about your business metrics</h3>
        <p className="text-slate-600 max-w-xl mx-auto">
          These numbers help us calculate accurate ROI forecasts. Don't worry about being exact—estimates work great.
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="p-6 border-2 border-slate-200">
          <div className="grid gap-6">
            <div>
              <Label htmlFor="monthly-customers" className="text-base font-bold text-slate-900 mb-2 block">
                How many customers do you serve each month?
              </Label>
              <p className="text-sm text-slate-600 mb-3">This includes all transactions, not just new customers.</p>
              <Input
                id="monthly-customers"
                type="number"
                value={monthlyCustomers}
                onChange={(e) => setMonthlyCustomers(Math.max(1, Number(e.target.value) || 0))}
                min={1}
                className="text-lg font-semibold h-14"
                placeholder="e.g., 50"
              />
              <div className="mt-2 flex gap-2">
                {[25, 50, 100, 200].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setMonthlyCustomers(preset)}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 hover:bg-purple-100 hover:text-purple-700 transition-colors"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="avg-transaction" className="text-base font-bold text-slate-900 mb-2 block">
                What's your average transaction value?
              </Label>
              <p className="text-sm text-slate-600 mb-3">The typical amount a customer spends per visit or purchase.</p>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-slate-400">$</span>
                <Input
                  id="avg-transaction"
                  type="number"
                  value={avgTransactionValue}
                  onChange={(e) => setAvgTransactionValue(Math.max(1, Number(e.target.value) || 0))}
                  min={1}
                  className="text-lg font-semibold h-14 pl-8"
                  placeholder="e.g., 150"
                />
              </div>
              <div className="mt-2 flex gap-2">
                {[50, 100, 150, 250, 500].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setAvgTransactionValue(preset)}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 hover:bg-purple-100 hover:text-purple-700 transition-colors"
                  >
                    ${preset}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="current-ambassadors" className="text-base font-bold text-slate-900 mb-2 block">
                How many brand ambassadors do you want to start with?
              </Label>
              <p className="text-sm text-slate-600 mb-3">This could be your loyal customers, employees, or influencers.</p>
              <Input
                id="current-ambassadors"
                type="number"
                value={currentAmbassadors}
                onChange={(e) => setCurrentAmbassadors(Math.max(1, Number(e.target.value) || 0))}
                min={1}
                className="text-lg font-semibold h-14"
                placeholder="e.g., 10"
              />
              <div className="mt-2 flex gap-2">
                {[5, 10, 25, 50, 100].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setCurrentAmbassadors(preset)}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 hover:bg-purple-100 hover:text-purple-700 transition-colors"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-center gap-3 pt-4">
        <Button
          size="lg"
          variant="outline"
          onClick={() => setCurrentStep(1)}
          className="px-8 py-6 text-base font-bold"
        >
          Back
        </Button>
        <Button
          size="lg"
          onClick={() => setCurrentStep(3)}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 px-8 py-6 text-base font-bold"
        >
          Continue
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-600 to-rose-600">
          <Target className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-black text-slate-900">What should you offer as a referral reward?</h3>
        <p className="text-slate-600 max-w-xl mx-auto">
          Based on your $<span className="font-bold">{avgTransactionValue}</span> average transaction, here's what we recommend.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Recommended Reward Structure */}
        <Card className="p-8 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50">
          <div className="flex items-start gap-4 mb-6">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-black text-purple-900 mb-2">Recommended Reward Structure</h4>
              <p className="text-purple-700">Optimized for maximum engagement and profitability</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-white border-2 border-purple-300">
              <p className="text-sm font-semibold text-purple-600 uppercase mb-2">Per Referral Reward</p>
              <p className="text-4xl font-black text-purple-900 mb-2">${recommendedReward}</p>
              <p className="text-sm text-slate-600">15% of avg transaction</p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span className="text-slate-700">Competitive in {INDUSTRY_OPTIONS.find(i => i.value === industry)?.label}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span className="text-slate-700">Motivates repeat referrals</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border-2 border-indigo-300">
              <p className="text-sm font-semibold text-indigo-600 uppercase mb-2">Sign-On Bonus (Optional)</p>
              <p className="text-4xl font-black text-indigo-900 mb-2">${recommendedSignOnBonus}</p>
              <p className="text-sm text-slate-600">30% of avg transaction</p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span className="text-slate-700">Accelerates program launch</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span className="text-slate-700">Creates immediate excitement</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Custom Reward Input */}
        <Card className="p-6 border-2 border-slate-200">
          <Label htmlFor="reward-amount" className="text-base font-bold text-slate-900 mb-3 block">
            Or set your own reward amount
          </Label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-slate-400">$</span>
            <Input
              id="reward-amount"
              type="number"
              value={rewardAmount}
              onChange={(e) => setRewardAmount(Math.max(1, Number(e.target.value) || 0))}
              min={1}
              className="text-lg font-semibold h-14 pl-8"
              placeholder="e.g., 25"
            />
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => setRewardAmount(Math.round(avgTransactionValue * 0.10))}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 hover:bg-purple-100 hover:text-purple-700 transition-colors"
            >
              10% (Conservative)
            </button>
            <button
              onClick={() => setRewardAmount(recommendedReward)}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-600 text-white hover:bg-purple-700 transition-colors"
            >
              15% (Recommended)
            </button>
            <button
              onClick={() => setRewardAmount(Math.round(avgTransactionValue * 0.20))}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 hover:bg-purple-100 hover:text-purple-700 transition-colors"
            >
              20% (Aggressive)
            </button>
          </div>

          {rewardAmount < avgTransactionValue * 0.10 && (
            <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-900">Low reward may reduce effectiveness</p>
                <p className="text-sm text-amber-700">Consider increasing to at least 10% of transaction value for better results.</p>
              </div>
            </div>
          )}

          {rewardAmount > avgTransactionValue * 0.30 && (
            <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-900">High reward may impact profit margins</p>
                <p className="text-sm text-amber-700">This is above industry standard. Make sure your margins support it.</p>
              </div>
            </div>
          )}
        </Card>
      </div>

      <div className="flex justify-center gap-3 pt-4">
        <Button
          size="lg"
          variant="outline"
          onClick={() => setCurrentStep(2)}
          className="px-8 py-6 text-base font-bold"
        >
          Back
        </Button>
        <Button
          size="lg"
          onClick={() => setCurrentStep(4)}
          className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 px-8 py-6 text-base font-bold"
        >
          See My ROI Forecast
          <Sparkles className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );

  const renderStep4 = () => {
    if (!forecast || !rewardComparison) return null;

    const totalNetProfit = forecast.month30.netProfit + forecast.month60.netProfit + forecast.month90.netProfit;
    const totalReferrals = forecast.month30.expectedReferrals + forecast.month60.expectedReferrals + forecast.month90.expectedReferrals;

    return (
      <div className="space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600">
            <TrendingUp className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">Your 90-Day ROI Forecast</h3>
          <p className="text-slate-600 max-w-xl mx-auto">
            Based on {currentAmbassadors} ambassadors offering ${rewardAmount} per referral in the {INDUSTRY_OPTIONS.find(i => i.value === industry)?.label.toLowerCase()} industry.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <Card className="p-6 border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
              <p className="text-sm font-semibold text-emerald-700 uppercase">Total Net Profit</p>
            </div>
            <p className="text-4xl font-black text-emerald-900">${totalNetProfit.toLocaleString()}</p>
            <p className="text-sm text-emerald-700 mt-1">Over 90 days</p>
          </Card>

          <Card className="p-6 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <p className="text-sm font-semibold text-purple-700 uppercase">New Referrals</p>
            </div>
            <p className="text-4xl font-black text-purple-900">{totalReferrals}</p>
            <p className="text-sm text-purple-700 mt-1">New customers</p>
          </Card>

          <Card className="p-6 border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-rose-50">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-pink-600 to-rose-600 flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <p className="text-sm font-semibold text-pink-700 uppercase">Break Even</p>
            </div>
            <p className="text-4xl font-black text-pink-900">{forecast.breakEvenDays}</p>
            <p className="text-sm text-pink-700 mt-1">Days to profitability</p>
          </Card>
        </div>

        {/* Monthly Breakdown */}
        <Card className="p-8 max-w-4xl mx-auto border-2 border-slate-200">
          <h4 className="text-xl font-black text-slate-900 mb-6">Monthly Revenue Forecast</h4>
          <div className="space-y-4">
            {[
              { period: "Month 1", data: forecast.month30, color: "emerald" },
              { period: "Month 2", data: forecast.month60, color: "purple" },
              { period: "Month 3", data: forecast.month90, color: "pink" },
            ].map(({ period, data, color }) => (
              <div key={period} className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-lg font-bold text-slate-900">{period}</p>
                  <span className={`px-3 py-1 rounded-full bg-${color}-100 text-${color}-700 text-xs font-semibold uppercase`}>
                    {data.roi}% ROI
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Referrals</p>
                    <p className="text-xl font-black text-slate-900">{data.expectedReferrals}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Revenue</p>
                    <p className="text-xl font-black text-emerald-600">${data.expectedRevenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Reward Costs</p>
                    <p className="text-xl font-black text-rose-600">${data.rewardCosts.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Net Profit</p>
                    <p className="text-xl font-black text-purple-600">${data.netProfit.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Reward Comparison */}
        <Card className="p-8 max-w-4xl mx-auto border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50">
          <h4 className="text-xl font-black text-indigo-900 mb-2">Reward Strategy Comparison</h4>
          <p className="text-sm text-indigo-700 mb-6">See how different reward amounts impact your 30-day results</p>

          <div className="grid md:grid-cols-3 gap-4">
            {rewardComparison.map(({ rewardAmount: amount, forecast: f }, index) => {
              const strategy = index === 0 ? "Conservative" : index === 1 ? "Recommended" : "Aggressive";
              const percentage = index === 0 ? "10%" : index === 1 ? "15%" : "20%";
              const isSelected = amount === rewardAmount;

              return (
                <div
                  key={amount}
                  className={`p-5 rounded-2xl border-2 ${
                    isSelected
                      ? "border-indigo-600 bg-white shadow-lg"
                      : "border-indigo-200 bg-white/60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm font-semibold text-indigo-600 uppercase">{strategy}</p>
                      <p className="text-xs text-slate-600">{percentage} of transaction</p>
                    </div>
                    {isSelected && <CheckCircle2 className="h-5 w-5 text-indigo-600" />}
                  </div>
                  <p className="text-3xl font-black text-indigo-900 mb-4">${amount}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">30-Day ROI:</span>
                      <span className="font-bold text-slate-900">{f.month30.roi}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Referrals:</span>
                      <span className="font-bold text-slate-900">{f.month30.expectedReferrals}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Net Profit:</span>
                      <span className="font-bold text-emerald-600">${f.month30.netProfit.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* AI Insights */}
        <Card className="p-8 max-w-4xl mx-auto border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="flex items-start gap-4 mb-6">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="text-xl font-black text-purple-900 mb-1">AI-Powered Insights</h4>
              <p className="text-sm text-purple-700">Recommendations based on your specific business metrics</p>
            </div>
          </div>
          <div className="space-y-3">
            {forecast.insights.map((insight, index) => (
              <div key={index} className="p-4 rounded-xl bg-white border border-purple-200 flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700 leading-relaxed">{insight}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* CTA */}
        <div className="flex justify-center gap-3 pt-4">
          <Button
            size="lg"
            variant="outline"
            onClick={() => setCurrentStep(3)}
            className="px-8 py-6 text-base font-bold"
          >
            Adjust Rewards
          </Button>
          <Button
            size="lg"
            onClick={() => window.location.href = "/login"}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-8 py-6 text-base font-bold"
          >
            Launch My Program
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold mb-4">
            <Calculator className="h-4 w-4" />
            Free ROI Calculator
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-4">
            Referral Program ROI Calculator
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Calculate your potential revenue and discover the perfect reward structure for your referral program in 4 simple steps.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: "Industry" },
              { num: 2, label: "Metrics" },
              { num: 3, label: "Rewards" },
              { num: 4, label: "Forecast" },
            ].map(({ num, label }, index) => (
              <div key={num} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                      currentStep >= num
                        ? "bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {currentStep > num ? <CheckCircle2 className="h-6 w-6" /> : num}
                  </div>
                  <p className={`text-xs font-semibold mt-2 ${currentStep >= num ? "text-purple-700" : "text-slate-500"}`}>
                    {label}
                  </p>
                </div>
                {index < 3 && (
                  <div className={`flex-1 h-1 mx-2 ${currentStep > num ? "bg-purple-600" : "bg-slate-200"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-purple-200/50 p-8 md:p-12 border-2 border-purple-100">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-slate-500">
          <p>Calculations based on industry benchmarks and AI-powered predictive models. Results may vary.</p>
        </div>
      </div>
    </div>
  );
}
