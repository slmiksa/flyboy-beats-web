
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
        // Fetch admin user from the admin_users table
        const { data: adminData, error: adminError } = await supabase
          .from('admin_users')
          .select('*')
          .eq('username', sessionData.session.user.email?.split('@')[0] || '')
          .single();
        
        if (adminError || !adminData) {
          console.error("Admin user data fetch error:", adminError);
          setAdminUser(null);
          return false;
        }
        
        setAdminUser(adminData as AdminUser);
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
      // First, check if the admin user exists in our admin_users table
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('username', username)
        .single();
      
      if (adminError || !adminData) {
        return { success: false, error: "اسم المستخدم غير موجود" };
      }

      // Special case for the superadmin "flyboy" with fixed password
      if (username === "flyboy" && password === "Ksa@123456") {
        // For flyboy, we'll use a standardized email format for Supabase Auth
        const email = `${username}@flyboy-admin.com`;
        
        // Try to sign in, if it fails (first time) then sign up
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
        
        if (error) {
          // First time login, create account
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: email,
            password: password,
          });
          
          if (signUpError) {
            return { success: false, error: "حدث خطأ أثناء إنشاء الحساب" };
          }
        }
        
        setAdminUser(adminData as AdminUser);
        return { success: true };
      } 
      else {
        // For other admin users, we use normal authentication
        const email = `${username}@flyboy-admin.com`;
        
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
        
        if (error) {
          return { success: false, error: "اسم المستخدم أو كلمة المرور غير صحيحة" };
        }
        
        setAdminUser(adminData as AdminUser);
        return { success: true };
      }
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
