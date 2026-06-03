# 🛠️ التقنيات المستخدمة في منصة داريوم
# Tech Stack - Daryum Platform

---

## 📱 Frontend (الواجهة الأمامية)

### 1️⃣ **React 18.3**
- **مكتبة JavaScript** لبناء واجهات المستخدم التفاعلية
- **مميزات:**
  - Component-Based Architecture (معمارية قائمة على المكونات)
  - Virtual DOM لتحسين الأداء
  - Hooks (useState, useEffect, useContext)
  - Server Components support

### 2️⃣ **Next.js 15.2 (Page Router)**
- **إطار عمل React** متقدم للتطبيقات الحديثة
- **المميزات المستخدمة:**
  - **Page Router:** نظام توجيه قائم على الملفات (`src/pages/`)
  - **API Routes:** نقاط نهاية API بدون خادم (`src/pages/api/`)
  - **Image Optimization:** تحسين تلقائي للصور
  - **Built-in CSS Support:** دعم Tailwind CSS مباشرة
  - **Static Site Generation (SSG):** لصفحات Landing والمحتوى الثابت
  - **Server-Side Rendering (SSR):** للصفحات الديناميكية
  - **Fast Refresh:** تحديث فوري أثناء التطوير

**لماذا Next.js؟**
- أداء عالي (SEO-friendly)
- Serverless Functions مدمجة
- دعم ثنائي اللغة (RTL/LTR) سلس
- سهولة النشر على Vercel

### 3️⃣ **TypeScript**
- **لغة برمجة** مبنية على JavaScript مع نظام الأنواع القوي
- **الفوائد:**
  - اكتشاف الأخطاء قبل التشغيل
  - IntelliSense محسّن في VS Code
  - كود أكثر أماناً وقابلية للصيانة
  - توثيق تلقائي للـ APIs

**مثال:**
```typescript
interface Property {
  id: string;
  name: string;
  name_ar: string;
  type: 'apartment' | 'villa' | 'hotel';
  city: string;
  status: 'active' | 'inactive' | 'maintenance';
}
```

### 4️⃣ **Tailwind CSS 3.4**
- **إطار عمل CSS** قائم على Utility Classes
- **المميزات:**
  - تصميم سريع بدون مغادرة HTML
  - ملف CSS نهائي صغير جداً (استخدام PurgeCSS)
  - دعم RTL/LTR مدمج
  - Responsive Design سهل
  - Dark Mode جاهز

**مثال:**
```tsx
<div className="bg-primary text-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all">
  محتوى البطاقة
</div>
```

**التخصيص في المشروع:**
```javascript
// tailwind.config.ts
colors: {
  primary: 'hsl(152 78% 36%)',      // Emerald
  secondary: 'hsl(222 47% 11%)',    // Navy
  accent: 'hsl(43 74% 66%)',        // Gold
  available: 'hsl(152 78% 36%)',    // Green
  occupied: 'hsl(217 91% 60%)',     // Blue
  cleaning: 'hsl(174 62% 47%)',     // Teal
  maintenance: 'hsl(38 92% 50%)',   // Amber
}
```

### 5️⃣ **shadcn/ui**
- **مكتبة مكونات UI** قابلة للتخصيص بالكامل
- **المكونات المستخدمة:**
  - `Button, Card, Badge` - عناصر أساسية
  - `Dialog, AlertDialog` - نوافذ منبثقة
  - `Select, Input, Textarea` - حقول الإدخال
  - `Table, Tabs` - عرض البيانات
  - `Toast` - إشعارات
  - `Calendar, DatePicker` - تواريخ
  - `Sidebar` - قائمة جانبية

**لماذا shadcn/ui؟**
- الكود يُنسخ إلى مشروعك (لا توجد تبعية خارجية)
- تخصيص كامل بدون قيود
- دعم TypeScript كامل
- Accessible by default (WCAG compliant)

