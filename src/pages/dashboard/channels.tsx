import { SEO } from "@/components/SEO";
import { AppShell } from "@/components/dashboard/AppShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Globe,
  Plus,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Calendar,
  Settings
} from "lucide-react";

export default function ChannelsPage() {
  const channels = [
    {
      id: 1,
      name: "Airbnb",
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg",
      connected: true,
      status: "active",
      lastSync: "منذ 5 دقائق",
      properties: 12,
      bookings: 48,
      revenue: "156,800"
    },
    {
      id: 2,
      name: "Booking.com",
      logo: "https://cf.bstatic.com/static/img/b25logo/booking_logo_retina/22615963add19ac6b6abe4b7f4283ef15fa5a0ca.png",
      connected: true,
      status: "active",
      lastSync: "منذ 10 دقائق",
      properties: 10,
      bookings: 42,
      revenue: "134,200"
    },
    {
      id: 3,
      name: "Expedia",
      logo: "https://www.expedia.com/_dms/header/logo.svg",
      connected: true,
      status: "warning",
      lastSync: "منذ ساعتين",
      properties: 8,
      bookings: 31,
      revenue: "98,500"
    },
    {
      id: 4,
      name: "Agoda",
      logo: "https://cdn6.agoda.net/images/kite-js/logo/agoda/color-default.svg",
      connected: false,
      status: "inactive",
      lastSync: "-",
      properties: 0,
      bookings: 0,
      revenue: "0"
    },
    {
      id: 5,
      name: "المطار",
      logo: "https://www.almatar.com/static/images/almatar-logo-en.svg",
      connected: true,
      status: "active",
      lastSync: "منذ 15 دقيقة",
      properties: 6,
      bookings: 18,
      revenue: "67,300"
    },
    {
      id: 6,
      name: "المسافر",
      logo: "https://www.almosafer.com/en/logo.svg",
      connected: false,
      status: "inactive",
      lastSync: "-",
      properties: 0,
      bookings: 0,
      revenue: "0"
    },
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "active": return <Badge className="bg-available">نشط</Badge>;
      case "warning": return <Badge className="bg-maintenance">تحذير</Badge>;
      case "inactive": return <Badge variant="secondary">غير متصل</Badge>;
      default: return <Badge variant="outline">غير معروف</Badge>;
    }
  };

  const handleSync = (channelId: number) => {
    console.log("Syncing channel:", channelId);
    alert("جارٍ المزامنة...");
  };

  const handleToggle = (channelId: number) => {
    console.log("Toggling channel:", channelId);
  };

  return (
    <>
      <SEO title="القنوات - داريوم" />
      <AppShell>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-foreground">قنوات الحجز</h1>
              <p className="text-muted-foreground">إدارة وربط منصات الحجز الإلكترونية</p>
            </div>
            <Button className="gradient-primary">
              <Plus className="w-5 h-5 ml-2" />
              ربط قناة جديدة
            </Button>
          </div>

          {/* KPIs */}
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { label: "قنوات متصلة", value: "4", icon: Globe, color: "from-primary to-secondary" },
              { label: "إجمالي الحجوزات", value: "139", icon: Calendar, color: "from-blue-500 to-cyan-500" },
              { label: "إجمالي الإيراد", value: "﷼456,800", icon: DollarSign, color: "from-emerald-500 to-green-500" },
              { label: "معدل التحويل", value: "12.4%", icon: TrendingUp, color: "from-amber-500 to-orange-500" },
            ].map((stat, index) => (
              <div key={index} className="glass rounded-xl p-6">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} p-3 mb-3`}>
                  <stat.icon className="w-full h-full text-white" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Channels Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {channels.map((channel) => (
              <div
                key={channel.id}
                className="glass rounded-2xl p-6 border border-border/50 hover:shadow-xl transition-all duration-300"
              >
                {/* Channel Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-white p-2 flex items-center justify-center border border-border/50">
                      <img 
                        src={channel.logo} 
                        alt={channel.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">{channel.name}</h3>
                      {getStatusBadge(channel.status)}
                    </div>
                  </div>
                  <Switch 
                    checked={channel.connected}
                    onCheckedChange={() => handleToggle(channel.id)}
                  />
                </div>

                {/* Channel Stats */}
                {channel.connected && (
                  <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-border/50">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">عقارات</div>
                      <div className="text-lg font-bold text-foreground">{channel.properties}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">حجوزات</div>
                      <div className="text-lg font-bold text-foreground">{channel.bookings}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">إيراد</div>
                      <div className="text-sm font-bold text-foreground">﷼{channel.revenue}</div>
                    </div>
                  </div>
                )}

                {/* Last Sync */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    {channel.status === "active" ? (
                      <CheckCircle2 className="w-4 h-4 text-available" />
                    ) : channel.status === "warning" ? (
                      <AlertCircle className="w-4 h-4 text-maintenance" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-muted-foreground" />
                    )}
                    <span>آخر مزامنة: {channel.lastSync}</span>
                  </div>
                  {channel.connected && (
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleSync(channel.id)}
                      >
                        <RefreshCw className="w-4 h-4 ml-2" />
                        مزامنة
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                  {!channel.connected && (
                    <Button size="sm" className="gradient-primary">
                      ربط الآن
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </AppShell>
    </>
  );
}