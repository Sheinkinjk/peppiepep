/**
 * Step validation utilities for the guided dashboard flow
 */

export type StepValidation = {
  isComplete: boolean;
  items: StepChecklistItem[];
  completionPercentage: number;
};

export type StepChecklistItemKind = "action_required" | "recommended" | "info_only";

export type StepChecklistItem = {
  kind: StepChecklistItemKind;
  label: string;
  where: string;
  cta?: {
    label: string;
    stepId: keyof StepValidations;
  };
};

export type StepValidations = {
  'setup-integration': StepValidation;
  'clients-ambassadors': StepValidation;
  'crm-integration': StepValidation;
  'view-campaigns': StepValidation;
  'performance': StepValidation;
};

type ValidationChecks = {
  hasProgramSettings: boolean;
  hasCustomers: boolean;
  totalCampaignsSent: number;
  hasReferrals: boolean;
  hasIntegrationSetup?: boolean;
  hasDiscountCapture?: boolean;
};

/**
 * Validates all steps and returns detailed validation status
 */
export function validateSteps(checks: ValidationChecks): StepValidations {
  const {
    hasProgramSettings,
    hasCustomers,
    totalCampaignsSent,
    hasReferrals,
    hasIntegrationSetup = false,
    hasDiscountCapture = false,
  } = checks;

  return {
    'setup-integration': validateStep1({
      hasProgramSettings,
      hasIntegrationSetup,
      hasDiscountCapture,
    }),
    'clients-ambassadors': validateStep2({
      hasProgramSettings,
      hasCustomers,
    }),
    'crm-integration': validateStep3({
      hasProgramSettings,
      hasCustomers,
      totalCampaignsSent,
    }),
    'view-campaigns': validateStep4({
      totalCampaignsSent,
    }),
    'performance': validateStep5({
      hasReferrals,
      totalCampaignsSent,
    }),
  };
}

/**
 * Step 1: Business Setup & Integrations
 */
function validateStep1(checks: {
  hasProgramSettings: boolean;
  hasIntegrationSetup: boolean;
  hasDiscountCapture: boolean;
}): StepValidation {
  const items: StepChecklistItem[] = [];
  let completionPercentage = 0;

  if (!checks.hasProgramSettings) {
    items.push({
      kind: "action_required",
      label: "Save your program settings (offer + rewards)",
      where: "In Refer Labs (Step 1)",
      cta: { label: "Open Step 1", stepId: "setup-integration" },
    });
    return {
      isComplete: false,
      items,
      completionPercentage: 0,
    };
  }

  completionPercentage = 100;

  if (!checks.hasDiscountCapture) {
    items.push({
      kind: "recommended",
      label: "Enable automatic conversion tracking (discount capture secret missing)",
      where: "In Refer Labs (Step 1C)",
      cta: { label: "Open Step 1", stepId: "setup-integration" },
    });
  }

  if (!checks.hasIntegrationSetup) {
    items.push({
      kind: "recommended",
      label: "Complete the website integration checklist (mark website integration complete)",
      where: "In Refer Labs (Step 1D)",
      cta: { label: "Open Step 1", stepId: "setup-integration" },
    });
  }

  return {
    isComplete: checks.hasProgramSettings,
    items,
    completionPercentage: Math.min(completionPercentage, 100),
  };
}

/**
 * Step 2: Add Clients & Ambassadors
 */
function validateStep2(checks: {
  hasProgramSettings: boolean;
  hasCustomers: boolean;
}): StepValidation {
  const items: StepChecklistItem[] = [];
  let completionPercentage = 0;

  if (!checks.hasProgramSettings) {
    items.push({
      kind: "action_required",
      label: "Complete Step 1 first (business setup)",
      where: "In Refer Labs (Step 1)",
      cta: { label: "Open Step 1", stepId: "setup-integration" },
    });
    // 0% until prerequisites are met
  } else if (!checks.hasCustomers) {
    items.push({
      kind: "action_required",
      label: "Add at least one client/ambassador",
      where: "In Refer Labs (Step 2)",
      cta: { label: "Open Step 2", stepId: "clients-ambassadors" },
    });
    // Still 0% - prerequisites met but main task not done
  } else {
    completionPercentage = 100; // Only give credit when customers are added
  }

  if (checks.hasProgramSettings && !checks.hasCustomers) {
    items.push({
      kind: "recommended",
      label: "Start with 10–20 loyal clients first (then scale with CSV)",
      where: "In Refer Labs (Step 2)",
      cta: { label: "Open Step 2", stepId: "clients-ambassadors" },
    });
  }

  return {
    isComplete: checks.hasProgramSettings && checks.hasCustomers,
    items,
    completionPercentage: Math.min(completionPercentage, 100),
  };
}