### 6️⃣ **Lucide React**
- **مكتبة أيقونات** خفيفة وعصرية
- **المميزات:**
  - 1000+ أيقونة جاهزة
  - حجم صغير جداً (tree-shakeable)
  - دعم TypeScript
  - قابلة للتخصيص (لون، حجم، stroke)

**مثال:**
```tsx
import { Home, Calendar, DollarSign } from "lucide-react";

<Home className="w-5 h-5 text-primary" />
```

---

## 🔧 Backend (الخادم الخلفي)

### 1️⃣ **Next.js API Routes**
- **Serverless Functions** مدمجة في Next.js
- **المسار:** `src/pages/api/`
- **المميزات:**
  - لا يحتاج خادم منفصل
  - Auto-scaling تلقائي
  - دعم Middleware
  - TypeScript support

**مثال:**
```typescript
// src/pages/api/properties/index.ts
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data } = await supabase.from('properties').select('*');
    return res.status(200).json(data);
  }
}
```

**الاستخدامات في المشروع:**
- `/api/auth/*` - نقاط نهاية المصادقة
- `/api/properties/*` - إدارة العقارات
- معظم العمليات تتم مباشرة من Frontend إلى Supabase

### 2️⃣ **Supabase (Backend as a Service)**
- **منصة متكاملة** توفر:
  - Database (PostgreSQL)
  - Authentication
  - Storage
  - Real-time subscriptions
  - Edge Functions (serverless)
  - Row Level Security (RLS)

**لماذا Supabase؟**
- بديل Open Source لـ Firebase
- SQL كامل (PostgreSQL)
- أمان قوي مع RLS
- API جاهز تلقائياً
- دعم TypeScript مدمج
- سريع جداً (hosted في AWS)

**اتصال Supabase:**
```typescript
// src/integrations/supabase/client.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

---

## 🗄️ Database (قاعدة البيانات)

### 1️⃣ **PostgreSQL (via Supabase)**
- **نظام إدارة قواعد بيانات** قوي ومتقدم
- **المميزات:**
  - ACID Compliance (معاملات آمنة)
  - JSON/JSONB support (بيانات مرنة)
  - Full-text search (بحث متقدم)
  - Foreign Keys & Constraints (علاقات قوية)
  - Triggers & Functions (أتمتة)

### 2️⃣ **الجداول الرئيسية في المشروع:**

```sql
-- العقارات
properties (
  id, name, name_ar, type, address, city, 
  cover_image, description, status, created_at
)

-- الوحدات السكنية
units (
  id, property_id, name, unit_number, type, 
  status, bedrooms, bathrooms, max_guests, 
  size_sqm, price_per_night, floor
)

-- الحجوزات
reservations (
  id, unit_id, property_id, guest_name, 
  guest_email, guest_phone, check_in, check_out, 
  nights, guest_count, status, channel, 
  total_amount, paid_amount, reservation_code
)

-- مهام التنظيف
housekeeping_tasks (
  id, unit_id, property_id, assigned_to, 
  task_type, status, scheduled_date, 
  completed_at, notes
)

-- تذاكر الصيانة
maintenance_tickets (
  id, unit_id, property_id, ticket_number, 
  title, description, category, priority, 
  status, assigned_to, estimated_cost, actual_cost
)

-- الرسائل
messages (
  id, reservation_id, sender_type, sender_name, 
  recipient_type, recipient_name, message, 
  channel, status, created_at
)

-- المستخدمين
users (
  id, email, full_name, full_name_ar, phone, 
  role, status, avatar_url, created_at
)

-- المستخدمين الأساسيين (Supabase Auth)
auth.users (
  id, email, encrypted_password, 
  email_confirmed_at, created_at
)
```

### 3️⃣ **Row Level Security (RLS)**
- **نظام أمان متقدم** على مستوى الصفوف
- **المميزات:**
  - كل مستخدم يرى بياناته فقط
  - السياسات تُطبق على مستوى قاعدة البيانات
  - لا يمكن تجاوزها من Frontend

**مثال:**
```sql
-- سياسة: المستخدم يرى حجوزاته فقط
CREATE POLICY "users_select_own_reservations"
ON reservations FOR SELECT
USING (auth.uid() = user_id);

