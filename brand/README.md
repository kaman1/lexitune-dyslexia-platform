# Tekimax Brand Design System

## Overview
This document provides comprehensive design guidelines for recreating the Tekimax website style. It covers colors, typography, spacing, components, and visual patterns used throughout the application.

## Brand Identity

### Company Information
- **Company**: 2ENOVATE LLC DBA: TEKIMAX
- **Address**: 1120 South Fwy, Fort Worth, TX 76104
- **Phone**: (682) 593-2763
- **Email**: info@TEKIMAX.com
- **Partnerships**: TechFW Membership, SmartStart

### Brand Positioning
- **Primary Focus**: Self-Adaptive AI Platforms
- **Target Audience**: Neurodivergent individuals and organizations
- **Value Proposition**: Human-Centered AI solutions for neurodivergent needs
- **Key Differentiators**: 
  - Neurodivergent-focused technology
  - Human-centered AI approach
  - Government contracting capabilities
  - Open source contributions

## Color Palette

### Primary Colors
```css
/* Light Mode */
--background: 0 0% 100%;          /* Pure white */
--foreground: 222.2 84% 4.9%;     /* Near black */
--primary: 0 0% 0%;               /* Pure black */
--primary-foreground: 210 40% 98%; /* Off white */

/* Dark Mode */
--background: 222.2 84% 4.9%;     /* Dark gray */
--foreground: 210 40% 98%;        /* Off white */
--primary: 0 0% 100%;             /* Pure white */
--primary-foreground: 222.2 47.4% 11.2%; /* Dark gray */
```

### Secondary Colors
```css
--secondary: 210 40% 96.1%;        /* Light gray */
--secondary-foreground: 222.2 47.4% 11.2%;
--muted: 210 40% 96.1%;           /* Light gray */
--muted-foreground: 215.4 16.3% 46.9%;
--accent: 210 40% 96.1%;          /* Light gray */
--accent-foreground: 222.2 47.4% 11.2%;
```

### Special Colors
```css
/* Blue accent for CTAs */
--blue-primary: #2563EB;

/* Zinc colors for subtle elements */
--zinc-50: #fafafa;
--zinc-100: #f4f4f5;
--zinc-200: #e4e4e7;
--zinc-400: #a1a1aa;
--zinc-500: #71717a;
--zinc-600: #52525b;
--zinc-800: #27272a;
--zinc-900: #18181b;
```

## Typography

### Font Stack
```css
/* Primary font family */
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;

/* Monospace for code */
font-family: "SF Mono", Monaco, Inconsolata, "Roboto Mono", "Source Code Pro", Menlo, Consolas, "DejaVu Sans Mono", monospace;
```

### Font Sizes & Weights
```css
/* Headings */
h1: text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter
h2: text-3xl md:text-4xl font-bold
h3: text-xl md:text-2xl font-semibold
h4: text-lg font-medium

/* Body text */
p: text-base font-normal
small: text-sm font-normal
xs: text-xs font-normal

/* Special text */
hero-title: text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter
section-title: text-2xl md:text-3xl font-bold
card-title: text-lg font-medium
```

### Line Heights & Spacing
```css
/* Line heights */
leading-tight: line-height: 1.25
leading-normal: line-height: 1.5
leading-relaxed: line-height: 1.625

/* Letter spacing */
tracking-tighter: letter-spacing: -0.05em
tracking-tight: letter-spacing: -0.025em
tracking-normal: letter-spacing: 0em
```

## Spacing System

### Container & Layout
```css
/* Main container */
container: max-width: 1536px, margin: 0 auto, padding: 0 1rem

/* Section spacing */
section-padding: py-16 (64px top/bottom)
section-margin: my-8 (32px top/bottom)

/* Component spacing */
gap-2: 8px
gap-4: 16px
gap-6: 24px
gap-8: 32px
gap-12: 48px
```

### Responsive Breakpoints
```css
/* Mobile first approach */
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

## Component Design Patterns

### Buttons
```css
/* Primary button */
bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-opacity-90 hover:scale-105 transition-all duration-300

/* Secondary button */
border border-zinc-200 bg-white text-zinc-900 px-4 py-2 rounded-xl hover:bg-zinc-50 transition-all duration-300

/* Ghost button */
text-zinc-600 hover:text-zinc-900 transition-colors duration-300
```

### Cards
```css
/* Standard card */
bg-white border border-zinc-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300

/* Feature card */
bg-gradient-to-br from-zinc-50 to-zinc-100 border border-zinc-200 rounded-lg p-6 hover-lift

/* Interactive card */
bg-white border border-zinc-200 rounded-lg p-6 hover:shadow-lg hover:scale-105 transition-all duration-300
```

### Navigation
```css
/* Main navigation */
bg-white/80 backdrop-blur-md border-b border-zinc-200 sticky top-0 z-50

/* Navigation links */
text-zinc-600 hover:text-zinc-900 transition-colors duration-300

