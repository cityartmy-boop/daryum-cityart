import { TrendingUp, TrendingDown, Users, DollarSign, CreditCard, UserCheck, UserX, Calendar } from "lucide-react";

export function PlatformKPIs() {
  const kpis = [
    {
      label: "إجمالي المستخدمين",
      value: "2,847",
      change: "+12.3%",
      trend: "up",
      icon: Users,
      color: "from-blue-500 to-cyan-500"
    },
    {
      label: "الإيرادات الشهرية (MRR)",
      value: "428,900 ر.س",
      change: "+18.5%",
      trend: "up",
      icon: DollarSign,
      color: "from-emerald-500 to-teal-500"
    },
    {
      label: "الإيرادات السنوية (ARR)",
      value: "5.15M ر.س",
      change: "+22.1%",
      trend: "up",
      icon: TrendingUp,
      color: "from-violet-500 to-purple-500"
    },
    {
      label: "الاشتراكات النشطة",
      value: "1,284",
      change: "+9.7%",
      trend: "up",
      icon: UserCheck,
      color: "from-blue-500 to-purple-500"
    },
    {
      label: "التجارب المجانية",
      value: "347",
      change: "+15.2%",
      trend: "up",
      icon: Calendar,
      color: "from-amber-500 to-orange-500"
    },
    {
      label: "معدل الإلغاء (Churn)",
      value: "3.2%",
      change: "-0.8%",
      trend: "down",
      icon: UserX,
      color: "from-rose-500 to-red-500"
    },
    {
      label: "متوسط القيمة الشهرية",
      value: "334 ر.س",
      change: "+4.3%",
      trend: "up",
      icon: CreditCard,
      color: "from-cyan-500 to-blue-500"
    },
    {
      label: "معدل التحويل",
      value: "68.4%",
      change: "+3.1%",
      trend: "up",
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpis.map((kpi, index) => (
        <div 
          key={index}
          className="glass rounded-2xl p-6 hover:scale-105 transition-transform glow-hover"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center`}>
              <kpi.icon className="w-7 h-7 text-white" />
            </div>
            <div className={`flex items-center gap-1 text-sm font-semibold ${
              kpi.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'
            }`}>
              {kpi.trend === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              {kpi.change}
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black text-gradient mb-1 tabular-nums">{kpi.value}</div>
            <div className="text-sm text-muted-foreground">{kpi.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}