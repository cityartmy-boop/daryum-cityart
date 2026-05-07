import { SEO } from "@/components/SEO";
import { AppShell } from "@/components/dashboard/AppShell";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PlatformKPIs } from "@/components/admin/PlatformKPIs";
import { SubscriptionsTable } from "@/components/admin/SubscriptionsTable";
import { RecentPayments } from "@/components/admin/RecentPayments";
import { PlanDistribution } from "@/components/admin/PlanDistribution";
import { RevenueGrowth } from "@/components/admin/RevenueGrowth";
import { UserGrowth } from "@/components/admin/UserGrowth";
import { ConversionMetrics } from "@/components/admin/ConversionMetrics";

export default function AdminDashboard() {
  return (
    <ProtectedRoute requireAdmin>
      <SEO title="لوحة إدارة المنصة - داريوم" description="إدارة الاشتراكات والمدفوعات" />
      
      <AppShell>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">لوحة إدارة المنصة</h1>
            <p className="text-muted-foreground">إدارة الاشتراكات والمدفوعات ونمو المنصة</p>
          </div>
        </div>

        {/* Platform KPIs */}
        <PlatformKPIs />

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <RevenueGrowth />
          </div>
          <PlanDistribution />
        </div>

        {/* User Growth & Conversion */}
        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          <UserGrowth />
          <ConversionMetrics />
        </div>

        {/* Tables */}
        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          <SubscriptionsTable />
          <RecentPayments />
        </div>
      </AppShell>
    </ProtectedRoute>
  );
}