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

interface ReservationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit" | "view";
  reservation?: any;
  onSuccess?: () => void;
}

export function ReservationDialog({ open, onOpenChange, mode, reservation, onSuccess }: ReservationDialogProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [units, setUnits] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    unit_id: "",
    property_id: "",
    guest_name: "",
    guest_email: "",
    guest_phone: "",
    check_in: "",
    check_out: "",
    guest_count: 1,
    status: "pending",
    source: "direct",
    total_amount: 0,
    paid_amount: 0,
    payment_status: "pending",
    notes: "",
  });

  // Fetch units with properties
  useEffect(() => {
    const fetchUnits = async () => {
      const { data, error } = await supabase
        .from("units")
        .select(`
          id,
          name,
          price_per_night,
          properties (
            id,
            name,
            name_ar
          )
        `)
        .eq("status", "available");

      if (!error && data) {
        setUnits(data);
      }
    };

    if (open) {
      fetchUnits();
    }
  }, [open]);

  useEffect(() => {
    if (reservation && (mode === "edit" || mode === "view")) {
      setFormData({
        unit_id: reservation.unit_id || "",
        property_id: reservation.property_id || "",
        guest_name: reservation.guest_name || "",
        guest_email: reservation.guest_email || "",
        guest_phone: reservation.guest_phone || "",
        check_in: reservation.check_in || "",
        check_out: reservation.check_out || "",
        guest_count: reservation.guest_count || 1,
        status: reservation.status || "pending",
        source: reservation.source || "direct",
        total_amount: reservation.total_amount || 0,
        paid_amount: reservation.paid_amount || 0,
        payment_status: reservation.payment_status || "pending",
        notes: reservation.notes || "",
      });
    } else if (mode === "add") {
      setFormData({
        unit_id: "",
        property_id: "",
        guest_name: "",
        guest_email: "",
        guest_phone: "",
        check_in: "",
        check_out: "",
        guest_count: 1,
        status: "pending",
        source: "direct",
        total_amount: 0,
        paid_amount: 0,
        payment_status: "pending",
        notes: "",
      });
    }
  }, [reservation, mode, open]);

  // Auto-calculate total amount based on nights and unit price
  useEffect(() => {
    if (formData.check_in && formData.check_out && formData.unit_id) {
      const checkIn = new Date(formData.check_in);
      const checkOut = new Date(formData.check_out);
      const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
      
      const selectedUnit = units.find(u => u.id === formData.unit_id);
      if (selectedUnit && nights > 0) {
        const total = nights * (selectedUnit.price_per_night || 0);
        setFormData(prev => ({ ...prev, total_amount: total }));
      }
    }
  }, [formData.check_in, formData.check_out, formData.unit_id, units]);

  const handleUnitChange = (unitId: string) => {
    const selectedUnit = units.find(u => u.id === unitId);
    setFormData({
      ...formData,
      unit_id: unitId,
      property_id: selectedUnit?.properties?.id || "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!formData.unit_id || !formData.guest_name || !formData.check_in || !formData.check_out) {
        throw new Error("يرجى ملء جميع الحقول المطلوبة");
      }

      if (mode === "add") {
        const { data, error } = await supabase
          .from("reservations")
          .insert([formData])
          .select();

        if (error) throw error;

        toast({
          title: "✅ تم إضافة الحجز بنجاح",
          description: `تم إضافة حجز للضيف "${formData.guest_name}"`,
        });
      } else if (mode === "edit") {
        const { data, error } = await supabase
          .from("reservations")
          .update(formData)
          .eq("id", reservation.id)
          .select();

        if (error) throw error;

        toast({
          title: "✅ تم تحديث الحجز بنجاح",
          description: `تم تحديث بيانات حجز "${formData.guest_name}"`,
        });
      }

      onOpenChange(false);
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error("Error saving reservation:", error);
      toast({
        title: "❌ حدث خطأ",
        description: error.message || "فشل حفظ الحجز. يرجى المحاولة مرة أخرى.",
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
            {mode === "add" ? "إضافة حجز يدوي" : mode === "edit" ? "تعديل الحجز" : "تفاصيل الحجز"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="unit_id">الوحدة *</Label>
              <Select
                value={formData.unit_id}
                onValueChange={handleUnitChange}
                disabled={mode === "view"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر الوحدة" />
                </SelectTrigger>
                <SelectContent>
                  {units.map((unit) => (
                    <SelectItem key={unit.id} value={unit.id}>
                      {unit.name} - {unit.properties?.name_ar || unit.properties?.name} (﷼{unit.price_per_night}/ليلة)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="guest_name">اسم الضيف *</Label>
              <Input
                id="guest_name"
                value={formData.guest_name}
                onChange={(e) => setFormData({ ...formData, guest_name: e.target.value })}
                disabled={mode === "view"}
                placeholder="مثال: أحمد محمد السعيد"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="guest_email">البريد الإلكتروني</Label>
                <Input
                  id="guest_email"
                  type="email"
                  value={formData.guest_email}
                  onChange={(e) => setFormData({ ...formData, guest_email: e.target.value })}
                  disabled={mode === "view"}
                  placeholder="guest@example.com"
                  dir="ltr"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="guest_phone">رقم الجوال</Label>
                <Input
                  id="guest_phone"
                  value={formData.guest_phone}
                  onChange={(e) => setFormData({ ...formData, guest_phone: e.target.value })}
                  disabled={mode === "view"}
                  placeholder="+966 50 123 4567"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="check_in">تسجيل الدخول *</Label>
                <Input
                  id="check_in"
                  type="date"
                  value={formData.check_in}
                  onChange={(e) => setFormData({ ...formData, check_in: e.target.value })}
                  disabled={mode === "view"}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="check_out">تسجيل الخروج *</Label>
                <Input
                  id="check_out"
                  type="date"
                  value={formData.check_out}
                  onChange={(e) => setFormData({ ...formData, check_out: e.target.value })}
                  disabled={mode === "view"}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="guest_count">عدد الضيوف</Label>
                <Input
                  id="guest_count"
                  type="number"
                  min="1"
                  value={formData.guest_count}
                  onChange={(e) => setFormData({ ...formData, guest_count: parseInt(e.target.value) })}
                  disabled={mode === "view"}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="status">حالة الحجز</Label>
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
                    <SelectItem value="confirmed">مؤكد</SelectItem>
                    <SelectItem value="checked_in">تسجيل دخول</SelectItem>
                    <SelectItem value="checked_out">تسجيل خروج</SelectItem>
                    <SelectItem value="cancelled">ملغي</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="source">مصدر الحجز</Label>
                <Select
                  value={formData.source}
                  onValueChange={(value) => setFormData({ ...formData, source: value })}
                  disabled={mode === "view"}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="direct">مباشر</SelectItem>
                    <SelectItem value="airbnb">Airbnb</SelectItem>
                    <SelectItem value="booking">Booking.com</SelectItem>
                    <SelectItem value="agoda">Agoda</SelectItem>
                    <SelectItem value="vrbo">Vrbo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="total_amount">المبلغ الإجمالي (﷼)</Label>
                <Input
                  id="total_amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.total_amount}
                  onChange={(e) => setFormData({ ...formData, total_amount: parseFloat(e.target.value) })}
                  disabled={mode === "view"}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="paid_amount">المبلغ المدفوع (﷼)</Label>
                <Input
                  id="paid_amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.paid_amount}
                  onChange={(e) => setFormData({ ...formData, paid_amount: parseFloat(e.target.value) })}
                  disabled={mode === "view"}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="payment_status">حالة الدفع</Label>
                <Select
                  value={formData.payment_status}
                  onValueChange={(value) => setFormData({ ...formData, payment_status: value })}
                  disabled={mode === "view"}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">معلق</SelectItem>
                    <SelectItem value="paid">مدفوع</SelectItem>
                    <SelectItem value="partial">جزئي</SelectItem>
                    <SelectItem value="refunded">مسترد</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">ملاحظات</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                disabled={mode === "view"}
                placeholder="أي ملاحظات خاصة بالحجز..."
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