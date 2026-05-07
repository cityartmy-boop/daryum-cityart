import { useState } from "react";
import { SEO } from "@/components/SEO";
import { AppShell } from "@/components/dashboard/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  MapPin, 
  Lock,
  Bell,
  Globe,
  Clock,
  Activity,
  Save,
  Upload,
  Shield,
  Calendar,
  TrendingUp,
  Eye,
  CheckCircle2
} from "lucide-react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"personal" | "security" | "settings" | "activity">("personal");

  // Mock user data
  const user = {
    name: "أحمد محمد السعيد",
    email: "ahmed@example.com",
    phone: "+966 50 123 4567",
    company: "مجموعة الفيصلية العقارية",
    location: "الرياض، المملكة العربية السعودية",
    role: "مدير عمليات",
    joinDate: "يناير 2025",
    avatar: null,
    stats: {
      properties: 12,
      units: 156,
      reservations: 2847,
      revenue: "SAR 8.4M"
    }
  };

  const recentActivity = [
    { action: "تسجيل دخول", time: "منذ 5 دقائق", device: "Chrome - Windows", ip: "91.102.xxx.xxx" },
    { action: "تحديث البيانات الشخصية", time: "منذ 3 أيام", device: "Safari - iPhone", ip: "91.102.xxx.xxx" },
    { action: "تغيير كلمة المرور", time: "منذ أسبوع", device: "Chrome - macOS", ip: "91.102.xxx.xxx" },
    { action: "تسجيل دخول", time: "منذ أسبوعين", device: "Edge - Windows", ip: "91.102.xxx.xxx" }
  ];

  const tabs = [
    { id: "personal", label: "المعلومات الشخصية", icon: User },
    { id: "security", label: "الأمان وكلمة المرور", icon: Lock },
    { id: "settings", label: "الإعدادات", icon: Globe },
    { id: "activity", label: "نشاط الحساب", icon: Activity }
  ];

  return (
    <>
      <SEO title="الملف الشخصي - داريوم" />
      <AppShell>
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="glass p-8 rounded-xl border border-border/50">
            <div className="flex items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="w-24 h-24 gradient-primary">
                  <AvatarFallback className="text-white text-2xl font-bold">
                    {user.name.split(' ')[0].charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <Upload className="w-4 h-4" />
                </button>
              </div>

              {/* User Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    {user.role}
                  </Badge>
                </div>
                <div className="space-y-1 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span>{user.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{user.location}</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "عقار", value: user.stats.properties, icon: Building2 },
                  { label: "وحدة", value: user.stats.units, icon: User },
                  { label: "حجز", value: user.stats.reservations, icon: Calendar },
                  { label: "إيراد", value: user.stats.revenue, icon: TrendingUp }
                ].map((stat, index) => (
                  <div key={index} className="text-center p-3 bg-muted/30 rounded-lg">
                    <stat.icon className="w-5 h-5 text-primary mx-auto mb-1" />
                    <div className="text-xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="glass p-2 rounded-xl border border-border/50">
            <div className="flex gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? "gradient-primary text-white shadow-md"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden md:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {/* Personal Info Tab */}
            {activeTab === "personal" && (
              <div className="glass p-8 rounded-xl border border-border/50">
                <h2 className="text-2xl font-bold text-foreground mb-6">المعلومات الشخصية</h2>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">الاسم الكامل *</Label>
                      <Input id="name" defaultValue={user.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">البريد الإلكتروني *</Label>
                      <Input id="email" type="email" defaultValue={user.email} />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">رقم الجوال *</Label>
                      <Input id="phone" defaultValue={user.phone} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">الشركة</Label>
                      <Input id="company" defaultValue={user.company} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">الموقع</Label>
                    <Input id="location" defaultValue={user.location} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">نبذة عنك</Label>
                    <Textarea 
                      id="bio" 
                      rows={4}
                      placeholder="اكتب نبذة مختصرة عنك وعن خبرتك في إدارة العقارات..."
                    />
                  </div>

                  <div className="flex justify-end gap-4">
                    <Button variant="outline" type="button">إلغاء</Button>
                    <Button className="gradient-primary">
                      <Save className="w-4 h-4 ml-2" />
                      حفظ التغييرات
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="space-y-6">
                {/* Change Password */}
                <div className="glass p-8 rounded-xl border border-border/50">
                  <h2 className="text-2xl font-bold text-foreground mb-6">تغيير كلمة المرور</h2>
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">كلمة المرور الحالية *</Label>
                      <Input id="current-password" type="password" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="new-password">كلمة المرور الجديدة *</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">تأكيد كلمة المرور *</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>

                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">متطلبات كلمة المرور:</p>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                          8 أحرف على الأقل
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                          حرف كبير واحد على الأقل
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                          رقم واحد على الأقل
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                          رمز خاص واحد على الأقل
                        </li>
                      </ul>
                    </div>

                    <div className="flex justify-end gap-4">
                      <Button variant="outline" type="button">إلغاء</Button>
                      <Button className="gradient-primary">
                        <Lock className="w-4 h-4 ml-2" />
                        تحديث كلمة المرور
                      </Button>
                    </div>
                  </form>
                </div>

                {/* Two-Factor Authentication */}
                <div className="glass p-8 rounded-xl border border-border/50">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-2">المصادقة الثنائية (2FA)</h2>
                      <p className="text-muted-foreground">احمِ حسابك بطبقة أمان إضافية</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground mb-1">غير مفعّل</p>
                        <p className="text-sm text-muted-foreground">
                          نوصي بتفعيل المصادقة الثنائية لحماية إضافية لحسابك
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                {/* Language & Region */}
                <div className="glass p-8 rounded-xl border border-border/50">
                  <h2 className="text-2xl font-bold text-foreground mb-6">اللغة والمنطقة</h2>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="language">اللغة</Label>
                        <Select defaultValue="ar">
                          <SelectTrigger id="language">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ar">العربية</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="timezone">المنطقة الزمنية</Label>
                        <Select defaultValue="riyadh">
                          <SelectTrigger id="timezone">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="riyadh">الرياض (GMT+3)</SelectItem>
                            <SelectItem value="dubai">دبي (GMT+4)</SelectItem>
                            <SelectItem value="cairo">القاهرة (GMT+2)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="currency">العملة</Label>
                        <Select defaultValue="sar">
                          <SelectTrigger id="currency">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sar">ريال سعودي (SAR)</SelectItem>
                            <SelectItem value="aed">درهم إماراتي (AED)</SelectItem>
                            <SelectItem value="usd">دولار أمريكي (USD)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="date-format">تنسيق التاريخ</Label>
                        <Select defaultValue="dd-mm-yyyy">
                          <SelectTrigger id="date-format">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                            <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                            <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notifications */}
                <div className="glass p-8 rounded-xl border border-border/50">
                  <h2 className="text-2xl font-bold text-foreground mb-6">إعدادات الإشعارات</h2>
                  <div className="space-y-4">
                    {[
                      { label: "الحجوزات الجديدة", description: "إشعار عند استلام حجز جديد", enabled: true },
                      { label: "المدفوعات", description: "إشعار عند استلام دفعة أو فشلها", enabled: true },
                      { label: "رسائل الضيوف", description: "إشعار عند وصول رسالة جديدة", enabled: true },
                      { label: "الصيانة", description: "إشعار عند إنشاء أو تحديث تذكرة صيانة", enabled: true },
                      { label: "التقارير الأسبوعية", description: "تقرير إيرادات وأداء كل أسبوع", enabled: false },
                      { label: "التحديثات والميزات", description: "إشعارات حول ميزات وتحديثات جديدة", enabled: false }
                    ].map((notification, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                        <div>
                          <p className="font-medium text-foreground">{notification.label}</p>
                          <p className="text-sm text-muted-foreground">{notification.description}</p>
                        </div>
                        <Switch defaultChecked={notification.enabled} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === "activity" && (
              <div className="glass p-8 rounded-xl border border-border/50">
                <h2 className="text-2xl font-bold text-foreground mb-6">نشاط الحساب الأخير</h2>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Activity className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{activity.action}</p>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{activity.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Globe className="w-3 h-3" />
                            <span>{activity.device}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{activity.ip}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Eye className="w-5 h-5 text-accent mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground mb-1">انتبه لنشاط حسابك</p>
                      <p className="text-sm text-muted-foreground">
                        إذا لاحظت أي نشاط مشبوه، قم بتغيير كلمة المرور فوراً وتواصل مع فريق الدعم
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </AppShell>
    </>
  );
}