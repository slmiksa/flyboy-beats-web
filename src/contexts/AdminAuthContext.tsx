
import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminUser } from "@/types/database.types";

type AdminAuthContextType = {
  adminUser: AdminUser | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
};

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData?.session) {
        // For now, since we don't have the admin_users table,
        // we'll construct an admin user from auth data
        const userData: AdminUser = {
          id: sessionData.session.user.id,
          username: sessionData.session.user.email?.split('@')[0] || 'admin',
          is_super_admin: true, // Default to super admin for now
          created_at: sessionData.session.user.created_at || new Date().toISOString(),
        };
        
        setAdminUser(userData);
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
      await checkAuth();
      setLoading(false);
    };
    
    initAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      // For now, we'll authenticate directly with the email
      // In the future, we can implement admin_users table lookup
      const email = `${username}@flyboy-admin.com`;
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      
      if (error) {
        return { success: false, error: "اسم المستخدم أو كلمة المرور غير صحيحة" };
      }
      
      // Create an admin user object
      const adminData: AdminUser = {
        id: data.user.id,
        username: username,
        is_super_admin: true, // Default to super admin for now
        created_at: data.user.created_at,
      };
      
      setAdminUser(adminData);
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: "حدث خطأ أثناء تسجيل الدخول" };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setAdminUser(null);
  };

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
