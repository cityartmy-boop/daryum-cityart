# 🚀 Production Deployment Guide
# دليل النشر للإنتاج

---

## 📋 Overview

This guide covers deploying the Laravel + Vue.js project to production.
هذا الدليل يغطي نشر مشروع Laravel + Vue.js للإنتاج.

---

## 🔧 Option 1: VPS Deployment (DigitalOcean, Linode, Vultr)

### Backend: Laravel on VPS

#### Step 1: Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install required packages
sudo apt install -y nginx mysql-server php8.2-fpm php8.2-mysql php8.2-mbstring php8.2-xml php8.2-curl php8.2-zip composer git

# Install Node.js (for asset compilation)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

#### Step 2: Setup MySQL
```bash
sudo mysql_secure_installation

# Create database
sudo mysql -e "CREATE DATABASE daryum CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
sudo mysql -e "CREATE USER 'daryum_user'@'localhost' IDENTIFIED BY 'secure_password';"
sudo mysql -e "GRANT ALL PRIVILEGES ON daryum.* TO 'daryum_user'@'localhost';"
sudo mysql -e "FLUSH PRIVILEGES;"
```

#### Step 3: Deploy Laravel
```bash
# Clone repository
cd /var/www
sudo git clone your-repository.git daryum-backend
cd daryum-backend

# Install dependencies
sudo composer install --optimize-autoloader --no-dev

# Setup environment
sudo cp .env.example .env
sudo nano .env
# Update APP_ENV=production, database credentials, etc.

# Generate key
sudo php artisan key:generate

# Run migrations
sudo php artisan migrate --force

# Optimize
sudo php artisan config:cache
sudo php artisan route:cache
sudo php artisan view:cache

# Set permissions
sudo chown -R www-data:www-data /var/www/daryum-backend
sudo chmod -R 755 /var/www/daryum-backend/storage
```

#### Step 4: Configure Nginx
```bash
sudo nano /etc/nginx/sites-available/daryum-api
```

```nginx
server {
    listen 80;
    server_name api.daryum.sa;
    root /var/www/daryum-backend/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/daryum-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Step 5: Setup SSL (Let's Encrypt)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.daryum.sa
```

---

### Frontend: Vue.js on VPS

#### Step 1: Build Vue.js
```bash
# On your local machine
cd daryum-frontend

# Update API URL in .env
echo "VITE_API_URL=https://api.daryum.sa" > .env.production

# Build for production
npm run build
```

#### Step 2: Deploy to VPS
```bash
# Copy dist folder to server
scp -r dist/* user@your-server:/var/www/daryum-frontend/
```

#### Step 3: Configure Nginx
```bash
sudo nano /etc/nginx/sites-available/daryum-frontend
```

```nginx
server {
    listen 80;
    server_name daryum.sa www.daryum.sa;
    root /var/www/daryum-frontend;

    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/daryum-frontend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
sudo certbot --nginx -d daryum.sa -d www.daryum.sa
```

---

## 🔧 Option 2: Cloud Deployment (Recommended for Beginners)

### Backend: Laravel on Laravel Forge / Ploi.io

