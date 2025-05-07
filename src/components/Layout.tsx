
import React from 'react';
import Footer from './Footer';
import SocialMediaBar from './SocialMediaBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {children}
      </main>
      <SocialMediaBar />
      <Footer />
    </div>
  );
};

export default Layout;
