import { SEO } from "@/components/SEO";
import { AppShell } from "@/components/dashboard/AppShell";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { KPICards } from "@/components/dashboard/KPICards";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { OccupancyChart } from "@/components/dashboard/OccupancyChart";
import { ChannelPerformance } from "@/components/dashboard/ChannelPerformance";
import { RecentReservations } from "@/components/dashboard/RecentReservations";
import { TodaysOperations } from "@/components/dashboard/TodaysOperations";
import { AIInsights } from "@/components/dashboard/AIInsights";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <SEO title="لوحة التحكم - داريوم" description="إدارة عقاراتك المؤجرة بذكاء" />
      
      <AppShell>
        <h1 className="text-4xl font-bold mb-2">لوحة التحكم</h1>
        <p className="text-muted-foreground mb-8">نظرة شاملة على أداء عقاراتك</p>

        {/* KPI Cards */}
        <KPICards />

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          <RevenueChart />
          <OccupancyChart />
        </div>

        {/* Channel Performance */}
        <div className="mt-6">
          <ChannelPerformance />
        </div>

        {/* Bottom Section */}
        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          <RecentReservations />
          <div className="space-y-6">
            <AIInsights />
            <TodaysOperations />
          </div>
        </div>
      </AppShell>
    </ProtectedRoute>
  );
}