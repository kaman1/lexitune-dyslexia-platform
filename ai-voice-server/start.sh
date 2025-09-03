#!/bin/bash

# AI Voice Server Startup Script

echo "🚀 Starting AI Voice Agent Server..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found. Please create it with your configuration."
    exit 1
fi

# Create logs directory if it doesn't exist
mkdir -p logs

echo "📦 Building Docker image..."
docker-compose build

echo "🔧 Starting services..."
docker-compose up -d

echo "⏳ Waiting for services to start..."
sleep 10

# Check if the service is running
if docker-compose ps | grep -q "Up"; then
    echo "✅ AI Voice Agent Server is running!"
    echo "🌐 Server URL: http://localhost:8000"
    echo "🔍 Health Check: http://localhost:8000/health"
    echo "📊 Status: http://localhost:8000/status"
    echo "📝 Logs: docker-compose logs -f ai-voice-agent"
else
    echo "❌ Failed to start services. Check logs with: docker-compose logs"
    exit 1
fi

echo ""
echo "📋 Useful commands:"
echo "  Stop server: docker-compose down"
echo "  View logs: docker-compose logs -f ai-voice-agent"
echo "  Restart: docker-compose restart ai-voice-agent"
echo "  Update: docker-compose pull && docker-compose up -d"
