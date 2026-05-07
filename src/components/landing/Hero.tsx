import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, CheckCircle2 } from "lucide-react";

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image 
                src="/داريوم.png" 
                alt="داريوم" 
                width={160}
                height={50}
                className="h-12 w-auto"
                priority
              />
            </Link>

            {/* Navigation Links */}
            <div className="hidden lg:flex items-center gap-8">
              <button onClick={() => scrollToSection("home")} className="text-foreground hover:text-primary transition-colors font-medium">
                الرئيسية
              </button>
              <button onClick={() => scrollToSection("about")} className="text-foreground hover:text-primary transition-colors font-medium">
                عن داريوم
              </button>
              <button onClick={() => scrollToSection("features")} className="text-foreground hover:text-primary transition-colors font-medium">
                المميزات
              </button>
              <button onClick={() => scrollToSection("solutions")} className="text-foreground hover:text-primary transition-colors font-medium">
                الحلول
              </button>
              <button onClick={() => scrollToSection("pricing")} className="text-foreground hover:text-primary transition-colors font-medium">
                الباقات
              </button>
              <button onClick={() => scrollToSection("contact")} className="text-foreground hover:text-primary transition-colors font-medium">
                اتصل بنا
              </button>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" className="font-semibold">
                  تسجيل الدخول
                </Button>
              </Link>
              <Link href="/register">
                <Button className="gradient-primary text-white font-semibold shadow-lg hover:shadow-xl transition-all">
                  ابدأ مجاناً
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float delay-300"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              منصة سعودية رائدة في إدارة العقارات
            </div>

            <h1 className="text-5xl lg:text-6xl font-black leading-tight">
              <span className="text-gradient">المنصة الشاملة</span>
              <br />
              <span className="text-foreground">لإدارة عقاراتك المؤجرة</span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed">
              أدِر جميع عقاراتك ووحداتك من لوحة واحدة. مزامنة فورية للحجوزات والأسعار والرسائل مع جميع منصات الحجز العالمية، رؤى ذكية لتحسين الإشغال والعائد، وعمليات تشغيلية سلسة.
            </p>

            {/* Features Quick List */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-foreground">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="font-medium">بدون بطاقة ائتمان</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="font-medium">إلغاء مجاني</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="font-medium">دعم 24/7</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link href="/register">
                <Button size="lg" className="gradient-primary text-white font-bold text-lg px-8 h-14 shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                  ابدأ تجربتك المجانية
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="font-bold text-lg px-8 h-14 border-2 hover:bg-muted/50 transition-all">
                <Play className="w-5 h-5 ml-2" />
                شاهد العرض التوضيحي
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-black text-gradient">500+</div>
                <div className="text-sm text-muted-foreground">عقار مُدار</div>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div>
                <div className="text-3xl font-black text-gradient">98%</div>
                <div className="text-sm text-muted-foreground">رضا العملاء</div>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div>
                <div className="text-3xl font-black text-gradient">24/7</div>
                <div className="text-sm text-muted-foreground">دعم فني</div>
              </div>
            </div>
          </div>

          {/* Right Visual - Dashboard Preview */}
          <div className="relative animate-fade-in-up delay-300">
            <div className="relative glass rounded-3xl p-8 shadow-2xl border-2 border-border/50 backdrop-blur-xl">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-primary"></div>
                  <div>
                    <div className="font-bold">أحمد الشمري</div>
                    <div className="text-xs text-muted-foreground">42 عقار • 156 وحدة</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive"></div>
                  <div className="w-3 h-3 rounded-full bg-accent"></div>
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="glass-dark rounded-xl p-4">
                  <div className="text-xs text-muted-foreground mb-1">الإيرادات الشهرية</div>
                  <div className="text-2xl font-black text-gradient">2.48M ر.س</div>
                  <div className="text-xs text-primary mt-1">↑ 12.5%</div>
                </div>
                <div className="glass-dark rounded-xl p-4">
                  <div className="text-xs text-muted-foreground mb-1">معدل الإشغال</div>
                  <div className="text-2xl font-black text-gradient">84.2%</div>
                  <div className="text-xs text-primary mt-1">↑ 5.8%</div>
                </div>
              </div>

              {/* Mini Chart */}
              <div className="glass-dark rounded-xl p-4">
                <div className="text-xs text-muted-foreground mb-3">اتجاه الإيرادات</div>
                <div className="flex items-end gap-2 h-24">
                  {[40, 55, 45, 70, 60, 80, 90].map((height, i) => (
                    <div key={i} className="flex-1 gradient-primary rounded-t" style={{ height: `${height}%` }}></div>
                  ))}
                </div>
              </div>

              {/* Decorative Floating Elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 gradient-accent rounded-full blur-3xl opacity-30 animate-float"></div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 gradient-primary rounded-full blur-3xl opacity-20 animate-float delay-300"></div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-4 -left-4 glass rounded-2xl px-6 py-3 shadow-xl border border-border/50 animate-scale-in delay-500">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                <span className="font-bold text-sm">مزامنة مباشرة</span>
              </div>
            </div>

            {/* Decorative Blur */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full animate-float delay-300 blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}