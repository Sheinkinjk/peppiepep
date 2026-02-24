#!/usr/bin/env node

import { spawn } from 'node:child_process';
import process from 'node:process';
import { chromium } from '@playwright/test';

const port = Number(process.env.PORT || 3124);
const baseUrl = process.env.BASE_URL?.trim();
const origin = baseUrl ? baseUrl.replace(/\/$/, '') : `http://127.0.0.1:${port}`;
const COOKIE_CONSENT_KEY = 'referlabs_cookie_consent';
const COOKIE_CONSENT_VALUE = JSON.stringify({
  necessary: true,
  analytics: false,
  marketing: false,
  version: '1.0',
  timestamp: Date.now(),
});

const routes = [
  '/',
  '/about',
  '/services',
  '/who-its-for',
  '/pricing',
  '/how-it-works',
  '/playbooks',
  '/contact',
  '/application',
  '/case-studies',
  '/faq',
  '/analytics',
  '/blog',
  '/roi-calculator',
  '/lead-hacking',
  '/affiliate-partnerships',
  '/referral-partnerships',
  '/our-referral-program',
  '/security',
  '/status',
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

function parseRgb(rgbText) {
  const match = rgbText.match(/rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (!match) return null;
  return {
    r: Number(match[1]),
    g: Number(match[2]),
    b: Number(match[3]),
  };
}

function isTiffany(rgb) {
  if (!rgb) return false;
  return rgb.g >= 120 && rgb.b >= 120 && rgb.r <= 60;
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
    console.log(`Running header/theme checks against live URL ${origin}`);
  }

  const failures = [];

  try {
    await waitForServer(`${origin}/`);
    const browser = await chromium.launch({ headless: true });

    // Desktop checks on full route set.
    const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await desktop.addInitScript(
      ({ key, value }) => {
        window.localStorage.setItem(key, value);
      },
      { key: COOKIE_CONSENT_KEY, value: COOKIE_CONSENT_VALUE },
    );

    for (const route of routes) {
      const page = await desktop.newPage();
      const url = `${origin}${route}`;
      await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });

      const header = page.locator('header').first();
      if ((await header.count()) === 0) {
        failures.push(`[desktop] ${route}: Missing header`);
        await page.close();
        continue;
      }

      const cta = page.getByRole('link', { name: /Book a Market Entry Call/i }).first();
      if ((await cta.count()) === 0) {
        failures.push(`[desktop] ${route}: Missing header CTA`);
      } else {
        const bg = await cta.evaluate((el) => getComputedStyle(el).backgroundColor);
        const parsed = parseRgb(bg);
        if (!isTiffany(parsed)) {
          failures.push(`[desktop] ${route}: CTA not Tiffany-toned (${bg})`);
        }
      }

      // Validate sticky behavior switches class on scroll.
      const classBefore = await header.getAttribute('class');
      await page.evaluate(() => window.scrollTo({ top: 320, behavior: 'instant' }));
      await page.waitForTimeout(120);
      const classAfter = await header.getAttribute('class');
      if (classBefore === classAfter) {
        failures.push(`[desktop] ${route}: Header class did not change on scroll`);
      }

      await page.close();
    }

    await desktop.close();

    // Mobile interaction check on representative routes.
    const mobileRoutes = ['/', '/services', '/pricing', '/about', '/faq', '/contact'];
    const mobile = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 3,
    });
    await mobile.addInitScript(
      ({ key, value }) => {
        window.localStorage.setItem(key, value);
      },
      { key: COOKIE_CONSENT_KEY, value: COOKIE_CONSENT_VALUE },
    );

    for (const route of mobileRoutes) {
      const page = await mobile.newPage();
      await page.goto(`${origin}${route}`, { waitUntil: 'networkidle', timeout: 45000 });

      const menuButton = page.getByRole('button', { name: /Toggle menu/i }).first();
      if ((await menuButton.count()) === 0) {
        failures.push(`[mobile] ${route}: Missing menu toggle`);
        await page.close();
        continue;
      }

      const mobilePanel = page.locator('#site-mobile-nav');
      const navLink = page.locator('#site-mobile-nav a[href="/how-it-works"]').first();
      let panelVisible = await mobilePanel.isVisible().catch(() => false);
      if (!panelVisible) {
        await menuButton.click({ timeout: 5000 });
        panelVisible = await mobilePanel.isVisible().catch(() => false);
      }

      if (!panelVisible || !(await navLink.isVisible().catch(() => false))) {
        failures.push(`[mobile] ${route}: Menu did not open correctly`);
        await page.close();
        continue;
      }

      const mobileCta = page.getByRole('link', { name: /Book a Market Entry Call/i }).first();
      if ((await mobileCta.count()) === 0) {
        failures.push(`[mobile] ${route}: Missing mobile CTA`);
      } else {
        const bg = await mobileCta.evaluate((el) => getComputedStyle(el).backgroundColor);
        const parsed = parseRgb(bg);
        if (!isTiffany(parsed)) {
          failures.push(`[mobile] ${route}: Mobile CTA not Tiffany-toned (${bg})`);
        }
      }

      await navLink.click({ timeout: 5000 });
      await page.waitForTimeout(150);
      if (await menuButton.isVisible()) {
        const expanded = await menuButton.getAttribute('aria-expanded');
        const panelVisible = await mobilePanel.isVisible().catch(() => false);
        if (expanded !== 'false' || panelVisible) {
          failures.push(`[mobile] ${route}: Menu did not close after nav click`);
        }
      }

      await page.close();
    }

    await mobile.close();
    await browser.close();
  } finally {
    if (server) server.kill('SIGTERM');
  }

  if (failures.length > 0) {
    console.error('\nHeader/theme checks failed:');
    failures.forEach((failure) => console.error(`- ${failure}`));
    process.exit(1);
  }

  console.log(`\nHeader/theme checks passed across ${routes.length} desktop routes and mobile interaction routes.`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
