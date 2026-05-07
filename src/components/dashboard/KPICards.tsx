import { TrendingUp, TrendingDown, DollarSign, Home, Calendar, Users, ClipboardCheck, Wrench } from "lucide-react";

export function KPICards() {
  const kpis = [
    {
      title: "إجمالي الإيرادات",
      value: "2.48M ر.س",
      change: "+12.3%",
      trend: "up",
      icon: DollarSign,
      description: "هذا الشهر",
      gradient: "from-[hsl(174,100%,29%)] to-[hsl(174,80%,40%)]"
    },
    {
      title: "معدل الإشغال",
      value: "84.2%",
      change: "+5.2%",
      trend: "up",
      icon: Home,
      description: "المتوسط الحالي",
      gradient: "from-[hsl(210,100%,12%)] to-[hsl(210,100%,25%)]"
    },
    {
      title: "متوسط السعر (ADR)",
      value: "612 ر.س",
      change: "+8.1%",
      trend: "up",
      icon: DollarSign,
      description: "لكل ليلة",
      gradient: "from-[hsl(38,70%,55%)] to-[hsl(38,80%,65%)]"
    },
    {
      title: "الإيراد لكل غرفة (RevPAR)",
      value: "480 ر.س",
      change: "+14.7%",
      trend: "up",
      icon: TrendingUp,
      description: "اليوم",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      title: "تسجيلات الوصول القادمة",
      value: "46",
      change: "اليوم",
      trend: "neutral",
      icon: Calendar,
      description: "خلال 24 ساعة",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "تسجيلات المغادرة",
      value: "39",
      change: "اليوم",
      trend: "neutral",
      icon: Calendar,
      description: "خلال 24 ساعة",
      gradient: "from-violet-500 to-purple-500"
    },
    {
      title: "مهام التنظيف المعلقة",
      value: "18",
      change: "-3 عن الأمس",
      trend: "down",
      icon: ClipboardCheck,
      description: "قيد التنفيذ",
      gradient: "from-teal-500 to-cyan-500"
    },
    {
      title: "طلبات الصيانة المفتوحة",
      value: "7",
      change: "+2 جديد",
      trend: "up",
      icon: Wrench,
      description: "تحتاج متابعة",
      gradient: "from-orange-500 to-amber-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpis.map((kpi, index) => (
        <div 
          key={index}
          className="glass rounded-2xl p-6 hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-fade-in-up cursor-pointer group border border-border/50"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${kpi.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
              <kpi.icon className="w-7 h-7" />
            </div>
            {kpi.trend !== "neutral" && (
              <div className={`flex items-center gap-1 text-sm font-bold px-2.5 py-1 rounded-lg ${
                kpi.trend === "up" 
                  ? "text-emerald-700 bg-emerald-100" 
                  : "text-rose-700 bg-rose-100"
              }`}>
                {kpi.trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {kpi.change}
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <h3 className="text-3xl font-black tabular-nums text-foreground">{kpi.value}</h3>
            <p className="text-sm font-bold text-foreground/80">{kpi.title}</p>
            <p className="text-xs text-muted-foreground">{kpi.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}