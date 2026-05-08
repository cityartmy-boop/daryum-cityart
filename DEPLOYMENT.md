# 🚀 دليل النشر الكامل - Daryum Platform

دليل شامل خطوة بخطوة لنشر منصة داريوم على الإنتاج.

---

## 📋 المتطلبات المسبقة

قبل البدء، تأكد من توفر:

- ✅ حساب GitHub
- ✅ حساب Supabase (مجاني)
- ✅ حساب Vercel (مجاني)
- ✅ Node.js 18+ مثبت محلياً

---

## 🗄️ الخطوة 1: إعداد قاعدة البيانات Supabase

### 1.1 إنشاء مشروع Supabase

1. **اذهب إلى:** https://supabase.com
2. **انقر على:** "Start your project"
3. **سجل دخول** باستخدام GitHub
4. **انقر على:** "New Project"
5. **املأ البيانات:**
   - Project Name: `daryum-production`
   - Database Password: (احفظها في مكان آمن)
   - Region: `Middle East (Bahrain)` - الأقرب للسعودية
   - Pricing Plan: `Free` (للبداية)
6. **انقر:** "Create new project"
7. **انتظر** 2-3 دقائق لإنشاء المشروع

### 1.2 الحصول على مفاتيح API

1. **في لوحة تحكم Supabase:**
2. **اذهب إلى:** Settings (⚙️) → API
3. **انسخ هذه القيم:**
   ```
   Project URL: https://xxxxxxxxxxxxx.supabase.co
   anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
4. **احتفظ بهما** - ستحتاجهما لاحقاً

### 1.3 تشغيل Database Schema

1. **في لوحة Supabase:**
2. **اذهب إلى:** SQL Editor (📝)
3. **انقر:** "New Query"
4. **افتح ملف** `supabase-schema.sql` من المشروع
5. **انسخ المحتوى كاملاً** والصقه في المحرر
6. **انقر:** "Run" (أو اضغط Ctrl+Enter)
7. **انتظر** حتى يظهر: `Success. No rows returned`

✅ **تأكد من النجاح:**
- اذهب إلى: Table Editor
- يجب أن ترى 13 جدول: users, roles, properties, units, etc.

### 1.4 إعداد Authentication

1. **اذهب إلى:** Authentication → Providers
2. **فعّل Email:**
   - Enable Email provider: ✅
   - Confirm email: ❌ (اختياري للتطوير)
3. **اضبط URL Settings:**
   - Site URL: `http://localhost:3000` (مؤقت)
   - Redirect URLs: `http://localhost:3000/**`

---

## 🔧 الخطوة 2: إعداد المشروع محلياً

### 2.1 استنساخ المشروع

```bash
# إذا كنت تستخدم Git
git clone your-repo-url
cd daryum-platform

# تثبيت المكتبات
npm install
```

### 2.2 إعداد Environment Variables

1. **أنشئ ملف** `.env.local` في الجذر
2. **انسخ المحتوى من** `.env.example`
3. **استبدل القيم:**

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=داريوم
```

### 2.3 اختبار محلي

```bash
# تشغيل المشروع
npm run dev

# افتح المتصفح
http://localhost:3000
```

✅ **تأكد من:**
- الصفحة الرئيسية تعمل
- يمكنك الذهاب إلى `/login`
- لا توجد أخطاء في Console

---

## 🌐 الخطوة 3: النشر على Vercel

### 3.1 ربط GitHub

1. **ارفع المشروع إلى GitHub:**

```bash
git init
git add .
git commit -m "Initial commit - Daryum Platform"
git branch -M main
git remote add origin your-github-repo-url
git push -u origin main
```

### 3.2 إنشاء مشروع Vercel

1. **اذهب إلى:** https://vercel.com
2. **سجل دخول** باستخدام GitHub
3. **انقر:** "Add New..." → "Project"
4. **اختر:** repository من GitHub
5. **انقر:** "Import"

### 3.3 إعداد Build Settings

**Vercel ستكتشف Next.js تلقائياً، تأكد من:**

- Framework Preset: `Next.js`
- Root Directory: `./`
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### 3.4 إضافة Environment Variables

**في صفحة الإعداد، أضف:**

```
NEXT_PUBLIC_SUPABASE_URL = https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_APP_URL = https://your-project.vercel.app
NEXT_PUBLIC_APP_NAME = داريوم
```

### 3.5 Deploy

1. **انقر:** "Deploy"
2. **انتظر** 2-3 دقائق
3. **ستحصل على URL:** `https://your-project.vercel.app`

---

## 🔗 الخطوة 4: ربط Supabase بـ Vercel

### 4.1 تحديث Redirect URLs في Supabase

