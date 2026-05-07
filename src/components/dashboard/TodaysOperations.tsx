import { ClipboardCheck, Wrench, Calendar, Users } from "lucide-react";

export function TodaysOperations() {
  const operations = [
    {
      type: "cleaning",
      icon: ClipboardCheck,
      title: "مهام التنظيف",
      gradient: "from-[hsl(174,62%,47%)] to-[hsl(174,80%,60%)]",
      items: [
        { label: "مكتملة", value: 12, color: "text-primary" },
        { label: "قيد التنفيذ", value: 6, color: "text-blue-600" },
        { label: "معلقة", value: 18, color: "text-accent-foreground" },
      ]
    },
    {
      type: "maintenance",
      icon: Wrench,
      title: "الصيانة",
      gradient: "from-[hsl(38,92%,50%)] to-[hsl(38,100%,65%)]",
      items: [
        { label: "مغلقة", value: 4, color: "text-primary" },
        { label: "قيد الإصلاح", value: 3, color: "text-blue-600" },
        { label: "مفتوحة", value: 7, color: "text-accent-foreground" },
      ]
    },
    {
      type: "arrivals",
      icon: Calendar,
      title: "الوصول اليوم",
      gradient: "from-blue-500 to-blue-600",
      items: [
        { label: "وصلوا", value: 23, color: "text-primary" },
        { label: "متأخرون", value: 2, color: "text-accent-foreground" },
        { label: "قادمون", value: 21, color: "text-blue-600" },
      ]
    },
    {
      type: "departures",
      icon: Users,
      title: "المغادرة اليوم",
      gradient: "from-purple-500 to-purple-600",
      items: [
        { label: "غادروا", value: 18, color: "text-primary" },
        { label: "جاري التنظيف", value: 8, color: "text-blue-600" },
        { label: "باقون", value: 13, color: "text-muted-foreground" },
      ]
    },
  ];

  return (
    <div className="glass rounded-2xl p-6 animate-fade-in-up delay-600">
      <div className="mb-6">
        <h3 className="text-xl font-bold">عمليات اليوم</h3>
        <p className="text-sm text-muted-foreground mt-1">ملخص النشاطات التشغيلية</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {operations.map((op) => (
          <div key={op.type} className="glass-dark rounded-xl p-4 hover:scale-105 transition-transform">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${op.gradient} flex items-center justify-center text-white shadow-lg`}>
                <op.icon className="w-5 h-5" />
              </div>
              <h4 className="font-bold">{op.title}</h4>
            </div>
            
            <div className="space-y-2">
              {op.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className={`text-lg font-bold tabular-nums ${item.color}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}