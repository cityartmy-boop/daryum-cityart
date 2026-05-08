import { useState } from "react";
import { SEO } from "@/components/SEO";
import { AppShell } from "@/components/dashboard/AppShell";
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
  User,
  Building2,
  DollarSign,
  TrendingUp,
  Download,
  Search,
  Eye,
  FileText,
  Calendar
} from "lucide-react";

export default function OwnersPage() {
  const [filter, setFilter] = useState("all");

  const stats = [
    { label: "إجمالي الملاك", value: "12", color: "from-primary to-secondary" },
    { label: "إجمالي العقارات", value: "24", color: "from-blue-500 to-cyan-500" },
    { label: "الإيرادات الشهرية", value: "﷼ 1.86M", color: "from-emerald-500 to-green-500" },
    { label: "المستحقات المعلقة", value: "﷼ 126K", color: "from-amber-500 to-orange-500" },
  ];

  const owners = [
    {
      id: 1,
      name: "أحمد المالكي",
      email: "ahmed.malki@email.com",
      phone: "+966 50 123 4567",
      properties: 3,
      units: 12,
      revenue: "﷼ 286,500",
      due: "﷼ 0",
      lastPayout: "2026-05-01",
      status: "active"
    },
    {
      id: 2,
      name: "فاطمة العتيبي",
      email: "fatimah.otaibi@email.com",
      phone: "+966 55 234 5678",
      properties: 2,
      units: 8,
      revenue: "﷼ 192,800",
      due: "﷼ 38,560",
      lastPayout: "2026-04-28",
      status: "active"
    },
    {
      id: 3,
      name: "خالد السعيد",
      email: "khaled.saeed@email.com",
      phone: "+966 50 345 6789",
      properties: 4,
      units: 18,
      revenue: "﷼ 458,200",
      due: "﷼ 87,340",
      lastPayout: "2026-04-25",
      status: "pending"
    },
    {
      id: 4,
      name: "نورة الدوسري",
      email: "noura.dosari@email.com",
      phone: "+966 55 456 7890",
      properties: 1,
      units: 4,
      revenue: "﷼ 98,400",
      due: "﷼ 0",
      lastPayout: "2026-05-05",
      status: "active"
    },
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "active": return <Badge className="bg-available">نشط</Badge>;
      case "pending": return <Badge className="bg-amber-500">معلق</Badge>;
      case "inactive": return <Badge variant="outline">غير نشط</Badge>;
      default: return <Badge variant="outline">غير معروف</Badge>;
    }
  };

  return (
    <>
      <SEO title="الملاك - داريوم" />
      <AppShell>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-foreground">الملاك</h1>
              <p className="text-muted-foreground">إدارة ملاك العقارات والكشوفات</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <FileText className="w-5 h-5 ml-2" />
                تقارير الملاك
              </Button>
              <Button className="gradient-primary">
                <Download className="w-5 h-5 ml-2" />
                تصدير الكشوفات
              </Button>
            </div>
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
                  placeholder="البحث في الملاك..."
                  className="pr-10"
                />
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل الملاك</SelectItem>
                  <SelectItem value="active">نشط</SelectItem>
                  <SelectItem value="pending">معلق</SelectItem>
                  <SelectItem value="inactive">غير نشط</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Owners Table */}
          <div className="glass rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr className="text-right">
                    <th className="p-4 font-bold text-foreground">المالك</th>
                    <th className="p-4 font-bold text-foreground">معلومات الاتصال</th>
                    <th className="p-4 font-bold text-foreground">العقارات</th>
                    <th className="p-4 font-bold text-foreground">الوحدات</th>
                    <th className="p-4 font-bold text-foreground">الإيراد الشهري</th>
                    <th className="p-4 font-bold text-foreground">المستحق</th>
                    <th className="p-4 font-bold text-foreground">آخر دفعة</th>
                    <th className="p-4 font-bold text-foreground">الحالة</th>
                    <th className="p-4 font-bold text-foreground">إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {owners.map((owner) => (
                    <tr key={owner.id} className="border-t border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            {owner.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-foreground">{owner.name}</div>
                            <div className="text-xs text-muted-foreground">#{owner.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-foreground">{owner.email}</div>
                        <div className="text-xs text-muted-foreground">{owner.phone}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-primary" />
                          <span className="font-semibold text-foreground">{owner.properties}</span>
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-foreground">{owner.units}</td>
                      <td className="p-4 font-bold text-primary tabular-nums">{owner.revenue}</td>
                      <td className="p-4">
                        {owner.due === "﷼ 0" ? (
                          <Badge className="bg-available">مسدد</Badge>
                        ) : (
                          <span className="font-bold text-amber-500 tabular-nums">{owner.due}</span>
                        )}
                      </td>
                      <td className="p-4 text-muted-foreground">{owner.lastPayout}</td>
                      <td className="p-4">{getStatusBadge(owner.status)}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4 ml-2" />
                            عرض
                          </Button>
                          <Button variant="ghost" size="sm">
                            <FileText className="w-4 h-4 ml-2" />
                            كشف
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Payouts */}
          <div className="glass rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-foreground">آخر الدفعات</h3>
              <Button variant="outline" size="sm">
                عرض الكل
              </Button>
            </div>
            <div className="space-y-4">
              {[
                { owner: "أحمد المالكي", amount: "﷼ 57,300", date: "2026-05-01", status: "completed" },
                { owner: "نورة الدوسري", amount: "﷼ 19,680", date: "2026-05-05", status: "completed" },
                { owner: "فاطمة العتيبي", amount: "﷼ 38,560", date: "2026-04-28", status: "pending" },
              ].map((payout, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{payout.owner}</div>
                      <div className="text-sm text-muted-foreground">{payout.date}</div>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-foreground tabular-nums">{payout.amount}</div>
                    {payout.status === "completed" ? (
                      <Badge className="bg-available mt-1">مكتمل</Badge>
                    ) : (
                      <Badge className="bg-amber-500 mt-1">معلق</Badge>
                    )}
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