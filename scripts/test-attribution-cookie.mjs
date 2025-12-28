#!/usr/bin/env node

import { spawn } from "node:child_process";

const port = process.env.PORT ? Number(process.env.PORT) : 3107;
const origin = `http://localhost:${port}`;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer({ timeoutMs = 120000 } = {}) {
  const startedAt = Date.now();
  // Poll a route that doesn't depend on Supabase.
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

function getCookieValue(setCookieHeaders, name) {
  const header = setCookieHeaders.find((cookie) => cookie.startsWith(`${name}=`));
  if (!header) return null;
  return header.split(";")[0];
}

async function run() {
  console.log(`Starting Next dev server on ${origin}...`);

  const child = spawn(
    "node",
    ["node_modules/next/dist/bin/next", "dev", "-p", String(port)],
    {
      stdio: "inherit",
      env: {
        ...process.env,
        NODE_ENV: "test",
        DISABLE_REFERRAL_EVENT_LOGGING: "1",
      },
    },
  );

  try {
    await waitForServer();

    const ambassadorId = "00000000-0000-0000-0000-000000000001";
    const businessId = "00000000-0000-0000-0000-000000000002";
    const code = "COOKIE_E2E_TEST";

    const redirectResponse = await fetch(
      `${origin}/api/referral-redirect?code=${encodeURIComponent(code)}&ambassador_id=${encodeURIComponent(
        ambassadorId,
      )}&business_id=${encodeURIComponent(businessId)}&utm_source=test-suite`,
      { redirect: "manual" },
    );

    if (![301, 302, 303, 307, 308].includes(redirectResponse.status)) {
      const body = await redirectResponse.text().catch(() => "");
      throw new Error(
        `Expected redirect from /api/referral-redirect, got ${redirectResponse.status}: ${body}`,
      );
    }

    const setCookieHeaders = getSetCookieHeaders(redirectResponse);
    const cookie = getCookieValue(setCookieHeaders, "ref_ambassador");
    if (!cookie) {
      throw new Error("ref_ambassador cookie not found in redirect response.");
    }

    const verifyResponse = await fetch(`${origin}/api/verify-attribution`, {
      headers: { Cookie: cookie },
    });

    if (!verifyResponse.ok) {
      const body = await verifyResponse.text().catch(() => "");
      throw new Error(`verify-attribution failed (${verifyResponse.status}): ${body}`);
    }

    const payload = await verifyResponse.json();
    if (!payload?.hasAttribution) {
      throw new Error(`Expected hasAttribution=true, got: ${JSON.stringify(payload)}`);
    }

    if (payload?.ambassador?.code !== code) {
      throw new Error(`Expected ambassador.code=${code}, got: ${payload?.ambassador?.code}`);
    }

    if (payload?.ambassador?.id !== ambassadorId) {
      throw new Error(
        `Expected ambassador.id=${ambassadorId}, got: ${payload?.ambassador?.id}`,
      );
    }

    if (payload?.ambassador?.businessId !== businessId) {
      throw new Error(
        `Expected ambassador.businessId=${businessId}, got: ${payload?.ambassador?.businessId}`,
      );
    }

    const rawCookie = cookie.split("=", 2)[1] ?? "";
    const decoded = JSON.parse(decodeURIComponent(rawCookie));
    if (decoded.code !== code || decoded.id !== ambassadorId || decoded.business_id !== businessId) {
      throw new Error(`Cookie payload mismatch: ${JSON.stringify(decoded)}`);
    }

    console.log("✅ Attribution cookie E2E test passed.");
  } finally {
    child.kill("SIGTERM");
    await sleep(1500);
    if (!child.killed) child.kill("SIGKILL");
  }
}

run().catch((error) => {
  console.error("\nAttribution cookie test failed:");
  console.error(error);
  process.exit(1);
});
