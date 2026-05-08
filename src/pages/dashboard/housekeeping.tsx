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
  Filter,
  Plus,
  CheckCircle2,
  Clock,
  AlertCircle,
  User,
  Building2,
  Calendar
} from "lucide-react";

export default function HousekeepingPage() {
  const [statusFilter, setStatusFilter] = useState("all");

  const tasks = [
    {
      id: 1,
      unit: "جناح 101",
      property: "برج الفيصلية",
      type: "تنظيف كامل",
      status: "pending",
      assignedTo: "فاطمة أحمد",
      checkOut: "2026-05-08 11:00",
      checkIn: "2026-05-08 15:00",
      priority: "high",
      estimatedTime: "45 دقيقة"
    },
    {
      id: 2,
      unit: "فيلا A1",
      property: "أجنحة النخيل",
      type: "تنظيف سريع",
      status: "in_progress",
      assignedTo: "نورة محمد",
      checkOut: "2026-05-08 12:00",
      checkIn: "2026-05-08 14:00",
      priority: "medium",
      estimatedTime: "30 دقيقة"
    },
    {
      id: 3,
      unit: "شقة B2",
      property: "فلل الواحة",
      type: "تنظيف كامل",
      status: "completed",
      assignedTo: "مريم عبدالله",
      checkOut: "2026-05-07 11:00",
      checkIn: "2026-05-07 15:00",
      priority: "low",
      estimatedTime: "50 دقيقة",
      completedAt: "2026-05-07 13:45"
    },
    {
      id: 4,
      unit: "جناح 205",
      property: "برج الفيصلية",
      type: "تنظيف عميق",
      status: "pending",
      assignedTo: "سارة خالد",
      checkOut: "2026-05-08 10:00",
      checkIn: "2026-05-08 16:00",
      priority: "high",
      estimatedTime: "90 دقيقة"
    },
  ];

  const filteredTasks = statusFilter === "all" 
    ? tasks 
    : tasks.filter(t => t.status === statusFilter);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "pending": return <Badge className="bg-amber-500">قيد الانتظار</Badge>;
      case "in_progress": return <Badge className="bg-blue-500">جارٍ التنفيذ</Badge>;
      case "completed": return <Badge className="bg-available">مكتمل</Badge>;
      case "delayed": return <Badge variant="destructive">متأخر</Badge>;
      default: return <Badge variant="outline">غير معروف</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case "high": return <Badge variant="destructive" className="text-xs">عاجل</Badge>;
      case "medium": return <Badge className="bg-amber-500 text-xs">متوسط</Badge>;
      case "low": return <Badge variant="outline" className="text-xs">منخفض</Badge>;
      default: return null;
    }
  };

  const stats = [
    { label: "المهام المعلقة", value: "2", color: "from-amber-500 to-orange-500" },
    { label: "قيد التنفيذ", value: "1", color: "from-blue-500 to-cyan-500" },
    { label: "المكتملة اليوم", value: "1", color: "from-available to-emerald-500" },
    { label: "متوسط الوقت", value: "42 دقيقة", color: "from-purple-500 to-pink-500" },
  ];

  return (
    <>
      <SEO title="التنظيف - داريوم" />
      <AppShell>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-foreground">التنظيف</h1>
              <p className="text-muted-foreground">إدارة مهام التنظيف والعاملين</p>
            </div>
            <Button className="gradient-primary">
              <Plus className="w-5 h-5 ml-2" />
              إضافة مهمة جديدة
            </Button>
          </div>

          {/* KPIs */}
          <div className="grid md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="glass rounded-xl p-6">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} p-3 mb-3`}>
                  <CheckCircle2 className="w-full h-full text-white" />
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
                  placeholder="البحث في المهام..."
                  className="pr-10"
                />
              </div>
              <Select defaultValue="all" onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل الحالات</SelectItem>
                  <SelectItem value="pending">قيد الانتظار</SelectItem>
                  <SelectItem value="in_progress">جارٍ التنفيذ</SelectItem>
                  <SelectItem value="completed">مكتمل</SelectItem>
                  <SelectItem value="delayed">متأخر</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="العامل" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل العاملين</SelectItem>
                  <SelectItem value="fatima">فاطمة أحمد</SelectItem>
                  <SelectItem value="noura">نورة محمد</SelectItem>
                  <SelectItem value="maryam">مريم عبدالله</SelectItem>
                  <SelectItem value="sarah">سارة خالد</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tasks List */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="glass rounded-xl p-6 border border-border/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">{task.unit}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building2 className="w-4 h-4" />
                      <span>{task.property}</span>
                    </div>
                  </div>
                  {getPriorityBadge(task.priority)}
                </div>

                {/* Task Type */}
                <div className="mb-4">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    {task.type}
                  </Badge>
                </div>

                {/* Status */}
                <div className="mb-4">
                  {getStatusBadge(task.status)}
                </div>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{task.assignedTo}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">الوقت المتوقع: {task.estimatedTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Check-out: {task.checkOut}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Check-in: {task.checkIn}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-border/50">
                  {task.status === "pending" && (
                    <Button size="sm" className="flex-1 gradient-primary">
                      بدء التنفيذ
                    </Button>
                  )}
                  {task.status === "in_progress" && (
                    <Button size="sm" className="flex-1 bg-available hover:bg-available/90">
                      <CheckCircle2 className="w-4 h-4 ml-2" />
                      إتمام
                    </Button>
                  )}
                  {task.status === "completed" && (
                    <Button size="sm" variant="outline" className="flex-1">
                      عرض التفاصيل
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </AppShell>
    </>
  );
}