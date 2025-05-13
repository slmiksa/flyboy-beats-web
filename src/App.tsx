
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import DistinguishedPartners from "./pages/DistinguishedPartners";
import AllPartners from "./pages/AllPartners";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminSlides from "./pages/admin/AdminSlides";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminPartners from "./pages/admin/AdminPartners";
import AdminAbout from "./pages/admin/AdminAbout";
import AdminUsers from "./pages/admin/AdminUsers";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Index /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/distinguished-partners" element={<Layout><DistinguishedPartners /></Layout>} />
          <Route path="/all-partners" element={<Layout><AllPartners /></Layout>} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="slides" element={<AdminSlides />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="partners" element={<AdminPartners />} />
            <Route path="about" element={<AdminAbout />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
          
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
