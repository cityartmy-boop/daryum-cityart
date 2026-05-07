import { 
  Sparkles,
  Globe, 
  Shield, 
  TrendingUp, 
  Users, 
  Clock,
  DollarSign,
  MessageSquare,
  BarChart3,
  Zap,
  CheckCircle2,
  Bell
} from "lucide-react";

export function WhyDaryum() {
  const features = [
    {
      icon: Sparkles,
      title: "ذكاء اصطناعي متقدم",
      description: "رؤى وتوصيات ذكية لتحسين الأداء",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Globe,
      title: "مزامنة مع جميع المنصات",
      description: "ربط تلقائي مع Airbnb وBooking.com وغيرها",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: TrendingUp,
      title: "تحليلات شاملة",
      description: "تقارير مفصلة عن الأداء والإيرادات",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: DollarSign,
      title: "إدارة مالية متكاملة",
      description: "متابعة الإيرادات والمدفوعات بدقة",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: MessageSquare,
      title: "رسائل موحدة",
      description: "صندوق وارد واحد لجميع قنوات التواصل",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Users,
      title: "إدارة الفرق",
      description: "صلاحيات مخصصة لكل عضو في الفريق",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Clock,
      title: "أتمتة العمليات",
      description: "توفير الوقت من خلال المهام التلقائية",
      color: "from-teal-500 to-green-500"
    },
    {
      icon: Shield,
      title: "أمان عالٍ",
      description: "حماية بياناتك بأعلى معايير الأمان",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: BarChart3,
      title: "تقارير مخصصة",
      description: "إنشاء تقارير حسب احتياجاتك",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: Zap,
      title: "أداء سريع",
      description: "واجهة سريعة وسلسة",
      color: "from-amber-500 to-yellow-500"
    },
    {
      icon: CheckCircle2,
      title: "سهولة الاستخدام",
      description: "واجهة بسيطة وسهلة التعلم",
      color: "from-lime-500 to-green-500"
    },
    {
      icon: Bell,
      title: "إشعارات فورية",
      description: "تنبيهات لحظية لجميع الأحداث المهمة",
      color: "from-violet-500 to-purple-500"
    }
  ];

  return (
    <section id="features" className="py-24 bg-background relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-muted/30 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm mb-6 hover:scale-105 transition-transform duration-300">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            مميزات المنصة
          </div>
          <h2 className="text-4xl lg:text-5xl font-black mb-6">
            <span className="text-gradient bg-gradient-to-l from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient">
              منصة شاملة
            </span>
            <br />
            <span className="text-foreground">لكل احتياجاتك</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            كل ما تحتاجه لإدارة عقاراتك المؤجرة بكفاءة واحترافية في مكان واحد
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="glass rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 animate-fade-in-up border border-border/50 hover:border-primary/30"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} p-3 mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                <feature.icon className="w-full h-full text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}