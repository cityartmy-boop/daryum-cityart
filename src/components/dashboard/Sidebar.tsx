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
  Shield
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
    { icon: Settings, label: "الإعدادات", href: "/dashboard/settings" },
  ];

  const adminMenu = [
    { icon: Shield, label: "إدارة المنصة", href: "/admin" },
  ];

  return (
    <aside className="w-72 glass border-l border-border/50 flex flex-col h-screen">
      <div className="p-6 border-b border-border/50">
        <Link href="/" className="flex items-center gap-3">
          <Image 
            src="/ChatGPT_Image_May_7_2026_09_50_18_AM.png" 
            alt="داريوم" 
            width={140}
            height={40}
            className="h-10 w-auto"
          />
        </Link>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {menuItems.map((item, index) => {
          const isActive = router.pathname === item.href;
          return (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? "gradient-primary text-white font-semibold" 
                  : "hover:bg-muted/50 text-foreground"
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
                    ? "gradient-primary text-white font-semibold" 
                    : "hover:bg-muted/50 text-foreground"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="flex-1 text-right">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
      
      <div className="p-4 border-t border-border/50">
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-bold">
              أ
            </div>
            <div className="flex-1 text-right">
              <div className="font-semibold text-sm">أحمد الشمري</div>
              <div className="text-xs text-muted-foreground mt-2">42 عقار • 156 وحدة</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}