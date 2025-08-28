# Tekimax Component Reference Guide

This document provides exact code patterns and styling for key components used throughout the Tekimax website.

## Hero Section

### Split Hero Component
```tsx
"use client";

import { Shield, Zap } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function SplitHero() {
  const [videoError, setVideoError] = useState(false);

  return (
    <section className="relative h-[96vh] overflow-hidden">
      {/* Logo Stamp Background */}
      <div className="absolute top-10 right-10 z-5 opacity-10">
        <Image
          src="/tekimax-logomark-white.png"
          alt=""
          width={200}
          height={200}
          className="object-contain"
        />
      </div>
      
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {/* Fallback image */}
        <Image
          src="https://images.unsplash.com/photo-1625014053925-88bef4805a76?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Neurodivergent STEAM education visualization"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* Video overlay */}
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
      </div>

      {/* Content container */}
      <div className="max-w-[1536px] mx-auto px-4 h-full relative z-20">
        <div className="flex flex-col h-full justify-end md:justify-center items-start pb-8 md:pt-16 text-left max-w-sm md:max-w-2xl md:ml-0">
          {/* Main heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-4 text-white text-left leading-tight animate-in fade-in slide-in-from-left duration-1000 delay-300">
            Self-Adaptive<br />AI Platforms
          </h1>

          {/* Key benefits */}
          <div className="flex flex-col sm:flex-row gap-2 mb-4 animate-in fade-in slide-in-from-left duration-1000 delay-500">
            <div className="flex items-center gap-2 text-sm text-white font-medium transition-all duration-300 hover:scale-105">
              <Zap className="h-4 w-4 text-white transition-transform duration-300 hover:rotate-12" />
              <span>Neurodivergent</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white font-medium transition-all duration-300 hover:scale-105">
              <Shield className="h-4 w-4 text-white transition-transform duration-300 hover:rotate-12" />
              <span>Human-Centered AI</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-in fade-in slide-in-from-left duration-1000 delay-700">
            <div className="flex flex-col">
              <a
                href="/onboarding"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 hover:scale-105 hover:shadow-lg transition-all duration-300 rounded-xl transform"
                style={{ backgroundColor: '#2563EB' }}
              >
                Secure your account
              </a>
              <p className="text-xs italic text-white/70 mt-2 transition-opacity duration-300 hover:text-white/90">
                Beta only allows a limited pool of users
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

## Navigation Components

### Main Navigation
```tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function MainNavigation() {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-zinc-200 sticky top-0 z-50">
      <div className="container px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/tekimax-logo.png"
              alt="Tekimax"
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/ai-literacy" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-300">
              AI Literacy
            </Link>
            <Link href="/defense" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-300">
              Defense
            </Link>
            <Link href="/contact" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-300">
              Contact
            </Link>
            <Button asChild>
              <Link href="/onboarding">Get Started</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden">
            <span className="sr-only">Open menu</span>
            {/* Menu icon */}
          </button>
        </div>
      </div>
    </nav>
  );
}
```

## Card Components

### Feature Card
```tsx
interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
}

