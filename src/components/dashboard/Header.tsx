import { Search, Bell, User, ChevronDown, LogOut, Settings as SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="h-20 border-b border-border/50 flex items-center px-8 glass sticky top-0 z-10 backdrop-blur-xl">
      <div className="flex items-center justify-between w-full">
        {/* Search */}
        <div className="flex-1 max-w-2xl ml-8">
          <div className="relative group">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            <input
              type="text"
              placeholder="بحث في العقارات، الحجوزات، الضيوف..."
              className="w-full h-12 pr-12 pl-4 rounded-xl bg-muted/30 border border-border/50 text-right focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-muted-foreground/60"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button className="relative p-3 hover:bg-muted/50 rounded-xl transition-all hover:scale-110 group">
            <Bell className="w-6 h-6 group-hover:text-primary transition-colors" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-destructive rounded-full animate-pulse shadow-lg shadow-destructive/50"></span>
          </button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-3 h-auto p-2 hover:bg-muted/50 rounded-xl">
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                <div className="text-right">
                  <div className="font-bold text-sm">{user?.name || "أحمد الشمري"}</div>
                  <div className="text-xs text-muted-foreground">{user?.company || "شركة الشمري العقارية"}</div>
                </div>
                <div className="w-11 h-11 rounded-full gradient-primary flex items-center justify-center text-white font-bold shadow-lg">
                  {(user?.name || "أحمد").charAt(0)}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 glass">
              <DropdownMenuLabel className="text-right font-bold">حسابي</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile" className="flex items-center gap-2 cursor-pointer hover:bg-primary/10">
                  <span className="flex-1 text-right">الملف الشخصي</span>
                  <User className="w-4 h-4" />
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings" className="flex items-center gap-2 cursor-pointer hover:bg-primary/10">
                  <span className="flex-1 text-right">الإعدادات</span>
                  <SettingsIcon className="w-4 h-4" />
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={logout}
                className="text-destructive focus:text-destructive cursor-pointer hover:bg-destructive/10"
              >
                <span className="flex-1 text-right font-semibold">تسجيل الخروج</span>
                <LogOut className="w-4 h-4" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}