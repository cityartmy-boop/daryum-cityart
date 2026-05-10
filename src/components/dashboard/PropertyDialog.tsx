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

interface PropertyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit" | "view";
  property?: any;
  onSuccess?: () => void;
}

export function PropertyDialog({ open, onOpenChange, mode, property, onSuccess }: PropertyDialogProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    name_ar: "",
    type: "apartment",
    address: "",
    city: "riyadh",
    description: "",
    image_url: "",
  });

  useEffect(() => {
    if (property && (mode === "edit" || mode === "view")) {
      setFormData({
        name: property.name || "",
        name_ar: property.name_ar || property.name || "",
        type: property.type || "apartment",
        address: property.address || property.location || "",
        city: property.city || "riyadh",
        description: property.description || "",
        image_url: property.image_url || property.image || "",
      });
    } else if (mode === "add") {
      // Reset form for new property
      setFormData({
        name: "",
        name_ar: "",
        type: "apartment",
        address: "",
        city: "riyadh",
        description: "",
        image_url: "",
      });
    }
  }, [property, mode, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("يجب تسجيل الدخول أولاً");
      }

      if (mode === "add") {
        // Insert new property
        const { data, error } = await supabase
          .from("properties")
          .insert([
            {
              ...formData,
              owner_id: user.id,
              status: "active",
            },
          ])
          .select();

        if (error) throw error;

        toast({
          title: "✅ تم إضافة العقار بنجاح",
          description: `تم إضافة "${formData.name_ar}" إلى قائمة العقارات`,
        });
      } else if (mode === "edit") {
        // Update existing property
        const { data, error } = await supabase
          .from("properties")
          .update(formData)
          .eq("id", property.id)
          .select();

        if (error) throw error;

        toast({
          title: "✅ تم تحديث العقار بنجاح",
          description: `تم تحديث بيانات "${formData.name_ar}"`,
        });
      }

      onOpenChange(false);
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error("Error saving property:", error);
      toast({
        title: "❌ حدث خطأ",
        description: error.message || "فشل حفظ العقار. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {mode === "add" ? "إضافة عقار جديد" : mode === "edit" ? "تعديل العقار" : "تفاصيل العقار"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name_ar">اسم العقار (بالعربية) *</Label>
              <Input
                id="name_ar"
                value={formData.name_ar}
                onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                disabled={mode === "view"}
                placeholder="مثال: برج الفيصلية الفاخر"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="name">اسم العقار (بالإنجليزية)</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={mode === "view"}
                placeholder="Example: Al Faisaliah Tower"
                dir="ltr"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="type">نوع العقار *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                  disabled={mode === "view"}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">شقق سكنية</SelectItem>
                    <SelectItem value="villa">فلل</SelectItem>
                    <SelectItem value="hotel">فندقية</SelectItem>
                    <SelectItem value="chalet">شاليهات</SelectItem>
                    <SelectItem value="compound">مجمع سكني</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="city">المدينة *</Label>
                <Select
                  value={formData.city}
                  onValueChange={(value) => setFormData({ ...formData, city: value })}
                  disabled={mode === "view"}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="riyadh">الرياض</SelectItem>
                    <SelectItem value="jeddah">جدة</SelectItem>
                    <SelectItem value="dammam">الدمام</SelectItem>
                    <SelectItem value="khobar">الخبر</SelectItem>
                    <SelectItem value="makkah">مكة المكرمة</SelectItem>
                    <SelectItem value="madinah">المدينة المنورة</SelectItem>
                    <SelectItem value="khamis_mushait">خميس مشيط</SelectItem>
                    <SelectItem value="taif">الطائف</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="address">العنوان الكامل *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                disabled={mode === "view"}
                placeholder="مثال: حي الملقا، شارع الأمير سلطان"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">الوصف</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                disabled={mode === "view"}
                placeholder="وصف تفصيلي للعقار والمرافق المتوفرة..."
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="image_url">رابط الصورة</Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                disabled={mode === "view"}
                placeholder="https://example.com/image.jpg"
                dir="ltr"
              />
              {formData.image_url && (
                <img
                  src={formData.image_url}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded-lg mt-2"
                />
              )}
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