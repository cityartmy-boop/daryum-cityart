import { 
  Building2, 
  Calendar, 
  MessageSquare, 
  DollarSign, 
  BarChart3, 
  Sparkles,
  Users,
  Wrench
} from "lucide-react";

export function Features() {
  const features = [
    {
      icon: Building2,
      titleAr: "إدارة العقارات والوحدات",
      titleEn: "Properties & Units",
      descAr: "نظرة شاملة على محفظتك العقارية مع تفاصيل دقيقة لكل وحدة، حالة الإشغال، الأسعار، والأداء المالي.",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Calendar,
      titleAr: "تقويم ذكي موحّد",
      titleEn: "Unified Calendar",
      descAr: "جدولة مرنة تعرض جميع الحجوزات من كل القنوات في مكان واحد مع إمكانية السحب والإفلات والتحديث الفوري.",
      color: "text-occupied",
      bgColor: "bg-occupied/10",
    },
    {
      icon: MessageSquare,
      titleAr: "رسائل ذكية موحدة",
      titleEn: "Smart Messaging",
      descAr: "صندوق وارد واحد لجميع رسائل الضيوف من كل القنوات مع اقتراحات رد ذكية وتتبع زمن الاستجابة.",
      color: "text-cleaning",
      bgColor: "bg-cleaning/10",
    },
    {
      icon: Users,
      titleAr: "العمليات التشغيلية",
      titleEn: "Operations",
      descAr: "إدارة فرق التنظيف والصيانة بمهام محددة، قوائم مراجعة، جدولة زمنية، وتتبع حالة كل مهمة.",
      color: "text-maintenance",
      bgColor: "bg-maintenance/10",
    },
    {
      icon: DollarSign,
      titleAr: "تقارير الملاك والمالية",
      titleEn: "Owner Reporting",
      descAr: "بيانات مالية دقيقة لكل مالك، دورات صرف منتظمة، ملخصات الإيرادات والمصروفات، ودعم ضريبة القيمة المضافة.",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: BarChart3,
      titleAr: "تحليلات تنفيذية",
      titleEn: "Executive Analytics",
      descAr: "لوحات تحكم شاملة بمؤشرات الأداء الرئيسية، اتجاهات الإيرادات، أداء القنوات، والمقارنات الزمنية.",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      icon: Sparkles,
      titleAr: "ذكاء اصطناعي مدمج",
      titleEn: "Built-in AI",
      descAr: "توصيات ذكية لتسعير الوحدات، اكتشاف فرص التحسين، تنبيهات استباقية، واقتراحات تشغيلية.",
      color: "text-accent-foreground",
      bgColor: "bg-accent/20",
    },
    {
      icon: Wrench,
      titleAr: "التكاملات والأتمتة",
      titleEn: "Integrations",
      descAr: "ربط سلس مع قنوات الحجز العالمية، بوابات الدفع، الأقفال الذكية، أنظمة المحاسبة، وواتساب.",
      color: "text-occupied",
      bgColor: "bg-occupied/10",
    },
  ];
  
  return (
    <section className="py-24 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm mb-6 hover:scale-105 transition-transform duration-300">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            الميزات الأساسية
          </div>
          <h2 className="text-4xl lg:text-5xl font-black mb-6">
            <span className="text-gradient">كل ما تحتاجه</span>
            <br />
            <span className="text-foreground">لإدارة عقاراتك بكفاءة</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            منصة متكاملة تجمع جميع أدوات إدارة العقارات في مكان واحد
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2 border border-border/50 hover:border-primary/30 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} p-4 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
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
      </div>
    </section>
  );
}