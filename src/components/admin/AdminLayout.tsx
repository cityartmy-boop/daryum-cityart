import { ReactNode } from "react";
import { Header } from "@/components/dashboard/Header";
import { AdminSidebar } from "./AdminSidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <div className="flex-1 p-8">
          {children}
        </div>
        <AdminSidebar />
      </div>
    </div>
  );
}