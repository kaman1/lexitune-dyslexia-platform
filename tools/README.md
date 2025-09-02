# TEKIMAX Tools

This directory contains development tools for the TEKIMAX website.

## 🎬 Thumbnail Generator

The thumbnail generator extracts thumbnails from video files and saves them to `public/thumbnails/`.

### Prerequisites

- **FFmpeg** must be installed on your system
- Download from: https://ffmpeg.org/download.html

### Installation

1. Install FFmpeg on your system
2. Verify installation: `ffmpeg -version`

### Usage

#### Generate thumbnails for all videos:
```bash
cd tools
npm run generate-thumbnails
```

#### Generate thumbnail for specific video:
```bash
cd tools
npm run generate-thumbnail
node thumbnail-generator.js <video-path> <output-name> [time-in-seconds]
```

#### Examples:
```bash
# Generate thumbnails for all videos in public/hero-video/
npm run generate-thumbnails

# Generate thumbnail for specific video at 5 seconds
node thumbnail-generator.js ../public/hero-video/video.mp4 my-video 5

# Test if FFmpeg is working
npm run test-ffmpeg
```

### How it works

1. **Scans** `public/hero-video/` for video files
2. **Extracts** a frame at 2 seconds (default) from each video
3. **Saves** thumbnails as JPG files in `public/thumbnails/`
4. **Generates** a summary file with all mappings

### Output

- Thumbnails saved to: `public/thumbnails/`
- Summary file: `public/thumbnails/thumbnails-summary.json`
- File naming: Video names converted to lowercase with hyphens

### Supported video formats

- MP4, AVI, MOV, MKV, WebM

### Customization

You can modify the thumbnail generation settings in the code:
- **Time**: Change default frame extraction time (currently 2 seconds)
- **Quality**: Adjust JPG quality (currently 2, lower = better)
- **Dimensions**: Set custom thumbnail dimensions
- **Format**: Change output format (currently JPG)

### Troubleshooting

- **FFmpeg not found**: Install FFmpeg and ensure it's in your PATH
- **Permission errors**: Check file permissions for video and output directories
- **Empty thumbnails**: Verify video files are not corrupted
- **Memory issues**: Process videos one by one for large files
