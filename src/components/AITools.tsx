"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Sparkles, MessageSquare, Award, Activity, Copy
} from "lucide-react";
import { rankAmbassadors, type ScoredCustomer } from "@/lib/ai-scoring";
import { DashboardROICalculator } from "@/components/DashboardROICalculator";

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
};

export function AITools({ customers, referrals, businessName, offerText }: AIToolsProps) {
  const [scoredCustomers, setScoredCustomers] = useState<ScoredCustomer[]>([]);
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
      // API returns array of messages, pick the first one
      const message = data.messages && data.messages.length > 0
        ? data.messages[0]
        : data.message || "Hi! Share our amazing offer with your friends and earn rewards!";
      setAiGeneratedMessage(message);
    } catch (error) {
      console.error("Error generating message:", error);
      setAiGeneratedMessage(`Hi! I wanted to share ${offerText || "an amazing offer"} with you. Use my referral link to claim it and I'll earn rewards! Thanks for supporting my favorite business!`);
    } finally {
      setIsGeneratingMessage(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Growth Tools Header */}
      <div className="rounded-xl bg-gradient-to-r from-cyan-700 via-teal-700 to-cyan-600 p-8 text-white">
        <div className="flex items-start gap-4 mb-4">
          <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center flex-shrink-0">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-black mb-2">Growth Intelligence Tools</h2>
            <p className="text-cyan-100 text-lg">
              Use practical scoring and message workflows to optimize your referral program and improve performance.
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Message Generator */}
        <Card className="p-6 border-2 border-cyan-200 hover:border-cyan-400 transition-colors">
          <div className="flex items-start justify-between mb-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-700 to-teal-700 flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <span className="px-2.5 py-1 rounded-full bg-cyan-100 text-cyan-700 text-xs font-semibold">Premium templates</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Generate Smart Messages</h3>
          <p className="text-sm text-slate-600 mb-4">
            Create personalized, high-converting referral messages using proven referral campaign patterns.
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
              className="w-full bg-gradient-to-r from-cyan-700 to-teal-700 hover:from-cyan-800 hover:to-teal-800"
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
              <div className="p-4 rounded-lg bg-cyan-50 border border-cyan-200">
                <p className="text-sm font-semibold text-cyan-900 mb-2">Generated draft:</p>
                <p className="text-sm text-cyan-800">{aiGeneratedMessage}</p>
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

        {/* Ambassador Scoring */}
        <Card className="p-6 border-2 border-teal-200 hover:border-teal-400 transition-colors">
          <div className="flex items-start justify-between mb-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-teal-700 to-cyan-700 flex items-center justify-center">
              <Award className="h-6 w-6 text-white" />
            </div>
            <span className="px-2.5 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-semibold">Data-driven</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Ambassador Scoring</h3>
          <p className="text-sm text-slate-600 mb-4">
            This model analyzes partner behavior to predict which ambassadors will be your top performers. Get actionable insights instantly.
          </p>
          <Button
            onClick={handleCalculateScores}
            disabled={customers.length === 0}
            className="w-full bg-gradient-to-r from-teal-700 to-cyan-700 hover:from-teal-800 hover:to-cyan-800"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Rank My Ambassadors
          </Button>
          {scoredCustomers.length > 0 && (
            <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
              <p className="text-sm font-semibold text-teal-900">Top Performers:</p>
              {scoredCustomers.slice(0, 5).map((customer, index) => (
                <div key={customer.id} className="p-3 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-black text-teal-700">#{index + 1}</span>
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

        {/* ROI Calculator */}
        <DashboardROICalculator initialAmbassadors={customers.length || 10} />
      </div>

      {/* Tools Info Banner */}
      <div className="p-6 rounded-xl bg-gradient-to-br from-cyan-50 via-teal-50 to-cyan-50 border-2 border-cyan-200">
        <div className="flex items-start gap-3">
          <Sparkles className="h-6 w-6 text-cyan-700 flex-shrink-0 mt-1" />
          <div>
            <p className="font-bold text-cyan-900 mb-1">Built on referral performance patterns</p>
            <p className="text-sm text-cyan-700">
              These tools use proven scoring frameworks from successful referral programs.
              Results improve as you collect more data and engagement patterns emerge.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
