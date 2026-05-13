import { useState, useEffect } from "react";
import { SEO } from "@/components/SEO";
import { AppShell } from "@/components/dashboard/AppShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Building2,
  DollarSign,
  TrendingUp,
  Download,
  Search,
  Eye,
  FileText,
  Calendar
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function OwnersPage() {
  const { toast } = useToast();
  const [filter, setFilter] = useState("all");
  const [owners, setOwners] = useState<any[]>([]);
  const [statements, setStatements] = useState<any[]>([]);

  // Fetch owners (users with role='owner')
  const fetchOwners = async () => {
    const { data, error } = await supabase
      .from("users")
      .select(`
        *,
        properties:properties!owner_id (
          id,
          name,
          name_ar
        )
      `)
      .eq("role", "owner")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching owners:", error);
      toast({
        title: "❌ خطأ في تحميل البيانات",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setOwners(data || []);
    }
  };

  // Fetch owner statements
  const fetchStatements = async () => {
    // using mock data since owner_statements table doesn't exist in Supabase schema
    setStatements([
      { 
        id: "1", 
        period_start: "2026-04-01", 
        period_end: "2026-04-30", 
        net_payout: 18500, 
        status: "paid", 
        users: { full_name: "أحمد المالكي" } 
      },
      { 
        id: "2", 
        period_start: "2026-05-01", 
        period_end: "2026-05-31", 
        net_payout: 22400, 
        status: "draft", 
        users: { full_name: "سعد بن فهد" } 
      }
    ]);
  };

  useEffect(() => {
    fetchOwners();
    fetchStatements();
  }, []);

  const filteredOwners = owners.filter(owner => {
    if (filter === "all") return true;
    if (filter === "active") return owner.status === "active";
    if (filter === "inactive") return owner.status === "inactive";
    return true;
  });

  const stats = [
    { label: "إجمالي الملاك", value: owners.length, color: "from-primary to-secondary" },
    { label: "إجمالي العقارات", value: owners.reduce((sum, o) => sum + (o.properties?.length || 0), 0), color: "from-blue-500 to-cyan-500" },
    { label: "الملاك النشطين", value: owners.filter(o => o.status === "active").length, color: "from-emerald-500 to-green-500" },
    { label: "الكشوفات المعلقة", value: statements.filter(s => s.status === "draft" || s.status === "sent").length, color: "from-amber-500 to-orange-500" },
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "active": return <Badge className="bg-available">نشط</Badge>;
      case "inactive": return <Badge variant="outline">غير نشط</Badge>;
      default: return <Badge variant="outline">غير معروف</Badge>;
    }
  };

  const getStatementStatusBadge = (status: string) => {
    switch(status) {
      case "paid": return <Badge className="bg-available">مسدد</Badge>;
      case "sent": return <Badge className="bg-blue-500">مرسل</Badge>;
      case "draft": return <Badge className="bg-amber-500">مسودة</Badge>;
      default: return <Badge variant="outline">غير معروف</Badge>;
    }
  };

  return (
    <>
      <SEO title="الملاك - داريوم" />
      <AppShell>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-foreground">الملاك</h1>
              <p className="text-muted-foreground">إدارة ملاك العقارات والكشوفات</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <FileText className="w-5 h-5 ml-2" />
                تقارير الملاك
              </Button>
              <Button className="gradient-primary">
                <Download className="w-5 h-5 ml-2" />
                تصدير الكشوفات
              </Button>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="glass rounded-xl p-6">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} p-3 mb-3`}>
                  <DollarSign className="w-full h-full text-white" />
                </div>
                <div className="text-2xl font-bold text-foreground tabular-nums mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="glass rounded-xl p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  placeholder="البحث في الملاك..."
                  className="pr-10"
                />
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل الملاك</SelectItem>
                  <SelectItem value="active">نشط</SelectItem>
                  <SelectItem value="inactive">غير نشط</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Owners Table */}
          <div className="glass rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr className="text-right">
                    <th className="p-4 font-bold text-foreground">المالك</th>
                    <th className="p-4 font-bold text-foreground">معلومات الاتصال</th>
                    <th className="p-4 font-bold text-foreground">العقارات</th>
                    <th className="p-4 font-bold text-foreground">الحالة</th>
                    <th className="p-4 font-bold text-foreground">إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOwners.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-muted-foreground">
                        لا يوجد ملاك مسجلين حالياً
                      </td>
                    </tr>
                  )}
                  {filteredOwners.map((owner) => (
                    <tr key={owner.id} className="border-t border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            {owner.full_name?.charAt(0) || 'M'}
                          </div>
                          <div>
                            <div className="font-semibold text-foreground">{owner.full_name || 'مالك'}</div>
                            <div className="text-xs text-muted-foreground">#{owner.id.substring(0,8)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-foreground">{owner.email}</div>
                        <div className="text-xs text-muted-foreground">{owner.phone || 'لا يوجد'}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-primary" />
                          <span className="font-semibold text-foreground">{owner.properties?.length || 0}</span>
                        </div>
                      </td>
                      <td className="p-4">{getStatusBadge(owner.status)}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4 ml-2" />
                            عرض
                          </Button>
                          <Button variant="ghost" size="sm">
                            <FileText className="w-4 h-4 ml-2" />
                            كشف
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Statements */}
          <div className="glass rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-foreground">آخر الكشوفات</h3>
              <Button variant="outline" size="sm">
                عرض الكل
              </Button>
            </div>
            <div className="space-y-4">
              {statements.length === 0 && (
                <div className="text-center text-muted-foreground py-6">
                  لا توجد كشوفات مالية بعد
                </div>
              )}
              {statements.map((statement) => (
                <div key={statement.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{statement.users?.full_name || 'مالك'}</div>
                      <div className="text-sm text-muted-foreground">
                        {statement.period_start} إلى {statement.period_end}
                      </div>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-foreground tabular-nums">﷼{statement.net_payout}</div>
                    {getStatementStatusBadge(statement.status)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AppShell>
    </>
  );
}