import type React from "react";
import "./globals.css";
import { Lexend } from "next/font/google";
import { StructuredData, SolutionsSchema } from "@/components/seo";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./providers";
import CookieConsent from "@/components/CookieConsent";
import { ContentProtection } from "@/components/content-protection";

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap", // Use font-display swap for faster text rendering
  variable: "--font-lexend",
});

// Separate viewport export as per Next.js guidelines
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // Allow users to zoom for accessibility
  minimumScale: 1,
  themeColor: "#ffffff",
};

export const metadata = {
  title: "LexiTune - Adaptive AI Multisensory Reading Platform",
  description:
    "LexiTune is an adaptive, multisensory reading platform built on the Orton-Gillingham approach—designed for neurodivergent learners who thrive through listening, reading, and doing.",
  keywords:
    "LexiTune, adaptive AI reading platform, multisensory learning, Orton-Gillingham, dyslexia support, neurodivergent learners, reading intervention, AI-powered education, personalized reading instruction, learning disabilities, reading fluency, phonemic awareness, visual-spatial reading, reading comprehension, speed reading, educational technology, assistive technology, inclusive education, reading skills development, AI tutoring",
  authors: [{ name: "TEKIMAX Research & Development", url: "https://tekimax.com" }],
  creator: "TEKIMAX Research & Development",
  publisher: "TEKIMAX Research & Development",
  generator: "LexiTune Platform",
  applicationName: "LexiTune",
  referrer: "origin-when-cross-origin",
  metadataBase: new URL("https://lexitune.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    noarchive: false,
    noimageindex: false,
    noai: false,
    noimageai: false,
    notranslate: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": 30,
      "max-snippet": 150,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#5bbad5" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title:
      "LexiTune - Adaptive AI Multisensory Reading Platform",
    description:
      "LexiTune is an adaptive, multisensory reading platform built on the Orton-Gillingham approach—designed for neurodivergent learners who thrive through listening, reading, and doing.",
    url: "https://lexitune.com",
    siteName: "LexiTune",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://lexitune.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LexiTune - Adaptive AI Multisensory Reading Platform"
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "LexiTune - Adaptive AI Multisensory Reading Platform",
    description:
      "LexiTune is an adaptive, multisensory reading platform built on the Orton-Gillingham approach—designed for neurodivergent learners who thrive through listening, reading, and doing.",
    site: "@2enovate",
    creator: "@2enovate",
    images: ["https://lexitune.com/twitter-image.jpg"],
  },
  social: {
    linkedin: "https://www.linkedin.com/company/tekimax-sfg",
  },
  // Additional headers for anti-scraping and content protection
  other: {
    "x-robots-tag": "noai, noimageai",
    "Content-Security-Policy": "frame-ancestors 'self'; object-src 'none'; base-uri 'self';",
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy":
      "browsing-topics=(), interest-cohort=(), attribution-reporting=(), clipboard-read=(), clipboard-write=()",
    "X-Permitted-Cross-Domain-Policies": "none",
    "Cross-Origin-Embedder-Policy": "require-corp",
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Resource-Policy": "same-origin",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex, noai, noimageai" />
        <meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet, noimageindex, noai, noimageai" />
        <meta name="bingbot" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
        <meta name="ai-enabled" content="false" />
        <meta name="crawl-delay" content="10" />
        
        {/* Content protection meta tags */}
        <meta name="copyright" content="© 2025 TEKIMAX. All rights reserved." />
        <meta name="document-classification" content="restricted" />
        <meta name="document-rating" content="protected" />
        <meta name="resource-type" content="protected-content" />
        <meta name="distribution" content="restricted" />
        <meta name="robots" content="noarchive, nosnippet, noimageindex, notranslate, noai, noimageai" />


        {/* Preload critical assets */}
        <link
          rel="preconnect"
          href="https://s3.tekimax.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://s3.tekimax.com" />

        {/* Add resource hints for third-party domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Add meta tag for improved mobile rendering */}
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={`${lexend.className} overflow-x-hidden`}>
        <Providers>
          {/* <ConvexClientProvider> */}
          <ContentProtection />
          <StructuredData />
          <SolutionsSchema />
          <Toaster />
          {children}
          <CookieConsent />
          {/* </ConvexClientProvider> */}
        </Providers>
      </body>
    </html>
  );
}
