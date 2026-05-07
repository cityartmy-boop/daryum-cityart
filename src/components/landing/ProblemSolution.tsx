import { AlertCircle, CheckCircle2 } from "lucide-react";

export function ProblemSolution() {
  const problems = [
    "تشتت الحجوزات بين قنوات متعددة بدون مزامنة",
    "صعوبة متابعة التنظيف والصيانة لعشرات الوحدات",
    "تأخر التقارير المالية وبيانات الملاك",
    "ضياع وقت ثمين في الرد على رسائل الضيوف يدوياً",
    "عدم وضوح الأداء الحقيقي لكل عقار ووحدة",
  ];
  
  const solutions = [
    "مزامنة فورية مع جميع قنوات الحجز العالمية",
    "إدارة تشغيلية كاملة بمهام ذكية وتنبيهات آلية",
    "تقارير مالية دقيقة مع دعم ضريبة القيمة المضافة",
    "اقتراحات رد ذكية بالذكاء الاصطناعي",
    "تحليلات تنفيذية لكل وحدة وقناة وفترة زمنية",
  ];
  
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-display text-secondary mb-4">
            المشكلات التي نحلها
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            إدارة العقارات المؤجرة تتطلب تنسيقاً دقيقاً بين عشرات المهام اليومية. نحن نوحد كل شيء في منصة واحدة.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Problems */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 text-destructive font-semibold mb-4">
              <AlertCircle className="w-4 h-4" />
              التحديات المشتركة
            </div>
            {problems.map((problem, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-xl bg-muted/30 border border-border">
                <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-destructive text-sm font-bold">×</span>
                </div>
                <p className="text-secondary">{problem}</p>
              </div>
            ))}
          </div>
          
          {/* Solutions */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold mb-4">
              <CheckCircle2 className="w-4 h-4" />
              الحلول الذكية
            </div>
            {solutions.map((solution, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-xl bg-primary/5 border border-primary/20">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <p className="text-secondary font-medium">{solution}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}