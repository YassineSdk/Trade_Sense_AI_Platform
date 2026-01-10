#!/bin/bash

# TradeSense AI - Development Server Script
# This script starts the Vite dev server with proper Node.js environment

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}========================================${NC}"
echo -e "${CYAN}TradeSense AI - Starting Dev Server${NC}"
echo -e "${CYAN}========================================${NC}"
echo ""

# Load NVM
export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
    source "$NVM_DIR/nvm.sh"
else
    echo -e "${YELLOW}Warning: NVM not found. Using system Node.js${NC}"
fi

# Use Node 18 if available
if command -v nvm &> /dev/null; then
    nvm use 18 2>/dev/null || nvm use default 2>/dev/null || true
fi

# Check Node.js is available
if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed!${NC}"
    echo "Please run: bash ../install-node.sh"
    exit 1
fi

NODE_VERSION=$(node -v)
echo -e "${GREEN}✓${NC} Using Node.js ${NODE_VERSION}"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠${NC} node_modules not found. Installing dependencies..."
    npm install
    echo ""
fi

# Start dev server
echo -e "${GREEN}Starting Vite dev server...${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "  ${GREEN}Local:${NC}   http://localhost:3000"
echo -e "  ${GREEN}Network:${NC} use --host to expose"
echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop the server${NC}"
echo ""

# Run dev server
npm run dev
