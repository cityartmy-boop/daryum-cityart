import Image from "next/image";
import { Building2, Users, TrendingUp, Shield, Zap, BarChart3 } from "lucide-react";

export function AboutSection() {
  const features = [
    {
      icon: Building2,
      title: "إدارة شاملة",
      description: "تحكم كامل في عقاراتك ووحداتك من مكان واحد"
    },
    {
      icon: Users,
      title: "تجربة سلسة",
      description: "واجهة عربية بديهية مصممة للسوق السعودي"
    },
    {
      icon: TrendingUp,
      title: "نمو مستمر",
      description: "أدوات تحليلية لزيادة إيراداتك ومعدلات الإشغال"
    },
    {
      icon: Shield,
      title: "أمان عالي",
      description: "حماية متقدمة لبياناتك ومعلومات ضيوفك"
    },
    {
      icon: Zap,
      title: "أتمتة ذكية",
      description: "وفر وقتك بأتمتة المهام المتكررة"
    },
    {
      icon: BarChart3,
      title: "تقارير دقيقة",
      description: "تقارير مالية وتشغيلية مفصلة ودقيقة"
    },
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Right - Content */}
          <div className="text-right space-y-8 animate-fade-in-up">
            <div>
              <span className="text-primary font-bold text-sm tracking-wider">عن داريوم</span>
              <h2 className="text-5xl font-black mt-4 leading-tight">
                نظام متكامل لإدارة
                <br />
                <span className="text-gradient">العقارات المؤجرة</span>
              </h2>
            </div>

            <p className="text-xl text-muted-foreground leading-relaxed">
              داريوم هي منصة سعودية رائدة توفر حلاً شاملاً لأصحاب العقارات المؤجرة. نجمع كل احتياجاتك التشغيلية في مكان واحد: من الحجوزات إلى التنظيف، من المالية إلى تقارير الملاك.
            </p>

            <p className="text-lg text-muted-foreground">
              بُنيت بتقنيات حديثة وتصميم عربي أصيل لتوفر تجربة سلسة لمدراء العقارات في المملكة. نحن نفهم تحديات السوق السعودي ونقدم الحلول المناسبة.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="glass rounded-2xl p-6 hover:shadow-lg transition-all group cursor-pointer animate-scale-in"
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Left - Logo & Visual */}
          <div className="relative animate-fade-in delay-300">
            <div className="relative z-10">
              <div className="glass rounded-3xl p-16 shadow-2xl glow text-center">
                <Image 
                  src="/daryum-logo.png" 
                  alt="داريوم" 
                  width={400}
                  height={150}
                  className="w-full h-auto animate-float"
                />
                <p className="text-xl font-bold text-muted-foreground mt-8">
                  الشريك الأمثل لإدارة عقاراتك المؤجرة
                </p>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-8 -right-8 w-40 h-40 gradient-accent rounded-full opacity-20 animate-float blur-2xl"></div>
            <div className="absolute -bottom-8 -left-8 w-48 h-48 gradient-primary rounded-full opacity-20 animate-float delay-500 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}