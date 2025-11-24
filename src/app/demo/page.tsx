'use client';

/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, X, TrendingUp, Users, DollarSign, Zap, Copy, CheckCircle2, MessageSquare, BarChart3, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Enhanced demo data with more realistic metrics
const demoBusiness = {
  name: "Glow Beauty Studio",
  location: "Melbourne, VIC",
  offer_text: "20% off your first visit",
  reward_type: "credit",
  reward_amount: 15,
  avg_transaction: 120,
  monthly_customers: 85,
};

const demoCustomers = [
  {
    id: "1",
    name: "Sarah Mitchell",
    phone: "+61 400 123 456",
    email: "sarah@example.com",
    referral_code: "SMI789XYZ",
    credits: 45,
    status: "active",
    referrals_made: 3,
    total_value_generated: 360,
    joined: "2024-09-15",
  },
  {
    id: "2",
    name: "James Chen",
    phone: "+61 400 456 789",
    email: "james@example.com",
    referral_code: "JCH456ABC",
    credits: 30,
    status: "active",
    referrals_made: 2,
    total_value_generated: 240,
    joined: "2024-10-02",
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    phone: "+61 400 789 012",
    email: "emma@example.com",
    referral_code: "ERO123DEF",
    credits: 60,
    status: "active",
    referrals_made: 4,
    total_value_generated: 480,
    joined: "2024-08-20",
  },
  {
    id: "4",
    name: "Oliver Thompson",
    phone: "+61 400 234 567",
    email: "oliver@example.com",
    referral_code: "OTH567GHI",
    credits: 15,
    status: "active",
    referrals_made: 1,
    total_value_generated: 120,
    joined: "2024-11-01",
  },
  {
    id: "5",
    name: "Sophie Anderson",
    phone: "+61 400 567 890",
    email: "sophie@example.com",
    referral_code: "SAN890JKL",
    credits: 0,
    status: "active",
    referrals_made: 0,
    total_value_generated: 0,
    joined: "2024-11-18",
  },
  {
    id: "6",
    name: "Marcus Johnson",
    phone: "+61 400 111 222",
    email: "marcus@example.com",
    referral_code: "MJO111AAA",
    credits: 75,
    status: "active",
    referrals_made: 5,
    total_value_generated: 600,
    joined: "2024-07-10",
  },
  {
    id: "7",
    name: "Isabella Martinez",
    phone: "+61 400 333 444",
    email: "isabella@example.com",
    referral_code: "IMA333BBB",
    credits: 30,
    status: "active",
    referrals_made: 2,
    total_value_generated: 240,
    joined: "2024-09-28",
  },
  {
    id: "8",
    name: "Liam O'Brien",
    phone: "+61 400 555 666",
    email: "liam@example.com",
    referral_code: "LOB555CCC",
    credits: 45,
    status: "active",
    referrals_made: 3,
    total_value_generated: 360,
    joined: "2024-08-05",
  },
];

