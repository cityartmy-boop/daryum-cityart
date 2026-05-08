import { useState } from "react";
import { SEO } from "@/components/SEO";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Plus,
  Shield,
  Edit,
  Trash2,
  Check,
  X
} from "lucide-react";

export default function AdminRolesPage() {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);

  const roles = [
    {
      id: 1,
      name: "Admin",
      nameAr: "مدير النظام",
      description: "صلاحيات كاملة على كل شيء في النظام",
      users: 2,
      permissions: {
        properties: { view: true, create: true, edit: true, delete: true },
        units: { view: true, create: true, edit: true, delete: true },
        reservations: { view: true, create: true, edit: true, delete: true },
        finance: { view: true, create: true, edit: true, delete: true },
        reports: { view: true, create: true, edit: false, delete: false },
        settings: { view: true, create: true, edit: true, delete: true },
        users: { view: true, create: true, edit: true, delete: true },
      }
    },
    {
      id: 2,
      name: "Property Manager",
      nameAr: "مدير العقارات",
      description: "إدارة العقارات والعمليات اليومية",
      users: 5,
      permissions: {
        properties: { view: true, create: true, edit: true, delete: false },
        units: { view: true, create: true, edit: true, delete: false },
        reservations: { view: true, create: true, edit: true, delete: false },
        finance: { view: true, create: false, edit: false, delete: false },
        reports: { view: true, create: false, edit: false, delete: false },
        settings: { view: false, create: false, edit: false, delete: false },
        users: { view: false, create: false, edit: false, delete: false },
      }
    },
    {
      id: 3,
      name: "Owner",
      nameAr: "مالك",
      description: "عرض التقارير والإيرادات فقط",
      users: 12,
      permissions: {
        properties: { view: true, create: false, edit: false, delete: false },
        units: { view: true, create: false, edit: false, delete: false },
        reservations: { view: true, create: false, edit: false, delete: false },
        finance: { view: true, create: false, edit: false, delete: false },
        reports: { view: true, create: false, edit: false, delete: false },
        settings: { view: false, create: false, edit: false, delete: false },
        users: { view: false, create: false, edit: false, delete: false },
      }
    },
    {
      id: 4,
      name: "Accountant",
      nameAr: "محاسب",
      description: "إدارة المالية والتقارير",
      users: 3,
      permissions: {
        properties: { view: true, create: false, edit: false, delete: false },
        units: { view: true, create: false, edit: false, delete: false },
        reservations: { view: true, create: false, edit: false, delete: false },
        finance: { view: true, create: true, edit: true, delete: false },
        reports: { view: true, create: true, edit: false, delete: false },
        settings: { view: false, create: false, edit: false, delete: false },
        users: { view: false, create: false, edit: false, delete: false },
      }
    },
  ];

  const permissionModules = [
    { key: "properties", nameAr: "العقارات", nameEn: "Properties" },
    { key: "units", nameAr: "الوحدات", nameEn: "Units" },
    { key: "reservations", nameAr: "الحجوزات", nameEn: "Reservations" },
    { key: "finance", nameAr: "المالية", nameEn: "Finance" },
    { key: "reports", nameAr: "التقارير", nameEn: "Reports" },
    { key: "settings", nameAr: "الإعدادات", nameEn: "Settings" },
    { key: "users", nameAr: "المستخدمين", nameEn: "Users" },
  ];

  const getPermissionIcon = (hasPermission: boolean) => {
    return hasPermission ? (
      <Check className="w-5 h-5 text-available" />
    ) : (
      <X className="w-5 h-5 text-muted-foreground" />
    );
  };

  return (
    <>
      <SEO title="إدارة الأدوار - Admin" />
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-foreground">إدارة الأدوار والصلاحيات</h1>
              <p className="text-muted-foreground">تحديد صلاحيات كل دور في النظام</p>
            </div>
            <Button className="gradient-primary" onClick={() => setAddDialogOpen(true)}>
              <Plus className="w-5 h-5 ml-2" />
              إضافة دور جديد
            </Button>
          </div>

          {/* Roles List */}
          <div className="grid lg:grid-cols-2 gap-6">
            {roles.map((role) => (
              <div key={role.id} className="glass rounded-xl p-6 border border-border/50">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary p-3">
                      <Shield className="w-full h-full text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">{role.nameAr}</h3>
                      <p className="text-sm text-muted-foreground">{role.name}</p>
                    </div>
                  </div>
                  <Badge className="bg-primary">{role.users} مستخدم</Badge>
                </div>

                <p className="text-sm text-muted-foreground mb-4">{role.description}</p>

                {/* Permissions Matrix */}
                <div className="space-y-2 mb-4">
                  {permissionModules.map((module) => {
                    const perms = role.permissions[module.key as keyof typeof role.permissions];
                    return (
                      <div key={module.key} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                        <span className="text-sm font-medium text-foreground">{module.nameAr}</span>
                        <div className="flex gap-4">
                          <div className="flex items-center gap-1" title="عرض">
                            {getPermissionIcon(perms.view)}
                          </div>
                          <div className="flex items-center gap-1" title="إنشاء">
                            {getPermissionIcon(perms.create)}
                          </div>
                          <div className="flex items-center gap-1" title="تعديل">
                            {getPermissionIcon(perms.edit)}
                          </div>
                          <div className="flex items-center gap-1" title="حذف">
                            {getPermissionIcon(perms.delete)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      setSelectedRole(role);
                      setEditDialogOpen(true);
                    }}
                  >
                    <Edit className="w-4 h-4 ml-2" />
                    تعديل
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => {
                      setSelectedRole(role);
                      setDeleteDialogOpen(true);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Permissions Legend */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">شرح الصلاحيات</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-available" />
                <span className="text-sm text-muted-foreground">عرض - View</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-available" />
                <span className="text-sm text-muted-foreground">إنشاء - Create</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-available" />
                <span className="text-sm text-muted-foreground">تعديل - Edit</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-available" />
                <span className="text-sm text-muted-foreground">حذف - Delete</span>
              </div>
            </div>
          </div>
        </div>

        {/* Add Role Dialog */}
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>إضافة دور جديد</DialogTitle>
              <DialogDescription>حدد الصلاحيات للدور الجديد</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role-name-ar">اسم الدور (عربي)</Label>
                  <Input id="role-name-ar" placeholder="مثال: مدير العقارات" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role-name-en">اسم الدور (English)</Label>
                  <Input id="role-name-en" placeholder="Example: Property Manager" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role-description">الوصف</Label>
                <Input id="role-description" placeholder="وصف مختصر للدور..." />
              </div>

              <div className="space-y-3">
                <Label>الصلاحيات</Label>
                {permissionModules.map((module) => (
                  <div key={module.key} className="p-4 rounded-lg bg-muted/30">
                    <div className="font-semibold text-foreground mb-3">
                      {module.nameAr} ({module.nameEn})
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="flex items-center gap-2">
                        <Checkbox id={`${module.key}-view`} />
                        <Label htmlFor={`${module.key}-view`} className="text-sm">عرض</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id={`${module.key}-create`} />
                        <Label htmlFor={`${module.key}-create`} className="text-sm">إنشاء</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id={`${module.key}-edit`} />
                        <Label htmlFor={`${module.key}-edit`} className="text-sm">تعديل</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id={`${module.key}-delete`} />
                        <Label htmlFor={`${module.key}-delete`} className="text-sm">حذف</Label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                إلغاء
              </Button>
              <Button className="gradient-primary" onClick={() => setAddDialogOpen(false)}>
                إضافة الدور
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Role Dialog - Similar structure */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>تعديل دور: {selectedRole?.nameAr}</DialogTitle>
              <DialogDescription>تحديث الصلاحيات</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>اسم الدور (عربي)</Label>
                  <Input defaultValue={selectedRole?.nameAr} />
                </div>
                <div className="space-y-2">
                  <Label>اسم الدور (English)</Label>
                  <Input defaultValue={selectedRole?.name} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>الوصف</Label>
                <Input defaultValue={selectedRole?.description} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                إلغاء
              </Button>
              <Button className="gradient-primary" onClick={() => setEditDialogOpen(false)}>
                حفظ التغييرات
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>هل أنت متأكد من الحذف؟</AlertDialogTitle>
              <AlertDialogDescription>
                سيتم حذف الدور "{selectedRole?.nameAr}" نهائياً. المستخدمون المرتبطون بهذا الدور ({selectedRole?.users}) سيحتاجون إلى دور جديد.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>إلغاء</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive hover:bg-destructive/90"
                onClick={() => setDeleteDialogOpen(false)}
              >
                حذف
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </AdminLayout>
    </>
  );
}