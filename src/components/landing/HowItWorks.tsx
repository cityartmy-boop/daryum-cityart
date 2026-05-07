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
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-black mb-4">
            كيف <span className="text-gradient">يعمل</span>؟
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            أربع خطوات بسيطة للبدء في إدارة عقاراتك بكفاءة
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Connection Line (hidden on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-primary opacity-30"></div>
              )}
              
              {/* Step Number */}
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto rounded-full gradient-primary flex items-center justify-center glow">
                  <step.icon className="w-16 h-16 text-white" />
                </div>
                <div className="absolute top-0 right-0 w-12 h-12 rounded-full bg-white border-4 border-primary flex items-center justify-center">
                  <span className="text-2xl font-black text-gradient">{step.step}</span>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}