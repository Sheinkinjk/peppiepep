"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowUpRight, Info } from "lucide-react";

type ExternalPartnersTabProps = {
  enabled: boolean;
  businessName: string;
  dashboardBaseUrl: string;
};

type PartnerRequestPayload = {
  requestKind?: "partner_discovery" | "partner_activation";

  partnerName?: string;
  partnerCompany?: string;
  partnerProfileUrl?: string;
  partnerWebsite?: string;

  partnerTypes: string[];
  industryFocus: string[];
  geography: string[];
  audienceLevel: string;
  audienceSize: [number, number];
  promotionMethods: string[];
  contentStyle: string;
  ctaType: string;
  primaryGoal: string;
  successMetric: string;
  expectedVolume?: string;
  offerType: string;
  offerNotes?: string;
  approvalRequired: boolean;
  additionalNotes?: string;
};

type PartnerRequestRow = {
  id: string;
  status: string;
  created_at: string;
  payload: PartnerRequestPayload;
};

type ExternalPartnerRow = {
  id: string;
  name: string | null;
  email: string | null;
  referral_code: string | null;
  status: string | null;
  metadata: Record<string, unknown> | null;
  referralLink: string;
  landingUrl?: string | null;
  performance: { totalReferrals: number; completedReferrals: number };
  window?: {
    days: number;
    linkVisits: number;
    signups: number;
    meetings: number;
    conversions: number;
    completedReferrals: number;
    revenue: number;
  };
};

const partnerTypeOptions = [
  "B2B LinkedIn Influencer",
  "Consultant / Advisor",
  "Agency / Operator",
] as const;

const audienceLevels = ["Founder", "Executive", "Operator", "Technical"] as const;

const promotionMethods = [
  "LinkedIn post",
  "Profile link",
  "Pinned post",
  "Comment CTA",
  "DM referral",
] as const;

const contentStyles = ["Educational", "Case-study driven", "Personal endorsement", "Soft mention"] as const;
const ctaTypes = ["Book demo", "Submit form", "Visit landing page", "Join waitlist"] as const;
const primaryGoals = ["Exposure", "Lead generation", "Demo bookings", "Revenue"] as const;

function toggleArrayValue(values: string[], value: string) {
  const set = new Set(values);
  if (set.has(value)) set.delete(value);
  else set.add(value);
  return Array.from(set);
}