-- سياسة: المدير يرى جميع العقارات
CREATE POLICY "admins_select_all_properties"
ON properties FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid() 
    AND role = 'admin'
  )
);
```

### 4️⃣ **Database Types (TypeScript)**
- Supabase يولّد **أنواع TypeScript** تلقائياً
- **الملف:** `src/integrations/supabase/database.types.ts`
- **الفائدة:** Auto-completion كامل في الكود

```typescript
import type { Database } from '@/integrations/supabase/types';

type Property = Database['public']['Tables']['properties']['Row'];
```

---

## 🔐 Authentication & Authorization

### 1️⃣ **Supabase Auth**
- **نظام مصادقة متكامل**
- **المميزات المستخدمة:**
  - Email/Password authentication
  - JWT Tokens (آمن)
  - Session management
  - Password reset
  - Email verification

**مثال التسجيل:**
```typescript
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'securepassword',
  options: {
    data: {
      full_name: 'أحمد محمد',
      role: 'property_manager'
    }
  }
});
```

### 2️⃣ **Role-Based Access Control (RBAC)**
- **6 أدوار في المشروع:**
  - `admin` - صلاحيات كاملة
  - `property_manager` - إدارة العقارات
  - `owner` - مشاهدة الأرباح
  - `accountant` - التقارير المالية
  - `housekeeping_supervisor` - إدارة التنظيف
  - `maintenance_staff` - إدارة الصيانة

**التحقق من الصلاحية:**
```typescript
const { data: user } = await supabase.auth.getUser();
const { data: profile } = await supabase
  .from('users')
  .select('role')
  .eq('id', user.id)
  .single();

if (profile.role !== 'admin') {
  throw new Error('غير مصرح لك');
}
```

---

## 🌐 State Management (إدارة الحالة)

### 1️⃣ **React Context API**
- **مدير الحالة المدمج** في React
- **الاستخدامات:**
  - `AuthContext` - حالة المصادقة العامة
  - `RoleContext` - دور المستخدم الحالي
  - `ThemeProvider` - وضع الإضاءة/الظلام

**مثال:**
```typescript
// src/contexts/AuthContext.tsx
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
```

### 2️⃣ **React Hooks**
- **Custom Hooks** للوظائف المتكررة
- **الأمثلة:**
  - `useProperties` - جلب العقارات
  - `useToast` - عرض الإشعارات
  - `useMobile` - كشف الأجهزة المحمولة

---

## 📦 Build & Deployment

### 1️⃣ **Vercel**
- **منصة النشر** للـ Frontend
- **المميزات:**
  - نشر تلقائي من Git
  - Edge Network (سرعة عالمية)
  - Environment Variables آمنة
  - Preview Deployments لكل PR
  - Auto-scaling لا محدود

**الإعداد:**
```bash
vercel --prod
```

### 2️⃣ **Supabase Cloud**
- **استضافة Backend + Database**
- **المميزات:**
  - Database Backup تلقائي
  - SSL مدمج
  - Monitoring & Logs
  - API Gateway سريع

---

## 🔄 Real-time Features

### **Supabase Realtime**
- **اشتراكات فورية** للتحديثات المباشرة
- **الاستخدام:**
  - تحديث قائمة الحجوزات لحظياً
  - إشعارات الرسائل الجديدة
  - حالة مهام التنظيف

**مثال:**
```typescript
const subscription = supabase
  .channel('reservations')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'reservations' },
    (payload) => {
      console.log('تحديث جديد:', payload);
      fetchReservations(); // تحديث القائمة
    }
  )
  .subscribe();
