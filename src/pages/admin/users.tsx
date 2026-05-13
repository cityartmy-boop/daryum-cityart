import { useState, useEffect } from "react";
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
  UserCog,
  User,
  Eye,
  Loader2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function AdminUsersPage() {
  const { toast } = useToast();
  const [filter, setFilter] = useState("all");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    role: "property_manager",
    company: "",
    status: "active",
  });

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching users:", error);
      toast({
        title: "❌ خطأ في تحميل البيانات",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setUsers(data || []);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const stats = [
    { label: "إجمالي المستخدمين", value: users.length, color: "from-primary to-secondary" },
    { label: "المستخدمين النشطين", value: users.filter(u => u.status === "active").length, color: "from-emerald-500 to-green-500" },
    { label: "المدراء", value: users.filter(u => u.role === "admin").length, color: "from-blue-500 to-cyan-500" },
    { label: "مدراء العقارات", value: users.filter(u => u.role === "property_manager").length, color: "from-amber-500 to-orange-500" },
  ];

  const filteredUsers = users.filter(user => {
    if (filter === "all") return true;
    if (filter === "active") return user.status === "active";
    if (filter === "inactive") return user.status === "inactive";
    return user.role === filter;
  });

  const getRoleBadgeColor = (role: string) => {
    const colors: { [key: string]: string } = {
      "admin": "bg-primary",
      "property_manager": "bg-blue-500",
      "owner": "bg-emerald-500",
      "accountant": "bg-amber-500",
      "housekeeping_supervisor": "bg-teal-500",
      "cleaner": "bg-purple-500",
      "maintenance": "bg-orange-500",
    };
    return colors[role] || "bg-gray-500";
  };

  const getRoleLabel = (role: string) => {
    const labels: { [key: string]: string } = {
      "admin": "مدير النظام",
      "property_manager": "مدير عقارات",
      "owner": "مالك",
      "accountant": "محاسب",
      "housekeeping_supervisor": "مشرف تنظيف",
      "cleaner": "عامل نظافة",
      "maintenance": "صيانة",
    };
    return labels[role] || role;
  };

  const handleView = (user: any) => {
    setSelectedUser(user);
  };

  const handleEdit = (user: any) => {
    setSelectedUser(user);
    setFormData({
      full_name: user.full_name,
      email: user.email,
      phone: user.phone || "",
      role: user.role,
      company: user.company || "",
      status: user.status,
    });
    setEditDialogOpen(true);
  };

  const handleDelete = (user: any) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const handleAddUser = async () => {
    setIsLoading(true);
    try {
      if (!formData.full_name || !formData.email) {
        throw new Error("يرجى ملء جميع الحقول المطلوبة");
      }

      const { error } = await supabase
        .from("users")
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "✅ تم إضافة المستخدم بنجاح",
        description: `تم إضافة "${formData.full_name}" إلى النظام`,
      });

      setAddDialogOpen(false);
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        role: "property_manager",
        company: "",
        status: "active",
      });
      await fetchUsers();
    } catch (error: any) {
      console.error("Add error:", error);
      toast({
        title: "❌ فشل الإضافة",
        description: error.message || "حدث خطأ أثناء إضافة المستخدم",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateUser = async () => {
    setIsLoading(true);
    try {
      if (!formData.full_name || !formData.email) {
        throw new Error("يرجى ملء جميع الحقول المطلوبة");
      }

      const { error } = await supabase
        .from("users")
        .update(formData)
        .eq("id", selectedUser.id);

      if (error) throw error;

      toast({
        title: "✅ تم تحديث المستخدم بنجاح",
        description: `تم تحديث بيانات "${formData.full_name}"`,
      });

      setEditDialogOpen(false);
      await fetchUsers();
    } catch (error: any) {
      console.error("Update error:", error);
      toast({
        title: "❌ فشل التحديث",
        description: error.message || "حدث خطأ أثناء تحديث المستخدم",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from("users")
        .delete()
        .eq("id", selectedUser.id);

      if (error) throw error;

      toast({
        title: "✅ تم الحذف بنجاح",
        description: `تم حذف "${selectedUser.full_name}" من النظام`,
      });

      await fetchUsers();
    } catch (error: any) {
      console.error("Delete error:", error);
      toast({
        title: "❌ فشل الحذف",
        description: error.message || "حدث خطأ أثناء حذف المستخدم",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setSelectedUser(null);
    }
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
            <Button className="gradient-primary" onClick={() => setAddDialogOpen(true)}>
              <Plus className="w-5 h-5 ml-2" />
              إضافة مستخدم
            </Button>
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
                  <SelectItem value="admin">مدير النظام</SelectItem>
                  <SelectItem value="property_manager">مدير عقارات</SelectItem>
                  <SelectItem value="owner">مالك</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Users Table */}
          <div className="glass rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full" dir="rtl">
                <thead className="bg-muted/50">
                  <tr className="text-right">
                    <th className="p-4 font-bold text-foreground">الاسم</th>
                    <th className="p-4 font-bold text-foreground">البريد الإلكتروني</th>
                    <th className="p-4 font-bold text-foreground">الدور</th>
                    <th className="p-4 font-bold text-foreground">الحالة</th>
                    <th className="p-4 font-bold text-foreground text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-t border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="w-5 h-5 text-primary" />
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-foreground">{user.full_name}</div>
                            <div className="text-xs text-muted-foreground">{user.phone || 'لا يوجد'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground text-right">{user.email}</td>
                      <td className="p-4 text-right">
                        <Badge className={getRoleBadgeColor(user.role)}>{getRoleLabel(user.role)}</Badge>
                      </td>
                      <td className="p-4 text-right">
                        {user.status === "active" ? (
                          <Badge className="bg-available">نشط</Badge>
                        ) : (
                          <Badge variant="outline">غير نشط</Badge>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(user)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDelete(user)}>
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
                <Label htmlFor="name">الاسم الكامل *</Label>
                <Input 
                  id="name" 
                  placeholder="أحمد السعيد" 
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني *</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="ahmed@daryum.sa" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">رقم الجوال</Label>
                <Input 
                  id="phone" 
                  placeholder="+966 50 123 4567" 
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">الدور</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">مدير النظام</SelectItem>
                    <SelectItem value="property_manager">مدير عقارات</SelectItem>
                    <SelectItem value="owner">مالك</SelectItem>
                    <SelectItem value="accountant">محاسب</SelectItem>
                    <SelectItem value="housekeeping_supervisor">مشرف تنظيف</SelectItem>
                    <SelectItem value="cleaner">عامل نظافة</SelectItem>
                    <SelectItem value="maintenance">صيانة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">الشركة</Label>
                <Input 
                  id="company" 
                  placeholder="داريوم الرياض" 
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">الحالة</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">نشط</SelectItem>
                    <SelectItem value="inactive">غير نشط</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddDialogOpen(false)} disabled={isLoading}>
                إلغاء
              </Button>
              <Button className="gradient-primary" onClick={handleAddUser} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                    جاري الإضافة...
                  </>
                ) : (
                  "إضافة المستخدم"
                )}
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
                <Label htmlFor="edit-name">الاسم الكامل *</Label>
                <Input 
                  id="edit-name" 
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">البريد الإلكتروني *</Label>
                <Input 
                  id="edit-email" 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phone">رقم الجوال</Label>
                <Input 
                  id="edit-phone" 
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-role">الدور</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">مدير النظام</SelectItem>
                    <SelectItem value="property_manager">مدير عقارات</SelectItem>
                    <SelectItem value="owner">مالك</SelectItem>
                    <SelectItem value="accountant">محاسب</SelectItem>
                    <SelectItem value="housekeeping_supervisor">مشرف تنظيف</SelectItem>
                    <SelectItem value="cleaner">عامل نظافة</SelectItem>
                    <SelectItem value="maintenance">صيانة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditDialogOpen(false)} disabled={isLoading}>
                إلغاء
              </Button>
              <Button className="gradient-primary" onClick={handleUpdateUser} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                    جاري الحفظ...
                  </>
                ) : (
                  "حفظ التغييرات"
                )}
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
                سيتم حذف المستخدم "{selectedUser?.full_name}" نهائياً من النظام. هذا الإجراء لا يمكن التراجع عنه.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>إلغاء</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive hover:bg-destructive/90"
                onClick={confirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "جاري الحذف..." : "حذف"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </AdminLayout>
    </>
  );
}