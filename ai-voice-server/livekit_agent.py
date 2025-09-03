#!/usr/bin/env python3
"""
LiveKit AI Voice Agent
Real-time voice conversations using LiveKit Agents framework
"""

import os
import logging
import asyncio
from typing import Dict, Any
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

try:
    from livekit_agents import MultimodalAgent
    from livekit_agents.agents import AgentConfig
    from livekit_agents.llm import OpenAILLM
    from livekit_agents.tts import OpenAITTS
    from livekit_agents.stt import OpenAIWhisperSTT
    
    LIVEKIT_AVAILABLE = True
    logger.info("LiveKit Agents framework imported successfully")
except ImportError as e:
    LIVEKIT_AVAILABLE = False
    logger.warning(f"LiveKit Agents not available: {e}")

class LiveKitVoiceAgent:
    """LiveKit-based voice agent for real-time conversations"""
    
    def __init__(self):
        self.livekit_url = os.getenv('LIVEKIT_URL')
        self.livekit_api_key = os.getenv('LIVEKIT_API_KEY')
        self.livekit_api_secret = os.getenv('LIVEKIT_API_SECRET')
        self.openai_api_key = os.getenv('OPENAI_API_KEY')
        
        if not all([self.livekit_url, self.livekit_api_key, self.livekit_api_secret, self.openai_api_key]):
            logger.error("Missing required environment variables for LiveKit")
            return
        
        if LIVEKIT_AVAILABLE:
            self.setup_livekit_agent()
        else:
            logger.warning("Using fallback agent without LiveKit")
    
    def setup_livekit_agent(self):
        """Setup LiveKit MultimodalAgent"""
        try:
            # Configure OpenAI components
            llm = OpenAILLM(
                api_key=self.openai_api_key,
                model="gpt-4o"
            )
            
            tts = OpenAITTS(
                api_key=self.openai_api_key,
                model="tts-1",
                voice="alloy"
            )
            
            stt = OpenAIWhisperSTT(
                api_key=self.openai_api_key,
                model="whisper-1"
            )
            
            # Create agent configuration
            config = AgentConfig(
                name="AI Learning Assistant",
                system_prompt="You are a helpful AI learning assistant focused on helping users with pronunciation, reading skills, and educational topics. Be friendly, encouraging, and provide practical advice. Keep responses concise but informative.",
                llm=llm,
                tts=tts,
                stt=stt
            )
            
            # Initialize the agent
            self.agent = MultimodalAgent(config)
            logger.info("LiveKit MultimodalAgent initialized successfully")
            
        except Exception as e:
            logger.error(f"Failed to setup LiveKit agent: {e}")
            self.agent = None
    
    async def start_conversation(self, room_name: str, participant_name: str = "User"):
        """Start a LiveKit conversation session"""
        if not self.agent:
            raise Exception("LiveKit agent not available")
        
        try:
            # Generate room token
            from livekit_server_sdk import AccessToken, VideoGrant
            
            token = AccessToken()
            token.add_grant(VideoGrant(
                room_join=True,
                room=room_name,
                can_publish=True,
                can_subscribe=True
            ))
            
            # Start agent session
            session = await self.agent.start_session(
                room_name=room_name,
                participant_name=participant_name
            )
            
            logger.info(f"Started LiveKit conversation in room: {room_name}")
            return session
            
        except Exception as e:
            logger.error(f"Failed to start conversation: {e}")
            raise
    
    def get_status(self) -> Dict[str, Any]:
        """Get agent status"""
        return {
            "status": "active" if self.agent else "inactive",
            "livekit_available": LIVEKIT_AVAILABLE,
            "livekit_url": self.livekit_url,
            "openai_configured": bool(self.openai_api_key),
            "agent_ready": bool(self.agent)
        }

# Global agent instance
livekit_agent = LiveKitVoiceAgent()
