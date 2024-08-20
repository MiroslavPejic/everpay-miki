#!/bin/bash

# Define PID files
BACKEND_PID="backend.pid"
FRONTEND_PID="frontend.pid"

# Function to stop the backend application
stop_backend() {
  if [ -f "$BACKEND_PID" ]; then
    echo "Stopping backend application..."
    PID=$(cat "$BACKEND_PID")
    if kill -0 "$PID" > /dev/null 2>&1; then
      kill "$PID"
      sleep 1
      if kill -0 "$PID" > /dev/null 2>&1; then
        echo "Process $PID did not terminate, killing forcefully..."
        kill -9 "$PID"
      fi
    fi
    rm "$BACKEND_PID"
  else
    echo "Backend PID file not found."
  fi
}

# Function to stop the frontend application
stop_frontend() {
  if [ -f "$FRONTEND_PID" ]; then
    echo "Stopping frontend application..."
    PID=$(cat "$FRONTEND_PID")
    if kill -0 "$PID" > /dev/null 2>&1; then
      kill "$PID"
      sleep 1
      if kill -0 "$PID" > /dev/null 2>&1; then
        echo "Process $PID did not terminate, killing forcefully..."
        kill -9 "$PID"
      fi
    fi
    rm "$FRONTEND_PID"
  else
    echo "Frontend PID file not found."
  fi
}

# Stop both applications
stop_backend
stop_frontend

echo "Both applications have been stopped."
