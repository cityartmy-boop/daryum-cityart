import { Calendar, User, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function RecentReservations() {
  const reservations = [
    {
      guest: "أحمد السعيد",
      unit: "جناح 101",
      checkIn: "15 مايو",
      nights: 3,
      amount: "﷼ 1,350",
      status: "confirmed"
    },
    {
      guest: "Sarah Johnson",
      unit: "فيلا A1",
      checkIn: "20 مايو",
      nights: 5,
      amount: "﷼ 4,250",
      status: "pending"
    },
    {
      guest: "خالد عبدالله",
      unit: "شقة B2",
      checkIn: "18 مايو",
      nights: 2,
      amount: "﷼ 980",
      status: "confirmed"
    },
  ];

  return (
    <div className="glass rounded-xl p-6 border border-border/50">
      <h3 className="text-lg font-bold text-foreground mb-4">أحدث الحجوزات</h3>
      <div className="space-y-4">
        {reservations.map((reservation, index) => (
          <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-foreground">{reservation.guest}</div>
                <div className="text-sm text-muted-foreground">{reservation.unit}</div>
              </div>
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Calendar className="w-4 h-4" />
                <span>{reservation.checkIn}</span>
              </div>
              <div className="font-bold text-foreground">{reservation.amount}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}