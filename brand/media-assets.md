# Tekimax Media Assets Guide

This document provides a complete reference for all media assets, videos, images, and visual elements used throughout the Tekimax website.

## Video Assets

### Hero Video
- **URL**: `https://tekimaxvideos.blob.core.windows.net/videos/final-3.mp4`
- **Format**: MP4
- **Duration**: ~30 seconds (loop)
- **Quality**: High definition
- **Content**: Neurodivergent STEAM education visualization
- **Usage**: Hero section background
- **Fallback**: Static image from Unsplash
- **Autoplay**: Yes (muted, loop, playsInline)

### Video Implementation
```tsx
const [videoError, setVideoError] = useState(false);

{!videoError && (
  <video
    autoPlay
    muted
    loop
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
    onError={() => setVideoError(true)}
  >
    <source
      src="https://tekimaxvideos.blob.core.windows.net/videos/final-3.mp4"
      type="video/mp4"
    />
  </video>
)}
```

## Logo Assets

### Primary Logos
- **Main Logo**: `/tekimax-logo.png`
- **White Logo**: `/tekimax-logo-white.png`
- **Logo Mark (Black)**: `/tekimax-logomark-black.png`
- **Logo Mark (White)**: `/tekimax-logomark-white.png`

### Logo Usage Patterns
```tsx
// Navigation logo
<img
  src="/tekimax-logo.png"
  alt="Tekimax"
  className="h-8 w-auto"
/>

// Hero background stamp
<Image
  src="/tekimax-logomark-white.png"
  alt=""
  width={200}
  height={200}
  className="object-contain opacity-10"
/>

// Footer logo
<img
  src="/tekimax-logo-white.png"
  alt="Tekimax Logo"
  className="h-8 w-auto"
/>
```

## Partner Logos

### TechFW Partnership
- **URL**: `https://images.crunchbase.com/image/upload/c_pad,f_auto,q_auto:eco,dpr_1/eumxmnokxdkarurcka6g`
- **Alt Text**: "TechFW Logo"
- **Usage**: Footer partnership section
- **Styling**: `h-16 w-auto object-contain mr-2 mb-2 mt-2 ml-2 rounded-full`

### 4+1 Formula Badge
- **Path**: `/4+1-badge-li-tw.jpg`
- **Alt Text**: "The Formula 4+1 for Military Spouse Success"
- **Usage**: Footer partner programs section
- **Styling**: `w-24 h-24 rounded-full shadow-lg border-2 border-white`

### Implementation
```tsx
// TechFW Logo
<img
  src="https://images.crunchbase.com/image/upload/c_pad,f_auto,q_auto:eco,dpr_1/eumxmnokxdkarurcka6g"
  alt="TechFW Logo"
  className="h-16 w-auto object-contain mr-2 mb-2 mt-2 ml-2 rounded-full"
/>

// 4+1 Badge
<img
  src="/4+1-badge-li-tw.jpg"
  alt="The Formula 4+1 for Military Spouse Success"
  className="w-24 h-24 rounded-full shadow-lg border-2 border-white"
/>
```

## Background Images

### Hero Background
- **URL**: `https://images.unsplash.com/photo-1625014053925-88bef4805a76?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
- **Description**: Neurodivergent STEAM education visualization
- **Usage**: Hero section fallback
- **Optimization**: Next.js Image component with priority loading

### Additional Backgrounds
- **City Background**: `/city-bg.jpg`
- **Digital Background**: `/city-digital.jpg`
- **Dark Texture**: `/dark-texture-bg.jpg`

### Background Implementation
```tsx
<Image
  src="https://images.unsplash.com/photo-1625014053925-88bef4805a76?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  alt="Neurodivergent STEAM education visualization"
  fill
  priority
  className="object-cover"
  sizes="100vw"
