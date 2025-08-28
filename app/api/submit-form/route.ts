import { NextRequest, NextResponse } from 'next/server';
import { createFormSubmission, FormSubmission } from '@/lib/cosmos-rest';
import { headers } from 'next/headers';

export const runtime = 'edge';

// reCAPTCHA verification function
async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
      console.error('RECAPTCHA_SECRET_KEY not configured');
      return false;
    }

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();
    return data.success && data.score > 0.5; // For reCAPTCHA v3, require score > 0.5
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

// Comprehensive input sanitization (Edge runtime compatible)
function sanitizeInput(input: any): any {
  if (typeof input === 'string') {
    // Remove potential malicious content - Edge runtime compatible
    return input
      // Remove HTML tags
      .replace(/<[^>]*>/gi, '')
      // Remove script content
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      // Remove javascript: and other dangerous protocols
      .replace(/javascript:/gi, '')
      .replace(/vbscript:/gi, '')
      .replace(/data:/gi, '')
      // Remove event handlers
      .replace(/on\w+\s*=/gi, '')
      // Remove SQL injection attempts
      .replace(/(\b(union|select|insert|update|delete|drop|create|alter|exec|execute)\b)/gi, '')
      // Remove XSS attempts
      .replace(/(\b(alert|confirm|prompt|eval|function|setTimeout|setInterval)\b\s*\()/gi, '')
      // Remove dangerous characters
      .replace(/[<>'"&]/g, (match) => {
        const entityMap: { [key: string]: string } = {
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#x27;',
          '&': '&amp;'
        };
        return entityMap[match] || match;
      })
      .trim()
      // Limit length
      .substring(0, 1000);
  }
  
  if (Array.isArray(input)) {
    return input.map(item => sanitizeInput(item)).slice(0, 50); // Limit array size
  }
  
  if (typeof input === 'object' && input !== null) {
    const sanitized: any = {};
    let keyCount = 0;
    for (const [key, value] of Object.entries(input)) {
      if (keyCount >= 50) break; // Limit object size
      // Sanitize both key and value
      const cleanKey = typeof key === 'string' ? key.replace(/[<>'"&]/g, '').substring(0, 100) : key;
      if (cleanKey) {
        sanitized[cleanKey] = sanitizeInput(value);
        keyCount++;
      }
    }
    return sanitized;
  }
  
  return input;
}

// Rate limiting store (in production, use Redis or similar)
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

  if (!data.role || typeof data.role !== 'string' || data.role.trim().length === 0) {
    errors.push('Role is required');
  }

  // Optional fields validation
  if (data.organization && typeof data.organization !== 'string') {
    errors.push('Organization must be a string');
  }

  if (data.neurodivergentType && typeof data.neurodivergentType !== 'string') {
    errors.push('Neurodivergent type must be a string');
  }

  if (data.interests && !Array.isArray(data.interests)) {
    errors.push('Interests must be an array');
  }

  if (data.goals && typeof data.goals !== 'string') {
    errors.push('Goals must be a string');
  }

  if (data.experience && typeof data.experience !== 'string') {
    errors.push('Experience must be a string');
  }

  return { isValid: errors.length === 0, errors };
}

// Sanitize input data
function sanitizeData(data: any): Partial<FormSubmission> {
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
    console.log('API: Form submission started');
    
    // Get client IP address
    const headersList = headers();
    const ip = headersList.get('x-forwarded-for') || 
               headersList.get('x-real-ip') || 
               request.ip || 
               'unknown';

    console.log('API: Client IP:', ip);
    console.log('API: Request headers:', Object.fromEntries(headersList.entries()));

    // Rate limiting
    if (!checkRateLimit(ip)) {
      console.log('API: Rate limit exceeded for IP:', ip);
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
      console.log('API: Parsed request body:', body);
    } catch (parseError) {
      console.error('API: Failed to parse request body:', parseError);
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    // Extract reCAPTCHA token from body
    const { recaptchaToken, ...formData } = body;
    
    // Verify reCAPTCHA
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification required' },
        { status: 400 }
      );
    }
    
    const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
    if (!isRecaptchaValid) {
      console.log('API: reCAPTCHA verification failed for IP:', ip);
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed. Please try again.' },
        { status: 400 }
      );
    }
    
    console.log('API: reCAPTCHA verification successful');

    // Validate input
    const { isValid, errors } = validateFormData(formData);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }

    // Comprehensive input sanitization
    const sanitizedData = sanitizeInput(formData);

    // Add metadata
    const submissionData = {
      ...sanitizedData,
      ipAddress: ip,
      userAgent: headersList.get('user-agent') || undefined,
    };

    // Save to Cosmos DB
    console.log('API: Attempting to save to Cosmos DB');
    console.log('API: Environment check:', {
      hasEndpoint: !!process.env.COSMOS_DB_ENDPOINT,
      hasKey: !!process.env.COSMOS_DB_KEY,
      hasDatabase: !!process.env.COSMOS_DB_DATABASE_NAME,
      hasContainer: !!process.env.COSMOS_DB_CONTAINER_NAME,
    });
    
    let submission;
    try {
      submission = await createFormSubmission(submissionData);
      console.log('API: Cosmos DB save successful');
    } catch (cosmosError) {
      console.error('API: Cosmos DB error:', cosmosError);
      console.error('API: Cosmos DB error details:', {
        message: cosmosError instanceof Error ? cosmosError.message : 'Unknown error',
        stack: cosmosError instanceof Error ? cosmosError.stack : 'No stack trace',
      });
      throw new Error(`Database error: ${cosmosError instanceof Error ? cosmosError.message : 'Unknown database error'}`);
    }

    // Log successful submission (remove sensitive data)
    console.log('Form submission created:', {
      id: submission.id,
      email: submission.email,
      role: submission.role,
      submittedAt: submission.submittedAt,
    });

    // Return success response (don't expose internal data)
    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully',
      submissionId: submission.id,
    });

  } catch (error) {
    console.error('Form submission error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'API is working',
    timestamp: new Date().toISOString(),
  });
}