
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAdminAuth, AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const AdminLoginContent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showInitSetup, setShowInitSetup] = useState(false);
  const [initPassword, setInitPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { login } = useAdminAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const checkInitialSetup = async () => {
    if (username === "flyboy") {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: "flyboy@flyboy-admin.com",
          password: "any-password",
        });
        
        // If login fails with invalid credentials, it means the user exists but needs password setup
        if (error && error.message.includes("Invalid login credentials")) {
          setShowInitSetup(true);
          return true;
        }
      } catch (error) {
        // Continue to normal login flow
      }
    }
    return false;
  };

  const handleInitialSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (initPassword !== confirmPassword) {
      toast({
        title: "خطأ في كلمة المرور",
        description: "كلمتا المرور غير متطابقتين",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      // First try to sign up the user
      const { data, error } = await supabase.auth.signUp({
        email: "flyboy@flyboy-admin.com",
        password: initPassword,
      });

      if (!error) {
        toast({
          title: "تم إعداد الحساب بنجاح",
          description: "يمكنك الآن تسجيل الدخول باستخدام كلمة المرور الجديدة",
        });
        setShowInitSetup(false);
      } else {
        toast({
          title: "فشل إعداد الحساب",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إعداد الحساب",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Check if this is the initial setup for the admin user
    const isInitSetup = await checkInitialSetup();
    if (isInitSetup) {
      setIsLoading(false);
      return;
    }

    try {
      const result = await login(username, password);
      if (result.success) {
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: "أهلاً بك في لوحة التحكم",
        });
        navigate("/admin");
      } else {
        toast({
          title: "فشل تسجيل الدخول",
          description: result.error || "اسم المستخدم أو كلمة المرور غير صحيحة",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء محاولة تسجيل الدخول",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="w-full max-w-md p-4">
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">لوحة تحكم FLY BOY</CardTitle>
            <CardDescription>قم بتسجيل الدخول للوصول إلى لوحة التحكم</CardDescription>
          </CardHeader>
          {!showInitSetup ? (
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">اسم المستخدم</Label>
                  <Input
                    id="username"
                    placeholder="أدخل اسم المستخدم"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    required
                    className="text-right"
                    dir="rtl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">كلمة المرور</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="أدخل كلمة المرور"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    className="text-right"
                    dir="rtl"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> جاري تسجيل الدخول...
                    </>
                  ) : (
                    "تسجيل الدخول"
                  )}
                </Button>
              </CardFooter>
            </form>
          ) : (
            <form onSubmit={handleInitialSetup}>
              <CardContent className="space-y-4">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-medium">إعداد أول تسجيل دخول</h3>
                  <p className="text-muted-foreground text-sm">
                    هذه هي المرة الأولى التي تقوم بتسجيل الدخول. الرجاء إنشاء كلمة مرور.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="init-password">كلمة المرور الجديدة</Label>
                  <Input
                    id="init-password"
                    type="password"
                    placeholder="أدخل كلمة المرور الجديدة"
                    value={initPassword}
                    onChange={(e) => setInitPassword(e.target.value)}
                    required
                    className="text-right"
                    dir="rtl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">تأكيد كلمة المرور</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="أدخل كلمة المرور مرة أخرى"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="text-right"
                    dir="rtl"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex flex-col w-full gap-2">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> جاري الإعداد...
                      </>
                    ) : (
                      "إعداد كلمة المرور"
                    )}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => setShowInitSetup(false)}
                  >
                    رجوع
                  </Button>
                </div>
              </CardFooter>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

const AdminLogin = () => {
  return (
    <AdminAuthProvider>
      <AdminLoginContent />
    </AdminAuthProvider>
  );
};

export default AdminLogin;