export function ExternalPartnersTab({ enabled, businessName, dashboardBaseUrl }: ExternalPartnersTabProps) {
  // Defensive fallbacks for potentially undefined props
  const safeBusinessName = businessName || "Your Business";
  const safeDashboardBaseUrl = dashboardBaseUrl || "";

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [requestsLoading, setRequestsLoading] = useState(false);
  const [partnersLoading, setPartnersLoading] = useState(false);
  const [partnerUpdating, setPartnerUpdating] = useState<string | null>(null);
  const [windowDays, setWindowDays] = useState(30);
  const [infoSection, setInfoSection] = useState<null | "overview" | "activation" | "requests" | "records">(null);

  const [requests, setRequests] = useState<PartnerRequestRow[]>([]);
  const [partners, setPartners] = useState<ExternalPartnerRow[]>([]);

  const [form, setForm] = useState<PartnerRequestPayload>({
    requestKind: "partner_discovery",
    partnerTypes: [],
    industryFocus: [],
    geography: [],
    audienceLevel: "Founder",
    audienceSize: [1000, 10000],
    promotionMethods: [],
    contentStyle: "Educational",
    ctaType: "Book demo",
    primaryGoal: "Lead generation",
    successMetric: "Leads",
    expectedVolume: "",
    offerType: "Revenue share",
    offerNotes: "",
    approvalRequired: true,
    additionalNotes:
      "Playbook: 1) Influencer posts CTA to book demo; 2) Link to our landing page with UTMs; 3) We handle demos + revenue share. Target: founders in AU/NZ.",
  });

  const [activationForm, setActivationForm] = useState({
    partnerType: "B2B LinkedIn Influencer",
    partnerName: "",
    partnerCompany: "",
    partnerProfileUrl: "",
    partnerWebsite: "",
    geography: "",
    primaryGoal: "Lead generation",
    promotionMethods: [] as string[],
    landingUrl: "",
    offerType: "Revenue share",
    offerNotes: "",
    additionalNotes: "",
  });

  const [newPartner, setNewPartner] = useState({
    name: "",
    email: "",
    phone: "",
    partnerType: "B2B LinkedIn Influencer",
    campaignGoal: "Lead generation",
    landingUrl: "",
    status: "Draft",
  });

  const computedLandingUrl = useMemo(() => {
    const base = safeDashboardBaseUrl.replace(/\/$/, "");
    return base || "https://peppiepep.vercel.app";
  }, [safeDashboardBaseUrl]);

  const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";
  const openCalendly = () => {
    if (typeof window === "undefined") return;
    window.open(calendlyUrl, "_blank", "noopener,noreferrer");
  };

  const sectionExplainers = {
    overview: {
      title: "External Partners overview",
      body:
        "External Partners lets Refer Labs source and activate third-party partners for you. You define the brief, we handle discovery, and attribution flows back into Measure ROI.",
    },
    activation: {
      title: "Partner activation requests",
      body:
        "Use this to nominate a specific partner and the exact offer/CTA you want them to push. We validate fit, set up tracking links, and return the relationship in the partner list below.",
    },
    requests: {
      title: "Partner discovery requests",
      body:
        "These are the briefs you submit through the discovery wizard. Status shows where your request sits (queued, matching, delivered), and each request becomes a partner dataset once fulfilled.",
    },
    records: {
      title: "Partner records + referral links",
      body:
        "Every external partner gets a unique tracking link + landing URL. Link activity, meetings, signups, and revenue show here and roll into Measure ROI.",
    },
  };

  useEffect(() => {
    if (!newPartner.landingUrl) {
      setNewPartner((prev) => ({ ...prev, landingUrl: computedLandingUrl }));
    }
  }, [computedLandingUrl, newPartner.landingUrl]);

  useEffect(() => {
    if (!activationForm.landingUrl) {
      setActivationForm((prev) => ({ ...prev, landingUrl: computedLandingUrl }));
    }
  }, [computedLandingUrl, activationForm.landingUrl]);

  const reloadRequests = async () => {
    setRequestsLoading(true);
    try {
      const response = await fetch("/api/external-partners/requests");
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || "Failed to load requests");
      setRequests(payload.data ?? []);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Unable to load requests",
        description: error instanceof Error ? error.message : "Request list failed to load.",
      });
    } finally {
      setRequestsLoading(false);
    }
  };

  const reloadPartners = async (requestedWindowDays = windowDays) => {
    setPartnersLoading(true);
    try {
      const response = await fetch(`/api/external-partners/partners?windowDays=${requestedWindowDays}`);
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || "Failed to load partners");
      setPartners(payload.data ?? []);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Unable to load external partners",
        description: error instanceof Error ? error.message : "Partner list failed to load.",
      });
    } finally {
      setPartnersLoading(false);
    }
  };

  useEffect(() => {
    void reloadRequests();
    void reloadPartners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const windowTotals = useMemo(() => {
    return partners.reduce(
      (acc, partner) => {
        const w = partner.window;
        if (!w) return acc;
        acc.linkVisits += w.linkVisits ?? 0;
        acc.signups += w.signups ?? 0;
        acc.meetings += w.meetings ?? 0;
        acc.conversions += w.conversions ?? 0;
        acc.completedReferrals += w.completedReferrals ?? 0;
        acc.revenue += w.revenue ?? 0;
        return acc;
      },
      { linkVisits: 0, signups: 0, meetings: 0, conversions: 0, completedReferrals: 0, revenue: 0 },
    );
  }, [partners]);

  const submitRequest = async () => {
    setSubmitting(true);
    try {
      const response = await fetch("/api/external-partners/requests", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || "Failed to submit request");
      toast({
        title: "Request submitted",
        description: "Your partner discovery request is pending review. We’ll reach out soon.",
      });
      setStep(1);
      setForm((prev) => ({ ...prev, additionalNotes: "" }));
      await reloadRequests();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: error instanceof Error ? error.message : "Could not submit request.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const submitActivationRequest = async () => {
    setSubmitting(true);
    try {
      const response = await fetch("/api/external-partners/requests", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          requestKind: "partner_activation",
          partnerName: activationForm.partnerName,
          partnerCompany: activationForm.partnerCompany,
          partnerProfileUrl: activationForm.partnerProfileUrl,
          partnerWebsite: activationForm.partnerWebsite,
          landingUrl: activationForm.landingUrl,
          partnerTypes: [activationForm.partnerType],
          geography: activationForm.geography ? [activationForm.geography] : [],
          primaryGoal: activationForm.primaryGoal,
          promotionMethods: activationForm.promotionMethods,
          offerType: activationForm.offerType,
          offerNotes: activationForm.offerNotes,
          additionalNotes: activationForm.additionalNotes,
        }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || "Failed to submit activation request");
      toast({
        title: "Request submitted",
        description: "Refer Labs will review and set up this external partner relationship for you.",
      });
      setActivationForm((prev) => ({
        ...prev,
        partnerName: "",
        partnerCompany: "",
        partnerProfileUrl: "",
        partnerWebsite: "",
        geography: "",
        promotionMethods: [],
        offerNotes: "",
        additionalNotes: "",
      }));
      await reloadRequests();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: error instanceof Error ? error.message : "Could not submit request.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const createExternalPartner = async () => {
    setSubmitting(true);
    try {
      const response = await fetch("/api/external-partners/partners", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newPartner),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || "Failed to create partner");
      toast({
        title: "External partner created",
        description: "Referral link is ready and fully attributable.",
      });
      setNewPartner({
        name: "",
        email: "",
        phone: "",
        partnerType: "B2B LinkedIn Influencer",
        campaignGoal: "Lead generation",
        landingUrl: computedLandingUrl,
        status: "Draft",
      });
      await reloadPartners();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Could not create partner",
        description: error instanceof Error ? error.message : "Partner creation failed.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const updatePartnerStatus = async (partnerId: string, status: "Active" | "Paused") => {
    setPartnerUpdating(partnerId);
    try {
      const response = await fetch(`/api/external-partners/partners/${partnerId}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || "Failed to update partner status");
      toast({ title: "Partner updated", description: `Status set to ${status}.` });
      await reloadPartners();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: error instanceof Error ? error.message : "Could not update partner status.",
      });
    } finally {
      setPartnerUpdating(null);
    }
  };

  return (
    <div className="space-y-6">
      <Dialog
        open={Boolean(infoSection)}
        onOpenChange={(open) => {
          if (!open) setInfoSection(null);
        }}
      >
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-slate-900">
              {infoSection ? sectionExplainers[infoSection].title : "External Partners"}
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-600">
              {infoSection ? sectionExplainers[infoSection].body : "External Partners overview."}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-5 space-y-4 text-sm text-slate-700">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">How it works</p>
              <ul className="mt-3 space-y-2">
                <li>• Define the partner brief, CTA, and landing page you want to use.</li>
                <li>• Refer Labs sources or activates partners and sets up tracked links.</li>
                <li>• Performance shows here and in Measure ROI automatically.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4">
              <p className="font-semibold text-emerald-900">Need help planning your brief?</p>
              <p className="mt-1 text-emerald-900/90">
                Book a quick call and we’ll help structure the offer, CTA, and landing page for clean attribution.
              </p>
              <div className="mt-3">
                <Button
                  type="button"
                  onClick={openCalendly}
                  className="rounded-full bg-emerald-600 text-white shadow-lg hover:bg-emerald-700"
                >
                  Schedule a Call <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Card className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">External Partners</p>
            <h2 className="text-2xl font-black text-slate-900">
              Paid partner discovery + attribution layer
            </h2>
            <p className="text-sm text-slate-600">
              Manage third-party partner relationships (LinkedIn influencers, consultants, advisors) and track every interaction through to ROI.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/affiliate-partnerships">View More</Link>
            </Button>
            <Button
              type="button"
              className="rounded-full bg-emerald-600 px-5 text-white shadow-lg hover:bg-emerald-700"
              onClick={openCalendly}
            >
              Schedule a Call <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {!enabled && (
        <Card className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-black text-slate-900">External Partners is a paid add-on</h3>
          <p className="mt-2 text-sm text-slate-600">
            This is your partner discovery + referral infrastructure layer (not a marketplace). Billing is handled
            upstream — you can still draft partner briefs and set up referral links here.
          </p>
        </Card>
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Requests</p>
          <p className="mt-2 text-3xl font-black text-slate-900">{requests.length}</p>
          <p className="mt-1 text-sm text-slate-600">Submitted briefs awaiting review or delivery.</p>
        </Card>
        <Card className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">External partners</p>
          <p className="mt-2 text-3xl font-black text-slate-900">{partners.length}</p>
          <p className="mt-1 text-sm text-slate-600">Draft, active, and paused partner records.</p>
        </Card>
        <Card className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Window ROI (last {windowDays}d)</p>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Link visits</p>
              <p className="mt-1 text-xl font-black text-slate-900">{windowTotals.linkVisits}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Revenue</p>
              <p className="mt-1 text-xl font-black text-slate-900">${Math.round(windowTotals.revenue).toLocaleString()}</p>
            </div>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Attribution is visible in Measure ROI for <span className="font-semibold">{safeBusinessName}</span>.
          </p>
        </Card>
      </div>

      <Card className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Request Partner Activation (Refer Labs)
            </p>
            <div>
              <h4 className="mt-1 text-lg font-black text-slate-900">Launch an external partner relationship</h4>
              <p className="mt-1 text-sm text-slate-600">
                Submit who you want to work with and how you want them to promote you — Refer Labs (admin) will set up the
                partnership and ensure attribution is trackable.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={() => setInfoSection("activation")}
            >
              <Info className="mr-2 h-3.5 w-3.5" />
              How it works
            </Button>
          </div>
          <Button type="button" onClick={submitActivationRequest} disabled={submitting} className="mt-3 sm:mt-0">
            {submitting ? "Submitting…" : "Submit activation request"}
          </Button>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <div>
              <Label>External partner type</Label>
              <select
                className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                value={activationForm.partnerType}
                onChange={(e) => setActivationForm((prev) => ({ ...prev, partnerType: e.target.value }))}
              >
                {partnerTypeOptions.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label>Requested partner (optional)</Label>
              <Input
                value={activationForm.partnerName}
                onChange={(e) => setActivationForm((prev) => ({ ...prev, partnerName: e.target.value }))}
              />
            </div>
            <div>
              <Label>Company (optional)</Label>
              <Input
                value={activationForm.partnerCompany}
                onChange={(e) => setActivationForm((prev) => ({ ...prev, partnerCompany: e.target.value }))}
              />
            </div>
            <div>
              <Label>Profile URL (LinkedIn / website)</Label>
              <Input
                placeholder="https://www.linkedin.com/in/..."
                value={activationForm.partnerProfileUrl}
                onChange={(e) => setActivationForm((prev) => ({ ...prev, partnerProfileUrl: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <Label>Website (optional)</Label>
              <Input
                placeholder="https://partner.com"
                value={activationForm.partnerWebsite}
                onChange={(e) => setActivationForm((prev) => ({ ...prev, partnerWebsite: e.target.value }))}
              />
            </div>
            <div>
              <Label>Geography / market</Label>
              <Input
                placeholder="e.g. Australia, US, UK"
                value={activationForm.geography}
                onChange={(e) => setActivationForm((prev) => ({ ...prev, geography: e.target.value }))}
              />
            </div>
            <div>
              <Label>Primary goal</Label>
              <select
                className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                value={activationForm.primaryGoal}
                onChange={(e) => setActivationForm((prev) => ({ ...prev, primaryGoal: e.target.value }))}
              >
                {primaryGoals.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label>Promotion method</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {promotionMethods.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() =>
                      setActivationForm((prev) => ({
                        ...prev,
                        promotionMethods: toggleArrayValue(prev.promotionMethods, value),
                      }))
                    }
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                      activationForm.promotionMethods.includes(value)
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <Label>Preferred landing URL</Label>
            <Input
              value={activationForm.landingUrl}
              onChange={(e) => setActivationForm((prev) => ({ ...prev, landingUrl: e.target.value }))}
            />
            <p className="mt-1 text-xs text-slate-500">
              Where clicks should land (used for the trackable referral link redirect).
            </p>
          </div>
          <div>
            <Label>Offer notes</Label>
            <Textarea
              rows={2}
              value={activationForm.offerNotes}
              onChange={(e) => setActivationForm((prev) => ({ ...prev, offerNotes: e.target.value }))}
              placeholder="e.g. 10% revenue share for 90 days, paid monthly"
            />
          </div>
        </div>

        <div className="mt-4">
          <Label>Additional notes</Label>
          <Textarea
            rows={2}
            value={activationForm.additionalNotes}
            onChange={(e) => setActivationForm((prev) => ({ ...prev, additionalNotes: e.target.value }))}
            placeholder="Any context for Refer Labs admin (targets, constraints, timeline)"
          />
        </div>
      </Card>

      <Card className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Create External Partner Request
            </p>
            <h4 className="text-lg font-black text-slate-900">Partner Discovery Request (paid)</h4>
          </div>
          <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
            Step {step}/5
          </div>
        </div>

        {step === 1 && (
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <p className="text-sm font-semibold text-slate-900">Partner Type</p>
              <div className="flex flex-wrap gap-2">
                {partnerTypeOptions.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, partnerTypes: toggleArrayValue(prev.partnerTypes, value) }))}
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                      form.partnerTypes.includes(value)
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-3">
              <div>
                <Label>Seniority / Audience Level</Label>
                <select
                  className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                  value={form.audienceLevel}
                  onChange={(e) => setForm((prev) => ({ ...prev, audienceLevel: e.target.value }))}
                >
                  {audienceLevels.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Audience Size (approx)</Label>
                <div className="mt-1 flex items-center gap-2">
                  <Input
                    value={String(form.audienceSize[0])}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        audienceSize: [Number(e.target.value || 0), prev.audienceSize[1]],
                      }))
                    }
                    inputMode="numeric"
                  />
                  <span className="text-sm text-slate-500">to</span>
                  <Input
                    value={String(form.audienceSize[1])}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        audienceSize: [prev.audienceSize[0], Number(e.target.value || 0)],
                      }))
                    }
                    inputMode="numeric"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <p className="text-sm font-semibold text-slate-900">Promotion Method</p>
              <div className="flex flex-wrap gap-2">
                {promotionMethods.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        promotionMethods: toggleArrayValue(prev.promotionMethods, value),
                      }))
                    }
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                      form.promotionMethods.includes(value)
                        ? "border-emerald-700 bg-emerald-600 text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-3">
              <div>
                <Label>Content Style</Label>
                <select
                  className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                  value={form.contentStyle}
                  onChange={(e) => setForm((prev) => ({ ...prev, contentStyle: e.target.value }))}
                >
                  {contentStyles.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label>CTA Type</Label>
                <select
                  className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                  value={form.ctaType}
                  onChange={(e) => setForm((prev) => ({ ...prev, ctaType: e.target.value }))}
                >
                  {ctaTypes.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div>
              <Label>Primary Goal</Label>
              <select
                className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                value={form.primaryGoal}
                onChange={(e) => setForm((prev) => ({ ...prev, primaryGoal: e.target.value }))}
              >
                {primaryGoals.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-xs text-slate-500">
                Success metric maps into Measure ROI reporting for this request.
              </p>
            </div>
            <div className="grid gap-3">
              <div>
                <Label>Success Metric</Label>
                <Input
                  value={form.successMetric}
                  onChange={(e) => setForm((prev) => ({ ...prev, successMetric: e.target.value }))}
                  placeholder="e.g. qualified demos booked"
                />
              </div>
              <div>
                <Label>Expected Volume (optional)</Label>
                <Input
                  value={form.expectedVolume || ""}
                  onChange={(e) => setForm((prev) => ({ ...prev, expectedVolume: e.target.value }))}
                  placeholder="e.g. 20 demos / month"
                />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div>
              <Label>Offer Type</Label>
              <select
                className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                value={form.offerType}
                onChange={(e) => setForm((prev) => ({ ...prev, offerType: e.target.value }))}
              >
                {["Revenue share", "Fixed fee", "Hybrid", "Non-monetary"].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label>Approval Required</Label>
              <select
                className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                value={form.approvalRequired ? "yes" : "no"}
                onChange={(e) => setForm((prev) => ({ ...prev, approvalRequired: e.target.value === "yes" }))}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <Label>Offer Notes</Label>
              <Textarea
                value={form.offerNotes || ""}
                onChange={(e) => setForm((prev) => ({ ...prev, offerNotes: e.target.value }))}
                placeholder="Revenue share %, fixed fee range, hybrid details, non-monetary perks…"
              />
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="mt-5 space-y-4">
            <div>
              <Label>Playbook (recommended)</Label>
              <Textarea
                value={form.additionalNotes || ""}
                onChange={(e) => setForm((prev) => ({ ...prev, additionalNotes: e.target.value }))}
                placeholder="e.g., CTA, landing URL, geo, ICP, and how the partner should promote."
              />
              <p className="mt-2 text-xs text-slate-500">Pre-filled with a concise brief to avoid empty submissions.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-700">
              By submitting, you acknowledge this is a paid partner discovery workflow and requests are immutable after submission (v1).
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => setStep((prev) => Math.max(1, prev - 1))}
            disabled={submitting || step === 1}
          >
            Back
          </Button>
          <div className="flex gap-2">
            {step < 5 ? (
              <Button type="button" onClick={() => setStep((prev) => Math.min(5, prev + 1))} disabled={submitting}>
                Next
              </Button>
            ) : (
              <Button type="button" onClick={submitRequest} disabled={submitting}>
                {submitting ? "Submitting…" : "Submit request"}
              </Button>
            )}
          </div>
        </div>
      </Card>

      <Card className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Requests</p>
            <h4 className="text-lg font-black text-slate-900">Partner discovery requests</h4>
            <p className="mt-1 text-sm text-slate-600">
              These are briefs you submit for Refer Labs to source partners. Status shows where each request sits in the
              discovery pipeline.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              onClick={() => setInfoSection("requests")}
            >
              <Info className="mr-2 h-4 w-4" />
              How it works
            </Button>
            <Button type="button" variant="outline" onClick={reloadRequests} disabled={requestsLoading}>
              {requestsLoading ? "Refreshing…" : "Refresh"}
            </Button>
          </div>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-xs uppercase tracking-[0.2em] text-slate-400">
              <tr>
                <th className="py-2 text-left">Created</th>
                <th className="py-2 text-left">Status</th>
                <th className="py-2 text-left">Submitted by</th>
                <th className="py-2 text-left">Type</th>
                <th className="py-2 text-left">Summary</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {requests.length === 0 ? (
                <tr>
                  <td className="py-3 text-slate-500" colSpan={4}>
                    No requests yet.
                  </td>
                </tr>
              ) : (
                requests.map((req) => (
                  <tr key={req.id} className="border-t border-slate-100">
                    <td className="py-3">{new Date(req.created_at).toLocaleString()}</td>
                    <td className="py-3">{req.status}</td>
                    <td className="py-3">
                      <div className="space-y-1 text-xs">
                        <div className="font-semibold text-slate-900">
                          {req.payload?.partnerName || "Unknown submitter"}
                        </div>
                        {req.payload?.partnerCompany && (
                          <div className="text-slate-600">{req.payload.partnerCompany}</div>
                        )}
                        {req.payload?.partnerProfileUrl && (
                          <a
                            className="text-blue-700 underline break-all"
                            href={req.payload.partnerProfileUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Profile
                          </a>
                        )}
                        {req.payload?.partnerWebsite && (
                          <a
                            className="text-blue-700 underline break-all"
                            href={req.payload.partnerWebsite}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Website
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="py-3">{req.payload?.requestKind ?? "partner_discovery"}</td>
                    <td className="py-3">
                      {req.payload?.requestKind === "partner_activation"
                        ? `${req.payload?.partnerName || "Partner"} · ${(req.payload?.partnerTypes ?? []).join(", ")}`
                        : `${req.payload?.primaryGoal || "Discovery"} · ${(req.payload?.partnerTypes ?? []).join(", ")}`}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">External Partners</p>
            <h4 className="text-lg font-black text-slate-900">Partner records + referral links</h4>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setInfoSection("records")}
            >
              <Info className="mr-2 h-4 w-4" />
              How it works
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                window.dispatchEvent(
                  new CustomEvent("dashboard:navigate", {
                    detail: { section: "performance", scrollTo: "measure-roi-interaction-hub" },
                  }),
                );
              }}
            >
              Open Measure ROI
            </Button>
            <select
              className="h-9 rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700"
              value={windowDays}
              onChange={(e) => {
                const next = Number(e.target.value);
                setWindowDays(next);
                // Refresh with the new window immediately.
                void reloadPartners(next);
              }}
            >
              <option value={7}>Last 7 days</option>
              <option value={30}>Last 30 days</option>
              <option value={90}>Last 90 days</option>
            </select>
            <Button type="button" variant="outline" onClick={() => reloadPartners()} disabled={partnersLoading}>
              {partnersLoading ? "Refreshing…" : "Refresh"}
            </Button>
          </div>
        </div>

        <div className="mt-5 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Link visits ({windowDays}d)
            </p>
            <p className="mt-1 text-2xl font-black text-slate-900">{windowTotals.linkVisits}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Signups ({windowDays}d)
            </p>
            <p className="mt-1 text-2xl font-black text-slate-900">{windowTotals.signups}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Revenue ({windowDays}d)
            </p>
            <p className="mt-1 text-2xl font-black text-slate-900">${Math.round(windowTotals.revenue)}</p>
          </div>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Meetings ({windowDays}d)
            </p>
            <p className="mt-1 text-2xl font-black text-slate-900">{windowTotals.meetings}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Conversions ({windowDays}d)
            </p>
            <p className="mt-1 text-2xl font-black text-slate-900">{windowTotals.completedReferrals}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Conversion rate ({windowDays}d)
            </p>
            <p className="mt-1 text-2xl font-black text-slate-900">
              {windowTotals.signups > 0
                ? `${Math.round((windowTotals.completedReferrals / windowTotals.signups) * 100)}%`
                : "0%"}
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <div>
              <Label>Partner name</Label>
              <Input value={newPartner.name} onChange={(e) => setNewPartner((p) => ({ ...p, name: e.target.value }))} />
            </div>
            <div>
              <Label>Email (optional)</Label>
              <Input value={newPartner.email} onChange={(e) => setNewPartner((p) => ({ ...p, email: e.target.value }))} />
            </div>
            <div>
              <Label>Phone (optional)</Label>
              <Input value={newPartner.phone} onChange={(e) => setNewPartner((p) => ({ ...p, phone: e.target.value }))} />
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <Label>Partner type</Label>
              <select
                className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                value={newPartner.partnerType}
                onChange={(e) => setNewPartner((p) => ({ ...p, partnerType: e.target.value }))}
              >
                {partnerTypeOptions.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label>Campaign goal</Label>
              <select
                className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                value={newPartner.campaignGoal}
                onChange={(e) => setNewPartner((p) => ({ ...p, campaignGoal: e.target.value }))}
              >
                {primaryGoals.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label>Landing URL</Label>
              <Input value={newPartner.landingUrl} onChange={(e) => setNewPartner((p) => ({ ...p, landingUrl: e.target.value }))} />
            </div>
            <div className="flex justify-end">
              <Button type="button" onClick={createExternalPartner} disabled={submitting}>
                {submitting ? "Creating…" : "Create external partner"}
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-xs uppercase tracking-[0.2em] text-slate-400">
              <tr>
                <th className="py-2 text-left">Partner</th>
                <th className="py-2 text-left">Type</th>
                <th className="py-2 text-left">Goal</th>
                <th className="py-2 text-left">Status</th>
                <th className="py-2 text-left">Landing page</th>
                <th className="py-2 text-left">Referral link</th>
                <th className="py-2 text-left">Last {windowDays} days</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {partners.length === 0 ? (
                <tr>
                  <td className="py-3 text-slate-500" colSpan={7}>
                    No external partners yet.
                  </td>
                </tr>
              ) : (
                partners.map((p) => {
                  const meta = (p.metadata ?? {}) as Record<string, any>;
                  const status = (meta.external_partner?.status as string | undefined) ?? "Draft";
                  const isUpdating = partnerUpdating === p.id;
                  return (
                    <tr key={p.id} className="border-t border-slate-100 align-top">
                      <td className="py-3 font-semibold text-slate-900">{p.name || "Unnamed"}</td>
                      <td className="py-3">{meta.external_partner?.partnerType ?? "—"}</td>
                      <td className="py-3">{meta.external_partner?.campaignGoal ?? "—"}</td>
                      <td className="py-3">
                        <div className="flex flex-col gap-2">
                          <span className="text-sm font-semibold text-slate-900">{status}</span>
                          <div className="flex flex-wrap gap-2">
                            <Button
                              type="button"
                              size="sm"
                              variant={status === "Active" ? "default" : "outline"}
                              onClick={() => updatePartnerStatus(p.id, "Active")}
                              disabled={isUpdating}
                            >
                              {isUpdating && status !== "Active" ? "Updating…" : "Activate"}
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              variant={status === "Paused" ? "default" : "outline"}
                              onClick={() => updatePartnerStatus(p.id, "Paused")}
                              disabled={isUpdating}
                            >
                              {isUpdating && status !== "Paused" ? "Updating…" : "Pause"}
                            </Button>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-xs">
                        {p.landingUrl ? (
                          <a className="text-blue-700 underline break-all" href={p.landingUrl} target="_blank" rel="noreferrer">
                            {p.landingUrl}
                          </a>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="py-3">
                        {p.referralLink ? (
                          <a className="font-mono text-blue-700 underline" href={p.referralLink} target="_blank" rel="noreferrer">
                            Open link
                          </a>
                        ) : (
                          <span className="text-slate-400">Missing</span>
                        )}
                      </td>
                      <td className="py-3 text-xs text-slate-600">
                        {p.window ? (
                          <div className="space-y-1">
                            <div>
                              {p.window.linkVisits} visits • {p.window.signups} signups • {p.window.meetings} meetings
                            </div>
                            <div>
                              {p.window.completedReferrals} conversions • ${Math.round(p.window.revenue)} revenue
                            </div>
                          </div>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
