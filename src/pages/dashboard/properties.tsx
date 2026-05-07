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
  Building2, 
  Search, 
  Plus, 
  MapPin,
  Home,
  TrendingUp,
  Eye,
  Edit,
  MoreVertical
} from "lucide-react";

export default function PropertiesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Mock properties data
  const properties = [
    {
      id: 1,
      name: "برج الفيصلية للأجنحة الفندقية",
      location: "الرياض، حي العليا",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
      units: 24,
      occupied: 18,
      revenue: "SAR 284,500",
      occupancy: 75,
      status: "active",
      type: "فندقية"
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

  const filteredProperties = filterStatus === "all" 
    ? properties 
    : properties.filter(p => p.status === filterStatus);

  return (
    <>
      <SEO title="العقارات - داريوم" />
      <AppShell>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">العقارات</h1>
              <p className="text-muted-foreground">
                إدارة جميع العقارات المسجّلة في المنصّة
              </p>
            </div>
            <Button className="gradient-primary gap-2">
              <Plus className="w-4 h-4" />
              إضافة عقار جديد
            </Button>
          </div>

          {/* Stats */}
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
              <Select defaultValue="all" onValueChange={setFilterStatus}>
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
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                className="glass rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
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
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 ml-2" />
                      عرض
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-4 h-4 ml-2" />
                      تعديل
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
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