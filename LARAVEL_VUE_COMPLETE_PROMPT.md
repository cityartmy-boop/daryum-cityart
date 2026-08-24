# 🏗️ Daryum PropTech Platform - Complete Development Prompt
## Laravel 11 Backend + Vue.js 3 Frontend

---

## 📋 PROJECT OVERVIEW

**Project Name:** Daryum (داريوم)  
**Type:** Premium Saudi PropTech SaaS Platform  
**Market:** Saudi Arabia Real Estate & Hospitality  
**Primary Language:** Arabic (with full English support)  
**Target Users:** Property managers, portfolio owners, housekeeping, maintenance, accountants  

**Core Purpose:**  
A flagship Saudi property management operating system that unifies:
- Multi-property portfolio management
- Unit inventory and availability
- Multi-channel reservation management (Airbnb, Booking.com, Agoda, Direct)
- Real-time calendar and pricing
- Guest messaging with AI assistance
- Housekeeping operations and task management
- Maintenance ticketing and workflow
- Owner reporting and financial statements
- Finance, VAT-aware accounting, and reconciliation
- Revenue analytics and executive dashboards
- Automation and AI-powered insights

**This is NOT a simple booking tool** - it's a complete property operations platform for serious rental businesses managing SAR 10M-200M+ portfolios.

---

## 🎯 TECH STACK

### **Backend: Laravel 11**
```
- PHP 8.3+
- Laravel 11.x (latest stable)
- MySQL 8.0+ or PostgreSQL 15+
- Laravel Sanctum (API authentication)
- Laravel Queues (background jobs)
- Laravel Scout (search)
- Laravel Horizon (queue monitoring)
- Spatie Laravel Permission (roles & permissions)
- Laravel Excel (reporting exports)
- Carbon (date/time handling)
- RESTful API architecture
```

### **Frontend: Vue.js 3**
```
- Vue 3 (Composition API)
- TypeScript
- Vite (build tool)
- Pinia (state management)
- Vue Router 4
- Axios (HTTP client)
- TailwindCSS 3.4+
- shadcn-vue (premium UI components)
- Chart.js or Apache ECharts (analytics)
- VueUse (composition utilities)
- i18n (Arabic/English)
- Day.js (lightweight date library)
```

### **Additional Services**
```
- Redis (caching, sessions, queues)
- Meilisearch or Algolia (advanced search - optional)
- AWS S3 or Cloudflare R2 (file storage)
- Pusher or Laravel WebSockets (real-time notifications)
- Mailtrap/SendGrid/AWS SES (email)
```

---

## 🎨 DESIGN SYSTEM

### **Color Palette (HSL format)**
```css
/* Primary - Deep Emerald (Saudi green, hospitality trust) */
--primary: 152 78% 36%;
--primary-foreground: 0 0% 100%;

/* Secondary - Midnight Navy (executive authority) */
--secondary: 222 47% 11%;
--secondary-foreground: 0 0% 100%;

/* Accent - Warm Gold (premium highlights) */
--accent: 43 74% 66%;
--accent-foreground: 222 47% 11%;

/* Background - Warm Cream (sophisticated warmth) */
--background: 45 56% 96%;
--foreground: 222 47% 11%;

/* Muted - Soft Sand */
--muted: 45 20% 88%;
--muted-foreground: 222 20% 40%;

/* Card - White */
--card: 0 0% 100%;
--card-foreground: 222 47% 11%;

/* Border - Warm Border */
--border: 45 20% 82%;

/* Semantic Colors */
--available: 152 78% 36%;    /* Emerald */
--occupied: 217 91% 60%;     /* Blue */
--cleaning: 174 62% 47%;     /* Teal */
--maintenance: 38 92% 50%;   /* Amber */
--blocked: 222 20% 40%;      /* Slate */
--destructive: 0 84% 60%;    /* Elegant Coral */
```

### **Typography**
```
Display/Headlines: Urbanist (700) - geometric confidence
Body: IBM Plex Sans (400, 600) - bilingual clarity
Data/Code: IBM Plex Mono (400, 600) - financial tables, KPIs
```

### **Design Principles**
1. **Arabic-first** with seamless RTL/LTR support
2. Premium Saudi business aesthetics
3. Executive-grade information density
4. Generous whitespace with sophisticated card elevation
5. Realistic operational data (not generic placeholders)
6. SAR currency formatting throughout
7. Professional empty states and loading skeletons
8. Subtle microinteractions and hover states

---

## 👥 USER ROLES & PERMISSIONS

### **1. Super Admin**
- Full system access
- User management
- Workspace/company management
- System settings and configurations
- All analytics and reports
- Billing and subscriptions

### **2. Admin (Property Manager)**
- All properties under their workspace
- All units, reservations, operations
- Financial reports and owner statements
- Team management (assign cleaners, maintenance)
- Channel integrations
- Automations and pricing rules
- Guest messaging
- Full dashboard access

### **3. Owner**
- View assigned properties/units only
- Financial statements and revenue reports
- Occupancy and performance metrics
- Payout history
- Unit-level analytics
- **Cannot:** Edit units, manage operations, see other owners' data

### **4. Accountant**
- Financial reconciliation
- VAT reports and invoices
- Owner balances and payouts
- Transaction history
- Commission calculations
- Export financial reports
- **Cannot:** Manage properties, operations, messaging

