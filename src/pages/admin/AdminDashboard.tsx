
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Image, CalendarDays, Users, FileText, UserCog, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { adminUser } = useAdminAuth();
  
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-flyboy-gold">مرحباً بك في لوحة التحكم</h1>
        <p className="text-muted-foreground">يمكنك إدارة محتوى موقعك من هنا</p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        <Card 
          className="cursor-pointer hover:shadow-md transition-shadow border border-flyboy-gold/30 bg-flyboy-purple/30 hover:bg-flyboy-purple/50" 
          onClick={() => navigate("/admin/slides")}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-3 text-flyboy-gold">
              <Image className="h-6 w-6" />
              <span>السلايدات</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white">إدارة سلايدات الصفحة الرئيسية</p>
          </CardContent>
        </Card>
        
        <Card 
          className="cursor-pointer hover:shadow-md transition-shadow border border-flyboy-gold/30 bg-flyboy-purple/30 hover:bg-flyboy-purple/50" 
          onClick={() => navigate("/admin/events")}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-3 text-flyboy-gold">
              <CalendarDays className="h-6 w-6" />
              <span>الحفلات</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white">إدارة قسم الحفلات والفعاليات</p>
          </CardContent>
        </Card>
        
        <Card 
          className="cursor-pointer hover:shadow-md transition-shadow border border-flyboy-gold/30 bg-flyboy-purple/30 hover:bg-flyboy-purple/50" 
          onClick={() => navigate("/admin/partners")}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-3 text-flyboy-gold">
              <Users className="h-6 w-6" />
              <span>شركاء النجاح</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white">إدارة قسم الشركاء المميزين وجميع الشركاء</p>
          </CardContent>
        </Card>
        
        <Card 
          className="cursor-pointer hover:shadow-md transition-shadow border border-flyboy-gold/30 bg-flyboy-purple/30 hover:bg-flyboy-purple/50" 
          onClick={() => navigate("/admin/about")}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-3 text-flyboy-gold">
              <FileText className="h-6 w-6" />
              <span>نبذة عني</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white">تحديث قسم النبذة التعريفية</p>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-md transition-shadow border border-flyboy-gold/30 bg-flyboy-purple/30 hover:bg-flyboy-purple/50" 
          onClick={() => navigate("/admin/social-media")}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-3 text-flyboy-gold">
              <Share2 className="h-6 w-6" />
              <span>التواصل الاجتماعي</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white">إدارة روابط منصات التواصل الاجتماعي</p>
          </CardContent>
        </Card>

        {adminUser?.is_super_admin && (
          <Card 
            className="cursor-pointer hover:shadow-md transition-shadow border border-flyboy-gold/30 bg-flyboy-purple/30 hover:bg-flyboy-purple/50" 
            onClick={() => navigate("/admin/users")}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-3 text-flyboy-gold">
                <UserCog className="h-6 w-6" />
                <span>إدارة المستخدمين</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white">إدارة مستخدمي لوحة التحكم</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
