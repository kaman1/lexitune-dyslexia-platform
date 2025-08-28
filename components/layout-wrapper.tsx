"use client";

import type { ReactNode } from "react";
import { TopNavigation } from "@/components/top-navigation";
import { NetworkStatusBanner } from "@/components/network-status-banner";
import { FooterWaitlist } from "@/components/footer-waitlist";

interface LayoutWrapperProps {
  children: ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white overflow-hidden">
      {/* Network Status Banner */}
      <NetworkStatusBanner />

      {/* Top Navigation */}
      <TopNavigation />

      {/* Main Content */}
      <main className="flex-grow overflow-hidden">{children}</main>

      {/* Footer */}
      <FooterWaitlist />
    </div>
  );
}
