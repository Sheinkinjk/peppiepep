"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { nanoid } from "nanoid";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import {
  Sparkles,
  Upload,
  ArrowRight,
  Users,
  Zap,
  CheckCircle2,
  Plus,
  Copy,
  Download,
  TrendingUp,
  Gift,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { StickyHeader } from "@/components/StickyHeader";

interface GuestBusiness {
  id: string;
  name: string;
  offer_text: string;
  reward_type: string;
  reward_amount: number;
  is_guest: true;
  created_at: string;
}

interface GuestCustomer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  referral_code: string;
  credits: number;
  status: string;
}

interface GuestReferral {
  id: string;
  ambassador_id: string;
  referred_name: string;
  referred_phone: string;
  referred_email?: string;
  status: string;
  created_at: string;
}

export default function GuestDashboard() {
  const router = useRouter();
  const [business, setBusiness] = useState<GuestBusiness | null>(null);
  const [customers, setCustomers] = useState<GuestCustomer[]>([]);
  const [referrals, setReferrals] = useState<GuestReferral[]>([]);
  const [offerText, setOfferText] = useState("");
  const [rewardAmount, setRewardAmount] = useState("");
  const [quickName, setQuickName] = useState("");
  const [quickPhone, setQuickPhone] = useState("");
  const [quickEmail, setQuickEmail] = useState("");
  const [copiedCode, setCopiedCode] = useState("");

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    // Load guest business
    const guestMode = localStorage.getItem("pepform_guest_mode");
    if (guestMode !== "true") {
      router.push("/login");
      return;
    }

    const storedBusiness = localStorage.getItem("pepform_guest_business");
    const storedCustomers = localStorage.getItem("pepform_guest_customers");
    const storedReferrals = localStorage.getItem("pepform_guest_referrals");

    if (storedBusiness) {
      const biz = JSON.parse(storedBusiness);
      setBusiness(biz);
      setOfferText(biz.offer_text || "");
      setRewardAmount(String(biz.reward_amount || 15));
    }

    if (storedCustomers) {
      setCustomers(JSON.parse(storedCustomers));
    }

    if (storedReferrals) {
      setReferrals(JSON.parse(storedReferrals));
    }
  }, [router]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const handleUpdateSettings = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!business) return;

    const updatedBusiness = {
      ...business,
      offer_text: offerText,
      reward_amount: Number(rewardAmount),
    };

    setBusiness(updatedBusiness);
    localStorage.setItem("pepform_guest_business", JSON.stringify(updatedBusiness));
    alert("Settings saved!");
  };

  const handleUploadCSV = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileName = file.name.toLowerCase();
    const isCSV = fileName.endsWith('.csv');
    const isExcel = fileName.endsWith('.xlsx') || fileName.endsWith('.xls');

    if (!isCSV && !isExcel) {
      alert('Please upload a CSV or Excel file (.csv, .xlsx, .xls)');
      e.target.value = "";
      return;
    }

    try {
      let parsedData: Array<Record<string, string>> = [];

      if (isCSV) {
        // Parse CSV
        Papa.parse<Record<string, string>>(file, {
          header: true,
          complete: (results) => {
            parsedData = results.data;
            processCustomerData(parsedData, e);
          },
        });
      } else {
        // Parse Excel
        const arrayBuffer = await file.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });

        // Get first sheet
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convert to JSON
        parsedData = XLSX.utils.sheet_to_json<Record<string, string>>(worksheet);
        processCustomerData(parsedData, e);
      }
    } catch (error) {
      console.error('File parsing error:', error);
      alert('Failed to parse file. Please check your file format.');
      e.target.value = "";
    }
  };

  const processCustomerData = (
    parsedData: Array<Record<string, string>>,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newCustomers: GuestCustomer[] = parsedData
      .filter((row) => row.name || row.Name || row.phone || row.Phone)
      .map((row) => ({
        id: nanoid(12),
        name: row.name || row.Name || row.full_name || row['Full Name'] || "Unknown",
        phone: row.phone || row.Phone || row.mobile || row.Mobile || "+61 400 000 000",
        email: row.email || row.Email,
        referral_code: nanoid(12),
        credits: 0,
        status: "active",
      }));

    const allCustomers = [...customers, ...newCustomers];
    setCustomers(allCustomers);
    localStorage.setItem("pepform_guest_customers", JSON.stringify(allCustomers));
    alert(`Added ${newCustomers.length} customers!`);

    // Reset file input
    e.target.value = "";
  };

  const handleMarkCompleted = (referralId: string, ambassadorId: string) => {
    // Update referral status
    const updatedReferrals = referrals.map((r) =>
      r.id === referralId
        ? { ...r, status: "completed", rewarded_at: new Date().toISOString() }
        : r
    );

    // Update ambassador credits
    const updatedCustomers = customers.map((c) =>
      c.id === ambassadorId
        ? { ...c, credits: c.credits + (business?.reward_amount || 0) }
        : c
    );

    setReferrals(updatedReferrals);
    setCustomers(updatedCustomers);

    localStorage.setItem("pepform_guest_referrals", JSON.stringify(updatedReferrals));
    localStorage.setItem("pepform_guest_customers", JSON.stringify(updatedCustomers));
  };

  const handleAddCustomer = () => {
    if (!quickName && !quickPhone && !quickEmail) return;

    const newCustomer: GuestCustomer = {
      id: nanoid(12),
      name: quickName || "New Guest",
      phone: quickPhone || "+61 400 000 000",
      email: quickEmail || undefined,
      referral_code: nanoid(12),
      credits: 0,
      status: "active",
    };

    const allCustomers = [newCustomer, ...customers];
    setCustomers(allCustomers);
    localStorage.setItem("pepform_guest_customers", JSON.stringify(allCustomers));
    setQuickName("");
    setQuickPhone("");
    setQuickEmail("");
  };

  const copyToClipboard = (text: string, code: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 1500);
  };

  const handleConvertToRealAccount = () => {
    localStorage.removeItem("pepform_guest_mode");
    router.push("/login");
  };

  if (!business) {
    return <div>Loading...</div>;
  }

  const pendingReferrals = referrals.filter((r) => r.status === "pending").length;
  const totalRewards = customers.reduce((sum, c) => sum + c.credits, 0);
  const totalReferrals = referrals.length;
  const activeAmbassadors = customers.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white">
      <StickyHeader />

      <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
        {/* Premium Demo Banner - Moved to top */}
        <div className="mb-8 rounded-2xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8 shadow-2xl border border-purple-500/20">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 h-14 w-14 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center shadow-lg">
              <Zap className="h-7 w-7 text-amber-300" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-black uppercase tracking-wider text-amber-200 bg-amber-500/20 px-3 py-1 rounded-full">
                  Investor-Ready Demo
                </span>
                <span className="text-xs font-semibold text-purple-200">No backend required</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
                Showcase the complete micro-influencer flow
              </h2>
              <p className="text-base text-purple-100">
                Fully interactive demo. All data stored locally—perfect for pitches and testing.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="flex items-start gap-3 text-sm">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-500/30 flex items-center justify-center mt-0.5">
                <Upload className="h-3.5 w-3.5 text-purple-200" />
              </div>
              <div>
                <p className="font-bold text-white">Import & Activate</p>
                <p className="text-purple-200 text-xs">Upload CSV or add contacts to generate referral links</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500/30 flex items-center justify-center mt-0.5">
                <MessageSquare className="h-3.5 w-3.5 text-blue-200" />
              </div>
              <div>
                <p className="font-bold text-white">Test Referral Flow</p>
                <p className="text-blue-200 text-xs">Open demo page, log referrals, see live updates</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-emerald-500/30 flex items-center justify-center mt-0.5">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-200" />
              </div>
              <div>
                <p className="font-bold text-white">Track Performance</p>
                <p className="text-emerald-200 text-xs">Watch metrics update as referrals convert</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-amber-500/30 flex items-center justify-center mt-0.5">
                <Gift className="h-3.5 w-3.5 text-amber-200" />
              </div>
              <div>
                <p className="font-bold text-white">Automate Rewards</p>
                <p className="text-amber-200 text-xs">Mark complete to see credits flow automatically</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/r/demo-referral" target="_blank">
              <Button className="bg-white text-slate-900 hover:bg-slate-100 font-bold shadow-xl">
                <ArrowRight className="mr-2 h-4 w-4" />
                Open demo referral page
              </Button>
            </Link>
            <Link href="/demo" target="_blank">
              <Button variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur font-bold">
                View full dashboard
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={handleConvertToRealAccount}
              className="border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur font-bold"
            >
              Convert to cloud account
            </Button>
          </div>
        </div>

        <div className="mb-8 flex flex-col gap-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Pepform Dashboard — {business.name}
          </h1>
          <p className="text-sm text-slate-600">
            Pending referrals: {pendingReferrals} • Total credits issued: ${totalRewards}
          </p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-4 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                <Users className="h-5 w-5 text-purple-700" />
              </div>
              <span className="text-xs font-semibold text-purple-700 bg-purple-100 px-2 py-1 rounded-full">
                Live
              </span>
            </div>
            <p className="mt-4 text-3xl font-bold text-slate-900">{activeAmbassadors}</p>
            <p className="text-sm text-slate-600">Referrers in program</p>
          </Card>

          <Card className="p-4 border-green-200 bg-gradient-to-br from-green-50 to-white">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <Zap className="h-5 w-5 text-green-700" />
              </div>
              <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">
                Rewards
              </span>
            </div>
            <p className="mt-4 text-3xl font-bold text-slate-900">${totalRewards}</p>
            <p className="text-sm text-slate-600">Credits issued</p>
          </Card>

          <Card className="p-4 border-amber-200 bg-gradient-to-br from-amber-50 to-white">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                <CheckCircle2 className="h-5 w-5 text-amber-700" />
              </div>
              <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-1 rounded-full">
                Activity
              </span>
            </div>
            <p className="mt-4 text-3xl font-bold text-slate-900">{totalReferrals}</p>
            <p className="text-sm text-slate-600">Referrals logged</p>
          </Card>

          <Card className="p-4 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Upload className="h-5 w-5 text-blue-700" />
              </div>
              <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-1 rounded-full">
                Demo
              </span>
            </div>
            <p className="mt-4 text-3xl font-bold text-slate-900">Instant</p>
            <p className="text-sm text-slate-600">No backend required</p>
          </Card>
        </div>

        <Tabs defaultValue="clients" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 p-1.5 bg-white/90 backdrop-blur-xl shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/50 rounded-2xl h-auto">
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
              <span className="hidden sm:inline">Referrals ({pendingReferrals})</span>
              <span className="sm:hidden">Refs ({pendingReferrals})</span>
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="text-sm px-4 py-3 font-bold rounded-xl data-[state=active]:bg-gradient-to-b data-[state=active]:from-amber-600 data-[state=active]:to-amber-700 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-amber-300/50 transition-all duration-200"
            >
              <Zap className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Settings & Rewards</span>
              <span className="sm:hidden">Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="clients">
            <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
              {/* Premium Import Section */}
              <Card className="p-8 border-2 border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 h-14 w-14 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center shadow-lg shadow-purple-200">
                    <Upload className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-slate-900 mb-2">Import your list</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Upload CSV/Excel or add contacts manually. Every customer becomes a micro-influencer instantly.
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3 mb-4">
                  <div>
                    <Label htmlFor="quickName" className="text-xs font-bold text-slate-700 uppercase tracking-wide">Name</Label>
                    <Input
                      id="quickName"
                      value={quickName}
                      onChange={(e) => setQuickName(e.target.value)}
                      placeholder="Alex Ambassador"
                      className="mt-1.5 border-2 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="quickPhone" className="text-xs font-bold text-slate-700 uppercase tracking-wide">Phone</Label>
                    <Input
                      id="quickPhone"
                      value={quickPhone}
                      onChange={(e) => setQuickPhone(e.target.value)}
                      placeholder="+61 400 123 456"
                      className="mt-1.5 border-2 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="quickEmail" className="text-xs font-bold text-slate-700 uppercase tracking-wide">Email</Label>
                    <Input
                      id="quickEmail"
                      value={quickEmail}
                      onChange={(e) => setQuickEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="mt-1.5 border-2 focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-4">
                  <Button
                    onClick={handleAddCustomer}
                    disabled={!quickName && !quickPhone && !quickEmail}
                    className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 font-bold shadow-lg hover:shadow-xl transition-all"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add contact
                  </Button>
                  <Button variant="outline" className="gap-2 border-2 font-bold hover:border-purple-300" asChild>
                    <label htmlFor="file" className="flex cursor-pointer items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Upload CSV/Excel
                    </label>
                  </Button>
                  <a
                    href="/customer-template.csv"
                    download
                    className="inline-flex items-center gap-2 rounded-lg border-2 border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all"
                  >
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:inline">Template</span>
                  </a>
                </div>

                <input
                  id="file"
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleUploadCSV}
                  className="hidden"
                />

                <div className="rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 p-4 border-2 border-purple-100">
                  <p className="text-xs font-semibold text-purple-900">
                    💡 Tip: CSV columns: name, phone, email. Data persists locally in this demo.
                  </p>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-black text-slate-900">All customers</h3>
                    <span className="text-sm font-bold text-purple-700 bg-purple-100 px-3 py-1.5 rounded-full">{customers.length} contacts</span>
                  </div>
                  <div className="rounded-xl border-2 border-slate-200 overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-slate-50">
                          <TableHead className="font-black">#</TableHead>
                          <TableHead className="font-black">Name</TableHead>
                          <TableHead className="font-black">Phone</TableHead>
                          <TableHead className="font-black">Email</TableHead>
                          <TableHead className="font-black">Referral link</TableHead>
                          <TableHead className="text-right font-black">Credits</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {customers.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center text-sm py-8">
                              <div className="flex flex-col items-center gap-2">
                                <Users className="h-12 w-12 text-slate-300" />
                                <p className="font-semibold text-slate-900">No customers yet</p>
                                <p className="text-xs text-slate-500">Upload a CSV or add contacts above to get started</p>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                        {customers.map((customer, index) => {
                        const link = `${siteUrl}/r/${customer.referral_code}`;
                        return (
                          <TableRow key={customer.id} className="hover:bg-purple-50/50">
                            <TableCell className="font-black text-purple-700">#{index + 1}</TableCell>
                            <TableCell className="font-semibold">{customer.name}</TableCell>
                            <TableCell className="text-slate-600">{customer.phone}</TableCell>
                            <TableCell className="text-slate-600">{customer.email || "—"}</TableCell>
                            <TableCell className="max-w-[220px] truncate text-xs">
                              <div className="flex items-center gap-2">
                                <span className="truncate text-slate-600">{link}</span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 w-8 p-0 hover:bg-purple-100"
                                  onClick={() => copyToClipboard(link, customer.referral_code)}
                                >
                                  {copiedCode === customer.referral_code ? (
                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                  ) : (
                                    <Copy className="h-4 w-4 text-slate-500" />
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
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="referrals">
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Referrals</h3>
                    <p className="text-xs text-slate-500">
                      Track statuses and reward ambassadors in demo mode
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                      {pendingReferrals} pending
                    </span>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      {totalReferrals - pendingReferrals} completed
                    </span>
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Referred</TableHead>
                      <TableHead>Ambassador</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {referrals.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-sm">
                          No referrals yet. Try the demo referral page to see how it works.
                        </TableCell>
                      </TableRow>
                    )}
                    {referrals.map((referral) => {
                      const ambassador = customers.find((c) => c.id === referral.ambassador_id);
                      const isPending = referral.status === "pending";
                      return (
                        <TableRow key={referral.id} className={isPending ? "bg-orange-50/50" : ""}>
                          <TableCell>
                            <div className="font-medium">{referral.referred_name}</div>
                            <div className="text-xs text-muted-foreground">
                              {referral.referred_email || referral.referred_phone}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{ambassador?.name || "Unknown"}</div>
                            <div className="text-xs text-muted-foreground">
                              {ambassador?.phone || "—"}
                            </div>
                          </TableCell>
                          <TableCell className="capitalize">{referral.status}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {new Date(referral.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              variant={isPending ? "default" : "outline"}
                              disabled={!isPending}
                              onClick={() => handleMarkCompleted(referral.id, referral.ambassador_id)}
                            >
                              {isPending ? "Mark completed" : "Completed"}
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
              <Card className="p-6">
                <form onSubmit={handleUpdateSettings} className="space-y-4">
                  <div>
                    <Label htmlFor="offer_text">New client offer text</Label>
                    <Input
                      id="offer_text"
                      value={offerText}
                      onChange={(e) => setOfferText(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="reward_amount">Reward amount ($ AUD)</Label>
                    <Input
                      id="reward_amount"
                      type="number"
                      value={rewardAmount}
                      onChange={(e) => setRewardAmount(e.target.value)}
                    />
                  </div>

                  <Button type="submit" className="mt-2">
                    Save settings
                  </Button>
                </form>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-purple-50 to-white border-purple-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Quick Demo Links</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <Link
                      href="/r/demo-referral"
                      target="_blank"
                      className="text-purple-700 hover:text-purple-900 underline flex items-center gap-1"
                    >
                      View demo referral page
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                    <p className="text-xs text-purple-600">Customer view for referral capture</p>
                  </div>
                  <div>
                    <Link
                      href="/demo"
                      target="_blank"
                      className="text-purple-700 hover:text-purple-900 underline flex items-center gap-1"
                    >
                      View investor demo dashboard
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                    <p className="text-xs text-purple-600">Populated dashboard with sample data</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

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
              <Link className="hover:text-slate-900 transition-colors" href="/demo">
                Full Demo
              </Link>
              <span className="text-slate-300">•</span>
              <Link className="hover:text-slate-900 transition-colors" href="/login">
                Sign in
              </Link>
            </div>
          </div>
          <p className="text-xs text-slate-400 text-center mt-4">
            © 2024 Pepform. Guest mode dashboard. Data stored locally for testing.
          </p>
        </footer>
      </div>
    </div>
  );
}
