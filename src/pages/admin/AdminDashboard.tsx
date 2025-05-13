
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Image, CalendarDays, Users, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">مرحباً بك في لوحة التحكم</h1>
      <p className="text-muted-foreground">يمكنك إدارة محتوى موقعك من هنا</p>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate("/admin/slides")}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Image className="h-5 w-5" />
              <span>السلايدات</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">إدارة سلايدات الصفحة الرئيسية</p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate("/admin/events")}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              <span>الحفلات</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">إدارة قسم الحفلات والفعاليات</p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate("/admin/partners")}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>شركاء النجاح</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">إدارة قسم الشركاء المميزين وجميع الشركاء</p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate("/admin/about")}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5" />
              <span>نبذة عني</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">تحديث قسم النبذة التعريفية</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
