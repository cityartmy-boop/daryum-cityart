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
    <section className="py-24 bg-gradient-to-b from-background to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-display text-secondary mb-4">
            منصة شاملة لكل احتياجاتك
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            كل ما تحتاجه لإدارة محفظة عقارية احترافية في مكان واحد
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className="group bg-white rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl ${feature.bgColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-display text-secondary mb-2">
                {feature.titleAr}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {feature.titleEn}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {feature.descAr}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}