export function FeatureCard({ title, description, icon, gradient }: FeatureCardProps) {
  return (
    <div className="text-center group cursor-pointer">
      <div className={`w-16 h-16 mx-auto mb-3 bg-gradient-to-br ${gradient} rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}>
        <span className="text-white font-bold text-xl transition-transform duration-300 group-hover:scale-110">
          {icon}
        </span>
      </div>
      <h4 className="font-medium text-zinc-800 mb-1 transition-colors duration-300 group-hover:text-zinc-900">
        {title}
      </h4>
      <p className="text-xs text-zinc-500 transition-colors duration-300 group-hover:text-zinc-600">
        {description}
      </p>
    </div>
  );
}
```

### Interactive Card
```tsx
interface InteractiveCardProps {
  title: string;
  description: string;
  href: string;
  image?: string;
}

export function InteractiveCard({ title, description, href, image }: InteractiveCardProps) {
  return (
    <Link href={href} className="block">
      <div className="bg-white border border-zinc-200 rounded-lg p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 group">
        {image && (
          <div className="mb-4">
            <img
              src={image}
              alt={title}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        )}
        <h3 className="text-lg font-medium text-zinc-800 mb-2 group-hover:text-zinc-900 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-zinc-600 group-hover:text-zinc-700 transition-colors duration-300">
          {description}
        </p>
      </div>
    </Link>
  );
}
```

## Button Components

### Primary Button
```tsx
import { Button } from "@/components/ui/button";

export function PrimaryButton({ children, href, ...props }) {
  return (
    <Button
      className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-opacity-90 hover:scale-105 transition-all duration-300"
      asChild={!!href}
      {...props}
    >
      {href ? <Link href={href}>{children}</Link> : children}
    </Button>
  );
}
```

### Secondary Button
```tsx
export function SecondaryButton({ children, href, ...props }) {
  return (
    <Button
      variant="outline"
      className="border border-zinc-200 bg-white text-zinc-900 px-4 py-2 rounded-xl hover:bg-zinc-50 transition-all duration-300"
      asChild={!!href}
      {...props}
    >
      {href ? <Link href={href}>{children}</Link> : children}
    </Button>
  );
}
```

## Footer Components

### Main Footer
```tsx
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-zinc-50 py-16 border-t border-zinc-200">
      <div className="container px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Navigation sections */}
          <div>
            <h3 className="font-medium mb-4">Products</h3>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li>
                <Link href="#" className="hover:text-black">
                  Customer Discovery
                </Link>
              </li>
              {/* More links */}
            </ul>
          </div>
          {/* More sections */}
        </div>

        {/* TechFW Partnership Section */}
        <div className="mt-12 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-6 bg-gradient-to-r from-zinc-50 to-zinc-100 rounded-lg border border-zinc-200 hover-lift transition-smooth group cursor-pointer">
            <div className="flex-shrink-0">
              <img
                src="https://images.crunchbase.com/image/upload/c_pad,f_auto,q_auto:eco,dpr_1/eumxmnokxdkarurcka6g"
                alt="TechFW Logo"
                className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-lg font-medium text-zinc-800 mb-1 transition-colors duration-300 group-hover:text-zinc-900">
                TechFW Partnership
              </h3>
              <p className="text-sm text-zinc-600 mb-2 transition-colors duration-300 group-hover:text-zinc-700">
                Proud member of the Technology Foundry Workforce initiative
              </p>
              <p className="text-xs text-zinc-500 transition-colors duration-300 group-hover:text-zinc-600">
                Building tomorrow's workforce through innovative technology solutions
              </p>
            </div>
          </div>
        </div>

        {/* SmartStar Section */}
        <div className="mt-8 mb-8">
          <div className="text-center mb-6">
            <h3 className="text-lg font-medium text-zinc-800 mb-2">SmartStar</h3>
            <p className="text-sm text-zinc-600">Pioneering intelligent business solutions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature cards */}
          </div>
        </div>

        <Separator className="my-8" />

        {/* Footer links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-zinc-500 text-center md:text-left max-w-xl">
            <p className="mb-1">
              © {new Date().getFullYear()} Tekimax, Inc. All rights reserved.
            </p>
            <p>
              All trademarks, logos and brand names are the property of their respective owners.
            </p>
          </div>
          <div className="flex gap-6 text-sm text-zinc-500">
            <Link href="/privacy" className="hover:text-black transition-colors duration-300 hover:scale-105 transform">
              Privacy Policy
            </Link>
            {/* More links */}
          </div>
        </div>
      </div>
    </footer>
  );
}
```

## Form Components

### Contact Form
```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Form submission logic
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-zinc-700 mb-2">
            Name
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-2">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-zinc-700 mb-2">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          rows={6}
          required
          className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-opacity-90 transition-all duration-300"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
```

## Layout Components

### Container Layout
```tsx
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`max-w-[1536px] mx-auto px-4 ${className}`}>
      {children}
    </div>
  );
}
```

### Section Layout
```tsx
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: "white" | "zinc-50";
}

export function Section({ children, className = "", background = "white" }: SectionProps) {
  const bgClass = background === "zinc-50" ? "bg-zinc-50" : "bg-white";
  
  return (
    <section className={`py-16 ${bgClass} ${className}`}>
      <Container>
        {children}
      </Container>
    </section>
  );
}
```

## Animation Components

### Fade In Animation
```tsx
"use client";

import { useEffect, useState } from "react";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}

export function FadeIn({ children, delay = 0, duration = 1000 }: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-all duration-${duration} ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {children}
    </div>
  );
}
```

### Hover Lift Effect
```tsx
interface HoverLiftProps {
  children: React.ReactNode;
  className?: string;
}

export function HoverLift({ children, className = "" }: HoverLiftProps) {
  return (
    <div className={`hover-lift transition-smooth ${className}`}>
      {children}
    </div>
  );
}
```

## Utility Classes Reference

### Spacing
```css
/* Padding */
p-2: 8px
p-4: 16px
p-6: 24px
p-8: 32px
py-16: 64px (top/bottom)
px-4: 16px (left/right)

/* Margin */
m-2: 8px
m-4: 16px
m-8: 32px
my-8: 32px (top/bottom)
mx-auto: auto (left/right)

/* Gap */
gap-2: 8px
gap-4: 16px
gap-6: 24px
gap-8: 32px
```

### Typography
```css
/* Font sizes */
text-xs: 12px
text-sm: 14px
text-base: 16px
text-lg: 18px
text-xl: 20px
text-2xl: 24px
text-3xl: 30px
text-4xl: 36px
text-5xl: 48px
text-6xl: 60px
text-7xl: 72px

/* Font weights */
font-normal: 400
font-medium: 500
font-semibold: 600
font-bold: 700
font-black: 900

/* Text colors */
text-white: #ffffff
text-black: #000000
text-zinc-500: #71717a
text-zinc-600: #52525b
text-zinc-700: #3f3f46
text-zinc-800: #27272a
text-zinc-900: #18181b
```

### Backgrounds
```css
/* Solid backgrounds */
bg-white: #ffffff
bg-black: #000000
bg-zinc-50: #fafafa
bg-zinc-100: #f4f4f5
bg-zinc-200: #e4e4e7

/* Gradient backgrounds */
bg-gradient-to-r: linear-gradient(to right, ...)
bg-gradient-to-br: linear-gradient(to bottom right, ...)
from-zinc-50: starting color
to-zinc-100: ending color
```

### Borders
```css
/* Border styles */
border: 1px solid
border-zinc-200: #e4e4e7
border-zinc-300: #d4d4d8

/* Border radius */
rounded-lg: 8px
rounded-xl: 12px
rounded-full: 50%
```

### Shadows
```css
/* Shadow utilities */
shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1)
```

This component reference provides the exact patterns and styling used throughout the Tekimax website, ensuring consistency when recreating the design. 