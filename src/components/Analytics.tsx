"use client";

import Script from "next/script";

/**
 * Google Analytics 4 Component
 *
 * Setup Instructions:
 * 1. Create a Google Analytics 4 property at https://analytics.google.com
 * 2. Get your Measurement ID (format: G-XXXXXXXXXX)
 * 3. Add to your .env.local:
 *    NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
 * 4. This component is already imported in the root layout
 *
 * Events tracked automatically:
 * - Page views
 * - Scroll depth
 * - Outbound clicks
 * - File downloads
 *
 * Custom events can be triggered using:
 * window.gtag('event', 'event_name', { ...parameters })
 */

export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  // Only load in production or if explicitly enabled
  if (!measurementId || process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <>
      {/* Consent Mode v2. beforeInteractive, not afterInteractive: both this and
          gtag.js used to be afterInteractive, which queues them together and does
          not guarantee which runs first. Google requires the consent default to be
          set BEFORE the library loads, and if the library won the race the default
          was applied too late. beforeInteractive removes the race entirely.
          (See CookieConsent.tsx, which calls gtag('consent','update') on save.) */}
      <Script id="google-analytics" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}

          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied'
          });

          try {
            var stored = JSON.parse(localStorage.getItem('referlabs_cookie_consent') || 'null');
            if (stored && stored.version === '1.0') {
              gtag('consent', 'update', {
                analytics_storage: stored.analytics ? 'granted' : 'denied',
                ad_storage: stored.marketing ? 'granted' : 'denied',
                ad_user_data: stored.marketing ? 'granted' : 'denied',
                ad_personalization: stored.marketing ? 'granted' : 'denied'
              });
            }
          } catch (e) {}

          gtag('js', new Date());

          /* ?ga_debug=1 on any URL turns on DebugView for that tab, so the
             tag can be verified on the real site without installing an
             extension. It only affects the visitor who typed it. */
          var __dbg = false;
          try { __dbg = new URLSearchParams(window.location.search).get('ga_debug') === '1'; } catch (e) {}

          gtag('config', '${measurementId}', {
            send_page_view: true,
            debug_mode: __dbg
          });

          /* A visible answer to "is this working". With ?ga_debug=1 the console
             prints whether config ran and what consent is actually set to, which
             is the difference between a broken tag and a tag correctly staying
             quiet because nobody accepted analytics cookies. */
          if (__dbg) {
            try {
              var __c = JSON.parse(localStorage.getItem('referlabs_cookie_consent') || 'null');
              console.log('[Refer Labs] GA4 ${measurementId} configured. debug_mode on.');
              console.log('[Refer Labs] stored consent:', __c || 'NONE YET (banner not answered, analytics stays denied)');
              console.log('[Refer Labs] dataLayer entries:', (window.dataLayer || []).length);
            } catch (e) {}
          }

          /* AI-assistant referral detection. GA4 lumps these into generic
             "Referral", so we tag them explicitly: an 'ai_referral' event with
             the assistant name, plus a user property, so AI visibility is
             reportable. Fires through gtag, so Consent Mode still governs cookies. */
          try {
            var __ref = document.referrer || '';
            var __ai = [
              { re: /chatgpt\\.com|chat\\.openai\\.com|openai\\.com/i, name: 'ChatGPT' },
              { re: /perplexity\\.ai/i, name: 'Perplexity' },
              { re: /claude\\.ai|anthropic\\.com/i, name: 'Claude' },
              { re: /gemini\\.google\\.com|bard\\.google\\.com/i, name: 'Gemini' },
              { re: /copilot\\.microsoft\\.com|bing\\.com\\/(chat|search\\?.*(showconv|sydney))|edgeservices\\.bing\\.com/i, name: 'Microsoft Copilot' }
            ];
            for (var __i = 0; __i < __ai.length; __i++) {
              if (__ai[__i].re.test(__ref)) {
                gtag('event', 'ai_referral', {
                  ai_source: __ai[__i].name,
                  page_location: window.location.href,
                  page_referrer: __ref
                });
                gtag('set', 'user_properties', { last_ai_source: __ai[__i].name });
                window.dataLayer.push({ event: 'ai_referral', ai_source: __ai[__i].name });
                break;
              }
            }
          } catch (e) {}
        `}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
    </>
  );
}

/**
 * Google Tag Manager Component (Alternative to GA4)
 *
 * Setup Instructions:
 * 1. Create a GTM container at https://tagmanager.google.com
 * 2. Get your Container ID (format: GTM-XXXXXXX)
 * 3. Add to your .env.local:
 *    NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
 *
 * GTM is more flexible than GA4 alone:
 * - Manage multiple tracking tools (GA4, Facebook Pixel, LinkedIn Insight Tag)
 * - Set up event tracking without code changes
 * - A/B testing integrations
 */

export function GoogleTagManager() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  if (!gtmId || process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <>
      <Script id="google-tag-manager" strategy="lazyOnload">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');
        `}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
}

