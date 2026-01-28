"use client";

import { useMemo, useState } from "react";
import { Globe2, Link2, Sparkles, CheckCircle2, ExternalLink, BookOpen, ShieldCheck, ChevronDown, ChevronUp, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { BusinessOnboardingMetadata } from "@/types/business";
import Link from "next/link";

type PageBuilderTabProps = {
  businessName: string;
  siteUrl: string;
  offerText: string | null;
  newUserRewardText: string | null;
  clientRewardText: string | null;
  logoUrl: string | null;
  brandHighlightColor: string | null;
  brandTone: string | null;
  onboardingMetadata: BusinessOnboardingMetadata | null;
  updateOnboardingAction: (formData: FormData) => Promise<{ error?: string; success?: string } | void>;
};

type EmbedType = "hosted" | "embed" | "custom-domain";
type EmbedOption = {
  id: EmbedType;
  label: string;
  note: string;
  detail: string;
};

const themes = [
  { id: "classic", label: "Classic gradient", className: "from-cyan-500 to-blue-600" },
  { id: "minimal", label: "Minimal & white", className: "from-slate-100 to-white" },
  { id: "bold", label: "Bold & dark", className: "from-slate-900 to-slate-800" },
];

const embedOptions: EmbedOption[] = [
  {
    id: "custom-domain",
    label: "Connect my website (Recommended)",
    note: "Point your domain to Refer Labs pages via DNS CNAME.",
    detail: "Best for: Users who want referral pages on their own domain. Add a CNAME record, set your domain above, and your pages will load from your URL.",
  },
  {
    id: "embed",
    label: "Embed in existing page",
    note: "Add an iframe to your CMS (WordPress, Webflow, Squarespace, Wix).",
    detail: "Best for: Users who already have a referral page and want to drop in our forms. Copy the embed snippet and paste it into a Code block on your site.",
  },
  {
    id: "hosted",
    label: "Use Refer Labs hosting",
    note: "We host everything at referlabs.com.au/r/[code]—no setup needed.",
    detail: "Best for: Quick start or testing. Your referral links will point to pages on our domain.",
  },
];

const toneCopy: Record<string, string> = {
  modern: "Modern & energetic",
  luxury: "Luxury & editorial",
  playful: "Playful & bold",
  earthy: "Earthy & grounded",
  minimal: "Minimal & clean",
};

const ensureLeadingSlash = (value: string, fallback: string) => {
  if (!value) return fallback;
  const trimmed = value.trim() || fallback;
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
};

const normalizeHost = (value: string, fallback: string) => {
  const trimmed = (value || "").trim();
  if (!trimmed) return fallback.replace(/\/+$/, "");
  return trimmed.replace(/\/+$/, "");
};

export function PageBuilderTab({
  businessName,
  siteUrl,
  offerText,
  newUserRewardText,
  clientRewardText,
  logoUrl,
  brandHighlightColor,
  brandTone,
  onboardingMetadata,
  updateOnboardingAction,
}: PageBuilderTabProps) {
  const pageBuilder = onboardingMetadata?.pageBuilder ?? {};
  const initialHost = pageBuilder.preferredDomain || siteUrl;
  const [host, setHost] = useState(normalizeHost(initialHost, siteUrl));
  const [landingPath, setLandingPath] = useState(pageBuilder.landingPath || "/referral");
  const [referredPath, setReferredPath] = useState(pageBuilder.referredPath || "/referred");
  const [theme, setTheme] = useState(pageBuilder.theme || "classic");
  const [embedType, setEmbedType] = useState<EmbedType>(
    (pageBuilder.embedType as EmbedType | undefined) || "hosted",
  );
  const [status, setStatus] = useState<"draft" | "published">(pageBuilder.status || "draft");
  const [notes, setNotes] = useState(pageBuilder.notes || "");

  // Collapsible section states - all collapsed by default
  const [hostPathsOpen, setHostPathsOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [publishingOpen, setPublishingOpen] = useState(false);
  const [embedDnsOpen, setEmbedDnsOpen] = useState(false);

  const highlight = brandHighlightColor || "#0abab5";
  const toneLabel = toneCopy[brandTone ?? "modern"] || "Modern & energetic";
  const handleSubmit = (formData: FormData) => {
    void updateOnboardingAction(formData);
  };
  const copySampleLink = async () => {
    const sample = `${normalizeHost(host, siteUrl)}/r/[your-code]`;
    try {
      await navigator.clipboard.writeText(sample);
      alert(`Copied: ${sample}`);
    } catch {
      alert(`Copy this link: ${sample}`);
    }
  };
  const landingUrl = useMemo(
    () => `${normalizeHost(host, siteUrl)}${ensureLeadingSlash(landingPath, "/referral")}`,
    [host, landingPath, siteUrl],
  );
  const referredUrl = useMemo(
    () => `${normalizeHost(host, siteUrl)}${ensureLeadingSlash(referredPath, "/referred")}`,
    [host, referredPath, siteUrl],
  );
  const referralExample = useMemo(
    () => `${normalizeHost(host, siteUrl)}/r/[your-code]`,
    [host, siteUrl],
  );

  const embedSnippet = `<iframe src="${landingUrl}?embed=1" width="100%" height="900" style="border:0; border-radius:16px;" loading="lazy"></iframe>`;
  const publishingGuidance = useMemo<Record<EmbedType, { title: string; actions: string[]; validation: string[] }>>(
    () => ({
      hosted: {
        title: "Hosted /r/[code] links (no setup)",
        actions: [
          "Leave publishing on Hosted and keep the host above as-is; we serve /referral and /referred for you.",
          "Go to Partners → Copy link to grab /r/[code] links and share in email, SMS, or social.",
          "Use Preview landing + referred before you share so the offer and rewards look right.",
        ],
        validation: [
          `Open ${referralExample} in an incognito window (replace [your-code]) and confirm it lands on ${landingUrl}.`,
          `Open ${referredUrl} to make sure the handoff page loads from the same host.`,
          "When ready, run Testing & QA to log a simulated referral and confirm attribution.",
        ],
      },
      embed: {
        title: "Embed inside an existing CMS page",
        actions: [
          "Set the host above to the site where the embed will live (e.g., https://financial-org-app.vercel.app).",
          "Keep Publishing mode on Embed, then copy the iframe snippet below.",
          "Paste the iframe into a Code/Embed block on your WordPress/Webflow/Squarespace/Wix page and publish.",
          "Click Save & publish pages here so /r/[code] and QA use that host.",
        ],
        validation: [
          `Open ${landingUrl} on your site and confirm the embed renders (not blank).`,
          `Open ${referredUrl} to verify the handoff page loads on the same host.`,
          "Copy any partner /r/[code] link and ensure it lands on your embedded page, then run Testing & QA to log events.",
        ],
      },
      "custom-domain": {
        title: "Point a custom domain via CNAME",
        actions: [
          "In DNS, create CNAME your.subdomain → pages.referlabs.com (copy/paste that value exactly).",
          "Set the host field above to https://your.subdomain (the same name you CNAME).",
          "Save & publish pages here so /r/[code], /referral, and /referred all use that host.",
          "Wait 5–15 minutes for DNS to propagate before testing live URLs.",
        ],
        validation: [
          `After DNS propagates, open ${landingUrl} and ${referredUrl} to confirm they resolve on your domain.`,
          "Open a partner /r/[code] link and confirm it redirects to your domain instead of pages.referlabs.com.",
          "Run Testing & QA to log a simulated referral once the domain resolves cleanly.",
        ],
      },
    }),
    [landingUrl, referredUrl, referralExample],
  );
  const selectedPlan = publishingGuidance[embedType] ?? publishingGuidance.hosted;
  const implementationSteps = useMemo(
    () => [
      {
        label: "Set host + paths",
        detail: host ? `${host}${landingPath}` : "Add your host and /referral path",
        done: Boolean(host && landingPath && referredPath),
      },
      {
        label: "Choose publishing mode",
        detail:
          embedType === "hosted"
            ? "Hosted (no DNS)"
            : embedType === "embed"
              ? "Embed via iframe"
              : "Custom domain via CNAME",
        done: Boolean(embedType),
      },
      {
        label: "Save & publish pages",
        detail: status === "published" ? "Published" : "Save before testing or preview",
        done: status === "published",
      },
      {
        label: "Validate URLs",
        detail: "Open /referral, /referred, and a /r/[code] link on your chosen host",
        done: false,
      },
      {
        label: "Run Testing & QA",
        detail: "Simulate a referral and confirm cookies + attribution",
        done: false,
      },
    ],
    [embedType, host, landingPath, referredPath, status],
  );

  return (
    <div id="page-builder-panel" className="space-y-6">
      <Card className="border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Step 2 · Pages</p>
            <h2 className="text-2xl font-black text-slate-900">Build referral + handoff pages</h2>
            <p className="text-sm text-slate-700">
              We create both pages for you: <span className="font-semibold text-slate-900">/referral</span> (what partners see from /r/[code]) and <span className="font-semibold text-slate-900">/referred</span> (what prospects see after attribution). Pick the host, connect your site, and publish.
            </p>
            <div className="flex flex-wrap gap-2 text-xs text-slate-600">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 font-semibold text-emerald-800">
                <CheckCircle2 className="h-3.5 w-3.5" />
                No-code builder
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 font-semibold text-blue-800">
                <ExternalLink className="h-3.5 w-3.5" />
                Works on any CMS
              </span>
              <Link href="/api-guide" className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 font-semibold text-slate-700 border border-slate-200">
                <BookOpen className="h-3.5 w-3.5" />
                Self-build API guide
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm max-w-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 mb-1">Live data</p>
            <p className="text-sm text-slate-700">
              We pull your program settings (headline, rewards, logo, colors) so your preview matches what partners see.
            </p>
            <div className="mt-3 rounded-xl bg-slate-900 text-white p-3 text-xs space-y-1">
              <p className="font-semibold">Brand tone</p>
              <p className="text-slate-200">{toneLabel}</p>
              <div className="flex items-center gap-2">
                <span className="text-slate-300">Accent</span>
                <span
                  className="h-4 w-10 rounded-full border border-white/30"
                  style={{ background: highlight }}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="border border-slate-200 bg-white p-6 shadow-sm">
        <form className="space-y-4" action={handleSubmit}>
          {/* Quick Status Summary */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "h-3 w-3 rounded-full",
                  status === "published" ? "bg-emerald-500" : "bg-amber-500"
                )} />
                <span className="text-sm font-semibold text-slate-900">
                  {status === "published" ? "Published" : "Draft"}
                </span>
                <span className="text-xs text-slate-500">•</span>
                <span className="text-xs text-slate-600">
                  {embedType === "hosted" ? "Hosted by Refer Labs" : embedType === "embed" ? "Embedded on your site" : "Custom domain"}
                </span>
              </div>
              <div className="text-xs text-slate-500 font-mono">{landingUrl}</div>
            </div>
          </div>

          {/* Section 1: Host & Paths - Collapsible */}
          <div className="rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setHostPathsOpen(!hostPathsOpen)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "h-8 w-8 rounded-lg flex items-center justify-center",
                  host && landingPath && referredPath ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-600"
                )}>
                  {host && landingPath && referredPath ? <CheckCircle2 className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Host & Paths</p>
                  <p className="text-xs text-slate-500">Where your referral pages live</p>
                </div>
              </div>
              {hostPathsOpen ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
            </button>
            {hostPathsOpen && (
              <div className="border-t border-slate-200 p-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="page_preferred_domain" className="text-sm font-bold text-slate-900">
                    Page host
                  </Label>
                  <Input
                    id="page_preferred_domain"
                    name="page_preferred_domain"
                    value={host}
                    onChange={(e) => setHost(e.target.value)}
                    placeholder="https://yourdomain.com"
                    className="rounded-xl border-2 border-slate-200"
                  />
                  <p className="text-xs text-slate-500">
                    The domain where /referral and /referred will be accessible.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="page_landing_path" className="text-sm font-bold text-slate-900">
                      Landing path
                    </Label>
                    <Input
                      id="page_landing_path"
                      name="page_landing_path"
                      value={landingPath}
                      onChange={(e) => setLandingPath(e.target.value)}
                      placeholder="/referral"
                      className="rounded-xl border-2 border-slate-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="page_referred_path" className="text-sm font-bold text-slate-900">
                      Referred path
                    </Label>
                    <Input
                      id="page_referred_path"
                      name="page_referred_path"
                      value={referredPath}
                      onChange={(e) => setReferredPath(e.target.value)}
                      placeholder="/referred"
                      className="rounded-xl border-2 border-slate-200"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Theme - Collapsible */}
          <div className="rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setThemeOpen(!themeOpen)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Theme</p>
                  <p className="text-xs text-slate-500">{themes.find(t => t.id === theme)?.label || "Classic gradient"}</p>
                </div>
              </div>
              {themeOpen ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
            </button>
            {themeOpen && (
              <div className="border-t border-slate-200 p-4">
                <div className="grid gap-2">
                  {themes.map((item) => (
                    <label
                      key={item.id}
                      className={cn(
                        "flex cursor-pointer items-center justify-between rounded-xl border px-3 py-3 text-sm font-semibold transition",
                        theme === item.id ? "border-emerald-300 bg-emerald-50 text-emerald-800" : "border-slate-200 hover:border-slate-300"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className={cn("h-8 w-8 rounded-lg bg-gradient-to-br", item.className)} />
                        <span>{item.label}</span>
                      </div>
                      <input
                        type="radio"
                        name="page_theme"
                        value={item.id}
                        checked={theme === item.id}
                        onChange={() => setTheme(item.id)}
                        className="accent-emerald-600"
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Publishing Mode - Collapsible with step-by-step guidance */}
          <div className="rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setPublishingOpen(!publishingOpen)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "h-8 w-8 rounded-lg flex items-center justify-center",
                  embedType ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-600"
                )}>
                  <Globe2 className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Publishing Mode</p>
                  <p className="text-xs text-slate-500">
                    {embedType === "hosted" ? "Hosted by Refer Labs (no setup)" : embedType === "embed" ? "Embed on your site" : "Custom domain"}
                  </p>
                </div>
              </div>
              {publishingOpen ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
            </button>
            {publishingOpen && (
              <div className="border-t border-slate-200 p-4 space-y-4">
                <p className="text-sm text-slate-600">How do you want to publish your referral pages?</p>

                {/* Option cards with clearer guidance */}
                <div className="space-y-3">
                  {embedOptions.map((option) => (
                    <div
                      key={option.id}
                      className={cn(
                        "rounded-xl border-2 p-4 cursor-pointer transition-all",
                        embedType === option.id
                          ? "border-emerald-300 bg-emerald-50"
                          : "border-slate-200 hover:border-slate-300"
                      )}
                      onClick={() => setEmbedType(option.id)}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="page_embed_type"
                          value={option.id}
                          checked={embedType === option.id}
                          onChange={() => setEmbedType(option.id)}
                          className="mt-1 accent-emerald-600"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-900">{option.label}</p>
                          <p className="text-xs text-slate-600 mt-1">{option.note}</p>

                          {/* Show steps only when selected */}
                          {embedType === option.id && (
                            <div className="mt-3 rounded-lg bg-white border border-slate-200 p-3">
                              <p className="text-xs font-semibold text-slate-700 mb-2">Next steps:</p>
                              <ol className="text-xs text-slate-600 space-y-1 list-decimal list-inside">
                                {selectedPlan.actions.map((action, idx) => (
                                  <li key={idx}>{action}</li>
                                ))}
                              </ol>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section 4: Status with clear explanation */}
          <div className="rounded-xl border border-slate-200 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-bold text-slate-900">Status</Label>
                <p className="text-xs text-slate-500">Controls whether your pages are ready for QA</p>
              </div>
              <select
                name="page_status"
                value={status}
                onChange={(e) => setStatus(e.target.value as "draft" | "published")}
                className="rounded-xl border-2 border-slate-200 px-3 py-2 text-sm font-semibold"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            {/* Status explanation */}
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                <div className="text-xs text-blue-900">
                  <p className="font-semibold">What does "{status === "published" ? "Published" : "Draft"}" mean?</p>
                  {status === "draft" ? (
                    <p className="mt-1">Your URLs are saved but not yet locked for QA. You can still make changes.</p>
                  ) : (
                    <ul className="mt-1 space-y-1">
                      <li>• URLs are locked to your chosen host for testing</li>
                      <li>• /r/[code] links will resolve to these pages</li>
                      <li>• <strong>Important:</strong> This doesn't deploy to your domain automatically — you still need to embed or set up DNS if using those modes</li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Generated URLs Summary */}
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-xs font-semibold text-emerald-800 mb-2">Your URLs</p>
            <div className="grid gap-2 text-xs">
              <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2 border border-emerald-200">
                <span className="text-slate-600">Landing:</span>
                <span className="font-mono text-emerald-800">{landingUrl}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2 border border-emerald-200">
                <span className="text-slate-600">Referred:</span>
                <span className="font-mono text-emerald-800">{referredUrl}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2 border border-slate-200">
                <span className="text-slate-600">Partner links:</span>
                <span className="font-mono text-slate-700">{referralExample}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              type="submit"
              className="rounded-full bg-slate-900 text-white hover:bg-slate-800"
            >
              Save changes
            </Button>
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              onClick={() => {
                if (status !== "published") {
                  alert("Save as Published first to ensure your preview matches the live URLs.");
                }
                window.open(landingUrl, "_blank", "noopener,noreferrer");
              }}
            >
              Preview pages
            </Button>
            <Button
              type="button"
              variant="outline"
              className="rounded-full border-emerald-200 text-emerald-800"
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("dashboard:navigate", {
                    detail: { section: "testing-qa", scrollTo: "integration-qa-panel" },
                  }),
                )
              }
            >
              Run Testing & QA
            </Button>
          </div>

          {/* Notes - collapsed into embed section */}
          <input type="hidden" name="page_notes" value={notes} />
        </form>
      </Card>

      {/* Connection Test Guide - Shows for custom-domain and embed modes */}
      {(embedType === "custom-domain" || embedType === "embed") && status === "published" && (
        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-black text-slate-900 mb-1">Test Your Website Connection</h3>
              <p className="text-sm text-slate-600 mb-4">
                Follow these steps to confirm your pages are loading correctly on your domain.
              </p>

              <div className="space-y-3">
                {embedType === "custom-domain" && (
                  <>
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-blue-200">
                      <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Verify DNS propagation</p>
                        <p className="text-xs text-slate-600 mt-0.5">Wait 5-15 minutes after adding the CNAME, then check if it resolves.</p>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="mt-2 text-xs"
                          onClick={() => window.open(`https://dnschecker.org/#CNAME/${host.replace(/^https?:\/\//, '')}`, '_blank')}
                        >
                          Check DNS Status →
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-blue-200">
                      <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Test your landing page</p>
                        <p className="text-xs text-slate-600 mt-0.5">Open your landing page in an incognito window to verify it loads.</p>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="mt-2 text-xs"
                          onClick={() => window.open(landingUrl, '_blank')}
                        >
                          Open {landingUrl} →
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-blue-200">
                      <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Test your referred page</p>
                        <p className="text-xs text-slate-600 mt-0.5">Confirm the handoff page loads on the same domain.</p>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="mt-2 text-xs"
                          onClick={() => window.open(referredUrl, '_blank')}
                        >
                          Open {referredUrl} →
                        </Button>
                      </div>
                    </div>
                  </>
                )}

                {embedType === "embed" && (
                  <>
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-blue-200">
                      <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Add embed to your page</p>
                        <p className="text-xs text-slate-600 mt-0.5">Copy the iframe snippet and paste it into a Code/Embed block on your CMS.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-blue-200">
                      <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Test your embedded page</p>
                        <p className="text-xs text-slate-600 mt-0.5">Open the page where you pasted the embed to verify it loads.</p>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="mt-2 text-xs"
                          onClick={() => window.open(landingUrl, '_blank')}
                        >
                          Open {landingUrl} →
                        </Button>
                      </div>
                    </div>
                  </>
                )}

                <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold flex-shrink-0">✓</div>
                  <div>
                    <p className="text-sm font-semibold text-emerald-900">Run full QA test</p>
                    <p className="text-xs text-emerald-700 mt-0.5">Once pages load correctly, run Testing & QA to verify attribution and cookies work.</p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2 text-xs border-emerald-300 text-emerald-800 hover:bg-emerald-100"
                      onClick={() =>
                        window.dispatchEvent(
                          new CustomEvent("dashboard:navigate", {
                            detail: { section: "testing-qa", scrollTo: "integration-qa-panel" },
                          }),
                        )
                      }
                    >
                      Go to Testing & QA →
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Embed / DNS Section - Collapsible */}
      <div className="rounded-xl border border-slate-200 bg-white">
        <button
          type="button"
          onClick={() => setEmbedDnsOpen(!embedDnsOpen)}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <ExternalLink className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Embed Code & DNS Setup</p>
              <p className="text-xs text-slate-500">Technical details for embedding or custom domains</p>
            </div>
          </div>
          {embedDnsOpen ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
        </button>
        {embedDnsOpen && (
          <div className="border-t border-slate-200 p-4 space-y-4">
            {/* Embed snippet */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-800">Embed snippet</p>
              <pre className="rounded-lg bg-slate-900 text-slate-100 p-3 text-[11px] overflow-x-auto">{embedSnippet}</pre>
              <p className="text-xs text-slate-500">
                Paste into a Code/Embed block on WordPress, Webflow, Squarespace, or Wix.
              </p>
            </div>

            {/* DNS instructions */}
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs">
              <p className="font-semibold text-amber-900">Custom domain setup</p>
              <p className="mt-1 text-amber-800">
                In your DNS provider, create a CNAME record:<br />
                <code className="bg-white px-1.5 py-0.5 rounded">your.subdomain</code> → <code className="bg-white px-1.5 py-0.5 rounded">pages.referlabs.com</code>
              </p>
              <p className="mt-2 text-amber-700">Then set that exact subdomain as your host above.</p>
            </div>

            {/* Notes field */}
            <div className="space-y-2">
              <Label htmlFor="page_notes_expanded" className="text-sm font-bold text-slate-900">
                Implementation notes
              </Label>
              <Textarea
                id="page_notes_expanded"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="DNS owner, CMS page location, or any notes for your team..."
                className="min-h-[80px] rounded-xl border-2 border-slate-200"
              />
            </div>
          </div>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <Link2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Referral preview</p>
              <p className="text-sm text-slate-700">
                /r/[code] → /referral. This is what partners + prospects see first.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-white shadow-sm flex items-center justify-center" style={{ borderColor: highlight, borderWidth: "2px" }}>
                {logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={logoUrl} alt={`${businessName} logo`} className="h-10 w-10 object-contain rounded-lg" />
                ) : (
                  <span className="text-sm font-black text-slate-800">{businessName.slice(0, 2).toUpperCase()}</span>
                )}
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-600">Referral landing</p>
                <p className="text-base font-bold text-slate-900">{offerText || "Set your public headline"}</p>
                <p className="text-xs text-slate-600">
                  {clientRewardText || "Client reward"} • {newUserRewardText || "New user reward"}
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="rounded-xl bg-white border border-slate-200 p-3">
                <p className="text-xs font-semibold text-slate-700">CTA buttons</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">Claim offer</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-800 border border-slate-200">Book intro</span>
                </div>
              </div>
              <div className="rounded-xl bg-white border border-emerald-200 p-3">
                <p className="text-xs font-semibold text-emerald-800">Attribution</p>
                <p className="text-xs text-slate-700">Cookie set on click, tied to {businessName}.</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
              <Globe2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Embed / DNS handoff</p>
              <p className="text-sm text-slate-700">
                Either embed on an existing page or point a domain so links resolve on your site.
              </p>
            </div>
          </div>
            <div className="space-y-3 text-sm text-slate-700">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-semibold text-slate-800 mb-1">Embed snippet</p>
                <pre className="rounded-lg bg-slate-900 text-slate-100 p-3 text-[11px] overflow-x-auto">{embedSnippet}</pre>
                <p className="text-xs text-slate-500 mt-1">
                Paste into a Code/Embed block on WordPress, Webflow, Squarespace, or Wix. Set the host above to the URL of the page where you paste this.
                </p>
                <p className="text-[11px] text-emerald-800 mt-1">Already built your own page? Keep it live and just drop this embed to power attribution and forms.</p>
              </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-900">
              <p className="font-semibold">Custom domain (optional)</p>
              <p className="mt-1">
                In DNS: set CNAME <span className="font-mono text-emerald-800">your.subdomain</span> → <span className="font-mono text-emerald-800">pages.referlabs.com</span>.
                Then set that host above so /r/[code], /referral, and /referred all load on your domain.
              </p>
              </div>
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-3 text-xs text-blue-900">
              <p className="font-semibold">QA checklist</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Open {landingUrl} in an incognito window</li>
                <li>Click CTA → ensures attribution cookie set</li>
                <li>Open {referredUrl} to confirm handoff works</li>
                <li>After embedding, retest both URLs on your domain to confirm they load and attribute</li>
                <li>For hosted /r/[code]: copy from Partners → paste in browser and verify it lands on your /referral page</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
