# 🏢 Saudi PropTech SaaS Platform - Complete Technical Specification

Build a premium, production-ready Saudi PropTech SaaS platform for property management, reservations, hospitality operations, and rental workflows. This is a flagship 2026 Saudi product for serious operators, property managers, and portfolio owners.

---

## 🎯 PRODUCT VISION

Create a Saudi-first PropTech operating system (NOT a booking tool) that unifies:
- Multi-property portfolio management
- Unit inventory and availability
- Multi-channel reservations (Airbnb, Booking.com, Direct, OTAs)
- Calendar and dynamic pricing
- Guest messaging with AI assistance
- Housekeeping operations and task management
- Maintenance ticketing and SLA tracking
- Owner statements and revenue sharing
- VAT-aware financial reporting and reconciliation
- Automation workflows
- Executive analytics and AI insights
- Bilingual Arabic-first experience (RTL + LTR)

**Target Market:** Saudi Arabia rental operators managing SAR 10M–200M+ portfolios

---

## 🎨 DESIGN SYSTEM & BRAND IDENTITY

### **Color Palette (HSL Format)**
```css
/* Primary Colors */
--primary: 152 78% 36%;           /* Deep Emerald (Saudi green, hospitality trust) */
--primary-foreground: 0 0% 100%;  /* White */

--secondary: 222 47% 11%;         /* Midnight Navy (executive authority) */
--secondary-foreground: 0 0% 100%; /* White */

--accent: 43 74% 66%;             /* Warm Gold (premium highlights) */
--accent-foreground: 222 47% 11%; /* Navy text on gold */

/* Background System */
--background: 45 56% 96%;         /* Warm Cream (sophisticated warmth, not stark white) */
--foreground: 222 47% 11%;        /* Deep Slate */
--muted: 45 20% 88%;              /* Soft Sand */
--muted-foreground: 222 20% 40%;  /* Muted Slate */

/* Cards & UI Elements */
--card: 0 0% 100%;                /* White cards */
--card-foreground: 222 47% 11%;   /* Navy */
--border: 45 20% 82%;             /* Warm border */
--destructive: 0 84% 60%;         /* Elegant Coral */

/* PropTech Semantic Colors */
--available: 152 78% 36%;         /* Emerald (unit available) */
--occupied: 217 91% 60%;          /* Blue (unit occupied) */
--cleaning: 174 62% 47%;          /* Teal (cleaning in progress) */
--maintenance: 38 92% 50%;        /* Amber (maintenance required) */
--blocked: 222 20% 40%;           /* Slate (blocked dates) */
```

### **Typography System**
```
Display Font: Urbanist (700) - Geometric confidence for headlines, hero sections
Body Font: IBM Plex Sans (400, 600) - Bilingual clarity for UI and content
Data Font: IBM Plex Mono (400, 600) - Tabular numbers for financial data, KPIs

Import URL:
@import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@700&family=IBM+Plex+Sans:wght@400;600&family=IBM+Plex+Mono:wght@400;600&display=swap');
```

### **Design Principles**
- Premium Saudi enterprise aesthetic (NOT generic SaaS template)
- Executive command center layout with controlled information density
- Subtle elevation with soft shadows and generous whitespace
- Sophisticated chart gradients (emerald → teal for revenue, navy → blue for occupancy)
- Arabic-first bilingual experience that feels native, not translated
- Warm backgrounds (cream/sand) instead of stark white
- Desktop-first with thoughtful mobile responsive adaptation
- Real operational depth with realistic workflows and data

---

## 🏗️ TECHNICAL STACK

### **Core Framework**
- **Next.js 15.2** (Page Router architecture)
- **React 18.3**
- **TypeScript** (strict mode)
- **Tailwind CSS 3.4** with custom design system

### **UI Components**
- **shadcn/ui** (pre-installed in `src/components/ui/`)
- **lucide-react** icons (v0.474)
- Custom themed components with emerald/navy/gold variants

### **Backend & Database**
- **Supabase** (PostgreSQL + Auth + Storage + Edge Functions)
- Full database schema with 14+ tables
- Row Level Security (RLS) policies implemented
- TypeScript types auto-generated from schema

### **Authentication**
- Supabase Auth with email/password
- Protected routes with session management
- Role-based access control (7 roles)
- Auto-confirm enabled (no email verification required)

### **Deployment**
- **Vercel** (optimized for Next.js)
- PM2 process manager for dev server
- Environment variables in `.env.local`

---

## 📊 DATABASE SCHEMA (14 TABLES)

