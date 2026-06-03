# ⚡ Quick Start Guide
# دليل البدء السريع

---

## 🎯 التنفيذ الآن - 3 خطوات فقط

### الخطوة 1: إنشاء Laravel Backend

```bash
# اخرج من المجلد الحالي
cd ..

# أنشئ مشروع Laravel
composer create-project laravel/laravel daryum-backend

# ادخل للمجلد
cd daryum-backend

# انسخ ملف .env
cp .env.example .env

# حرر .env وأضف:
DB_DATABASE=daryum
DB_USERNAME=root
DB_PASSWORD=
SANCTUM_STATEFUL_DOMAINS=localhost:5173

# ولّد المفتاح
php artisan key:generate

# ثبّت Sanctum
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

---

### الخطوة 2: إنشاء قاعدة البيانات

```sql
-- افتح MySQL وأنشئ قاعدة البيانات
CREATE DATABASE daryum CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

```bash
# ارجع لـ Laravel
# افتح LARAVEL_IMPLEMENTATION_GUIDE.md
# انسخ الـ 7 Migrations واحدة تلو الأخرى

# مثال:
php artisan make:migration create_properties_table
# انسخ الكود من الدليل إلى الملف المُنشأ

# نفذ Migrations
php artisan migrate

# شغّل السيرفر
php artisan serve
# سيعمل على http://localhost:8000
```

---

### الخطوة 3: إنشاء Vue.js Frontend

```bash
# في نافذة Terminal جديدة
cd ..

# أنشئ مشروع Vue.js
npm create vue@latest daryum-frontend

# اختر:
# ❌ TypeScript? No
# ❌ JSX? No  
# ✅ Vue Router? Yes
# ✅ Pinia? Yes
# ❌ Vitest? No
# ✅ ESLint? Yes
# ✅ Prettier? Yes

cd daryum-frontend

# ثبّت الحزم
npm install

# ثبّت الحزم الإضافية
npm install axios vue-i18n@9 chart.js vue-chartjs lucide-vue-next date-fns
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# أنشئ ملف .env
echo "VITE_API_URL=http://localhost:8000" > .env

# افتح VUE_FRONTEND_IMPLEMENTATION.md
# انسخ التكوينات والملفات واحدة تلو الأخرى

# شغّل السيرفر
npm run dev
# سيعمل على http://localhost:5173
```

---

## 🎯 ترتيب التنفيذ الصحيح

### Phase 1: Laravel (60 دقيقة)
1. ✅ إنشاء مشروع Laravel
2. ✅ إعداد قاعدة البيانات
3. ✅ نسخ Migrations (7 جداول)
4. ✅ نسخ Models (4 ملفات)
5. ✅ نسخ Controllers (Auth + Property)
6. ✅ نسخ Routes
7. ✅ اختبار API

### Phase 2: Vue.js (60 دقيقة)
1. ✅ إنشاء مشروع Vue.js
2. ✅ إعداد TailwindCSS
3. ✅ إعداد Axios
4. ✅ إعداد i18n
5. ✅ نسخ Stores (3 ملفات)
6. ✅ نسخ Router
7. ✅ نسخ Components (3 ملفات)
8. ✅ نسخ Pages (5 صفحات)

### Phase 3: التكامل (30 دقيقة)
1. ✅ تشغيل الـ Backend
2. ✅ تشغيل الـ Frontend
3. ✅ اختبار التسجيل
4. ✅ اختبار تسجيل الدخول
5. ✅ اختبار Dashboard

**إجمالي الوقت:** 2.5 ساعة

---

## 📋 قائمة المراجعة السريعة

```
□ هل PHP مثبت؟ (php -v)
□ هل Composer مثبت؟ (composer -v)
□ هل Node.js مثبت؟ (node -v)
□ هل MySQL يعمل؟ (mysql -v)
□ هل قاعدة البيانات مُنشأة؟
□ هل Laravel يعمل؟ (http://localhost:8000)
□ هل Vue.js يعمل؟ (http://localhost:5173)
```

---

## 🆘 مشاكل شائعة

### مشكلة: CORS Error
```bash
# حل: تأكد من إضافة هذا في config/cors.php
'supports_credentials' => true,
'allowed_origins' => ['http://localhost:5173'],
```

### مشكلة: 419 CSRF Token
```bash
# حل: تأكد من SANCTUM_STATEFUL_DOMAINS في .env
SANCTUM_STATEFUL_DOMAINS=localhost:5173
```

### مشكلة: Database Connection Failed
```bash
# حل: تأكد من بيانات قاعدة البيانات في .env
php artisan migrate
```

---

## 📚 الأدلة الكاملة

إذا احتجت تفاصيل أكثر:

- **SETUP_CHECKLIST.md** - دليل خطوة بخطوة (20 خطوة)
- **LARAVEL_IMPLEMENTATION_GUIDE.md** - جميع أكواد Laravel
- **VUE_FRONTEND_IMPLEMENTATION.md** - جميع أكواد Vue.js

---

## 🚀 ابدأ الآن!

```bash
# نفّذ هذا الأمر:
bash START_IMPLEMENTATION.sh

# أو اتبع الخطوات يدوياً أعلاه
```

**بالتوفيق! 🔥**