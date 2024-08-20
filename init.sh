#!/bin/bash

# Define the paths to your frontend and backend directories
FRONTEND_DIR="./frontend"
BACKEND_DIR="./backend"

# Define the content for the .env files
FRONTEND_ENV_CONTENT="
# Frontend Environment Variables
REACT_APP_SUPABASE_URL=https://zxobgwyjqvjsvtiyzfgt.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4b2Jnd3lqcXZqc3Z0aXl6Zmd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQxNDA3NzMsImV4cCI6MjAzOTcxNjc3M30.WgoAmgMzHHeAQnC21DKrKkIPTvuC4Q1mfEKw8kJx5r4
"

BACKEND_ENV_CONTENT="
# Backend Environment Variables
SUPABASE_URL=https://zxobgwyjqvjsvtiyzfgt.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4b2Jnd3lqcXZqc3Z0aXl6Zmd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQxNDA3NzMsImV4cCI6MjAzOTcxNjc3M30.WgoAmgMzHHeAQnC21DKrKkIPTvuC4Q1mfEKw8kJx5r4
"

# Create .env files with the defined content

# Create .env file in the frontend directory
mkdir -p $FRONTEND_DIR
echo "$FRONTEND_ENV_CONTENT" > $FRONTEND_DIR/.env
echo ".env file created in $FRONTEND_DIR"

# Create .env file in the backend directory
mkdir -p $BACKEND_DIR
echo "$BACKEND_ENV_CONTENT" > $BACKEND_DIR/.env
echo ".env file created in $BACKEND_DIR"

echo "Both .env files have been created successfully."
