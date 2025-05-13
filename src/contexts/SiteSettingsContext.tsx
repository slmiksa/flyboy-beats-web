
import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteSettings } from "@/types/database.types";
import { useToast } from "@/hooks/use-toast";

interface SiteSettingsContextType {
  settings: SiteSettings | null;
  isLoading: boolean;
  error: string | null;
  refreshSettings: () => Promise<void>;
  toggleMaintenanceMode: () => Promise<boolean>;
  updateMaintenanceMessage: (message: string) => Promise<boolean>;
  updateMaintenanceImage: (imageUrl: string) => Promise<boolean>;
}

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (context === undefined) {
    throw new Error("useSiteSettings must be used within a SiteSettingsProvider");
  }
  return context;
};

interface SiteSettingsProviderProps {
  children: ReactNode;
}

export const SiteSettingsProvider = ({ children }: SiteSettingsProviderProps) => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .maybeSingle();
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setSettings(data as SiteSettings);
      }
    } catch (err) {
      console.error("Error fetching site settings:", err);
      setError("حدث خطأ أثناء جلب إعدادات الموقع");
    } finally {
      setIsLoading(false);
    }
  };

  const refreshSettings = async () => {
    await fetchSettings();
  };

  const toggleMaintenanceMode = async (): Promise<boolean> => {
    try {
      if (!settings) return false;
      
      const newMode = !settings.maintenance_mode;
      
      const { error } = await supabase
        .from("site_settings")
        .update({ maintenance_mode: newMode, updated_at: new Date().toISOString() })
        .eq("id", settings.id);
      
      if (error) {
        throw error;
      }
      
      setSettings({
        ...settings,
        maintenance_mode: newMode,
        updated_at: new Date().toISOString()
      });
      
      toast({
        title: newMode ? "تم تفعيل وضع الصيانة" : "تم إلغاء وضع الصيانة",
        description: newMode ? "الموقع الآن في وضع الصيانة" : "الموقع متاح الآن للزوار",
      });
      
      return true;
    } catch (err) {
      console.error("Error toggling maintenance mode:", err);
      toast({
        title: "حدث خطأ",
        description: "لم نتمكن من تغيير وضع الصيانة",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateMaintenanceMessage = async (message: string): Promise<boolean> => {
    try {
      if (!settings) return false;
      
      const { error } = await supabase
        .from("site_settings")
        .update({ maintenance_message: message, updated_at: new Date().toISOString() })
        .eq("id", settings.id);
      
      if (error) {
        throw error;
      }
      
      setSettings({
        ...settings,
        maintenance_message: message,
        updated_at: new Date().toISOString()
      });
      
      toast({
        title: "تم التحديث",
        description: "تم تحديث رسالة الصيانة بنجاح",
      });
      
      return true;
    } catch (err) {
      console.error("Error updating maintenance message:", err);
      toast({
        title: "حدث خطأ",
        description: "لم نتمكن من تحديث رسالة الصيانة",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateMaintenanceImage = async (imageUrl: string): Promise<boolean> => {
    try {
      if (!settings) return false;
      
      const { error } = await supabase
        .from("site_settings")
        .update({ maintenance_image: imageUrl, updated_at: new Date().toISOString() })
        .eq("id", settings.id);
      
      if (error) {
        throw error;
      }
      
      setSettings({
        ...settings,
        maintenance_image: imageUrl,
        updated_at: new Date().toISOString()
      });
      
      toast({
        title: "تم التحديث",
        description: "تم تحديث صورة الصيانة بنجاح",
      });
      
      return true;
    } catch (err) {
      console.error("Error updating maintenance image:", err);
      toast({
        title: "حدث خطأ",
        description: "لم نتمكن من تحديث صورة الصيانة",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const value = {
    settings,
    isLoading,
    error,
    refreshSettings,
    toggleMaintenanceMode,
    updateMaintenanceMessage,
    updateMaintenanceImage,
  };

  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  );
};
