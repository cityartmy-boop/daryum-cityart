import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface HousekeepingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit" | "view";
  task?: any;
  onSuccess?: () => void;
}

export function HousekeepingDialog({ open, onOpenChange, mode, task, onSuccess }: HousekeepingDialogProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [units, setUnits] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    unit_id: "",
    assigned_to: "",
    task_type: "cleaning",
    status: "pending",
    priority: "normal",
    scheduled_date: "",
    scheduled_time: "",
    notes: "",
  });

  // Fetch units and users
  useEffect(() => {
    const fetchData = async () => {
      const [unitsRes, usersRes] = await Promise.all([
        supabase.from("units").select("id, name, properties(name, name_ar)"),
        supabase.from("users").select("id, full_name, role").in("role", ["cleaner", "housekeeping_supervisor"])
      ]);

      if (!unitsRes.error && unitsRes.data) setUnits(unitsRes.data);
      if (!usersRes.error && usersRes.data) setUsers(usersRes.data);
    };

    if (open) fetchData();
  }, [open]);

  useEffect(() => {
    if (task && (mode === "edit" || mode === "view")) {
      setFormData({
        unit_id: task.unit_id || "",
        assigned_to: task.assigned_to || "",
        task_type: task.task_type || "cleaning",
        status: task.status || "pending",
        priority: task.priority || "normal",
        scheduled_date: task.scheduled_date || "",
        scheduled_time: task.scheduled_time || "",
        notes: task.notes || "",
      });
    } else if (mode === "add") {
      setFormData({
        unit_id: "",
        assigned_to: "",
        task_type: "cleaning",
        status: "pending",
        priority: "normal",
        scheduled_date: "",
        scheduled_time: "",
        notes: "",
      });
    }
  }, [task, mode, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!formData.unit_id || !formData.scheduled_date) {
        throw new Error("يرجى ملء جميع الحقول المطلوبة");
      }

      if (mode === "add") {
        const { error } = await supabase
          .from("housekeeping_tasks")
          .insert([formData]);

        if (error) throw error;

        toast({
          title: "✅ تم إضافة المهمة بنجاح",
          description: "تم إضافة مهمة التنظيف الجديدة",
        });
      } else if (mode === "edit") {
        const { error } = await supabase
          .from("housekeeping_tasks")
          .update(formData)
          .eq("id", task.id);

        if (error) throw error;

        toast({
          title: "✅ تم تحديث المهمة بنجاح",
          description: "تم تحديث بيانات المهمة",
        });
      }

      onOpenChange(false);
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error("Error saving task:", error);
      toast({
        title: "❌ حدث خطأ",
        description: error.message || "فشل حفظ المهمة",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {mode === "add" ? "إضافة مهمة تنظيف" : mode === "edit" ? "تعديل المهمة" : "تفاصيل المهمة"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="unit_id">الوحدة *</Label>
              <Select
                value={formData.unit_id}
                onValueChange={(value) => setFormData({ ...formData, unit_id: value })}
                disabled={mode === "view"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر الوحدة" />
                </SelectTrigger>
                <SelectContent>
                  {units.map((unit) => (
                    <SelectItem key={unit.id} value={unit.id}>
                      {unit.name} - {unit.properties?.name_ar || unit.properties?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="task_type">نوع المهمة</Label>
                <Select
                  value={formData.task_type}
                  onValueChange={(value) => setFormData({ ...formData, task_type: value })}
                  disabled={mode === "view"}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cleaning">تنظيف عادي</SelectItem>
                    <SelectItem value="deep_clean">تنظيف عميق</SelectItem>
                    <SelectItem value="inspection">فحص</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="priority">الأولوية</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => setFormData({ ...formData, priority: value })}
                  disabled={mode === "view"}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">منخفض</SelectItem>
                    <SelectItem value="normal">عادي</SelectItem>
                    <SelectItem value="high">عالي</SelectItem>
                    <SelectItem value="urgent">عاجل</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="assigned_to">تعيين لـ</Label>
              <Select
                value={formData.assigned_to}
                onValueChange={(value) => setFormData({ ...formData, assigned_to: value })}
                disabled={mode === "view"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر العامل" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.full_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="scheduled_date">التاريخ *</Label>
                <Input
                  id="scheduled_date"
                  type="date"
                  value={formData.scheduled_date}
                  onChange={(e) => setFormData({ ...formData, scheduled_date: e.target.value })}
                  disabled={mode === "view"}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="scheduled_time">الوقت</Label>
                <Input
                  id="scheduled_time"
                  type="time"
                  value={formData.scheduled_time}
                  onChange={(e) => setFormData({ ...formData, scheduled_time: e.target.value })}
                  disabled={mode === "view"}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status">الحالة</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
                disabled={mode === "view"}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">قيد الانتظار</SelectItem>
                  <SelectItem value="in_progress">جارٍ التنفيذ</SelectItem>
                  <SelectItem value="completed">مكتمل</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">ملاحظات</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                disabled={mode === "view"}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              {mode === "view" ? "إغلاق" : "إلغاء"}
            </Button>
            {mode !== "view" && (
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                    جاري الحفظ...
                  </>
                ) : (
                  "حفظ"
                )}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}