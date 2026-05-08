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

interface PropertyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit" | "view";
  property?: any;
}

export function PropertyDialog({ open, onOpenChange, mode, property }: PropertyDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'إضافة عقار جديد' : mode === 'edit' ? 'تعديل العقار' : 'تفاصيل العقار'}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>اسم العقار</Label>
            <Input defaultValue={property?.name} disabled={mode === 'view'} placeholder="مثال: برج الفيصلية" />
          </div>
          <div className="grid gap-2">
            <Label>الموقع</Label>
            <Input defaultValue={property?.location} disabled={mode === 'view'} placeholder="الرياض، حي الملقا" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>عدد الوحدات</Label>
              <Input type="number" defaultValue={property?.units} disabled={mode === 'view'} />
            </div>
            <div className="grid gap-2">
              <Label>النوع</Label>
              <Input defaultValue={property?.type} disabled={mode === 'view'} placeholder="سكنية، فندقية..." />
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