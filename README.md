# 🏢 Daryum - Premium Saudi PropTech Platform
# داريوم - منصة تقنية عقارية سعودية متميزة

[![Laravel](https://img.shields.io/badge/Laravel-13-red)](https://laravel.com)
[![Vue.js](https://img.shields.io/badge/Vue.js-3-green)](https://vuejs.org)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)](https://mysql.com)
[![License](https://img.shields.io/badge/License-Proprietary-yellow)](LICENSE)

---

## 📋 Overview / نظرة عامة

**Daryum** is a comprehensive property management platform built specifically for the Saudi Arabian market. It unifies property operations, reservations, housekeeping, maintenance, and owner reporting into one intelligent system.

**داريوم** منصة شاملة لإدارة العقارات مصممة خصيصاً للسوق السعودي. توحد عمليات العقارات والحجوزات والتنظيف والصيانة وتقارير الملاك في نظام ذكي واحد.

---

## ✨ Key Features / المزايا الرئيسية

- 🏢 **Property & Unit Management** - إدارة العقارات والوحدات
- 📅 **Advanced Reservation System** - نظام حجوزات متقدم
- 📊 **Executive Dashboard** - لوحة تحكم تنفيذية
- 💬 **Guest Messaging** - رسائل الضيوف
- 🧹 **Housekeeping Management** - إدارة التنظيف
- 🔧 **Maintenance Tracking** - تتبع الصيانة
- 👥 **Owner Portal & Statements** - بوابة الملاك والكشوفات
- 💰 **Financial Management & VAT** - الإدارة المالية وضريبة القيمة المضافة
- 📈 **Analytics & Reports** - التحليلات والتقارير
- 🤖 **AI-Powered Insights** - رؤى ذكاء اصطناعي
- 🌐 **Bilingual (Arabic/English)** - ثنائي اللغة (عربي/إنجليزي)
- 🔄 **Real-time Sync** - مزامنة فورية

---

## 🛠️ Tech Stack / التقنيات المستخدمة

### Backend
- **Framework:** Laravel 13
- **Authentication:** Laravel Sanctum
- **Database:** MySQL 8.0
- **ORM:** Eloquent
- **API:** RESTful
- **Real-time:** Laravel Reverb (planned)

### Frontend
- **Framework:** Vue.js 3 (Composition API)
- **State Management:** Pinia
- **Routing:** Vue Router
- **Styling:** TailwindCSS 3.4
- **HTTP Client:** Axios
- **i18n:** Vue i18n
- **Charts:** Chart.js

### Development Tools
- **Build Tool:** Vite
- **Package Manager:** npm / Composer
- **Version Control:** Git
- **Code Quality:** ESLint, Prettier, PHP CS Fixer

---

## 📚 Documentation / الوثائق

Comprehensive documentation is available in the following files:

### 📖 Setup & Implementation
- **[SETUP_CHECKLIST.md](SETUP_CHECKLIST.md)** - Step-by-step setup guide
- **[LARAVEL_IMPLEMENTATION_GUIDE.md](LARAVEL_IMPLEMENTATION_GUIDE.md)** - Complete Laravel backend code
- **[VUE_FRONTEND_IMPLEMENTATION.md](VUE_FRONTEND_IMPLEMENTATION.md)** - Complete Vue.js frontend code

### 🏗️ Architecture
- **[LARAVEL_VUE_MIGRATION.md](LARAVEL_VUE_MIGRATION.md)** - Architecture overview
- **[LARAVEL_BACKEND_STRUCTURE.md](LARAVEL_BACKEND_STRUCTURE.md)** - Backend structure details
- **[PROJECT_PROMPT.md](PROJECT_PROMPT.md)** - Complete project specification

### 🚀 Deployment
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Production deployment guide

### 🇸🇦 Arabic Documentation
- **[نبذة_عن_المنصة.md](نبذة_عن_المنصة.md)** - Platform overview in Arabic
- **[TECH_STACK.md](TECH_STACK.md)** - Tech stack details (bilingual)

---

## 🚀 Quick Start / البدء السريع

### Prerequisites / المتطلبات
- PHP >= 8.2
- Composer
- Node.js >= 20.x
- MySQL >= 8.0
- npm or yarn

### Backend Setup (Laravel)

```bash
# Clone repository
git clone <repository-url>
cd daryum-backend

# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure database in .env
DB_DATABASE=daryum
DB_USERNAME=your_username
DB_PASSWORD=your_password

# Run migrations
php artisan migrate

# Start development server
php artisan serve
```

### Frontend Setup (Vue.js)

```bash
# Navigate to frontend directory
cd daryum-frontend

# Install dependencies
npm install

# Configure API URL in .env
echo "VITE_API_URL=http://localhost:8000" > .env

# Start development server
npm run dev
```

### Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8000
- **API Docs:** http://localhost:8000/api/documentation

---

## 📁 Project Structure / هيكل المشروع

```
daryum/
├── daryum-backend/          # Laravel Backend
│   ├── app/
│   │   ├── Http/
│   │   │   └── Controllers/
│   │   │       └── Api/
│   │   ├── Models/
│   │   └── Services/
│   ├── database/
│   │   └── migrations/
│   ├── routes/
│   │   └── api.php
│   └── tests/
│
└── daryum-frontend/         # Vue.js Frontend
    ├── src/
    │   ├── components/
    │   │   ├── ui/
    │   │   └── dashboard/
    │   ├── views/
    │   │   ├── auth/
    │   │   └── dashboard/
    │   ├── stores/
    │   ├── router/
    │   ├── api/
    │   └── i18n/
    └── public/
```

---

## 🔑 Key Modules / الوحدات الأساسية

1. **Authentication** - User registration, login, role-based access
2. **Properties** - Property CRUD, statistics, status management
3. **Units** - Unit CRUD, availability, pricing
4. **Reservations** - Booking management, check-in/out, payments
5. **Calendar** - Visual booking calendar, availability management
6. **Channels** - OTA integration status, performance tracking
7. **Messages** - Guest communication, AI-suggested replies
8. **Housekeeping** - Task management, cleaner assignments
9. **Maintenance** - Ticket system, cost tracking, SLA
10. **Owners** - Monthly statements, revenue breakdown, payouts
11. **Finance** - Transactions, VAT calculations, reconciliation
12. **Dashboard** - KPIs, charts, operational insights
13. **Reports** - Revenue, occupancy, channel performance
14. **Settings** - Workspace configuration, user management

---

## 👥 User Roles / أدوار المستخدمين

- **Admin** (مدير النظام) - Full system access
- **Property Manager** (مدير عقارات) - Operations management
- **Owner** (مالك) - View statements and reports
- **Accountant** (محاسب) - Financial management
- **Housekeeping Supervisor** (مشرف التنظيف) - Cleaning operations
- **Maintenance Staff** (فريق الصيانة) - Maintenance tasks

---

## 🔐 Security / الأمان

- Laravel Sanctum authentication
- CSRF protection
- SQL injection prevention (Eloquent ORM)
- XSS protection
- Rate limiting
- Role-based access control
- Encrypted passwords (bcrypt)
- HTTPS enforced in production

---

## 📊 Dashboard KPIs / مؤشرات الأداء

- Total Revenue (SAR)
- Occupancy Rate (%)
- Average Daily Rate (ADR)
- Revenue Per Available Room (RevPAR)
- Upcoming Check-ins/Check-outs
- Pending Cleaning Tasks
- Open Maintenance Tickets
- Unread Messages

---

## 🌐 Internationalization / اللغات

- **Arabic (العربية)** - Primary language, RTL support
- **English** - Secondary language, LTR support
- Auto-detection based on user preference
- All UI elements, messages, and reports fully translated

---

## 📱 Responsive Design / التصميم المتجاوب

- **Mobile-first** approach
- Breakpoints: Mobile (<640px), Tablet (640-1024px), Desktop (>1024px)
- Touch-friendly interface
- Optimized layouts for all devices

---

## 🧪 Testing / الاختبار

### Backend Testing
```bash
# Run PHPUnit tests
php artisan test

# Run specific test
php artisan test --filter PropertyTest
```

### Frontend Testing
```bash
# Run Vitest tests
npm run test

# Run E2E tests
npm run test:e2e
```

---

## 🚀 Deployment / النشر

See **[DEPLOYMENT.md](DEPLOYMENT.md)** for detailed deployment instructions covering:

- VPS deployment (DigitalOcean, Linode)
- Cloud platforms (Laravel Forge, Railway)
- Frontend hosting (Vercel, Netlify)
- SSL configuration
- Production optimization
- CI/CD pipelines

---

## 🤝 Contributing / المساهمة

This is a proprietary project. Contributions are limited to authorized team members.

---

## 📄 License / الترخيص

Proprietary - All rights reserved © 2026 Daryum

---

## 📞 Support / الدعم

For technical support or inquiries:

- **Email:** support@daryum.sa
- **Phone:** +966 XX XXX XXXX
- **WhatsApp:** +966 5X XXX XXXX
- **Website:** https://daryum.sa

---

## 🗺️ Roadmap / خارطة الطريق

### ✅ Phase 1 (Completed)
- Core authentication system
- Property & Unit management
- Basic dashboard
- Bilingual support

### 🚧 Phase 2 (In Progress)
- Reservation system
- Calendar view
- Channel integrations
- Messaging system

### 📋 Phase 3 (Planned)
- Housekeeping module
- Maintenance module
- Owner portal
- Financial reports

### 🔮 Future
- Mobile app (iOS/Android)
- AI-powered pricing
- WhatsApp integration
- Advanced analytics
- API for third-party integrations

---

## 🙏 Acknowledgments / شكر وتقدير

Built with ❤️ for the Saudi PropTech market.
Built by Softgen AI Agent.

---

**Last Updated:** 2026-06-03
**Version:** 1.0.0
**Status:** In Active Development

---

<div align="center">

**[Documentation](SETUP_CHECKLIST.md)** • **[Architecture](LARAVEL_VUE_MIGRATION.md)** • **[API Reference](LARAVEL_IMPLEMENTATION_GUIDE.md)** • **[Deployment](DEPLOYMENT.md)**

Made in 🇸🇦 Saudi Arabia

</div>