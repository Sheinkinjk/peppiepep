"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Building2, Globe, Mail, Phone, Share2, Target, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type PartnerSteppedFormProps = {
  formAction: (formData: FormData) => Promise<void>;
  formSource: string;
  utmSource?: string;
  utmCampaign?: string;
  applied: boolean;
  applyError: boolean;
};

export function PartnerSteppedForm({
  formAction,
  formSource,
  utmSource = "direct",
  utmCampaign = "direct",
  applied,
  applyError,
}: PartnerSteppedFormProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const formRef = useRef<HTMLFormElement>(null);

  const handleNext = () => {
    const isValid = formRef.current?.reportValidity() ?? true;
    if (!isValid) return;
    setStep(2);
  };

  const progress = step === 1 ? "50%" : "100%";

  return (
    <Card className="p-8 sm:p-10 rounded-3xl border border-slate-200 bg-white shadow-lg shadow-[#0AA7B5]/5">
      {applied && (
        <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
          ✅ Application received. We also created your ambassador profile so you can edit everything under{" "}
          <span className="font-semibold text-[#0b2a34]">Step 2 → Edit Program Settings</span> once you log in.
        </div>
      )}
      {applyError && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
          We couldn&apos;t record your application automatically. Please try again or email{" "}
          <a href="mailto:jarred@referlabs.com.au" className="underline font-semibold text-[#0b2a34]">jarred@referlabs.com.au</a>.
        </div>
      )}

      <form ref={formRef} action={formAction} className="space-y-6" aria-label="Partner application form">
        <input type="hidden" name="source" value={formSource} />
        <input type="hidden" name="utm_source" value={utmSource ?? "direct"} />
        <input type="hidden" name="utm_campaign" value={utmCampaign ?? "direct"} />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            <span className="text-[#0b2a34]">Step {step} of 2</span>
            <span className="hidden sm:inline-flex h-1.5 w-1.5 rounded-full bg-[#0AA7B5]" />
            <span className="text-slate-500">{step === 1 ? "Basics" : "Audience & Plan"}</span>
          </div>
          <div className="h-2 w-full max-w-[240px] rounded-full bg-slate-100" role="presentation" aria-hidden="true">
            <div className="h-2 rounded-full bg-[#0AA7B5] transition-all duration-300" style={{ width: progress }} />
          </div>
        </div>

        <div className={step === 1 ? "space-y-6" : "hidden"}>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="name" className="text-base font-semibold text-[#0b2a34] flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-[#0AA7B5]" />
                Full Name *
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                placeholder="John Smith"
                className="rounded-2xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 h-12 text-base focus:border-[#0AA7B5]"
              />
            </div>
            <div>
              <Label htmlFor="company" className="text-base font-semibold text-[#0b2a34] flex items-center gap-2 mb-2">
                <Building2 className="h-4 w-4 text-[#0AA7B5]" />
                Business Name *
              </Label>
              <Input
                id="company"
                name="company"
                type="text"
                required
                placeholder="Refer Labs"
                className="rounded-2xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 h-12 text-base focus:border-[#0AA7B5]"
              />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="email" className="text-base font-semibold text-[#0b2a34] flex items-center gap-2 mb-2">
                <Mail className="h-4 w-4 text-[#0AA7B5]" />
                Email Address *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="john@example.com"
                className="rounded-2xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 h-12 text-base focus:border-[#0AA7B5]"
              />
            </div>
            <div>
              <Label htmlFor="website" className="text-base font-semibold text-[#0b2a34] flex items-center gap-2 mb-2">
                <Globe className="h-4 w-4 text-[#0AA7B5]" />
                Website / Primary URL *
              </Label>
              <Input
                id="website"
                name="website"
                type="url"
                required
                placeholder="https://referlabs.com.au"
                className="rounded-2xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 h-12 text-base focus:border-[#0AA7B5]"
              />
            </div>
          </div>
        </div>

        <div className={step === 2 ? "space-y-6" : "hidden"}>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="phone" className="text-base font-semibold text-[#0b2a34] flex items-center gap-2 mb-2">
                <Phone className="h-4 w-4 text-[#0AA7B5]" />
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+61 4 123 456"
                className="rounded-2xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 h-12 text-base focus:border-[#0AA7B5]"
              />
            </div>
            <div>
              <Label htmlFor="instagram_handle" className="text-base font-semibold text-[#0b2a34] flex items-center gap-2 mb-2">
                <Share2 className="h-4 w-4 text-[#0AA7B5]" />
                Instagram Handle
              </Label>
              <Input
                id="instagram_handle"
                name="instagram_handle"
                type="text"
                placeholder="@referlabs"
                className="rounded-2xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 h-12 text-base focus:border-[#0AA7B5]"
              />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="linkedin_handle" className="text-base font-semibold text-[#0b2a34] flex items-center gap-2 mb-2">
                <Share2 className="h-4 w-4 rotate-45 text-[#0AA7B5]" />
                LinkedIn Profile / URL
              </Label>
              <Input
                id="linkedin_handle"
                name="linkedin_handle"
                type="text"
                placeholder="linkedin.com/in/referlabs"
                className="rounded-2xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 h-12 text-base focus:border-[#0AA7B5]"
              />
            </div>
            <div>
              <Label htmlFor="audience_profile" className="text-base font-semibold text-[#0b2a34] flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-[#0AA7B5]" />
                Who do you typically sell to?
              </Label>
              <Textarea
                id="audience_profile"
                name="audience_profile"
                placeholder="Beauty clinics in Sydney, boutique fitness studios, luxury eCommerce merchants, etc."
                className="min-h-[120px] rounded-2xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#0AA7B5]"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="notes" className="text-base font-semibold text-[#0b2a34] flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-[#0AA7B5]" />
              How will you promote Refer Labs?
            </Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Share any launch ideas, warm accounts, or channels where you plan to promote Refer Labs."
              className="min-h-[120px] rounded-2xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#0AA7B5]"
            />
          </div>
        </div>

        <div className="p-5 bg-[#f3fbfc] border border-[#d7f2f5] rounded-2xl">
          <div className="flex items-start gap-3">
            <div className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#0AA7B5] font-bold">i</div>
            <div>
              <p className="font-semibold text-[#0b2a34] mb-2">What happens after you apply:</p>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• We review your application within 24 hours</li>
                <li>• Upon approval, you receive your unique affiliate link & discount code</li>
                <li>• Access partner resources and marketing materials</li>
                <li>• Start earning 25% recurring revenue on every affiliate</li>
                <li>• Edit every field again inside Step 2 → Edit Program Settings</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
          {step === 2 && (
            <Button
              type="button"
              variant="outline"
              className="sm:w-auto w-full border border-slate-200 text-[#0b2a34] hover:border-[#0AA7B5]/50 rounded-2xl"
              onClick={() => setStep(1)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          )}
          <div className="flex w-full justify-end">
            {step === 1 ? (
              <Button
                type="button"
                size="lg"
                className="w-full sm:w-auto bg-[#0AA7B5] hover:bg-[#088c98] text-white text-lg font-bold py-6 rounded-2xl shadow-md"
                onClick={handleNext}
              >
                Continue
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            ) : (
              <Button
                type="submit"
                size="lg"
                className="w-full sm:w-auto bg-[#0AA7B5] hover:bg-[#088c98] text-white text-lg font-bold py-6 rounded-2xl shadow-md"
              >
                Submit Application
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-slate-500">
          By applying, you agree to our partner terms and conditions.
        </p>
      </form>
    </Card>
  );
}