### **1. roles** - User Roles & Permissions
```sql
CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,              -- 'admin', 'property_manager', 'owner', etc.
  name_ar TEXT NOT NULL,                  -- Arabic role name
  description TEXT,
  permissions JSONB DEFAULT '{}',         -- Role-specific permissions
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### **2. users** - User Accounts
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'property_manager',   -- Links to roles.name
  full_name TEXT,
  phone TEXT,
  status TEXT DEFAULT 'active',           -- 'active', 'inactive', 'suspended'
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### **3. properties** - Property Portfolio
```sql
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES users(id),
  name TEXT NOT NULL,
  name_ar TEXT NOT NULL,                  -- Arabic property name
  type TEXT NOT NULL,                     -- 'apartment', 'villa', 'hotel', etc.
  address TEXT NOT NULL,
  city TEXT NOT NULL,                     -- 'Riyadh', 'Jeddah', 'Khobar', etc.
  description TEXT,
  image_url TEXT,
  status TEXT DEFAULT 'active',           -- 'active', 'inactive'
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### **4. units** - Individual Rental Units
```sql
CREATE TABLE units (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  name TEXT NOT NULL,                     -- 'Unit 101', 'Studio A', etc.
  unit_number TEXT,
  type TEXT NOT NULL,                     -- 'studio', '1br', '2br', 'penthouse', etc.
  status TEXT DEFAULT 'available',        -- 'available', 'occupied', 'cleaning', 'maintenance'
  floor INTEGER,
  area_sqm INTEGER,
  bedrooms INTEGER DEFAULT 0,
  bathrooms INTEGER DEFAULT 1,
  max_guests INTEGER DEFAULT 2,
  base_price DECIMAL(10,2) DEFAULT 0.00,  -- Base nightly rate in SAR
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### **5. reservations** - Booking Records
```sql
CREATE TABLE reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  unit_id UUID REFERENCES units(id),
  property_id UUID REFERENCES properties(id),
  guest_name TEXT NOT NULL,
  guest_email TEXT,
  guest_phone TEXT,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guest_count INTEGER DEFAULT 1,
  status TEXT DEFAULT 'pending',          -- 'pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled'
  source TEXT DEFAULT 'direct',           -- 'airbnb', 'booking', 'direct', 'agoda', 'vrbo'
  total_amount DECIMAL(10,2) DEFAULT 0.00,
  paid_amount DECIMAL(10,2) DEFAULT 0.00,
  payment_status TEXT DEFAULT 'pending',  -- 'pending', 'paid', 'partial', 'refunded'
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### **6. channels** - OTA Integration Channels
```sql
CREATE TABLE channels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,              -- 'Airbnb', 'Booking.com', etc.
  slug TEXT UNIQUE NOT NULL,              -- 'airbnb', 'booking', etc.
  type TEXT DEFAULT 'ota',                -- 'ota', 'direct', 'pms'
  commission_rate DECIMAL(5,2) DEFAULT 0.00,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### **7. messages** - Guest Communication
```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reservation_id UUID REFERENCES reservations(id),
  sender TEXT NOT NULL,                   -- 'guest', 'host', 'system'
  content TEXT NOT NULL,
  channel TEXT DEFAULT 'platform',        -- 'platform', 'whatsapp', 'email'
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### **8. housekeeping_tasks** - Cleaning Operations
```sql
CREATE TABLE housekeeping_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  unit_id UUID REFERENCES units(id),
  assigned_to UUID REFERENCES users(id),
  task_type TEXT DEFAULT 'cleaning',      -- 'cleaning', 'deep_clean', 'inspection'
  status TEXT DEFAULT 'pending',          -- 'pending', 'in_progress', 'completed'
  priority TEXT DEFAULT 'normal',         -- 'low', 'normal', 'high', 'urgent'
  scheduled_date DATE,
  scheduled_time TIME,
  completed_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### **9. maintenance_tickets** - Maintenance Tracking
```sql
CREATE TABLE maintenance_tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  unit_id UUID REFERENCES units(id),
  assigned_to UUID REFERENCES users(id),
  title TEXT NOT NULL,
  description TEXT,
  severity TEXT DEFAULT 'medium',         -- 'low', 'medium', 'high', 'critical'
  status TEXT DEFAULT 'open',             -- 'open', 'in_progress', 'resolved', 'closed'
  estimated_cost DECIMAL(10,2),
  actual_cost DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);
```

### **10. owner_statements** - Owner Financial Reports
```sql
CREATE TABLE owner_statements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES users(id),
  property_id UUID REFERENCES properties(id),
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  total_revenue DECIMAL(10,2) DEFAULT 0.00,
  commission DECIMAL(10,2) DEFAULT 0.00,
  expenses DECIMAL(10,2) DEFAULT 0.00,
  net_payout DECIMAL(10,2) DEFAULT 0.00,
  status TEXT DEFAULT 'draft',            -- 'draft', 'sent', 'paid'
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### **11-14. Supporting Tables**
- **transactions** - Financial transaction log
- **automations** - Workflow automation rules
- **integrations** - Third-party API connections
- **notifications** - User notification queue

---

## 🎭 USER ROLES SYSTEM (7 Roles)

### **Role Hierarchy & Permissions**

1. **Admin** (مدير النظام)
   - Full system access
   - User management, settings, integrations
   - Platform analytics and reports
   - Revenue: ALL properties

2. **Property Manager** (مدير عقارات)
   - Manage assigned properties
   - Handle reservations, check-ins, operations
   - View analytics for managed properties
   - Access: Assigned properties only

