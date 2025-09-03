import { NextRequest, NextResponse } from 'next/server';

const REALTIME_API_URL = 'http://localhost:3005';

export async function POST(request: NextRequest) {
  try {
    const { session_id, audio_data, audio_format } = await request.json();

    if (!session_id || !audio_data) {
      return NextResponse.json(
        { error: 'Missing session_id or audio_data' },
        { status: 400 }
      );
    }

    // Convert base64 audio back to buffer
    const audioBuffer = Buffer.from(audio_data, 'base64');

    // Create a file from the audio buffer
    const audioFile = new File([audioBuffer], 'audio.webm', { type: 'audio/webm' });

    // For now, we'll use the standard OpenAI API since the real-time API may not support direct audio input yet
    // This will be updated when the real-time audio streaming is fully implemented
    
    // Transcribe the audio using OpenAI Whisper
    const formData = new FormData();
    formData.append('file', audioFile);
    formData.append('model', 'whisper-1');
    formData.append('response_format', 'text');

    const transcriptionResponse = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: formData
    });

    if (!transcriptionResponse.ok) {
      throw new Error(`Transcription failed: ${transcriptionResponse.status}`);
    }

    const transcription = await transcriptionResponse.text();

    // Send the transcribed text to the real-time API for processing
    const realtimeResponse = await fetch(`${REALTIME_API_URL}/api/realtime`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: transcription,
        voice: 'alloy',
        session_id: session_id
      })
    });

    if (!realtimeResponse.ok) {
      throw new Error(`Real-time API error: ${realtimeResponse.status}`);
    }

    const realtimeData = await realtimeResponse.json();

    // Generate speech from the real-time response using OpenAI TTS
    const speechResponse = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'tts-1',
        voice: 'alloy',
        input: realtimeData.message || transcription
      })
    });

    if (!speechResponse.ok) {
      throw new Error(`Speech generation failed: ${speechResponse.status}`);
    }

    // Convert speech to base64
    const speechBuffer = Buffer.from(await speechResponse.arrayBuffer());
    const speechBase64 = speechBuffer.toString('base64');

    return NextResponse.json({
      success: true,
      ai_response: speechBase64,
      ai_text: realtimeData.message || transcription,
      user_transcription: transcription,
      session_id: session_id,
      realtime_session: realtimeData.token?.session
    });

  } catch (error) {
    console.error('Realtime audio processing error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process audio', 
        details: error instanceof Error ? error.message : 'Unknown error',
        success: false
      },
      { status: 500 }
    );
  }
}
