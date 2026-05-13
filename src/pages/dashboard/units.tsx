import { useState, useEffect } from "react";
import { SEO } from "@/components/SEO";
import { AppShell } from "@/components/dashboard/AppShell";
import { UnitDialog } from "@/components/dashboard/UnitDialog";
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
  Home,
  Plus,
  Eye,
  Pencil,
  Trash2,
  Filter,
  Search,
  DoorOpen,
  Users,
  BedDouble,
  Edit
} from "lucide-react";
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
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function UnitsPage() {
  const { toast } = useToast();
  const [filter, setFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<any>(null);
  const [units, setUnits] = useState<any[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch units from Supabase
  const fetchUnits = async () => {
    const { data, error } = await supabase
      .from("units")
      .select(`
        *,
        properties (
          id,
          name,
          name_ar
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching units:", error);
      toast({
        title: "❌ خطأ في تحميل البيانات",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setUnits(data || []);
    }
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  const filteredUnits = filter === "all" 
    ? units 
    : units.filter(u => u.status === filter);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "available": return <Badge className="bg-available">متاح</Badge>;
      case "occupied": return <Badge className="bg-occupied">مشغول</Badge>;
      case "cleaning": return <Badge className="bg-cleaning">تنظيف</Badge>;
      case "maintenance": return <Badge className="bg-maintenance">صيانة</Badge>;
      default: return <Badge>غير معروف</Badge>;
    }
  };

  const handleDelete = (unit: any) => {
    setSelectedUnit(unit);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from("units")
        .delete()
        .eq("id", selectedUnit.id);

      if (error) throw error;

      toast({
        title: "✅ تم الحذف بنجاح",
        description: `تم حذف "${selectedUnit.name}" من قائمة الوحدات`,
      });

      await fetchUnits();
    } catch (error: any) {
      console.error("Delete error:", error);
      toast({
        title: "❌ فشل الحذف",
        description: error.message || "حدث خطأ أثناء حذف الوحدة",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setSelectedUnit(null);
    }
  };

  const handleView = (unit: any) => {
    setSelectedUnit(unit);
    setViewDialogOpen(true);
  };

  const handleEdit = (unit: any) => {
    setSelectedUnit(unit);
    setEditDialogOpen(true);
  };

  const handleSuccess = () => {
    fetchUnits();
  };

  return (
    <>
      <SEO title="الوحدات - داريوم" />
      <AppShell>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-foreground">الوحدات</h1>
              <p className="text-muted-foreground">إدارة جميع الوحدات والشقق</p>
            </div>
            <Button 
              className="gradient-primary"
              onClick={() => setDialogOpen(true)}
            >
              <Plus className="w-5 h-5 ml-2" />
              إضافة وحدة جديدة
            </Button>
          </div>

          {/* Filters */}
          <div className="glass rounded-xl p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  placeholder="البحث برقم الوحدة، العقار..."
                  className="pr-10"
                />
              </div>
              <Select defaultValue="all" onValueChange={setFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل الحالات</SelectItem>
                  <SelectItem value="available">متاح</SelectItem>
                  <SelectItem value="occupied">مشغول</SelectItem>
                  <SelectItem value="cleaning">تنظيف</SelectItem>
                  <SelectItem value="maintenance">صيانة</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Units Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {filteredUnits.map((unit) => (
              <div
                key={unit.id}
                className="glass rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 border border-border/50 hover:border-primary/30"
              >
                <div className="relative h-40 overflow-hidden bg-muted flex items-center justify-center">
                  {unit.images && unit.images.length > 0 ? (
                    <img 
                      src={unit.images[0]}
                      alt={unit.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <Home className="w-12 h-12 text-muted-foreground/30" />
                  )}
                  <div className="absolute top-3 right-3">
                    {getStatusBadge(unit.status)}
                  </div>
                </div>

                <div className="p-5">
                  <div className="text-xs text-primary font-semibold mb-1">{unit.properties?.name_ar || unit.properties?.name || 'بدون عقار'}</div>
                  <h3 className="text-lg font-bold text-foreground mb-3">{unit.name}</h3>
                  
                  <div className="flex flex-wrap gap-3 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <DoorOpen className="w-4 h-4" />
                      <span>{unit.type === 'studio' ? 'استديو' : unit.type === '1br' ? 'غرفة وصالة' : unit.type}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4" />
                      <span>{unit.max_guests} ضيوف</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BedDouble className="w-4 h-4" />
                      <span>{unit.bedrooms} أسرة</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div>
                      <span className="text-xs text-muted-foreground block">السعر في الليلة</span>
                      <span className="font-bold text-foreground">{unit.price_per_night} ﷼</span>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => handleView(unit)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => handleEdit(unit)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={() => handleDelete(unit)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dialogs */}
        <UnitDialog open={dialogOpen} onOpenChange={setDialogOpen} mode="add" />
        <UnitDialog open={viewDialogOpen} onOpenChange={setViewDialogOpen} mode="view" unit={selectedUnit} />
        <UnitDialog open={editDialogOpen} onOpenChange={setEditDialogOpen} mode="edit" unit={selectedUnit} />

        {/* Delete Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>هل أنت متأكد من الحذف؟</AlertDialogTitle>
              <AlertDialogDescription>
                سيتم حذف الوحدة "{selectedUnit?.name}" نهائياً.
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