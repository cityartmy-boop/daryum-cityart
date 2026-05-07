import { Search, Bell, User, ChevronDown, LogOut, Settings as SettingsIcon, Menu } from "lucide-react";
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
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";

export function Header() {
  const { user, logout } = useAuth();
  const unreadCount = 3;

  return (
    <header className="h-16 glass border-b border-border/50 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="p-0 w-72">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>

      {/* Search - Hidden on small mobile, visible on tablet+ */}
      <div className="flex-1 max-w-2xl ml-4 hidden sm:block lg:ml-8">
        <div className="relative group">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          <input
            type="text"
            placeholder="بحث في العقارات، الحجوزات، الضيوف..."
            className="w-full h-12 pr-12 pl-4 rounded-xl bg-muted/30 border border-border/50 text-right focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-muted-foreground/60"
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Notifications */}
        <Link href="/dashboard/notifications">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-destructive rounded-full"></span>
            )}
          </Button>
        </Link>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 sm:gap-3 h-auto p-2 hover:bg-muted/50 rounded-xl">
              <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 hidden sm:block" />
              <div className="text-right hidden md:block">
                <div className="font-bold text-sm">{user?.name || "أحمد الشمري"}</div>
                <div className="text-xs text-muted-foreground">{user?.company || "شركة الشمري العقارية"}</div>
              </div>
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full gradient-primary flex items-center justify-center text-white font-bold shadow-lg">
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
    </header>
  );
}