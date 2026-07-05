import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import {
  getExpenseCategories,
  createExpense,
  updateExpense,
  type ExpenseCategory,
  type Expense,
} from "@/services/expenses.service";
import { getProperties, type Property } from "@/services/properties.service";
import { getUnits, type Unit } from "@/services/units.service";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  expense?: Expense | null;
  onSuccess?: () => void;
}

export function ExpenseDialog({ open, onOpenChange, expense, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<ExpenseCategory[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [formData, setFormData] = useState({
    category_id: "",
    property_id: "",
    unit_id: "",
    amount: "",
    description: "",
    expense_date: new Date().toISOString().split("T")[0],
    vendor: "",
    payment_method: "cash",
    notes: "",
  });

  useEffect(() => {
    if (open) {
      loadData();
      if (expense) {
        setFormData({
          category_id: expense.category_id,
          property_id: expense.property_id || "",
          unit_id: expense.unit_id || "",
          amount: expense.amount.toString(),
          description: expense.description,
          expense_date: expense.expense_date,
          vendor: expense.vendor || "",
          payment_method: expense.payment_method || "cash",
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

  async function loadData() {
    try {
      const [categoriesData, propertiesData] = await Promise.all([
        getExpenseCategories(),
        getProperties(),
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
  }

  async function loadUnits(propertyId: string) {
    try {
      const unitsData = await getUnits({ property_id: propertyId });
      setUnits(unitsData);
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  function resetForm() {
    setFormData({
      category_id: "",
      property_id: "",
      unit_id: "",
      amount: "",
      description: "",
      expense_date: new Date().toISOString().split("T")[0],
      vendor: "",
      payment_method: "cash",
      notes: "",
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        category_id: formData.category_id,
        property_id: formData.property_id || undefined,
        unit_id: formData.unit_id || undefined,
        amount: parseFloat(formData.amount),
        description: formData.description,
        expense_date: formData.expense_date,
        vendor: formData.vendor || undefined,
        payment_method: formData.payment_method || undefined,
        notes: formData.notes || undefined,
      };

      if (expense) {
        await updateExpense(expense.id, data);
        toast({ title: "تم تحديث المصروف بنجاح" });
      } else {
        await createExpense(data);
        toast({ title: "تم إضافة المصروف بنجاح" });
      }

      onSuccess?.();
      onOpenChange(false);
      resetForm();
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{expense ? "تعديل مصروف" : "إضافة مصروف جديد"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Category */}
            <div className="space-y-2">
              <Label>
                فئة المصروف <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.category_id}
                onValueChange={(v) => setFormData({ ...formData, category_id: v })}
                required
              >
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

            {/* Amount */}
            <div className="space-y-2">
              <Label>
                المبلغ (ريال) <span className="text-destructive">*</span>
              </Label>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>
              تفاصيل المصروف <span className="text-destructive">*</span>
            </Label>
            <Input
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              placeholder="مثال: صيانة مكيف الوحدة 201"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Date */}
            <div className="space-y-2">
              <Label>
                التاريخ <span className="text-destructive">*</span>
              </Label>
              <Input
                type="date"
                value={formData.expense_date}
                onChange={(e) => setFormData({ ...formData, expense_date: e.target.value })}
                required
              />
            </div>

            {/* Payment Method */}
            <div className="space-y-2">
              <Label>طريقة الدفع</Label>
              <Select
                value={formData.payment_method}
                onValueChange={(v) => setFormData({ ...formData, payment_method: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">نقدي</SelectItem>
                  <SelectItem value="bank_transfer">تحويل بنكي</SelectItem>
                  <SelectItem value="credit_card">بطاقة ائتمان</SelectItem>
                  <SelectItem value="check">شيك</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Property */}
            <div className="space-y-2">
              <Label>العقار (اختياري)</Label>
              <Select
                value={formData.property_id}
                onValueChange={(v) => setFormData({ ...formData, property_id: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر العقار" />
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

            {/* Unit */}
            <div className="space-y-2">
              <Label>الوحدة (اختياري)</Label>
              <Select
                value={formData.unit_id}
                onValueChange={(v) => setFormData({ ...formData, unit_id: v })}
                disabled={!formData.property_id || units.length === 0}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر الوحدة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">بدون وحدة</SelectItem>
                  {units.map((unit) => (
                    <SelectItem key={unit.id} value={unit.id}>
                      {unit.name} - {unit.unit_number}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Vendor */}
          <div className="space-y-2">
            <Label>المورّد / الجهة (اختياري)</Label>
            <Input
              value={formData.vendor}
              onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
              placeholder="مثال: شركة الصيانة السريعة"
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label>ملاحظات (اختياري)</Label>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="أي ملاحظات إضافية..."
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {expense ? "تحديث المصروف" : "إضافة المصروف"}
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