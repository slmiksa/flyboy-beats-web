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

  // Function to fetch admin user data by username
  const fetchAdminUser = async (username: string) => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('username', username)
        .single();
      
      if (error || !data) {
        console.error("Error fetching admin user:", error);
        return null;
      }
      
      return data as AdminUser;
    } catch (error) {
      console.error("Fetch admin error:", error);
      return null;
    }
  };

  // Simple authentication check - primarily based on localStorage now
  const checkAuth = async () => {
    try {
      console.log("Checking authentication status...");
      
      // Check if we have an admin session in localStorage
      const adminUsername = localStorage.getItem('admin_username');
      if (adminUsername) {
        // Set admin username for RLS policies
        await supabase.rpc('set_config', {
          setting_name: 'app.admin_username',
          setting_value: adminUsername,
          is_local: false
        });
        
        const adminData = await fetchAdminUser(adminUsername);
        if (adminData) {
          console.log("Admin user authenticated from localStorage:", adminData.username);
          setAdminUser(adminData);
          return true;
        }
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
      
      // Set admin username in session for RLS policies
      await supabase.rpc('set_config', {
        setting_name: 'app.admin_username',
        setting_value: username,
        is_local: false
      });
      
      // Verify password using database function
      const { data: isValid, error: verifyError } = await supabase.rpc('verify_admin_password', {
        input_username: username,
        input_password: password
      });
      
      if (verifyError) {
        console.error("Password verification error:", verifyError);
        return { success: false, error: "حدث خطأ أثناء تسجيل الدخول" };
      }
      
      if (!isValid) {
        return { success: false, error: "اسم المستخدم أو كلمة المرور غير صحيحة" };
      }
      
      // Fetch user data after successful verification
      const { data: adminData, error: fetchError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('username', username)
        .maybeSingle();
      
      if (fetchError || !adminData) {
        console.error("Error fetching admin data:", fetchError);
        return { success: false, error: "حدث خطأ أثناء تسجيل الدخول" };
      }
      
      console.log("Login successful for user:", username);
      setAdminUser(adminData);
      localStorage.setItem('admin_username', username);
      return { success: true };
    } catch (error: any) {
      console.error("Login error:", error);
      return { success: false, error: "حدث خطأ أثناء تسجيل الدخول" };
    }
  };

  const logout = async () => {
    console.log("Logging out...");
    localStorage.removeItem('admin_username');
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