const demoReferrals = [
  {
    id: "1",
    ambassador_id: "1",
    referred_name: "Lucy Wilson",
    referred_email: "lucy@example.com",
    referred_phone: "+61 400 111 000",
    status: "completed",
    created_at: "2024-11-15T10:30:00Z",
    value: 120,
  },
  {
    id: "2",
    ambassador_id: "1",
    referred_name: "Michael Brown",
    referred_email: "michael@example.com",
    referred_phone: "+61 400 222 000",
    status: "completed",
    created_at: "2024-11-10T14:20:00Z",
    value: 120,
  },
  {
    id: "3",
    ambassador_id: "2",
    referred_name: "Rachel Green",
    referred_email: "rachel@example.com",
    referred_phone: "+61 400 333 000",
    status: "pending",
    created_at: "2024-11-18T09:15:00Z",
    value: 120,
  },
  {
    id: "4",
    ambassador_id: "3",
    referred_name: "Tom Harris",
    referred_email: "tom@example.com",
    referred_phone: "+61 400 444 000",
    status: "completed",
    created_at: "2024-11-12T16:45:00Z",
    value: 120,
  },
  {
    id: "5",
    ambassador_id: "1",
    referred_name: "Jenny Clark",
    referred_email: "jenny@example.com",
    referred_phone: "+61 400 555 000",
    status: "completed",
    created_at: "2024-11-08T11:30:00Z",
    value: 120,
  },
  {
    id: "6",
    ambassador_id: "2",
    referred_name: "David Lee",
    referred_email: "david@example.com",
    referred_phone: "+61 400 666 000",
    status: "completed",
    created_at: "2024-11-14T13:20:00Z",
    value: 120,
  },
  {
    id: "7",
    ambassador_id: "3",
    referred_name: "Anna White",
    referred_email: "anna@example.com",
    referred_phone: "+61 400 777 000",
    status: "pending",
    created_at: "2024-11-19T08:10:00Z",
    value: 120,
  },
  {
    id: "8",
    ambassador_id: "4",
    referred_name: "Chris Martin",
    referred_email: "chris@example.com",
    referred_phone: "+61 400 888 000",
    status: "completed",
    created_at: "2024-11-16T15:50:00Z",
    value: 120,
  },
  {
    id: "9",
    ambassador_id: "6",
    referred_name: "Nina Patel",
    referred_email: "nina@example.com",
    referred_phone: "+61 400 999 000",
    status: "completed",
    created_at: "2024-11-05T12:00:00Z",
    value: 145,
  },
  {
    id: "10",
    ambassador_id: "6",
    referred_name: "Alex Turner",
    referred_email: "alex@example.com",
    referred_phone: "+61 400 101 000",
    status: "completed",
    created_at: "2024-11-03T10:30:00Z",
    value: 135,
  },
  {
    id: "11",
    ambassador_id: "3",
    referred_name: "Kate Morrison",
    referred_email: "kate@example.com",
    referred_phone: "+61 400 102 000",
    status: "completed",
    created_at: "2024-10-28T14:15:00Z",
    value: 120,
  },
  {
    id: "12",
    ambassador_id: "8",
    referred_name: "Ryan Foster",
    referred_email: "ryan@example.com",
    referred_phone: "+61 400 103 000",
    status: "completed",
    created_at: "2024-11-07T09:45:00Z",
    value: 120,
  },
];

