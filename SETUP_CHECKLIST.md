# ✅ قائمة فحص الإطلاق - Daryum Platform

استخدم هذه القائمة للتأكد من اكتمال جميع خطوات الإطلاق.

---

## 📋 قبل البدء

- [ ] Node.js 18+ مثبت
- [ ] Git مثبت
- [ ] حساب GitHub جاهز
- [ ] حساب Supabase جاهز (مجاني)
- [ ] حساب Vercel جاهز (مجاني)

---

## 🗄️ إعداد Supabase

### إنشاء المشروع
- [ ] إنشاء مشروع Supabase جديد
- [ ] اختيار Region: Middle East (Bahrain)
- [ ] حفظ Database Password بأمان
- [ ] انتظار اكتمال إنشاء المشروع (2-3 دقائق)

### مفاتيح API
- [ ] نسخ Project URL من Settings → API
- [ ] نسخ anon public key من Settings → API
- [ ] حفظ المفاتيح في مكان آمن

### Database Schema
- [ ] فتح SQL Editor في Supabase
- [ ] نسخ محتوى `supabase-schema.sql`
- [ ] تشغيل Schema في SQL Editor
- [ ] التأكد من ظهور Success message
- [ ] التحقق من وجود 13 جدول في Table Editor

### Authentication
- [ ] تفعيل Email Provider
- [ ] إعداد Site URL: `http://localhost:3000`
- [ ] إعداد Redirect URLs: `http://localhost:3000/**`

---

## 🔧 إعداد المشروع محلياً

### الملفات
- [ ] استنساخ المشروع من Git
- [ ] إنشاء ملف `.env.local`
- [ ] نسخ محتوى `.env.example`
- [ ] إضافة Supabase URL و Anon Key

### التثبيت
- [ ] تشغيل `npm install`
- [ ] التأكد من تثبيت جميع المكتبات بنجاح
- [ ] حل أي تعارضات في الإصدارات

### الاختبار المحلي
- [ ] تشغيل `npm run dev`
- [ ] فتح http://localhost:3000
- [ ] التأكد من ظهور الصفحة الرئيسية
- [ ] التحقق من عدم وجود أخطاء في Console
- [ ] اختبار الانتقال إلى `/login`

---

## 🌐 النشر على Vercel

### GitHub
- [ ] رفع المشروع إلى GitHub repository
- [ ] التأكد من push جميع الملفات
- [ ] ملف `.env.local` غير موجود في Git (gitignore)

### Vercel Setup
- [ ] إنشاء حساب Vercel
- [ ] ربط GitHub account
- [ ] استيراد المشروع من GitHub
- [ ] التأكد من اكتشاف Next.js تلقائياً

### Build Settings
- [ ] Framework: Next.js ✅
- [ ] Root Directory: `./` ✅
- [ ] Build Command: `npm run build` ✅
- [ ] Output Directory: `.next` ✅

### Environment Variables
- [ ] إضافة `NEXT_PUBLIC_SUPABASE_URL`
- [ ] إضافة `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] إضافة `NEXT_PUBLIC_APP_URL` (Vercel domain)
- [ ] إضافة `NEXT_PUBLIC_APP_NAME`

### Deployment
- [ ] النقر على Deploy
- [ ] انتظار اكتمال Build (2-3 دقائق)
- [ ] التأكد من نجاح Deployment
- [ ] نسخ Production URL

---

## 🔗 ربط Supabase بـ Production

### تحديث URLs
- [ ] فتح Supabase Dashboard
- [ ] الذهاب إلى Authentication → URL Configuration
- [ ] تحديث Site URL إلى Vercel domain
- [ ] تحديث Redirect URLs: `https://your-domain.vercel.app/**`
- [ ] حفظ التغييرات

### CORS (اختياري)
- [ ] الذهاب إلى Settings → API
- [ ] إضافة Vercel domain في Additional Allowed Origins

---

## 👤 إنشاء Admin Account

