# ✅ Laravel + Vue.js Setup Checklist
# قائمة خطوات التنفيذ الكاملة

---

## 🎯 Overview / نظرة عامة

This is a **step-by-step checklist** to implement the Laravel 13 + Vue.js 3 + MySQL project.
هذه قائمة **خطوة بخطوة** لتنفيذ مشروع Laravel 13 + Vue.js 3 + MySQL.

**Time Estimate:** 2-3 hours / **الوقت المقدّر:** 2-3 ساعات

---

## 📋 Phase 1: Laravel Backend Setup

### Step 1: Create Laravel Project
```bash
# Navigate outside current project / اخرج من المجلد الحالي
cd ..

# Create Laravel project / أنشئ مشروع Laravel
composer create-project laravel/laravel daryum-backend

# Navigate to project / ادخل للمجلد
cd daryum-backend
```

**✅ Checkpoint:** Project created successfully
```bash
php artisan --version
# Should show: Laravel Framework 13.x.x
```

---

### Step 2: Install Required Packages
```bash
# Install Laravel Sanctum / تثبيت Sanctum للمصادقة
composer require laravel/sanctum

# Install additional packages / تثبيت حزم إضافية
composer require spatie/laravel-permission
composer require intervention/image
```

**✅ Checkpoint:** Packages installed
```bash
composer show laravel/sanctum
# Should show version info
```

---

### Step 3: Configure MySQL Database

#### 3.1: Create Database
```sql
-- في MySQL Workbench أو PhpMyAdmin
CREATE DATABASE daryum CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'daryum_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON daryum.* TO 'daryum_user'@'localhost';
FLUSH PRIVILEGES;
```

#### 3.2: Update .env File
```bash
# Open .env file and update:
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=daryum
DB_USERNAME=daryum_user
DB_PASSWORD=your_password

# Sanctum configuration
SANCTUM_STATEFUL_DOMAINS=localhost:5173
SESSION_DRIVER=cookie
SESSION_DOMAIN=localhost
```

**✅ Checkpoint:** Database connection works
```bash
php artisan migrate
# Should run default migrations successfully
```

---

### Step 4: Setup Laravel Sanctum

```bash
# Publish Sanctum configuration
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"

# Run migrations
php artisan migrate
```

#### 4.1: Update `app/Http/Kernel.php`
Open file and add to `api` middleware group:
```php
'api' => [
    \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
    'throttle:api',
    \Illuminate\Routing\Middleware\SubstituteBindings::class,
],
```

#### 4.2: Update `config/cors.php`
```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_origins' => ['http://localhost:5173'],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
'exposed_headers' => [],
'max_age' => 0,
'supports_credentials' => true,
```

**✅ Checkpoint:** Sanctum configured

---

### Step 5: Create Database Migrations

Open `LARAVEL_IMPLEMENTATION_GUIDE.md` file in this project and copy the following migrations:

#### 5.1: Properties Migration
```bash
php artisan make:migration create_properties_table
```
Copy code from section "2. Properties Migration" in the guide.

#### 5.2: Units Migration
```bash
php artisan make:migration create_units_table
```
Copy code from section "3. Units Migration" in the guide.

#### 5.3: Reservations Migration
```bash
php artisan make:migration create_reservations_table
```
Copy code from section "4. Reservations Migration" in the guide.

#### 5.4: Messages Migration
```bash
php artisan make:migration create_messages_table
```
Copy code from section "5. Messages Migration" in the guide.

#### 5.5: Housekeeping Migration
```bash
php artisan make:migration create_housekeeping_tasks_table
```
Copy code from section "6. Housekeeping Migration" in the guide.

#### 5.6: Maintenance Migration
```bash
php artisan make:migration create_maintenance_tickets_table
```
Copy code from section "7. Maintenance Migration" in the guide.

#### 5.7: Run Migrations
```bash
php artisan migrate
```

**✅ Checkpoint:** All tables created in MySQL
```bash
php artisan migrate:status
# Should show all migrations completed
```

---

### Step 6: Create Models

#### 6.1: User Model
Update `app/Models/User.php` with code from "User Model" section in the guide.

#### 6.2: Property Model
```bash
php artisan make:model Property
```
Copy code from "Property Model" section.

#### 6.3: Unit Model
```bash
php artisan make:model Unit
```
Copy code from "Unit Model" section.

