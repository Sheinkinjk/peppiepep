'use client';

/* eslint-disable react/no-unescaped-entities */
// Updated: Comprehensive demo with analytics, campaigns, and settings
import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight, X, TrendingUp, Users, DollarSign, Zap, Copy, CheckCircle2,
  BarChart3, Clock, ChevronDown, ChevronUp, Send,
  Settings as SettingsIcon, Bell, CreditCard, Building2, Mail, Phone,
  Calendar, Target, Activity, PieChart, QrCode, Plus, Bot, Sparkles, Award
} from "lucide-react";
import { StickyHeader } from "@/components/StickyHeader";
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
import QRCodeGenerator from "@/components/QRCodeGenerator";
import AIChatbotOnboarding from "@/components/AIChatbotOnboarding";
import { rankAmbassadors, type ScoredCustomer } from "@/lib/ai-scoring";
import { calculateROIForecast, type ROIForecast } from "@/lib/ai-roi-calculator";

// Enhanced demo data - PRE-LAUNCH STATE (showing realistic starting point)
const demoBusiness = {
  name: "Glow Beauty Studio",
  location: "Melbourne, VIC",
  email: "hello@glowbeauty.com.au",
  phone: "+61 3 9XXX XXXX",
  owner: "Sarah Chen",
  offer_text: "20% off your first visit",
  reward_type: "credit",
  reward_amount: 15,
  avg_transaction: 120,
  monthly_customers: 85,
  subscription_plan: "Growth",
  subscription_price: 79,
  isLive: false, // Not yet launched
};

// Sample customers to show what the interface looks like (but with 0 activity)
const demoCustomers = [
  {
    id: "1",
    name: "Sarah Mitchell",
    phone: "+61 400 123 456",
    email: "sarah@example.com",
    referral_code: "SMI789XYZ",
    credits: 0,
    status: "inactive",
    referrals_made: 0,
    total_value_generated: 0,
    joined: "2024-11-20",
    last_referral: null,
    avg_referral_value: 0,
    notes: "Imported from customer list, ready to start referring",
    tags: ["New"],
  },
  {
    id: "2",
    name: "James Chen",
    phone: "+61 400 456 789",
    email: "james@example.com",
    referral_code: "JCH456ABC",
    credits: 0,
    status: "inactive",
    referrals_made: 0,
    total_value_generated: 0,
    joined: "2024-11-20",
    last_referral: null,
    avg_referral_value: 0,
    notes: "Imported from customer list, ready to start referring",
    tags: ["New"],
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    phone: "+61 400 789 012",
    email: "emma@example.com",
    referral_code: "ERO123DEF",
    credits: 0,
    status: "inactive",
    referrals_made: 0,
    total_value_generated: 0,
    joined: "2024-11-20",
    last_referral: null,
    avg_referral_value: 0,
    notes: "Imported from customer list, ready to start referring",
    tags: ["New"],
  },
];

// Empty referrals array - no activity yet (pre-launch)
const demoReferrals: Array<{
  id: string;
  ambassador_id: string;
  referred_name: string;
  referred_email: string;
  referred_phone: string;
  status: string;
  created_at: string;
  value: number;
}> = [];

type ScheduledCampaign = {
  id: string;
  name: string;
  message: string;
  schedule: string;
  nextRun: string;
  status: "active" | "paused";
  recipients: string;
};

