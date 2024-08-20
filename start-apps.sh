#!/bin/bash

# Define log files
BACKEND_LOG="backend.log"
FRONTEND_LOG="frontend.log"

# Function to start the backend application
start_backend() {
  echo "Starting backend application..."
  cd backend || exit
  npm install
  npm run start:dev > "../$BACKEND_LOG" 2>&1 &
  echo $! > ../backend.pid
}

# Function to start the frontend application
start_frontend() {
  echo "Starting frontend application..."
  cd ../frontend || exit
  npm install
  npm start > "../$FRONTEND_LOG" 2>&1 &
  echo $! > ../frontend.pid
}

# Start both applications
start_backend
start_frontend

echo "Both applications are running in the background."
