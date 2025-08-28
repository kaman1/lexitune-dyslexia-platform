// Polyfills for client-side Node modules
const webpack = require('webpack');
const path = require('node:path');

const nextConfig = {
  webpack: (config, { isServer, dev }) => {
    // Polyfill Node.js modules for client-side
    if (!isServer) {
      // Add aliases for Node.js core modules
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('buffer'),
        util: require.resolve('util'),
        path: require.resolve('path-browserify'),
        os: require.resolve('os-browserify/browser'),
        fs: false,
        net: false,
        tls: false,
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        zlib: require.resolve('browserify-zlib'),
        assert: require.resolve('assert'),
        url: require.resolve('url'),
      };

      // Add buffer polyfill
      config.plugins.push(
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser',
          crypto: 'crypto-browserify',
        }),
      );

      // Add specific environment variables to help with crypto polyfill
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.NODE_DEBUG': JSON.stringify(''),
        })
      );

      // Create direct alias for WorkOS cryptography modules to our browser-compatible versions
      config.resolve.alias = {
        ...config.resolve.alias,
        // Make sure crypto-browserify is used for any crypto import
        crypto: require.resolve('crypto-browserify'),
        // Target specific WorkOS paths
        '@workos-inc/node/lib/vault/cryptography/decrypt.js': path.resolve(__dirname, 'lib/polyfills/workos-decrypt.js'),
        '@workos-inc/node/lib/vault/cryptography/encrypt.js': path.resolve(__dirname, 'lib/polyfills/workos-encrypt.js'),
      };

      // WorkOS specific handling - add direct node polyfills for specific modules
      if (config.plugins) {
        // Add a more specific rule first for the exact module that's having issues
        config.plugins.unshift(
          new webpack.NormalModuleReplacementPlugin(
            /node_modules\/@workos-inc\/node\/lib\/vault\/cryptography\/decrypt\.js$/,
            path.resolve(__dirname, 'lib/polyfills/workos-decrypt.js')
          ),
          new webpack.NormalModuleReplacementPlugin(
            /node_modules\/@workos-inc\/node\/lib\/vault\/cryptography\/encrypt\.js$/,
            path.resolve(__dirname, 'lib/polyfills/workos-encrypt.js')
          )
        );
        
        config.plugins.push(
          new webpack.NormalModuleReplacementPlugin(
            /node:crypto|^crypto$/,
            require.resolve('crypto-browserify')
          ),
          new webpack.NormalModuleReplacementPlugin(
            /@workos-inc\/node\/lib\/vault\/cryptography\/decrypt\.js$/,
            path.resolve(__dirname, 'lib/polyfills/workos-decrypt.js')
          ),
          new webpack.NormalModuleReplacementPlugin(
            /@workos-inc\/node\/lib\/vault\/cryptography\/encrypt\.js$/,
            path.resolve(__dirname, 'lib/polyfills/workos-encrypt.js')
          ),
          new webpack.NormalModuleReplacementPlugin(
            /node:https|^https$/,
            require.resolve('https-browserify')
          ),
          new webpack.NormalModuleReplacementPlugin(
            /node:http|^http$/,
            require.resolve('stream-http')
          ),
          new webpack.NormalModuleReplacementPlugin(
            /node:buffer|^buffer$/,
            require.resolve('buffer/')
          ),
          new webpack.NormalModuleReplacementPlugin(
            /node:stream|^stream$/,
            require.resolve('stream-browserify')
          ),
          new webpack.NormalModuleReplacementPlugin(
            /node:util|^util$/,
            require.resolve('util/')
          ),
          new webpack.NormalModuleReplacementPlugin(
            /node:path|^path$/,
            require.resolve('path-browserify')
          ),
          new webpack.NormalModuleReplacementPlugin(
            /node:os|^os$/,
            require.resolve('os-browserify/browser')
          ),
          new webpack.NormalModuleReplacementPlugin(
            /node:zlib|^zlib$/,
            require.resolve('browserify-zlib')
          ),
          new webpack.NormalModuleReplacementPlugin(
            /node:assert|^assert$/,
            require.resolve('assert/')
          )
        );
      }
    }

    return config;
  },
  images: {
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
        hostname: "plus.unsplash.com",
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
      {
        hostname: "github.com",
        protocol: "https",
        pathname: "/**",
      },
      {
        hostname: "cloudflare.com",
        protocol: "https",
        pathname: "/**",
      },
      {
        hostname: "plus.unsplash.com",
        protocol: "https",
        pathname: "/**",
      },
      {
        hostname: "lh3.googleusercontent.com",
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
  // Add headers for security (removed cache busting)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate, max-age=0',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
    ];
  },
  // Experimental optimizations
  experimental: {
    // Improve loading of third-party scripts
    optimizeCss: true
  },
  eslint: {
    // Set this to false to prevent checking for errors on build
    // This is useful when you want to deploy despite linting errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Set this to false to prevent TypeScript errors from failing the build
    // This is useful when you want to deploy despite TypeScript errors
    ignoreBuildErrors: true,
  },
  // Add more performance optimizations
  // Remove swcMinify option
  poweredByHeader: false, // Remove X-Powered-By header
};

// Enable bundle analyzer in analyze mode
if (process.env.ANALYZE === 'true') {
  const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
  if (!nextConfig.webpack) {
    nextConfig.webpack = (config) => config;
  }
  
  const originalWebpack = nextConfig.webpack;
  nextConfig.webpack = (webpackConfig, options) => {
    const modifiedConfig = originalWebpack(webpackConfig, options);
    if (!options.isServer) {
      modifiedConfig.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: 8888,
          openAnalyzer: true,
        })
      );
    }
    return modifiedConfig;
  };
}

// Configure Cloudflare Pages dev platform if needed
if (process.env.NODE_ENV === 'development') {
  try {
    const { setupDevPlatform } = require('@cloudflare/next-on-pages/next-dev');
    setupDevPlatform();
  } catch (error) {
    console.warn('Failed to setup Cloudflare dev platform:', error.message);
  }
}

module.exports = nextConfig;