import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createClient } from "@supabase/supabase-js";
import { nanoid } from "nanoid";

import { quickAddCustomerProfile } from "@/lib/customers-quick-add";
import type { Database } from "@/types/supabase";

const TEST_SUPABASE_URL = process.env.TEST_SUPABASE_URL;
const TEST_SUPABASE_SERVICE_KEY = process.env.TEST_SUPABASE_SERVICE_ROLE_KEY;
const hasSupabaseTestEnv = Boolean(TEST_SUPABASE_URL && TEST_SUPABASE_SERVICE_KEY);
const adminClient = hasSupabaseTestEnv
  ? createClient<Database>(TEST_SUPABASE_URL as string, TEST_SUPABASE_SERVICE_KEY as string)
  : null;

(hasSupabaseTestEnv ? describe : describe.skip)("dashboard Step 2 - Quick Add (integration)", () => {
  const namespace = `test_quick_add_${Date.now()}`;
  const ownerEmail = `${namespace}_owner@peppiepep.dev`;
  const ownerPassword = `Passw0rd!${nanoid(6)}`;

  let ownerId: string | undefined;
  let businessId: string | undefined;

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
      .select("id")
      .single();

    if (bizError || !business?.id) {
      throw new Error(`Failed to create business: ${bizError?.message ?? "no row returned"}`);
    }
    businessId = business.id;
  });

  afterAll(async () => {
    if (businessId && adminClient) {
      await adminClient.from("customers").delete().eq("business_id", businessId);
      await adminClient.from("businesses").delete().eq("id", businessId);
    }

    if (ownerId && adminClient) {
      await adminClient.auth.admin.deleteUser(ownerId);
    }
  });

  it("creates a customer, normalizes phone/email, and dedupes by email", async () => {
    if (!adminClient) throw new Error("Admin client not configured");
    if (!businessId) throw new Error("Missing businessId");

    const result = await quickAddCustomerProfile({
      supabase: adminClient,
      businessId,
      name: "Alice Example",
      phone: "+61 (400) 000-001",
      email: "ALICE@EXAMPLE.COM",
    });

    expect(result.status).toBe("created");

    const { data: inserted, error: fetchError } = await adminClient
      .from("customers")
      .select("id, name, email, phone, referral_code, discount_code, status")
      .eq("business_id", businessId)
      .eq("email", "alice@example.com")
      .single();

    expect(fetchError).toBeNull();
    expect(inserted).toBeTruthy();
    expect(inserted?.name).toBe("Alice Example");
    expect(inserted?.email).toBe("alice@example.com");
    expect(inserted?.phone).toBe("+61400000001");
    expect(typeof inserted?.referral_code).toBe("string");
    expect(inserted?.referral_code?.length).toBe(12);
    expect(typeof inserted?.discount_code).toBe("string");
    expect((inserted?.discount_code ?? "").length).toBeGreaterThan(0);
    expect(inserted?.status).toBe("pending");

    const duplicate = await quickAddCustomerProfile({
      supabase: adminClient,
      businessId,
      name: "Alice Duplicate",
      phone: "",
      email: "alice@example.com",
    });

    expect(duplicate.status).toBe("duplicate");

    const { count } = await adminClient
      .from("customers")
      .select("id", { count: "exact", head: true })
      .eq("business_id", businessId)
      .eq("email", "alice@example.com");

    expect(count).toBe(1);
  });

  it("returns a validation error for invalid email", async () => {
    if (!adminClient) throw new Error("Admin client not configured");
    if (!businessId) throw new Error("Missing businessId");

    const result = await quickAddCustomerProfile({
      supabase: adminClient,
      businessId,
      name: "",
      phone: "+61400000002",
      email: "not-an-email",
    });

    expect(result.status).toBe("error");
    if (result.status === "error") {
      expect(result.error).toMatch(/invalid email/i);
    }
  });
});

