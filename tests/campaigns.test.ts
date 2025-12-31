import { describe, expect, it } from "vitest";

import { buildCampaignMessages, buildCampaignSnapshot } from "@/lib/campaigns";
import { buildCampaignEmail } from "@/lib/campaign-email";
import { buildDefaultEmailBody, resolveEmailCampaignMessage } from "@/lib/campaign-copy";

const business = {
  name: "Glow Lounge",
  offer_text: "20% off",
  reward_type: "credit" as const,
  reward_amount: 25,
  new_user_reward_text: null,
  client_reward_text: null,
  upgrade_name: "VIP treatment",
  reward_terms: "Valid for 30 days",
  logo_url: "https://example.com/logo.png",
};

describe("campaign helpers", () => {
  it("builds snapshot fields with sensible defaults", () => {
    const snapshot = buildCampaignSnapshot(business);

    expect(snapshot.snapshot_offer_text).toBe("20% off");
    expect(snapshot.snapshot_reward_type).toBe("credit");
    expect(snapshot.snapshot_client_reward_text).toContain("$25");
    expect(snapshot.snapshot_logo_url).toBe("https://example.com/logo.png");
    expect(snapshot.snapshot_include_qr).toBe(true);
    expect(snapshot.snapshot_story_blocks).toBeTruthy();
    expect(snapshot.snapshot_story_blocks?.length).toBeGreaterThan(0);
  });

  it("creates SMS payloads and appends referral links when missing placeholder", () => {
    const scheduledAt = new Date().toISOString();
    const result = buildCampaignMessages({
      campaignId: "cmp_1",
      businessId: "biz_1",
      baseSiteUrl: "https://pepform.dev",
      campaignName: "VIP drop",
      campaignMessage: "Hi {{name}}, claim this now!",
      campaignChannel: "sms",
      scheduledAtIso: scheduledAt,
      customers: [
        {
          id: "cust_1",
          name: "Charlie",
          phone: "+61400000000",
          email: "charlie@example.com",
          referral_code: "abc123",
        },
        {
          id: "cust_2",
          name: "Dana",
          phone: null,
          email: "dana@example.com",
          referral_code: "def456",
        },
      ],
    });

    expect(result.messages).toHaveLength(1);
    expect(result.skipped).toBe(1);
    const message = result.messages[0];
    expect(message.channel).toBe("sms");
    expect(message.metadata.referral_code).toBe("abc123");
    expect(message.message_body).toMatch(/Your unique referral link:/);
    expect(message.message_body).toMatch(/Referral landing page:/);
    expect(message.referral_link).toContain("utm_campaign=cmp_1");
    expect(message.referral_link).toContain("utm_medium=sms");
    expect(message.metadata.ambassador_portal_url).toContain("/r/referral");
  });

  it("adds UTM source/content when provided", () => {
    const scheduledAt = new Date().toISOString();
    const { messages } = buildCampaignMessages({
      campaignId: "cmp_tracking",
      businessId: "biz_tracking",
      baseSiteUrl: "https://pepform.dev",
      campaignName: "Tracking Drop",
      campaignMessage: "Hi {{name}}",
      campaignChannel: "email",
      scheduledAtIso: scheduledAt,
      tracking: { utm_source: "dashboard", utm_content: "vip-invite" },
      customers: [
        {
          id: "cust_1",
          name: "Charlie",
          phone: "+61400000000",
          email: "charlie@example.com",
          referral_code: "abc123",
        },
      ],
    });

    expect(messages).toHaveLength(1);
    expect(messages[0].referral_link).toContain("utm_campaign=cmp_tracking");
    expect(messages[0].referral_link).toContain("utm_medium=email");
    expect(messages[0].referral_link).toContain("utm_source=dashboard");
    expect(messages[0].referral_link).toContain("utm_content=vip-invite");
  });

  it("creates email payloads only when an address and code exist", () => {
    const scheduledAt = new Date().toISOString();
    const { messages, skipped } = buildCampaignMessages({
      campaignId: "cmp_email",
      businessId: "biz_email",
      baseSiteUrl: "",
      campaignName: "Email drop",
      campaignMessage: "Hello {{name}} - {{referral_link}}",
      campaignChannel: "email",
      scheduledAtIso: scheduledAt,
      customers: [
        {
          id: "cust_e",
          name: "Eve",
          phone: null,
          email: "eve@example.com",
          referral_code: "code_e",
        },
        {
          id: "cust_missing",
          name: "Frank",
          phone: null,
          email: null,
          referral_code: "code_f",
        },
      ],
    });

    expect(messages).toHaveLength(1);
    expect(messages[0].to_address).toBe("eve@example.com");
    expect(messages[0].message_body).toContain("/r/code_e");
    expect(messages[0].message_body).not.toContain("Referral landing page:");
    expect(skipped).toBe(1);
  });

  it("propagates landing URLs from campaign selection through email rendering", async () => {
    const scheduledAt = new Date().toISOString();
    const baseSiteUrl = "https://peppiepep.vercel.app";
    const businessProfile = {
      ...business,
      name: "Peppie Salon",
    };
    const { messages, skipped } = buildCampaignMessages({
      campaignId: "cmp_flow",
      businessId: "biz_flow",
      baseSiteUrl,
      campaignName: "Ambassador drop",
      campaignMessage: "Hi {{name}}, share this {{referral_link}}",
      campaignChannel: "email",
      scheduledAtIso: scheduledAt,
      referralProjectSlug: "peppie",
      customers: [
        {
          id: "cust_flow",
          name: "Pat",
          phone: null,
          email: "pat@example.com",
          referral_code: "VIPFLOW",
        },
      ],
    });

    expect(skipped).toBe(0);
    expect(messages).toHaveLength(1);

    const message = messages[0];
    const landingUrl = message.metadata.referral_landing_url as string;
    expect(landingUrl).toContain("/referral?");
    expect(landingUrl).toContain("project=peppie");
    expect(landingUrl).toContain("code=VIPFLOW");
    expect(message.referral_link).toContain("utm_campaign=cmp_flow");
    expect(message.metadata.ambassador_portal_url).toContain("/r/referral");

    const snapshot = buildCampaignSnapshot(businessProfile);
    const email = await buildCampaignEmail({
      businessName: businessProfile.name,
      siteUrl: baseSiteUrl,
      campaignName: "Ambassador drop",
      textBody: message.message_body,
      referralLink: message.referral_link,
      referralLandingUrl: landingUrl,
      ambassadorPortalUrl: message.metadata.ambassador_portal_url as string,
      brand: {
        logoUrl: snapshot.snapshot_logo_url,
        highlightColor: "#2563eb",
        tone: "modern",
      },
      snapshot: {
        newUserRewardText: snapshot.snapshot_new_user_reward_text,
        clientRewardText: snapshot.snapshot_client_reward_text,
        rewardType: snapshot.snapshot_reward_type,
        rewardAmount: snapshot.snapshot_reward_amount,
        upgradeName: snapshot.snapshot_upgrade_name,
        rewardTerms: snapshot.snapshot_reward_terms,
        logoUrl: snapshot.snapshot_logo_url,
        storyBlocks: snapshot.snapshot_story_blocks,
      },
    });

    const escapedLandingUrl = landingUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const landingOccurrences =
      email.html.match(new RegExp(`href="${escapedLandingUrl}"`, "g")) ?? [];
    expect(landingOccurrences.length).toBeGreaterThanOrEqual(2);
    expect(email.html).toContain(`href="${message.metadata.ambassador_portal_url}`);
    expect(email.html).toContain("Ambassador spotlight");
  });

  it("applies brand highlight color and tone-specific typography", async () => {
    const toneSnapshot = buildCampaignSnapshot({
      ...business,
      logo_url: "https://example.com/brand.png",
    });
    const email = await buildCampaignEmail({
      businessName: "Serene Atelier",
      siteUrl: "https://serene.example",
      campaignName: "VIP Atelier Drop",
      textBody: "Line one\nLine two",
      referralLink: "https://serene.example/r/vip",
      referralLandingUrl: "https://serene.example/referral?code=VIP",
      ambassadorPortalUrl: "https://serene.example/r/referral",
      brand: {
        logoUrl: toneSnapshot.snapshot_logo_url,
        highlightColor: "#0EA5E9",
        tone: "luxury",
      },
      snapshot: {
        newUserRewardText: toneSnapshot.snapshot_new_user_reward_text,
        clientRewardText: toneSnapshot.snapshot_client_reward_text,
        rewardType: toneSnapshot.snapshot_reward_type,
        rewardAmount: toneSnapshot.snapshot_reward_amount,
        upgradeName: toneSnapshot.snapshot_upgrade_name,
        rewardTerms: toneSnapshot.snapshot_reward_terms,
        logoUrl: toneSnapshot.snapshot_logo_url,
        storyBlocks: [
          {
            type: "faq",
            title: "Concierge Q&A",
            items: [
              {
                question: "Is there a limit?",
                answer: "Never - the concierge tracks every introduction.",
              },
            ],
          },
        ],
      },
    });

    expect(email.html).toContain("#0ea5e9 60%");
    expect(email.html).toMatch(/font-family:\s*'Georgia'/);
    expect(email.html).toContain("Concierge Q&amp;A");
    expect(email.html).toContain("Never - the concierge tracks every introduction.");
  });

  it("omits the QR module when disabled in the snapshot", async () => {
    const qrSnapshot = buildCampaignSnapshot({
      ...business,
      name: "No QR",
    });
    qrSnapshot.snapshot_include_qr = false;
    const email = await buildCampaignEmail({
      businessName: "No QR",
      siteUrl: "https://noqr.example",
      campaignName: "Concierge Drop",
      textBody: "Body copy",
      referralLink: "https://noqr.example/r/EXAMPLE",
      referralLandingUrl: "https://noqr.example/referral?code=EXAMPLE",
      ambassadorPortalUrl: "https://noqr.example/r/referral",
      brand: {
        logoUrl: qrSnapshot.snapshot_logo_url,
      },
      includeQrCode: qrSnapshot.snapshot_include_qr !== false,
      snapshot: {
        newUserRewardText: qrSnapshot.snapshot_new_user_reward_text,
        clientRewardText: qrSnapshot.snapshot_client_reward_text,
        rewardType: qrSnapshot.snapshot_reward_type,
        rewardAmount: qrSnapshot.snapshot_reward_amount,
        upgradeName: qrSnapshot.snapshot_upgrade_name,
        rewardTerms: qrSnapshot.snapshot_reward_terms,
        logoUrl: qrSnapshot.snapshot_logo_url,
        storyBlocks: qrSnapshot.snapshot_story_blocks,
        includeQr: qrSnapshot.snapshot_include_qr,
      },
    });

    expect(email.html).not.toContain("Scan on mobile to claim instantly");
    expect(email.html).toContain("Share Your Link Now");
  });

  it("falls back to the default email body when no custom copy is provided", () => {
    const defaultBody = buildDefaultEmailBody({
      businessName: business.name,
      offerText: business.offer_text,
      clientRewardText: "$25 credit",
      newUserRewardText: "complimentary blowout",
    });

    const resolved = resolveEmailCampaignMessage({
      channel: "email",
      campaignMessage: "",
      businessName: business.name,
      offerText: business.offer_text,
      clientRewardText: "$25 credit",
      newUserRewardText: "complimentary blowout",
    });

    expect(resolved).toBe(defaultBody);
    expect(resolved).toContain("complimentary blowout");
  });
});
