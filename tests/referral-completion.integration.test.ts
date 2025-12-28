import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createClient } from "@supabase/supabase-js";
import { nanoid } from "nanoid";

import { completeReferralAttribution } from "@/lib/referral-revenue";
import type { Database } from "@/types/supabase";

const TEST_SUPABASE_URL = process.env.TEST_SUPABASE_URL;
const TEST_SUPABASE_SERVICE_KEY = process.env.TEST_SUPABASE_SERVICE_ROLE_KEY;
const hasSupabaseTestEnv = Boolean(TEST_SUPABASE_URL && TEST_SUPABASE_SERVICE_KEY);
const adminClient = hasSupabaseTestEnv
  ? createClient<Database>(TEST_SUPABASE_URL as string, TEST_SUPABASE_SERVICE_KEY as string)
  : null;

(hasSupabaseTestEnv ? describe : describe.skip)("dashboard Step 5 - Manual completion (integration)", () => {
  const namespace = `test_referral_completion_${Date.now()}`;
  const ownerEmail = `${namespace}_owner@peppiepep.dev`;
  const ownerPassword = `Passw0rd!${nanoid(6)}`;

  let ownerId: string | undefined;
  let businessId: string | undefined;
  let ambassadorId: string | undefined;
  let referralId: string | undefined;

  beforeAll(async () => {
    if (!adminClient) throw new Error("Admin client not configured");

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
        name: `Test Business ${namespace}`,
        offer_text: "10% off",
        reward_type: "credit",
        reward_amount: 25,
      })
      .select("id, reward_type, reward_amount")
      .single();

    if (bizError || !business?.id) {
      throw new Error(`Failed to create business: ${bizError?.message ?? "no row returned"}`);
    }
    businessId = business.id;

    const { data: ambassador, error: ambassadorError } = await adminClient
      .from("customers")
      .insert({
        business_id: businessId,
        name: `Ambassador ${namespace}`,
        email: `${namespace}@example.com`,
        referral_code: nanoid(10),
        status: "active",
        credits: 0,
      })
      .select("id")
      .single();

    if (ambassadorError || !ambassador?.id) {
      throw new Error(`Failed to create ambassador: ${ambassadorError?.message ?? "no row returned"}`);
    }
    ambassadorId = ambassador.id;

    const { data: referral, error: referralError } = await adminClient
      .from("referrals")
      .insert({
        business_id: businessId,
        ambassador_id: ambassadorId,
        referred_name: "Manual Completion Test",
        status: "pending",
        created_by: ownerId,
        consent_given: true,
        locale: "en",
      })
      .select("id")
      .single();

    if (referralError || !referral?.id) {
      throw new Error(`Failed to create referral: ${referralError?.message ?? "no row returned"}`);
    }
    referralId = referral.id;
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

  it("marks a referral completed, credits the ambassador, and logs a conversion event", async () => {
    if (!adminClient) throw new Error("Admin client not configured");
    if (!businessId || !ambassadorId || !referralId) throw new Error("Missing IDs");

    const transactionDate = new Date().toISOString();

    await completeReferralAttribution({
      supabase: adminClient,
      referralId,
      businessId,
      ambassadorId,
      transactionValue: 123.45,
      transactionDate,
      rewardType: "credit",
      rewardAmount: 25,
      serviceType: "dashboard",
    });

    const { data: updatedReferral, error: referralFetchError } = await adminClient
      .from("referrals")
      .select("status, transaction_value, transaction_date, rewarded_at, service_type")
      .eq("id", referralId)
      .single();

    expect(referralFetchError).toBeNull();
    expect(updatedReferral?.status).toBe("completed");
    expect(updatedReferral?.transaction_value).toBe(123.45);
    expect(updatedReferral?.transaction_date).toBe(transactionDate);
    expect(updatedReferral?.rewarded_at).toBeTruthy();
    expect(updatedReferral?.service_type).toBe("dashboard");

    const { data: updatedCustomer, error: customerFetchError } = await adminClient
      .from("customers")
      .select("credits")
      .eq("id", ambassadorId)
      .single();

    expect(customerFetchError).toBeNull();
    expect(updatedCustomer?.credits).toBe(25);

    const { data: events, error: eventsError } = await adminClient
      .from("referral_events")
      .select("event_type, referral_id")
      .eq("business_id", businessId)
      .eq("referral_id", referralId);

    expect(eventsError).toBeNull();
    expect((events ?? []).some((e) => e.event_type === "conversion_completed")).toBe(true);
  });
});

