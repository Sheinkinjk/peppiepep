const DEFAULT_EMAIL_PARAGRAPH =
  "We’re opening a private ambassador lane for a handful of insiders. Every introduction you make is memorialized in your portal so offline referrals still count. Concierge teams know your name the moment a booking lands.";

type CampaignCopyArgs = {
  businessName: string;
  offerText?: string | null;
  clientRewardText?: string | null;
  newUserRewardText?: string | null;
};

type ResolveCampaignCopyArgs = CampaignCopyArgs & {
  channel: "sms" | "email";
  campaignMessage?: string | null;
};

export function buildDefaultEmailBody({
  businessName,
  offerText,
  clientRewardText,
  newUserRewardText,
}: CampaignCopyArgs) {
  const headerLine = offerText?.trim()
    ? offerText.trim()
    : `We’re inviting you into ${businessName} to help us host your VIP circle with concierge treatment.`;
  const rewardLine = clientRewardText && newUserRewardText
    ? `Every verified referral unlocks ${clientRewardText} for you while your friends enjoy ${newUserRewardText}.`
    : `Every verified referral unlocks premium rewards for you while your friends enjoy concierge treatment.`;
  return [headerLine, rewardLine, DEFAULT_EMAIL_PARAGRAPH].filter(Boolean).join("\n\n");
}

export function resolveEmailCampaignMessage({
  channel,
  campaignMessage,
  businessName,
  offerText,
  clientRewardText,
  newUserRewardText,
}: ResolveCampaignCopyArgs) {
  const trimmed = campaignMessage?.trim();
  if (channel === "email") {
    if (trimmed) {
      return trimmed;
    }
    return buildDefaultEmailBody({
      businessName,
      offerText,
      clientRewardText,
      newUserRewardText,
    });
  }

  return trimmed ?? "";
}
