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
  Calendar as CalendarIcon,
  User
} from "lucide-react";

export default function AdminReservationsPage() {
  const [filter, setFilter] = useState("all");

  const reservations = [
    {
      id: "RES-2026-001",
      guest: "أحمد السعيد",
      property: "برج الفيصلية",
      unit: "جناح 101",
      checkIn: "2026-05-15",
      checkOut: "2026-05-18",
      nights: 3,
      amount: "﷼ 1,350",
      channel: "Airbnb",
      status: "confirmed",
      owner: "داريوم الرياض"
    },
    {
      id: "RES-2026-002",
      guest: "Sarah Johnson",
      property: "أجنحة النخيل",
      unit: "فيلا A1",
      checkIn: "2026-05-20",
      checkOut: "2026-05-25",
      nights: 5,
      amount: "﷼ 4,250",
      channel: "Booking.com",
      status: "pending",
      owner: "مجموعة النخيل"
    },
    {
      id: "RES-2026-003",
      guest: "خالد عبدالله",
      property: "فلل الواحة",
      unit: "شقة B2",
      checkIn: "2026-05-18",
      checkOut: "2026-05-20",
      nights: 2,
      amount: "﷼ 980",
      channel: "مباشر",
      status: "checked_in",
      owner: "عقارات الواحة"
    },
    {
      id: "RES-2026-004",
      guest: "ليلى الحربي",
      property: "مجمع الياسمين",
      unit: "شقة 302",
      checkIn: "2026-05-12",
      checkOut: "2026-05-14",
      nights: 2,
      amount: "﷼ 750",
      channel: "Agoda",
      status: "checked_out",
      owner: "فلل الدوسري"
    },
  ];

  const stats = [
    { label: "إجمالي الحجوزات", value: "8,456", color: "from-primary to-secondary" },
    { label: "حجوزات نشطة", value: "342", color: "from-emerald-500 to-green-500" },
    { label: "حجوزات اليوم", value: "28", color: "from-blue-500 to-cyan-500" },
    { label: "إجمالي الإيراد", value: "﷼ 4.8M", color: "from-amber-500 to-orange-500" },
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "confirmed": return <Badge className="bg-available">مؤكد</Badge>;
      case "pending": return <Badge className="bg-amber-500">معلق</Badge>;
      case "checked_in": return <Badge className="bg-blue-500">جاري الإقامة</Badge>;
      case "checked_out": return <Badge variant="outline">مكتمل</Badge>;
      case "cancelled": return <Badge variant="destructive">ملغي</Badge>;
      default: return <Badge variant="outline">غير معروف</Badge>;
    }
  };

  const getChannelBadge = (channel: string) => {
    const colors: { [key: string]: string } = {
      "Airbnb": "bg-red-500",
      "Booking.com": "bg-blue-500",
      "مباشر": "bg-emerald-500",
      "Agoda": "bg-purple-500",
    };
    return <Badge className={colors[channel] || "bg-gray-500"}>{channel}</Badge>;
  };

  return (
    <>
      <SEO title="إدارة الحجوزات - Admin" />
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-foreground">إدارة جميع الحجوزات</h1>
              <p className="text-muted-foreground">عرض حجوزات جميع العملاء</p>
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
                  <CalendarIcon className="w-full h-full text-white" />
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
                  placeholder="البحث في الحجوزات..."
                  className="pr-10"
                />
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="w-4 h-4 ml-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل الحجوزات</SelectItem>
                  <SelectItem value="confirmed">مؤكد</SelectItem>
                  <SelectItem value="pending">معلق</SelectItem>
                  <SelectItem value="checked_in">جاري الإقامة</SelectItem>
                  <SelectItem value="checked_out">مكتمل</SelectItem>
                  <SelectItem value="cancelled">ملغي</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Reservations Table */}
          <div className="glass rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr className="text-right">
                    <th className="p-4 font-bold text-foreground">رقم الحجز</th>
                    <th className="p-4 font-bold text-foreground">الضيف</th>
                    <th className="p-4 font-bold text-foreground">العقار</th>
                    <th className="p-4 font-bold text-foreground">الوحدة</th>
                    <th className="p-4 font-bold text-foreground">تاريخ الوصول</th>
                    <th className="p-4 font-bold text-foreground">تاريخ المغادرة</th>
                    <th className="p-4 font-bold text-foreground">الليالي</th>
                    <th className="p-4 font-bold text-foreground">المبلغ</th>
                    <th className="p-4 font-bold text-foreground">القناة</th>
                    <th className="p-4 font-bold text-foreground">المالك</th>
                    <th className="p-4 font-bold text-foreground">الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((reservation) => (
                    <tr key={reservation.id} className="border-t border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div className="font-mono text-sm text-primary">{reservation.id}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="w-4 h-4 text-primary" />
                          </div>
                          <span className="font-semibold text-foreground">{reservation.guest}</span>
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground">{reservation.property}</td>
                      <td className="p-4">
                        <Badge variant="outline">{reservation.unit}</Badge>
                      </td>
                      <td className="p-4 text-muted-foreground">{reservation.checkIn}</td>
                      <td className="p-4 text-muted-foreground">{reservation.checkOut}</td>
                      <td className="p-4 font-semibold text-foreground">{reservation.nights}</td>
                      <td className="p-4 font-bold text-primary tabular-nums">{reservation.amount}</td>
                      <td className="p-4">{getChannelBadge(reservation.channel)}</td>
                      <td className="p-4 text-muted-foreground">{reservation.owner}</td>
                      <td className="p-4">{getStatusBadge(reservation.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Channel Performance */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-xl font-bold text-foreground mb-6">أداء القنوات</h3>
            <div className="space-y-4">
              {[
                { channel: "Airbnb", bookings: 2846, percent: 33.7, color: "bg-red-500" },
                { channel: "Booking.com", bookings: 2453, percent: 29.0, color: "bg-blue-500" },
                { channel: "مباشر", bookings: 1522, percent: 18.0, color: "bg-emerald-500" },
                { channel: "Agoda", bookings: 1635, percent: 19.3, color: "bg-purple-500" },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">{item.channel}</span>
                    <div className="text-left">
                      <div className="font-bold text-foreground">{item.bookings} حجز</div>
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