1. **عد إلى Supabase Dashboard**
2. **اذهب إلى:** Authentication → URL Configuration
3. **حدّث:**
   - Site URL: `https://your-project.vercel.app`
   - Redirect URLs: `https://your-project.vercel.app/**`

### 4.2 تحديث CORS (اختياري)

في Supabase:
- اذهب إلى: Settings → API
- Additional Allowed Origins: `https://your-project.vercel.app`

---

## 👤 الخطوة 5: إنشاء حساب Admin الأول

### 5.1 عبر Supabase Dashboard

1. **اذهب إلى:** Authentication → Users
2. **انقر:** "Add user" → "Create new user"
3. **املأ:**
   - Email: `admin@daryum.sa`
   - Password: (كلمة مرور قوية)
   - Auto Confirm User: ✅
4. **انقر:** "Create user"

### 5.2 إضافة بيانات المستخدم

1. **اذهب إلى:** Table Editor → `users`
2. **انقر:** "Insert" → "Insert row"
3. **املأ:**
   ```
   id: (نسخ من auth.users)
   email: admin@daryum.sa
   full_name: مدير النظام
   role: admin
   status: active
   workspace_id: (اتركه null مؤقتاً)
   ```

---

## ✅ الخطوة 6: اختبار نهائي

### 6.1 Checklist

- [ ] الصفحة الرئيسية تعمل: `https://your-project.vercel.app`
- [ ] صفحة Login تعمل: `/login`
- [ ] يمكن تسجيل الدخول بحساب Admin
- [ ] Dashboard يظهر بعد الدخول
- [ ] صفحات Admin تعمل: `/admin`
- [ ] لا توجد أخطاء في Console
- [ ] RTL يعمل بشكل صحيح

### 6.2 اختبار الأداء

```bash
# Lighthouse Score
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90
```

---

## 🎨 الخطوة 7: Domain مخصص (اختياري)

### 7.1 في Vercel

1. **اذهب إلى:** Settings → Domains
2. **انقر:** "Add Domain"
3. **أدخل:** `daryum.sa` أو `app.daryum.sa`
4. **اتبع التعليمات** لإعداد DNS

### 7.2 تحديث Supabase

- Site URL: `https://app.daryum.sa`
- Redirect URLs: `https://app.daryum.sa/**`

---

## 📊 الخطوة 8: Monitoring & Analytics

### 8.1 Vercel Analytics

1. **اذهب إلى:** Analytics في Vercel
2. **فعّل:** Web Analytics
3. **راقب:** Performance metrics

### 8.2 Supabase Monitoring

1. **اذهب إلى:** Reports في Supabase
2. **راقب:**
   - API requests
   - Database size
   - Active users

---

## 🔐 الخطوة 9: الأمان

### 9.1 Row Level Security (RLS)

✅ **تم تفعيلها بالفعل في Schema**

تأكد من:
- جميع الجداول لديها RLS enabled
- Policies صحيحة لكل جدول

### 9.2 API Rate Limiting

في Supabase:
- اذهب إلى: Settings → API
- راجع Rate limits

### 9.3 Secrets Management

- ❌ **لا تشارك** Environment Variables
- ✅ **استخدم** Vercel Environment Variables
- ✅ **غيّر** Database Password بانتظام

---

## 🚨 استكشاف الأخطاء

### مشكلة: "Supabase connection failed"

**الحل:**
1. تأكد من صحة `NEXT_PUBLIC_SUPABASE_URL`
2. تأكد من صحة `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. تحقق من Supabase Project status

### مشكلة: "Auth redirect not working"

**الحل:**
1. تحقق من Redirect URLs في Supabase
2. تأكد من `NEXT_PUBLIC_APP_URL` صحيح
3. امسح Cache المتصفح

### مشكلة: "Build failed on Vercel"

**الحل:**
1. تحقق من Build logs
2. تأكد من Environment Variables مضافة
3. جرّب: `npm run build` محلياً

---

## 📞 الدعم

إذا واجهت مشاكل:

1. **راجع الأخطاء في:**
   - Vercel Logs: Dashboard → Deployments → View Function Logs
   - Supabase Logs: Dashboard → Logs Explorer
   - Browser Console: F12 → Console

2. **الموارد:**
   - Supabase Docs: https://supabase.com/docs
   - Vercel Docs: https://vercel.com/docs
   - Next.js Docs: https://nextjs.org/docs

---

## 🎉 تهانينا!

منصة داريوم جاهزة للعمل الآن! 🚀

**الخطوات التالية:**
- [ ] دعوة أعضاء الفريق
- [ ] إضافة بيانات حقيقية
- [ ] تخصيص الإعدادات
- [ ] إعداد النسخ الاحتياطي
- [ ] تدريب المستخدمين

---

**Built with ❤️ for Saudi property operators**