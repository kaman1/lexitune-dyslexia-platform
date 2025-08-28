# Tekimax Technical Setup Guide

This document provides comprehensive technical information for setting up, building, and deploying the Tekimax website.

## Technology Stack

### Core Framework
- **Next.js**: 15.2.4 (React framework)
- **React**: 19 (UI library)
- **TypeScript**: 5 (Type safety)
- **Tailwind CSS**: 3.4.17 (Styling)

### Build Tools
- **Bun**: 1.1.34 (Package manager & runtime)
- **Vite**: (Development server)
- **Wrangler**: 4.27.0 (Cloudflare deployment)

### UI Components
- **Radix UI**: (Headless UI primitives)
- **Lucide React**: (Icons)
- **Framer Motion**: (Animations)
- **Class Variance Authority**: (Component variants)

### Backend & Services
- **Convex**: (Database & backend)
- **Cloudflare Pages**: (Hosting)
- **Azure Blob Storage**: (Video hosting)
- **Stripe**: (Payments)

## Development Environment Setup

### Prerequisites
```bash
# Install Node.js (if not using Bun)
node --version  # v18+ recommended

# Install Bun (recommended)
curl -fsSL https://bun.sh/install | bash

# Install Git
git --version
```

### Project Setup
```bash
# Clone repository
git clone <repository-url>
cd tekimax-client-portal

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration
```

### Environment Variables
```env
# Database
NEXT_PUBLIC_CONVEX_URL=your_convex_url

# Authentication
NEXT_PUBLIC_KINDE_CLIENT_ID=your_kinde_client_id
NEXT_PUBLIC_KINDE_CLIENT_SECRET=your_kinde_client_secret
NEXT_PUBLIC_KINDE_ISSUER_URL=your_kinde_issuer_url

# Payments
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Email
RESEND_API_KEY=your_resend_api_key

# Cloudflare
CLOUDFLARE_API_TOKEN=your_cloudflare_token
```

## Development Commands

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "prebuild": "node scripts/generate-sitemap.js",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "lint:fix-unused": "node scripts/fix-unused.js",
    "lint:fix-all": "node scripts/fix-unused.js && next lint --fix",
    "pages:build": "node scripts/generate-sitemap.js && bun next-on-pages",
    "preview": "bun pages:build && wrangler pages dev",
    "deploy": "bun pages:build && wrangler pages deploy",
    "safe-deploy": "bun lint:fix-all && bun pages:build && wrangler pages deploy",
    "cf-typegen": "wrangler types --env-interface CloudflareEnv env.d.ts",
    "analyze": "ANALYZE=true next build",
    "generate-sitemap": "node scripts/generate-sitemap.js",
    "convex:dev": "convex dev --typecheck=disable",
    "convex:deploy": "convex deploy",
    "setup:convex": "node scripts/setup-convex-env.js",
    "fix-generated": "node scripts/fix-generated-files.mjs",
    "postconvex:dev": "npm run fix-generated",
    "postinstall": "node scripts/fix-types.js"
  }
}
```

### Development Workflow
```bash
# Start development server
bun run dev

# Build for production
bun run build

# Lint and fix issues
bun run lint:fix-all

# Deploy to Cloudflare Pages
bun run deploy

# Safe deploy (lint + build + deploy)
bun run safe-deploy
```

## Build Configuration

### Next.js Configuration
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
  images: {
    domains: [
      'images.unsplash.com',
      'images.crunchbase.com',
      'tekimaxvideos.blob.core.windows.net'
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
};

module.exports = nextConfig;
```

### Tailwind Configuration
```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
```

### Cloudflare Pages Configuration
```toml
# wrangler.toml
name = "tekimax-website"
compatibility_date = "2024-11-12"
compatibility_flags = ["nodejs_compat"]
pages_build_output_dir = ".vercel/output/static"

[[kv_namespaces]]
binding = "FORM_SUBMISSIONS"
id = "5cd8631d9bea4402ab48b60f043f39a4"
```

## Deployment Process

### Cloudflare Pages Deployment
```bash
# Build for Cloudflare Pages
bun run pages:build

# Deploy to Cloudflare Pages
wrangler pages deploy

# Or use the combined command
bun run deploy
```

