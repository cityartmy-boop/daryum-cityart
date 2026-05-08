import { SEO } from "@/components/SEO";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  Download,
  TrendingUp,
  Users,
  DollarSign,
  Building2
} from "lucide-react";

export default function AdminAnalyticsPage() {
  const kpis = [
    { label: "إجمالي الإيرادات", value: "﷼ 8.4M", change: "+18.2%", trend: "up", color: "from-primary to-secondary" },
    { label: "إجمالي المستخدمين", value: "248", change: "+12.5%", trend: "up", color: "from-blue-500 to-cyan-500" },
    { label: "إجمالي العقارات", value: "186", change: "+8.4%", trend: "up", color: "from-emerald-500 to-green-500" },
    { label: "معدل النمو الشهري", value: "14.3%", change: "+2.1%", trend: "up", color: "from-amber-500 to-orange-500" },
  ];

  return (
    <>
      <SEO title="الإحصائيات - Admin" />
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-foreground">الإحصائيات والتحليلات</h1>
              <p className="text-muted-foreground">تحليلات شاملة للمنصة</p>
            </div>
            <Button variant="outline">
              <Download className="w-5 h-5 ml-2" />
              تصدير التقرير
            </Button>
          </div>

          {/* KPIs */}
          <div className="grid md:grid-cols-4 gap-4">
            {kpis.map((kpi, index) => (
              <div key={index} className="glass rounded-xl p-6">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${kpi.color} p-3 mb-3`}>
                  {index === 0 && <DollarSign className="w-full h-full text-white" />}
                  {index === 1 && <Users className="w-full h-full text-white" />}
                  {index === 2 && <Building2 className="w-full h-full text-white" />}
                  {index === 3 && <TrendingUp className="w-full h-full text-white" />}
                </div>
                <div className="text-2xl font-bold text-foreground tabular-nums mb-1">{kpi.value}</div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{kpi.label}</span>
                  <span className="text-sm font-semibold text-available flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    {kpi.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Placeholder */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="glass rounded-xl p-6 h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p>رسم بياني: نمو الإيرادات</p>
              </div>
            </div>
            <div className="glass rounded-xl p-6 h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Users className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p>رسم بياني: نمو المستخدمين</p>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}