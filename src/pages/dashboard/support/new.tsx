import { useState } from "react";
import { useRouter } from "next/router";
import { SEO } from "@/components/SEO";
import { AppShell } from "@/components/dashboard/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Upload, X } from "lucide-react";

export default function NewTicket() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the ticket creation
    router.push("/dashboard/support");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <>
      <SEO title="تذكرة جديدة - الدعم الفني - داريوم" />
      <AppShell>
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.back()}
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">تذكرة دعم جديدة</h1>
              <p className="text-muted-foreground">أخبرنا كيف يمكننا مساعدتك</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="glass p-8 rounded-xl border border-border/50 space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">عنوان التذكرة *</Label>
                <Input
                  id="title"
                  placeholder="مثال: مشكلة في مزامنة الحجوزات"
                  required
                />
              </div>

              {/* Category & Priority */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">التصنيف *</Label>
                  <Select required>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="اختر التصنيف" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">مشكلة تقنية</SelectItem>
                      <SelectItem value="feature">طلب ميزة</SelectItem>
                      <SelectItem value="billing">فوترة ومدفوعات</SelectItem>
                      <SelectItem value="training">تدريب ودعم</SelectItem>
                      <SelectItem value="inquiry">استفسار عام</SelectItem>
                      <SelectItem value="improvement">اقتراح تحسين</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">الأولوية *</Label>
                  <Select required>
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="اختر الأولوية" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urgent">عاجل - يؤثر على العمل</SelectItem>
                      <SelectItem value="high">عالي - مشكلة كبيرة</SelectItem>
                      <SelectItem value="medium">متوسط - مشكلة عادية</SelectItem>
                      <SelectItem value="low">منخفض - استفسار بسيط</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">الوصف التفصيلي *</Label>
                <Textarea
                  id="description"
                  placeholder="اشرح المشكلة أو الطلب بالتفصيل...&#10;&#10;• ما هي المشكلة؟&#10;• متى بدأت؟&#10;• ما هي الخطوات التي جربتها؟"
                  rows={8}
                  required
                />
              </div>

              {/* Attachments */}
              <div className="space-y-4">
                <Label>المرفقات (اختياري)</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-2">
                    اسحب الملفات هنا أو انقر للاختيار
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    PNG, JPG, PDF حتى 10 ميجا
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button type="button" variant="outline" size="sm" asChild>
                      <span>اختر ملفات</span>
                    </Button>
                  </label>
                </div>

                {/* File List */}
                {files.length > 0 && (
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                            <Upload className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {(file.size / 1024).toFixed(2)} KB
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                type="submit"
                className="flex-1 gradient-primary"
                size="lg"
              >
                إرسال التذكرة
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => router.back()}
              >
                إلغاء
              </Button>
            </div>
          </form>
        </div>
      </AppShell>
    </>
  );
}