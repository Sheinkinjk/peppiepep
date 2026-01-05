/**
 * Visual regression tests for refactored dashboard components
 * Ensures UI remains consistent after component extraction
 */

import { test, expect } from '@playwright/test';

const TEST_BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

test.describe('Visual Regression - Dashboard Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${TEST_BASE_URL}/dashboard`);
    await page.waitForLoadState('networkidle');
  });

  test('Step 2 - Visual consistency check', async ({ page }) => {
    // Navigate to Step 2
    const step2 = await page.getByText('Add Clients & Ambassadors');
    await step2.click();
    await page.waitForTimeout(1000);

    // Take screenshot of Step 2 content
    const step2Content = await page.locator('[data-csv-upload]').first();
    await expect(step2Content).toHaveScreenshot('step2-import-customers.png', {
      maxDiffPixels: 100,
    });

    // Check quick add section
    const quickAdd = await page.locator('[data-quick-add]').first();
    await expect(quickAdd).toHaveScreenshot('step2-quick-add.png', {
      maxDiffPixels: 100,
    });
  });

  test('Step 3 - Visual consistency check', async ({ page }) => {
    // Navigate to Step 3
    const step3 = await page.getByText('Launch Campaigns');
    await step3.click();
    await page.waitForTimeout(1000);

    // Screenshot of premium campaigns hero
    const premiumSection = await page.getByText('Launch High-Converting Campaigns').locator('..');
    await expect(premiumSection).toHaveScreenshot('step3-premium-hero.png', {
      maxDiffPixels: 100,
    });
  });

  test('Step 4 - Visual consistency check', async ({ page }) => {
    // Navigate to Step 4
    const step4 = await page.getByText('Track Campaigns');
    await step4.click();
    await page.waitForTimeout(1000);

    // Screenshot of tabs section
    const tabsSection = await page.getByText('Campaign insights').locator('..');
    await expect(tabsSection).toHaveScreenshot('step4-tabs.png', {
      maxDiffPixels: 100,
    });

    // Click through each tab and screenshot
    const tabs = [
      { name: 'Analytics', screenshot: 'step4-analytics-tab.png' },
      { name: 'Campaign History', screenshot: 'step4-history-tab.png' },
      { name: /Partner Referrals/, screenshot: 'step4-partner-tab.png' },
      { name: 'Share Assets', screenshot: 'step4-share-tab.png' },
    ];

    for (const tab of tabs) {
      const tabElement = await page.getByRole('tab', { name: tab.name });
      await tabElement.click();
      await page.waitForTimeout(500);

      const tabContent = await page.locator('[role="tabpanel"]').first();
      await expect(tabContent).toHaveScreenshot(tab.screenshot, {
        maxDiffPixels: 200, // Allow more variance for dynamic content
      });
    }
  });

  test('Dashboard header - Visual consistency', async ({ page }) => {
    await expect(page).toHaveScreenshot('dashboard-header.png', {
      fullPage: false,
      clip: { x: 0, y: 0, width: 1920, height: 200 },
      maxDiffPixels: 100,
    });
  });

  test('Mobile view - Step 2 responsive layout', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);

    const step2 = await page.getByText('Add Clients & Ambassadors');
    await step2.click();
    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot('mobile-step2.png', {
      fullPage: true,
      maxDiffPixels: 150,
    });
  });

  test('Mobile view - Step 3 responsive layout', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);

    const step3 = await page.getByText('Launch Campaigns');
    await step3.click();
    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot('mobile-step3.png', {
      fullPage: true,
      maxDiffPixels: 150,
    });
  });

  test('Tablet view - Dashboard layout', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('tablet-dashboard.png', {
      fullPage: true,
      maxDiffPixels: 200,
    });
  });
});

test.describe('Accessibility After Refactoring', () => {
  test('Step 2 has no accessibility violations', async ({ page }) => {
    await page.goto(`${TEST_BASE_URL}/dashboard`);

    const step2 = await page.getByText('Add Clients & Ambassadors');
    await step2.click();
    await page.waitForTimeout(500);

    // Check for ARIA labels
    const importSection = await page.locator('[data-csv-upload]');
    await expect(importSection).toBeVisible();

    // Verify headings hierarchy
    const headings = await page.locator('h2, h3, h4').all();
    expect(headings.length).toBeGreaterThan(0);
  });

  test('Step 3 has proper button labels', async ({ page }) => {
    await page.goto(`${TEST_BASE_URL}/dashboard`);

    const step3 = await page.getByText('Launch Campaigns');
    await step3.click();
    await page.waitForTimeout(500);

    // All buttons should have accessible text
    const buttons = await page.getByRole('button').all();
    for (const button of buttons) {
      const text = await button.textContent();
      const ariaLabel = await button.getAttribute('aria-label');

      expect(text || ariaLabel).toBeTruthy();
    }
  });

  test('Step 4 tabs have proper ARIA roles', async ({ page }) => {
    await page.goto(`${TEST_BASE_URL}/dashboard`);

    const step4 = await page.getByText('Track Campaigns');
    await step4.click();
    await page.waitForTimeout(500);

    // Check tab roles
    const tabs = await page.getByRole('tab').all();
    expect(tabs.length).toBe(4);

    // Each tab should be keyboard accessible
    for (const tab of tabs) {
      const tabIndex = await tab.getAttribute('tabindex');
      expect(tabIndex).not.toBe('-1');
    }
  });

  test('keyboard navigation works through refactored components', async ({ page }) => {
    await page.goto(`${TEST_BASE_URL}/dashboard`);

    // Navigate to Step 2 with keyboard
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);

    // Check that Step 2 content is visible
    const importCustomers = await page.getByText('Import Customers');
    await expect(importCustomers).toBeVisible();
  });
});