export default function DemoPage() {
  const [copiedCode, setCopiedCode] = useState("");
  const [activeTab, setActiveTab] = useState("analytics");
  const [simulatedReferrals, setSimulatedReferrals] = useState(demoReferrals);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [expandedCustomer, setExpandedCustomer] = useState<string | null>(null);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [campaignMessage, setCampaignMessage] = useState("Hi! I love using Glow Beauty Studio and wanted to share 20% off your first visit. Use my link to book: ");
  const [showScheduler, setShowScheduler] = useState(false);
  const [scheduledCampaigns, setScheduledCampaigns] = useState<ScheduledCampaign[]>([
    { id: "1", name: "Monthly Ambassador Reminder", message: "Keep sharing! You've earned ${{credits}} so far.", schedule: "Every 1st of month", nextRun: "Dec 1, 2024", status: "active", recipients: "All active ambassadors" },
    { id: "2", name: "New Customer Welcome", message: "Thanks for joining! Start referring friends and earn $15 per referral.", schedule: "When customer joins", nextRun: "Automated", status: "active", recipients: "New customers" },
    { id: "3", name: "Dormant Ambassador Re-engagement", message: "We miss you! Come back and we'll add a $5 bonus to your next referral.", schedule: "After 60 days inactive", nextRun: "Automated", status: "paused", recipients: "Inactive ambassadors" },
  ]);

  // Editable business settings
  const [rewardAmount, setRewardAmount] = useState(15);
  const [offerText, setOfferText] = useState("20% off your first visit");
  const [customers] = useState(demoCustomers);

  // AI features state
  const [showAIChatbot, setShowAIChatbot] = useState(false);
  const [showAIScoring, setShowAIScoring] = useState(false);
  const [showROICalculator, setShowROICalculator] = useState(false);
  const [showMessageGenerator, setShowMessageGenerator] = useState(false);
  const [generatedMessages, setGeneratedMessages] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [scoredCustomers, setScoredCustomers] = useState<ScoredCustomer[]>([]);
  const [roiForecast, setROIForecast] = useState<ROIForecast | null>(null);

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://peppiepep.vercel.app';

  const pendingReferrals = simulatedReferrals.filter((r) => r.status === "pending").length;
  const completedReferrals = simulatedReferrals.filter((r) => r.status === "completed").length;
  const totalRewards = customers.reduce((sum, c) => sum + c.credits, 0);
  const totalRevenue = simulatedReferrals
    .filter(r => r.status === "completed")
    .reduce((sum, r) => sum + r.value, 0);

  const conversionRate = simulatedReferrals.length > 0 ? ((completedReferrals / simulatedReferrals.length) * 100).toFixed(0) : "0";
  const avgReferralValue = completedReferrals > 0 ? totalRevenue / completedReferrals : 0;
  const activeAmbassadors = customers.filter(c => c.referrals_made > 0).length;
  const roi = totalRevenue > 0 ? ((totalRevenue / demoBusiness.subscription_price) * 100 - 100).toFixed(0) : "0";

  // Analytics calculations
  const last30DaysReferrals = simulatedReferrals.filter(r => {
    const date = new Date(r.created_at);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return date > thirtyDaysAgo;
  }).length;

  const copyToClipboard = (text: string, code: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  const simulateMarkComplete = (referralId: string) => {
    setSimulatedReferrals(prev =>
      prev.map(r => r.id === referralId ? { ...r, status: "completed" as const } : r)
    );
    setShowSuccessAnimation(true);
    setTimeout(() => setShowSuccessAnimation(false), 3000);
  };

  const topAmbassadors = demoCustomers
    .filter(c => c.referrals_made > 0)
    .sort((a, b) => b.total_value_generated - a.total_value_generated)
    .slice(0, 5);

  // AI Functions
  const handleGenerateMessages = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: demoBusiness.name,
          businessType: 'beauty salon',
          offerText,
          tone: 'friendly and casual',
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      if (!data.messages || data.messages.length === 0) {
        throw new Error('No messages generated');
      }

      setGeneratedMessages(data.messages);
      setShowMessageGenerator(true);
    } catch (error) {
      console.error('Error generating messages:', error);
      // Fallback to template messages with user notification
      setGeneratedMessages([
        `Hey! I just hooked you up with ${offerText} at ${demoBusiness.name}. You'll love it! 🌟`,
        `Legend! I got you ${offerText} at ${demoBusiness.name}. Trust me on this one! 💯`,
        `You've gotta try ${demoBusiness.name}! I'm sending you ${offerText}. Use my link! ✨`,
        `Friend! ${demoBusiness.name} is amazing. Enjoy ${offerText} on me! 😊`,
        `${demoBusiness.name} is the best! Grabbed you ${offerText}. Don't miss out! 🎁`,
      ]);
      setShowMessageGenerator(true);
      // Note: In production, you might want to show a toast notification here
      // that AI generation failed and fallback templates are being used
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCalculateScores = () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const scored = rankAmbassadors(customers as any, demoBusiness.avg_transaction);

      if (!scored || scored.length === 0) {
        throw new Error('No customer data available for scoring');
      }

      setScoredCustomers(scored);
      setShowAIScoring(true);
    } catch (error) {
      console.error('Error calculating AI scores:', error);
      // In production, show error toast notification
      alert('Unable to calculate AI scores. Please try again.');
    }
  };

  const handleCalculateROI = () => {
    try {
      if (customers.length === 0) {
        throw new Error('No customer data available');
      }

      if (!rewardAmount || rewardAmount <= 0) {
        throw new Error('Invalid reward amount');
      }

      const forecast = calculateROIForecast({
        totalAmbassadors: customers.length,
        avgTransactionValue: demoBusiness.avg_transaction,
        rewardAmount,
        monthlyCustomers: demoBusiness.monthly_customers,
        industryType: 'beauty',
      });

      if (!forecast) {
        throw new Error('Failed to calculate ROI forecast');
      }

      setROIForecast(forecast);
      setShowROICalculator(true);
    } catch (error) {
      console.error('Error calculating ROI:', error);
      // In production, show error toast notification
      alert('Unable to calculate ROI forecast. Please check your inputs and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 relative overflow-hidden">
      {/* Premium background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,58,237,0.05),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(236,72,153,0.05),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,transparent,black)] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23e2e8f0\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

      <StickyHeader />

      {/* Premium Demo Banner */}
      <div className="sticky top-[88px] z-40 bg-gradient-to-r from-purple-700 via-purple-600 to-pink-600 text-white px-4 py-3 shadow-xl backdrop-blur-lg border-b border-white/10">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-300 animate-pulse" />
              <p className="font-bold">LIVE DEMO</p>
            </div>
            <span className="hidden sm:block text-sm opacity-90">
              Fully interactive • AI-powered • No setup required
            </span>
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
              <span className="text-xs font-semibold">AI Assistant</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard-guest"
              className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-1.5 text-sm font-semibold hover:bg-white/25 transition"
            >
              Try guest mode
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full bg-white text-purple-700 px-4 py-1.5 text-sm font-semibold hover:bg-purple-50 transition"
            >
              Start free trial
              <ArrowRight className="h-3 w-3" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-3 py-1.5 text-sm font-medium hover:bg-white/25 transition"
            >
              <X className="h-4 w-4" />
              <span className="hidden sm:inline">Exit</span>
            </Link>
          </div>
        </div>
      </div>

      {showSuccessAnimation && (
        <div className="fixed top-20 right-4 z-50 animate-slide-in-right">
          <div className="rounded-lg bg-green-600 text-white px-6 py-4 shadow-2xl flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5" />
            <div>
              <p className="font-semibold">Referral completed!</p>
              <p className="text-sm text-green-100">Ambassador rewarded ${demoBusiness.reward_amount} • SMS sent</p>
            </div>
          </div>
        </div>
      )}

      {/* Campaign Modal */}
      {showCampaignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <Card className="w-full max-w-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
                  <Send className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Launch New Campaign</h2>
                  <p className="text-sm text-slate-600">Send referral invites to your ambassadors</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowCampaignModal(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Campaign Recipients</Label>
                <div className="mt-2 p-4 rounded-lg bg-purple-50 border border-purple-200">
                  <p className="text-sm text-purple-900 font-medium mb-2">
                    Sending to: {activeAmbassadors} active ambassadors
                  </p>
                  <p className="text-xs text-purple-700">
                    {customers.filter(c => c.referrals_made > 0).map(c => c.name).join(", ") || "Will populate after campaign launch"}
                  </p>
                </div>
              </div>

              <div>
                <Label htmlFor="campaignMessage">SMS Message Template</Label>
                <Textarea
                  id="campaignMessage"
                  value={campaignMessage}
                  onChange={(e) => setCampaignMessage(e.target.value)}
                  rows={4}
                  className="mt-1"
                  placeholder="Your campaign message..."
                />
                <p className="text-xs text-slate-500 mt-1">
                  We'll automatically append each ambassador's unique referral link
                </p>
              </div>

              <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">Preview (Sarah Mitchell):</h4>
                <p className="text-sm text-blue-800">
                  {campaignMessage}
                  <span className="font-medium">{siteUrl}/r/SMI789XYZ</span>
                </p>
              </div>

              <div className="rounded-lg bg-slate-50 border border-slate-200 p-4">
                <h4 className="text-sm font-semibold text-slate-700 mb-2">Campaign Stats:</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-slate-500">Recipients</p>
                    <p className="text-lg font-bold text-slate-900">{activeAmbassadors}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Est. Cost</p>
                    <p className="text-lg font-bold text-slate-900">${(activeAmbassadors * 0.05).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Est. Reach</p>
                    <p className="text-lg font-bold text-slate-900">{activeAmbassadors * 15}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowCampaignModal(false)}>
                  Cancel
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600" onClick={() => {
                  setShowCampaignModal(false);
                  setShowSuccessAnimation(true);
                  setTimeout(() => setShowSuccessAnimation(false), 3000);
                }}>
                  <Send className="mr-2 h-4 w-4" />
                  Send Campaign (Demo)
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Scheduled Campaigns Modal */}
      {showScheduler && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <Card className="w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-500 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Scheduled Campaigns</h2>
                  <p className="text-sm text-slate-600">Automated SMS campaigns that run on autopilot</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowScheduler(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="mb-6 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 p-4">
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-purple-900 mb-1">Automated Marketing on Autopilot</p>
                  <p className="text-sm text-purple-800">
                    Set up campaigns once and they'll automatically engage ambassadors, welcome new customers, and re-activate dormant users. Save hours every month while keeping engagement high.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">
                  <span className="font-semibold text-green-600">{scheduledCampaigns.filter(c => c.status === 'active').length} active</span> • {scheduledCampaigns.filter(c => c.status === 'paused').length} paused
                </p>
              </div>
              <Button size="sm" variant="outline" className="border-purple-300">
                <Plus className="mr-2 h-3 w-3" />
                Create New Schedule
              </Button>
            </div>

            <div className="space-y-3">
              {scheduledCampaigns.map((campaign) => (
                <div key={campaign.id} className={`border rounded-lg p-4 ${campaign.status === 'active' ? 'border-green-300 bg-green-50/30' : 'border-slate-200 bg-slate-50'}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-slate-900">{campaign.name}</h4>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${campaign.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'}`}>
                          {campaign.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{campaign.message}</p>
                      <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{campaign.schedule}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>Next: {campaign.nextRun}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{campaign.recipients}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const updated = scheduledCampaigns.map(c =>
                            c.id === campaign.id ? { ...c, status: (c.status === 'active' ? 'paused' : 'active') as 'active' | 'paused' } : c
                          );
                          setScheduledCampaigns(updated);
                        }}
                      >
                        {campaign.status === 'active' ? 'Pause' : 'Activate'}
                      </Button>
                      <Button size="sm" variant="ghost">
                        <SettingsIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-lg bg-blue-50 border border-blue-200 p-4">
              <h4 className="text-sm font-semibold text-blue-900 mb-2">💡 Scheduler Benefits:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• <strong>Save 5+ hours/month</strong> on manual outreach</li>
                <li>• <strong>Increase engagement by 40%</strong> with timely, automated reminders</li>
                <li>• <strong>Never miss an opportunity</strong> to re-engage dormant ambassadors</li>
                <li>• <strong>Personalized messages</strong> with dynamic variables like credits earned</li>
              </ul>
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1" onClick={() => setShowScheduler(false)}>
                Close
              </Button>
              <Button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600">
                <Plus className="mr-2 h-4 w-4" />
                Create New Schedule
              </Button>
            </div>
          </Card>
        </div>
      )}

      <div className="relative mx-auto max-w-7xl p-4 sm:p-8">
        {/* Premium Header Card */}
        <div className="mb-8">
          <Card className="relative overflow-hidden border-0 bg-white/80 backdrop-blur-xl shadow-2xl shadow-purple-100/50 ring-1 ring-slate-200/50">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-transparent to-pink-50/50 pointer-events-none" />
            <div className="relative p-6 sm:p-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 shadow-2xl shadow-purple-500/40 ring-4 ring-white/50 flex items-center justify-center">
                      <div className="h-6 w-6 rounded-full bg-white/30 backdrop-blur" />
                    </div>
                    <div>
                      <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-900 via-purple-900 to-pink-900 bg-clip-text text-transparent">
                        {demoBusiness.name}
                      </h1>
                      <p className="text-sm text-slate-600 font-medium mt-1">{demoBusiness.location} • {demoBusiness.subscription_plan} Plan</p>
                    </div>
                  </div>
                </div>
                {/* Premium Action Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button
                    onClick={() => setShowAIChatbot(true)}
                    className="group relative bg-white rounded-xl border-2 border-slate-200 p-4 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300 text-left"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center shadow-lg shadow-purple-200 group-hover:scale-110 transition-transform duration-300">
                        <Bot className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900 mb-0.5 flex items-center gap-1">
                          AI Assistant
                          <Sparkles className="h-3.5 w-3.5 text-purple-600" />
                        </p>
                        <p className="text-xs text-slate-600">Setup wizard</p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setShowCampaignModal(true)}
                    className="group relative bg-white rounded-xl border-2 border-slate-200 p-4 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 text-left"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform duration-300">
                        <Send className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900 mb-0.5">
                          Start Campaign
                        </p>
                        <p className="text-xs text-slate-600">SMS & Email</p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab("referrals")}
                    className="group relative bg-white rounded-xl border-2 border-slate-200 p-4 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-300 text-left"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-200 group-hover:scale-110 transition-transform duration-300">
                        <QrCode className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900 mb-0.5">
                          Referral Links
                        </p>
                        <p className="text-xs text-slate-600">QR codes</p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setShowScheduler(true)}
                    className="group relative bg-white rounded-xl border-2 border-slate-200 p-4 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-100/50 transition-all duration-300 text-left"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-200 group-hover:scale-110 transition-transform duration-300">
                        <Clock className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900 mb-0.5">
                          Scheduled
                        </p>
                        <p className="text-xs text-slate-600">{scheduledCampaigns.filter(c => c.status === 'active').length} active</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8 p-1.5 bg-white/90 backdrop-blur-xl shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/50 rounded-xl">
            <TabsTrigger value="analytics">
              <BarChart3 className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="ai-tools">
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-4 w-4" />
                <span className="hidden sm:inline">AI Tools</span>
                <span className="inline sm:hidden">AI</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="clients">
              <Users className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Clients</span>
            </TabsTrigger>
            <TabsTrigger value="referrals">
              <span className="hidden sm:inline">Referrals ({pendingReferrals})</span>
              <span className="inline sm:hidden">Refs</span>
            </TabsTrigger>
            <TabsTrigger value="rewards">
              <Zap className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Rewards</span>
            </TabsTrigger>
            <TabsTrigger value="settings">
              <SettingsIcon className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-6">
            {/* Premium Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="relative overflow-hidden p-6 bg-gradient-to-br from-purple-50 via-white to-purple-50/30 border-0 shadow-lg hover:shadow-xl transition-all duration-300 ring-1 ring-purple-200/50 group hover:scale-[1.02]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-2xl" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300">
                      <DollarSign className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xs font-bold text-purple-600 bg-purple-100 px-3 py-1.5 rounded-full ring-2 ring-purple-200/50">
                      +18%
                    </span>
                  </div>
                  <p className="text-4xl font-bold text-slate-900 mb-1">${totalRevenue.toLocaleString()}</p>
                  <p className="text-sm font-semibold text-slate-600">Total Revenue</p>
                  <p className="text-xs text-slate-500 mt-2">{completedReferrals} completed referrals</p>
                </div>
              </Card>

              <Card className="relative overflow-hidden p-6 bg-gradient-to-br from-green-50 via-white to-green-50/30 border-0 shadow-lg hover:shadow-xl transition-all duration-300 ring-1 ring-green-200/50 group hover:scale-[1.02]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-transparent rounded-full blur-2xl" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform duration-300">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xs font-bold text-green-600 bg-green-100 px-3 py-1.5 rounded-full ring-2 ring-green-200/50">
                      {roi}% ROI
                    </span>
                  </div>
                  <p className="text-4xl font-bold text-slate-900 mb-1">{activeAmbassadors}</p>
                  <p className="text-sm font-semibold text-slate-600">Active Ambassadors</p>
                  <p className="text-xs text-slate-500 mt-2">of {demoCustomers.length} total customers</p>
                </div>
              </Card>

              <Card className="relative overflow-hidden p-6 bg-gradient-to-br from-blue-50 via-white to-blue-50/30 border-0 shadow-lg hover:shadow-xl transition-all duration-300 ring-1 ring-blue-200/50 group hover:scale-[1.02]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-2xl" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xs font-bold text-blue-600 bg-blue-100 px-3 py-1.5 rounded-full ring-2 ring-blue-200/50">
                      Above avg
                    </span>
                  </div>
                  <p className="text-4xl font-bold text-slate-900 mb-1">{conversionRate}%</p>
                  <p className="text-sm font-semibold text-slate-600">Conversion Rate</p>
                  <p className="text-xs text-slate-500 mt-2">Industry: 65%</p>
                </div>
              </Card>

              <Card className="relative overflow-hidden p-6 bg-gradient-to-br from-orange-50 via-white to-orange-50/30 border-0 shadow-lg hover:shadow-xl transition-all duration-300 ring-1 ring-orange-200/50 group hover:scale-[1.02]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full blur-2xl" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform duration-300">
                      <Activity className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xs font-bold text-orange-600 bg-orange-100 px-3 py-1.5 rounded-full ring-2 ring-orange-200/50">
                      This month
                    </span>
                  </div>
                  <p className="text-4xl font-bold text-slate-900 mb-1">{last30DaysReferrals}</p>
                  <p className="text-sm font-semibold text-slate-600">New Referrals</p>
                  <p className="text-xs text-slate-500 mt-2">Last 30 days</p>
                </div>
              </Card>
            </div>

            {/* ROI Deep Dive */}
            <Card className="p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white border-0 shadow-2xl">
              <div className="flex items-start gap-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <PieChart className="h-6 w-6 text-yellow-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">Monthly Performance Breakdown</h3>
                  <p className="text-purple-200">Deep dive into your referral program ROI</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="rounded-xl bg-white/10 backdrop-blur p-4 border border-white/20">
                  <p className="text-sm text-purple-200 mb-1">Investment</p>
                  <p className="text-3xl font-bold mb-2">${demoBusiness.subscription_price}</p>
                  <p className="text-xs text-purple-300">Subscription + ${(activeAmbassadors * 0.5).toFixed(2)} SMS</p>
                </div>

                <div className="rounded-xl bg-white/10 backdrop-blur p-4 border border-white/20">
                  <p className="text-sm text-green-200 mb-1">Revenue</p>
                  <p className="text-3xl font-bold mb-2">${totalRevenue.toLocaleString()}</p>
                  <p className="text-xs text-green-300">{completedReferrals} × ${avgReferralValue.toFixed(0)} avg</p>
                </div>

                <div className="rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 p-4 border border-green-400">
                  <p className="text-sm text-green-100 mb-1">Net Profit</p>
                  <p className="text-3xl font-bold mb-2">${(totalRevenue - demoBusiness.subscription_price - totalRewards).toLocaleString()}</p>
                  <p className="text-xs text-green-100">{roi}% ROI this month</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-purple-500/20 border border-purple-400/30 p-4">
                  <p className="text-sm text-purple-200 mb-1">Cost Per Acquisition</p>
                  <p className="text-2xl font-bold">${((demoBusiness.subscription_price + totalRewards) / completedReferrals).toFixed(2)}</p>
                </div>
                <div className="rounded-lg bg-purple-500/20 border border-purple-400/30 p-4">
                  <p className="text-sm text-purple-200 mb-1">Customer Lifetime Value</p>
                  <p className="text-2xl font-bold">${(avgReferralValue * 3).toFixed(0)}</p>
                  <p className="text-xs text-purple-300 mt-1">Est. 3 visits per customer</p>
                </div>
              </div>
            </Card>

            {/* Top Performers */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Top Performing Ambassadors</h3>
              <div className="space-y-4">
                {topAmbassadors.map((ambassador, index) => (
                  <div
                    key={ambassador.id}
                    className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-slate-50 to-white border border-slate-200 hover:border-purple-300 transition-all"
                  >
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 text-white font-bold text-lg shrink-0">
                      #{index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900">{ambassador.name}</p>
                      <p className="text-sm text-slate-600">{ambassador.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-purple-600">{ambassador.referrals_made}</p>
                      <p className="text-xs text-slate-500">referrals</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">${ambassador.total_value_generated}</p>
                      <p className="text-xs text-slate-500">revenue</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-orange-600">${ambassador.credits}</p>
                      <p className="text-xs text-slate-500">earned</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="ai-tools" className="space-y-6">
            {/* AI Tools Header */}
            <div className="rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-6 w-6" />
                    <h2 className="text-2xl font-bold">AI-Powered Intelligence</h2>
                  </div>
                  <p className="text-white/90 max-w-2xl">
                    Leverage artificial intelligence to optimize your referral program, predict ROI, and identify your best ambassadors automatically.
                  </p>
                </div>
                <div className="px-4 py-2 rounded-lg bg-white/20 backdrop-blur">
                  <p className="text-xs font-semibold">Powered by GPT-4</p>
                </div>
              </div>
            </div>

            {/* AI Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Rank My Ambassadors
                </Button>
              </Card>

              {/* ROI Predictor */}
              <Card className="p-6 border-2 border-green-200 hover:border-green-400 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">Predictive</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">ROI Calculator</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Forecast your referral program revenue for the next 30, 60, and 90 days using ML-powered predictions.
                </p>
                <Button
                  onClick={handleCalculateROI}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  Calculate ROI Forecast
                </Button>
              </Card>

              {/* Message Generator */}
              <Card className="p-6 border-2 border-pink-200 hover:border-pink-400 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-pink-600 to-rose-600 flex items-center justify-center">
                    <Send className="h-6 w-6 text-white" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold">GPT-4</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Smart Message Generator</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Generate personalized referral messages that sound authentic and convert. AI learns your brand voice.
                </p>
                <Button
                  onClick={handleGenerateMessages}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700"
                >
                  <Bot className="mr-2 h-4 w-4" />
                  {isGenerating ? 'Generating...' : 'Generate Messages'}
                </Button>
              </Card>

              {/* AI Setup Assistant */}
              <Card className="p-6 border-2 border-indigo-200 hover:border-indigo-400 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">Interactive</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">AI Setup Assistant</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Chat with our AI to set up your first campaign in under 5 minutes. No technical knowledge needed.
                </p>
                <Button
                  onClick={() => setShowAIChatbot(true)}
                  className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700"
                >
                  <Bot className="mr-2 h-4 w-4" />
                  Launch AI Assistant
                </Button>
              </Card>
            </div>

            {/* AI Benefits Banner */}
            <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                Why AI-Powered?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Save Time</h4>
                  <p className="text-sm text-slate-600">AI automates tedious tasks like scoring ambassadors and writing messages, saving you hours per week.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Increase ROI</h4>
                  <p className="text-sm text-slate-600">Predictive analytics help you optimize rewards and identify high-performers before they prove themselves.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Better Results</h4>
                  <p className="text-sm text-slate-600">AI-generated messages convert 2-3x better than generic templates by sounding authentic and personal.</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="clients">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Client Directory</h3>
                  <p className="text-sm text-slate-600">
                    {activeAmbassadors} active • {demoCustomers.length - activeAmbassadors} inactive
                  </p>
                </div>
                <Button variant="outline" className="border-purple-300">
                  <Users className="mr-2 h-4 w-4" />
                  Export List
                </Button>
              </div>

              <div className="space-y-3">
                {customers.map((customer) => (
                  <div key={customer.id} className="border border-slate-200 rounded-lg overflow-hidden hover:border-purple-300 transition-colors">
                    <div
                      className="p-4 cursor-pointer bg-white hover:bg-slate-50"
                      onClick={() => setExpandedCustomer(expandedCustomer === customer.id ? null : customer.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            customer.status === 'active' ? 'bg-green-100' : 'bg-slate-100'
                          }`}>
                            <Users className={`h-5 w-5 ${
                              customer.status === 'active' ? 'text-green-600' : 'text-slate-400'
                            }`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-slate-900">{customer.name}</p>
                              {customer.tags.map(tag => (
                                <span key={tag} className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <p className="text-sm text-slate-600">{customer.email} • {customer.phone}</p>
                          </div>
                          <div className="hidden sm:flex items-center gap-6 text-center">
                            <div>
                              <p className="text-lg font-bold text-purple-600">{customer.referrals_made}</p>
                              <p className="text-xs text-slate-500">Referrals</p>
                            </div>
                            <div>
                              <p className="text-lg font-bold text-green-600">${customer.total_value_generated}</p>
                              <p className="text-xs text-slate-500">Generated</p>
                            </div>
                            <div>
                              <p className="text-lg font-bold text-orange-600">${customer.credits}</p>
                              <p className="text-xs text-slate-500">Credits</p>
                            </div>
                          </div>
                        </div>
                        {expandedCustomer === customer.id ? (
                          <ChevronUp className="h-5 w-5 text-slate-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-slate-400" />
                        )}
                      </div>
                    </div>

                    {expandedCustomer === customer.id && (
                      <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-semibold text-slate-700 mb-2">Contact Information</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-slate-400" />
                                <span className="text-slate-600">{customer.email}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-slate-400" />
                                <span className="text-slate-600">{customer.phone}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-slate-400" />
                                <span className="text-slate-600">Joined {new Date(customer.joined).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-semibold text-slate-700 mb-2">Performance Metrics</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-slate-600">Total Referrals:</span>
                                <span className="font-semibold text-slate-900">{customer.referrals_made}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-600">Avg Referral Value:</span>
                                <span className="font-semibold text-slate-900">${customer.avg_referral_value}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-600">Last Referral:</span>
                                <span className="font-semibold text-slate-900">
                                  {customer.last_referral ? new Date(customer.last_referral).toLocaleDateString() : 'None yet'}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-600">Credits Balance:</span>
                                <span className="font-semibold text-orange-600">${customer.credits}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-slate-700 mb-2">Referral Link</h4>
                          <div className="flex items-center gap-2">
                            <code className="flex-1 text-xs bg-white border border-slate-300 px-3 py-2 rounded">
                              {siteUrl}/r/{customer.referral_code}
                            </code>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyToClipboard(`${siteUrl}/r/${customer.referral_code}`, customer.referral_code)}
                            >
                              {copiedCode === customer.referral_code ? (
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <QrCode className="h-4 w-4" />
                            QR Code for In-Store Sharing
                          </h4>
                          <QRCodeGenerator
                            url={`${siteUrl}/r/${customer.referral_code}`}
                            fileName={`${customer.name.replace(/\s+/g, '-').toLowerCase()}-referral-qr`}
                          />
                        </div>

                        {customer.notes && (
                          <div>
                            <h4 className="text-sm font-semibold text-slate-700 mb-2">Notes</h4>
                            <p className="text-sm text-slate-600 bg-white border border-slate-200 rounded p-3">
                              {customer.notes}
                            </p>
                          </div>
                        )}

                        <div className="flex gap-2 pt-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Send className="mr-2 h-4 w-4" />
                            Send Link via SMS
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Mail className="mr-2 h-4 w-4" />
                            Send via Email
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="referrals">
            <Card className="p-6">
              <div className="mb-4 rounded-xl bg-purple-50 border border-purple-200 p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div className="space-y-2">
                    <div>
                      <p className="font-semibold text-purple-900">Live Supabase logging</p>
                      <p className="text-sm text-purple-800">
                        Submit the demo referral form and the entry is saved to Supabase through our secured API—exactly how the real product tracks referrals.
                      </p>
                    </div>
                    <Link
                      href="/r/demo-referral"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-purple-700 hover:text-purple-900"
                    >
                      Open the demo referral page
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mb-6 rounded-xl bg-green-50 border border-green-200 p-4">
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-green-900 mb-1">Try it: Click "Mark Complete" below</p>
                    <p className="text-sm text-green-800">
                      When you mark a referral complete, the ambassador gets <strong>${demoBusiness.reward_amount}</strong> credit instantly
                      and receives an SMS notification. Watch it happen in real-time!
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">All Referrals</h3>
                  <div className="flex gap-2">
                    <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
                      {pendingReferrals} pending
                    </span>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                      {completedReferrals} completed
                    </span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Referred Customer</TableHead>
                        <TableHead>Ambassador</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {simulatedReferrals.map((referral) => {
                        const ambassador = demoCustomers.find(
                          (c) => c.id === referral.ambassador_id,
                        );
                        const isPending = referral.status === "pending";
                        return (
                          <TableRow key={referral.id} className={isPending ? "bg-orange-50/30" : ""}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{referral.referred_name}</p>
                                <p className="text-xs text-slate-500">
                                  {referral.referred_email}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{ambassador?.name}</p>
                                <p className="text-xs text-slate-500">
                                  Earns ${demoBusiness.reward_amount} credit
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="font-bold text-green-600">${referral.value}</span>
                            </TableCell>
                            <TableCell>
                              <span
                                className={`inline-block rounded-full px-2 py-1 text-xs font-medium capitalize ${
                                  isPending
                                    ? "bg-orange-100 text-orange-700"
                                    : "bg-green-100 text-green-700"
                                }`}
                              >
                                {referral.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-sm text-slate-600">
                              {new Date(referral.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                size="sm"
                                variant={isPending ? "default" : "outline"}
                                disabled={!isPending}
                                onClick={() => simulateMarkComplete(referral.id)}
                                className={!isPending ? "opacity-50" : ""}
                              >
                                {isPending ? "Mark Complete" : "✓ Completed"}
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="rewards">
            <div className="space-y-6">
              <Card className="p-6">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Reward Program Settings</h3>
                  <p className="text-slate-600">Configure how your referral program rewards ambassadors</p>
                </div>

                <div className="rounded-xl bg-blue-50 border border-blue-200 p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Bell className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-blue-900 mb-1">How the Reward System Works</p>
                      <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                        <li>Ambassadors get unique referral links to share</li>
                        <li>When referred customers book and complete their visit, you mark the referral "complete"</li>
                        <li>Credits are automatically added to the ambassador's account</li>
                        <li>They receive an instant SMS notification of their reward</li>
                        <li>Credits can be used on their next visit or accumulated</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-semibold">New Customer Offer</Label>
                    <p className="text-sm text-slate-500 mb-2">What referred customers will see when they use a referral link</p>
                    <Input
                      value={offerText}
                      onChange={(e) => setOfferText(e.target.value)}
                      className="text-base font-medium"
                      placeholder="20% off your first visit"
                    />
                    <p className="text-xs text-slate-500 mt-2">
                      💡 Tip: Clear, valuable offers convert better (e.g., "20% off" vs "Get a discount")
                    </p>
                  </div>

                  <div>
                    <Label className="text-base font-semibold">Ambassador Reward Amount</Label>
                    <p className="text-sm text-slate-500 mb-2">How much credit ambassadors earn per successful referral</p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 flex-1">
                        <span className="text-2xl font-bold text-slate-700">$</span>
                        <Input
                          type="number"
                          value={rewardAmount}
                          onChange={(e) => setRewardAmount(Number(e.target.value))}
                          className="text-2xl font-bold text-center"
                          min="5"
                          max="100"
                        />
                        <span className="text-lg text-slate-600">AUD per referral</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                      💡 Tip: Set rewards at 10-15% of average transaction value for optimal ROI (Avg transaction: ${demoBusiness.avg_transaction})
                    </p>
                  </div>

                  <div>
                    <Label className="text-base font-semibold">Reward Type</Label>
                    <p className="text-sm text-slate-500 mb-2">How ambassadors receive their rewards</p>
                    <div className="rounded-lg border-2 border-purple-300 bg-purple-50 px-4 py-3">
                      <p className="text-lg font-bold text-purple-700 capitalize">{demoBusiness.reward_type}</p>
                      <p className="text-sm text-purple-600 mt-1">Credited to customer account automatically</p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-purple-50 border border-purple-200 p-6">
                    <h4 className="font-semibold text-purple-900 mb-3">Current Program Performance</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-purple-600">Total Credits Issued</p>
                        <p className="text-2xl font-bold text-purple-900">${totalRewards}</p>
                      </div>
                      <div>
                        <p className="text-purple-600">Avg. Cost per Referral</p>
                        <p className="text-2xl font-bold text-purple-900">${demoBusiness.reward_amount}</p>
                      </div>
                      <div>
                        <p className="text-purple-600">Revenue Generated</p>
                        <p className="text-2xl font-bold text-green-700">${totalRevenue}</p>
                      </div>
                      <div>
                        <p className="text-purple-600">Net Profit</p>
                        <p className="text-2xl font-bold text-green-700">${totalRevenue - totalRewards}</p>
                      </div>
                    </div>
                  </div>

                  <Button disabled className="w-full opacity-50 cursor-not-allowed">
                    Save Changes (Available in real account)
                  </Button>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-green-50 to-white border-green-200">
                <h3 className="text-xl font-bold text-green-900 mb-4">Why This Matters</h3>
                <div className="space-y-3 text-sm text-green-800">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                    <p><strong>Automated tracking:</strong> No more spreadsheets or manual calculations—Pepform tracks every referral automatically</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                    <p><strong>Instant gratification:</strong> Ambassadors get SMS notifications the moment they earn rewards, keeping them motivated</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                    <p><strong>Measurable ROI:</strong> See exactly what you're spending vs. what you're earning from word-of-mouth growth</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                    <p><strong>Scalable system:</strong> Works for 10 customers or 10,000—the automation handles everything</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Business Profile</h3>
                    <p className="text-sm text-slate-600">Your business information</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Business Name</Label>
                    <div className="mt-1 rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-700">
                      {demoBusiness.name}
                    </div>
                  </div>

                  <div>
                    <Label>Location</Label>
                    <div className="mt-1 rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-700">
                      {demoBusiness.location}
                    </div>
                  </div>

                  <div>
                    <Label>Owner/Contact</Label>
                    <div className="mt-1 rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-700">
                      {demoBusiness.owner}
                    </div>
                  </div>

                  <div>
                    <Label>Email</Label>
                    <div className="mt-1 rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-700">
                      {demoBusiness.email}
                    </div>
                  </div>

                  <div>
                    <Label>Phone</Label>
                    <div className="mt-1 rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-700">
                      {demoBusiness.phone}
                    </div>
                  </div>

                  <Button disabled className="w-full opacity-50 cursor-not-allowed">
                    Update Profile (Demo Mode)
                  </Button>
                </div>
              </Card>

              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Subscription</h3>
                      <p className="text-sm text-slate-600">Current plan details</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-purple-700">Current Plan</p>
                        <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded-full font-semibold">
                          ACTIVE
                        </span>
                      </div>
                      <p className="text-3xl font-bold text-purple-900 mb-1">{demoBusiness.subscription_plan}</p>
                      <p className="text-sm text-purple-600">${demoBusiness.subscription_price}/month</p>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between py-2 border-b border-slate-200">
                        <span className="text-slate-600">Unlimited ambassadors</span>
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-slate-200">
                        <span className="text-slate-600">Automatic SMS notifications</span>
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-slate-200">
                        <span className="text-slate-600">Advanced analytics</span>
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-slate-600">Priority support</span>
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button disabled variant="outline" className="flex-1 opacity-50 cursor-not-allowed">
                        Change Plan
                      </Button>
                      <Button disabled variant="outline" className="flex-1 opacity-50 cursor-not-allowed text-red-600 border-red-200">
                        Cancel Subscription
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Bell className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Notifications</h3>
                      <p className="text-sm text-slate-600">Manage your alerts</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium text-slate-900">New referrals</p>
                        <p className="text-xs text-slate-500">Get notified of pending referrals</p>
                      </div>
                      <div className="h-6 w-11 bg-purple-600 rounded-full" />
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium text-slate-900">Weekly reports</p>
                        <p className="text-xs text-slate-500">Performance summary emails</p>
                      </div>
                      <div className="h-6 w-11 bg-purple-600 rounded-full" />
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium text-slate-900">Marketing tips</p>
                        <p className="text-xs text-slate-500">Growth strategies & updates</p>
                      </div>
                      <div className="h-6 w-11 bg-slate-300 rounded-full" />
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* AI Chatbot Modal */}
      {showAIChatbot && (
        <AIChatbotOnboarding
          onComplete={(data) => {
            setShowAIChatbot(false);
            // Could update demo business settings here
            console.log('Onboarding completed:', data);
          }}
          onClose={() => setShowAIChatbot(false)}
        />
      )}

      {/* AI Scoring Modal */}
      {showAIScoring && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Award className="h-6 w-6" />
                    AI Ambassador Rankings
                  </h2>
                  <p className="text-white/90 mt-1">Powered by machine learning algorithms</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowAIScoring(false)} className="text-white hover:bg-white/20">
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {scoredCustomers.slice(0, 10).map((customer, idx) => (
                <Card key={customer.id} className="p-4 border-2 border-purple-200 hover:border-purple-400 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="flex flex-col items-center gap-1">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${
                          idx === 0 ? 'bg-yellow-400 text-yellow-900' :
                          idx === 1 ? 'bg-slate-300 text-slate-700' :
                          idx === 2 ? 'bg-orange-400 text-orange-900' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          #{idx + 1}
                        </div>
                        <span className="text-xs font-semibold text-slate-600">{customer.aiScore}/100</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900">{customer.name}</h3>
                        <p className="text-sm text-slate-600 mt-1">{customer.aiInsight}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">
                            Activity: {customer.scoreBreakdown.activity}/25
                          </span>
                          <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                            Performance: {customer.scoreBreakdown.performance}/30
                          </span>
                          <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                            Recency: {customer.scoreBreakdown.recency}/25
                          </span>
                          <span className="px-2 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">
                            Potential: {customer.scoreBreakdown.potential}/20
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      customer.recommendation === 'high-priority' ? 'bg-green-100 text-green-700' :
                      customer.recommendation === 'medium-priority' ? 'bg-blue-100 text-blue-700' :
                      customer.recommendation === 'low-priority' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {customer.recommendation.replace('-', ' ')}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* ROI Calculator Modal */}
      {showROICalculator && roiForecast && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <TrendingUp className="h-6 w-6" />
                    90-Day ROI Forecast
                  </h2>
                  <p className="text-white/90 mt-1">Predictive analytics • {roiForecast.confidence} confidence</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowROICalculator(false)} className="text-white hover:bg-white/20">
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* Forecast Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: '30 Days', data: roiForecast.month30, color: 'blue' },
                  { label: '60 Days', data: roiForecast.month60, color: 'purple' },
                  { label: '90 Days', data: roiForecast.month90, color: 'green' }
                ].map(({ label, data, color }) => (
                  <Card key={label} className={`p-4 border-2 border-${color}-200`}>
                    <h3 className="font-bold text-slate-900 mb-3">{label}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Referrals:</span>
                        <span className="font-semibold">{data.expectedReferrals}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Revenue:</span>
                        <span className="font-semibold text-green-600">${data.expectedRevenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Costs:</span>
                        <span className="font-semibold text-red-600">-${data.rewardCosts.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t">
                        <span className="text-slate-900 font-semibold">Net Profit:</span>
                        <span className="font-bold text-green-600">${data.netProfit.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-900 font-semibold">ROI:</span>
                        <span className="font-bold text-purple-600">{data.roi}%</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Insights */}
              <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-green-600" />
                  AI Insights
                </h3>
                <div className="space-y-2">
                  {roiForecast.insights.map((insight, idx) => (
                    <p key={idx} className="text-sm text-slate-700">{insight}</p>
                  ))}
                </div>
              </Card>

              {/* Break-even Timeline */}
              <Card className="p-6 border-2 border-blue-200">
                <h3 className="font-bold text-slate-900 mb-2">Break-Even Timeline</h3>
                <p className="text-3xl font-bold text-blue-600 mb-2">{roiForecast.breakEvenDays} days</p>
                <p className="text-sm text-slate-600">Your referral program will be profitable after approximately {roiForecast.breakEvenDays} days.</p>
              </Card>
            </div>
          </Card>
        </div>
      )}

      {/* Message Generator Modal */}
      {showMessageGenerator && generatedMessages.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <Card className="w-full max-w-2xl">
            <div className="bg-gradient-to-r from-pink-600 to-rose-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Send className="h-6 w-6" />
                    AI-Generated Messages
                  </h2>
                  <p className="text-white/90 mt-1">Powered by GPT-4 • Personalized for your brand</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowMessageGenerator(false)} className="text-white hover:bg-white/20">
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {generatedMessages.map((message, idx) => (
                <Card key={idx} className="p-4 border-2 border-pink-200 hover:border-pink-400 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-slate-700 flex-1">{message}</p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        navigator.clipboard.writeText(message);
                        setCopiedCode(`message-${idx}`);
                        setTimeout(() => setCopiedCode(''), 2000);
                      }}
                      className="shrink-0"
                    >
                      {copiedCode === `message-${idx}` ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </Card>
              ))}
              <div className="pt-4 border-t">
                <Button
                  onClick={handleGenerateMessages}
                  disabled={isGenerating}
                  variant="outline"
                  className="w-full"
                >
                  <Bot className="mr-2 h-4 w-4" />
                  {isGenerating ? 'Generating...' : 'Generate New Messages'}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Premium Footer */}
      <footer className="mt-16 border-t border-slate-200 pt-8 pb-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 shadow-md" />
            <div>
              <p className="text-sm font-semibold text-slate-900">Pepform</p>
              <p className="text-xs text-slate-500">Referrals that compound</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 justify-center">
            <Link className="hover:text-slate-900 transition-colors" href="/how-it-works">
              How it works
            </Link>
            <span className="text-slate-300">•</span>
            <Link className="hover:text-slate-900 transition-colors" href="/pricing">
              Pricing
            </Link>
            <span className="text-slate-300">•</span>
            <Link className="hover:text-slate-900 transition-colors" href="/contact">
              Contact
            </Link>
            <span className="text-slate-300">•</span>
            <Link className="hover:text-slate-900 transition-colors" href="/login">
              Sign in
            </Link>
          </div>
        </div>
        <p className="text-xs text-slate-400 text-center mt-4">
          © 2024 Pepform. Interactive demo for testing. All data is simulated.
        </p>
      </footer>
    </div>
  );
}
