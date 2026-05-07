import { Sparkles, TrendingUp, AlertTriangle, MessageSquare, Calendar } from "lucide-react";

export function AISection() {
  const insights = [
    {
      icon: TrendingUp,
      insight: "نقترح رفع السعر بنسبة 8% في عطلة نهاية الأسبوع القادمة بناءً على الطلب الحالي",
      impact: "+12% متوقع في الإيراد",
    },
    {
      icon: AlertTriangle,
      insight: "اكتشفنا فجوة إشغال في الوحدة A-204 للأسبوع القادم. نقترح تخفيض السعر بنسبة 5%",
      impact: "زيادة فرصة الحجز بنسبة 34%",
    },
    {
      icon: MessageSquare,
      insight: "ضيف يسأل عن إمكانية تسجيل دخول مبكر. الرد المقترح: نعم متاح مقابل رسوم SAR 150",
      impact: "زمن استجابة 30 ثانية",
    },
    {
      icon: Calendar,
      insight: "لاحظنا تكرار مشاكل صيانة في الوحدة B-101. نقترح فحص شامل",
      impact: "توفير SAR 2,400 في تكاليف الطوارئ",
    },
  ];
  
  return (
    <section className="py-24 bg-gradient-to-br from-secondary via-secondary to-secondary/90 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.05] -z-0" />
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="font-semibold">ذكاء اصطناعي متقدم</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-display mb-4">
            توصيات ذكية لتحسين أدائك
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            النظام يحلل بياناتك بشكل مستمر ويقدم اقتراحات عملية لزيادة إيراداتك وتحسين عملياتك
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {insights.map((item, i) => (
            <div 
              key={i} 
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-white leading-relaxed mb-3">{item.insight}</p>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-semibold">
                    <TrendingUp className="w-3 h-3" />
                    {item.impact}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-white/60 text-lg">
            النظام يتعلم من أنماط عملك ويتحسن باستمرار
          </p>
        </div>
      </div>
    </section>
  );
}