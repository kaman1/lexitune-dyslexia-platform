#!/usr/bin/env python3
"""
FastAPI server for AI Voice Agent
Provides HTTP endpoints and WebSocket support for real-time communication
"""

import asyncio
import logging
import os
import json
from typing import Dict, Any
from contextlib import asynccontextmanager
import time

from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException, Response, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from dotenv import load_dotenv

# Import our agent
from agent import agent

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Pydantic models
class HealthResponse(BaseModel):
    status: str
    message: str
    timestamp: str
    version: str

class AgentStatusResponse(BaseModel):
    status: str
    agent_name: str
    livekit_url: str
    openai_configured: bool
    livekit_configured: bool
    conversation_count: int

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str
    timestamp: float
    status: str

class SpeechRequest(BaseModel):
    text: str
    voice: str = "alloy"

# Global variables
app = FastAPI(
    title="AI Voice Agent Server",
    description="Real-time AI voice conversation server with OpenAI integration",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# WebSocket connection manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        logger.info(f"WebSocket connected. Total connections: {len(self.active_connections)}")

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)
        logger.info(f"WebSocket disconnected. Total connections: {len(self.active_connections)}")

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            try:
                await connection.send_text(message)
            except Exception as e:
                logger.error(f"Error broadcasting message: {e}")
                # Remove broken connections
                self.active_connections.remove(connection)

manager = ConnectionManager()

@app.on_event("startup")
async def startup_event():
    """Initialize the application on startup"""
    logger.info("AI Voice Agent Server starting up...")
    
    # Validate environment variables
    required_vars = ["OPENAI_API_KEY", "LIVEKIT_URL", "LIVEKIT_API_KEY", "LIVEKIT_API_SECRET"]
    missing_vars = [var for var in required_vars if not os.getenv(var)]
    
    if missing_vars:
        logger.warning(f"Missing environment variables: {missing_vars}")
    
    logger.info("Environment variables validated")
    logger.info(f"LiveKit URL: {os.getenv('LIVEKIT_URL')}")
    logger.info(f"OpenAI API Key: {os.getenv('OPENAI_API_KEY')[:10] if os.getenv('OPENAI_API_KEY') else 'Not configured'}...")

@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup on shutdown"""
    logger.info("AI Voice Agent Server shutting down...")

@app.get("/", response_model=Dict[str, str])
async def root():
    """Root endpoint"""
    return {
        "message": "AI Voice Agent Server",
        "status": "running",
        "version": "1.0.0",
        "description": "Real-time AI voice conversation server with OpenAI integration"
    }

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint"""
    import datetime
    return HealthResponse(
        status="healthy",
        message="AI Voice Agent Server is running",
        timestamp=datetime.datetime.now().isoformat(),
        version="1.0.0"
    )

@app.get("/status", response_model=AgentStatusResponse)
async def agent_status():
    """Get agent status and configuration"""
    status = agent.get_status()
    return AgentStatusResponse(
        status=status["status"],
        agent_name=status["agent_name"],
        livekit_url=status["livekit_url"],
        openai_configured=status["openai_configured"],
        livekit_configured=status["livekit_configured"],
        conversation_count=status["conversation_count"]
    )

@app.get("/config")
async def get_config():
    """Get configuration (without sensitive data)"""
    return {
        "livekit_url": os.getenv("LIVEKIT_URL"),
        "agent_name": "AI Voice Assistant",
        "features": [
            "Real-time voice conversation",
            "OpenAI GPT-4 integration",
            "OpenAI TTS integration",
            "LiveKit WebRTC support",
            "Educational responses",
            "Pronunciation assistance",
            "Conversation history",
            "WebSocket support"
        ]
    }

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """HTTP endpoint for chat messages"""
    try:
        user_message = request.message
        if not user_message or not user_message.strip():
            raise HTTPException(status_code=400, detail="Message is required")
        
        logger.info(f"Chat message received: {user_message}")
        
        # Process message through AI agent
        ai_response = agent.process_text_message(user_message.strip(), "")
        
        response = ChatResponse(
            response=ai_response,
            timestamp=asyncio.get_event_loop().time(),
            status="success"
        )
        
        return response
        
    except Exception as e:
        logger.error(f"Error processing chat message: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/speech")
