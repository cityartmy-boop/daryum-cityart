import { useState } from "react";
import { SEO } from "@/components/SEO";
import { AppShell } from "@/components/dashboard/AppShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  Building2,
  Calendar as CalendarIcon
} from "lucide-react";

export default function CalendarPage() {
  const [selectedProperty, setSelectedProperty] = useState("all");
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 4)); // May 2026

  const properties = [
    { id: "all", name: "جميع العقارات" },
    { id: "1", name: "برج الفيصلية" },
    { id: "2", name: "أجنحة النخيل" },
    { id: "3", name: "فلل الواحة" },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
  
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: startingDayOfWeek }, (_, i) => i);

  const monthNames = [
    "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
  ];

  const weekDays = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  // Mock reservations data
  const reservations: { [key: number]: { status: string; guest: string } } = {
    15: { status: "occupied", guest: "أحمد السعيد" },
    16: { status: "occupied", guest: "أحمد السعيد" },
    17: { status: "occupied", guest: "أحمد السعيد" },
    20: { status: "cleaning", guest: "" },
    21: { status: "available", guest: "" },
    22: { status: "available", guest: "" },
  };

  const getDayStatus = (day: number) => {
    return reservations[day]?.status || "available";
  };

  const getDayClass = (day: number) => {
    const status = getDayStatus(day);
    switch(status) {
      case "occupied": return "bg-occupied text-white";
      case "cleaning": return "bg-cleaning text-white";
      case "maintenance": return "bg-maintenance text-white";
      case "available": return "bg-available/10 text-available hover:bg-available/20";
      default: return "hover:bg-muted/50";
    }
  };

  return (
    <>
      <SEO title="التقويم - داريوم" />
      <AppShell>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-foreground">التقويم</h1>
              <p className="text-muted-foreground">عرض الحجوزات والتواريخ</p>
            </div>
            <div className="flex items-center gap-4">
              <Select value={selectedProperty} onValueChange={setSelectedProperty}>
                <SelectTrigger className="w-64">
                  <Building2 className="w-4 h-4 ml-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {properties.map((property) => (
                    <SelectItem key={property.id} value={property.id}>
                      {property.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Calendar */}
          <div className="glass rounded-xl p-6">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <Button variant="outline" size="sm" onClick={previousMonth}>
                <ChevronRight className="w-5 h-5" />
              </Button>
              <h2 className="text-2xl font-bold text-foreground">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h2>
              <Button variant="outline" size="sm" onClick={nextMonth}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-available"></div>
                <span className="text-sm text-muted-foreground">متاح</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-occupied"></div>
                <span className="text-sm text-muted-foreground">مشغول</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-cleaning"></div>
                <span className="text-sm text-muted-foreground">تنظيف</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-maintenance"></div>
                <span className="text-sm text-muted-foreground">صيانة</span>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Week day headers */}
              {weekDays.map((day) => (
                <div key={day} className="text-center p-2 font-bold text-sm text-muted-foreground">
                  {day}
                </div>
              ))}

              {/* Empty days */}
              {emptyDays.map((_, index) => (
                <div key={`empty-${index}`} className="aspect-square"></div>
              ))}

              {/* Days */}
              {days.map((day) => (
                <div
                  key={day}
                  className={`aspect-square rounded-lg p-2 transition-all cursor-pointer border border-border/50 ${getDayClass(day)}`}
                >
                  <div className="font-semibold text-sm">{day}</div>
                  {reservations[day] && (
                    <div className="text-xs mt-1 truncate">{reservations[day].guest}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </AppShell>
    </>
  );
}