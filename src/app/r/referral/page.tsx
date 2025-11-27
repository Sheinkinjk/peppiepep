import { Card } from "@/components/ui/card";
import { createServiceClient } from "@/lib/supabase";
import { Database } from "@/types/supabase";
import Link from "next/link";

type ReferralRecord =
  Database["public"]["Tables"]["referrals"]["Row"];

type CustomerRecord =
  Database["public"]["Tables"]["customers"]["Row"] & {
    business: Database["public"]["Tables"]["businesses"]["Row"] | null;
  };

export const dynamic = "force-dynamic";

export default async function ReferralStatsPage({
  searchParams,
}: {
  searchParams: { code?: string };
}) {
  const code = (searchParams.code || "").trim();
  const supabase = await createServiceClient();

  let customer: CustomerRecord | null = null;
  let referrals: ReferralRecord[] = [];

  if (code) {
    const { data } = await supabase
      .from("customers")
      .select("*, business:business_id(*)")
      .eq("referral_code", code)
      .single();
    customer = data ? (data as CustomerRecord) : null;

    if (customer) {
      const { data: referralRows } = await supabase
        .from("referrals")
        .select("*")
        .eq("ambassador_id", customer.id)
        .order("created_at", { ascending: false })
        .limit(20);
      referrals = referralRows || [];
    }
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://peppiepep.vercel.app";
  const rewardAmount =
    customer?.business?.reward_amount ?? 200;
  const offerText =
    customer?.business?.offer_text ??
    "VIP credit for every new customer you send";
  const personalLink =
    customer?.referral_code ? `${siteUrl}/r/${customer.referral_code}` : null;

  const total = referrals.length;
  const earned = referrals.filter((r) => r.status === "earned").length;
  const pending = referrals.filter((r) => r.status !== "earned").length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-14 lg:px-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-100">
            Pepform loyalty portal
          </div>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            Thank you for your loyalty to Pepform
          </h1>
          <p className="text-base text-slate-200/90 sm:text-lg">
            We are excited to be launching a loyalty program where you and your network
            receive great rewards: <span className="font-semibold text-white">${rewardAmount} each time you bring us business, and your friend also receives ${rewardAmount}.</span>
          </p>
        </div>

        {!code && (
          <Card className="border border-white/10 bg-white/5 p-6 text-white shadow-xl">
            <h2 className="text-xl font-semibold mb-2">See your live stats</h2>
            <p className="text-sm text-slate-200/80 mb-3">
              Add your referral code to the URL to view your personalized link and activity.
            </p>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
              <p className="mb-1 font-semibold text-white">How to view:</p>
              <p className="text-slate-200/80">
                Go to <code className="text-amber-200">/r/referral?code=YOURCODE</code> using the code we issued you.
              </p>
              <p className="mt-3 text-xs text-slate-300/80">
                Example: <code className="text-emerald-200">https://peppiepep.vercel.app/r/referral?code=ABC123</code>
              </p>
            </div>
          </Card>
        )}

        {code && !customer && (
          <Card className="border border-red-200/40 bg-red-500/10 p-6 text-white shadow-xl">
            <h2 className="text-xl font-semibold mb-2">Code not found</h2>
            <p className="text-sm text-red-100/90">
              We could not find an ambassador for this code. Double-check the code or contact support.
            </p>
          </Card>
        )}

        {customer && (
          <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            <div className="space-y-4">
              <Card className="border border-white/10 bg-white/5 p-6 text-white shadow-xl">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-300">
                      Your referral link
                    </p>
                    <p className="text-sm text-slate-100/90">
                      Share this with your network to earn ${rewardAmount} each time.
                    </p>
                  </div>
                </div>
                {personalLink ? (
                  <div className="mt-4 rounded-xl border border-emerald-300/40 bg-emerald-500/10 p-4 text-sm">
                    <p className="font-semibold text-white mb-2 break-all">{personalLink}</p>
                    <p className="text-xs text-emerald-100/80">
                      Friends see: {offerText}
                    </p>
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-slate-200/80">
                    No referral code found for this ambassador.
                  </p>
                )}
              </Card>

              <Card className="border border-white/10 bg-white/5 p-6 text-white shadow-xl">
                <div className="flex flex-wrap items-center gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-300">
                      Total referrals
                    </p>
                    <p className="text-2xl font-bold">{total}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-300">
                      Earned
                    </p>
                    <p className="text-2xl font-bold text-emerald-300">{earned}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-300">
                      Pending
                    </p>
                    <p className="text-2xl font-bold text-amber-200">{pending}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-300">
                      Reward per deal
                    </p>
                    <p className="text-2xl font-bold text-white">${rewardAmount}</p>
                  </div>
                </div>
              </Card>

              <Card className="border border-white/10 bg-white/5 p-6 text-white shadow-xl">
                <h3 className="text-lg font-semibold mb-3">Recent activity</h3>
                {referrals.length === 0 ? (
                  <p className="text-sm text-slate-200/80">No referrals yet. Share your link to get started.</p>
                ) : (
                  <div className="space-y-3">
                    {referrals.map((referral) => (
                      <div
                        key={referral.id}
                        className="rounded-lg border border-white/10 bg-white/5 p-4"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <p className="font-semibold text-white">
                              {referral.referred_name || "New contact"}
                            </p>
                            <p className="text-xs text-slate-300">
                              {referral.referred_email || referral.referred_phone || "Awaiting contact info"}
                            </p>
                          </div>
                          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-100">
                            {referral.status || "pending"}
                          </span>
                        </div>
                        <p className="mt-2 text-xs text-slate-300/80">
                          Created: {referral.created_at ? new Date(referral.created_at).toLocaleString() : "N/A"}
                          {referral.rewarded_at
                            ? ` • Rewarded: ${new Date(referral.rewarded_at).toLocaleString()}`
                            : ""}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>

            <div className="space-y-4">
              <Card className="border border-white/10 bg-gradient-to-br from-purple-600/30 via-pink-500/20 to-orange-400/20 p-6 text-white shadow-2xl">
                <p className="text-xs uppercase tracking-wide text-white/80">Your perks</p>
                <h3 className="mt-2 text-2xl font-bold">Bring business, earn $200</h3>
                <ul className="mt-3 space-y-2 text-sm text-white/90">
                  <li className="flex gap-2">
                    <span className="text-amber-200">•</span>
                    $200 for you, $200 for your friend on every new deal.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-amber-200">•</span>
                    Your link is personalized and tracked automatically.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-amber-200">•</span>
                    Rewards unlock when the deal is verified and paid.
                  </li>
                </ul>
              </Card>

              <Card className="border border-white/10 bg-white/5 p-6 text-white shadow-xl">
                <p className="text-xs uppercase tracking-wide text-emerald-200">
                  Need help?
                </p>
                <h4 className="mt-2 text-lg font-semibold">Support & transparency</h4>
                <p className="mt-2 text-sm text-slate-100/80">
                  Every referral and payout is logged in Supabase. If anything looks off,
                  contact us and we will review your activity log.
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100"
                >
                  Contact support
                </Link>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
