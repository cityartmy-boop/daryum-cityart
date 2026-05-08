# Daryum PropTech Platform

نظام إدارة عقارات سعودي متكامل للمشغلين المحترفين

## 🎯 نظرة عامة

**Daryum** هو نظام SaaS احترافي لإدارة العقارات المؤجرة في السوق السعودي. يوفر حل شامل لإدارة العقارات، الحجوزات، القنوات، التنظيف، الصيانة، المالية، وتقارير الملاك.

## ✨ المميزات الرئيسية

### 🏢 إدارة العقارات والوحدات
- إدارة شاملة للعقارات والوحدات السكنية
- تتبع الحالة الفورية (متاح، محجوز، تنظيف، صيانة)
- معلومات تفصيلية عن كل وحدة
- دعم أنواع متعددة من العقارات

### 📅 الحجوزات والتقويم
- تقويم تفاعلي لجميع الحجوزات
- مزامنة تلقائية مع القنوات (Airbnb, Booking.com, إلخ)
- إدارة Check-in و Check-out
- تتبع الحالة المالية للحجوزات

### 🌐 القنوات والتوزيع
- ربط مع القنوات العالمية:
  * Airbnb
  * Booking.com
  * Agoda
  * Vrbo
  * Expedia
  * الحجز المباشر
- مزامنة الأسعار والتوافر
- تتبع أداء كل قناة

### 🧹 إدارة التنظيف
- جدولة مهام التنظيف
- تعيين الموظفين
- قوائم التحقق التفصيلية
- تتبع الوقت والأداء

### 🔧 إدارة الصيانة
- نظام تذاكر الصيانة
- تحديد الأولويات
- تتبع SLA
- إدارة التكاليف

### 👥 إدارة الملاك
- كشوف حساب مفصلة
- تقارير الإيرادات والمصروفات
- جدول الدفعات
- الشفافية الكاملة

### 💰 المالية والتقارير
- ضريبة القيمة المضافة (VAT)
- تقارير مالية شاملة
- تتبع الإيرادات والمصروفات
- تحليلات متقدمة

### 🤖 الذكاء الاصطناعي
- اقتراحات أسعار ذكية
- كشف فجوات الإشغال
- ردود تلقائية على الرسائل
- رؤى تشغيلية

## 🛠 التقنيات المستخدمة

### Frontend
- **Next.js 15.2** - إطار عمل React
- **TypeScript** - لغة البرمجة
- **Tailwind CSS** - التصميم
- **shadcn/ui** - مكونات UI
- **Lucide React** - الأيقونات

### Backend
- **Supabase** - قاعدة البيانات والمصادقة
- **PostgreSQL** - قاعدة البيانات
- **Row Level Security (RLS)** - الأمان

### DevOps
- **PM2** - إدارة العمليات
- **Vercel** - الاستضافة

## 🗂 هيكل المشروع

```
daryum/
├── src/
│   ├── components/       # مكونات React
│   │   ├── ui/          # مكونات shadcn/ui
│   │   ├── landing/     # مكونات الصفحة الرئيسية
│   │   ├── dashboard/   # مكونات لوحة التحكم
│   │   └── admin/       # مكونات الإدارة
│   ├── pages/           # صفحات Next.js
│   │   ├── api/         # API Routes
│   │   ├── dashboard/   # صفحات Dashboard
│   │   └── admin/       # صفحات Admin
│   ├── services/        # خدمات Backend
│   ├── hooks/           # React Hooks
│   ├── lib/             # المكتبات والأدوات
│   ├── contexts/        # React Contexts
│   └── styles/          # الأنماط
├── public/              # الملفات العامة
├── supabase-schema.sql  # Schema قاعدة البيانات
└── package.json         # التبعيات
```

## 🚀 البدء

### المتطلبات
- Node.js 18+
- npm أو yarn
- حساب Supabase

### التثبيت

1. **استنساخ المشروع**
```bash
git clone <repository-url>
cd daryum
```

