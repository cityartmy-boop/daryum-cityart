import { ClipboardCheck, Wrench, Clock, CheckCircle2 } from "lucide-react";

export function OperationsSection() {
  const housekeeping = {
    title: "إدارة التنظيف الاحترافية",
    titleEn: "Housekeeping Management",
    features: [
      "تعيين تلقائي للمهام بناءً على المغادرة والوصول",
      "قوائم مراجعة تفصيلية لكل نوع وحدة",
      "تتبع حالة التنظيف في الوقت الفعلي",
      "صور إثبات قبل وبعد التنظيف",
      "تقارير أداء فرق التنظيف",
    ],
    metrics: [
      { label: "معدل الإنجاز", labelEn: "Completion Rate", value: "94%" },
      { label: "متوسط الوقت", labelEn: "Avg Time", value: "42 دقيقة" },
    ],
  };
  
  const maintenance = {
    title: "نظام صيانة متكامل",
    titleEn: "Maintenance System",
    features: [
      "تذاكر صيانة بمستويات أولوية ذكية",
      "تعيين الفنيين حسب نوع المشكلة",
      "تتبع SLA وأوقات الحل",
      "سجل كامل لصيانة كل وحدة",
      "تقديرات التكلفة والفواتير",
    ],
    metrics: [
      { label: "متوسط زمن الحل", labelEn: "Avg Resolution", value: "11.6 ساعة" },
      { label: "تذاكر نشطة", labelEn: "Active Tickets", value: "7" },
    ],
  };
  
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-display text-secondary mb-4">
            تحكم كامل في العمليات التشغيلية
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            أدر فرق التنظيف والصيانة بكفاءة عالية مع تتبع دقيق لكل مهمة
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Housekeeping */}
          <div className="bg-gradient-to-br from-cleaning/5 to-cleaning/10 rounded-2xl p-8 border border-cleaning/20">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-cleaning/20 flex items-center justify-center">
                <ClipboardCheck className="w-8 h-8 text-cleaning" />
              </div>
              <div>
                <h3 className="text-2xl font-display text-secondary">{housekeeping.title}</h3>
                <p className="text-sm text-muted-foreground font-semibold">{housekeeping.titleEn}</p>
              </div>
            </div>
            
            <ul className="space-y-3 mb-6">
              {housekeeping.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cleaning flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="grid grid-cols-2 gap-4">
              {housekeeping.metrics.map((metric, i) => (
                <div key={i} className="bg-white rounded-xl p-4 border border-cleaning/20">
                  <div className="text-sm text-muted-foreground mb-1">{metric.label}</div>
                  <div className="text-sm text-muted-foreground/60 mb-2">{metric.labelEn}</div>
                  <div className="text-2xl font-display font-bold text-cleaning tabular-nums">{metric.value}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Maintenance */}
          <div className="bg-gradient-to-br from-maintenance/5 to-maintenance/10 rounded-2xl p-8 border border-maintenance/20">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-maintenance/20 flex items-center justify-center">
                <Wrench className="w-8 h-8 text-maintenance" />
              </div>
              <div>
                <h3 className="text-2xl font-display text-secondary">{maintenance.title}</h3>
                <p className="text-sm text-muted-foreground font-semibold">{maintenance.titleEn}</p>
              </div>
            </div>
            
            <ul className="space-y-3 mb-6">
              {maintenance.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-maintenance flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="grid grid-cols-2 gap-4">
              {maintenance.metrics.map((metric, i) => (
                <div key={i} className="bg-white rounded-xl p-4 border border-maintenance/20">
                  <div className="text-sm text-muted-foreground mb-1">{metric.label}</div>
                  <div className="text-sm text-muted-foreground/60 mb-2">{metric.labelEn}</div>
                  <div className="text-2xl font-display font-bold text-maintenance tabular-nums">{metric.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-muted/50 border border-border">
            <Clock className="w-5 h-5 text-primary" />
            <span className="text-secondary">توفير ساعات من التنسيق اليدوي مع الأتمتة الذكية</span>
          </div>
        </div>
      </div>
    </section>
  );
}