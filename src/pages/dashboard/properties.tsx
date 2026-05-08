import { useState } from "react";
import { SEO } from "@/components/SEO";
import { AppShell } from "@/components/dashboard/AppShell";
import { PropertyDialog } from "@/components/dashboard/PropertyDialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Plus,
  Eye,
  Pencil,
  Trash2,
  DollarSign,
  Users,
  Percent,
  Filter
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

export default function PropertiesPage() {
  const [filter, setFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);

  const properties = [
    {
      id: 1,
      name: "برج الفيصلية - الرياض",
      location: "الرياض، حي الملقا",
      units: 24,
      occupied: 18,
      available: 6,
      revenue: "456,000",
      occupancy: 75,
      status: "active",
      image: "/property-1.jpg"
    },
    {
      id: 2,
      name: "أجنحة النخيل الفاخرة",
      location: "جدة، الكورنيش",
      image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800",
      units: 16,
      occupied: 14,
      revenue: "SAR 192,300",
      occupancy: 88,
      status: "active",
      type: "سكنية"
    },
    {
      id: 3,
      name: "فلل الواحة",
      location: "الدمام، حي الشاطئ",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
      units: 8,
      occupied: 6,
      revenue: "SAR 156,800",
      occupancy: 75,
      status: "active",
      type: "فلل"
    },
    {
      id: 4,
      name: "شاليهات البحر الأحمر",
      location: "جدة، أبحر الشمالية",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
      units: 12,
      occupied: 8,
      revenue: "SAR 128,400",
      occupancy: 67,
      status: "active",
      type: "شاليهات"
    },
    {
      id: 5,
      name: "مجمع الياسمين السكني",
      location: "الخبر، الكورنيش",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
      units: 32,
      occupied: 28,
      revenue: "SAR 358,200",
      occupancy: 88,
      status: "active",
      type: "سكنية"
    },
    {
      id: 6,
      name: "أبراج المرجان",
      location: "الرياض، حي السليمانية",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800",
      units: 18,
      occupied: 12,
      revenue: "SAR 168,900",
      occupancy: 67,
      status: "maintenance",
      type: "فندقية"
    },
  ];

  const handleDelete = (property: any) => {
    setSelectedProperty(property);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    console.log("Deleting property:", selectedProperty);
    setDeleteDialogOpen(false);
    setSelectedProperty(null);
  };

  const handleView = (property: any) => {
    setSelectedProperty(property);
    setViewDialogOpen(true);
  };

  const handleEdit = (property: any) => {
    setSelectedProperty(property);
    setEditDialogOpen(true);
  };

  return (
    <>
      <SEO title="العقارات - داريوم" />
      <AppShell>
        <div className="space-y-6">
          {/* Header with Add Button */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-foreground">العقارات</h1>
              <p className="text-muted-foreground">إدارة جميع العقارات والمجمعات</p>
            </div>
            <Button 
              className="gradient-primary"
              onClick={() => setDialogOpen(true)}
            >
              <Plus className="w-5 h-5 ml-2" />
              إضافة عقار جديد
            </Button>
          </div>

          {/* KPIs */}
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { label: "إجمالي العقارات", value: "6", icon: Building2, color: "from-primary to-secondary" },
              { label: "إجمالي الوحدات", value: "110", icon: Home, color: "from-blue-500 to-cyan-500" },
              { label: "متوسط الإشغال", value: "77%", icon: TrendingUp, color: "from-emerald-500 to-green-500" },
              { label: "الإيراد الشهري", value: "SAR 1.29M", icon: TrendingUp, color: "from-amber-500 to-orange-500" },
            ].map((stat, index) => (
              <div key={index} className="glass rounded-xl p-6">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} p-3 mb-3`}>
                  <stat.icon className="w-full h-full text-white" />
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
                  placeholder="البحث عن عقار..."
                  className="pr-10"
                />
              </div>
              <Select defaultValue="all" onValueChange={setFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل الحالات</SelectItem>
                  <SelectItem value="active">نشط</SelectItem>
                  <SelectItem value="maintenance">صيانة</SelectItem>
                  <SelectItem value="inactive">غير نشط</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل الأنواع</SelectItem>
                  <SelectItem value="hotel">فندقية</SelectItem>
                  <SelectItem value="residential">سكنية</SelectItem>
                  <SelectItem value="villas">فلل</SelectItem>
                  <SelectItem value="chalets">شاليهات</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Properties Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div
                key={property.id}
                className="glass rounded-2xl overflow-hidden border border-border/50 hover:shadow-2xl transition-all duration-300 group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant={property.status === "active" ? "default" : "secondary"}>
                      {property.status === "active" ? "نشط" : "صيانة"}
                    </Badge>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge variant="outline" className="bg-white/90">
                      {property.type}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {property.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{property.location}</span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4 pt-4 border-t border-border/50">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">الوحدات</div>
                      <div className="text-lg font-bold text-foreground">{property.units}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">مشغولة</div>
                      <div className="text-lg font-bold text-available">{property.occupied}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">الإشغال</div>
                      <div className="text-lg font-bold text-primary">{property.occupancy}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">الإيراد</div>
                      <div className="text-sm font-bold text-foreground">{property.revenue}</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-6 border-t border-border/50 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleView(property)}
                    >
                      <Eye className="w-4 h-4 ml-2" />
                      عرض
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleEdit(property)}
                    >
                      <Pencil className="w-4 h-4 ml-2" />
                      تعديل
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(property)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Property Dialog */}
        <PropertyDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          mode="add"
        />

        {/* View Property Dialog */}
        <PropertyDialog
          open={viewDialogOpen}
          onOpenChange={setViewDialogOpen}
          mode="view"
          property={selectedProperty}
        />

        {/* Edit Property Dialog */}
        <PropertyDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          mode="edit"
          property={selectedProperty}
        />

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>هل أنت متأكد من الحذف؟</AlertDialogTitle>
              <AlertDialogDescription>
                سيتم حذف العقار "{selectedProperty?.name}" نهائياً. هذا الإجراء لا يمكن التراجع عنه.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>إلغاء</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDelete}
                className="bg-destructive hover:bg-destructive/90"
              >
                حذف
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </AppShell>
    </>
  );
}