import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { getExpenseStats, type ExpenseStats } from "@/services/expenses.service";
import { TrendingDown, TrendingUp, Receipt, ArrowRight } from "lucide-react";
import Link from "next/link";

export function ExpensesSummary() {
  const [stats, setStats] = useState<ExpenseStats | null>(null);
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

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            ملخص المصروفات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">جارٍ التحميل...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="flex items-center gap-2">
          <Receipt className="h-5 w-5" />
          ملخص المصروفات والأرباح
        </CardTitle>
        <Link href="/dashboard/expenses">
          <Button variant="ghost" size="sm">
            عرض التفاصيل
            <ArrowRight className="h-4 w-4 mr-2" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Financial Summary */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <TrendingUp className="h-4 w-4 text-available" />
                <span>الإيرادات</span>
              </div>
              <div className="text-2xl font-bold tabular-nums">
                {stats ? formatCurrency(stats.total_revenue) : "﷼ 0"}
              </div>
            </div>

            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <TrendingDown className="h-4 w-4 text-destructive" />
                <span>المصروفات</span>
              </div>
              <div className="text-2xl font-bold tabular-nums">
                {stats ? formatCurrency(stats.total_expenses) : "﷼ 0"}
              </div>
            </div>

            <div className={`p-4 rounded-lg ${stats && stats.net_profit >= 0 ? "bg-available/10" : "bg-destructive/10"}`}>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Receipt className="h-4 w-4" />
                <span>صافي الربح</span>
              </div>
              <div className={`text-2xl font-bold tabular-nums ${stats && stats.net_profit >= 0 ? "text-available" : "text-destructive"}`}>
                {stats ? formatCurrency(stats.net_profit) : "﷼ 0"}
              </div>
            </div>
          </div>

          {/* Expenses by Category */}
          {stats && stats.expenses_by_category.length > 0 && (
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">المصروفات حسب الفئة</div>
              <div className="space-y-2">
                {stats.expenses_by_category.slice(0, 5).map((cat, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{cat.category_name_ar}</Badge>
                    </div>
                    <div className="font-bold tabular-nums">{formatCurrency(cat.total)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {stats && stats.total_expenses === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              <p className="mb-2">لم يتم تسجيل أي مصروفات بعد</p>
              <Link href="/dashboard/expenses">
                <Button variant="outline" size="sm">
                  إضافة أول مصروف
                </Button>
              </Link>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}