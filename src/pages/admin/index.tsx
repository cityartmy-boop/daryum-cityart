import { SEO } from "@/components/SEO";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PlatformKPIs } from "@/components/admin/PlatformKPIs";
import { SubscriptionsTable } from "@/components/admin/SubscriptionsTable";
import { RecentPayments } from "@/components/admin/RecentPayments";
import { PlanDistribution } from "@/components/admin/PlanDistribution";
import { RevenueGrowth } from "@/components/admin/RevenueGrowth";
import { UserGrowth } from "@/components/admin/UserGrowth";
import { ConversionMetrics } from "@/components/admin/ConversionMetrics";

export default function AdminDashboardPage() {
  return (
    <>
      <SEO title="لوحة تحكم الأدمن - داريوم" />
      <AdminLayout>
        <div className="space-y-6">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-black text-foreground mb-2">لوحة تحكم الأدمن</h1>
            <p className="text-muted-foreground">نظرة شاملة على النظام والمستخدمين</p>
          </div>

          {/* Platform KPIs */}
          <PlatformKPIs />

          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-6">
            <RevenueGrowth />
            <UserGrowth />
          </div>

          {/* Metrics Row */}
          <div className="grid lg:grid-cols-2 gap-6">
            <PlanDistribution />
            <ConversionMetrics />
          </div>

          {/* Tables */}
          <div className="grid lg:grid-cols-2 gap-6">
            <SubscriptionsTable />
            <RecentPayments />
          </div>
        </div>
      </AdminLayout>
    </>
  );
}