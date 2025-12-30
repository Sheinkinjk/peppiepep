export const dynamic = "force-dynamic";
export const revalidate = 0;

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReferredLandingHero } from "@/components/referred/ReferredLandingHero";
import { ReferredApplicationForm } from "@/components/referred/ReferredApplicationForm";
import { ReferredFeatures } from "@/components/referred/ReferredFeatures";
import { ReferredCTA } from "@/components/referred/ReferredCTA";

export const metadata = {
  title: "Join the Referral Program Revolution | Refer Labs",
  description: "Unlock additional revenue by integrating directly with your sales and marketing strategy. Referred by a trusted partner.",
};

export default async function ReferredPage() {
  // Read attribution cookie if present
  const cookieStore = await cookies();
  const refAmbassadorCookie = cookieStore.get("ref_ambassador");
  let ambassadorData: { id: string; code: string; business_id: string } | null = null;

	if (refAmbassadorCookie?.value) {
	  try {
	    const parsed = JSON.parse(refAmbassadorCookie.value);
	    // Check if cookie is still within 30-day window
	    // eslint-disable-next-line react-hooks/purity
	    const cookieAge = Date.now() - (parsed.timestamp || 0);
	    const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
	    if (cookieAge < thirtyDaysMs) {
	      ambassadorData = {
	        id: parsed.id,
          code: parsed.code,
          business_id: parsed.business_id,
        };
      }
    } catch (err) {
      console.error("Failed to parse attribution cookie:", err);
    }
  }

  // If no valid attribution, redirect to main page
  if (!ambassadorData) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <ReferredLandingHero
        ambassadorId={ambassadorData.id}
        businessId={ambassadorData.business_id}
        referralCode={ambassadorData.code}
      />

      {/* Features Section */}
      <ReferredFeatures />

      {/* Application Form Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Ready to Transform Your Revenue?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Choose your path to get started with Refer Labs
            </p>
          </div>

          <ReferredApplicationForm
            ambassadorId={ambassadorData.id}
            businessId={ambassadorData.business_id}
            referralCode={ambassadorData.code}
          />
        </div>
      </section>

      {/* Final CTA */}
      <ReferredCTA
        ambassadorId={ambassadorData.id}
        businessId={ambassadorData.business_id}
        referralCode={ambassadorData.code}
      />

      {/* Attribution Badge */}
      {ambassadorData && (
        <div className="py-8 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-sm text-slate-400">
              Referred by partner code: <span className="font-mono text-teal-400">{ambassadorData.code}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
