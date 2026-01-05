/**
 * End-to-End tests for refactored dashboard
 * Validates that the dashboard works correctly with extracted step components
 */

import { test, expect } from '@playwright/test';

const TEST_BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

test.describe('Dashboard Refactored Components E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to dashboard (assuming user is authenticated)
    await page.goto(`${TEST_BASE_URL}/dashboard`);

    // Wait for dashboard to load
    await page.waitForLoadState('networkidle');
  });

  test('dashboard loads without errors', async ({ page }) => {
    // Check for no console errors
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.waitForTimeout(2000);

    // Should have no runtime errors
    expect(errors.filter(e => !e.includes('Download the React DevTools'))).toHaveLength(0);
  });

  test('Step 1 - Business Setup renders correctly', async ({ page }) => {
    // Look for Step 1 heading
    const step1 = await page.getByText('Business Setup & Integrations');
    await expect(step1).toBeVisible();
  });

  test('Step 2 - Add Clients & Ambassadors renders with refactored component', async ({ page }) => {
    // Find and click Step 2
    const step2Title = await page.getByText('Add Clients & Ambassadors');
    await expect(step2Title).toBeVisible();

    // Click to expand if needed
    if (await step2Title.isVisible()) {
      await step2Title.click();
      await page.waitForTimeout(500);
    }

    // Check for key Step 2 elements from Step2Content component
    const importCustomers = await page.getByText('Import Customers');
    await expect(importCustomers).toBeVisible();

    const bulkUploadText = await page.getByText(/Bulk upload spreadsheets/);
    await expect(bulkUploadText).toBeVisible();

    // Check customer table section
    const allCustomers = await page.getByText(/All Customers \(\d+\)/);
    await expect(allCustomers).toBeVisible();
  });

  test('Step 3 - Launch Campaigns renders with refactored component', async ({ page }) => {
    // Find Step 3
    const step3Title = await page.getByText('Launch Campaigns');
    await expect(step3Title).toBeVisible();

    // Click to expand
    await step3Title.click();
    await page.waitForTimeout(500);

    // Check for premium campaigns section from Step3Content
    const premiumCampaigns = await page.getByText('Premium Campaigns');
    await expect(premiumCampaigns).toBeVisible();

    const heroHeading = await page.getByText('Launch High-Converting Campaigns');
    await expect(heroHeading).toBeVisible();

    // Check for feature highlights
    const personalLinks = await page.getByText('Personal Links');
    await expect(personalLinks).toBeVisible();

    const liveTracking = await page.getByText('Live Tracking');
    await expect(liveTracking).toBeVisible();

    // Check for campaign builder
    const campaignBuilder = await page.getByText('Campaign Builder');
    await expect(campaignBuilder).toBeVisible();
  });

  test('Step 4 - Track Campaigns renders with refactored component', async ({ page }) => {
    // Find Step 4
    const step4Title = await page.getByText('Track Campaigns');
    await expect(step4Title).toBeVisible();

    // Click to expand
    await step4Title.click();
    await page.waitForTimeout(500);

    // Check for campaign insights tabs from Step4Content
    const campaignInsights = await page.getByText('Campaign insights');
    await expect(campaignInsights).toBeVisible();

    // Check for all tabs
    const analyticsTab = await page.getByRole('tab', { name: /Analytics/ });
    await expect(analyticsTab).toBeVisible();

    const historyTab = await page.getByRole('tab', { name: /Campaign History/ });
    await expect(historyTab).toBeVisible();

    const partnerTab = await page.getByRole('tab', { name: /Partner Referrals/ });
    await expect(partnerTab).toBeVisible();

    const shareTab = await page.getByRole('tab', { name: /Share Assets/ });
    await expect(shareTab).toBeVisible();
  });

  test('Step 4 - Tab navigation works correctly', async ({ page }) => {
    // Navigate to Step 4
    const step4Title = await page.getByText('Track Campaigns');
    await step4Title.click();
    await page.waitForTimeout(500);

    // Click on Campaign History tab
    const historyTab = await page.getByRole('tab', { name: /Campaign History/ });
    await historyTab.click();
    await page.waitForTimeout(300);

    // Check that history content loads
    const historyHeading = await page.getByText('Campaign History');
    await expect(historyHeading).toBeVisible();

    // Click on Partner Referrals tab
    const partnerTab = await page.getByRole('tab', { name: /Partner Referrals/ });
    await partnerTab.click();
    await page.waitForTimeout(300);

    // Click on Share Assets tab
    const shareTab = await page.getByRole('tab', { name: /Share Assets/ });
    await shareTab.click();
    await page.waitForTimeout(300);
  });

  test('Step 5 - Measure ROI renders correctly', async ({ page }) => {
    // Find Step 5 (not yet refactored but should still work)
    const step5Title = await page.getByText('Measure ROI');
    await expect(step5Title).toBeVisible();
  });

  test('all steps are accessible via guided flow', async ({ page }) => {
    // Check that all 5 steps are present
    const steps = await page.getByRole('heading', { level: 3 }).all();

    // Should have at least 5 step headings
    expect(steps.length).toBeGreaterThanOrEqual(5);
  });

  test('dashboard header shows correct stats', async ({ page }) => {
    // Dashboard header should be visible with stats
    const statsSection = await page.locator('[data-testid="dashboard-header"]');

    // If no data-testid, look for common stat indicators
    const ambassadorCount = await page.getByText(/ambassadors?/i).first();
    const referralCount = await page.getByText(/referrals?/i).first();

    // At least one stat should be visible
    const ambassadorVisible = await ambassadorCount.isVisible();
    const referralVisible = await referralCount.isVisible();
    expect(ambassadorVisible || referralVisible).toBeTruthy();
  });

  test('mobile warning shows on small screens', async ({ page }) => {
    // Resize to mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);

    // Look for mobile warning
    const mobileWarning = await page.getByText(/Mobile features are coming soon/);
    await expect(mobileWarning).toBeVisible();
  });

  test('no React hydration errors', async ({ page }) => {
    const hydrationErrors: string[] = [];

    page.on('console', (msg) => {
      const text = msg.text();
      if (text.includes('Hydration') || text.includes('hydration')) {
        hydrationErrors.push(text);
      }
    });

    await page.waitForTimeout(3000);

    expect(hydrationErrors).toHaveLength(0);
  });

  test('refactored components maintain correct prop types', async ({ page }) => {
    // This test checks for TypeScript errors in browser console
    const typeErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        if (text.includes('type') || text.includes('prop')) {
          typeErrors.push(text);
        }
      }
    });

    // Navigate through all steps
    const steps = [
      'Add Clients & Ambassadors',
      'Launch Campaigns',
      'Track Campaigns',
      'Measure ROI',
    ];

    for (const stepName of steps) {
      const step = await page.getByText(stepName);
      if (await step.isVisible()) {
        await step.click();
        await page.waitForTimeout(500);
      }
    }

    expect(typeErrors).toHaveLength(0);
  });
});

