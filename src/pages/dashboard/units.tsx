import { useState } from "react";
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

export default function UnitsPage() {
  const [filter, setFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<any>(null);

  // Mock units data
  const units = [
    {
      id: 1,
      property: "برج الفيصلية",
      name: "جناح 101",
      type: "غرفتين وصالة",
      capacity: 4,
      beds: 2,
      price: "﷼ 450",
      status: "available",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    },
    {
      id: 2,
      property: "برج الفيصلية",
      name: "جناح 102",
      type: "غرفة وصالة",
      capacity: 2,
      beds: 1,
      price: "﷼ 300",
      status: "occupied",
      image: "https://images.unsplash.com/photo-1502672260266-1c1de24220e8?w=800",
    },
    {
      id: 3,
      property: "أجنحة النخيل",
      name: "فيلا A1",
      type: "3 غرف وصالة",
      capacity: 6,
      beds: 3,
      price: "﷼ 850",
      status: "cleaning",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    },
    {
      id: 4,
      property: "أجنحة النخيل",
      name: "شقة B2",
      type: "غرفتين وصالة",
      capacity: 4,
      beds: 2,
      price: "﷼ 500",
      status: "maintenance",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    },
  ];

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

  const confirmDelete = () => {
    console.log("Deleting unit:", selectedUnit);
    setDeleteDialogOpen(false);
    setSelectedUnit(null);
  };

  const handleView = (unit: any) => {
    setSelectedUnit(unit);
    setViewDialogOpen(true);
  };

  const handleEdit = (unit: any) => {
    setSelectedUnit(unit);
    setEditDialogOpen(true);
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
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={unit.image}
                    alt={unit.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    {getStatusBadge(unit.status)}
                  </div>
                </div>

                <div className="p-5">
                  <div className="text-xs text-primary font-semibold mb-1">{unit.property}</div>
                  <h3 className="text-lg font-bold text-foreground mb-3">{unit.name}</h3>
                  
                  <div className="flex flex-wrap gap-3 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <DoorOpen className="w-4 h-4" />
                      <span>{unit.type}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4" />
                      <span>{unit.capacity} ضيوف</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BedDouble className="w-4 h-4" />
                      <span>{unit.beds} أسرة</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div>
                      <span className="text-xs text-muted-foreground block">السعر في الليلة</span>
                      <span className="font-bold text-foreground">{unit.price}</span>
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
              <AlertDialogCancel>إلغاء</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-destructive">
                حذف
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </AppShell>
    </>
  );
}