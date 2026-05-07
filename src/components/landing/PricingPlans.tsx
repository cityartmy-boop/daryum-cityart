import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";

export function PricingPlans() {
  const plans = [
    {
      name: "البداية",
      price: "299",
      description: "مثالي للملاك الأفراد",
      properties: "حتى 3 عقارات",
      popular: false,
      features: [
        "حجوزات غير محدودة",
        "ربط مع 3 منصات حجز",
        "تقارير أساسية",
        "دعم فني عبر البريد",
        "تطبيق الجوال"
      ]
    },
    {
      name: "المحترف",
      price: "599",
      description: "الأكثر شعبية للمحترفين",
      properties: "حتى 10 عقارات",
      popular: true,
      features: [
        "كل ميزات البداية",
        "ربط مع جميع منصات الحجز",
        "تقارير متقدمة + VAT",
        "ذكاء اصطناعي للتسعير",
        "دعم فني ذو أولوية",
        "إدارة التنظيف والصيانة"
      ]
    },
    {
      name: "الأعمال",
      price: "999",
      description: "للشركات والمحافظ الكبيرة",
      properties: "حتى 25 عقار",
      popular: false,
      features: [
        "كل ميزات المحترف",
        "تقارير الملاك المخصصة",
        "أتمتة كاملة للعمليات",
        "مدير حساب مخصص",
        "تدريب مباشر للفريق",
        "API مخصص للتكامل"
      ]
    },
    {
      name: "المؤسسات",
      price: "مخصص",
      description: "حلول متكاملة للمؤسسات",
      properties: "50+ عقار",
      popular: false,
      features: [
        "كل ميزات الأعمال",
        "حلول مخصصة حسب الطلب",
        "خوادم مخصصة",
        "SLA مضمون 99.9%",
        "دعم فني 24/7",
        "استشارات عقارية شهرية"
      ]
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-soft opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-black mb-4">
            باقات <span className="text-gradient">التسعير</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            اختر الباقة المناسبة لحجم محفظتك العقارية
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative glass rounded-3xl p-8 text-right hover:scale-105 transition-all duration-300 animate-fade-in-up ${
                plan.popular ? "ring-2 ring-primary glow" : ""
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="gradient-primary text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    الأكثر شعبية
                  </span>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-2 justify-end">
                  {plan.price === "مخصص" ? (
                    <span className="text-4xl font-black text-gradient">{plan.price}</span>
                  ) : (
                    <>
                      <span className="text-4xl font-black text-gradient">{plan.price}</span>
                      <span className="text-lg text-muted-foreground">ر.س/شهر</span>
                    </>
                  )}
                </div>
                <p className="text-sm text-primary font-medium mt-2">{plan.properties}</p>
              </div>
              
              <Button 
                className={`w-full mb-6 ${
                  plan.popular 
                    ? "gradient-primary text-white hover:opacity-90" 
                    : "bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white"
                }`}
              >
                {plan.price === "مخصص" ? "تواصل معنا" : "ابدأ تجربتك المجانية"}
              </Button>
              
              <div className="space-y-3">
                {plan.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            جميع الباقات تشمل <strong className="text-foreground">14 يوم تجربة مجانية</strong> بدون الحاجة لبطاقة ائتمان
          </p>
        </div>
      </div>
    </section>
  );
}