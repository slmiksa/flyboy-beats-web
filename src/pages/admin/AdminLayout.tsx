
import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
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
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarTrigger,
  SidebarSeparator
} from "@/components/ui/sidebar";
import { Toggle } from "@/components/ui/toggle";

const AdminLayout = () => {
  const { adminUser, logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if there's a stored sidebar state in localStorage
    const storedState = localStorage.getItem("admin-sidebar-state");
    if (storedState) {
      setSidebarCollapsed(storedState === "collapsed");
    }
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

  const toggleSidebar = () => {
    const newState = !sidebarCollapsed;
    setSidebarCollapsed(newState);
    // Store sidebar state in localStorage
    localStorage.setItem("admin-sidebar-state", newState ? "collapsed" : "expanded");
  };

  // Helper function to determine if a route is active
  const isRouteActive = (path: string) => {
    return location.pathname === path;
  };

  if (!mounted || !adminUser) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-row-reverse bg-background">
        <Sidebar 
          side="right" 
          variant="sidebar"
          className={cn(
            "transition-all duration-300 ease-in-out",
            sidebarCollapsed ? "md:w-[60px]" : ""
          )}
        >
          <SidebarHeader className="flex items-center gap-2 px-4 py-3 border-b border-flyboy-gold/20 bg-flyboy-purple">
            <div className="flex items-center justify-between w-full text-flyboy-gold">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleSidebar}
                className="md:flex hidden text-flyboy-gold hover:bg-flyboy-purple/60"
              >
                {sidebarCollapsed ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </Button>
              {!sidebarCollapsed && <h1 className="text-lg font-bold hidden md:block">لوحة تحكم FLY BOY</h1>}
              <SidebarTrigger className="md:hidden text-flyboy-gold" />
              <LayoutDashboard className="h-5 w-5" />
            </div>
          </SidebarHeader>
          
          <SidebarContent className="py-2 bg-flyboy-purple/90">
            <SidebarMenu className="space-y-2 px-3">
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => navigate("/admin")}
                  isActive={isRouteActive("/admin")}
                  tooltip="الرئيسية"
                  className={cn(
                    "hover:bg-flyboy-purple/60",
                    isRouteActive("/admin") ? "bg-flyboy-purple" : ""
                  )}
                >
                  <Home className="ml-2" size={18} />
                  <span className="md:block block">{!sidebarCollapsed && "الرئيسية"}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarSeparator className="my-3" />
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => navigate("/admin/slides")}
                  isActive={isRouteActive("/admin/slides")}
                  tooltip="السلايدات"
                  className={cn(
                    "hover:bg-flyboy-purple/60",
                    isRouteActive("/admin/slides") ? "bg-flyboy-purple" : ""
                  )}
                >
                  <Image className="ml-2" size={18} />
                  <span className="md:block block">{!sidebarCollapsed && "السلايدات"}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => navigate("/admin/events")}
                  isActive={isRouteActive("/admin/events")}
                  tooltip="الحفلات"
                  className={cn(
                    "hover:bg-flyboy-purple/60",
                    isRouteActive("/admin/events") ? "bg-flyboy-purple" : ""
                  )}
                >
                  <Calendar className="ml-2" size={18} />
                  <span className="md:block block">{!sidebarCollapsed && "الحفلات"}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => navigate("/admin/partners")}
                  isActive={isRouteActive("/admin/partners")}
                  tooltip="شركاء النجاح"
                  className={cn(
                    "hover:bg-flyboy-purple/60", 
                    isRouteActive("/admin/partners") ? "bg-flyboy-purple" : ""
                  )}
                >
                  <Users2 className="ml-2" size={18} />
                  <span className="md:block block">{!sidebarCollapsed && "شركاء النجاح"}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => navigate("/admin/about")}
                  isActive={isRouteActive("/admin/about")}
                  tooltip="نبذة عنا"
                  className={cn(
                    "hover:bg-flyboy-purple/60",
                    isRouteActive("/admin/about") ? "bg-flyboy-purple" : ""
                  )}
                >
                  <Info className="ml-2" size={18} />
                  <span className="md:block block">{!sidebarCollapsed && "نبذة عنا"}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => navigate("/admin/social-media")}
                  isActive={isRouteActive("/admin/social-media")}
                  tooltip="منصات التواصل"
                  className={cn(
                    "hover:bg-flyboy-purple/60",
                    isRouteActive("/admin/social-media") ? "bg-flyboy-purple" : ""
                  )}
                >
                  <ArrowRight className="ml-2" size={18} />
                  <span className="md:block block">{!sidebarCollapsed && "منصات التواصل"}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarSeparator className="my-3" />
              
              {adminUser?.is_super_admin && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => navigate("/admin/users")}
                    isActive={isRouteActive("/admin/users")}
                    tooltip="المستخدمين"
                    className={cn(
                      "hover:bg-flyboy-purple/60",
                      isRouteActive("/admin/users") ? "bg-flyboy-purple" : ""
                    )}
                  >
                    <Users className="ml-2" size={18} />
                    <span className="md:block block">{!sidebarCollapsed && "المستخدمين"}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter className="border-t border-flyboy-gold/20 p-4 bg-flyboy-purple">
            <Button
              onClick={handleLogout}
              className="w-full bg-flyboy-purple hover:bg-flyboy-purple/80 text-white border border-flyboy-gold/30"
            >
              <LogOut className="ml-2 h-4 w-4" />
              {!sidebarCollapsed && <span className="md:block block">تسجيل الخروج</span>}
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
