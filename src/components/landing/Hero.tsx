import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, Building2, TrendingUp } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 gradient-soft opacity-50"></div>
      
      {/* Animated Circles */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float delay-300"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-right space-y-8 animate-fade-in-up">
            {/* Logo */}
            <div className="flex justify-end mb-6">
              <Image 
                src="/ChatGPT_Image_May_7_2026_09_50_18_AM.png" 
                alt="داريوم" 
                width={180}
                height={60}
                className="h-16 w-auto"
              />
            </div>
            
            {/* Badge */}
            <div className="flex justify-end">
              <span className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4 text-primary" />
                منصة سعودية مدعومة بالذكاء الاصطناعي
              </span>
            </div>
            
            {/* Headline */}
            <h1 className="text-5xl lg:text-7xl font-black leading-tight">
              <span className="text-gradient">نظام تشغيل</span>
              <br />
              عقاراتك المؤجرة
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
              أدِر محفظتك العقارية بالكامل من لوحة واحدة — حجوزات، تسعير، رسائل، تنظيف، صيانة، وتقارير مالية ذكية مع ضريبة القيمة المضافة.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-6">
              <div className="text-center glass p-4 rounded-2xl glow-hover">
                <div className="text-3xl font-black text-gradient">2.4M+</div>
                <div className="text-sm text-muted-foreground mt-1">إجمالي الحجوزات</div>
              </div>
              <div className="text-center glass p-4 rounded-2xl glow-hover">
                <div className="text-3xl font-black text-gradient">850+</div>
                <div className="text-sm text-muted-foreground mt-1">عقار نشط</div>
              </div>
              <div className="text-center glass p-4 rounded-2xl glow-hover">
                <div className="text-3xl font-black text-gradient">98.4%</div>
                <div className="text-sm text-muted-foreground mt-1">رضا العملاء</div>
              </div>
            </div>
            
            {/* CTAs */}
            <div className="flex gap-4 justify-end">
              <Button size="lg" className="gradient-primary text-white hover:opacity-90 transition-opacity glow-hover group text-lg px-8 py-6">
                ابدأ مجانًا الآن
                <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="glass border-2 hover:bg-white/80 text-lg px-8 py-6">
                شاهد العرض التوضيحي
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex items-center gap-4 justify-end text-sm text-muted-foreground">
              <span>✓ بدون بطاقة ائتمان</span>
              <span>✓ 14 يوم تجربة مجانية</span>
              <span>✓ دعم فني سريع</span>
            </div>
          </div>
          
          {/* Visual */}
          <div className="relative lg:block hidden animate-fade-in-up delay-300">
            <div className="glass rounded-3xl p-8 glow">
              <div className="bg-gradient-primary rounded-2xl p-6 text-white space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm opacity-90">لوحة التحكم الرئيسية</div>
                      <div className="text-2xl font-black">داريوم</div>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-sm opacity-90">الإيرادات الشهرية</div>
                    <div className="text-2xl font-black">2.48M ر.س</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-sm opacity-90">معدل الإشغال</div>
                    <div className="text-3xl font-black mt-2">84.2%</div>
                    <div className="flex items-center gap-1 mt-2 text-sm">
                      <TrendingUp className="w-4 h-4" />
                      <span>+5.2%</span>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-sm opacity-90">متوسط السعر</div>
                    <div className="text-3xl font-black mt-2">612 ر.س</div>
                    <div className="flex items-center gap-1 mt-2 text-sm">
                      <TrendingUp className="w-4 h-4" />
                      <span>+8.1%</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-available"></div>
                      <span className="text-sm">حجوزات اليوم</span>
                    </div>
                    <span className="font-bold">12</span>
                  </div>
                  <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-cleaning"></div>
                      <span className="text-sm">مهام التنظيف</span>
                    </div>
                    <span className="font-bold">8</span>
                  </div>
                  <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-maintenance"></div>
                      <span className="text-sm">طلبات الصيانة</span>
                    </div>
                    <span className="font-bold">3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}