export default function DemoPage() {
  const [copiedCode, setCopiedCode] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [simulatedReferrals, setSimulatedReferrals] = useState(demoReferrals);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://peppiepep.vercel.app';

  const pendingReferrals = simulatedReferrals.filter((r) => r.status === "pending").length;
  const completedReferrals = simulatedReferrals.filter((r) => r.status === "completed").length;
  const totalRewards = demoCustomers.reduce((sum, c) => sum + c.credits, 0);
  const totalRevenue = simulatedReferrals
    .filter(r => r.status === "completed")
    .reduce((sum, r) => sum + r.value, 0);

  const conversionRate = ((completedReferrals / simulatedReferrals.length) * 100).toFixed(0);
  const avgReferralValue = totalRevenue / completedReferrals || 0;

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
    .slice(0, 3);

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
              Click around • Everything works • No signup needed
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
              <p className="text-sm text-green-100">Ambassador rewarded $15 • SMS sent</p>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl p-4 sm:p-8">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 shadow-lg" />
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
                    {demoBusiness.name}
                  </h1>
                  <p className="text-sm text-slate-600">{demoBusiness.location}</p>
                </div>
              </div>
            </div>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-base font-semibold text-white shadow-xl hover:-translate-y-1 transition-all hover:shadow-2xl"
            >
              Start Your Free Trial
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Key Metrics Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-white border-purple-200">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                +18% vs last month
              </span>
            </div>
            <p className="text-3xl font-bold text-slate-900">${totalRevenue.toLocaleString()}</p>
            <p className="text-sm text-slate-600 mt-1">Total Referral Revenue</p>
            <p className="text-xs text-slate-500 mt-2">From {completedReferrals} completed referrals</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-50 to-white border-green-200">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                {demoCustomers.length} total
              </span>
            </div>
            <p className="text-3xl font-bold text-slate-900">{topAmbassadors.length}</p>
            <p className="text-sm text-slate-600 mt-1">Active Ambassadors</p>
            <p className="text-xs text-slate-500 mt-2">Making regular referrals</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-orange-50 to-white border-orange-200">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-orange-600" />
              </div>
              <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                ${avgReferralValue.toFixed(0)} avg
              </span>
            </div>
            <p className="text-3xl font-bold text-slate-900">${totalRewards}</p>
            <p className="text-sm text-slate-600 mt-1">Credits Issued</p>
            <p className="text-xs text-slate-500 mt-2">Rewarding loyal ambassadors</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-blue-200">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                Industry: 65%
              </span>
            </div>
            <p className="text-3xl font-bold text-slate-900">{conversionRate}%</p>
            <p className="text-sm text-slate-600 mt-1">Conversion Rate</p>
            <p className="text-xs text-slate-500 mt-2">Above industry average</p>
          </Card>
        </div>

        {/* ROI Calculator Section */}
        <Card className="p-6 sm:p-8 mb-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white border-0 shadow-2xl">
          <div className="flex items-start gap-4 mb-6">
            <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <Zap className="h-6 w-6 text-yellow-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">This Month's Performance</h3>
              <p className="text-purple-200">Real-time ROI tracking across all referral activities</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl bg-white/10 backdrop-blur p-4 border border-white/20">
              <p className="text-sm text-purple-200 mb-1">Monthly Investment</p>
              <p className="text-3xl font-bold mb-2">$79</p>
              <p className="text-xs text-purple-300">Growth plan subscription</p>
            </div>

            <div className="rounded-xl bg-white/10 backdrop-blur p-4 border border-white/20">
              <p className="text-sm text-green-200 mb-1">Revenue Generated</p>
              <p className="text-3xl font-bold mb-2">${totalRevenue.toLocaleString()}</p>
              <p className="text-xs text-green-300">From {completedReferrals} referrals</p>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 p-4 border border-green-400">
              <p className="text-sm text-green-100 mb-1">Return on Investment</p>
              <p className="text-3xl font-bold mb-2">{((totalRevenue / 79) * 100 - 100).toFixed(0)}%</p>
              <p className="text-xs text-green-100">Pure profit increase</p>
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-purple-500/20 border border-purple-400/30 p-4">
            <div className="flex items-start gap-3">
              <Star className="h-5 w-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold mb-1">Why this matters</p>
                <p className="text-sm text-purple-100">
                  Every $1 spent on Pepform generates <strong>${(totalRevenue / 79).toFixed(2)}</strong> in new revenue.
                  That's a <strong>{((totalRevenue / 79) * 100 - 100).toFixed(0)}% ROI</strong> this month alone—and it compounds as your ambassador network grows.
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="clients">Ambassadors</TabsTrigger>
            <TabsTrigger value="referrals">
              Referrals ({pendingReferrals})
            </TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Top Performers */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Top Ambassadors</h3>
                  <p className="text-sm text-slate-600">Your highest-performing referrers this month</p>
                </div>
                <div className="rounded-full bg-purple-100 px-4 py-2">
                  <p className="text-sm font-semibold text-purple-700">
                    ${topAmbassadors.reduce((sum, a) => sum + a.total_value_generated, 0).toLocaleString()} total value
                  </p>
                </div>
              </div>

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

            {/* Recent Activity */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="h-5 w-5 text-slate-600" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Recent Activity</h3>
                  <p className="text-sm text-slate-600">Latest referrals and completions</p>
                </div>
              </div>

              <div className="space-y-3">
                {simulatedReferrals.slice(0, 5).map((referral) => {
                  const ambassador = demoCustomers.find(c => c.id === referral.ambassador_id);
                  const timeAgo = Math.floor((Date.now() - new Date(referral.created_at).getTime()) / (1000 * 60 * 60 * 24));

                  return (
                    <div key={referral.id} className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
                        referral.status === 'completed' ? 'bg-green-100' : 'bg-orange-100'
                      }`}>
                        {referral.status === 'completed' ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        ) : (
                          <Clock className="h-5 w-5 text-orange-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900">
                          <span className="font-semibold">{ambassador?.name}</span> referred <span className="font-semibold">{referral.referred_name}</span>
                        </p>
                        <p className="text-xs text-slate-500">{timeAgo} days ago</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-slate-900">${referral.value}</p>
                        <p className="text-xs text-slate-500">{referral.status}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Value Proposition CTA */}
            <Card className="p-8 bg-gradient-to-r from-purple-600 to-pink-600 border-0 text-white">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">See what Pepform can do for your business</h2>
                <p className="text-lg mb-6 text-purple-100">
                  {demoBusiness.name} generated <strong>${totalRevenue.toLocaleString()}</strong> in referral revenue this month.
                  That's <strong>${(totalRevenue - 79).toLocaleString()} profit</strong> from word-of-mouth growth that runs on autopilot.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-purple-600 shadow-xl hover:-translate-y-1 transition-all hover:shadow-2xl"
                  >
                    Start Your Free Trial
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur px-8 py-4 text-lg font-semibold text-white hover:bg-white/20 transition-all"
                  >
                    View Pricing
                  </Link>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="clients">
            <Card className="p-6">
              <div className="mb-6 rounded-xl bg-purple-50 border border-purple-200 p-4">
                <div className="flex items-start gap-3">
                  <MessageSquare className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-purple-900 mb-1">How it works in the real app</p>
                    <p className="text-sm text-purple-800">
                      Upload a CSV with your customer list → Pepform generates unique referral links →
                      Send links via SMS/email → Track every referral automatically → Reward ambassadors instantly
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">All Ambassadors</h3>
                  <div className="text-sm text-slate-600">
                    <span className="font-semibold text-purple-600">{demoCustomers.filter(c => c.referrals_made > 0).length}</span> active ·
                    <span className="font-semibold text-slate-400 ml-1">{demoCustomers.filter(c => c.referrals_made === 0).length}</span> inactive
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ambassador</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Referral Link</TableHead>
                        <TableHead className="text-right">Referrals</TableHead>
                        <TableHead className="text-right">Revenue</TableHead>
                        <TableHead className="text-right">Credits</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {demoCustomers.map((customer) => {
                        const referralLink = `${siteUrl}/r/${customer.referral_code}`;
                        return (
                          <TableRow key={customer.id} className="hover:bg-purple-50/50">
                            <TableCell>
                              <div>
                                <p className="font-medium">{customer.name}</p>
                                <p className="text-xs text-slate-500">Joined {new Date(customer.joined).toLocaleDateString()}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <p className="text-slate-700">{customer.phone}</p>
                                <p className="text-slate-500">{customer.email}</p>
                              </div>
                            </TableCell>
                            <TableCell className="max-w-[200px]">
                              <div className="flex items-center gap-2">
                                <code className="text-xs bg-slate-100 px-2 py-1 rounded truncate block">
                                  {referralLink}
                                </code>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => copyToClipboard(referralLink, customer.referral_code)}
                                  className="shrink-0"
                                >
                                  {copiedCode === customer.referral_code ? (
                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <span className={`font-bold ${customer.referrals_made > 0 ? 'text-purple-600' : 'text-slate-400'}`}>
                                {customer.referrals_made}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <span className="font-bold text-green-600">
                                ${customer.total_value_generated}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <span className="font-bold text-orange-600">
                                ${customer.credits}
                              </span>
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

          <TabsContent value="referrals">
            <Card className="p-6">
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

          <TabsContent value="settings">
            <Card className="p-6">
              <div className="space-y-6">
                <div className="rounded-xl bg-blue-50 border border-blue-200 p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Demo mode:</strong> In the real app, you can customize your offer text,
                    reward amounts, and choose between credit rewards or free upgrades.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Business Name
                  </label>
                  <div className="rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-600">
                    {demoBusiness.name}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    New Client Offer Text
                  </label>
                  <div className="rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-600">
                    {demoBusiness.offer_text}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">What referred customers see when they use a referral link</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Ambassador Reward Amount
                  </label>
                  <div className="rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-600">
                    ${demoBusiness.reward_amount} AUD per successful referral
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Credits automatically applied when referrals complete</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Reward Type
                  </label>
                  <div className="rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-600 capitalize">
                    {demoBusiness.reward_type} ($ AUD)
                  </div>
                </div>

                <Button disabled className="opacity-50 cursor-not-allowed w-full">
                  Save Settings (Available in real account)
                </Button>

                <div className="rounded-xl bg-purple-50 border border-purple-200 p-6 mt-8">
                  <h3 className="font-semibold text-purple-900 mb-3">What you get with a real account:</h3>
                  <ul className="space-y-2 text-sm text-purple-800">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-600 mt-0.5 shrink-0" />
                      <span>Automatic SMS notifications to ambassadors when they earn rewards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-600 mt-0.5 shrink-0" />
                      <span>Bulk CSV upload to import hundreds of customers at once</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-600 mt-0.5 shrink-0" />
                      <span>Custom branding and offer text tailored to your business</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-600 mt-0.5 shrink-0" />
                      <span>Analytics dashboard tracking ROI, conversion rates, and top performers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-600 mt-0.5 shrink-0" />
                      <span>Cloud storage—access your data anywhere, anytime</span>
                    </li>
                  </ul>

                  <Link
                    href="/login"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-700 transition-colors"
                  >
                    Create Your Account
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Floating CTA */}
      <div className="fixed bottom-4 right-4 z-40 hidden lg:block">
        <Link
          href="/login"
          className="flex items-center gap-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 text-white shadow-2xl hover:-translate-y-1 transition-all animate-bounce-slow"
        >
          <span className="font-semibold">Ready to grow?</span>
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}