/**
 * Meta (Facebook) Pixel, for retargeting on Facebook & Instagram
 * Set NEXT_PUBLIC_META_PIXEL_ID in Vercel for the marketing partner to enable
 */
export function MetaPixel() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (!pixelId || process.env.NODE_ENV !== "production") return null;
  return (
    <>
      <Script id="meta-pixel" strategy="lazyOnload">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');fbq('track','PageView');`}
      </Script>
      <noscript>
        <img height="1" width="1" style={{ display: "none" }} alt="" src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`} />
      </noscript>
    </>
  );
}

/**
 * LinkedIn Insight Tag, for retargeting on LinkedIn (high B2B intent)
 * Set NEXT_PUBLIC_LINKEDIN_PARTNER_ID in Vercel
 */
export function LinkedInInsight() {
  const partnerId = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID;
  if (!partnerId || process.env.NODE_ENV !== "production") return null;
  return (
    <>
      <Script id="linkedin-insight" strategy="lazyOnload">
        {`_linkedin_partner_id="${partnerId}";window._linkedin_data_partner_ids=window._linkedin_data_partner_ids||[];window._linkedin_data_partner_ids.push(_linkedin_partner_id);(function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[]}var s=document.getElementsByTagName("script")[0];var b=document.createElement("script");b.type="text/javascript";b.async=true;b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";s.parentNode.insertBefore(b,s)})(window.lintrk);`}
      </Script>
      <noscript>
        <img height="1" width="1" style={{ display: "none" }} alt="" src={`https://px.ads.linkedin.com/collect/?pid=${partnerId}&fmt=gif`} />
      </noscript>
    </>
  );
}

/**
 * Searchable Analytics (client-side, cookieless).
 *
 * Privacy-first pageview/event analytics (Plausible-style): no cookies, no
 * cross-site tracking, no personal profiles. Runs consent-independently on the
 * same basis as Vercel Analytics, and is disclosed in /privacy. The pst_ value is
 * a PUBLIC site token, safe to expose client-side. Server-side capture (including
 * AI crawlers that don't run JS) is handled separately in src/proxy.ts.
 * Production only, so local/preview traffic doesn't pollute the data.
 */

/**
 * Custom Event Tracking Utilities
 * Use these to track specific user actions
 */

export const trackEvent = (eventName: string, parameters?: Record<string, unknown>) => {
  if (typeof window !== "undefined" && "gtag" in window) {
    (window as Window & { gtag: (command: string, eventName: string, params?: Record<string, unknown>) => void }).gtag("event", eventName, parameters);
  }
};

