
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Construction, WrenchIcon } from "lucide-react";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import MaintenancePage from "@/components/MaintenancePage";
import FileUploader from "@/components/FileUploader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const AdminMaintenance = () => {
  const { settings, isLoading, toggleMaintenanceMode, updateMaintenanceMessage, updateMaintenanceImage } = useSiteSettings();
  const [message, setMessage] = useState(settings?.maintenance_message || "");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggleMaintenance = async () => {
    await toggleMaintenanceMode();
  };

  const handleUpdateMessage = async () => {
    setIsUpdating(true);
    try {
      await updateMaintenanceMessage(message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleImageUpload = async (url: string) => {
    await updateMaintenanceImage(url);
  };

  if (isLoading || !settings) {
    return (
      <div className="p-8 text-center">
        <p className="text-lg">جاري تحميل الإعدادات...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-flyboy-gold">وضع الصيانة</h2>
          <p className="text-sm text-muted-foreground">إدارة حالة الموقع ورسالة الصيانة</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="border-0 bg-flyboy-purple/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl text-flyboy-gold">حالة وضع الصيانة</CardTitle>
                  <CardDescription>تفعيل أو إلغاء وضع الصيانة للموقع</CardDescription>
                </div>
                <Construction className="h-6 w-6 text-flyboy-gold" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="maintenance-mode" className="text-base">
                    وضع الصيانة
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {settings.maintenance_mode
                      ? "الموقع في وضع الصيانة ولا يمكن للزوار الوصول إليه"
                      : "الموقع متاح للزوار"}
                  </p>
                </div>
                <Switch
                  id="maintenance-mode"
                  checked={settings.maintenance_mode}
                  onCheckedChange={handleToggleMaintenance}
                />
              </div>

              {settings.maintenance_mode && (
                <Alert className="bg-amber-500/20 border-amber-500/50 text-amber-300">
                  <WrenchIcon className="h-4 w-4" />
                  <AlertTitle>تحذير</AlertTitle>
                  <AlertDescription>
                    الموقع حالياً في وضع الصيانة ولا يمكن للزوار الوصول إليه.
                    فقط صفحة لوحة التحكم متاحة.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          <Card className="border-0 bg-flyboy-purple/50">
            <CardHeader>
              <CardTitle className="text-xl text-flyboy-gold">تخصيص صفحة الصيانة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="maintenance-message">رسالة الصيانة</Label>
                <Textarea
                  id="maintenance-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label>صورة الصيانة</Label>
                {settings.maintenance_image && (
                  <div className="mb-4">
                    <AspectRatio ratio={16/9} className="bg-muted rounded-md overflow-hidden">
                      <img
                        src={settings.maintenance_image}
                        alt="صورة الصيانة الحالية"
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                  </div>
                )}
                <FileUploader 
                  onFileUploaded={handleImageUpload} 
                  folder="maintenance"
                  acceptedFileTypes="image/*"
                  maxFileSize={5}
                  buttonText="تحميل صورة جديدة"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleUpdateMessage} 
                disabled={isUpdating || message === settings.maintenance_message}
                className="bg-flyboy-gold hover:bg-flyboy-gold/80 text-black"
              >
                حفظ التغييرات
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className="border-0 bg-flyboy-purple/50">
            <CardHeader>
              <CardTitle className="text-xl text-flyboy-gold">معاينة صفحة الصيانة</CardTitle>
            </CardHeader>
            <CardContent className="h-[600px] overflow-auto rounded border border-flyboy-gold/20">
              <Tabs defaultValue="preview">
                <TabsList className="mb-4">
                  <TabsTrigger value="preview">معاينة</TabsTrigger>
                  <TabsTrigger value="current">الحالة الحالية</TabsTrigger>
                </TabsList>
                
                <TabsContent value="preview" className="mt-0">
                  <MaintenancePage 
                    settings={{
                      ...settings,
                      maintenance_message: message
                    }} 
                  />
                </TabsContent>
                
                <TabsContent value="current" className="mt-0">
                  <MaintenancePage settings={settings} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminMaintenance;
