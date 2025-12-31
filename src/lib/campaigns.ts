import type { Database } from "@/types/supabase";
import { detectCountryFromPhone, normalizePhoneNumber } from "@/lib/phone-utils";

export type SnapshotStoryBlock =
  | {
      type: "testimonial";
      eyebrow?: string | null;
      quote: string;
      author?: string | null;
      credential?: string | null;
    }
  | {
      type: "reward_calculator";
      title?: string | null;
      description?: string | null;
      entries: Array<{ label: string; value: string }>;
      footer?: string | null;
    }
  | {
      type: "faq";
      title?: string | null;
      items: Array<{ question: string; answer: string }>;
    };

type BusinessSnapshotSource = Pick<
  Database["public"]["Tables"]["businesses"]["Row"],
  | "name"
  | "offer_text"
  | "reward_type"
  | "reward_amount"
  | "new_user_reward_text"
  | "client_reward_text"
  | "upgrade_name"
  | "reward_terms"
> & {
  logo_url?: string | null;
};

function buildDefaultStoryBlocks(
  business: BusinessSnapshotSource,
  newUserReward: string | null,
  clientReward: string | null,
): SnapshotStoryBlock[] {
  const businessName = business.name?.trim() || "our studio";
  const heroReward = clientReward || "a premium thank-you reward";
  const friendReward = newUserReward || business.offer_text || "a VIP welcome credit";
  const rewardTypeLabel =
    business.reward_type === "upgrade"
      ? business.upgrade_name || "complimentary upgrade"
      : clientReward || "VIP reward";

  return [
    {
      type: "testimonial",
      eyebrow: "Ambassador spotlight",
      quote: `"${businessName} made it effortless to share ${friendReward}. Every introduction feels like gifting my inner circle a VIP pass."`,
      author: "Private ambassador",
      credential: "Top referrer this season",
    },
    {
      type: "reward_calculator",
      title: "Reward runway",
      description: `Every introduction unlocks ${heroReward}. Multiply it as your network leans in.`,
      entries: [
        { label: "1 friend this month", value: heroReward },
        { label: "3 friends", value: `3 x ${heroReward}` },
        {
          label: "10+ friends",
          value: `Concierge recognition + elevated perks at ${businessName}`,
        },
      ],
      footer: `Friends receive ${friendReward} so you look like the hero.`,
    },
    {
      type: "faq",
      title: "Questions we get",
      items: [
        {
          question: "When do rewards drop?",
          answer: `Rewards release as soon as your referral books or completes their first visit at ${businessName}.`,
        },
        {
          question: "What do my friends experience?",
          answer: friendReward
            ? `They enjoy ${friendReward} automatically stamped to your name.`
            : "We send a premium welcome gift made clear in your landing page.",
        },
        {
          question: "Where do I track it?",
          answer:
            "Your ambassador portal shows every click, booking, and payout in real time so offline introductions count too.",
        },
        {
          question: "Is there a cap?",
          answer: `We designed this as an open runway - keep introducing people you love and the ${rewardTypeLabel} keeps flowing.`,
        },
      ],
    },
  ];
}

type CampaignCustomer = Pick<
  Database["public"]["Tables"]["customers"]["Row"],
  "id" | "name" | "phone" | "email" | "referral_code"
>;

export type CampaignMessagePayload = {
  campaign_id: string;
  business_id: string;
  customer_id: string;
  channel: "sms" | "email";
  to_address: string;
  referral_link: string;
  message_body: string;
  metadata: Record<string, unknown>;
  scheduled_at: string;
};

type BuildCampaignMessagesArgs = {
  campaignId: string;
  businessId: string;
  baseSiteUrl: string;
  campaignName: string;
  campaignMessage: string;
  campaignChannel: "sms" | "email";
  customers: CampaignCustomer[];
  scheduledAtIso: string;
  referralProjectSlug?: string | null;
  tracking?: {
    utm_source?: string | null;
    utm_content?: string | null;
  } | null;
  emailSubject?: string | null;
  emailPreheader?: string | null;
  senderName?: string | null;
  replyTo?: string | null;
};

export function buildCampaignSnapshot(business: BusinessSnapshotSource) {
  const snapshotRewardAmount = business.reward_amount ?? 0;
  const snapshotRewardType =
    (business.reward_type as "credit" | "upgrade" | "discount" | "points" | null) ?? "credit";
  const snapshotNewUserReward = business.new_user_reward_text || business.offer_text || null;
  const snapshotClientReward =
    business.client_reward_text ||
    (snapshotRewardType === "credit"
      ? `$${snapshotRewardAmount} credit`
      : snapshotRewardType === "upgrade"
      ? business.upgrade_name || "a free upgrade"
      : snapshotRewardType === "discount"
      ? `${snapshotRewardAmount}% discount`
      : snapshotRewardType === "points"
      ? `${snapshotRewardAmount || 100} points`
      : null);
  const storyBlocks = buildDefaultStoryBlocks(business, snapshotNewUserReward, snapshotClientReward);

  return {
    snapshot_offer_text: business.offer_text ?? null,
    snapshot_new_user_reward_text: snapshotNewUserReward,
    snapshot_client_reward_text: snapshotClientReward,
    snapshot_reward_type: snapshotRewardType,
    snapshot_reward_amount: business.reward_amount ?? null,
    snapshot_upgrade_name: business.upgrade_name ?? null,
    snapshot_reward_terms: business.reward_terms ?? null,
    snapshot_logo_url: business.logo_url ?? null,
    snapshot_story_blocks: storyBlocks,
    snapshot_include_qr: true,
  };
}

