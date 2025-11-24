import { createServiceClient } from "@/lib/supabase";
import { Database } from "@/types/supabase";
import AmbassadorPortalClient from "@/components/AmbassadorPortalClient";

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
    <AmbassadorPortalClient
      customerName={customerAny.name}
      fullReferralLink={fullReferralLink}
      pending={pending}
      completed={completed}
      earned={earned}
      whatsappUrl={whatsappUrl}
      smsUrl={smsUrl}
      instagramUrl={instagramUrl}
      facebookUrl={facebookUrl}
    />
  );
}
