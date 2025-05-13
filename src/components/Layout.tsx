
import React from 'react';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  noPadding?: boolean;
}

const Layout = ({ children, noPadding = false }: LayoutProps) => {
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
