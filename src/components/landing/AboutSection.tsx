import { CheckCircle2 } from "lucide-react";

export function AboutSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 gradient-primary"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="relative animate-fade-in-up">
            <div className="glass rounded-3xl p-2 glow">
              <div className="bg-gradient-soft rounded-2xl p-8 aspect-[4/3] flex items-center justify-center">
                <div className="text-center space-y-6">
                  <div className="w-32 h-32 mx-auto rounded-full gradient-primary flex items-center justify-center glow">
                    <span className="text-6xl font-black text-white">د</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-black text-gradient">داريوم</h3>
                    <p className="text-lg text-muted-foreground">نظام تشغيل العقارات الذكي</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content Side */}
          <div className="text-right space-y-8 animate-fade-in-up delay-200">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-black">
                عن <span className="text-gradient">داريوم</span>
              </h2>
              <div className="w-24 h-1 gradient-primary mr-auto"></div>
            </div>
            
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                <strong className="text-foreground font-bold">داريوم</strong> منصة سعودية متخصصة في إدارة العقارات والحجوزات، صُممت لتبسيط عمليات الملاك والمديرين عبر واجهة واحدة متكاملة.
              </p>
              
              <p>
                يمكنك من خلالها ربط عقارك بمنصات الحجز الشهيرة، وتتبع المدفوعات والتقارير، والتواصل بسهولة مع الضيوف. نهدف إلى تقليل الأخطاء اليدوية وتقديم تجربة سلسة ومريحة لكل من المالك والضيف.
              </p>
            </div>
            
            <div className="space-y-4">
              {[
                "إدارة موحّدة لجميع عقاراتك من لوحة واحدة",
                "تكامل تلقائي مع أشهر منصات الحجز العالمية",
                "تقارير مالية ذكية متوافقة مع ضريبة القيمة المضافة",
                "ذكاء اصطناعي لتحسين التسعير والإشغال"
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3 glass p-4 rounded-xl hover:scale-105 transition-transform">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}