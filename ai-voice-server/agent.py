#!/usr/bin/env python3
"""
AI Voice Agent - Simplified Version
Handles real-time voice conversations with OpenAI integration
"""

import asyncio
import os
import logging
import json
from typing import Optional, List, Dict, Any
from dotenv import load_dotenv
import openai
from datetime import datetime

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class AIVoiceAgent:
    """Simplified AI Voice Agent for real-time conversations"""
    
    def __init__(self):
        self.openai_client = openai.OpenAI(
            api_key=os.getenv('OPENAI_API_KEY')
        )
        self.conversation_history: List[Dict[str, str]] = []
        self.max_history_length = 50
        
    def process_text_message(self, message: str, context: str = "") -> str:
        """Process incoming text message and generate AI response"""
        try:
            # Add user message to history
            self.conversation_history.append({
                "role": "user",
                "content": message,
                "timestamp": datetime.now().isoformat()
            })
            
            # Generate AI response
            ai_response = self.generate_ai_response(message, context)
            
            # Add AI response to history
            self.conversation_history.append({
                "role": "assistant", 
                "content": ai_response,
                "timestamp": datetime.now().isoformat()
            })
            
            # Trim history if too long
            if len(self.conversation_history) > self.max_history_length:
                self.conversation_history = self.conversation_history[-self.max_history_length:]
            
            return ai_response
            
        except Exception as e:
            logger.error(f"Error processing text message: {e}")
            return self.get_fallback_response(message)
    
    def generate_ai_response(self, message: str, context: str = "") -> str:
        """Generate AI response using OpenAI GPT-4"""
        try:
            # Prepare conversation context
            messages = [
                {
                    "role": "system",
                    "content": "You are a helpful AI learning assistant focused on helping users with pronunciation, reading skills, and educational topics. Be friendly, encouraging, and provide practical advice. Keep responses concise but informative."
                }
            ]
            
            # Add context if provided
            if context:
                messages.append({
                    "role": "user",
                    "content": f"Context: {context}\n\nCurrent message: {message}"
                })
            else:
                messages.append({
                    "role": "user",
                    "content": message
                })
            
            # Call OpenAI API
            response = self.openai_client.chat.completions.create(
                model="gpt-4o",
                messages=messages,
                max_tokens=300,
                temperature=0.7
            )
            
            return response.choices[0].message.content.strip()
            
        except Exception as e:
            logger.error(f"Error generating AI response: {e}")
            return self.get_fallback_response(message)
    
    def generate_speech(self, text: str, voice: str = "alloy") -> bytes:
        """Generate speech from text using OpenAI TTS"""
        try:
            logger.info(f"Generating speech for: {text[:50]}...")
            
            # Call OpenAI TTS API
            response = self.openai_client.audio.speech.create(
                model="tts-1",
                voice=voice,
                input=text
            )
            
            # Get the audio data
            audio_data = response.content
            
            logger.info(f"Speech generated successfully, size: {len(audio_data)} bytes")
            return audio_data
            
        except Exception as e:
            logger.error(f"Error generating speech: {e}")
            raise
    
    def get_fallback_response(self, message: str) -> str:
        """Provide fallback response when AI is unavailable"""
        fallback_responses = [
            "I'm having trouble connecting right now, but I'm here to help! Could you try rephrasing your question?",
            "I'm experiencing some technical difficulties. Let me try to help you with a general response based on your message.",
            "I'm temporarily unavailable, but I'd be happy to help once I'm back online. In the meantime, feel free to ask again!"
        ]
        
        import random
        return random.choice(fallback_responses)
    
    def get_conversation_history(self) -> List[Dict[str, str]]:
        """Get conversation history"""
        return self.conversation_history.copy()
    
    def clear_conversation_history(self) -> None:
        """Clear conversation history"""
        self.conversation_history.clear()
        logger.info("Conversation history cleared")
    
    def get_status(self) -> Dict[str, Any]:
        """Get agent status information"""
        return {
            "status": "active",
            "conversation_count": len(self.conversation_history),
            "max_history_length": self.max_history_length,
            "openai_configured": bool(os.getenv('OPENAI_API_KEY')),
            "timestamp": datetime.now().isoformat()
        }

# Global agent instance
agent = AIVoiceAgent()

if __name__ == "__main__":
    """Test the agent directly"""
    try:
        logger.info("Starting AI Voice Agent...")
        
        # Test the agent
        test_message = "Hello, can you help me with pronunciation?"
        response = agent.process_text_message(test_message)
        logger.info(f"Test response: {response}")
        
        # Get status
        status = agent.get_status()
        logger.info(f"Agent status: {status}")
        
        logger.info("Agent is ready for conversations!")
        
    except Exception as e:
        logger.error(f"Fatal error: {e}")
        raise
