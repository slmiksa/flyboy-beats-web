
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminAuth, AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Define schema for form validation
const loginSchema = z.object({
  username: z.string().min(1, { message: "اسم المستخدم مطلوب" }),
  password: z.string().min(1, { message: "كلمة المرور مطلوبة" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const AdminLoginContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAdminAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Initialize form with validation
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleLogin = async (values: LoginFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("Attempting login with:", values.username);
      const result = await login(values.username, values.password);
      
      if (result.success) {
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: "أهلاً بك في لوحة التحكم",
        });
        navigate("/admin");
      } else {
        setError(result.error || "اسم المستخدم أو كلمة المرور غير صحيحة");
        toast({
          title: "فشل تسجيل الدخول",
          description: result.error || "اسم المستخدم أو كلمة المرور غير صحيحة",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      setError("حدث خطأ أثناء محاولة تسجيل الدخول");
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء محاولة تسجيل الدخول",
        variant: "destructive",
      });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e0b39]">
      <div className="w-full max-w-md p-4">
        <Card className="w-full border-purple-300 bg-[#1e0b39] text-white">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold text-white">لوحة تحكم FLY BOY</CardTitle>
            <CardDescription className="text-gray-300">قم بتسجيل الدخول للوصول إلى لوحة التحكم</CardDescription>
          </CardHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)}>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-right block text-white">اسم المستخدم</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="أدخل اسم المستخدم"
                          autoComplete="username"
                          className="text-right bg-[#2a1547] border-purple-400 text-white placeholder:text-gray-400"
                          dir="rtl"
                        />
                      </FormControl>
                      <FormMessage className="text-right text-red-400" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-right block text-white">كلمة المرور</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="أدخل كلمة المرور"
                          autoComplete="current-password"
                          className="text-right bg-[#2a1547] border-purple-400 text-white placeholder:text-gray-400"
                          dir="rtl"
                        />
                      </FormControl>
                      <FormMessage className="text-right text-red-400" />
                    </FormItem>
                  )}
                />

                {error && (
                  <div className="rounded-md bg-red-500/20 p-3 text-red-400 text-right">
                    {error}
                  </div>
                )}
              </CardContent>

              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-6" 
                  disabled={isLoading}
                >
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
          </Form>
        </Card>
        
        <div className="mt-6 text-center text-white">
          <p className="text-sm">
            اسم المستخدم: <strong>flyboy</strong> | كلمة المرور: <strong>Ksa@123456</strong>
          </p>
        </div>
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
