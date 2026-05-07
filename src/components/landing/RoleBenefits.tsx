import { Crown, Users, DollarSign, Calculator, ClipboardCheck, Wrench, CheckCircle2 } from "lucide-react";

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
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm mb-6 hover:scale-105 transition-transform duration-300">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            حل لكل دور
          </div>
          <h2 className="text-4xl lg:text-5xl font-black mb-6">
            <span className="text-foreground">مصمم خصيصاً</span>
            <br />
            <span className="text-gradient">لكل عضو في فريقك</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            واجهات مخصصة وصلاحيات دقيقة لكل دور في عملية إدارة العقارات
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {roles.map((role, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2 border border-border/50 hover:border-primary/30 animate-scale-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${role.color} p-4 mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                <role.icon className="w-full h-full text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                {role.title}
              </h3>
              <ul className="space-y-3">
                {role.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{benefit}</span>
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