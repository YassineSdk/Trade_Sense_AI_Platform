#!/bin/bash

# TradeSense AI - Node.js Installation Script for WSL
# This script installs Node.js 18 using NVM inside WSL

set -e

echo "============================================"
echo "TradeSense AI - Node.js Installation"
echo "============================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Load NVM
export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
    echo -e "${GREEN}✓${NC} Loading NVM..."
    source "$NVM_DIR/nvm.sh"
else
    echo -e "${RED}✗${NC} NVM not found. Installing NVM first..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    source "$NVM_DIR/nvm.sh"
fi

# Check if Node 18 is already installed
if nvm list | grep -q "v18"; then
    echo -e "${YELLOW}⚠${NC} Node.js 18 is already installed"
    nvm use 18
else
    echo -e "${GREEN}Installing Node.js 18...${NC}"
    nvm install 18
    nvm use 18
fi

# Verify installation
NODE_VERSION=$(node -v)
NPM_VERSION=$(npm -v)

echo ""
echo "============================================"
echo -e "${GREEN}✓${NC} Node.js installed successfully!"
echo "============================================"
echo ""
echo "Node.js version: $NODE_VERSION"
echo "npm version: $NPM_VERSION"
echo ""
echo "Next steps:"
echo "1. Run: source ~/.bashrc"
echo "2. Run: cd frontend"
echo "3. Run: npm install"
echo "4. Run: npm run dev"
echo ""