function normalizeTrackingParams(rawTracking: string) {
  if (!rawTracking) return "";
  return rawTracking.startsWith("?") ? rawTracking.slice(1) : rawTracking;
}

export function buildReferralUrls(
  baseSiteUrl: string,
  referralCode: string,
  campaignTracking: string,
  referralProjectSlug?: string | null,
) {
  const normalizedBase = (baseSiteUrl ?? "").replace(/\/$/, "");
  const trackingParams = normalizeTrackingParams(campaignTracking);
  const trackingSuffix = trackingParams ? `?${trackingParams}` : "";
  const referralBase = `${normalizedBase}/r/${referralCode}`;
  const referralLandingParams = new URLSearchParams();
  referralLandingParams.set("code", referralCode);
  if (referralProjectSlug) {
    referralLandingParams.set("project", referralProjectSlug);
  }
  const referralLandingBase = `${normalizedBase}/referral`;
  const referralLandingUrl = `${referralLandingBase}?${referralLandingParams.toString()}${
    trackingParams ? `&${trackingParams}` : ""
  }`;
  return {
    personalReferralUrl: `${referralBase}${trackingSuffix}`,
    referralLandingUrl,
    ambassadorPortalUrl: `${normalizedBase}/r/referral?code=${referralCode}`,
  };
}

function personalizeMessage(
  template: string,
  referralLink: string,
  referralLandingUrl: string,
  customerName?: string | null,
) {
  const includesPlaceholder = template.includes("{{referral_link}}");
  let message = template.replace(/\{\{name\}\}/g, customerName || "there");
  message = message.replace(/\{\{referral_link\}\}/g, referralLink);

  if (!includesPlaceholder && referralLink) {
    message += `\n\nYour unique referral link: ${referralLink}`;
  }

  if (!includesPlaceholder && referralLandingUrl) {
    message += `\nReferral landing page: ${referralLandingUrl}`;
  }

  return message;
}

export function buildCampaignMessages({
  campaignId,
  businessId,
  baseSiteUrl,
  campaignName,
  campaignMessage,
  campaignChannel,
  customers,
  scheduledAtIso,
  referralProjectSlug,
  tracking,
  emailSubject,
  emailPreheader,
  senderName,
  replyTo,
}: BuildCampaignMessagesArgs): { messages: CampaignMessagePayload[]; skipped: number } {
  const messages: CampaignMessagePayload[] = [];
  let skipped = 0;
  const trackingParams = new URLSearchParams();
  if (campaignChannel === "sms" || campaignChannel === "email") {
    trackingParams.set("utm_campaign", campaignId);
    trackingParams.set("utm_medium", campaignChannel);
  }
  if (tracking?.utm_source) trackingParams.set("utm_source", tracking.utm_source);
  if (tracking?.utm_content) trackingParams.set("utm_content", tracking.utm_content);
  const trackingSuffix = trackingParams.toString();

  for (const customer of customers) {
    const referralCode = customer.referral_code;
    if (!referralCode) {
      skipped++;
      continue;
    }

    const {
      personalReferralUrl,
      referralLandingUrl,
      ambassadorPortalUrl,
    } = buildReferralUrls(
      baseSiteUrl,
      referralCode,
      trackingSuffix,
      referralProjectSlug,
    );

    const messageBody = personalizeMessage(
      campaignMessage,
      personalReferralUrl,
      referralLandingUrl,
      customer.name,
    );
    const metadata = {
      customer_name: customer.name,
      referral_code: referralCode,
      ambassador_portal_url: ambassadorPortalUrl,
      referral_landing_url: referralLandingUrl,
      personal_referral_url: personalReferralUrl,
      campaign_name: campaignName,
      ...(emailSubject ? { email_subject: emailSubject } : {}),
      ...(emailPreheader ? { email_preheader: emailPreheader } : {}),
      ...(senderName ? { sender_name: senderName } : {}),
      ...(replyTo ? { reply_to: replyTo } : {}),
    };

    if (campaignChannel === "sms") {
      if (!customer.phone) {
        skipped++;
        continue;
      }
      const detectedCountry = detectCountryFromPhone(customer.phone);
      const normalizedPhone = normalizePhoneNumber(
        customer.phone,
        detectedCountry === "US" ? "US" : "AU",
      );
      if (!normalizedPhone) {
        skipped++;
        continue;
      }

      messages.push({
        campaign_id: campaignId,
        business_id: businessId,
        customer_id: customer.id,
        channel: "sms",
        to_address: normalizedPhone,
        referral_link: personalReferralUrl,
        message_body: messageBody,
        metadata,
        scheduled_at: scheduledAtIso,
      });
      continue;
    }

    if (!customer.email) {
      skipped++;
      continue;
    }

    messages.push({
      campaign_id: campaignId,
      business_id: businessId,
      customer_id: customer.id,
      channel: "email",
      to_address: customer.email,
      referral_link: personalReferralUrl,
      message_body: messageBody,
      metadata,
      scheduled_at: scheduledAtIso,
    });
  }

  return { messages, skipped };
}
