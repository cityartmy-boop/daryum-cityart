import Link from "next/link";
import { useRouter } from "next/router";
import {
  LayoutDashboard,
  Users,
  Shield,
  CreditCard,
  DollarSign,
  Settings,
  FileText,
  BarChart3,
  Building2,
  Calendar,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminNavItems = [
  { name: "لوحة التحكم", nameEn: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "المستخدمين", nameEn: "Users", href: "/admin/users", icon: Users },
  { name: "الأدوار", nameEn: "Roles", href: "/admin/roles", icon: Shield },
  { name: "الاشتراكات", nameEn: "Subscriptions", href: "/admin/subscriptions", icon: CreditCard },
  { name: "المدفوعات", nameEn: "Payments", href: "/admin/payments", icon: DollarSign },
  { name: "العقارات", nameEn: "Properties", href: "/admin/properties", icon: Building2 },
  { name: "الحجوزات", nameEn: "Reservations", href: "/admin/reservations", icon: Calendar },
  { name: "الرسائل", nameEn: "Messages", href: "/admin/messages", icon: MessageSquare },
  { name: "السجلات", nameEn: "Logs", href: "/admin/logs", icon: FileText },
  { name: "الإحصائيات", nameEn: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "إعدادات النظام", nameEn: "System Settings", href: "/admin/system", icon: Settings },
];

export function AdminSidebar() {
  const router = useRouter();

  return (
    <div className="w-64 glass border-l border-border/50 p-4 space-y-2">
      <div className="mb-6 px-4 py-3 rounded-xl bg-gradient-to-br from-primary to-secondary">
        <div className="text-white font-bold text-lg mb-1">لوحة الأدمن</div>
        <div className="text-white/80 text-sm">Admin Dashboard</div>
      </div>

      <nav className="space-y-1">
        {adminNavItems.map((item) => {
          const isActive = router.pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                isActive
                  ? "bg-primary text-white font-semibold"
                  : "text-foreground hover:bg-muted/50"
              )}
            >
              <item.icon className="w-5 h-5" />
              <div className="flex-1">
                <div className="font-medium">{item.name}</div>
                <div className="text-xs opacity-70">{item.nameEn}</div>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}