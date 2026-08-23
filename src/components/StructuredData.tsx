/**
 * Structured Data (Schema.org) Components
 * Provides rich snippets for search engines
 */

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    // Stable node id. Every page in the site renders this Organization and the
    // WebSite below, and ~110 pages also emit an isPartOf WebSite node. Without
    // ids those were all anonymous nodes an engine had to guess were the same
    // brand. With them there is one Organization and one WebSite, referenced by
    // id from everywhere else, which is the difference between a coherent entity
    // and a scatter of look-alike duplicates.
    "@id": "https://referlabs.com.au/#organization",
    "name": "Refer Labs",
    // The registered entity behind the trading name, matching /terms and /privacy.
    // Ties the site to a real, identifiable Australian business, which is a trust
    // signal that matters for YMYL health content.
    "legalName": "Pepform Pty Ltd",
    "identifier": {
      "@type": "PropertyValue",
      "propertyID": "ABN",
      "value": "32 660 008 159"
    },
    "url": "https://referlabs.com.au",
    "logo": "https://referlabs.com.au/logo.svg",
    "image": "https://referlabs.com.au/og-image.png",
    // Leads with the publishing, not the commercial side. The previous wording
    // ended on "featured partnerships ... growth services", which reads as paid
    // placement and undercuts the rankings-never-sold claim in the same breath.
    "description": "Refer Labs is an independent Australian comparison publisher. It researches and publishes comparisons of health services, insurance, energy and business software for Australian readers, using published provider pricing and terms. Rankings are never sold; pages carry disclosed affiliate links.",
    "slogan": "Compare properly. Choose with confidence.",
    "email": "jarred@referlabs.com.au",
    "foundingLocation": { "@type": "Country", "name": "Australia" },
    "areaServed": [
      { "@type": "Country", "name": "Australia" },
      { "@type": "Country", "name": "United States" },
      { "@type": "Country", "name": "United Kingdom" }
    ],
    // The strongest topical signal an entity sends, and it used to open with
    // "Affiliate Marketing", "Affiliate Program Database" and "SEO for Affiliate
    // Marketing". That described the retired $799 Blueprint business, and it told
    // every engine that this publisher's expertise IS affiliate marketing, which
    // is the last thing a comparison publisher wants asserted about it.
    //
    // Now the verticals actually published, consumer-first. Affiliate programmes
    // remain, once, at the end: /affiliate-programs-australia is a real and
    // growing cluster, so removing it entirely would be inaccurate. Position
    // matters more than presence.
    "knowsAbout": [
      "Weight Management Telehealth Australia",
      "Hair Loss Telehealth Australia",
      "Telehealth Services Australia",
      "Pet Insurance Australia",
      "Home Batteries and Solar Rebates Australia",
      "Website Builders and Landing Page Software",
      "Email Marketing and Newsletter Platforms",
      "CRM and Sales Software",
      // Business lending removed 22 Aug 2026: the vertical is hidden, and claiming
      // expertise in a subject the site no longer publishes is the same category of
      // inaccuracy this array was cleaned up to fix. Restore it with the vertical.
      "Product Comparison and Review Methodology",
      "Consumer Pricing Research Australia",
      "Affiliate Programs in Australia"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Business Enquiries",
      "email": "jarred@referlabs.com.au",
      "availableLanguage": ["English"]
    },
    // Public-record date: ABN 32 660 008 159 is active from 16 August 2022 on the
    // Australian Business Register. Stating it is how an engine can tell this is
    // an established business rather than a site that appeared last quarter.
    "foundingDate": "2022-08-16",
    "publishingPrinciples": "https://referlabs.com.au/about#how-we-research",
    // The properties that separate a publisher from a content farm. Each points
    // at a section that genuinely exists on /about; none is aspirational.
    "ethicsPolicy": "https://referlabs.com.au/about#how-we-rank",
    "correctionsPolicy": "https://referlabs.com.au/about#corrections",
    "actionableFeedbackPolicy": "https://referlabs.com.au/about#corrections",
    "ownershipFundingInfo": "https://referlabs.com.au/how-we-make-money",
    // Names the real person behind the publisher. Health and money topics are
    // assessed against expertise and accountability signals, and an
    // organisation string alone provides neither. Only verifiable facts here:
    // no invented credentials, titles or history.
    "founder": {
      "@type": "Person",
      "name": "Jarred Krowitz",
      "jobTitle": "Founder",
      "email": "jarred@referlabs.com.au",
      "url": "https://referlabs.com.au/about",
      "worksFor": { "@type": "Organization", "name": "Refer Labs" }
    },
    // Entity corroboration, ordered by how much weight each carries. LinkedIn
    // first: a company page is the profile an engine is most likely to already
    // hold an entity record for. The ABR entry is the only third-party one, and
    // the only one that proves the trading name maps to a registered company.
    //
    // Facebook returns 400 to a plain curl and renders normally in a browser, so
    // do not "fix" this list by removing it on the strength of a bot check; the
    // profile is live and is mirrored by a rel="me" link in the footer.
    "sameAs": [
      "https://www.linkedin.com/company/refer-labs",
      "https://www.instagram.com/referlabs",
      "https://www.facebook.com/profile.php?id=61592445156591",
      "https://abr.business.gov.au/ABN/View?abn=32660008159"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Declares the primary navigation to search engines.
 *
 * Sitelinks are algorithmic and cannot be forced; the demotion tool was retired
 * years ago. But every page on this site links to every hub through the nav and
 * footer, so internal link counts are identical across 166 URLs and give Google
 * nothing to rank importance by. With no hierarchy signal it falls back on page
 * type, which is why a brand search for "Refer Labs" surfaced About and For
 * Business, the two classically sitelink-shaped pages, rather than the
 * categories that earn.
 *
 * SiteNavigationElement is the one schema type designed to state that hierarchy.
 * It is a hint rather than a guarantee, and it is listed money-first so the
 * signal at least points the right way. The rest is brand search volume and what
 * people click, which no markup can substitute for.
 */
export function SiteNavigationSchema() {
  const nav = [
    { name: "Weight loss & telehealth", url: "https://referlabs.com.au/weight-loss" },
    { name: "Hair loss treatment", url: "https://referlabs.com.au/hair-loss" },
    { name: "Pet insurance", url: "https://referlabs.com.au/pet-insurance" },
    { name: "Home batteries", url: "https://referlabs.com.au/apollo-energy-group" },
    { name: "Business software", url: "https://referlabs.com.au/business-software" },
    { name: "Deals & discount codes", url: "https://referlabs.com.au/deals" },
    { name: "Guides & comparisons", url: "https://referlabs.com.au/guides" },
    { name: "About Refer Labs", url: "https://referlabs.com.au/about" },
  ];
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": "https://referlabs.com.au/#nav",
    name: "Refer Labs primary navigation",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: nav.map((n, i) => ({
      "@type": "SiteNavigationElement",
      position: i + 1,
      name: n.name,
      url: n.url,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleSchema({
  title,
  description,
  image,
  datePublished,
  dateModified,
  authorName = "Refer Labs",
}: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": image,
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "author": {
      "@type": "Organization",
      "name": authorName,
      "url": "https://referlabs.com.au"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Refer Labs",
      "logo": {
        "@type": "ImageObject",
        "url": "https://referlabs.com.au/logo.svg"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductSchema({
  name,
  description,
  image,
  price,
  currency = "USD",
}: {
  name: string;
  description: string;
  image: string;
  price: string;
  currency?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "description": description,
    "image": image,
    "brand": {
      "@type": "Brand",
      "name": "Refer Labs"
    },
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": currency,
      "availability": "https://schema.org/InStock",
      "url": "https://referlabs.com.au/contact",
      "seller": {
        "@type": "Organization",
        "name": "Refer Labs"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://referlabs.com.au/#website",
    "name": "Refer Labs",
    "alternateName": "referlabs.com.au",
    "url": "https://referlabs.com.au",
    "inLanguage": "en-AU",
    // Ties the site to the publisher behind it. Previously the two nodes sat
    // side by side on every page with nothing stating they were related.
    "publisher": { "@id": "https://referlabs.com.au/#organization" },
    "description": "Independent comparisons for Australians choosing health services, software and tools. Researched by people, disclosed on every page, rankings never sold.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://referlabs.com.au/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Refer Labs",
    "image": "https://referlabs.com.au/og-image.png",
    "url": "https://referlabs.com.au",
    "telephone": "+61-xxx-xxx-xxx",
    "email": "jarred@referlabs.com.au",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "AU",
      "addressRegion": "Australia"
    },
    "priceRange": "$399 - $599",
    "description": "Referral marketing software for modern businesses"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
