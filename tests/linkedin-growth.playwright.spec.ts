import { expect, test } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL;

test.describe("LinkedIn Growth logged-out flow", () => {
  test.skip(!baseURL, "PLAYWRIGHT_BASE_URL not set");

  test("overview page renders CTA links", async ({ page }) => {
    await page.goto(`${baseURL}/linkedin-growth`);

    await expect(
      page.getByRole("heading", { name: /linkedin/i })
    ).toBeVisible();

    await expect(
      page.getByRole("link", { name: /partner with creators/i })
    ).toHaveAttribute("href", "/linkedin-growth/business");

    await expect(
      page.getByRole("link", { name: /apply as a creator/i })
    ).toHaveAttribute("href", "/linkedin-growth/influencer");
  });

  test("business form submits and returns a submitted flag", async ({ page }) => {
    await page.goto(`${baseURL}/linkedin-growth/business`);

    await page.getByLabel("Your Name *").fill("Test Growth Lead");
    await page.getByLabel("Work Email *").fill("growth-test@referlabs.test");
    await page.getByLabel("Your Role *").fill("Head of Growth");
    await page.getByLabel("Company Name *").fill("Growth Test Co");
    await page.getByLabel("Company Website *").fill("https://referlabs.test");
    await page.getByLabel("Company Size *").fill("11-50");
    await page.getByLabel("Industry *").fill("SaaS");
    await page.getByLabel("Primary Goal *").fill("Demos booked");
    await page.getByLabel("Target Buyer *").fill("RevOps leaders");

    await Promise.all([
      page.waitForURL(/linkedin-growth\/business\?submitted=(0|1)/, {
        timeout: 20000,
      }),
      page.getByRole("button", { name: /submit partnership request/i }).click(),
    ]);

    await expect(page).toHaveURL(/linkedin-growth\/business\?submitted=(0|1)/);

    const utmSource = await page.locator('input[name="utm_source"]').inputValue();
    const utmCampaign = await page
      .locator('input[name="utm_campaign"]')
      .inputValue();
    expect(utmSource).toBeTruthy();
    expect(utmCampaign).toBeTruthy();
  });

  test("influencer form submits and returns a submitted flag", async ({ page }) => {
    await page.goto(`${baseURL}/linkedin-growth/influencer`);

    await page.getByLabel(/Full Name/i).fill("Creator Test");
    await page.getByLabel(/^Email/i).fill("creator-test@referlabs.test");
    await page
      .getByLabel(/LinkedIn Profile URL/i)
      .fill("https://linkedin.com/in/creator-test");
    await page.getByLabel(/Approximate Follower Count/i).fill("12500");
    await page
      .getByLabel(/Audience Focus/i)
      .fill("B2B founders and GTM leaders in SaaS.");
    await page
      .getByLabel(/Content Topics/i)
      .fill("Growth playbooks, GTM strategy, and scaling ops.");

    await Promise.all([
      page.waitForURL(/linkedin-growth\/influencer\?submitted=(0|1)/, {
        timeout: 20000,
      }),
      page.getByRole("button", { name: /submit application/i }).click(),
    ]);

    await expect(page).toHaveURL(/linkedin-growth\/influencer\?submitted=(0|1)/);

    const utmSource = await page.locator('input[name="utm_source"]').inputValue();
    const utmCampaign = await page
      .locator('input[name="utm_campaign"]')
      .inputValue();
    expect(utmSource).toBeTruthy();
    expect(utmCampaign).toBeTruthy();
  });
});
