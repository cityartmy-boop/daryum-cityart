---
title: SaaS Admin Dashboard - لوحة إدارة المنصة
status: done
priority: high
type: feature
tags: [admin, saas, subscriptions, payments]
created_by: agent
created_at: 2026-05-07
position: 4
---

## Notes
Build a comprehensive SaaS admin dashboard for platform administrators to monitor subscriptions, payments, revenue, user growth, and platform health metrics. This is for Daryum's internal team to manage the SaaS business.

Must include:
- Platform-wide KPIs (total users, MRR, ARR, churn rate)
- Active subscriptions table with filters
- Recent payments log
- Plan distribution visualization
- Revenue and user growth charts
- Conversion funnel metrics
- Customer LTV tracking
- Trial-to-paid conversion rates

Design: Same blue-purple gradient system, RTL, premium business dashboard aesthetic.

## Checklist
- [x] Create /admin route and page
- [x] Build Platform KPIs component (8 key metrics)
- [x] Create Subscriptions Table with status filters
- [x] Build Recent Payments table
- [x] Add Plan Distribution pie chart
- [x] Implement Revenue Growth line chart
- [x] Add User Growth chart
- [x] Build Conversion Funnel metrics
- [x] Add Customer LTV and cohort analysis
- [x] Implement filters mockups
- [x] Ensure RTL support
- [x] Test responsive layout
- [x] Add to sidebar navigation

## Acceptance
- ✅ Admin dashboard accessible at /admin
- ✅ Shows realistic SaaS metrics (MRR in SAR, user counts, churn %)
- ✅ Subscriptions table displays active/trial/cancelled states
- ✅ Charts show growth trends over time
- ✅ All text in Arabic with proper RTL layout