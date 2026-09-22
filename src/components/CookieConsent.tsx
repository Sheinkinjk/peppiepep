"use client";

import { useState, useEffect } from "react";

const COOKIE_CONSENT_KEY = "referlabs_cookie_consent";
const COOKIE_CONSENT_VERSION = "1.0"; // Increment when privacy policy changes
const REOPEN_EVENT = "referlabs:cookie-preferences";

/** Reopens the cookie preferences panel. Wired to the footer link. */
export function openCookiePreferences() {
  window.dispatchEvent(new Event(REOPEN_EVENT));
}

interface CookiePreferences {
  necessary: boolean; // Always true
  analytics: boolean;
  marketing: boolean;
  version: string;
  timestamp: number;
}

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    version: COOKIE_CONSENT_VERSION,
    timestamp: Date.now(),
  });

  useEffect(() => {
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent) as CookiePreferences;
        // Reflect the saved choice in the toggles if they reopen the panel.
        setPreferences(parsed);
        if (parsed.version !== COOKIE_CONSENT_VERSION) setShowBanner(true);
      } catch {
        setShowBanner(true);
      }
    } else {
      setTimeout(() => setShowBanner(true), 1000);
    }

    // Footer "Cookie Preferences" link reopens the panel, so withdrawing consent
    // is as easy as giving it.
    const reopen = () => {
      setShowPreferences(true);
      setShowBanner(true);
    };
    window.addEventListener(REOPEN_EVENT, reopen);
    return () => window.removeEventListener(REOPEN_EVENT, reopen);
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(prefs));

    // Tell Google Consent Mode straight away, so the choice takes effect on this
    // pageview rather than only on the next load. Defaults are denied in Analytics.tsx.
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof gtag === "function") {
      gtag("consent", "update", {
        analytics_storage: prefs.analytics ? "granted" : "denied",
        ad_storage: prefs.marketing ? "granted" : "denied",
        ad_user_data: prefs.marketing ? "granted" : "denied",
        ad_personalization: prefs.marketing ? "granted" : "denied",
      });

      // Re-send the page_view for the page they are standing on. The first one went
      // out before they answered, so it carried consent denied (gcs=G100) and GA4
      // drops those from reports on a property this size, which has no behavioural
      // modelling. Without this, the entry page of every consenting visit is missing
      // from GA4, and a visitor who accepts and leaves before user_engagement fires
      // is never counted at all. Measured on the live site on 22 Sep 2026: GA4 saw
      // 20% to 40% of the Google clicks Search Console reported.
      // This is not double counting. The denied hit was never in the reports, so the
      // page ends up with exactly one counted page_view. Only on a grant: re-sending
      // after "Necessary only" would send a hit the visitor just refused.
      if (prefs.analytics) {
        gtag("event", "page_view", {
          page_location: window.location.href,
          page_title: document.title,
        });
      }
    }

    setShowBanner(false);
    setShowPreferences(false);
  };

  const acceptAll = () =>
    savePreferences({
      necessary: true,
      analytics: true,
      marketing: true,
      version: COOKIE_CONSENT_VERSION,
      timestamp: Date.now(),
    });

  const acceptNecessary = () =>
    savePreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      version: COOKIE_CONSENT_VERSION,
      timestamp: Date.now(),
    });

  const saveCustomPreferences = () =>
    savePreferences({
      ...preferences,
      necessary: true,
      version: COOKIE_CONSENT_VERSION,
      timestamp: Date.now(),
    });

  if (!showBanner) return null;

  const btnPrimary =
    "min-h-[44px] rounded-[2px] bg-[#007a95] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#003647]";
  const btnGhost =
    "min-h-[44px] rounded-[2px] px-5 py-2.5 text-sm font-semibold text-[#56504a] transition-colors hover:bg-[#f7f4ee]";

  return (
    // Slim bottom bar. No page overlay, no blur: the site stays readable while you decide.
    <div className="fixed bottom-0 left-0 right-0 z-[9999] border-t border-[#ded8cd] bg-white shadow-[0_-8px_30px_-12px_rgba(20,18,15,0.15)]">
      <div className="mx-auto max-w-6xl px-5 py-4 sm:px-8">
        {!showPreferences ? (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <p className="text-[13px] leading-relaxed text-[#56504a]">
              We use essential cookies to make the site work, and analytics cookies only if you agree. See our{" "}
              <a href="/privacy" className="font-semibold text-[#007a95] hover:underline">
                Privacy Policy
              </a>
              .
            </p>
            {/* Mobile: primary on top, the two alternatives side by side beneath.
                Desktop: one right-aligned row, least to most emphatic. */}
            <div className="flex flex-shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
              <button onClick={acceptAll} className={`${btnPrimary} order-1 sm:order-3`}>
                Accept all
              </button>
              <div className="order-2 flex gap-2 sm:contents">
                <button onClick={() => setShowPreferences(true)} className={`${btnGhost} flex-1 sm:order-1 sm:flex-none`}>
                  Customise
                </button>
                <button onClick={acceptNecessary} className={`${btnGhost} flex-1 sm:order-2 sm:flex-none`}>
                  Necessary only
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 py-1">
            <div>
              <h2 className="text-base font-bold text-[#14120f]">Cookie preferences</h2>
              <p className="mt-1 text-[13px] text-[#56504a]">
                Necessary cookies are always on. Choose what else you are happy with.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {/* Necessary */}
              <div className="rounded-[2px] border border-[#ded8cd] bg-[#f7f4ee] p-4">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-[#14120f]">Necessary</h3>
                  <span className="rounded-full bg-[#e4f2f5] px-2 py-0.5 text-[11px] font-medium text-[#007a95]">
                    Always on
                  </span>
                </div>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#56504a]">
                  Security, session handling and referral attribution. The site does not work without these.
                </p>
              </div>

              {/* Analytics */}
              <div className="rounded-[2px] border border-[#ded8cd] p-4">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-[#14120f]">Analytics</h3>
                  <button
                    onClick={() => setPreferences({ ...preferences, analytics: !preferences.analytics })}
                    className={`h-6 w-11 flex-shrink-0 rounded-full transition-colors ${
                      preferences.analytics ? "bg-[#007a95]" : "bg-[#ded8cd]"
                    }`}
                    aria-label="Toggle analytics cookies"
                  >
                    <div
                      className={`h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                        preferences.analytics ? "translate-x-5" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#56504a]">
                  Google Analytics, so we can see which guides are useful. Aggregated, never sold.
                </p>
              </div>

              {/* Marketing */}
              <div className="rounded-[2px] border border-[#ded8cd] p-4">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-[#14120f]">Marketing</h3>
                  <button
                    onClick={() => setPreferences({ ...preferences, marketing: !preferences.marketing })}
                    className={`h-6 w-11 flex-shrink-0 rounded-full transition-colors ${
                      preferences.marketing ? "bg-[#007a95]" : "bg-[#ded8cd]"
                    }`}
                    aria-label="Toggle marketing cookies"
                  >
                    <div
                      className={`h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                        preferences.marketing ? "translate-x-5" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#56504a]">
                  Not currently used. Off unless we ever add advertising, and we would tell you first.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button onClick={saveCustomPreferences} className={btnPrimary}>
                Save preferences
              </button>
              <button onClick={() => setShowPreferences(false)} className={btnGhost}>
                Back
              </button>
              <span className="ml-auto text-[12px] text-[#56504a]">
                <a href="/privacy" className="hover:underline">
                  Privacy
                </a>{" "}
                ·{" "}
                <a href="/terms" className="hover:underline">
                  Terms
                </a>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