1. **Sign up for Laravel Forge** (https://forge.laravel.com)
2. **Connect your server** (DigitalOcean, AWS, etc.)
3. **Create site**: api.daryum.sa
4. **Deploy repository**: Connect GitHub/GitLab
5. **Setup environment**: Add .env variables
6. **Enable quick deploy**: Auto-deploy on push
7. **Setup SSL**: One-click Let's Encrypt

### Frontend: Vue.js on Vercel / Netlify

#### Deploy to Vercel:
```bash
cd daryum-frontend

# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

#### Deploy to Netlify:
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

---

## 🔧 Option 3: All-in-One Platform

### Deploy to Railway.app

#### Backend:
1. Create new project on Railway
2. Add MySQL database
3. Deploy Laravel from GitHub
4. Set environment variables
5. Done!

#### Frontend:
1. Create new project on Railway
2. Deploy Vue.js from GitHub
3. Set VITE_API_URL
4. Done!

---

## 📱 Environment Variables

### Laravel (.env)
```env
APP_NAME=Daryum
APP_ENV=production
APP_KEY=base64:...
APP_DEBUG=false
APP_URL=https://api.daryum.sa

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=daryum
DB_USERNAME=daryum_user
DB_PASSWORD=your_secure_password

SANCTUM_STATEFUL_DOMAINS=daryum.sa,www.daryum.sa
SESSION_DRIVER=cookie
SESSION_DOMAIN=.daryum.sa

MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
```

### Vue.js (.env.production)
```env
VITE_API_URL=https://api.daryum.sa
VITE_APP_NAME=Daryum
```

---

## 🔒 Security Checklist

- [ ] Set `APP_DEBUG=false` in production
- [ ] Use strong database passwords
- [ ] Enable SSL certificates (HTTPS)
- [ ] Configure firewall (UFW)
- [ ] Setup fail2ban for SSH protection
- [ ] Enable CORS properly
- [ ] Use environment variables for secrets
- [ ] Setup backup system
- [ ] Monitor logs
- [ ] Keep packages updated

---

## 📊 Performance Optimization

### Laravel:
```bash
# Optimize for production
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan optimize

# Setup queue worker
php artisan queue:work --daemon

# Setup scheduler (add to crontab)
* * * * * cd /var/www/daryum-backend && php artisan schedule:run >> /dev/null 2>&1
```

### Vue.js:
```javascript
// vite.config.js
export default {
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
}
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions (.github/workflows/deploy.yml)
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SERVER_SSH_KEY }}
          script: |
            cd /var/www/daryum-backend
            git pull origin main
            composer install --no-dev
            php artisan migrate --force
            php artisan config:cache
            php artisan route:cache
            php artisan view:cache

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build and Deploy
        run: |
          npm ci
          npm run build
          # Deploy to Vercel/Netlify
```

---

## 📈 Monitoring

### Setup Laravel Telescope (Development)
```bash
composer require laravel/telescope --dev
php artisan telescope:install
php artisan migrate
```

### Setup Error Tracking (Production)
```bash
# Install Sentry
composer require sentry/sentry-laravel

# Configure in .env
SENTRY_LARAVEL_DSN=your-dsn-here
```

---

## 💾 Backup Strategy

### Daily Database Backup
```bash
# Create backup script
sudo nano /usr/local/bin/backup-db.sh
```

```bash
#!/bin/bash
DATE=$(date +%Y-%m-%d)
mysqldump -u daryum_user -p'password' daryum > /backups/daryum-$DATE.sql
find /backups -type f -mtime +7 -delete
```

```bash
sudo chmod +x /usr/local/bin/backup-db.sh

# Add to crontab
sudo crontab -e
0 2 * * * /usr/local/bin/backup-db.sh
```

---

## 🆘 Troubleshooting

### Issue: 500 Error
- Check Laravel logs: `storage/logs/laravel.log`
- Check Nginx error log: `/var/log/nginx/error.log`
- Verify file permissions: `sudo chown -R www-data:www-data storage`

### Issue: API Connection Refused
- Check if Laravel is running: `ps aux | grep php`
- Check firewall: `sudo ufw status`
- Verify Nginx configuration: `sudo nginx -t`

### Issue: Database Connection Failed
- Check MySQL is running: `sudo systemctl status mysql`
- Verify credentials in `.env`
- Test connection: `php artisan tinker` then `DB::connection()->getPdo();`

---

## 📞 Support

For deployment issues:
- Laravel Docs: https://laravel.com/docs/deployment
- Vue.js Deployment: https://vitejs.dev/guide/static-deploy.html
- DigitalOcean Tutorials: https://www.digitalocean.com/community/tutorials

---

**Deployment Complete! 🎉**

Your application is now live and ready for users!
تطبيقك الآن منشور وجاهز للمستخدمين!