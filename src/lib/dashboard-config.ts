import type { Database } from "@/types/supabase";

type ReferralEvent = Database["public"]["Tables"]["referral_events"]["Row"];

export interface StepValidation {
  isComplete: boolean;
  items: Array<{
    id: string;
    label: string;
    kind: "action_required" | "recommended" | "info";
    completed: boolean;
  }>;
}

export interface QAReadinessStep {
  id: string;
  title: string;
  detail: string;
  status: string;
  explainer: string | null;
  actionLabel?: string | null;
  actionSection?: string | null;
  actionScroll?: string | null;
  tone: string;
}

interface QAReadinessParams {
  stepValidations: Record<string, StepValidation>;
  hasProgramSettings: boolean;
  hasPages: boolean;
  hasCustomers: boolean;
  hasCampaigns: boolean;
  totalCampaignsSent: number;
  safeReferrals: unknown[];
  typedReferralEvents: ReferralEvent[];
  qaVerifiedAt?: string | null;
}

/**
 * Generates QA readiness steps based on current dashboard state.
 * Extracted to reduce dashboard page.tsx size.
 */
export function generateQAReadinessSteps(params: QAReadinessParams): QAReadinessStep[] {
  const {
    stepValidations,
    hasProgramSettings,
    hasPages,
    hasCustomers,
    hasCampaigns,
    totalCampaignsSent,
    safeReferrals,
    typedReferralEvents,
    qaVerifiedAt,
  } = params;

  // Check for recent QA events (within last 10 minutes) OR persisted verification
  const recentQaEvents = typedReferralEvents.filter((event) => {
    const created = event.created_at ? Date.parse(event.created_at) : 0;
    const metadata = event.metadata as Record<string, unknown> | null;
    const isQa = event.source === "integration_qa" || Boolean(metadata?.qa_simulated);
    return created >= Date.now() - 10 * 60 * 1000 && isQa;
  });

  // Check if QA was verified (persisted state or recent events)
  const hasQaVerification =
    Boolean(qaVerifiedAt) ||
    typedReferralEvents.some((event) => event.source === "integration_qa");

  const qaDetail = (() => {
    if (recentQaEvents.length > 0) {
      return `QA verified (${recentQaEvents.length} events in last 10 min)`;
    }
    if (qaVerifiedAt) {
      return `QA verified on ${new Date(qaVerifiedAt).toLocaleDateString()}`;
    }
    return "Run Integration QA + cookie check once pages are live";
  })();

  return [
    {
      id: "setup-integration",
      title: "Step 1 · Business setup & integrations",
      detail: hasProgramSettings
        ? "Business profile + rewards saved"
        : "Finish business profile + rewards setup",
      status: stepValidations["setup-integration"]?.isComplete ? "Ready" : "Needs attention",
      explainer: !stepValidations["setup-integration"]?.isComplete
        ? "Complete your business profile and configure referral rewards in Settings. This enables partners to know what they earn for referrals."
        : null,
      tone: stepValidations["setup-integration"]?.isComplete ? "emerald" : "amber",
    },
    {
      id: "pages",
      title: "Step 2 · Publish /referral + /referred",
      detail: hasPages ? "Pages published on your chosen host" : "Publish /referral + /referred to your host",
      status: hasPages ? "Ready" : "Needs attention",
      explainer: !hasPages
        ? "Open Pages to pick a host (Refer Labs, embed, or custom domain), set your paths, then Save & publish. /r/[code] will follow the same host."
        : null,
      actionLabel: "Open Pages",
      actionSection: "pages",
      actionScroll: "page-builder-panel",
      tone: hasPages ? "emerald" : "amber",
    },
    {
      id: "testing-qa",
      title: "Step 3 · Testing & QA (after Pages)",
      detail: qaDetail,
      status: hasQaVerification ? "Verified" : "Not run",
      explainer: !hasQaVerification
        ? "After publishing /referral + /referred, open Testing & QA to simulate the full referral flow. This confirms embed/custom-domain connections, cookies, and attribution before inviting partners."
        : null,
      tone: hasQaVerification ? "emerald" : "amber",
    },
    {
      id: "clients-ambassadors",
      title: "Step 4 · Clients & ambassadors",
      detail: hasCustomers ? "Ambassadors imported + links active" : "Add your first ambassadors",
      status: hasCustomers ? "Ready" : "Needs attention",
      explainer: !hasCustomers
        ? "Add at least one ambassador (partner) to generate referral links. You can import clients, partners, or influencers who will refer business to you."
        : null,
      actionLabel: "Add ambassadors",
      actionSection: "clients-ambassadors",
      tone: hasCustomers ? "emerald" : "amber",
    },
    {
      id: "crm-integration",
      title: "Step 5 · Launch campaigns",
      detail: hasCampaigns ? "Campaigns have been sent" : "Prepare email/CRM campaign flow",
      status: hasCampaigns ? "Ready" : "Pending",
      explainer: !hasCampaigns
        ? "Create and send your first referral campaign to notify partners about the program. This activates their referral links."
        : null,
      actionLabel: "Review campaigns",
      actionSection: "crm-integration",
      tone: hasCampaigns ? "emerald" : "slate",
    },
    {
      id: "view-campaigns",
      title: "Step 6 · Track campaigns",
      detail: totalCampaignsSent > 0 ? "Tracking campaign performance" : "Waiting on first campaign",
      status: totalCampaignsSent > 0 ? "Active" : "Waiting",
      explainer: totalCampaignsSent === 0
        ? "Once you send your first campaign, you'll see delivery stats and engagement metrics here."
        : null,
      actionLabel: "Open tracking",
      actionSection: "view-campaigns",
      tone: totalCampaignsSent > 0 ? "emerald" : "slate",
    },
    {
      id: "performance",
      title: "Step 7 · Measure ROI",
      detail: safeReferrals.length > 0 ? "Attribution + ROI active" : "Run QA to verify attribution",
      status: safeReferrals.length > 0 ? "Live" : "Needs data",
      explainer: safeReferrals.length === 0
        ? "Run the Integration QA or wait for real referral activity. Once referrals are tracked, you'll see revenue attribution and ROI metrics here."
        : null,
      actionLabel: null,
      actionSection: null,
      actionScroll: null,
      tone: safeReferrals.length > 0 ? "emerald" : "amber",
    },
  ];
}

