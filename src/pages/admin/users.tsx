import { useState } from "react";
import { SEO } from "@/components/SEO";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Search,
  Edit,
  Trash2,
  Filter,
  Download,
  UserCog
} from "lucide-react";

export default function AdminUsersPage() {
  const [filter, setFilter] = useState("all");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const users = [
    {
      id: 1,
      name: "أحمد السعيد",
      email: "ahmed.saeed@daryum.sa",
      phone: "+966 50 123 4567",
      role: "Admin",
      workspace: "داريوم الرياض",
      properties: 24,
      status: "active",
      joinedAt: "2026-01-15",
      lastActive: "2026-05-08"
    },
    {
      id: 2,
      name: "فاطمة المالكي",
      email: "fatimah.malki@daryum.sa",
      phone: "+966 55 234 5678",
      role: "Property Manager",
      workspace: "مجموعة النخيل",
      properties: 16,
      status: "active",
      joinedAt: "2026-02-20",
      lastActive: "2026-05-07"
    },
    {
      id: 3,
      name: "خالد العتيبي",
      email: "khaled.otaibi@daryum.sa",
      phone: "+966 50 345 6789",
      role: "Accountant",
      workspace: "عقارات الواحة",
      properties: 8,
      status: "active",
      joinedAt: "2026-03-10",
      lastActive: "2026-05-08"
    },
    {
      id: 4,
      name: "نورة الدوسري",
      email: "noura.dosari@daryum.sa",
      phone: "+966 55 456 7890",
      role: "Owner",
      workspace: "فلل الدوسري",
      properties: 4,
      status: "inactive",
      joinedAt: "2026-01-28",
      lastActive: "2026-04-15"
    },
    {
      id: 5,
      name: "سارة القحطاني",
      email: "sarah.qahtani@daryum.sa",
      phone: "+966 50 567 8901",
      role: "Housekeeping Supervisor",
      workspace: "داريوم جدة",
      properties: 12,
      status: "active",
      joinedAt: "2026-02-05",
      lastActive: "2026-05-08"
    },
  ];

  const stats = [
    { label: "إجمالي المستخدمين", value: "248", color: "from-primary to-secondary" },
    { label: "المستخدمين النشطين", value: "186", color: "from-emerald-500 to-green-500" },
    { label: "مستخدمين جدد (30 يوم)", value: "23", color: "from-blue-500 to-cyan-500" },
    { label: "متوسط النشاط اليومي", value: "142", color: "from-amber-500 to-orange-500" },
  ];

  const getRoleBadge = (role: string) => {
    const colors: { [key: string]: string } = {
      "Admin": "bg-primary",
      "Property Manager": "bg-blue-500",
      "Owner": "bg-emerald-500",
      "Accountant": "bg-amber-500",
      "Housekeeping Supervisor": "bg-teal-500",
      "Cleaner": "bg-purple-500",
      "Maintenance": "bg-orange-500",
    };
    return <Badge className={colors[role] || "bg-gray-500"}>{role}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge className="bg-available">نشط</Badge>
    ) : (
      <Badge variant="outline">غير نشط</Badge>
    );
  };

  return (
    <>
      <SEO title="إدارة المستخدمين - Admin" />
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-foreground">إدارة المستخدمين</h1>
              <p className="text-muted-foreground">عرض وإدارة جميع مستخدمي النظام</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Download className="w-5 h-5 ml-2" />
                تصدير
              </Button>
              <Button className="gradient-primary" onClick={() => setAddDialogOpen(true)}>
                <Plus className="w-5 h-5 ml-2" />
                إضافة مستخدم
              </Button>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="glass rounded-xl p-6">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} p-3 mb-3`}>
                  <UserCog className="w-full h-full text-white" />
                </div>
                <div className="text-2xl font-bold text-foreground tabular-nums mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="glass rounded-xl p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  placeholder="البحث في المستخدمين..."
                  className="pr-10"
                />
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="w-4 h-4 ml-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل المستخدمين</SelectItem>
                  <SelectItem value="active">نشط</SelectItem>
                  <SelectItem value="inactive">غير نشط</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Property Manager</SelectItem>
                  <SelectItem value="owner">Owner</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Users Table */}
          <div className="glass rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr className="text-right">
                    <th className="p-4 font-bold text-foreground">المستخدم</th>
                    <th className="p-4 font-bold text-foreground">معلومات الاتصال</th>
                    <th className="p-4 font-bold text-foreground">الدور</th>
                    <th className="p-4 font-bold text-foreground">المساحة</th>
                    <th className="p-4 font-bold text-foreground">العقارات</th>
                    <th className="p-4 font-bold text-foreground">تاريخ الانضمام</th>
                    <th className="p-4 font-bold text-foreground">آخر نشاط</th>
                    <th className="p-4 font-bold text-foreground">الحالة</th>
                    <th className="p-4 font-bold text-foreground">إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-t border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-foreground">{user.name}</div>
                            <div className="text-xs text-muted-foreground">ID: {user.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-foreground">{user.email}</div>
                        <div className="text-xs text-muted-foreground">{user.phone}</div>
                      </td>
                      <td className="p-4">{getRoleBadge(user.role)}</td>
                      <td className="p-4 text-muted-foreground">{user.workspace}</td>
                      <td className="p-4 font-semibold text-foreground">{user.properties}</td>
                      <td className="p-4 text-muted-foreground">{user.joinedAt}</td>
                      <td className="p-4 text-muted-foreground">{user.lastActive}</td>
                      <td className="p-4">{getStatusBadge(user.status)}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedUser(user);
                              setEditDialogOpen(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive"
                            onClick={() => {
                              setSelectedUser(user);
                              setDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Add User Dialog */}
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>إضافة مستخدم جديد</DialogTitle>
              <DialogDescription>أدخل معلومات المستخدم الجديد</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">الاسم الكامل</Label>
                <Input id="name" placeholder="أحمد السعيد" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input id="email" type="email" placeholder="ahmed@daryum.sa" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">رقم الجوال</Label>
                <Input id="phone" placeholder="+966 50 123 4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">الدور</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الدور" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Property Manager</SelectItem>
                    <SelectItem value="owner">Owner</SelectItem>
                    <SelectItem value="accountant">Accountant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="workspace">المساحة</Label>
                <Input id="workspace" placeholder="داريوم الرياض" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور</Label>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                إلغاء
              </Button>
              <Button className="gradient-primary" onClick={() => setAddDialogOpen(false)}>
                إضافة المستخدم
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit User Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>تعديل مستخدم</DialogTitle>
              <DialogDescription>تحديث معلومات المستخدم</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">الاسم الكامل</Label>
                <Input id="edit-name" defaultValue={selectedUser?.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">البريد الإلكتروني</Label>
                <Input id="edit-email" type="email" defaultValue={selectedUser?.email} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phone">رقم الجوال</Label>
                <Input id="edit-phone" defaultValue={selectedUser?.phone} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-role">الدور</Label>
                <Select defaultValue={selectedUser?.role}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Property Manager">Property Manager</SelectItem>
                    <SelectItem value="Owner">Owner</SelectItem>
                    <SelectItem value="Accountant">Accountant</SelectItem>
                  </SelectContent>
                </Select>
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
                سيتم حذف المستخدم "{selectedUser?.name}" نهائياً من النظام. هذا الإجراء لا يمكن التراجع عنه.
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