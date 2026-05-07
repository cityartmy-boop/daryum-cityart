import { Crown, Users, DollarSign, Calculator, ClipboardCheck, Wrench } from "lucide-react";

export function RoleBenefits() {
  const roles = [
    {
      icon: Crown,
      title: "المدير التنفيذي",
      color: "from-primary to-primary/80",
      benefits: [
        "نظرة شاملة على الأداء المالي",
        "تقارير تحليلية متقدمة",
        "مؤشرات الأداء الرئيسية (KPIs)",
        "توقعات الإيرادات والإشغال"
      ]
    },
    {
      icon: Users,
      title: "مدير العقارات",
      color: "from-secondary to-secondary/80",
      benefits: [
        "إدارة الحجوزات والضيوف",
        "جدولة التنظيف والصيانة",
        "رسائل موحدة من جميع القنوات",
        "متابعة العمليات اليومية"
      ]
    },
    {
      icon: DollarSign,
      title: "الملاك",
      color: "from-accent to-accent/80",
      benefits: [
        "كشوف حساب شهرية تلقائية",
        "تتبع الإيرادات والمصروفات",
        "تقارير أداء الوحدات",
        "شفافية كاملة في العمليات"
      ]
    },
    {
      icon: Calculator,
      title: "المحاسب",
      color: "from-primary to-accent",
      benefits: [
        "تسوية مالية دقيقة",
        "تقارير ضريبة القيمة المضافة",
        "أرصدة الملاك والعمولات",
        "تصدير البيانات المالية"
      ]
    },
    {
      icon: ClipboardCheck,
      title: "فريق التنظيف",
      color: "from-cleaning to-cleaning/80",
      benefits: [
        "قائمة مهام يومية واضحة",
        "جدول زمني للوحدات",
        "تأكيد إتمام التنظيف",
        "تحميل صور قبل وبعد"
      ]
    },
    {
      icon: Wrench,
      title: "فريق الصيانة",
      color: "from-maintenance to-maintenance/80",
      benefits: [
        "تذاكر الصيانة المفتوحة",
        "مستوى الأولوية والاستعجال",
        "تتبع الوقت والتكاليف",
        "إضافة ملاحظات وصور"
      ]
    },
  ];

  return (
    <section id="solutions" className="py-24 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="text-primary font-bold text-sm tracking-wider">الحلول</span>
          <h2 className="text-5xl font-black mt-4 mb-6">
            حل مصمم لكل دور
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            صلاحيات وواجهات مخصصة لكل عضو في فريقك
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {roles.map((role, index) => (
            <div 
              key={index}
              className="glass rounded-3xl p-8 hover:shadow-2xl transition-all group animate-scale-in glow-hover"
              style={{animationDelay: `${index * 100}ms`}}
            >
              <div className={`w-20 h-20 bg-gradient-to-br ${role.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg`}>
                <role.icon className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-2xl font-black mb-4">{role.title}</h3>
              
              <ul className="space-y-3">
                {role.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}