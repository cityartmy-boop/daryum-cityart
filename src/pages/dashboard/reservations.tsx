import { useState } from "react";
import { SEO } from "@/components/SEO";
import { AppShell } from "@/components/dashboard/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  Plus,
  Calendar,
  User,
  MapPin,
  DollarSign,
  Eye,
  Download,
  Filter
} from "lucide-react";

export default function ReservationsPage() {
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const reservations = [
    {
      id: "RSV-2845",
      guest: "أحمد محمد السعيد",
      property: "برج الفيصلية",
      unit: "جناح 101",
      checkIn: "2026-05-10",
      checkOut: "2026-05-15",
      nights: 5,
      guests: 2,
      amount: "SAR 2,250",
      status: "confirmed",
      channel: "Airbnb",
      channelColor: "bg-[#FF5A5F]"
    },
    {
      id: "RSV-2846",
      guest: "سارة أحمد الفهد",
      property: "أجنحة النخيل",
      unit: "فيلا A1",
      checkIn: "2026-05-12",
      checkOut: "2026-05-17",
      nights: 5,
      guests: 4,
      amount: "SAR 4,250",
      status: "pending",
      channel: "Booking.com",
      channelColor: "bg-[#003580]"
    },
    {
      id: "RSV-2847",
      guest: "محمد علي الزهراني",
      property: "برج الفيصلية",
      unit: "جناح 102",
      checkIn: "2026-05-08",
      checkOut: "2026-05-13",
      nights: 5,
      guests: 2,
      amount: "SAR 1,500",
      status: "checked_in",
      channel: "Direct",
      channelColor: "bg-primary"
    },
    {
      id: "RSV-2848",
      guest: "فاطمة خالد العتيبي",
      property: "فلل الواحة",
      unit: "فيلا 3",
      checkIn: "2026-05-05",
      checkOut: "2026-05-10",
      nights: 5,
      guests: 6,
      amount: "SAR 4,750",
      status: "checked_out",
      channel: "Agoda",
      channelColor: "bg-[#D71F28]"
    },
    {
      id: "RSV-2849",
      guest: "عبدالله سعيد القحطاني",
      property: "شاليهات البحر الأحمر",
      unit: "شاليه 7",
      checkIn: "2026-05-14",
      checkOut: "2026-05-18",
      nights: 4,
      guests: 4,
      amount: "SAR 2,800",
      status: "confirmed",
      channel: "Vrbo",
      channelColor: "bg-[#1565C0]"
    },
    {
      id: "RSV-2850",
      guest: "نورة إبراهيم الدوسري",
      property: "مجمع الياسمين",
      unit: "شقة A5",
      checkIn: "2026-05-20",
      checkOut: "2026-05-25",
      nights: 5,
      guests: 3,
      amount: "SAR 3,100",
      status: "pending",
      channel: "Direct",
      channelColor: "bg-primary"
    },
  ];

  const filteredReservations = filterStatus === "all" 
    ? reservations 
    : reservations.filter(r => r.status === filterStatus);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "confirmed": return <Badge className="bg-available">مؤكد</Badge>;
      case "pending": return <Badge className="bg-accent text-secondary">معلق</Badge>;
      case "checked_in": return <Badge className="bg-occupied">داخل الوحدة</Badge>;
      case "checked_out": return <Badge className="bg-muted text-foreground">خرج</Badge>;
      case "cancelled": return <Badge variant="destructive">ملغي</Badge>;
      default: return <Badge>غير معروف</Badge>;
    }
  };

  return (
    <>
      <SEO title="الحجوزات - داريوم" />
      <AppShell>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">الحجوزات</h1>
              <p className="text-muted-foreground">
                إدارة ومتابعة جميع الحجوزات والإقامات
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                تصدير
              </Button>
              <Button className="gradient-primary gap-2">
                <Plus className="w-4 h-4" />
                حجز يدوي
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "إجمالي الحجوزات", value: "247", icon: Calendar, color: "from-primary to-secondary" },
              { label: "قادمة", value: "89", icon: User, color: "from-blue-500 to-cyan-500" },
              { label: "نشطة", value: "34", icon: MapPin, color: "from-emerald-500 to-green-500" },
              { label: "الإيراد المتوقع", value: "SAR 428K", icon: DollarSign, color: "from-amber-500 to-orange-500" },
            ].map((stat, index) => (
              <div key={index} className="glass rounded-xl p-6">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} p-3 mb-3`}>
                  <stat.icon className="w-full h-full text-white" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
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
                  placeholder="البحث برقم الحجز، اسم الضيف، العقار..."
                  className="pr-10"
                />
              </div>
              <Select defaultValue="all" onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل الحالات</SelectItem>
                  <SelectItem value="confirmed">مؤكد</SelectItem>
                  <SelectItem value="pending">معلق</SelectItem>
                  <SelectItem value="checked_in">داخل الوحدة</SelectItem>
                  <SelectItem value="checked_out">خرج</SelectItem>
                  <SelectItem value="cancelled">ملغي</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل القنوات</SelectItem>
                  <SelectItem value="airbnb">Airbnb</SelectItem>
                  <SelectItem value="booking">Booking.com</SelectItem>
                  <SelectItem value="direct">مباشر</SelectItem>
                  <SelectItem value="agoda">Agoda</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Reservations Table */}
          <div className="glass rounded-xl border border-border/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/30 border-b border-border/50">
                  <tr>
                    <th className="text-right p-4 font-semibold text-sm">رقم الحجز</th>
                    <th className="text-right p-4 font-semibold text-sm">الضيف</th>
                    <th className="text-right p-4 font-semibold text-sm">الوحدة</th>
                    <th className="text-right p-4 font-semibold text-sm">الفترة</th>
                    <th className="text-right p-4 font-semibold text-sm">القناة</th>
                    <th className="text-right p-4 font-semibold text-sm">المبلغ</th>
                    <th className="text-right p-4 font-semibold text-sm">الحالة</th>
                    <th className="text-right p-4 font-semibold text-sm">إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReservations.map((reservation) => (
                    <tr key={reservation.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="p-4">
                        <div className="font-mono text-sm font-semibold">{reservation.id}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium">{reservation.guest}</div>
                        <div className="text-xs text-muted-foreground">{reservation.guests} ضيوف</div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium">{reservation.unit}</div>
                        <div className="text-xs text-muted-foreground">{reservation.property}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">{reservation.checkIn}</div>
                        <div className="text-sm">{reservation.checkOut}</div>
                        <div className="text-xs text-muted-foreground">{reservation.nights} ليالي</div>
                      </td>
                      <td className="p-4">
                        <Badge className={`${reservation.channelColor} text-white`}>
                          {reservation.channel}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="font-bold tabular-nums">{reservation.amount}</div>
                      </td>
                      <td className="p-4">
                        {getStatusBadge(reservation.status)}
                      </td>
                      <td className="p-4">
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Eye className="w-4 h-4" />
                          عرض
                        </Button>
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