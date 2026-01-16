#!/usr/bin/env node

import dotenv from "dotenv";
import { spawn } from "node:child_process";
import { createClient } from "@supabase/supabase-js";
import { chromium } from "@playwright/test";

dotenv.config({
  path: process.env.DOTENV_CONFIG_PATH || ".env.local",
});

const port = process.env.PORT ? Number(process.env.PORT) : 3110;
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

async function expectOk(response) {
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Expected OK, got ${response.status}: ${text}`);
  }
}

async function run() {
  const adminClient = createClient(supabaseUrl, serviceRoleKey);
  const browserClient = createClient(supabaseUrl, anonKey);

  const email = `dash-ui-e2e+${Date.now()}@peppiepep.test`;
  const password = `TestPass123!${Math.random().toString(36).slice(2, 8)}`;

  const { data: created, error: createError } = await adminClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (createError || !created?.user) {
    throw new Error(`Failed to create test user: ${createError?.message}`);
  }
  let businessId = "";

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

  let browser = null;
  try {
    await waitForServer();

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
    await expectOk(syncResponse);

    const setCookieHeaders = getSetCookieHeaders(syncResponse);
    const projectRef = new URL(supabaseUrl).host.split(".")[0];
    const authCookieName = `sb-${projectRef}-auth-token`;
    const authCookie = extractCookie(setCookieHeaders, authCookieName);
    if (!authCookie) {
      throw new Error("Auth cookie not found in session sync response.");
    }

    // Warm the server-rendered dashboard route once (avoids flakey first-request compilation timeouts in Playwright).
    const warmResponse = await fetch(`${origin}/dashboard`, {
      headers: { Cookie: authCookie },
      redirect: "manual",
    });
    if (warmResponse.status !== 200) {
      const body = await warmResponse.text().catch(() => "");
      throw new Error(`Dashboard warmup failed (${warmResponse.status}): ${body.slice(0, 300)}`);
    }
    await warmResponse.text().catch(() => "");

    const cookieEq = authCookie.indexOf("=");
    const cookieName = cookieEq >= 0 ? authCookie.slice(0, cookieEq) : authCookie;
    const cookieValue = cookieEq >= 0 ? authCookie.slice(cookieEq + 1) : "";

    browser = await chromium.launch();
    const context = await browser.newContext();
    await context.addInitScript(() => {
      try {
        const key = "referlabs_cookie_consent";
        const existing = localStorage.getItem(key);
        if (!existing) {
          localStorage.setItem(
            key,
            JSON.stringify({
              necessary: true,
              analytics: false,
              marketing: false,
              version: "1.0",
              timestamp: Date.now(),
            }),
          );
        }
      } catch {
        // ignore
      }
    });
    await context.addCookies([
      {
        name: cookieName,
        value: cookieValue,
        domain: "localhost",
        path: "/",
        httpOnly: true,
      },
    ]);

    const page = await context.newPage();
    const pageErrors = [];
    page.on("pageerror", (err) => pageErrors.push(err));

    await page.goto(`${origin}/dashboard`, { waitUntil: "domcontentloaded", timeout: 180000 });

    // Some flows auto-open a dialog on first dashboard load (Radix overlay blocks clicks).
    const overlay = page.locator('div.fixed.inset-0.bg-black\\/20.backdrop-blur-sm');
    for (let attempt = 0; attempt < 5; attempt += 1) {
      if (!(await overlay.isVisible().catch(() => false))) break;
      await page.keyboard.press("Escape").catch(() => {});
      await page.waitForTimeout(200);
    }

    const dashboardError = page.getByText("Dashboard error", { exact: false });
    if (await dashboardError.isVisible().catch(() => false)) {
      throw new Error("Dashboard error boundary rendered on initial UI load.");
    }

    const nav = page.getByText("Navigation", { exact: false });
    await nav.waitFor({ timeout: 120000 });

    // Enable External Partners for this test run by upgrading the auto-created business row.
    // This is server-rendered state, so reload after updating.
    for (let attempt = 0; attempt < 15; attempt += 1) {
      const { data: bizRow } = await adminClient
        .from("businesses")
        .select("id")
        .eq("owner_id", created.user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (bizRow?.id) {
        businessId = bizRow.id;
        await adminClient
          .from("businesses")
          .update({ upgrade_name: "external_partners", reward_type: "credit", reward_amount: 25 })
          .eq("id", bizRow.id);

        // Grant admin so the LinkedIn Influencer section (admin-only) renders during UI smoke checks.
        await adminClient.from("admin_roles").insert({
          user_id: created.user.id,
          email,
          role: "admin",
          is_active: true,
        });
        break;
      }
      await page.waitForTimeout(500);
    }
    await page.reload({ waitUntil: "domcontentloaded", timeout: 180000 });

    const sections = [
      { label: "Overview", expectHeading: /^Welcome back/i },
      { label: "Business Setup & Integrations", expectHeading: "Business Setup & Integrations", exact: true },
      { label: "Testing & QA", expectHeading: /^Testing & QA/i },
      { label: "Partners", expectHeading: "Import Your Network", exact: true },
      { label: "External Partners", expectHeading: /^Paid partner discovery/i },
      { label: "Launch Campaigns", expectHeading: "Launch Campaigns", exact: true },
      { label: "Track Campaigns", expectHeading: "Track Campaigns", exact: true },
      { label: "Measure ROI", expectHeading: "Measure ROI", exact: true },
    ];

    for (const section of sections) {
      const button = page.getByRole("button", { name: section.label, exact: true });
      await button.scrollIntoViewIfNeeded();
      await button.click({ trial: true }).catch(() => {});
      // Retry click if an overlay briefly appears during hydration.
      if (await overlay.isVisible().catch(() => false)) {
        await page.keyboard.press("Escape").catch(() => {});
        await page.waitForTimeout(200);
      }
      await button.click();
      await page.waitForTimeout(250);
      if (await dashboardError.isVisible().catch(() => false)) {
        throw new Error(`Dashboard error boundary rendered after clicking ${section.label}.`);
      }
      const headingName = section.expectHeading;
      await page
        .getByRole("heading", { name: headingName, exact: section.exact ?? false })
        .waitFor({ timeout: 30000 });
    }

    // Partners tab: quick-add should not crash and should persist to DB.
    await page.getByRole("button", { name: "Partners", exact: true }).click();
    if (await page.getByText("Partner directory unavailable", { exact: false }).isVisible().catch(() => false)) {
      throw new Error("Partners directory rendered an error boundary on initial load.");
    }
    const quickAddName = `UI Smoke Partner ${Date.now()}`;
    let beforeCount = null;
    if (businessId) {
      const { count } = await adminClient
        .from("customers")
        .select("id", { count: "exact", head: true })
        .eq("business_id", businessId);
      beforeCount = typeof count === "number" ? count : null;
    }
    await page.getByPlaceholder("Full name").fill(quickAddName);
    const quickAddRequest = page.waitForResponse(
      (resp) =>
        resp.request().method() === "POST" &&
        resp.url().includes("/dashboard?section=clients-ambassadors"),
      { timeout: 60000 },
    );
    await page.getByRole("button", { name: "Add Customer", exact: true }).click();
    const quickAddResponse = await quickAddRequest.catch(() => null);
    if (await dashboardError.isVisible().catch(() => false)) {
      throw new Error("Dashboard error boundary rendered after Partners quick add.");
    }
    if (businessId && typeof beforeCount === "number") {
      for (let attempt = 0; attempt < 10; attempt += 1) {
        const { count: afterCount } = await adminClient
          .from("customers")
          .select("id", { count: "exact", head: true })
          .eq("business_id", businessId);
        if (typeof afterCount === "number" && afterCount > beforeCount) {
          break;
        }
        if (attempt === 9) {
          let debug = "";
          if (quickAddResponse) {
            const status = quickAddResponse.status();
            const url = quickAddResponse.url();
            const body = await quickAddResponse.text().catch(() => "");
            debug = `\\n[debug] quickAdd POST ${status} ${url}\\n${body.slice(0, 500)}`;
          }
          throw new Error(`Partners quick-add did not create a customer row.${debug}`);
        }
        await page.waitForTimeout(300);
      }
    }

    // Mark the newly created partner as a LinkedIn Influencer program customer via partner_applications,
    // then reload so the server-rendered LinkedIn Influencer section has data.
    if (businessId) {
      const { data: recentCustomer } = await adminClient
        .from("customers")
        .select("id")
        .eq("business_id", businessId)
        .eq("name", quickAddName)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (recentCustomer?.id) {
        await adminClient.from("partner_applications").insert({
          business_id: businessId,
          customer_id: recentCustomer.id,
          source: "linkedin-influencer",
          status: "approved",
        });
      }
    }

    await page.reload({ waitUntil: "domcontentloaded", timeout: 180000 });
    await page.getByRole("button", { name: "Partners", exact: true }).click();
    await page.getByRole("heading", { name: /LinkedIn Influencer Customers/i }).waitFor({ timeout: 30000 });
    if (await page.getByText("Partner directory unavailable", { exact: false }).isVisible().catch(() => false)) {
      throw new Error("Partners directory rendered an error boundary after enabling influencer section.");
    }

    // External Partners tab: ensure it is enabled, submit a request, create a partner, and verify referral link redirects.
    await page.getByRole("button", { name: "External Partners", exact: true }).click();
    if (await page.getByText("External Partners is a paid add-on", { exact: false }).isVisible().catch(() => false)) {
      throw new Error("External Partners tab is still paywalled after enabling upgrade_name.");
    }

    // Partner Discovery Request (multi-step)
    await page.getByRole("button", { name: "B2B LinkedIn Influencer", exact: true }).click();
    for (let i = 0; i < 4; i += 1) {
      await page.getByRole("button", { name: "Next", exact: true }).click();
      await page.waitForTimeout(100);
    }
    await page.getByRole("button", { name: "Submit request", exact: true }).click();
    await page.getByRole("heading", { name: "Partner discovery requests", exact: false }).waitFor({ timeout: 30000 });
    await page.getByText("pending_review", { exact: false }).waitFor({ timeout: 30000 });

    // Create external partner record (labels are visual only; use label-adjacent input locators)
    const externalPartnerNameInput = page
      .locator('label:has-text("Partner name")')
      .first()
      .locator("..")
      .locator("input")
      .first();
    const externalPartnerLandingInput = page
      .locator('label:has-text("Landing URL")')
      .first()
      .locator("..")
      .locator("input")
      .first();

    await externalPartnerNameInput.fill(`External Partner ${Date.now()}`);
    await externalPartnerLandingInput.fill(`${origin}/`);
    await page.getByRole("button", { name: "Create external partner", exact: true }).click();
    await page.getByText("Open link", { exact: true }).first().waitFor({ timeout: 30000 });

    // Activate partner and verify status UI updates
    await page.getByRole("button", { name: "Activate", exact: true }).first().click();
    await page.getByText("Active", { exact: true }).first().waitFor({ timeout: 30000 });

    // Click attributed referral link (opens new tab)
    const [newPage] = await Promise.all([
      context.waitForEvent("page"),
      page.getByRole("link", { name: "Open link", exact: true }).first().click(),
    ]);
    await newPage.waitForLoadState("domcontentloaded");
    const landedUrl = newPage.url();
    if (!landedUrl.startsWith(`${origin}/`)) {
      throw new Error(`External partner link did not redirect to landing URL. Got: ${landedUrl}`);
    }
    if (!landedUrl.includes("utm_source=external_partner")) {
      throw new Error(`External partner link missing utm_source attribution. Got: ${landedUrl}`);
    }

    if (pageErrors.length > 0) {
      throw new Error(`Client runtime error: ${pageErrors[0]?.message ?? "unknown"}`);
    }

    console.log("✅ Dashboard UI navigation smoke test passed.");
  } finally {
    try {
      if (browser) await browser.close();
    } catch {
      // ignore
    }
    child.kill("SIGTERM");
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
