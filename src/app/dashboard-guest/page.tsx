'use client';

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
import { Sparkles, Upload, ArrowRight } from "lucide-react";
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

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';

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

  const handleConvertToRealAccount = () => {
    localStorage.removeItem("pepform_guest_mode");
    router.push("/login");
  };

  if (!business) {
    return <div>Loading...</div>;
  }

  const pendingReferrals = referrals.filter((r) => r.status === "pending").length;
  const totalRewards = customers.reduce((sum, c) => sum + c.credits, 0);

  return (
    <div className="mx-auto max-w-5xl p-8">
      <div className="mb-6 rounded-lg bg-amber-50 border border-amber-200 p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-2">
            <Sparkles className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-900">Guest Mode - MVP Testing</p>
              <p className="text-xs text-amber-700 mt-1">
                You're using a test account. Data is stored locally in your browser.
              </p>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={handleConvertToRealAccount}
            className="shrink-0 border-amber-300 bg-white hover:bg-amber-50"
          >
            Create Real Account
          </Button>
        </div>
      </div>

      <h1 className="mb-2 text-4xl font-bold">
        Pepform Dashboard — {business.name}
      </h1>
      <p className="mb-8 text-sm text-muted-foreground">
        Pending referrals: {pendingReferrals} • Total credits issued: ${totalRewards}
      </p>

      <Tabs defaultValue="settings" className="w-full">
        <TabsList>
          <TabsTrigger value="settings">Settings & Rewards</TabsTrigger>
          <TabsTrigger value="clients">Clients & Ambassadors</TabsTrigger>
          <TabsTrigger value="referrals">
            Referrals ({pendingReferrals} pending)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="settings">
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
                Save Settings
              </Button>
            </form>

            <div className="mt-8 p-4 rounded-lg bg-purple-50 border border-purple-200">
              <h3 className="font-semibold text-purple-900 mb-2">Quick Demo Links</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <Link
                    href="/r/demo-referral"
                    target="_blank"
                    className="text-purple-700 hover:text-purple-900 underline flex items-center gap-1"
                  >
                    View demo referral page
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                  <p className="text-xs text-purple-600">See what customers see when they use a referral link</p>
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
                  <p className="text-xs text-purple-600">See a fully populated dashboard with sample data</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="clients">
          <Card className="p-6">
            <div className="space-y-4 mb-8">
              <Label htmlFor="file">
                <div className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload CSV (columns: name, phone, email optional)
                </div>
              </Label>
              <Input
                id="file"
                type="file"
                accept=".csv"
                onChange={handleUploadCSV}
              />
              <p className="text-xs text-slate-500">
                Upload a CSV with customer data to generate referral links automatically
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">All customers</h3>
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
                        No customers yet. Upload a CSV to get started.
                      </TableCell>
                    </TableRow>
                  )}
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>{customer.email || "—"}</TableCell>
                      <TableCell className="max-w-[220px] truncate text-xs">
                        {siteUrl}/r/{customer.referral_code}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        ${customer.credits}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="referrals">
          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Referrals</h3>
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
                      <TableRow key={referral.id}>
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
      </Tabs>
    </div>
  );
}