3. **Owner** (مالك)
   - View owned properties and units
   - Access financial statements and payouts
   - Read-only analytics for owned properties
   - Limited operational access

4. **Accountant** (محاسب)
   - Financial reconciliation and reporting
   - VAT calculations and statements
   - Owner payout management
   - No operational access

5. **Housekeeping Supervisor** (مشرف تنظيف)
   - Assign cleaning tasks
   - Monitor cleaner performance
   - Manage cleaning schedules
   - Task oversight only

6. **Cleaner** (عامل نظافة)
   - View assigned tasks
   - Update task status
   - Submit completion reports
   - Limited to own tasks

7. **Maintenance** (صيانة)
   - View assigned tickets
   - Update repair status
   - Log materials and costs
   - Limited to maintenance module

---

## 📱 PLATFORM PAGES & FEATURES (30+ Pages Implemented)

### **Public Pages**
- **Landing Page** (`/`) - Premium marketing page with:
  - Hero section with powerful CTA
  - Problem/Solution showcase
  - Core features grid
  - Role-based benefits
  - AI intelligence section
  - Saudi localization highlights
  - Testimonials
  - Final CTA
  - Premium footer

- **Login** (`/login`) - Authentication with:
  - Email/password form
  - Error handling in Arabic
  - Auto-redirect after login
  - Link to register page

- **Register** (`/register`) - User signup with:
  - Full name, email, password fields
  - Auto-confirm enabled (no email verification)
  - Auto-login after registration
  - Redirect to dashboard
  - Bilingual validation messages

### **Dashboard Pages** (Protected Routes)

1. **Main Dashboard** (`/dashboard`) - Executive overview:
   - 8 KPI cards (Revenue, Occupancy, ADR, RevPAR, Check-ins, Check-outs, Tasks, Tickets)
   - Revenue trend chart (6 months)
   - Occupancy chart
   - Channel performance breakdown
   - AI insights panel
   - Recent reservations list
   - Today's operations summary

2. **Properties** (`/dashboard/properties`) - Portfolio management:
   - Grid/table view toggle
   - Property cards with cover images
   - Status indicators
   - Unit count per property
   - Quick actions (edit, view, stats)
   - Create new property dialog

3. **Units** (`/dashboard/units`) - Inventory management:
   - Unit status grid (Available, Occupied, Cleaning, Maintenance)
   - Filters by property, type, status
   - Unit details with pricing
   - Occupancy calendar preview
   - Quick actions

4. **Calendar** (`/dashboard/calendar`) - Availability view:
   - Multi-property timeline
   - Drag-drop reservations (UI ready)
   - Channel color coding
   - Blocked dates
   - Pricing overlays
   - Month/week/day views

5. **Reservations** (`/dashboard/reservations`) - Booking management:
   - Advanced filters (status, channel, date range, property)
   - Guest details
   - Check-in/out status
   - Payment tracking
   - Channel tags
   - Stay timeline
   - Actions menu

6. **Channels** (`/dashboard/channels`) - OTA integrations:
   - Connected channels grid (Airbnb, Booking.com, Agoda, Vrbo, Direct)
   - Sync status indicators
   - Performance metrics per channel
   - Integration settings
   - API health monitoring

7. **Messages** (`/dashboard/messages`) - Guest communication:
   - Inbox layout with conversation threads
   - AI reply suggestions panel
   - Channel source tags
   - Urgency/SLA indicators
   - Quick responses
   - Search and filters

8. **Housekeeping** (`/dashboard/housekeeping`) - Cleaning operations:
   - Kanban board (Pending, In Progress, Completed)
   - Cleaner assignments
   - Task checklists
   - Time windows
   - Status updates
   - Before/after photos (UI ready)

9. **Maintenance** (`/dashboard/maintenance`) - Repair tracking:
   - Ticket cards with severity badges
   - Status workflow
   - Assignee management
   - SLA countdown
   - Cost estimation
   - Resolution notes

10. **Owners** (`/dashboard/owners`) - Owner portal:
    - Statement generation
    - Revenue summary by property
    - Payout cycles
    - Expense tracking
    - Unit contribution breakdown
    - Downloadable reports

11. **Finance** (`/dashboard/finance`) - Financial reconciliation:
    - VAT-aware reporting
    - Revenue by channel
    - Owner balances
    - Commission tracking
    - Transaction timeline
    - Payout status

12. **Reports** (`/dashboard/reports`) - Analytics:
    - Portfolio performance
    - Channel comparison
    - Revenue by unit
    - Occupancy trends
    - Booking source analysis
    - Export capabilities (CSV, PDF)

13. **Settings** (`/dashboard/settings`) - Configuration:
    - Workspace setup
    - User roles management
    - Brand settings
    - VAT/invoice preferences
    - Bilingual settings (AR/EN toggle)
    - Notification rules
    - Integration API keys

### **Admin Pages** (Admin-only)