async def generate_speech_endpoint(request: SpeechRequest):
    """Generate speech from text using OpenAI TTS"""
    try:
        text = request.text
        voice = request.voice
        
        if not text or not text.strip():
            raise HTTPException(status_code=400, detail="Text is required")
        
        logger.info(f"Speech generation requested for: {text[:50]}...")
        
        # Generate speech using agent
        audio_data = agent.generate_speech(text.strip(), voice)
        
        if audio_data:
            return Response(
                content=audio_data,
                media_type="audio/mpeg",
                headers={
                    "Content-Disposition": f"attachment; filename=speech_{int(time.time())}.mp3"
                }
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to generate speech")
        
    except Exception as e:
        logger.error(f"Error generating speech: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/speech-to-text")
async def convert_speech_to_text():
    """Convert uploaded audio to text using OpenAI Whisper"""
    try:
        
        # Get the uploaded audio file
        audio_file = await File(...)
        
        if not audio_file:
            raise HTTPException(status_code=400, detail="Audio file is required")
        
        # Check file type
        if not audio_file.content_type.startswith('audio/'):
            raise HTTPException(status_code=400, detail="File must be an audio file")
        
        logger.info(f"Speech-to-text requested for file: {audio_file.filename}")
        
        # Read the audio file
        audio_content = await audio_file.read()
        
        # Convert to text using OpenAI Whisper
        try:
            response = agent.openai_client.audio.transcriptions.create(
                model="whisper-1",
                file=("audio.wav", audio_content, "audio/wav"),
                response_format="text"
            )
            
            transcribed_text = response.strip()
            logger.info(f"Speech-to-text successful: {transcribed_text[:50]}...")
            
            return {
                "status": "success",
                "text": transcribed_text,
                "confidence": "high"  # Whisper doesn't provide confidence scores
            }
            
        except Exception as e:
            logger.error(f"OpenAI Whisper error: {e}")
            raise HTTPException(status_code=500, detail=f"Speech-to-text failed: {str(e)}")
        
    except Exception as e:
        logger.error(f"Error in speech-to-text endpoint: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/conversation/history")
async def get_conversation_history():
    """Get conversation history"""
    try:
        history = agent.get_conversation_history()
        return {
            "status": "success",
            "conversation_count": len(history),
            "history": history
        }
    except Exception as e:
        logger.error(f"Error getting conversation history: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.delete("/conversation/history")
async def clear_conversation_history():
    """Clear conversation history"""
    try:
        agent.clear_conversation_history()
        return {
            "status": "success",
            "message": "Conversation history cleared"
        }
    except Exception as e:
        logger.error(f"Error clearing conversation history: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """WebSocket endpoint for real-time communication"""
    await manager.connect(websocket)
    try:
        while True:
            # Receive message from client
            data = await websocket.receive_text()
            logger.info(f"Received WebSocket message: {data}")
            
            try:
                # Parse JSON message
                message_data = json.loads(data)
                message_type = message_data.get("type", "chat")
                
                if message_type == "chat":
                    # Handle chat message
                    user_message = message_data.get("message", "")
                    if user_message:
                        # Process through AI agent
                        ai_response = agent.process_text_message(user_message, "")
                        
                        # Send response back
                        response = {
                            "type": "response",
                            "message": ai_response,
                            "timestamp": asyncio.get_event_loop().time()
                        }
                        
                        await websocket.send_text(json.dumps(response))
                    else:
                        await websocket.send_text(json.dumps({
                            "type": "error",
                            "message": "Message is required",
                            "timestamp": asyncio.get_event_loop().time()
                        }))
                
                elif message_type == "status":
                    # Send agent status
                    status = agent.get_status()
                    await websocket.send_text(json.dumps({
                        "type": "status",
                        "data": status,
                        "timestamp": asyncio.get_event_loop().time()
                    }))
                
                else:
                    # Echo back for unknown message types
                    response = {
                        "type": "echo",
                        "message": f"Echo: {data}",
                        "timestamp": asyncio.get_event_loop().time()
                    }
                    await websocket.send_text(json.dumps(response))
                    
            except json.JSONDecodeError:
                # Handle non-JSON messages
                response = {
                    "type": "error",
                    "message": "Invalid JSON format",
                    "timestamp": asyncio.get_event_loop().time()
                }
                await websocket.send_text(json.dumps(response))
            
    except WebSocketDisconnect:
        manager.disconnect(websocket)
    except Exception as e:
        logger.error(f"WebSocket error: {e}")
        manager.disconnect(websocket)

@app.get("/metrics")
async def get_metrics():
    """Get server metrics"""
    return {
        "active_connections": len(manager.active_connections),
        "conversation_count": len(agent.get_conversation_history()),
        "uptime": "running",
        "memory_usage": "N/A",  # Would implement in real implementation
        "cpu_usage": "N/A"      # Would implement in real implementation
    }

if __name__ == "__main__":
    import uvicorn
    
    # Get configuration from environment
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", "8000"))
    
    logger.info(f"Starting server on {host}:{port}")
    
    uvicorn.run(
        "server:app",
        host=host,
        port=port,
        reload=False,  # Set to True for development
        log_level="info"
    )
