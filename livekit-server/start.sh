#!/bin/bash

# LiveKit Server Startup Script
echo "🚀 Starting LiveKit Server..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Create recordings directory if it doesn't exist
mkdir -p recordings

# Stop any existing containers
echo "🛑 Stopping existing containers..."
docker-compose down

# Start LiveKit server
echo "🔧 Starting LiveKit server..."
docker-compose up -d

# Wait for server to be ready
echo "⏳ Waiting for server to be ready..."
sleep 5

# Check if server is running
if curl -s http://localhost:7880/health > /dev/null; then
    echo "✅ LiveKit server is running!"
    echo "🌐 Server URL: http://localhost:7880"
    echo "🔑 API Key: devkey"
    echo "🔐 API Secret: secret"
    echo "📱 WebSocket URL: ws://localhost:7880"
    echo ""
    echo "🎯 To test:"
    echo "1. Open your browser to http://localhost:7880"
    echo "2. Use the test page at /audio/test"
    echo "3. Create a room and test audio functionality"
    echo ""
    echo "📋 To stop the server: ./stop.sh"
    echo "📋 To view logs: ./logs.sh"
else
    echo "❌ Failed to start LiveKit server"
    echo "📋 Check logs with: ./logs.sh"
    exit 1
fi
