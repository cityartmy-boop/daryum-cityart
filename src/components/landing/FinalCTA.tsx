import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function FinalCTA() {
  const benefits = [
    "تجربة مجانية 14 يوم بدون الحاجة لبطاقة ائتمانية",
    "دعم فني متكامل باللغتين العربية والإنجليزية",
    "تدريب شامل لفريقك مع مدير نجاح مخصص",
    "ترحيل بياناتك الحالية بدون تكلفة إضافية",
  ];
  
  return (
    <section className="py-24 bg-gradient-to-br from-primary via-primary to-primary/90 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.05] -z-0" />
      
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-display mb-6">
            ابدأ في إدارة عقاراتك بذكاء اليوم
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            انضم لمئات المشغلين السعوديين الذين يديرون محافظهم العقارية باحترافية
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8 py-6 bg-white text-primary hover:bg-white/90">
              ابدأ تجربة مجانية الآن
              <ArrowRight className="mr-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 border-white text-white hover:bg-white/10">
              تحدث مع فريق المبيعات
            </Button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {benefits.map((benefit, i) => (
            <div key={i} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <span className="text-white/90">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}