#### 6.4: Reservation Model
```bash
php artisan make:model Reservation
```
Copy code from "Reservation Model" section.

**✅ Checkpoint:** Models created with relationships

---

### Step 7: Create Controllers

#### 7.1: Auth Controller
```bash
php artisan make:controller Api/AuthController
```
Copy code from "Auth Controller" section in the guide.

#### 7.2: Property Controller
```bash
php artisan make:controller Api/PropertyController --resource
```
Copy code from "Property Controller" section in the guide.

**✅ Checkpoint:** Controllers created

---

### Step 8: Setup API Routes

Update `routes/api.php` with code from "API Routes" section in the guide.

**✅ Checkpoint:** Routes defined
```bash
php artisan route:list
# Should show all API routes
```

---

### Step 9: Test Laravel Backend

#### 9.1: Start Laravel Server
```bash
php artisan serve
# Server should start at http://127.0.0.1:8000
```

#### 9.2: Test Registration
```bash
curl -X POST http://localhost:8000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "password_confirmation": "password123",
    "role": "admin"
  }'
```

**✅ Checkpoint:** Should receive user object with token

#### 9.3: Test Login
```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**✅ Checkpoint:** Should receive user object with token

---

## 📋 Phase 2: Vue.js Frontend Setup

### Step 10: Create Vue.js Project
```bash
# Navigate outside current project
cd ..

# Create Vue.js project
npm create vue@latest daryum-frontend

# During setup, select:
# ✅ TypeScript? No
# ✅ JSX? No
# ✅ Vue Router? Yes
# ✅ Pinia? Yes
# ✅ Vitest? No
# ✅ ESLint? Yes
# ✅ Prettier? Yes

# Navigate to project
cd daryum-frontend

# Install dependencies
npm install
```

**✅ Checkpoint:** Vue project created
```bash
npm run dev
# Should open at http://localhost:5173
```

---

### Step 11: Install Required Packages

```bash
# Install TailwindCSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install Axios for API calls
npm install axios

# Install Vue i18n for bilingual support
npm install vue-i18n@9

# Install Chart.js for charts
npm install chart.js vue-chartjs

# Install Lucide icons
npm install lucide-vue-next

# Install date library
npm install date-fns

# Install form validation
npm install vee-validate yup
```

**✅ Checkpoint:** All packages installed

---

### Step 12: Setup TailwindCSS

#### 12.1: Update `tailwind.config.js`
Copy configuration from "TailwindCSS Configuration" section in `VUE_FRONTEND_IMPLEMENTATION.md`

#### 12.2: Create `src/assets/main.css`
Copy CSS from "CSS Configuration" section in the guide.

#### 12.3: Import in `src/main.js`
```javascript
import './assets/main.css'
```

**✅ Checkpoint:** TailwindCSS working

---

### Step 13: Setup Axios

Create `src/api/axios.js` with code from "Axios Configuration" section in the guide.

**✅ Checkpoint:** Axios configured

---

### Step 14: Setup i18n

Create `src/i18n/index.js` with code from "i18n Configuration" section in the guide.

**✅ Checkpoint:** i18n working

---

### Step 15: Setup Pinia Stores

#### 15.1: Auth Store
Create `src/stores/auth.js` with code from "Auth Store" section.

#### 15.2: Properties Store
Create `src/stores/properties.js` with code from "Properties Store" section.

#### 15.3: UI Store
Create `src/stores/ui.js` with code from "UI Store" section.

**✅ Checkpoint:** Stores created

---

### Step 16: Setup Vue Router

Update `src/router/index.js` with code from "Vue Router" section in the guide.

**✅ Checkpoint:** Router configured with protected routes

---

### Step 17: Create UI Components

#### 17.1: Button Component
Create `src/components/ui/Button.vue` with code from guide.

#### 17.2: Input Component
Create `src/components/ui/Input.vue` with code from guide.

#### 17.3: Card Component
Create `src/components/ui/Card.vue` with code from guide.

**✅ Checkpoint:** UI components created

---

### Step 18: Create Pages

#### 18.1: Landing Page
Create `src/views/Home.vue` with code from "Landing Page" section.

#### 18.2: Login Page
Create `src/views/Login.vue` with code from "Login Page" section.

#### 18.3: Register Page
Create `src/views/Register.vue` with code from "Register Page" section.

#### 18.4: Dashboard Layout
Create `src/views/dashboard/Layout.vue` with code from "Dashboard Layout" section.

#### 18.5: Dashboard Page
Create `src/views/dashboard/Index.vue` with code from "Dashboard Page" section.

**✅ Checkpoint:** All pages created

---

### Step 19: Test Vue.js Frontend

#### 19.1: Start Development Server
```bash
npm run dev
# Should open at http://localhost:5173
```

#### 19.2: Test Pages
- Open http://localhost:5173 - Should see landing page
- Click "تسجيل دخول" - Should see login page
- Register new account
- Login
- Should redirect to dashboard

**✅ Checkpoint:** Frontend working correctly

---

## 📋 Phase 3: Integration Testing

### Step 20: Test Full Integration

#### 20.1: Start Both Servers
```bash
# Terminal 1 - Laravel
cd daryum-backend
php artisan serve

