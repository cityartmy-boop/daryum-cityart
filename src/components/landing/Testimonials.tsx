import { Quote, Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "أحمد السعيد",
      role: "مدير عقارات",
      company: "مجموعة الرياض للعقارات",
      image: "أ",
      rating: 5,
      text: "داريوم غيّرت طريقة إدارتنا للعقارات بالكامل. الآن نتابع 42 عقاراً من لوحة واحدة بكل سلاسة."
    },
    {
      name: "فاطمة الغامدي",
      role: "صاحبة عقارات",
      company: "شقق الربوة الفاخرة",
      image: "ف",
      rating: 5,
      text: "التقارير الشهرية للملاك دقيقة وواضحة. أخيراً أستطيع متابعة إيرادات عقاراتي بشفافية كاملة."
    },
    {
      name: "خالد العتيبي",
      role: "مدير عمليات",
      company: "فنادق الدار",
      image: "خ",
      rating: 5,
      text: "المزامنة مع Airbnb وBooking.com فورية ودقيقة. وفرنا ساعات من العمل اليدوي كل يوم."
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-bold text-sm tracking-wider">شهادات العملاء</span>
          <h2 className="text-5xl font-black mt-4 mb-6">
            ثقة مشغّلين سعوديين محترفين
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            اكتشف كيف ساعدت داريوم مدراء العقارات على زيادة كفاءتهم التشغيلية
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="glass rounded-3xl p-8 hover:shadow-2xl transition-all animate-scale-in glow-hover"
              style={{animationDelay: `${index * 150}ms`}}
            >
              <Quote className="w-12 h-12 text-primary/20 mb-4" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              <p className="text-lg text-foreground leading-relaxed mb-8">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                  {testimonial.image}
                </div>
                <div className="flex-1 text-right">
                  <div className="font-bold text-lg">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  <div className="text-sm text-primary font-semibold">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}