import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

export const runtime = 'edge';

// Simple in-memory storage for development (in production, use a proper database)
const submissions: any[] = [];

// Rate limiting store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting function
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5; // 5 requests per 15 minutes

  const record = rateLimitStore.get(ip);
  
  if (!record) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

// Input validation
function validateFormData(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Required fields
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    errors.push('Name is required and must be at least 2 characters');
  }

  if (!data.email || typeof data.email !== 'string') {
    errors.push('Email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push('Invalid email format');
    }
  }

  if (!data.role || typeof data.role !== 'string') {
    errors.push('Role is required');
  }

  return { isValid: errors.length === 0, errors };
}

// Sanitize input data
function sanitizeData(data: any) {
  return {
    name: data.name?.trim(),
    email: data.email?.trim().toLowerCase(),
    role: data.role?.trim(),
    organization: data.organization?.trim() || undefined,
    neurodivergentType: data.neurodivergentType?.trim() || undefined,
    interests: Array.isArray(data.interests) ? data.interests.filter(i => typeof i === 'string' && i.trim()) : [],
    goals: data.goals?.trim() || undefined,
    experience: data.experience?.trim() || undefined,
    source: 'onboarding' as const,
  };
}

export async function POST(request: NextRequest) {
  try {
    console.log('Simple API: Form submission started');
    
    // Get client IP address
    const headersList = headers();
    const ip = headersList.get('x-forwarded-for') || 
               headersList.get('x-real-ip') || 
               request.ip || 
               'unknown';

    console.log('Simple API: Client IP:', ip);

    // Rate limiting
    if (!checkRateLimit(ip)) {
      console.log('Simple API: Rate limit exceeded for IP:', ip);
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
      console.log('Simple API: Parsed request body successfully');
    } catch (parseError) {
      console.error('Simple API: Failed to parse request body:', parseError);
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    // Validate input
    const { isValid, errors } = validateFormData(body);
    if (!isValid) {
      console.log('Simple API: Validation failed:', errors);
      return NextResponse.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }

    // Sanitize data
    const sanitizedData = sanitizeData(body);

    // Create submission
    const submission = {
      ...sanitizedData,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      submittedAt: new Date().toISOString(),
      status: 'pending',
      ipAddress: ip,
      userAgent: headersList.get('user-agent') || undefined,
    };

    // Save to in-memory storage (for now)
    submissions.push(submission);
    console.log('Simple API: Submission saved successfully:', submission.id);
    console.log('Simple API: Total submissions:', submissions.length);

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully',
      submissionId: submission.id,
    });

  } catch (error) {
    console.error('Simple API: Unexpected error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'Simple API is working',
    submissionsCount: submissions.length,
    timestamp: new Date().toISOString(),
  });
}