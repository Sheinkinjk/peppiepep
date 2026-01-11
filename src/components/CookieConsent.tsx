"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

const COOKIE_CONSENT_KEY = "referlabs_cookie_consent";
const COOKIE_CONSENT_VERSION = "1.0"; // Increment when privacy policy changes

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
    // Check if user has already consented
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent) as CookiePreferences;
        // Show banner again if version changed (privacy policy update)
        if (parsed.version !== COOKIE_CONSENT_VERSION) {
          setShowBanner(true);
        }
      } catch {
        setShowBanner(true);
      }
    } else {
      // New user - show banner after 1 second delay
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(prefs));
    setShowBanner(false);
    setShowPreferences(false);

    // Reload to apply cookie settings (analytics, etc.)
    if (prefs.analytics || prefs.marketing) {
      // In future, initialize analytics here based on preferences
      // Preferences saved - ready for analytics initialization
    }
  };

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      version: COOKIE_CONSENT_VERSION,
      timestamp: Date.now(),
    };
    savePreferences(allAccepted);
  };

  const acceptNecessary = () => {
    const necessaryOnly: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      version: COOKIE_CONSENT_VERSION,
      timestamp: Date.now(),
    };
    savePreferences(necessaryOnly);
  };

  const saveCustomPreferences = () => {
    savePreferences({
      ...preferences,
      necessary: true, // Always true
      version: COOKIE_CONSENT_VERSION,
      timestamp: Date.now(),
    });
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998]" />

      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6">
        <div className="mx-auto max-w-6xl">
          <div className="relative rounded-3xl bg-white p-6 md:p-8 shadow-2xl ring-1 ring-slate-200">
            {/* Close button */}
            <button
              onClick={acceptNecessary}
              className="absolute top-4 right-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
              aria-label="Close and accept necessary cookies only"
            >
              <X className="h-5 w-5" />
            </button>

            {!showPreferences ? (
              // Simple banner
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <span className="text-white text-xl">🍪</span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-bold text-slate-900">
                      We value your privacy
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      We use essential cookies to make our site work. With your consent, we may also use analytics cookies to improve your experience. You can customize your preferences or accept all cookies.
                    </p>
                    <p className="text-xs text-slate-500">
                      By clicking "Accept All", you agree to the storing of cookies on your device. See our{" "}
                      <a href="/privacy" className="text-purple-700 hover:underline font-medium">
                        Privacy Policy
                      </a>{" "}
                      for more information.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={acceptAll}
                    className="flex-1 sm:flex-none rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all hover:scale-105"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={acceptNecessary}
                    className="flex-1 sm:flex-none rounded-xl bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
                  >
                    Necessary Only
                  </button>
                  <button
                    onClick={() => setShowPreferences(true)}
                    className="flex-1 sm:flex-none rounded-xl border-2 border-purple-200 px-6 py-3 text-sm font-semibold text-purple-700 hover:bg-purple-50 transition-colors"
                  >
                    Customize
                  </button>
                </div>
              </div>
            ) : (
              // Preferences panel
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Cookie Preferences
                  </h3>
                  <p className="text-sm text-slate-600">
                    Choose which cookies you want to accept. Necessary cookies are always enabled.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Necessary Cookies */}
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-slate-900">Necessary Cookies</h4>
                        <span className="text-xs font-medium text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">
                          Always Active
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">
                        Essential for the website to function. These cookies enable core functionality such as security, authentication, and referral tracking.
                      </p>
                      <p className="text-xs text-slate-500 mt-2">
                        Examples: Authentication tokens, session management, referral attribution
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="h-6 w-11 bg-purple-600 rounded-full cursor-not-allowed opacity-50"></div>
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="flex items-start gap-4 p-4 rounded-xl border-2 border-slate-200 hover:border-purple-200 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900 mb-1">Analytics Cookies</h4>
                      <p className="text-sm text-slate-600">
                        Help us understand how visitors interact with our website by collecting and reporting information anonymously.
                      </p>
                      <p className="text-xs text-slate-500 mt-2">
                        Currently disabled - No analytics cookies in use
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <button
                        onClick={() => setPreferences({ ...preferences, analytics: !preferences.analytics })}
                        className={`h-6 w-11 rounded-full transition-colors ${
                          preferences.analytics ? "bg-purple-600" : "bg-slate-300"
                        }`}
                        aria-label="Toggle analytics cookies"
                      >
                        <div
                          className={`h-5 w-5 rounded-full bg-white shadow-md transform transition-transform ${
                            preferences.analytics ? "translate-x-5" : "translate-x-0.5"
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="flex items-start gap-4 p-4 rounded-xl border-2 border-slate-200 hover:border-purple-200 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900 mb-1">Marketing Cookies</h4>
                      <p className="text-sm text-slate-600">
                        Used to track visitors across websites to display relevant advertisements and marketing content.
                      </p>
                      <p className="text-xs text-slate-500 mt-2">
                        Currently disabled - No marketing cookies in use
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <button
                        onClick={() => setPreferences({ ...preferences, marketing: !preferences.marketing })}
                        className={`h-6 w-11 rounded-full transition-colors ${
                          preferences.marketing ? "bg-purple-600" : "bg-slate-300"
                        }`}
                        aria-label="Toggle marketing cookies"
                      >
                        <div
                          className={`h-5 w-5 rounded-full bg-white shadow-md transform transition-transform ${
                            preferences.marketing ? "translate-x-5" : "translate-x-0.5"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={saveCustomPreferences}
                    className="flex-1 sm:flex-none rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all hover:scale-105"
                  >
                    Save Preferences
                  </button>
                  <button
                    onClick={() => setShowPreferences(false)}
                    className="flex-1 sm:flex-none rounded-xl bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
                  >
                    Back
                  </button>
                </div>

                <p className="text-xs text-slate-500 text-center">
                  Read our{" "}
                  <a href="/privacy" className="text-purple-700 hover:underline font-medium">
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a href="/terms" className="text-purple-700 hover:underline font-medium">
                    Terms of Service
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
