import { useState } from "react";
import { SEO } from "@/components/SEO";
import { AppShell } from "@/components/dashboard/AppShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bell,
  Calendar,
  DollarSign,
  Wrench,
  MessageSquare,
  Settings,
  CheckCheck,
  Trash2,
  Filter
} from "lucide-react";

export default function Notifications() {
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const notifications = [
    {
      id: 1,
      type: "booking",
      icon: Calendar,
      title: "حجز جديد من Airbnb",
      message: "وحدة الفيصلية 201 - 3 ليالي من 15-18 مايو",
      time: "منذ 5 دقائق",
      read: false,
      color: "text-blue-600 bg-blue-500/10"
    },
    {
      id: 2,
      type: "payment",
      icon: DollarSign,
      title: "تم استلام دفعة جديدة",
      message: "SAR 2,450 - حجز #7832",
      time: "منذ 15 دقيقة",
      read: false,
      color: "text-primary bg-primary/10"
    },
    {
      id: 3,
      type: "maintenance",
      icon: Wrench,
      title: "تذكرة صيانة جديدة",
      message: "تسريب في الحمام - الفيصلية 305",
      time: "منذ ساعة",
      read: false,
      color: "text-accent bg-accent/10"
    },
    {
      id: 4,
      type: "message",
      icon: MessageSquare,
      title: "رسالة جديدة من ضيف",
      message: "استفسار عن موعد تسجيل الوصول",
      time: "منذ ساعتين",
      read: true,
      color: "text-purple-600 bg-purple-500/10"
    },
    {
      id: 5,
      type: "system",
      icon: Settings,
      title: "تحديث النظام",
      message: "تم إضافة ميزات جديدة لإدارة التقارير",
      time: "منذ 3 ساعات",
      read: true,
      color: "text-muted-foreground bg-muted/50"
    },
    {
      id: 6,
      type: "booking",
      icon: Calendar,
      title: "إلغاء حجز",
      message: "تم إلغاء حجز #7829 من قبل الضيف",
      time: "منذ 4 ساعات",
      read: true,
      color: "text-destructive bg-destructive/10"
    },
    {
      id: 7,
      type: "payment",
      icon: DollarSign,
      title: "تقرير الإيرادات الأسبوعي",
      message: "إجمالي الأسبوع: SAR 18,450",
      time: "منذ يوم",
      read: true,
      color: "text-primary bg-primary/10"
    },
    {
      id: 8,
      type: "maintenance",
      icon: Wrench,
      title: "تم إكمال مهمة صيانة",
      message: "إصلاح مكيف الهواء - الفيصلية 201",
      time: "منذ يوم",
      read: true,
      color: "text-primary bg-primary/10"
    }
  ];

  const filteredNotifications = notifications.filter(n => {
    if (filter === "unread") return !n.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    // Handle mark all as read
  };

  const deleteAll = () => {
    // Handle delete all
  };

  return (
    <>
      <SEO title="الإشعارات - داريوم" />
      <AppShell>
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">الإشعارات</h1>
              <p className="text-muted-foreground">
                {unreadCount > 0 ? `لديك ${unreadCount} إشعارات غير مقروءة` : "جميع الإشعارات مقروءة"}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                <CheckCheck className="w-4 h-4 ml-2" />
                تحديد الكل كمقروء
              </Button>
              <Button variant="outline" size="sm" onClick={deleteAll}>
                <Trash2 className="w-4 h-4 ml-2" />
                حذف الكل
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: "الكل", value: notifications.length, active: filter === "all" },
              { label: "غير مقروءة", value: unreadCount, active: filter === "unread" },
              { label: "الحجوزات", value: notifications.filter(n => n.type === "booking").length, active: false },
              { label: "المدفوعات", value: notifications.filter(n => n.type === "payment").length, active: false }
            ].map((stat, index) => (
              <button
                key={index}
                onClick={() => index === 0 ? setFilter("all") : index === 1 ? setFilter("unread") : null}
                className={`glass p-4 rounded-xl border transition-all ${
                  stat.active 
                    ? "border-primary bg-primary/5" 
                    : "border-border/50 hover:border-primary/30"
                }`}
              >
                <div className={`text-2xl font-bold mb-1 ${stat.active ? "text-primary" : "text-foreground"}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </button>
            ))}
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredNotifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={`glass p-5 rounded-xl border transition-all hover:shadow-md ${
                    !notification.read 
                      ? "border-primary/30 bg-primary/[0.02]" 
                      : "border-border/50"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg ${notification.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-1">
                        <h3 className="font-semibold text-foreground">
                          {notification.title}
                        </h3>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {!notification.read && (
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                          )}
                          <span className="text-xs text-muted-foreground">
                            {notification.time}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {notification.message}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredNotifications.length === 0 && (
            <div className="glass p-12 rounded-xl border border-border/50 text-center">
              <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">لا توجد إشعارات</h3>
              <p className="text-muted-foreground">ستظهر جميع الإشعارات الجديدة هنا</p>
            </div>
          )}
        </div>
      </AppShell>
    </>
  );
}