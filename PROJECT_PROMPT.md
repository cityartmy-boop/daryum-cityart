# 🏢 Daryum - Complete Project Specification
# داريوم - مواصفات المشروع الكاملة

---

## 📋 Project Overview / نظرة عامة

**Project Name:** Daryum (داريوم)
**Description:** Premium Saudi PropTech SaaS for property management, reservations, and hospitality operations
**Stack:** Laravel 13 + Vue.js 3 + MySQL 8.0
**Target Market:** Saudi Arabia
**Language:** Bilingual (Arabic-first + English)

---

## 🎯 Core Features / الميزات الأساسية

### 1. Authentication System / نظام المصادقة
- User registration with role selection
- Email/password login
- Laravel Sanctum API authentication
- Role-based access control (6 roles)
- Password reset functionality

**Roles:**
- Admin (مدير النظام)
- Property Manager (مدير عقارات)
- Owner (مالك)
- Accountant (محاسب)
- Housekeeping Supervisor (مشرف التنظيف)
- Maintenance Staff (فريق الصيانة)

---

### 2. Properties Management / إدارة العقارات

**Features:**
- Create, read, update, delete properties
- Property types: Apartment, Villa, Hotel, Resort, Chalet
- Property details:
  - Name (Arabic + English)
  - Type
  - Address
  - City, Country
  - Total units
  - Description
  - Images (multiple)
  - Status (active/inactive)

**Statistics per property:**
- Total units
- Occupied units
- Available units
- Monthly revenue
- Occupancy rate

---

### 3. Units Management / إدارة الوحدات

**Features:**
- Create, read, update, delete units
- Unit types: Studio, 1BR, 2BR, 3BR, Penthouse
- Unit details:
  - Unit number
  - Property association
  - Type
  - Size (sqm)
  - Bedrooms count
  - Bathrooms count
  - Max guests
  - Base price (per night)
  - Cleaning fee
  - Description
  - Amenities
  - Images
  - Status (available, occupied, maintenance, cleaning)

---

### 4. Reservations System / نظام الحجوزات

**Features:**
- Create manual bookings
- View all reservations
- Filter by status, dates, property
- Reservation details:
  - Guest name, email, phone
  - Unit
  - Check-in / Check-out dates
  - Number of guests
  - Total amount
  - Payment status (pending, paid, refunded)
  - Booking source (Direct, Airbnb, Booking.com, Agoda, Vrbo)
  - Status (confirmed, checked-in, checked-out, cancelled)
  - Special requests
  - Notes

**Automatic calculations:**
- Number of nights
- Total amount (nights × price + fees)
- Platform commission

---

### 5. Calendar View / التقويم

**Features:**
- Multi-property calendar view
- Monthly view with all units
- Visual reservation blocks
- Color-coded by booking source
- Drag and drop to modify dates
- Click to view reservation details
- Availability status for each unit/date

---

### 6. Channel Management / إدارة القنوات

**Features:**
- Integration status with OTAs (Online Travel Agencies)
- Channels:
  - Airbnb
  - Booking.com
  - Agoda
  - Vrbo
  - Direct bookings
- Sync status indicators
- Performance metrics per channel
- Commission rates
- Last sync timestamp

---

### 7. Guest Messaging / رسائل الضيوف

**Features:**
- Inbox for all guest messages
- Conversation threads per reservation
- Message source (Airbnb, Booking.com, WhatsApp, Email)
- AI-suggested replies
- Message status (unread, read, replied)
- SLA tracking (response time)
- Templates for common messages

---

### 8. Housekeeping Management / إدارة التنظيف

**Features:**
- Task management (To-do, In Progress, Done)
- Task assignment to cleaners
- Task details:
  - Unit
  - Task type (Check-out cleaning, Daily cleaning, Deep cleaning, Inspection)
  - Priority (low, medium, high, urgent)
  - Scheduled time
  - Estimated duration
  - Assignee
  - Checklist items
  - Before/After photos
  - Status
  - Notes

**Cleaner view:**
- Assigned tasks for the day
- Task checklists
- Photo upload
- Status updates

---

### 9. Maintenance System / نظام الصيانة

**Features:**
- Maintenance ticket system
- Ticket details:
  - Title
  - Description
  - Unit
  - Category (Plumbing, Electrical, AC, Appliance, Structural, Other)
  - Priority (low, medium, high, urgent)
  - Status (open, in-progress, resolved, closed)
  - Assignee
  - Estimated cost
  - Actual cost
  - Created date
  - Resolved date
  - Notes
  - Photos

**Analytics:**
- Average resolution time
- Cost per category
- Recurring issues

---

### 10. Owner Portal / بوابة الملاك

**Features:**
- Owner accounts linked to properties
- Monthly statements
- Revenue breakdown:
  - Gross revenue
  - Platform fees
  - Management fees
  - Cleaning fees
  - Maintenance costs
  - Net payout
