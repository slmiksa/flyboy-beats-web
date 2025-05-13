
import React from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';
import MaintenancePage from './MaintenancePage';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';

interface LayoutProps {
  children: React.ReactNode;
  noPadding?: boolean;
}

const Layout = ({ children, noPadding = false }: LayoutProps) => {
  const { settings, isLoading } = useSiteSettings();
  const location = useLocation();
  
  // Check if current path is admin route (should be accessible even in maintenance mode)
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  // Show normal content if:
  // 1. Settings are still loading, or
  // 2. Maintenance mode is off, or
  // 3. We're on an admin route
  const showNormalContent = isLoading || !settings?.maintenance_mode || isAdminRoute;
  
  if (!showNormalContent && settings) {
    return <MaintenancePage settings={settings} />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className={`flex-1 ${noPadding ? '' : 'container mx-auto px-4 py-6'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
