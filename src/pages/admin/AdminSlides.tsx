
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminSlides = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">إدارة السلايدات</h1>
      <p className="text-muted-foreground">قم بإضافة وتعديل وحذف السلايدات في الصفحة الرئيسية</p>
      
      <Card>
        <CardHeader>
          <CardTitle>السلايدات</CardTitle>
          <CardDescription>ستتمكن من إدارة السلايدات هنا قريباً</CardDescription>
        </CardHeader>
        <CardContent>
          <p>جاري تطوير هذه الصفحة...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSlides;
