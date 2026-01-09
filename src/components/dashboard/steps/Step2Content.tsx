import { Card } from "@/components/ui/card";
import { Upload, Users, Info } from "lucide-react";
import { ImplementationGuideDialog } from "@/components/ImplementationGuideDialog";
import { ProgramSettingsDialog } from "@/components/ProgramSettingsDialog";
import { CSVUploadForm } from "@/components/CSVUploadForm";
import { QuickAddCustomerForm } from "@/components/QuickAddCustomerForm";
import { CustomersTable } from "@/components/CustomersTable";
import { PartnerApplicationsManager } from "@/app/dashboard/components/PartnerApplicationsManager";
import { Step2QaButton } from "@/components/dashboard/steps/Step2QaButton";
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
  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
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
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 border border-slate-200 rounded-lg bg-white" data-csv-upload>
          <div className="flex items-start gap-3 mb-6">
            <div className="h-12 w-12 rounded-lg bg-purple-600 flex items-center justify-center">
              <Upload className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">Import Customers</h2>
              <p className="text-sm text-slate-600">Bulk upload spreadsheets to instantly generate referral links.</p>
            </div>
          </div>
          <CSVUploadForm />
        </Card>

        <Card className="p-6 border border-slate-200 rounded-lg bg-white" data-quick-add>
          <QuickAddCustomerForm quickAddAction={quickAddCustomer} />
          <div className="mt-6 rounded-lg bg-emerald-50 border border-emerald-200 p-5">
            <p className="text-sm font-semibold text-emerald-800">
              Active ambassadors: <span className="text-2xl font-black ml-2">{safeCustomers.length}</span>
            </p>
            <p className="text-xs text-emerald-700 mt-2">
              Every manual addition instantly receives their shareable link.
            </p>
          </div>
        </Card>
      </div>

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
                    Review/approve partner applicants. Approved partners are treated the same as any customer/ambassador and will appear in the table below.
                  </p>
                </div>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                  Expand
                </span>
              </div>
            </summary>
            <div className="border-t border-slate-200 px-6 py-6">
              <PartnerApplicationsManager />
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
            <div className="mb-4 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
              <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-900">
                View ambassador reward analytics, credit history, and program costs in{" "}
                <a
                  href="#step-5"
                  className="font-semibold underline hover:text-blue-700"
                >
                  Step 5 → Rewards tab
                </a>
              </p>
            </div>
            <CustomersTable
              initialCustomers={linkedInInfluencerCustomers.slice(0, INITIAL_CUSTOMER_TABLE_LIMIT)}
              initialTotal={linkedInInfluencerCustomers.length}
              siteUrl={siteUrl}
              businessId={businessId}
            />
          </Card>
        </div>
      )}

      <Card className="p-6 border border-slate-200 rounded-lg bg-white">
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
            <h3 className="mb-2 text-lg font-bold text-slate-900">No customers yet</h3>
            <p className="mb-6 text-sm text-slate-600 max-w-md mx-auto">
              Add your first customer using the quick form above, or upload a CSV to get started with your referral program.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
              <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-900">
                View ambassador reward analytics, credit history, and program costs in{" "}
                <a
                  href="#step-5"
                  className="font-semibold underline hover:text-blue-700"
                >
                  Step 5 → Rewards tab
                </a>
              </p>
            </div>
            <CustomersTable
              initialCustomers={regularCustomers.slice(0, INITIAL_CUSTOMER_TABLE_LIMIT)}
              initialTotal={regularCustomers.length}
              siteUrl={siteUrl}
              businessId={businessId}
            />
          </>
        )}
      </Card>
    </>
  );
}
