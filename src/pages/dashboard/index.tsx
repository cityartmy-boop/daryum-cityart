import { SEO } from "@/components/SEO";
import { AppShell } from "@/components/dashboard/AppShell";
import { KPICards } from "@/components/dashboard/KPICards";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { OccupancyChart } from "@/components/dashboard/OccupancyChart";
import { ChannelPerformance } from "@/components/dashboard/ChannelPerformance";
import { RecentReservations } from "@/components/dashboard/RecentReservations";
import { TodaysOperations } from "@/components/dashboard/TodaysOperations";
import { AIInsights } from "@/components/dashboard/AIInsights";

export default function Dashboard() {
  return (
    <>
      <SEO 
        title="لوحة التحكم - داريوم"
        description="لوحة التحكم الرئيسية لإدارة العقارات والحجوزات"
      />
      
      <AppShell>
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-black mb-2">مرحبًا، محمد 👋</h1>
          <p className="text-muted-foreground">إليك نظرة عامة على محفظتك العقارية اليوم</p>
        </div>

        {/* KPIs */}
        <KPICards />

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <RevenueChart />
          <OccupancyChart />
        </div>

        {/* Channel Performance */}
        <div className="mb-6">
          <ChannelPerformance />
        </div>

        {/* Operations Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <RecentReservations />
          </div>
          <div>
            <AIInsights />
          </div>
        </div>

        {/* Today's Operations */}
        <TodaysOperations />
      </AppShell>
    </>
  );
}