/**
 * Calculate overall QA progress percentage
 */
export function calculateQAProgress(steps: QAReadinessStep[]): number {
  const completedSteps = steps.filter(
    (step) => step.tone === "emerald" || step.status === "Ready" || step.status === "Verified" || step.status === "Live" || step.status === "Active"
  ).length;
  return Math.round((completedSteps / steps.length) * 100);
}

/**
 * Dashboard tab configuration
 */
export const DASHBOARD_TABS = [
  { id: "overview", label: "Overview", shortLabel: "Overview" },
  { id: "setup-integration", label: "Business Setup", shortLabel: "Setup" },
  { id: "pages", label: "Pages", shortLabel: "Pages" },
  { id: "testing-qa", label: "Testing & QA", shortLabel: "QA" },
  { id: "clients-ambassadors", label: "Partners", shortLabel: "Partners" },
  { id: "external-partners", label: "External Partners", shortLabel: "Ext. Partners" },
  { id: "crm-integration", label: "Launch Campaigns", shortLabel: "Campaigns" },
  { id: "view-campaigns", label: "Track Campaigns", shortLabel: "Track" },
  { id: "performance", label: "Measure ROI", shortLabel: "ROI" },
] as const;

export type DashboardTabId = (typeof DASHBOARD_TABS)[number]["id"];

/**
 * Initial customer table limit for pagination
 */
export const INITIAL_CUSTOMER_TABLE_LIMIT = 50;

/**
 * Referrals summary pagination constants
 */
export const REFERRALS_SUMMARY_PAGE_SIZE = 1000;
export const REFERRALS_SUMMARY_MAX_ROWS = 50000; // Increased from 20K
