
import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut, LayoutDashboard, Image, CalendarDays, Users, UserCog, FileText } from "lucide-react";
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from "@/components/ui/sidebar";

const AdminLayoutContent = () => {
  const { adminUser, loading, logout, checkAuth } = useAdminAuth();
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        console.log("Verifying admin authorization in AdminLayout...");
        
        // Check for the special flyboy session marker first
        if (localStorage.getItem('flyboy_admin_session') === 'true') {
          console.log("Found flyboy session marker, authorizing in admin layout");
          setIsAuthorized(true);
          setIsVerifying(false);
          return;
        }
        
        const isAuth = await checkAuth();
        console.log("Auth verification result in AdminLayout:", isAuth);
        
        setIsAuthorized(isAuth);
        setIsVerifying(false);
        
        if (!isAuth) {
          console.log("User not authorized in AdminLayout, redirecting to login");
          navigate("/admin/login", { replace: true });
        } else {
          console.log("User is authorized in AdminLayout, showing admin layout");
        }
      } catch (error) {
        console.error("Error during auth verification in AdminLayout:", error);
        setIsAuthorized(false);
        setIsVerifying(false);
        navigate("/admin/login", { replace: true });
      }
    };

    if (!loading) {
      verifyAuth();
    }
  }, [loading, checkAuth, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login", { replace: true });
  };

  if (loading || isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-flyboy-dark">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin mx-auto text-flyboy-gold" />
          <p className="mt-4 text-flyboy-gold">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    console.log("Not authorized in AdminLayout, redirecting to login");
    return <Navigate to="/admin/login" replace />;
  }

  // Only render the admin layout if authorized
  return (
    <SidebarProvider defaultOpen>
      <div className="flex h-screen bg-flyboy-dark">
        <Sidebar>
          <SidebarHeader className="border-b border-flyboy-gold/30">
            <div className="flex items-center justify-between py-4 px-4">
              <h1 className="text-xl font-bold text-flyboy-gold">لوحة تحكم FLY BOY</h1>
              <SidebarTrigger className="text-flyboy-gold hover:text-white hover:bg-flyboy-purple" />
            </div>
          </SidebarHeader>
          <SidebarContent className="p-0 bg-flyboy-dark">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="لوحة التحكم"
                  onClick={() => navigate("/admin")}
                  className="hover:bg-flyboy-purple/50 text-white"
                >
                  <LayoutDashboard className="ml-3 text-flyboy-gold" />
                  <span>الرئيسية</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="السلايدات"
                  onClick={() => navigate("/admin/slides")}
                  className="hover:bg-flyboy-purple/50 text-white"
                >
                  <Image className="ml-3 text-flyboy-gold" />
                  <span>السلايدات</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="الحفلات"
                  onClick={() => navigate("/admin/events")}
                  className="hover:bg-flyboy-purple/50 text-white"
                >
                  <CalendarDays className="ml-3 text-flyboy-gold" />
                  <span>الحفلات</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="الشركاء"
                  onClick={() => navigate("/admin/partners")}
                  className="hover:bg-flyboy-purple/50 text-white"
                >
                  <Users className="ml-3 text-flyboy-gold" />
                  <span>شركاء النجاح</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="نبذة عني"
                  onClick={() => navigate("/admin/about")}
                  className="hover:bg-flyboy-purple/50 text-white"
                >
                  <FileText className="ml-3 text-flyboy-gold" />
                  <span>نبذة عني</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {adminUser?.is_super_admin && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip="المستخدمين"
                    onClick={() => navigate("/admin/users")}
                    className="hover:bg-flyboy-purple/50 text-white"
                  >
                    <UserCog className="ml-3 text-flyboy-gold" />
                    <span>إدارة المستخدمين</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t border-flyboy-gold/30 p-4 bg-flyboy-dark">
            <div className="flex w-full items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">{adminUser?.username || "مستخدم"}</p>
                <p className="text-xs text-flyboy-gold">
                  {adminUser?.is_super_admin ? "مدير النظام" : "مدير"}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="h-9 gap-2 border-flyboy-gold text-flyboy-gold hover:bg-flyboy-purple hover:text-white"
              >
                <LogOut className="h-4 w-4" />
                <span>خروج</span>
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="overflow-auto bg-flyboy-dark">
          <div className="container mx-auto p-6" dir="rtl">
            <Outlet />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

const AdminLayout = () => {
  console.log("Rendering AdminLayout component");
  return (
    <AdminAuthProvider>
      <AdminLayoutContent />
    </AdminAuthProvider>
  );
};

export default AdminLayout;
