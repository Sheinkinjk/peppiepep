import { beforeAll, afterAll, describe, expect, it } from "vitest";
import { createClient } from "@supabase/supabase-js";
import { nanoid } from "nanoid";

import { recordReferralSubmission } from "@/lib/referrals";
import { completeReferralAttribution } from "@/lib/referral-revenue";
import type { Database } from "@/types/supabase";

// Safety: only run when a dedicated TEST Supabase project is explicitly configured.
const TEST_SUPABASE_URL = process.env.TEST_SUPABASE_URL;
const TEST_SUPABASE_SERVICE_KEY = process.env.TEST_SUPABASE_SERVICE_ROLE_KEY;
const hasSupabaseTestEnv = Boolean(TEST_SUPABASE_URL && TEST_SUPABASE_SERVICE_KEY);
const adminClient = hasSupabaseTestEnv
  ? createClient<Database>(TEST_SUPABASE_URL as string, TEST_SUPABASE_SERVICE_KEY as string)
  : null;

(hasSupabaseTestEnv ? describe : describe.skip)("referral revenue attribution", () => {
  const namespace = `referral_revenue_${Date.now()}`;
  const ownerEmail = `${namespace}_owner@peppiepep.dev`;
  const ownerPassword = `Passw0rd!${nanoid(6)}`;

  let ownerId: string | undefined;
  let businessId: string | undefined;
  let ambassadorId: string | undefined;

  beforeAll(async () => {
    if (!adminClient) {
      throw new Error("Admin client not configured");
    }

    const { data: ownerData, error: ownerError } = await adminClient.auth.admin.createUser({
      email: ownerEmail,
      password: ownerPassword,
      email_confirm: true,
    });

    if (ownerError || !ownerData?.user) {
      throw new Error(`Failed to create test owner: ${ownerError?.message}`);
    }

    ownerId = ownerData.user.id;

    const { data: business, error: bizError } = await adminClient
      .from("businesses")
      .insert({
        owner_id: ownerId,
        name: `Revenue Biz ${namespace}`,
        offer_text: "Free treatment",
        reward_type: "credit",
        reward_amount: 40,
      })
      .select()
      .single();

    if (bizError || !business) {
      throw new Error(`Failed to create business: ${bizError?.message}`);
    }

    businessId = business.id;

    const { data: ambassador, error: ambassadorError } = await adminClient
      .from("customers")
      .insert({
        business_id: business.id,
        name: `Revenue Ambassador ${namespace}`,
        email: `${namespace}@example.com`,
        referral_code: nanoid(10),
        status: "active",
        credits: 0,
      })
      .select()
      .single();

    if (ambassadorError || !ambassador) {
      throw new Error(`Failed to create ambassador: ${ambassadorError?.message}`);
    }

    ambassadorId = ambassador.id;
  });

  afterAll(async () => {
    if (businessId && adminClient) {
      await adminClient.from("referral_events").delete().eq("business_id", businessId);
      await adminClient.from("referrals").delete().eq("business_id", businessId);
      await adminClient.from("customers").delete().eq("business_id", businessId);
      await adminClient.from("businesses").delete().eq("id", businessId);
    }

    if (ownerId && adminClient) {
      await adminClient.auth.admin.deleteUser(ownerId);
    }
  });

  it("awards credits and records revenue when a referral converts", async () => {
    if (!adminClient || !businessId || !ambassadorId) {
      throw new Error("Test setup failed");
    }

    const referralRow = await recordReferralSubmission({
      supabase: adminClient,
      businessId,
      ambassadorId,
      consentGiven: true,
      referredName: "High Value Guest",
      referredPhone: "+61400000001",
    });

    const transactionValue = 325.5;
    const transactionDate = new Date().toISOString();

    await completeReferralAttribution({
      supabase: adminClient,
      referralId: referralRow.id,
      businessId,
      ambassadorId,
      transactionValue,
      transactionDate,
      rewardType: "credit",
      rewardAmount: 40,
      serviceType: "Colour refresh",
    });

    const { data: updatedReferral, error: referralError } = await adminClient
      .from("referrals")
      .select("status, transaction_value, rewarded_at")
      .eq("id", referralRow.id)
      .single();

    expect(referralError).toBeNull();
    expect(updatedReferral?.status).toBe("completed");
    expect(updatedReferral?.transaction_value).toBeCloseTo(transactionValue);
    expect(updatedReferral?.rewarded_at).toBeTruthy();

    const { data: ambassador, error: ambassadorError } = await adminClient
      .from("customers")
      .select("credits")
      .eq("id", ambassadorId)
      .single();

    expect(ambassadorError).toBeNull();
    expect(ambassador?.credits).toBeGreaterThanOrEqual(40);

    const { data: eventRows, error: eventsError } = await adminClient
      .from("referral_events")
      .select("event_type")
      .eq("referral_id", referralRow.id);

    expect(eventsError).toBeNull();
    const eventTypes = (eventRows ?? []).map((event) => event.event_type);
    expect(eventTypes).toContain("conversion_completed");
    expect(eventTypes).toContain("payout_released");

    const { data: revenueRows } = await adminClient
      .from("referrals")
      .select("transaction_value")
      .eq("business_id", businessId);

    const totalRevenue =
      revenueRows?.reduce((sum, r) => sum + (r.transaction_value ?? 0), 0) ?? 0;
    expect(totalRevenue).toBeGreaterThanOrEqual(transactionValue);
  });
});
