import { Sparkles, Zap, Brain, Cpu, TrendingUp, MessageSquare, Calendar, AlertTriangle } from "lucide-react";

export function AISection() {
  const aiFeatures = [
    {
      icon: TrendingUp,
      title: "تحسين الأسعار الديناميكي",
      insight: "نقترح رفع السعر بنسبة 8% في عطلة نهاية الأسبوع القادمة بناءً على الطلب الحالي",
      impact: "+12% متوقع في الإيراد",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: AlertTriangle,
      title: "كشف فجوات الإشغال",
      insight: "اكتشفنا فجوة إشغال في الوحدة A-204 للأسبوع القادم. نقترح تخفيض السعر بنسبة 5%",
      impact: "زيادة فرصة الحجز بنسبة 34%",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: MessageSquare,
      title: "ردود ذكية على الضيوف",
      insight: "ضيف يسأل عن إمكانية تسجيل دخول مبكر. الرد المقترح: نعم متاح مقابل رسوم SAR 150",
      impact: "زمن استجابة 30 ثانية",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Calendar,
      title: "تنبؤ بالصيانة",
      insight: "لاحظنا تكرار مشاكل صيانة في الوحدة B-101. نقترح فحص شامل",
      impact: "توفير SAR 2,400 في تكاليف الطوارئ",
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section className="py-24 bg-secondary/5 relative overflow-hidden">
      {/* Animated Background - Neural Network Effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        <div className="absolute top-20 left-40 w-3 h-3 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-40 left-20 w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 right-20 w-3 h-3 bg-accent rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-40 right-40 w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '0.8s' }}></div>
      </div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 via-accent/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-secondary/20 via-primary/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-down">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-primary text-white font-bold text-sm mb-6 shadow-2xl hover:scale-105 transition-transform duration-300 relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            <Sparkles className="w-5 h-5 animate-pulse relative z-10" />
            <span className="relative z-10">مدعوم بالذكاء الاصطناعي</span>
            <Brain className="w-5 h-5 animate-pulse relative z-10" style={{ animationDelay: '0.3s' }} />
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-black mb-6 relative">
            <span className="text-foreground">ذكاء اصطناعي متقدم</span>
            <br />
            <span className="text-gradient bg-gradient-to-l from-primary via-accent to-secondary bg-clip-text text-transparent animate-gradient">
              يساعدك في كل خطوة
            </span>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-8 animate-bounce">
              <Cpu className="w-8 h-8 text-primary/30" />
            </div>
            <div className="absolute -bottom-4 -left-8 animate-bounce" style={{ animationDelay: '0.5s' }}>
              <Zap className="w-8 h-8 text-accent/30" />
            </div>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            توصيات ذكية ورؤى عميقة تساعدك على اتخاذ قرارات أفضل وزيادة إيراداتك
          </p>
        </div>

        {/* AI Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {aiFeatures.map((feature, index) => (
            <div
              key={index}
              className="glass rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2 border border-border/50 hover:border-primary/30 animate-scale-in relative overflow-hidden"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Animated Background Gradient */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-10 rounded-full blur-2xl group-hover:w-48 group-hover:h-48 transition-all duration-700`}></div>
              
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} p-4 mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl relative z-10`}>
                <feature.icon className="w-full h-full text-white" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors relative z-10">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4 relative z-10">
                {feature.insight}
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold relative z-10">
                <TrendingUp className="w-4 h-4" />
                {feature.impact}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="glass rounded-3xl p-10 border border-primary/30 animate-fade-in relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
          {/* Animated Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
            {/* Icon */}
            <div className="w-20 h-20 rounded-2xl gradient-accent p-5 flex-shrink-0 animate-pulse shadow-2xl">
              <Brain className="w-full h-full text-white" />
            </div>
            
            {/* Content */}
            <div className="flex-1 text-center md:text-right">
              <h3 className="text-2xl lg:text-3xl font-black mb-2">يتعلم من أنماط عملك</h3>
              <p className="text-muted-foreground text-lg">
                النظام يتحسن تلقائياً كلما استخدمته أكثر، ليقدم لك توصيات أكثر دقة وملاءمة لنمط عملك الخاص
              </p>
            </div>
            
            {/* Decorative Stats */}
            <div className="flex gap-4">
              <div className="text-center p-4 glass-dark rounded-xl">
                <div className="text-3xl font-black text-primary">98%</div>
                <div className="text-xs text-muted-foreground">دقة التنبؤ</div>
              </div>
              <div className="text-center p-4 glass-dark rounded-xl">
                <div className="text-3xl font-black text-accent">24/7</div>
                <div className="text-xs text-muted-foreground">عمل مستمر</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}