"use client";

import { useState, useEffect } from "react";
import { Database, Trash2, X, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface CacheStatus {
  localStorage: boolean;
  sessionStorage: boolean;
  cacheAPI: boolean;
  serviceWorker: boolean;
  cookies: boolean;
}

export function CacheStatusBanner() {
  const [cacheStatus, setCacheStatus] = useState<CacheStatus>({
    localStorage: false,
    sessionStorage: false,
    cacheAPI: false,
    serviceWorker: false,
    cookies: false,
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Check for cached data
  const checkCacheStatus = async () => {
    if (typeof window === 'undefined') return;

    const status: CacheStatus = {
      localStorage: false,
      sessionStorage: false,
      cacheAPI: false,
      serviceWorker: false,
      cookies: false,
    };

    try {
      // Check localStorage - only count if it has meaningful data
      status.localStorage = localStorage.length > 0;

      // Check sessionStorage - only count if it has meaningful data
      status.sessionStorage = sessionStorage.length > 0;

      // Check cookies - only count if there are actual cookies (not just empty string)
      status.cookies = document.cookie.trim().length > 0;

      // Check Cache API
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        status.cacheAPI = cacheNames.length > 0;
      }

      // Check Service Workers
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        status.serviceWorker = registrations.length > 0;
      }

      setCacheStatus(status);
      
      // Only show banner if ANY cache type is detected
      const hasCachedData = Object.values(status).some(Boolean);
      setIsVisible(hasCachedData);
      
      // Debug logging (remove in production)
      if (hasCachedData) {
        console.log('Cache Status:', status);
      }
    } catch (error) {
      console.error('Error checking cache status:', error);
      // On error, don't show banner
      setIsVisible(false);
    }
  };

  // Clear all caches
  const clearAllCaches = async () => {
    if (typeof window === 'undefined') return;
    
    setIsClearing(true);
    
    try {
      // Clear localStorage
      localStorage.clear();

      // Clear sessionStorage
      sessionStorage.clear();

      // Clear cookies
      document.cookie.split(";").forEach((c) => {
        const eqPos = c.indexOf("=");
        const name = eqPos > -1 ? c.substr(0, eqPos).trim() : c.trim();
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      });

      // Clear Cache API
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
      }

      // Unregister Service Workers
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(registrations.map(registration => registration.unregister()));
      }

      // Refresh cache status
      await checkCacheStatus();
      
      // Show success message briefly
      setTimeout(() => {
        setIsVisible(false);
      }, 2000);

    } catch (error) {
      console.error('Error clearing caches:', error);
    } finally {
      setIsClearing(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    
    // Initial check
    checkCacheStatus();
    
    // Set up recurring checks every 10 seconds
    const intervalId = setInterval(checkCacheStatus, 10000);
    
    // Check when focus returns to page
    const handleFocus = () => checkCacheStatus();
    window.addEventListener('focus', handleFocus);
    
    // Cleanup
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  // Don't render anything on server
  if (!mounted) return null;

  const cacheCount = Object.values(cacheStatus).filter(Boolean).length;
  const hasCachedData = cacheCount > 0;

  // ONLY show banner if we have cached data AND banner is visible
  if (!isVisible || !hasCachedData) return null;

  return (
    <Alert
      variant="default"
      className="fixed top-0 left-0 right-0 z-[99] flex items-center justify-between bg-blue-50 text-blue-900 border-blue-300 px-4 py-2 shadow-md animate-slideDown"
    >
      <div className="flex items-center">
        <Database className="h-4 w-4 mr-2 text-blue-600" />
        <AlertDescription className="text-sm font-medium">
          {hasCachedData ? (
            <>
              Website cached ({cacheCount} type{cacheCount !== 1 ? 's' : ''} detected)
              {cacheStatus.localStorage && " • Local Storage"}
              {cacheStatus.sessionStorage && " • Session"}
              {cacheStatus.cacheAPI && " • Cache API"}
              {cacheStatus.serviceWorker && " • Service Worker"}
              {cacheStatus.cookies && " • Cookies"}
            </>
          ) : (
            "No cached data detected"
          )}
        </AlertDescription>
      </div>
      
      <div className="flex items-center gap-2">
        {hasCachedData && (
          <Button
            variant="outline"
            size="sm"
            className="h-7 px-3 text-xs bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200 hover:text-blue-900"
            onClick={clearAllCaches}
            disabled={isClearing}
          >
            {isClearing ? (
              <>
                <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                Clearing...
              </>
            ) : (
              <>
                <Trash2 className="h-3 w-3 mr-1" />
                Clear All
              </>
            )}
          </Button>
        )}
        
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 p-0 text-blue-800 hover:bg-blue-200 hover:text-blue-900"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Dismiss</span>
        </Button>
      </div>
    </Alert>
  );
}