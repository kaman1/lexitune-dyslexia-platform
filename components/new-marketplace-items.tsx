"use client";

import {
  Shield,
  ExternalLink,
  ArrowRight,
  CheckCircle,
  MessageSquare,
  Building,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export function NewMarketplaceItems() {
  const [activeTab, setActiveTab] = useState("our-products");

  // Define the type for marketplace items
  type MarketplaceItem = {
    id: number;
    title: string;
    description: string;
    category: string;
    categoryColor: string;
    image: string;
    href: string;
    badge?: string;
    badgeColor?: string;
    icon: React.ReactNode;
    features: string[];
    isNew: boolean;
    isExternal: boolean;
    vendor: string;
  };

  // Our products
  const ourProducts: MarketplaceItem[] = [
    // {
    //   id: 0,
    //   title: "The Blueprint Podcast",
    //   description:
    //     "Join The Blueprint Podcast to explore research articles, insights, and practical tips that can help you stay informed in entrepreneurship. The AI hosts break down the latest studies and reports to provide useful knowledge for your business journey.",
    //   category: "AI Education",
    //   categoryColor: "bg-indigo-100 text-indigo-800",
    //   image: "/images/aipodcast.png",
    //   href: "https://aipodcast.tekimax.com/",
    //   badge: "Free",
    //   badgeColor: "bg-blue-500",
    //   icon: <MessageSquare className="h-5 w-5" />,
    //   features: [
    //     "AI-Hosted Episodes - Engaging AI hosts break down complex research into actionable insights",
    //     "Latest Research Coverage - Stay updated with the newest entrepreneurship studies and reports",
    //     "Practical Business Tips - Real-world applications you can implement immediately",
    //     "Regular Updates - Fresh content to keep you informed on industry trends",
    //   ],
    //   isNew: true,
    //   isExternal: true,
    //   vendor: "Tekimax",
    // },
    {
      id: 0,
      title: "AI Literacy Resources",
      description:
        "Empowering organizations to integrate AI, develop skills, and prepare for evolving job landscapes with practical future-ready resources.",
      category: "AI Education",
      categoryColor: "bg-indigo-100 text-indigo-800",
      image: "/education.jpg",
      href: "https://resources.tekimax.com",
      icon: <MessageSquare className="h-5 w-5" />,
      features: [
        "For Veterans - Gain new skills for tech careers",
        "For Small Businesses - Reduce costs, improve efficiency",
        "For Local Government - Enhance services and decision-making",
      ],
      isNew: false,
      isExternal: true,
      vendor: "Tekimax",
    },
    {
      id: 1,
      title: "CMMC Level 1 Compliance Manager",
      description:
        "A comprehensive platform for managing CMMC (Cybersecurity Maturity Model Certification) Level 1 compliance requirements with AI-powered assistance and automated document processing.",
      category: "Compliance & Security",
      categoryColor: "bg-red-100 text-red-800",
      image: "/images/cmmc.png",
      href: "https://github.com/TEKIMAX/cmmc-level-1-compliance",
      badge: "Open Source",
      badgeColor: "bg-green-500",
      icon: <Shield className="h-5 w-5" />,
      features: [
        "Complete implementation tracking for all 17 CMMC Level 1 controls",
        "AI-powered assistance with built-in chat for compliance guidance",
        "Real-time compliance dashboard with visual progress overview",
        "Document management with AI embeddings and smart search",
      ],
      isNew: true,
      isExternal: true,
      vendor: "Tekimax",
    },
    // {
    //   id: 2,
    //   title: "Quick Forms",
    //   description:
    //     "AI-powered forms for business professionals. Generate professional forms instantly, collect payments, integrate with your systems via API, and close deals faster.",
    //   category: "Productivity",
    //   categoryColor: "bg-cyan-100 text-cyan-800",
    //   image: "/images/forms.svg",
    //   href: "https://forms.tekimax.com",
    //   icon: <FormInput className="h-5 w-5" />,
    //   features: [
    //     "AI form generation - describe your needs and get professional forms in seconds",
    //     "Full API access - integrate forms with your existing systems and workflows",
    //     "Instant payments - close deals faster with built-in Stripe payment processing",
    //     "Professional branding - custom branded forms with your logo and colors",
    //   ],
    //   isNew: true,
    //   isExternal: true,
    //   vendor: "Tekimax",
    // },
    {
      id: 3,
      title: "Customer Discovery",
      description:
        "Collect and analyze customer feedback to guide product decisions through structured interview stages and document management.",
      category: "Communication",
      categoryColor: "bg-purple-100 text-purple-800",
      image: "/1.png",
      href: "https://interview.tekimax.com/",
      icon: <MessageSquare className="h-5 w-5" />,
      features: [
        "Prepare - Create interview questions by stage",
        "Interview - Conduct structured conversations",
        "Analyze - Extract actionable insights",
        "Document management for interview records and analysis",
      ],
      isNew: false,
      isExternal: true,
      vendor: "Tekimax",
    },
  ];

  // Partner apps (placeholder - no partners yet)
  const partnerApps: MarketplaceItem[] = [];

  const currentItems = activeTab === "our-products" ? ourProducts : partnerApps;

  return (
    <section className="pt-12 pb-24 md:pt-16 md:pb-32 bg-white relative overflow-hidden">
      <div className="container px-6 relative z-10 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium mb-6 tracking-tight">
              AI Tools for Your Organization
            </h2>
            <p className="text-zinc-500 mx-auto max-w-3xl leading-relaxed">
              We build AI tools to help teach people.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-zinc-100 rounded-lg p-1 flex">
              <button
                onClick={() => setActiveTab("our-products")}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 flex items-center gap-2 ${
                  activeTab === "our-products"
                    ? "bg-white text-black shadow-sm"
                    : "text-zinc-600 hover:text-black"
                }`}
              >
                <Building className="h-4 w-4" />
                Our Products
              </button>
              <button
                onClick={() => setActiveTab("partner-apps")}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 flex items-center gap-2 ${
                  activeTab === "partner-apps"
                    ? "bg-white text-black shadow-sm"
                    : "text-zinc-600 hover:text-black"
                }`}
              >
                <Users className="h-4 w-4" />
                Partner Apps
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="mb-8">
            {activeTab === "our-products" && (
              <div className="text-center">
                <h3 className="text-xl font-medium mb-2">Our AI Tools</h3>
                <p className="text-zinc-600">
                  Built by Tekimax to help teach people and integrate AI
                  securely into organizational processes.
                </p>
              </div>
            )}
            {activeTab === "partner-apps" && (
              <div className="text-center">
                <h3 className="text-xl font-medium mb-2">
                  Partner Applications
                </h3>
                <p className="text-zinc-600">
                  Third-party applications from our trusted partners that
                  integrate with our AI tools ecosystem.
                </p>
              </div>
            )}
          </div>

          {/* Content based on active tab */}
          {activeTab === "our-products" ? (
            /* Tools Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {currentItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-zinc-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Image Section */}
                  <div className="relative h-48 bg-zinc-50 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      {item.isNew && (
                        <span className="px-2 py-1 bg-black text-white rounded text-xs font-medium">
                          New
                        </span>
                      )}
                      {item.badge && (
                        <span
                          className={`px-2 py-1 ${item.badgeColor} text-white rounded text-xs font-medium`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                    {/* Vendor Badge */}
                    <div className="absolute bottom-3 right-3">
                      <span className="px-2 py-1 bg-white/90 text-zinc-700 rounded text-xs font-medium">
                        {item.vendor}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Category & Icon */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-6 w-6 bg-zinc-700 rounded flex items-center justify-center text-white">
                        {item.icon}
                      </div>
                      <span
                        className={`px-2 py-1 ${item.categoryColor} rounded text-xs font-medium`}
                      >
                        {item.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-medium mb-3 text-zinc-900">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-zinc-600 mb-4 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {item.features.slice(0, 2).map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-zinc-600">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    {item.isExternal ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Button className="w-full bg-black text-white hover:bg-zinc-800">
                          <span>Explore Tool</span>
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                    ) : (
                      <Link href={item.href} className="block">
                        <Button className="w-full bg-black text-white hover:bg-zinc-800">
                          <span>Explore Tool</span>
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Partner Apps Placeholder */
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-12 w-12 text-zinc-400" />
                </div>
                <h3 className="text-xl font-medium mb-4 text-zinc-900">
                  No Partner Apps Yet
                </h3>
                <p className="text-zinc-600 mb-8 leading-relaxed">
                  We're building an ecosystem of trusted partners. Be among the
                  first to join our marketplace and integrate your application
                  with our AI tools platform.
                </p>
                <a
                  href="https://40psmz.share-na2.hsforms.com/2MZ5htqN9T7qVtxvY8n1bmg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-black text-white hover:bg-zinc-800 px-6 py-3">
                    Apply to Join Marketplace
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <p className="text-sm text-zinc-500 mt-4">
                  Submit your application and we'll review your integration
                  proposal.
                </p>
              </div>
            </div>
          )}

          {/* View All CTA - only show for Our Products */}
          {activeTab === "our-products" && (
            <div className="text-center">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-black text-white hover:bg-zinc-800 px-8 py-3"
                >
                  View All Solutions
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
