/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck - Test file with environment variable type issues
import { beforeAll, afterAll, describe, expect, it } from "vitest";
import { createClient } from "@supabase/supabase-js";
import { nanoid } from "nanoid";

import { logReferralEvent } from "@/lib/referral-events";
import type { Database } from "@/types/supabase";

const TEST_SUPABASE_URL = process.env.TEST_SUPABASE_URL;
const TEST_SUPABASE_SERVICE_KEY = process.env.TEST_SUPABASE_SERVICE_ROLE_KEY;
const hasSupabaseTestEnv = Boolean(TEST_SUPABASE_URL && TEST_SUPABASE_SERVICE_KEY);

const adminClient = hasSupabaseTestEnv
  ? createClient<Database>(TEST_SUPABASE_URL as string, TEST_SUPABASE_SERVICE_KEY as string)
  : null;

(hasSupabaseTestEnv ? describe : describe.skip)("E2E Attribution Fallback", () => {
  const namespace = `e2e_attr_${Date.now()}_${nanoid(6)}`;
  let businessId: string | undefined;
  let customerId: string | undefined;

  beforeAll(async () => {
    if (!adminClient) {
      throw new Error("Admin client not configured for E2E tests");
    }

    const { data: business, error: bizError } = await adminClient
      .from("businesses")
      .insert({
        name: `E2E Attribution Business ${namespace}`,
        offer_text: "10% off",
      })
      .select()
      .single();

    if (bizError || !business) {
      throw new Error(`Failed to create test business: ${bizError?.message}`);
    }

    businessId = business.id;

    const { data: customer, error: customerError } = await adminClient
      .from("customers")
      .insert({
        business_id: businessId,
        name: `Attribution Applicant ${namespace}`,
        email: `attr_${namespace}@test.com`,
        status: "applicant",
      })
      .select()
      .single();

    if (customerError || !customer) {
      throw new Error(`Failed to create test customer: ${customerError?.message}`);
    }

    customerId = customer.id;
  });

  afterAll(async () => {
    if (!adminClient || !businessId) return;
    await adminClient.from("referral_events").delete().eq("business_id", businessId);
    await adminClient.from("customers").delete().eq("business_id", businessId);
    await adminClient.from("businesses").delete().eq("id", businessId);
  });

  it("logs a signup event even when no ambassador cookie is present", async () => {
    if (!adminClient || !businessId || !customerId) {
      throw new Error("Test setup incomplete");
    }

    await logReferralEvent({
      supabase: adminClient,
      businessId,
      ambassadorId: null,
      referralId: null,
      eventType: "signup_submitted",
      source: "utm_fallback",
      device: "unknown",
      metadata: {
        customer_id: customerId,
        utm_source: "linkedin",
        utm_campaign: "growth-test",
      },
    });

    const { data: events, error } = await adminClient
      .from("referral_events")
      .select("*")
      .eq("business_id", businessId)
      .eq("event_type", "signup_submitted")
      .order("created_at", { ascending: false })
      .limit(1);

    expect(error).toBeNull();
    expect(events?.length).toBe(1);
    const event = events?.[0];
    expect(event?.source).toBe("utm_fallback");
    expect(event?.metadata?.utm_campaign).toBe("growth-test");
  });
});
