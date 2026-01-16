#!/usr/bin/env node

import dotenv from "dotenv";
import { spawn } from "node:child_process";
import { createClient } from "@supabase/supabase-js";

dotenv.config({
  path: process.env.DOTENV_CONFIG_PATH || ".env.local",
});

const port = process.env.PORT ? Number(process.env.PORT) : 3112;
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

function isRedirect(status) {
  return [301, 302, 303, 307, 308].includes(status);
}

async function expectOkOrRedirect(url, response, { allowRedirect = true } = {}) {
  const ok = response.status >= 200 && response.status < 300;
  const redirect = isRedirect(response.status);
  if (ok) return;
  if (allowRedirect && redirect) return;
  const body = await response.text().catch(() => "");
  throw new Error(`Unexpected response for ${url}: ${response.status} ${response.statusText}\n${body.slice(0, 500)}`);
}

function assertNoKnownErrorMarkers(url, html) {
  const markers = [
    "Dashboard error",
    "We couldn’t load your dashboard",
    "Unhandled Runtime Error",
    "Application error",
    "Internal Server Error",
  ];
  for (const marker of markers) {
    if (html.includes(marker)) {
      throw new Error(`Error marker "${marker}" found in HTML for ${url}`);
    }
  }
}

async function run() {
  const adminClient = createClient(supabaseUrl, serviceRoleKey);
  const browserClient = createClient(supabaseUrl, anonKey);

  const email = `site-smoke+${Date.now()}@peppiepep.test`;
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

  console.log(`Starting Next dev server on ${origin}...`);
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

    const publicRoutes = [
      "/",
      "/about",
      "/analytics",
      "/api-guide",
      "/auth/reset-password",
      "/blog",
      "/blog/attorney-referral-fee-rules-state-guide",
      "/blog/compliant-referral-network-law-firms",
      "/blog/consulting-firms-track-partner-referrals",
      "/blog/cpa-cross-referral-revenue-guide",
      "/blog/law-firm-generates-2m-referrals",
      "/calendly",
      "/case-studies",
      "/contact",
      "/faq",
      "/go-live",
      "/google-ads",
      "/gtm",
      "/how-it-works",
      "/hubspot",
      "/integrations",
      "/klaviyo",
      "/lead-hacking",
      "/referral-partnerships",
      "/linkedin-growth",
      "/linkedin-growth/business",
      "/linkedin-growth/influencer",
      "/linkedin-influencer",
      "/linkedin-influencer/business",
      "/linkedin-influencer/influencer",
      "/login",
      "/mailchimp",
      "/make",
      "/meta-ads",
      "/our-referral-program",
      "/payment/cancel",
      "/payment/success",
      "/pricing",
      "/privacy",
      "/r/ambassador-join",
      "/r/referral",
      "/referral",
      "/referred",
      "/roi-calculator",
      "/security",
      "/servicem8",
      "/services/accountants",
      "/services/consultants-coaches",
      "/services/financial-advisors",
      "/services/insurance-brokers",
      "/services/law-firms",
      "/services/recruiters-staffing",
      "/shopify",
      "/shopify/checkout-extensibility",
      "/square",
      "/squarespace",
      "/status",
      "/stripe",
      "/terms",
      "/tiktok-ads",
      "/webflow",
      "/wix",
      "/wordpress",
      "/zapier",
    ];

    console.log(`🌐 Checking ${publicRoutes.length} public routes...`);
    for (const path of publicRoutes) {
      const url = `${origin}${path}`;
      const response = await fetch(url, { redirect: "manual" });
      await expectOkOrRedirect(url, response);
      if (response.status === 200 && response.headers.get("content-type")?.includes("text/html")) {
        const html = await response.text();
        assertNoKnownErrorMarkers(url, html);
      }
    }

    // Unauthed dashboard routes should redirect to /login
    const protectedRoutes = ["/dashboard", "/dashboard-test", "/dashboard/admin-master", "/dashboard/admin-payments"];
    console.log(`🔒 Checking protected routes redirect when unauthenticated...`);
    for (const path of protectedRoutes) {
      const url = `${origin}${path}`;
      const response = await fetch(url, { redirect: "manual" });
      if (!isRedirect(response.status)) {
        throw new Error(`Expected redirect for unauthenticated ${url}, got ${response.status}`);
      }
      const location = response.headers.get("location") ?? "";
      if (!location.includes("/login")) {
        throw new Error(`Expected redirect to /login for unauthenticated ${url}, got ${location || "(missing location)"}`);
      }
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

    // Hit /dashboard (auto-creates business)
    const dashUrl = `${origin}/dashboard`;
    const dashboardResponse = await fetch(dashUrl, {
      headers: { Cookie: authCookie },
      redirect: "manual",
    });
    await expectOkOrRedirect(dashUrl, dashboardResponse, { allowRedirect: false });
    const dashboardHtml = await dashboardResponse.text();
    assertNoKnownErrorMarkers(dashUrl, dashboardHtml);

    // Ensure business exists + enable External Partners for deep testing
    const { data: bizRow } = await adminClient
      .from("businesses")
      .select("id")
      .eq("owner_id", ownerId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (!bizRow?.id) {
      throw new Error("Expected business to be auto-created on /dashboard visit.");
    }

    await adminClient
      .from("businesses")
      .update({ upgrade_name: "external_partners" })
      .eq("id", bizRow.id);

    // Create some customers so dynamic pages have a valid code
    const csv = "name,email,phone\nAlice Example,alice@example.com,+15555550101\nBob Example,bob@example.com,+15555550102\n";
    const csvBlob = new Blob([csv], { type: "text/csv" });
    const formData = new FormData();
    formData.set("file", csvBlob, "customers.csv");

    const uploadResponse = await fetch(`${origin}/api/customers/upload`, {
      method: "POST",
      headers: { Cookie: authCookie },
      body: formData,
    });
    await expectOkOrRedirect(`${origin}/api/customers/upload`, uploadResponse, { allowRedirect: false });

    const { data: oneCustomer } = await adminClient
      .from("customers")
      .select("id, referral_code")
      .eq("business_id", bizRow.id)
      .not("referral_code", "is", null)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (!oneCustomer?.referral_code) {
      throw new Error("Expected a customer referral_code for dynamic route checks.");
    }

    // Grant admin role so admin pages can be rendered as part of the smoke test.
    await adminClient
      .from("admin_roles")
      .upsert(
        {
          user_id: ownerId,
          email,
          role: "admin",
          is_active: true,
        },
        { onConflict: "user_id" },
      );

    const authedRoutes = [
      "/dashboard",
      "/dashboard?section=overview",
      "/dashboard?section=setup-integration",
      "/dashboard?section=testing-qa",
      "/dashboard?section=clients-ambassadors",
      "/dashboard?section=external-partners",
      "/dashboard?section=crm-integration",
      "/dashboard?section=view-campaigns",
      "/dashboard?section=performance",
      "/dashboard-test",
      "/dashboard/admin-master",
      "/dashboard/admin-payments",
      `/r/${encodeURIComponent(oneCustomer.referral_code)}`,
      `/me/${encodeURIComponent(oneCustomer.referral_code)}`,
    ];

    console.log(`✅ Checking ${authedRoutes.length} authenticated routes...`);
    for (const path of authedRoutes) {
      const url = `${origin}${path}`;
      const response = await fetch(url, { headers: { Cookie: authCookie }, redirect: "manual" });
      await expectOkOrRedirect(url, response, { allowRedirect: false });
      if (response.headers.get("content-type")?.includes("text/html")) {
        const html = await response.text();
        assertNoKnownErrorMarkers(url, html);
      }
    }

    console.log("✅ Site smoke checks passed.");
  } finally {
    child.kill("SIGTERM");
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
