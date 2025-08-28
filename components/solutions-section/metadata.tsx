// Define solution metadata for SEO and structured data
export const solutionsMetadata = {
  title: "TEKIMAX Solutions - AI-Powered Decision Intelligence Platforms",
  description:
    "Platforms for data-driven decision intelligence and strategic planning in complex environments.",
  solutions: [
    {
      id: "customer-discovery",
      title: "Customer Discovery",
      description:
        "Collect and analyze customer feedback to guide product decisions through structured interview stages and document management.",
      acronym: "CD",
      status: "available",
      url: "https://interview.tekimax.com/",
      image: "/1.png",
      videoSrc: "/videos/solution-1.mp4",
      stages: [
        {
          title: "Prepare",
          description: "Create interview questions by stage",
        },
        {
          title: "Interview",
          description: "Conduct structured conversations",
        },
        {
          title: "Analyze",
          description: "Extract actionable insights",
        },
      ],
    },
    {
      id: "skillforge",
      title: "SkillForge",
      description:
        "Accelerate employee onboarding, enhance team training, and develop critical skills through risk-free practice conversations with lifelike AI avatars.",
      acronym: "SF",
      status: "coming-soon",
      url: "#",
      image: "/2.png",
      videoSrc: "/videos/solution-2.mp4",
      stages: [
        {
          title: "Practice",
          description: "Risk-free skill development",
        },
        {
          title: "Market Research",
          description: "Perfect pitch with realistic feedback",
        },
        {
          title: "Skill Building",
          description: "Improve interview techniques",
        },
      ],
    },
    {
      id: "leadership-dashboard",
      title: "Leadership Dashboard",
      description:
        "Empower executives and project managers to track training progress, approve projects based on customer insights, and align organizational strategy with real-time data.",
      acronym: "LD",
      status: "coming-soon",
      url: "#",
      image: "/3.png",
      videoSrc: "/videos/solution-3.mp4",
      stages: [
        {
          title: "Review",
          description: "Assess training and customer insights",
        },
        {
          title: "Approve",
          description: "Make informed project decisions",
        },
        {
          title: "Strategize",
          description: "Align organizational objectives",
        },
      ],
    },
    {
      id: "ai-integration",
      title: "AI Integration for Your Business",
      description:
        "Practical playbooks and implementation guides to help entrepreneurs, businesses, and small businesses integrate AI into their operations without technical expertise or large budgets.",
      acronym: "AIB",
      status: "free",
      url: "#",
      image:
        "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1032&auto=format&fit=crop",
      videoSrc: "/videos/solution-4.mp4",
      stages: [
        {
          title: "Learn",
          description: "Understand AI capabilities for your business",
        },
        {
          title: "Plan",
          description: "Create a tailored implementation strategy",
        },
        {
          title: "Implement",
          description: "Deploy AI solutions with expert guidance",
        },
      ],
    },
  ],
  schema: {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Product",
          name: "Customer Discovery",
          description:
            "Collect and analyze customer feedback to guide product decisions through structured interview stages and document management.",
          url: "https://tekimax.com/solutions#customer-discovery",
          image: "https://tekimax.com/1.png",
          offers: {
            "@type": "Offer",
            price: "Contact for pricing",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Product",
          name: "SkillForge",
          description:
            "Accelerate employee onboarding, enhance team training, and develop critical skills through risk-free practice conversations with lifelike AI avatars.",
          url: "https://tekimax.com/solutions#skillforge",
          image: "https://tekimax.com/2.png",
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/PreOrder",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Product",
          name: "Leadership Dashboard",
          description:
            "Empower executives and project managers to track training progress, approve projects based on customer insights, and align organizational strategy with real-time data.",
          url: "https://tekimax.com/solutions#leadership-dashboard",
          image: "https://tekimax.com/3.png",
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/PreOrder",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "Product",
          name: "AI Integration for Your Business",
          description:
            "Practical playbooks and implementation guides to help entrepreneurs, businesses, and small businesses integrate AI into their operations without technical expertise or large budgets.",
          url: "https://tekimax.com/solutions#ai-integration",
          image: "https://tekimax.com/4.png",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
        },
      },
    ],
  },
};
