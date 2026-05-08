import { TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ChannelPerformance() {
  const channels = [
    { name: "Airbnb", bookings: 45, revenue: "﷼ 128,450", share: 34, color: "bg-red-500" },
    { name: "Booking.com", bookings: 38, revenue: "﷼ 96,200", share: 29, color: "bg-blue-500" },
    { name: "حجز مباشر", bookings: 22, revenue: "﷼ 58,300", share: 18, color: "bg-available" },
    { name: "Agoda", bookings: 15, revenue: "﷼ 42,100", share: 11, color: "bg-purple-500" },
    { name: "Vrbo", bookings: 10, revenue: "﷼ 28,950", share: 8, color: "bg-amber-500" },
  ];

  return (
    <div className="glass rounded-xl p-6 border border-border/50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-foreground mb-1">أداء القنوات</h3>
          <p className="text-sm text-muted-foreground">توزيع الحجوزات والإيرادات</p>
        </div>
      </div>

      <div className="space-y-4">
        {channels.map((channel, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${channel.color}`}></div>
                <span className="font-semibold text-foreground">{channel.name}</span>
                <Badge variant="outline" className="text-xs">{channel.bookings} حجز</Badge>
              </div>
              <div className="text-left">
                <div className="font-bold text-foreground">{channel.revenue}</div>
                <div className="text-xs text-muted-foreground">{channel.share}%</div>
              </div>
            </div>
            <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
              <div 
                className={`h-full ${channel.color} transition-all`}
                style={{ width: `${channel.share}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}