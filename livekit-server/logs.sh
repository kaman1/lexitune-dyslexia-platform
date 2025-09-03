#!/bin/bash

# LiveKit Server Logs Script
echo "📋 LiveKit Server Logs"
echo "Press Ctrl+C to exit logs view"
echo ""

# Show logs
docker-compose logs -f livekit-server
