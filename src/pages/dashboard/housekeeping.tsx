import { useState, useEffect } from "react";
import { SEO } from "@/components/SEO";
import { AppShell } from "@/components/dashboard/AppShell";
import { HousekeepingDialog } from "@/components/dashboard/HousekeepingDialog";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Search,
  Plus,
  CheckCircle2,
  Clock,
  User,
  Building2,
  Calendar,
  Eye,
  Pencil,
  Trash2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function HousekeepingPage() {
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from("housekeeping_tasks")
      .select(`
        *,
        units (
          id,
          name,
          properties (
            name,
            name_ar
          )
        ),
        users (
          id,
          full_name
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching tasks:", error);
      toast({
        title: "❌ خطأ في تحميل البيانات",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setTasks(data || []);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = statusFilter === "all" 
    ? tasks 
    : tasks.filter(t => t.status === statusFilter);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "pending": return <Badge className="bg-amber-500">قيد الانتظار</Badge>;
      case "in_progress": return <Badge className="bg-blue-500">جارٍ التنفيذ</Badge>;
      case "completed": return <Badge className="bg-available">مكتمل</Badge>;
      default: return <Badge variant="outline">غير معروف</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case "urgent": return <Badge variant="destructive" className="text-xs">عاجل</Badge>;
      case "high": return <Badge className="bg-amber-500 text-xs">عالي</Badge>;
      case "normal": return <Badge variant="outline" className="text-xs">عادي</Badge>;
      case "low": return <Badge variant="outline" className="text-xs">منخفض</Badge>;
      default: return null;
    }
  };

  const handleView = (task: any) => {
    setSelectedTask(task);
    setViewDialogOpen(true);
  };

  const handleEdit = (task: any) => {
    setSelectedTask(task);
    setEditDialogOpen(true);
  };

  const handleDelete = (task: any) => {
    setSelectedTask(task);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from("housekeeping_tasks")
        .delete()
        .eq("id", selectedTask.id);

      if (error) throw error;

      toast({
        title: "✅ تم الحذف بنجاح",
        description: "تم حذف المهمة من قائمة التنظيف",
      });

      await fetchTasks();
    } catch (error: any) {
      console.error("Delete error:", error);
      toast({
        title: "❌ فشل الحذف",
        description: error.message || "حدث خطأ أثناء حذف المهمة",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setSelectedTask(null);
    }
  };

  const handleSuccess = () => {
    fetchTasks();
  };

  const stats = [
    { label: "المهام المعلقة", value: tasks.filter(t => t.status === "pending").length, color: "from-amber-500 to-orange-500" },
    { label: "قيد التنفيذ", value: tasks.filter(t => t.status === "in_progress").length, color: "from-blue-500 to-cyan-500" },
    { label: "المكتملة اليوم", value: tasks.filter(t => t.status === "completed").length, color: "from-available to-emerald-500" },
    { label: "إجمالي المهام", value: tasks.length, color: "from-purple-500 to-pink-500" },
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
            <Button className="gradient-primary" onClick={() => setDialogOpen(true)}>
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
                    <h3 className="text-lg font-bold text-foreground mb-1">{task.units?.name || 'وحدة محذوفة'}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building2 className="w-4 h-4" />
                      <span>{task.units?.properties?.name_ar || task.units?.properties?.name || 'عقار محذوف'}</span>
                    </div>
                  </div>
                  {getPriorityBadge(task.priority)}
                </div>

                {/* Task Type */}
                <div className="mb-4">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    {task.task_type === "cleaning" ? "تنظيف عادي" : task.task_type === "deep_clean" ? "تنظيف عميق" : "فحص"}
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
                    <span className="text-foreground">{task.users?.full_name || "لم يُعيّن"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{task.scheduled_date} {task.scheduled_time}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-border/50">
                  <Button size="sm" variant="ghost" onClick={() => handleView(task)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleEdit(task)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-destructive" onClick={() => handleDelete(task)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dialogs */}
        <HousekeepingDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          mode="add"
          onSuccess={handleSuccess}
        />

        <HousekeepingDialog
          open={viewDialogOpen}
          onOpenChange={setViewDialogOpen}
          mode="view"
          task={selectedTask}
        />

        <HousekeepingDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          mode="edit"
          task={selectedTask}
          onSuccess={handleSuccess}
        />

        {/* Delete Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>هل أنت متأكد من الحذف؟</AlertDialogTitle>
              <AlertDialogDescription>
                سيتم حذف المهمة نهائياً.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>إلغاء</AlertDialogCancel>
              <AlertDialogAction 
                onClick={confirmDelete} 
                disabled={isDeleting}
                className="bg-destructive"
              >
                {isDeleting ? "جاري الحذف..." : "حذف"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </AppShell>
    </>
  );
}