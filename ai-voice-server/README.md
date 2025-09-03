# AI Voice Agent Server

A real-time AI voice conversation server built with Python, LiveKit Agents framework, and OpenAI integration. This server provides educational AI assistance with pronunciation practice, reading support, and interactive learning conversations.

## 🚀 Features

- **Real-time Voice Conversations**: WebRTC-based voice communication using LiveKit
- **AI-Powered Responses**: OpenAI integration for intelligent, contextual responses
- **Educational Focus**: Specialized in pronunciation, reading skills, and learning support
- **WebSocket Support**: Real-time bidirectional communication
- **Dockerized**: Easy deployment and scaling
- **Health Monitoring**: Built-in health checks and metrics

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │   AI Voice       │    │   OpenAI        │
│   (Web/App)     │◄──►│   Agent Server   │◄──►│   API           │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌──────────────────┐
                       │   LiveKit        │
                       │   Cloud/Server   │
                       └──────────────────┘
```

## 📋 Prerequisites

- **Docker** and **Docker Compose**
- **OpenAI API Key** with access to GPT-4 and TTS
- **LiveKit Cloud Account** or self-hosted LiveKit server
- **Python 3.11+** (for local development)

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `ai-voice-server` directory:

```bash
# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here

# LiveKit Configuration
LIVEKIT_URL=wss://your-livekit-server.livekit.cloud
LIVEKIT_API_KEY=your_livekit_api_key
LIVEKIT_API_SECRET=your_livekit_api_secret

# Server Configuration
HOST=0.0.0.0
PORT=8000
LOG_LEVEL=INFO
```

### LiveKit Setup

1. **Create LiveKit Cloud Account**: [LiveKit Cloud](https://cloud.livekit.io/)
2. **Get API Credentials**: API Key and Secret from your LiveKit project
3. **Configure WebRTC**: Ensure your domain is configured for WebRTC

## 🚀 Quick Start

### Using Docker (Recommended)

1. **Clone and Navigate**:
   ```bash
   cd ai-voice-server
   ```

2. **Configure Environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

3. **Start the Server**:
   ```bash
   chmod +x start.sh
   ./start.sh
   ```

4. **Verify Installation**:
   ```bash
   curl http://localhost:8000/health
   ```

### Manual Setup

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the Server**:
   ```bash
   python server.py
   ```

## 📡 API Endpoints

### HTTP Endpoints

- **`GET /`** - Server status and information
- **`GET /health`** - Health check endpoint
- **`GET /status`** - Agent configuration status
- **`GET /config`** - Server configuration (non-sensitive)
- **`POST /chat`** - Send chat messages
- **`GET /metrics`** - Server performance metrics

### WebSocket Endpoints

- **`/ws`** - Real-time bidirectional communication

### Example Usage

```bash
# Health check
curl http://localhost:8000/health

# Send chat message
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, can you help me with pronunciation?"}'

# Get server status
curl http://localhost:8000/status
```

## 🔍 Monitoring and Logs

### View Logs

```bash
# Docker logs
docker-compose logs -f ai-voice-agent

# Real-time logs
docker-compose logs -f --tail=100 ai-voice-agent
```

### Health Monitoring

```bash
# Health check
curl http://localhost:8000/health

# Metrics
curl http://localhost:8000/metrics
```

## 🐳 Docker Commands

```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f ai-voice-agent

# Stop services
docker-compose down

# Restart specific service
docker-compose restart ai-voice-agent

# Update and restart
docker-compose pull && docker-compose up -d
```

## 🔧 Development

### Local Development

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Run with Hot Reload**:
   ```bash
   python server.py
   ```

3. **Run Tests** (when implemented):
   ```bash
   python -m pytest tests/
   ```

### Code Structure

```
ai-voice-server/
├── agent.py          # LiveKit agent implementation
├── server.py         # FastAPI server
├── requirements.txt  # Python dependencies
├── Dockerfile        # Docker configuration
├── docker-compose.yml # Docker orchestration
├── .env              # Environment configuration
├── start.sh          # Startup script
└── README.md         # This file
```

## 🔒 Security Considerations

- **Environment Variables**: Never commit `.env` files to version control
- **API Keys**: Rotate OpenAI and LiveKit API keys regularly
- **CORS**: Configure CORS origins appropriately for production
- **Rate Limiting**: Implement rate limiting for production use
- **Authentication**: Add user authentication for production deployments

## 🚀 Production Deployment

### Environment Variables

```bash
# Production settings
LOG_LEVEL=WARNING
HOST=0.0.0.0
PORT=8000
CORS_ORIGINS=https://yourdomain.com
```

### Docker Production

```bash
# Build production image
docker build -t ai-voice-agent:latest .

# Run with production settings
docker run -d \
  --name ai-voice-agent \
  --env-file .env \
  -p 8000:8000 \
  ai-voice-agent:latest
```

### Load Balancer

For high availability, use a load balancer (nginx, HAProxy) in front of multiple agent instances.

## 🐛 Troubleshooting

### Common Issues

1. **Docker Connection Issues**:
   ```bash
   docker system prune -a
   docker-compose down -v
   docker-compose up -d
   ```

2. **Environment Variable Issues**:
   ```bash
   docker-compose config
   # Check for missing or malformed environment variables
   ```

3. **Port Conflicts**:
   ```bash
   # Check what's using port 8000
   lsof -i :8000
   # Change port in docker-compose.yml if needed
   ```

4. **LiveKit Connection Issues**:
   - Verify LiveKit credentials
   - Check network connectivity
   - Ensure WebRTC is enabled

### Debug Mode

```bash
# Run with debug logging
LOG_LEVEL=DEBUG docker-compose up

# Check agent logs
docker-compose logs ai-voice-agent | grep ERROR
```

## 📚 Additional Resources

- [LiveKit Agents Documentation](https://docs.livekit.io/agents/)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Docker Documentation](https://docs.docker.com/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- **Issues**: Create an issue in the repository
- **Documentation**: Check the README and inline code comments
- **LiveKit**: [LiveKit Community](https://github.com/livekit/livekit/discussions)
- **OpenAI**: [OpenAI Help Center](https://help.openai.com/)

---

**Built with ❤️ using LiveKit Agents, OpenAI, and FastAPI**
