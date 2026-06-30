import { supabase } from "@/lib/supabase";
import type { Database } from "@/integrations/supabase/types";

type ExpenseCategory = Database["public"]["Tables"]["expense_categories"]["Row"];
type ExpenseCategoryInsert = Database["public"]["Tables"]["expense_categories"]["Insert"];
type Expense = Database["public"]["Tables"]["expenses"]["Row"];
type ExpenseInsert = Database["public"]["Tables"]["expenses"]["Insert"];
type ExpenseUpdate = Database["public"]["Tables"]["expenses"]["Update"];

export interface ExpenseWithCategory extends Expense {
  expense_categories: ExpenseCategory;
  properties?: { name: string; name_ar: string } | null;
  units?: { unit_number: string } | null;
}

// Custom interface for updating expenses (expense_number is auto-generated, not updated)
export interface ExpenseUpdateData {
  title?: string;
  description?: string | null;
  category_id?: string;
  property_id?: string | null;
  unit_id?: string | null;
  amount?: number;
  expense_date?: string;
  status?: "pending" | "approved" | "paid" | "rejected";
  payment_method?: string | null;
  receipt_url?: string | null;
  notes?: string | null;
  approved_by?: string | null;
  approved_at?: string | null;
}

export const expensesService = {
  // ===== Categories =====
  async getCategories() {
    const { data, error } = await supabase
      .from("expense_categories")
      .select("*")
      .eq("is_active", true)
      .order("name");

    if (error) throw error;
    return data;
  },

  async createCategory(category: ExpenseCategoryInsert) {
    const { data, error } = await supabase
      .from("expense_categories")
      .insert(category)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateCategory(id: string, updates: Partial<ExpenseCategoryInsert>) {
    const { data, error } = await supabase
      .from("expense_categories")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteCategory(id: string) {
    const { error } = await supabase
      .from("expense_categories")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },

  // ===== Expenses =====
  async getExpenses(filters?: {
    startDate?: string;
    endDate?: string;
    propertyId?: string;
    categoryId?: string;
    status?: string;
  }) {
    let query = supabase
      .from("expenses")
      .select(`
        *,
        expense_categories!inner(*),
        properties(name, name_ar),
        units(unit_number)
      `)
      .order("expense_date", { ascending: false });

    if (filters?.startDate) {
      query = query.gte("expense_date", filters.startDate);
    }
    if (filters?.endDate) {
      query = query.lte("expense_date", filters.endDate);
    }
    if (filters?.propertyId) {
      query = query.eq("property_id", filters.propertyId);
    }
    if (filters?.categoryId) {
      query = query.eq("category_id", filters.categoryId);
    }
    if (filters?.status) {
      query = query.eq("status", filters.status);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as ExpenseWithCategory[];
  },

  async getExpenseById(id: string) {
    const { data, error } = await supabase
      .from("expenses")
      .select(`
        *,
        expense_categories(*),
        properties(name, name_ar),
        units(unit_number)
      `)
      .eq("id", id)
      .single();

    if (error) throw error;
    return data as ExpenseWithCategory;
  },

  async createExpense(expense: ExpenseInsert) {
    // Generate expense number
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
    const expenseNumber = `EXP-${timestamp}-${random}`;

    const { data, error } = await supabase
      .from("expenses")
      .insert({
        ...expense,
        expense_number: expenseNumber,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateExpense(id: string, updates: ExpenseUpdateData) {
    const { data, error } = await supabase
      .from("expenses")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteExpense(id: string) {
    const { error } = await supabase
      .from("expenses")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },

  // ===== Statistics =====
  async getTotalExpenses(filters?: {
    startDate?: string;
    endDate?: string;
    propertyId?: string;
  }) {
    let query = supabase
      .from("expenses")
      .select("amount", { count: "exact" })
      .eq("status", "paid");

    if (filters?.startDate) {
      query = query.gte("expense_date", filters.startDate);
    }
    if (filters?.endDate) {
      query = query.lte("expense_date", filters.endDate);
    }
    if (filters?.propertyId) {
      query = query.eq("property_id", filters.propertyId);
    }

    const { data, error } = await query;
    if (error) throw error;

    const total = data?.reduce((sum, exp) => sum + Number(exp.amount), 0) || 0;
    return { total, count: data?.length || 0 };
  },

  async getExpensesByCategory(filters?: {
    startDate?: string;
    endDate?: string;
    propertyId?: string;
  }) {
    let query = supabase
      .from("expenses")
      .select(`
        amount,
        expense_categories(name, name_ar, color)
      `)
      .eq("status", "paid");

    if (filters?.startDate) {
      query = query.gte("expense_date", filters.startDate);
    }
    if (filters?.endDate) {
      query = query.lte("expense_date", filters.endDate);
    }
    if (filters?.propertyId) {
      query = query.eq("property_id", filters.propertyId);
    }

    const { data, error } = await query;
    if (error) throw error;

    // Group by category
    const grouped = (data || []).reduce((acc: any, exp: any) => {
      const catName = exp.expense_categories?.name_ar || "غير محدد";
      const catColor = exp.expense_categories?.color || "#64748b";
      
      if (!acc[catName]) {
        acc[catName] = { 
          name: catName, 
          total: 0, 
          count: 0,
          color: catColor 
        };
      }
      acc[catName].total += Number(exp.amount);
      acc[catName].count += 1;
      return acc;
    }, {});

    return Object.values(grouped);
  },
};