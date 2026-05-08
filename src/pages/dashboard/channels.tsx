import { SEO } from "@/components/SEO";
import { AppShell } from "@/components/dashboard/AppShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Clock,
  TrendingUp,
  DollarSign,
  Calendar
} from "lucide-react";

export default function ChannelsPage() {
  const channels = [
    {
      id: 1,
      name: "Airbnb",
      logo: "🏠",
      status: "connected",
      lastSync: "منذ 5 دقائق",
      bookings: 45,
      revenue: "﷼ 128,450",
      occupancy: 82,
      syncStatus: "success",
      color: "from-red-500 to-pink-500"
    },
    {
      id: 2,
      name: "Booking.com",
      logo: "🅱️",
      status: "connected",
      lastSync: "منذ 12 دقيقة",
      bookings: 38,
      revenue: "﷼ 96,200",
      occupancy: 76,
      syncStatus: "success",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 3,
      name: "حجز مباشر",
      logo: "📱",
      status: "connected",
      lastSync: "منذ ساعة",
      bookings: 22,
      revenue: "﷼ 58,300",
      occupancy: 68,
      syncStatus: "success",
      color: "from-emerald-500 to-green-500"
    },
    {
      id: 4,
      name: "Agoda",
      logo: "🅰️",
      status: "connected",
      lastSync: "منذ 3 ساعات",
      bookings: 15,
      revenue: "﷼ 42,100",
      occupancy: 64,
      syncStatus: "warning",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 5,
      name: "Vrbo",
      logo: "🏡",
      status: "error",
      lastSync: "منذ يومين",
      bookings: 0,
      revenue: "﷼ 0",
      occupancy: 0,
      syncStatus: "error",
      color: "from-orange-500 to-red-500"
    },
    {
      id: 6,
      name: "Expedia",
      logo: "✈️",
      status: "disconnected",
      lastSync: "غير متصل",
      bookings: 0,
      revenue: "﷼ 0",
      occupancy: 0,
      syncStatus: "disconnected",
      color: "from-gray-400 to-gray-500"
    },
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "connected": return <Badge className="bg-available">متصل</Badge>;
      case "error": return <Badge variant="destructive">خطأ</Badge>;
      case "disconnected": return <Badge variant="outline">غير متصل</Badge>;
      default: return <Badge variant="outline">غير معروف</Badge>;
    }
  };

  const getSyncStatusIcon = (syncStatus: string) => {
    switch(syncStatus) {
      case "success": return <CheckCircle2 className="w-5 h-5 text-available" />;
      case "warning": return <Clock className="w-5 h-5 text-amber-500" />;
      case "error": return <AlertCircle className="w-5 h-5 text-destructive" />;
      default: return <AlertCircle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const stats = [
    { label: "إجمالي القنوات", value: "6", color: "from-primary to-secondary" },
    { label: "المتصلة", value: "4", color: "from-available to-emerald-500" },
    { label: "إجمالي الحجوزات", value: "120", color: "from-blue-500 to-cyan-500" },
    { label: "إجمالي الإيراد", value: "﷼ 325K", color: "from-amber-500 to-orange-500" },
  ];

  return (
    <>
      <SEO title="القنوات - داريوم" />
      <AppShell>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-foreground">القنوات</h1>
              <p className="text-muted-foreground">إدارة منصات الحجز والتكاملات</p>
            </div>
            <Button className="gradient-primary">
              <RefreshCw className="w-5 h-5 ml-2" />
              مزامنة الكل
            </Button>
          </div>

          {/* KPIs */}
          <div className="grid md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="glass rounded-xl p-6">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} p-3 mb-3`}>
                  <TrendingUp className="w-full h-full text-white" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Channels Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {channels.map((channel) => (
              <div
                key={channel.id}
                className="glass rounded-xl p-6 border border-border/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${channel.color} flex items-center justify-center text-2xl`}>
                      {channel.logo}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{channel.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {getSyncStatusIcon(channel.syncStatus)}
                        <span>{channel.lastSync}</span>
                      </div>
                    </div>
                  </div>
                  {getStatusBadge(channel.status)}
                </div>

                {/* Stats */}
                {channel.status !== "disconnected" && (
                  <div className="grid grid-cols-3 gap-4 mb-4 pt-4 border-t border-border/50">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">الحجوزات</div>
                      <div className="text-lg font-bold text-foreground">{channel.bookings}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">الإيراد</div>
                      <div className="text-sm font-bold text-foreground">{channel.revenue}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">الإشغال</div>
                      <div className="text-lg font-bold text-primary">{channel.occupancy}%</div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-border/50">
                  {channel.status === "connected" && (
                    <>
                      <Button size="sm" variant="outline" className="flex-1">
                        <RefreshCw className="w-4 h-4 ml-2" />
                        مزامنة
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        الإعدادات
                      </Button>
                    </>
                  )}
                  {channel.status === "error" && (
                    <Button size="sm" variant="destructive" className="flex-1">
                      <AlertCircle className="w-4 h-4 ml-2" />
                      إصلاح الخطأ
                    </Button>
                  )}
                  {channel.status === "disconnected" && (
                    <Button size="sm" className="flex-1 gradient-primary">
                      <CheckCircle2 className="w-4 h-4 ml-2" />
                      ربط الآن
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Performance Chart Section */}
          <div className="glass rounded-xl p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">أداء القنوات - آخر 30 يوماً</h2>
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
              {channels.filter(c => c.status === "connected").map((channel) => (
                <div key={channel.id} className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{channel.logo}</span>
                    <span className="font-semibold text-foreground">{channel.name}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">الحجوزات:</span>
                      <span className="font-bold text-foreground">{channel.bookings}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">الإيراد:</span>
                      <span className="font-bold text-primary">{channel.revenue}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">الإشغال:</span>
                      <span className="font-bold text-available">{channel.occupancy}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AppShell>
    </>
  );
}