/**
 * Step 3: Launch Campaigns
 */
function validateStep3(checks: {
  hasProgramSettings: boolean;
  hasCustomers: boolean;
  totalCampaignsSent: number;
}): StepValidation {
  const items: StepChecklistItem[] = [];
  let completionPercentage = 0;

  if (!checks.hasProgramSettings) {
    items.push({
      kind: "action_required",
      label: "Complete Step 1 first (business setup)",
      where: "In Refer Labs (Step 1)",
      cta: { label: "Open Step 1", stepId: "setup-integration" },
    });
    // 0% until prerequisites are met
  } else if (!checks.hasCustomers) {
    items.push({
      kind: "action_required",
      label: "Add ambassadors before launching a campaign",
      where: "In Refer Labs (Step 2)",
      cta: { label: "Open Step 2", stepId: "clients-ambassadors" },
    });
    // Still 0% until all prerequisites are met
  } else if (checks.totalCampaignsSent === 0) {
    items.push({
      kind: "action_required",
      label: "Launch your first campaign",
      where: "In Refer Labs (Step 3) or your CRM",
      cta: { label: "Open Step 3", stepId: "crm-integration" },
    });
    // Still 0% - prerequisites met but main task not done
  } else {
    completionPercentage = 100; // Only give credit when campaign is launched
  }

  items.push({
    kind: "info_only",
    label: "Tip: send a test message to yourself first to confirm links and formatting.",
    where: "Info",
  });

  return {
    isComplete: checks.totalCampaignsSent > 0,
    items,
    completionPercentage: Math.min(completionPercentage, 100),
  };
}

/**
 * Step 4: Track Campaigns
 */
function validateStep4(checks: {
  totalCampaignsSent: number;
}): StepValidation {
  const items: StepChecklistItem[] = [];
  let completionPercentage = 0;

  if (checks.totalCampaignsSent === 0) {
    items.push({
      kind: "action_required",
      label: "Launch a campaign first",
      where: "In Refer Labs (Step 3) or your CRM",
      cta: { label: "Open Step 3", stepId: "crm-integration" },
    });
  } else {
    completionPercentage += 100;
    items.push({
      kind: "recommended",
      label: "Review clicks, conversions, and top ambassadors weekly",
      where: "In Refer Labs (Step 4)",
      cta: { label: "Open Step 4", stepId: "view-campaigns" },
    });
  }

  return {
    isComplete: checks.totalCampaignsSent > 0,
    items,
    completionPercentage: Math.min(completionPercentage, 100),
  };
}

/**
 * Step 5: Measure ROI
 */
function validateStep5(checks: {
  hasReferrals: boolean;
  totalCampaignsSent: number;
}): StepValidation {
  const items: StepChecklistItem[] = [];
  let completionPercentage = 0;

  if (checks.totalCampaignsSent === 0) {
    items.push({
      kind: "recommended",
      label: "Launch campaigns to start generating referrals",
      where: "In Refer Labs (Step 3) or your CRM",
      cta: { label: "Open Step 3", stepId: "crm-integration" },
    });
    // 0% until campaigns are launched
  } else if (!checks.hasReferrals) {
    items.push({
      kind: "recommended",
      label: "No referrals tracked yet — give it time or add a manual referral",
      where: "In Refer Labs (Step 5)",
      cta: { label: "Open Step 5", stepId: "performance" },
    });
    // Still 0% until referrals come in
  } else {
    completionPercentage = 100; // Only give credit when referrals are tracked
  }

  return {
    isComplete: checks.hasReferrals,
    items,
    completionPercentage: Math.min(completionPercentage, 100),
  };
}

/**
 * Determines which step should be auto-expanded
 */
export function getNextIncompleteStep(validations: StepValidations): string | null {
  const stepOrder: (keyof StepValidations)[] = [
    'setup-integration',
    'clients-ambassadors',
    'crm-integration',
    'view-campaigns',
    'performance',
  ];

  // Find first incomplete step
  for (const stepId of stepOrder) {
    if (!validations[stepId].isComplete) {
      return stepId;
    }
  }

  // All complete, return last step
  return 'performance';
}

/**
 * Calculate overall progress percentage
 */
export function calculateOverallProgress(validations: StepValidations): number {
  const steps = Object.values(validations);
  const totalPercentage = steps.reduce((sum, step) => sum + step.completionPercentage, 0);
  return Math.round(totalPercentage / steps.length);
}
