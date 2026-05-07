import { Search, Bell, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <header className="sticky top-0 z-40 glass border-b border-border">
      <div className="flex items-center justify-between px-8 py-4">
        {/* Search */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="ابحث في العقارات، الحجوزات، الضيوف..." 
              className="pr-10 bg-white/50"
            />
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
          </Button>
          
          {/* User menu */}
          <Button variant="ghost" className="gap-2">
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white font-bold">
              م
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">محمد العتيبي</div>
              <div className="text-xs text-muted-foreground">مدير العقارات</div>
            </div>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}