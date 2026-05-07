import { Badge } from "@/components/ui/badge";
import { Building2, Calendar, DollarSign } from "lucide-react";

export function SubscriptionsTable() {
  const subscriptions = [
    {
      company: "شركة الرياض العقارية",
      plan: "الأعمال",
      users: 12,
      properties: 18,
      mrr: "999 ر.س",
      status: "active",
      nextBilling: "2026-05-15",
      joinDate: "2024-11-20"
    },
    {
      company: "مجموعة جدة للضيافة",
      plan: "المحترف",
      users: 5,
      properties: 8,
      mrr: "599 ر.س",
      status: "active",
      nextBilling: "2026-05-22",
      joinDate: "2025-03-10"
    },
    {
      company: "عقارات الدمام المتميزة",
      plan: "البداية",
      users: 2,
      properties: 3,
      mrr: "299 ر.س",
      status: "trial",
      nextBilling: "2026-05-12",
      joinDate: "2026-04-28"
    },
    {
      company: "شركة الخبر للاستثمار",
      plan: "المؤسسات",
      users: 28,
      properties: 52,
      mrr: "2,499 ر.س",
      status: "active",
      nextBilling: "2026-06-01",
      joinDate: "2023-08-15"
    },
    {
      company: "مكة للتطوير العقاري",
      plan: "المحترف",
      users: 7,
      properties: 11,
      mrr: "599 ر.س",
      status: "active",
      nextBilling: "2026-05-18",
      joinDate: "2025-01-05"
    },
    {
      company: "عقارات المدينة الحديثة",
      plan: "البداية",
      users: 1,
      properties: 2,
      mrr: "299 ر.س",
      status: "trial",
      nextBilling: "2026-05-10",
      joinDate: "2026-05-03"
    },
    {
      company: "الطائف العقارية",
      plan: "الأعمال",
      users: 9,
      properties: 14,
      mrr: "999 ر.س",
      status: "active",
      nextBilling: "2026-05-25",
      joinDate: "2024-06-12"
    },
    {
      company: "أبها للضيافة",
      plan: "المحترف",
      users: 4,
      properties: 6,
      mrr: "599 ر.س",
      status: "cancelled",
      nextBilling: "-",
      joinDate: "2024-09-20"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">نشط</Badge>;
      case 'trial':
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">تجريبي</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">ملغي</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">الاشتراكات النشطة</h3>
        <div className="flex gap-2">
          <button className="glass px-4 py-2 rounded-lg text-sm hover:bg-white/80 transition-colors">
            الكل
          </button>
          <button className="px-4 py-2 rounded-lg text-sm hover:bg-muted/50 transition-colors">
            نشط
          </button>
          <button className="px-4 py-2 rounded-lg text-sm hover:bg-muted/50 transition-colors">
            تجريبي
          </button>
          <button className="px-4 py-2 rounded-lg text-sm hover:bg-muted/50 transition-colors">
            ملغي
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead>
            <tr className="border-b border-border">
              <th className="pb-4 pr-4 text-sm font-semibold text-muted-foreground">الشركة</th>
              <th className="pb-4 px-4 text-sm font-semibold text-muted-foreground">الباقة</th>
              <th className="pb-4 px-4 text-sm font-semibold text-muted-foreground">المستخدمين</th>
              <th className="pb-4 px-4 text-sm font-semibold text-muted-foreground">العقارات</th>
              <th className="pb-4 px-4 text-sm font-semibold text-muted-foreground">MRR</th>
              <th className="pb-4 px-4 text-sm font-semibold text-muted-foreground">الحالة</th>
              <th className="pb-4 px-4 text-sm font-semibold text-muted-foreground">الفاتورة التالية</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub, index) => (
              <tr key={index} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                <td className="py-4 pr-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-bold">
                      {sub.company.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold">{sub.company}</div>
                      <div className="text-xs text-muted-foreground">منذ {sub.joinDate}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="font-medium">{sub.plan}</span>
                </td>
                <td className="py-4 px-4 tabular-nums">{sub.users}</td>
                <td className="py-4 px-4 tabular-nums">{sub.properties}</td>
                <td className="py-4 px-4 font-bold tabular-nums">{sub.mrr}</td>
                <td className="py-4 px-4">{getStatusBadge(sub.status)}</td>
                <td className="py-4 px-4 text-sm text-muted-foreground tabular-nums">{sub.nextBilling}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}