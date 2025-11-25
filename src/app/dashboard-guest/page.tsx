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
} from "lucide-react";
import Link from "next/link";

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

  const handleUploadCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse<Record<string, string>>(file, {
      header: true,
      complete: (results) => {
        const newCustomers: GuestCustomer[] = results.data
          .filter((row) => row.name || row.Name || row.phone || row.Phone)
          .map((row) => ({
            id: nanoid(12),
            name: row.name || row.Name || row.full_name || "Unknown",
            phone: row.phone || row.Phone || row.mobile || "+61 400 000 000",
            email: row.email || row.Email,
            referral_code: nanoid(12),
            credits: 0,
            status: "active",
          }));

        const allCustomers = [...customers, ...newCustomers];
        setCustomers(allCustomers);
        localStorage.setItem("pepform_guest_customers", JSON.stringify(allCustomers));
        alert(`Added ${newCustomers.length} customers!`);
      },
    });

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
      <div className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-amber-200/80 bg-gradient-to-r from-amber-50 to-orange-50 p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-200">
                <Sparkles className="h-5 w-5 text-amber-700" />
              </div>
              <div>
                <p className="text-sm font-semibold text-amber-900">Guest Mode — MVP Testing</p>
                <p className="text-xs text-amber-800">
                  This is a fully interactive offline demo. Data is stored locally so you can showcase the flow without setup.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleConvertToRealAccount}
                className="border-amber-300 bg-white hover:bg-amber-50"
              >
                Convert to cloud account
              </Button>
              <Link href="/demo">
                <Button size="sm" variant="secondary" className="bg-white text-amber-900 hover:bg-amber-100">
                  View full demo
                </Button>
              </Link>
            </div>
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
          <TabsList>
            <TabsTrigger value="clients">Clients & Ambassadors</TabsTrigger>
            <TabsTrigger value="referrals">
              Referrals ({pendingReferrals} pending)
            </TabsTrigger>
            <TabsTrigger value="settings">Settings & Rewards</TabsTrigger>
          </TabsList>

          <TabsContent value="clients">
            <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
              <Card className="p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-slate-900">Import your list</h3>
                    <p className="text-sm text-slate-600">
                      Upload a CSV or add one manually to generate referral links instantly.
                    </p>
                    <div className="flex flex-wrap gap-3 text-xs">
                      <a
                        href="/customer-template.csv"
                        download
                        className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Download CSV template
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" className="gap-2" asChild>
                      <label htmlFor="file" className="flex cursor-pointer items-center gap-2">
                        <Upload className="h-4 w-4" />
                        Upload CSV
                      </label>
                    </Button>
                    <Button variant="secondary" className="gap-2" onClick={handleAddCustomer} disabled={!quickName && !quickPhone && !quickEmail}>
                      <Plus className="h-4 w-4" />
                      Add contact
                    </Button>
                  </div>
                </div>

                <input
                  id="file"
                  type="file"
                  accept=".csv"
                  onChange={handleUploadCSV}
                  className="hidden"
                />

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div>
                    <Label htmlFor="quickName">Name</Label>
                    <Input
                      id="quickName"
                      value={quickName}
                      onChange={(e) => setQuickName(e.target.value)}
                      placeholder="Alex Ambassador"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="quickPhone">Phone</Label>
                    <Input
                      id="quickPhone"
                      value={quickPhone}
                      onChange={(e) => setQuickPhone(e.target.value)}
                      placeholder="+61 400 123 456"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="quickEmail">Email</Label>
                    <Input
                      id="quickEmail"
                      value={quickEmail}
                      onChange={(e) => setQuickEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="mt-1"
                    />
                  </div>
                </div>

                <p className="mt-3 text-xs text-slate-500">
                  CSV columns supported: name, phone, email (optional). Imported data persists locally for this demo.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">All customers</h3>
                    <span className="text-xs text-slate-500">{customers.length} total</span>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Referral link</TableHead>
                        <TableHead className="text-right">Credits</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customers.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-sm">
                            No customers yet. Upload a CSV or add one above.
                          </TableCell>
                        </TableRow>
                      )}
                      {customers.map((customer) => {
                        const link = `${siteUrl}/r/${customer.referral_code}`;
                        return (
                          <TableRow key={customer.id}>
                            <TableCell className="font-semibold">{customer.name}</TableCell>
                            <TableCell>{customer.phone}</TableCell>
                            <TableCell>{customer.email || "—"}</TableCell>
                            <TableCell className="max-w-[220px] truncate text-xs">
                              <div className="flex items-center gap-2">
                                <span className="truncate">{link}</span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 w-8 p-0"
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
                            <TableCell className="text-right font-semibold">
                              ${customer.credits}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white border-0 shadow-xl">
                <div className="flex items-start gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-amber-300" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-amber-200">Investor-ready demo</p>
                    <h3 className="text-xl font-bold">Showcase the full flow</h3>
                  </div>
                </div>
                <ul className="space-y-3 text-sm text-white/90">
                  <li className="flex gap-2">
                    <span className="text-emerald-200">•</span>
                    Add contacts or import CSV to generate referral links instantly.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-200">•</span>
                    Open the demo referral page to log a referral (saved locally).
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-200">•</span>
                    Mark referrals complete to show rewards and balances updating live.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-200">•</span>
                    Launch a sample campaign preview to demo messaging.
                  </li>
                </ul>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link href="/r/demo-referral" target="_blank">
                    <Button size="sm" variant="secondary" className="bg-white text-slate-900 hover:bg-slate-100">
                      Open demo referral page
                    </Button>
                  </Link>
                  <Link href="/demo" target="_blank">
                    <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      View full dashboard
                    </Button>
                  </Link>
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
      </div>
    </div>
  );
}