### **5. Housekeeping Supervisor**
- View all housekeeping tasks
- Assign tasks to cleaners
- Quality control and checklists
- Task scheduling
- Performance reports
- **Cannot:** Access finance, reservations, owner data

### **6. Cleaner**
- View assigned tasks only
- Update task status (started, completed)
- Upload before/after photos
- Mark items for restocking
- **Cannot:** See other cleaners' tasks, financial data

### **7. Maintenance Staff**
- View assigned maintenance tickets
- Update ticket status and notes
- Upload photos and cost estimates
- Mark materials used
- **Cannot:** Access finance, reservations, assign own tasks

### **8. Revenue Manager** (optional advanced role)
- Pricing strategies and dynamic pricing
- Channel performance analytics
- Revenue optimization recommendations
- Occupancy forecasting
- **Cannot:** Manage operations, finance, or owner data

---

## 🗄️ DATABASE SCHEMA

### **Core Tables**

#### **users**
```sql
id (bigint, PK)
workspace_id (FK: workspaces.id)
name (string)
email (string, unique)
email_verified_at (timestamp, nullable)
password (string, hashed)
phone (string, nullable)
avatar (string, nullable)
locale (enum: 'ar', 'en', default: 'ar')
timezone (string, default: 'Asia/Riyadh')
is_active (boolean, default: true)
last_login_at (timestamp, nullable)
created_at, updated_at, deleted_at (soft deletes)
```

#### **workspaces**
```sql
id (bigint, PK)
name (string) -- Company/workspace name
slug (string, unique)
owner_id (FK: users.id) -- Main account owner
subscription_plan (enum: 'trial', 'basic', 'pro', 'enterprise')
subscription_status (enum: 'active', 'past_due', 'canceled')
trial_ends_at (timestamp, nullable)
settings (json) -- Workspace-level settings
created_at, updated_at, deleted_at
```

#### **roles & permissions** (handled by Spatie Laravel Permission)
```sql
roles (id, name, guard_name, workspace_id, created_at, updated_at)
permissions (id, name, guard_name, created_at, updated_at)
model_has_roles (role_id, model_type, model_id)
role_has_permissions (permission_id, role_id)
```

#### **properties**
```sql
id (bigint, PK)
workspace_id (FK: workspaces.id)
name (string)
name_ar (string, nullable)
slug (string, unique)
property_type (enum: 'apartment', 'villa', 'chalet', 'compound', 'hotel', 'resort')
address (text)
city (string)
region (string) -- Saudi regions
postal_code (string, nullable)
latitude (decimal, nullable)
longitude (decimal, nullable)
description (text, nullable)
description_ar (text, nullable)
cover_image (string, nullable)
images (json, nullable) -- Array of image URLs
amenities (json, nullable) -- Array of amenities
check_in_time (time, default: '15:00')
check_out_time (time, default: '12:00')
currency (string, default: 'SAR')
vat_rate (decimal, default: 15.00) -- Saudi VAT 15%
is_active (boolean, default: true)
created_at, updated_at, deleted_at
```

#### **units**
```sql
id (bigint, PK)
property_id (FK: properties.id)
owner_id (FK: users.id, nullable) -- If unit has specific owner
name (string) -- e.g., "Unit 101", "Villa A"
name_ar (string, nullable)
unit_type (enum: 'studio', '1br', '2br', '3br', '4br', 'penthouse', 'villa')
floor (integer, nullable)
size_sqm (decimal, nullable)
bedrooms (integer)
bathrooms (integer)
max_guests (integer)
base_price (decimal) -- Default nightly rate in SAR
cleaning_fee (decimal, default: 0)
description (text, nullable)
description_ar (text, nullable)
images (json, nullable)
amenities (json, nullable)
status (enum: 'available', 'occupied', 'cleaning', 'maintenance', 'blocked')
is_active (boolean, default: true)
created_at, updated_at, deleted_at
```

#### **reservations**
```sql
id (bigint, PK)
workspace_id (FK: workspaces.id)
property_id (FK: properties.id)
unit_id (FK: units.id)
channel_id (FK: channels.id, nullable)
confirmation_code (string, unique, indexed)
channel_reservation_id (string, nullable) -- OTA's booking ID
guest_name (string)
guest_email (string)
guest_phone (string, nullable)
guest_country (string, nullable)
number_of_guests (integer)
check_in_date (date)
check_out_date (date)
nights (integer)
status (enum: 'confirmed', 'checked_in', 'checked_out', 'canceled', 'no_show')
nightly_rate (decimal)
total_amount (decimal)
cleaning_fee (decimal, default: 0)
commission (decimal, default: 0)
net_amount (decimal) -- After commission
vat_amount (decimal, default: 0)
currency (string, default: 'SAR')
payment_status (enum: 'pending', 'partial', 'paid', 'refunded')
payment_method (enum: 'cash', 'card', 'bank_transfer', 'online', 'channel')
special_requests (text, nullable)
notes (text, nullable)
created_at, updated_at, deleted_at
```

#### **channels**
```sql
id (bigint, PK)
workspace_id (FK: workspaces.id)
name (enum: 'airbnb', 'booking', 'agoda', 'vrbo', 'expedia', 'direct')
display_name (string)
is_active (boolean, default: true)
api_key (string, encrypted, nullable)
api_secret (string, encrypted, nullable)
last_sync_at (timestamp, nullable)
sync_status (enum: 'connected', 'error', 'disconnected')
settings (json, nullable)
created_at, updated_at
```

