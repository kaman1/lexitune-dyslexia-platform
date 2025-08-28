import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const GPT_OSS_ENDPOINT = 'http://57.151.9.6';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get('endpoint') || 'health';
  
  try {
    const response = await fetch(`${GPT_OSS_ENDPOINT}/${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();
    
    return NextResponse.json(data, {
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    );
  }
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get('endpoint') || 'api/chat';
  
  try {
    let body;
    const rawText = await request.text();
    
    try {
      body = JSON.parse(rawText);
    } catch (requestParseError) {
      console.error('Failed to parse request JSON:', requestParseError);
      return NextResponse.json(
        { error: `Invalid request JSON: ${requestParseError.message}` },
        { status: 400 }
      );
    }
    
    const response = await fetch(`${GPT_OSS_ENDPOINT}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    const text = await response.text();
    
    // Handle streaming response from Ollama
    const lines = text.trim().split('\n');
    let data;
    
    if (lines.length > 1) {
      // Multiple JSON objects - this is a streaming response
      // Get the last complete response which should have "done": true
      let finalResponse = null;
      let combinedContent = '';
      
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          if (parsed.message && parsed.message.content) {
            combinedContent += parsed.message.content;
          }
          if (parsed.done) {
            finalResponse = parsed;
          }
        } catch (e) {
          console.warn('Failed to parse line:', line);
        }
      }
      
      if (finalResponse) {
        // Create a combined response with all content
        data = {
          ...finalResponse,
          message: {
            ...finalResponse.message,
            content: combinedContent
          }
        };
      } else {
        // Fallback to the last parseable response
        data = JSON.parse(lines[lines.length - 1]);
        data.message.content = combinedContent;
      }
    } else {
      // Single JSON object
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        return NextResponse.json(
          { error: `Invalid JSON response: ${parseError.message}` },
          { status: 500 }
        );
      }
    }
    
    return NextResponse.json(data, {
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Request failed: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}