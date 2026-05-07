import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Logo Section */}
          <div className="relative animate-fade-in-up">
            <div className="relative">
              {/* Main Logo with Glow */}
              <div className="relative z-10 flex items-center justify-center">
                <Image 
                  src="/داريوم.png" 
                  alt="داريوم" 
                  width={500}
                  height={200}
                  className="w-full max-w-md h-auto animate-float drop-shadow-2xl"
                  priority
                />
              </div>

              {/* Decorative Elements */}
              <div className="absolute inset-0 flex items-center justify-center -z-10">
                <div className="w-96 h-96 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 rounded-full blur-3xl animate-pulse"></div>
              </div>

              {/* Floating Geometric Shapes */}
              <div className="absolute top-10 right-10 w-20 h-20 border-4 border-primary/30 rounded-lg rotate-12 animate-float delay-200"></div>
              <div className="absolute bottom-10 left-10 w-16 h-16 border-4 border-accent/30 rounded-full animate-float delay-400"></div>
              <div className="absolute top-1/2 right-0 w-12 h-12 gradient-primary opacity-20 rounded-lg -rotate-45 animate-float delay-600"></div>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-6 animate-fade-in-up delay-200">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              من نحن
            </div>

            <h2 className="text-4xl lg:text-5xl font-black leading-tight">
              <span className="text-gradient">عن داريوم</span>
            </h2>

            <p className="text-xl text-muted-foreground leading-relaxed">
              داريوم هي منصة سعودية رائدة متخصصة في إدارة العقارات المؤجرة والوحدات السكنية. نوفر حلولاً تقنية متكاملة تساعد مالكي العقارات ومديري المحافظ على إدارة عملياتهم بكفاءة عالية وتحقيق أقصى عائد استثماري.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              من خلال منصتنا المتطورة، نقدم نظاماً شاملاً يجمع بين إدارة الحجوزات، التحليلات الذكية، العمليات التشغيلية، وإعداد التقارير المالية - كل ذلك في مكان واحد. نحن نؤمن بأن التكنولوجيا يجب أن تبسط الأعمال لا أن تعقدها.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="text-center">
                <div className="text-3xl font-black text-gradient mb-2">500+</div>
                <div className="text-sm text-muted-foreground">عقار مُدار</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-gradient mb-2">1500+</div>
                <div className="text-sm text-muted-foreground">وحدة نشطة</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-gradient mb-2">98%</div>
                <div className="text-sm text-muted-foreground">رضا العملاء</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}