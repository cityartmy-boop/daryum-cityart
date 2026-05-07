import { UserPlus, Building2, Settings, TrendingUp } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: UserPlus,
      step: "1",
      title: "سجّل حسابك مجانًا",
      description: "أنشئ حسابك في دقائق واحصل على 14 يوم تجربة مجانية بدون الحاجة لبطاقة ائتمان"
    },
    {
      icon: Building2,
      step: "2",
      title: "أضف عقاراتك ووحداتك",
      description: "أدخل بيانات العقارات والوحدات مع الصور والتفاصيل لإطلاق سريع"
    },
    {
      icon: Settings,
      step: "3",
      title: "اربط منصات الحجز",
      description: "قم بالربط التلقائي مع Airbnb وBooking.com وغيرها بنقرة واحدة"
    },
    {
      icon: TrendingUp,
      step: "4",
      title: "راقب الأداء وحسّن الإيرادات",
      description: "تابع التقارير والتحليلات الذكية لتحسين الإشغال والعوائد"
    }
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl">
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm mb-6 hover:scale-105 transition-transform duration-300">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            كيف يعمل
          </div>
          <h2 className="text-4xl lg:text-5xl font-black mb-6">
            <span className="text-foreground">ابدأ في دقائق</span>
            <br />
            <span className="text-gradient">بخطوات بسيطة</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            اتبع هذه الخطوات السهلة وابدأ في إدارة عقاراتك بكفاءة
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex gap-6 items-start glass rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 group hover:-translate-x-2 border border-border/50 hover:border-primary/30 animate-slide-in-left"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-black shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  {step.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}