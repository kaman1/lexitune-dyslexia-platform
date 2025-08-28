import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Checks if the current device is mobile based on user agent or screen width
 * @returns {boolean} True if the device is mobile
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check using screen width
  const isMobileWidth = window.innerWidth < 768;
  
  // Check using user agent
  const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  
  return isMobileWidth || isMobileUserAgent;
}

/**
 * Get optimized image size based on device type
 * @param {string} mobileUrl - URL for mobile devices
 * @param {string} desktopUrl - URL for desktop devices
 * @returns {string} The appropriate image URL
 */
export function getResponsiveImageUrl(mobileUrl: string, desktopUrl: string): string {
  return isMobileDevice() ? mobileUrl : desktopUrl;
}

/**
 * Calculate aspect ratio for responsive elements
 * @param {number} width - Original width
 * @param {number} height - Original height
 * @returns {number} The aspect ratio as a percentage (for padding-bottom)
 */
export function calculateAspectRatio(width: number, height: number): number {
  return (height / width) * 100;
}

/**
 * Get image dimensions for optimized loading
 * @param {boolean} isMobile - Whether the current device is mobile
 * @param {object} dimensions - Original image dimensions
 * @returns {object} Optimized dimensions
 */
export function getOptimizedImageDimensions(
  isMobile: boolean,
  dimensions: { width: number; height: number }
): { width: number; height: number } {
  if (isMobile) {
    // Return smaller dimensions for mobile
    return {
      width: Math.min(dimensions.width, 640),
      height: Math.round((Math.min(dimensions.width, 640) / dimensions.width) * dimensions.height),
    };
  }
  
  return dimensions;
}

/**
 * Generate srcSet for responsive images
 * @param {string} baseUrl - Base URL of the image
 * @param {number[]} widths - Array of widths to generate
 * @returns {string} The srcSet string
 */
export function generateSrcSet(baseUrl: string, widths: number[] = [320, 640, 768, 1024, 1280, 1536]): string {
  if (!baseUrl) return '';
  
  // For remote images without size parameters, return empty string
  if (baseUrl.startsWith('http') && !baseUrl.includes('?')) return '';
  
  // For local images
  const extension = baseUrl.split('.').pop();
  const basePath = baseUrl.substring(0, baseUrl.lastIndexOf('.'));
  
  return widths
    .map(width => `${basePath}-${width}.${extension} ${width}w`)
    .join(', ');
}
