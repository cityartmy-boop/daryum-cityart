import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Play } from "lucide-react";

export function Hero() {
  const menuItems = [
    { label: "الرئيسية", href: "#home" },
    { label: "عن داريوم", href: "#about" },
    { label: "المميزات", href: "#features" },
    { label: "الحلول", href: "#solutions" },
    { label: "الباقات", href: "#pricing" },
    { label: "اتصل بنا", href: "#contact" },
  ];

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-white to-primary/5">
      {/* Navigation Menu */}
      <nav className="absolute top-0 left-0 right-0 z-50 glass">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image 
                src="/daryum-logo.png" 
                alt="داريوم" 
                width={160}
                height={50}
                className="h-12 w-auto"
                priority
              />
            </Link>

            {/* Menu Items */}
            <div className="hidden md:flex items-center gap-8">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              ))}
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
                  ابدأ الآن مجاناً
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float delay-500"></div>
      
      <div className="container mx-auto px-6 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Right Side - Content */}
          <div className="text-right space-y-8 animate-slide-in-right">
            <div className="inline-block">
              <span className="px-6 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm border border-primary/20">
                ✨ منصة سعودية رائدة في إدارة العقارات
              </span>
            </div>

            <h1 className="text-6xl lg:text-7xl font-black leading-tight">
              المنصة الشاملة
              <br />
              <span className="text-gradient">لإدارة عقاراتك</span>
              <br />
              المؤجرة
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              أدِر جميع عقاراتك من لوحة واحدة ذكية. مزامنة فورية للحجوزات، الأسعار، الرسائل، والعمليات التشغيلية مع تقارير مالية دقيقة وتحليلات ذكية.
            </p>

            <div className="flex items-center gap-4 flex-wrap">
              <Link href="/register">
                <Button size="lg" className="gradient-primary text-white h-14 px-8 text-lg font-bold shadow-xl hover:shadow-2xl glow-hover transition-all group">
                  ابدأ تجربتك المجانية
                  <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-semibold gap-3 hover:bg-muted/50">
                <Play className="w-5 h-5" />
                شاهد العرض التوضيحي
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-8">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                <span className="font-semibold">بدون بطاقة ائتمان</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                <span className="font-semibold">إلغاء في أي وقت</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                <span className="font-semibold">دعم فني 24/7</span>
              </div>
            </div>
          </div>

          {/* Left Side - Hero Image with Effects */}
          <div className="relative animate-fade-in delay-300">
            <div className="relative z-10">
              {/* Main Dashboard Preview */}
              <div className="glass rounded-3xl p-8 shadow-2xl glow">
                <div className="space-y-6">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass-dark rounded-2xl p-6">
                      <div className="text-sm text-muted-foreground mb-2">إجمالي الإيرادات</div>
                      <div className="text-3xl font-black text-gradient">2.48M ﷼</div>
                      <div className="text-xs text-primary mt-2">↑ 24.5% هذا الشهر</div>
                    </div>
                    <div className="glass-dark rounded-2xl p-6">
                      <div className="text-sm text-muted-foreground mb-2">معدل الإشغال</div>
                      <div className="text-3xl font-black text-gradient">84.2%</div>
                      <div className="text-xs text-primary mt-2">↑ 12.3% عن الشهر الماضي</div>
                    </div>
                  </div>

                  {/* Mini Chart */}
                  <div className="glass-dark rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm font-semibold">أداء الإيرادات</div>
                      <div className="text-xs text-muted-foreground">آخر 6 أشهر</div>
                    </div>
                    <div className="flex items-end gap-2 h-24">
                      <div className="flex-1 bg-primary/30 rounded-t-lg" style={{height: '60%'}}></div>
                      <div className="flex-1 bg-primary/40 rounded-t-lg" style={{height: '70%'}}></div>
                      <div className="flex-1 bg-primary/50 rounded-t-lg" style={{height: '80%'}}></div>
                      <div className="flex-1 bg-primary/60 rounded-t-lg" style={{height: '75%'}}></div>
                      <div className="flex-1 bg-primary/70 rounded-t-lg" style={{height: '90%'}}></div>
                      <div className="flex-1 gradient-primary rounded-t-lg" style={{height: '100%'}}></div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-3 gap-3">
                    <button className="glass-dark rounded-xl p-4 hover:bg-primary/10 transition-colors text-center">
                      <div className="text-2xl mb-2">🏠</div>
                      <div className="text-xs font-semibold">العقارات</div>
                    </button>
                    <button className="glass-dark rounded-xl p-4 hover:bg-primary/10 transition-colors text-center">
                      <div className="text-2xl mb-2">📅</div>
                      <div className="text-xs font-semibold">الحجوزات</div>
                    </button>
                    <button className="glass-dark rounded-xl p-4 hover:bg-primary/10 transition-colors text-center">
                      <div className="text-2xl mb-2">💬</div>
                      <div className="text-xs font-semibold">الرسائل</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 gradient-accent rounded-3xl opacity-20 animate-float blur-xl"></div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 gradient-primary rounded-3xl opacity-20 animate-float delay-300 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}