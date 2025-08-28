'use server';

import { redirect } from 'next/navigation';
import { stripe } from '../app/api/stripe';
import { cookies } from 'next/headers';
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

// Initialize Convex client for server-side calls
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL || "");

export default async function redirectToBillingPortal(path: string) {
  try {
    // In a real implementation, you would:
    // 1. Get the authenticated user's organization
    // 2. Check if they have permission to manage billing
    
    // For simplicity in this demo version, we'll use a mock organization ID
    // and stripe customer ID from your database
    const mockOrganizationId = "org_123456789";
    const mockStripeCustomerId = "cus_123456789";
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const billingPortalSession = await stripe.billingPortal.sessions.create({
      customer: mockStripeCustomerId,
      return_url: `${baseUrl}/dashboard/${path}`,
    });

    redirect(billingPortalSession?.url);
  } catch (error) {
    console.error('Error redirecting to billing portal:', error);
    // Redirect to dashboard on error
    redirect('/dashboard');
  }
}
