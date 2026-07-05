import { supabase } from "@/lib/supabase";

export interface ExpenseCategory {
  id: string;
  name_ar: string;
  name_en: string;
  icon?: string;
  color?: string;
  is_system: boolean;
  user_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Expense {
  id: string;
  expense_number?: string;
  category_id: string;
  property_id?: string;
  unit_id?: string;
  amount: number;
  description: string;
  expense_date: string;
  vendor?: string;
  payment_method?: string;
  notes?: string;
  attachment_url?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  category?: ExpenseCategory;
  property?: any;
  unit?: any;
}

export interface ExpenseStats {
  total_expenses: number;
  total_revenue: number;
  net_profit: number;
  expenses_by_category: Array<{
    category_name_ar: string;
    category_name_en: string;
    total: number;
  }>;
  monthly_trend: Array<{
    month: string;
    expenses: number;
    revenue: number;
  }>;
}

// ==================== Expense Categories ====================

export async function getExpenseCategories(): Promise<ExpenseCategory[]> {
  const { data, error } = await supabase
    .from("expense_categories")
    .select("*")
    .order("is_system", { ascending: false })
    .order("name_ar");

  if (error) throw error;
  return data || [];
}

export async function createExpenseCategory(
  category: Omit<ExpenseCategory, "id" | "created_at" | "updated_at" | "user_id" | "is_system">
): Promise<ExpenseCategory> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("expense_categories")
    .insert({
      ...category,
      user_id: user.id,
      is_system: false,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateExpenseCategory(
  id: string,
  updates: Partial<ExpenseCategory>
): Promise<ExpenseCategory> {
  const { data, error } = await supabase
    .from("expense_categories")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteExpenseCategory(id: string): Promise<void> {
  const { error } = await supabase
    .from("expense_categories")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

// ==================== Expenses ====================

export async function getExpenses(filters?: {
  property_id?: string;
  category_id?: string;
  start_date?: string;
  end_date?: string;
}): Promise<Expense[]> {
  let query = supabase
    .from("expenses")
    .select(`
      *,
      category:expense_categories(*),
      property:properties(id, name_ar, name_en),
      unit:units(id, name, unit_number)
    `)
    .order("expense_date", { ascending: false });

  if (filters?.property_id) {
    query = query.eq("property_id", filters.property_id);
  }
  if (filters?.category_id) {
    query = query.eq("category_id", filters.category_id);
  }
  if (filters?.start_date) {
    query = query.gte("expense_date", filters.start_date);
  }
  if (filters?.end_date) {
    query = query.lte("expense_date", filters.end_date);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data || [];
}

export async function createExpense(
  expense: Omit<Expense, "id" | "expense_number" | "created_at" | "updated_at" | "user_id">
): Promise<Expense> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("expenses")
    .insert({
      ...expense,
      user_id: user.id,
    })
    .select(`
      *,
      category:expense_categories(*),
      property:properties(id, name_ar, name_en),
      unit:units(id, name, unit_number)
    `)
    .single();

  if (error) throw error;
  return data;
}

export async function updateExpense(
  id: string,
  updates: Partial<Expense>
): Promise<Expense> {
  const { data, error } = await supabase
    .from("expenses")
    .update(updates)
    .eq("id", id)
    .select(`
      *,
      category:expense_categories(*),
      property:properties(id, name_ar, name_en),
      unit:units(id, name, unit_number)
    `)
    .single();

  if (error) throw error;
  return data;
}

export async function deleteExpense(id: string): Promise<void> {
  const { error } = await supabase.from("expenses").delete().eq("id", id);

  if (error) throw error;
}

// ==================== Statistics ====================

export async function getExpenseStats(
  startDate?: string,
  endDate?: string
): Promise<ExpenseStats> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  // إجمالي المصروفات
  let expensesQuery = supabase
    .from("expenses")
    .select("amount")
    .eq("user_id", user.id);

  if (startDate) expensesQuery = expensesQuery.gte("expense_date", startDate);
  if (endDate) expensesQuery = expensesQuery.lte("expense_date", endDate);

  const { data: expenses } = await expensesQuery;
  const total_expenses = expenses?.reduce((sum, e) => sum + Number(e.amount), 0) || 0;

  // إجمالي الإيرادات (من الحجوزات)
  let revenueQuery = supabase
    .from("reservations")
    .select("total_price")
    .eq("user_id", user.id)
    .eq("status", "confirmed");

  if (startDate) revenueQuery = revenueQuery.gte("check_in", startDate);
  if (endDate) revenueQuery = revenueQuery.lte("check_out", endDate);

  const { data: reservations } = await revenueQuery;
  const total_revenue = reservations?.reduce((sum, r) => sum + Number(r.total_price), 0) || 0;

  // صافي الربح
  const net_profit = total_revenue - total_expenses;

  // المصروفات حسب الفئة
  const { data: categoryExpenses } = await supabase
    .from("expenses")
    .select(`
      category_id,
      amount,
      category:expense_categories(name_ar, name_en)
    `)
    .eq("user_id", user.id);

  const expensesByCategory = categoryExpenses?.reduce((acc: any[], exp: any) => {
    const existing = acc.find((c) => c.category_id === exp.category_id);
    if (existing) {
      existing.total += Number(exp.amount);
    } else {
      acc.push({
        category_id: exp.category_id,
        category_name_ar: exp.category?.name_ar || "",
        category_name_en: exp.category?.name_en || "",
        total: Number(exp.amount),
      });
    }
    return acc;
  }, []) || [];

  return {
    total_expenses,
    total_revenue,
    net_profit,
    expenses_by_category: expensesByCategory,
    monthly_trend: [], // يمكن إضافة تفاصيل أكثر لاحقاً
  };
}