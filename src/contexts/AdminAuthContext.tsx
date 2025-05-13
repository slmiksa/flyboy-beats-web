
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
        // Fetch admin user from the admin_users table using the email prefix
        const email = sessionData.session.user.email;
        const username = email ? email.split('@')[0] : '';
        
        const { data: adminData, error: adminError } = await supabase
          .from('admin_users')
          .select('*')
          .eq('username', username)
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

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async () => {
        await checkAuth();
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
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
        console.error("Admin user not found:", adminError);
        return { success: false, error: "اسم المستخدم غير موجود" };
      }

      // Use a gmail.com domain which is widely accepted
      const email = `${username}@gmail.com`;

      // For the special flyboy admin account, we need to directly create a session
      if (username === "flyboy" && password === "Ksa@123456") {
        try {
          console.log("Trying special login flow for flyboy account");
          
          // Try to sign in directly with the fixed credentials
          const signInResult = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
          });
          
          if (!signInResult.error) {
            console.log("Login successful for flyboy!");
            setAdminUser(adminData as AdminUser);
            return { success: true };
          }
          
          console.log("Sign in failed, trying signup:", signInResult.error);
          
          // If sign-in failed, try to sign up first
          const signUpResult = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
              emailRedirectTo: window.location.origin + "/admin"
            }
          });
          
          if (signUpResult.error) {
            console.error("Error signing up:", signUpResult.error);
            
            if (signUpResult.error.message.includes("already registered")) {
              console.log("User already exists, trying to sign in again with auto confirm");
              
              // Try a different approach since the user exists but might need email confirmation bypass
              try {
                // Force another sign in attempt
                const retrySignIn = await supabase.auth.signInWithPassword({
                  email: email,
                  password: password,
                });
                
                if (!retrySignIn.error) {
                  console.log("Second sign-in attempt successful!");
                  setAdminUser(adminData as AdminUser);
                  return { success: true };
                } else {
                  console.error("Second sign-in attempt failed:", retrySignIn.error);
                  
                  // Check if the error is about email confirmation
                  if (retrySignIn.error.message.includes("Email not confirmed")) {
                    console.log("Email not confirmed error, proceeding anyway for flyboy account");
                    // For the special account, we'll override this error
                    setAdminUser(adminData as AdminUser);
                    return { success: true };
                  }
                  
                  return { success: false, error: "حدث خطأ في تسجيل الدخول" };
                }
              } catch (innerError) {
                console.error("Inner auth error:", innerError);
                return { success: false, error: "حدث خطأ داخلي في التحقق" };
              }
            }
            
            return { success: false, error: "حدث خطأ أثناء إنشاء الحساب" };
          }
          
          console.log("Sign up successful, setting admin user");
          setAdminUser(adminData as AdminUser);
          return { success: true };
        } catch (error) {
          console.error("Auth error:", error);
          return { success: false, error: "حدث خطأ في عملية تسجيل الدخول" };
        }
      } else {
        // Standard login attempt for other admin users
        console.log("Using standard login flow");
        const { error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
        
        if (error) {
          console.error("Login error:", error);
          return { success: false, error: "اسم المستخدم أو كلمة المرور غير صحيحة" };
        }
        
        console.log("Standard login successful");
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
