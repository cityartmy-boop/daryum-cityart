import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
  createExpenseCategory,
  updateExpenseCategory,
  deleteExpenseCategory,
  type ExpenseCategory,
} from "@/services/expenses.service";
import {
  Users,
  Wrench,
  Sparkles,
  Home,
  Receipt,
  Zap,
  Shield,
  TrendingUp,
  Scale,
  MoreHorizontal,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

const iconMap: Record<string, any> = {
  Users,
  Wrench,
  Sparkles,
  Home,
  Receipt,
  Zap,
  Shield,
  TrendingUp,
  Scale,
  MoreHorizontal,
};

const colorOptions = [
  { value: "blue", label: "أزرق", class: "bg-blue-500" },
  { value: "green", label: "أخضر", class: "bg-green-500" },
  { value: "red", label: "أحمر", class: "bg-red-500" },
  { value: "yellow", label: "أصفر", class: "bg-yellow-500" },
  { value: "purple", label: "بنفسجي", class: "bg-purple-500" },
  { value: "orange", label: "برتقالي", class: "bg-orange-500" },
  { value: "pink", label: "وردي", class: "bg-pink-500" },
  { value: "indigo", label: "نيلي", class: "bg-indigo-500" },
  { value: "gray", label: "رمادي", class: "bg-gray-500" },
  { value: "slate", label: "إردوازي", class: "bg-slate-500" },
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExpenseCategoriesDialog({ open, onOpenChange }: Props) {
  const [categories, setCategories] = useState<ExpenseCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ExpenseCategory | null>(null);
  const [formData, setFormData] = useState({
    name_ar: "",
    name_en: "",
    icon: "MoreHorizontal",
    color: "slate",
  });

  useEffect(() => {
    if (open) {
      loadCategories();
    }
  }, [open]);

  async function loadCategories() {
    try {
      setLoading(true);
      const data = await getExpenseCategories();
      setCategories(data);
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingCategory) {
        await updateExpenseCategory(editingCategory.id, formData);
        toast({ title: "تم تحديث الفئة بنجاح" });
      } else {
        await createExpenseCategory(formData);
        toast({ title: "تم إضافة الفئة بنجاح" });
      }

      setFormData({ name_ar: "", name_en: "", icon: "MoreHorizontal", color: "slate" });
      setEditingCategory(null);
      loadCategories();
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
    if (!confirm("هل أنت متأكد من حذف هذه الفئة؟")) return;

    try {
      setLoading(true);
      await deleteExpenseCategory(id);
      toast({ title: "تم حذف الفئة بنجاح" });
      loadCategories();
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

  function handleEdit(category: ExpenseCategory) {
    setEditingCategory(category);
    setFormData({
      name_ar: category.name_ar,
      name_en: category.name_en,
      icon: category.icon || "MoreHorizontal",
      color: category.color || "slate",
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>إدارة فئات المصروفات</DialogTitle>
        </DialogHeader>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-muted/50 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>الاسم بالعربية</Label>
              <Input
                value={formData.name_ar}
                onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                required
                placeholder="مثال: التسويق"
              />
            </div>
            <div className="space-y-2">
              <Label>الاسم بالإنجليزية</Label>
              <Input
                value={formData.name_en}
                onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                required
                placeholder="Example: Marketing"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>الأيقونة</Label>
              <Select value={formData.icon} onValueChange={(v) => setFormData({ ...formData, icon: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(iconMap).map((iconName) => {
                    const Icon = iconMap[iconName];
                    return (
                      <SelectItem key={iconName} value={iconName}>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          <span>{iconName}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>اللون</Label>
              <Select value={formData.color} onValueChange={(v) => setFormData({ ...formData, color: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map((color) => (
                    <SelectItem key={color.value} value={color.value}>
                      <div className="flex items-center gap-2">
                        <div className={`h-4 w-4 rounded ${color.class}`} />
                        <span>{color.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              <Plus className="h-4 w-4 ml-2" />
              {editingCategory ? "تحديث الفئة" : "إضافة فئة"}
            </Button>
            {editingCategory && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditingCategory(null);
                  setFormData({ name_ar: "", name_en: "", icon: "MoreHorizontal", color: "slate" });
                }}
              >
                إلغاء
              </Button>
            )}
          </div>
        </form>

        {/* Categories List */}
        <div className="space-y-2 mt-6">
          <h3 className="font-semibold text-sm text-muted-foreground">الفئات الحالية</h3>
          <div className="grid gap-2">
            {categories.map((category) => {
              const Icon = iconMap[category.icon || "MoreHorizontal"];
              return (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-3 bg-card border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-${category.color}-500/10`}>
                      <Icon className={`h-5 w-5 text-${category.color}-500`} />
                    </div>
                    <div>
                      <div className="font-medium">{category.name_ar}</div>
                      <div className="text-sm text-muted-foreground">{category.name_en}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {category.is_system && <Badge variant="secondary">نظامية</Badge>}
                    {!category.is_system && (
                      <>
                        <Button size="sm" variant="ghost" onClick={() => handleEdit(category)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(category.id)}
                          disabled={loading}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}