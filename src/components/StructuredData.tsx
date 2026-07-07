/**
 * Structured Data (Schema.org) Components
 * Provides rich snippets for search engines
 */

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Refer Labs",
    "url": "https://referlabs.com.au",
    "logo": "https://referlabs.com.au/logo.svg",
    "image": "https://referlabs.com.au/og-image.png",
    "description": "Refer Labs is an Australian comparison and research platform. It helps consumers choose between health services, software and tools through independent, disclosed comparisons, and helps businesses acquire customers through featured partnerships, referral programs and growth services.",
    "slogan": "Compare properly. Choose with confidence.",
    "email": "jarred@referlabs.com.au",
    "foundingLocation": { "@type": "Country", "name": "Australia" },
    "founder": { "@type": "Person", "name": "Jarred Krowitz" },
    "areaServed": [
      { "@type": "Country", "name": "Australia" },
      { "@type": "Country", "name": "United States" },
      { "@type": "Country", "name": "United Kingdom" }
    ],
    "knowsAbout": [
      "Affiliate Marketing",
      "Referral Marketing",
      "Affiliate Program Database",
      "SEO for Affiliate Marketing",
      "Generative Engine Optimization",
      "Distribution Strategy",
      "Product Comparison and Reviews",
      "Weight Loss Telehealth Australia",
      "Hair Loss Treatment Australia",
      "GLP-1 and Semaglutide Telehealth",
      "Research Peptide Suppliers",
      "Website Builders",
      "Newsletter Platforms"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Business Enquiries",
      "email": "jarred@referlabs.com.au",
      "availableLanguage": ["English"]
    },
    "publishingPrinciples": "https://referlabs.com.au/how-we-research",
    "sameAs": [
      "https://www.linkedin.com/company/referlabs"
    ]
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
    "name": "Refer Labs",
    "url": "https://referlabs.com.au",
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
