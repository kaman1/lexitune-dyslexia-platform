import Script from "next/script";

export function StructuredData() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TEKIMAX",
    url: "https://tekimax.com",
    logo: "https://tekimax.com/logo.png",
    description:
      "TEKIMAX enhances organizational effectiveness through AI-powered situational awareness, data analysis, and decision intelligence solutions for businesses and government agencies.",
    sameAs: [
      "https://www.linkedin.com/company/tekimax-sfg",
      "https://twitter.com/tekimax",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
    offers: {
      "@type": "Offer",
      itemOffered: [
        {
          "@type": "Service",
          name: "Customer Discovery",
          description:
            "Collect and analyze customer feedback to guide product decisions through structured interview stages and document management.",
        },
        {
          "@type": "Service",
          name: "SkillForge",
          description:
            "Accelerate employee onboarding, enhance team training, and develop critical skills through risk-free practice conversations with lifelike AI avatars.",
        },
        {
          "@type": "Service",
          name: "Leadership Dashboard",
          description:
            "Empower executives and project managers to track training progress, approve projects based on customer insights, and align organizational strategy with real-time data.",
        },
        {
          "@type": "Service",
          name: "AI Integration for Your Business",
          description:
            "Practical playbooks and implementation guides to help entrepreneurs, startups, and small businesses integrate AI into their operations without technical expertise or large budgets.",
        },
        {
          "@type": "Service",
          name: "Situational Awareness Solutions",
          description:
            "AI-powered tools that enhance organizational awareness and decision-making capabilities.",
        },
        {
          "@type": "Service",
          name: "Data Analysis",
          description:
            "Advanced data processing and analysis to extract meaningful insights.",
        },
        {
          "@type": "Service",
          name: "Government Services",
          description:
            "Specialized solutions for government agencies and defense contractors.",
        },
      ],
    },
  };

  const webpageData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "TEKIMAX - Data-Driven Situational Awareness & Decision Intelligence",
    description:
      "Advanced platforms for situational awareness, decision intelligence, and data-driven strategic planning in complex environments.",
    url: "https://tekimax.com",
    mainEntity: {
      "@type": "Product",
      name: "TEKIMAX Solutions",
      description:
        "TEKIMAX solutions enhance organizational effectiveness through AI-powered situational awareness, data analysis, and decision intelligence solutions.",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        highPrice: "Custom",
        lowPrice: "Free",
        offerCount: 4,
      },
    },
  };

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(organizationData)}
      </Script>
      <Script
        id="webpage-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(webpageData)}
      </Script>
    </>
  );
}