14. **Admin Dashboard** (`/admin`)
15. **Users Management** (`/admin/users`)
16. **Roles & Permissions** (`/admin/roles`)
17. **Subscriptions** (`/admin/subscriptions`)
18. **System Logs** (`/admin/logs`)
19. **Payments** (`/admin/payments`)
20. **Analytics** (`/admin/analytics`)
21. **System Settings** (`/admin/system`)

### **User Profile Pages**

22. **Profile** (`/dashboard/profile`) - User account settings
23. **Notifications** (`/dashboard/notifications`) - Alert center
24. **Support** (`/dashboard/support`) - Help tickets

---

## 📊 REALISTIC SAUDI DEMO DATA

### **6 Saudi Properties**
1. **Riyadh Luxury Suites** (أجنحة الرياض الفاخرة)
   - Location: King Fahd Road, Al Olaya, Riyadh
   - 5 units (Executive, Business, Deluxe, Family, Royal Penthouse)
   - Owner: عبدالله المالك

2. **Jeddah Corniche Apartments** (شقق كورنيش جدة)
   - Location: Corniche Road, Al Hamra, Jeddah
   - 5 units (Studio to 3BR)
   - Owner: نورة الشمري

3. **Khobar Waterfront Residence** (مساكن الواجهة البحرية)
   - Location: Corniche Street, Al Khobar
   - 5 beachfront units
   - Owner: خالد العتيبي

4. **Riyadh Business District** (مركز أعمال الرياض)
   - Location: Olaya Street, Riyadh
   - 5 business units
   - Owner: عبدالله المالك

5. **Jeddah Marina Complex** (مجمع مارينا جدة)
   - Location: Marina District, Jeddah
   - 5 marina-view units
   - Owner: نورة الشمري

6. **Dammam Executive Suites** (أجنحة الدمام التنفيذية)
   - Location: Prince Mohammed Bin Fahd Road, Dammam
   - 5 executive units
   - Owner: خالد العتيبي

### **30 Units Total**
- Unit types: Studio, 1BR, 2BR, 3BR, Penthouse
- Pricing: SAR 450 - 870 per night
- Status distribution: 16 Available, 6 Occupied, 4 Cleaning, 2 Maintenance, 2 Blocked

### **20 Active Reservations**
- Total value: **SAR 64,800**
- Channels: Airbnb (8), Booking.com (6), Direct (4), Agoda (2)
- Status: 9 Confirmed, 9 Pending, 2 Checked-in
- Guests: Realistic Saudi and international names

### **10 Users with Roles**
- 1 Admin: محمد الإداري (admin@daryum.com)
- 2 Property Managers: أحمد المدير, فاطمة إبراهيم
- 3 Owners: عبدالله المالك, نورة الشمري, خالد العتيبي
- 1 Accountant: سارة المحاسبة
- 1 Housekeeping Supervisor: ليلى المشرفة
- 1 Cleaner: أمل العاملة
- 1 Maintenance: طارق الصيانة

### **Dashboard KPIs (Realistic)**
```
Total Revenue: SAR 2,480,000
Occupancy Rate: 78.4%
ADR (Average Daily Rate): SAR 612
RevPAR (Revenue Per Available Room): SAR 480
Upcoming Check-ins: 46
Upcoming Check-outs: 39
Pending Cleaning Tasks: 18
Open Maintenance Tickets: 7
```

### **Chart Data (6 Months)**
Revenue Trend (SAR):
- Jan: 286K | Feb: 301K | Mar: 328K | Apr: 355K | May: 389K | Jun: 421K

Occupancy (%):
- Jan: 71% | Feb: 74% | Mar: 76% | Apr: 79% | May: 82% | Jun: 84%

Channel Mix:
- Airbnb: 34% | Booking.com: 29% | Direct: 18% | Agoda: 11% | Vrbo: 8%

---

## 🌐 BILINGUAL IMPLEMENTATION (Arabic-First)

### **Language Strategy**
- **Primary**: Arabic (RTL)
- **Secondary**: English (LTR)
- **Switching**: Global language toggle in header
- **Storage**: User preference saved to localStorage

### **Copy Quality Standards**

**Arabic - Natural Business Tone:**
```
✅ GOOD: "أدر جميع عقاراتك المؤجرة من لوحة واحدة"
❌ BAD: "إدارة العقارات" (literal/generic)

✅ GOOD: "رؤى ذكية لتحسين الإشغال والعائد"
❌ BAD: "بيانات تحليلية" (machine-translated feel)

✅ GOOD: "تجربة تشغيل مصممة للسوق السعودي"
❌ BAD: "منصة سعودية" (vague)
```

**English - Premium SaaS Quality:**
```
✅ GOOD: "Run your entire rental operation from one intelligent dashboard"
❌ BAD: "Manage properties easily"

✅ GOOD: "Actionable insights to improve occupancy and revenue"
❌ BAD: "Smart analytics"

✅ GOOD: "Built for modern Saudi property operators"
❌ BAD: "Saudi platform"
```

