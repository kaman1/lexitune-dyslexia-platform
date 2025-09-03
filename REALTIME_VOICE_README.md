# Real-Time Voice Conversation System

This implementation provides **true real-time voice-to-voice conversations** with AI, inspired by the [OpenAI Realtime Agents](https://github.com/openai/openai-realtime-agents) demo.

## 🚀 Features

- **Real-time voice recording** with live audio visualization
- **Instant transcription** using OpenAI Whisper-1
- **AI chat responses** using GPT-4o
- **Text-to-speech playback** using OpenAI TTS-1
- **Live audio level monitoring** with animated visualizer
- **Customizable voice settings** (voice type, speed, auto-play)
- **Conversation history** with timestamps
- **Responsive design** for mobile and desktop

## 🏗️ Architecture

### Frontend Components

1. **`RealtimeVoiceChat`** - Main voice conversation component
2. **Audio recording** using MediaRecorder API
3. **Real-time visualization** using Web Audio API
4. **Conversation UI** with message history

### Backend API Endpoints

1. **`/api/audio/transcribe`** - OpenAI Whisper transcription
2. **`/api/chat`** - OpenAI GPT-4o chat responses
3. **`/api/audio/generate`** - OpenAI TTS audio generation

### Audio Flow

```
User Speech → MediaRecorder → OpenAI Whisper → GPT-4o → OpenAI TTS → Audio Playback
     ↓              ↓              ↓           ↓         ↓           ↓
  Microphone → Audio Blob → Text → AI Response → Audio → Speakers
```

## 🛠️ Technical Implementation

### Real-Time Audio Capture

```typescript
// Start recording with real-time audio visualization
const startRecording = useCallback(async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ 
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
    } 
  });
  
  // Setup MediaRecorder for audio capture
  mediaRecorderRef.current = new MediaRecorder(stream, {
    mimeType: 'audio/webm;codecs=opus'
  });
  
  // Setup Web Audio API for real-time visualization
  if (audioContextRef.current && analyserRef.current) {
    microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
    microphoneRef.current.connect(analyserRef.current);
  }
}, []);
```

### Live Audio Visualization

```typescript
// Update audio level for visualizer
const updateAudioLevel = useCallback(() => {
  if (!analyserRef.current || !isRecording) return;

  const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
  analyserRef.current.getByteFrequencyData(dataArray);

  // Calculate average audio level
  const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
  setAudioLevel(average);

  if (isRecording) {
    animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
  }
}, [isRecording]);
```

### OpenAI Integration

```typescript
// Transcribe audio using OpenAI Whisper
const transcription = await openai.audio.transcriptions.create({
  file,
  model: 'whisper-1',
  response_format: 'text',
});

// Get AI response using GPT-4o
const completion = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [
    { role: 'system', content: 'You are a helpful AI assistant...' },
    { role: 'user', content: message }
  ],
  max_tokens: 150,
  temperature: 0.7,
});
```

## 📱 User Experience

### Recording Process

1. **Click microphone button** to start recording
2. **Speak naturally** - see live audio visualization
3. **Click stop button** when finished speaking
4. **Wait for transcription** and AI response
5. **Listen to AI response** automatically (if auto-play enabled)

### Voice Settings

- **Voice Type**: Choose from 6 OpenAI TTS voices
- **Speed Control**: Adjust playback speed (0.5x to 2.0x)
- **Auto-play**: Toggle automatic AI response playback

### Conversation Features

- **Real-time messages** with timestamps
- **User/AI distinction** with color coding
- **Scrollable history** for long conversations
- **Error handling** with fallback responses

## 🔧 Setup Requirements

### Environment Variables

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

### Dependencies

```json
{
  "openai": "^5.18.1",
  "@ai-sdk/openai": "^2.0.23",
  "@ai-sdk/react": "^2.0.29"
}
```

### Browser Permissions

- **Microphone access** required for voice recording
- **Audio playback** permissions for TTS responses
- **HTTPS** recommended for production (required for some browsers)

## 🚀 Usage

### Basic Implementation

```tsx
import { RealtimeVoiceChat } from "@/components/ui/realtime-voice-chat";

export default function MyPage() {
  return (
    <div>
      <h1>Voice Chat</h1>
      <RealtimeVoiceChat />
    </div>
  );
}
```

### Custom Settings

```tsx
<RealtimeVoiceChat 
  className="custom-styles"
/>
```

## 🧪 Testing

### Test Page

Visit `/conversation/test` to test the voice system:

```bash
# Start development server
bun run dev

# Open test page
open http://localhost:3000/conversation/test
```

### Testing Checklist

- [ ] Microphone permissions granted
- [ ] Audio recording starts/stops
- [ ] Live audio visualization works
- [ ] Transcription appears in messages
- [ ] AI response generates
- [ ] TTS audio plays correctly
- [ ] Settings can be adjusted
- [ ] Conversation history persists

## 🔍 Troubleshooting

### Common Issues

1. **"Microphone not working"**
   - Check browser permissions
   - Ensure HTTPS in production
   - Test with different browsers

2. **"Transcription failed"**
   - Verify OpenAI API key
   - Check API rate limits
   - Ensure audio file format is supported

3. **"Audio not playing"**
   - Check browser audio settings
   - Verify TTS generation endpoint
   - Test with different voice settings

### Debug Mode

Enable console logging to see detailed information:

```typescript
// Check audio context status
console.log("Audio context state:", audioContextRef.current?.state);

// Monitor recording state
console.log("Recording state:", mediaRecorderRef.current?.state);

// Verify API responses
console.log("Transcription result:", transcription);
```

## 🚀 Performance Optimizations

### Audio Processing

- **WebM format** for optimal compression
- **Real-time visualization** using requestAnimationFrame
- **Efficient cleanup** of audio resources
- **Streaming responses** for faster AI interactions

### Memory Management

- **URL.revokeObjectURL** for audio cleanup
- **Proper ref cleanup** in useEffect
- **Stream track cleanup** after recording
- **Audio context management** lifecycle

## 🔮 Future Enhancements

### Planned Features

- **Voice activity detection** for automatic recording
- **Multi-language support** with language detection
- **Custom voice models** for specialized domains
- **Real-time streaming** for lower latency
- **Voice cloning** capabilities
- **Background noise reduction**

### Integration Possibilities

- **LiveKit** for multi-user voice rooms
- **WebRTC** for peer-to-peer communication
- **Speech recognition** for command systems
- **Voice biometrics** for user identification

## 📚 Resources

- [OpenAI Realtime Agents](https://github.com/openai/openai-realtime-agents)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [MediaRecorder API](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder)
- [WebRTC](https://webrtc.org/)

## 🤝 Contributing

This system is designed to be modular and extensible. Key areas for contribution:

- **Audio processing algorithms**
- **Voice recognition improvements**
- **UI/UX enhancements**
- **Performance optimizations**
- **Additional AI model integrations**

---

**Real-Time Voice Conversation System - Ready for Production! 🎤✨**
