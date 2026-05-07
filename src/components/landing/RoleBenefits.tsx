import { Crown, Users, DollarSign, Calculator } from "lucide-react";

export function RoleBenefits() {
  const roles = [
    {
      icon: Crown,
      role: "المدير التنفيذي",
      roleEn: "Admin / Executive",
      benefits: [
        "رؤية شاملة للأداء المالي والتشغيلي لكامل المحفظة",
        "تحليلات ذكية لاتخاذ قرارات استراتيجية سريعة",
        "تتبع الإيرادات والإشغال والعائد على الاستثمار بدقة",
      ],
      color: "primary",
    },
    {
      icon: Users,
      role: "مدير العقارات",
      roleEn: "Property Manager",
      benefits: [
        "متابعة العمليات اليومية من لوحة واحدة",
        "إدارة فرق التنظيف والصيانة بكفاءة عالية",
        "الرد على رسائل الضيوف بسرعة مع اقتراحات ذكية",
      ],
      color: "occupied",
    },
    {
      icon: DollarSign,
      role: "المالك",
      roleEn: "Owner",
      benefits: [
        "بيانات شفافة عن إيرادات ومصروفات وحداتك",
        "تقارير دورية منتظمة ودقيقة",
        "متابعة الأداء والإشغال في الوقت الفعلي",
      ],
      color: "primary",
    },
    {
      icon: Calculator,
      role: "المحاسب",
      roleEn: "Accountant",
      benefits: [
        "تسوية مالية دقيقة لجميع المعاملات",
        "تقارير ضريبة القيمة المضافة جاهزة",
        "تتبع أرصدة الملاك ودورات الصرف",
      ],
      color: "secondary",
    },
  ];
  
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-display text-secondary mb-4">
            حل مصمم لكل دور
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            واجهات وصلاحيات مخصصة لكل مستخدم في فريقك
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {roles.map((role, i) => (
            <div 
              key={i} 
              className="bg-gradient-to-br from-background to-white rounded-2xl p-8 border border-border hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-${role.color}/10 flex items-center justify-center`}>
                  <role.icon className={`w-8 h-8 text-${role.color}`} />
                </div>
                <div>
                  <h3 className="text-2xl font-display text-secondary">{role.role}</h3>
                  <p className="text-sm text-muted-foreground">{role.roleEn}</p>
                </div>
              </div>
              
              <ul className="space-y-3">
                {role.benefits.map((benefit, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full bg-${role.color}/20 flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <div className={`w-2 h-2 rounded-full bg-${role.color}`} />
                    </div>
                    <span className="text-muted-foreground">{benefit}</span>
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