- Payout schedule
- Unit performance comparison
- Downloadable reports (PDF)

---

### 11. Financial Management / الإدارة المالية

**Features:**
- Revenue tracking
- Expense tracking
- VAT calculations (15% in Saudi Arabia)
- Commission calculations
- Owner payouts
- Transaction history
- Filters by:
  - Date range
  - Property
  - Unit
  - Transaction type

**Reports:**
- Monthly revenue report
- Expense breakdown
- VAT report
- Owner payout summary
- Profit & loss statement

---

### 12. Dashboard / لوحة التحكم

**Executive Dashboard KPIs:**
- Total Revenue (monthly, YTD)
- Occupancy Rate (%)
- Average Daily Rate (ADR)
- Revenue Per Available Room (RevPAR)
- Total Properties
- Total Units
- Active Reservations
- Upcoming Check-ins (today)
- Upcoming Check-outs (today)
- Pending Cleaning Tasks
- Open Maintenance Tickets
- Unread Messages

**Charts:**
1. Revenue Trend (last 6 months)
2. Occupancy Rate Trend (last 6 months)
3. Booking Source Distribution (pie chart)
4. Revenue by Property (bar chart)
5. Top Performing Units
6. Operational Health Score

**Recent Activity:**
- Recent reservations
- Recent check-ins
- Recent check-outs
- Recent messages
- Urgent tasks

---

### 13. Reports & Analytics / التقارير والتحليلات

**Available Reports:**
- Revenue Report (by property, unit, period)
- Occupancy Report
- Channel Performance Report
- Guest Demographics
- Booking Lead Time Analysis
- Cancellation Rate Report
- Cleaning Performance Report
- Maintenance Cost Report
- Owner Payout Report

**Export Formats:**
- PDF
- Excel (XLSX)
- CSV

---

### 14. Automation / الأتمتة

**Automated Actions:**
- Welcome message on booking confirmation
- Check-in instructions 24h before arrival
- Checkout reminder
- Review request after checkout
- Cleaning task creation on checkout
- Invoice generation
- Owner statement generation (monthly)

**Automation Rules:**
- Trigger events
- Conditions
- Actions
- Active/Inactive status

---

### 15. Settings / الإعدادات

**Workspace Settings:**
- Company name
- Logo
- Contact information
- Timezone
- Currency (SAR)
- Language preference (Arabic/English)

**User Management:**
- Add/remove users
- Assign roles
- Update permissions
- Deactivate accounts

**Notification Settings:**
- Email notifications
- SMS notifications (future)
- WhatsApp notifications (future)
- Notification frequency

**Integration Settings:**
- API keys for OTAs
- Payment gateway settings
- Email service settings
- Storage settings

**VAT Settings:**
- VAT number
- VAT rate (15%)
- Invoice template

---

## 🎨 Design System / نظام التصميم

### Colors / الألوان
```
Primary (Emerald): #198754 - HSL(152, 78%, 36%)
Secondary (Navy): #1a202c - HSL(222, 47%, 11%)
Accent (Gold): #daa520 - HSL(43, 74%, 66%)
Background: #faf8f5 - HSL(45, 56%, 96%)
```

### Typography / الخطوط
- Display: Urbanist (700)
- Body: IBM Plex Sans (400, 600)
- Data/Numbers: IBM Plex Mono (400, 600)

### Components
- Buttons: Rounded, solid/outline/ghost variants
- Cards: White background, subtle shadow, rounded corners
- Inputs: Border, focus ring (emerald)
- Tables: Striped rows, hover effect
- Charts: Soft gradients, minimal design

---

## 🗄️ Database Schema

### Tables:
1. **users** - User accounts
2. **properties** - Property records
3. **units** - Unit records
4. **reservations** - Booking records
5. **messages** - Guest communication
6. **housekeeping_tasks** - Cleaning tasks
7. **maintenance_tickets** - Maintenance issues
8. **transactions** - Financial records
9. **owner_statements** - Monthly owner reports
10. **automations** - Automation rules
11. **notifications** - System notifications

---

## 🔌 API Endpoints

### Auth:
- POST /api/register
- POST /api/login
- POST /api/logout
- GET /api/user

### Properties:
- GET /api/properties
- POST /api/properties
- GET /api/properties/{id}
- PUT /api/properties/{id}
- DELETE /api/properties/{id}
- GET /api/properties/{id}/statistics

### Units:
- GET /api/units
- POST /api/units
- GET /api/units/{id}
- PUT /api/units/{id}
- DELETE /api/units/{id}
- GET /api/properties/{id}/units

### Reservations:
- GET /api/reservations
- POST /api/reservations
- GET /api/reservations/{id}
- PUT /api/reservations/{id}
- DELETE /api/reservations/{id}
- POST /api/reservations/{id}/check-in
- POST /api/reservations/{id}/check-out
- POST /api/reservations/{id}/cancel

