'use client';

/* eslint-disable react/no-unescaped-entities */
// Updated: Comprehensive demo with analytics, campaigns, and settings
import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight, X, TrendingUp, Users, DollarSign, Zap, Copy, CheckCircle2,
  BarChart3, Clock, ChevronDown, ChevronUp, Send,
  Settings as SettingsIcon, Bell, CreditCard, Building2, Mail, Phone,
  Calendar, Target, Activity, PieChart, QrCode, Plus
} from "lucide-react";
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
  const [customers, setCustomers] = useState(demoCustomers);
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchProgress, setLaunchProgress] = useState(0);
  const [showTestCampaignModal, setShowTestCampaignModal] = useState(false);
  const [hasLaunched, setHasLaunched] = useState(false);

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://peppiepep.vercel.app';

  // Launch test campaign function
  const launchTestCampaign = () => {
    setIsLaunching(true);
    setLaunchProgress(0);
    setShowTestCampaignModal(true);

    // Simulate sending campaign
    const interval = setInterval(() => {
      setLaunchProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            populateDemoData();
            setIsLaunching(false);
            setShowTestCampaignModal(false);
            setHasLaunched(true);
            setShowSuccessAnimation(true);
            setTimeout(() => setShowSuccessAnimation(false), 3000);
          }, 500);
          return 100;
        }
        return prev + 20;
      });
    }, 300);
  };

  // Populate demo with realistic data
  const populateDemoData = () => {
    // Update customers with activity
    const updatedCustomers = customers.map((c, idx) => {
      if (idx === 0) return { ...c, credits: 45, status: 'active', referrals_made: 3, total_value_generated: 360, last_referral: new Date().toISOString().split('T')[0] as string | null };
      if (idx === 1) return { ...c, credits: 30, status: 'active', referrals_made: 2, total_value_generated: 240, last_referral: new Date().toISOString().split('T')[0] as string | null };
      if (idx === 2) return { ...c, credits: 15, status: 'active', referrals_made: 1, total_value_generated: 120, last_referral: new Date().toISOString().split('T')[0] as string | null };
      return c;
    });
    setCustomers(updatedCustomers as typeof demoCustomers);

    // Add referrals
    const newReferrals = [
      { id: "1", ambassador_id: "1", referred_name: "Lucy Wilson", referred_email: "lucy@example.com", referred_phone: "+61 400 111 000", status: "completed", created_at: new Date().toISOString(), value: 120 },
      { id: "2", ambassador_id: "1", referred_name: "Michael Brown", referred_email: "michael@example.com", referred_phone: "+61 400 222 000", status: "completed", created_at: new Date().toISOString(), value: 120 },
      { id: "3", ambassador_id: "2", referred_name: "Rachel Green", referred_email: "rachel@example.com", referred_phone: "+61 400 333 000", status: "pending", created_at: new Date().toISOString(), value: 120 },
      { id: "4", ambassador_id: "1", referred_name: "Tom Harris", referred_email: "tom@example.com", referred_phone: "+61 400 444 000", status: "completed", created_at: new Date().toISOString(), value: 120 },
      { id: "5", ambassador_id: "2", referred_name: "Jenny Clark", referred_email: "jenny@example.com", referred_phone: "+61 400 555 000", status: "completed", created_at: new Date().toISOString(), value: 120 },
      { id: "6", ambassador_id: "3", referred_name: "David Lee", referred_email: "david@example.com", referred_phone: "+61 400 666 000", status: "pending", created_at: new Date().toISOString(), value: 120 },
    ];
    setSimulatedReferrals(newReferrals);
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Demo Banner */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 text-white px-4 py-3 shadow-lg">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
              <p className="font-bold">LIVE DEMO</p>
            </div>
            <span className="hidden sm:block text-sm opacity-90">
              Fully interactive • All features enabled
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur px-4 py-1.5 text-sm font-medium hover:bg-white/30 transition"
            >
              Start free trial
              <ArrowRight className="h-3 w-3" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur px-4 py-1.5 text-sm font-medium hover:bg-white/30 transition"
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

      {/* Test Campaign Launch Modal */}
      {showTestCampaignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <Card className="w-full max-w-lg p-8">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-green-600 to-emerald-500 flex items-center justify-center mx-auto mb-4">
                <Send className="h-8 w-8 text-white animate-pulse" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Launching Test Campaign</h2>
              <p className="text-slate-600 mb-6">
                Sending SMS invites to {customers.length} ambassadors...
              </p>

              <div className="w-full bg-slate-200 rounded-full h-4 mb-4 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-600 to-emerald-500 h-4 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${launchProgress}%` }}
                />
              </div>

              <p className="text-sm font-semibold text-slate-700">{launchProgress}% Complete</p>

              <div className="mt-6 text-xs text-slate-500 space-y-1">
                {launchProgress >= 20 && <p>✓ SMS messages queued</p>}
                {launchProgress >= 40 && <p>✓ Ambassador links generated</p>}
                {launchProgress >= 60 && <p>✓ Campaigns sent to {customers.length} ambassadors</p>}
                {launchProgress >= 80 && <p>✓ Tracking links activated</p>}
                {launchProgress === 100 && <p className="text-green-600 font-semibold">✓ Campaign launched successfully!</p>}
              </div>
            </div>
          </Card>
        </div>
      )}

      <div className="mx-auto max-w-7xl p-4 sm:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 shadow-lg" />
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
                    {demoBusiness.name}
                  </h1>
                  <p className="text-sm text-slate-600">{demoBusiness.location} • {demoBusiness.subscription_plan} Plan</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowCampaignModal(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg"
              >
                <Send className="mr-2 h-4 w-4" />
                Start New Campaign
              </Button>
              <Button
                onClick={() => setShowScheduler(true)}
                variant="outline"
                className="border-purple-300 hover:bg-purple-50"
              >
                <Clock className="mr-2 h-4 w-4" />
                Scheduled Campaigns ({scheduledCampaigns.filter(c => c.status === 'active').length})
              </Button>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-purple-600 bg-white px-6 py-3 text-base font-semibold text-purple-600 hover:bg-purple-50 transition-colors"
              >
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="analytics">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="clients">
              <Users className="h-4 w-4 mr-2" />
              Clients
            </TabsTrigger>
            <TabsTrigger value="referrals">
              Referrals ({pendingReferrals})
            </TabsTrigger>
            <TabsTrigger value="rewards">
              <Zap className="h-4 w-4 mr-2" />
              Settings & Rewards
            </TabsTrigger>
            <TabsTrigger value="settings">
              <SettingsIcon className="h-4 w-4 mr-2" />
              Business Settings
            </TabsTrigger>
          </TabsList>

          {/* Pre-Launch Checklist Banner */}
          {!demoBusiness.isLive && (
            <Card className="mb-6 border-2 border-orange-300 bg-gradient-to-r from-orange-50 to-amber-50">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-orange-900 mb-2">
                      🚀 Pre-Launch Checklist
                    </h3>
                    <p className="text-sm text-orange-800 mb-4">
                      Complete these integrations before going live. Once done, your dashboard will populate with real data.
                    </p>

                    <div className="grid md:grid-cols-2 gap-3 mb-4">
                      <div className="bg-white rounded-lg p-3 border border-orange-200">
                        <div className="flex items-start gap-2">
                          <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-slate-900 text-sm">Twilio SMS Integration</p>
                            <p className="text-xs text-slate-600 mt-1">Required for automated referral tracking & reward notifications</p>
                            <p className="text-xs text-orange-700 mt-1 font-medium">Setup: Add Twilio credentials to .env</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-3 border border-orange-200">
                        <div className="flex items-start gap-2">
                          <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-slate-900 text-sm">Supabase Database Schema</p>
                            <p className="text-xs text-slate-600 mt-1">Tables for customers, referrals, campaigns need to be created</p>
                            <p className="text-xs text-orange-700 mt-1 font-medium">Setup: Run supabase/schema.sql migrations</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-3 border border-orange-200">
                        <div className="flex items-start gap-2">
                          <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-slate-900 text-sm">Authentication & RLS Policies</p>
                            <p className="text-xs text-slate-600 mt-1">Row-level security policies for multi-tenant data isolation</p>
                            <p className="text-xs text-orange-700 mt-1 font-medium">Setup: Configure Supabase RLS in dashboard</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-3 border border-orange-200">
                        <div className="flex items-start gap-2">
                          <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-slate-900 text-sm">Campaign Scheduler (Cron)</p>
                            <p className="text-xs text-slate-600 mt-1">Background jobs for automated campaign execution</p>
                            <p className="text-xs text-orange-700 mt-1 font-medium">Setup: Deploy cron worker to Vercel/Railway</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-3 border border-orange-200">
                        <div className="flex items-start gap-2">
                          <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-slate-900 text-sm">Customer CSV Import</p>
                            <p className="text-xs text-slate-600 mt-1">Upload your existing customer list to start inviting ambassadors</p>
                            <p className="text-xs text-orange-700 mt-1 font-medium">Setup: Use CSV upload in Clients tab</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-3 border border-orange-200">
                        <div className="flex items-start gap-2">
                          <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-slate-900 text-sm">Payment Gateway (Optional)</p>
                            <p className="text-xs text-slate-600 mt-1">Stripe integration for subscription billing</p>
                            <p className="text-xs text-orange-700 mt-1 font-medium">Setup: Connect Stripe in Business Settings</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <Button
                        onClick={launchTestCampaign}
                        disabled={hasLaunched}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Zap className="mr-2 h-4 w-4" />
                        {hasLaunched ? "Campaign Launched!" : "Launch Test Campaign (Demo)"}
                      </Button>
                      <Link href="/login">
                        <Button variant="outline" className="border-orange-300">
                          View Setup Guide
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          <TabsContent value="analytics" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-6 bg-gradient-to-br from-purple-50 to-white border-purple-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                    +18%
                  </span>
                </div>
                <p className="text-3xl font-bold text-slate-900">${totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-slate-600 mt-1">Total Revenue</p>
                <p className="text-xs text-slate-500 mt-2">{completedReferrals} completed referrals</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-green-50 to-white border-green-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    {roi}% ROI
                  </span>
                </div>
                <p className="text-3xl font-bold text-slate-900">{activeAmbassadors}</p>
                <p className="text-sm text-slate-600 mt-1">Active Ambassadors</p>
                <p className="text-xs text-slate-500 mt-2">of {demoCustomers.length} total customers</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-blue-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Target className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                    Above avg
                  </span>
                </div>
                <p className="text-3xl font-bold text-slate-900">{conversionRate}%</p>
                <p className="text-sm text-slate-600 mt-1">Conversion Rate</p>
                <p className="text-xs text-slate-500 mt-2">Industry: 65%</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-orange-50 to-white border-orange-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <Activity className="h-5 w-5 text-orange-600" />
                  </div>
                  <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                    This month
                  </span>
                </div>
                <p className="text-3xl font-bold text-slate-900">{last30DaysReferrals}</p>
                <p className="text-sm text-slate-600 mt-1">New Referrals</p>
                <p className="text-xs text-slate-500 mt-2">Last 30 days</p>
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
    </div>
  );
}
