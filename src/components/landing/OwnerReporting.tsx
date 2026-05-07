import { FileText, DollarSign, TrendingUp, Calendar } from "lucide-react";

export function OwnerReporting() {
  const features = [
    {
      icon: FileText,
      title: "بيانات مالية شفافة",
      titleEn: "Transparent Statements",
      desc: "تقارير تفصيلية شهرية أو ربع سنوية لكل مالك مع تفاصيل كل معاملة وحجز.",
    },
    {
      icon: DollarSign,
      title: "دورات صرف منتظمة",
      titleEn: "Regular Payouts",
      desc: "جدولة تلقائية للمدفوعات مع تتبع دقيق للأرصدة والمستحقات.",
    },
    {
      icon: TrendingUp,
      title: "تحليل أداء الوحدات",
      titleEn: "Unit Performance",
      desc: "مقارنة الإيرادات والإشغال لكل وحدة مع متوسط المحفظة والسوق.",
    },
    {
      icon: Calendar,
      title: "تقارير ضريبة القيمة المضافة",
      titleEn: "VAT Reports",
      desc: "بيانات ضريبية جاهزة متوافقة مع متطلبات هيئة الزكاة والضريبة.",
    },
  ];
  
  return (
    <section className="py-24 bg-gradient-to-br from-background via-white to-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Copy */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent-foreground font-semibold">
              <FileText className="w-4 h-4" />
              تقارير الملاك
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-display text-secondary">
              شفافية كاملة مع ملاك العقارات
            </h2>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              امنح الملاك رؤية واضحة عن أداء وحداتهم. تقارير احترافية تبني الثقة وتوفر ساعات من الإعداد اليدوي.
            </p>
            
            <div className="space-y-4">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-4 p-5 bg-white rounded-xl border border-border hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-secondary mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2 font-semibold">{feature.titleEn}</p>
                    <p className="text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right - Statement Preview */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl border border-border p-6 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              {/* Statement Header */}
              <div className="border-b border-border pb-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-display text-secondary">بيان مالك</h3>
                  <span className="text-sm text-muted-foreground">يونيو 2026</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <div>المالك: أحمد السالم</div>
                  <div className="mt-1">الوحدات: 3 وحدات</div>
                </div>
              </div>
              
              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4">
                  <div className="text-sm text-muted-foreground mb-1">إجمالي الإيرادات</div>
                  <div className="text-2xl font-display font-bold text-primary tabular-nums">126,840 ر.س</div>
                  <div className="text-xs text-muted-foreground mt-1">+14.2% عن الشهر الماضي</div>
                </div>
                
                <div className="bg-gradient-to-br from-occupied/10 to-occupied/5 rounded-xl p-4">
                  <div className="text-sm text-muted-foreground mb-1">صافي المستحق</div>
                  <div className="text-2xl font-display font-bold text-occupied tabular-nums">98,490 ر.س</div>
                  <div className="text-xs text-muted-foreground mt-1">بعد العمولة والرسوم</div>
                </div>
              </div>
              
              {/* Transactions Table */}
              <div className="space-y-2">
                <div className="text-sm font-semibold text-secondary mb-3">تفاصيل الحجوزات</div>
                {[
                  { unit: "A-101", nights: "12 ليلة", revenue: "18,240 ر.س", channel: "Airbnb" },
                  { unit: "B-203", nights: "8 ليالي", revenue: "12,160 ر.س", channel: "Booking.com" },
                  { unit: "C-305", nights: "15 ليلة", revenue: "22,800 ر.س", channel: "مباشر" },
                ].map((booking, i) => (
                  <div key={i} className="flex items-center justify-between py-3 px-4 bg-muted/30 rounded-lg text-sm">
                    <div>
                      <div className="font-semibold text-secondary">{booking.unit}</div>
                      <div className="text-muted-foreground text-xs">{booking.nights}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-secondary tabular-nums">{booking.revenue}</div>
                      <div className="text-muted-foreground text-xs">{booking.channel}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-border text-center text-sm text-muted-foreground">
                تقرير تفصيلي كامل متاح للتحميل
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground px-6 py-3 rounded-xl shadow-lg font-semibold transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="text-sm">جاهز للتصدير</div>
              <div className="text-xs opacity-80">PDF · Excel</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}