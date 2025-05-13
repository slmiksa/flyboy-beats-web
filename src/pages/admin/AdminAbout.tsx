
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminAbout = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">إدارة نبذة عني</h1>
      <p className="text-muted-foreground">قم بتحديث النبذة التعريفية والصورة</p>
      
      <Card>
        <CardHeader>
          <CardTitle>نبذة عني</CardTitle>
          <CardDescription>ستتمكن من تعديل النبذة التعريفية هنا قريباً</CardDescription>
        </CardHeader>
        <CardContent>
          <p>جاري تطوير هذه الصفحة...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAbout;
