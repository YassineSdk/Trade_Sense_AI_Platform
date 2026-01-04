#!/bin/bash

# TradeSense AI Frontend - Quick Start Script
# This script automates the setup and launch of the frontend application

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Print colored output
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_header() {
    echo -e "${BLUE}"
    echo "╔════════════════════════════════════════╗"
    echo "║                                        ║"
    echo "║      TradeSense AI Frontend            ║"
    echo "║      Quick Start Script                ║"
    echo "║                                        ║"
    echo "╚════════════════════════════════════════╝"
    echo -e "${NC}"
}

# Check if Node.js is installed
check_node() {
    print_info "Checking Node.js installation..."
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed!"
        print_info "Please install Node.js from https://nodejs.org/"
        exit 1
    fi

    NODE_VERSION=$(node -v)
    print_success "Node.js $NODE_VERSION detected"
}

# Check if npm is installed
check_npm() {
    print_info "Checking npm installation..."
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed!"
        exit 1
    fi

    NPM_VERSION=$(npm -v)
    print_success "npm $NPM_VERSION detected"
}

# Install dependencies
install_dependencies() {
    print_info "Installing dependencies..."

    if [ -d "node_modules" ]; then
        print_warning "node_modules already exists. Skipping installation."
        read -p "Do you want to reinstall? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            print_info "Removing old node_modules..."
            rm -rf node_modules package-lock.json
            npm install
            print_success "Dependencies installed successfully!"
        fi
    else
        npm install
        print_success "Dependencies installed successfully!"
    fi
}

# Create .env file if it doesn't exist
create_env() {
    if [ ! -f ".env" ]; then
        print_info "Creating .env file..."
        cat > .env << EOL
# API Configuration
VITE_API_URL=http://localhost:5000
VITE_API_TIMEOUT=10000

# WebSocket Configuration
VITE_WS_URL=ws://localhost:5000

# App Configuration
VITE_APP_NAME=TradeSense AI
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_PARTICLES=true
EOL
        print_success ".env file created!"
    else
        print_warning ".env file already exists. Skipping."
    fi
}

# Start development server
start_dev_server() {
    print_info "Starting development server..."
    print_success "Application will be available at http://localhost:3000"
    print_info "Press Ctrl+C to stop the server"
    echo ""
    npm run dev
}

# Build for production
build_production() {
    print_info "Building for production..."
    npm run build
    print_success "Production build completed! Files are in the 'dist' folder."
}

# Show menu
show_menu() {
    echo ""
    echo "What would you like to do?"
    echo "1) Install dependencies only"
    echo "2) Start development server"
    echo "3) Build for production"
    echo "4) Install dependencies and start dev server"
    echo "5) Exit"
    echo ""
    read -p "Enter your choice (1-5): " choice
}

# Main script
main() {
    clear
    print_header

    # Check prerequisites
    check_node
    check_npm
    echo ""

    # Show menu
    show_menu

    case $choice in
        1)
            install_dependencies
            print_success "Setup complete!"
            ;;
        2)
            if [ ! -d "node_modules" ]; then
                print_warning "Dependencies not installed!"
                install_dependencies
            fi
            create_env
            start_dev_server
            ;;
        3)
            if [ ! -d "node_modules" ]; then
                print_warning "Dependencies not installed!"
                install_dependencies
            fi
            build_production
            ;;
        4)
            install_dependencies
            create_env
            echo ""
            start_dev_server
            ;;
        5)
            print_info "Exiting..."
            exit 0
            ;;
        *)
            print_error "Invalid choice!"
            exit 1
            ;;
    esac
}

# Run main function
main