### Deployment Steps
1. **Pre-build**: Generate sitemap
2. **Build**: Next.js build with Cloudflare Pages adapter
3. **Deploy**: Upload to Cloudflare Pages
4. **Verify**: Check deployment status

### Build Output
```
.vercel/output/
├── static/
│   ├── _worker.js/
│   ├── _routes.json
│   ├── _headers
│   └── (static assets)
└── functions/
    └── (serverless functions)
```

## Performance Optimization

### Image Optimization
```tsx
// Next.js Image component with optimization
import Image from "next/image";

<Image
  src="/hero-image.jpg"
  alt="Hero Image"
  width={1920}
  height={1080}
  priority
  className="object-cover"
  sizes="100vw"
/>
```

### Code Splitting
```tsx
// Dynamic imports for code splitting
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('./Component'), {
  loading: () => <div>Loading...</div>,
  ssr: false
});
```

### Bundle Analysis
```bash
# Analyze bundle size
ANALYZE=true bun run build
```

## Content Protection

### Anti-Copy Implementation
```css
/* Disable text selection */
* {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Disable drag and drop */
* {
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
}

/* Disable right-click */
* {
  -webkit-context-menu: none;
  -moz-context-menu: none;
  -ms-context-menu: none;
  -o-context-menu: none;
  context-menu: none;
}
```

## Database Setup

### Convex Configuration
```typescript
// convex/convex.json
{
  "project": {
    "name": "tekimax-website"
  },
  "team": {
    "name": "Tekimax",
    "slug": "tekimax"
  },
  "providers": {
    "convex": {
      "url": "https://your-project.convex.cloud"
    }
  }
}
```

### Convex Functions
```typescript
// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    createdAt: v.number(),
  }),
  // Add more tables as needed
});
```

## Monitoring & Analytics

### Performance Monitoring
```typescript
// lib/analytics.ts
export const trackEvent = (event: string, properties?: Record<string, any>) => {
  // Implement analytics tracking
  console.log('Event:', event, properties);
};
```

### Error Tracking
```typescript
// lib/error-tracking.ts
export const captureError = (error: Error, context?: Record<string, any>) => {
  // Implement error tracking
  console.error('Error:', error, context);
};
```

## Security Considerations

### Environment Variables
- Never commit sensitive keys to version control
- Use different keys for development and production
- Rotate keys regularly

### Content Security Policy
```html
<!-- Add to _document.tsx or meta tags -->
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self';
  connect-src 'self' https:;
">
```

### HTTPS Enforcement
```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Force HTTPS in production
  if (process.env.NODE_ENV === 'production') {
    const url = request.nextUrl.clone();
    if (url.protocol === 'http:') {
      url.protocol = 'https:';
      return NextResponse.redirect(url);
    }
  }
  
  return NextResponse.next();
}
```

## Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
rm -rf .vercel
bun run build
```

#### Deployment Issues
```bash
# Check Cloudflare Pages status
wrangler pages project list

# View deployment logs
wrangler pages deployment tail
```

#### Performance Issues
```bash
# Analyze bundle
bun run analyze

# Check Core Web Vitals
# Use Lighthouse or PageSpeed Insights
```

### Debug Commands
```bash
# Check TypeScript errors
bun run build --no-lint

# Check ESLint issues
bun run lint

# Check unused imports
bun run lint:fix-unused

# Generate types
bun run cf-typegen
```

## Development Best Practices

### Code Organization
```
src/
├── app/                 # Next.js app router
├── components/          # Reusable components
│   ├── ui/             # Base UI components
│   └── (feature)/      # Feature-specific components
├── lib/                # Utility functions
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
└── styles/             # Global styles
```

### Component Structure
```tsx
// components/feature/ComponentName.tsx
"use client";

import { useState } from "react";
import { ComponentProps } from "./types";

interface ComponentNameProps {
  // Props interface
}

export function ComponentName({ ...props }: ComponentNameProps) {
  // Component implementation
}
```

### Testing Strategy
```typescript
// __tests__/ComponentName.test.tsx
import { render, screen } from '@testing-library/react';
import { ComponentName } from '../ComponentName';

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

This technical setup guide provides everything needed to understand, develop, and deploy the Tekimax website while maintaining best practices for performance, security, and maintainability. 