#### **messages**
```sql
id (bigint, PK)
workspace_id (FK: workspaces.id)
reservation_id (FK: reservations.id, nullable)
channel_id (FK: channels.id, nullable)
guest_name (string)
guest_email (string, nullable)
guest_phone (string, nullable)
subject (string, nullable)
body (text)
direction (enum: 'inbound', 'outbound')
status (enum: 'unread', 'read', 'replied', 'archived')
priority (enum: 'low', 'normal', 'high', 'urgent')
sla_deadline (timestamp, nullable)
replied_at (timestamp, nullable)
replied_by (FK: users.id, nullable)
ai_suggestion (text, nullable)
created_at, updated_at
```

#### **housekeeping_tasks**
```sql
id (bigint, PK)
workspace_id (FK: workspaces.id)
property_id (FK: properties.id)
unit_id (FK: units.id)
reservation_id (FK: reservations.id, nullable)
assigned_to (FK: users.id, nullable) -- Cleaner
assigned_by (FK: users.id, nullable) -- Supervisor
task_type (enum: 'checkout_clean', 'checkin_prep', 'deep_clean', 'inspection', 'restocking')
priority (enum: 'low', 'normal', 'high', 'urgent')
status (enum: 'pending', 'assigned', 'in_progress', 'completed', 'failed')
scheduled_date (date)
scheduled_time_start (time, nullable)
scheduled_time_end (time, nullable)
started_at (timestamp, nullable)
completed_at (timestamp, nullable)
checklist (json, nullable) -- Array of checklist items
before_photos (json, nullable)
after_photos (json, nullable)
notes (text, nullable)
quality_score (integer, nullable) -- 1-5 rating
created_at, updated_at
```

#### **maintenance_tickets**
```sql
id (bigint, PK)
workspace_id (FK: workspaces.id)
property_id (FK: properties.id)
unit_id (FK: units.id, nullable)
reported_by (FK: users.id)
assigned_to (FK: users.id, nullable)
ticket_number (string, unique, indexed)
title (string)
description (text)
category (enum: 'plumbing', 'electrical', 'hvac', 'appliance', 'structural', 'furniture', 'other')
severity (enum: 'low', 'medium', 'high', 'critical')
status (enum: 'open', 'assigned', 'in_progress', 'on_hold', 'resolved', 'closed')
priority (enum: 'low', 'normal', 'high', 'urgent')
sla_deadline (timestamp, nullable)
estimated_cost (decimal, nullable)
actual_cost (decimal, nullable)
materials_used (text, nullable)
resolution_notes (text, nullable)
photos (json, nullable)
opened_at (timestamp)
assigned_at (timestamp, nullable)
resolved_at (timestamp, nullable)
closed_at (timestamp, nullable)
created_at, updated_at
```

#### **owners**
```sql
id (bigint, PK)
workspace_id (FK: workspaces.id)
user_id (FK: users.id, nullable) -- If owner has platform account
name (string)
email (string)
phone (string, nullable)
tax_number (string, nullable) -- Saudi tax registration
iban (string, nullable) -- For payouts
commission_rate (decimal, default: 20.00) -- Percentage
payout_frequency (enum: 'weekly', 'biweekly', 'monthly', 'quarterly')
is_active (boolean, default: true)
created_at, updated_at, deleted_at
```

#### **owner_statements**
```sql
id (bigint, PK)
workspace_id (FK: workspaces.id)
owner_id (FK: owners.id)
property_id (FK: properties.id, nullable)
unit_id (FK: units.id, nullable)
period_start (date)
period_end (date)
total_revenue (decimal)
commission_amount (decimal)
expenses (decimal, default: 0)
vat_amount (decimal, default: 0)
net_payout (decimal)
status (enum: 'draft', 'pending', 'paid', 'disputed')
paid_at (timestamp, nullable)
payment_reference (string, nullable)
notes (text, nullable)
created_at, updated_at
```

#### **expenses**
```sql
id (bigint, PK)
workspace_id (FK: workspaces.id)
property_id (FK: properties.id, nullable)
unit_id (FK: units.id, nullable)
category_id (FK: expense_categories.id)
expense_date (date)
amount (decimal)
vat_amount (decimal, default: 0)
total_amount (decimal)
currency (string, default: 'SAR')
description (text)
vendor (string, nullable)
payment_method (enum: 'cash', 'card', 'bank_transfer', 'check')
receipt_url (string, nullable)
is_recurring (boolean, default: false)
recurrence_frequency (enum: 'daily', 'weekly', 'monthly', 'yearly', nullable)
notes (text, nullable)
created_by (FK: users.id)
created_at, updated_at, deleted_at
```

#### **expense_categories**
```sql
id (bigint, PK)
workspace_id (FK: workspaces.id)
name (string)
name_ar (string)
icon (string, nullable) -- Lucide icon name
color (string, nullable) -- Hex color
is_active (boolean, default: true)
created_at, updated_at
```

#### **pricing_rules**
```sql
id (bigint, PK)
workspace_id (FK: workspaces.id)
property_id (FK: properties.id, nullable)
unit_id (FK: units.id, nullable)
rule_name (string)
priority (integer, default: 0)
date_range_start (date, nullable)
date_range_end (date, nullable)
min_stay (integer, nullable)
max_stay (integer, nullable)
price_adjustment_type (enum: 'fixed', 'percentage')
price_adjustment_value (decimal)
days_of_week (json, nullable) -- Array: [0-6]
is_active (boolean, default: true)
created_at, updated_at
```

