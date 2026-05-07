import { Sparkles, TrendingUp, AlertTriangle, MessageSquare, Calendar } from "lucide-react";

export function AISection() {
  const aiFeatures = [
    {
      icon: TrendingUp,
      title: "نقترح رفع السعر بنسبة 8% في عطلة نهاية الأسبوع القادمة بناءً على الطلب الحالي",
      description: "+12% متوقع في الإيراد",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: AlertTriangle,
      title: "اكتشفنا فجوة إشغال في الوحدة A-204 للأسبوع القادم. نقترح تخفيض السعر بنسبة 5%",
      description: "زيادة فرصة الحجز بنسبة 34%",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      icon: MessageSquare,
      title: "ضيف يسأل عن إمكانية تسجيل دخول مبكر. الرد المقترح: نعم متاح مقابل رسوم SAR 150",
      description: "زمن استجابة 30 ثانية",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Calendar,
      title: "لاحظنا تكرار مشاكل صيانة في الوحدة B-101. نقترح فحص شامل",
      description: "توفير SAR 2,400 في تكاليف الطوارئ",
      color: "from-purple-500 to-purple-600",
    },
  ];
  
  return (
    <section className="py-24 bg-gradient-to-b from-secondary/5 via-primary/5 to-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,188,212,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(251,191,36,0.1),transparent_50%)]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in-down">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full gradient-primary text-white font-medium text-sm mb-6 shadow-lg hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-4 h-4 animate-pulse" />
            مدعوم بالذكاء الاصطناعي
          </div>
          <h2 className="text-4xl lg:text-5xl font-black mb-6">
            <span className="text-foreground">ذكاء اصطناعي متقدم</span>
            <br />
            <span className="text-gradient">يساعدك في كل خطوة</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            توصيات ذكية ورؤى عميقة تساعدك على اتخاذ قرارات أفضل وزيادة إيراداتك
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {aiFeatures.map((feature, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 group hover:-translate-y-1 border border-border/50 hover:border-primary/30 animate-slide-in-right"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} p-3 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-full h-full text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="glass rounded-2xl p-8 border border-primary/30 animate-fade-in">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl gradient-accent p-3 flex-shrink-0 animate-pulse">
              <Sparkles className="w-full h-full text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">يتعلم من أنماط عملك</h3>
              <p className="text-muted-foreground text-lg">
                النظام يتحسن تلقائياً كلما استخدمته أكثر، ليقدم لك توصيات أكثر دقة وملاءمة لنمط عملك الخاص
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}