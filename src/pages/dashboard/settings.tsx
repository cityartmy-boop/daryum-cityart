import { useState } from "react";
import { SEO } from "@/components/SEO";
import { AppShell } from "@/components/dashboard/AppShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Settings as SettingsIcon,
  Users,
  Shield,
  Globe,
  Bell,
  CreditCard,
  Save,
  Plus,
  Trash2,
  Edit
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  // User Roles with Permissions
  const roles = [
    {
      id: 1,
      name: "Admin",
      nameAr: "مدير النظام",
      users: 2,
      color: "from-primary to-secondary",
      permissions: {
        properties: { view: true, create: true, edit: true, delete: true },
        units: { view: true, create: true, edit: true, delete: true },
        reservations: { view: true, create: true, edit: true, delete: true },
        finance: { view: true, create: true, edit: true, delete: true },
        reports: { view: true, create: true, edit: false, delete: false },
        settings: { view: true, create: true, edit: true, delete: true },
        users: { view: true, create: true, edit: true, delete: true },
      }
    },
    {
      id: 2,
      name: "Property Manager",
      nameAr: "مدير العقارات",
      users: 5,
      color: "from-blue-500 to-cyan-500",
      permissions: {
        properties: { view: true, create: true, edit: true, delete: false },
        units: { view: true, create: true, edit: true, delete: false },
        reservations: { view: true, create: true, edit: true, delete: false },
        finance: { view: true, create: false, edit: false, delete: false },
        reports: { view: true, create: false, edit: false, delete: false },
        settings: { view: false, create: false, edit: false, delete: false },
        users: { view: false, create: false, edit: false, delete: false },
      }
    },
    {
      id: 3,
      name: "Owner",
      nameAr: "مالك",
      users: 12,
      color: "from-emerald-500 to-green-500",
      permissions: {
        properties: { view: true, create: false, edit: false, delete: false },
        units: { view: true, create: false, edit: false, delete: false },
        reservations: { view: true, create: false, edit: false, delete: false },
        finance: { view: true, create: false, edit: false, delete: false },
        reports: { view: true, create: false, edit: false, delete: false },
        settings: { view: false, create: false, edit: false, delete: false },
        users: { view: false, create: false, edit: false, delete: false },
      }
    },
    {
      id: 4,
      name: "Accountant",
      nameAr: "محاسب",
      users: 3,
      color: "from-amber-500 to-orange-500",
      permissions: {
        properties: { view: true, create: false, edit: false, delete: false },
        units: { view: true, create: false, edit: false, delete: false },
        reservations: { view: true, create: false, edit: false, delete: false },
        finance: { view: true, create: true, edit: true, delete: false },
        reports: { view: true, create: true, edit: false, delete: false },
        settings: { view: false, create: false, edit: false, delete: false },
        users: { view: false, create: false, edit: false, delete: false },
      }
    },
    {
      id: 5,
      name: "Housekeeping Supervisor",
      nameAr: "مشرف تنظيف",
      users: 4,
      color: "from-teal-500 to-cyan-500",
      permissions: {
        properties: { view: true, create: false, edit: false, delete: false },
        units: { view: true, create: false, edit: false, delete: false },
        reservations: { view: true, create: false, edit: false, delete: false },
        finance: { view: false, create: false, edit: false, delete: false },
        reports: { view: false, create: false, edit: false, delete: false },
        settings: { view: false, create: false, edit: false, delete: false },
        users: { view: false, create: false, edit: false, delete: false },
      }
    },
    {
      id: 6,
      name: "Cleaner",
      nameAr: "عامل تنظيف",
      users: 15,
      color: "from-purple-500 to-pink-500",
      permissions: {
        properties: { view: false, create: false, edit: false, delete: false },
        units: { view: true, create: false, edit: false, delete: false },
        reservations: { view: false, create: false, edit: false, delete: false },
        finance: { view: false, create: false, edit: false, delete: false },
        reports: { view: false, create: false, edit: false, delete: false },
        settings: { view: false, create: false, edit: false, delete: false },
        users: { view: false, create: false, edit: false, delete: false },
      }
    },
    {
      id: 7,
      name: "Maintenance",
      nameAr: "فني صيانة",
      users: 8,
      color: "from-orange-500 to-red-500",
      permissions: {
        properties: { view: true, create: false, edit: false, delete: false },
        units: { view: true, create: false, edit: false, delete: false },
        reservations: { view: false, create: false, edit: false, delete: false },
        finance: { view: false, create: false, edit: false, delete: false },
        reports: { view: false, create: false, edit: false, delete: false },
        settings: { view: false, create: false, edit: false, delete: false },
        users: { view: false, create: false, edit: false, delete: false },
      }
    },
  ];

  const users = [
    { id: 1, name: "أحمد السعيد", email: "ahmed@daryum.sa", role: "Admin", status: "active" },
    { id: 2, name: "فاطمة المالكي", email: "fatimah@daryum.sa", role: "Property Manager", status: "active" },
    { id: 3, name: "خالد العتيبي", email: "khaled@daryum.sa", role: "Accountant", status: "active" },
    { id: 4, name: "نورة الدوسري", email: "noura@daryum.sa", role: "Owner", status: "inactive" },
  ];

  const currencies = [
    { code: "SAR", symbol: "﷼", name: "ريال سعودي", default: true },
    { code: "USD", symbol: "$", name: "دولار أمريكي", default: false },
    { code: "EUR", symbol: "€", name: "يورو", default: false },
    { code: "GBP", symbol: "£", name: "جنيه إسترليني", default: false },
  ];

  return (
    <>
      <SEO title="الإعدادات - داريوم" />
      <AppShell>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-black text-foreground">الإعدادات</h1>
            <p className="text-muted-foreground">إدارة إعدادات النظام والصلاحيات</p>
          </div>

          {/* Settings Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="general">
                <SettingsIcon className="w-4 h-4 ml-2" />
                عام
              </TabsTrigger>
              <TabsTrigger value="users">
                <Users className="w-4 h-4 ml-2" />
                المستخدمين
              </TabsTrigger>
              <TabsTrigger value="roles">
                <Shield className="w-4 h-4 ml-2" />
                الأدوار
              </TabsTrigger>
              <TabsTrigger value="currency">
                <Globe className="w-4 h-4 ml-2" />
                العملات
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="w-4 h-4 ml-2" />
                الإشعارات
              </TabsTrigger>
            </TabsList>

            {/* General Settings */}
            <TabsContent value="general">
              <div className="glass rounded-xl p-6">
                <h3 className="text-xl font-bold text-foreground mb-6">الإعدادات العامة</h3>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">اسم الشركة</Label>
                      <Input id="companyName" defaultValue="داريوم" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyEmail">البريد الإلكتروني</Label>
                      <Input id="companyEmail" type="email" defaultValue="info@daryum.sa" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">المنطقة الزمنية</Label>
                      <Select defaultValue="riyadh">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="riyadh">الرياض (UTC+3)</SelectItem>
                          <SelectItem value="dubai">دبي (UTC+4)</SelectItem>
                          <SelectItem value="cairo">القاهرة (UTC+2)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">اللغة الافتراضية</Label>
                      <Select defaultValue="ar">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ar">العربية</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                    <div>
                      <div className="font-semibold text-foreground">تفعيل الوضع الليلي</div>
                      <div className="text-sm text-muted-foreground">تبديل تلقائي حسب الوقت</div>
                    </div>
                    <Switch />
                  </div>

                  <Button className="gradient-primary">
                    <Save className="w-5 h-5 ml-2" />
                    حفظ التغييرات
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Users Management */}
            <TabsContent value="users">
              <div className="glass rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-foreground">إدارة المستخدمين</h3>
                  <Button className="gradient-primary">
                    <Plus className="w-5 h-5 ml-2" />
                    إضافة مستخدم
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr className="text-right">
                        <th className="p-4 font-bold text-foreground">الاسم</th>
                        <th className="p-4 font-bold text-foreground">البريد الإلكتروني</th>
                        <th className="p-4 font-bold text-foreground">الدور</th>
                        <th className="p-4 font-bold text-foreground">الحالة</th>
                        <th className="p-4 font-bold text-foreground">إجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-t border-border/50 hover:bg-muted/30 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                {user.name.charAt(0)}
                              </div>
                              <span className="font-semibold text-foreground">{user.name}</span>
                            </div>
                          </td>
                          <td className="p-4 text-foreground">{user.email}</td>
                          <td className="p-4">
                            <Badge variant="outline">{user.role}</Badge>
                          </td>
                          <td className="p-4">
                            {user.status === "active" ? (
                              <Badge className="bg-available">نشط</Badge>
                            ) : (
                              <Badge variant="outline">غير نشط</Badge>
                            )}
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-destructive">
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
            </TabsContent>

            {/* Roles & Permissions */}
            <TabsContent value="roles">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-foreground">الأدوار والصلاحيات</h3>
                  <Button variant="outline">
                    <Plus className="w-5 h-5 ml-2" />
                    إضافة دور
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {roles.map((role) => (
                    <div key={role.id} className="glass rounded-xl p-6 border border-border/50">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${role.color} p-3 mb-3`}>
                            <Shield className="w-full h-full text-white" />
                          </div>
                          <h4 className="text-lg font-bold text-foreground mb-1">{role.nameAr}</h4>
                          <p className="text-sm text-muted-foreground">{role.name}</p>
                        </div>
                        <Badge variant="outline">{role.users} مستخدم</Badge>
                      </div>

                      <div className="space-y-3 pt-4 border-t border-border/50">
                        <div className="text-sm font-semibold text-foreground mb-2">الصلاحيات:</div>
                        {Object.entries(role.permissions).map(([key, perms]: [string, any]) => {
                          const hasAnyPermission = Object.values(perms).some(v => v === true);
                          if (!hasAnyPermission) return null;
                          
                          const permLabels: { [key: string]: string } = {
                            properties: "العقارات",
                            units: "الوحدات",
                            reservations: "الحجوزات",
                            finance: "المالية",
                            reports: "التقارير",
                            settings: "الإعدادات",
                            users: "المستخدمين",
                          };

                          return (
                            <div key={key} className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">{permLabels[key]}</span>
                              <div className="flex gap-2">
                                {perms.view && <Badge variant="outline" className="text-xs">عرض</Badge>}
                                {perms.create && <Badge variant="outline" className="text-xs">إنشاء</Badge>}
                                {perms.edit && <Badge variant="outline" className="text-xs">تعديل</Badge>}
                                {perms.delete && <Badge variant="outline" className="text-xs">حذف</Badge>}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex gap-2 mt-4 pt-4 border-t border-border/50">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="w-4 h-4 ml-2" />
                          تعديل
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Currency Settings */}
            <TabsContent value="currency">
              <div className="glass rounded-xl p-6">
                <h3 className="text-xl font-bold text-foreground mb-6">إعدادات العملات</h3>
                
                <div className="space-y-4">
                  {currencies.map((currency) => (
                    <div key={currency.code} className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl font-bold">
                          {currency.symbol}
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">{currency.name}</div>
                          <div className="text-sm text-muted-foreground">{currency.code}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {currency.default && (
                          <Badge className="bg-available">افتراضي</Badge>
                        )}
                        <Switch checked={currency.default} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <Button className="gradient-primary">
                    <Save className="w-5 h-5 ml-2" />
                    حفظ الإعدادات
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Notifications Settings */}
            <TabsContent value="notifications">
              <div className="glass rounded-xl p-6">
                <h3 className="text-xl font-bold text-foreground mb-6">إعدادات الإشعارات</h3>
                
                <div className="space-y-4">
                  {[
                    { label: "حجز جديد", description: "إشعار عند ورود حجز جديد" },
                    { label: "تأكيد الدفع", description: "إشعار عند تأكيد الدفع" },
                    { label: "رسالة ضيف", description: "إشعار عند وصول رسالة من ضيف" },
                    { label: "مهمة تنظيف", description: "إشعار عند تعيين مهمة تنظيف" },
                    { label: "تذكير صيانة", description: "إشعار عند اقتراب موعد الصيانة" },
                  ].map((notif, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                      <div>
                        <div className="font-semibold text-foreground">{notif.label}</div>
                        <div className="text-sm text-muted-foreground">{notif.description}</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <Button className="gradient-primary">
                    <Save className="w-5 h-5 ml-2" />
                    حفظ الإعدادات
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </AppShell>
    </>
  );
}