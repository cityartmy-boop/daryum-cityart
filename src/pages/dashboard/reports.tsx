import { SEO } from "@/components/SEO";
import { AppShell } from "@/components/dashboard/AppShell";
import { Button } from "@/components/ui/button";
import { 
  FileText,
  Download,
  TrendingUp,
  Calendar,
  Building2,
  DollarSign
} from "lucide-react";

export default function ReportsPage() {
  const reports = [
    {
      title: "تقرير الإيرادات الشهري",
      description: "ملخص شامل للإيرادات والمصروفات",
      icon: DollarSign,
      color: "from-primary to-secondary",
      lastGenerated: "2026-05-01"
    },
    {
      title: "تقرير الإشغال",
      description: "معدلات الإشغال لجميع الوحدات",
      icon: TrendingUp,
      color: "from-emerald-500 to-green-500",
      lastGenerated: "2026-05-01"
    },
    {
      title: "تقرير أداء القنوات",
      description: "مقارنة أداء منصات الحجز",
      icon: Building2,
      color: "from-blue-500 to-cyan-500",
      lastGenerated: "2026-05-01"
    },
    {
      title: "تقرير الملاك",
      description: "كشف حساب مفصل لكل مالك",
      icon: FileText,
      color: "from-amber-500 to-orange-500",
      lastGenerated: "2026-04-30"
    },
    {
      title: "تقرير الحجوزات",
      description: "تحليل اتجاهات الحجوزات",
      icon: Calendar,
      color: "from-purple-500 to-pink-500",
      lastGenerated: "2026-05-01"
    },
  ];

  return (
    <>
      <SEO title="التقارير - داريوم" />
      <AppShell>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">التقارير</h1>
              <p className="text-muted-foreground">
                تقارير تحليلية شاملة لأداء محفظتك العقارية
              </p>
            </div>
          </div>

          {/* Reports Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report, index) => (
              <div
                key={index}
                className="glass rounded-xl p-6 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 border border-border/50 hover:border-primary/30"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${report.color} p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <report.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {report.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {report.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="text-xs text-muted-foreground">
                    آخر إنشاء: {report.lastGenerated}
                  </div>
                  <Button size="sm" variant="outline" className="gap-2">
                    <Download className="w-3 h-3" />
                    تحميل
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Custom Report Section */}
          <div className="glass rounded-xl p-8 border border-border/50">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl gradient-accent p-4 flex-shrink-0">
                <FileText className="w-full h-full text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">تقرير مخصص</h3>
                <p className="text-muted-foreground mb-4">
                  احصل على تقرير مخصص يناسب احتياجاتك بالضبط. اختر المعايير والبيانات التي تحتاجها.
                </p>
                <Button className="gradient-primary gap-2">
                  <FileText className="w-4 h-4" />
                  إنشاء تقرير مخصص
                </Button>
              </div>
            </div>
          </div>
        </div>
      </AppShell>
    </>
  );
}