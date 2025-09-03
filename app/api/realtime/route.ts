import { NextRequest, NextResponse } from 'next/server';

const REALTIME_API_URL = 'http://localhost:3005';

export async function POST(request: NextRequest) {
  try {
    const { message, voice = 'alloy' } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Request real-time access from the user's real-time API
    const response = await fetch(`${REALTIME_API_URL}/api/realtime`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        voice
      })
    });

    if (!response.ok) {
      throw new Error(`Real-time API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.success && data.token) {
      return NextResponse.json({
        success: true,
        token: data.token.value,
        session_id: data.token.session.id,
        session_config: data.token.session,
        message: 'Real-time session created successfully'
      });
    } else {
      throw new Error('Failed to create real-time session');
    }

  } catch (error) {
    console.error('Real-time API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create real-time session', 
        details: error instanceof Error ? error.message : 'Unknown error',
        success: false
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Get configuration from the user's real-time API
    const response = await fetch(`${REALTIME_API_URL}/api/config`);
    
    if (!response.ok) {
      throw new Error(`Config API error: ${response.status}`);
    }

    const config = await response.json();

    return NextResponse.json({
      success: true,
      config,
      message: 'Real-time API configuration retrieved successfully'
    });

  } catch (error) {
    console.error('Config API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to get real-time API configuration', 
        details: error instanceof Error ? error.message : 'Unknown error',
        success: false
      },
      { status: 500 }
    );
  }
}