```

---

## 🎨 Styling & Design System

### **CSS Variables + Tailwind**
```css
/* src/styles/globals.css */
:root {
  --primary: 152 78% 36%;        /* Emerald */
  --secondary: 222 47% 11%;      /* Navy */
  --accent: 43 74% 66%;          /* Gold */
  --background: 45 56% 96%;      /* Cream */
}
```

### **Fonts:**
- **Display:** Urbanist (700) - العناوين
- **Body:** IBM Plex Sans (400, 600) - المحتوى
- **Mono:** IBM Plex Mono (400, 600) - البيانات المالية

---

## 🧪 Development Tools

### 1️⃣ **PM2**
- **مدير عمليات Node.js**
- **الاستخدام:** إعادة تشغيل الخادم تلقائياً
```bash
pm2 restart all
pm2 logs
```

### 2️⃣ **ESLint**
- **أداة فحص الكود**
- **الفائدة:** اكتشاف الأخطاء والأنماط السيئة

### 3️⃣ **TypeScript Compiler**
- **التحقق من الأنواع**
```bash
npx tsc --noEmit
```

---

## 📊 Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                    USER BROWSER                      │
│  (React + Next.js + Tailwind + shadcn/ui)           │
└─────────────────┬───────────────────────────────────┘
                  │
                  │ HTTPS/REST API
                  │
┌─────────────────▼───────────────────────────────────┐
│              NEXT.JS SERVER (Vercel)                 │
│  • Page Rendering (SSR/SSG)                         │
│  • API Routes (Serverless)                          │
│  • Image Optimization                               │
└─────────────────┬───────────────────────────────────┘
                  │
                  │ Supabase Client SDK
                  │
┌─────────────────▼───────────────────────────────────┐
│              SUPABASE CLOUD                          │
│  ┌─────────────────────────────────────────┐        │
│  │     PostgreSQL Database + RLS           │        │
│  └─────────────────────────────────────────┘        │
│  ┌─────────────────────────────────────────┐        │
│  │     Auth (JWT + Email/Password)         │        │
│  └─────────────────────────────────────────┘        │
│  ┌─────────────────────────────────────────┐        │
│  │     Storage (File Uploads)              │        │
│  └─────────────────────────────────────────┘        │
│  ┌─────────────────────────────────────────┐        │
│  │     Realtime (WebSockets)               │        │
│  └─────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────┘
```

---

## 🚀 Performance Features

### 1️⃣ **Code Splitting**
- Next.js يقسم الكود تلقائياً
- كل صفحة تحمل فقط ما تحتاجه

### 2️⃣ **Image Optimization**
- `next/image` يحسن الصور تلقائياً
- Lazy loading مدمج
- WebP format تلقائي

### 3️⃣ **Static Generation**
- صفحة Landing تُبنى مرة واحدة
- سرعة تحميل فائقة

### 4️⃣ **Database Indexing**
- Indexes على الأعمدة الشائعة
- استعلامات سريعة جداً

---

## 🔒 Security Features

1. **Row Level Security (RLS)** - حماية البيانات على مستوى الصف
2. **JWT Tokens** - مصادقة آمنة
3. **HTTPS Only** - تشفير كامل
4. **Environment Variables** - أسرار محمية
5. **SQL Injection Protection** - Parameterized queries
6. **XSS Protection** - React يمنعه تلقائياً
7. **CSRF Protection** - SameSite cookies

---

## 📦 Package.json - Dependencies

```json
{
  "dependencies": {
    "react": "^18.3.0",
    "next": "^15.2.0",
    "@supabase/supabase-js": "^2.x",
    "typescript": "^5.x",
    "tailwindcss": "^3.4.0",
    "@radix-ui/react-*": "^1.x",     // shadcn/ui base
    "lucide-react": "^0.474.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.5"
  }
}
```

---

## 🎯 Key Technical Decisions

### لماذا Next.js بدلاً من Create React App؟
✅ SSR/SSG مدمج (أفضل لـ SEO)  
✅ API Routes مدمجة (لا حاجة لـ Express)  
✅ Image Optimization تلقائي  
✅ File-based routing (أسهل)  

