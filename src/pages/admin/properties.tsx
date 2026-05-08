import { useState } from "react";
import { SEO } from "@/components/SEO";
import { AdminLayout } from "@/components/admin/AdminLayout";
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
  Download,
  Building2,
  MapPin
} from "lucide-react";

export default function AdminPropertiesPage() {
  const [filter, setFilter] = useState("all");

  const properties = [
    {
      id: 1,
      name: "برج الفيصلية",
      type: "أبراج",
      owner: "داريوم الرياض",
      location: "الرياض، العليا",
      units: 24,
      occupied: 18,
      revenue: "﷼ 456,000",
      manager: "أحمد السعيد",
      status: "active"
    },
    {
      id: 2,
      name: "أجنحة النخيل",
      type: "أجنحة فندقية",
      owner: "مجموعة النخيل",
      location: "جدة، الكورنيش",
      units: 16,
      occupied: 12,
      revenue: "﷼ 392,300",
      manager: "فاطمة المالكي",
      status: "active"
    },
    {
      id: 3,
      name: "فلل الواحة",
      type: "فلل",
      owner: "عقارات الواحة",
      location: "الرياض، الملقا",
      units: 8,
      occupied: 6,
      revenue: "﷼ 358,200",
      manager: "خالد العتيبي",
      status: "maintenance"
    },
    {
      id: 4,
      name: "مجمع الياسمين",
      type: "شقق سكنية",
      owner: "فلل الدوسري",
      location: "الدمام، الشاطئ",
      units: 12,
      occupied: 4,
      revenue: "﷼ 312,800",
      manager: "نورة الدوسري",
      status: "inactive"
    },
  ];

  const stats = [
    { label: "إجمالي العقارات", value: "248", color: "from-primary to-secondary" },
    { label: "عقارات نشطة", value: "186", color: "from-emerald-500 to-green-500" },
    { label: "إجمالي الوحدات", value: "1,842", color: "from-blue-500 to-cyan-500" },
    { label: "إجمالي الإيراد", value: "﷼ 8.4M", color: "from-amber-500 to-orange-500" },
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "active": return <Badge className="bg-available">نشط</Badge>;
      case "maintenance": return <Badge className="bg-amber-500">صيانة</Badge>;
      case "inactive": return <Badge variant="outline">غير نشط</Badge>;
      default: return <Badge variant="outline">غير معروف</Badge>;
    }
  };

  return (
    <>
      <SEO title="إدارة العقارات - Admin" />
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-foreground">إدارة جميع العقارات</h1>
              <p className="text-muted-foreground">عرض وإدارة عقارات جميع العملاء</p>
            </div>
            <Button variant="outline">
              <Download className="w-5 h-5 ml-2" />
              تصدير
            </Button>
          </div>

          {/* KPIs */}
          <div className="grid md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="glass rounded-xl p-6">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} p-3 mb-3`}>
                  <Building2 className="w-full h-full text-white" />
                </div>
                <div className="text-2xl font-bold text-foreground tabular-nums mb-1">{stat.value}</div>
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
                  placeholder="البحث في العقارات..."
                  className="pr-10"
                />
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="w-4 h-4 ml-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل العقارات</SelectItem>
                  <SelectItem value="active">نشط</SelectItem>
                  <SelectItem value="maintenance">صيانة</SelectItem>
                  <SelectItem value="inactive">غير نشط</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Properties Table */}
          <div className="glass rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr className="text-right">
                    <th className="p-4 font-bold text-foreground">العقار</th>
                    <th className="p-4 font-bold text-foreground">النوع</th>
                    <th className="p-4 font-bold text-foreground">المالك</th>
                    <th className="p-4 font-bold text-foreground">الموقع</th>
                    <th className="p-4 font-bold text-foreground">الوحدات</th>
                    <th className="p-4 font-bold text-foreground">الإشغال</th>
                    <th className="p-4 font-bold text-foreground">الإيراد الشهري</th>
                    <th className="p-4 font-bold text-foreground">المدير</th>
                    <th className="p-4 font-bold text-foreground">الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((property) => (
                    <tr key={property.id} className="border-t border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div className="font-semibold text-foreground">{property.name}</div>
                        <div className="text-xs text-muted-foreground">ID: {property.id}</div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline">{property.type}</Badge>
                      </td>
                      <td className="p-4 text-muted-foreground">{property.owner}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{property.location}</span>
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-foreground">{property.units}</td>
                      <td className="p-4">
                        <div className="font-semibold text-foreground">{property.occupied}/{property.units}</div>
                        <div className="text-xs text-muted-foreground">
                          {Math.round((property.occupied / property.units) * 100)}%
                        </div>
                      </td>
                      <td className="p-4 font-bold text-primary tabular-nums">{property.revenue}</td>
                      <td className="p-4 text-muted-foreground">{property.manager}</td>
                      <td className="p-4">{getStatusBadge(property.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Property Types Distribution */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-xl font-bold text-foreground mb-6">توزيع أنواع العقارات</h3>
            <div className="space-y-4">
              {[
                { type: "أبراج", count: 89, percent: 35.9, color: "bg-primary" },
                { type: "أجنحة فندقية", count: 64, percent: 25.8, color: "bg-blue-500" },
                { type: "شقق سكنية", count: 52, percent: 21.0, color: "bg-emerald-500" },
                { type: "فلل", count: 43, percent: 17.3, color: "bg-amber-500" },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">{item.type}</span>
                    <div className="text-left">
                      <div className="font-bold text-foreground">{item.count} عقار</div>
                      <div className="text-xs text-muted-foreground">{item.percent}%</div>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.color} transition-all`}
                      style={{ width: `${item.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}