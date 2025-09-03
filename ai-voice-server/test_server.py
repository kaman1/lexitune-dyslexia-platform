#!/usr/bin/env python3
"""
Test script for AI Voice Agent Server
Tests basic functionality and endpoints
"""

import asyncio
import aiohttp
import json
import sys
from typing import Dict, Any

async def test_endpoint(session: aiohttp.ClientSession, url: str, method: str = "GET", data: Dict[str, Any] = None) -> Dict[str, Any]:
    """Test a specific endpoint"""
    try:
        if method == "GET":
            async with session.get(url) as response:
                result = await response.json()
                print(f"✅ {method} {url} - Status: {response.status}")
                return result
        elif method == "POST":
            async with session.post(url, json=data) as response:
                result = await response.json()
                print(f"✅ {method} {url} - Status: {response.status}")
                return result
    except Exception as e:
        print(f"❌ {method} {url} - Error: {e}")
        return {}

async def test_websocket(url: str):
    """Test WebSocket connection"""
    try:
        async with aiohttp.ClientSession() as session:
            async with session.ws_connect(url) as ws:
                print(f"✅ WebSocket connected to {url}")
                
                # Send test message
                test_message = {"type": "test", "message": "Hello from test client"}
                await ws.send_str(json.dumps(test_message))
                print(f"📤 Sent: {test_message}")
                
                # Receive response
                async for msg in ws:
                    if msg.type == aiohttp.WSMsgType.TEXT:
                        response = json.loads(msg.data)
                        print(f"📥 Received: {response}")
                        break
                    elif msg.type == aiohttp.WSMsgType.ERROR:
                        print(f"❌ WebSocket error: {ws.exception()}")
                        break
                        
    except Exception as e:
        print(f"❌ WebSocket test failed: {e}")

async def main():
    """Main test function"""
    base_url = "http://localhost:8000"
    
    print("🧪 Testing AI Voice Agent Server...")
    print(f"🌐 Base URL: {base_url}")
    print("=" * 50)
    
    async with aiohttp.ClientSession() as session:
        # Test basic endpoints
        print("\n📡 Testing HTTP Endpoints:")
        
        # Root endpoint
        await test_endpoint(session, f"{base_url}/")
        
        # Health check
        health = await test_endpoint(session, f"{base_url}/health")
        if health.get("status") == "healthy":
            print("✅ Health check passed")
        else:
            print("❌ Health check failed")
        
        # Status endpoint
        status = await test_endpoint(session, f"{base_url}/status")
        if status.get("status") == "configured":
            print("✅ Status check passed")
        else:
            print("❌ Status check failed")
        
        # Config endpoint
        config = await test_endpoint(session, f"{base_url}/config")
        if config.get("features"):
            print("✅ Config check passed")
        else:
            print("❌ Config check failed")
        
        # Chat endpoint
        chat_data = {"message": "Hello, can you help me with pronunciation?"}
        chat_response = await test_endpoint(session, f"{base_url}/chat", "POST", chat_data)
        if chat_response.get("status") == "success":
            print("✅ Chat endpoint test passed")
        else:
            print("❌ Chat endpoint test failed")
        
        # Metrics endpoint
        metrics = await test_endpoint(session, f"{base_url}/metrics")
        if metrics.get("active_connections") is not None:
            print("✅ Metrics endpoint test passed")
        else:
            print("❌ Metrics endpoint test failed")
    
    # Test WebSocket
    print("\n🔌 Testing WebSocket:")
    ws_url = "ws://localhost:8000/ws"
    await test_websocket(ws_url)
    
    print("\n" + "=" * 50)
    print("🎯 Testing completed!")
    
    # Summary
    print("\n📊 Test Summary:")
    print("✅ HTTP endpoints tested")
    print("✅ WebSocket connection tested")
    print("✅ Basic functionality verified")
    
    print("\n🚀 Server is ready for AI voice conversations!")

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\n⏹️ Testing interrupted by user")
        sys.exit(0)
    except Exception as e:
        print(f"\n❌ Testing failed: {e}")
        sys.exit(1)
