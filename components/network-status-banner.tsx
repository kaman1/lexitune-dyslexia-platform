"use client";

import { useState, useEffect } from "react";
import { Wifi, WifiOff, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define NetworkInformation interface
interface NetworkInformation extends EventTarget {
  downlink: number;
  effectiveType: string;
  rtt: number;
  saveData: boolean;
  metered?: boolean;
  addEventListener(type: string, listener: EventListener): void;
  removeEventListener(type: string, listener: EventListener): void;
}

// Extend Navigator interface
interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformation;
  mozConnection?: NetworkInformation;
  webkitConnection?: NetworkInformation;
}

export function NetworkStatusBanner() {
  const [isSlowConnection, setIsSlowConnection] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Function to check connection speed
    const checkConnectionSpeed = () => {
      // Check if the Network Information API is available
      const nav = navigator as NavigatorWithConnection;
      const connection =
        nav.connection || nav.mozConnection || nav.webkitConnection;

      if (connection) {
        // Use Network Information API
        const isLowSpeed = connection.downlink < 1.5; // Less than 1.5 Mbps
        const isSaveData = connection.saveData;
        const isMetered = connection.metered;
        const isSlowEffectiveType = ["slow-2g", "2g", "3g"].includes(
          connection.effectiveType
        );

        // Mark connection as slow if any of the above conditions are true
        setIsSlowConnection(
          isLowSpeed || isSaveData || Boolean(isMetered) || isSlowEffectiveType
        );
        setIsVisible(
          isLowSpeed || isSaveData || Boolean(isMetered) || isSlowEffectiveType
        );
      } else {
        // Fallback: measure fetch time for a small resource
        const start = Date.now();

        fetch("/tekimax-logo.png", { cache: "no-store" })
          .then((response) => {
            const duration = Date.now() - start;
            const isLongFetchTime = duration > 1000; // More than 1 second is slow
            setIsSlowConnection(isLongFetchTime);
            setIsVisible(isLongFetchTime);
          })
          .catch(() => {
            // Connection error
            setIsSlowConnection(true);
            setIsVisible(true);
          });
      }
    };

    // Initial check
    checkConnectionSpeed();

    // Set up recurring checks
    const intervalId = setInterval(checkConnectionSpeed, 30000); // Check every 30 seconds

    // Set up event listeners for connection change if available
    const nav = navigator as NavigatorWithConnection;
    const connection = nav.connection;
    if (connection) {
      connection.addEventListener("change", checkConnectionSpeed);
    }

    // Set up online/offline event listeners
    window.addEventListener("online", checkConnectionSpeed);
    window.addEventListener("offline", () => {
      setIsSlowConnection(true);
      setIsVisible(true);
    });

    // Cleanup
    return () => {
      clearInterval(intervalId);
      window.removeEventListener("online", checkConnectionSpeed);
      window.removeEventListener("offline", checkConnectionSpeed);

      if (connection) {
        connection.removeEventListener("change", checkConnectionSpeed);
      }
    };
  }, []);

  // Don't render anything on server
  if (!mounted) return null;

  // Don't render if connection is good or banner is dismissed
  if (!isVisible) return null;

  return (
    <Alert
      variant="destructive"
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between bg-amber-100 text-amber-900 border-amber-300 px-4 py-2 shadow-md animate-slideDown"
    >
      <div className="flex items-center">
        {isSlowConnection ? (
          <WifiOff className="h-4 w-4 mr-2 text-amber-600" />
        ) : (
          <Wifi className="h-4 w-4 mr-2 text-amber-600" />
        )}
        <AlertDescription className="text-sm font-medium">
          {isSlowConnection
            ? "Slow network detected. Some content may take longer to load."
            : "Your network connection has improved."}
        </AlertDescription>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 p-0 text-amber-800 hover:bg-amber-200 hover:text-amber-900"
        onClick={() => setIsVisible(false)}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Dismiss</span>
      </Button>
    </Alert>
  );
}
