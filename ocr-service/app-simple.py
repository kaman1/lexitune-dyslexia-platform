from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import tempfile
import os
import uuid
import logging
from pathlib import Path
from typing import Optional
import json
from datetime import datetime
import subprocess
import shutil

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="OCR Microservice (Simple)",
    description="Lightweight PDF OCR service using Tesseract",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    """Process PDF with OCR using Tesseract"""
    
    # Validate file type
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")
    
    # Generate unique ID for this job
    job_id = str(uuid.uuid4())
    
    try:
        # Create temporary directory for processing
        with tempfile.TemporaryDirectory() as temp_dir:
            input_path = Path(temp_dir) / "input.pdf"
            output_dir = Path(temp_dir) / "pages"
            output_dir.mkdir(exist_ok=True)
            
            # Save uploaded file
            with open(input_path, "wb") as buffer:
                content = await file.read()
                buffer.write(content)
            
            logger.info(f"Processing PDF: {file.filename}, Size: {len(content)} bytes")
            
            # Convert PDF to images using pdftoppm (poppler-utils)
            try:
                # Convert PDF pages to PNG images
                cmd = [
                    "pdftoppm", "-png", "-r", "300",
                    str(input_path), str(output_dir / "page")
                ]
                result = subprocess.run(cmd, capture_output=True, text=True, cwd=temp_dir)
                
                if result.returncode != 0:
                    logger.warning(f"PDF to image conversion failed: {result.stderr}")
                    # Fallback: try to extract text directly
                    text_content = extract_text_direct(input_path)
                else:
                    # Get list of generated images
                    image_files = sorted(output_dir.glob("page-*.png"))
                    if not image_files:
                        raise Exception("No images generated from PDF")
                    
                    # Process each image with Tesseract
                    text_content = ""
                    for i, img_file in enumerate(image_files):
                        page_text = process_image_with_tesseract(img_file, language)
                        text_content += f"\n--- Page {i+1} ---\n{page_text}\n"
                    
                    # Clean up images
                    for img_file in image_files:
                        img_file.unlink()
                
            except Exception as e:
                logger.warning(f"Image processing failed: {str(e)}")
                # Fallback: try to extract text directly
                text_content = extract_text_direct(input_path)
            
            # Calculate processing metrics
            processing_info = {
                "job_id": job_id,
                "filename": file.filename,
                "original_size": len(content),
                "language": language,
                "optimization": optimize,
                "force_ocr": force_ocr,
                "text_length": len(text_content),
                "processing_time": "completed",
                "status": "success",
                "method": "tesseract"
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

def process_image_with_tesseract(image_path: Path, language: str) -> str:
    """Process image with Tesseract OCR"""
    try:
        cmd = ["tesseract", str(image_path), "stdout", "-l", language, "--psm", "6"]
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        if result.returncode != 0:
            logger.warning(f"Tesseract failed: {result.stderr}")
            return f"OCR failed for {image_path.name}"
        
        return result.stdout.strip()
        
    except Exception as e:
        logger.warning(f"Tesseract processing failed: {str(e)}")
        return f"OCR error: {str(e)}"

def extract_text_direct(pdf_path: Path) -> str:
    """Extract text directly from PDF if possible"""
    try:
        # Try using pdftotext (poppler-utils)
        cmd = ["pdftotext", str(pdf_path), "-"]
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        if result.returncode == 0 and result.stdout.strip():
            return result.stdout.strip()
        
        # If no text extracted, return fallback message
        return f"PDF processed: {pdf_path.name}\nNo text could be extracted. This may be a scanned document requiring OCR."
        
    except Exception as e:
        logger.warning(f"Direct text extraction failed: {str(e)}")
        return f"Text extraction failed: {str(e)}"

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
