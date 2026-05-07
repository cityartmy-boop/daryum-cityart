import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Building2, Calendar, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 pt-20 pb-24 lg:pt-32 lg:pb-32">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,transparent,black)] -z-10" />
      
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Copy */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>منصة سعودية رائدة في إدارة العقارات</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-display leading-tight text-secondary">
              منصة متكاملة لإدارة عقاراتك المؤجرة
              <span className="text-primary"> بذكاء</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
              أدر محفظتك العقارية بالكامل من لوحة واحدة. مزامنة فورية للحجوزات، الأسعار، الرسائل، التقارير المالية، والعمليات التشغيلية. مصممة خصيصاً للسوق السعودي.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-white">
                ابدأ تجربة مجانية
                <ArrowRight className="mr-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2">
                احجز عرضاً توضيحياً
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">متكامل مع أفضل القنوات العالمية</p>
              <div className="flex flex-wrap items-center gap-8">
                <div className="text-secondary font-semibold">Airbnb</div>
                <div className="text-secondary font-semibold">Booking.com</div>
                <div className="text-secondary font-semibold">Agoda</div>
                <div className="text-secondary font-semibold">Vrbo</div>
                <div className="text-secondary font-semibold">Expedia</div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Dashboard Preview */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl border border-border p-6 transform rotate-1 hover:rotate-0 transition-transform duration-300">
              {/* Dashboard Preview - KPI Cards */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-5 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="w-5 h-5" />
                    <span className="text-sm opacity-90">الإيرادات الإجمالية</span>
                  </div>
                  <div className="text-3xl font-display font-bold tabular-nums">2.48M ر.س</div>
                  <div className="text-sm opacity-80 mt-1">+18.4% عن الشهر الماضي</div>
                </div>
                
                <div className="bg-gradient-to-br from-occupied to-occupied/80 rounded-xl p-5 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="w-5 h-5" />
                    <span className="text-sm opacity-90">معدل الإشغال</span>
                  </div>
                  <div className="text-3xl font-display font-bold tabular-nums">78.4%</div>
                  <div className="text-sm opacity-80 mt-1">+5.2% عن الشهر الماضي</div>
                </div>
              </div>
              
              {/* Chart Preview */}
              <div className="bg-muted/30 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold text-secondary">اتجاه الإيرادات</span>
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="h-32 flex items-end gap-2">
                  {[286, 301, 328, 355, 389, 421].map((value, i) => (
                    <div key={i} className="flex-1 bg-gradient-to-t from-primary to-primary/40 rounded-t" style={{ height: `${(value / 500) * 100}%` }} />
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>يناير</span>
                  <span>يونيو</span>
                </div>
              </div>
              
              <div className="mt-4 text-center text-sm text-muted-foreground">
                لوحة تحكم تنفيذية بمؤشرات حقيقية
              </div>
            </div>
            
            {/* Floating AI Insight Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl border border-border p-4 max-w-xs transform -rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-accent-foreground" />
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-secondary mb-1">توصية ذكية</div>
                  <div className="text-muted-foreground">نقترح رفع السعر بنسبة 8% في عطلة نهاية الأسبوع القادمة</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}