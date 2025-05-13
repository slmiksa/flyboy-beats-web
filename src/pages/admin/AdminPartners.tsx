
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminPartners = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">إدارة شركاء النجاح</h1>
      <p className="text-muted-foreground">قم بإضافة وتعديل وحذف شركاء النجاح المميزين وجميع الشركاء</p>
      
      <Card>
        <CardHeader>
          <CardTitle>شركاء النجاح</CardTitle>
          <CardDescription>ستتمكن من إدارة الشركاء هنا قريباً</CardDescription>
        </CardHeader>
        <CardContent>
          <p>جاري تطوير هذه الصفحة...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPartners;
