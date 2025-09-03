from fastapi import FastAPI, File, UploadFile, HTTPException, BackgroundTasks
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import ocrmypdf
import tempfile
import os
import uuid
import logging
from pathlib import Path
from typing import Optional
import json
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="OCR Microservice",
    description="Professional PDF OCR service using OCRmyPDF",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# OCR processing queue
ocr_queue = {}

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}

@app.get("/languages")
async def get_supported_languages():
    """Get supported OCR languages"""
    languages = [
        {"code": "eng", "name": "English"},
        {"code": "ara", "name": "Arabic"},
        {"code": "spa", "name": "Spanish"},
        {"code": "fra", "name": "French"},
        {"code": "deu", "name": "German"},
        {"code": "ita", "name": "Italian"},
        {"code": "por", "name": "Portuguese"},
        {"code": "rus", "name": "Russian"},
        {"code": "chi_sim", "name": "Chinese Simplified"},
        {"code": "jpn", "name": "Japanese"},
        {"code": "kor", "name": "Korean"}
    ]
    return {"languages": languages}

@app.post("/ocr")
async def process_pdf(
    file: UploadFile = File(...),
    language: str = "eng",
    optimize: bool = True,
    force_ocr: bool = False
):
    """Process PDF with OCR"""
    
    # Validate file type
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")
    
    # Generate unique ID for this job
    job_id = str(uuid.uuid4())
    
    try:
        # Create temporary directory for processing
        with tempfile.TemporaryDirectory() as temp_dir:
            input_path = Path(temp_dir) / "input.pdf"
            output_path = Path(temp_dir) / "output.pdf"
            
            # Save uploaded file
            with open(input_path, "wb") as buffer:
                content = await file.read()
                buffer.write(content)
            
            logger.info(f"Processing PDF: {file.filename}, Size: {len(content)} bytes")
            
            # OCRmyPDF options
            options = {
                'language': language,
                'optimize': optimize,
                'force_ocr': force_ocr,
                'skip_text': False,
                'deskew': True,
                'clean': True,
                'rotate_pages': True,
                'remove_background': True,
                'output_type': 'pdf',
                'progress_bar': False
            }
            
            # Process with OCRmyPDF
            result = ocrmypdf.ocr(
                input_path,
                output_path,
                **options
            )
            
            # Read the processed PDF and extract text
            text_content = extract_text_from_pdf(output_path)
            
            # Calculate processing metrics
            processing_info = {
                "job_id": job_id,
                "filename": file.filename,
                "original_size": len(content),
                "processed_size": output_path.stat().st_size,
                "language": language,
                "optimization": optimize,
                "force_ocr": force_ocr,
                "text_length": len(text_content),
                "processing_time": "completed",
                "status": "success"
            }
            
            logger.info(f"OCR completed successfully: {job_id}")
            
            return {
                "success": True,
                "job_id": job_id,
                "text": text_content,
                "processing_info": processing_info,
                "download_url": f"/download/{job_id}"
            }
            
    except Exception as e:
        logger.error(f"OCR processing failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"OCR processing failed: {str(e)}")

@app.get("/download/{job_id}")
async def download_processed_pdf(job_id: str):
    """Download processed PDF (placeholder for file storage)"""
    return {"message": "Download endpoint - implement file storage"}

def extract_text_from_pdf(pdf_path: Path) -> str:
    """Extract text from processed PDF"""
    try:
        # Use OCRmyPDF's text extraction capabilities
        # This is a simplified version - in production, use proper PDF text extraction
        import fitz  # PyMuPDF
        
        doc = fitz.open(str(pdf_path))
        text = ""
        
        for page_num in range(len(doc)):
            page = doc.load_page(page_num)
            text += f"\n--- Page {page_num + 1} ---\n"
            text += page.get_text()
        
        doc.close()
        return text.strip()
        
    except Exception as e:
        logger.warning(f"Text extraction failed: {str(e)}")
        return f"Text extraction failed: {str(e)}"

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
