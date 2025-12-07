#!/bin/bash

# Pepform Deployment Script
# This script ensures changes are properly deployed to production

set -e

echo "🚀 Pepform Deployment Helper"
echo "=============================="

# Check for uncommitted changes
if [[ -n $(git status --porcelain) ]]; then
  echo "⚠️  Warning: You have uncommitted changes"
  git status --short
  read -p "Continue anyway? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

# Get current branch
BRANCH=$(git branch --show-current)
echo "📍 Current branch: $BRANCH"

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push origin $BRANCH

# Wait for Vercel to build
echo "⏳ Waiting for Vercel to build (30 seconds)..."
sleep 30

# Get the latest deployment
echo "🔍 Checking latest deployment..."
LATEST_DEPLOYMENT=$(npx vercel ls --yes | grep -m 1 "https://peppiepep-" | awk '{print $1}')

if [ -z "$LATEST_DEPLOYMENT" ]; then
  echo "❌ Could not find latest deployment"
  exit 1
fi

echo "✅ Latest deployment: $LATEST_DEPLOYMENT"

# Check deployment status
echo "🔍 Checking deployment status..."
DEPLOY_ID=$(echo $LATEST_DEPLOYMENT | sed 's/https:\/\///')

# Wait for deployment to be ready
MAX_ATTEMPTS=12
ATTEMPT=0
while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
  STATUS=$(npx vercel inspect $DEPLOY_ID 2>/dev/null | grep "status" | head -1 || echo "unknown")

  if echo "$STATUS" | grep -q "Ready"; then
    echo "✅ Deployment is ready!"
    break
  elif echo "$STATUS" | grep -q "Building"; then
    echo "⏳ Still building... (attempt $((ATTEMPT+1))/$MAX_ATTEMPTS)"
    sleep 10
    ATTEMPT=$((ATTEMPT+1))
  elif echo "$STATUS" | grep -q "Error"; then
    echo "❌ Deployment failed!"
    exit 1
  else
    echo "⏳ Waiting for deployment... (attempt $((ATTEMPT+1))/$MAX_ATTEMPTS)"
    sleep 10
    ATTEMPT=$((ATTEMPT+1))
  fi
done

if [ $ATTEMPT -eq $MAX_ATTEMPTS ]; then
  echo "⚠️  Deployment is taking longer than expected"
  read -p "Continue with alias update anyway? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

# Update production alias
echo "🔄 Updating production alias..."
npx vercel alias set $DEPLOY_ID peppiepep.vercel.app

echo ""
echo "✨ Deployment complete!"
echo "🌐 Production URL: https://peppiepep.vercel.app"
echo "📋 Deployment URL: $LATEST_DEPLOYMENT"
echo ""
echo "⏰ Note: DNS propagation may take a few minutes"
echo "💡 Clear your browser cache if you don't see changes immediately"
