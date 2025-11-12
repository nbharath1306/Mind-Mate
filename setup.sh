#!/bin/bash

# MindMate Setup Script
# This script helps set up the MindMate development environment

echo "🧠 MindMate Setup Script"
echo "=========================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d. -f1 | sed 's/v//')
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node --version)"
    exit 1
fi

echo "✅ Node.js $(node --version) detected"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
if command -v yarn &> /dev/null; then
    yarn install
else
    npm install
fi

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Create environment file if it doesn't exist
if [ ! -f .env.local ]; then
    echo ""
    echo "🔧 Creating environment configuration..."
    cp .env.local.example .env.local
    echo "✅ Created .env.local from template"
    echo ""
    echo "⚠️  IMPORTANT: Please edit .env.local with your Firebase configuration before running the app"
    echo "   You can get these values from your Firebase project settings"
else
    echo "✅ Environment file already exists"
fi

# Create necessary directories
mkdir -p public/images
mkdir -p lib/utils
mkdir -p components/ui

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Set up a Firebase project at https://console.firebase.google.com"
echo "2. Enable Authentication (Google + Anonymous), Firestore, and Storage"
echo "3. Copy your Firebase config to .env.local"
echo "4. Run 'npm run dev' or 'yarn dev' to start the development server"
echo ""
echo "Happy coding! 🚀"