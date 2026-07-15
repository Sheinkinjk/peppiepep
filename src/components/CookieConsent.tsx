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
    "rounded-lg bg-[#0a7c42] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#086b39]";
  const btnGhost =
    "rounded-lg px-5 py-2.5 text-sm font-semibold text-[#3d4b44] transition-colors hover:bg-[#f2f4ee]";

  return (
    // Slim bottom bar. No page overlay, no blur: the site stays readable while you decide.
    <div className="fixed bottom-0 left-0 right-0 z-[9999] border-t border-[#e5e9e7] bg-white shadow-[0_-8px_30px_-12px_rgba(16,37,27,0.15)]">
      <div className="mx-auto max-w-6xl px-5 py-4 sm:px-8">
        {!showPreferences ? (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <p className="text-[13px] leading-relaxed text-[#3d4b44]">
              We use essential cookies to make the site work, and analytics cookies only if you agree. See our{" "}
              <a href="/privacy" className="font-semibold text-[#0a7c42] hover:underline">
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
              <h2 className="text-base font-bold text-[#10251b]">Cookie preferences</h2>
              <p className="mt-1 text-[13px] text-[#6e7b74]">
                Necessary cookies are always on. Choose what else you are happy with.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {/* Necessary */}
              <div className="rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] p-4">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-[#10251b]">Necessary</h3>
                  <span className="rounded-full bg-[#e8f5ee] px-2 py-0.5 text-[11px] font-medium text-[#0a7c42]">
                    Always on
                  </span>
                </div>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#6e7b74]">
                  Security, session handling and referral attribution. The site does not work without these.
                </p>
              </div>

              {/* Analytics */}
              <div className="rounded-xl border border-[#e5e9e7] p-4">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-[#10251b]">Analytics</h3>
                  <button
                    onClick={() => setPreferences({ ...preferences, analytics: !preferences.analytics })}
                    className={`h-6 w-11 flex-shrink-0 rounded-full transition-colors ${
                      preferences.analytics ? "bg-[#0a7c42]" : "bg-[#d7dcd8]"
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
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#6e7b74]">
                  Google Analytics, so we can see which guides are useful. Aggregated, never sold.
                </p>
              </div>

              {/* Marketing */}
              <div className="rounded-xl border border-[#e5e9e7] p-4">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-[#10251b]">Marketing</h3>
                  <button
                    onClick={() => setPreferences({ ...preferences, marketing: !preferences.marketing })}
                    className={`h-6 w-11 flex-shrink-0 rounded-full transition-colors ${
                      preferences.marketing ? "bg-[#0a7c42]" : "bg-[#d7dcd8]"
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
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#6e7b74]">
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
              <span className="ml-auto text-[12px] text-[#9aa39c]">
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
