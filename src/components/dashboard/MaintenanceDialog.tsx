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

interface MaintenanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit" | "view";
  ticket?: any;
  onSuccess?: () => void;
}

export function MaintenanceDialog({ open, onOpenChange, mode, ticket, onSuccess }: MaintenanceDialogProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [units, setUnits] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    unit_id: "",
    assigned_to: "",
    title: "",
    description: "",
    severity: "medium", // this might need to be priority instead of severity based on DB
    status: "open",
    estimated_cost: 0,
    actual_cost: 0,
    category: "general", // added
  });

  useEffect(() => {
    const fetchData = async () => {
      const [unitsRes, usersRes] = await Promise.all([
        supabase.from("units").select("id, name, properties(name, name_ar)"),
        supabase.from("users").select("id, full_name, role").eq("role", "maintenance")
      ]);

      if (!unitsRes.error && unitsRes.data) setUnits(unitsRes.data);
      if (!usersRes.error && usersRes.data) setUsers(usersRes.data);
    };

    if (open) fetchData();
  }, [open]);

  useEffect(() => {
    if (ticket && (mode === "edit" || mode === "view")) {
      setFormData({
        unit_id: ticket.unit_id || "",
        assigned_to: ticket.assigned_to || "",
        title: ticket.title || "",
        description: ticket.description || "",
        severity: ticket.priority || ticket.severity || "medium",
        status: ticket.status || "open",
        estimated_cost: ticket.estimated_cost || 0,
        actual_cost: ticket.actual_cost || 0,
        category: ticket.category || "general",
      });
    } else if (mode === "add") {
      setFormData({
        unit_id: "",
        assigned_to: "",
        title: "",
        description: "",
        severity: "medium",
        status: "open",
        estimated_cost: 0,
        actual_cost: 0,
        category: "general",
      });
    }
  }, [ticket, mode, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!formData.unit_id || !formData.title) {
        throw new Error("يرجى ملء جميع الحقول المطلوبة");
      }

      // Get property_id from selected unit
      const selectedUnit = units.find(u => u.id === formData.unit_id);
      const property_id = selectedUnit?.properties?.id || selectedUnit?.property_id;

      // Rename severity to priority for DB
      const { severity, ...restFormData } = formData;
      const payload = {
        ...restFormData,
        priority: severity,
        property_id: property_id || formData.unit_id,
      };

      if (mode === "add") {
        const insertPayload = {
          ...payload,
          ticket_number: `TKT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        };

        const { error } = await supabase
          .from("maintenance_tickets")
          .insert([insertPayload]);

        if (error) throw error;

        toast({
          title: "✅ تم إضافة الطلب بنجاح",
          description: "تم إضافة طلب الصيانة الجديد",
        });
      } else if (mode === "edit") {
        const { error } = await supabase
          .from("maintenance_tickets")
          .update(payload)
          .eq("id", ticket.id);

        if (error) throw error;

        toast({
          title: "✅ تم تحديث الطلب بنجاح",
          description: "تم تحديث بيانات طلب الصيانة",
        });
      }

      onOpenChange(false);
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error("Error saving ticket:", error);
      toast({
        title: "❌ حدث خطأ",
        description: error.message || "فشل حفظ الطلب",
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
            {mode === "add" ? "إضافة طلب صيانة" : mode === "edit" ? "تعديل الطلب" : "تفاصيل الطلب"}
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

            <div className="grid gap-2">
              <Label htmlFor="title">عنوان المشكلة *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                disabled={mode === "view"}
                placeholder="مثال: تسرب مياه في الحمام"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">وصف المشكلة</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                disabled={mode === "view"}
                rows={3}
                placeholder="تفاصيل المشكلة..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="severity">الأولوية</Label>
                <Select
                  value={formData.severity}
                  onValueChange={(value) => setFormData({ ...formData, severity: value })}
                  disabled={mode === "view"}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">منخفض</SelectItem>
                    <SelectItem value="medium">متوسط</SelectItem>
                    <SelectItem value="high">عالي</SelectItem>
                    <SelectItem value="critical">حرج</SelectItem>
                  </SelectContent>
                </Select>
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
                    <SelectItem value="open">مفتوح</SelectItem>
                    <SelectItem value="in_progress">قيد التنفيذ</SelectItem>
                    <SelectItem value="resolved">تم الحل</SelectItem>
                    <SelectItem value="closed">مغلق</SelectItem>
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
                  <SelectValue placeholder="اختر الفني" />
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
                <Label htmlFor="estimated_cost">التكلفة المقدرة (﷼)</Label>
                <Input
                  id="estimated_cost"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.estimated_cost}
                  onChange={(e) => setFormData({ ...formData, estimated_cost: parseFloat(e.target.value) })}
                  disabled={mode === "view"}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="actual_cost">التكلفة الفعلية (﷼)</Label>
                <Input
                  id="actual_cost"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.actual_cost}
                  onChange={(e) => setFormData({ ...formData, actual_cost: parseFloat(e.target.value) })}
                  disabled={mode === "view"}
                />
              </div>
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