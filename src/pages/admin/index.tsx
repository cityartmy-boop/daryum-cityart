import { SEO } from "@/components/SEO";
import { AppShell } from "@/components/dashboard/AppShell";
import { PlatformKPIs } from "@/components/admin/PlatformKPIs";
import { SubscriptionsTable } from "@/components/admin/SubscriptionsTable";
import { RecentPayments } from "@/components/admin/RecentPayments";
import { PlanDistribution } from "@/components/admin/PlanDistribution";
import { RevenueGrowth } from "@/components/admin/RevenueGrowth";
import { UserGrowth } from "@/components/admin/UserGrowth";
import { ConversionMetrics } from "@/components/admin/ConversionMetrics";

export default function AdminDashboard() {
  return (
    <>
      <SEO 
        title="لوحة إدارة المنصة - داريوم"
        description="لوحة تحكم شاملة لإدارة اشتراكات ومدفوعات منصة داريوم"
      />
      
      <AppShell>
        <div className="space-y-8">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div className="text-right">
              <h1 className="text-4xl font-black mb-2">لوحة إدارة المنصة</h1>
              <p className="text-muted-foreground">
                إدارة الاشتراكات والمدفوعات ومتابعة نمو المنصة
              </p>
            </div>
            <div className="flex gap-3">
              <button className="glass px-6 py-3 rounded-xl font-semibold hover:bg-white/80 transition-colors">
                تصدير التقرير
              </button>
              <button className="gradient-primary text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity">
                إضافة مستخدم جديد
              </button>
            </div>
          </div>

          {/* Platform KPIs */}
          <PlatformKPIs />

          {/* Revenue & User Growth Charts */}
          <div className="grid lg:grid-cols-2 gap-8">
            <RevenueGrowth />
            <UserGrowth />
          </div>

          {/* Plan Distribution & Conversion Metrics */}
          <div className="grid lg:grid-cols-2 gap-8">
            <PlanDistribution />
            <ConversionMetrics />
          </div>

          {/* Subscriptions Table */}
          <SubscriptionsTable />

          {/* Recent Payments */}
          <RecentPayments />
        </div>
      </AppShell>
    </>
  );
}