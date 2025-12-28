#!/usr/bin/env node

import dotenv from "dotenv";
import { spawn } from "node:child_process";
import { createClient } from "@supabase/supabase-js";

dotenv.config({
  path: process.env.DOTENV_CONFIG_PATH || ".env.local",
});

const port = process.env.PORT ? Number(process.env.PORT) : 3108;
const origin = `http://localhost:${port}`;

const allowNonTestSupabase = process.env.ALLOW_E2E_ON_CONFIGURED_SUPABASE === "1";

const supabaseUrl =
  process.env.TEST_SUPABASE_URL ??
  (allowNonTestSupabase ? process.env.NEXT_PUBLIC_SUPABASE_URL : undefined);
const serviceRoleKey =
  process.env.TEST_SUPABASE_SERVICE_ROLE_KEY ??
  (allowNonTestSupabase ? process.env.SUPABASE_SERVICE_ROLE_KEY : undefined);
const anonKey =
  process.env.TEST_SUPABASE_ANON_KEY ??
  (allowNonTestSupabase ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY : undefined);

if (!supabaseUrl || !serviceRoleKey || !anonKey) {
  console.error(
    [
      "Missing TEST Supabase env.",
      "Set TEST_SUPABASE_URL, TEST_SUPABASE_SERVICE_ROLE_KEY, and TEST_SUPABASE_ANON_KEY to a dedicated test project (recommended).",
      "If you intentionally want to run against the currently configured Supabase project, set ALLOW_E2E_ON_CONFIGURED_SUPABASE=1.",
    ].join("\n"),
  );
  process.exit(1);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer({ timeoutMs = 120000 } = {}) {
  const startedAt = Date.now();
  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (Date.now() - startedAt > timeoutMs) {
      throw new Error(`Timed out waiting for Next server on ${origin}`);
    }
    try {
      const response = await fetch(`${origin}/api/verify-attribution`, { redirect: "manual" });
      if (response.ok) return;
    } catch {
      // ignore
    }
    await sleep(500);
  }
}

function getSetCookieHeaders(response) {
  return response.headers.getSetCookie?.() ?? response.headers.raw?.()["set-cookie"] ?? [];
}

function extractCookie(setCookieHeaders, name) {
  const header = setCookieHeaders.find((cookie) => cookie.startsWith(`${name}=`));
  if (!header) return null;
  return header.split(";")[0];
}

