
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Plus, Trash2, Edit2, ArrowUp, ArrowDown, Loader2, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SocialMedia } from "@/types/database.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const AdminSocialMedia = () => {
  const [socialLinks, setSocialLinks] = useState<SocialMedia[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<SocialMedia | null>(null);
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      platform: '',
      url: '',
      icon: '',
    }
  });

  // جلب روابط السوشال ميديا من قاعدة البيانات
  const fetchSocialLinks = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('social_media')
        .select('*')
        .order('order_position', { ascending: true });
      
      if (error) {
        toast({
          title: "خطأ",
          description: "حدث خطأ أثناء استرجاع روابط التواصل الاجتماعي",
          variant: "destructive",
        });
        console.error('Error fetching social media links:', error);
      } else {
        setSocialLinks(data as SocialMedia[] || []);
      }
    } catch (error) {
      console.error('Error fetching social media links:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  // تقديم النموذج
  const onSubmit = async (values: any) => {
    try {
      setIsSubmitting(true);
      
      // إيجاد أعلى ترتيب
      const highestOrder = socialLinks.length > 0
        ? Math.max(...socialLinks.map(link => link.order_position))
        : 0;
      
      let result;
      
      if (editingLink) {
        // تحديث رابط موجود
        result = await supabase
          .from('social_media')
          .update({
            platform: values.platform,
            url: values.url,
            icon: values.icon || values.platform,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingLink.id);
      } else {
        // إنشاء رابط جديد
        result = await supabase
          .from('social_media')
          .insert({
            platform: values.platform,
            url: values.url,
            icon: values.icon || values.platform,
            order_position: highestOrder + 1,
          } as SocialMedia);
      }
      
      if (result.error) {
        throw result.error;
      }
      
      await fetchSocialLinks();
      form.reset();
      setEditingLink(null);
      setIsDialogOpen(false);
      
      toast({
        title: "تم بنجاح",
        description: editingLink 
          ? "تم تحديث رابط التواصل الاجتماعي بنجاح" 
          : "تم إضافة رابط التواصل الاجتماعي بنجاح",
      });
      
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حفظ الرابط",
        variant: "destructive",
      });
      console.error('Error saving social link:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // حذف رابط
  const handleDelete = async (id: string) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا الرابط؟")) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('social_media')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      await fetchSocialLinks();
      toast({
        title: "تم الحذف",
        description: "تم حذف رابط التواصل الاجتماعي بنجاح",
      });
      
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حذف الرابط",
        variant: "destructive",
      });
      console.error('Error deleting social link:', error);
    }
  };

  // تحريك الترتيب
  const moveOrder = async (link: SocialMedia, direction: 'up' | 'down') => {
    try {
      const sorted = [...socialLinks].sort((a, b) => a.order_position - b.order_position);
      const currentIndex = sorted.findIndex(item => item.id === link.id);
      
      if (
        (direction === 'up' && currentIndex === 0) || 
        (direction === 'down' && currentIndex === sorted.length - 1)
      ) {
        return; // لا يمكن التحريك أكثر
      }
      
      const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      const targetLink = sorted[targetIndex];
      
      // تبادل المواضع
      const { error: error1 } = await supabase
        .from('social_media')
        .update({ order_position: targetLink.order_position })
        .eq('id', link.id);
        
      const { error: error2 } = await supabase
        .from('social_media')
        .update({ order_position: link.order_position })
        .eq('id', targetLink.id);
      
      if (error1 || error2) {
        throw error1 || error2;
      }
      
      await fetchSocialLinks();
      
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تغيير ترتيب الروابط",
        variant: "destructive",
      });
      console.error('Error reordering social links:', error);
    }
  };

  // تحرير رابط
  const handleEdit = (link: SocialMedia) => {
    form.reset({
      platform: link.platform,
      url: link.url,
      icon: link.icon,
    });
    setEditingLink(link);
    setIsDialogOpen(true);
  };

  // قائمة المنصات المتاحة
  const availablePlatforms = [
    { value: 'facebook', label: 'فيسبوك' },
    { value: 'instagram', label: 'انستغرام' },
    { value: 'twitter', label: 'تويتر' },
    { value: 'youtube', label: 'يوتيوب' },
    { value: 'tiktok', label: 'تيك توك' },
    { value: 'snapchat', label: 'سناب شات' },
    { value: 'linkedin', label: 'لينكد إن' },
    { value: 'chat', label: 'شات' },
    { value: 'jaco', label: 'جاكو' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-flyboy-gold">روابط التواصل الاجتماعي</h1>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-flyboy-gold hover:bg-flyboy-gold/80 text-flyboy-dark">
              <Plus className="h-4 w-4 mr-2" />
              إضافة رابط جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-center">
                {editingLink ? 'تحرير رابط التواصل الاجتماعي' : 'إضافة رابط تواصل اجتماعي جديد'}
              </DialogTitle>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="platform"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>المنصة</FormLabel>
                      <FormControl>
                        <select
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                          {...field}
                        >
                          <option value="">اختر المنصة</option>
                          {availablePlatforms.map(platform => (
                            <option key={platform.value} value={platform.value}>
                              {platform.label}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رابط URL</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="https://..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="icon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رمز الأيقونة (اختياري)</FormLabel>
                      <FormControl>
                        <Input 
                          type="text" 
                          placeholder="استخدم اسم المنصة افتراضيًا"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end pt-4">
                  <Button 
                    type="submit" 
                    className="bg-flyboy-gold hover:bg-flyboy-gold/80 text-flyboy-dark"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        جاري الحفظ...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        حفظ
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid gap-6">
        {isLoading ? (
          <Card className="border-flyboy-gold/30 bg-flyboy-purple/30">
            <CardContent className="flex justify-center items-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-flyboy-gold" />
            </CardContent>
          </Card>
        ) : socialLinks.length === 0 ? (
          <Card className="border-flyboy-gold/30 bg-flyboy-purple/30">
            <CardContent className="flex flex-col items-center py-10 space-y-4">
              <p className="text-white">لا توجد روابط تواصل اجتماعي حتى الآن.</p>
              <Button 
                className="bg-flyboy-gold hover:bg-flyboy-gold/80 text-flyboy-dark"
                onClick={() => setIsDialogOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                إضافة رابط جديد
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-flyboy-gold/30 bg-flyboy-purple/30">
            <CardHeader>
              <CardTitle className="text-xl text-flyboy-gold">قائمة روابط التواصل الاجتماعي</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {socialLinks.map(link => (
                  <div key={link.id} className="flex items-center justify-between bg-flyboy-dark/40 p-3 rounded-md">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <div className="w-10 h-10 rounded-full bg-flyboy-gold/20 flex items-center justify-center">
                        {availablePlatforms.find(p => p.value === link.platform)?.label.substring(0, 1) || "⚙️"}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-flyboy-gold">
                          {availablePlatforms.find(p => p.value === link.platform)?.label || link.platform}
                        </span>
                        <span className="text-sm text-white/70 truncate max-w-[200px]">
                          {link.url}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => moveOrder(link, 'up')}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => moveOrder(link, 'down')}
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => handleEdit(link)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        className="h-8 w-8 p-0"
                        onClick={() => handleDelete(link.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminSocialMedia;
