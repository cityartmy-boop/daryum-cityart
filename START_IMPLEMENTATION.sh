#!/bin/bash

# =====================================================
# Daryum Implementation Script
# This script will guide you through setting up the project
# =====================================================

echo "🚀 Daryum Implementation Script"
echo "================================"
echo ""

# Check prerequisites
echo "📋 Checking prerequisites..."
echo ""

# Check PHP
if ! command -v php &> /dev/null; then
    echo "❌ PHP is not installed. Please install PHP 8.2 or higher."
    exit 1
fi
PHP_VERSION=$(php -v | head -n 1 | cut -d " " -f 2 | cut -d "." -f 1,2)
echo "✅ PHP $PHP_VERSION found"

# Check Composer
if ! command -v composer &> /dev/null; then
    echo "❌ Composer is not installed. Please install Composer."
    exit 1
fi
echo "✅ Composer found"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20 or higher."
    exit 1
fi
NODE_VERSION=$(node -v)
echo "✅ Node.js $NODE_VERSION found"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi
echo "✅ npm found"

# Check MySQL
if ! command -v mysql &> /dev/null; then
    echo "⚠️  MySQL client not found. Make sure MySQL server is running."
else
    echo "✅ MySQL client found"
fi

echo ""
echo "✅ All prerequisites met!"
echo ""

# Ask user for confirmation
read -p "🔥 Ready to create Laravel backend? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Setup cancelled."
    exit 1
fi

# Navigate to parent directory
cd ..

echo ""
echo "📦 Step 1: Creating Laravel Backend..."
echo "======================================="
echo ""

# Create Laravel project
composer create-project laravel/laravel daryum-backend

if [ $? -eq 0 ]; then
    echo "✅ Laravel project created successfully!"
else
    echo "❌ Failed to create Laravel project."
    exit 1
fi

cd daryum-backend

# Copy .env file
echo ""
echo "📝 Setting up .env file..."
cp .env.example .env

# Ask for database details
echo ""
echo "🗄️  Database Configuration"
echo "=========================="
read -p "Database name (default: daryum): " DB_NAME
DB_NAME=${DB_NAME:-daryum}

read -p "Database username (default: root): " DB_USER
DB_USER=${DB_USER:-root}

read -p "Database password (press Enter if empty): " -s DB_PASS
echo

# Update .env
sed -i '' "s/DB_DATABASE=.*/DB_DATABASE=$DB_NAME/" .env
sed -i '' "s/DB_USERNAME=.*/DB_USERNAME=$DB_USER/" .env
sed -i '' "s/DB_PASSWORD=.*/DB_PASSWORD=$DB_PASS/" .env

# Add Sanctum config
echo "" >> .env
echo "SANCTUM_STATEFUL_DOMAINS=localhost:5173" >> .env

# Generate key
php artisan key:generate

echo ""
echo "📦 Installing Laravel Sanctum..."
composer require laravel/sanctum

echo ""
echo "📦 Publishing Sanctum config..."
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"

echo ""
echo "✅ Laravel backend setup complete!"
echo ""
echo "📍 Next steps:"
echo "1. Create database: CREATE DATABASE $DB_NAME;"
echo "2. Run migrations (we'll create them in the guide)"
echo "3. Start server: php artisan serve"
echo ""

# Ask for Vue.js setup
read -p "🔥 Ready to create Vue.js frontend? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "✅ Laravel backend ready! Follow SETUP_CHECKLIST.md for Vue.js setup."
    exit 0
fi

cd ..

echo ""
echo "📦 Step 2: Creating Vue.js Frontend..."
echo "======================================="
echo ""

npm create vue@latest daryum-frontend -- --typescript false --jsx false --router true --pinia true --eslint true --prettier true

if [ $? -eq 0 ]; then
    echo "✅ Vue.js project created successfully!"
else
    echo "❌ Failed to create Vue.js project."
    exit 1
fi

cd daryum-frontend

echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "📦 Installing additional packages..."
npm install axios vue-i18n@9 chart.js vue-chartjs lucide-vue-next date-fns vee-validate yup
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Create .env file
echo "VITE_API_URL=http://localhost:8000" > .env
echo "VITE_APP_NAME=Daryum" >> .env
echo "VITE_DEFAULT_LOCALE=ar" >> .env

echo ""
echo "✅ Vue.js frontend setup complete!"
echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "📁 Project Structure:"
echo "   daryum-backend/  (Laravel)"
echo "   daryum-frontend/ (Vue.js)"
echo ""
echo "🚀 Next Steps:"
echo "1. Open SETUP_CHECKLIST.md"
echo "2. Follow Step 5: Create Database Migrations"
echo "3. Copy code from LARAVEL_IMPLEMENTATION_GUIDE.md"
echo "4. Copy Vue.js code from VUE_FRONTEND_IMPLEMENTATION.md"
echo ""
echo "🔥 To start development:"
echo ""
echo "Terminal 1 - Laravel Backend:"
echo "  cd daryum-backend"
echo "  php artisan serve"
echo ""
echo "Terminal 2 - Vue.js Frontend:"
echo "  cd daryum-frontend"
echo "  npm run dev"
echo ""
echo "✨ Good luck! بالتوفيق!"