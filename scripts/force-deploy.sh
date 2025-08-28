#!/bin/bash

# Script to fix linting issues and deploy to Cloudflare Pages
echo "🚀 Starting deployment process..."

# Run lint fixes
echo "✅ Fixing linting issues..."
pnpm lint:fix-all

# Generate sitemap and build
echo "📦 Building website..."
node scripts/generate-sitemap.js 
pnpm next-on-pages

# Deploy to Cloudflare Pages
echo "🚀 Deploying to Cloudflare Pages..."
wrangler pages deploy

echo "✨ Deployment complete!" 