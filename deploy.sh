#!/bin/bash

# Moonrider Dashboard - Deployment Script
# This script helps prepare your project for Vercel deployment

echo "🚀 Moonrider Dashboard - Deployment Preparation"
echo "=============================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

echo "✅ Found package.json"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run linting
echo "🔍 Running linter..."
npm run lint

# Run tests
echo "🧪 Running tests..."
npm run test

# Build the project
echo "🏗️  Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🎉 Your project is ready for deployment!"
    echo ""
    echo "Next steps:"
    echo "1. Push your code to GitHub/GitLab/Bitbucket"
    echo "2. Connect your repository to Vercel"
    echo "3. Set up environment variables in Vercel dashboard"
    echo "4. Deploy!"
    echo ""
    echo "📖 See DEPLOYMENT.md for detailed instructions"
else
    echo "❌ Build failed. Please fix the errors before deploying."
    exit 1
fi
