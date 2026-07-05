import { useState, useEffect } from "react";
import { SEO } from "@/components/SEO";
import { AppShell } from "@/components/dashboard/AppShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { getExpenseStats } from "@/services/expenses.service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Download,
  Search,
  Calendar,
  Receipt
} from "lucide-react";

export default function FinancePage() {
  const [filter, setFilter] = useState("all");
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      setLoading(true);
      const data = await getExpenseStats();
      setStats(data);
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ar-SA", {
      style: "currency",
      currency: "SAR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const kpiCards = [
    { 
      label: "إجمالي الإيرادات", 
      value: stats ? formatCurrency(stats.total_revenue) : "...", 
      change: "+12.5%", 
      trend: "up", 
      color: "from-primary to-secondary" 
    },
    { 
      label: "إجمالي المصروفات", 
      value: stats ? formatCurrency(stats.total_expenses) : "...", 
      change: "+5.2%", 
      trend: "up", 
      color: "from-red-500 to-orange-500" 
    },
    { 
      label: "العمولات المدفوعة", 
      value: "﷼ 372,000", 
      change: "-2.1%", 
      trend: "down", 
      color: "from-amber-500 to-orange-500" 
    },
    { 
      label: "المستحقات للملاك", 
      value: "﷼ 1,864,000", 
      change: "+15.3%", 
      trend: "up", 
      color: "from-blue-500 to-cyan-500" 
    },
    { 
      label: "صافي الربح", 
      value: stats ? formatCurrency(stats.net_profit) : "...", 
      change: stats && stats.net_profit > 0 ? "+3.2%" : "-3.2%", 
      trend: stats && stats.net_profit > 0 ? "up" : "down", 
      color: "from-emerald-500 to-green-500" 
    },
  ];

  const transactions = [
    {
      id: "TXN-2026-001",
      date: "2026-05-08",
      type: "revenue",
      description: "حجز - أحمد السعيد - جناح 101",
      amount: "﷼ 1,350",
      status: "completed",
      channel: "Airbnb",
      vat: "﷼ 202.50"
    },
    {
      id: "TXN-2026-002",
      date: "2026-05-07",
      type: "commission",
      description: "عمولة Booking.com - حجز #4523",
      amount: "﷼ 450",
      status: "pending",
      channel: "Booking.com",
      vat: "﷼ 67.50"
    },
    {
      id: "TXN-2026-003",
      date: "2026-05-06",
      type: "payout",
      description: "دفعة للمالك - أحمد المالكي",
      amount: "﷼ 18,500",
      status: "completed",
      channel: "تحويل بنكي",
      vat: "﷼ 0"
    },
    {
      id: "TXN-2026-004",
      date: "2026-05-05",
      type: "revenue",
      description: "حجز مباشر - خالد عبدالله",
      amount: "﷼ 2,800",
      status: "completed",
      channel: "مباشر",
      vat: "﷼ 420"
    },
    {
      id: "TXN-2026-005",
      date: "2026-05-04",
      type: "expense",
      description: "صيانة - وحدة B3",
      amount: "﷼ 850",
      status: "completed",
      channel: "نقدي",
      vat: "﷼ 127.50"
    },
  ];

  const getTypeBadge = (type: string) => {
    switch(type) {
      case "revenue": return <Badge className="bg-available">إيراد</Badge>;
      case "commission": return <Badge className="bg-amber-500">عمولة</Badge>;
      case "payout": return <Badge className="bg-blue-500">دفعة</Badge>;
      case "expense": return <Badge variant="destructive">مصروف</Badge>;
      default: return <Badge variant="outline">غير محدد</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "completed": return <Badge className="bg-primary">مكتمل</Badge>;
      case "pending": return <Badge className="bg-amber-500">معلق</Badge>;
      case "failed": return <Badge variant="destructive">فشل</Badge>;
      default: return <Badge variant="outline">غير معروف</Badge>;
    }
  };

  return (
    <>
      <SEO title="المالية - داريوم" />
      <AppShell>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-foreground">المالية</h1>
              <p className="text-muted-foreground">إدارة الإيرادات والمصروفات والأرباح</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Receipt className="w-5 h-5 ml-2" />
                تقرير الضريبة
              </Button>
              <Button className="gradient-primary">
                <Download className="w-5 h-5 ml-2" />
                تصدير
              </Button>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid md:grid-cols-5 gap-4">
            {kpiCards.map((stat, index) => (
              <div key={index} className="glass rounded-xl p-6">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} p-3 mb-3`}>
                  <DollarSign className="w-full h-full text-white" />
                </div>
                <div className="text-2xl font-bold text-foreground tabular-nums mb-1">
                  {loading ? "..." : stat.value}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                  <span className={`text-sm font-semibold flex items-center gap-1 ${stat.trend === 'up' ? 'text-available' : 'text-destructive'}`}>
                    {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="glass rounded-xl p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  placeholder="البحث في المعاملات..."
                  className="pr-10"
                />
              </div>
              <Select defaultValue="all" onValueChange={setFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل المعاملات</SelectItem>
                  <SelectItem value="revenue">إيرادات</SelectItem>
                  <SelectItem value="commission">عمولات</SelectItem>
                  <SelectItem value="payout">دفعات</SelectItem>
                  <SelectItem value="expense">مصروفات</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Calendar className="w-5 h-5 ml-2" />
                اختر الفترة
              </Button>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="glass rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr className="text-right">
                    <th className="p-4 font-bold text-foreground">رقم المعاملة</th>
                    <th className="p-4 font-bold text-foreground">التاريخ</th>
                    <th className="p-4 font-bold text-foreground">النوع</th>
                    <th className="p-4 font-bold text-foreground">الوصف</th>
                    <th className="p-4 font-bold text-foreground">المبلغ</th>
                    <th className="p-4 font-bold text-foreground">ضريبة القيمة المضافة</th>
                    <th className="p-4 font-bold text-foreground">القناة</th>
                    <th className="p-4 font-bold text-foreground">الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-t border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div className="font-mono text-sm text-primary">{transaction.id}</div>
                      </td>
                      <td className="p-4 text-muted-foreground">{transaction.date}</td>
                      <td className="p-4">{getTypeBadge(transaction.type)}</td>
                      <td className="p-4 text-foreground">{transaction.description}</td>
                      <td className="p-4">
                        <div className="font-bold text-foreground tabular-nums">{transaction.amount}</div>
                      </td>
                      <td className="p-4 text-muted-foreground tabular-nums">{transaction.vat}</td>
                      <td className="p-4">
                        <Badge variant="outline">{transaction.channel}</Badge>
                      </td>
                      <td className="p-4">{getStatusBadge(transaction.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* VAT Summary */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-xl font-bold text-foreground mb-6">ملخص ضريبة القيمة المضافة</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-muted/30">
                <div className="text-sm text-muted-foreground mb-2">الضريبة المستحقة</div>
                <div className="text-3xl font-bold text-foreground tabular-nums">﷼ 124,500</div>
              </div>
              <div className="p-6 rounded-xl bg-muted/30">
                <div className="text-sm text-muted-foreground mb-2">الضريبة المدفوعة</div>
                <div className="text-3xl font-bold text-primary tabular-nums">﷼ 98,200</div>
              </div>
              <div className="p-6 rounded-xl bg-muted/30">
                <div className="text-sm text-muted-foreground mb-2">الضريبة المتبقية</div>
                <div className="text-3xl font-bold text-amber-500 tabular-nums">﷼ 26,300</div>
              </div>
            </div>
          </div>
        </div>
      </AppShell>
    </>
  );
}