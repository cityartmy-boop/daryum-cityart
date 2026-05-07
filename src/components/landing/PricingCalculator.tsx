"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Calculator, Check } from "lucide-react";

export function PricingCalculator() {
  const [properties, setProperties] = useState(5);
  
  const calculatePrice = () => {
    if (properties <= 3) return 299;
    if (properties <= 10) return 599;
    if (properties <= 25) return 999;
    return 1499;
  };
  
  const getPlanName = () => {
    if (properties <= 3) return "البداية";
    if (properties <= 10) return "المحترف";
    if (properties <= 25) return "الأعمال";
    return "المؤسسات";
  };
  
  const features = [
    "حجوزات غير محدودة",
    "ربط مع جميع منصات الحجز",
    "تقارير مالية متقدمة",
    "ذكاء اصطناعي متكامل",
    "دعم فني على مدار الساعة",
    "تطبيق الجوال iOS & Android"
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-soft opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="w-10 h-10 text-primary" />
            <h2 className="text-4xl lg:text-5xl font-black">
              احسب <span className="text-gradient">تكلفتك</span>
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            أسعار شفافة ومرنة تناسب حجم محفظتك العقارية
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-8 lg:p-12 glow">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Calculator Side */}
              <div className="space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <label className="text-lg font-bold">عدد العقارات</label>
                    <span className="text-4xl font-black text-gradient">{properties}</span>
                  </div>
                  
                  <Slider
                    value={[properties]}
                    onValueChange={(value) => setProperties(value[0])}
                    max={50}
                    min={1}
                    step={1}
                    className="mb-4"
                  />
                  
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>1 عقار</span>
                    <span>50+ عقار</span>
                  </div>
                </div>
                
                <div className="bg-gradient-primary rounded-2xl p-8 text-white text-center">
                  <div className="text-sm opacity-90 mb-2">الباقة المقترحة</div>
                  <div className="text-3xl font-black mb-4">{getPlanName()}</div>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-black">{calculatePrice()}</span>
                    <span className="text-2xl opacity-90">ر.س</span>
                  </div>
                  <div className="text-sm opacity-75 mt-2">شهريًا</div>
                  
                  <Button 
                    size="lg" 
                    className="w-full mt-6 bg-white text-primary hover:bg-white/90 font-bold"
                  >
                    ابدأ تجربتك المجانية
                  </Button>
                </div>
              </div>
              
              {/* Features Side */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-right mb-6">ما تحصل عليه:</h3>
                
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 text-right bg-white/50 rounded-xl p-4 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Check className="w-6 h-6 text-primary flex-shrink-0" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
                
                <div className="bg-muted/50 rounded-xl p-6 text-right mt-8">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">ملاحظة:</strong> جميع الباقات تشمل 14 يوم تجربة مجانية بدون الحاجة لبطاقة ائتمان. يمكنك الإلغاء في أي وقت.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}