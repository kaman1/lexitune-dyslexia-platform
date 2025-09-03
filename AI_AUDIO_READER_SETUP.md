# AI Audio Reader Setup Guide

## 🚀 **What It Does**

The AI Audio Reader converts PDF documents to high-quality audio using AI text-to-speech technology. It follows this process:

1. **📄 Extract Text from PDF**: Uses `pdf-parse` to extract text content
2. **🎤 AI Text-to-Speech**: Converts text to speech using OpenAI's TTS-1 model
3. **💾 Save the Audio**: Generates downloadable audio files

## 🔑 **Required Setup**

### **1. OpenAI API Key**
You need an OpenAI API key to use the AI speech generation:

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Add it to your `.env.local` file:

```bash
OPENAI_API_KEY=your_actual_api_key_here
```

### **2. Install Dependencies**
The required packages are already installed:
- `ai` - AI SDK for speech generation
- `@ai-sdk/openai` - OpenAI provider
- `pdf-parse` - PDF text extraction

## 🎯 **How It Works**

### **PDF Processing Flow**
```
PDF Upload → Text Extraction → AI Speech Generation → Audio Playback
```

### **API Endpoints**
- `POST /api/audio` - Upload and process PDF
- `GET /api/audio` - API information

### **Features**
- **Text Extraction**: Automatically extracts text from any PDF
- **AI Speech**: High-quality text-to-speech using OpenAI TTS-1
- **Fallback Mode**: Works even without API key (text-only)
- **Audio Playback**: Built-in player with controls
- **File Management**: Track all processed documents

## 🎨 **UI Components**

### **Upload Section**
- PDF file picker with validation
- Progress indicators for upload and processing
- Real-time status updates

### **Audio Files List**
- File information (name, size, date)
- Status badges (Processing, Audio Ready, Text Only)
- Audio controls (play, pause, download)
- Extracted text display

### **Status Indicators**
- **Processing**: Yellow badge during AI processing
- **Audio Ready**: Green badge when audio is generated
- **Text Only**: Yellow badge for fallback mode (no API key)

## 🔧 **Configuration Options**

### **TTS Settings**
You can customize the text-to-speech settings in `/app/api/audio/route.ts`:

```typescript
const speech = await generateSpeech({
  model: openai.speech('tts-1'),        // tts-1 or tts-1-hd
  text: extractedText.substring(0, 4000), // Max text length
  voice: 'alloy',                       // alloy, echo, fable, onyx, nova, shimmer
});
```

### **Text Processing**
- **Max Length**: Currently limited to 4000 characters for TTS
- **Language**: Automatically detected from PDF content
- **Format**: Preserves text formatting and structure

## 🚨 **Error Handling**

### **Common Issues**
1. **No API Key**: Falls back to text-only mode
2. **PDF Processing**: Handles corrupted or password-protected PDFs
3. **AI Errors**: Graceful fallback with error details
4. **File Size**: Handles large PDFs with progress indicators

### **Fallback Mode**
When OpenAI API is unavailable:
- ✅ PDF text is still extracted
- ✅ Text is displayed to user
- ❌ No audio generation
- ℹ️ Clear indication of fallback status

## 🧪 **Testing**

### **Test PDFs**
1. **Simple Text**: Basic text documents work best
2. **Complex Layouts**: Tables and images may affect text extraction
3. **Large Files**: Test with various file sizes

### **API Testing**
```bash
# Test the API endpoint
curl -X POST http://localhost:3000/api/audio \
  -F "file=@test.pdf"
```

## 🚀 **Production Deployment**

### **Audio Storage**
Currently returns placeholder URLs. For production:
1. **Cloud Storage**: Save audio files to S3, Azure Blob, etc.
2. **CDN**: Serve audio files from CDN for better performance
3. **Database**: Store file metadata and user associations

### **Rate Limiting**
Consider adding rate limiting for:
- File uploads per user
- API calls per minute
- File size limits

### **Security**
- File type validation (already implemented)
- File size limits
- User authentication
- Content scanning

## 📱 **Mobile Support**

The interface is fully responsive and works on:
- Desktop browsers
- Mobile devices
- Tablets
- Touch interfaces

## 🔮 **Future Enhancements**

### **Planned Features**
- **Batch Processing**: Multiple PDFs at once
- **Voice Selection**: Choose from multiple AI voices
- **Speed Control**: Adjustable playback speed
- **Audio Editing**: Trim, merge, enhance audio
- **Cloud Sync**: Save files across devices

### **AI Improvements**
- **Better Text Processing**: Handle complex layouts
- **Language Detection**: Multi-language support
- **Content Summarization**: AI-generated summaries
- **Smart Chunking**: Intelligent text splitting for long documents

## 📞 **Support**

If you encounter issues:
1. Check the browser console for error logs
2. Verify your OpenAI API key is set correctly
3. Ensure the PDF file is valid and readable
4. Check the API endpoint logs for processing details

---

**Happy PDF-to-Audio converting! 🎵📚**