2. **تثبيت التبعيات**
```bash
npm install
```

3. **إعداد المتغيرات البيئية**

أنشئ ملف `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **إنشاء قاعدة البيانات**

قم بتشغيل ملف `supabase-schema.sql` في Supabase SQL Editor

5. **تشغيل التطوير**
```bash
npm run dev
```

المشروع سيعمل على: `http://localhost:3000`

### PM2 (Production)
```bash
npm install pm2 -g
pm2 start ecosystem.config.js
```

## 📊 قاعدة البيانات

### الجداول الرئيسية

1. **users** - المستخدمين
2. **properties** - العقارات
3. **units** - الوحدات
4. **reservations** - الحجوزات
5. **channels** - القنوات
6. **owners** - الملاك
7. **transactions** - المعاملات المالية
8. **housekeeping_tasks** - مهام التنظيف
9. **maintenance_tickets** - تذاكر الصيانة
10. **messages** - الرسائل
11. **subscriptions** - الاشتراكات
12. **activity_logs** - سجل الأنشطة

## 🔐 الأدوار والصلاحيات

### الأدوار المتاحة:

1. **Admin** - صلاحيات كاملة
2. **Property Manager** - إدارة العقارات والعمليات
3. **Owner** - عرض التقارير والإيرادات
4. **Accountant** - المالية والتقارير
5. **Housekeeping Supervisor** - إدارة التنظيف
6. **Cleaner** - تنفيذ مهام التنظيف
7. **Maintenance** - الصيانة

## 📱 الصفحات

### صفحات المستخدم
- Landing Page
- Login / Register
- Dashboard
- Properties
- Units
- Calendar
- Reservations
- Channels
- Messages
- Housekeeping
- Maintenance
- Owners
- Finance
- Reports
- Profile
- Settings

### صفحات الإدارة
- Admin Dashboard
- Users Management
- Roles & Permissions
- Subscriptions
- Payments
- Properties (All)
- Reservations (All)
- System Logs
- Analytics
- System Settings

## 🎨 التصميم

### الألوان
- **Primary (Emerald)**: #27AE60 - الهوية السعودية
- **Secondary (Navy)**: #1A202C - السلطة التنفيذية
- **Accent (Gold)**: #F2C94C - التميز والجودة
- **Background (Cream)**: #FAF9F7 - الدفء والرقي

### الخطوط
- **Display**: Urbanist (700) - العناوين
- **Body**: IBM Plex Sans (400, 600) - المحتوى
- **Data**: IBM Plex Mono (400, 600) - البيانات المالية

## 📦 API Routes

### Properties
- `GET /api/properties` - جميع العقارات
- `GET /api/properties/[id]` - عقار محدد
- `POST /api/properties` - إنشاء عقار
- `PUT /api/properties/[id]` - تعديل عقار
- `DELETE /api/properties/[id]` - حذف عقار

### Authentication
- `POST /api/auth/signin` - تسجيل الدخول
- `POST /api/auth/signup` - إنشاء حساب
- `POST /api/auth/signout` - تسجيل الخروج

## 🧪 الاختبار

```bash
# Run tests
npm test

# Type check
npm run type-check

# Lint
npm run lint
```

## 📈 الأداء

- ✅ 0 CSS Errors
- ✅ 0 TypeScript Errors
- ✅ 0 ESLint Errors
- ✅ Full RTL Support
- ✅ Responsive Design
- ✅ SEO Optimized

## 🌐 النشر

### Vercel
```bash
vercel --prod
```

### التكوين المطلوب:
- Node.js 18+
- Environment Variables
- Supabase Database

## 📝 الترخيص

جميع الحقوق محفوظة © 2026 Daryum

## 👥 الفريق

- Product Designer
- UX Strategist
- Frontend Architect
- Backend Engineer

## 🆘 الدعم

للدعم الفني:
- Email: support@daryum.com
- Website: https://daryum.com

---

**Built with ❤️ for Saudi property operators**