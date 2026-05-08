import { DollarSign, TrendingUp, Users, Home } from "lucide-react";

export function KPICards() {
  const kpis = [
    {
      label: "إجمالي الإيرادات",
      value: "﷼ 2.48M",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "from-primary to-secondary"
    },
    {
      label: "معدل الإشغال",
      value: "78.4%",
      change: "+3.2%",
      trend: "up",
      icon: TrendingUp,
      color: "from-blue-500 to-cyan-500"
    },
    {
      label: "متوسط السعر (ADR)",
      value: "﷼ 612",
      change: "+8.1%",
      trend: "up",
      icon: Home,
      color: "from-emerald-500 to-green-500"
    },
    {
      label: "الإيراد لكل وحدة (RevPAR)",
      value: "﷼ 480",
      change: "+15.3%",
      trend: "up",
      icon: Users,
      color: "from-amber-500 to-orange-500"
    }
  ];

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      {kpis.map((kpi, index) => (
        <div key={index} className="glass rounded-xl p-6 border border-border/50 hover:shadow-xl transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${kpi.color} p-3`}>
              <kpi.icon className="w-full h-full text-white" />
            </div>
            <span className={`text-sm font-semibold ${kpi.trend === 'up' ? 'text-available' : 'text-destructive'}`}>
              {kpi.change}
            </span>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-foreground tabular-nums">{kpi.value}</div>
            <div className="text-sm text-muted-foreground">{kpi.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}