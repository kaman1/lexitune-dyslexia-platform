# LiveKit Server - Local Development Setup

This directory contains everything you need to run a LiveKit server locally for testing real-time audio functionality.

## 🚀 Quick Start

### 1. **Prerequisites**
- Docker and Docker Compose installed
- Ports 7880, 7881, and 50000-50100 available

### 2. **Start the Server**
```bash
./start.sh
```

### 3. **Stop the Server**
```bash
./stop.sh
```

### 4. **View Logs**
```bash
./logs.sh
```

## 📁 Files

- **`livekit.yaml`** - LiveKit server configuration
- **`docker-compose.yml`** - Docker orchestration
- **`start.sh`** - Startup script
- **`stop.sh`** - Shutdown script
- **`logs.sh`** - Log viewing script

## ⚙️ Configuration

### Server Settings
- **Port**: 7880 (HTTP/WebSocket)
- **TCP Port**: 7881
- **RTP Ports**: 50000-50100 (UDP)
- **API Key**: `devkey`
- **API Secret**: `secret`

### Features Enabled
- ✅ Local file recording
- ✅ Audio optimization
- ✅ Room auto-creation
- ✅ Participant management
- ❌ TURN server (not needed for local testing)
- ❌ Redis persistence (not needed for local testing)

## 🧪 Testing

### 1. **Start the Server**
```bash
cd livekit-server
./start.sh
```

### 2. **Test in Browser**
- Go to `/audio/test` in your app
- Switch to "LiveKit Audio" tab
- Enter room name and participant name
- Click "Connect to Room"
- Test microphone and audio controls

### 3. **Multiple Participants**
- Open multiple browser tabs/windows
- Connect to the same room name
- Test audio between participants

## 🔧 Troubleshooting

### Common Issues

**Docker not running**
```bash
# Start Docker Desktop or Docker daemon
open -a Docker  # macOS
sudo systemctl start docker  # Linux
```

**Ports already in use**
```bash
# Check what's using the ports
lsof -i :7880
lsof -i :7881

# Kill processes if needed
kill -9 <PID>
```

**Server won't start**
```bash
# Check logs
./logs.sh

# Restart Docker
docker system prune -a
./start.sh
```

### Reset Everything
```bash
# Stop and remove all containers
docker-compose down -v

# Remove all images
docker system prune -a

# Start fresh
./start.sh
```

## 🌐 Network Configuration

### Local Development
- **Server URL**: `ws://localhost:7880`
- **HTTP URL**: `http://localhost:7880`
- **Health Check**: `http://localhost:7880/health`

### External Access (Optional)
To allow external devices to connect:

1. **Update `livekit.yaml`**:
```yaml
rtc:
  use_external_ip: true
  # Add your external IP
```

2. **Port Forward**:
   - Forward ports 7880, 7881, and 50000-50100
   - Update firewall rules

## 📊 Monitoring

### Health Check
```bash
curl http://localhost:7880/health
```

### Room Status
```bash
curl http://localhost:7880/twirp/livekit.RoomService/ListRooms
```

### Participant Count
```bash
curl http://localhost:7880/twirp/livekit.RoomService/ListParticipants
```

## 🔐 Security Notes

⚠️ **Development Only**: This setup uses default keys (`devkey: secret`) and is NOT secure for production.

**For Production**:
- Generate strong API keys
- Enable JWT authentication
- Use HTTPS/WSS
- Configure TURN server
- Enable Redis persistence
- Set up proper logging

## 📚 Resources

- [LiveKit Documentation](https://docs.livekit.io/)
- [LiveKit GitHub](https://github.com/livekit/livekit)
- [LiveKit Cloud](https://livekit.io/cloud) (Production hosting)
- [WebRTC Documentation](https://webrtc.org/)

## 🎯 Next Steps

1. **Test basic functionality** with the test page
2. **Integrate with your app** using the LiveKit client
3. **Add video support** if needed
4. **Implement room management** features
5. **Add recording capabilities** for meetings

---

**Happy coding! 🎉**
