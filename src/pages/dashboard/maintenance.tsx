import { useState, useEffect } from "react";
import { SEO } from "@/components/SEO";
import { AppShell } from "@/components/dashboard/AppShell";
import { MaintenanceDialog } from "@/components/dashboard/MaintenanceDialog";
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
  Wrench,
  Clock,
  DollarSign,
  User,
  Building2,
  Eye,
  Pencil,
  Trash2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function MaintenancePage() {
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [tickets, setTickets] = useState<any[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchTickets = async () => {
    const { data, error } = await supabase
      .from("maintenance_tickets")
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
      console.error("Error fetching tickets:", error);
      toast({
        title: "❌ خطأ في تحميل البيانات",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setTickets(data || []);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const filteredTickets = statusFilter === "all" 
    ? tickets 
    : tickets.filter(t => t.status === statusFilter);

  const getSeverityBadge = (severity: string) => {
    switch(severity) {
      case "critical": return <Badge variant="destructive">حرج</Badge>;
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
      case "resolved": return <Badge className="bg-available">تم الحل</Badge>;
      case "closed": return <Badge variant="outline">مغلق</Badge>;
      default: return <Badge variant="outline">غير معروف</Badge>;
    }
  };

  const handleView = (ticket: any) => {
    setSelectedTicket(ticket);
    setViewDialogOpen(true);
  };

  const handleEdit = (ticket: any) => {
    setSelectedTicket(ticket);
    setEditDialogOpen(true);
  };

  const handleDelete = (ticket: any) => {
    setSelectedTicket(ticket);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from("maintenance_tickets")
        .delete()
        .eq("id", selectedTicket.id);

      if (error) throw error;

      toast({
        title: "✅ تم الحذف بنجاح",
        description: "تم حذف طلب الصيانة",
      });

      await fetchTickets();
    } catch (error: any) {
      console.error("Delete error:", error);
      toast({
        title: "❌ فشل الحذف",
        description: error.message || "حدث خطأ أثناء حذف الطلب",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setSelectedTicket(null);
    }
  };

  const handleSuccess = () => {
    fetchTickets();
  };

  const stats = [
    { label: "التذاكر المفتوحة", value: tickets.filter(t => t.status === "open").length, color: "from-primary to-secondary" },
    { label: "قيد التنفيذ", value: tickets.filter(t => t.status === "in_progress").length, color: "from-blue-500 to-cyan-500" },
    { label: "تم الحل", value: tickets.filter(t => t.status === "resolved").length, color: "from-available to-emerald-500" },
    { label: "إجمالي الطلبات", value: tickets.length, color: "from-amber-500 to-orange-500" },
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
            <Button className="gradient-primary" onClick={() => setDialogOpen(true)}>
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
                  <SelectItem value="resolved">تم الحل</SelectItem>
                  <SelectItem value="closed">مغلق</SelectItem>
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
                      <span className="text-sm text-muted-foreground">#{ticket.id.substring(0, 8)}</span>
                      {getSeverityBadge(ticket.severity)}
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-1">{ticket.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building2 className="w-4 h-4" />
                      <span>{ticket.units?.name || 'وحدة محذوفة'} - {ticket.units?.properties?.name_ar || ticket.units?.properties?.name || 'عقار محذوف'}</span>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="mb-4">
                  {getStatusBadge(ticket.status)}
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {ticket.description || "لا يوجد وصف"}
                </p>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">
                        {ticket.users?.full_name || "لم يُعيّن بعد"}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span className="font-bold text-foreground">﷼{ticket.estimated_cost || 0}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-border/50">
                  <Button size="sm" variant="ghost" onClick={() => handleView(ticket)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleEdit(ticket)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-destructive" onClick={() => handleDelete(ticket)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dialogs */}
        <MaintenanceDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          mode="add"
          onSuccess={handleSuccess}
        />

        <MaintenanceDialog
          open={viewDialogOpen}
          onOpenChange={setViewDialogOpen}
          mode="view"
          ticket={selectedTicket}
        />

        <MaintenanceDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          mode="edit"
          ticket={selectedTicket}
          onSuccess={handleSuccess}
        />

        {/* Delete Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>هل أنت متأكد من الحذف؟</AlertDialogTitle>
              <AlertDialogDescription>
                سيتم حذف طلب الصيانة "{selectedTicket?.title}" نهائياً.
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