async function expectJsonOk(response) {
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Expected OK, got ${response.status}: ${text}`);
  }
  return response.json();
}

async function run() {
  const adminClient = createClient(supabaseUrl, serviceRoleKey);
  const browserClient = createClient(supabaseUrl, anonKey);

  const email = `dash-e2e+${Date.now()}@peppiepep.test`;
  const password = `TestPass123!${Math.random().toString(36).slice(2, 8)}`;

  const { data: created, error: createError } = await adminClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (createError || !created?.user) {
    throw new Error(`Failed to create test user: ${createError?.message}`);
  }
  const ownerId = created.user.id;

  // Intentionally do NOT create a business here.
  // The first-time onboarding path should auto-create the business row when the user visits /dashboard.
  let businessId = null;

  console.log(`Starting Next dev server on ${origin} (TEST Supabase)...`);
  const child = spawn(
    "node",
    ["node_modules/next/dist/bin/next", "dev", "-p", String(port)],
    {
      stdio: "inherit",
      env: {
        ...process.env,
        NODE_ENV: "test",
        NEXT_PUBLIC_SITE_URL: origin,
        NEXT_PUBLIC_SUPABASE_URL: supabaseUrl,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: anonKey,
        SUPABASE_SERVICE_ROLE_KEY: serviceRoleKey,
        DISABLE_REFERRAL_EVENT_LOGGING: "1",
        DISABLE_CAMPAIGN_DISPATCH: "1",
      },
    },
  );

  try {
    await waitForServer();

    // Unauthed middleware redirect check
    const unauthedDashboard = await fetch(`${origin}/dashboard`, { redirect: "manual" });
    if (![301, 302, 303, 307, 308].includes(unauthedDashboard.status)) {
      throw new Error(`Expected redirect for unauthenticated /dashboard, got ${unauthedDashboard.status}`);
    }

    // Login via Supabase + sync cookie into Next app
    const { data: signInData, error: signInError } = await browserClient.auth.signInWithPassword({
      email,
      password,
    });
    if (signInError || !signInData?.session) {
      throw new Error(`Sign-in failed: ${signInError?.message ?? "no session"}`);
    }

    const session = signInData.session;
    const syncResponse = await fetch(`${origin}/auth/callback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: "INITIAL_SESSION", session }),
      redirect: "manual",
    });
    if (!syncResponse.ok) {
      const body = await syncResponse.text().catch(() => "");
      throw new Error(`Session sync failed (${syncResponse.status}): ${body || syncResponse.statusText}`);
    }

    const setCookieHeaders = getSetCookieHeaders(syncResponse);
    const projectRef = new URL(supabaseUrl).host.split(".")[0];
    const authCookieName = `sb-${projectRef}-auth-token`;
    const authCookie = extractCookie(setCookieHeaders, authCookieName);
    if (!authCookie) {
      throw new Error("Auth cookie not found in session sync response.");
    }

    // Dashboard render (this should auto-create the business if it doesn't exist)
    const dashboardResponse = await fetch(`${origin}/dashboard`, {
      headers: { Cookie: authCookie },
      redirect: "manual",
    });
    if (dashboardResponse.status !== 200) {
      const location = dashboardResponse.headers.get("location");
      const body = await dashboardResponse.text().catch(() => "");
      throw new Error(
        `Expected /dashboard 200 without redirect, got ${dashboardResponse.status}${
          location ? ` -> ${location}` : ""
        }: ${body}`,
      );
    }

    const dashboardHtml = await dashboardResponse.text();
    if (/\\bLogin\\b/i.test(dashboardHtml) && !/\\bDashboard\\b/i.test(dashboardHtml)) {
      throw new Error("Dashboard response looks like a login page (auth cookie not accepted).");
    }

    const { data: bizRow, error: bizLookupError } = await adminClient
      .from("businesses")
      .select("id")
      .eq("owner_id", ownerId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (bizLookupError || !bizRow?.id) {
      throw new Error(
        `Expected business to be auto-created on /dashboard visit: ${bizLookupError?.message ?? "no row returned"}`,
      );
    }

    businessId = bizRow.id;

    // Ensure the business has a reward configured so integrations can credit ambassadors on conversion.
    const { data: businessConfig, error: businessConfigError } = await adminClient
      .from("businesses")
      .update({ reward_type: "credit", reward_amount: 25 })
      .eq("id", businessId)
      .select("id, discount_capture_secret, reward_type, reward_amount")
      .single();

    if (businessConfigError || !businessConfig?.id) {
      throw new Error(`Failed to configure business rewards: ${businessConfigError?.message ?? "no row returned"}`);
    }

    if (!businessConfig.discount_capture_secret) {
      throw new Error("Expected business to have discount_capture_secret configured.");
    }

    // Customers API unauthorized
    const customers401 = await fetch(`${origin}/api/customers`, { redirect: "manual" });
    if (customers401.status !== 401) {
      throw new Error(`Expected /api/customers 401 without auth, got ${customers401.status}`);
    }

    // Upload customers (CSV)
    const csv = [
      "name,email,phone",
      "Alice Example,alice@example.com,0400000001",
      "Bob Example,bob@example.com,0400000002",
      "Carla Example,carla@example.com,0400000003",
    ].join("\n");
    const form = new FormData();
    form.append("file", new Blob([csv], { type: "text/csv" }), "customers.csv");

    const uploadResponse = await fetch(`${origin}/api/customers/upload`, {
      method: "POST",
      headers: { Cookie: authCookie },
      body: form,
    });
    await expectJsonOk(uploadResponse);

    const customersPayload = await expectJsonOk(
      await fetch(`${origin}/api/customers?page=1&pageSize=200`, { headers: { Cookie: authCookie } }),
    );
    const customers = customersPayload.data ?? [];
    if (customers.length < 3) {
      throw new Error(`Expected at least 3 customers after upload, got ${customers.length}`);
    }

    const discountCodes = customers
      .map((c) => c.discount_code)
      .filter((value) => typeof value === "string" && value.length > 0);
    if (discountCodes.length < 3) {
      throw new Error("Expected discount_code to be generated for uploaded customers.");
    }

    const referralCodes = customers
      .map((c) => c.referral_code)
      .filter((value) => typeof value === "string" && value.length > 0);
    const referralCodeSet = new Set(referralCodes);
    if (referralCodeSet.size !== referralCodes.length) {
      throw new Error("Expected unique referral codes in customers list.");
    }

    // Search filter (should find Alice)
    const searchPayload = await expectJsonOk(
      await fetch(`${origin}/api/customers?q=Alice&page=1&pageSize=50`, { headers: { Cookie: authCookie } }),
    );
    if (!(searchPayload.data ?? []).some((c) => (c.name ?? "").includes("Alice"))) {
      throw new Error("Customer search did not return expected result.");
    }

    // Create referrals directly (tracked + manual) then verify /api/referrals filters
    const ambassadorId = customers[0]?.id;
    if (!ambassadorId) throw new Error("Missing ambassador id from customers list.");

    const ambassadorDiscountCode = customers[0]?.discount_code;
    if (!ambassadorDiscountCode) {
      throw new Error("Missing ambassador discount_code from customers list.");
    }

    const trackedInsert = await adminClient
      .from("referrals")
      .insert({
        business_id: businessId,
        ambassador_id: ambassadorId,
        referred_name: "Tracked Referral",
        referred_phone: "+61400000011",
        status: "pending",
        created_by: null,
        consent_given: true,
        locale: "en",
      })
      .select("id")
      .single();
    if (trackedInsert.error) throw new Error(`Failed to insert tracked referral: ${trackedInsert.error.message}`);

    const manualInsert = await adminClient
      .from("referrals")
      .insert({
        business_id: businessId,
        ambassador_id: ambassadorId,
        referred_name: "Manual Referral",
        referred_phone: "+61400000012",
        status: "pending",
        created_by: ownerId,
        consent_given: true,
        locale: "en",
      })
      .select("id")
      .single();
    if (manualInsert.error) throw new Error(`Failed to insert manual referral: ${manualInsert.error.message}`);

    const referralsAll = await expectJsonOk(
      await fetch(`${origin}/api/referrals?page=1&pageSize=50`, { headers: { Cookie: authCookie } }),
    );
    if ((referralsAll.data ?? []).length < 2) {
      throw new Error("Expected referrals list to include inserted rows.");
    }

    const referralsManual = await expectJsonOk(
      await fetch(`${origin}/api/referrals?source=manual&page=1&pageSize=50`, { headers: { Cookie: authCookie } }),
    );
    if (!(referralsManual.data ?? []).some((r) => r.referred_name === "Manual Referral")) {
      throw new Error("Manual referrals filter did not include expected row.");
    }

    const referralsTracked = await expectJsonOk(
      await fetch(`${origin}/api/referrals?source=tracked&page=1&pageSize=50`, { headers: { Cookie: authCookie } }),
    );
    if (!(referralsTracked.data ?? []).some((r) => r.referred_name === "Tracked Referral")) {
      throw new Error("Tracked referrals filter did not include expected row.");
    }

    // Discount redemption integration (Step 1C)
    const redemptionOrderRef = `order-${Date.now()}`;
    const redemptionBefore = await adminClient
      .from("discount_redemptions")
      .select("id", { count: "exact", head: true })
      .eq("business_id", businessId)
      .eq("order_reference", redemptionOrderRef);
    const redemptionsBeforeCount = redemptionBefore.count ?? 0;

    const redeemResponse = await fetch(`${origin}/api/discount-codes/redeem`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-referlabs-discount-secret": businessConfig.discount_capture_secret,
      },
      body: JSON.stringify({
        discountCode: ambassadorDiscountCode,
        orderReference: redemptionOrderRef,
        amount: 123.45,
        source: "shopify-checkout",
      }),
    });
    await expectJsonOk(redeemResponse);

    const redemptionAfter = await adminClient
      .from("discount_redemptions")
      .select("id", { count: "exact", head: true })
      .eq("business_id", businessId)
      .eq("order_reference", redemptionOrderRef);
    const redemptionsAfterCount = redemptionAfter.count ?? 0;
    if (redemptionsAfterCount !== redemptionsBeforeCount + 1) {
      throw new Error("Expected exactly one discount_redemptions row to be inserted for the new order reference.");
    }

    const completedPayload = await expectJsonOk(
      await fetch(`${origin}/api/referrals?status=completed&page=1&pageSize=50`, { headers: { Cookie: authCookie } }),
    );
    const completed = completedPayload.data ?? [];
    if (!completed.some((r) => r.ambassador_id === ambassadorId && r.status === "completed")) {
      throw new Error("Expected discount redemption to complete (or create) a referral for the ambassador.");
    }

    const eventsPayload = await expectJsonOk(
      await fetch(`${origin}/api/referral-events`, { headers: { Cookie: authCookie } }),
    );
    const events = eventsPayload.events ?? [];
    if (!events.some((e) => e.event_type === "conversion_completed")) {
      throw new Error("Expected conversion_completed referral event after discount redemption.");
    }

    const { data: creditedCustomer, error: creditLookupError } = await adminClient
      .from("customers")
      .select("credits")
      .eq("id", ambassadorId)
      .single();
    if (creditLookupError) {
      throw new Error(`Failed to fetch ambassador credits after redemption: ${creditLookupError.message}`);
    }
    if (!Number.isFinite(creditedCustomer?.credits) || creditedCustomer.credits < 25) {
      throw new Error("Expected ambassador to receive credit reward after redemption completion.");
    }

    // Idempotency check: re-send the same redemption; it should not double-insert or double-credit.
    const creditsBefore = creditedCustomer.credits;
    const redeemAgain = await fetch(`${origin}/api/discount-codes/redeem`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-referlabs-discount-secret": businessConfig.discount_capture_secret,
      },
      body: JSON.stringify({
        discountCode: ambassadorDiscountCode,
        orderReference: redemptionOrderRef,
        amount: 123.45,
        source: "shopify-checkout",
      }),
    });
    await expectJsonOk(redeemAgain);

    const redemptionAfterAgain = await adminClient
      .from("discount_redemptions")
      .select("id", { count: "exact", head: true })
      .eq("business_id", businessId)
      .eq("order_reference", redemptionOrderRef);
    const redemptionsAfterAgainCount = redemptionAfterAgain.count ?? 0;
    if (redemptionsAfterAgainCount !== redemptionsAfterCount) {
      throw new Error("Expected redemption retry to be idempotent (no duplicate rows).");
    }

    const { data: creditedCustomerAgain, error: creditLookupErrorAgain } = await adminClient
      .from("customers")
      .select("credits")
      .eq("id", ambassadorId)
      .single();
    if (creditLookupErrorAgain) {
      throw new Error(`Failed to fetch ambassador credits after idempotency check: ${creditLookupErrorAgain.message}`);
    }
    if (creditedCustomerAgain.credits !== creditsBefore) {
      throw new Error("Expected redemption retry to be idempotent (no double-credit).");
    }

    // Campaign send (dispatch disabled; should only queue)
    const selectedCustomerIds = customers.slice(0, 2).map((c) => c.id);
    const campaignResponse = await fetch(`${origin}/api/campaigns/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Cookie: authCookie },
      body: JSON.stringify({
        campaignName: "Dash E2E Campaign",
        campaignChannel: "email",
        scheduleType: "now",
        selectedCustomers: selectedCustomerIds,
        includeQrModule: true,
      }),
    });
    const campaignPayload = await expectJsonOk(campaignResponse);
    if (typeof campaignPayload?.success !== "string" || !campaignPayload.success.includes("Queued")) {
      throw new Error(`Expected campaign response to include 'Queued', got: ${JSON.stringify(campaignPayload)}`);
    }

    console.log("✅ Dashboard E2E checks passed.");
  } finally {
    child.kill("SIGTERM");
    await sleep(1500);
    if (!child.killed) child.kill("SIGKILL");

    // Best-effort cleanup of test data in TEST Supabase
    try {
      await adminClient.from("referral_events").delete().eq("business_id", businessId);
      await adminClient.from("campaign_messages").delete().eq("business_id", businessId);
      await adminClient.from("campaigns").delete().eq("business_id", businessId);
      await adminClient.from("referrals").delete().eq("business_id", businessId);
      await adminClient.from("customers").delete().eq("business_id", businessId);
      await adminClient.from("businesses").delete().eq("id", businessId);
    } catch (cleanupError) {
      console.warn("Cleanup failed (non-fatal):", cleanupError);
    }

    try {
      await adminClient.auth.admin.deleteUser(ownerId);
    } catch (cleanupError) {
      console.warn("Failed to delete test auth user (non-fatal):", cleanupError);
    }
  }
}

run().catch((error) => {
  console.error("\nDashboard E2E test failed:");
  console.error(error);
  process.exit(1);
});
