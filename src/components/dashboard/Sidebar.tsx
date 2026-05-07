import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRole, UserRole } from "@/contexts/RoleContext";
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
  const { hasPermission, role, setRole } = useRole();
  
  const menuItems = [
    { icon: LayoutDashboard, label: "لوحة التحكم", href: "/dashboard", show: hasPermission("canViewDashboard") },
    { icon: Building2, label: "العقارات", href: "/dashboard/properties", show: hasPermission("canViewProperties") },
    { icon: Home, label: "الوحدات", href: "/dashboard/units", show: hasPermission("canViewUnits") },
    { icon: Calendar, label: "التقويم", href: "/dashboard/calendar", show: hasPermission("canViewCalendar") },
    { icon: BookOpen, label: "الحجوزات", href: "/dashboard/reservations", show: hasPermission("canViewReservations") },
    { icon: Globe, label: "القنوات", href: "/dashboard/channels", show: hasPermission("canViewProperties") },
    { icon: MessageSquare, label: "الرسائل", href: "/dashboard/messages", badge: "12", show: hasPermission("canViewMessages") },
    { icon: ClipboardCheck, label: "التنظيف", href: "/dashboard/housekeeping", show: hasPermission("canViewHousekeeping") },
    { icon: Wrench, label: "الصيانة", href: "/dashboard/maintenance", show: hasPermission("canViewMaintenance") },
    { icon: Users, label: "الملاك", href: "/dashboard/owners", show: hasPermission("canViewOwners") },
    { icon: DollarSign, label: "المالية", href: "/dashboard/finance", show: hasPermission("canViewFinance") },
    { icon: BarChart3, label: "التقارير", href: "/dashboard/reports", show: hasPermission("canViewReports") },
    { icon: User, label: "الملف الشخصي", href: "/dashboard/profile", show: true },
    { icon: Settings, label: "الإعدادات", href: "/dashboard/settings", show: hasPermission("canManageSettings") },
    { icon: Bell, label: "الإشعارات", href: "/dashboard/notifications", show: true },
    { icon: Headphones, label: "الدعم الفني", href: "/dashboard/support", show: true },
  ];

  const adminMenu = [
    { icon: Shield, label: "إدارة المنصة", href: "/admin", show: hasPermission("canViewAdminPanel") },
  ];

  // Temporary for demo purposes: Toggle roles
  const cycleRole = () => {
    const roles: UserRole[] = ["platform_admin", "manager", "owner", "accountant", "cleaner", "maintenance"];
    const nextIndex = (roles.indexOf(role) + 1) % roles.length;
    setRole(roles[nextIndex]);
  };

  const roleNames: Record<UserRole, string> = {
    platform_admin: "إدارة المنصة",
    manager: "مدير العقارات",
    owner: "مالك",
    accountant: "محاسب",
    cleaner: "موظف تنظيف",
    maintenance: "فني صيانة"
  };

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
        {menuItems.filter(item => item.show).map((item, index) => {
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
        {hasPermission("canViewAdminPanel") && (
          <div className="pt-4 mt-4 border-t border-border/50">
            <div className="text-xs text-muted-foreground px-4 mb-2 font-semibold">إدارة النظام</div>
            {adminMenu.filter(item => item.show).map((item, index) => {
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
        )}
      </nav>
      
      {/* User Profile Card */}
      <div className="p-4 border-t border-border/50">
        <div 
          onClick={cycleRole}
          className="glass-dark rounded-xl p-4 hover:scale-105 transition-transform cursor-pointer relative overflow-hidden group"
          title="اضغط لتغيير الصلاحية (لغرض التجربة)"
        >
          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-lg shadow-lg">
              أ
            </div>
            <div className="flex-1 text-right">
              <div className="font-bold text-sm">أحمد الشمري</div>
              <div className="text-xs text-primary mt-1 font-semibold bg-primary/10 inline-block px-2 py-0.5 rounded-full">
                {roleNames[role]}
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}