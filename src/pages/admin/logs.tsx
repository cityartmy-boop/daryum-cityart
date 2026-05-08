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
  FileText,
  User,
  Calendar,
  Activity
} from "lucide-react";

export default function AdminLogsPage() {
  const [filter, setFilter] = useState("all");

  const logs = [
    {
      id: 1,
      timestamp: "2026-05-08 14:23:15",
      user: "أحمد السعيد",
      userRole: "Admin",
      action: "created",
      resource: "property",
      resourceName: "برج الفيصلية",
      details: "تم إضافة عقار جديد بـ 24 وحدة",
      ip: "185.123.45.67",
      severity: "info"
    },
    {
      id: 2,
      timestamp: "2026-05-08 13:45:22",
      user: "فاطمة المالكي",
      userRole: "Property Manager",
      action: "updated",
      resource: "unit",
      resourceName: "جناح 101",
      details: "تحديث حالة الوحدة إلى متاح",
      ip: "185.123.45.68",
      severity: "info"
    },
    {
      id: 3,
      timestamp: "2026-05-08 12:18:33",
      user: "نظام تلقائي",
      userRole: "System",
      action: "deleted",
      resource: "reservation",
      resourceName: "حجز #4523",
      details: "حذف تلقائي لحجز منتهي الصلاحية",
      ip: "127.0.0.1",
      severity: "warning"
    },
    {
      id: 4,
      timestamp: "2026-05-08 11:05:47",
      user: "خالد العتيبي",
      userRole: "Accountant",
      action: "exported",
      resource: "report",
      resourceName: "تقرير المالية",
      details: "تصدير تقرير المالية لشهر أبريل",
      ip: "185.123.45.70",
      severity: "info"
    },
    {
      id: 5,
      timestamp: "2026-05-08 10:42:11",
      user: "Unknown User",
      userRole: "N/A",
      action: "failed_login",
      resource: "auth",
      resourceName: "محاولة دخول",
      details: "محاولة دخول فاشلة - كلمة مرور خاطئة",
      ip: "192.168.1.100",
      severity: "error"
    },
  ];

  const stats = [
    { label: "إجمالي السجلات", value: "12,458", color: "from-primary to-secondary" },
    { label: "سجلات اليوم", value: "342", color: "from-blue-500 to-cyan-500" },
    { label: "تحذيرات", value: "18", color: "from-amber-500 to-orange-500" },
    { label: "أخطاء", value: "5", color: "from-destructive to-red-600" },
  ];

  const getSeverityBadge = (severity: string) => {
    switch(severity) {
      case "info": return <Badge className="bg-blue-500">معلومة</Badge>;
      case "warning": return <Badge className="bg-amber-500">تحذير</Badge>;
      case "error": return <Badge variant="destructive">خطأ</Badge>;
      case "critical": return <Badge className="bg-destructive">حرج</Badge>;
      default: return <Badge variant="outline">غير معروف</Badge>;
    }
  };

  const getActionBadge = (action: string) => {
    const colors: { [key: string]: string } = {
      "created": "bg-available",
      "updated": "bg-blue-500",
      "deleted": "bg-destructive",
      "exported": "bg-amber-500",
      "failed_login": "bg-red-600",
    };
    return <Badge className={colors[action] || "bg-gray-500"}>{action}</Badge>;
  };

  return (
    <>
      <SEO title="سجلات النظام - Admin" />
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-foreground">سجلات النظام</h1>
              <p className="text-muted-foreground">مراقبة جميع الأنشطة والأحداث</p>
            </div>
            <Button variant="outline">
              <Download className="w-5 h-5 ml-2" />
              تصدير السجلات
            </Button>
          </div>

          {/* KPIs */}
          <div className="grid md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="glass rounded-xl p-6">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} p-3 mb-3`}>
                  <Activity className="w-full h-full text-white" />
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
                  placeholder="البحث في السجلات..."
                  className="pr-10"
                />
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="w-4 h-4 ml-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل السجلات</SelectItem>
                  <SelectItem value="info">معلومات</SelectItem>
                  <SelectItem value="warning">تحذيرات</SelectItem>
                  <SelectItem value="error">أخطاء</SelectItem>
                  <SelectItem value="critical">حرجة</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Calendar className="w-5 h-5 ml-2" />
                اختر الفترة
              </Button>
            </div>
          </div>

          {/* Logs Table */}
          <div className="glass rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr className="text-right">
                    <th className="p-4 font-bold text-foreground">الوقت</th>
                    <th className="p-4 font-bold text-foreground">المستخدم</th>
                    <th className="p-4 font-bold text-foreground">الدور</th>
                    <th className="p-4 font-bold text-foreground">الإجراء</th>
                    <th className="p-4 font-bold text-foreground">المورد</th>
                    <th className="p-4 font-bold text-foreground">التفاصيل</th>
                    <th className="p-4 font-bold text-foreground">IP</th>
                    <th className="p-4 font-bold text-foreground">الأهمية</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id} className="border-t border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div className="font-mono text-xs text-muted-foreground">{log.timestamp}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-semibold text-foreground">{log.user}</div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline">{log.userRole}</Badge>
                      </td>
                      <td className="p-4">{getActionBadge(log.action)}</td>
                      <td className="p-4">
                        <div className="font-medium text-foreground">{log.resource}</div>
                        <div className="text-xs text-muted-foreground">{log.resourceName}</div>
                      </td>
                      <td className="p-4 text-muted-foreground max-w-xs truncate">{log.details}</td>
                      <td className="p-4 font-mono text-xs text-muted-foreground">{log.ip}</td>
                      <td className="p-4">{getSeverityBadge(log.severity)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-xl font-bold text-foreground mb-6">نشاط اليوم</h3>
            <div className="space-y-4">
              {logs.slice(0, 5).map((log, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-foreground">{log.user}</span>
                      <span className="text-xs text-muted-foreground">{log.timestamp.split(' ')[1]}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{log.details}</p>
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