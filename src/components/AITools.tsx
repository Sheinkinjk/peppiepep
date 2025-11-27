"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Sparkles, MessageSquare, Award, PieChart, Activity, Copy
} from "lucide-react";
import { rankAmbassadors, type ScoredCustomer } from "@/lib/ai-scoring";
import { calculateROIForecast, type ROIForecast } from "@/lib/ai-roi-calculator";

type Customer = {
  id: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  referral_code: string | null;
  credits: number | null;
  created_at?: string | null;
  status: string | null;
  referrals_made?: number;
  total_value_generated?: number;
  joined?: string;
  last_referral?: string | null;
  avg_referral_value?: number;
  notes?: string;
  tags?: string[];
};

type Referral = {
  id: string;
  ambassador_id: string | null;
  status: string | null;
  created_at: string | null;
};

type AIToolsProps = {
  customers: Customer[];
  referrals: Referral[];
  businessName: string;
  offerText: string | null;
  rewardAmount: number;
};

export function AITools({ customers, referrals, businessName, offerText, rewardAmount }: AIToolsProps) {
  const [scoredCustomers, setScoredCustomers] = useState<ScoredCustomer[]>([]);
  const [roiForecast, setRoiForecast] = useState<ROIForecast | null>(null);
  const [aiMessageInput, setAiMessageInput] = useState("");
  const [aiGeneratedMessage, setAiGeneratedMessage] = useState("");
  const [isGeneratingMessage, setIsGeneratingMessage] = useState(false);

  const handleCalculateScores = () => {
    const customerData = customers
      .filter(c => c.name && c.referral_code && c.created_at)
      .map(c => ({
        id: c.id,
        name: c.name!,
        phone: c.phone || "",
        email: c.email || "",
        referral_code: c.referral_code!,
        credits: c.credits || 0,
        status: "active" as const,
        referrals_made: referrals.filter(r => r.ambassador_id === c.id).length,
        total_value_generated: referrals.filter(r => r.ambassador_id === c.id && r.status === "completed").length * 50,
        joined: c.created_at!,
        last_referral: referrals.find(r => r.ambassador_id === c.id)?.created_at || null,
        avg_referral_value: 50,
        notes: "",
        tags: [],
      }));
    const scored = rankAmbassadors(customerData);
    setScoredCustomers(scored);
  };

  const handleCalculateROI = () => {
    const forecast = calculateROIForecast({
      totalAmbassadors: customers.length,
      avgTransactionValue: 120,
      rewardAmount: rewardAmount || 15,
      monthlyCustomers: 85,
      industryType: 'beauty',
    });
    setRoiForecast(forecast);
  };

  const handleGenerateMessage = async () => {
    setIsGeneratingMessage(true);
    try {
      const response = await fetch("/api/generate-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: businessName || "Your Business",
          offerText: offerText || "amazing rewards",
          tone: "friendly",
          context: aiMessageInput || "general referral campaign",
        }),
      });

      if (!response.ok) throw new Error("Failed to generate message");

      const data = await response.json();
      setAiGeneratedMessage(data.message || "Hi! Share our amazing offer with your friends and earn rewards!");
    } catch (error) {
      console.error("Error generating message:", error);
      setAiGeneratedMessage(`Hi! I wanted to share ${offerText || "an amazing offer"} with you. Use my referral link to claim it and I'll earn rewards! Thanks for supporting my favorite business!`);
    } finally {
      setIsGeneratingMessage(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Tools Header */}
      <div className="rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 text-white">
        <div className="flex items-start gap-4 mb-4">
          <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center flex-shrink-0">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-black mb-2">AI-Powered Growth Tools</h2>
            <p className="text-purple-100 text-lg">
              Leverage artificial intelligence to optimize your referral program, predict performance, and craft perfect messages.
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* AI Message Generator */}
        <Card className="p-6 border-2 border-indigo-200 hover:border-indigo-400 transition-colors">
          <div className="flex items-start justify-between mb-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <span className="px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">GPT-4 Powered</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Generate Smart Messages</h3>
          <p className="text-sm text-slate-600 mb-4">
            Create personalized, high-converting referral messages using advanced AI trained on thousands of successful campaigns.
          </p>
          <div className="space-y-3">
            <Textarea
              value={aiMessageInput}
              onChange={(e) => setAiMessageInput(e.target.value)}
              placeholder="e.g., 'Holiday campaign for returning customers' or leave blank for general message"
              rows={2}
              className="text-sm"
            />
            <Button
              onClick={handleGenerateMessage}
              disabled={isGeneratingMessage}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            >
              {isGeneratingMessage ? (
                <>
                  <Activity className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Message
                </>
              )}
            </Button>
            {aiGeneratedMessage && (
              <div className="p-4 rounded-lg bg-indigo-50 border border-indigo-200">
                <p className="text-sm font-semibold text-indigo-900 mb-2">✨ AI Generated:</p>
                <p className="text-sm text-indigo-800">{aiGeneratedMessage}</p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(aiGeneratedMessage);
                  }}
                  className="mt-3"
                >
                  <Copy className="mr-2 h-3 w-3" />
                  Copy Message
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* AI Ambassador Scoring */}
        <Card className="p-6 border-2 border-purple-200 hover:border-purple-400 transition-colors">
          <div className="flex items-start justify-between mb-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
              <Award className="h-6 w-6 text-white" />
            </div>
            <span className="px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">AI-Powered</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Ambassador Scoring</h3>
          <p className="text-sm text-slate-600 mb-4">
            AI analyzes customer behavior to predict which ambassadors will be your top performers. Get actionable insights instantly.
          </p>
          <Button
            onClick={handleCalculateScores}
            disabled={customers.length === 0}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Rank My Ambassadors
          </Button>
          {scoredCustomers.length > 0 && (
            <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
              <p className="text-sm font-semibold text-purple-900">🏆 Top Performers:</p>
              {scoredCustomers.slice(0, 5).map((customer, index) => (
                <div key={customer.id} className="p-3 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-black text-purple-600">#{index + 1}</span>
                    <div>
                      <p className="font-semibold text-slate-900">{customer.name}</p>
                      <p className="text-xs text-slate-600">Score: {customer.aiScore}/100</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-emerald-700">${customer.total_value_generated}</p>
                    <p className="text-xs text-slate-600">{customer.referrals_made} referrals</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* AI ROI Calculator */}
        <Card className="p-6 border-2 border-pink-200 hover:border-pink-400 transition-colors">
          <div className="flex items-start justify-between mb-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-pink-600 to-rose-600 flex items-center justify-center">
              <PieChart className="h-6 w-6 text-white" />
            </div>
            <span className="px-2.5 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold">Predictive AI</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">ROI Calculator</h3>
          <p className="text-sm text-slate-600 mb-4">
            Get AI-powered 30/60/90-day revenue forecasts based on your current ambassador base and referral trends.
          </p>
          <Button
            onClick={handleCalculateROI}
            disabled={customers.length === 0}
            className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Calculate ROI Forecast
          </Button>
          {roiForecast && (
            <div className="mt-4 space-y-3">
              <div className="p-4 rounded-lg bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200">
                <p className="text-xs font-semibold text-pink-700 uppercase mb-2">30-Day Forecast</p>
                <p className="text-2xl font-black text-pink-900">${roiForecast.month30.expectedRevenue.toFixed(0)}</p>
                <p className="text-xs text-pink-700 mt-1">+{roiForecast.month30.expectedReferrals} referrals • {roiForecast.month30.roi.toFixed(0)}% ROI</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-pink-50 border border-pink-200">
                  <p className="text-xs font-semibold text-slate-500 uppercase">60-Day</p>
                  <p className="text-lg font-black text-slate-900">${roiForecast.month60.expectedRevenue.toFixed(0)}</p>
                  <p className="text-xs text-slate-600">{roiForecast.month60.roi.toFixed(0)}% ROI</p>
                </div>
                <div className="p-3 rounded-lg bg-pink-50 border border-pink-200">
                  <p className="text-xs font-semibold text-slate-500 uppercase">90-Day</p>
                  <p className="text-lg font-black text-slate-900">${roiForecast.month90.expectedRevenue.toFixed(0)}</p>
                  <p className="text-xs text-slate-600">{roiForecast.month90.roi.toFixed(0)}% ROI</p>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* AI Tools Info Banner */}
      <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-2 border-indigo-200">
        <div className="flex items-start gap-3">
          <Sparkles className="h-6 w-6 text-indigo-600 flex-shrink-0 mt-1" />
          <div>
            <p className="font-bold text-indigo-900 mb-1">Powered by Advanced AI</p>
            <p className="text-sm text-indigo-700">
              All AI tools use state-of-the-art machine learning models trained on successful referral campaigns.
              Results improve as you collect more data and engagement patterns emerge.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
