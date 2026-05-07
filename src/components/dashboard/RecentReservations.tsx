import { Calendar, MapPin, User, DollarSign } from "lucide-react";

export function RecentReservations() {
  const reservations = [
    {
      id: "RES-2847",
      guest: "فيصل الشهري",
      property: "شقة الملقا الفاخرة",
      checkIn: "2026-05-08",
      checkOut: "2026-05-12",
      nights: 4,
      total: 2450,
      status: "confirmed",
      channel: "Airbnb"
    },
    {
      id: "RES-2846",
      guest: "نورة العتيبي",
      property: "فيلا النرجس",
      checkIn: "2026-05-09",
      checkOut: "2026-05-15",
      nights: 6,
      total: 4200,
      status: "confirmed",
      channel: "Booking.com"
    },
    {
      id: "RES-2845",
      guest: "خالد المطيري",
      property: "شقة حي السفارات",
      checkIn: "2026-05-07",
      checkOut: "2026-05-10",
      nights: 3,
      total: 1875,
      status: "checked-in",
      channel: "مباشر"
    },
    {
      id: "RES-2844",
      guest: "سارة الدوسري",
      property: "استوديو العليا",
      checkIn: "2026-05-10",
      checkOut: "2026-05-14",
      nights: 4,
      total: 1960,
      status: "pending",
      channel: "Agoda"
    },
  ];

  const statusColors = {
    confirmed: "bg-primary/10 text-primary border border-primary/20",
    "checked-in": "bg-blue-100 text-blue-700 border border-blue-200",
    pending: "bg-accent/10 text-accent-foreground border border-accent/20",
  };

  return (
    <div className="glass rounded-2xl p-6 animate-fade-in-up delay-500">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold">أحدث الحجوزات</h3>
          <p className="text-sm text-muted-foreground mt-1">آخر 4 حجوزات مسجلة</p>
        </div>
        <button className="text-sm text-primary hover:underline font-medium">
          عرض الكل ←
        </button>
      </div>
      
      <div className="space-y-4">
        {reservations.map((res) => (
          <div key={res.id} className="flex items-center gap-4 p-4 rounded-xl glass-dark hover:bg-white/50 transition-all hover:scale-[1.02]">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-bold text-sm text-muted-foreground">{res.id}</span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[res.status as keyof typeof statusColors]}`}>
                  {res.status === "confirmed" ? "مؤكد" : res.status === "checked-in" ? "وصل" : "معلق"}
                </span>
                <span className="text-xs text-muted-foreground">{res.channel}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm mb-1">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">{res.guest}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{res.property}</span>
              </div>
            </div>
            
            <div className="text-left space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>{res.checkIn} - {res.checkOut}</span>
              </div>
              <div className="text-sm text-muted-foreground">{res.nights} ليالي</div>
            </div>
            
            <div className="text-left">
              <div className="flex items-center gap-1 text-lg font-bold tabular-nums text-primary">
                <DollarSign className="w-5 h-5" />
                {res.total.toLocaleString()} ر.س
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}