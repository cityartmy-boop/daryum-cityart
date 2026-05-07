import { useState } from "react";
import { SEO } from "@/components/SEO";
import { AppShell } from "@/components/dashboard/AppShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Plus, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  MessageSquare,
  Filter
} from "lucide-react";
import Link from "next/link";

export default function SupportTickets() {
  const [filter, setFilter] = useState<"all" | "open" | "in-progress" | "closed">("all");

  const tickets = [
    {
      id: "TKT-2847",
      title: "مشكلة في مزامنة الحجوزات من Booking.com",
      description: "الحجوزات الجديدة لا تظهر في النظام منذ ساعتين",
      status: "open",
      priority: "urgent",
      category: "تقني",
      createdAt: "منذ ساعتين",
      lastUpdate: "منذ ساعتين",
      replies: 0,
      assignedTo: null
    },
    {
      id: "TKT-2846",
      title: "طلب إضافة بوابة دفع جديدة",
      description: "نريد إضافة HyperPay كبوابة دفع إضافية",
      status: "in-progress",
      priority: "high",
      category: "طلب ميزة",
      createdAt: "منذ 5 ساعات",
      lastUpdate: "منذ ساعة",
      replies: 3,
      assignedTo: "فريق التطوير"
    },
    {
      id: "TKT-2845",
      title: "استفسار عن طريقة احتساب العمولة",
      description: "كيف يتم احتساب العمولة على الحجوزات المباشرة؟",
      status: "closed",
      priority: "medium",
      category: "استفسار",
      createdAt: "منذ يومين",
      lastUpdate: "منذ يوم",
      replies: 2,
      assignedTo: "فريق الدعم"
    },
    {
      id: "TKT-2844",
      title: "خطأ في تقرير الإيرادات الشهري",
      description: "الأرقام في تقرير فبراير لا تطابق البيانات الفعلية",
      status: "in-progress",
      priority: "high",
      category: "تقني",
      createdAt: "منذ يومين",
      lastUpdate: "منذ 3 ساعات",
      replies: 5,
      assignedTo: "فريق التطوير"
    },
    {
      id: "TKT-2843",
      title: "طلب تدريب على استخدام لوحة التحكم",
      description: "نحتاج جلسة تدريبية للفريق الجديد",
      status: "open",
      priority: "medium",
      category: "تدريب",
      createdAt: "منذ 3 أيام",
      lastUpdate: "منذ 3 أيام",
      replies: 0,
      assignedTo: null
    },
    {
      id: "TKT-2842",
      title: "تحسين سرعة تحميل الصفحات",
      description: "لوحة التحكم بطيئة في أوقات الذروة",
      status: "closed",
      priority: "low",
      category: "تحسين",
      createdAt: "منذ أسبوع",
      lastUpdate: "منذ 4 أيام",
      replies: 8,
      assignedTo: "فريق التطوير"
    }
  ];

  const statusConfig = {
    open: { 
      label: "جديدة", 
      color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      icon: AlertCircle 
    },
    "in-progress": { 
      label: "قيد المعالجة", 
      color: "bg-accent/10 text-accent-foreground border-accent/20",
      icon: Clock 
    },
    closed: { 
      label: "محلولة", 
      color: "bg-primary/10 text-primary border-primary/20",
      icon: CheckCircle2 
    }
  };

  const priorityConfig = {
    urgent: { label: "عاجل", color: "bg-destructive/10 text-destructive border-destructive/20" },
    high: { label: "عالي", color: "bg-orange-500/10 text-orange-600 border-orange-500/20" },
    medium: { label: "متوسط", color: "bg-accent/10 text-accent-foreground border-accent/20" },
    low: { label: "منخفض", color: "bg-muted text-muted-foreground border-border" }
  };

  const filteredTickets = tickets.filter(ticket => {
    if (filter === "all") return true;
    return ticket.status === filter;
  });

  const stats = [
    { label: "تذاكر مفتوحة", value: tickets.filter(t => t.status === "open").length, color: "text-blue-600" },
    { label: "قيد المعالجة", value: tickets.filter(t => t.status === "in-progress").length, color: "text-accent-foreground" },
    { label: "محلولة", value: tickets.filter(t => t.status === "closed").length, color: "text-primary" },
    { label: "إجمالي التذاكر", value: tickets.length, color: "text-foreground" }
  ];

  return (
    <>
      <SEO title="الدعم الفني - داريوم" />
      <AppShell>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">الدعم الفني</h1>
              <p className="text-muted-foreground">إدارة تذاكر الدعم والتواصل مع فريق داريوم</p>
            </div>
            <Link href="/dashboard/support/new">
              <Button className="gradient-primary">
                <Plus className="w-4 h-4 ml-2" />
                تذكرة جديدة
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="glass p-4 rounded-xl border border-border/50">
                <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Filters & Search */}
          <div className="glass p-6 rounded-xl border border-border/50">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="ابحث عن تذكرة..." 
                  className="pr-10"
                />
              </div>
              <div className="flex gap-2">
                {[
                  { value: "all", label: "الكل" },
                  { value: "open", label: "جديدة" },
                  { value: "in-progress", label: "قيد المعالجة" },
                  { value: "closed", label: "محلولة" }
                ].map((f) => (
                  <Button
                    key={f.value}
                    variant={filter === f.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter(f.value as any)}
                    className={filter === f.value ? "gradient-primary" : ""}
                  >
                    {f.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Tickets List */}
          <div className="space-y-4">
            {filteredTickets.map((ticket) => {
              const StatusIcon = statusConfig[ticket.status as keyof typeof statusConfig].icon;
              return (
                <Link key={ticket.id} href={`/dashboard/support/${ticket.id}`}>
                  <div className="glass p-6 rounded-xl border border-border/50 hover:shadow-lg hover:scale-[1.01] transition-all duration-300 cursor-pointer">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge variant="outline" className="font-mono text-xs">
                            {ticket.id}
                          </Badge>
                          <Badge 
                            variant="outline" 
                            className={statusConfig[ticket.status as keyof typeof statusConfig].color}
                          >
                            <StatusIcon className="w-3 h-3 ml-1" />
                            {statusConfig[ticket.status as keyof typeof statusConfig].label}
                          </Badge>
                          <Badge 
                            variant="outline" 
                            className={priorityConfig[ticket.priority as keyof typeof priorityConfig].color}
                          >
                            {priorityConfig[ticket.priority as keyof typeof priorityConfig].label}
                          </Badge>
                          <Badge variant="outline" className="bg-muted/50">
                            {ticket.category}
                          </Badge>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {ticket.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          {ticket.description}
                        </p>
                        
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            <span>{ticket.replies} رد</span>
                          </div>
                          <div>تم الإنشاء {ticket.createdAt}</div>
                          <div>آخر تحديث {ticket.lastUpdate}</div>
                          {ticket.assignedTo && (
                            <div className="mr-auto">
                              <Badge variant="outline" className="bg-primary/10 text-primary">
                                {ticket.assignedTo}
                              </Badge>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {filteredTickets.length === 0 && (
            <div className="glass p-12 rounded-xl border border-border/50 text-center">
              <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">لا توجد تذاكر</h3>
              <p className="text-muted-foreground">لا توجد تذاكر في هذه الفئة</p>
            </div>
          )}
        </div>
      </AppShell>
    </>
  );
}