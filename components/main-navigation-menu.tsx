"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart2,
  MessageSquare,
  Users,
  Shield,
  ShoppingBag,
  Smartphone,
  Brain,
  Zap,
} from "lucide-react";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-xl p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export function MainNavigationMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Platform</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] md:grid-cols-2">
              <ListItem 
                href="#" 
                title="AI-Powered Support"
                onClick={(e) => { e.preventDefault(); scrollToSection('ai-support'); }}
              >
                Our comprehensive AI platform with reading tutor, Pomodoro timer, and cognitive load management.
              </ListItem>
              <ListItem 
                href="#" 
                title="Research-Backed Methods"
                onClick={(e) => { e.preventDefault(); scrollToSection('research-methods'); }}
              >
                Evidence-based approaches including Orton-Gillingham and proven cognitive strategies.
              </ListItem>
              <ListItem 
                href="#" 
                title="Cognitive Strengths"
                onClick={(e) => { e.preventDefault(); scrollToSection('cognitive-strengths'); }}
              >
                Discover the unique cognitive patterns and strengths of neurodivergent minds.
              </ListItem>
              <ListItem 
                href="#" 
                title="Coming Soon"
                onClick={(e) => { e.preventDefault(); scrollToSection('coming-soon'); }}
              >
                Mobile app, smartwatch integration, and smart peripherals launching soon.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/blog" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Blog & News
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/contact" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Contact
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
