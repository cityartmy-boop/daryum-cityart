import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  LayoutDashboard,
  Building2,
  Home,
  Calendar,
  MessageSquare,
  ClipboardCheck,
  Wrench,
  Users,
  DollarSign,
  BarChart3,
  Zap,
  Settings,
  Shield,
  User,
  BookOpen,
  Globe,
  Bell,
  Headphones
} from "lucide-react";

export function Sidebar() {
  const router = useRouter();
  
  const menuItems = [
    { icon: LayoutDashboard, label: "لوحة التحكم", href: "/dashboard" },
    { icon: Building2, label: "العقارات", href: "/dashboard/properties" },
    { icon: Home, label: "الوحدات", href: "/dashboard/units" },
    { icon: Calendar, label: "التقويم", href: "/dashboard/calendar" },
    { icon: MessageSquare, label: "الرسائل", href: "/dashboard/messages", badge: "12" },
    { icon: ClipboardCheck, label: "التنظيف", href: "/dashboard/housekeeping" },
    { icon: Wrench, label: "الصيانة", href: "/dashboard/maintenance" },
    { icon: Users, label: "الملاك", href: "/dashboard/owners" },
    { icon: DollarSign, label: "المالية", href: "/dashboard/finance" },
    { icon: BarChart3, label: "التقارير", href: "/dashboard/reports" },
    { icon: Zap, label: "الأتمتة", href: "/dashboard/automations" },
    { icon: User, label: "الملف الشخصي", href: "/dashboard/profile" },
    { icon: Settings, label: "الإعدادات", href: "/dashboard/settings" },
    { icon: Bell, label: "الإشعارات", href: "/dashboard/notifications" },
    { icon: Headphones, label: "الدعم الفني", href: "/dashboard/support" },
  ];

  const adminMenu = [
    { icon: Shield, label: "إدارة المنصة", href: "/admin" },
  ];

  return (
    <aside className="fixed right-0 top-0 h-screen w-72 glass border-l border-border/50 flex flex-col z-20">
      {/* Logo */}
      <div className="p-6 border-b border-border/50">
        <Link href="/" className="flex items-center justify-center">
          <Image 
            src="/داريوم.png" 
            alt="داريوم" 
            width={140}
            height={40}
            className="h-10 w-auto"
          />
        </Link>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {menuItems.map((item, index) => {
          const isActive = router.pathname === item.href;
          return (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? "gradient-primary text-white font-semibold shadow-lg" 
                  : "hover:bg-muted/50 text-foreground hover:translate-x-1"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="flex-1 text-right">{item.label}</span>
              {item.badge && (
                <span className="bg-destructive text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        {/* Admin Section */}
        <div className="pt-4 mt-4 border-t border-border/50">
          <div className="text-xs text-muted-foreground px-4 mb-2 font-semibold">إدارة النظام</div>
          {adminMenu.map((item, index) => {
            const isActive = router.pathname === item.href;
            return (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? "gradient-accent text-secondary font-semibold shadow-lg" 
                    : "hover:bg-muted/50 text-foreground hover:translate-x-1"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="flex-1 text-right">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
      
      {/* User Profile Card */}
      <div className="p-4 border-t border-border/50">
        <div className="glass-dark rounded-xl p-4 hover:scale-105 transition-transform cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-lg shadow-lg">
              أ
            </div>
            <div className="flex-1 text-right">
              <div className="font-bold text-sm">أحمد الشمري</div>
              <div className="text-xs text-muted-foreground mt-1">42 عقار • 156 وحدة</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}