import { NextRequest, NextResponse } from 'next/server';
import { experimental_generateSpeech as generateSpeech } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(request: NextRequest) {
  try {
    const { text, voice = 'alloy' } = await request.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Text is required' },
        { status: 400 }
      );
    }

    const trimmedText = text.trim();

    // Check text length limit
    const MAX_TEXT_LENGTH = 1000; // Reasonable limit for pronunciation
    if (trimmedText.length > MAX_TEXT_LENGTH) {
      return NextResponse.json(
        { success: false, error: 'Text too long for pronunciation' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    console.log(`🎤 Generating pronunciation for: "${trimmedText}"`);
    console.log(`🔊 Voice: ${voice}`);

    // Generate speech using AI SDK
    const audio = await generateSpeech({
      model: openai.speech('tts-1'),
      text: trimmedText,
      voice: voice as any,
    });

    // Extract audio data
    const audioData = audio.audio?.uint8ArrayData || audio.audioData;
    
    if (!audioData || audioData.length === 0) {
      console.error('❌ No audio data generated');
      return NextResponse.json(
        { success: false, error: 'No audio data generated' },
        { status: 500 }
      );
    }

    console.log(`✅ Pronunciation generated successfully (${audioData.length} bytes)`);

    // Return audio data directly without saving to file
    return new NextResponse(audioData, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioData.length.toString(),
        'Cache-Control': 'no-cache',
      },
    });

  } catch (error) {
    console.error('❌ Pronunciation generation error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
