#!/bin/bash
# Quick server startup script for 1337Pa$$

echo "🚀 Starting local server for 1337Pa$$..."
echo ""
echo "📍 Server will be available at:"
echo "   http://localhost:8000"
echo ""
echo "💡 Add ?debug=1 to URL for debug mode:"
echo "   http://localhost:8000/?debug=1"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Try python3 first, then python, then suggest npx serve
if command -v python3 &> /dev/null; then
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    python -m http.server 8000
else
    echo "❌ Python not found. Please install Python or use: npx serve"
    exit 1
fi