### **Localization Beyond Language**
- SAR currency formatting: `SAR 2,480,000` (no decimals for whole numbers)
- VAT-aware financial reporting (15% Saudi VAT)
- WhatsApp-first communication integration (preferred in Saudi market)
- Weekend-aware business logic (Fri-Sat weekend)
- Saudi business terminology and workflows
- Executive trust language (not startup casual)

---

## 🎨 UI/UX DESIGN PATTERNS

### **Component Library (shadcn/ui)**
All components in `src/components/ui/` themed with:
- Emerald primary for CTAs and success states
- Navy for headers and important actions
- Gold accents for premium highlights
- Warm cream backgrounds instead of stark white
- Soft shadows and generous spacing
- Smooth transitions and hover states

### **Dashboard Layout**
- **Sidebar Navigation** - Collapsible with icons and labels
- **Top Header** - Search, notifications, language toggle, user menu
- **Content Area** - Generous padding, card-based layout
- **Mobile** - Bottom navigation, simplified views

### **Empty States**
Premium, calm, and actionable:
```
Dashboard Empty (Arabic):
"لا توجد بيانات كافية لعرض التحليلات بعد. ابدأ بإضافة عقار أو ربط قنوات الحجز لعرض الإيرادات والإشغال تلقائياً."

Reservations Empty (English):
"No reservations yet. Once channels are connected or a manual booking is added, upcoming stays will appear here."
```

### **Loading States**
Contextual, not generic:
```
- "جارٍ مزامنة الحجوزات..." (Syncing reservations...)
- "جارٍ تحميل أداء القنوات..." (Loading channel performance...)
- "Updating owner statements..."
- "Preparing occupancy trends..."
```

### **Error States**
Professional and calm:
```
Arabic:
"تعذر تحميل بيانات القنوات الآن. يرجى المحاولة مرة أخرى أو مراجعة حالة التكامل."

English:
"We couldn't load channel data right now. Please try again or review the integration status."
```

---

## 🤖 AI INTELLIGENCE LAYER

### **AI Insights Panel** (Dashboard)
Realistic, actionable recommendations:

1. **Pricing Optimization**
   - Arabic: "نقترح رفع السعر بنسبة 8% في عطلة نهاية الأسبوع القادمة بناءً على الطلب الحالي ومعدل الإشغال"
   - English: "Recommend increasing rates by 8% for the upcoming weekend based on current demand and occupancy trends"

2. **Occupancy Gaps**
   - Detect low-occupancy periods
   - Suggest promotional strategies
   - Highlight underperforming units

3. **Message Assistance**
   - AI-suggested replies for guest inquiries
   - Multi-language response templates
   - Tone-appropriate for different scenarios

4. **Maintenance Patterns**
   - Flag repeated issues in specific units
   - Predict maintenance needs
   - Cost optimization suggestions

5. **Revenue Opportunities**
   - Identify high-demand periods
   - Recommend dynamic pricing adjustments
   - Suggest automation workflows

---

## 🔐 AUTHENTICATION & SECURITY

### **Supabase Auth Setup**
```javascript
// Email/Password authentication (default method)
// Auto-confirm enabled (no email verification required)
// Session-based with automatic refresh
// Protected routes using ProtectedRoute component

// Configuration:
{
  enable_signup: true,
  mailer_autoconfirm: true,  // Critical: No email confirmation needed
  site_url: "http://localhost:3000",
  uri_allow_list: "http://localhost:3000/**"
}
```

### **Row Level Security (RLS)**
All tables have RLS enabled with role-based policies:

**T1 - Private User Data** (profiles, user settings):
```sql
-- Users can only see/edit their own data
CREATE POLICY "select_own" ON table_name FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "update_own" ON table_name FOR UPDATE USING (auth.uid() = user_id);
```

**T2 - Public Read, Authenticated Write** (properties, units, reservations):
```sql
-- Anyone can view, authenticated users can modify
CREATE POLICY "public_read" ON table_name FOR SELECT USING (true);
CREATE POLICY "auth_write" ON table_name FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
```

**T3 - Role-Based Access** (admin-only tables):
```sql
-- Only specific roles can access
CREATE POLICY "admin_only" ON table_name FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);
```

### **Protected Routes**
```typescript
// All /dashboard/* routes wrapped in <ProtectedRoute>
// Auto-redirect to /login if no session
// Session check on mount and auth state changes
```

---

## 📂 PROJECT STRUCTURE