/* Mobile menu */
bg-white border-t border-zinc-200 fixed bottom-0 left-0 right-0 z-50
```

## Visual Effects & Animations

### Hover Effects
```css
/* Lift effect */
hover-lift: transform: translateY(-8px), box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1)

/* Scale effect */
hover:scale-105: transform: scale(1.05)

/* Glow effect */
hover-glow: box-shadow: 0 0 20px rgba(37, 99, 235, 0.3)
```

### Transitions
```css
/* Smooth transitions */
transition-smooth: transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
transition-smooth-slow: transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1)

/* Standard transitions */
transition-all duration-300: transition: all 0.3s ease
```

### Animations
```css
/* Fade in */
animate-in fade-in: opacity: 0 → 1

/* Slide in from left */
slide-in-from-left: transform: translateX(-100%) → translateX(0)

/* Slow pulse */
animate-slow-pulse: opacity: 0.5 → 0.8 → 0.5 (8s cycle)
```

## Layout Patterns

### Hero Sections
```css
/* Full height hero */
h-[96vh] relative overflow-hidden

/* Content positioning */
flex flex-col h-full justify-end md:justify-center items-start pb-8 md:pt-16

/* Background video/image */
absolute inset-0 z-0 object-cover
```

### Grid Layouts
```css
/* Responsive grid */
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8

/* Feature grid */
grid grid-cols-1 md:grid-cols-3 gap-8

/* Footer grid */
grid grid-cols-2 md:grid-cols-4 gap-8
```

### Content Sections
```css
/* Standard section */
py-16 container px-4

/* Alternating sections */
even:bg-zinc-50 odd:bg-white

/* Centered content */
text-center max-w-2xl mx-auto
```

## Content Protection Features

### Anti-Copy Measures
```css
/* Disable text selection */
-webkit-user-select: none;
user-select: none;

/* Disable drag and drop */
-webkit-user-drag: none;
user-drag: none;

/* Disable right-click */
-webkit-context-menu: none;
context-menu: none;

/* Disable image drag */
img { pointer-events: none; }
```

## Iconography

### Lucide React Icons
```jsx
import { Shield, Zap, ArrowRight, Check, Star } from "lucide-react";

// Usage patterns
<Shield className="h-4 w-4 text-white" />
<Zap className="h-4 w-4 text-blue-600" />
```

### Icon Sizes
```css
h-4 w-4: 16px (small)
h-5 w-5: 20px (medium)
h-6 w-6: 24px (large)
h-8 w-8: 32px (x-large)
```

## Media Assets

### Logo Files
- `/tekimax-logo.png` - Primary logo
- `/tekimax-logo-white.png` - White version
- `/tekimax-logomark-black.png` - Logo mark
- `/tekimax-logomark-white.png` - White logo mark

### Partner Logos
- TechFW: `https://images.crunchbase.com/image/upload/c_pad,f_auto,q_auto:eco,dpr_1/eumxmnokxdkarurcka6g`
- 4+1 Badge: `/4+1-badge-li-tw.jpg`

### Background Images
- Hero background: `https://images.unsplash.com/photo-1625014053925-88bef4805a76?q=80&w=1528&auto=format&fit=crop`
- City background: `/city-bg.jpg`
- Digital background: `/city-digital.jpg`

## Video Assets

### Hero Video
- URL: `https://tekimaxvideos.blob.core.windows.net/videos/final-3.mp4`
- Format: MP4
- Autoplay, muted, loop
- Fallback to background image

## Accessibility

### Color Contrast
- Primary text: High contrast (black on white)
- Secondary text: Medium contrast (zinc-600 on white)
- Links: Blue (#2563EB) with hover states

### Focus States
```css
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
```

### Screen Reader Support
- Semantic HTML structure
- Proper alt text for images
- ARIA labels where needed

## Responsive Design Principles

### Mobile First
- Start with mobile layout
- Progressive enhancement for larger screens
- Touch-friendly interface elements

### Breakpoint Strategy
```css
/* Mobile: < 640px */
/* Tablet: 640px - 1024px */
/* Desktop: > 1024px */
```

## Performance Considerations

### Image Optimization
- Next.js Image component with priority loading
- WebP format where possible
- Responsive image sizing

### Animation Performance
- Use transform and opacity for animations
- Avoid layout-triggering properties
- Hardware acceleration with will-change

## Implementation Notes

### Framework
- Next.js 15.2.4
- React 19
- TypeScript
- Tailwind CSS

### Key Dependencies
- @radix-ui/react-* (UI primitives)
- lucide-react (icons)
- framer-motion (animations)
- class-variance-authority (component variants)

### Build System
- Vite for development
- Cloudflare Pages for deployment
- Wrangler for deployment management

This design system ensures consistency across all components and pages while maintaining the professional, modern aesthetic that represents Tekimax's brand identity. 