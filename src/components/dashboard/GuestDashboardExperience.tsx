"use client";

/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import {
  X, TrendingUp, Users, DollarSign, Zap, Copy, CheckCircle2,
  BarChart3, CreditCard,
  Calendar, Target, Upload, MessageSquare, Gift, Rocket, Settings as SettingsIcon,
  Plus, ChevronRight, Crown, AlertCircle, CheckCircle, Phone, Mail,
  Sparkles, Award, Bot, Activity, PieChart
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AIChatbotOnboarding from "@/components/AIChatbotOnboarding";
import { rankAmbassadors, type ScoredCustomer } from "@/lib/ai-scoring";
import { calculateROIForecast, type ROIForecast } from "@/lib/ai-roi-calculator";
import { campaignSchedulerEnabled } from "@/lib/feature-flags";

// Types
type GuestBusiness = {
  id: string;
  name: string;
  offer_text: string;
  reward_amount: number;
  created_at: string;
};

type GuestCustomer = {
  id: string;
  name: string;
  phone: string;
  email: string;
  referral_code: string;
  credits: number;
  created_at: string;
};

type GuestReferral = {
  id: string;
  referrer_code: string;
  referred_name: string;
  referred_phone: string;
  status: string;
  created_at: string;
};

type DashboardGuestMode = "guest" | "demo";

type GuestDashboardExperienceProps = {
  mode?: DashboardGuestMode;
};

const PERSONAS = [
  {
    id: "owner",
    label: "Founder",
    description: "See the exact dashboard salon owners use to run Pepform.",
  },
  {
    id: "marketing",
    label: "Marketing lead",
    description: "Monitor ambassadors, launches, and referral health in real time.",
  },
  {
    id: "frontdesk",
    label: "Front desk",
    description: "Preview the day-to-day view for concierge teams handling rewards.",
  },
] as const;

export default function GuestDashboardExperience({ mode = "guest" }: GuestDashboardExperienceProps) {
  const router = useRouter();
  const isDemo = mode === "demo";
  const [persona, setPersona] = useState<(typeof PERSONAS)[number]["id"]>(PERSONAS[0].id);
  const personaMeta = PERSONAS.find((p) => p.id === persona) ?? PERSONAS[0];
  const [business, setBusiness] = useState<GuestBusiness | null>(null);
  const [customers, setCustomers] = useState<GuestCustomer[]>([]);
  const [referrals, setReferrals] = useState<GuestReferral[]>([]);
  const [offerText, setOfferText] = useState("");
  const [rewardAmount, setRewardAmount] = useState("");
  const [copiedCode, setCopiedCode] = useState("");
  const [isLoadingDemo, setIsLoadingDemo] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Start Campaign Modal State
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [campaignStep, setCampaignStep] = useState(1);
  const [campaignName, setCampaignName] = useState("");
  const [campaignReward, setCampaignReward] = useState("");
  const [campaignMessage, setCampaignMessage] = useState("");
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [campaignChannel, setCampaignChannel] = useState<"sms" | "email">("sms");
  const [scheduleType, setScheduleType] = useState<"now" | "later">("now");
  const [scheduleDate, setScheduleDate] = useState("");
  const [creditsNeeded, setCreditsNeeded] = useState(0);
  const [hasEnoughCredits, setHasEnoughCredits] = useState(true);
  const schedulingEnabled = campaignSchedulerEnabled;
  const effectiveScheduleType = schedulingEnabled ? scheduleType : "now";
  const effectiveScheduleDate = schedulingEnabled ? scheduleDate : "";
  const scheduleDateMissing =
    schedulingEnabled && scheduleType === "later" && !scheduleDate;

  // AI Tools State
  const [scoredCustomers, setScoredCustomers] = useState<ScoredCustomer[]>([]);
  const [roiForecast, setRoiForecast] = useState<ROIForecast | null>(null);
  const [aiMessageInput, setAiMessageInput] = useState("");
  const [aiGeneratedMessage, setAiGeneratedMessage] = useState("");
  const [isGeneratingMessage, setIsGeneratingMessage] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);

  const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://peppiepep.vercel.app";
  const displayBusinessName = business?.name || "Your Business";

  useEffect(() => {
    let cancelled = false;
    const loadDemoData = async () => {
      try {
        setIsLoadingDemo(true);
        setLoadError(null);
        const response = await fetch(`/api/demo-dashboard?persona=${persona}`);
        if (!response.ok) {
          const payload = await response.json().catch(() => ({}));
          throw new Error(payload.error || "Failed to load demo data.");
        }
        const payload = await response.json();
        if (cancelled) return;
        setBusiness(payload.business || null);
        setCustomers(payload.customers || []);
        setReferrals(payload.referrals || []);
        if (payload.business) {
          setOfferText(payload.business.offer_text ?? "");
          setRewardAmount(String(payload.business.reward_amount ?? ""));
        }
      } catch (error) {
        console.error("Demo dashboard load error:", error);
        if (!cancelled) {
          setLoadError("Unable to load demo data. Please refresh and try again.");
        }
      } finally {
        if (!cancelled) {
          setIsLoadingDemo(false);
        }
      }
    };
    loadDemoData();
    return () => {
      cancelled = true;
    };
  }, [persona]);

  const handleSetup = () => {
    alert("This guided demo is read-only. Book onboarding to configure rewards for your salon.");
  };

  const handleFileUpload = () => {
    alert("CSV uploads are disabled in the demo environment. We'll import your ambassadors for you.");
  };

  const handleQuickAdd = () => {
    alert("The live product supports instant quick-adds. Schedule a call and we'll show you on your account.");
  };


  const copyToClipboard = (text: string, code: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  const markCompleted = () => {
    alert("This read-only demo reflects real data. Book a call to activate live payouts.");
  };

  // Campaign Modal Functions
  const openCampaignModal = () => {
    setShowCampaignModal(true);
    setCampaignStep(1);
    setCampaignName("");
    setCampaignReward(rewardAmount);
    setCampaignMessage(`Hi! I wanted to share ${offerText} with you. Use my link to claim it: `);
    setSelectedCustomers([]);
    setCampaignChannel("sms");
    setScheduleType("now");
  };

  useEffect(() => {
    const count = selectedCustomers.length;
    const cost = campaignChannel === "sms" ? count * 0.05 : count * 0.02; // Example pricing
    setCreditsNeeded(cost);
    setHasEnoughCredits(cost <= 100); // Assume 100 credits available for demo
  }, [selectedCustomers, campaignChannel]);

  const nextStep = () => {
    if (campaignStep === 1 && !campaignName) {
      alert("Please enter a campaign name");
      return;
    }
    if (campaignStep === 2 && !campaignReward) {
      alert("Please set a reward amount");
      return;
    }
    if (campaignStep === 3 && selectedCustomers.length === 0) {
      alert("Please select at least one customer");
      return;
    }
    if (campaignStep === 4 && !campaignMessage) {
      alert("Please enter a message");
      return;
    }
    setCampaignStep(campaignStep + 1);
  };

  const prevStep = () => {
    setCampaignStep(campaignStep - 1);
  };

  const launchCampaign = () => {
    const deliveryTiming =
      effectiveScheduleType === "now"
        ? "immediately"
        : `on ${effectiveScheduleDate}`;
    const summary = `Campaign "${campaignName}" ready to launch!\n\nIn production, this would send ${selectedCustomers.length} ${campaignChannel === "sms" ? "SMS" : "email"} messages ${deliveryTiming}.\n\nCredits needed: $${creditsNeeded.toFixed(2)}`;

    if (isDemo) {
      alert(`${summary}\n\nThis is a guided demo experience only. Upgrade on the pricing page to send real SMS or email campaigns.`);
      setShowCampaignModal(false);
      router.push("/pricing");
      return;
    }

    alert(summary);
    setShowCampaignModal(false);
  };

  const toggleCustomerSelection = (customerId: string) => {
    setSelectedCustomers(prev =>
      prev.includes(customerId)
        ? prev.filter(id => id !== customerId)
        : [...prev, customerId]
    );
  };

  const selectAllCustomers = () => {
    setSelectedCustomers(customers.map(c => c.id));
  };

  const deselectAllCustomers = () => {
    setSelectedCustomers([]);
  };

  // AI Tools Handlers
  const handleCalculateScores = () => {
    const customerData = customers.map(c => ({
      id: c.id,
      name: c.name,
      phone: c.phone,
      email: c.email,
      referral_code: c.referral_code,
      credits: c.credits,
      status: "active" as const,
      referrals_made: referrals.filter(r => r.referrer_code === c.referral_code).length,
      total_value_generated: referrals.filter(r => r.referrer_code === c.referral_code && r.status === "completed").length * 50,
      joined: c.created_at,
      last_referral: referrals.find(r => r.referrer_code === c.referral_code)?.created_at || null,
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
      rewardAmount: business?.reward_amount || 15,
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
          businessName: business?.name || "Your Business",
          offerText: offerText,
          tone: "friendly",
          context: aiMessageInput || "general referral campaign",
        }),
      });

      if (!response.ok) throw new Error("Failed to generate message");

      const data = await response.json();
      setAiGeneratedMessage(data.message || "Hi! Share our amazing offer with your friends and earn rewards!");
    } catch (error) {
      console.error("Error generating message:", error);
      setAiGeneratedMessage(`Hi! I wanted to share ${offerText} with you. Use my referral link to claim it and I'll earn rewards! Thanks for supporting my favorite business!`);
    } finally {
      setIsGeneratingMessage(false);
    }
  };

  // Stats
  const pendingReferrals = referrals.filter(r => r.status === "pending").length;
  const completedReferrals = referrals.filter(r => r.status === "completed").length;
  const totalIssuedCredits = customers.reduce((sum, c) => sum + (c.credits ?? 0), 0);
  const referralConversionRate = referrals.length > 0 ? Math.round((completedReferrals / referrals.length) * 100) : 0;
  const simulatedCampaigns = Math.max(1, Math.round(customers.length / 5) + (referrals.length > 0 ? 1 : 0));
  const simulatedMessages = simulatedCampaigns * Math.max(10, customers.length || 10);
  const totalCreditsGiven = customers.reduce((sum, c) => sum + c.credits, 0);

  // Monthly Performance Data (mock)
  const monthlyData = [
    { month: "Nov", referrals: completedReferrals, revenue: completedReferrals * 50, ambassadors: customers.length },
    { month: "Oct", referrals: 0, revenue: 0, ambassadors: 0 },
    { month: "Sep", referrals: 0, revenue: 0, ambassadors: 0 },
  ];

  if (!business) {
    // Setup screen
    return (
      <div className="aurora relative min-h-screen overflow-hidden bg-gradient-to-b from-purple-50 via-white to-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(124,58,237,0.08),transparent_32%),radial-gradient(circle_at_90%_10%,rgba(236,72,153,0.1),transparent_35%)]" />

        <main className="relative mx-auto flex max-w-4xl flex-col gap-8 px-6 pb-20 pt-8 md:px-10">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 text-sm font-bold text-purple-700 shadow-md">
              <Rocket className="h-4 w-4" />
              Quick Start Demo
            </div>
            <h1 className="text-4xl font-black text-slate-900 sm:text-5xl">
              Launch Your Referral Program
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Set up your offer and start turning customers into micro-influencers in under 60 seconds
            </p>
          </div>

          <Card className="p-8 shadow-2xl border-2 border-purple-200/50">
            <div className="space-y-6">
              <div>
                <Label htmlFor="offer" className="text-base font-bold text-slate-900">
                  What's your offer? <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="offer"
                  value={offerText}
                  onChange={(e) => setOfferText(e.target.value)}
                  placeholder="e.g., 20% off your first visit"
                  className="mt-2 text-base"
                />
                <p className="text-sm text-slate-500 mt-1">
                  This is what referred friends will receive
                </p>
              </div>

              <div>
                <Label htmlFor="reward" className="text-base font-bold text-slate-900">
                  Reward per successful referral ($) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="reward"
                  type="number"
                  value={rewardAmount}
                  onChange={(e) => setRewardAmount(e.target.value)}
                  placeholder="e.g., 15"
                  className="mt-2 text-base"
                />
                <p className="text-sm text-slate-500 mt-1">
                  Credits your ambassadors earn when someone they refer converts
                </p>
              </div>

              <Button
                onClick={handleSetup}
                className="w-full h-14 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-xl"
              >
                Launch Dashboard
                <Rocket className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <Card className="max-w-md p-6 text-center shadow-xl">
          <p className="text-lg font-semibold text-slate-900">{loadError}</p>
          <p className="mt-2 text-sm text-slate-600">
            Please refresh the page. If the issue persists, reach out to our team and we&apos;ll reset the demo data.
          </p>
        </Card>
      </div>
    );
  }

  if (isLoadingDemo && !business) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <Card className="max-w-md p-6 text-center shadow-xl">
          <p className="text-lg font-semibold text-slate-900">Loading the live demo…</p>
          <p className="mt-2 text-sm text-slate-600">Fetching the staging dataset from Supabase.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="aurora relative min-h-screen overflow-hidden bg-gradient-to-b from-purple-50 via-white to-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(124,58,237,0.08),transparent_32%),radial-gradient(circle_at_90%_10%,rgba(236,72,153,0.1),transparent_35%)]" />

      <main className="relative mx-auto flex max-w-7xl flex-col gap-8 px-6 pb-20 pt-8 md:px-10 lg:px-16">

        {/* Premium Hero Banner */}
        <div className="rounded-[32px] border border-white/10 bg-[#050a1f] text-white p-8 sm:p-10 shadow-[0_35px_120px_rgba(15,23,42,0.45)]">
          <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1.05fr),minmax(0,0.95fr)]">
            <div>
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-white/60 mb-4">
                <Crown className="h-5 w-5 text-amber-300" />
                <span>Live dashboard</span>
                <span className="hidden sm:inline-flex items-center gap-1 text-white/40">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Demo synced
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
                {displayBusinessName}
              </h1>
              <p className="text-base sm:text-lg text-white/80 max-w-2xl">
                Mirror the production referral control room—preview hero metrics, campaign telemetry, and ambassador payouts without touching live data.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {PERSONAS.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setPersona(option.id)}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                      persona === option.id
                        ? "bg-white text-slate-900 shadow"
                        : "bg-white/10 text-white/80 hover:bg-white/20"
                    }`}
                    type="button"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-sm text-white/70 max-w-2xl">
                {personaMeta.description}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">
                    Ambassadors
                  </p>
                  <p className="text-3xl font-black text-white">{customers.length}</p>
                  <p className="text-xs text-white/60">Active profiles imported</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">
                    Campaigns run
                  </p>
                  <p className="text-3xl font-black text-white">{simulatedCampaigns}</p>
                  <p className="text-xs text-white/60">{simulatedMessages} demo messages delivered</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">
                    Credits issued
                  </p>
                  <p className="text-3xl font-black text-white">${totalIssuedCredits}</p>
                  <p className="text-xs text-white/60">{pendingReferrals} pending payouts</p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/15 bg-white/5 p-6 shadow-[0_25px_45px_rgba(15,23,42,0.35)] backdrop-blur">
              <div className="flex items-center justify-between mb-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                  Live telemetry
                </p>
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-400/20 text-emerald-100">
                  {isDemo ? "Guided demo" : "Synced"}
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-white/50">
                    Completed referrals
                  </p>
                  <p className="text-3xl font-black text-white">{completedReferrals}</p>
                  <p className="text-xs text-emerald-200">{pendingReferrals} awaiting confirmation</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-white/50">
                    Conversion rate
                  </p>
                  <p className="text-3xl font-black text-white">
                    {referralConversionRate}%
                  </p>
                  <p className="text-xs text-emerald-200">
                    ${(completedReferrals * 50).toFixed(0)} sample revenue
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-white/50">
                    Rewards pending
                  </p>
                  <p className="text-3xl font-black text-white">{pendingReferrals}</p>
                  <p className="text-xs text-white/60">Ambassadors awaiting payout</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-white/50">
                    Demo ROI
                  </p>
                  <p className="text-3xl font-black text-white">
                    {referralConversionRate > 0 ? `${(1 + referralConversionRate / 120).toFixed(1)}×` : "Building"}
                  </p>
                  <p className="text-xs text-white/60">Illustrative efficiency</p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">
                    Next action
                  </p>
                  <p className="text-sm font-semibold text-white">
                    {pendingReferrals > 0
                      ? `${pendingReferrals} demo rewards ready to approve`
                      : "Launch a campaign to trigger new activity"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/60">Sandbox sync</p>
                  <p className="text-sm font-semibold text-white">
                    {new Date().toLocaleTimeString([], { hour: "numeric", minute: "numeric" })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isDemo && (
          <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-4 text-amber-900 flex items-start gap-3 shadow-sm mb-6">
            <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
            <div>
              <p className="font-bold text-amber-900">Demo mode – live sending disabled</p>
              <p className="text-sm text-amber-800">
                Explore every part of the dashboard here. To send real SMS or email campaigns, pick a plan on the pricing page.
              </p>
            </div>
          </div>
        )}

        {/* Action cards */}
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-slate-500 mb-3">
                <Rocket className="h-6 w-6 text-indigo-600" />
                <span>Live messaging</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">Start New Campaign</h2>
              <p className="text-sm text-slate-600">
                Open the guided composer, import ambassadors, and simulate SMS/email blasts with instant previews.
              </p>
            </div>
            <Button
              onClick={openCampaignModal}
              className="mt-6 w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold"
            >
              Start campaign
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-slate-500 mb-3">
                <Users className="h-6 w-6 text-emerald-600" />
                <span>Referral preview</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">Ambassador experience</h2>
              <p className="text-sm text-slate-600">
                Jump into the live referral microsite to see the exact landing page your ambassadors use to share links.
              </p>
            </div>
            <Button
              asChild
              className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
            >
              <Link href="/r/demo-referral">
                View demo referral
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6 bg-white/80 backdrop-blur border-2 border-purple-200/50 hover:border-purple-300 hover:shadow-xl transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">AMBASSADORS</span>
            </div>
            <p className="text-4xl font-black text-slate-900">{customers.length}</p>
            <p className="text-sm text-slate-600 mt-1">Active micro-influencers</p>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur border-2 border-blue-200/50 hover:border-blue-300 hover:shadow-xl transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">REFERRALS</span>
            </div>
            <p className="text-4xl font-black text-slate-900">{referrals.length}</p>
            <p className="text-sm text-slate-600 mt-1">{pendingReferrals} pending, {completedReferrals} completed</p>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur border-2 border-emerald-200/50 hover:border-emerald-300 hover:shadow-xl transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">REVENUE</span>
            </div>
            <p className="text-4xl font-black text-slate-900">${(completedReferrals * 50).toFixed(0)}</p>
            <p className="text-sm text-slate-600 mt-1">From referrals this month</p>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur border-2 border-amber-200/50 hover:border-amber-300 hover:shadow-xl transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center shadow-lg">
                <Gift className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">REWARDS</span>
            </div>
            <p className="text-4xl font-black text-slate-900">${totalCreditsGiven}</p>
            <p className="text-sm text-slate-600 mt-1">Credits distributed</p>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="clients" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 p-1.5 bg-white/90 backdrop-blur-xl shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/50 rounded-2xl h-auto">
            <TabsTrigger
              value="ai-tools"
              className="text-sm px-4 py-3 font-bold rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:via-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-purple-400/50 transition-all duration-200"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">AI Tools</span>
              <span className="sm:hidden">AI</span>
            </TabsTrigger>
            <TabsTrigger
              value="clients"
              className="text-sm px-4 py-3 font-bold rounded-xl data-[state=active]:bg-gradient-to-b data-[state=active]:from-purple-600 data-[state=active]:to-purple-700 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-purple-300/50 transition-all duration-200"
            >
              <Users className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Clients & Ambassadors</span>
              <span className="sm:hidden">Clients</span>
            </TabsTrigger>
            <TabsTrigger
              value="referrals"
              className="text-sm px-4 py-3 font-bold rounded-xl data-[state=active]:bg-gradient-to-b data-[state=active]:from-emerald-600 data-[state=active]:to-emerald-700 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-emerald-300/50 transition-all duration-200"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Referrals
            </TabsTrigger>
            <TabsTrigger
              value="performance"
              className="text-sm px-4 py-3 font-bold rounded-xl data-[state=active]:bg-gradient-to-b data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-300/50 transition-all duration-200"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Performance</span>
              <span className="sm:hidden">Stats</span>
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="text-sm px-4 py-3 font-bold rounded-xl data-[state=active]:bg-gradient-to-b data-[state=active]:from-amber-600 data-[state=active]:to-amber-700 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-amber-300/50 transition-all duration-200"
            >
              <SettingsIcon className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Settings & Rewards</span>
              <span className="sm:hidden">Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab: AI Tools */}
          <TabsContent value="ai-tools" className="space-y-6">
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

              {/* AI Chatbot Onboarding */}
              <Card className="p-6 border-2 border-violet-200 hover:border-violet-400 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-semibold">Interactive</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">AI Setup Assistant</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Let our AI chatbot guide you through setting up the perfect referral program tailored to your business.
                </p>
                <Button
                  onClick={() => setShowChatbot(true)}
                  className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                >
                  <Bot className="mr-2 h-4 w-4" />
                  Start AI Setup
                </Button>
                {showChatbot && (
                  <div className="mt-4">
                    <AIChatbotOnboarding onComplete={() => setShowChatbot(false)} />
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
          </TabsContent>

          {/* Tab: Clients & Ambassadors */}
          <TabsContent value="clients" className="space-y-6">
            {/* Import Section */}
            <Card className="p-8 bg-white/90 backdrop-blur border-2 border-purple-200/50 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center shadow-lg flex-shrink-0">
                  <Upload className="h-7 w-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-black text-slate-900 mb-2">
                    Concierge Import
                  </h3>
                  <p className="text-slate-600">
                    For the demo, we preloaded real salon data from Supabase. When you go live, our team imports your CSV/Excel file and verifies every ambassador.
                  </p>
                  <div className="mt-4 rounded-xl bg-purple-50 p-4 border border-purple-200 text-sm text-purple-800">
                    <p className="font-semibold mb-1">What to expect:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Secure upload during onboarding call</li>
                      <li>Automatic referral link generation</li>
                      <li>White-glove cleanup of invalid numbers/emails</li>
                    </ul>
                  </div>
                  <Button
                    onClick={handleFileUpload}
                    className="mt-4 font-bold bg-purple-600 hover:bg-purple-700"
                  >
                    Talk to us about data import
                  </Button>
                </div>
              </div>
            </Card>

            {/* Quick Add */}
            <Card className="p-6 bg-white/90 backdrop-blur border-2 border-blue-200/50 shadow-lg">
              <h4 className="text-lg font-bold text-slate-900 mb-2">Instant adds (live product)</h4>
              <p className="text-sm text-slate-600">
                In the real dashboard you can add ambassadors manually, trigger invite SMS, or capture referrals from the front desk. This demo locks editing so the data stays consistent for everyone viewing it today.
              </p>
              <Button onClick={handleQuickAdd} className="mt-4 w-full sm:w-auto font-bold" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Book onboarding to enable
              </Button>
            </Card>

            {/* All Customers Table */}
            <Card className="p-6 bg-white/90 backdrop-blur border-2 border-slate-200/50 shadow-xl">
              <h3 className="text-xl font-black text-slate-900 mb-4">
                All Customers ({customers.length})
              </h3>

              {customers.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">No customers yet. Import a CSV or add manually above.</p>
                </div>
              ) : (
                <div className="rounded-xl border-2 border-slate-200 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50">
                        <TableHead className="font-black">#</TableHead>
                        <TableHead className="font-black">Name</TableHead>
                        <TableHead className="font-black">Phone</TableHead>
                        <TableHead className="font-black">Email</TableHead>
                        <TableHead className="font-black">Referral Link</TableHead>
                        <TableHead className="text-right font-black">Credits</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customers.map((customer, index) => {
                        const link = `${siteUrl}/r/${customer.referral_code}`;
                        return (
                          <TableRow key={customer.id} className="hover:bg-purple-50/50">
                            <TableCell className="font-black text-purple-700">#{index + 1}</TableCell>
                            <TableCell className="font-semibold">{customer.name}</TableCell>
                            <TableCell className="text-slate-600">{customer.phone}</TableCell>
                            <TableCell className="text-slate-600">{customer.email || "—"}</TableCell>
                            <TableCell className="max-w-[220px]">
                              <div className="flex items-center gap-2">
                                <code className="text-xs bg-slate-100 px-2 py-1 rounded truncate flex-1">
                                  {link}
                                </code>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => copyToClipboard(link, customer.referral_code)}
                                  className="flex-shrink-0"
                                >
                                  {copiedCode === customer.referral_code ? (
                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell className="text-right font-black text-emerald-700">
                              ${customer.credits}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Tab: Referrals */}
          <TabsContent value="referrals" className="space-y-6">
            <Card className="p-6 bg-white/90 backdrop-blur border-2 border-emerald-200/50 shadow-xl">
              <h3 className="text-xl font-black text-slate-900 mb-4">
                Referral Activity ({referrals.length} total)
              </h3>

              {referrals.length === 0 ? (
                <div className="text-center py-12">
                  <TrendingUp className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">
                    No referrals yet. Launch a campaign to get started!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {referrals.map((referral) => {
                    const customer = customers.find(c => c.referral_code === referral.referrer_code);
                    return (
                      <div
                        key={referral.id}
                        className="p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-300 bg-white flex items-center justify-between"
                      >
                        <div>
                          <p className="font-bold text-slate-900">
                            {customer?.name} → {referral.referred_name}
                          </p>
                          <p className="text-sm text-slate-600">{referral.referred_phone}</p>
                          <p className="text-xs text-slate-500 mt-1">
                            {new Date(referral.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          {referral.status === "pending" ? (
                            <>
                              <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-bold text-orange-700">
                                Pending
                              </span>
                              <Button
                                size="sm"
                                onClick={markCompleted}
                                className="bg-gradient-to-r from-emerald-600 to-emerald-700 font-bold"
                              >
                                Mark Complete
                              </Button>
                            </>
                          ) : (
                            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-700 flex items-center gap-1">
                              <CheckCircle className="h-4 w-4" />
                              Completed
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Tab: Monthly Performance */}
          <TabsContent value="performance" className="space-y-6">
            <Card className="p-8 bg-white/90 backdrop-blur border-2 border-blue-200/50 shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">
                  <BarChart3 className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900">Monthly Performance Breakdown</h3>
                  <p className="text-slate-600">Track growth and revenue trends over time</p>
                </div>
              </div>

              <div className="space-y-4">
                {monthlyData.map((month) => (
                  <div key={month.month} className="p-6 rounded-xl border-2 border-slate-200 bg-white hover:border-blue-300 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-black text-slate-900">{month.month} 2024</h4>
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        {month.referrals} referrals
                      </span>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase">Revenue</p>
                        <p className="text-2xl font-black text-emerald-700">${month.revenue}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase">Ambassadors</p>
                        <p className="text-2xl font-black text-purple-700">{month.ambassadors}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase">Avg Value</p>
                        <p className="text-2xl font-black text-blue-700">
                          ${month.referrals > 0 ? (month.revenue / month.referrals).toFixed(0) : 0}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-6 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
                <div className="flex items-start gap-3">
                  <Target className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-blue-900 mb-1">Revenue Acceleration</p>
                    <p className="text-sm text-blue-700">
                      Launch campaigns monthly to maintain momentum. Consistent outreach drives compound growth.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Tab: Settings & Rewards */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="p-8 bg-white/90 backdrop-blur border-2 border-amber-200/50 shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center shadow-lg">
                  <Gift className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900">Reward Configuration</h3>
                  <p className="text-slate-600">Manage your referral offer and ambassador rewards</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="settings-offer" className="text-base font-bold text-slate-900 mb-2 block">
                    Customer Offer
                  </Label>
                  <Input
                    id="settings-offer"
                    value={offerText}
                    readOnly
                    placeholder="e.g., 20% off your first visit"
                    className="text-base bg-slate-100 cursor-not-allowed"
                  />
                  <p className="text-sm text-slate-500 mt-2">
                    What new customers receive when they use a referral link
                  </p>
                </div>

                <div>
                  <Label htmlFor="settings-reward" className="text-base font-bold text-slate-900 mb-2 block">
                    Ambassador Reward ($)
                  </Label>
                  <Input
                    id="settings-reward"
                    type="number"
                    value={rewardAmount}
                    readOnly
                    placeholder="e.g., 15"
                    className="text-base bg-slate-100 cursor-not-allowed"
                  />
                  <p className="text-sm text-slate-500 mt-2">
                    Credits ambassadors earn per successful referral
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200">
                  <div className="flex items-start gap-3">
                    <Crown className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-amber-900 mb-2">Current Setup</p>
                      <div className="space-y-1 text-sm text-amber-800">
                        <p>• Offer: <span className="font-bold">{offerText}</span></p>
                        <p>• Reward: <span className="font-bold">${business.reward_amount}</span> per referral</p>
                        <p>• Active Ambassadors: <span className="font-bold">{customers.length}</span></p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t-2 border-slate-200">
                  <h4 className="text-lg font-bold text-slate-900 mb-3">Reward Fulfillment Options</h4>
                  <div className="space-y-3">
                    <div className="p-4 rounded-lg border-2 border-purple-200 bg-purple-50">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-purple-600" />
                        <div>
                          <p className="font-bold text-purple-900">Store Credit</p>
                          <p className="text-sm text-purple-700">Applied automatically to customer accounts</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg border-2 border-slate-200 bg-white">
                      <div className="flex items-center gap-3">
                        <DollarSign className="h-5 w-5 text-emerald-600" />
                        <div>
                          <p className="font-bold text-slate-900">Cash/PayPal</p>
                          <p className="text-sm text-slate-600">Manual payout via your preferred method</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg border-2 border-slate-200 bg-white">
                      <div className="flex items-center gap-3">
                        <Gift className="h-5 w-5 text-amber-600" />
                        <div>
                          <p className="font-bold text-slate-900">Gift Cards</p>
                          <p className="text-sm text-slate-600">Third-party rewards and incentives</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Start Campaign Modal */}
        {showCampaignModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 p-6 rounded-t-3xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                    <Rocket className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white">Start New Campaign</h2>
                    <p className="text-purple-100 text-sm">Step {campaignStep} of 5</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCampaignModal(false)}
                  className="h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
                >
                  <X className="h-5 w-5 text-white" />
                </button>
              </div>

              <div className="p-8 space-y-6">
                {/* Step 1: Campaign Name */}
                {campaignStep === 1 && (
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-black text-slate-900 mb-2">Name Your Campaign</h3>
                      <p className="text-slate-600">Give this campaign a memorable name for tracking</p>
                    </div>
                    <div>
                      <Label htmlFor="campaign-name" className="text-base font-bold">Campaign Name</Label>
                      <Input
                        id="campaign-name"
                        value={campaignName}
                        onChange={(e) => setCampaignName(e.target.value)}
                        placeholder="e.g., Holiday Referral Blast 2024"
                        className="mt-2 text-lg h-14"
                      />
                    </div>
                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                      <p className="text-sm font-semibold text-blue-900">💡 Examples</p>
                      <ul className="text-sm text-blue-700 mt-2 space-y-1">
                        <li>• "Black Friday Ambassador Activation"</li>
                        <li>• "Monthly Engagement - January"</li>
                        <li>• "New Product Launch Referral Drive"</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Step 2: Reward Amount */}
                {campaignStep === 2 && (
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-black text-slate-900 mb-2">Set Reward Amount</h3>
                      <p className="text-slate-600">How much will ambassadors earn per successful referral?</p>
                    </div>
                    <div>
                      <Label htmlFor="campaign-reward" className="text-base font-bold">Reward per Referral ($)</Label>
                      <Input
                        id="campaign-reward"
                        type="number"
                        value={campaignReward}
                        onChange={(e) => setCampaignReward(e.target.value)}
                        placeholder="e.g., 15"
                        className="mt-2 text-lg h-14"
                      />
                    </div>
                    <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
                      <div className="flex items-center gap-3 mb-3">
                        <Gift className="h-6 w-6 text-purple-600" />
                        <p className="font-bold text-purple-900">Reward Economics</p>
                      </div>
                      <div className="space-y-2 text-sm text-purple-700">
                        <p>• Current setting: <span className="font-bold">${business.reward_amount}</span></p>
                        <p>• Recommended: 10-20% of average transaction value</p>
                        <p>• Higher rewards = More referral activity</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Select Recipients */}
                {campaignStep === 3 && (
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-black text-slate-900 mb-2">Select Recipients</h3>
                      <p className="text-slate-600">Choose which ambassadors to include in this campaign</p>
                    </div>

                    <div className="flex gap-2 mb-4">
                      <Button onClick={selectAllCustomers} variant="outline" size="sm">
                        Select All
                      </Button>
                      <Button onClick={deselectAllCustomers} variant="outline" size="sm">
                        Deselect All
                      </Button>
                      <div className="ml-auto text-sm font-semibold text-slate-600">
                        {selectedCustomers.length} selected
                      </div>
                    </div>

                    <div className="max-h-64 overflow-y-auto space-y-2 border-2 border-slate-200 rounded-xl p-4">
                      {customers.map((customer) => (
                        <label
                          key={customer.id}
                          className="flex items-center gap-3 p-3 rounded-lg border-2 border-slate-200 hover:border-purple-300 hover:bg-purple-50/50 cursor-pointer transition-all"
                        >
                          <input
                            type="checkbox"
                            checked={selectedCustomers.includes(customer.id)}
                            onChange={() => toggleCustomerSelection(customer.id)}
                            className="h-5 w-5 rounded border-slate-300"
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-slate-900">{customer.name}</p>
                            <p className="text-sm text-slate-600">{customer.phone}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 4: Message & Channel */}
                {campaignStep === 4 && (
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-black text-slate-900 mb-2">Craft Your Message</h3>
                      <p className="text-slate-600">Personalize the message your ambassadors will receive</p>
                    </div>

                    <div>
                      <Label className="text-base font-bold mb-2 block">Channel</Label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setCampaignChannel("sms")}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            campaignChannel === "sms"
                              ? "border-purple-600 bg-purple-50"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <Phone className={`h-6 w-6 mx-auto mb-2 ${campaignChannel === "sms" ? "text-purple-600" : "text-slate-400"}`} />
                          <p className="font-bold">SMS</p>
                          <p className="text-xs text-slate-600">$0.05/message</p>
                        </button>
                        <button
                          onClick={() => setCampaignChannel("email")}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            campaignChannel === "email"
                              ? "border-purple-600 bg-purple-50"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <Mail className={`h-6 w-6 mx-auto mb-2 ${campaignChannel === "email" ? "text-purple-600" : "text-slate-400"}`} />
                          <p className="font-bold">Email</p>
                          <p className="text-xs text-slate-600">$0.02/message</p>
                        </button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="campaign-message" className="text-base font-bold">Message</Label>
                      <Textarea
                        id="campaign-message"
                        value={campaignMessage}
                        onChange={(e) => setCampaignMessage(e.target.value)}
                        rows={5}
                        className="mt-2"
                        placeholder="Write your message here..."
                      />
                      <p className="text-sm text-slate-500 mt-2">
                        Tip: Include a clear call-to-action and make it personal
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 5: Schedule & Review */}
                {campaignStep === 5 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-black text-slate-900 mb-2">Review & Schedule</h3>
                      <p className="text-slate-600">Final check before launching your campaign</p>
                    </div>

                    <div className="p-6 rounded-xl bg-slate-50 border-2 border-slate-200 space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-500 uppercase">Campaign Name</p>
                        <p className="text-lg font-bold text-slate-900">{campaignName}</p>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-semibold text-slate-500 uppercase">Recipients</p>
                          <p className="text-lg font-bold text-slate-900">{selectedCustomers.length} customers</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-500 uppercase">Channel</p>
                          <p className="text-lg font-bold text-slate-900">{campaignChannel.toUpperCase()}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-500 uppercase mb-2">Message Preview</p>
                        <div className="p-4 rounded-lg bg-white border border-slate-200">
                          <p className="text-sm text-slate-700">{campaignMessage}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-bold mb-3 block">When to Send</Label>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <button
                          onClick={() => setScheduleType("now")}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            effectiveScheduleType === "now"
                              ? "border-emerald-600 bg-emerald-50"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <Zap className={`h-6 w-6 mx-auto mb-2 ${effectiveScheduleType === "now" ? "text-emerald-600" : "text-slate-400"}`} />
                          <p className="font-bold">Send Now</p>
                        </button>
                        <button
                          onClick={() => schedulingEnabled && setScheduleType("later")}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            schedulingEnabled && scheduleType === "later"
                              ? "border-emerald-600 bg-emerald-50"
                              : "border-slate-200 hover:border-slate-300"
                          } ${!schedulingEnabled ? "opacity-60 cursor-not-allowed" : ""}`}
                          disabled={!schedulingEnabled}
                        >
                          <Calendar className={`h-6 w-6 mx-auto mb-2 ${effectiveScheduleType === "later" ? "text-emerald-600" : "text-slate-400"}`} />
                          <p className="font-bold">
                            Schedule
                            {!schedulingEnabled && (
                              <span className="block text-[10px] uppercase tracking-wide text-slate-500">
                                Coming soon
                              </span>
                            )}
                          </p>
                        </button>
                      </div>
                      {effectiveScheduleType === "later" && schedulingEnabled && (
                        <Input
                          type="datetime-local"
                          value={scheduleDate}
                          onChange={(e) => setScheduleDate(e.target.value)}
                          className="mt-2"
                        />
                      )}
                      {scheduleDateMissing && (
                        <p className="text-xs text-amber-600 mt-2">
                          Pick a future date and time to finish scheduling this campaign.
                        </p>
                      )}
                      {!schedulingEnabled && (
                        <p className="text-xs text-slate-500 mt-2">
                          Scheduled sending is coming soon. Campaigns send immediately in the live product today.
                        </p>
                      )}
                    </div>

                    <div className={`p-6 rounded-xl border-2 ${hasEnoughCredits ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
                      <div className="flex items-start gap-3">
                        {hasEnoughCredits ? (
                          <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                        ) : (
                          <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                        )}
                        <div className="flex-1">
                          <p className={`font-bold mb-1 ${hasEnoughCredits ? "text-green-900" : "text-red-900"}`}>
                            {hasEnoughCredits ? "Ready to Launch" : "Additional Credits Needed"}
                          </p>
                          <p className={`text-sm ${hasEnoughCredits ? "text-green-700" : "text-red-700"}`}>
                            This campaign will cost ${creditsNeeded.toFixed(2)} in {campaignChannel.toUpperCase()} credits.
                            {!hasEnoughCredits && " Please add more credits before launching."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Modal Footer - Navigation */}
                <div className="flex items-center justify-between pt-6 border-t-2 border-slate-200">
                  {campaignStep > 1 ? (
                    <Button onClick={prevStep} variant="outline" className="font-bold">
                      Back
                    </Button>
                  ) : (
                    <div />
                  )}

                  {campaignStep < 5 ? (
                    <Button onClick={nextStep} className="bg-gradient-to-r from-purple-600 to-pink-600 font-bold">
                      Next Step
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={launchCampaign}
                      disabled={!hasEnoughCredits}
                      className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Rocket className="mr-2 h-5 w-5" />
                      Launch Campaign
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
