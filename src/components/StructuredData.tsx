/**
 * Structured Data (Schema.org) Components
 * Provides rich snippets for search engines
 */

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Refer Labs",
    "applicationCategory": "BusinessApplication",
    "applicationSubCategory": "Referral Marketing Software",
    "operatingSystem": "Web",
    "description": "Turn happy customers into your most powerful growth engine with automated referral tracking, rewards, and ambassador management.",
    "url": "https://referlabs.com.au",
    "image": "https://referlabs.com.au/og-image.png",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": "399",
      "highPrice": "599",
      "offerCount": "2",
      "offers": [
        {
          "@type": "Offer",
          "name": "Base Plan",
          "price": "399",
          "priceCurrency": "USD",
          "billingIncrement": "P1M",
          "description": "Perfect for growing businesses"
        },
        {
          "@type": "Offer",
          "name": "Scale Plan",
          "price": "599",
          "priceCurrency": "USD",
          "billingIncrement": "P1M",
          "description": "For established brands with high volume"
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "47",
      "bestRating": "5",
      "worstRating": "1"
    },
    "author": {
      "@type": "Organization",
      "name": "Refer Labs",
      "url": "https://referlabs.com.au"
    },
    "provider": {
      "@type": "Organization",
      "name": "Refer Labs",
      "url": "https://referlabs.com.au",
      "logo": "https://referlabs.com.au/logo.svg",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Support",
        "email": "jarred@referlabs.com.au",
        "availableLanguage": ["English"]
      },
      "sameAs": [
        "https://twitter.com/referlabs",
        "https://www.linkedin.com/company/referlabs"
      ]
    }
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
      "url": "https://referlabs.com.au/pricing",
      "seller": {
        "@type": "Organization",
        "name": "Refer Labs"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "47"
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
    "name": "Refer Labs",
    "url": "https://referlabs.com.au",
    "description": "Referral marketing software that turns customers into brand ambassadors",
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
