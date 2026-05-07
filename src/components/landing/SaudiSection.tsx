import { MapPin, Languages, Building, Calendar as CalendarIcon } from "lucide-react";

export function SaudiSection() {
  const features = [
    {
      icon: Languages,
      title: "عربي أولاً",
      titleEn: "Arabic-First",
      desc: "واجهة مصممة بعناية للغة العربية مع دعم كامل للإنجليزية. كل عنصر يبدو طبيعياً في كلا اللغتين.",
    },
    {
      icon: Building,
      title: "ضريبة القيمة المضافة",
      titleEn: "VAT-Ready",
      desc: "نظام مالي متوافق تماماً مع متطلبات هيئة الزكاة والضريبة والجمارك السعودية.",
    },
    {
      icon: MapPin,
      title: "مصمم للسوق السعودي",
      titleEn: "Saudi Market",
      desc: "منطق تشغيلي يفهم موسمية الطلب السعودي، عطلات نهاية الأسبوع، والأعياد الوطنية.",
    },
    {
      icon: CalendarIcon,
      title: "تقويم هجري وميلادي",
      titleEn: "Dual Calendar",
      desc: "دعم كامل للتقويمين الهجري والميلادي في التقارير والتحليلات.",
    },
  ];
  
  return (
    <section className="py-24 bg-gradient-to-b from-white to-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-display text-secondary mb-4">
            مصمم خصيصاً للسوق السعودي
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            ليس مجرد ترجمة — هذا نظام بُني من الأساس لمشغلي العقارات في السعودية
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className="bg-white rounded-2xl p-6 border border-border text-center hover:shadow-lg transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-display text-secondary mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3 font-semibold">
                {feature.titleEn}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 border border-primary/20 text-center max-w-3xl mx-auto">
          <p className="text-lg text-secondary leading-relaxed">
            <span className="font-display font-bold text-2xl text-primary">لا مساومة على الجودة.</span>
            <br />
            نفس المستوى من الاحترافية والاهتمام بالتفاصيل في كل جانب من النظام — 
            سواء كنت تستخدمه بالعربية أو بالإنجليزية.
          </p>
        </div>
      </div>
    </section>
  );
}