#### **automations**
```sql
id (bigint, PK)
workspace_id (FK: workspaces.id)
name (string)
trigger_type (enum: 'booking_confirmed', 'check_in', 'check_out', 'message_received', 'task_completed')
action_type (enum: 'send_message', 'create_task', 'update_status', 'send_notification')
conditions (json, nullable)
action_config (json)
is_active (boolean, default: true)
created_at, updated_at
```

#### **notifications**
```sql
id (bigint, PK)
user_id (FK: users.id)
type (string)
title (string)
title_ar (string, nullable)
message (text)
message_ar (text, nullable)
action_url (string, nullable)
is_read (boolean, default: false)
read_at (timestamp, nullable)
created_at, updated_at
```

#### **activity_logs**
```sql
id (bigint, PK)
workspace_id (FK: workspaces.id)
user_id (FK: users.id, nullable)
action (string) -- e.g., 'reservation.created', 'unit.updated'
model_type (string, nullable)
model_id (bigint, nullable)
description (text)
ip_address (string, nullable)
user_agent (text, nullable)
created_at
```

---

## 🔌 API ARCHITECTURE

### **Base URL Structure**
```
/api/v1/{endpoint}
```

### **Authentication**
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh
GET    /api/auth/user
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
```

### **Properties**
```
GET    /api/properties              (list with filters, search, pagination)
POST   /api/properties              (create new property)
GET    /api/properties/{id}         (show single)
PUT    /api/properties/{id}         (update)
DELETE /api/properties/{id}         (soft delete)
GET    /api/properties/{id}/units   (get all units for property)
GET    /api/properties/{id}/stats   (property-level analytics)
```

### **Units**
```
GET    /api/units                   (list with filters)
POST   /api/units                   (create)
GET    /api/units/{id}
PUT    /api/units/{id}
DELETE /api/units/{id}
PATCH  /api/units/{id}/status       (update status: available/occupied/cleaning/etc)
GET    /api/units/{id}/calendar     (availability calendar)
GET    /api/units/{id}/reservations (reservation history)
```

### **Reservations**
```
GET    /api/reservations            (list with filters: status, channel, dates)
POST   /api/reservations            (create manual reservation)
GET    /api/reservations/{id}
PUT    /api/reservations/{id}
DELETE /api/reservations/{id}
PATCH  /api/reservations/{id}/status (check-in, check-out, cancel)
GET    /api/reservations/{id}/invoice (generate invoice PDF)
POST   /api/reservations/sync       (sync from channels)
```

### **Calendar**
```
GET    /api/calendar                (multi-property calendar view)
GET    /api/calendar/availability   (date range availability check)
POST   /api/calendar/block          (block dates)
DELETE /api/calendar/block/{id}     (unblock)
```

### **Channels**
```
GET    /api/channels                (list connected channels)
POST   /api/channels                (connect new channel)
GET    /api/channels/{id}
PUT    /api/channels/{id}           (update settings)
DELETE /api/channels/{id}           (disconnect)
POST   /api/channels/{id}/sync      (manual sync)
GET    /api/channels/{id}/performance (channel analytics)
```

### **Messages**
```
GET    /api/messages                (inbox with filters)
POST   /api/messages                (send new message)
GET    /api/messages/{id}
PATCH  /api/messages/{id}/read      (mark as read)
POST   /api/messages/{id}/reply     (send reply)
POST   /api/messages/{id}/ai-suggestion (get AI reply suggestion)
PATCH  /api/messages/{id}/archive
```

### **Housekeeping**
```
GET    /api/housekeeping/tasks      (list tasks)
POST   /api/housekeeping/tasks      (create task)
GET    /api/housekeeping/tasks/{id}
PUT    /api/housekeeping/tasks/{id}
PATCH  /api/housekeeping/tasks/{id}/assign (assign to cleaner)
PATCH  /api/housekeeping/tasks/{id}/status (update status)
POST   /api/housekeeping/tasks/{id}/photos (upload photos)
GET    /api/housekeeping/schedule   (calendar view)
GET    /api/housekeeping/performance (cleaner performance stats)
```

### **Maintenance**
```
GET    /api/maintenance/tickets
POST   /api/maintenance/tickets
GET    /api/maintenance/tickets/{id}
PUT    /api/maintenance/tickets/{id}
PATCH  /api/maintenance/tickets/{id}/assign
PATCH  /api/maintenance/tickets/{id}/status
POST   /api/maintenance/tickets/{id}/photos
GET    /api/maintenance/stats       (SLA, resolution times)
```

### **Owners**
```
GET    /api/owners
POST   /api/owners
GET    /api/owners/{id}
PUT    /api/owners/{id}
DELETE /api/owners/{id}
GET    /api/owners/{id}/statements  (financial statements)
GET    /api/owners/{id}/units       (owned units)
GET    /api/owners/{id}/analytics   (revenue, occupancy)
POST   /api/owners/{id}/payout      (record payout)
```

### **Statements**
```
GET    /api/statements              (owner statements list)
POST   /api/statements/generate     (create new statement)
GET    /api/statements/{id}
GET    /api/statements/{id}/pdf     (download PDF)
PATCH  /api/statements/{id}/status  (mark as paid)
```

### **Expenses**
```
GET    /api/expenses                (list with filters)
POST   /api/expenses                (create)
GET    /api/expenses/{id}
PUT    /api/expenses/{id}
DELETE /api/expenses/{id}
GET    /api/expenses/categories     (list categories)
POST   /api/expenses/categories     (create category)
GET    /api/expenses/summary        (monthly summary, totals by category)
```

### **Finance**
```
GET    /api/finance/overview        (total revenue, expenses, net)
GET    /api/finance/transactions    (all transactions)
GET    /api/finance/reconciliation  (channel payouts vs received)
GET    /api/finance/vat-report      (VAT summary)
GET    /api/finance/commissions     (commission breakdown)
```

### **Reports**
```
GET    /api/reports/portfolio       (overall performance)
GET    /api/reports/revenue         (revenue by period/property/channel)
GET    /api/reports/occupancy       (occupancy trends)
GET    /api/reports/channel-performance
GET    /api/reports/unit-profitability
POST   /api/reports/export          (export to Excel/PDF)
```

### **Dashboard**
```
GET    /api/dashboard/kpis          (key metrics: revenue, occupancy, ADR, RevPAR)
GET    /api/dashboard/charts        (revenue trends, occupancy, channel mix)
GET    /api/dashboard/operations    (today's arrivals, departures, tasks)
GET    /api/dashboard/ai-insights   (AI-generated recommendations)
```

### **Automations**
```
GET    /api/automations
POST   /api/automations
GET    /api/automations/{id}
PUT    /api/automations/{id}
DELETE /api/automations/{id}
PATCH  /api/automations/{id}/toggle (activate/deactivate)
```

### **Users & Roles**
```
GET    /api/users                   (team members)
POST   /api/users                   (invite new user)
GET    /api/users/{id}
PUT    /api/users/{id}
DELETE /api/users/{id}
POST   /api/users/{id}/assign-role
GET    /api/roles                   (list available roles)
GET    /api/permissions             (list permissions)
```

### **Settings**
```
GET    /api/settings/workspace
PUT    /api/settings/workspace
GET    /api/settings/notifications
PUT    /api/settings/notifications
GET    /api/settings/integrations   (connected services)
POST   /api/settings/integrations/connect
```

### **Notifications**
```
GET    /api/notifications           (user notifications)
PATCH  /api/notifications/{id}/read
PATCH  /api/notifications/read-all
```

---

## 📱 FRONTEND PAGES & COMPONENTS

### **Public Pages**
1. **Landing Page** (`/`)
   - Hero with premium messaging
   - Problem/Solution section
   - Features showcase
   - Role-based benefits
   - AI intelligence section
   - Saudi localization highlights
   - Pricing (if public)
   - Testimonials
   - CTA sections
   - Footer

2. **Login** (`/login`)
3. **Register** (`/register`)
4. **Forgot Password** (`/forgot-password`)
5. **Reset Password** (`/reset-password`)

### **Dashboard Pages** (Protected)

#### **Main Dashboard** (`/dashboard`)
- Executive KPI cards (Revenue, Occupancy, ADR, RevPAR)
- Revenue trend chart (last 6 months)
- Occupancy trend chart
- Channel performance breakdown
- Today's operations:
  - Upcoming check-ins
  - Upcoming check-outs
  - Pending housekeeping tasks
  - Open maintenance tickets
- AI insights panel
- Recent reservations table

#### **Properties** (`/properties`)
- Grid/table view toggle
- Property cards with:
  - Cover image
  - Name
  - City, region
  - Unit count
  - Current occupancy
  - Quick stats
  - Quick actions (edit, view units, calendar)
- Add property dialog
- Edit property drawer/modal

#### **Units** (`/units`)
- Filterable list (by property, status, type)
- Unit cards/rows with:
  - Status badge (available, occupied, cleaning, maintenance, blocked)
  - Unit name/number
  - Property
  - Type (studio, 1BR, 2BR, etc.)
  - Occupancy snapshot
  - Base price
  - Owner (if assigned)
  - Quick actions
- Add unit dialog
- Edit unit form

#### **Calendar** (`/calendar`)
- Multi-property timeline calendar
- Drag-and-drop reservation blocks
- Color-coded by channel
- Status indicators (occupied, blocked, cleaning)
- Pricing overlay (hover to see rate)
- Quick add reservation
- Block dates functionality

#### **Reservations** (`/reservations`)
- Advanced filters:
  - Date range
  - Status (confirmed, checked-in, checked-out, canceled)
  - Channel
  - Property/unit
  - Guest name search
- Reservations table/list with:
  - Confirmation code
  - Guest name
  - Property/unit
  - Check-in/out dates
  - Nights
  - Total amount
  - Status badge
  - Payment status
  - Channel tag
  - Quick actions
- Add manual reservation form
- Reservation details modal (full info, payment, notes, messages)

#### **Channels** (`/channels`)
- Channel cards (Airbnb, Booking.com, Agoda, Vrbo, Direct)
- Connection status
- Last sync time
- Sync health
- Performance metrics (reservations, revenue)
- Connect channel wizard
- Channel settings
- Manual sync trigger

#### **Messages** (`/messages`)
- Inbox layout (list + message detail)
- Filters (unread, channel, priority)
- Message thread view
- AI reply suggestions
- Quick reply templates
- SLA indicator (time to respond)
- Archive/mark as read

#### **Housekeeping** (`/housekeeping`)
- Kanban board OR schedule calendar view
- Task cards with:
  - Unit
  - Task type
  - Priority
  - Assigned cleaner
  - Scheduled time
  - Status
- Create task form
- Assign task to cleaner
- Task checklist view
- Before/after photo upload
- Cleaner performance dashboard

#### **Maintenance** (`/maintenance`)
- Ticket list with filters (status, severity, category)
- Ticket cards/rows:
  - Ticket number
  - Title
  - Unit affected
  - Severity badge
  - Status
  - Assigned to
  - SLA deadline
  - Estimated/actual cost
- Create ticket form
- Ticket detail view
- Assign to maintenance staff
- Update status and notes
- Upload photos
- Cost tracking

#### **Owners** (`/owners`)
- Owner list (cards or table)
- Owner profile with:
  - Contact info
  - Tax number, IBAN
  - Assigned units
  - Commission rate
  - Payout frequency
- Add owner form
- Owner analytics:
  - Total revenue
  - Occupancy rate
  - Unit contribution
  - Statement history
  - Payout history

#### **Statements** (`/statements`)
- Statement list (filterable by owner, period, status)
- Statement detail view:
  - Period
  - Revenue breakdown by unit
  - Commission
  - Expenses
  - VAT
  - Net payout
- Generate statement button
- Mark as paid
- Download PDF
- Send to owner via email

#### **Expenses** (`/expenses`)
- Expense list with filters (date, category, property)
- Monthly summary cards
- Category breakdown chart
- Add expense form:
  - Date
  - Category
  - Amount
  - VAT
  - Description
  - Vendor
  - Payment method
  - Upload receipt
  - Assign to property/unit
- Recurring expense setup
- Expense categories management

#### **Finance** (`/finance`)
- Financial overview:
  - Total revenue (period)
  - Total expenses
  - Net profit
  - Commission earned
  - Owner balances
  - Pending payouts
- Transaction timeline (all in/out)
- VAT summary report
- Reconciliation view (channel payouts vs received)
- Commission breakdown
- Export to Excel

#### **Reports** (`/reports`)
- Report builder with filters:
  - Date range
  - Property/unit
  - Channel
  - Report type
- Pre-built reports:
  - Portfolio performance
  - Revenue by period
  - Occupancy trends
  - Channel performance
  - Unit profitability
  - Guest demographics
- Charts and visualizations
- Export options (PDF, Excel, CSV)

#### **Automations** (`/automations`)
- Automation list
- Create automation wizard:
  - Trigger selection
  - Condition setup
  - Action configuration
- Edit automation
- Activate/deactivate toggle
- Automation logs (execution history)

#### **Integrations** (`/integrations`)
- Available integrations cards:
  - Booking channels (Airbnb, Booking.com, etc.)
  - Payment gateways
  - Smart locks
  - Messaging (WhatsApp Business)
  - Accounting software
- Connection wizard for each
- Integration status
- Sync settings
- Disconnect option

#### **Settings** (`/settings`)
- Tabs:
  - **Workspace**: Name, logo, address, tax info
  - **Profile**: User personal settings, language, timezone
  - **Team**: User management, invite users, assign roles
  - **Notifications**: Email/push preferences, automation alerts
  - **Billing**: Subscription, payment method, invoices
  - **Preferences**: Default currency, date format, check-in/out times
  - **Security**: 2FA, API keys, activity log

#### **Profile** (`/profile`)
- User info update
- Avatar upload
- Password change
- Language preference
- Timezone

#### **Notifications** (`/notifications`)
- All notifications list
- Read/unread filter
- Mark as read
- Action links
- Clear all

---

## 🎨 UI/UX REQUIREMENTS

### **Bilingual Support**
- **Arabic (ar)**: Primary language, RTL layout
- **English (en)**: Full LTR support
- Language switcher in header
- All UI strings in both languages
- Use Vue i18n for translations
- RTL/LTR CSS handled automatically
- Date/time formatted per locale
- Currency formatting (SAR 1,234.56 vs SAR ١٬٢٣٤٫٥٦)

### **Design Principles**
1. **Premium Saudi aesthetics**: Emerald/navy/gold palette, warm cream backgrounds
2. **Executive clarity**: High information density with generous whitespace
3. **Realistic data**: No lorem ipsum, use realistic SAR amounts and Arabic names
4. **Empty states**: Elegant, actionable, with clear next steps
5. **Loading states**: Skeleton loaders, not spinners
6. **Error handling**: Calm, professional error messages with retry options
7. **Microinteractions**: Subtle hover, focus, active states
8. **Responsive**: Mobile-optimized, touch-friendly

### **Component Library**
Use **shadcn-vue** for base components:
- Button (with variants: default, primary, secondary, ghost, destructive)
- Card (with header, content, footer)
- Dialog/Modal
- Drawer (side panel)
- Tabs
- Table (with sorting, pagination)
- Form components (Input, Select, Checkbox, Radio, Textarea, DatePicker)
- Badge (status indicators)
- Avatar
- Dropdown Menu
- Tooltip
- Alert
- Skeleton
- Toast notifications

### **Charts & Visualizations**
Use **Chart.js** or **Apache ECharts** for:
- Line charts (revenue trends, occupancy)
- Bar charts (channel performance, monthly revenue)
- Pie/Doughnut charts (channel mix, expense categories)
- Area charts (occupancy forecast)
- Use premium color gradients (emerald → teal, navy → blue)

### **Icons**
Use **Lucide Icons** (Vue version) for all UI icons

---

## 🔐 SECURITY & BEST PRACTICES

### **Backend (Laravel)**
1. **Authentication**: Laravel Sanctum for API tokens
2. **Authorization**: Spatie Laravel Permission for roles & permissions
3. **Validation**: Form Request classes for all inputs
4. **SQL Injection**: Use Eloquent ORM, never raw queries with user input
5. **XSS Prevention**: Blade escaping, Vue sanitization
6. **CSRF Protection**: Enabled for all state-changing requests
7. **Rate Limiting**: API throttling (60 requests/min for auth, 120/min for general)
8. **File Upload**: Validation, size limits, virus scanning (optional)
9. **Encryption**: Sensitive data (API keys, IBAN) encrypted in DB
10. **Logging**: Activity logs for critical actions
11. **API Versioning**: `/api/v1/` for future-proofing
12. **Error Handling**: Never expose stack traces in production
13. **HTTPS Only**: Force HTTPS in production
14. **Database**: Prepared statements, parameterized queries
15. **Password Hashing**: bcrypt (Laravel default)
16. **Environment Variables**: `.env` for secrets, never commit

### **Frontend (Vue.js)**
1. **XSS Prevention**: Sanitize user input, avoid `v-html` with user content
2. **CSRF Token**: Include in all API requests
3. **Input Validation**: Client-side validation + backend validation
4. **Secure Storage**: Never store sensitive data in localStorage
5. **API Keys**: Never expose in frontend code
6. **Content Security Policy**: Restrict inline scripts
7. **Dependency Management**: Regular updates, security audits

---

## 🚀 IMPLEMENTATION GUIDELINES

### **Phase 1: Foundation (Weeks 1-2)**
1. Laravel 11 setup with database
2. Authentication (Sanctum)
3. Database migrations (all tables)
4. Seeders (roles, permissions, sample data)
5. Basic API structure
6. Vue 3 + Vite + TypeScript setup
7. TailwindCSS + shadcn-vue integration
8. i18n setup (Arabic/English)
9. Axios interceptors (auth, error handling)

### **Phase 2: Core Features (Weeks 3-6)**
1. **Properties & Units**:
   - CRUD API endpoints
   - Frontend pages
   - Image upload
   - Status management
2. **Reservations**:
   - Manual reservation creation
   - Reservation detail view
   - Status updates (check-in, check-out, cancel)
   - Invoice generation
3. **Calendar**:
   - Multi-property timeline
   - Availability visualization
   - Block dates
4. **Dashboard**:
   - KPI cards
   - Revenue/occupancy charts
   - Today's operations
   - Recent reservations

### **Phase 3: Operations (Weeks 7-9)**
1. **Housekeeping**:
   - Task management
   - Cleaner assignment
   - Checklist & photos
   - Schedule view
2. **Maintenance**:
   - Ticket system
   - Assignment workflow
   - SLA tracking
   - Cost tracking
3. **Messages**:
   - Inbox layout
   - Thread view
   - AI reply suggestions (placeholder)
   - Quick replies

### **Phase 4: Financial (Weeks 10-12)**
1. **Owners & Statements**:
   - Owner management
   - Statement generation
   - Payout tracking
   - PDF export
2. **Expenses**:
   - Expense tracking
   - Categories
   - VAT handling
   - Receipt upload
3. **Finance Dashboard**:
   - Reconciliation
   - VAT reports
   - Commission tracking
   - Transaction timeline

### **Phase 5: Integrations & Automation (Weeks 13-15)**
1. **Channels**:
   - Channel connection wizard
   - Sync placeholder (manual trigger)
   - Performance metrics
2. **Automations**:
   - Automation builder
   - Trigger/action system
   - Execution logs
3. **Reports**:
   - Report builder
   - Pre-built reports
   - Export functionality

### **Phase 6: Polish & Launch (Weeks 16-18)**
1. Role-based access control refinement
2. Performance optimization
3. Empty states, error states, loading states
4. Landing page
5. Email notifications
6. Final testing
7. Deployment preparation

---

## 📊 SAMPLE DATA (for development)

### **Properties**
```
- Daryum Tower (برج داريوم) - Riyadh, Olaya - 20 units
- Al Malqa Villas (فلل المالقا) - Riyadh, Al Malqa - 8 villas
- Jeddah Marina Resort (منتجع مرسى جدة) - Jeddah, Corniche - 15 units
```

### **Units**
```
- Unit 101 (1BR) - SAR 450/night
- Villa A (3BR) - SAR 1,200/night
- Penthouse Suite (2BR) - SAR 850/night
```

### **Reservations**
```
- Guest: أحمد السعيد - Airbnb - Daryum Tower Unit 101 - 5 nights - SAR 2,250
- Guest: Sara Johnson - Booking.com - Villa A - 3 nights - SAR 3,600
- Guest: فاطمة العتيبي - Direct - Penthouse Suite - 7 nights - SAR 5,950
```

### **KPIs**
```
Revenue (Month): SAR 421,340
Occupancy Rate: 78.4%
ADR (Average Daily Rate): SAR 612
RevPAR (Revenue per Available Room): SAR 480
Total Properties: 12
Total Units: 143
Active Reservations: 67
Upcoming Check-ins Today: 8
Upcoming Check-outs Today: 11
Pending Cleaning Tasks: 14
Open Maintenance Tickets: 6
Unread Messages: 23
```

---

## 📋 DELIVERABLES

### **Backend (Laravel)**
1. Complete database schema with migrations
2. Seeders for roles, permissions, sample data
3. RESTful API endpoints (all resources)
4. Authentication & authorization
5. File upload handling
6. Email notifications
7. Activity logging
8. API documentation (Postman collection or Swagger)

### **Frontend (Vue.js)**
1. Fully functional SPA
2. All pages implemented (landing + dashboard)
3. Bilingual support (ar/en)
4. Role-based views
5. Charts and visualizations
6. Responsive design
7. Empty states, loading states, error handling
8. Premium UI with shadcn-vue components

### **Documentation**
1. Installation guide
2. API documentation
3. User roles and permissions matrix
4. Deployment guide
5. Environment variables reference

---

## 🎯 SUCCESS CRITERIA

### **Functional**
- ✅ Users can register, login, manage profile
- ✅ Admin can create properties and units
- ✅ Reservations can be created, viewed, updated
- ✅ Calendar shows real-time availability
- ✅ Housekeeping tasks can be assigned and completed
- ✅ Maintenance tickets can be created and tracked
- ✅ Owners can view statements and analytics
- ✅ Expenses are tracked with VAT
- ✅ Financial reports are accurate
- ✅ Role-based access control works correctly
- ✅ All critical actions are logged

### **Non-Functional**
- ✅ Page load time < 2 seconds
- ✅ API response time < 500ms
- ✅ Mobile responsive (all pages)
- ✅ RTL/LTR switching works perfectly
- ✅ Arabic text renders properly
- ✅ No console errors
- ✅ Secure (no exposed credentials, XSS protection, CSRF protection)
- ✅ Premium, polished UI throughout

---

## 🔧 TECHNICAL NOTES

### **Laravel Tips**
- Use **Resource Controllers** for CRUD
- Use **API Resources** for response transformation
- Use **Form Requests** for validation
- Use **Policies** for authorization checks
- Use **Jobs** for background processing (email, sync)
- Use **Events & Listeners** for decoupled logic
- Use **Observers** for model lifecycle hooks
- Use **Service Classes** for business logic
- Use **Repositories** (optional) for data access abstraction

### **Vue Tips**
- Use **Composition API** consistently
- Use **Pinia stores** for global state (auth, properties, etc.)
- Use **VueUse composables** for common utilities
- Use **Async components** for code splitting
- Use **Teleport** for modals/dialogs
- Use **KeepAlive** for cached routes
- Use **Suspense** for async data loading
- Use **TypeScript** for type safety
- Use **ESLint + Prettier** for code quality

### **Optimization**
- Lazy load routes
- Image optimization (WebP, lazy loading)
- Database indexing (foreign keys, search fields)
- Query optimization (eager loading, select specific columns)
- Redis caching for frequently accessed data
- API pagination (default 25 items per page)
- Debounce search inputs
- Throttle API requests

---

## 📞 FINAL NOTES

This is a **complete, production-ready PropTech platform** spec.

**Key Differentiators:**
1. **Saudi-first**: Arabic primary, SAR currency, VAT-aware, local market focus
2. **Premium design**: Not a generic admin template
3. **Operational depth**: Real property management workflows
4. **Role-based**: Designed for actual teams (managers, cleaners, accountants, owners)
5. **Realistic data**: No placeholders, real-looking demo data
6. **Modern stack**: Laravel 11 + Vue 3 + TypeScript + TailwindCSS

**Build this as a flagship product, not a quick prototype.**

Quality standards:
- Every API endpoint must have validation
- Every frontend form must have error handling
- Every page must have empty states
- Every action must be logged for audit
- Every UI component must be bilingual
- Every chart must use realistic data
- Every role must see what's relevant to them

**This is a premium Saudi PropTech operating system for serious rental operators.**

---

## 🎯 PROMPT FOR AI ASSISTANT

```
You are a senior full-stack developer specializing in Laravel and Vue.js.

Build a complete, production-ready Saudi PropTech SaaS platform called "Daryum" (داريوم) with:

TECH STACK:
- Backend: Laravel 11 + MySQL + Redis + Sanctum
- Frontend: Vue 3 + TypeScript + Vite + Pinia + TailwindCSS + shadcn-vue
- Bilingual: Arabic (RTL) + English (LTR)

CORE FEATURES:
1. Multi-property & unit management
2. Multi-channel reservations (Airbnb, Booking.com, Direct)
3. Calendar with drag-drop availability
4. Housekeeping task management
5. Maintenance ticketing
6. Owner reporting & financial statements
7. Expense tracking with VAT
8. Finance dashboard & reconciliation
9. Guest messaging
10. Executive analytics dashboard
11. Role-based access (Admin, Owner, Cleaner, Maintenance, Accountant)

DESIGN:
- Premium Saudi aesthetics (emerald primary, navy secondary, gold accent, warm cream bg)
- Executive-grade information density
- Realistic demo data (SAR currency, Arabic names)
- Professional empty states, loading skeletons
- Charts: revenue trends, occupancy, channel performance

QUALITY STANDARDS:
- API validation on all endpoints
- Form Request classes for validation
- Spatie Laravel Permission for roles
- Activity logging for critical actions
- Bilingual UI (Vue i18n)
- RTL/LTR support
- Responsive mobile design
- No lorem ipsum or placeholders
- Production-ready security (XSS, CSRF, SQL injection prevention)

Follow the complete specification above. Build a flagship-quality product, not a basic template.

Start with database migrations, then authentication, then core resources (properties, units, reservations), then operations (housekeeping, maintenance), then finance.

Deliver clean, well-documented, maintainable code ready for a real business to use.
```

---

END OF SPECIFICATION