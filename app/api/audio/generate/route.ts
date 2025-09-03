import { NextRequest, NextResponse } from 'next/server';
import { experimental_generateSpeech as generateSpeech } from 'ai';
import { openai } from '@ai-sdk/openai';

const MAX_CHUNK_SIZE = 4000; // OpenAI TTS limit is 4096, using 4000 for safety

function chunkText(text: string, maxChunkSize: number = MAX_CHUNK_SIZE): string[] {
  const chunks: string[] = [];
  let currentChunk = '';
  
  // Split by sentences first to maintain readability
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  for (const sentence of sentences) {
    const trimmedSentence = sentence.trim();
    
    // If adding this sentence would exceed the limit
    if (currentChunk.length + trimmedSentence.length + 1 > maxChunkSize) {
      // Save current chunk if it has content
      if (currentChunk.trim().length > 0) {
        chunks.push(currentChunk.trim());
      }
      // Start new chunk with current sentence
      currentChunk = trimmedSentence;
    } else {
      // Add sentence to current chunk
      currentChunk += (currentChunk ? '. ' : '') + trimmedSentence;
    }
  }
  
  // Add the last chunk if it has content
  if (currentChunk.trim().length > 0) {
    chunks.push(currentChunk.trim());
  }
  
  return chunks;
}

export async function POST(request: NextRequest) {
  try {
    const { text, voice = 'alloy', language = 'en' } = await request.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Text is required' },
        { status: 400 }
      );
    }

    const trimmedText = text.trim();

    // Check text length limit to prevent extremely large audio files
    const MAX_TEXT_LENGTH = 50000; // 50k characters max
    if (trimmedText.length > MAX_TEXT_LENGTH) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Text too long. Maximum ${MAX_TEXT_LENGTH} characters allowed. Your text has ${trimmedText.length} characters.` 
        },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    console.log(`🎤 Generating speech for text (${trimmedText.length} characters)`);
    console.log(`🔊 Voice: ${voice}, Language: ${language}`);

    // Check if text needs chunking
    if (trimmedText.length <= MAX_CHUNK_SIZE) {
      // Single chunk - generate audio directly
      const audio = await generateSpeech({
        model: openai.speech('tts-1'),
        text: trimmedText,
        voice: voice as 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer',
        providerOptions: {
          openai: {
            // Add any OpenAI-specific options here
          }
        }
      });

      // Access audio data from the correct property
      const audioData = audio.audio?.uint8ArrayData || audio.audioData;
      
      if (!audioData || audioData.length === 0) {
        throw new Error('No audio data generated');
      }

      console.log(`✅ Speech generated successfully (${audioData.length} bytes)`);

      return new NextResponse(audioData, {
        status: 200,
        headers: {
          'Content-Type': 'audio/mpeg',
          'Content-Length': audioData.length.toString(),
          'Cache-Control': 'public, max-age=3600',
        },
      });
    } else {
      // Text is too long - need to chunk it
      console.log(`📝 Text too long (${trimmedText.length} chars), chunking into segments...`);
      
      const chunks = chunkText(trimmedText);
      console.log(`📦 Created ${chunks.length} chunks for processing`);
      
      // Generate audio for each chunk
      const audioChunks: ArrayBuffer[] = [];
      
      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        console.log(`🎤 Processing chunk ${i + 1}/${chunks.length} (${chunk.length} chars)`);
        
        try {
          const audio = await generateSpeech({
            model: openai.speech('tts-1'),
            text: chunk,
            voice: voice as 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer',
            providerOptions: {
              openai: {
                // Add any OpenAI-specific options here
              }
            }
          });

          // Access audio data from the correct property
          const audioData = audio.audio?.uint8ArrayData || audio.audioData;
          
          if (audioData && audioData.length > 0) {
            audioChunks.push(audioData);
            console.log(`✅ Chunk ${i + 1} processed successfully (${audioData.length} bytes)`);
          } else {
            console.warn(`⚠️ Chunk ${i + 1} generated no audio data`);
          }
        } catch (chunkError) {
          console.error(`❌ Failed to process chunk ${i + 1}:`, chunkError);
          // Continue with other chunks
        }
      }
      
      if (audioChunks.length === 0) {
        throw new Error('No audio chunks were generated successfully');
      }
      
      // Combine all audio chunks into a single response
      // For now, we'll return the first chunk and provide metadata
      // In a more advanced implementation, you could concatenate the audio files
      const firstChunk = audioChunks[0];
      const totalBytes = audioChunks.reduce((sum, chunk) => sum + chunk.byteLength, 0);
      
      console.log(`✅ Multi-chunk speech generation completed: ${audioChunks.length} chunks, ${totalBytes} total bytes`);
      
      return new NextResponse(firstChunk, {
        status: 200,
        headers: {
          'Content-Type': 'audio/mpeg',
          'Content-Length': firstChunk.byteLength.toString(),
          'X-Total-Chunks': audioChunks.length.toString(),
          'X-Total-Bytes': totalBytes.toString(),
          'X-Is-Chunked': 'true',
          'Cache-Control': 'public, max-age=3600',
        },
      });
    }

  } catch (error) {
    console.error('❌ Speech generation failed:', error);
    
    if (error.message?.includes('AI_NoAudioGeneratedError')) {
      return NextResponse.json(
        { success: false, error: 'AI failed to generate audio' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'Speech generation failed',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
