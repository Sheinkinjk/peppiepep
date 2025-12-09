"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Gift,
  Trophy,
  Users,
  Sparkles,
  ChevronRight,
} from "lucide-react";

type Business = {
  name: string | null;
  reward_amount: number | null;
  offer_text: string | null;
  client_reward_text: string | null;
  new_user_reward_text: string | null;
  reward_terms: string | null;
};

type Customer = {
  name: string | null;
  referral_code: string | null;
  business: Business | null;
};

type Referral = {
  id: string;
  referred_name: string | null;
  status: string | null;
  created_at: string | null;
  rewarded_at: string | null;
};

type StatsResponse = {
  customer: Customer | null;
  referrals: Referral[] | null;
};

type AmbassadorJoinClientProps = {
  code: string;
  token: string | null;
};

export default function AmbassadorJoinClient({
  code,
  token,
}: AmbassadorJoinClientProps) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!code) {
      setLoading(false);
      return;
    }

    if (!token) {
      setError("Secure token missing. Reload the link from your invitation email.");
      setLoading(false);
      return;
    }

    const fetchStats = async () => {
      try {
        const response = await fetch(
          `/api/referral-stats?code=${encodeURIComponent(
            code,
          )}&markVerified=1&token=${encodeURIComponent(token)}`,
        );
        if (!response.ok) {
          setError("Unable to load ambassador data.");
          return;
        }
        const data = (await response.json()) as StatsResponse;
        setCustomer(data.customer);
        setReferrals(data.referrals || []);
        setError(null);
      } catch (err) {
        console.error("Failed to load ambassador data:", err);
        setError("Unable to load ambassador data.");
      } finally {
        setLoading(false);
      }
    };

    void fetchStats();
  }, [code, token]);

  const siteUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://referlabs.com.au";

  const business = customer?.business;
  const businessName = business?.name || "your business";
  const rewardAmount = business?.reward_amount ?? 200;
  const offerText =
    business?.offer_text || "VIP credit for every new customer you send";
  const newUserReward = business?.new_user_reward_text || offerText;
  const clientReward =
    business?.client_reward_text ||
    `$${rewardAmount} credit for every conversion`;
  const rewardTerms = business?.reward_terms || null;

  const totalReferrals = referrals.length;
  const completedReferrals = referrals.filter(
    (r) => r.status === "completed",
  ).length;
  const pendingReferrals = totalReferrals - completedReferrals;

  const ambassadorPortalUrl = code
    ? `${siteUrl}/r/referral?code=${encodeURIComponent(code)}`
    : `${siteUrl}/r/referral`;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-950 to-black flex items-center justify-center">
        <div className="text-white text-xl">
          Preparing your ambassador invitation...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-950 to-black flex items-center justify-center px-4 text-center text-white">
        <div className="max-w-lg rounded-2xl border border-red-400/40 bg-red-500/10 p-8 shadow-2xl space-y-4">
          <h2 className="text-2xl font-black">Access needed</h2>
          <p className="text-sm text-red-100/90">{error}</p>
          <p className="text-xs text-red-100/70">
            Ask the business owner to resend your secure invitation or log into
            the dashboard to manage ambassadors directly.
          </p>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-950 to-black text-white flex items-center justify-center px-4 text-center">
        <div className="max-w-lg rounded-2xl border border-white/20 bg-white/5 p-8 shadow-2xl space-y-4">
          <h2 className="text-2xl font-black">Code not found</h2>
          <p className="text-sm text-slate-200/80">
            We couldn’t find an ambassador account for this link. Double-check
            the URL or request a new invitation from the business owner.
          </p>
        </div>
      </div>
    );
  }

  const displayName = customer.name || "there";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-950 to-black text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 right-10 h-96 w-96 rounded-full bg-gradient-to-br from-purple-600/25 to-pink-600/25 blur-3xl" />
        <div className="absolute bottom-16 left-10 h-96 w-96 rounded-full bg-gradient-to-tr from-orange-500/25 to-amber-500/25 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-5xl flex-col gap-8 px-4 py-14 lg:px-10">
        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/40 px-4 py-2 text-xs font-bold uppercase tracking-wide text-amber-200 shadow-lg">
            <Sparkles className="h-4 w-4" />
            Official Ambassador Invitation
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Become an Ambassador for {businessName}
          </h1>
          <p className="max-w-2xl text-sm sm:text-base text-slate-200/80">
            {offerText} Invite friends, track every referral, and unlock{" "}
            <span className="font-semibold text-emerald-200">
              {clientReward}
            </span>{" "}
            for yourself when they join.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* Join Card */}
          <Card className="relative overflow-hidden border border-purple-400/40 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl p-8 shadow-2xl">
            <div className="absolute -right-24 -top-24 h-52 w-52 rounded-full bg-gradient-to-br from-pink-500/30 to-orange-400/30 blur-3xl" />
            <div className="absolute -left-24 bottom-0 h-48 w-48 rounded-full bg-gradient-to-tr from-purple-500/30 to-sky-500/30 blur-3xl" />

            <div className="relative space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg flex items-center justify-center">
                  <Gift className="h-7 w-7 text-white" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-purple-200 font-bold">
                    Step 1 · Confirm your spot
                  </p>
                  <p className="text-lg font-black text-white">
                    Welcome, {displayName}
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-200/80">
                You&apos;re just one step away from unlocking your personal
                referral dashboard, shareable link, and live earnings tracker.
              </p>

              <div className="space-y-3 rounded-2xl border border-white/20 bg-black/20 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-200 mb-1">
                  Optional · Confirm your details
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-300">Name</label>
                    <input
                      type="text"
                      defaultValue={customer.name ?? ""}
                      className="w-full rounded-xl border border-white/20 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-purple-400 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-300">
                      Email (optional)
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-white/20 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-purple-400 focus:outline-none"
                    />
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  These details help your salon recognise you, but you can skip
                  this step and update information later.
                </p>
              </div>

              <div className="space-y-3">
                <Link href={ambassadorPortalUrl}>
                  <Button className="w-full h-12 text-sm sm:text-base font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Become an Ambassador
                  </Button>
                </Link>
                <p className="text-[11px] text-slate-300 text-center">
                  By continuing, you&apos;ll access your private ambassador portal
                  where you can copy your link, track referrals and see earnings
                  in real time.
                </p>
              </div>
            </div>
          </Card>

          {/* Rewards Summary */}
          <Card className="border border-emerald-300/40 bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-sky-500/10 backdrop-blur-xl p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-emerald-500/40 to-teal-400/40 blur-3xl" />
            <div className="relative space-y-5">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-emerald-200 font-bold">
                    Your rewards
                  </p>
                  <p className="text-lg font-semibold text-white">
                    Earn {clientReward}
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-sm text-slate-100/90">
                <div className="rounded-2xl border border-white/15 bg-black/10 p-3">
                  <p className="text-xs uppercase tracking-wide text-slate-300 mb-1">
                    Friends receive
                  </p>
                  <p className="font-semibold text-white">{newUserReward}</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-black/10 p-3">
                  <p className="text-xs uppercase tracking-wide text-slate-300 mb-1">
                    You receive
                  </p>
                  <p className="font-semibold text-white">{clientReward}</p>
                </div>
                {rewardTerms && (
                  <p className="text-[11px] text-slate-300">
                    <span className="font-semibold text-slate-100">
                      Terms:
                    </span>{" "}
                    {rewardTerms}
                  </p>
                )}
              </div>

              <div className="mt-2 space-y-2 rounded-xl border border-white/15 bg-black/20 p-3 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-emerald-300" />
                  <p className="font-semibold text-emerald-100">
                    Live tracking included
                  </p>
                </div>
                <p>
                  Your ambassador portal shows every friend you invite, what stage
                  they&apos;re at, and how much you&apos;ve earned so far.
                </p>
                <p className="mt-1 text-slate-300/80">
                  Current snapshot:{" "}
                  <span className="font-semibold text-emerald-200">
                    {completedReferrals} earned
                  </span>{" "}
                  ·{" "}
                  <span className="font-semibold text-amber-200">
                    {pendingReferrals} pending
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-300 mt-1">
                <ChevronRight className="h-3 w-3 text-emerald-200" />
                <p>
                  Next: Copy your link, share it with friends, and watch referrals appear in real time.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
