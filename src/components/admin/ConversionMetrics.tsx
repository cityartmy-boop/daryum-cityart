import { TrendingUp, Users, Target, DollarSign } from "lucide-react";

export function ConversionMetrics() {
  const metrics = [
    {
      label: "معدل التحويل من التجربة",
      value: "68.4%",
      subtitle: "من 507 تجربة في آخر 30 يوم",
      trend: "+3.1%",
      icon: Target,
      color: "from-emerald-500 to-teal-500"
    },
    {
      label: "متوسط وقت التحويل",
      value: "8.2 يوم",
      subtitle: "من أصل 14 يوم تجربة",
      trend: "-1.3 يوم",
      icon: TrendingUp,
      color: "from-blue-500 to-cyan-500"
    },
    {
      label: "القيمة مدى الحياة (LTV)",
      value: "12,840 ر.س",
      subtitle: "متوسط 38.4 شهر",
      trend: "+2,100 ر.س",
      icon: DollarSign,
      color: "from-violet-500 to-purple-500"
    },
    {
      label: "معدل الاحتفاظ بالعملاء",
      value: "94.8%",
      subtitle: "بعد 12 شهر",
      trend: "+1.2%",
      icon: Users,
      color: "from-amber-500 to-orange-500"
    }
  ];

  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="text-2xl font-bold mb-6 text-right">مقاييس التحويل والاحتفاظ</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-muted/30 rounded-xl p-6 hover:bg-muted/50 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center`}>
                <metric.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-emerald-600">{metric.trend}</span>
            </div>
            
            <div className="text-right">
              <div className="text-4xl font-black text-gradient mb-2 tabular-nums">{metric.value}</div>
              <div className="font-semibold mb-1">{metric.label}</div>
              <div className="text-sm text-muted-foreground">{metric.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-black text-gradient mb-1 tabular-nums">347</div>
            <div className="text-sm text-muted-foreground">تجارب نشطة حالياً</div>
          </div>
          <div>
            <div className="text-3xl font-black text-gradient mb-1 tabular-nums">237</div>
            <div className="text-sm text-muted-foreground">تحويلات هذا الشهر</div>
          </div>
          <div>
            <div className="text-3xl font-black text-gradient mb-1 tabular-nums">41</div>
            <div className="text-sm text-muted-foreground">إلغاءات هذا الشهر</div>
          </div>
        </div>
      </div>
    </div>
  );
}