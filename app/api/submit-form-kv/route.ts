import { NextResponse } from "next/server";

export const runtime = 'edge';

// TypeScript interface for Cloudflare Pages environment
interface CloudflareEnv {
  FORM_SUBMISSIONS: KVNamespace;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Extract reCAPTCHA token if present (optional for backward compatibility)
    const { recaptchaToken, ...formData } = body;
    
    // Handle both contact form and onboarding form data structures
    const isContactForm = 'inquiryType' in formData && 'message' in formData;
    const isOnboardingForm = 'role' in formData && 'interests' in formData;
    
    let submissionData;
    let submissionId;
    let validationError = null;

    if (isContactForm) {
      const { name, email, company, inquiryType, message } = formData;
      
      // Basic validation for contact form
      if (!name || !email || !inquiryType || !message) {
        validationError = "Missing required fields: name, email, inquiryType, or message";
      }
      
      submissionId = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      submissionData = {
        id: submissionId,
        type: 'contact',
        name,
        email,
        company: company || null,
        inquiryType,
        message,
        submittedAt: new Date().toISOString(),
        ip: request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || 'unknown'
      };
    } else if (isOnboardingForm) {
      const { name, email, role, organization, neurodivergentType, interests, goals, experience } = formData;
      
      // Basic validation for onboarding form
      if (!name || !email || !role) {
        validationError = "Missing required fields: name, email, or role";
      }
      
      submissionId = `onboarding_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      submissionData = {
        id: submissionId,
        type: 'onboarding',
        name,
        email,
        role,
        organization: organization || null,
        neurodivergentType: neurodivergentType || null,
        interests: interests || [],
        goals: goals || null,
        experience: experience || null,
        submittedAt: new Date().toISOString(),
        ip: request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || 'unknown'
      };
    } else {
      return NextResponse.json({ error: "Invalid form data structure" }, { status: 400 });
    }

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    // Store in Cloudflare KV
    try {
      // In Cloudflare Pages, the KV binding is available via the runtime
      // @ts-ignore - Cloudflare runtime types
      const env = process.env.CLOUDFLARE_ENV as unknown as CloudflareEnv;
      
      if (env && env.FORM_SUBMISSIONS) {
        // Production/Cloudflare Pages environment
        await env.FORM_SUBMISSIONS.put(submissionId, JSON.stringify(submissionData));
        console.log("Form submission stored in KV:", submissionData);
      } else {
        // Local development fallback - log the data that would be stored
        console.log("KV not available (local dev), would store:", submissionData);
        
        // Optional: Store in a local file for testing
        // const fs = require('fs');
        // const path = require('path');
        // const localKvFile = path.join(process.cwd(), 'local-kv-data.json');
        // let localData = {};
        // try {
        //   localData = JSON.parse(fs.readFileSync(localKvFile, 'utf8'));
        // } catch (e) { /* file doesn't exist yet */ }
        // localData[submissionId] = submissionData;
        // fs.writeFileSync(localKvFile, JSON.stringify(localData, null, 2));
      }
    } catch (kvError) {
      console.error("Error storing in KV:", kvError);
      // Continue with response even if KV fails
    }

    return NextResponse.json({ 
      message: "Form submitted successfully to KV store",
      submissionId: submissionId
    }, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error("Error processing form submission:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
