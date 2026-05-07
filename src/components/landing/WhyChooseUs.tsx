import { Calendar, Clock, DollarSign, TrendingUp, Users, Sparkles } from "lucide-react";

export function WhyChooseUs() {
  const features = [
    {
      icon: Calendar,
      title: "إدارة موحّدة لجميع العقارات",
      description: "نحدّ من التشتت عبر جمع كل معلومات عقاراتك وحجوزاتك في منصة واحدة",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Clock,
      title: "التكامل مع أشهر منصات الحجز",
      description: "ربط تلقائي لتحديث التوافر والأسعار، ورفع عقارك بشكل سريع على مواقع مختلفة",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: DollarSign,
      title: "نظام دفع وفوترة شامل",
      description: "تذكير آلي بالمستحقات، وإمكانية تتبع الدفعات والعقود بسهولة",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: TrendingUp,
      title: "تقارير وتحليلات فورية",
      description: "لوحة معلومات تفاعلية تبيّن أبرز مؤشرات الأداء مثل عدد الحجوزات واستقرار الدخل",
      gradient: "from-amber-500 to-orange-500"
    },
    {
      icon: Users,
      title: "دعم واستشارات",
      description: "فريق دعم يرافقك في كل خطوة، مع تحديثات دورية للمنصة وفق احتياجات السوق المحلي",
      gradient: "from-rose-500 to-red-500"
    },
    {
      icon: Sparkles,
      title: "ذكاء اصطناعي متقدم",
      description: "توصيات ذكية للتسعير والإشغال، واقتراحات آلية للرد على رسائل الضيوف",
      gradient: "from-violet-500 to-purple-500"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-soft opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-black mb-4">
            لماذا <span className="text-gradient">داريوم</span>؟
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            اكتشف الميزات التي تجعل داريوم الخيار الأمثل لإدارة عقاراتك المؤجرة
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="glass rounded-2xl p-8 text-right hover:scale-105 transition-all duration-300 glow-hover animate-fade-in-up group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform glow`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}