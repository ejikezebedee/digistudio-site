#!/bin/bash
echo "🚀 DIGISTUDIO deployment starting..."

# Stop any existing dev servers
pkill -f "next dev" 2>/dev/null
sleep 2

# Build production version
echo "📦 Building production version..."
npm run build

# Setup systemd service
echo "⚙️  Setting up systemd service..."
sudo cp digistudio.service /etc/systemd/system/digistudio.service
sudo systemctl daemon-reload
sudo systemctl enable digistudio
sudo systemctl restart digistudio

# Wait for startup
sleep 3

# Check status
echo "📊 Checking service status..."
sudo systemctl status digistudio --no-pager -l

echo "✅ DIGISTUDIO production deployment complete!"
echo "🔗 Site will be available at: http://145.223.117.153:3001"

# Setup nginx if available
if command -v nginx &> /dev/null; then
    echo "🌐 Setting up nginx reverse proxy..."
    NGINX_CONF="/etc/nginx/sites-available/digistudio"
    sudo cp nginx-digistudio-site.conf "$NGINX_CONF"
    sudo ln -sf "$NGINX_CONF" "/etc/nginx/sites-enabled/digistudio"
    sudo nginx -t && sudo systemctl reload nginx
    echo "🔗 Public URL: http://145.223.117.153:80"
fi
