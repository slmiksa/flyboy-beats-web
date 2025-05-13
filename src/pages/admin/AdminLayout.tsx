
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
        const isAuth = await checkAuth();
        console.log("Auth verification result in AdminLayout:", isAuth);
        
        setIsAuthorized(isAuth);
        setIsVerifying(false);
        
        if (!isAuth) {
          console.log("User not authorized, redirecting to login from AdminLayout");
          navigate("/admin/login", { replace: true });
        } else {
          console.log("User is authorized, showing admin layout");
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
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAuthorized) {
    console.log("Not authorized in AdminLayout, redirecting to login");
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <SidebarProvider defaultOpen>
      <div className="flex h-screen">
        <Sidebar>
          <SidebarHeader className="border-b">
            <div className="flex items-center justify-between py-2">
              <h1 className="text-lg font-semibold">لوحة تحكم FLY BOY</h1>
              <SidebarTrigger />
            </div>
          </SidebarHeader>
          <SidebarContent className="p-0">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="لوحة التحكم"
                  onClick={() => navigate("/admin")}
                >
                  <LayoutDashboard className="ml-2" />
                  <span>الرئيسية</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="السلايدات"
                  onClick={() => navigate("/admin/slides")}
                >
                  <Image className="ml-2" />
                  <span>السلايدات</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="الحفلات"
                  onClick={() => navigate("/admin/events")}
                >
                  <CalendarDays className="ml-2" />
                  <span>الحفلات</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="الشركاء"
                  onClick={() => navigate("/admin/partners")}
                >
                  <Users className="ml-2" />
                  <span>شركاء النجاح</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="نبذة عني"
                  onClick={() => navigate("/admin/about")}
                >
                  <FileText className="ml-2" />
                  <span>نبذة عني</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {adminUser?.is_super_admin && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip="المستخدمين"
                    onClick={() => navigate("/admin/users")}
                  >
                    <UserCog className="ml-2" />
                    <span>إدارة المستخدمين</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <div className="flex w-full items-center justify-between">
              <div>
                <p className="text-sm font-medium">{adminUser?.username || "مستخدم"}</p>
                <p className="text-xs text-muted-foreground">
                  {adminUser?.is_super_admin ? "مدير النظام" : "مدير"}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="h-8 gap-1"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>خروج</span>
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="overflow-auto">
          <div className="container mx-auto p-4" dir="rtl">
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
