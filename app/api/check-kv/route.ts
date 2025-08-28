import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    console.log('KV Check: Starting check');
    
    // Get Cloudflare context and check KV binding
    const { env } = getRequestContext();
    
    if (!env.FORM_SUBMISSIONS) {
      return NextResponse.json({
        success: false,
        message: 'KV binding not available',
        binding: 'undefined'
      });
    }

    console.log('KV Check: KV binding is available');

    // Get all keys (limit to 10 for testing)
    const keys = await env.FORM_SUBMISSIONS.list({ limit: 10 });
    console.log('KV Check: Found keys:', keys.keys.length);

    // Get some sample data
    const samples = [];
    for (const key of keys.keys.slice(0, 3)) {
      const data = await env.FORM_SUBMISSIONS.get(key.name);
      if (data) {
        const parsed = JSON.parse(data);
        samples.push({
          id: parsed.id,
          email: parsed.email,
          role: parsed.role,
          submittedAt: parsed.submittedAt
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'KV check completed',
      totalKeys: keys.keys.length,
      sampleData: samples,
      keyNames: keys.keys.map(k => k.name).slice(0, 5)
    });

  } catch (error) {
    console.error('KV Check: Error:', error);
    return NextResponse.json({
      success: false,
      message: 'KV check failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Also allow POST to check specific key
export async function POST(request: NextRequest) {
  try {
    const { keyId } = await request.json();
    
    const { env } = getRequestContext();
    
    if (!env.FORM_SUBMISSIONS) {
      return NextResponse.json({
        success: false,
        message: 'KV binding not available'
      });
    }

    const data = await env.FORM_SUBMISSIONS.get(keyId);
    
    if (!data) {
      return NextResponse.json({
        success: false,
        message: 'Key not found',
        keyId
      });
    }

    const parsed = JSON.parse(data);
    return NextResponse.json({
      success: true,
      message: 'Data found',
      data: parsed
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Error checking key',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}