/**
 * End-to-End Attribution Testing
 *
 * Tests complete attribution flow from link click to conversion
 * to ensure ambassadors receive proper credit for their referrals.
 */

import { test, expect } from '@playwright/test';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const TEST_REFERRAL_CODE = 'xIP0b1MCwsQt';

test.describe('Attribution Flow E2E Tests', () => {
  test('should set attribution cookie when clicking referral link', async ({ page, context }) => {
    // Visit referral link
    await page.goto(`${SITE_URL}/r/${TEST_REFERRAL_CODE}`);

    // Should redirect to /referred page
    await expect(page).toHaveURL(/\/referred/);

    // Check attribution cookie is set
    const cookies = await context.cookies();
    const refCookie = cookies.find(c => c.name === 'ref_ambassador');

    expect(refCookie).toBeDefined();
    expect(refCookie?.httpOnly).toBe(true);
    expect(refCookie?.path).toBe('/');

    // Verify cookie data structure
    if (refCookie) {
      const cookieData = JSON.parse(refCookie.value);
      expect(cookieData).toHaveProperty('id');
      expect(cookieData).toHaveProperty('code', TEST_REFERRAL_CODE);
      expect(cookieData).toHaveProperty('business_id');
      expect(cookieData).toHaveProperty('timestamp');
      expect(cookieData).toHaveProperty('source');

      // Verify cookie age is within 30 days
      const cookieAge = Date.now() - cookieData.timestamp;
      const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
      expect(cookieAge).toBeLessThan(thirtyDaysMs);
    }
  });

  test('should display attribution badge on referred page', async ({ page }) => {
    // Visit referral link
    await page.goto(`${SITE_URL}/r/${TEST_REFERRAL_CODE}`);
    await expect(page).toHaveURL(/\/referred/);

    // Check attribution badge shows referral code
    const badge = page.getByText(/Referred by partner code:/i);
    await expect(badge).toBeVisible();
    await expect(badge).toContainText(TEST_REFERRAL_CODE);
  });

  test('should display both conversion paths', async ({ page }) => {
    await page.goto(`${SITE_URL}/r/${TEST_REFERRAL_CODE}`);

    // Check Submit Application button exists
    const submitButton = page.getByRole('button', { name: /Submit Application/i });
    await expect(submitButton).toBeVisible();

    // Check Book a Call button exists
    const bookCallButton = page.getByRole('button', { name: /Book a Call/i });
    await expect(bookCallButton).toBeVisible();
  });

  test('should track Book a Call click with attribution', async ({ page }) => {
    await page.goto(`${SITE_URL}/r/${TEST_REFERRAL_CODE}`);

    // Set up network monitoring
    const trackingRequests: any[] = [];
    page.on('request', request => {
      if (request.url().includes('/api/track-conversion')) {
        trackingRequests.push({
          url: request.url(),
          method: request.method(),
          postData: request.postData(),
        });
      }
    });

    // Click Book a Call button (will redirect, so we won't actually visit Calendly)
    const bookCallButton = page.getByRole('button', { name: /Book a Call/i }).first();

    // Click and expect redirect (catch the navigation)
    await Promise.race([
      bookCallButton.click(),
      page.waitForURL(/calendly\.com/i, { timeout: 5000 }).catch(() => {
        // Expected to redirect externally
      }),
    ]);

    // Verify tracking API was called
    await page.waitForTimeout(1000); // Give time for API call
    expect(trackingRequests.length).toBeGreaterThan(0);

    // Verify tracking data includes attribution
    if (trackingRequests.length > 0) {
      const trackingData = JSON.parse(trackingRequests[0].postData);
      expect(trackingData).toHaveProperty('eventType', 'schedule_call_clicked');
      expect(trackingData).toHaveProperty('ambassadorId');
      expect(trackingData).toHaveProperty('businessId');
      expect(trackingData).toHaveProperty('referralCode', TEST_REFERRAL_CODE);
    }
  });

  test('should validate application form fields', async ({ page }) => {
    await page.goto(`${SITE_URL}/r/${TEST_REFERRAL_CODE}`);

    // Scroll to form
    await page.locator('#application-form').scrollIntoViewIfNeeded();

    // Check all required fields exist
    await expect(page.getByLabel(/Business Name/i)).toBeVisible();
    await expect(page.getByLabel(/Industry/i)).toBeVisible();
    await expect(page.getByLabel(/Monthly Revenue/i)).toBeVisible();
    await expect(page.getByLabel(/Team Size/i)).toBeVisible();
    await expect(page.getByLabel(/Full Name/i)).toBeVisible();
    await expect(page.getByLabel(/Email/i)).toBeVisible();
    await expect(page.getByLabel(/Phone/i)).toBeVisible();
    await expect(page.getByLabel(/Your Role/i)).toBeVisible();
    await expect(page.getByLabel(/What are your main goals/i)).toBeVisible();
  });

  test('should submit application with attribution', async ({ page }) => {
    await page.goto(`${SITE_URL}/r/${TEST_REFERRAL_CODE}`);

    // Scroll to form
    await page.locator('#application-form').scrollIntoViewIfNeeded();

    // Fill out application form
    await page.getByLabel(/Business Name/i).fill('Test Company Pty Ltd');
    await page.getByLabel(/Industry/i).selectOption('saas');
    await page.getByLabel(/Website/i).fill('https://testcompany.com');
    await page.getByLabel(/Monthly Revenue/i).selectOption('50k-100k');
    await page.getByLabel(/Team Size/i).selectOption('6-20');
    await page.getByLabel(/Full Name/i).fill('Test User');
    await page.getByLabel(/Email/i).fill('test@testcompany.com');
    await page.getByLabel(/Phone/i).fill('+61400000000');
    await page.getByLabel(/Your Role/i).fill('CEO');
    await page.getByLabel(/What are your main goals/i).fill('Test attribution tracking');
    await page.getByLabel(/How did you hear/i).fill('E2E Test');

    // Set up network monitoring for submission
    const submissionRequests: any[] = [];
    page.on('request', request => {
      if (request.url().includes('/api/referred/submit-application')) {
        submissionRequests.push({
          url: request.url(),
          method: request.method(),
          postData: request.postData(),
        });
      }
    });

    // Submit form
    await page.getByRole('button', { name: /Submit Application/i }).click();

    // Wait for submission
    await page.waitForTimeout(2000);

    // Verify API was called
    expect(submissionRequests.length).toBeGreaterThan(0);

    // Verify submission data includes attribution
    if (submissionRequests.length > 0) {
      const submissionData = JSON.parse(submissionRequests[0].postData);
      expect(submissionData).toHaveProperty('ambassadorId');
      expect(submissionData).toHaveProperty('businessId');
      expect(submissionData).toHaveProperty('referralCode', TEST_REFERRAL_CODE);
      expect(submissionData).toHaveProperty('businessName', 'Test Company Pty Ltd');
      expect(submissionData).toHaveProperty('fullName', 'Test User');
      expect(submissionData).toHaveProperty('email', 'test@testcompany.com');
    }

    // Check success message appears
    await expect(page.getByText(/Application Received/i)).toBeVisible({ timeout: 5000 });
  });

  test('should redirect to homepage if no attribution cookie', async ({ page, context }) => {
    // Clear all cookies
    await context.clearCookies();

    // Try to visit /referred directly without referral link
    await page.goto(`${SITE_URL}/referred`);

    // Should redirect to homepage
    await expect(page).toHaveURL(/^\/$|\/$/);
  });

  test('should handle expired attribution cookie', async ({ page, context }) => {
    // Create expired cookie (31 days old)
    const expiredTimestamp = Date.now() - (31 * 24 * 60 * 60 * 1000);
    const expiredCookieData = {
      id: 'test-ambassador-id',
      code: TEST_REFERRAL_CODE,
      business_id: 'test-business-id',
      timestamp: expiredTimestamp,
      source: 'direct',
    };

    await context.addCookies([{
      name: 'ref_ambassador',
      value: JSON.stringify(expiredCookieData),
      domain: new URL(SITE_URL).hostname,
      path: '/',
      httpOnly: true,
      secure: SITE_URL.startsWith('https'),
      sameSite: 'Lax',
    }]);

    // Try to visit /referred with expired cookie
    await page.goto(`${SITE_URL}/referred`);

    // Should redirect to homepage (expired cookie treated as no cookie)
    await expect(page).toHaveURL(/^\/$|\/$/);
  });

  test('should preserve attribution across page navigation', async ({ page, context }) => {
    // Visit referral link
    await page.goto(`${SITE_URL}/r/${TEST_REFERRAL_CODE}`);
    await expect(page).toHaveURL(/\/referred/);

    // Get initial cookie
    let cookies = await context.cookies();
    const initialCookie = cookies.find(c => c.name === 'ref_ambassador');
    expect(initialCookie).toBeDefined();

    // Navigate to other pages
    await page.goto(`${SITE_URL}/about`);
    await page.goto(`${SITE_URL}/pricing`);

    // Navigate back to referred page
    await page.goto(`${SITE_URL}/referred`);

    // Check cookie still exists
    cookies = await context.cookies();
    const persistedCookie = cookies.find(c => c.name === 'ref_ambassador');
    expect(persistedCookie).toBeDefined();
    expect(persistedCookie?.value).toBe(initialCookie?.value);

    // Attribution badge should still show
    await expect(page.getByText(/Referred by partner code:/i)).toBeVisible();
  });

  test('should display social proof and features', async ({ page }) => {
    await page.goto(`${SITE_URL}/r/${TEST_REFERRAL_CODE}`);

    // Check stats are visible
    await expect(page.getByText(/500\+/i)).toBeVisible(); // 500+ businesses
    await expect(page.getByText(/\$2M\+/i)).toBeVisible(); // $2M+ revenue
    await expect(page.getByText(/3\.2x/i)).toBeVisible(); // 3.2x ROI

    // Check testimonials exist
    await expect(page.getByText(/transformed our customer acquisition/i)).toBeVisible();

    // Check features are displayed
    await expect(page.getByText(/Quick Integration/i)).toBeVisible();
    await expect(page.getByText(/Smart Tracking/i)).toBeVisible();
  });

  test('should be mobile responsive', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto(`${SITE_URL}/r/${TEST_REFERRAL_CODE}`);

    // Check key elements are visible on mobile
    await expect(page.getByText(/Join the referral program revolution/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /Submit Application/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Book a Call/i })).toBeVisible();

    // Check form is accessible
    await page.locator('#application-form').scrollIntoViewIfNeeded();
    await expect(page.getByLabel(/Business Name/i)).toBeVisible();
  });
});

test.describe('Admin vs Partner Redirect Logic', () => {
  test('should redirect partner referral to client acquisition page', async ({ page }) => {
    await page.goto(`${SITE_URL}/r/${TEST_REFERRAL_CODE}`);
    await expect(page).toHaveURL(/\/referred/);
    await expect(page.getByText(/Join the referral program revolution/i)).toBeVisible();
  });

  test('should redirect admin referral to partner recruitment page', async ({ page }) => {
    const ADMIN_CODE = 'Jn9wjbn2kQlO';
    await page.goto(`${SITE_URL}/r/${ADMIN_CODE}`);
    await expect(page).toHaveURL(/\/our-referral-program/);
  });
});