# Terminal 2 - Vue.js
cd daryum-frontend
npm run dev
```

#### 20.2: Test Authentication Flow
1. Register new user on Vue.js frontend
2. Login with credentials
3. Should see dashboard with user data

#### 20.3: Test API Calls
1. Try to create property from dashboard
2. Should send request to Laravel API
3. Check MySQL database - property should be saved

**✅ Checkpoint:** Full stack working

---

## 🎉 Completion Checklist

- [ ] Phase 1: Laravel Backend (Steps 1-9)
  - [ ] Laravel installed
  - [ ] MySQL database configured
  - [ ] Migrations run successfully
  - [ ] Models created
  - [ ] Controllers created
  - [ ] API routes working
  - [ ] Test API with curl

- [ ] Phase 2: Vue.js Frontend (Steps 10-19)
  - [ ] Vue.js installed
  - [ ] TailwindCSS configured
  - [ ] Axios configured
  - [ ] i18n configured
  - [ ] Pinia stores created
  - [ ] Router configured
  - [ ] UI components created
  - [ ] Pages created

- [ ] Phase 3: Integration (Step 20)
  - [ ] Both servers running
  - [ ] Authentication working
  - [ ] API calls working
  - [ ] Data saving to database

---

## 🆘 Common Issues & Solutions

### Issue 1: CORS Error
**Problem:** Vue can't connect to Laravel API
**Solution:** 
- Check `config/cors.php` has `'supports_credentials' => true`
- Check `.env` has `SANCTUM_STATEFUL_DOMAINS=localhost:5173`
- Restart Laravel server

### Issue 2: 419 CSRF Token Error
**Problem:** API returns 419 error
**Solution:**
- Make sure to call `/sanctum/csrf-cookie` before login
- Check Axios has `withCredentials: true`

### Issue 3: Database Connection Failed
**Problem:** Laravel can't connect to MySQL
**Solution:**
- Check MySQL is running
- Verify database credentials in `.env`
- Test connection: `php artisan migrate`

### Issue 4: Vue Router Not Working
**Problem:** Pages show 404
**Solution:**
- Check router configuration
- Verify route names match
- Check if using `router.push({ name: 'dashboard' })`

---

## 📚 Reference Documents

- **LARAVEL_VUE_MIGRATION.md** - Architecture overview
- **LARAVEL_IMPLEMENTATION_GUIDE.md** - Complete Laravel code
- **VUE_FRONTEND_IMPLEMENTATION.md** - Complete Vue.js code

---

## 🎯 Next Steps After Completion

Once basic setup is complete, you can:

1. **Add More Controllers:**
   - Unit Controller
   - Reservation Controller
   - Message Controller
   - Housekeeping Controller
   - Maintenance Controller

2. **Add More Pages:**
   - Properties List
   - Units Management
   - Reservations Calendar
   - Analytics Dashboard
   - Reports Page

3. **Add Advanced Features:**
   - Real-time notifications (Laravel Reverb)
   - File uploads (Images for properties)
   - PDF generation (Invoices)
   - Email notifications
   - WhatsApp integration

4. **Deploy to Production:**
   - Deploy Laravel to VPS/Cloud
   - Deploy Vue.js to Vercel/Netlify
   - Setup production database
   - Configure SSL certificates

---

**Good luck! / بالتوفيق!** 🚀

**Need help? Contact support or check the detailed guides.**