
import React from 'react';
import { SiteSettings } from '@/types/database.types';
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface MaintenancePageProps {
  settings: SiteSettings;
}

const MaintenancePage = ({ settings }: MaintenancePageProps) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-flyboy-purple/80 to-flyboy-purple text-white p-4">
      <div className="max-w-lg w-full bg-black/20 backdrop-blur-md rounded-lg shadow-lg p-8 text-center border border-flyboy-gold/30">
        <h1 className="text-3xl font-bold text-flyboy-gold mb-6">DJ FLYBOY</h1>
        
        {settings.maintenance_image && (
          <div className="mb-6 w-full">
            <AspectRatio ratio={16/9} className="bg-muted overflow-hidden rounded-md">
              <img 
                src={settings.maintenance_image}
                alt="صورة الصيانة" 
                className="w-full h-full object-cover"
              />
            </AspectRatio>
          </div>
        )}
        
        <h2 className="text-2xl font-bold mb-4">وضع الصيانة</h2>
        <p className="text-lg mb-6">{settings.maintenance_message}</p>
        
        <div className="text-flyboy-gold text-sm mt-8">
          © {new Date().getFullYear()} DJ FLYBOY - جميع الحقوق محفوظة
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;
