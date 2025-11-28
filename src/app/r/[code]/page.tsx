import { revalidatePath } from "next/cache";
import Link from "next/link";
import { Gift, Sparkles, TrendingUp, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createServiceClient } from "@/lib/supabase";
import { Database } from "@/types/supabase";

interface ReferralPageProps {
  params: { code: string };
}

export default async function ReferralPage({ params }: ReferralPageProps) {
  const supabase = await createServiceClient();

  const { data: customer } = await supabase
    .from("customers")
    .select("*, business:business_id(*)")
    .eq("referral_code", params.code)
    .single();

  if (!customer) {
    return (
      <div className="aurora flex min-h-screen items-center justify-center bg-gradient-to-b from-pink-50 via-white to-white p-4">
        <Card className="relative w-full max-w-md overflow-hidden rounded-2xl border border-red-200 bg-white/90 p-8 shadow-2xl backdrop-blur">
          <div className="absolute -right-12 -top-6 h-32 w-32 rounded-full bg-gradient-to-br from-red-500/20 to-orange-400/20 blur-3xl" />
          <h1 className="mb-2 text-3xl font-bold text-slate-900">Invalid Referral Link</h1>
          <p className="mb-6 text-lg leading-relaxed text-slate-700">
            This referral link is no longer valid or has expired. Please contact the person who sent you this link.
          </p>
          <Button asChild className="w-full">
            <Link href="/">Visit Pepform</Link>
          </Button>
        </Card>
      </div>
    );
  }

  type CustomerWithBusiness = Database["public"]["Tables"]["customers"]["Row"] & {
    business: Database["public"]["Tables"]["businesses"]["Row"] | null;
  };

  const customerWithBusiness = customer as CustomerWithBusiness;
  const offerText = customerWithBusiness.business?.offer_text || "$15 credit";
  const businessName = customerWithBusiness.business?.name || "our business";
  const rewardAmount = customerWithBusiness.business?.reward_amount || 15;

  // Get ambassador's stats
  const { data: referralStats } = await supabase
    .from("referrals")
    .select("*", { count: "exact" })
    .eq("ambassador_id", customerWithBusiness.id);

  const totalReferrals = referralStats?.length || 0;
  const ambassadorCredits = customerWithBusiness.credits || 0;

  async function submitReferral(formData: FormData) {
    "use server";
    const supabase = await createServiceClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any).from("referrals").insert([
      {
        business_id: customerWithBusiness.business_id,
        ambassador_id: customerWithBusiness.id,
        referred_name: formData.get("name")?.toString() ?? null,
        referred_phone: formData.get("phone")?.toString() ?? null,
        status: "pending",
      },
    ]);
    revalidatePath("/");
    // Optional: send SMS to ambassador "Your friend just used your link! Reward when they book"
  }

  return (
    <div className="aurora flex min-h-screen items-center justify-center bg-gradient-to-b from-pink-50 via-purple-50 to-white p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Ambassador Stats Banner */}
        <Card className="relative overflow-hidden rounded-2xl border border-purple-200/50 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 p-6 shadow-2xl">
          <div className="absolute -right-12 -top-6 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="relative flex items-center justify-between text-white">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5" />
                <h2 className="text-xl font-bold">Ambassador: {customerWithBusiness.name}</h2>
              </div>
              <p className="text-purple-100">Sharing rewards with friends!</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-black">{totalReferrals}</div>
              <div className="text-sm text-purple-100">Referrals</div>
            </div>
          </div>
        </Card>

        {/* Main Referral Card */}
        <Card className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/95 p-8 shadow-2xl backdrop-blur">
          <div className="absolute -right-12 -top-6 h-32 w-32 rounded-full bg-gradient-to-br from-pink-500/20 to-orange-400/20 blur-3xl" />
          <div className="absolute -left-10 bottom-0 h-24 w-24 rounded-full bg-gradient-to-tr from-purple-500/20 to-sky-500/20 blur-3xl" />

          <div className="relative">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-4 py-1.5 text-sm font-semibold text-white">
              <Gift className="h-4 w-4" />
              Exclusive Offer
            </div>

            <h1 className="mb-3 text-4xl font-black text-slate-900">
              You&rsquo;ve Been Hooked Up!
            </h1>

            <p className="mb-8 text-xl leading-relaxed text-slate-700">
              {customerWithBusiness.name} is sharing an exclusive offer with you! Get{" "}
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-orange-600">
                {offerText}
              </span>{" "}
              at{" "}
              <span className="font-bold text-slate-900">{businessName}</span>.
            </p>

            {/* Rewards Info Cards */}
            <div className="mb-8 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-gradient-to-br from-pink-50 to-orange-50 p-4 border border-pink-200/50">
                <div className="flex items-center gap-2 mb-2">
                  <Gift className="h-5 w-5 text-pink-600" />
                  <div className="text-sm font-semibold text-slate-600">Your Reward</div>
                </div>
                <div className="text-2xl font-black text-slate-900">{offerText}</div>
              </div>

              <div className="rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 p-4 border border-purple-200/50">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  <div className="text-sm font-semibold text-slate-600">Their Reward</div>
                </div>
                <div className="text-2xl font-black text-slate-900">${rewardAmount} credit</div>
              </div>
            </div>

            {/* Ambassador Stats */}
            <div className="mb-8 rounded-xl bg-slate-50 p-4 border border-slate-200">
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-5 w-5 text-slate-600" />
                <h3 className="font-bold text-slate-900">Why {customerWithBusiness.name} loves us</h3>
              </div>
              <div className="flex gap-6">
                <div>
                  <div className="text-2xl font-black text-slate-900">{totalReferrals}</div>
                  <div className="text-sm text-slate-600">Friends Referred</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-emerald-600">${ambassadorCredits}</div>
                  <div className="text-sm text-slate-600">Credits Earned</div>
                </div>
              </div>
            </div>

            <form action={submitReferral} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-base font-semibold">Your Name</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="Enter your full name"
                  className="mt-2 h-12 text-base"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-base font-semibold">Your Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+61 400 000 000"
                  className="mt-2 h-12 text-base"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-14 text-lg font-bold bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-700 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all"
              >
                <Gift className="mr-2 h-5 w-5" />
                Claim My {offerText}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              ✨ You&rsquo;ll receive a confirmation SMS shortly with booking details
            </p>
          </div>
        </Card>

        {/* How It Works */}
        <Card className="rounded-2xl border border-slate-200/50 bg-white/80 p-6 shadow-lg backdrop-blur">
          <h3 className="mb-4 text-lg font-bold text-slate-900">How This Works</h3>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-white font-bold text-xs">1</div>
              <p><strong>You claim your {offerText}</strong> by submitting your details above</p>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-white font-bold text-xs">2</div>
              <p><strong>Book your appointment</strong> at {businessName}</p>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-white font-bold text-xs">3</div>
              <p><strong>{customerWithBusiness.name} gets ${rewardAmount} credit</strong> when you complete your booking!</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
