import { useState } from "react";
import { SEO } from "@/components/SEO";
import { AppShell } from "@/components/dashboard/AppShell";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Download,
  FileText,
  BarChart3,
  Calendar,
  Building2,
  TrendingUp
} from "lucide-react";

export default function ReportsPage() {
  const [reportType, setReportType] = useState("revenue");
  const [period, setPeriod] = useState("month");

  const reports = [
    {
      id: 1,
      name: "تقرير الإيرادات الشامل",
      description: "تحليل كامل للإيرادات حسب العقارات والقنوات",
      icon: BarChart3,
      color: "from-primary to-secondary",
      stats: { revenue: "﷼ 2.48M", growth: "+12.5%" }
    },
    {
      id: 2,
      name: "تقرير الإشغال",
      description: "معدلات الإشغال والتوافر لكل عقار",
      icon: Building2,
      color: "from-blue-500 to-cyan-500",
      stats: { occupancy: "78.4%", growth: "+3.2%" }
    },
    {
      id: 3,
      name: "أداء القنوات",
      description: "مقارنة أداء منصات الحجز المختلفة",
      icon: TrendingUp,
      color: "from-emerald-500 to-green-500",
      stats: { bookings: "120", growth: "+18.7%" }
    },
    {
      id: 4,
      name: "التقرير المالي",
      description: "الإيرادات والمصروفات وحسابات الملاك",
      icon: FileText,
      color: "from-amber-500 to-orange-500",
      stats: { profit: "﷼ 244K", growth: "+8.7%" }
    },
  ];

  const quickStats = [
    { label: "إجمالي الإيرادات", value: "﷼ 2,480,000", period: "هذا الشهر" },
    { label: "معدل الإشغال", value: "78.4%", period: "المتوسط" },
    { label: "عدد الحجوزات", value: "120", period: "هذا الشهر" },
    { label: "متوسط السعر", value: "﷼ 612", period: "ADR" },
  ];

  return (
    <>
      <SEO title="التقارير - داريوم" />
      <AppShell>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-foreground">التقارير</h1>
              <p className="text-muted-foreground">تحليلات وتقارير مفصلة</p>
            </div>
            <Button className="gradient-primary">
              <Download className="w-5 h-5 ml-2" />
              تصدير الكل
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-4">
            {quickStats.map((stat, index) => (
              <div key={index} className="glass rounded-xl p-6">
                <div className="text-sm text-muted-foreground mb-2">{stat.label}</div>
                <div className="text-2xl font-bold text-foreground tabular-nums mb-1">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.period}</div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="glass rounded-xl p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-full md:w-64">
                  <FileText className="w-4 h-4 ml-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenue">تقرير الإيرادات</SelectItem>
                  <SelectItem value="occupancy">تقرير الإشغال</SelectItem>
                  <SelectItem value="channels">أداء القنوات</SelectItem>
                  <SelectItem value="financial">التقرير المالي</SelectItem>
                  <SelectItem value="owners">تقرير الملاك</SelectItem>
                </SelectContent>
              </Select>

              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-full md:w-48">
                  <Calendar className="w-4 h-4 ml-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">اليوم</SelectItem>
                  <SelectItem value="week">هذا الأسبوع</SelectItem>
                  <SelectItem value="month">هذا الشهر</SelectItem>
                  <SelectItem value="quarter">هذا الربع</SelectItem>
                  <SelectItem value="year">هذا العام</SelectItem>
                  <SelectItem value="custom">فترة مخصصة</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="flex-1 md:flex-initial">
                <Building2 className="w-4 h-4 ml-2" />
                كل العقارات
              </Button>
            </div>
          </div>

          {/* Reports Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {reports.map((report) => (
              <div
                key={report.id}
                className="glass rounded-xl p-6 border border-border/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${report.color} p-3`}>
                      <report.icon className="w-full h-full text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-1">{report.name}</h3>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 pt-4 border-t border-border/50">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">القيمة</div>
                    <div className="text-xl font-bold text-foreground tabular-nums">
                      {Object.values(report.stats)[0]}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">النمو</div>
                    <div className="text-xl font-bold text-available">
                      {Object.values(report.stats)[1]}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    عرض التفاصيل
                  </Button>
                  <Button size="sm" className="flex-1 gradient-primary">
                    <Download className="w-4 h-4 ml-2" />
                    تصدير
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Revenue Breakdown */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-xl font-bold text-foreground mb-6">تفصيل الإيرادات حسب العقار</h3>
            <div className="space-y-4">
              {[
                { property: "برج الفيصلية", revenue: "﷼ 456,000", share: 18.4, color: "bg-primary" },
                { property: "أجنحة النخيل", revenue: "﷼ 392,300", share: 15.8, color: "bg-blue-500" },
                { property: "فلل الواحة", revenue: "﷼ 358,200", share: 14.4, color: "bg-emerald-500" },
                { property: "مجمع الياسمين", revenue: "﷼ 312,800", share: 12.6, color: "bg-amber-500" },
                { property: "أبراج المرجان", revenue: "﷼ 289,100", share: 11.7, color: "bg-purple-500" },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">{item.property}</span>
                    <div className="text-left">
                      <div className="font-bold text-foreground tabular-nums">{item.revenue}</div>
                      <div className="text-xs text-muted-foreground">{item.share}%</div>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.color} transition-all`}
                      style={{ width: `${item.share * 5}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AppShell>
    </>
  );
}