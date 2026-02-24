#!/usr/bin/env node

import { spawn } from 'node:child_process';
import process from 'node:process';
import { chromium } from '@playwright/test';

const port = Number(process.env.PORT || 3123);
const baseUrl = process.env.BASE_URL?.trim();
const origin = baseUrl ? baseUrl.replace(/\/$/, '') : `http://127.0.0.1:${port}`;

const routes = [
  '/',
  '/about',
  '/contact',
  '/pricing',
  '/how-it-works',
  '/services',
  '/who-its-for',
  '/application',
  '/faq',
  '/privacy',
  '/terms',
  '/status',
  '/referral',
  '/referral-partnerships',
  '/affiliate-partnerships',
  '/playbooks',
  '/integrations',
  '/hubspot',
  '/shopify',
  '/wordpress',
  '/wix',
  '/squarespace',
  '/webflow',
  '/calendly',
  '/zapier',
  '/make',
  '/gtm',
  '/google-ads',
  '/meta-ads',
  '/tiktok-ads',
  '/linkedin-growth',
  '/linkedin-influencer',
  '/blog',
  '/case-studies',
  '/go-live',
  '/security',
  '/analytics',
  '/roi-calculator',
  '/mailchimp',
  '/klaviyo',
  '/servicem8',
  '/square',
  '/stripe',
];

const viewports = [
  {
    name: 'desktop',
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    isMobile: false,
    hasTouch: false,
  },
  {
    name: 'mobile',
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  },
];

const ignoredConsoleSubstrings = [
  'Failed to load resource: the server responded with a status of 404',
  'chrome-extension://',
  'favicon.ico',
  'ERR_NETWORK_IO_SUSPENDED',
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer(url, timeoutMs = 120000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(url, { redirect: 'manual' });
      if (response.status >= 200 && response.status < 500) return;
    } catch {
      // retry
    }
    await sleep(500);
  }
  throw new Error(`Timed out waiting for server at ${url}`);
}

async function gotoWithRetry(page, url, options, attempts = 2) {
  let lastError;
  for (let i = 1; i <= attempts; i += 1) {
    try {
      return await page.goto(url, options);
    } catch (error) {
      lastError = error;
      if (i < attempts) {
        await sleep(900);
      }
    }
  }
  throw lastError;
}

async function run() {
  const shouldStartServer = !baseUrl;
  let server;

  if (shouldStartServer) {
    console.log(`Starting production server at ${origin}`);
    server = spawn('node', ['node_modules/next/dist/bin/next', 'start', '-p', String(port)], {
      stdio: 'inherit',
      env: {
        ...process.env,
        NODE_ENV: 'production',
        NEXT_PUBLIC_SITE_URL: origin,
      },
    });
  } else {
    console.log(`Running viewport checks against live URL ${origin}`);
  }

  const failures = [];

  try {
    await waitForServer(`${origin}/`);

    const browser = await chromium.launch({ headless: true });

    for (const vp of viewports) {
      console.log(`\nTesting viewport: ${vp.name}`);
      const context = await browser.newContext({
        viewport: vp.viewport,
        deviceScaleFactor: vp.deviceScaleFactor,
        isMobile: vp.isMobile,
        hasTouch: vp.hasTouch,
      });

      for (const route of routes) {
        const page = await context.newPage();
        const pageErrors = [];
        const consoleErrors = [];

        page.on('pageerror', (err) => {
          pageErrors.push(err.message);
        });

        page.on('console', (msg) => {
          if (msg.type() !== 'error') return;
          const text = msg.text();
          if (ignoredConsoleSubstrings.some((frag) => text.includes(frag))) return;
          consoleErrors.push(text);
        });

        const url = `${origin}${route}`;
        let response;
        try {
          response = await gotoWithRetry(page, url, { waitUntil: 'networkidle', timeout: 45000 }, 2);
        } catch (error) {
          failures.push({ viewport: vp.name, route, reason: `Navigation failed: ${error.message}` });
          await page.close();
          continue;
        }

        const status = response?.status() ?? 0;
        if (status >= 400 || status === 0) {
          failures.push({ viewport: vp.name, route, reason: `HTTP status ${status}` });
        }

        const overflowX = await page.evaluate(() => {
          const diff = document.documentElement.scrollWidth - window.innerWidth;
          return diff > 2 ? diff : 0;
        });

        if (overflowX > 0) {
          failures.push({ viewport: vp.name, route, reason: `Horizontal overflow detected (${overflowX}px)` });
        }

        if (pageErrors.length > 0) {
          failures.push({ viewport: vp.name, route, reason: `Page errors: ${pageErrors[0]}` });
        }

        if (consoleErrors.length > 0) {
          failures.push({ viewport: vp.name, route, reason: `Console errors: ${consoleErrors[0]}` });
        }

        await page.close();
      }

      await context.close();
    }

    await browser.close();
  } finally {
    if (server) {
      server.kill('SIGTERM');
    }
  }

  if (failures.length > 0) {
    console.error('\nUX viewport checks failed:');
    for (const failure of failures) {
      console.error(`- [${failure.viewport}] ${failure.route}: ${failure.reason}`);
    }
    process.exit(1);
  }

  console.log(`\nUX viewport checks passed for ${routes.length} routes across ${viewports.length} viewports.`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
