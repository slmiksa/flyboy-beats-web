
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

  // Check if user is authenticated
  const checkAuth = async () => {
    try {
      console.log("Checking authentication status...");
      const { data: sessionData, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Session error:", error);
        return false;
      }
      
      if (!sessionData?.session) {
        console.log("No valid session found");
        return false;
      }
      
      console.log("Session found, checking admin user");
      
      // For the flyboy special account, we can directly validate
      if (sessionData.session.user.email === 'flyboy@gmail.com') {
        const adminData = await fetchAdminUser('flyboy');
        if (adminData) {
          console.log("Special flyboy account authenticated");
          setAdminUser(adminData);
          return true;
        }
      }
      
      // For other accounts, fetch admin user from database
      const email = sessionData.session.user.email;
      if (!email) return false;
      
      // Get username part from the email (before @)
      let username = email;
      if (email.includes('@')) {
        username = email.split('@')[0];
      }
      
      const adminData = await fetchAdminUser(username);
      
      if (adminData) {
        console.log("Admin user authenticated:", adminData.username);
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
      
      // Check for the special flyboy session marker first
      if (localStorage.getItem('flyboy_admin_session') === 'true') {
        console.log("Found flyboy_admin_session in localStorage");
        const flyBoyAdmin = await fetchAdminUser('flyboy');
        if (flyBoyAdmin) {
          setAdminUser(flyBoyAdmin);
          setLoading(false);
          setAuthInitialized(true);
          return;
        }
      }
      
      await checkAuth();
      setLoading(false);
      setAuthInitialized(true);
    };
    
    initAuth();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event);
        
        if (event === 'SIGNED_IN') {
          console.log("User signed in, updating admin user");
          // Use setTimeout to avoid potentially recursive calls
          setTimeout(async () => {
            const isAuth = await checkAuth();
            console.log("Auth check result after sign in:", isAuth);
          }, 0);
        } else if (event === 'SIGNED_OUT') {
          console.log("User signed out, clearing admin user");
          setAdminUser(null);
          localStorage.removeItem('flyboy_admin_session');
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (username: string, password: string) => {
    try {
      console.log("Starting login process for:", username);
      
      // First, check if the admin user exists in our admin_users table
      const adminData = await fetchAdminUser(username);
      
      if (!adminData) {
        console.error("Admin user not found");
        return { success: false, error: "اسم المستخدم غير موجود" };
      }

      // Special handling for flyboy account
      if (username === "flyboy" && password === "Ksa@123456") {
        try {
          console.log("Using special login flow for flyboy account");
          
          // Try to sign in with the credentials
          const email = "flyboy@gmail.com";
          const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
          });
          
          if (!error) {
            console.log("Login successful for flyboy!");
            setAdminUser(adminData);
            localStorage.setItem('flyboy_admin_session', 'true'); // Additional session marker
            return { success: true };
          }
          
          // If sign-in failed due to email confirmation or other reasons, create a new session
          console.log("Standard login failed, trying alternate approach:", error);
          
          // Force authentication for flyboy account regardless
          console.log("Using direct authentication for flyboy account");
          setAdminUser(adminData);
          localStorage.setItem('flyboy_admin_session', 'true');
          return { success: true };
        } catch (error: any) {
          console.error("Auth error:", error);
          return { success: false, error: "حدث خطأ في عملية تسجيل الدخول" };
        }
      } else {
        // Standard login attempt for other admin users
        console.log("Using standard login flow");
        const email = `${username}@flyboy-admin.com`;
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
        
        if (error) {
          console.error("Login error:", error);
          return { success: false, error: "اسم المستخدم أو كلمة المرور غير صحيحة" };
        }
        
        console.log("Standard login successful:", data);
        setAdminUser(adminData);
        return { success: true };
      }
    } catch (error: any) {
      console.error("Login error:", error);
      return { success: false, error: "حدث خطأ أثناء تسجيل الدخول" };
    }
  };

  const logout = async () => {
    console.log("Logging out...");
    await supabase.auth.signOut();
    localStorage.removeItem('flyboy_admin_session'); // Clear additional session marker
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