### في Supabase
- [ ] الذهاب إلى Authentication → Users
- [ ] Create new user
- [ ] Email: `admin@daryum.sa`
- [ ] كلمة مرور قوية
- [ ] Auto Confirm User: ✅
- [ ] Create user

### إضافة بيانات المستخدم
- [ ] فتح Table Editor → `users`
- [ ] Insert new row
- [ ] نسخ user ID من auth.users
- [ ] إضافة: email, full_name, role: admin, status: active
- [ ] Save

---

## ✅ اختبار شامل

### الصفحات الرئيسية
- [ ] الصفحة الرئيسية تعمل
- [ ] صفحة Login تعمل
- [ ] صفحة Register تعمل
- [ ] يمكن تسجيل الدخول بحساب Admin
- [ ] Dashboard يظهر بعد الدخول

### صفحات Dashboard
- [ ] `/dashboard` - لوحة التحكم
- [ ] `/dashboard/properties` - العقارات
- [ ] `/dashboard/units` - الوحدات
- [ ] `/dashboard/reservations` - الحجوزات
- [ ] `/dashboard/finance` - المالية

### صفحات Admin
- [ ] `/admin` - لوحة الأدمن
- [ ] `/admin/users` - إدارة المستخدمين
- [ ] `/admin/roles` - إدارة الأدوار
- [ ] `/admin/subscriptions` - الاشتراكات
- [ ] `/admin/payments` - المدفوعات

### الوظائف
- [ ] تسجيل الدخول يعمل
- [ ] تسجيل الخروج يعمل
- [ ] Protected routes تعمل
- [ ] RTL يعمل بشكل صحيح
- [ ] جميع الجداول تعرض البيانات
- [ ] Dialogs تفتح وتغلق

### الأداء
- [ ] لا توجد أخطاء في Console
- [ ] لا توجد أخطاء في Network tab
- [ ] الصفحات تحمّل بسرعة (<3 ثواني)
- [ ] الصور تظهر بشكل صحيح

---

## 🎨 Domain مخصص (اختياري)

- [ ] شراء Domain (daryum.sa)
- [ ] إضافة Domain في Vercel
- [ ] إعداد DNS Records
- [ ] تحديث Supabase URLs
- [ ] اختبار Domain الجديد

---

## 📊 Monitoring

### Vercel
- [ ] تفعيل Web Analytics
- [ ] مراجعة Performance metrics
- [ ] إعداد Alerts

### Supabase
- [ ] مراجعة Database size
- [ ] مراجعة API requests
- [ ] إعداد Database backup schedule

---

## 🔐 الأمان

### Supabase
- [ ] RLS enabled على جميع الجداول
- [ ] Policies صحيحة
- [ ] تغيير Database Password
- [ ] تفعيل 2FA على الحساب

### Vercel
- [ ] Environment Variables آمنة
- [ ] HTTPS مفعّل
- [ ] Security Headers صحيحة

### General
- [ ] لا توجد API Keys في الكود
- [ ] جميع Secrets في Environment Variables
- [ ] `.env.local` في `.gitignore`

---

## 📚 التوثيق

- [ ] README.md محدث
- [ ] DEPLOYMENT.md جاهز
- [ ] API documentation (اختياري)
- [ ] User guide (اختياري)

---

## 🚀 الإطلاق النهائي

### Pre-launch
- [ ] مراجعة جميع النقاط أعلاه
- [ ] اختبار شامل للمنصة
- [ ] Backup قاعدة البيانات
- [ ] إعداد فريق الدعم

### Launch
- [ ] إعلان الإطلاق
- [ ] دعوة المستخدمين الأوائل
- [ ] مراقبة الأداء
- [ ] الاستعداد لحل المشاكل الطارئة

### Post-launch
- [ ] جمع Feedback
- [ ] تحليل Metrics
- [ ] تحديثات سريعة للأخطاء
- [ ] تخطيط Features القادمة

---

## 🎉 تم الإطلاق!

التاريخ: ___________  
الوقت: ___________  
Production URL: ___________

**ملاحظات:**
_________________________________
_________________________________
_________________________________

---

**Built with ❤️ for Saudi property operators**