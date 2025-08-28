import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

// Here we use the @cloudflare/next-on-pages next-dev module to allow us to use bindings during local development
// (when running the application with `next dev`), for more information see:
// https://github.com/cloudflare/next-on-pages/blob/main/internal-packages/next-dev/README.md
if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

// Enable bundle analyzer in analyze mode
const withBundleAnalyzer = process.env.ANALYZE === 'true' 
  ? (config) => {
      // Create a custom bundle analyzer without needing the package
      config.webpack = (webpackConfig, options) => {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
        webpackConfig.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerPort: 8888,
            openAnalyzer: true,
          })
        );
        return webpackConfig;
      };
      return config;
    }
  : (config) => config;

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer, dev }) => {
    // Polyfill Node.js modules for client-side
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: 'crypto-browserify',
        stream: 'stream-browserify',
        buffer: 'buffer',
        util: 'util',
        path: 'path-browserify',
        os: 'os-browserify/browser',
        fs: false,
        net: false,
        tls: false,
      };

      // Add buffer polyfill
      config.plugins.push(
        new config.plugins.constructor.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser',
        }),
      );
    }

    return config;
  },
  images: {
    unoptimized: true, // Disable image optimization for Cloudflare compatibility
    remotePatterns: [
      {
        hostname: "acoustic-mule-831.convex.cloud",
      },
      {
        hostname: "pub-9600f55417584cf9a57e33dd44cb33af.r2.dev",
      },
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "tekimax-website.s3.us-east-2.amazonaws.com",
        protocol: "https",
        pathname: "/**",
      },
      {
        hostname: "images.crunchbase.com",
        protocol: "https",
        pathname: "/**",
      },
      {
        hostname: "encrypted-tbn0.gstatic.com",
        protocol: "https",
        pathname: "/**",
      },
      {
        hostname: "startupstack.com",
        protocol: "https",
        pathname: "/**",
      },
      {
        hostname: "s3.tekimax.com",
        protocol: "https",
        pathname: "/**",
      },
      {
        hostname: "atamel.dev",
        protocol: "https",
        pathname: "/**",
      },
    ],
    // Enable modern image formats
    formats: ['image/avif', 'image/webp'],
    // Enable responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Disable image caching
    minimumCacheTTL: 0,
  },
  // Add compression
  compress: true,
  // Optimize for faster startup
  reactStrictMode: true,
  // Experimental optimizations
  experimental: {
    // Improve loading of third-party scripts
    optimizeCss: true,
  },
  // Disable type checking in production
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withBundleAnalyzer(nextConfig);