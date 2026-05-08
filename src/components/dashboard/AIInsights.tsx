import { Sparkles, TrendingUp, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function AIInsights() {
  const insights = [
    {
      type: "opportunity",
      title: "فرصة لزيادة الأسعار",
      description: "نقترح رفع السعر بنسبة 8% في عطلة نهاية الأسبوع القادمة بناءً على الطلب الحالي",
      impact: "+﷼ 3,200 متوقع",
      icon: TrendingUp,
      color: "from-available to-emerald-500"
    },
    {
      type: "warning",
      title: "فجوة في الإشغال",
      description: "توجد 4 وحدات متاحة في الأسبوع الثالث من يونيو بدون حجوزات",
      impact: "فقد محتمل: ﷼ 5,800",
      icon: AlertTriangle,
      color: "from-amber-500 to-orange-500"
    },
    {
      type: "insight",
      title: "أداء قوي",
      description: "معدل الإشغال في برج الفيصلية أعلى من المتوسط بنسبة 15%",
      impact: "+﷼ 12,400 إضافي",
      icon: Sparkles,
      color: "from-primary to-secondary"
    },
  ];

  return (
    <div className="glass rounded-xl p-6 border border-border/50">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-6 h-6 text-primary" />
        <h3 className="text-lg font-bold text-foreground">رؤى ذكية</h3>
        <Badge className="bg-primary/10 text-primary border-primary/20">AI</Badge>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <div key={index} className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${insight.color} p-3 mb-3`}>
              <insight.icon className="w-full h-full text-white" />
            </div>
            <h4 className="font-bold text-foreground mb-2">{insight.title}</h4>
            <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
            <div className="text-sm font-semibold text-primary">{insight.impact}</div>
          </div>
        ))}
      </div>
    </div>
  );
}