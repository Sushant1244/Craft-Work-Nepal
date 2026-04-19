#!/bin/bash

# KalaBazzer Quick Start Script
# This script starts all services: Backend, Admin, and Client

echo "🚀 Starting KalaBazzer Application"
echo "=================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if directories exist
if [ ! -d "Backend" ] || [ ! -d "Admin" ] || [ ! -d "Client" ]; then
  echo -e "${YELLOW}⚠️  Some directories are missing. Please run this script from the project root.${NC}"
  exit 1
fi

# Function to start a service
start_service() {
  local service=$1
  local port=$2
  echo -e "${BLUE}Starting $service...${NC}"
  cd "$service"
  
  # Check if node_modules exists, install if not
  if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing dependencies for $service...${NC}"
    npm install
  fi
  
  if [ "$service" = "Backend" ]; then
    echo -e "${GREEN}✓ Backend will run on port 4000${NC}"
    npm run dev &
  else
    echo -e "${GREEN}✓ $service will run on port $port${NC}"
    npm run dev &
  fi
  
  cd ..
  sleep 2
}

# Start all services
start_service "Backend" 4000
start_service "Admin" 5173
start_service "Client" 5174

echo ""
echo -e "${GREEN}=================================="
echo "✅ All services started!"
echo "==================================${NC}"
echo ""
echo -e "${BLUE}Services running at:${NC}"
echo "  Backend:  http://localhost:4000"
echo "  Admin:    http://localhost:5173"
echo "  Client:   http://localhost:5174"
echo ""
echo -e "${YELLOW}API Base URL: http://localhost:4000/api${NC}"
echo ""
echo -e "${BLUE}Admin Login Credentials:${NC}"
echo "  Email: admin@example.com"
echo "  Password: admin123"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop all services${NC}"
echo ""

# Wait for all background processes
wait
