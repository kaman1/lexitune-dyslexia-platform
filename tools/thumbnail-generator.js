#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Thumbnail Generator Tool
 * Extracts thumbnails from video files and saves them to public/thumbnails/
 * 
 * Requirements:
 * - ffmpeg must be installed on the system
 * - Video files should be in public/hero-video/ or similar folder
 */

class ThumbnailGenerator {
  constructor() {
    this.thumbnailsDir = path.join(process.cwd(), 'public', 'thumbnails');
    this.videoDir = path.join(process.cwd(), '..', 'public', 'hero-video');
    this.ensureDirectories();
  }

  ensureDirectories() {
    if (!fs.existsSync(this.thumbnailsDir)) {
      fs.mkdirSync(this.thumbnailsDir, { recursive: true });
      console.log('✅ Created thumbnails directory');
    }
  }

  /**
   * Check if ffmpeg is available
   */
  checkFFmpeg() {
    try {
      execSync('ffmpeg -version', { stdio: 'ignore' });
      return true;
    } catch (error) {
      console.error('❌ FFmpeg is not installed or not in PATH');
      console.error('Please install FFmpeg: https://ffmpeg.org/download.html');
      return false;
    }
  }

  /**
   * Generate thumbnail from video file
   * @param {string} videoPath - Path to video file
   * @param {string} outputName - Name for the thumbnail (without extension)
   * @param {number} time - Time in seconds to extract frame (default: 1)
   */
  generateThumbnail(videoPath, outputName, time = 1) {
    if (!this.checkFFmpeg()) {
      return null;
    }

    try {
      const outputPath = path.join(this.thumbnailsDir, `${outputName}.jpg`);
      
      // FFmpeg command to extract frame at specified time
      const command = `ffmpeg -i "${videoPath}" -ss ${time} -vframes 1 -q:v 2 "${outputPath}" -y`;
      
      console.log(`🎬 Generating thumbnail for: ${path.basename(videoPath)}`);
      execSync(command, { stdio: 'pipe' });
      
      if (fs.existsSync(outputPath)) {
        console.log(`✅ Thumbnail saved: ${outputPath}`);
        return outputPath;
      } else {
        console.error(`❌ Failed to generate thumbnail for: ${videoPath}`);
        return null;
      }
    } catch (error) {
      console.error(`❌ Error generating thumbnail for ${videoPath}:`, error.message);
      return null;
    }
  }

  /**
   * Generate thumbnails for all videos in the video directory
   */
  generateAllThumbnails() {
    if (!this.checkFFmpeg()) {
      return;
    }

    if (!fs.existsSync(this.videoDir)) {
      console.error(`❌ Video directory not found: ${this.videoDir}`);
      return;
    }

    const videoFiles = fs.readdirSync(this.videoDir)
      .filter(file => /\.(mp4|avi|mov|mkv|webm)$/i.test(file));

    if (videoFiles.length === 0) {
      console.log('ℹ️  No video files found in video directory');
      return;
    }

    console.log(`🎬 Found ${videoFiles.length} video files`);
    console.log('Generating thumbnails...\n');

    const results = [];
    
    videoFiles.forEach((videoFile, index) => {
      const videoPath = path.join(this.videoDir, videoFile);
      const videoName = path.parse(videoFile).name;
      
      // Clean the name for file naming
      const cleanName = videoName
        .replace(/[^a-zA-Z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .toLowerCase();
      
      const thumbnailPath = this.generateThumbnail(videoPath, cleanName, 2);
      
      if (thumbnailPath) {
        results.push({
          video: videoFile,
          thumbnail: `thumbnails/${cleanName}.jpg`,
          name: cleanName
        });
      }
      
      // Add a small delay between processing
      if (index < videoFiles.length - 1) {
        setTimeout(() => {}, 100);
      }
    });

    console.log('\n📊 Thumbnail Generation Summary:');
    console.log('================================');
    
    if (results.length > 0) {
      results.forEach(result => {
        console.log(`✅ ${result.video} → ${result.thumbnail}`);
      });
      
      // Generate a summary file
      this.generateSummaryFile(results);
    } else {
      console.log('❌ No thumbnails were generated successfully');
    }
  }

  /**
   * Generate a summary file with all thumbnail mappings
   */
  generateSummaryFile(results) {
    const summaryPath = path.join(this.thumbnailsDir, 'thumbnails-summary.json');
    const summary = {
      generated: new Date().toISOString(),
      total: results.length,
      thumbnails: results
    };

    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
    console.log(`\n📝 Summary saved to: ${summaryPath}`);
  }

  /**
   * Generate thumbnail for a specific video with custom settings
   */
  generateCustomThumbnail(videoPath, outputName, options = {}) {
    const {
      time = 1,
      width = 640,
      height = 360,
      quality = 2
    } = options;

    if (!this.checkFFmpeg()) {
      return null;
    }

    try {
      const outputPath = path.join(this.thumbnailsDir, `${outputName}.jpg`);
      
      // FFmpeg command with custom dimensions and quality
      const command = `ffmpeg -i "${videoPath}" -ss ${time} -vframes 1 -s ${width}x${height} -q:v ${quality} "${outputPath}" -y`;
      
      console.log(`🎬 Generating custom thumbnail: ${width}x${height}, quality: ${quality}`);
      execSync(command, { stdio: 'pipe' });
      
      if (fs.existsSync(outputPath)) {
        console.log(`✅ Custom thumbnail saved: ${outputPath}`);
        return outputPath;
      }
    } catch (error) {
      console.error(`❌ Error generating custom thumbnail:`, error.message);
    }
    
    return null;
  }
}

// CLI Usage
if (require.main === module) {
  const generator = new ThumbnailGenerator();
  
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    // Generate thumbnails for all videos
    generator.generateAllThumbnails();
  } else if (args.length >= 2) {
    // Generate thumbnail for specific video
    const [videoPath, outputName, time] = args;
    generator.generateThumbnail(videoPath, outputName, parseInt(time) || 1);
  } else {
    console.log('Usage:');
    console.log('  node thumbnail-generator.js                    # Generate thumbnails for all videos');
    console.log('  node thumbnail-generator.js <video> <name> [time]  # Generate thumbnail for specific video');
    console.log('');
    console.log('Examples:');
    console.log('  node thumbnail-generator.js');
    console.log('  node thumbnail-generator.js public/hero-video/video.mp4 my-video 5');
  }
}

module.exports = ThumbnailGenerator;
