import { NextRequest, NextResponse } from 'next/server';
import { testCosmosConnection } from '@/lib/cosmos-rest';

export const runtime = 'edge';

// Simple API key authentication (in production, use proper auth)
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || 'admin-dev-key-123';

function isAuthorized(request: NextRequest): boolean {
  const apiKey = request.headers.get('x-api-key') || request.nextUrl.searchParams.get('key');
  return apiKey === ADMIN_API_KEY;
}

export async function GET(request: NextRequest) {
  try {
    // Check authorization
    if (!isAuthorized(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Test connection first
    const connectionOk = await testCosmosConnection();
    if (!connectionOk) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      );
    }

    // For now, return a placeholder since we need to implement getAllFormSubmissions with REST API
    return NextResponse.json({
      success: true,
      count: 0,
      submissions: [],
      message: 'Admin API using REST - submissions list not yet implemented',
    });

  } catch (error) {
    console.error('Admin API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Health check for the database
export async function POST(request: NextRequest) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const connectionOk = await testCosmosConnection();
    
    return NextResponse.json({
      status: connectionOk ? 'connected' : 'disconnected',
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    return NextResponse.json(
      { status: 'error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}