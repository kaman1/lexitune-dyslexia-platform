// Cloudflare Pages Function for KV form submission
// This will work when deployed to Cloudflare Pages

interface CloudflareEnv {
  FORM_SUBMISSIONS: KVNamespace;
}

export async function onRequestPost(context: {
  request: Request;
  env: CloudflareEnv;
}) {
  try {
    const { request, env } = context;
    const body = await request.json() as any;
    
    // Handle both contact form and onboarding form data structures
    const isContactForm = 'inquiryType' in body && 'message' in body;
    const isOnboardingForm = 'role' in body && 'interests' in body;
    
    let submissionData;
    let submissionId;
    let validationError = null;

    if (isContactForm) {
      const { name, email, company, inquiryType, message } = body;
      
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
      const { name, email, role, organization, neurodivergentType, interests, goals, experience } = body;
      
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
      return new Response(
        JSON.stringify({ error: "Invalid form data structure" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (validationError) {
      return new Response(
        JSON.stringify({ error: validationError }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Store in Cloudflare KV
    try {
      await env.FORM_SUBMISSIONS.put(submissionId, JSON.stringify(submissionData));
      console.log("Form submission stored in KV:", submissionData);
    } catch (kvError) {
      console.error("Error storing in KV:", kvError);
      return new Response(
        JSON.stringify({ error: "Failed to store submission" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ 
        message: "Form submitted successfully to KV store",
        submissionId: submissionId
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing form submission:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}