import { useState } from "react";
import { SEO } from "@/components/SEO";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Download,
  DollarSign,
  Calendar,
  CreditCard
} from "lucide-react";

export default function AdminPaymentsPage() {
  const [filter, setFilter] = useState("all");

  const payments = [
    {
      id: "PAY-2026-001",
      date: "2026-05-08 14:23:15",
      company: "داريوم الرياض",
      plan: "Enterprise",
      amount: "﷼ 2,999",
      method: "Visa",
      cardLast4: "4532",
      status: "completed",
      invoice: "INV-2026-001"
    },
    {
      id: "PAY-2026-002",
      date: "2026-05-07 11:15:42",
      company: "مجموعة النخيل",
      plan: "Professional",
      amount: "﷼ 1,499",
      method: "Mastercard",
      cardLast4: "8765",
      status: "completed",
      invoice: "INV-2026-002"
    },
    {
      id: "PAY-2026-003",
      date: "2026-05-06 09:45:23",
      company: "عقارات الواحة",
      plan: "Starter",
      amount: "﷼ 499",
      method: "mada",
      cardLast4: "2341",
      status: "pending",
      invoice: "INV-2026-003"
    },
    {
      id: "PAY-2026-004",
      date: "2026-05-05 16:30:11",
      company: "فلل الدوسري",
      plan: "Professional",
      amount: "﷼ 1,499",
      method: "Bank Transfer",
      cardLast4: "N/A",
      status: "failed",
      invoice: "INV-2026-004"
    },
    {
      id: "PAY-2026-005",
      date: "2026-05-04 13:20:55",
      company: "أبراج النور",
      plan: "Enterprise",
      amount: "﷼ 2,999",
      method: "Visa",
      cardLast4: "1234",
      status: "completed",
      invoice: "INV-2026-005"
    },
  ];

  const stats = [
    { label: "إجمالي المدفوعات", value: "﷼ 1.24M", color: "from-primary to-secondary" },
    { label: "مدفوعات اليوم", value: "﷼ 18.5K", color: "from-emerald-500 to-green-500" },
    { label: "معاملات معلقة", value: "﷼ 4.2K", color: "from-amber-500 to-orange-500" },
    { label: "معاملات فاشلة", value: "﷼ 2.1K", color: "from-destructive to-red-600" },
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "completed": return <Badge className="bg-available">مكتمل</Badge>;
      case "pending": return <Badge className="bg-amber-500">معلق</Badge>;
      case "failed": return <Badge variant="destructive">فشل</Badge>;
      case "refunded": return <Badge variant="outline">مسترد</Badge>;
      default: return <Badge variant="outline">غير معروف</Badge>;
    }
  };

  const getMethodBadge = (method: string) => {
    const colors: { [key: string]: string } = {
      "Visa": "bg-blue-600",
      "Mastercard": "bg-orange-600",
      "mada": "bg-emerald-600",
      "Bank Transfer": "bg-slate-600",
    };
    return <Badge className={colors[method] || "bg-gray-500"}>{method}</Badge>;
  };

  return (
    <>
      <SEO title="إدارة المدفوعات - Admin" />
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-foreground">إدارة المدفوعات</h1>
              <p className="text-muted-foreground">عرض جميع المعاملات المالية</p>
            </div>
            <Button variant="outline">
              <Download className="w-5 h-5 ml-2" />
              تصدير
            </Button>
          </div>

          {/* KPIs */}
          <div className="grid md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="glass rounded-xl p-6">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} p-3 mb-3`}>
                  <DollarSign className="w-full h-full text-white" />
                </div>
                <div className="text-2xl font-bold text-foreground tabular-nums mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="glass rounded-xl p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  placeholder="البحث في المدفوعات..."
                  className="pr-10"
                />
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="w-4 h-4 ml-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل المدفوعات</SelectItem>
                  <SelectItem value="completed">مكتمل</SelectItem>
                  <SelectItem value="pending">معلق</SelectItem>
                  <SelectItem value="failed">فشل</SelectItem>
                  <SelectItem value="refunded">مسترد</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Calendar className="w-5 h-5 ml-2" />
                اختر الفترة
              </Button>
            </div>
          </div>

          {/* Payments Table */}
          <div className="glass rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr className="text-right">
                    <th className="p-4 font-bold text-foreground">رقم المعاملة</th>
                    <th className="p-4 font-bold text-foreground">التاريخ</th>
                    <th className="p-4 font-bold text-foreground">الشركة</th>
                    <th className="p-4 font-bold text-foreground">الخطة</th>
                    <th className="p-4 font-bold text-foreground">المبلغ</th>
                    <th className="p-4 font-bold text-foreground">طريقة الدفع</th>
                    <th className="p-4 font-bold text-foreground">الفاتورة</th>
                    <th className="p-4 font-bold text-foreground">الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id} className="border-t border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div className="font-mono text-sm text-primary">{payment.id}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-muted-foreground">{payment.date}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-semibold text-foreground">{payment.company}</div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline">{payment.plan}</Badge>
                      </td>
                      <td className="p-4 font-bold text-foreground tabular-nums">{payment.amount}</td>
                      <td className="p-4">
                        <div className="space-y-1">
                          {getMethodBadge(payment.method)}
                          {payment.cardLast4 !== "N/A" && (
                            <div className="text-xs text-muted-foreground">•••• {payment.cardLast4}</div>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <Button variant="link" className="text-primary p-0 h-auto">
                          {payment.invoice}
                        </Button>
                      </td>
                      <td className="p-4">{getStatusBadge(payment.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment Methods Distribution */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-xl font-bold text-foreground mb-6">توزيع طرق الدفع</h3>
            <div className="space-y-4">
              {[
                { method: "Visa", amount: "﷼ 542K", percent: 43.7, color: "bg-blue-600" },
                { method: "Mastercard", amount: "﷼ 386K", percent: 31.1, color: "bg-orange-600" },
                { method: "mada", amount: "﷼ 224K", percent: 18.1, color: "bg-emerald-600" },
                { method: "Bank Transfer", amount: "﷼ 88K", percent: 7.1, color: "bg-slate-600" },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">{item.method}</span>
                    <div className="text-left">
                      <div className="font-bold text-foreground tabular-nums">{item.amount}</div>
                      <div className="text-xs text-muted-foreground">{item.percent}%</div>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.color} transition-all`}
                      style={{ width: `${item.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}