// Predefined event trackers for common actions
export const analytics = {
  // Track pricing plan selection
  trackPricingPlanClick: (plan: string, billingCycle: string) => {
    trackEvent("select_plan", {
      plan_name: plan,
      billing_cycle: billingCycle,
      value: plan === "base" ? 399 : 599,
      currency: "USD",
    });
  },

  // Track trial signup
  trackTrialSignup: (plan: string) => {
    trackEvent("sign_up", {
      method: "email",
      plan_name: plan,
    });
  },

  // Track successful payment
  trackPurchase: (plan: string, amount: number, transactionId: string) => {
    trackEvent("purchase", {
      transaction_id: transactionId,
      value: amount,
      currency: "USD",
      items: [
        {
          item_name: `Refer Labs ${plan} Plan`,
          item_category: "subscription",
          price: amount,
          quantity: 1,
        },
      ],
    });
  },

  // Track ROI calculator usage
  trackROICalculator: (monthlyCustomers: number, conversionRate: number, estimatedROI: number) => {
    trackEvent("roi_calculator_used", {
      monthly_customers: monthlyCustomers,
      conversion_rate: conversionRate,
      estimated_roi: estimatedROI,
    });
  },

  // Track referral link creation
  trackReferralCreated: (ambassadorId: string) => {
    trackEvent("referral_link_created", {
      ambassador_id: ambassadorId,
    });
  },

  // Track contact form submission
  trackContactFormSubmit: () => {
    trackEvent("generate_lead", {
      form_name: "contact_form",
    });
  },

  // Track blog post view
  trackBlogView: (postTitle: string) => {
    trackEvent("blog_view", {
      post_title: postTitle,
    });
  },

  // Track video play
  trackVideoPlay: (videoTitle: string) => {
    trackEvent("video_start", {
      video_title: videoTitle,
    });
  },

  // Track outbound link clicks
  trackOutboundClick: (url: string, linkText: string) => {
    trackEvent("click", {
      link_url: url,
      link_text: linkText,
      outbound: true,
    });
  },

  // ── Cross-platform Blueprint events (GA4 + Meta Pixel + LinkedIn) ──────
  blueprintIntakeStarted: () => {
    trackEvent("blueprint_intake_started", { product: "Referral Growth Blueprint" });
    if (typeof window !== "undefined" && "fbq" in window) {
      (window as Window & { fbq: (track: string, event: string, params?: Record<string, unknown>) => void })
        .fbq("track", "InitiateCheckout", { content_name: "Referral Growth Blueprint", value: 799, currency: "AUD" });
    }
    if (typeof window !== "undefined" && "lintrk" in window) {
      (window as Window & { lintrk: (track: string, params: { conversion_id: number }) => void })
        .lintrk("track", { conversion_id: 0 });
    }
  },
  blueprintCheckoutInitiated: () => {
    trackEvent("blueprint_checkout_initiated", { value: 799, currency: "AUD" });
    if (typeof window !== "undefined" && "fbq" in window) {
      (window as Window & { fbq: (track: string, event: string, params?: Record<string, unknown>) => void })
        .fbq("track", "AddPaymentInfo", { content_name: "Referral Growth Blueprint", value: 799, currency: "AUD" });
    }
  },
  blueprintPurchaseCompleted: (sessionId?: string) => {
    trackEvent("purchase", {
      transaction_id: sessionId ?? "blueprint_" + Date.now(),
      value: 799,
      currency: "AUD",
      items: [{ item_name: "Referral Growth Blueprint", item_category: "Digital Product", price: 799, quantity: 1 }],
    });
    if (typeof window !== "undefined" && "fbq" in window) {
      (window as Window & { fbq: (track: string, event: string, params?: Record<string, unknown>) => void })
        .fbq("track", "Purchase", { content_name: "Referral Growth Blueprint", value: 799, currency: "AUD" });
    }
    if (typeof window !== "undefined" && "lintrk" in window) {
      (window as Window & { lintrk: (track: string, params: { conversion_id: number }) => void })
        .lintrk("track", { conversion_id: 0 });
    }
  },
  leadCaptured: (source: string) => {
    trackEvent("generate_lead", { source, value: 1, currency: "AUD" });
    if (typeof window !== "undefined" && "fbq" in window) {
      (window as Window & { fbq: (track: string, event: string, params?: Record<string, unknown>) => void })
        .fbq("track", "Lead", { source });
    }
  },
};

// Type declaration for window.gtag
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}
