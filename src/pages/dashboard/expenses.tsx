import { useState, useEffect } from "react";
import { AppShell } from "@/components/dashboard/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ExpenseCategoriesDialog } from "@/components/dashboard/ExpenseCategoriesDialog";
import { ExpenseDialog } from "@/components/dashboard/ExpenseDialog";
import { toast } from "@/hooks/use-toast";
import {
  getExpenses,
  getExpenseCategories,
  deleteExpense,
  getExpenseStats,
  type Expense,
  type ExpenseCategory,
  type ExpenseStats,
} from "@/services/expenses.service";
import { getProperties, type Property } from "@/services/properties.service";
import {
  Plus,
  Settings,
  Pencil,
  Trash2,
  DollarSign,
  TrendingDown,
  TrendingUp,
  Filter,
} from "lucide-react";

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<ExpenseCategory[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [stats, setStats] = useState<ExpenseStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [categoriesDialogOpen, setCategoriesDialogOpen] = useState(false);
  const [expenseDialogOpen, setExpenseDialogOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [filters, setFilters] = useState({
    property_id: "",
    category_id: "",
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    loadData();
  }, [filters]);

  async function loadData() {
    try {
      setLoading(true);
      const [expensesData, categoriesData, propertiesData, statsData] = await Promise.all([
        getExpenses(filters),
        getExpenseCategories(),
        getProperties(),
        getExpenseStats(filters.start_date, filters.end_date),
      ]);
      setExpenses(expensesData);
      setCategories(categoriesData);
      setProperties(propertiesData);
      setStats(statsData);
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

  async function handleDelete(id: string) {
    if (!confirm("هل أنت متأكد من حذف هذا المصروف؟")) return;

    try {
      await deleteExpense(id);
      toast({ title: "تم حذف المصروف بنجاح" });
      loadData();
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  function handleEdit(expense: Expense) {
    setSelectedExpense(expense);
    setExpenseDialogOpen(true);
  }

  function handleAddNew() {
    setSelectedExpense(null);
    setExpenseDialogOpen(true);
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ar-SA", {
      style: "currency",
      currency: "SAR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold">المصروفات</h1>
            <p className="text-muted-foreground mt-1">إدارة مصروفات المحفظة والعقارات</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setCategoriesDialogOpen(true)}>
              <Settings className="h-4 w-4 ml-2" />
              إدارة الفئات
            </Button>
            <Button onClick={handleAddNew}>
              <Plus className="h-4 w-4 ml-2" />
              إضافة مصروف
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">إجمالي المصروفات</CardTitle>
                <TrendingDown className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">{formatCurrency(stats.total_expenses)}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">إجمالي الإيرادات</CardTitle>
                <TrendingUp className="h-4 w-4 text-available" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">{formatCurrency(stats.total_revenue)}</div>
              </CardContent>
            </Card>

            <Card className={stats.net_profit >= 0 ? "border-available" : "border-destructive"}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">صافي الربح</CardTitle>
                <DollarSign className={`h-4 w-4 ${stats.net_profit >= 0 ? "text-available" : "text-destructive"}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold tabular-nums ${stats.net_profit >= 0 ? "text-available" : "text-destructive"}`}>
                  {formatCurrency(stats.net_profit)}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Filter className="h-4 w-4" />
              تصفية النتائج
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <Select value={filters.property_id} onValueChange={(v) => setFilters({ ...filters, property_id: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="جميع العقارات" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">جميع العقارات</SelectItem>
                  {properties.map((prop) => (
                    <SelectItem key={prop.id} value={prop.id}>
                      {prop.name_ar}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.category_id} onValueChange={(v) => setFilters({ ...filters, category_id: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="جميع الفئات" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">جميع الفئات</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name_ar}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                type="date"
                value={filters.start_date}
                onChange={(e) => setFilters({ ...filters, start_date: e.target.value })}
                placeholder="من تاريخ"
              />

              <Input
                type="date"
                value={filters.end_date}
                onChange={(e) => setFilters({ ...filters, end_date: e.target.value })}
                placeholder="إلى تاريخ"
              />
            </div>
          </CardContent>
        </Card>

        {/* Expenses List */}
        <Card>
          <CardHeader>
            <CardTitle>قائمة المصروفات ({expenses.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">جارٍ التحميل...</div>
            ) : expenses.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>لا توجد مصروفات مسجلة</p>
                <Button variant="link" onClick={handleAddNew}>
                  إضافة أول مصروف
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                {expenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-mono text-sm text-muted-foreground">{expense.expense_number}</span>
                        <Badge variant="secondary">{expense.category?.name_ar}</Badge>
                        {expense.property && (
                          <Badge variant="outline">{expense.property.name_ar}</Badge>
                        )}
                      </div>
                      <div className="font-medium">{expense.description}</div>
                      <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                        <span>{formatDate(expense.expense_date)}</span>
                        {expense.vendor && <span>• {expense.vendor}</span>}
                        {expense.payment_method && (
                          <span>
                            •{" "}
                            {{
                              cash: "نقدي",
                              bank_transfer: "تحويل بنكي",
                              credit_card: "بطاقة",
                              check: "شيك",
                            }[expense.payment_method]}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-left">
                        <div className="text-2xl font-bold tabular-nums">{formatCurrency(expense.amount)}</div>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" onClick={() => handleEdit(expense)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDelete(expense.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Dialogs */}
      <ExpenseCategoriesDialog open={categoriesDialogOpen} onOpenChange={setCategoriesDialogOpen} />
      <ExpenseDialog
        open={expenseDialogOpen}
        onOpenChange={setExpenseDialogOpen}
        expense={selectedExpense}
        onSuccess={loadData}
      />
    </AppShell>
  );
}