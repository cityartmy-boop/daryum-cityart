import { SEO } from "@/components/SEO";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings,
  Save,
  Database,
  Shield,
  Mail,
  Bell
} from "lucide-react";

export default function AdminSystemPage() {
  return (
    <>
      <SEO title="إعدادات النظام - Admin" />
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-foreground">إعدادات النظام</h1>
              <p className="text-muted-foreground">إدارة إعدادات المنصة العامة</p>
            </div>
            <Button className="gradient-primary">
              <Save className="w-5 h-5 ml-2" />
              حفظ التغييرات
            </Button>
          </div>

          {/* Settings Tabs */}
          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="glass">
              <TabsTrigger value="general">
                <Settings className="w-4 h-4 ml-2" />
                عام
              </TabsTrigger>
              <TabsTrigger value="database">
                <Database className="w-4 h-4 ml-2" />
                قاعدة البيانات
              </TabsTrigger>
              <TabsTrigger value="security">
                <Shield className="w-4 h-4 ml-2" />
                الأمان
              </TabsTrigger>
              <TabsTrigger value="email">
                <Mail className="w-4 h-4 ml-2" />
                البريد الإلكتروني
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="w-4 h-4 ml-2" />
                الإشعارات
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <div className="glass rounded-xl p-6 space-y-4">
                <h3 className="text-xl font-bold text-foreground mb-4">الإعدادات العامة</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>اسم المنصة</Label>
                    <Input defaultValue="داريوم - Daryum" />
                  </div>
                  <div className="space-y-2">
                    <Label>البريد الإلكتروني</Label>
                    <Input type="email" defaultValue="admin@daryum.sa" />
                  </div>
                  <div className="space-y-2">
                    <Label>المنطقة الزمنية</Label>
                    <Input defaultValue="Asia/Riyadh" />
                  </div>
                  <div className="space-y-2">
                    <Label>اللغة الافتراضية</Label>
                    <Input defaultValue="العربية - Arabic" />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="database">
              <div className="glass rounded-xl p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">إعدادات قاعدة البيانات</h3>
                <p className="text-muted-foreground">إدارة الاتصال وصيانة قاعدة البيانات</p>
              </div>
            </TabsContent>

            <TabsContent value="security">
              <div className="glass rounded-xl p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">إعدادات الأمان</h3>
                <p className="text-muted-foreground">إدارة سياسات الأمان والصلاحيات</p>
              </div>
            </TabsContent>

            <TabsContent value="email">
              <div className="glass rounded-xl p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">إعدادات البريد الإلكتروني</h3>
                <p className="text-muted-foreground">إعدادات SMTP والقوالب</p>
              </div>
            </TabsContent>

            <TabsContent value="notifications">
              <div className="glass rounded-xl p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">إعدادات الإشعارات</h3>
                <p className="text-muted-foreground">إدارة قنوات الإشعارات</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </AdminLayout>
    </>
  );
}