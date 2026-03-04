#!/bin/bash

echo "🚀 Republic Economy Tracker - Setup Script"
echo "=========================================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ .env file created"
    echo "⚠️  Please edit .env and add your configuration"
    echo ""
else
    echo "✅ .env file already exists"
    echo ""
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

# Check if DATABASE_URL is set
if grep -q "DATABASE_URL=\"postgresql://user:password" .env; then
    echo "⚠️  WARNING: DATABASE_URL is not configured!"
    echo "Please update DATABASE_URL in .env before continuing"
    echo ""
    read -p "Press enter to continue anyway or Ctrl+C to exit..."
fi

# Push database schema
echo "🗄️  Setting up database..."
npm run db:push
echo "✅ Database schema created"
echo ""

# Seed database
echo "🌱 Seeding database with initial data..."
npx prisma db seed
echo "✅ Database seeded"
echo ""

echo "✨ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env with your configuration"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Open http://localhost:3000 in your browser"
echo "4. Connect your Keplr wallet"
echo ""
echo "For deployment instructions, see DEPLOYMENT.md"
echo ""
