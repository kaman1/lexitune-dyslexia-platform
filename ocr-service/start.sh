#!/bin/bash

echo "🚀 Starting OCR Microservice..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker and Docker Compose are available"

# Create necessary directories
mkdir -p uploads temp

# Build and start the service
echo "🔨 Building OCR service..."
docker-compose build

echo "🚀 Starting OCR service..."
docker-compose up -d

# Wait for service to be ready
echo "⏳ Waiting for OCR service to be ready..."
for i in {1..30}; do
    if curl -f http://localhost:8000/health > /dev/null 2>&1; then
        echo "✅ OCR service is ready!"
        echo "🌐 Service URL: http://localhost:8000"
        echo "📚 API Documentation: http://localhost:8000/docs"
        echo "🔍 Health Check: http://localhost:8000/health"
        echo "🌍 Languages: http://localhost:8000/languages"
        break
    fi
    
    if [ $i -eq 30 ]; then
        echo "❌ OCR service failed to start within 30 seconds"
        echo "📋 Checking logs..."
        docker-compose logs ocr-service
        exit 1
    fi
    
    echo "⏳ Waiting... ($i/30)"
    sleep 1
done

echo ""
echo "🎉 OCR Microservice is running successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Test the service: curl http://localhost:8000/health"
echo "2. View logs: docker-compose logs -f ocr-service"
echo "3. Stop service: docker-compose down"
echo "4. Restart service: docker-compose restart"
echo ""
echo "🔗 Integration:"
echo "- Your Next.js app can now use /api/ocr endpoint"
echo "- Set OCR_SERVICE_URL=http://localhost:8000 in your .env.local"
echo ""
