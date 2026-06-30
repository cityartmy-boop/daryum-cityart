import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { expensesService, type ExpenseWithCategory } from "@/services/expenses.service";
import { PropertiesService } from "@/services/properties.service";
import { UnitsService } from "@/services/units.service";
import type { Database } from "@/integrations/supabase/types";

type ExpenseCategory = Database["public"]["Tables"]["expense_categories"]["Row"];
type Property = Database["public"]["Tables"]["properties"]["Row"];
type Unit = Database["public"]["Tables"]["units"]["Row"];

interface ExpenseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  expense: ExpenseWithCategory | null;
  onSuccess: () => void;
}

export function ExpenseDialog({ open, onOpenChange, expense, onSuccess }: ExpenseDialogProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<ExpenseCategory[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category_id: "",
    property_id: "",
    unit_id: "",
    amount: "",
    expense_date: new Date().toISOString().split("T")[0],
    status: "pending" as "pending" | "approved" | "paid" | "rejected",
    payment_method: "",
    vendor: "",
    receipt_url: "",
    notes: "",
  });

  useEffect(() => {
    if (open) {
      loadData();
      if (expense) {
        setFormData({
          title: expense.title,
          description: expense.description || "",
          category_id: expense.category_id,
          property_id: expense.property_id || "",
          unit_id: expense.unit_id || "",
          amount: expense.amount.toString(),
          expense_date: expense.expense_date,
          status: expense.status as "pending" | "approved" | "paid" | "rejected",
          payment_method: expense.payment_method || "",
          vendor: "",
          receipt_url: expense.receipt_url || "",
          notes: expense.notes || "",
        });
      } else {
        resetForm();
      }
    }
  }, [open, expense]);

  useEffect(() => {
    if (formData.property_id) {
      loadUnits(formData.property_id);
    } else {
      setUnits([]);
      setFormData((prev) => ({ ...prev, unit_id: "" }));
    }
  }, [formData.property_id]);

  const loadData = async () => {
    try {
      const [categoriesData, propertiesData] = await Promise.all([
        expensesService.getCategories(),
        PropertiesService.getAll(),
      ]);
      setCategories(categoriesData);
      setProperties(propertiesData);
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const loadUnits = async (propertyId: string) => {
    try {
      const unitsData = await UnitsService.getByProperty(propertyId);
      setUnits(unitsData);
    } catch (error: any) {
      console.error("Error loading units:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.category_id || !formData.amount) {
      toast({
        title: "خطأ",
        description: "الرجاء ملء الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const data = {
        title: formData.title,
        description: formData.description || null,
        category_id: formData.category_id,
        property_id: formData.property_id || null,
        unit_id: formData.unit_id || null,
        amount: parseFloat(formData.amount),
        expense_date: formData.expense_date,
        status: formData.status,
        payment_method: formData.payment_method || null,
        receipt_url: formData.receipt_url || null,
        notes: formData.notes || null,
      };

      if (expense) {
        await expensesService.updateExpense(expense.id, data);
        toast({ title: "تم تحديث المصروف بنجاح" });
      } else {
        await expensesService.createExpense(data);
        toast({ title: "تم إضافة المصروف بنجاح" });
      }

      onSuccess();
      onOpenChange(false);
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

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category_id: "",
      property_id: "",
      unit_id: "",
      amount: "",
      expense_date: new Date().toISOString().split("T")[0],
      status: "pending",
      payment_method: "",
      vendor: "",
      receipt_url: "",
      notes: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {expense ? "تعديل المصروف" : "إضافة مصروف جديد"}
          </DialogTitle>
          <DialogDescription>
            سجّل مصروف جديد وربطه بعقار أو وحدة
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>عنوان المصروف *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="مثال: صيانة مكيف الهواء"
                required
              />
            </div>

            <div>
              <Label>الفئة *</Label>
              <Select value={formData.category_id} onValueChange={(value) => setFormData({ ...formData, category_id: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الفئة" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name_ar}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>الوصف</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="تفاصيل إضافية عن المصروف..."
              rows={2}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>العقار</Label>
              <Select value={formData.property_id} onValueChange={(value) => setFormData({ ...formData, property_id: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر العقار (اختياري)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">بدون عقار</SelectItem>
                  {properties.map((prop) => (
                    <SelectItem key={prop.id} value={prop.id}>
                      {prop.name_ar}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>الوحدة</Label>
              <Select 
                value={formData.unit_id} 
                onValueChange={(value) => setFormData({ ...formData, unit_id: value })}
                disabled={!formData.property_id}
              >
                <SelectTrigger>
                  <SelectValue placeholder={formData.property_id ? "اختر الوحدة (اختياري)" : "اختر العقار أولاً"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">بدون وحدة</SelectItem>
                  {units.map((unit) => (
                    <SelectItem key={unit.id} value={unit.id}>
                      {unit.unit_number}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label>المبلغ (ر.س) *</Label>
              <Input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="0.00"
                required
              />
            </div>

            <div>
              <Label>التاريخ *</Label>
              <Input
                type="date"
                value={formData.expense_date}
                onChange={(e) => setFormData({ ...formData, expense_date: e.target.value })}
                required
              />
            </div>

            <div>
              <Label>الحالة</Label>
              <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">قيد الانتظار</SelectItem>
                  <SelectItem value="approved">معتمد</SelectItem>
                  <SelectItem value="paid">مدفوع</SelectItem>
                  <SelectItem value="rejected">مرفوض</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>طريقة الدفع</Label>
              <Input
                value={formData.payment_method}
                onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
                placeholder="مثال: نقدي، بنكي، بطاقة"
              />
            </div>

            <div>
              <Label>المورد / الجهة</Label>
              <Input
                value={formData.vendor}
                onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                placeholder="اسم المورد أو الشركة"
              />
            </div>
          </div>

          <div>
            <Label>رابط الفاتورة / الإيصال</Label>
            <Input
              type="url"
              value={formData.receipt_url}
              onChange={(e) => setFormData({ ...formData, receipt_url: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <div>
            <Label>ملاحظات</Label>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="أي ملاحظات إضافية..."
              rows={2}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "جاري الحفظ..." : expense ? "تحديث المصروف" : "إضافة المصروف"}
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              إلغاء
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}