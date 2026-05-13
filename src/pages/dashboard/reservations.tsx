import { useState, useEffect } from "react";
import { SEO } from "@/components/SEO";
import { AppShell } from "@/components/dashboard/AppShell";
import { ReservationDialog } from "@/components/dashboard/ReservationDialog";
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
  Download,
  Plus,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function ReservationsPage() {
  const { toast } = useToast();
  const [filter, setFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<any>(null);
  const [reservations, setReservations] = useState<any[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch reservations from Supabase
  const fetchReservations = async () => {
    const { data, error } = await supabase
      .from("reservations")
      .select(`
        *,
        units (
          id,
          name,
          properties (
            id,
            name,
            name_ar
          )
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching reservations:", error);
      toast({
        title: "❌ خطأ في تحميل البيانات",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setReservations(data || []);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const filteredReservations = filter === "all" 
    ? reservations 
    : reservations.filter(r => r.status === filter);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "confirmed": return <Badge className="bg-primary">مؤكد</Badge>;
      case "pending": return <Badge className="bg-amber-500">قيد الانتظار</Badge>;
      case "checked_in": return <Badge className="bg-blue-500">حالي</Badge>;
      case "checked_out": return <Badge className="bg-emerald-500">منتهي</Badge>;
      case "cancelled": return <Badge variant="destructive">ملغي</Badge>;
      default: return <Badge variant="outline">غير معروف</Badge>;
    }
  };

  const getChannelBadge = (channel: string) => {
    switch(channel) {
      case "airbnb": return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Airbnb</Badge>;
      case "booking": return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">Booking.com</Badge>;
      case "direct": return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">مباشر</Badge>;
      case "agoda": return <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">Agoda</Badge>;
      case "vrbo": return <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-200">Vrbo</Badge>;
      default: return <Badge variant="outline">{channel}</Badge>;
    }
  };

  const calculateNights = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  const handleView = (reservation: any) => {
    setSelectedReservation(reservation);
    setViewDialogOpen(true);
  };

  const handleEdit = (reservation: any) => {
    setSelectedReservation(reservation);
    setEditDialogOpen(true);
  };

  const handleDelete = (reservation: any) => {
    setSelectedReservation(reservation);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from("reservations")
        .delete()
        .eq("id", selectedReservation.id);

      if (error) throw error;

      toast({
        title: "✅ تم الحذف بنجاح",
        description: `تم حذف حجز "${selectedReservation.guest_name}" من قائمة الحجوزات`,
      });

      await fetchReservations();
    } catch (error: any) {
      console.error("Delete error:", error);
      toast({
        title: "❌ فشل الحذف",
        description: error.message || "حدث خطأ أثناء حذف الحجز",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setSelectedReservation(null);
    }
  };

  const handleSuccess = () => {
    fetchReservations();
  };

  const handleExport = () => {
    toast({
      title: "جاري التصدير...",
      description: "سيتم تحميل ملف Excel قريباً.",
    });
  };

  return (
    <>
      <SEO title="الحجوزات - داريوم" />
      <AppShell>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-foreground">الحجوزات</h1>
              <p className="text-muted-foreground">إدارة جميع حجوزات العقارات</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleExport}>
                <Download className="w-5 h-5 ml-2" />
                تصدير
              </Button>
              <Button className="gradient-primary" onClick={() => setDialogOpen(true)}>
                <Plus className="w-5 h-5 ml-2" />
                إضافة حجز يدوي
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="glass rounded-xl p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  placeholder="البحث في الحجوزات..."
                  className="pr-10"
                />
              </div>
              <Select defaultValue="all" onValueChange={setFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل الحجوزات</SelectItem>
                  <SelectItem value="confirmed">مؤكد</SelectItem>
                  <SelectItem value="pending">قيد الانتظار</SelectItem>
                  <SelectItem value="current">حالي</SelectItem>
                  <SelectItem value="completed">منتهي</SelectItem>
                  <SelectItem value="cancelled">ملغي</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Reservations Table */}
          <div className="glass rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr className="text-right">
                    <th className="p-4 font-bold text-foreground">#</th>
                    <th className="p-4 font-bold text-foreground">الضيف</th>
                    <th className="p-4 font-bold text-foreground">العقار / الوحدة</th>
                    <th className="p-4 font-bold text-foreground">تسجيل الدخول</th>
                    <th className="p-4 font-bold text-foreground">تسجيل الخروج</th>
                    <th className="p-4 font-bold text-foreground">الليالي</th>
                    <th className="p-4 font-bold text-foreground">المبلغ</th>
                    <th className="p-4 font-bold text-foreground">الحالة</th>
                    <th className="p-4 font-bold text-foreground">القناة</th>
                    <th className="p-4 font-bold text-foreground">إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReservations.map((reservation) => (
                    <tr key={reservation.id} className="border-t border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="p-4 text-muted-foreground">{reservation.reservation_code || reservation.id?.substring(0,8)}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            {reservation.guest_name?.charAt(0) || '?'}
                          </div>
                          <div>
                            <div className="font-semibold text-foreground">{reservation.guest_name}</div>
                            <div className="text-sm text-muted-foreground">{reservation.guest_count} ضيف</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-foreground">{reservation.units?.properties?.name_ar || reservation.units?.properties?.name || 'غير محدد'}</div>
                        <div className="text-sm text-muted-foreground">{reservation.units?.name || 'غير محدد'}</div>
                      </td>
                      <td className="p-4 text-foreground">{reservation.check_in}</td>
                      <td className="p-4 text-foreground">{reservation.check_out}</td>
                      <td className="p-4 text-foreground font-semibold">{reservation.nights}</td>
                      <td className="p-4 text-foreground font-bold">﷼{reservation.total_amount}</td>
                      <td className="p-4">{getStatusBadge(reservation.status)}</td>
                      <td className="p-4">{getChannelBadge(reservation.channel)}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleView(reservation)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(reservation)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDelete(reservation)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Dialogs with onSuccess callback */}
        <ReservationDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          mode="add"
          onSuccess={handleSuccess}
        />

        <ReservationDialog
          open={viewDialogOpen}
          onOpenChange={setViewDialogOpen}
          mode="view"
          reservation={selectedReservation}
        />

        <ReservationDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          mode="edit"
          reservation={selectedReservation}
          onSuccess={handleSuccess}
        />

        {/* Delete Confirmation */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>هل أنت متأكد من الحذف؟</AlertDialogTitle>
              <AlertDialogDescription>
                سيتم حذف الحجز للضيف "{selectedReservation?.guest_name}" نهائياً.
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