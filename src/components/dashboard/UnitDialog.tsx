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

interface UnitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit" | "view";
  unit?: any;
  onSuccess?: () => void;
}

export function UnitDialog({ open, onOpenChange, mode, unit, onSuccess }: UnitDialogProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    property_id: "",
    name: "",
    unit_number: "",
    type: "studio",
    status: "available",
    floor: 1,
    bedrooms: 1,
    bathrooms: 1,
    max_guests: 2,
    area_sqm: 50,
    base_price: 300,
  });

  // Fetch properties for dropdown
  useEffect(() => {
    const fetchProperties = async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("id, name, name_ar")
        .eq("status", "active");

      if (!error && data) {
        setProperties(data);
      }
    };

    if (open) {
      fetchProperties();
    }
  }, [open]);

  useEffect(() => {
    if (unit && (mode === "edit" || mode === "view")) {
      setFormData({
        property_id: unit.property_id || "",
        name: unit.name || "",
        unit_number: unit.unit_number || "",
        type: unit.type || "studio",
        status: unit.status || "available",
        floor: unit.floor || 1,
        bedrooms: unit.bedrooms || 1,
        bathrooms: unit.bathrooms || 1,
        max_guests: unit.max_guests || 2,
        area_sqm: unit.area_sqm || 50,
        base_price: unit.base_price || 300,
      });
    } else if (mode === "add") {
      setFormData({
        property_id: "",
        name: "",
        unit_number: "",
        type: "studio",
        status: "available",
        floor: 1,
        bedrooms: 1,
        bathrooms: 1,
        max_guests: 2,
        area_sqm: 50,
        base_price: 300,
      });
    }
  }, [unit, mode, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!formData.property_id) {
        throw new Error("يرجى اختيار العقار");
      }

      if (mode === "add") {
        const { data, error } = await supabase
          .from("units")
          .insert([formData])
          .select();

        if (error) throw error;

        toast({
          title: "✅ تم إضافة الوحدة بنجاح",
          description: `تم إضافة "${formData.name}" إلى قائمة الوحدات`,
        });
      } else if (mode === "edit") {
        const { data, error } = await supabase
          .from("units")
          .update(formData)
          .eq("id", unit.id)
          .select();

        if (error) throw error;

        toast({
          title: "✅ تم تحديث الوحدة بنجاح",
          description: `تم تحديث بيانات "${formData.name}"`,
        });
      }

      onOpenChange(false);
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error("Error saving unit:", error);
      toast({
        title: "❌ حدث خطأ",
        description: error.message || "فشل حفظ الوحدة. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {mode === "add" ? "إضافة وحدة جديدة" : mode === "edit" ? "تعديل الوحدة" : "تفاصيل الوحدة"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="property_id">العقار التابع له *</Label>
              <Select
                value={formData.property_id}
                onValueChange={(value) => setFormData({ ...formData, property_id: value })}
                disabled={mode === "view"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر العقار" />
                </SelectTrigger>
                <SelectContent>
                  {properties.map((prop) => (
                    <SelectItem key={prop.id} value={prop.id}>
                      {prop.name_ar || prop.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">اسم / رقم الوحدة *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={mode === "view"}
                  placeholder="مثال: جناح 101"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="unit_number">رقم الوحدة</Label>
                <Input
                  id="unit_number"
                  value={formData.unit_number}
                  onChange={(e) => setFormData({ ...formData, unit_number: e.target.value })}
                  disabled={mode === "view"}
                  placeholder="101"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="type">نوع الوحدة *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                  disabled={mode === "view"}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="studio">استديو</SelectItem>
                    <SelectItem value="1br">غرفة واحدة</SelectItem>
                    <SelectItem value="2br">غرفتين</SelectItem>
                    <SelectItem value="3br">3 غرف</SelectItem>
                    <SelectItem value="4br">4 غرف</SelectItem>
                    <SelectItem value="penthouse">بنتهاوس</SelectItem>
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
                    <SelectItem value="available">متاح</SelectItem>
                    <SelectItem value="occupied">مشغول</SelectItem>
                    <SelectItem value="cleaning">تنظيف</SelectItem>
                    <SelectItem value="maintenance">صيانة</SelectItem>
                    <SelectItem value="blocked">محجوب</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="bedrooms">عدد الغرف</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  min="0"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) })}
                  disabled={mode === "view"}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="bathrooms">عدد الحمامات</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  min="1"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({ ...formData, bathrooms: parseInt(e.target.value) })}
                  disabled={mode === "view"}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="max_guests">القدرة الاستيعابية</Label>
                <Input
                  id="max_guests"
                  type="number"
                  min="1"
                  value={formData.max_guests}
                  onChange={(e) => setFormData({ ...formData, max_guests: parseInt(e.target.value) })}
                  disabled={mode === "view"}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="floor">الطابق</Label>
                <Input
                  id="floor"
                  type="number"
                  min="0"
                  value={formData.floor}
                  onChange={(e) => setFormData({ ...formData, floor: parseInt(e.target.value) })}
                  disabled={mode === "view"}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="area_sqm">المساحة (م²)</Label>
                <Input
                  id="area_sqm"
                  type="number"
                  min="10"
                  value={formData.area_sqm}
                  onChange={(e) => setFormData({ ...formData, area_sqm: parseInt(e.target.value) })}
                  disabled={mode === "view"}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="base_price">السعر (﷼/ليلة) *</Label>
                <Input
                  id="base_price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.base_price}
                  onChange={(e) => setFormData({ ...formData, base_price: parseFloat(e.target.value) })}
                  disabled={mode === "view"}
                  required
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
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
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