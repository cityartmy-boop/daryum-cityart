import { useState } from "react";
import { SEO } from "@/components/SEO";
import { AppShell } from "@/components/dashboard/AppShell";
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
  Plus,
  Wrench,
  AlertTriangle,
  Clock,
  DollarSign,
  User,
  Building2,
  CheckCircle2
} from "lucide-react";

export default function MaintenancePage() {
  const [statusFilter, setStatusFilter] = useState("all");

  const tickets = [
    {
      id: 1,
      title: "تسرب مياه في الحمام",
      unit: "جناح 101",
      property: "برج الفيصلية",
      severity: "high",
      status: "open",
      assignedTo: "محمد علي",
      createdAt: "2026-05-08 09:00",
      estimatedCost: "﷼ 450",
      sla: "2 ساعات",
      description: "تسرب مياه من خزان المرحاض الرئيسي"
    },
    {
      id: 2,
      title: "عطل في مكيف الهواء",
      unit: "فيلا A1",
      property: "أجنحة النخيل",
      severity: "medium",
      status: "in_progress",
      assignedTo: "أحمد خالد",
      createdAt: "2026-05-08 08:00",
      estimatedCost: "﷼ 850",
      sla: "4 ساعات",
      description: "المكيف لا يبرد بشكل كافٍ"
    },
    {
      id: 3,
      title: "باب خزانة مكسور",
      unit: "شقة B2",
      property: "فلل الواحة",
      severity: "low",
      status: "completed",
      assignedTo: "سعيد محمد",
      createdAt: "2026-05-07 14:00",
      estimatedCost: "﷼ 250",
      sla: "24 ساعة",
      completedAt: "2026-05-07 16:30",
      description: "باب خزانة غرفة النوم بحاجة لإصلاح"
    },
    {
      id: 4,
      title: "مشكلة في الكهرباء",
      unit: "جناح 205",
      property: "برج الفيصلية",
      severity: "high",
      status: "open",
      assignedTo: null,
      createdAt: "2026-05-08 10:30",
      estimatedCost: "﷼ 600",
      sla: "1 ساعة",
      description: "انقطاع متقطع في التيار الكهربائي"
    },
  ];

  const filteredTickets = statusFilter === "all" 
    ? tickets 
    : tickets.filter(t => t.status === statusFilter);

  const getSeverityBadge = (severity: string) => {
    switch(severity) {
      case "high": return <Badge variant="destructive">عاجل</Badge>;
      case "medium": return <Badge className="bg-amber-500">متوسط</Badge>;
      case "low": return <Badge variant="outline">منخفض</Badge>;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "open": return <Badge className="bg-primary">مفتوح</Badge>;
      case "in_progress": return <Badge className="bg-blue-500">قيد التنفيذ</Badge>;
      case "completed": return <Badge className="bg-available">مكتمل</Badge>;
      case "on_hold": return <Badge className="bg-amber-500">معلق</Badge>;
      default: return <Badge variant="outline">غير معروف</Badge>;
    }
  };

  const stats = [
    { label: "التذاكر المفتوحة", value: "2", color: "from-primary to-secondary" },
    { label: "قيد التنفيذ", value: "1", color: "from-blue-500 to-cyan-500" },
    { label: "المكتملة اليوم", value: "1", color: "from-available to-emerald-500" },
    { label: "إجمالي التكاليف", value: "﷼ 2,150", color: "from-amber-500 to-orange-500" },
  ];

  return (
    <>
      <SEO title="الصيانة - داريوم" />
      <AppShell>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-foreground">الصيانة</h1>
              <p className="text-muted-foreground">إدارة طلبات الصيانة والأعطال</p>
            </div>
            <Button className="gradient-primary">
              <Plus className="w-5 h-5 ml-2" />
              إضافة طلب صيانة
            </Button>
          </div>

          {/* KPIs */}
          <div className="grid md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="glass rounded-xl p-6">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} p-3 mb-3`}>
                  <Wrench className="w-full h-full text-white" />
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
                  placeholder="البحث في طلبات الصيانة..."
                  className="pr-10"
                />
              </div>
              <Select defaultValue="all" onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل الحالات</SelectItem>
                  <SelectItem value="open">مفتوح</SelectItem>
                  <SelectItem value="in_progress">قيد التنفيذ</SelectItem>
                  <SelectItem value="completed">مكتمل</SelectItem>
                  <SelectItem value="on_hold">معلق</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="الأولوية" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل الأولويات</SelectItem>
                  <SelectItem value="high">عاجل</SelectItem>
                  <SelectItem value="medium">متوسط</SelectItem>
                  <SelectItem value="low">منخفض</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tickets List */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="glass rounded-xl p-6 border border-border/50 hover:shadow-xl transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-muted-foreground">#{ticket.id}</span>
                      {getSeverityBadge(ticket.severity)}
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-1">{ticket.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building2 className="w-4 h-4" />
                      <span>{ticket.unit} - {ticket.property}</span>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="mb-4">
                  {getStatusBadge(ticket.status)}
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {ticket.description}
                </p>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">
                        {ticket.assignedTo || "لم يُعيّن بعد"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">SLA: {ticket.sla}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span className="font-bold text-foreground">{ticket.estimatedCost}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {ticket.createdAt}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-border/50">
                  {ticket.status === "open" && (
                    <Button size="sm" className="flex-1 gradient-primary">
                      تعيين فني
                    </Button>
                  )}
                  {ticket.status === "in_progress" && (
                    <Button size="sm" className="flex-1 bg-available hover:bg-available/90">
                      <CheckCircle2 className="w-4 h-4 ml-2" />
                      إتمام
                    </Button>
                  )}
                  <Button size="sm" variant="outline" className="flex-1">
                    عرض التفاصيل
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AppShell>
    </>
  );
}