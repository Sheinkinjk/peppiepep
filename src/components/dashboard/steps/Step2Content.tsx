import { Card } from "@/components/ui/card";
import { Upload, Users, Info } from "lucide-react";
import { ImplementationGuideDialog } from "@/components/ImplementationGuideDialog";
import { ProgramSettingsDialog } from "@/components/ProgramSettingsDialog";
import { CSVUploadForm } from "@/components/CSVUploadForm";
import { QuickAddCustomerForm } from "@/components/QuickAddCustomerForm";
import { CustomersTable } from "@/components/CustomersTable";
import { PartnerApplicationsManager } from "@/app/dashboard/components/PartnerApplicationsManager";
import { Step2QaButton } from "@/components/dashboard/steps/Step2QaButton";
import { DashboardSectionBoundary } from "@/components/dashboard/DashboardSectionBoundary";
import { DashboardNavigateButton } from "@/components/dashboard/DashboardNavigateButton";
import type { Database } from "@/types/supabase";
import type { BusinessOnboardingMetadata } from "@/types/business";

const INITIAL_CUSTOMER_TABLE_LIMIT = 50;

type Customer = Database["public"]["Tables"]["customers"]["Row"];

interface Step2ContentProps {
  siteUrl: string;
  businessId: string;
  businessName: string;
  discountCaptureSecret: string | null;
  offerText: string | null;
  newUserRewardText: string | null;
  clientRewardText: string | null;
  rewardType: Database["public"]["Tables"]["businesses"]["Row"]["reward_type"];
  rewardAmount: number | null;
  rewardTerms: string | null;
  logoUrl: string | null;
  brandHighlightColor: string | null;
  brandTone: string | null;
  onboardingMetadata: BusinessOnboardingMetadata | null;
  signOnBonusEnabled: boolean;
  signOnBonusAmount: number | null;
  signOnBonusType: string | null;
  signOnBonusDescription: string | null;
  uploadLogo: (formData: FormData) => Promise<{ success?: string; error?: string; url?: string }>;
  uploadRewardTerms: (formData: FormData) => Promise<{ success?: string; error?: string; url?: string }>;
  safeCustomers: Customer[];
  currentAdmin: { id: string } | null;
  linkedInInfluencerCustomers: Customer[];
  regularCustomers: Customer[];
  updateBusinessOnboarding: (formData: FormData) => Promise<{ error?: string; success?: string } | void>;
  updateSettings: (formData: FormData) => Promise<{ error?: string; success?: string } | void>;
  quickAddCustomer: (formData: FormData) => Promise<{ error?: string; success?: string } | void>;
}

