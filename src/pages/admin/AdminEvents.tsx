import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Loader2, Download, Info } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Event } from "@/types/database.types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const AdminEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    whatsapp_number: "",
    image_url: "",
    keywords: ""
  });
  const [uploading, setUploading] = useState(false);
  const [importingDefaults, setImportingDefaults] = useState(false);

  // Default events that can be imported
  const defaultEvents = [
    {
      title: 'Festival',
      image_url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3',
      whatsapp_number: '966500000000',
      description: null,
      location: null,
      date: null,
      keywords: 'DJ Flyboy, دي جي Flyboy, Flyboy DJ سعودي, DJ حفلات خاصة, مهرجان, festival, حفلة موسيقية'
    },
    {
      title: 'Beach Party',
      image_url: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec',
      whatsapp_number: '966500000000',
      description: null,
      location: null,
      date: null,
      keywords: 'DJ Flyboy, دي جي Flyboy, Beach Party, حفلة شاطئية, DJ شاطئ, DJ للحفلات الشاطئية'
    },
    {
      title: 'Night Sound',
      image_url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7',
      whatsapp_number: '966500000000',
      description: null,
      location: null,
      date: null,
      keywords: 'DJ Flyboy, دي جي Flyboy, Night Sound, صوت الليل, DJ ليلي, DJ حفلات ليلية, DJ سهرات'
    },
    {
      title: 'Club Mix',
      image_url: 'https://images.unsplash.com/photo-1576525865260-9f0e7cfb02b3',
      whatsapp_number: '966500000000',
      description: null,
      location: null,
      date: null,
      keywords: 'DJ Flyboy, دي جي Flyboy, Club Mix, نادي, ميكس, DJ للنوادي, DJ ميكس, DJ Club, ميكس حفلات'
    }
  ];

  // Fetch events data
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("فشل في تحميل الحفلات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    try {
      setUploading(true);
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('slides')
        .upload(filePath, file);
      
      if (uploadError) throw uploadError;
      
      const { data } = supabase.storage.from('slides').getPublicUrl(filePath);
      
      setFormData(prev => ({
        ...prev,
        image_url: data.publicUrl
      }));
      
      toast.success("تم رفع الصورة بنجاح");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("فشل في رفع الصورة");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isEditing && currentEvent) {
        // Update existing event
        const { error } = await supabase
          .from("events")
          .update({
            title: formData.title,
            location: formData.location,
            description: formData.description,
            whatsapp_number: formData.whatsapp_number,
            image_url: formData.image_url,
            keywords: formData.keywords,
            updated_at: new Date().toISOString()
          })
          .eq("id", currentEvent.id);
        
        if (error) throw error;
        toast.success("تم تحديث الحفلة بنجاح");
      } else {
        // Create new event
        const { error } = await supabase
          .from("events")
          .insert({
            title: formData.title,
            location: formData.location || null,
            description: formData.description || null,
            whatsapp_number: formData.whatsapp_number || null,
            image_url: formData.image_url,
            keywords: formData.keywords || 'DJ Flyboy, دي جي Flyboy, Flyboy DJ سعودي, DJ حفلات خاصة'
          });
        
        if (error) throw error;
        toast.success("تم إضافة الحفلة بنجاح");
      }
      
      // Reset and close
      setIsSheetOpen(false);
      resetForm();
      fetchEvents();
    } catch (error) {
      console.error("Error saving event:", error);
      toast.error("فشل في حفظ الحفلة");
    }
  };

  const handleEdit = (event: Event) => {
    setCurrentEvent(event);
    setFormData({
      title: event.title,
      location: event.location || "",
      description: event.description || "",
      whatsapp_number: event.whatsapp_number || "",
      image_url: event.image_url,
      keywords: event.keywords || ""
    });
    setIsEditing(true);
    setIsSheetOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذه الحفلة؟")) return;
    
    try {
      const { error } = await supabase
        .from("events")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      
      toast.success("تم حذف الحفلة بنجاح");
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("فشل في حذف الحفلة");
    }
  };

  const handleAddNew = () => {
    resetForm();
    setIsEditing(false);
    setCurrentEvent(null);
    setIsSheetOpen(true);
    
    // Set default keywords for new events
    setFormData(prev => ({
      ...prev,
      keywords: 'DJ Flyboy, دي جي Flyboy, Flyboy DJ سعودي, DJ حفلات خاصة, DJ للمناسبات الفاخرة'
    }));
  };

  const importDefaultEvents = async () => {
    try {
      setImportingDefaults(true);
      
      // Insert default events to database
      const { error } = await supabase
        .from("events")
        .insert(defaultEvents);
      
      if (error) throw error;
      
      toast.success("تم استيراد الحفلات الافتراضية بنجاح");
      fetchEvents(); // Refresh the events list
    } catch (error) {
      console.error("Error importing default events:", error);
      toast.error("فشل في استيراد الحفلات الافتراضية");
    } finally {
      setImportingDefaults(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      location: "",
      description: "",
      whatsapp_number: "",
      image_url: "",
      keywords: ""
    });
  };

  // Helper function to truncate text
  const truncateText = (text: string | null, maxLength: number = 40) => {
    if (!text) return "-";
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">إدارة الحفلات</h1>
          <p className="text-muted-foreground">قم بإضافة وتعديل وحذف الحفلات والفعاليات</p>
        </div>
        <div className="flex space-x-2 rtl:space-x-reverse">
          <Button onClick={handleAddNew}>
            <Plus className="ml-2 rtl:ml-0 rtl:mr-2" size={16} />
            إضافة حفلة
          </Button>
          <Button 
            variant="outline" 
            onClick={importDefaultEvents}
            disabled={importingDefaults}
          >
            {importingDefaults ? (
              <Loader2 className="ml-2 rtl:ml-0 rtl:mr-2 animate-spin" size={16} />
            ) : (
              <Download className="ml-2 rtl:ml-0 rtl:mr-2" size={16} />
            )}
            استيراد الحفلات الافتراضية
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>الحفلات</CardTitle>
          <CardDescription>جميع الحفلات والفعاليات المتاحة</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="animate-spin text-flyboy-gold" size={32} />
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-8">
              <p>لا توجد حفلات متاحة</p>
              <div className="flex justify-center mt-4 space-x-2 rtl:space-x-reverse">
                <Button onClick={handleAddNew} variant="default">
                  <Plus className="ml-2 rtl:ml-0 rtl:mr-2" size={16} />
                  إضافة حفلة جديدة
                </Button>
                <Button 
                  onClick={importDefaultEvents} 
                  variant="outline"
                  disabled={importingDefaults}
                >
                  {importingDefaults ? (
                    <Loader2 className="ml-2 rtl:ml-0 rtl:mr-2 animate-spin" size={16} />
                  ) : (
                    <Download className="ml-2 rtl:ml-0 rtl:mr-2" size={16} />
                  )}
                  استيراد الحفلات الافتراضية
                </Button>
              </div>
            </div>
          ) : (
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الصورة</TableHead>
                    <TableHead>العنوان</TableHead>
                    <TableHead>الموقع</TableHead>
                    <TableHead>واتساب</TableHead>
                    <TableHead>الكلمات المفتاحية</TableHead>
                    <TableHead className="text-left">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>
                        <img 
                          src={event.image_url} 
                          alt={event.title} 
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{event.title}</TableCell>
                      <TableCell>{event.location || "-"}</TableCell>
                      <TableCell>{event.whatsapp_number || "-"}</TableCell>
                      <TableCell className="max-w-[200px]">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center cursor-help">
                                <span className="truncate block">
                                  {truncateText(event.keywords, 30)}
                                </span>
                                {event.keywords && event.keywords.length > 30 && (
                                  <Info size={14} className="ml-1 text-muted-foreground" />
                                )}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent className="w-80 p-2 text-wrap">
                              {event.keywords || "لا توجد كلمات مفتاحية"}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="flex space-x-2 rtl:space-x-reverse">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEdit(event)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDelete(event.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="overflow-auto" side="right">
          <SheetHeader>
            <SheetTitle>{isEditing ? 'تعديل حفلة' : 'إضافة حفلة جديدة'}</SheetTitle>
            <SheetDescription>
              أدخل تفاصيل الحفلة أدناه
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-6 py-6">
            <div className="space-y-2">
              <Label htmlFor="title">عنوان الحفلة *</Label>
              <Input 
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">صورة الحفلة *</Label>
              <div className="flex flex-col space-y-2">
                {formData.image_url && (
                  <img 
                    src={formData.image_url} 
                    alt="Preview" 
                    className="w-full h-40 object-cover rounded-md"
                  />
                )}
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploading}
                />
                {uploading && <p className="text-sm text-muted-foreground">جاري رفع الصورة...</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">موقع الحفلة</Label>
              <Input 
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">وصف الحفلة</Label>
              <Input 
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp_number">رقم الواتساب</Label>
              <Input 
                id="whatsapp_number"
                name="whatsapp_number"
                value={formData.whatsapp_number}
                onChange={handleInputChange}
                placeholder="966500000000"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="keywords">الكلمات المفتاحية (SEO)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-muted-foreground">
                      <Info size={14} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">الكلمات المفتاحية الإفتراضية:</h4>
                      <div className="text-sm text-muted-foreground space-y-2">
                        <p>• <strong>عام:</strong> DJ Flyboy, دي جي Flyboy, Flyboy DJ سعودي, DJ حفلات خاصة, DJ للمناسبات الفاخرة</p>
                        <p>• <strong>مهرجان:</strong> مهرجان, festival, حفلة موسيقية</p>
                        <p>• <strong>حفلة شاطئية:</strong> Beach Party, حفلة شاطئية, DJ شاطئ, DJ للحفلات الشاطئية</p>
                        <p>• <strong>حفلات ليلية:</strong> Night Sound, صوت الليل, DJ ليلي, DJ حفلات ليلية, DJ سهرات</p>
                        <p>• <strong>نوادي:</strong> Club Mix, نادي, ميكس, DJ للنوادي, DJ ميكس, DJ Club, ميكس حفلات</p>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <Textarea 
                id="keywords"
                name="keywords"
                value={formData.keywords}
                onChange={handleInputChange}
                placeholder="DJ Flyboy, دي جي Flyboy, Flyboy DJ سعودي..."
                rows={4}
                className="resize-y"
              />
              <p className="text-sm text-muted-foreground">أدخل الكلمات المفتاحية مفصولة بفواصل لتحسين ظهور الموقع في محركات البحث</p>
            </div>

            <div className="flex justify-end space-x-2 rtl:space-x-reverse pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsSheetOpen(false)}
              >
                إلغاء
              </Button>
              <Button 
                type="submit" 
                disabled={!formData.title || !formData.image_url || uploading}
              >
                {isEditing ? 'تحديث' : 'إضافة'}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminEvents;
