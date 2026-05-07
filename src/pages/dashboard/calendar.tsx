import { SEO } from "@/components/SEO";
import { AppShell } from "@/components/dashboard/AppShell";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Filter } from "lucide-react";
import { useRole } from "@/contexts/RoleContext";

export default function CalendarPage() {
  const { hasPermission } = useRole();

  // Basic mock for calendar
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const units = ["جناح 101", "جناح 102", "فيلا A1", "شقة B2"];

  if (!hasPermission("canViewCalendar")) {
    return (
      <AppShell>
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-muted-foreground text-lg">عذراً، ليس لديك صلاحية للوصول إلى التقويم.</p>
        </div>
      </AppShell>
    );
  }

  return (
    <>
      <SEO title="التقويم الموحد - داريوم" />
      <AppShell>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">التقويم الموحد</h1>
              <p className="text-muted-foreground">عرض وإدارة الحجوزات عبر جميع الوحدات</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                تصفية
              </Button>
              <div className="flex items-center glass rounded-lg p-1">
                <Button variant="ghost" size="icon"><ChevronRight className="w-4 h-4" /></Button>
                <span className="px-4 font-semibold text-sm">مايو 2026</span>
                <Button variant="ghost" size="icon"><ChevronLeft className="w-4 h-4" /></Button>
              </div>
            </div>
          </div>

          {/* Timeline Mock */}
          <div className="glass rounded-xl border border-border/50 overflow-hidden">
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                {/* Header Row */}
                <div className="flex border-b border-border/50 bg-muted/30">
                  <div className="w-48 p-4 font-bold border-l border-border/50 flex items-center shrink-0">
                    الوحدة
                  </div>
                  <div className="flex flex-1">
                    {days.slice(0, 15).map(day => (
                      <div key={day} className="flex-1 min-w-[60px] p-2 text-center border-l border-border/50 text-sm">
                        <div className="text-muted-foreground text-xs mb-1">ماي</div>
                        <div className="font-semibold">{day}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rows */}
                {units.map((unit, i) => (
                  <div key={i} className="flex border-b border-border/50 last:border-0 hover:bg-muted/10 transition-colors">
                    <div className="w-48 p-4 font-semibold text-sm border-l border-border/50 flex items-center shrink-0">
                      {unit}
                    </div>
                    <div className="flex flex-1 relative min-h-[60px]">
                      {/* Grid lines */}
                      {days.slice(0, 15).map(day => (
                        <div key={day} className="flex-1 min-w-[60px] border-l border-border/50"></div>
                      ))}
                      
                      {/* Mock Reservations */}
                      {i === 0 && (
                        <div className="absolute top-2 bottom-2 right-[120px] w-[180px] bg-occupied text-white text-xs p-1.5 rounded-md shadow-sm z-10 flex flex-col justify-center overflow-hidden">
                          <span className="font-bold truncate">أحمد محمد (Airbnb)</span>
                        </div>
                      )}
                      {i === 1 && (
                        <div className="absolute top-2 bottom-2 right-[240px] w-[120px] bg-primary text-white text-xs p-1.5 rounded-md shadow-sm z-10 flex flex-col justify-center overflow-hidden">
                          <span className="font-bold truncate">سارة فهد (Booking)</span>
                        </div>
                      )}
                      {i === 2 && (
                        <div className="absolute top-2 bottom-2 right-[60px] w-[240px] bg-maintenance text-maintenance-foreground text-xs p-1.5 rounded-md shadow-sm z-10 flex flex-col justify-center overflow-hidden border border-maintenance/20">
                          <span className="font-bold truncate">صيانة دورية</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AppShell>
    </>
  );
}