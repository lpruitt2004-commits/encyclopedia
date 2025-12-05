#!/bin/bash

# Encyclopedia PWA Deployment Script
# Deploy to Digital Ocean Server: 157.230.145.57

SERVER_IP="157.230.145.57"
SERVER_USER="root"  # Change this if you use a different user
DEPLOY_PATH="/var/www/encyclopedia"
LOCAL_BUILD_DIR="dist"

echo "🚀 Starting deployment to Digital Ocean..."

# Step 1: Build the project
echo "📦 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build completed successfully"

# Step 2: Create deployment directory on server
echo "📁 Creating deployment directory on server..."
ssh $SERVER_USER@$SERVER_IP "mkdir -p $DEPLOY_PATH"

# Step 3: Upload build files to server
echo "📤 Uploading files to server..."
rsync -avz --delete $LOCAL_BUILD_DIR/ $SERVER_USER@$SERVER_IP:$DEPLOY_PATH/

if [ $? -ne 0 ]; then
    echo "❌ File upload failed!"
    exit 1
fi

echo "✅ Files uploaded successfully"

# Step 4: Set proper permissions
echo "🔐 Setting file permissions..."
ssh $SERVER_USER@$SERVER_IP "chown -R www-data:www-data $DEPLOY_PATH && chmod -R 755 $DEPLOY_PATH"

echo "✨ Deployment completed successfully!"
echo "🌐 Your app should be accessible at: http://$SERVER_IP"
