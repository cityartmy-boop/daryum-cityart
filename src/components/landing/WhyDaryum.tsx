import { 
  Zap, 
  Globe, 
  Shield, 
  TrendingUp, 
  Users, 
  Clock,
  DollarSign,
  MessageSquare,
  BarChart3,
  Calendar,
  Building2,
  FileText
} from "lucide-react";

export function WhyDaryum() {
  const features = [
    {
      icon: Zap,
      title: "مزامنة فورية",
      description: "تحديث تلقائي للحجوزات والأسعار عبر جميع المنصات"
    },
    {
      icon: Globe,
      title: "تكامل عالمي",
      description: "اتصال مباشر مع Airbnb وBooking وأكثر من 15 قناة"
    },
    {
      icon: Shield,
      title: "أمان متقدم",
      description: "حماية شاملة للبيانات مع نسخ احتياطي يومي"
    },
    {
      icon: TrendingUp,
      title: "ذكاء اصطناعي",
      description: "توصيات ذكية لزيادة الإيرادات والإشغال"
    },
    {
      icon: Users,
      title: "إدارة الفريق",
      description: "صلاحيات مخصصة لكل دور في فريقك"
    },
    {
      icon: Clock,
      title: "أتمتة كاملة",
      description: "وفر ساعات عملك بأتمتة المهام المتكررة"
    },
    {
      icon: DollarSign,
      title: "تسعير ديناميكي",
      description: "أسعار تلقائية بناءً على الطلب والموسم"
    },
    {
      icon: MessageSquare,
      title: "رسائل موحدة",
      description: "جميع محادثات الضيوف في صندوق وارد واحد"
    },
    {
      icon: BarChart3,
      title: "تحليلات عميقة",
      description: "تقارير مفصلة عن الأداء والإيرادات"
    },
    {
      icon: Calendar,
      title: "تقويم ذكي",
      description: "رؤية شاملة للحجوزات والأسعار"
    },
    {
      icon: Building2,
      title: "إدارة متعددة",
      description: "تحكم في مئات العقارات من لوحة واحدة"
    },
    {
      icon: FileText,
      title: "تقارير الملاك",
      description: "كشوفات شهرية تلقائية للملاك مع الإيرادات"
    },
  ];

  return (
    <section id="features" className="py-24 bg-muted/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="text-primary font-bold text-sm tracking-wider">لماذا داريوم؟</span>
          <h2 className="text-5xl font-black mt-4 mb-6">
            منصة شاملة لكل احتياجاتك
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            كل ما تحتاجه لإدارة عقاراتك المؤجرة بكفاءة واحترافية في مكان واحد
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="glass rounded-2xl p-8 hover:shadow-xl transition-all group cursor-pointer animate-scale-in glow-hover"
              style={{animationDelay: `${index * 50}ms`}}
            >
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}