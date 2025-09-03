import { NextRequest, NextResponse } from 'next/server';

const REALTIME_API_URL = 'http://localhost:3005';

export async function POST(request: NextRequest) {
  try {
    // Create a new realtime session using the user's real-time API
    const response = await fetch(`${REALTIME_API_URL}/api/realtime`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Initialize real-time voice conversation',
        voice: 'alloy'
      })
    });

    if (!response.ok) {
      throw new Error(`Real-time API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.success && data.token) {
      return NextResponse.json({
        session_id: data.token.session.id,
        status: 'created',
        success: true,
        token: data.token.value,
        session_config: data.token.session
      });
    } else {
      throw new Error('Failed to create real-time session');
    }

  } catch (error) {
    console.error('Session creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create session', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Return session information and status
    return NextResponse.json({
      message: 'Real-Time Voice Conversation API',
      status: 'ready',
      supported_operations: ['POST - Create new real-time session'],
      realtime_api_url: REALTIME_API_URL,
      success: true
    });

  } catch (error) {
    console.error('Session info error:', error);
    return NextResponse.json(
      { error: 'Failed to get session info', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
