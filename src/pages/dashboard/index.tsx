import { SEO } from "@/components/SEO";
import { AppShell } from "@/components/dashboard/AppShell";
import { KPICards } from "@/components/dashboard/KPICards";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { OccupancyChart } from "@/components/dashboard/OccupancyChart";
import { ChannelPerformance } from "@/components/dashboard/ChannelPerformance";
import { RecentReservations } from "@/components/dashboard/RecentReservations";
import { TodaysOperations } from "@/components/dashboard/TodaysOperations";
import { AIInsights } from "@/components/dashboard/AIInsights";

export default function DashboardPage() {
  return (
    <>
      <SEO title="لوحة التحكم - داريوم" />
      <AppShell>
        <div className="space-y-6">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-black text-foreground mb-2">لوحة التحكم</h1>
            <p className="text-muted-foreground">نظرة شاملة على أداء عقاراتك</p>
          </div>

          {/* KPIs */}
          <KPICards />

          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-6">
            <RevenueChart />
            <OccupancyChart />
          </div>

          {/* Channel Performance */}
          <ChannelPerformance />

          {/* AI Insights */}
          <AIInsights />

          {/* Recent Activity */}
          <div className="grid lg:grid-cols-2 gap-6">
            <RecentReservations />
            <TodaysOperations />
          </div>
        </div>
      </AppShell>
    </>
  );
}