
import { useState, useEffect } from "react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Navigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AdminUser } from "@/types/database.types";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
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
import { Loader2, Plus, Trash, UserCog } from "lucide-react";

const AdminUsers = () => {
  const { adminUser } = useAdminAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({ username: "", password: "", isSuperAdmin: false });
  const [userToDelete, setUserToDelete] = useState<AdminUser | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Redirect if not a super admin
  if (!adminUser?.is_super_admin) {
    return <Navigate to="/admin" replace />;
  }
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("admin_users")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setUsers(data as AdminUser[]);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        title: "خطأ في جلب البيانات",
        description: "حدث خطأ أثناء محاولة جلب قائمة المستخدمين",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddUser = async () => {
    setIsProcessing(true);
    
    try {
      if (!newUser.username || !newUser.password) {
        toast({
          title: "حقول مطلوبة",
          description: "يرجى ملء جميع الحقول المطلوبة",
          variant: "destructive",
        });
        return;
      }
      
      // Add the user directly to admin_users table
      const { data: adminData, error: adminError } = await supabase
        .from("admin_users")
        .insert([
          { 
            username: newUser.username, 
            is_super_admin: newUser.isSuperAdmin 
          }
        ])
        .select();
      
      if (adminError) {
        throw adminError;
      }
      
      toast({
        title: "تم إضافة المستخدم",
        description: `تم إضافة المستخدم ${newUser.username} بنجاح`,
      });
      
      setIsAddDialogOpen(false);
      setNewUser({ username: "", password: "", isSuperAdmin: false });
      fetchUsers();
    } catch (error: any) {
      console.error("Error adding user:", error);
      toast({
        title: "فشل إضافة المستخدم",
        description: error.message || "حدث خطأ أثناء محاولة إضافة المستخدم",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    
    setIsProcessing(true);
    try {
      // First, check if we're trying to delete the main flyboy account
      if (userToDelete.username === "flyboy") {
        toast({
          title: "غير مسموح",
          description: "لا يمكن حذف الحساب الرئيسي",
          variant: "destructive",
        });
        setIsDeleteDialogOpen(false);
        setUserToDelete(null);
        return;
      }
      
      // Delete the admin user record
      const { error: deleteError } = await supabase
        .from("admin_users")
        .delete()
        .eq("id", userToDelete.id);
      
      if (deleteError) {
        throw deleteError;
      }
      
      toast({
        title: "تم حذف المستخدم",
        description: `تم حذف المستخدم ${userToDelete.username} بنجاح`,
      });
      
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
      fetchUsers();
    } catch (error: any) {
      console.error("Error deleting user:", error);
      toast({
        title: "فشل حذف المستخدم",
        description: error.message || "حدث خطأ أثناء محاولة حذف المستخدم",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">إدارة المستخدمين</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="ml-2 h-4 w-4" />
          إضافة مستخدم جديد
        </Button>
      </div>
      <p className="text-muted-foreground">قم بإضافة وتعديل وحذف مستخدمي لوحة التحكم</p>
      
      <Card>
        <CardHeader>
          <CardTitle>المستخدمين</CardTitle>
          <CardDescription>قائمة مستخدمي لوحة التحكم</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>اسم المستخدم</TableHead>
                  <TableHead>الصلاحيات</TableHead>
                  <TableHead>تاريخ الإنشاء</TableHead>
                  <TableHead>إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>
                        {user.is_super_admin ? "مدير النظام" : "مدير"}
                      </TableCell>
                      <TableCell>
                        {new Date(user.created_at).toLocaleDateString("ar-SA")}
                      </TableCell>
                      <TableCell>
                        {user.username !== "flyboy" && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              setUserToDelete(user);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4">
                      لا يوجد مستخدمين
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      
      {/* Add User Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle>إضافة مستخدم جديد</DialogTitle>
            <DialogDescription>
              أدخل معلومات المستخدم الجديد للوحة التحكم.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="username">اسم المستخدم</Label>
              <Input
                id="username"
                placeholder="أدخل اسم المستخدم"
                value={newUser.username}
                onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                className="text-right"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input
                id="password"
                type="password"
                placeholder="أدخل كلمة المرور"
                value={newUser.password}
                onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                className="text-right"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isSuperAdmin"
                checked={newUser.isSuperAdmin}
                onChange={(e) => setNewUser({...newUser, isSuperAdmin: e.target.checked})}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="isSuperAdmin" className="mr-2">مدير النظام</Label>
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              onClick={handleAddUser}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" /> جاري الإضافة...
                </>
              ) : (
                "إضافة المستخدم"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete User Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد من حذف هذا المستخدم؟</AlertDialogTitle>
            <AlertDialogDescription>
              سيتم حذف المستخدم {userToDelete?.username} بشكل نهائي ولا يمكن التراجع عن هذا الإجراء.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              disabled={isProcessing}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" /> جاري الحذف...
                </>
              ) : (
                "حذف"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminUsers;