### Messages:
- GET /api/messages
- POST /api/messages
- GET /api/messages/{id}
- PUT /api/messages/{id}/read
- POST /api/messages/{id}/reply

### Housekeeping:
- GET /api/housekeeping
- POST /api/housekeeping
- GET /api/housekeeping/{id}
- PUT /api/housekeeping/{id}
- DELETE /api/housekeeping/{id}
- PUT /api/housekeeping/{id}/status

### Maintenance:
- GET /api/maintenance
- POST /api/maintenance
- GET /api/maintenance/{id}
- PUT /api/maintenance/{id}
- DELETE /api/maintenance/{id}
- PUT /api/maintenance/{id}/status

### Dashboard:
- GET /api/dashboard/stats
- GET /api/dashboard/revenue-chart
- GET /api/dashboard/occupancy-chart
- GET /api/dashboard/channel-distribution

### Reports:
- GET /api/reports/revenue
- GET /api/reports/occupancy
- GET /api/reports/channel-performance
- GET /api/reports/owner-statement/{ownerId}

---

## 📱 Responsive Design

**Breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

**Mobile Priority:**
- Simplified navigation (bottom nav)
- Collapsible sidebar
- Touch-friendly buttons (min 44px)
- Swipe gestures for calendar
- Bottom sheets for forms
- Reduced KPI dashboard

---

## 🌐 Internationalization (i18n)

**Supported Languages:**
- Arabic (Primary) - RTL
- English (Secondary) - LTR

**Translation Coverage:**
- All UI text
- Error messages
- Success messages
- Email templates
- PDF reports

**RTL Support:**
- Automatic layout flip
- Icon positioning
- Text alignment
- Number formatting

---

## 🔒 Security Features

1. **Authentication:**
   - Laravel Sanctum tokens
   - CSRF protection
   - Password hashing (bcrypt)

2. **Authorization:**
   - Role-based access control
   - Route-level permissions
   - API endpoint protection

3. **Data Protection:**
   - SQL injection prevention (Eloquent ORM)
   - XSS protection
   - HTTPS only
   - Environment variable secrets

4. **API Security:**
   - Rate limiting
   - CORS configuration
   - Request validation
   - Token expiration

---

## 🚀 Performance Optimization

**Backend:**
- Query optimization (Eloquent eager loading)
- Database indexing
- Response caching
- Queue jobs for heavy tasks
- Image optimization

**Frontend:**
- Lazy loading components
- Code splitting (Vite)
- Asset compression
- CDN for static files
- Infinite scroll for large lists

---

## 📦 Deployment

**Backend:** Laravel on VPS
**Frontend:** Vue.js on Vercel/Netlify
**Database:** MySQL on VPS or managed service
**Storage:** S3-compatible object storage
**CDN:** CloudFlare

---

## 🧪 Testing

**Backend Testing:**
- PHPUnit for unit tests
- Feature tests for API endpoints
- Database factories for test data

**Frontend Testing:**
- Vitest for component tests
- E2E tests with Cypress

---

## 📚 Documentation

- User Guide (PDF)
- API Documentation (Postman)
- Developer Documentation
- Deployment Guide
- Troubleshooting Guide

---

## 🎯 Success Metrics

**KPIs to Track:**
- User registrations
- Active properties
- Total reservations
- Revenue processed
- Average response time
- System uptime
- User satisfaction score

---

## 🗓️ Development Roadmap

**Phase 1 (Current):**
- Core authentication
- Properties & Units CRUD
- Basic dashboard
- Reservations management

**Phase 2 (Future):**
- Calendar view
- Channel integrations (Airbnb API)
- Messaging system
- Reports

**Phase 3 (Future):**
- Housekeeping & Maintenance
- Owner portal
- Automation rules
- Advanced analytics

**Phase 4 (Future):**
- Mobile app (React Native)
- WhatsApp integration
- AI pricing recommendations
- Smart contracts integration

---

## 💰 Pricing Model (Future)

**Subscription Plans:**
1. **Starter** - SAR 299/month
   - Up to 10 units
   - Basic features
   - Email support

2. **Professional** - SAR 599/month
   - Up to 50 units
   - All features
   - Priority support
   - API access

3. **Enterprise** - Custom pricing
   - Unlimited units
   - Custom features
   - Dedicated account manager
   - SLA guarantee

---

## 📞 Support Channels

- Email: support@daryum.sa
- Phone: +966 XX XXX XXXX
- WhatsApp: +966 5X XXX XXXX
- Live Chat (in-app)
- Help Center: help.daryum.sa

---

**This is a complete specification for the Daryum platform.**
**Use this document as a reference for all development decisions.**

---

**Last Updated:** 2026-06-03
**Version:** 1.0.0