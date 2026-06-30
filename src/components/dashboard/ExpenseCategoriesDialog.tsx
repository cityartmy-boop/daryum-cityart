import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { expensesService } from "@/services/expenses.service";
import { Plus, Trash2, Edit, Check, X } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type ExpenseCategory = Database["public"]["Tables"]["expense_categories"]["Row"];

interface ExpenseCategoriesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const ICON_OPTIONS = [
  "Zap", "Droplets", "Wrench", "Sparkles", "Users", 
  "FileText", "Car", "ShoppingCart", "Wifi", "Phone",
  "Coffee", "Home", "Package", "Truck", "Percent", "MoreHorizontal"
];

const COLOR_OPTIONS = [
  "#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6",
  "#ec4899", "#14b8a6", "#f97316", "#06b6d4", "#64748b"
];

export function ExpenseCategoriesDialog({ open, onOpenChange, onSuccess }: ExpenseCategoriesDialogProps) {
  const { toast } = useToast();
  const [categories, setCategories] = useState<ExpenseCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    name_ar: "",
    description: "",
    icon: "MoreHorizontal",
    color: "#64748b",
  });

  useEffect(() => {
    if (open) {
      loadCategories();
    }
  }, [open]);

  const loadCategories = async () => {
    try {
      const data = await expensesService.getCategories();
      setCategories(data);
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name_ar) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال اسم الفئة بالعربية",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      if (editingId) {
        await expensesService.updateCategory(editingId, formData);
        toast({ title: "تم تحديث الفئة بنجاح" });
      } else {
        await expensesService.createCategory({
          ...formData,
          name: formData.name || formData.name_ar,
        });
        toast({ title: "تم إضافة الفئة بنجاح" });
      }
      
      resetForm();
      loadCategories();
      onSuccess();
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

  const handleEdit = (category: ExpenseCategory) => {
    setEditingId(category.id);
    setFormData({
      name: category.name,
      name_ar: category.name_ar,
      description: category.description || "",
      icon: category.icon || "MoreHorizontal",
      color: category.color || "#64748b",
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذه الفئة؟")) return;

    try {
      await expensesService.deleteCategory(id);
      toast({ title: "تم حذف الفئة بنجاح" });
      loadCategories();
      onSuccess();
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: "",
      name_ar: "",
      description: "",
      icon: "MoreHorizontal",
      color: "#64748b",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">إدارة فئات المصروفات</DialogTitle>
          <DialogDescription>
            أضف وعدّل فئات المصروفات المخصصة لمشروعك
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Form */}
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/30">
              <h3 className="font-semibold mb-4">
                {editingId ? "تعديل الفئة" : "إضافة فئة جديدة"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>الاسم بالعربية *</Label>
                  <Input
                    value={formData.name_ar}
                    onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                    placeholder="مثال: صيانة دورية"
                    required
                  />
                </div>

                <div>
                  <Label>الاسم بالإنجليزية</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Optional: maintenance"
                  />
                </div>

                <div>
                  <Label>الوصف</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="وصف مختصر للفئة..."
                    rows={2}
                  />
                </div>

                <div>
                  <Label>الأيقونة</Label>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {ICON_OPTIONS.map((icon) => (
                      <button
                        key={icon}
                        type="button"
                        onClick={() => setFormData({ ...formData, icon })}
                        className={`p-2 rounded border transition-all ${
                          formData.icon === icon
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>اللون</Label>
                  <div className="grid grid-cols-5 gap-2 mt-2">
                    {COLOR_OPTIONS.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setFormData({ ...formData, color })}
                        className={`h-10 rounded border-2 transition-all ${
                          formData.color === color
                            ? "border-foreground scale-110"
                            : "border-transparent hover:scale-105"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button type="submit" disabled={loading} className="flex-1">
                    {loading ? "جاري الحفظ..." : editingId ? "تحديث" : "إضافة"}
                  </Button>
                  {editingId && (
                    <Button type="button" variant="outline" onClick={resetForm}>
                      إلغاء
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Categories List */}
          <div className="space-y-2">
            <h3 className="font-semibold mb-3">الفئات الحالية</h3>
            {categories.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                لا توجد فئات بعد
              </div>
            ) : (
              categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:border-primary/50 transition-colors"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: category.color }}
                  >
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{category.name_ar}</div>
                    {category.description && (
                      <div className="text-sm text-muted-foreground">{category.description}</div>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(category)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(category.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}