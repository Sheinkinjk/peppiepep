import { beforeAll, afterAll, describe, expect, it } from "vitest";
import { createClient } from "@supabase/supabase-js";
import { nanoid } from "nanoid";

import { recordReferralSubmission } from "@/lib/referrals";
import type { Database } from "@/types/supabase";

const TEST_SUPABASE_URL = process.env.TEST_SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const TEST_SUPABASE_SERVICE_KEY =
  process.env.TEST_SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
const hasSupabaseTestEnv = Boolean(TEST_SUPABASE_URL && TEST_SUPABASE_SERVICE_KEY);
const adminClient = hasSupabaseTestEnv
  ? createClient<Database>(TEST_SUPABASE_URL as string, TEST_SUPABASE_SERVICE_KEY as string)
  : null;

(hasSupabaseTestEnv ? describe : describe.skip)("referral flow", () => {
  const namespace = `test_referral_${Date.now()}`;
  const ownerEmail = `${namespace}_owner@peppiepep.dev`;
  const ownerPassword = `Passw0rd!${nanoid(6)}`;

  let ownerId: string | undefined;
  let businessId: string | undefined;
  let ambassadorId: string | undefined;
  let referralCode: string | undefined;

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
        name: `Test Salon ${namespace}`,
        offer_text: "20% off",
        reward_type: "credit",
        reward_amount: 25,
      })
      .select()
      .single();

    if (bizError || !business) {
      throw new Error(`Failed to create test business: ${bizError?.message}`);
    }

    businessId = business.id;

    referralCode = nanoid(10);
    const { data: ambassador, error: ambassadorError } = await adminClient
      .from("customers")
      .insert({
        business_id: businessId,
        name: `Ambassador ${namespace}`,
        email: `${namespace}@example.com`,
        referral_code: referralCode,
        status: "active",
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
      await adminClient.from("referrals").delete().eq("business_id", businessId);
      await adminClient.from("customers").delete().eq("business_id", businessId);
      await adminClient.from("businesses").delete().eq("id", businessId);
    }

    if (ownerId && adminClient) {
      await adminClient.auth.admin.deleteUser(ownerId);
    }
  });

  it("records a referral when a new customer signs up via ambassador link", async () => {
    if (!adminClient) {
      throw new Error("Admin client not configured");
    }

    if (!businessId || !ambassadorId || !referralCode) {
      throw new Error("Test setup failed. Missing IDs.");
    }

    const referredName = `Referral ${namespace}`;
    const referredPhone = "+61400000000";

    const referralRow = await recordReferralSubmission({
      supabase: adminClient,
      businessId,
      ambassadorId,
      consentGiven: true,
      locale: "en",
      referredName,
      referredPhone,
    });

    expect(referralRow.ambassador_id).toBe(ambassadorId);
    expect(referralRow.business_id).toBe(businessId);
    expect(referralRow.referred_name).toBe(referredName);
    expect(referralRow.referred_phone).toBe(referredPhone);

    const { count, error } = await adminClient
      .from("referrals")
      .select("id", { count: "exact", head: true })
      .eq("ambassador_id", ambassadorId);

    expect(error).toBeNull();
    expect(count).toBeGreaterThanOrEqual(1);
  });
});
