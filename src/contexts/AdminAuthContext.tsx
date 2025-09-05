import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminUser } from "@/types/database.types";
import { Outlet, Navigate } from "react-router-dom";

type AdminAuthContextType = {
  adminUser: AdminUser | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
};

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children?: ReactNode }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [authInitialized, setAuthInitialized] = useState(false);

  // Simple authentication check - primarily based on localStorage now
  const checkAuth = async () => {
    try {
      console.log("Checking authentication status...");
      
      // Check if we have an admin session in localStorage
      const adminUsername = localStorage.getItem('admin_username');
      const sessionToken = localStorage.getItem('admin_session_token');
      
      if (adminUsername && sessionToken) {
        // Create a basic admin user object for display purposes
        const adminData: AdminUser = {
          id: sessionToken,
          username: adminUsername,
          is_super_admin: localStorage.getItem('admin_is_super') === 'true',
          created_at: new Date().toISOString()
        };
        
        console.log("Admin user authenticated from localStorage:", adminData.username);
        setAdminUser(adminData);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Auth check error:", error);
      return false;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      console.log("Initializing authentication...");
      setLoading(true);
      await checkAuth();
      setLoading(false);
      setAuthInitialized(true);
    };
    
    initAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      console.log("Starting login process for:", username);
      
      // Create an edge function call to verify credentials securely
      const { data, error } = await supabase.functions.invoke('admin-login', {
        body: { username, password }
      });
      
      if (error) {
        console.error("Login function error:", error);
        return { success: false, error: "حدث خطأ أثناء تسجيل الدخول" };
      }
      
      if (!data.success) {
        return { success: false, error: data.error || "اسم المستخدم أو كلمة المرور غير صحيحة" };
      }
      
      // Store authentication data in localStorage
      localStorage.setItem('admin_username', username);
      localStorage.setItem('admin_session_token', data.sessionToken);
      localStorage.setItem('admin_is_super', data.isSuperAdmin.toString());
      
      const adminData: AdminUser = {
        id: data.sessionToken,
        username: username,
        is_super_admin: data.isSuperAdmin,
        created_at: new Date().toISOString()
      };
      
      console.log("Login successful for user:", username);
      setAdminUser(adminData);
      return { success: true };
    } catch (error: any) {
      console.error("Login error:", error);
      return { success: false, error: "حدث خطأ أثناء تسجيل الدخول" };
    }
  };

  const logout = async () => {
    console.log("Logging out...");
    localStorage.removeItem('admin_username');
    localStorage.removeItem('admin_session_token');
    localStorage.removeItem('admin_is_super');
    setAdminUser(null);
  };

  if (!children && authInitialized) {
    // This is when used as a route element with Outlet
    if (!loading && !adminUser && window.location.pathname !== '/admin/login') {
      // Redirect to login if not authenticated and not already on login page
      console.log("Not authenticated, redirecting to login");
      return <Navigate to="/admin/login" replace />;
    }
    
    if (!loading && adminUser && window.location.pathname === '/admin/login') {
      // Redirect to dashboard if authenticated and on login page
      console.log("Already authenticated, redirecting to admin dashboard");
      return <Navigate to="/admin" replace />;
    }
    
    return (
      <AdminAuthContext.Provider
        value={{
          adminUser,
          loading,
          login,
          logout,
          checkAuth,
        }}
      >
        <Outlet />
      </AdminAuthContext.Provider>
    );
  }

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        loading,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};