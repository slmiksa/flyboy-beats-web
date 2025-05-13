
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
        const { data: userData } = await supabase
          .from('admin_users')
          .select('id, username, is_super_admin, created_at')
          .eq('id', sessionData.session.user.id)
          .single();
        
        if (userData) {
          setAdminUser(userData as AdminUser);
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
      await checkAuth();
      setLoading(false);
    };
    
    initAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      // First, check if the user exists and get their email
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('id, username, is_super_admin, created_at')
        .eq('username', username)
        .single();
      
      if (adminError || !adminData) {
        return { success: false, error: "اسم المستخدم أو كلمة المرور غير صحيحة" };
      }
      
      // Now that we have confirmed the user exists, try to authenticate
      const { data, error } = await supabase.auth.signInWithPassword({
        email: `${username}@flyboy-admin.com`,
        password: password,
      });
      
      if (error) {
        return { success: false, error: "اسم المستخدم أو كلمة المرور غير صحيحة" };
      }
      
      setAdminUser(adminData as AdminUser);
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
