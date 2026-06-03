# 🏢 Daryum - Premium Saudi PropTech Platform
# داريوم - منصة تقنية عقارية سعودية متميزة

[English](#english) • [العربية](#arabic)

<div id="english">

## 🎯 Overview

**Daryum** is a premium Saudi PropTech SaaS platform designed for serious property managers, portfolio owners, and hospitality operators. Built with Laravel 13, Vue.js 3, and MySQL, it provides a comprehensive operating system for rental properties, reservations, operations, and financial management.

---

## 📚 Complete Documentation

### Core Documentation
- **[Platform Overview](PLATFORM_OVERVIEW.md)** - Complete platform vision and architecture
- **[نبذة عن المنصة](نبذة_عن_المنصة.md)** - Arabic platform overview
- **[Technology Stack](TECH_STACK.md)** - Detailed tech specifications
- **[Migration Guide](LARAVEL_VUE_MIGRATION.md)** - Next.js to Laravel+Vue migration

### Implementation Guides
- **[Laravel Backend Implementation](LARAVEL_IMPLEMENTATION_GUIDE.md)** - Complete Laravel setup (1,406 lines)
- **[Laravel Backend Structure](LARAVEL_BACKEND_STRUCTURE.md)** - Architecture details (1,022 lines)
- **[Vue.js Frontend Implementation](VUE_FRONTEND_IMPLEMENTATION.md)** - Complete Vue.js setup (1,628 lines)
- **[Additional Controllers](ADDITIONAL_CONTROLLERS.md)** - Units, Reservations, Analytics (474 lines)
- **[Additional Pages](VUE_ADDITIONAL_PAGES.md)** - Properties, Units, Reservations pages (589 lines)

### Quick Start & Deployment
- **[Quick Start Guide](QUICK_START.md)** - Fastest path to implementation (193 lines)
- **[Setup Checklist](SETUP_CHECKLIST.md)** - 20-step implementation guide (578 lines)
- **[Deployment Guide](DEPLOYMENT.md)** - Production deployment strategies (444 lines)
- **[Project Specification](PROJECT_PROMPT.md)** - Complete feature specification (654 lines)

---

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

```bash
bash START_IMPLEMENTATION.sh
```

### Option 2: Manual Setup

```bash
# 1. Create Laravel Backend
cd ..
composer create-project laravel/laravel daryum-backend
cd daryum-backend
# Follow LARAVEL_IMPLEMENTATION_GUIDE.md

# 2. Create Vue.js Frontend
cd ..
npm create vue@latest daryum-frontend
cd daryum-frontend
# Follow VUE_FRONTEND_IMPLEMENTATION.md

# 3. Run
# Terminal 1
cd daryum-backend && php artisan serve

# Terminal 2
cd daryum-frontend && npm run dev
```

---

## 🎨 Tech Stack

**Backend:**
- Laravel 13
- PHP 8.3+
- MySQL 8.0+
- Laravel Sanctum (Authentication)
- RESTful API

**Frontend:**
- Vue.js 3 (Composition API)
- Pinia (State Management)
- Vue Router 4
- Axios (HTTP Client)
- TailwindCSS 3
- vue-i18n (Internationalization)

**Design:**
- Premium Saudi PropTech Design System
- Emerald/Navy/Gold Color Palette
- RTL/LTR Support
- Arabic/English Bilingual

---

## ✨ Core Features

1. **Dashboard** - Executive KPIs, Revenue Trends, Occupancy Analytics
2. **Properties** - Portfolio Management, Unit Overview
3. **Units** - CRUD, Status Management, Cleaning Tracking
4. **Calendar** - Multi-property Timeline, Drag-drop Reservations
5. **Reservations** - Booking Management, Check-in/Check-out
6. **Channels** - OTA Integration Status (Airbnb, Booking.com, etc.)
7. **Messages** - Guest Communication, AI Suggestions
8. **Housekeeping** - Task Management, Cleaner Assignments
9. **Maintenance** - Ticket Workflow, SLA Tracking
10. **Owners** - Statements, Revenue Reports, Payouts
11. **Finance** - VAT-aware Reconciliation, Transaction Timeline
12. **Reports** - Portfolio Analytics, Export Capabilities
13. **Automations** - Message Rules, Task Triggers
14. **Settings** - Workspace, Roles, Integrations

---

## 📊 API Endpoints

### Authentication
- POST `/api/register` - Register new user
- POST `/api/login` - Login
- POST `/api/logout` - Logout
- GET `/api/me` - Get authenticated user

### Properties
- GET `/api/properties` - List properties
- POST `/api/properties` - Create property
- GET `/api/properties/{id}` - Get property
- PUT `/api/properties/{id}` - Update property
- DELETE `/api/properties/{id}` - Delete property

### Units
- GET `/api/units` - List units
- POST `/api/units` - Create unit
- PATCH `/api/units/{id}/status` - Update status
- PATCH `/api/units/{id}/cleaning-status` - Update cleaning

### Reservations
- GET `/api/reservations` - List reservations
- POST `/api/reservations` - Create reservation
- POST `/api/reservations/{id}/check-in` - Check-in
- POST `/api/reservations/{id}/check-out` - Check-out
- POST `/api/reservations/{id}/cancel` - Cancel

### Dashboard
- GET `/api/dashboard/kpis` - Get KPIs
- GET `/api/dashboard/revenue-trend` - Revenue chart
- GET `/api/dashboard/channel-performance` - Channel data
- GET `/api/dashboard/occupancy-trend` - Occupancy chart

---

## 📖 Documentation Structure

```
📁 Documentation (7,200+ lines)
├── 📄 PLATFORM_OVERVIEW.md (605 lines)
├── 📄 نبذة_عن_المنصة.md (447 lines)
├── 📄 TECH_STACK.md (672 lines)
├── 📄 LARAVEL_VUE_MIGRATION.md (729 lines)
├── 📄 LARAVEL_BACKEND_STRUCTURE.md (1,022 lines)
├── 📄 LARAVEL_IMPLEMENTATION_GUIDE.md (1,406 lines)
├── 📄 VUE_FRONTEND_IMPLEMENTATION.md (1,628 lines)
├── 📄 ADDITIONAL_CONTROLLERS.md (474 lines)
├── 📄 VUE_ADDITIONAL_PAGES.md (589 lines)
├── 📄 SETUP_CHECKLIST.md (578 lines)
├── 📄 DEPLOYMENT.md (444 lines)
├── 📄 PROJECT_PROMPT.md (654 lines)
├── 📄 QUICK_START.md (193 lines)
└── 📄 README.md (360 lines)
```

---

## 🤝 Contributing

This is a proprietary project. For access or collaboration inquiries, please contact the development team.

---

## 📄 License

Proprietary. All rights reserved.

---

## 📞 Support

For technical support or questions:
- Email: support@daryum.com
- Documentation: See guides above

---

</div>

<div id="arabic" dir="rtl">

## 🎯 نظرة عامة

**داريوم** منصة سعودية متميزة لإدارة العقارات المؤجرة، مصممة لمديري العقارات وأصحاب المحافظ الاستثمارية. مبنية بـ Laravel 13 و Vue.js 3 و MySQL، توفر نظام تشغيل شامل للحجوزات والعمليات والإدارة المالية.

---

## 📚 الوثائق الكاملة

### الوثائق الأساسية
- **[نظرة عامة على المنصة](PLATFORM_OVERVIEW.md)** - الرؤية والهندسة الكاملة
- **[نبذة عن المنصة](نبذة_عن_المنصة.md)** - النظرة العامة بالعربية
- **[التقنيات المستخدمة](TECH_STACK.md)** - المواصفات التقنية التفصيلية
- **[دليل الانتقال](LARAVEL_VUE_MIGRATION.md)** - من Next.js إلى Laravel+Vue

### أدلة التنفيذ
- **[تنفيذ Laravel Backend](LARAVEL_IMPLEMENTATION_GUIDE.md)** - إعداد Laravel الكامل (1,406 سطر)
- **[هيكل Laravel Backend](LARAVEL_BACKEND_STRUCTURE.md)** - تفاصيل البنية (1,022 سطر)
- **[تنفيذ Vue.js Frontend](VUE_FRONTEND_IMPLEMENTATION.md)** - إعداد Vue.js الكامل (1,628 سطر)
- **[Controllers إضافية](ADDITIONAL_CONTROLLERS.md)** - Units و Reservations و Analytics (474 سطر)
- **[صفحات إضافية](VUE_ADDITIONAL_PAGES.md)** - صفحات Properties و Units و Reservations (589 سطر)

### البدء السريع والنشر
- **[دليل البدء السريع](QUICK_START.md)** - أسرع طريق للتنفيذ (193 سطر)
- **[قائمة الإعداد](SETUP_CHECKLIST.md)** - دليل تنفيذ 20 خطوة (578 سطر)
- **[دليل النشر](DEPLOYMENT.md)** - استراتيجيات النشر للإنتاج (444 سطر)
- **[مواصفات المشروع](PROJECT_PROMPT.md)** - مواصفات الميزات الكاملة (654 سطر)

---

## 🚀 البدء السريع

### الخيار 1: الإعداد الآلي (موصى به)

```bash
bash START_IMPLEMENTATION.sh
```

### الخيار 2: الإعداد اليدوي

```bash
# 1. إنشاء Laravel Backend
cd ..
composer create-project laravel/laravel daryum-backend
cd daryum-backend
# اتبع LARAVEL_IMPLEMENTATION_GUIDE.md

# 2. إنشاء Vue.js Frontend
cd ..
npm create vue@latest daryum-frontend
cd daryum-frontend
# اتبع VUE_FRONTEND_IMPLEMENTATION.md

# 3. التشغيل
# Terminal 1
cd daryum-backend && php artisan serve

# Terminal 2
cd daryum-frontend && npm run dev
```

---

## 📞 الدعم الفني

للحصول على الدعم الفني أو الاستفسارات:
- البريد الإلكتروني: support@daryum.com
- الوثائق: انظر الأدلة أعلاه

---

**[Laravel Guide](LARAVEL_IMPLEMENTATION_GUIDE.md)** • **[Vue.js Guide](VUE_FRONTEND_IMPLEMENTATION.md)** • **[Deployment](DEPLOYMENT.md)**

Made in 🇸🇦 Saudi Arabia

</div>