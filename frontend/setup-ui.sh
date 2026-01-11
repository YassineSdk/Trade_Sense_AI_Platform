#!/bin/bash

# TradeSense AI Platform - UI Transformation Setup Script
# This script sets up Node.js and installs frontend dependencies

set -e  # Exit on error

echo "=========================================="
echo "TradeSense AI - UI Transformation Setup"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: package.json not found!${NC}"
    echo "Please run this script from the frontend directory:"
    echo "  cd frontend"
    echo "  bash setup-ui.sh"
    exit 1
fi

echo -e "${GREEN}✓${NC} Found package.json"
echo ""

# Check if Node.js is installed
echo "Checking Node.js installation..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓${NC} Node.js is installed: $NODE_VERSION"

    # Check if version is 18 or higher
    MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$MAJOR_VERSION" -lt 18 ]; then
        echo -e "${YELLOW}⚠${NC} Node.js version 18+ is recommended"
        echo "Current version: $NODE_VERSION"
        echo ""
        read -p "Continue anyway? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
else
    echo -e "${RED}✗${NC} Node.js is not installed"
    echo ""
    echo "Please install Node.js 18+ using one of these methods:"
    echo ""
    echo "Option 1: Using NVM (Recommended - no sudo required):"
    echo "  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash"
    echo "  source ~/.bashrc  # or source ~/.zshrc if using zsh"
    echo "  nvm install 18"
    echo "  nvm use 18"
    echo ""
    echo "Option 2: Direct installation:"
    echo "  Visit: https://nodejs.org/en/download/"
    echo ""
    exit 1
fi

# Check if npm is installed
echo "Checking npm installation..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✓${NC} npm is installed: v$NPM_VERSION"
else
    echo -e "${RED}✗${NC} npm is not installed"
    exit 1
fi

echo ""
echo "=========================================="
echo "Installing Dependencies"
echo "=========================================="
echo ""

# Install dependencies
echo "Running: npm install"
echo "This may take a few minutes..."
echo ""

if npm install; then
    echo ""
    echo -e "${GREEN}✓${NC} Dependencies installed successfully!"
else
    echo ""
    echo -e "${RED}✗${NC} Failed to install dependencies"
    exit 1
fi

echo ""
echo "=========================================="
echo "Verifying Installation"
echo "=========================================="
echo ""

# Check critical dependencies
echo "Checking critical packages..."

PACKAGES=(
    "react"
    "react-dom"
    "react-router-dom"
    "tailwindcss"
    "vite"
    "typescript"
    "clsx"
    "tailwind-merge"
)

ALL_OK=true
for package in "${PACKAGES[@]}"; do
    if npm list "$package" --depth=0 &> /dev/null; then
        echo -e "${GREEN}✓${NC} $package"
    else
        echo -e "${RED}✗${NC} $package (missing)"
        ALL_OK=false
    fi
done

if [ "$ALL_OK" = false ]; then
    echo ""
    echo -e "${RED}Some packages are missing!${NC}"
    echo "Try running: npm install"
    exit 1
fi

echo ""
echo "=========================================="
echo "Setup Complete!"
echo "=========================================="
echo ""
echo -e "${GREEN}✓${NC} All dependencies installed"
echo -e "${GREEN}✓${NC} UI component library ready"
echo -e "${GREEN}✓${NC} Design system configured"
echo ""
echo "Next steps:"
echo ""
echo "1. Start the development server:"
echo -e "   ${YELLOW}npm run dev${NC}"
echo ""
echo "2. Open your browser to:"
echo -e "   ${YELLOW}http://localhost:3000${NC}"
echo ""
echo "3. Read the transformation guide:"
echo -e "   ${YELLOW}cat UI_TRANSFORMATION_GUIDE.md${NC}"
echo ""
echo "Available commands:"
echo "  npm run dev          - Start development server"
echo "  npm run build        - Build for production"
echo "  npm run preview      - Preview production build"
echo "  npm run lint         - Run ESLint"
echo "  npm run type-check   - Check TypeScript types"
echo "  npm run test         - Run tests"
echo ""
echo "Happy coding! 🚀"
echo ""
