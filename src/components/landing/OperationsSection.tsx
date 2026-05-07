import { ClipboardCheck, Wrench, Clock, CheckCircle2, AlertTriangle, Calendar } from "lucide-react";

export function OperationsSection() {
  const housekeepingFeatures = [
    { icon: Calendar, title: "جدولة تلقائية", desc: "مهام تنظيف تُنشأ تلقائياً عند المغادرة" },
    { icon: ClipboardCheck, title: "قوائم فحص", desc: "قوائم فحص مخصصة لكل نوع عقار" },
    { icon: Clock, title: "تتبع الوقت", desc: "مراقبة زمن إنجاز كل مهمة" },
    { icon: CheckCircle2, title: "تأكيد بالصور", desc: "صور قبل وبعد لضمان الجودة" },
  ];

  const maintenanceFeatures = [
    { icon: AlertTriangle, title: "تذاكر ذكية", desc: "إنشاء تذاكر صيانة من أي مكان" },
    { icon: Users, title: "توزيع المهام", desc: "تعيين الفنيين المناسبين تلقائياً" },
    { icon: Clock, title: "SLA Tracking", desc: "مراقبة زمن الاستجابة والإصلاح" },
    { icon: DollarSign, title: "تتبع التكاليف", desc: "تسجيل تكاليف المواد والعمالة" },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-bold text-sm tracking-wider">العمليات التشغيلية</span>
          <h2 className="text-5xl font-black mt-4 mb-6">
            تحكم كامل في
            <br />
            <span className="text-gradient">العمليات التشغيلية</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            أدِر التنظيف والصيانة باحترافية مع أتمتة ذكية ومتابعة دقيقة
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Housekeeping Section */}
          <div className="glass rounded-3xl p-10 hover:shadow-2xl transition-all">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
                <ClipboardCheck className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-black">إدارة التنظيف</h3>
                <p className="text-muted-foreground">نظام متكامل لعمليات التنظيف</p>
              </div>
            </div>

            <div className="space-y-4">
              {housekeepingFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-2xl hover:bg-muted/30 transition-colors group"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mock Dashboard Preview */}
            <div className="mt-8 p-6 bg-muted/30 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold">مهام اليوم</span>
                <span className="text-xs text-primary font-bold">12 مهمة</span>
              </div>
              <div className="space-y-2">
                {['جناح 301 - تنظيف كامل', 'استديو 205 - تنظيف سريع', 'شقة 102 - تنظيف عميق'].map((task, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm flex-1">{task}</span>
                    <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Maintenance Section */}
          <div className="glass rounded-3xl p-10 hover:shadow-2xl transition-all">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 gradient-accent rounded-2xl flex items-center justify-center shadow-lg">
                <Wrench className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-black">إدارة الصيانة</h3>
                <p className="text-muted-foreground">تتبع وحل المشاكل بكفاءة</p>
              </div>
            </div>

            <div className="space-y-4">
              {maintenanceFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-2xl hover:bg-muted/30 transition-colors group"
                >
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mock Tickets Preview */}
            <div className="mt-8 p-6 bg-muted/30 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold">تذاكر مفتوحة</span>
                <span className="text-xs text-destructive font-bold">7 تذاكر</span>
              </div>
              <div className="space-y-2">
                {[
                  { title: 'تسريب مياه - جناح 402', priority: 'عالية', color: 'bg-destructive' },
                  { title: 'مكيف لا يعمل - شقة 208', priority: 'متوسطة', color: 'bg-maintenance' },
                  { title: 'إضاءة معطلة - ردهة الطابق 3', priority: 'منخفضة', color: 'bg-muted-foreground' },
                ].map((ticket, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl">
                    <div className={`w-2 h-2 rounded-full ${ticket.color}`}></div>
                    <span className="text-sm flex-1">{ticket.title}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${ticket.color} text-white`}>{ticket.priority}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="glass rounded-2xl p-6 text-center">
            <div className="text-4xl font-black text-gradient mb-2">94%</div>
            <div className="text-sm text-muted-foreground">معدل إتمام التنظيف في الوقت</div>
          </div>
          <div className="glass rounded-2xl p-6 text-center">
            <div className="text-4xl font-black text-gradient mb-2">11.6 ساعة</div>
            <div className="text-sm text-muted-foreground">متوسط وقت حل الصيانة</div>
          </div>
          <div className="glass rounded-2xl p-6 text-center">
            <div className="text-4xl font-black text-gradient mb-2">8 دقائق</div>
            <div className="text-sm text-muted-foreground">متوسط وقت الاستجابة</div>
          </div>
        </div>
      </div>
    </section>
  );
}