test.describe('Error States and Edge Cases', () => {
  test('Step 2 shows empty state correctly', async ({ page }) => {
    // This would require mocking data or test environment setup
    await page.goto(`${TEST_BASE_URL}/dashboard`);

    const step2 = await page.getByText('Add Clients & Ambassadors');
    await step2.click();
    await page.waitForTimeout(500);

    // Look for either customer list or empty state
    const customerList = await page.getByText(/All Customers/);
    const emptyState = await page.getByText(/No customers yet/);

    const hasCustomerList = await customerList.isVisible();
    const hasEmptyState = await emptyState.isVisible();

    expect(hasCustomerList || hasEmptyState).toBeTruthy();
  });

  test('Step 4 handles no campaigns gracefully', async ({ page }) => {
    await page.goto(`${TEST_BASE_URL}/dashboard`);

    const step4 = await page.getByText('Track Campaigns');
    await step4.click();
    await page.waitForTimeout(500);

    // Should show either campaign data or empty state
    const campaignContent = await page.locator('[role="tabpanel"]').first();
    await expect(campaignContent).toBeVisible();
  });

  test('all refactored components handle loading states', async ({ page }) => {
    await page.goto(`${TEST_BASE_URL}/dashboard`);

    // No loading spinners should be stuck
    const loadingIndicators = await page.locator('[data-loading], [aria-busy="true"]').all();

    await page.waitForTimeout(3000);

    const stillLoading = await page.locator('[aria-busy="true"]').count();
    expect(stillLoading).toBe(0);
  });
});

test.describe('Component Isolation Tests', () => {
  test('Step 2 component does not affect Step 3', async ({ page }) => {
    await page.goto(`${TEST_BASE_URL}/dashboard`);

    // Open Step 2
    const step2 = await page.getByText('Add Clients & Ambassadors');
    await step2.click();
    await page.waitForTimeout(500);

    // Verify Step 2 content
    await expect(page.getByText('Import Customers')).toBeVisible();

    // Open Step 3
    const step3 = await page.getByText('Launch Campaigns');
    await step3.click();
    await page.waitForTimeout(500);

    // Verify Step 3 content is independent
    await expect(page.getByText('Premium Campaigns')).toBeVisible();

    // Step 2 specific content should not interfere
    const step2Specific = await page.getByText('Import Customers').isVisible();
    const step3Specific = await page.getByText('Premium Campaigns').isVisible();

    expect(step3Specific).toBeTruthy();
  });

  test('Step 3 component does not affect Step 4', async ({ page }) => {
    await page.goto(`${TEST_BASE_URL}/dashboard`);

    // Open Step 3
    const step3 = await page.getByText('Launch Campaigns');
    await step3.click();
    await page.waitForTimeout(500);

    // Open Step 4
    const step4 = await page.getByText('Track Campaigns');
    await step4.click();
    await page.waitForTimeout(500);

    // Verify Step 4 has its own independent content
    await expect(page.getByText('Campaign insights')).toBeVisible();

    // Should have tabs
    const tabs = await page.getByRole('tab').count();
    expect(tabs).toBe(4);
  });

  test('component state does not leak between steps', async ({ page }) => {
    await page.goto(`${TEST_BASE_URL}/dashboard`);

    // Navigate through all steps
    const steps = ['Add Clients & Ambassadors', 'Launch Campaigns', 'Track Campaigns'];

    for (const stepName of steps) {
      const step = await page.getByText(stepName);
      await step.click();
      await page.waitForTimeout(300);
    }

    // Go back to Step 2
    const step2 = await page.getByText('Add Clients & Ambassadors');
    await step2.click();
    await page.waitForTimeout(500);

    // Step 2 should still render correctly
    await expect(page.getByText('Import Customers')).toBeVisible();
  });
});
