
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAdminAuth, AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const AdminLoginContent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAdminAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

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
