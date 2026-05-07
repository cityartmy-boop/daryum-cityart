import { Sparkles, TrendingUp, AlertTriangle, Lightbulb } from "lucide-react";

export function AIInsights() {
  const insights = [
    {
      type: "opportunity",
      icon: TrendingUp,
      title: "فرصة تسعير",
      message: "نقترح رفع السعر بنسبة 12% لعطلة نهاية الأسبوع القادمة. الطلب مرتفع والإشغال عند 96%.",
      action: "تطبيق التوصية",
      priority: "high",
      gradient: "from-[hsl(174,100%,29%)] to-[hsl(174,80%,40%)]"
    },
    {
      type: "alert",
      icon: AlertTriangle,
      title: "تنبيه إشغال",
      message: "شقة الملقا الفاخرة لديها 8 أيام متتالية بدون حجوزات في الأسبوع القادم.",
      action: "مراجعة الأسعار",
      priority: "medium",
      gradient: "from-[hsl(38,92%,50%)] to-[hsl(38,100%,65%)]"
    },
    {
      type: "suggestion",
      icon: Lightbulb,
      title: "توصية تشغيلية",
      message: "يمكن تقليل وقت التنظيف بنسبة 15% عبر إعادة جدولة الفريق بناءً على أنماط الوصول.",
      action: "عرض التفاصيل",
      priority: "low",
      gradient: "from-blue-500 to-purple-500"
    },
  ];

  const priorityColors = {
    high: "border-r-4 border-[hsl(38,92%,50%)]",
    medium: "border-r-4 border-blue-500",
    low: "border-r-4 border-[hsl(174,100%,29%)]",
  };

  return (
    <div className="glass rounded-2xl p-6 animate-fade-in-up delay-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[hsl(38,70%,55%)] to-[hsl(38,80%,65%)] flex items-center justify-center text-white glow shadow-lg">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold">رؤى ذكية</h3>
          <p className="text-sm text-muted-foreground">توصيات مدعومة بالذكاء الاصطناعي</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {insights.map((insight, idx) => (
          <div 
            key={idx} 
            className={`p-4 rounded-xl glass-dark ${priorityColors[insight.priority as keyof typeof priorityColors]} hover:scale-105 transition-transform`}
          >
            <div className="flex items-start gap-3 mb-3">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${insight.gradient} flex items-center justify-center text-white flex-shrink-0 shadow-md`}>
                <insight.icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm mb-1">{insight.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{insight.message}</p>
              </div>
            </div>
            
            <button className="text-sm font-medium text-primary hover:underline">
              {insight.action} ←
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}