import { Card } from "@/components/ui/card";
import { createServiceClient } from "@/lib/supabase";
import { Database } from "@/types/supabase";

interface AmbassadorPortalProps {
  params: { code: string };
}

export default async function AmbassadorPortal({ params }: AmbassadorPortalProps) {
  const supabase = createServiceClient();

  const { data: customer } = await supabase
    .from("customers")
    .select(
      `
        *,
        business:business_id (*),
        referrals:referrals!ambassador_id (*)
      `,
    )
    .eq("referral_code", params.code)
    .single();

  if (!customer) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="rounded-xl bg-white p-10 text-center shadow-lg">
          <h1 className="text-2xl font-bold text-red-600">
            Invalid ambassador link
          </h1>
        </div>
      </div>
    );
  }

  const customerAny = customer as any;

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  const fullReferralLink = `${siteUrl}/r/${customerAny.referral_code}`;

  const referrals =
    (customerAny.referrals as Database["public"]["Tables"]["referrals"]["Row"][]) || [];

  const pending = referrals.filter((r) => r.status === "pending").length || 0;
  const completed =
    referrals.filter((r) => r.status === "completed").length || 0;
  const earned = customerAny.credits || 0;

  const offerText = customerAny.business?.offer_text || "an offer";
  const businessName = customerAny.business?.name || "our business";

  const shareText = encodeURIComponent(
    `Hey! ${customerAny.name || "A friend"} hooked you up – get ${offerText} at ${businessName} 👇`,
  );
  const whatsappUrl = `https://wa.me/?text=${shareText}%20${encodeURIComponent(fullReferralLink)}`;
  const smsUrl = `sms:?body=${shareText}%20${encodeURIComponent(fullReferralLink)}`;
  const instagramUrl = `https://www.instagram.com/?url=${encodeURIComponent(fullReferralLink)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullReferralLink)}`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-pink-50 to-white p-6">
      <Card className="w-full max-w-md p-8 shadow-xl">
        <h1 className="mb-2 text-3xl font-bold">Hey {customerAny.name}!</h1>
        <p className="mb-8 text-lg text-gray-600">
          Your personal ambassador portal
        </p>

        <div className="space-y-6">
          <div>
            <p className="mb-2 font-semibold">Your magic link</p>
            <div className="break-all rounded-lg bg-gray-100 p-4 font-mono text-sm">
              {fullReferralLink}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="rounded-lg border bg-white p-4">
              <div className="text-3xl font-bold text-purple-600">
                {pending + completed}
              </div>
              <div className="text-sm text-gray-600">Total referrals</div>
            </div>
            <div className="rounded-lg border bg-white p-4">
              <div className="text-3xl font-bold text-green-600">
                {completed}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="rounded-lg border bg-white p-4">
              <div className="text-3xl font-bold text-blue-600">
                ${earned}
              </div>
              <div className="text-sm text-gray-600">Earned</div>
            </div>
          </div>

          <div>
            <p className="mb-4 font-semibold">Share with friends & earn more</p>
            <div className="grid grid-cols-2 gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg bg-green-500 py-4 text-center font-bold text-white transition hover:bg-green-600"
              >
                <span>WhatsApp</span>
              </a>

              <a
                href={smsUrl}
                className="rounded-lg bg-blue-500 py-4 text-center font-bold text-white transition hover:bg-blue-600"
              >
                SMS
              </a>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 py-4 text-center font-bold text-white transition hover:from-purple-700 hover:to-pink-700"
              >
                Instagram
              </a>

              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-blue-700 py-4 text-center font-bold text-white transition hover:bg-blue-800"
              >
                Facebook
              </a>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            Every time a friend books using your link → you get rewarded
            instantly
          </div>
        </div>
      </Card>
    </div>
  );
}
