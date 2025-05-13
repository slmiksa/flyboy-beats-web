
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminEvents = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">إدارة الحفلات</h1>
      <p className="text-muted-foreground">قم بإضافة وتعديل وحذف الحفلات والفعاليات</p>
      
      <Card>
        <CardHeader>
          <CardTitle>الحفلات</CardTitle>
          <CardDescription>ستتمكن من إدارة الحفلات هنا قريباً</CardDescription>
        </CardHeader>
        <CardContent>
          <p>جاري تطوير هذه الصفحة...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminEvents;
