
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Index from '@/pages/Index';
import About from '@/pages/About';
import NotFound from '@/pages/NotFound';
import AllPartners from '@/pages/AllPartners';
import DistinguishedPartners from '@/pages/DistinguishedPartners';
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminLayout from '@/pages/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminSlides from '@/pages/admin/AdminSlides';
import AdminEvents from '@/pages/admin/AdminEvents';
import AdminPartners from '@/pages/admin/AdminPartners';
import AdminAbout from '@/pages/admin/AdminAbout';
import AdminSocialMedia from '@/pages/admin/AdminSocialMedia';
import AdminUsers from '@/pages/admin/AdminUsers';
import AdminMaintenance from '@/pages/admin/AdminMaintenance';
import AdminSubscribers from '@/pages/admin/AdminSubscribers';
import { Toaster } from '@/components/ui/sonner';
import { AdminAuthProvider } from '@/contexts/AdminAuthContext';
import { SiteSettingsProvider } from '@/contexts/SiteSettingsContext';
import Layout from '@/components/Layout';
import SubscribeButton from '@/components/SubscribeButton';
import WhatsAppButton from '@/components/WhatsAppButton';
import { ThemeProvider } from '@/components/ThemeProvider';
// We'll use this component to apply the scroll-to-top functionality
import ScrollToTop from '@/components/ScrollToTop';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading time to allow animations, fonts, etc to load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-flyboy-purple">
        <div className="pulse-glow">
          <img 
            src="/lovable-uploads/391e10d1-c56a-4816-ad0c-15fd941a3b2f.png" 
            alt="FLY BOY Logo" 
            className="w-48 h-48 object-contain animate-bounce" 
          />
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <SiteSettingsProvider>
        <AdminAuthProvider>
          <Router>
            {/* Add ScrollToTop component inside Router */}
            <ScrollToTop />
            {/* Add these buttons for all non-admin routes */}
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Layout><Index /><SubscribeButton /><WhatsAppButton /></Layout>} />
              <Route path="/about" element={<Layout><About /><SubscribeButton /><WhatsAppButton /></Layout>} />
              <Route path="/partners" element={<Layout><AllPartners /><SubscribeButton /><WhatsAppButton /></Layout>} />
              <Route path="/partners/distinguished" element={<Layout><DistinguishedPartners /><SubscribeButton /><WhatsAppButton /></Layout>} />
              <Route path="/distinguished-partners" element={<Navigate to="/partners/distinguished" replace />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="slides" element={<AdminSlides />} />
                <Route path="events" element={<AdminEvents />} />
                <Route path="subscribers" element={<AdminSubscribers />} />
                <Route path="partners" element={<AdminPartners />} />
                <Route path="about" element={<AdminAbout />} />
                <Route path="social-media" element={<AdminSocialMedia />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="maintenance" element={<AdminMaintenance />} />
              </Route>
              
              <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
              <Route path="*" element={<Layout><NotFound /><SubscribeButton /><WhatsAppButton /></Layout>} />
            </Routes>
          </Router>
          <Toaster richColors />
        </AdminAuthProvider>
      </SiteSettingsProvider>
    </ThemeProvider>
  );
}

export default App;
