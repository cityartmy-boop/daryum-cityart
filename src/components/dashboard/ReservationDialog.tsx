import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface ReservationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit" | "view";
  reservation?: any;
}

export function ReservationDialog({ open, onOpenChange, mode, reservation }: ReservationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'إضافة حجز يدوي' : mode === 'edit' ? 'تعديل الحجز' : 'تفاصيل الحجز'}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>اسم الضيف</Label>
            <Input defaultValue={reservation?.guestName} disabled={mode === 'view'} placeholder="اسم الضيف" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>العقار</Label>
              <Input defaultValue={reservation?.property} disabled={mode === 'view'} placeholder="العقار" />
            </div>
            <div className="grid gap-2">
              <Label>الوحدة</Label>
              <Input defaultValue={reservation?.unit} disabled={mode === 'view'} placeholder="رقم الوحدة" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>تاريخ الدخول</Label>
              <Input type="date" defaultValue={reservation?.checkIn} disabled={mode === 'view'} />
            </div>
            <div className="grid gap-2">
              <Label>تاريخ الخروج</Label>
              <Input type="date" defaultValue={reservation?.checkOut} disabled={mode === 'view'} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>عدد الضيوف</Label>
              <Input type="number" defaultValue={reservation?.guests} disabled={mode === 'view'} />
            </div>
            <div className="grid gap-2">
              <Label>إجمالي المبلغ (﷼)</Label>
              <Input type="text" defaultValue={reservation?.amount} disabled={mode === 'view'} />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>إغلاق</Button>
          {mode !== 'view' && <Button className="gradient-primary" onClick={() => onOpenChange(false)}>حفظ</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}