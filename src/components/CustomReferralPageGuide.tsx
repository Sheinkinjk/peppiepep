"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Code,
  Copy,
  Check,
  ExternalLink,
  Settings,
  Palette,
  Webhook,
  Globe,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

type CodeSnippet = {
  title: string;
  language: string;
  code: string;
  description: string;
};

type GuideSection = {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  subsections: {
    title: string;
    content: React.ReactNode;
    codeSnippets?: CodeSnippet[];
  }[];
};

export function CustomReferralPageGuide({ siteUrl, businessId }: { siteUrl: string; businessId: string }) {
  const [expandedSection, setExpandedSection] = useState<string | null>("overview");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const normalizedSiteUrl = siteUrl.replace(/\/$/, "");

  const codeSnippets = {
    basicHTML: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Referral Program - Your Business</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 20px; background: #f8f9fa; }
    .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 16px; }
    .referral-link { padding: 16px; background: #f1f5f9; border-radius: 8px; font-family: monospace; word-break: break-all; }
    .discount-code { font-size: 24px; font-weight: bold; color: #0abab5; }
    button { background: #0abab5; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; }
  </style>
</head>
<body>
  <div class="container">
    <h1>You've Been Invited!</h1>
    <p id="ambassador-name">Loading...</p>
    <p>Share your unique link:</p>
    <div class="referral-link" id="referral-link">Loading...</div>
    <p>Your discount code:</p>
    <div class="discount-code" id="discount-code">Loading...</div>
    <button onclick="copyLink()">Copy Link</button>
  </div>

  <script>
    // Extract referral code from URL
    const urlParams = new URLSearchParams(window.location.search);
    const referralCode = urlParams.get('code') || window.location.pathname.split('/').pop();

    // Fetch ambassador data
    fetch(\`${normalizedSiteUrl}/api/ambassadors/\${referralCode}\`)
      .then(res => res.json())
      .then(data => {
        document.getElementById('ambassador-name').textContent = \`Invited by \${data.name}\`;
        document.getElementById('referral-link').textContent = data.referralLink;
        document.getElementById('discount-code').textContent = data.discountCode || 'No code needed';
      })
      .catch(err => console.error('Failed to load ambassador data:', err));

    function copyLink() {
      const link = document.getElementById('referral-link').textContent;
      navigator.clipboard.writeText(link);
      alert('Link copied!');
    }
  </script>
</body>
</html>`,

    reactComponent: `import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface AmbassadorData {
  name: string;
  referralCode: string;
  discountCode: string | null;
  referralLink: string;
  businessName: string;
  offerText: string;
  clientReward: string;
  newUserReward: string;
}

export function ReferralPage() {
  const router = useRouter();
  const { code } = router.query;
  const [ambassador, setAmbassador] = useState<AmbassadorData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!code) return;

    fetch(\`${normalizedSiteUrl}/api/ambassadors/\${code}\`)
      .then(res => res.json())
      .then(data => {
        setAmbassador(data);
        setLoading(false);

        // Track page visit
        fetch('${normalizedSiteUrl}/api/referral-events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ambassadorId: data.id,
            eventType: 'link_visit',
            source: 'custom_page',
          }),
        });
      })
      .catch(err => {
        console.error('Failed to load ambassador:', err);
        setLoading(false);
      });
  }, [code]);

  if (loading) return <div>Loading...</div>;
  if (!ambassador) return <div>Referral not found</div>;

  return (
    <div className="container">
      <h1>You've Been Hooked Up!</h1>
      <p>
        <strong>{ambassador.name}</strong> is sharing {ambassador.newUserReward} with you!
      </p>

      <div className="referral-section">
        <h2>Your Unique Link</h2>
        <div className="link-box">{ambassador.referralLink}</div>
        <button onClick={() => navigator.clipboard.writeText(ambassador.referralLink)}>
          Copy Link
        </button>
      </div>

      {ambassador.discountCode && (
        <div className="discount-section">
          <h2>Discount Code</h2>
          <div className="discount-code">{ambassador.discountCode}</div>
        </div>
      )}

      <div className="rewards">
        <div className="reward-card">
          <h3>You receive</h3>
          <p>{ambassador.newUserReward}</p>
        </div>
        <div className="reward-card">
          <h3>{ambassador.name} receives</h3>
          <p>{ambassador.clientReward}</p>
        </div>
      </div>
    </div>
  );
}`,

    apiEndpoint: `// Example API endpoint to fetch ambassador data
// This is already built into Pepform - you don't need to create this

// GET ${normalizedSiteUrl}/api/ambassadors/:code
// Returns:
{
  "id": "uuid",
  "name": "Sarah Johnson",
  "referralCode": "SARAH2024",
  "discountCode": "SARAH50",
  "referralLink": "${normalizedSiteUrl}/r/SARAH2024",
  "businessName": "Glow Spa",
  "offerText": "$50 off first visit",
  "clientReward": "$25 credit",
  "newUserReward": "$50 off",
  "businessId": "uuid",
  "credits": 125,
  "totalReferrals": 8
}

// POST ${normalizedSiteUrl}/api/referral-events
// Track events (link visits, signups, conversions)
{
  "ambassadorId": "uuid",
  "eventType": "link_visit" | "signup_submitted" | "conversion",
  "source": "custom_page",
  "metadata": { "page": "custom-landing" }
}

// POST ${normalizedSiteUrl}/api/referrals
// Submit a new referral
{
  "businessId": "uuid",
  "ambassadorId": "uuid",
  "referredName": "John Doe",
  "referredPhone": "+1234567890",
  "consentGiven": true,
  "locale": "en"
}`,

    wordpressPlugin: `<?php
/**
 * Plugin Name: Pepform Referral Integration
 * Description: Display personalized referral pages using Pepform API
 * Version: 1.0
 */

// Shortcode: [pepform_referral code="REFERRAL_CODE"]
function pepform_referral_shortcode($atts) {
    $atts = shortcode_atts(array(
        'code' => '',
    ), $atts);

    $code = sanitize_text_field($atts['code']);
    if (empty($code)) {
        return '<p>Invalid referral code</p>';
    }

    $api_url = '${normalizedSiteUrl}/api/ambassadors/' . $code;
    $response = wp_remote_get($api_url);

    if (is_wp_error($response)) {
        return '<p>Unable to load referral data</p>';
    }

    $data = json_decode(wp_remote_retrieve_body($response), true);

    ob_start();
    ?>
    <div class="pepform-referral">
        <h2>You've Been Invited by <?php echo esc_html($data['name']); ?>!</h2>
        <div class="referral-offer">
            <p><?php echo esc_html($data['offerText']); ?></p>
        </div>
        <div class="referral-link">
            <strong>Your Link:</strong>
            <input type="text" value="<?php echo esc_url($data['referralLink']); ?>" readonly />
            <button onclick="copyToClipboard(this.previousElementSibling.value)">Copy</button>
        </div>
        <?php if (!empty($data['discountCode'])): ?>
        <div class="discount-code">
            <strong>Discount Code:</strong>
            <span class="code"><?php echo esc_html($data['discountCode']); ?></span>
        </div>
        <?php endif; ?>
    </div>
    <script>
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text);
        alert('Link copied!');
    }
    </script>
    <style>
    .pepform-referral { padding: 20px; background: #f9f9f9; border-radius: 8px; }
    .referral-link input { width: 100%; padding: 8px; margin: 8px 0; }
    .discount-code .code { font-size: 24px; font-weight: bold; color: #0abab5; }
    </style>
    <?php
    return ob_get_clean();
}
add_shortcode('pepform_referral', 'pepform_referral_shortcode');`,

    webhookTracking: `// Track conversion events when a purchase is completed
// This should be called from your checkout/booking system

async function trackConversion(discountCode, transactionValue) {
  const response = await fetch('${normalizedSiteUrl}/api/discount-codes/redeem', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-pepf-discount-secret': 'YOUR_SECRET_KEY', // Get from dashboard
    },
    body: JSON.stringify({
      discountCode: discountCode,
      transactionValue: transactionValue,
      customerEmail: 'customer@example.com',
      metadata: {
        orderId: '12345',
        source: 'custom_checkout',
      },
    }),
  });

  const data = await response.json();

  if (data.success) {
    console.log('Ambassador credited:', data.ambassadorName);
  }
}

// Call this when checkout completes:
trackConversion('SARAH50', 150.00);`,

    customStyling: `/* Custom CSS Variables for Brand Consistency */
:root {
  --brand-primary: #0abab5;
  --brand-dark: #088a86;
  --brand-light: #e0f8f7;
  --brand-gradient: linear-gradient(135deg, #0abab5, #088a86);
}

.referral-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.hero-section {
  background: var(--brand-gradient);
  color: white;
  padding: 60px 40px;
  border-radius: 24px;
  margin-bottom: 32px;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -10%;
  width: 300px;
  height: 300px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  filter: blur(60px);
}

.referral-link-card {
  background: white;
  border: 2px solid var(--brand-light);
  border-radius: 16px;
  padding: 24px;
  margin: 16px 0;
  box-shadow: 0 4px 20px rgba(10, 186, 181, 0.1);
}

.discount-code {
  font-size: 32px;
  font-weight: 900;
  color: var(--brand-primary);
  text-align: center;
  padding: 20px;
  background: var(--brand-light);
  border-radius: 12px;
  letter-spacing: 2px;
}

.copy-button {
  background: var(--brand-primary);
  color: white;
  border: none;
  padding: 12px 32px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.copy-button:hover {
  background: var(--brand-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(10, 186, 181, 0.3);
}`,
  };

  const guideSections: GuideSection[] = [
    {
      id: "overview",
      title: "Overview: Building Custom Referral Pages",
      icon: <Globe className="h-5 w-5" />,
      description: "Understand how Pepform's referral system works and what you can customize",
      subsections: [
        {
          title: "How Pepform Referral Pages Work",
          content: (
            <div className="space-y-3 text-sm text-slate-700">
              <p>
                Pepform provides hosted referral pages at <code className="bg-slate-100 px-1 rounded">{normalizedSiteUrl}/r/[CODE]</code>, but you can build completely custom pages on your own domain that integrate with Pepform's backend.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="font-semibold text-blue-900 mb-2">The Referral Flow:</p>
                <ol className="list-decimal list-inside space-y-1 text-blue-900">
                  <li>Ambassador shares their unique code (e.g., SARAH2024)</li>
                  <li>Friend visits your custom page with that code</li>
                  <li>Your page fetches ambassador data from Pepform API</li>
                  <li>Friend sees personalized referral link, discount code, and rewards</li>
                  <li>Friend submits contact info (tracked in Pepform)</li>
                  <li>Friend completes purchase with discount code</li>
                  <li>Pepform automatically credits the ambassador</li>
                </ol>
              </div>
              <p className="font-semibold text-slate-900">What You Get From Pepform:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Unique referral codes for each ambassador</li>
                <li>Unique discount codes for tracking conversions</li>
                <li>RESTful API to fetch ambassador data</li>
                <li>Event tracking API for analytics</li>
                <li>Automatic credit calculations and payouts</li>
                <li>Admin dashboard for managing ambassadors</li>
              </ul>
            </div>
          ),
        },
        {
          title: "Required Data Flow",
          content: (
            <div className="space-y-3 text-sm text-slate-700">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <p className="font-semibold text-emerald-900 mb-2">Minimum Required Integration:</p>
                <ul className="list-disc list-inside space-y-1 text-emerald-900">
                  <li><strong>API Call #1:</strong> Fetch ambassador data to display personalized content</li>
                  <li><strong>API Call #2:</strong> Track link visits for analytics</li>
                  <li><strong>API Call #3:</strong> Submit referral signups (optional)</li>
                  <li><strong>Webhook:</strong> Report conversions when discount codes are used</li>
                </ul>
              </div>
            </div>
          ),
        },
      ],
    },
    {
      id: "implementation",
      title: "Implementation Options",
      icon: <Code className="h-5 w-5" />,
      description: "Choose your implementation approach based on your tech stack",
      subsections: [
        {
          title: "Option 1: Pure HTML/JavaScript (Simplest)",
          content: (
            <p className="text-sm text-slate-700">
              Perfect for adding to existing websites without a build process. Works with any hosting platform (WordPress, Wix, Squarespace, etc.)
            </p>
          ),
          codeSnippets: [
            {
              title: "Complete HTML Implementation",
              language: "html",
              code: codeSnippets.basicHTML,
              description: "Copy this entire file and host it on your domain. Replace the API URL with your site URL.",
            },
          ],
        },
        {
          title: "Option 2: React/Next.js Component",
          content: (
            <p className="text-sm text-slate-700">
              For React applications. Provides better performance, SEO, and developer experience.
            </p>
          ),
          codeSnippets: [
            {
              title: "React Component with Hooks",
              language: "tsx",
              code: codeSnippets.reactComponent,
              description: "Create this component in your Next.js or React app. Add routing to handle /referral/:code URLs.",
            },
          ],
        },
        {
          title: "Option 3: WordPress Plugin",
          content: (
            <p className="text-sm text-slate-700">
              Use shortcodes to embed referral pages anywhere in WordPress. No coding required after plugin installation.
            </p>
          ),
          codeSnippets: [
            {
              title: "WordPress Plugin Code",
              language: "php",
              code: codeSnippets.wordpressPlugin,
              description: "Save as a plugin file and activate. Use shortcode [pepform_referral code=\"SARAH2024\"] on any page.",
            },
          ],
        },
      ],
    },
    {
      id: "api",
      title: "API Integration Guide",
      icon: <Webhook className="h-5 w-5" />,
      description: "Connect to Pepform's API to fetch and submit data",
      subsections: [
        {
          title: "API Endpoints Reference",
          content: (
            <div className="space-y-3 text-sm text-slate-700">
              <p>All API endpoints are publicly accessible and don't require authentication for read operations.</p>
            </div>
          ),
          codeSnippets: [
            {
              title: "Available API Endpoints",
              language: "javascript",
              code: codeSnippets.apiEndpoint,
              description: "Use these endpoints to build your custom referral page.",
            },
          ],
        },
        {
          title: "Conversion Tracking Webhook",
          content: (
            <div className="space-y-3 text-sm text-slate-700">
              <p className="font-semibold text-slate-900">
                CRITICAL: You must call this webhook when a customer completes a purchase using a discount code.
              </p>
              <p>This is how Pepform knows to credit the ambassador. Without this, ambassadors won't receive credit for their referrals.</p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="font-semibold text-amber-900 mb-2">When to trigger:</p>
                <ul className="list-disc list-inside space-y-1 text-amber-900">
                  <li>Order is marked as "Completed" or "Paid"</li>
                  <li>Booking is confirmed and payment processed</li>
                  <li>Service is delivered (for service businesses)</li>
                </ul>
              </div>
            </div>
          ),
          codeSnippets: [
            {
              title: "Conversion Tracking Implementation",
              language: "javascript",
              code: codeSnippets.webhookTracking,
              description: "Add this to your checkout success page or order confirmation webhook.",
            },
          ],
        },
      ],
    },
    {
      id: "styling",
      title: "Custom Styling & Branding",
      icon: <Palette className="h-5 w-5" />,
      description: "Make the referral page match your brand",
      subsections: [
        {
          title: "CSS Framework & Variables",
          content: (
            <div className="space-y-3 text-sm text-slate-700">
              <p>Use these CSS classes and variables to maintain brand consistency across your referral pages.</p>
              <p>Pepform automatically provides <code className="bg-slate-100 px-1 rounded">brand_highlight_color</code> from your business settings.</p>
            </div>
          ),
          codeSnippets: [
            {
              title: "Custom CSS Stylesheet",
              language: "css",
              code: codeSnippets.customStyling,
              description: "Include this CSS in your page for a professional, branded look.",
            },
          ],
        },
        {
          title: "Responsive Design Considerations",
          content: (
            <div className="space-y-3 text-sm text-slate-700">
              <ul className="list-disc list-inside space-y-1">
                <li>Referral links can be long - use <code className="bg-slate-100 px-1 rounded">word-break: break-all</code></li>
                <li>Discount codes should be large and easy to tap on mobile</li>
                <li>Include a "Copy" button for one-tap copying</li>
                <li>Test on mobile devices - most referrals are shared via mobile</li>
                <li>Use <code className="bg-slate-100 px-1 rounded">viewport meta tag</code> for mobile optimization</li>
              </ul>
            </div>
          ),
        },
      ],
    },
    {
      id: "requirements",
      title: "Technical Requirements Checklist",
      icon: <Settings className="h-5 w-5" />,
      description: "Everything you need to implement a custom referral page",
      subsections: [
        {
          title: "Must-Have Features",
          content: (
            <div className="space-y-3 text-sm text-slate-700">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="font-semibold text-red-900 mb-2">Required Elements:</p>
                <ul className="list-disc list-inside space-y-1 text-red-900">
                  <li>✓ Display ambassador name</li>
                  <li>✓ Show personalized referral link</li>
                  <li>✓ Display discount code (if available)</li>
                  <li>✓ Show new user reward (e.g., "$50 off")</li>
                  <li>✓ Show ambassador reward (e.g., "$25 credit")</li>
                  <li>✓ Copy-to-clipboard functionality</li>
                  <li>✓ Track page visits via API</li>
                  <li>✓ Conversion tracking webhook</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                <p className="font-semibold text-green-900 mb-2">Recommended Features:</p>
                <ul className="list-disc list-inside space-y-1 text-green-900">
                  <li>○ Social share buttons (SMS, Email, WhatsApp)</li>
                  <li>○ QR code generation for in-person sharing</li>
                  <li>○ Ambassador stats (total referrals, credits earned)</li>
                  <li>○ Multi-language support</li>
                  <li>○ "How it works" explainer section</li>
                  <li>○ Mobile-responsive design</li>
                </ul>
              </div>
            </div>
          ),
        },
        {
          title: "URL Structure Requirements",
          content: (
            <div className="space-y-3 text-sm text-slate-700">
              <p>Your custom referral page should accept a referral code via URL:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Option 1: <code className="bg-slate-100 px-1 rounded">yourdomain.com/referral?code=SARAH2024</code></li>
                <li>Option 2: <code className="bg-slate-100 px-1 rounded">yourdomain.com/referral/SARAH2024</code></li>
                <li>Option 3: <code className="bg-slate-100 px-1 rounded">yourdomain.com/r/SARAH2024</code> (matches Pepform)</li>
              </ul>
              <p className="mt-3">The code should be extracted and used to fetch ambassador data from the API.</p>
            </div>
          ),
        },
        {
          title: "Security & Privacy",
          content: (
            <div className="space-y-3 text-sm text-slate-700">
              <ul className="list-disc list-inside space-y-1">
                <li>Use HTTPS for all API calls</li>
                <li>Store your discount capture secret securely (server-side only)</li>
                <li>Never expose API secrets in client-side JavaScript</li>
                <li>Include privacy policy and data handling notices</li>
                <li>Comply with GDPR/CCPA if applicable to your region</li>
                <li>Allow users to request data deletion (link to /contact)</li>
              </ul>
            </div>
          ),
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="rounded-3xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-xl">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-blue-600 p-3 shadow-lg">
            <Code className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-xs uppercase tracking-[0.35em] text-blue-700 font-semibold">
              Developer Guide
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight mb-2">
              Build Custom Referral Pages
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Use Pepform's API to create fully customized referral experiences on your own domain.
              This guide provides complete code examples and requirements for HTML, React, WordPress, and more.
            </p>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        {guideSections.map((section) => {
          const isExpanded = expandedSection === section.id;
          return (
            <Card key={section.id} className="rounded-2xl border border-slate-200 overflow-hidden">
              <button
                onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-slate-100 p-2 text-slate-700">
                    {section.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="font-black text-slate-900">{section.title}</h3>
                    <p className="text-sm text-slate-600">{section.description}</p>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronDown className="h-5 w-5 text-slate-400" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-slate-400" />
                )}
              </button>

              {isExpanded && (
                <div className="border-t border-slate-200 p-5 space-y-6 bg-slate-50/50">
                  {section.subsections.map((subsection, idx) => (
                    <div key={idx} className="space-y-4">
                      <h4 className="font-bold text-slate-900 text-base">{subsection.title}</h4>
                      <div>{subsection.content}</div>

                      {subsection.codeSnippets?.map((snippet, snippetIdx) => (
                        <div key={snippetIdx} className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                          <div className="flex items-center justify-between px-4 py-3 bg-slate-900 text-white">
                            <div className="flex items-center gap-2">
                              <Code className="h-4 w-4" />
                              <span className="text-sm font-semibold">{snippet.title}</span>
                              <span className="text-xs text-slate-400">({snippet.language})</span>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 text-white hover:bg-slate-800"
                              onClick={() => copyToClipboard(snippet.code, `${section.id}-${snippetIdx}`)}
                            >
                              {copiedCode === `${section.id}-${snippetIdx}` ? (
                                <>
                                  <Check className="h-4 w-4 mr-1" />
                                  Copied!
                                </>
                              ) : (
                                <>
                                  <Copy className="h-4 w-4 mr-1" />
                                  Copy
                                </>
                              )}
                            </Button>
                          </div>
                          <div className="p-4">
                            <p className="text-xs text-slate-600 mb-3">{snippet.description}</p>
                            <pre className="bg-slate-50 border border-slate-200 rounded-lg p-4 overflow-x-auto text-xs">
                              <code className="font-mono text-slate-800">{snippet.code}</code>
                            </pre>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      <Card className="rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-6">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
            <ExternalLink className="h-5 w-5 text-white" />
          </div>
          <div>
            <h4 className="font-black text-slate-900 mb-2 text-lg">Need Help?</h4>
            <p className="text-sm text-slate-700 leading-relaxed mb-3">
              If you're building a custom referral page and run into issues, we're here to help. You can also view
              Pepform's built-in referral pages for reference at <code className="bg-white px-2 py-1 rounded">{normalizedSiteUrl}/r/[CODE]</code>
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() => window.open(`${normalizedSiteUrl}/r/DEMO`, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Demo Page
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() => window.open(`${normalizedSiteUrl}/contact`, '_blank')}
              >
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