### لماذا Supabase بدلاً من Firebase؟
✅ SQL كامل (PostgreSQL)  
✅ Open Source  
✅ RLS قوي  
✅ أرخص بكثير  
✅ لا vendor lock-in  

### لماذا TypeScript بدلاً من JavaScript؟
✅ اكتشاف الأخطاء مبكراً  
✅ IntelliSense أفضل  
✅ Refactoring آمن  
✅ توثيق تلقائي  

### لماذا Tailwind بدلاً من CSS Modules؟
✅ أسرع في التطوير  
✅ ملف CSS نهائي أصغر  
✅ لا صراعات في الأسماء  
✅ Responsive Design سهل  

---

## 📚 Learning Resources

### Next.js
- [nextjs.org/docs](https://nextjs.org/docs)
- [Next.js Tutorial](https://nextjs.org/learn)

### Supabase
- [supabase.com/docs](https://supabase.com/docs)
- [Supabase YouTube](https://youtube.com/@Supabase)

### Tailwind CSS
- [tailwindcss.com/docs](https://tailwindcss.com/docs)
- [Tailwind UI](https://tailwindui.com/)

### shadcn/ui
- [ui.shadcn.com](https://ui.shadcn.com/)

---

## 🔮 Future Tech Enhancements

### قيد التخطيط:
- [ ] **Redis** - للكاش وتحسين الأداء
- [ ] **ElasticSearch** - بحث متقدم
- [ ] **S3** - تخزين ملفات إضافي
- [ ] **Stripe** - معالجة الدفع
- [ ] **Twilio** - رسائل SMS
- [ ] **Sentry** - تتبع الأخطاء
- [ ] **Analytics** - Google Analytics / Mixpanel
- [ ] **CDN** - Cloudflare للصور

---

## 💡 Best Practices في المشروع

### 1️⃣ Code Organization
```
src/
├── components/        # مكونات قابلة لإعادة الاستخدام
├── pages/            # الصفحات والـ routes
├── hooks/            # Custom React Hooks
├── contexts/         # State Management
├── services/         # API calls & Business Logic
├── lib/              # Utility functions
├── styles/           # Global styles
└── integrations/     # External services (Supabase)
```

### 2️⃣ Naming Conventions
- **Components:** PascalCase (PropertyCard.tsx)
- **Hooks:** camelCase + "use" prefix (useProperties.ts)
- **Files:** kebab-case for pages (property-details.tsx)
- **Variables:** camelCase (propertyId)
- **Constants:** UPPER_SNAKE_CASE (API_URL)

### 3️⃣ TypeScript Rules
- كل ملف `.tsx` وليس `.jsx`
- Interfaces للـ Props
- Types للـ Data Models
- No `any` type (إلا للضرورة)

### 4️⃣ Performance
- Lazy loading للمكونات الثقيلة
- React.memo للمكونات التي لا تتغير كثيراً
- useMemo/useCallback للحسابات المكلفة
- Image optimization دائماً

---

<div align="center">

## 🎓 ملخص التقنيات

| الفئة | التقنية | الإصدار |
|------|---------|---------|
| **Frontend Framework** | Next.js | 15.2 |
| **UI Library** | React | 18.3 |
| **Language** | TypeScript | 5.x |
| **Styling** | Tailwind CSS | 3.4 |
| **Components** | shadcn/ui | Latest |
| **Icons** | Lucide React | 0.474 |
| **Backend** | Supabase | 2.x |
| **Database** | PostgreSQL | Latest |
| **Auth** | Supabase Auth | Built-in |
| **Deployment** | Vercel | Cloud |

---

**تم بناء المشروع باستخدام أحدث التقنيات لضمان:**
- 🚀 أداء عالي
- 🔒 أمان قوي
- 📱 تجربة مستخدم ممتازة
- 🔧 سهولة الصيانة
- 📈 قابلية التوسع

</div>