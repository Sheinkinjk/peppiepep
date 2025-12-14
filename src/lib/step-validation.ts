/**
 * Step validation utilities for the guided dashboard flow
 */

export type StepValidation = {
  isComplete: boolean;
  blockers: string[];
  warnings: string[];
  completionPercentage: number;
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
  const blockers: string[] = [];
  const warnings: string[] = [];
  let completionPercentage = 0;

  // Check program settings
  if (!checks.hasProgramSettings) {
    blockers.push("Complete business setup and reward configuration");
  } else {
    completionPercentage += 60;
  }

  // Check integration setup
  if (!checks.hasIntegrationSetup) {
    warnings.push("Website integration not verified");
  } else {
    completionPercentage += 20;
  }

  // Check discount capture
  if (!checks.hasDiscountCapture) {
    warnings.push("Discount capture endpoint not configured");
  } else {
    completionPercentage += 20;
  }

  return {
    isComplete: checks.hasProgramSettings && blockers.length === 0,
    blockers,
    warnings,
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
  const blockers: string[] = [];
  const warnings: string[] = [];
  let completionPercentage = 0;

  if (!checks.hasProgramSettings) {
    blockers.push("Complete Step 1: Business Setup first");
  } else {
    completionPercentage += 30;
  }

  if (!checks.hasCustomers) {
    blockers.push("Add at least one customer/ambassador");
  } else {
    completionPercentage += 70;
  }

  return {
    isComplete: checks.hasProgramSettings && checks.hasCustomers,
    blockers,
    warnings,
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
  const blockers: string[] = [];
  const warnings: string[] = [];
  let completionPercentage = 0;

  if (!checks.hasProgramSettings) {
    blockers.push("Complete Step 1: Business Setup first");
  } else {
    completionPercentage += 20;
  }

  if (!checks.hasCustomers) {
    blockers.push("Complete Step 2: Add ambassadors first");
  } else {
    completionPercentage += 30;
  }

  if (checks.totalCampaignsSent === 0) {
    blockers.push("Launch your first campaign");
  } else {
    completionPercentage += 50;
  }

  return {
    isComplete: checks.totalCampaignsSent > 0 && blockers.length === 0,
    blockers,
    warnings,
    completionPercentage: Math.min(completionPercentage, 100),
  };
}

/**
 * Step 4: Track Campaigns
 */
function validateStep4(checks: {
  totalCampaignsSent: number;
}): StepValidation {
  const blockers: string[] = [];
  const warnings: string[] = [];
  let completionPercentage = 0;

  if (checks.totalCampaignsSent === 0) {
    blockers.push("Complete Step 3: Launch a campaign first");
  } else {
    completionPercentage += 100;
  }

  return {
    isComplete: checks.totalCampaignsSent > 0,
    blockers,
    warnings,
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
  const blockers: string[] = [];
  const warnings: string[] = [];
  let completionPercentage = 0;

  if (checks.totalCampaignsSent === 0) {
    warnings.push("Launch campaigns to generate referrals");
    completionPercentage += 30;
  } else {
    completionPercentage += 50;
  }

  if (!checks.hasReferrals) {
    warnings.push("No referrals tracked yet");
  } else {
    completionPercentage += 50;
  }

  return {
    isComplete: checks.hasReferrals,
    blockers,
    warnings,
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
