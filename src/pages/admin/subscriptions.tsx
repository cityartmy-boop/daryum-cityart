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
  CreditCard,
  Calendar,
  DollarSign
} from "lucide-react";

export default function AdminSubscriptionsPage() {
  const [filter, setFilter] = useState("all");

  const subscriptions = [
    {
      id: "SUB-2026-001",
      company: "داريوم الرياض",
      admin: "أحمد السعيد",
      plan: "Enterprise",
      price: "﷼ 2,999",
      billingCycle: "شهري",
      properties: 24,
      users: 12,
      status: "active",
      startDate: "2026-01-15",
      renewalDate: "2026-06-15",
      revenue: "﷼ 14,995"
    },
    {
      id: "SUB-2026-002",
      company: "مجموعة النخيل",
      admin: "فاطمة المالكي",
      plan: "Professional",
      price: "﷼ 1,499",
      billingCycle: "شهري",
      properties: 16,
      users: 8,
      status: "active",
      startDate: "2026-02-20",
      renewalDate: "2026-07-20",
      revenue: "﷼ 4,497"
    },
    {
      id: "SUB-2026-003",
      company: "عقارات الواحة",
      admin: "خالد العتيبي",
      plan: "Starter",
      price: "﷼ 499",
      billingCycle: "شهري",
      properties: 8,
      users: 4,
      status: "trial",
      startDate: "2026-05-01",
      renewalDate: "2026-05-15",
      revenue: "﷼ 0"
    },
    {
      id: "SUB-2026-004",
      company: "فلل الدوسري",
      admin: "نورة الدوسري",
      plan: "Professional",
      price: "﷼ 1,499",
      billingCycle: "سنوي",
      properties: 4,
      users: 2,
      status: "expired",
      startDate: "2025-04-10",
      renewalDate: "2026-04-10",
      revenue: "﷼ 14,990"
    },
  ];

  const stats = [
    { label: "إجمالي الاشتراكات", value: "186", color: "from-primary to-secondary" },
    { label: "اشتراكات نشطة", value: "142", color: "from-emerald-500 to-green-500" },
    { label: "تجريبي", value: "18", color: "from-blue-500 to-cyan-500" },
    { label: "الإيراد الشهري", value: "﷼ 248K", color: "from-amber-500 to-orange-500" },
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "active": return <Badge className="bg-available">نشط</Badge>;
      case "trial": return <Badge className="bg-blue-500">تجريبي</Badge>;
      case "expired": return <Badge variant="destructive">منتهي</Badge>;
      case "cancelled": return <Badge variant="outline">ملغي</Badge>;
      default: return <Badge variant="outline">غير معروف</Badge>;
    }
  };

  const getPlanBadge = (plan: string) => {
    const colors: { [key: string]: string } = {
      "Enterprise": "bg-primary",
      "Professional": "bg-blue-500",
      "Starter": "bg-emerald-500",
    };
    return <Badge className={colors[plan] || "bg-gray-500"}>{plan}</Badge>;
  };

  return (
    <>
      <SEO title="إدارة الاشتراكات - Admin" />
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-foreground">إدارة الاشتراكات</h1>
              <p className="text-muted-foreground">عرض وإدارة جميع اشتراكات العملاء</p>
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
                  <CreditCard className="w-full h-full text-white" />
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
                  placeholder="البحث في الاشتراكات..."
                  className="pr-10"
                />
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="w-4 h-4 ml-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل الاشتراكات</SelectItem>
                  <SelectItem value="active">نشط</SelectItem>
                  <SelectItem value="trial">تجريبي</SelectItem>
                  <SelectItem value="expired">منتهي</SelectItem>
                  <SelectItem value="cancelled">ملغي</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Subscriptions Table */}
          <div className="glass rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr className="text-right">
                    <th className="p-4 font-bold text-foreground">رقم الاشتراك</th>
                    <th className="p-4 font-bold text-foreground">الشركة</th>
                    <th className="p-4 font-bold text-foreground">المسؤول</th>
                    <th className="p-4 font-bold text-foreground">الخطة</th>
                    <th className="p-4 font-bold text-foreground">السعر</th>
                    <th className="p-4 font-bold text-foreground">الدورة</th>
                    <th className="p-4 font-bold text-foreground">العقارات</th>
                    <th className="p-4 font-bold text-foreground">المستخدمين</th>
                    <th className="p-4 font-bold text-foreground">تاريخ التجديد</th>
                    <th className="p-4 font-bold text-foreground">الإيراد</th>
                    <th className="p-4 font-bold text-foreground">الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.map((sub) => (
                    <tr key={sub.id} className="border-t border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div className="font-mono text-sm text-primary">{sub.id}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-semibold text-foreground">{sub.company}</div>
                      </td>
                      <td className="p-4 text-muted-foreground">{sub.admin}</td>
                      <td className="p-4">{getPlanBadge(sub.plan)}</td>
                      <td className="p-4 font-bold text-foreground tabular-nums">{sub.price}</td>
                      <td className="p-4 text-muted-foreground">{sub.billingCycle}</td>
                      <td className="p-4 font-semibold text-foreground">{sub.properties}</td>
                      <td className="p-4 font-semibold text-foreground">{sub.users}</td>
                      <td className="p-4 text-muted-foreground">{sub.renewalDate}</td>
                      <td className="p-4 font-bold text-primary tabular-nums">{sub.revenue}</td>
                      <td className="p-4">{getStatusBadge(sub.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Plan Distribution */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-xl font-bold text-foreground mb-6">توزيع الخطط</h3>
            <div className="space-y-4">
              {[
                { plan: "Enterprise", count: 42, percent: 22.6, color: "bg-primary" },
                { plan: "Professional", count: 89, percent: 47.8, color: "bg-blue-500" },
                { plan: "Starter", count: 55, percent: 29.6, color: "bg-emerald-500" },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">{item.plan}</span>
                    <div className="text-left">
                      <div className="font-bold text-foreground">{item.count} اشتراك</div>
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