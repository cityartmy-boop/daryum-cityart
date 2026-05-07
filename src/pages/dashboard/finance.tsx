import { SEO } from "@/components/SEO";
import { AppShell } from "@/components/dashboard/AppShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign,
  TrendingUp,
  CreditCard,
  Download,
  Calendar
} from "lucide-react";

export default function FinancePage() {
  const transactions = [
    {
      id: "TXN-8421",
      date: "2026-05-07",
      description: "حجز - أحمد السعيد",
      unit: "جناح 101",
      type: "revenue",
      amount: "SAR 2,250",
      status: "completed"
    },
    {
      id: "TXN-8422",
      date: "2026-05-06",
      description: "عمولة Airbnb",
      unit: "جناح 101",
      type: "fee",
      amount: "SAR -225",
      status: "completed"
    },
    {
      id: "TXN-8423",
      date: "2026-05-06",
      description: "مدفوعات المالك - فيصل الدوسري",
      unit: "فيلا A1",
      type: "payout",
      amount: "SAR -18,400",
      status: "pending"
    },
    {
      id: "TXN-8424",
      date: "2026-05-05",
      description: "حجز - سارة الفهد",
      unit: "فيلا A1",
      type: "revenue",
      amount: "SAR 4,250",
      status: "completed"
    },
  ];

  return (
    <>
      <SEO title="المالية - داريوم" />
      <AppShell>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">المالية</h1>
              <p className="text-muted-foreground">
                إدارة الإيرادات والمصروفات والمدفوعات
              </p>
            </div>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              تصدير التقرير
            </Button>
          </div>

          {/* Financial KPIs */}
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { 
                label: "الإيراد الشهري", 
                value: "SAR 428,500", 
                change: "+12.4%",
                icon: DollarSign, 
                color: "from-primary to-secondary" 
              },
              { 
                label: "العمولات والرسوم", 
                value: "SAR 42,850", 
                change: "+8.2%",
                icon: CreditCard, 
                color: "from-amber-500 to-orange-500" 
              },
              { 
                label: "صافي الإيراد", 
                value: "SAR 385,650", 
                change: "+14.1%",
                icon: TrendingUp, 
                color: "from-emerald-500 to-green-500" 
              },
              { 
                label: "مدفوعات الملاك", 
                value: "SAR 231,400", 
                change: "-",
                icon: Calendar, 
                color: "from-blue-500 to-cyan-500" 
              },
            ].map((kpi, index) => (
              <div key={index} className="glass rounded-xl p-6">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${kpi.color} p-3 mb-3`}>
                  <kpi.icon className="w-full h-full text-white" />
                </div>
                <div className="text-2xl font-bold tabular-nums mb-1">{kpi.value}</div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">{kpi.label}</div>
                  {kpi.change !== "-" && (
                    <div className="text-xs text-available font-semibold">{kpi.change}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Transactions Table */}
          <div className="glass rounded-xl border border-border/50 overflow-hidden">
            <div className="p-6 border-b border-border/50">
              <h2 className="text-xl font-bold">المعاملات الأخيرة</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/30 border-b border-border/50">
                  <tr>
                    <th className="text-right p-4 font-semibold text-sm">رقم المعاملة</th>
                    <th className="text-right p-4 font-semibold text-sm">التاريخ</th>
                    <th className="text-right p-4 font-semibold text-sm">الوصف</th>
                    <th className="text-right p-4 font-semibold text-sm">الوحدة</th>
                    <th className="text-right p-4 font-semibold text-sm">النوع</th>
                    <th className="text-right p-4 font-semibold text-sm">المبلغ</th>
                    <th className="text-right p-4 font-semibold text-sm">الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((txn) => (
                    <tr key={txn.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="p-4">
                        <div className="font-mono text-sm font-semibold">{txn.id}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">{txn.date}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium">{txn.description}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-muted-foreground">{txn.unit}</div>
                      </td>
                      <td className="p-4">
                        <Badge variant={
                          txn.type === "revenue" ? "default" : 
                          txn.type === "fee" ? "secondary" : 
                          "outline"
                        }>
                          {txn.type === "revenue" ? "إيراد" : txn.type === "fee" ? "عمولة" : "مدفوعات"}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className={`font-bold tabular-nums ${
                          txn.amount.includes("-") ? "text-destructive" : "text-available"
                        }`}>
                          {txn.amount}
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge className={txn.status === "completed" ? "bg-available" : "bg-accent text-secondary"}>
                          {txn.status === "completed" ? "مكتمل" : "معلق"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </AppShell>
    </>
  );
}