import { NextRequest, NextResponse } from 'next/server';
import { AccessToken } from 'livekit-server-sdk';

// LiveKit server configuration for local development
const LIVEKIT_API_KEY = 'devkey';
const LIVEKIT_API_SECRET = 'secret';
const LIVEKIT_URL = 'ws://localhost:7880';

export async function POST(request: NextRequest) {
  try {
    const { roomName, participantName } = await request.json();

    if (!roomName || !participantName) {
      return NextResponse.json(
        { success: false, error: 'Room name and participant name are required' },
        { status: 400 }
      );
    }

    // Create access token
    const at = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, {
      identity: participantName,
      name: participantName,
    });

    // Grant permissions
    at.addGrant({
      room: roomName,
      roomJoin: true,
      roomPublish: true,
      roomSubscribe: true,
      roomAdmin: false,
      roomCreate: false,
    });

    // Generate token
    const token = at.toJwt();

    console.log(`🎫 Generated LiveKit token for ${participantName} in room ${roomName}`);

    return NextResponse.json({
      success: true,
      token,
      serverUrl: LIVEKIT_URL,
      roomName,
      participantName,
    });

  } catch (error) {
    console.error('❌ LiveKit token generation failed:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate token' },
      { status: 500 }
    );
  }
}
