import { UserPlus, Building2, Settings, TrendingUp } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: UserPlus,
      number: "1",
      title: "سجّل حسابك مجاناً",
      description: "أنشئ حسابك في دقائق واحصل على 14 يوم تجربة مجانية"
    },
    {
      icon: Building2,
      number: "2",
      title: "أضف عقاراتك ووحداتك",
      description: "أدخل بيانات العقارات والوحدات مع الصور والتفاصيل"
    },
    {
      icon: Settings,
      number: "3",
      title: "اربط منصات الحجز",
      description: "قم بالربط التلقائي مع Airbnb وBooking.com وغيرها"
    },
    {
      icon: TrendingUp,
      number: "4",
      title: "راقب الأداء وحسّن الإيرادات",
      description: "تابع التقارير والتحليلات الذكية لتحسين الإشغال"
    }
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2"></div>
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

        {/* Horizontal Timeline */}
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6 relative">
            {/* Connection Line (hidden on mobile) */}
            <div className="hidden md:block absolute top-12 right-0 left-0 h-1 bg-gradient-to-l from-primary via-secondary to-accent opacity-20" 
                 style={{ transform: 'translateY(-50%)' }}></div>
            
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Step Card */}
                <div className="glass rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2 border border-border/50 hover:border-primary/30 relative z-10">
                  {/* Number Badge */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl font-black shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 mx-auto mb-4">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-muted/30 p-3 mb-4 mx-auto group-hover:bg-primary/10 transition-colors">
                    <step.icon className="w-full h-full text-primary" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg font-bold mb-2 text-center group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground text-center leading-relaxed">
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