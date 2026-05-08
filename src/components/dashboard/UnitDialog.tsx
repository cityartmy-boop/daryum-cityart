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

interface UnitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit" | "view";
  unit?: any;
}

export function UnitDialog({ open, onOpenChange, mode, unit }: UnitDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'إضافة وحدة جديدة' : mode === 'edit' ? 'تعديل الوحدة' : 'تفاصيل الوحدة'}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>اسم / رقم الوحدة</Label>
              <Input defaultValue={unit?.name} disabled={mode === 'view'} placeholder="مثال: جناح 101" />
            </div>
            <div className="grid gap-2">
              <Label>العقار التابع له</Label>
              <Input defaultValue={unit?.property} disabled={mode === 'view'} placeholder="برج الفيصلية" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>النوع</Label>
              <Input defaultValue={unit?.type} disabled={mode === 'view'} placeholder="غرفتين وصالة" />
            </div>
            <div className="grid gap-2">
              <Label>السعر لليلة (﷼)</Label>
              <Input type="text" defaultValue={unit?.price?.replace('SAR', '')?.replace('$', '')?.trim()} disabled={mode === 'view'} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>القدرة الاستيعابية (ضيوف)</Label>
              <Input type="number" defaultValue={unit?.capacity} disabled={mode === 'view'} />
            </div>
            <div className="grid gap-2">
              <Label>عدد الأسرة</Label>
              <Input type="number" defaultValue={unit?.beds} disabled={mode === 'view'} />
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