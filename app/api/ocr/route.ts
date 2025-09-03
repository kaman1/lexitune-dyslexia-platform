import { NextRequest, NextResponse } from 'next/server';

const OCR_SERVICE_URL = process.env.OCR_SERVICE_URL || 'http://localhost:8000';

export async function POST(request: NextRequest) {
  try {
    // Get form data
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const language = formData.get('language') as string || 'eng';
    const optimize = formData.get('optimize') === 'true';
    const forceOcr = formData.get('forceOcr') === 'true';

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      return NextResponse.json(
        { success: false, error: 'Only PDF files are supported' },
        { status: 400 }
      );
    }

    // Create new form data for OCR service
    const ocrFormData = new FormData();
    ocrFormData.append('file', file);
    ocrFormData.append('language', language);
    ocrFormData.append('optimize', optimize.toString());
    ocrFormData.append('force_ocr', forceOcr.toString());

    console.log(`🔄 Forwarding PDF to OCR service: ${file.name} (${file.size} bytes)`);

    // Forward to OCR microservice
    const ocrResponse = await fetch(`${OCR_SERVICE_URL}/ocr`, {
      method: 'POST',
      body: ocrFormData,
    });

    if (!ocrResponse.ok) {
      const errorText = await ocrResponse.text();
      console.error(`❌ OCR service error: ${ocrResponse.status} - ${errorText}`);
      
      return NextResponse.json(
        { 
          success: false, 
          error: 'OCR processing failed',
          details: errorText
        },
        { status: 500 }
      );
    }

    const ocrResult = await ocrResponse.json();
    console.log(`✅ OCR completed: ${ocrResult.processing_info.text_length} characters extracted`);

    // Return the OCR result
    return NextResponse.json({
      success: true,
      data: ocrResult,
      processing_info: {
        method: 'server-ocr',
        service: 'OCRmyPDF',
        language: language,
        optimization: optimize,
        force_ocr: forceOcr
      }
    });

  } catch (error) {
    console.error('❌ OCR proxy error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Get supported languages from OCR service
    const response = await fetch(`${OCR_SERVICE_URL}/languages`);
    
    if (!response.ok) {
      throw new Error(`OCR service responded with ${response.status}`);
    }

    const languages = await response.json();
    
    return NextResponse.json({
      success: true,
      data: languages,
      service_info: {
        name: 'OCRmyPDF Microservice',
        url: OCR_SERVICE_URL,
        status: 'available'
      }
    });

  } catch (error) {
    console.error('❌ Failed to get OCR languages:', error);
    
    // Return fallback languages if service is unavailable
    return NextResponse.json({
      success: false,
      error: 'OCR service unavailable',
      fallback_languages: [
        { code: "eng", name: "English" },
        { code: "ara", name: "Arabic" },
        { code: "spa", name: "Spanish" },
        { code: "fra", name: "French" },
        { code: "deu", name: "German" }
      ]
    });
  }
}
