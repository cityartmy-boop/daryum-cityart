import { useState } from "react";
import { SEO } from "@/components/SEO";
import { AppShell } from "@/components/dashboard/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Home, 
  Search, 
  Plus, 
  MapPin,
  BedDouble,
  Users,
  Eye,
  Edit,
  MoreVertical,
  DoorOpen
} from "lucide-react";
import { useRole } from "@/contexts/RoleContext";

export default function UnitsPage() {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const { hasPermission } = useRole();

  // Mock units data
  const units = [
    {
      id: 1,
      property: "برج الفيصلية",
      name: "جناح 101",
      type: "غرفتين وصالة",
      capacity: 4,
      beds: 2,
      price: "SAR 450",
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
      price: "SAR 300",
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
      price: "SAR 850",
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
      price: "SAR 500",
      status: "maintenance",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    },
  ];

  const filteredUnits = filterStatus === "all" 
    ? units 
    : units.filter(u => u.status === filterStatus);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "available": return <Badge className="bg-available">متاح</Badge>;
      case "occupied": return <Badge className="bg-occupied">مشغول</Badge>;
      case "cleaning": return <Badge className="bg-cleaning">تنظيف</Badge>;
      case "maintenance": return <Badge className="bg-maintenance">صيانة</Badge>;
      default: return <Badge>غير معروف</Badge>;
    }
  };

  return (
    <>
      <SEO title="الوحدات - داريوم" />
      <AppShell>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">الوحدات</h1>
              <p className="text-muted-foreground">
                إدارة ومتابعة جميع الوحدات السكنية وحالاتها
              </p>
            </div>
            {hasPermission("canManageUnits") && (
              <Button className="gradient-primary gap-2">
                <Plus className="w-4 h-4" />
                إضافة وحدة جديدة
              </Button>
            )}
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
              <Select defaultValue="all" onValueChange={setFilterStatus}>
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
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                        <Eye className="w-4 h-4" />
                      </Button>
                      {hasPermission("canManageUnits") && (
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                          <Edit className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AppShell>
    </>
  );
}