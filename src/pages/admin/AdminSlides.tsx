import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Slide } from "@/types/database.types";
import { Pen, Trash, ImagePlus, Plus, Upload } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1, { message: "يجب إدخال عنوان السلايد" }),
  subtitle: z.string().optional(),
  image_url: z.string().min(1, { message: "يجب إدخال رابط الصورة" }),
  order_position: z.number().min(1, { message: "يجب إدخال ترتيب السلايد" })
});

type FormValues = z.infer<typeof formSchema>;

const AdminSlides = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSlide, setEditingSlide] = useState<Slide | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      image_url: "",
      order_position: 1
    }
  });

  // Fetch slides from database
  const fetchSlides = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('slides')
        .select('*')
        .order('order_position', { ascending: true });

      if (error) throw error;
      
      if (data && data.length === 0) {
        // Insert default slides if none exist
        await insertDefaultSlides();
        const { data: newSlides } = await supabase
          .from('slides')
          .select('*')
          .order('order_position', { ascending: true });
          
        setSlides(newSlides as Slide[]);
      } else {
        setSlides(data as Slide[]);
      }
    } catch (error) {
      console.error('Error fetching slides:', error);
      toast({
        title: "حدث خطأ",
        description: "لم نتمكن من جلب السلايدات",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Insert default slides
  const insertDefaultSlides = async () => {
    const defaultSlides = [
      {
        title: 'FLY BOY',
        subtitle: 'أفضل الحفلات والأجواء الموسيقية',
        image_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=500&fit=crop',
        order_position: 1
      },
      {
        title: 'أجواء مميزة',
        subtitle: 'تجربة موسيقية فريدة من نوعها',
        image_url: 'https://images.unsplash.com/photo-1493676010878-4c37716e448e?w=800&h=500&fit=crop',
        order_position: 2
      },
      {
        title: 'حفلات حصرية',
        subtitle: 'أحدث التقنيات الصوتية والإضاءة',
        image_url: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=500&fit=crop',
        order_position: 3
      },
    ];

    try {
      const { error } = await supabase
        .from('slides')
        .insert(defaultSlides);

      if (error) throw error;

      toast({
        title: "تم إضافة السلايدات الافتراضية",
        description: "تم إضافة الس��ايدات الافتراضية بنجاح"
      });
    } catch (error) {
      console.error('Error inserting default slides:', error);
      toast({
        title: "حدث خطأ",
        description: "لم نتمكن من إضافة السلايدات الافتراضية",
        variant: "destructive"
      });
    }
  };

  // Handle file upload
  const handleFileUpload = async (file: File) => {
    if (!file) return;

    try {
      setUploading(true);
      
      // Generate a unique file name to avoid collisions
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;
      
      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from('slides')
        .upload(filePath, file);
        
      if (error) throw error;
      
      // Get the public URL for the uploaded image
      const { data: publicURL } = supabase.storage.from('slides').getPublicUrl(filePath);
      
      // Set the image URL in the form
      form.setValue('image_url', publicURL.publicUrl);
      
      toast({
        title: "تم رفع الصورة",
        description: "تم رفع الصورة بنجاح"
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "حدث خطأ",
        description: "لم نتمكن من رفع الصورة",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };
  
  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    try {
      if (editingSlide) {
        // Update existing slide
        const { error } = await supabase
          .from('slides')
          .update({
            title: values.title,
            subtitle: values.subtitle || null,
            image_url: values.image_url,
            order_position: values.order_position
          })
          .eq('id', editingSlide.id);

        if (error) throw error;

        toast({
          title: "تم التحديث",
          description: "تم تحديث السلايد بنجاح"
        });

        setEditingSlide(null);
      } else {
        // Create new slide
        const { error } = await supabase
          .from('slides')
          .insert({
            title: values.title,
            subtitle: values.subtitle || null,
            image_url: values.image_url,
            order_position: values.order_position
          });

        if (error) throw error;

        toast({
          title: "تم الإضافة",
          description: "تم إضافة السلايد الجديد بنجاح"
        });
      }

      form.reset({
        title: "",
        subtitle: "",
        image_url: "",
        order_position: slides.length + 1
      });

      fetchSlides();
    } catch (error) {
      console.error('Error saving slide:', error);
      toast({
        title: "حدث خطأ",
        description: "لم نتمكن من حفظ السلايد",
        variant: "destructive"
      });
    }
  };

  // Handle edit slide
  const handleEdit = (slide: Slide) => {
    setEditingSlide(slide);
    form.reset({
      title: slide.title,
      subtitle: slide.subtitle || "",
      image_url: slide.image_url,
      order_position: slide.order_position
    });
  };

  // Handle delete slide
  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا السلايد؟")) {
      return;
    }

    try {
      const { error } = await supabase
        .from('slides')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "تم الحذف",
        description: "تم حذف السلايد بنجاح"
      });

      fetchSlides();
    } catch (error) {
      console.error('Error deleting slide:', error);
      toast({
        title: "حدث خطأ",
        description: "لم نتمكن من حذف السلايد",
        variant: "destructive"
      });
    }
  };

  // Reset form
  const handleCancel = () => {
    setEditingSlide(null);
    form.reset({
      title: "",
      subtitle: "",
      image_url: "",
      order_position: slides.length + 1
    });
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-flyboy-gold">إدارة السلايدات</h1>
        <Button 
          onClick={() => handleCancel()} 
          className="bg-flyboy-gold hover:bg-flyboy-gold/80 text-black"
        >
          <Plus className="ml-2" /> إضافة سلايد جديد
        </Button>
      </div>
      <p className="text-muted-foreground">قم بإضافة وتعديل وحذف السلايدات في الصفحة الرئيسية</p>
      
      <Card className="border-flyboy-gold/30 bg-flyboy-purple/30">
        <CardHeader>
          <CardTitle className="text-xl text-flyboy-gold">
            {editingSlide ? "تعديل السلايد" : "إضافة سلايد جديد"}
          </CardTitle>
          <CardDescription>أدخل بيانات السلايد</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">عنوان السلايد</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="أدخل عنوان السلايد" 
                          className="border-flyboy-gold/50 bg-flyboy-purple/50 text-white"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subtitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">العنوان الفرعي (اختياري)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="أدخل العنوان الفرعي" 
                          className="border-flyboy-gold/50 bg-flyboy-purple/50 text-white"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="image_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">صورة السلايد</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <Input 
                              placeholder="رابط صورة السلايد" 
                              className="flex-1 border-flyboy-gold/50 bg-flyboy-purple/50 text-white"
                              {...field} 
                            />
                            <Button 
                              type="button" 
                              variant="outline" 
                              className="border-flyboy-gold/50 hover:bg-flyboy-gold/20 text-flyboy-gold"
                              onClick={triggerFileInput}
                              disabled={uploading}
                            >
                              {uploading ? "جاري الرفع..." : <Upload className="h-4 w-4" />}
                            </Button>
                          </div>
                          {field.value && (
                            <div className="relative h-20 w-32 overflow-hidden rounded">
                              <img 
                                src={field.value} 
                                alt="معاينة" 
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = "https://placehold.co/600x400/purple/gold?text=Preview";
                                }}
                              />
                            </div>
                          )}
                          <input 
                            type="file" 
                            ref={fileInputRef}
                            className="hidden" 
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleFileUpload(e.target.files[0]);
                              }
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="order_position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">الترتيب</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="ترتيب السلايد" 
                          className="border-flyboy-gold/50 bg-flyboy-purple/50 text-white"
                          {...field} 
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex justify-end gap-2 mt-4">
                {editingSlide && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="border-flyboy-gold/50 text-white hover:bg-flyboy-purple/50"
                    onClick={handleCancel}
                  >
                    إلغاء
                  </Button>
                )}
                <Button 
                  type="submit" 
                  className="bg-flyboy-gold hover:bg-flyboy-gold/80 text-black"
                >
                  {editingSlide ? "تحديث" : "إضافة"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card className="border-flyboy-gold/30 bg-flyboy-purple/30">
        <CardHeader>
          <CardTitle className="text-xl text-flyboy-gold">السلايدات الحالية</CardTitle>
          <CardDescription>جميع السلايدات المعروضة في الصفحة الرئيسية</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center py-4 text-white">جاري تحميل السلايدات...</p>
          ) : slides.length === 0 ? (
            <p className="text-center py-4 text-white">لا توجد سلايدات بعد</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-flyboy-gold/30">
                    <TableHead className="text-flyboy-gold">الترتيب</TableHead>
                    <TableHead className="text-flyboy-gold">العنوان</TableHead>
                    <TableHead className="text-flyboy-gold">العنوان الفرعي</TableHead>
                    <TableHead className="text-flyboy-gold">الصورة</TableHead>
                    <TableHead className="text-flyboy-gold">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {slides.map((slide) => (
                    <TableRow key={slide.id} className="border-flyboy-gold/30 text-white">
                      <TableCell>{slide.order_position}</TableCell>
                      <TableCell>{slide.title}</TableCell>
                      <TableCell>{slide.subtitle || '-'}</TableCell>
                      <TableCell>
                        <div className="relative h-12 w-20 overflow-hidden rounded">
                          <img 
                            src={slide.image_url} 
                            alt={slide.title} 
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://placehold.co/600x400/purple/gold?text=Error";
                            }}
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEdit(slide)}
                            className="h-8 border-flyboy-gold/50 hover:bg-flyboy-purple/50 text-flyboy-gold"
                          >
                            <Pen className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDelete(slide.id)}
                            className="h-8 border-red-500/50 hover:bg-red-500/20 text-red-500"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSlides;