/>
```

## Icon Assets

### Lucide React Icons
```tsx
import { 
  Shield, 
  Zap, 
  ArrowRight, 
  Check, 
  Star,
  Github,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

// Usage patterns
<Shield className="h-4 w-4 text-white" />
<Zap className="h-4 w-4 text-blue-600" />
<ArrowRight className="h-5 w-5 text-zinc-600" />
```

### Icon Sizes
- **Small**: `h-4 w-4` (16px)
- **Medium**: `h-5 w-5` (20px)
- **Large**: `h-6 w-6` (24px)
- **X-Large**: `h-8 w-8` (32px)

### Icon Colors
- **White**: `text-white`
- **Blue**: `text-blue-600`
- **Zinc**: `text-zinc-600`
- **Black**: `text-black`

## Image Optimization

### Next.js Image Component
```tsx
import Image from "next/image";

// Optimized image loading
<Image
  src="/path/to/image.jpg"
  alt="Description"
  width={400}
  height={300}
  className="object-cover rounded-lg"
  priority={true} // For above-the-fold images
/>
```

### Responsive Images
```tsx
<Image
  src="/hero-image.jpg"
  alt="Hero Image"
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

## Animation Assets

### CSS Animations
```css
/* Slow pulse animation */
@keyframes slow-pulse {
  0% { opacity: 0.5; }
  50% { opacity: 0.8; }
  100% { opacity: 0.5; }
}

.animate-slow-pulse {
  animation: slow-pulse 8s ease-in-out infinite;
}

/* Slide animations */
@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slideDown {
  animation: slideDown 0.3s ease-out forwards;
}
```

### Framer Motion Animations
```tsx
import { motion } from "framer-motion";

// Fade in animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>

// Stagger animation
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }}
>
  {items.map((item, index) => (
    <motion.div
      key={index}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      {item}
    </motion.div>
  ))}
</motion.div>
```

## Content Protection

### Anti-Copy Measures
```css
/* Disable text selection */
* {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Disable image drag */
img {
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
  pointer-events: none;
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

## Performance Optimization

### Image Loading Strategy
```tsx
// Priority loading for hero images
<Image
  src="/hero-image.jpg"
  alt="Hero"
  priority
  className="object-cover"
/>

// Lazy loading for below-the-fold images
<Image
  src="/content-image.jpg"
  alt="Content"
  loading="lazy"
  className="object-cover"
/>
```

### Video Optimization
```tsx
// Video with fallback
const [videoError, setVideoError] = useState(false);

{!videoError && (
  <video
    autoPlay
    muted
    loop
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
    onError={() => setVideoError(true)}
  >
    <source
      src="https://tekimaxvideos.blob.core.windows.net/videos/final-3.mp4"
      type="video/mp4"
    />
  </video>
)}
```

## Asset Organization

### File Structure
```
public/
├── images/
│   ├── tekimax-logo.png
│   ├── tekimax-logo-white.png
│   ├── tekimax-logomark-black.png
│   ├── tekimax-logomark-white.png
│   ├── 4+1-badge-li-tw.jpg
│   ├── city-bg.jpg
│   ├── city-digital.jpg
│   └── dark-texture-bg.jpg
├── videos/
│   └── (video files if hosted locally)
└── favicon.ico
```

### External Assets
- **TechFW Logo**: Crunchbase CDN
- **Hero Background**: Unsplash CDN
- **Hero Video**: Azure Blob Storage

## Accessibility

### Alt Text Guidelines
- **Descriptive**: Provide clear descriptions of image content
- **Functional**: Describe the purpose for decorative images
- **Concise**: Keep alt text under 125 characters when possible

### Example Alt Texts
```tsx
// Logo
alt="Tekimax - Self-Adaptive AI Platforms"

// Hero background
alt="Neurodivergent STEAM education visualization"

// Partner logo
alt="TechFW - Technology Foundry Workforce partnership"

// Decorative image
alt="" // Empty for purely decorative images
```

## Color Palette for Media

### Primary Colors
- **Blue**: `#2563EB` (Primary CTA color)
- **White**: `#FFFFFF` (Background)
- **Black**: `#000000` (Text)

### Secondary Colors
- **Zinc-50**: `#FAFAFA` (Light background)
- **Zinc-100**: `#F4F4F5` (Subtle background)
- **Zinc-200**: `#E4E4E7` (Borders)
- **Zinc-500**: `#71717A` (Secondary text)
- **Zinc-600**: `#52525B` (Primary text)

### Gradient Combinations
```css
/* Blue to purple */
bg-gradient-to-br from-blue-500 to-purple-600

/* Purple to pink */
bg-gradient-to-br from-purple-500 to-pink-600

/* Pink to red */
bg-gradient-to-br from-pink-500 to-red-600

/* Zinc gradient */
bg-gradient-to-r from-zinc-50 to-zinc-100
```

This media assets guide ensures consistent implementation of all visual elements across the Tekimax website while maintaining performance and accessibility standards. 