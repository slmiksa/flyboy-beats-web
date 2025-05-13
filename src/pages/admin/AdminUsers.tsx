
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Navigate } from "react-router-dom";

const AdminUsers = () => {
  const { adminUser } = useAdminAuth();
  
  if (!adminUser?.is_super_admin) {
    return <Navigate to="/admin" replace />;
  }
  
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">إدارة المستخدمين</h1>
      <p className="text-muted-foreground">قم بإضافة وتعديل وحذف مستخدمي لوحة التحكم</p>
      
      <Card>
        <CardHeader>
          <CardTitle>المستخدمين</CardTitle>
          <CardDescription>ستتمكن من إدارة المستخدمين هنا قريباً</CardDescription>
        </CardHeader>
        <CardContent>
          <p>جاري تطوير هذه الصفحة...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsers;
