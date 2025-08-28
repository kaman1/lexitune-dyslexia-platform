import { Metadata } from "next";
import type React from "react";
import { Lexend } from "next/font/google";
import { StructuredData, SolutionsSchema } from "@/components/seo";
import { Providers } from "../providers";
import CookieConsent from "@/components/CookieConsent";
import { ContentProtection } from "@/components/content-protection";

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lexend",
});

export const metadata: Metadata = {
  title: "Disclaimer | TEKIMAX - Legal Information",
  description: "Important legal disclaimer regarding the use of actors, models, and images on the TEKIMAX website for illustrative purposes only.",
  robots: "noindex, nofollow",
};

export default function DisclaimerLayout({
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
          <ContentProtection />
          <StructuredData />
          <SolutionsSchema />
          {/* Toaster removed from disclaimer page */}
          {children}
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}