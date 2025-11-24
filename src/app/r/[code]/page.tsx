import { revalidatePath } from "next/cache";

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
  const supabase = createServiceClient();

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
  const offerText = customerWithBusiness.business?.offer_text || "an offer";
  const businessName = customerWithBusiness.business?.name || "our business";

  async function submitReferral(formData: FormData) {
    "use server";
    const supabase = createServiceClient();
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
    <div className="aurora flex min-h-screen items-center justify-center bg-gradient-to-b from-pink-50 via-white to-white p-4">
      <Card className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/70 bg-white/90 p-8 shadow-2xl backdrop-blur">
        <div className="absolute -right-12 -top-6 h-32 w-32 rounded-full bg-gradient-to-br from-pink-500/20 to-orange-400/20 blur-3xl" />
        <div className="absolute -left-10 bottom-0 h-24 w-24 rounded-full bg-gradient-to-tr from-purple-500/20 to-sky-500/20 blur-3xl" />
        <h1 className="mb-2 text-3xl font-bold text-slate-900">You’ve been hooked up!</h1>
        <p className="mb-6 text-lg leading-relaxed text-slate-700">
          {customerWithBusiness.name} wants you to get{" "}
          <span className="font-semibold text-slate-900">{offerText}</span> at{" "}
          <span className="font-semibold text-slate-900">{businessName}</span>.
        </p>

        <form action={submitReferral} className="space-y-4">
          <div>
            <Label htmlFor="name">Your name</Label>
            <Input id="name" name="name" required placeholder="Your full name" />
          </div>
          <div>
            <Label htmlFor="phone">Your phone (for booking)</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="+1 555 123 4567"
            />
          </div>

          <Button type="submit" size="lg" className="w-full">
            Claim My Offer
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          You’ll get a confirmation SMS shortly with booking details.
        </p>
      </Card>
    </div>
  );
}
import Link from "next/link";
