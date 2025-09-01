#!/bin/bash

# TEKIMAX Thumbnail Generator Script
# This script generates thumbnails from videos in public/hero-video/

echo "🎬 TEKIMAX Thumbnail Generator"
echo "================================"

# Check if FFmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ FFmpeg is not installed. Please install FFmpeg first."
    echo "   Download from: https://ffmpeg.org/download.html"
    exit 1
fi

echo "✅ FFmpeg found: $(ffmpeg -version | head -n1)"

# Create thumbnails directory if it doesn't exist
mkdir -p public/thumbnails

# Check if video directory exists
if [ ! -d "public/hero-video" ]; then
    echo "❌ Video directory not found: public/hero-video"
    exit 1
fi

# Count video files
video_count=$(find public/hero-video -name "*.mp4" -o -name "*.avi" -o -name "*.mov" -o -name "*.mkv" -o -name "*.webm" | wc -l)

if [ $video_count -eq 0 ]; then
    echo "ℹ️  No video files found in public/hero-video/"
    exit 0
fi

echo "🎬 Found $video_count video files"
echo "Generating thumbnails..."

# Generate thumbnails for each video
find public/hero-video -name "*.mp4" -o -name "*.avi" -o -name "*.mov" -o -name "*.mkv" -o -name "*.webm" | while read -r video_file; do
    filename=$(basename "$video_file")
    name_without_ext="${filename%.*}"
    
    # Clean the name for file naming
    clean_name=$(echo "$name_without_ext" | sed 's/[^a-zA-Z0-9\s-]//g' | sed 's/\s\+/-/g' | tr '[:upper:]' '[:lower:]')
    
    output_path="public/thumbnails/${clean_name}.jpg"
    
    echo "🎬 Processing: $filename"
    
    # Extract frame at 2 seconds
    if ffmpeg -i "$video_file" -ss 2 -vframes 1 -q:v 2 "$output_path" -y 2>/dev/null; then
        echo "✅ Thumbnail saved: $output_path"
    else
        echo "❌ Failed to generate thumbnail for: $filename"
    fi
done

echo ""
echo "📊 Thumbnail generation complete!"
echo "Thumbnails saved to: public/thumbnails/"
echo ""
echo "You can now use these thumbnails in your video cards by updating the thumbnail property:"
echo "thumbnail: '/thumbnails/filename.jpg'"
