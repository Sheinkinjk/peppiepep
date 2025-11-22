/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
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

// Demo data
const demoBusiness = {
  name: "Demo Beauty Studio",
  offer_text: "20% off your first visit",
  reward_type: "credit",
  reward_amount: 15,
};

const demoCustomers = [
  {
    id: "1",
    name: "Sarah Mitchell",
    phone: "+61 400 123",
    email: "sarah@example.com",
    referral_code: "SMI789XYZ",
    credits: 45,
    status: "active",
  },
  {
    id: "2",
    name: "James Chen",
    phone: "+61 400 456",
    email: "james@example.com",
    referral_code: "JCH456ABC",
    credits: 30,
    status: "active",
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    phone: "+61 400 789",
    email: "emma@example.com",
    referral_code: "ERO123DEF",
    credits: 60,
    status: "active",
  },
  {
    id: "4",
    name: "Oliver Thompson",
    phone: "+61 400 234",
    email: "oliver@example.com",
    referral_code: "OTH567GHI",
    credits: 15,
    status: "active",
  },
  {
    id: "5",
    name: "Sophie Anderson",
    phone: "+61 400 567",
    email: "sophie@example.com",
    referral_code: "SAN890JKL",
    credits: 0,
    status: "active",
  },
];

const demoReferrals = [
  {
    id: "1",
    ambassador_id: "1",
    referred_name: "Lucy Wilson",
    referred_email: "lucy@example.com",
    referred_phone: "+61 400 111",
    status: "completed",
    created_at: "2024-11-15T10:30:00Z",
  },
  {
    id: "2",
    ambassador_id: "1",
    referred_name: "Michael Brown",
    referred_email: "michael@example.com",
    referred_phone: "+61 400 222",
    status: "completed",
    created_at: "2024-11-10T14:20:00Z",
  },
  {
    id: "3",
    ambassador_id: "2",
    referred_name: "Rachel Green",
    referred_email: "rachel@example.com",
    referred_phone: "+61 400 333",
    status: "pending",
    created_at: "2024-11-18T09:15:00Z",
  },
  {
    id: "4",
    ambassador_id: "3",
    referred_name: "Tom Harris",
    referred_email: "tom@example.com",
    referred_phone: "+61 400 444",
    status: "completed",
    created_at: "2024-11-12T16:45:00Z",
  },
  {
    id: "5",
    ambassador_id: "1",
    referred_name: "Jenny Clark",
    referred_email: "jenny@example.com",
    referred_phone: "+61 400 555",
    status: "completed",
    created_at: "2024-11-08T11:30:00Z",
  },
  {
    id: "6",
    ambassador_id: "2",
    referred_name: "David Lee",
    referred_email: "david@example.com",
    referred_phone: "+61 400 666",
    status: "completed",
    created_at: "2024-11-14T13:20:00Z",
  },
  {
    id: "7",
    ambassador_id: "3",
    referred_name: "Anna White",
    referred_email: "anna@example.com",
    referred_phone: "+61 400 777",
    status: "pending",
    created_at: "2024-11-19T08:10:00Z",
  },
  {
    id: "8",
    ambassador_id: "4",
    referred_name: "Chris Martin",
    referred_email: "chris@example.com",
    referred_phone: "+61 400 888",
    status: "completed",
    created_at: "2024-11-16T15:50:00Z",
  },
];

export default function DemoPage() {
  const siteUrl = "http://localhost:3007";
  const pendingReferrals = demoReferrals.filter((r) => r.status === "pending").length;
  const totalRewards = demoCustomers.reduce((sum, c) => sum + c.credits, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Demo Banner */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 shadow-lg">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
            <p className="font-semibold">Demo Mode</p>
            <span className="text-sm opacity-90">Explore Pepform with sample data</span>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur px-4 py-1.5 text-sm font-medium hover:bg-white/30 transition"
          >
            <X className="h-4 w-4" />
            Exit Demo
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-4xl font-bold text-slate-900">
              Pepform Dashboard — {demoBusiness.name}
            </h1>
            <p className="text-slate-600">
              Pending referrals: <strong>{pendingReferrals}</strong> • Total credits issued:{" "}
              <strong>${totalRewards}</strong>
            </p>
          </div>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:-translate-y-0.5 transition"
          >
            Sign up for real <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <Tabs defaultValue="clients" className="w-full">
          <TabsList>
            <TabsTrigger value="settings">Settings & Rewards</TabsTrigger>
            <TabsTrigger value="clients">Clients & Ambassadors</TabsTrigger>
            <TabsTrigger value="referrals">
              Referrals ({pendingReferrals} pending)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="settings">
            <Card className="p-6">
              <div className="space-y-6">
                <div className="rounded-xl bg-blue-50 border border-blue-200 p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Demo mode:</strong> Changes won't be saved. Sign up to customize your offer and rewards.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    New client offer text
                  </label>
                  <div className="rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-600">
                    {demoBusiness.offer_text}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Reward type
                  </label>
                  <div className="rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-600 capitalize">
                    {demoBusiness.reward_type}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Reward amount
                  </label>
                  <div className="rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-600">
                    ${demoBusiness.reward_amount}
                  </div>
                </div>

                <Button disabled className="opacity-50 cursor-not-allowed">
                  Save Settings (Demo Mode)
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="clients">
            <Card className="p-6">
              <div className="mb-6 rounded-xl bg-purple-50 border border-purple-200 p-4">
                <p className="text-sm text-purple-800">
                  <strong>In the real app:</strong> Upload your customer CSV here to generate unique referral links for each client.
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
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {demoCustomers.map((customer) => {
                      const referralLink = `${siteUrl}/r/${customer.referral_code}`;
                      return (
                        <TableRow key={customer.id}>
                          <TableCell className="font-medium">{customer.name}</TableCell>
                          <TableCell>{customer.phone}</TableCell>
                          <TableCell>{customer.email}</TableCell>
                          <TableCell className="max-w-[220px] truncate">
                            <a
                              href={referralLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-purple-600 hover:underline"
                            >
                              {referralLink}
                            </a>
                          </TableCell>
                          <TableCell className="text-right font-semibold">
                            ${customer.credits}
                          </TableCell>
                          <TableCell className="capitalize">
                            <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                              {customer.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="referrals">
            <Card className="p-6">
              <div className="mb-6 rounded-xl bg-green-50 border border-green-200 p-4">
                <p className="text-sm text-green-800">
                  <strong>In the real app:</strong> Click "Mark completed" to reward ambassadors and send them an automatic SMS notification.
                </p>
              </div>

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
                    {demoReferrals.map((referral) => {
                      const ambassador = demoCustomers.find(
                        (c) => c.id === referral.ambassador_id,
                      );
                      const isPending = referral.status === "pending";
                      return (
                        <TableRow key={referral.id}>
                          <TableCell>
                            <div className="font-medium">{referral.referred_name}</div>
                            <div className="text-xs text-slate-500">
                              {referral.referred_email}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{ambassador?.name}</div>
                            <div className="text-xs text-slate-500">
                              {ambassador?.email}
                            </div>
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
                              className={!isPending ? "opacity-50" : ""}
                            >
                              {isPending ? "Mark completed (Demo)" : "Completed"}
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

        <div className="mt-8 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-center text-white shadow-2xl">
          <h2 className="text-3xl font-bold mb-3">Ready to run your own referral program?</h2>
          <p className="text-lg mb-6 text-purple-100">
            Sign up now and import your customers in under 5 minutes
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-lg font-semibold text-purple-600 shadow-lg hover:-translate-y-0.5 transition"
          >
            Get started for free <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
