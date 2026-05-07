import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, XCircle } from "lucide-react";

export function RecentPayments() {
  const payments = [
    {
      company: "شركة الرياض العقارية",
      amount: "999 ر.س",
      plan: "الأعمال - شهري",
      date: "2026-05-07",
      time: "14:32",
      status: "success",
      method: "بطاقة ائتمان"
    },
    {
      company: "مجموعة جدة للضيافة",
      amount: "599 ر.س",
      plan: "المحترف - شهري",
      date: "2026-05-07",
      time: "11:15",
      status: "success",
      method: "STC Pay"
    },
    {
      company: "شركة الخبر للاستثمار",
      amount: "2,499 ر.س",
      plan: "المؤسسات - شهري",
      date: "2026-05-06",
      time: "09:45",
      status: "success",
      method: "تحويل بنكي"
    },
    {
      company: "عقارات الدمام المتميزة",
      amount: "299 ر.س",
      plan: "البداية - شهري",
      date: "2026-05-06",
      time: "16:20",
      status: "pending",
      method: "بطاقة ائتمان"
    },
    {
      company: "مكة للتطوير العقاري",
      amount: "599 ر.س",
      plan: "المحترف - شهري",
      date: "2026-05-05",
      time: "13:08",
      status: "success",
      method: "Apple Pay"
    },
    {
      company: "الطائف العقارية",
      amount: "999 ر.س",
      plan: "الأعمال - شهري",
      date: "2026-05-05",
      time: "10:30",
      status: "failed",
      method: "بطاقة ائتمان"
    },
    {
      company: "مجموعة الشرقية",
      amount: "599 ر.س",
      plan: "المحترف - شهري",
      date: "2026-05-04",
      time: "15:42",
      status: "success",
      method: "مدى"
    },
    {
      company: "عقارات ينبع",
      amount: "299 ر.س",
      plan: "البداية - شهري",
      date: "2026-05-04",
      time: "12:18",
      status: "success",
      method: "STC Pay"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return (
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 flex items-center gap-1 w-fit">
            <CheckCircle2 className="w-3 h-3" />
            مكتمل
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 flex items-center gap-1 w-fit">
            <Clock className="w-3 h-3" />
            قيد المعالجة
          </Badge>
        );
      case 'failed':
        return (
          <Badge variant="destructive" className="flex items-center gap-1 w-fit">
            <XCircle className="w-3 h-3" />
            فشل
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">آخر المدفوعات</h3>
        <button className="text-sm text-primary hover:underline font-medium">
          عرض الكل ←
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead>
            <tr className="border-b border-border">
              <th className="pb-4 pr-4 text-sm font-semibold text-muted-foreground">الشركة</th>
              <th className="pb-4 px-4 text-sm font-semibold text-muted-foreground">المبلغ</th>
              <th className="pb-4 px-4 text-sm font-semibold text-muted-foreground">الباقة</th>
              <th className="pb-4 px-4 text-sm font-semibold text-muted-foreground">التاريخ</th>
              <th className="pb-4 px-4 text-sm font-semibold text-muted-foreground">طريقة الدفع</th>
              <th className="pb-4 px-4 text-sm font-semibold text-muted-foreground">الحالة</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index} className="border-b border-border/50 hover:bg-primary/5 transition-colors">
                <td className="py-4 pr-4 font-medium">{payment.company}</td>
                <td className="py-4 px-4 font-bold text-lg tabular-nums text-primary">{payment.amount}</td>
                <td className="py-4 px-4 text-sm text-muted-foreground">{payment.plan}</td>
                <td className="py-4 px-4 text-sm">
                  <div className="tabular-nums">{payment.date}</div>
                  <div className="text-xs text-muted-foreground tabular-nums">{payment.time}</div>
                </td>
                <td className="py-4 px-4 text-sm">{payment.method}</td>
                <td className="py-4 px-4">{getStatusBadge(payment.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}