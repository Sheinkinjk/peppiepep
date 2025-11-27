"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  TrendingUp,
  Share2,
  Mail,
  MessageSquare,
  Copy,
  Check,
  Sparkles,
  Gift,
  Users,
  Target,
  Award,
  ChevronRight
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Business {
  id: string;
  name: string | null;
  reward_amount: number | null;
  offer_text: string | null;
}

interface Customer {
  id: string;
  name: string | null;
  referral_code: string | null;
  business: Business | null;
}

interface Referral {
  id: string;
  referred_name: string | null;
  referred_email: string | null;
  referred_phone: string | null;
  status: string | null;
  created_at: string | null;
  rewarded_at: string | null;
}

export default function ReferralStatsPage() {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);
  const [code, setCode] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const codeParam = params.get("code") || "";
    setCode(codeParam);

    if (codeParam) {
      fetchData(codeParam);
    } else {
      setLoading(false);
    }
  }, []);

  async function fetchData(referralCode: string) {
    try {
      const response = await fetch(`/api/referral-stats?code=${referralCode}`);
      if (response.ok) {
        const data = await response.json();
        setCustomer(data.customer);
        setReferrals(data.referrals || []);
      }
    } catch (error) {
      console.error("Failed to fetch referral data:", error);
    } finally {
      setLoading(false);
    }
  }

  const siteUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://peppiepep.vercel.app";
  const rewardAmount = customer?.business?.reward_amount ?? 200;
  const offerText =
    customer?.business?.offer_text ??
    "VIP credit for every new customer you send";
  const personalLink =
    customer?.referral_code ? `${siteUrl}/r/${customer.referral_code}` : null;

  const total = referrals.length;
  const earned = referrals.filter((r) => r.status === "earned").length;
  const pending = referrals.filter((r) => r.status !== "earned").length;
  const totalEarnings = earned * rewardAmount;

  const copyToClipboard = async () => {
    if (personalLink) {
      try {
        await navigator.clipboard.writeText(personalLink);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  const shareViaEmail = () => {
    if (personalLink) {
      const subject = encodeURIComponent(`Get ${offerText} at ${customer?.business?.name || "our business"}!`);
      const body = encodeURIComponent(`Hey! I wanted to share this exclusive offer with you.\n\nGet ${offerText} when you use my referral link:\n${personalLink}\n\nBoth of us get rewarded when you sign up!`);
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    }
  };

  const shareViaSMS = () => {
    if (personalLink) {
      const message = encodeURIComponent(`Get ${offerText}! Use my referral link: ${personalLink}`);
      window.location.href = `sms:?&body=${message}`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading your ambassador portal...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-950 to-black text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 h-96 w-96 rounded-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 h-96 w-96 rounded-full bg-gradient-to-tr from-orange-600/20 to-amber-600/20 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 py-14 lg:px-10">
        {/* Premium Header Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/30 px-4 py-2 text-sm font-bold uppercase tracking-wide text-amber-300 shadow-lg">
              <Trophy className="h-4 w-4" />
              VIP Ambassador Portal
            </div>
          </div>
          <div>
            <h1 className="text-5xl font-black leading-tight sm:text-6xl lg:text-7xl bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Your Referral Empire
            </h1>
            <p className="mt-4 text-xl text-slate-300/90 sm:text-2xl max-w-3xl">
              Turn your network into cash. Earn <span className="font-black text-transparent bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text">${rewardAmount}</span> for every friend you bring, and they get <span className="font-black text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text">${rewardAmount}</span> too.
            </p>
          </div>
        </div>

        {!code && (
          <Card className="border border-purple-400/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl p-8 text-white shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg">
                <Target className="h-7 w-7 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-black mb-2">Access Your Ambassador Portal</h2>
                <p className="text-slate-200/90 mb-4">
                  Add your unique referral code to the URL to view your personalized link, earnings, and activity.
                </p>
                <div className="rounded-2xl border border-purple-300/30 bg-purple-900/30 p-5 text-sm backdrop-blur">
                  <p className="mb-2 font-bold text-purple-200 flex items-center gap-2">
                    <ChevronRight className="h-4 w-4" />
                    How to access:
                  </p>
                  <p className="text-slate-200/80 mb-3">
                    Go to <code className="text-amber-300 font-mono bg-black/20 px-2 py-1 rounded">/r/referral?code=YOURCODE</code> using the code we sent you.
                  </p>
                  <p className="text-xs text-slate-300/70 mt-4 border-t border-white/10 pt-3">
                    Example: <code className="text-emerald-300 font-mono">https://peppiepep.vercel.app/r/referral?code=ABC123</code>
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}

        {code && !customer && (
          <Card className="border border-red-300/40 bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-xl p-8 text-white shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 shadow-lg">
                <Award className="h-7 w-7 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-black mb-2">Code Not Found</h2>
                <p className="text-red-100/90 mb-4">
                  We couldn't find an ambassador account for code: <code className="font-mono bg-black/20 px-2 py-1 rounded">{code}</code>
                </p>
                <p className="text-sm text-red-200/80">
                  Double-check the code or contact support to get your unique referral code.
                </p>
              </div>
            </div>
          </Card>
        )}

        {customer && (
          <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <div className="space-y-6">
              {/* Earnings Stats Card */}
              <Card className="border border-amber-400/30 bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-pink-500/10 backdrop-blur-xl p-8 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gradient-to-br from-amber-500/30 to-orange-500/30 blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-600 to-orange-600 shadow-lg">
                      <Trophy className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-amber-300 font-bold">Total Earnings</p>
                      <p className="text-3xl font-black text-white">${totalEarnings.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4 text-center">
                      <div className="text-3xl font-black text-emerald-400">{total}</div>
                      <div className="text-xs text-slate-300 mt-1 uppercase tracking-wide">Total Referrals</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4 text-center">
                      <div className="text-3xl font-black text-green-400">{earned}</div>
                      <div className="text-xs text-slate-300 mt-1 uppercase tracking-wide">Earned</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4 text-center">
                      <div className="text-3xl font-black text-amber-400">{pending}</div>
                      <div className="text-xs text-slate-300 mt-1 uppercase tracking-wide">Pending</div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl border border-emerald-300/40 bg-emerald-900/20 p-3 text-sm">
                    <p className="font-bold text-emerald-300 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      ${rewardAmount} per successful referral
                    </p>
                  </div>
                </div>
              </Card>

              {/* Share Your Link Card */}
              <Card className="border border-purple-400/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl p-8 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute -left-20 -bottom-20 h-48 w-48 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 blur-3xl" />
                <div className="relative space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg">
                      <Share2 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-purple-300 font-bold">Your Referral Link</p>
                      <p className="text-sm text-slate-200">Share and start earning ${rewardAmount} per friend</p>
                    </div>
                  </div>

                  {personalLink ? (
                    <>
                      <div className="rounded-2xl border border-emerald-300/40 bg-emerald-950/40 p-5">
                        <p className="font-mono text-sm text-emerald-200 mb-3 break-all leading-relaxed">{personalLink}</p>
                        <p className="text-xs text-emerald-300/80">
                          <Sparkles className="h-3 w-3 inline mr-1" />
                          Friends see: {offerText}
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <Button
                          onClick={copyToClipboard}
                          className="bg-white hover:bg-slate-100 text-slate-900 font-bold shadow-lg h-12"
                        >
                          {copiedLink ? (
                            <>
                              <Check className="h-4 w-4 mr-2" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4 mr-2" />
                              Copy
                            </>
                          )}
                        </Button>
                        <Button
                          onClick={shareViaEmail}
                          variant="outline"
                          className="border-purple-400/50 bg-purple-900/30 hover:bg-purple-900/50 text-white font-bold h-12"
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Email
                        </Button>
                        <Button
                          onClick={shareViaSMS}
                          variant="outline"
                          className="border-pink-400/50 bg-pink-900/30 hover:bg-pink-900/50 text-white font-bold h-12"
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          SMS
                        </Button>
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-slate-200/80 p-4 rounded-xl bg-white/5">
                      No referral code found for this ambassador.
                    </p>
                  )}
                </div>
              </Card>

              {/* Recent Activity */}
              <Card className="border border-slate-400/20 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl p-8 text-white shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-600 to-slate-700 shadow-lg">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-black">Recent Activity</h3>
                </div>

                {referrals.length === 0 ? (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
                    <Gift className="h-12 w-12 mx-auto text-slate-400 mb-3" />
                    <p className="text-slate-300 font-semibold mb-2">No referrals yet</p>
                    <p className="text-sm text-slate-400">Share your link above to start earning ${rewardAmount} per friend!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {referrals.map((referral) => {
                      const isEarned = referral.status === "earned";
                      return (
                        <div
                          key={referral.id}
                          className={`rounded-2xl border p-5 transition-all ${
                            isEarned
                              ? "border-emerald-400/40 bg-emerald-950/40"
                              : "border-amber-400/40 bg-amber-950/30"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3 mb-3">
                            <div className="flex-1">
                              <p className="font-bold text-white text-lg">
                                {referral.referred_name || "New Contact"}
                              </p>
                              <p className="text-sm text-slate-300">
                                {referral.referred_email || referral.referred_phone || "Awaiting contact info"}
                              </p>
                            </div>
                            <span
                              className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-wide shadow-lg ${
                                isEarned
                                  ? "bg-emerald-600 text-white"
                                  : "bg-amber-600 text-white"
                              }`}
                            >
                              {isEarned ? "✓ Earned" : referral.status || "Pending"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-400">
                            <span>
                              Created: {referral.created_at ? new Date(referral.created_at).toLocaleDateString() : "N/A"}
                            </span>
                            {referral.rewarded_at && (
                              <>
                                <span>•</span>
                                <span className="text-emerald-400 font-semibold">
                                  Rewarded: {new Date(referral.rewarded_at).toLocaleDateString()}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Card>
            </div>

            <div className="space-y-6">
              {/* How It Works */}
              <Card className="border border-pink-400/30 bg-gradient-to-br from-pink-600/20 via-purple-500/20 to-orange-400/20 backdrop-blur-xl p-8 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-pink-500/40 to-orange-500/40 blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-5 w-5 text-amber-300" />
                    <p className="text-xs uppercase tracking-wide text-amber-200 font-bold">How It Works</p>
                  </div>
                  <h3 className="text-2xl font-black mb-5">Turn Friends Into Cash</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-black text-sm shadow-lg">
                        1
                      </div>
                      <div>
                        <p className="font-bold text-white mb-1">Share Your Link</p>
                        <p className="text-sm text-slate-200/80">Copy and share via email, SMS, or social media</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-black text-sm shadow-lg">
                        2
                      </div>
                      <div>
                        <p className="font-bold text-white mb-1">Friend Signs Up</p>
                        <p className="text-sm text-slate-200/80">They get ${rewardAmount} credit automatically applied</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-black text-sm shadow-lg">
                        3
                      </div>
                      <div>
                        <p className="font-bold text-white mb-1">You Both Win</p>
                        <p className="text-sm text-slate-200/80">Earn ${rewardAmount} when they complete their purchase</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-emerald-300/40 bg-emerald-950/40 p-4">
                    <p className="font-black text-emerald-300 flex items-center gap-2">
                      <Trophy className="h-5 w-5" />
                      Unlimited Earning Potential
                    </p>
                    <p className="text-sm text-emerald-100/80 mt-1">
                      No cap on referrals. Share with 10 friends, earn ${rewardAmount * 10}. Share with 100, earn ${rewardAmount * 100}!
                    </p>
                  </div>
                </div>
              </Card>

              {/* Benefits Card */}
              <Card className="border border-amber-400/30 bg-gradient-to-br from-amber-600/10 to-orange-600/10 backdrop-blur-xl p-8 text-white shadow-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="h-5 w-5 text-amber-300" />
                  <p className="text-xs uppercase tracking-wide text-amber-200 font-bold">Your VIP Perks</p>
                </div>
                <h3 className="text-2xl font-black mb-5">Ambassador Benefits</h3>
                <div className="space-y-3">
                  <div className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-sm text-slate-200">
                      <span className="font-bold text-white">Real-time tracking</span> - Watch your earnings grow live
                    </p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-sm text-slate-200">
                      <span className="font-bold text-white">Personalized link</span> - Your unique code tracks every referral
                    </p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-sm text-slate-200">
                      <span className="font-bold text-white">Instant notifications</span> - Get alerted when friends sign up
                    </p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-sm text-slate-200">
                      <span className="font-bold text-white">Full transparency</span> - Every payout logged and verified
                    </p>
                  </div>
                </div>
              </Card>

              {/* Support Card */}
              <Card className="border border-emerald-400/30 bg-gradient-to-br from-emerald-600/10 to-teal-600/10 backdrop-blur-xl p-8 text-white shadow-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-5 w-5 text-emerald-300" />
                  <p className="text-xs uppercase tracking-wide text-emerald-200 font-bold">Need Help?</p>
                </div>
                <h4 className="text-xl font-black mb-3">Full Support & Transparency</h4>
                <p className="text-sm text-slate-200/90 mb-5">
                  Every referral and payout is logged securely. Questions about your earnings or referrals? We're here to help.
                </p>
                <Link href="/contact">
                  <Button className="w-full bg-white hover:bg-slate-100 text-slate-900 font-bold shadow-lg h-12">
                    Contact Support
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
