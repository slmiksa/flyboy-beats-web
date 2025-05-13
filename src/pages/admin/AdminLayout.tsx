
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { 
  LayoutDashboard, 
  Home, 
  Users, 
  Image, 
  Calendar, 
  Users2, 
  Info, 
  ArrowRight,
  LogOut,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarTrigger
} from "@/components/ui/sidebar";

const AdminLayout = () => {
  const { adminUser, logout } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !adminUser) {
      navigate("/admin/login");
    }
  }, [adminUser, mounted, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/admin/login");
      toast({
        title: "تم تسجيل الخروج",
        description: "تم تسجيل الخروج بنجاح"
      });
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        title: "حدث خطأ",
        description: "لم نتمكن من تسجيل الخروج",
        variant: "destructive"
      });
    }
  };

  if (!mounted || !adminUser) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-row-reverse bg-background">
        <Sidebar side="right" variant="sidebar">
          <SidebarHeader className="flex items-center gap-2 px-4 py-3 border-b border-flyboy-gold/20">
            <div className="flex items-center justify-between w-full text-flyboy-gold">
              <SidebarTrigger className="md:hidden text-flyboy-gold" />
              <h1 className="text-lg font-bold">لوحة تحكم FLY BOY</h1>
              <LayoutDashboard className="h-5 w-5" />
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => navigate("/admin")}
                  isActive={location.pathname === "/admin"}
                  tooltip="الرئيسية"
                >
                  <Home className="ml-2" size={18} />
                  <span>الرئيسية</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => navigate("/admin/slides")}
                  isActive={location.pathname === "/admin/slides"}
                  tooltip="السلايدات"
                >
                  <Image className="ml-2" size={18} />
                  <span>السلايدات</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => navigate("/admin/events")}
                  isActive={location.pathname === "/admin/events"}
                  tooltip="الحفلات"
                >
                  <Calendar className="ml-2" size={18} />
                  <span>الحفلات</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => navigate("/admin/partners")}
                  isActive={location.pathname === "/admin/partners"}
                  tooltip="شركاء النجاح"
                >
                  <Users2 className="ml-2" size={18} />
                  <span>شركاء النجاح</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => navigate("/admin/about")}
                  isActive={location.pathname === "/admin/about"}
                  tooltip="نبذة عنا"
                >
                  <Info className="ml-2" size={18} />
                  <span>نبذة عنا</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => navigate("/admin/social-media")}
                  isActive={location.pathname === "/admin/social-media"}
                  tooltip="منصات التواصل"
                >
                  <ArrowRight className="ml-2" size={18} />
                  <span>منصات التواصل</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => navigate("/admin/users")}
                  isActive={location.pathname === "/admin/users"}
                  tooltip="المستخدمين"
                >
                  <Users className="ml-2" size={18} />
                  <span>المستخدمين</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter className="border-t border-flyboy-gold/20 p-4">
            <Button
              onClick={handleLogout}
              className="w-full bg-flyboy-purple hover:bg-flyboy-purple/80 text-white border border-flyboy-gold/30"
            >
              <LogOut className="ml-2 h-4 w-4" />
              تسجيل الخروج
            </Button>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 overflow-auto">
          <div className="flex items-center justify-between p-4 md:p-6 bg-flyboy-purple border-b border-flyboy-gold/20">
            <SidebarTrigger className="md:hidden text-flyboy-gold" />
            <div className="text-flyboy-gold text-sm">
              مرحباً، {adminUser?.username || "مستخدم"}
            </div>
          </div>
          
          <div className="p-4 md:p-6 space-y-6">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
