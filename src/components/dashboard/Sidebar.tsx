import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { 
  LayoutDashboard, 
  Building2, 
  Home, 
  Calendar, 
  BookOpen,
  MessageSquare,
  ClipboardCheck,
  Wrench,
  Users,
  DollarSign,
  BarChart3,
  Zap,
  Settings,
  Globe
} from "lucide-react";

export function Sidebar() {
  const router = useRouter();
  
  const navigation = [
    { name: "لوحة التحكم", href: "/dashboard", icon: LayoutDashboard },
    { name: "العقارات", href: "/dashboard/properties", icon: Building2 },
    { name: "الوحدات", href: "/dashboard/units", icon: Home },
    { name: "التقويم", href: "/dashboard/calendar", icon: Calendar },
    { name: "الحجوزات", href: "/dashboard/reservations", icon: BookOpen },
    { name: "القنوات", href: "/dashboard/channels", icon: Globe },
    { name: "الرسائل", href: "/dashboard/messages", icon: MessageSquare },
    { name: "التنظيف", href: "/dashboard/housekeeping", icon: ClipboardCheck },
    { name: "الصيانة", href: "/dashboard/maintenance", icon: Wrench },
    { name: "الملاك", href: "/dashboard/owners", icon: Users },
    { name: "المالية", href: "/dashboard/finance", icon: DollarSign },
    { name: "التقارير", href: "/dashboard/reports", icon: BarChart3 },
    { name: "الأتمتة", href: "/dashboard/automations", icon: Zap },
    { name: "الإعدادات", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <aside className="fixed top-0 right-0 h-screen w-64 glass border-l border-border z-50">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Link href="/dashboard" className="flex items-center gap-3">
            <Image 
              src="/ChatGPT_Image_May_7_2026_09_50_18_AM.png" 
              alt="داريوم" 
              width={140}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = router.pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                  ${isActive 
                    ? "gradient-primary text-white shadow-lg" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }
                `}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        
        {/* User workspace */}
        <div className="p-4 border-t border-border">
          <div className="glass-dark rounded-lg p-4">
            <div className="text-sm text-muted-foreground mb-1">المحفظة النشطة</div>
            <div className="font-bold text-lg">محفظة الرياض الفاخرة</div>
            <div className="text-sm text-muted-foreground mt-2">42 عقار • 156 وحدة</div>
          </div>
        </div>
      </div>
    </aside>
  );
}