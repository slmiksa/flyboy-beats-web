
import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { FileUploader } from "@/components/FileUploader";
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  ListOrdered,
  List
} from "lucide-react";
import { AboutSection as AboutSectionType } from "@/types/database.types";
import TextEditor from "@/components/TextEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AboutSectionPreview from "@/components/AboutSectionPreview";

const AdminAbout = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [aboutData, setAboutData] = useState<AboutSectionType | null>(null);
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Default about content
  const defaultAboutContent = `<h3 class="text-flyboy-gold text-xl font-bold mb-4">نبذة عني</h3>
<p class="mb-4">أنا FLY BOY، دي جي محترف ومنسق موسيقي مع خبرة تزيد عن ١٠ سنوات في مجال تنسيق الأغاني وإحياء الحفلات الموسيقية.</p>

<p class="mb-4">أتميز بأسلوبي الفريد في دمج الموسيقى العربية والعالمية، وأمتلك القدرة على إضفاء أجواء مميزة تناسب مختلف أنواع المناسبات والحفلات.</p>

<h3 class="text-flyboy-gold text-xl font-bold mb-4">خبراتي</h3>
<div class="flex items-center mb-3">
  <span class="text-flyboy-gold mr-2">•</span>
  <span>حفلات الشاطئ</span>
</div>
<div class="flex items-center mb-3">
  <span class="text-flyboy-gold mr-2">•</span>
  <span>النوادي الليلية</span>
</div>
<div class="flex items-center mb-3">
  <span class="text-flyboy-gold mr-2">•</span>
  <span>المهرجانات الموسيقية</span>
</div>
<div class="flex items-center mb-3">
  <span class="text-flyboy-gold mr-2">•</span>
  <span>المناسبات الخاصة</span>
</div>`;

  // Fetch the current about section data
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("about_section")
          .select("*")
          .single();

        if (error) {
          console.error("Error fetching about section data:", error);
          // If no data exists, we'll create a new entry later
          if (error.code === "PGRST116") {
            setAboutData(null);
            setContent("");
            setImageUrl(null);
          } else {
            toast.error("حدث خطأ أثناء تحميل البيانات");
          }
        } else {
          setAboutData(data);
          setContent(data.content);
          setImageUrl(data.image_url);
        }
      } catch (error) {
        console.error("Error in fetchAboutData:", error);
        toast.error("حدث خطأ أثناء تحميل البيانات");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  // Handle image upload
  const handleImageChange = (file: File | null) => {
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setImagePreview(preview);
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  // Restore default about content
  const handleRestoreDefault = () => {
    setContent(defaultAboutContent);
    toast.success("تم استرجاع النبذة الافتراضية بنجاح");
  };

  // Save the about section data
  const handleSave = async () => {
    try {
      setIsSaving(true);

      // Upload image if there's a new one
      let newImageUrl = imageUrl;
      
      if (image) {
        const fileExt = image.name.split('.').pop();
        const fileName = `about_image_${Date.now()}.${fileExt}`;
        
        const { error: uploadError, data: uploadData } = await supabase.storage
          .from("logos")  // Using existing bucket for simplicity
          .upload(fileName, image, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          console.error("Error uploading image:", uploadError);
          toast.error("حدث خطأ أثناء رفع الصورة");
          setIsSaving(false);
          return;
        }

        const { data: publicUrlData } = supabase.storage
          .from("logos")
          .getPublicUrl(fileName);
        
        newImageUrl = publicUrlData.publicUrl;
      }

      // Save the data
      const updateData = {
        content,
        image_url: newImageUrl,
        updated_at: new Date().toISOString(),
      };

      if (aboutData?.id) {
        // Update existing record
        const { error: updateError } = await supabase
          .from("about_section")
          .update(updateData)
          .eq("id", aboutData.id);

        if (updateError) {
          console.error("Error updating about section:", updateError);
          toast.error("حدث خطأ أثناء حفظ البيانات");
          return;
        }
      } else {
        // Create new record
        const { error: insertError } = await supabase
          .from("about_section")
          .insert([updateData]);

        if (insertError) {
          console.error("Error creating about section:", insertError);
          toast.error("حدث خطأ أثناء إنشاء البيانات");
          return;
        }
      }

      toast.success("تم حفظ البيانات بنجاح");
      
      // Refresh data
      const { data: freshData } = await supabase
        .from("about_section")
        .select("*")
        .single();
        
      if (freshData) {
        setAboutData(freshData);
      }
      
      // Clear image selection
      setImage(null);
      setImagePreview(null);
      
    } catch (error) {
      console.error("Error in handleSave:", error);
      toast.error("حدث خطأ أثناء حفظ البيانات");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">إدارة نبذة عني</h1>
      <p className="text-muted-foreground">قم بتحديث النبذة التعريفية والصورة</p>
      
      <Tabs defaultValue="edit">
        <TabsList className="mb-4">
          <TabsTrigger value="edit">تحرير</TabsTrigger>
          <TabsTrigger value="preview">معاينة</TabsTrigger>
        </TabsList>
        
        <TabsContent value="edit">
          <Card>
            <CardHeader>
              <CardTitle>نبذة عني</CardTitle>
              <CardDescription>قم بتحديث النبذة التعريفية والصورة الخاصة بك</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {isLoading ? (
                <div className="text-center py-4">جاري التحميل...</div>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">الصورة الشخصية</label>
                    <div className="flex gap-4 flex-col md:flex-row">
                      <div className="w-full md:w-1/3">
                        {(imagePreview || imageUrl) && (
                          <div className="border rounded-md overflow-hidden mb-2 aspect-square">
                            <img
                              src={imagePreview || imageUrl || ""}
                              alt="صورة نبذة عني"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <FileUploader
                          onFileSelect={handleImageChange}
                          accept="image/*"
                        />
                      </div>
                      <div className="w-full md:w-2/3 flex flex-col justify-center">
                        <p className="text-sm text-muted-foreground">
                          قم بتحميل صورة شخصية عالية الجودة. يفضل أن تكون بأبعاد مربعة.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="block text-sm font-medium">النبذة التعريفية</label>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleRestoreDefault}
                      >
                        استرجاع النبذة الافتراضية
                      </Button>
                    </div>
                    <TextEditor 
                      value={content}
                      onChange={setContent}
                      className="min-h-[300px]"
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      onClick={handleSave} 
                      disabled={isLoading || isSaving}
                      className="bg-flyboy-gold text-flyboy-dark hover:bg-flyboy-gold/90"
                    >
                      {isSaving ? "جاري الحفظ..." : "حفظ التغييرات"}
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>معاينة</CardTitle>
              <CardDescription>معاينة كيف ستظهر النبذة التعريفية للزوار</CardDescription>
            </CardHeader>
            <CardContent>
              <AboutSectionPreview 
                content={content} 
                imageUrl={imagePreview || imageUrl} 
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminAbout;