```
saudi-proptech-saas/
├── public/
│   ├── favicon.ico
│   ├── og-image.png
│   └── داريوم.png                    # Arabic logo
├── src/
│   ├── components/
│   │   ├── ui/                        # shadcn/ui components (50+ themed)
│   │   ├── landing/                   # Landing page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── RoleBenefits.tsx
│   │   │   ├── AISection.tsx
│   │   │   ├── SaudiSection.tsx
│   │   │   └── Footer.tsx
│   │   ├── dashboard/                 # Dashboard components
│   │   │   ├── AppShell.tsx           # Main layout wrapper
│   │   │   ├── Sidebar.tsx            # Navigation sidebar
│   │   │   ├── Header.tsx             # Top header bar
│   │   │   ├── KPICards.tsx           # 8 KPI cards
│   │   │   ├── RevenueChart.tsx       # 6-month revenue trend
│   │   │   ├── OccupancyChart.tsx     # Occupancy percentage
│   │   │   ├── ChannelPerformance.tsx # OTA breakdown
│   │   │   ├── AIInsights.tsx         # AI recommendations
│   │   │   └── ...
│   │   ├── admin/                     # Admin-specific components
│   │   ├── SEO.tsx                    # Dynamic meta tags
│   │   └── ProtectedRoute.tsx         # Auth wrapper
│   ├── contexts/
│   │   ├── AuthContext.tsx            # Global auth state
│   │   ├── RoleContext.tsx            # Role-based permissions
│   │   └── ThemeProvider.tsx          # Light/dark mode (optional)
│   ├── hooks/
│   │   ├── use-mobile.tsx             # Responsive breakpoint
│   │   ├── use-toast.ts               # Toast notifications
│   │   └── useProperties.ts           # Property data hook
│   ├── integrations/
│   │   └── supabase/
│   │       ├── client.ts              # Supabase client instance
│   │       ├── types.ts               # Database types (auto-generated)
│   │       └── database.types.ts      # Raw schema types
│   ├── lib/
│   │   ├── utils.ts                   # Utility functions (cn, etc.)
│   │   └── supabase.ts                # Supabase helpers
│   ├── pages/
│   │   ├── _app.tsx                   # Next.js app wrapper
│   │   ├── _document.tsx              # HTML document wrapper
│   │   ├── index.tsx                  # Landing page
│   │   ├── login.tsx                  # Login page
│   │   ├── register.tsx               # Registration page
│   │   ├── 404.tsx                    # Custom 404 page
│   │   ├── dashboard/                 # Dashboard pages (20+ files)
│   │   │   ├── index.tsx              # Main dashboard
│   │   │   ├── properties.tsx
│   │   │   ├── units.tsx
│   │   │   ├── calendar.tsx
│   │   │   ├── reservations.tsx
│   │   │   ├── messages.tsx
│   │   │   ├── housekeeping.tsx
│   │   │   ├── maintenance.tsx
│   │   │   ├── owners.tsx
│   │   │   ├── finance.tsx
│   │   │   ├── reports.tsx
│   │   │   ├── settings.tsx
│   │   │   └── ...
│   │   ├── admin/                     # Admin pages (10+ files)
│   │   │   ├── index.tsx
│   │   │   ├── users.tsx
│   │   │   ├── roles.tsx
│   │   │   └── ...
│   │   └── api/                       # API routes (optional)
│   ├── services/
│   │   ├── authService.ts             # Auth operations
│   │   ├── properties.service.ts      # Property CRUD
│   │   ├── units.service.ts           # Unit CRUD
│   │   ├── reservations.service.ts    # Booking CRUD
│   │   └── users.service.ts           # User management
│   └── styles/
│       └── globals.css                # Tailwind + custom CSS variables
├── supabase/
│   └── migrations/                    # Database migration files
├── .env.local                         # Environment variables
├── next.config.mjs                    # Next.js configuration
├── tailwind.config.ts                 # Tailwind customization
├── tsconfig.json                      # TypeScript configuration
└── package.json                       # Dependencies
```

---

## 🚀 IMPLEMENTATION GUIDE

### **Step 1: Setup Environment**
```bash
# Create Next.js project with TypeScript
npx create-next-app@latest saudi-proptech --typescript --tailwind --app false

# Install dependencies
npm install @supabase/supabase-js
npm install lucide-react
npm install tailwindcss-animate class-variance-authority clsx tailwind-merge

# Install shadcn/ui components
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input label card badge select dialog
# ... add all 50+ components as needed
```

