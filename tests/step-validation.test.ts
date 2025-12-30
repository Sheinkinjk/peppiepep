import { describe, expect, it } from "vitest";

import { calculateOverallProgress, getNextIncompleteStep, validateSteps } from "@/lib/step-validation";

describe("step validation", () => {
  it("requires program settings for Step 1 completion", () => {
    const validations = validateSteps({
      hasProgramSettings: false,
      hasCustomers: false,
      totalCampaignsSent: 0,
      hasReferrals: false,
      hasIntegrationSetup: false,
      hasDiscountCapture: false,
    });

    expect(validations["setup-integration"].isComplete).toBe(false);
    expect(validations["setup-integration"].completionPercentage).toBe(0);
    expect(validations["setup-integration"].items.some((item) => item.kind === "action_required")).toBe(true);
    expect(getNextIncompleteStep(validations)).toBe("setup-integration");
  });

  it("marks Step 1 complete once settings exist and suggests integrations", () => {
    const validations = validateSteps({
      hasProgramSettings: true,
      hasCustomers: false,
      totalCampaignsSent: 0,
      hasReferrals: false,
      hasIntegrationSetup: false,
      hasDiscountCapture: false,
    });

    expect(validations["setup-integration"].isComplete).toBe(true);
    expect(validations["setup-integration"].completionPercentage).toBe(100);
    expect(validations["setup-integration"].items.some((item) => item.kind === "recommended")).toBe(true);
    expect(getNextIncompleteStep(validations)).toBe("clients-ambassadors");
  });

  it("reaches 100% overall when all steps are complete", () => {
    const validations = validateSteps({
      hasProgramSettings: true,
      hasCustomers: true,
      totalCampaignsSent: 5,
      hasReferrals: true,
      hasIntegrationSetup: true,
      hasDiscountCapture: true,
    });

    expect(Object.values(validations).every((step) => step.isComplete)).toBe(true);
    expect(calculateOverallProgress(validations)).toBe(100);
  });
});

