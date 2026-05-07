import { Quote, Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      quote: "قبل استخدام المنصة، كنا نضيع ساعات يومياً في التنسيق بين القنوات. الآن كل شيء تلقائي ومتزامن. زادت إيراداتنا بنسبة 23% في أول ثلاثة أشهر.",
      author: "فهد العتيبي",
      role: "مدير عام",
      company: "مجموعة الخليج للعقارات",
      units: "87 وحدة",
      rating: 5,
    },
    {
      quote: "التقارير المالية للملاك كانت كابوساً شهرياً. الآن نُصدّر تقارير احترافية بضغطة زر. الملاك سعداء والمحاسب أسعد.",
      author: "نورة الشمري",
      role: "مديرة عمليات",
      company: "شركة النخيل للضيافة",
      units: "42 وحدة",
      rating: 5,
    },
    {
      quote: "المنصة فهمت احتياجاتنا كمشغلين سعوديين. الواجهة العربية ممتازة، دعم ضريبة القيمة المضافة مدمج، والتكاملات مع القنوات العالمية سلسة.",
      author: "خالد المطيري",
      role: "مؤسس",
      company: "مؤسسة الرياض للشقق المفروشة",
      units: "156 وحدة",
      rating: 5,
    },
  ];
  
  return (
    <section className="py-24 bg-gradient-to-b from-white to-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-display text-secondary mb-4">
            ثقة مشغلين سعوديين محترفين
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            مئات المحافظ العقارية تدار عبر المنصة بكفاءة عالية
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <div 
              key={i} 
              className="bg-white rounded-2xl p-8 border border-border hover:shadow-xl transition-all duration-300 relative"
            >
              <div className="absolute -top-4 -right-4 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Quote className="w-6 h-6 text-primary" />
              </div>
              
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>
              
              <div className="pt-6 border-t border-border">
                <div className="font-display text-lg text-secondary mb-1">
                  {testimonial.author}
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  {testimonial.role} — {testimonial.company}
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  {testimonial.units}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-8 px-8 py-6 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20">
            <div className="text-center">
              <div className="text-4xl font-display font-bold text-primary tabular-nums">350+</div>
              <div className="text-sm text-muted-foreground mt-1">محفظة عقارية نشطة</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-4xl font-display font-bold text-primary tabular-nums">12,400+</div>
              <div className="text-sm text-muted-foreground mt-1">وحدة سكنية</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-4xl font-display font-bold text-primary tabular-nums">98.4%</div>
              <div className="text-sm text-muted-foreground mt-1">معدل الرضا</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}