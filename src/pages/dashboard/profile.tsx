import { useState } from "react";
import { SEO } from "@/components/SEO";
import { AppShell } from "@/components/dashboard/AppShell";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { User, Mail, Phone, Building2, Lock, Bell, Shield, Save, Camera } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    company: user?.company || ""
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    reservations: true,
    payments: true,
    maintenance: true
  });

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ProtectedRoute>
      <SEO title="الملف الشخصي - داريوم" description="إدارة ملفك الشخصي وإعداداتك" />
      
      <AppShell>
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold mb-2">الملف الشخصي</h1>
          <p className="text-muted-foreground mb-8">إدارة معلوماتك الشخصية وإعداداتك</p>

          <div className="space-y-6">
            {/* Profile Picture & Basic Info */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-start gap-6 mb-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center text-white text-3xl font-bold">
                    {user?.name.charAt(0)}
                  </div>
                  <button className="absolute bottom-0 left-0 w-8 h-8 rounded-full bg-white border-2 border-primary flex items-center justify-center hover:bg-muted transition-colors">
                    <Camera className="w-4 h-4 text-primary" />
                  </button>
                </div>
                
                <div className="flex-1 text-right">
                  <h2 className="text-2xl font-bold mb-1">{user?.name}</h2>
                  <p className="text-muted-foreground mb-3">{user?.email}</p>
                  <div className="flex gap-2">
                    <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                      {user?.role === "admin" ? "مدير" : "مدير عقارات"}
                    </div>
                    <div className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm">
                      عضو منذ يناير 2026
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant="outline"
                  className="flex-1"
                >
                  {isEditing ? "إلغاء" : "تعديل البيانات"}
                </Button>
                {isEditing && (
                  <Button
                    onClick={handleSave}
                    className="flex-1 gradient-primary text-white"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        جارٍ الحفظ...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Save className="w-4 h-4" />
                        حفظ التغييرات
                      </span>
                    )}
                  </Button>
                )}
              </div>
            </div>

            {/* Personal Information */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <User className="w-5 h-5" />
                المعلومات الشخصية
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-right block">الاسم الكامل</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="text-right"
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-right block">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="text-right"
                    disabled={!isEditing}
                    dir="ltr"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-right block">رقم الجوال</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="text-right"
                    disabled={!isEditing}
                    dir="ltr"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="text-right block">اسم الشركة</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="text-right"
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>

            {/* Change Password */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Lock className="w-5 h-5" />
                تغيير كلمة المرور
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="current-password" className="text-right block">كلمة المرور الحالية</Label>
                  <Input
                    id="current-password"
                    type="password"
                    placeholder="••••••••"
                    className="text-right"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password" className="text-right block">كلمة المرور الجديدة</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="••••••••"
                    className="text-right"
                  />
                </div>
              </div>

              <Button variant="outline" className="mt-4">
                تحديث كلمة المرور
              </Button>
            </div>

            {/* Notification Settings */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Bell className="w-5 h-5" />
                إعدادات الإشعارات
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/30 transition-colors">
                  <div className="text-right">
                    <div className="font-semibold">إشعارات البريد الإلكتروني</div>
                    <div className="text-sm text-muted-foreground">استقبال الإشعارات عبر البريد</div>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/30 transition-colors">
                  <div className="text-right">
                    <div className="font-semibold">الإشعارات الفورية</div>
                    <div className="text-sm text-muted-foreground">إشعارات المتصفح الفورية</div>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/30 transition-colors">
                  <div className="text-right">
                    <div className="font-semibold">رسائل SMS</div>
                    <div className="text-sm text-muted-foreground">إشعارات عبر الرسائل النصية</div>
                  </div>
                  <Switch
                    checked={notifications.sms}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                  />
                </div>

                <div className="border-t border-border/50 pt-4 mt-4">
                  <h4 className="font-semibold mb-3">نوع الإشعارات</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">الحجوزات الجديدة</span>
                      <Switch
                        checked={notifications.reservations}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, reservations: checked })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">المدفوعات</span>
                      <Switch
                        checked={notifications.payments}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, payments: checked })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">الصيانة والتنظيف</span>
                      <Switch
                        checked={notifications.maintenance}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, maintenance: checked })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Security */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                الأمان والخصوصية
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/30 transition-colors">
                  <div className="text-right">
                    <div className="font-semibold">المصادقة الثنائية</div>
                    <div className="text-sm text-muted-foreground">طبقة أمان إضافية لحسابك</div>
                  </div>
                  <Button variant="outline" size="sm">تفعيل</Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/30 transition-colors">
                  <div className="text-right">
                    <div className="font-semibold">الجلسات النشطة</div>
                    <div className="text-sm text-muted-foreground">إدارة الأجهزة المتصلة</div>
                  </div>
                  <Button variant="outline" size="sm">عرض</Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/30 transition-colors">
                  <div className="text-right">
                    <div className="font-semibold">تنزيل بياناتك</div>
                    <div className="text-sm text-muted-foreground">احصل على نسخة من بياناتك</div>
                  </div>
                  <Button variant="outline" size="sm">تنزيل</Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/30 transition-colors border-t border-destructive/20 bg-destructive/5">
                  <div className="text-right">
                    <div className="font-semibold text-destructive">حذف الحساب</div>
                    <div className="text-sm text-muted-foreground">حذف حسابك وجميع بياناتك نهائياً</div>
                  </div>
                  <Button variant="destructive" size="sm">حذف</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppShell>
    </ProtectedRoute>
  );
}