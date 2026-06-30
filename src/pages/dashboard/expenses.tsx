import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AppShell } from "@/components/dashboard/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { expensesService, type ExpenseWithCategory } from "@/services/expenses.service";
import { Plus, Search, Filter, Download, Settings, Trash2, Eye, Edit } from "lucide-react";
import { ExpenseDialog } from "@/components/dashboard/ExpenseDialog";
import { ExpenseCategoriesDialog } from "@/components/dashboard/ExpenseCategoriesDialog";
import type { Database } from "@/integrations/supabase/types";

type ExpenseCategory = Database["public"]["Tables"]["expense_categories"]["Row"];

const statusColors = {
  pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  approved: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  paid: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  rejected: "bg-red-500/10 text-red-600 border-red-500/20",
};

const statusLabels = {
  pending: "قيد الانتظار",
  approved: "معتمد",
  paid: "مدفوع",
  rejected: "مرفوض",
};

export default function ExpensesPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [expenses, setExpenses] = useState<ExpenseWithCategory[]>([]);
  const [categories, setCategories] = useState<ExpenseCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [expenseDialogOpen, setExpenseDialogOpen] = useState(false);
  const [categoriesDialogOpen, setCategoriesDialogOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<ExpenseWithCategory | null>(null);

  useEffect(() => {
    loadData();
  }, [statusFilter, categoryFilter]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [expensesData, categoriesData] = await Promise.all([
        expensesService.getExpenses({
          status: statusFilter !== "all" ? statusFilter : undefined,
          categoryId: categoryFilter !== "all" ? categoryFilter : undefined,
        }),
        expensesService.getCategories(),
      ]);
      setExpenses(expensesData);
      setCategories(categoriesData);
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا المصروف؟")) return;
    
    try {
      await expensesService.deleteExpense(id);
      toast({ title: "تم حذف المصروف بنجاح" });
      loadData();
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const filteredExpenses = expenses.filter((exp) =>
    exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exp.expense_categories.name_ar.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalExpenses = filteredExpenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
  const paidExpenses = filteredExpenses.filter(exp => exp.status === "paid").reduce((sum, exp) => sum + Number(exp.amount), 0);

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[hsl(222,47%,11%)]">المصروفات</h1>
            <p className="text-[hsl(222,20%,40%)] mt-1">إدارة مصروفات العقارات والوحدات</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setCategoriesDialogOpen(true)}
            >
              <Settings className="w-4 h-4 ml-2" />
              إدارة الفئات
            </Button>
            <Button onClick={() => {
              setSelectedExpense(null);
              setExpenseDialogOpen(true);
            }}>
              <Plus className="w-4 h-4 ml-2" />
              إضافة مصروف
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardDescription>إجمالي المصروفات</CardDescription>
              <CardTitle className="text-2xl">{totalExpenses.toLocaleString()} ر.س</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>المصروفات المدفوعة</CardDescription>
              <CardTitle className="text-2xl text-emerald-600">{paidExpenses.toLocaleString()} ر.س</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>عدد المصروفات</CardDescription>
              <CardTitle className="text-2xl">{filteredExpenses.length}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(222,20%,40%)]" />
                <Input
                  placeholder="ابحث عن مصروف..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="كل الفئات" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل الفئات</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name_ar}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="كل الحالات" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل الحالات</SelectItem>
                  <SelectItem value="pending">قيد الانتظار</SelectItem>
                  <SelectItem value="approved">معتمد</SelectItem>
                  <SelectItem value="paid">مدفوع</SelectItem>
                  <SelectItem value="rejected">مرفوض</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>رقم المصروف</TableHead>
                  <TableHead>العنوان</TableHead>
                  <TableHead>الفئة</TableHead>
                  <TableHead>العقار</TableHead>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>المبلغ</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      جاري التحميل...
                    </TableCell>
                  </TableRow>
                ) : filteredExpenses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-[hsl(222,20%,40%)]">
                      لا توجد مصروفات
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredExpenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell className="font-mono text-sm">{expense.expense_number}</TableCell>
                      <TableCell className="font-medium">{expense.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline" style={{ 
                          backgroundColor: `${expense.expense_categories.color}15`,
                          borderColor: `${expense.expense_categories.color}40`,
                          color: expense.expense_categories.color
                        }}>
                          {expense.expense_categories.name_ar}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {expense.properties ? expense.properties.name_ar : "-"}
                      </TableCell>
                      <TableCell>{new Date(expense.expense_date).toLocaleDateString("ar-SA")}</TableCell>
                      <TableCell className="font-semibold">{Number(expense.amount).toLocaleString()} ر.س</TableCell>
                      <TableCell>
                        <Badge className={statusColors[expense.status as keyof typeof statusColors]}>
                          {statusLabels[expense.status as keyof typeof statusLabels]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedExpense(expense);
                              setExpenseDialogOpen(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(expense.id)}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <ExpenseDialog
        open={expenseDialogOpen}
        onOpenChange={setExpenseDialogOpen}
        expense={selectedExpense}
        onSuccess={loadData}
      />

      <ExpenseCategoriesDialog
        open={categoriesDialogOpen}
        onOpenChange={setCategoriesDialogOpen}
        onSuccess={loadData}
      />
    </AppShell>
  );
}