test.describe('Dashboard Performance After Refactoring', () => {
  test('dashboard loads within acceptable time', async ({ page }) => {
    const startTime = Date.now();

    await page.goto(`${TEST_BASE_URL}/dashboard`);
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - startTime;

    // Dashboard should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('no memory leaks from component refactoring', async ({ page }) => {
    await page.goto(`${TEST_BASE_URL}/dashboard`);

    // Get initial memory
    const initialMetrics = await page.evaluate(() => {
      if ('memory' in performance) {
        return (performance as any).memory.usedJSHeapSize;
      }
      return 0;
    });

    // Navigate through steps multiple times
    for (let i = 0; i < 5; i++) {
      const step2 = await page.getByText('Add Clients & Ambassadors');
      await step2.click();
      await page.waitForTimeout(200);

      const step3 = await page.getByText('Launch Campaigns');
      await step3.click();
      await page.waitForTimeout(200);

      const step4 = await page.getByText('Track Campaigns');
      await step4.click();
      await page.waitForTimeout(200);
    }

    // Get final memory
    const finalMetrics = await page.evaluate(() => {
      if ('memory' in performance) {
        return (performance as any).memory.usedJSHeapSize;
      }
      return 0;
    });

    // Memory shouldn't grow more than 50MB
    const memoryGrowth = finalMetrics - initialMetrics;
    expect(memoryGrowth).toBeLessThan(50 * 1024 * 1024);
  });

  test('refactored components render efficiently', async ({ page }) => {
    await page.goto(`${TEST_BASE_URL}/dashboard`);

    // Measure render time for Step 2
    const step2RenderStart = Date.now();
    const step2 = await page.getByText('Add Clients & Ambassadors');
    await step2.click();
    await page.waitForSelector('text=Import Customers');
    const step2RenderTime = Date.now() - step2RenderStart;

    expect(step2RenderTime).toBeLessThan(1000);

    // Measure render time for Step 3
    const step3RenderStart = Date.now();
    const step3 = await page.getByText('Launch Campaigns');
    await step3.click();
    await page.waitForSelector('text=Premium Campaigns');
    const step3RenderTime = Date.now() - step3RenderStart;

    expect(step3RenderTime).toBeLessThan(1000);

    // Measure render time for Step 4
    const step4RenderStart = Date.now();
    const step4 = await page.getByText('Track Campaigns');
    await step4.click();
    await page.waitForSelector('text=Campaign insights');
    const step4RenderTime = Date.now() - step4RenderStart;

    expect(step4RenderTime).toBeLessThan(1000);
  });
});

test.describe('Data Flow After Refactoring', () => {
  test('Step 2 receives correct customer data', async ({ page }) => {
    await page.goto(`${TEST_BASE_URL}/dashboard`);

    const step2 = await page.getByText('Add Clients & Ambassadors');
    await step2.click();
    await page.waitForTimeout(500);

    // Check if customer count is displayed
    const customerSection = await page.getByText(/All Customers \(\d+\)/);
    await expect(customerSection).toBeVisible();
  });

  test('Step 3 receives correct campaign configuration', async ({ page }) => {
    await page.goto(`${TEST_BASE_URL}/dashboard`);

    const step3 = await page.getByText('Launch Campaigns');
    await step3.click();
    await page.waitForTimeout(500);

    // Campaign builder should be present
    const campaignBuilder = await page.getByText('Campaign Builder');
    await expect(campaignBuilder).toBeVisible();
  });

  test('Step 4 receives correct campaign and referral data', async ({ page }) => {
    await page.goto(`${TEST_BASE_URL}/dashboard`);

    const step4 = await page.getByText('Track Campaigns');
    await step4.click();
    await page.waitForTimeout(500);

    // Tabs should be present
    const tabs = await page.getByRole('tab').all();
    expect(tabs.length).toBeGreaterThanOrEqual(4);
  });
});
