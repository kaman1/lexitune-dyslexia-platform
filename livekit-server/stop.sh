#!/bin/bash

# LiveKit Server Stop Script
echo "🛑 Stopping LiveKit Server..."

# Stop containers
docker-compose down

echo "✅ LiveKit server stopped"
echo "🧹 To clean up completely: docker-compose down -v"