### **Step 2: Configure Tailwind**
Update `tailwind.config.ts` with design system colors and fonts:
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        // ... add all colors from design system
        available: "hsl(var(--available))",
        occupied: "hsl(var(--occupied))",
        cleaning: "hsl(var(--cleaning))",
        maintenance: "hsl(var(--maintenance))",
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        display: ['Urbanist', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

### **Step 3: Setup Supabase**
Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Create `src/integrations/supabase/client.ts`:
```typescript
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
```

### **Step 4: Create Database Schema**
Run SQL in Supabase SQL Editor to create all 14 tables with RLS policies.

### **Step 5: Seed Demo Data**
Insert realistic Saudi demo data (6 properties, 30 units, 20 reservations, 10 users).

### **Step 6: Build Landing Page**
Create premium landing page with all sections:
- Hero with dual CTA
- Problem/Solution
- Features grid
- Role-based benefits
- AI section
- Saudi localization
- Footer

### **Step 7: Implement Authentication**
Create login/register pages with:
- Supabase Auth integration
- Auto-confirm enabled
- Error handling in Arabic
- Auto-redirect after success

### **Step 8: Build Dashboard**
Create AppShell layout wrapper, then implement all dashboard pages:
- Main dashboard with KPIs and charts
- Properties, Units, Calendar
- Reservations, Messages
- Housekeeping, Maintenance
- Owners, Finance, Reports
- Settings

### **Step 9: Add Protected Routes**
Wrap all dashboard pages in ProtectedRoute component.

### **Step 10: Implement Role-Based Access**
Add RoleContext and conditional UI based on user role.

---

## 🎯 KEY SUCCESS METRICS

### **What Makes This Project Premium**
1. ✅ **Real operational depth** - Not a template, a working system
2. ✅ **Bilingual excellence** - Native Arabic feel, polished English
3. ✅ **Saudi market fit** - VAT, SAR, WhatsApp, local workflows
4. ✅ **Executive aesthetics** - Emerald/Navy/Gold, warm backgrounds, sophisticated charts
5. ✅ **Realistic data** - 64,800 SAR in reservations, real Saudi cities/addresses
6. ✅ **Role-based UX** - 7 distinct user experiences
7. ✅ **Production-ready** - RLS policies, error handling, loading states
8. ✅ **Scalable architecture** - Clean separation of concerns, TypeScript everywhere

### **What to Avoid**
❌ Generic SaaS templates with placeholder content
❌ Lorem ipsum or fake-looking data
❌ Literal Arabic translations that sound unnatural
❌ Default blue/purple color schemes
❌ Stark white backgrounds without warmth
❌ Missing empty states or generic error messages
❌ Unthemed shadcn components (must customize with emerald/navy/gold)
❌ Non-Saudi demo data or generic business names

---

## 📊 DASHBOARD KPI FORMULAS

### **Revenue Calculations**
```typescript
// Total Revenue = Sum of all reservation total_amount
const totalRevenue = reservations.reduce((sum, r) => sum + r.total_amount, 0);

// ADR (Average Daily Rate)
const totalNights = reservations.reduce((sum, r) => {
  const nights = (r.check_out - r.check_in) / (1000 * 60 * 60 * 24);
  return sum + nights;
}, 0);
const ADR = totalRevenue / totalNights;

// RevPAR (Revenue Per Available Room)
const availableRoomNights = units.length * daysInPeriod;
const RevPAR = totalRevenue / availableRoomNights;

// Occupancy Rate
const occupiedNights = totalNights;
const occupancyRate = (occupiedNights / availableRoomNights) * 100;
```

### **Channel Performance**
```typescript
// Revenue by Channel
const channelRevenue = reservations.reduce((acc, r) => {
  acc[r.source] = (acc[r.source] || 0) + r.total_amount;
  return acc;
}, {});

// Channel Mix Percentage
const channelMix = Object.entries(channelRevenue).map(([channel, revenue]) => ({
  channel,
  percentage: (revenue / totalRevenue) * 100
}));
```

---

## 🎨 CHART SPECIFICATIONS

### **Revenue Chart**
- Type: Line chart with gradient fill
- Data: 6 months (Jan-Jun 2026)
- Y-axis: SAR amount (format: "286K", "301K", etc.)
- Gradient: Emerald (#10B981) → Teal (#14B8A6)
- Grid: Subtle horizontal lines
- Tooltip: Shows exact SAR amount on hover

### **Occupancy Chart**
- Type: Bar chart with rounded corners
- Data: 6 months percentage
- Y-axis: 0-100%
- Color: Navy (#1E293B) → Blue (#3B82F6) gradient
- Height: Dynamic based on percentage
- Labels: Show percentage inside bars

### **Channel Performance**
- Type: Donut chart
- Segments: 5 channels with distinct colors
- Center: Total revenue in SAR
- Legend: Channel names with percentages
- Colors: Brand colors for each OTA

---

## 🌍 SAUDI MARKET LOCALIZATION

### **Currency Formatting**
```typescript
// SAR formatting rules
const formatSAR = (amount: number) => {
  if (amount >= 1_000_000) {
    return `SAR ${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    return `SAR ${(amount / 1_000).toFixed(0)}K`;
  }
  return `SAR ${amount.toLocaleString('en-SA')}`;
};

// Examples:
// 2480000 → "SAR 2.5M"
// 64800 → "SAR 65K"
// 612 → "SAR 612"
```

### **VAT Calculations (15%)**
```typescript
const calculateVAT = (subtotal: number) => {
  const vatRate = 0.15;
  const vatAmount = subtotal * vatRate;
  const total = subtotal + vatAmount;
  return { subtotal, vatAmount, total };
};
```

### **Saudi Cities** (Use in demo data)
- Riyadh (الرياض) - Capital, business hub
- Jeddah (جدة) - Coastal, tourism
- Khobar (الخبر) - Eastern Province, business
- Dammam (الدمام) - Eastern Province, industry
- Mecca (مكة) - Religious tourism
- Medina (المدينة) - Religious tourism
- Taif (الطائف) - Summer destination

### **Address Format**
```
{street_name}, {district}, {city} {postal_code}
Example: King Fahd Road, Al Olaya, Riyadh 12211
```

---

## ✅ FINAL CHECKLIST

Before considering the project complete:

### **Functionality**
- [ ] All 30+ pages render without errors
- [ ] Authentication flow works (register → auto-login → dashboard)
- [ ] Protected routes redirect to login when not authenticated
- [ ] Database queries return realistic demo data
- [ ] Charts display with proper gradients and data
- [ ] KPI cards show correct calculations
- [ ] Role-based navigation reflects user permissions
- [ ] Language toggle switches between AR/EN correctly
- [ ] All forms validate and show error messages
- [ ] Empty states display when no data exists

### **Design**
- [ ] Emerald/Navy/Gold color scheme applied throughout
- [ ] Warm cream backgrounds (not stark white)
- [ ] Urbanist headings + IBM Plex Sans body + IBM Plex Mono data
- [ ] Shadows and elevation feel premium
- [ ] Spacing is generous and consistent
- [ ] Arabic text reads naturally (not machine-translated)
- [ ] English copy is premium SaaS quality
- [ ] No Lorem ipsum anywhere
- [ ] All shadcn components themed with brand colors
- [ ] Charts use sophisticated gradients

### **Data**
- [ ] 6 Saudi properties with Arabic names
- [ ] 30 units with varied types and pricing
- [ ] 20 reservations from multiple channels
- [ ] 10 users with realistic Saudi names
- [ ] Total revenue = SAR 64,800
- [ ] KPIs calculate correctly from demo data
- [ ] Chart data spans 6 months (Jan-Jun 2026)
- [ ] All cities/addresses are real Saudi locations

### **Performance**
- [ ] Pages load in < 2 seconds
- [ ] No console errors in browser
- [ ] TypeScript compiles without errors
- [ ] Database queries use proper indexes
- [ ] Images optimized (Next.js Image component)
- [ ] Charts render smoothly without lag

### **Production Readiness**
- [ ] Environment variables documented in `.env.example`
- [ ] RLS policies prevent unauthorized access
- [ ] Error boundaries catch and display errors gracefully
- [ ] Loading states show during data fetches
- [ ] Success/error toasts provide feedback
- [ ] Mobile responsive (test on 375px width minimum)
- [ ] SEO meta tags on all pages
- [ ] Vercel deployment configuration ready

---

## 🎓 IMPLEMENTATION TIPS

### **When Building Charts**
Use Recharts library for consistent, customizable charts:
```bash
npm install recharts
```

Example Revenue Chart:
```typescript
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', revenue: 286000 },
  { month: 'Feb', revenue: 301000 },
  // ...
];

<ResponsiveContainer width="100%" height={300}>
  <LineChart data={data}>
    <defs>
      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
        <stop offset="95%" stopColor="#14B8A6" stopOpacity={0.1}/>
      </linearGradient>
    </defs>
    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
    <XAxis dataKey="month" />
    <YAxis />
    <Tooltip formatter={(value) => `SAR ${(value / 1000).toFixed(0)}K`} />
    <Line type="monotone" dataKey="revenue" stroke="#10B981" fill="url(#revenueGradient)" />
  </LineChart>
</ResponsiveContainer>
```

### **When Implementing Bilingual UI**
Store language preference and use conditional rendering:
```typescript
const [lang, setLang] = useState<'ar' | 'en'>('ar');

// In component:
<h1 className={lang === 'ar' ? 'text-right' : 'text-left'}>
  {lang === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
</h1>
```

Or use i18n library for larger projects:
```bash
npm install next-i18next
```

### **When Creating Protected Routes**
```typescript
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/login');
      } else {
        setLoading(false);
      }
    });
  }, [router]);

  if (loading) return <div>Loading...</div>;
  return <>{children}</>;
}
```

### **When Seeding Database**
Use transactions for atomic operations:
```sql
BEGIN;

INSERT INTO properties (...) VALUES (...);
INSERT INTO units (...) VALUES (...);
INSERT INTO reservations (...) VALUES (...);

COMMIT;
```

---

## 🎯 FINAL NOTES

This is a **flagship Saudi PropTech platform**, not a generic SaaS template. Every decision—from the emerald/navy/gold palette to the warm cream backgrounds to the realistic SAR-formatted KPIs—is intentional and reflects premium Saudi business software.

The platform must feel like:
- **A premium Saudi product** built in 2026 for serious operators
- **An executive command center** for rental operations, not a basic dashboard
- **A bilingual experience** where Arabic reads native and English feels polished
- **An operating system** that unifies reservations, operations, finance, and intelligence

It must NOT feel like:
- A generic admin template with Saudi branding slapped on
- A basic booking tool with limited functionality
- A translated version of an English product
- An unfinished prototype with placeholder content

**Every page, every component, every piece of copy should reinforce the premium, Saudi-first, operationally-sophisticated positioning.**

---

**This specification is complete and production-ready. Use it to build or reproduce the entire platform with 100% fidelity to the original vision.**