export function Step2Content({
  siteUrl,
  businessId,
  businessName,
  discountCaptureSecret,
  offerText,
  newUserRewardText,
  clientRewardText,
  rewardType,
  rewardAmount,
  rewardTerms,
  logoUrl,
  brandHighlightColor,
  brandTone,
  onboardingMetadata,
  signOnBonusEnabled,
  signOnBonusAmount,
  signOnBonusType,
  signOnBonusDescription,
  uploadLogo,
  uploadRewardTerms,
  safeCustomers,
  currentAdmin,
  linkedInInfluencerCustomers,
  regularCustomers,
  updateBusinessOnboarding,
  updateSettings,
  quickAddCustomer,
}: Step2ContentProps) {
  const linkedInInfluencerCreators = linkedInInfluencerCustomers.filter(
    (customer) => (customer.source ?? "").toLowerCase() === "linkedin-influencer",
  ).length;
  const linkedInInfluencerBusinesses = linkedInInfluencerCustomers.filter(
    (customer) => (customer.source ?? "").toLowerCase() === "linkedin-influencer-business",
  ).length;
  const linkedInInfluencerPending = linkedInInfluencerCustomers.filter(
    (customer) => (customer.status ?? "").toLowerCase() === "applicant",
  ).length;
  const regularActiveCount = regularCustomers.filter(
    (customer) => (customer.status ?? "").toLowerCase() === "active",
  ).length;
  const regularPendingCount = regularCustomers.filter(
    (customer) => (customer.status ?? "").toLowerCase() === "pending",
  ).length;
  const regularApplicantCount = regularCustomers.filter(
    (customer) => (customer.status ?? "").toLowerCase() === "applicant",
  ).length;

  return (
    <>
      <DashboardSectionBoundary
        title="Partner actions unavailable"
        message="We ran into an issue while loading partner setup actions. Refresh the page or try again in a moment."
      >
        <Card className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Partners
              </p>
              <h2 className="text-2xl font-black text-slate-900">
                Partner network & program controls
              </h2>
              <p className="text-sm text-slate-600">
                Program settings sync into Launch Campaigns, referral pages, and ambassador links in real time.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <ImplementationGuideDialog
                siteUrl={siteUrl}
                businessName={businessName}
                discountCaptureSecret={discountCaptureSecret}
              />
              <ProgramSettingsDialog
                businessName={businessName}
                siteUrl={siteUrl}
                offerText={offerText}
                newUserRewardText={newUserRewardText}
                clientRewardText={clientRewardText}
                rewardType={rewardType}
                rewardAmount={rewardAmount}
                rewardTerms={rewardTerms}
                logoUrl={logoUrl}
                brandHighlightColor={brandHighlightColor}
                brandTone={brandTone}
                uploadLogoAction={uploadLogo}
                uploadRewardTermsAction={uploadRewardTerms}
                onboardingMetadata={onboardingMetadata}
                signOnBonusEnabled={signOnBonusEnabled}
                signOnBonusAmount={signOnBonusAmount}
                signOnBonusType={signOnBonusType}
                signOnBonusDescription={signOnBonusDescription}
                updateOnboardingAction={updateBusinessOnboarding}
                updateSettingsAction={updateSettings}
              />
              <Step2QaButton />
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Total partners
              </p>
              <p className="mt-1 text-2xl font-black text-slate-900">{regularCustomers.length}</p>
              <p className="text-xs text-slate-500">Referral-ready partners</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Active
              </p>
              <p className="mt-1 text-2xl font-black text-emerald-700">{regularActiveCount}</p>
              <p className="text-xs text-slate-500">Live referral links</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Pending
              </p>
              <p className="mt-1 text-2xl font-black text-amber-700">{regularPendingCount}</p>
              <p className="text-xs text-slate-500">Needs activation</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Applicants
              </p>
              <p className="mt-1 text-2xl font-black text-indigo-700">{regularApplicantCount}</p>
              <p className="text-xs text-slate-500">Awaiting review</p>
            </div>
          </div>
        </Card>
      </DashboardSectionBoundary>

      <DashboardSectionBoundary
        title="Partner import unavailable"
        message="We ran into an issue while loading partner import tools. Refresh the page or try again in a moment."
      >
        <div className="grid gap-6 2xl:grid-cols-2">
          <Card id="partner-csv-upload" className="p-6 border border-slate-200 rounded-lg bg-white" data-csv-upload>
            <div className="flex items-start gap-3 mb-6">
              <div className="h-12 w-12 rounded-lg bg-purple-600 flex items-center justify-center">
                <Upload className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">Import Your Network</h2>
                <p className="text-sm text-slate-600">
                  Upload partners, clients, creators, and advisors to instantly generate referral links.
                </p>
              </div>
            </div>
            <CSVUploadForm />
          </Card>

          <Card id="partner-quick-add" className="p-6 border border-slate-200 rounded-lg bg-white" data-quick-add>
            <QuickAddCustomerForm quickAddAction={quickAddCustomer} />
            <div className="mt-6 rounded-lg bg-emerald-50 border border-emerald-200 p-5">
              <p className="text-sm font-semibold text-emerald-800">
                Active partners: <span className="text-2xl font-black ml-2">{safeCustomers.length}</span>
              </p>
              <p className="text-xs text-emerald-700 mt-2">
                Every manual addition instantly receives their shareable link.
              </p>
            </div>
          </Card>
        </div>
      </DashboardSectionBoundary>

      {/* Admin-only: Partner applications are created as customers (status: applicant) and show up in "All Customers". */}
      {currentAdmin && (
        <div id="partner-applications" className="scroll-mt-24">
          <details className="rounded-2xl border border-slate-200 bg-white">
            <summary className="cursor-pointer list-none px-6 py-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Admin tools
                  </p>
                  <h3 className="mt-1 text-lg font-extrabold text-slate-900">
                    Partner applications
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Review/approve partner applicants. Approved partners will appear in the Partner Directory below.
                  </p>
                </div>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                  Expand
                </span>
              </div>
            </summary>
            <div className="border-t border-slate-200 px-6 py-6">
              <DashboardSectionBoundary
                title="Partner applications unavailable"
                message="We ran into an issue while loading partner applications. Refresh the page or try again in a moment."
              >
                <PartnerApplicationsManager />
              </DashboardSectionBoundary>
            </div>
          </details>
        </div>
      )}

      {/* Admin-only: LinkedIn Influencer customers section */}
      {currentAdmin && linkedInInfluencerCustomers.length > 0 && (
        <div id="linkedin-influencer-customers" className="scroll-mt-24">
          <Card className="p-6 border border-slate-200 rounded-lg bg-white">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-emerald-500">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    LinkedIn Influencer Program
                  </p>
                  <h3 className="text-xl font-black text-slate-900">
                    LinkedIn Influencer Customers ({linkedInInfluencerCustomers.length})
                  </h3>
                </div>
              </div>
              <p className="text-sm text-slate-600">
                Customers from LinkedIn Influencer marketplace signups (influencers and businesses). These are separate from the regular referral program.
              </p>
            </div>
            <div className="mb-5 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 sm:grid-cols-3">
              <div className="rounded-xl bg-white p-3 border border-slate-200">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Creators</p>
                <p className="mt-1 text-2xl font-black text-slate-900">{linkedInInfluencerCreators}</p>
              </div>
              <div className="rounded-xl bg-white p-3 border border-slate-200">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Businesses</p>
                <p className="mt-1 text-2xl font-black text-slate-900">{linkedInInfluencerBusinesses}</p>
              </div>
              <div className="rounded-xl bg-white p-3 border border-slate-200">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Applicants</p>
                <p className="mt-1 text-2xl font-black text-slate-900">{linkedInInfluencerPending}</p>
              </div>
            </div>
	            <div className="mb-4 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
	              <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
	              <p className="text-sm text-blue-900">
	                View partner reward analytics, credit history, and program costs in{" "}
	                <DashboardNavigateButton section="performance" scrollTo="measure-roi-interaction-hub" className="font-semibold underline hover:text-blue-700">
	                  Step 5 → Rewards tab
	                </DashboardNavigateButton>
	              </p>
	            </div>
            <DashboardSectionBoundary
              title="Partner directory unavailable"
              message="We ran into an issue while loading your partner list. Refresh the page or try again in a moment."
            >
              <CustomersTable
                initialCustomers={linkedInInfluencerCustomers.slice(0, INITIAL_CUSTOMER_TABLE_LIMIT)}
                initialTotal={linkedInInfluencerCustomers.length}
                siteUrl={siteUrl}
                businessId={businessId}
              />
            </DashboardSectionBoundary>
          </Card>
        </div>
      )}

      <Card className="p-6 border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden">
        <div className="mb-6">
          <h3 className="text-xl font-black text-slate-900 mb-2">
            All Customers ({regularCustomers.length})
          </h3>
          {currentAdmin && linkedInInfluencerCustomers.length > 0 && (
            <p className="text-sm text-slate-600">
              Regular referral program customers. LinkedIn Influencer customers are shown separately above.
            </p>
          )}
        </div>
        {regularCustomers.length === 0 ? (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
              <Users className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="mb-2 text-lg font-bold text-slate-900">No partners yet</h3>
            <p className="mb-6 text-sm text-slate-600 max-w-md mx-auto">
              Add your first referral partner using the quick form above, or upload a CSV to activate your network.
            </p>
          </div>
        ) : (
          <>
	            <div className="mb-4 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
	              <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
	              <p className="text-sm text-blue-900">
	                View partner reward analytics, credit history, and program costs in{" "}
	                <DashboardNavigateButton section="performance" scrollTo="measure-roi-interaction-hub" className="font-semibold underline hover:text-blue-700">
	                  Step 5 → Rewards tab
	                </DashboardNavigateButton>
	              </p>
	            </div>
            <DashboardSectionBoundary
              title="Partner directory unavailable"
              message="We ran into an issue while loading your partner list. Refresh the page or try again in a moment."
            >
              <CustomersTable
                initialCustomers={regularCustomers.slice(0, INITIAL_CUSTOMER_TABLE_LIMIT)}
                initialTotal={regularCustomers.length}
                siteUrl={siteUrl}
                businessId={businessId}
              />
            </DashboardSectionBoundary>
          </>
        )}
      </Card>
    </>
  );
}
