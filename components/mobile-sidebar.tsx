"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Home, Award, BookOpen, Info, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// Function to determine if a color is light or dark for contrast
const isLightColor = (color: string): boolean => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return brightness > 155;
};

const menuItems = [
  { 
    title: "Home", 
    href: "/", 
    icon: <Home className="h-5 w-5 mr-3" />, 
    borderColor: "#F2C94C",
    description: "Return to homepage"
  },
  {
    title: "Our Mission & Vision",
    href: "/#philosophy",
    icon: <Award className="h-5 w-5 mr-3" />,
    borderColor: "#8B83ED",
    description: "Learn about our mission and future vision"
  },
  {
    title: "Our Solution",
    href: "/#solution",
    icon: <BookOpen className="h-5 w-5 mr-3" />,
    borderColor: "#6DBDEF",
    description: "AI-powered neurodivergent STEAM education"
  },
  { 
    title: "About Tekimax", 
    href: "/#about", 
    icon: <Info className="h-5 w-5 mr-3" />,
    borderColor: "#69C4B4",
    description: "Company values and team information"
  },
  {
    title: "Contact",
    href: "/contact",
    icon: <Mail className="h-5 w-5 mr-3" />,
    borderColor: "#333B68",  
    description: "Get in touch with our team"
  },
];

export function MobileSidebar({ scrolled = false }: { scrolled?: boolean }) {
  // Always default to closed for SSR
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  // Check if menu item is active
  const isActiveItem = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    if (href.startsWith("/#")) {
      return pathname === "/" && (typeof window !== 'undefined' && window.location.hash === href.substring(1));
    }
    return pathname === href;
  };

  // Handle component mounting
  useEffect(() => {
    setMounted(true);
    
    // Reduce loading time for better UX
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  // Handle navigation (closing the sidebar)
  const handleNavigation = () => {
    setOpen(false);
  };

  // Handle menu toggle
  const handleToggle = () => {
    console.log('Mobile menu toggle clicked, current state:', open);
    setOpen(!open);
  };

  return (
    <>
      {/* Menu Button */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Open menu"
        className={`md:hidden pointer-events-auto border-2 border-transparent hover:border-white ${scrolled ? "text-zinc-700 hover:text-zinc-900" : "text-white hover:text-black"}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('Button clicked!', e);
          handleToggle();
        }}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile Menu Overlay */}
      {mounted && open && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
            onClick={() => setOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="fixed right-0 top-0 h-full w-full bg-gradient-to-b from-white to-zinc-50 shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="h-full flex flex-col">
              {/* Header with logo and close button */}
              <div className="flex items-center justify-between p-6 border-b border-blue-200" style={{backgroundColor: '#2563EB'}}>
                <div className="flex items-center">
                  <img
                    src="/images/tekimax-logo-white.png"
                    alt="Tekimax Logo"
                    className="h-8 w-auto"
                  />
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-xl text-white hover:bg-white/20"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Menu content with loading state */}
              <div className="flex-1 overflow-auto py-6">
                <nav className="flex flex-col space-y-2 px-4">
                  {!mounted || loading
                    ? // Loading skeletons with static keys
                      ["home", "mission", "solution", "about", "contact"].map(
                        (item) => (
                          <div
                            key={`skeleton-${item}`}
                            className="px-4 py-6 flex items-start border-l-4 border-zinc-200 bg-white"
                          >
                            <div className="flex-shrink-0">
                              <Skeleton className="h-5 w-5 mr-3 rounded" />
                            </div>
                            <div className="flex-1">
                              <Skeleton className="h-5 w-32 rounded mb-2" />
                              <Skeleton className="h-4 w-24 rounded" />
                            </div>
                          </div>
                        )
                      )
                    : menuItems.map((item) => {
                        const isActive = isActiveItem(item.href);
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={handleNavigation}
                            className={`flex items-start px-4 py-6 transition-all duration-500 ease-in-out hover:shadow-sm group border-l-4 relative overflow-hidden ${
                              isActive 
                                ? 'bg-white shadow-sm' 
                                : 'bg-zinc-50/50'
                            }`}
                            style={{ 
                              borderLeftColor: item.borderColor,
                              backgroundColor: isActive ? item.borderColor : undefined,
                              '--hover-bg': item.borderColor
                            } as React.CSSProperties & { '--hover-bg': string }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = item.borderColor;
                              const textColor = isLightColor(item.borderColor) ? '#000000' : '#FFFFFF';
                              const titleElement = e.currentTarget.querySelector('.menu-title') as HTMLElement;
                              const descElement = e.currentTarget.querySelector('.menu-desc') as HTMLElement;
                              const iconElement = e.currentTarget.querySelector('.menu-icon') as HTMLElement;
                              if (titleElement) titleElement.style.color = textColor;
                              if (descElement) descElement.style.color = textColor;
                              if (iconElement) iconElement.style.color = textColor;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = isActive ? item.borderColor : '';
                              const titleElement = e.currentTarget.querySelector('.menu-title') as HTMLElement;
                              const descElement = e.currentTarget.querySelector('.menu-desc') as HTMLElement;
                              const iconElement = e.currentTarget.querySelector('.menu-icon') as HTMLElement;
                              if (titleElement) titleElement.style.color = '';
                              if (descElement) descElement.style.color = '';
                              if (iconElement) iconElement.style.color = '';
                            }}
                          >
                            <div 
                              className="flex-shrink-0 menu-icon transition-colors duration-500" 
                              style={{ 
                                color: isActive 
                                  ? (isLightColor(item.borderColor) ? '#000000' : '#FFFFFF')
                                  : item.borderColor 
                              }}
                            >
                              {item.icon}
                            </div>
                            <div className="flex-1">
                              <span 
                                className={`font-semibold block menu-title transition-colors duration-500 ${
                                  isActive 
                                    ? (isLightColor(item.borderColor) ? 'text-black' : 'text-white')
                                    : 'text-zinc-800'
                                }`}
                              >
                                {item.title}
                              </span>
                              <span 
                                className={`text-sm mt-1 block menu-desc transition-colors duration-500 ${
                                  isActive 
                                    ? (isLightColor(item.borderColor) ? 'text-black/70' : 'text-white/70')
                                    : 'text-zinc-500'
                                }`}
                              >
                                {item.description}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                </nav>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-zinc-200 bg-zinc-50 transition-all duration-300 ease-in-out">
                <div className="text-center mb-4">
                  <div className="text-sm font-medium" style={{color: '#333B68'}}>
                    Empowering Neurodivergent Students
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">
                    AI-Powered STEAM Education Platform
                  </div>
                </div>
                <div className="text-xs text-zinc-400 text-center">
                  © {new Date().getFullYear()} TEKIMAX. All rights reserved.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}