# Republic Economy Tracker - Setup Script (PowerShell)

Write-Host "🚀 Republic Economy Tracker - Setup Script" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env exists
if (-not (Test-Path .env)) {
    Write-Host "📝 Creating .env file from .env.example..." -ForegroundColor Yellow
    Copy-Item .env.example .env
    Write-Host "✅ .env file created" -ForegroundColor Green
    Write-Host "⚠️  Please edit .env and add your configuration" -ForegroundColor Yellow
    Write-Host ""
} else {
    Write-Host "✅ .env file already exists" -ForegroundColor Green
    Write-Host ""
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install
Write-Host "✅ Dependencies installed" -ForegroundColor Green
Write-Host ""

# Check if DATABASE_URL is set
$envContent = Get-Content .env -Raw
if ($envContent -match 'DATABASE_URL="postgresql://user:password') {
    Write-Host "⚠️  WARNING: DATABASE_URL is not configured!" -ForegroundColor Red
    Write-Host "Please update DATABASE_URL in .env before continuing" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to continue anyway or Ctrl+C to exit"
}

# Push database schema
Write-Host "🗄️  Setting up database..." -ForegroundColor Yellow
npm run db:push
Write-Host "✅ Database schema created" -ForegroundColor Green
Write-Host ""

# Seed database
Write-Host "🌱 Seeding database with initial data..." -ForegroundColor Yellow
npx prisma db seed
Write-Host "✅ Database seeded" -ForegroundColor Green
Write-Host ""

Write-Host "✨ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Update .env with your configuration"
Write-Host "2. Run 'npm run dev' to start the development server"
Write-Host "3. Open http://localhost:3000 in your browser"
Write-Host "4. Connect your Keplr wallet"
Write-Host ""
Write-Host "For deployment instructions, see DEPLOYMENT.md"
Write-Host ""
