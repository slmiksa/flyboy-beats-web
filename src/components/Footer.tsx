
import React from 'react';
import { Music, Headphones, Star } from 'lucide-react';
const Footer = () => {
  return <footer className="bg-flyboy-purple mt-16 relative overflow-hidden py-[35px] mx-0 my-[26px]">
      {/* Animated music notes */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        {Array(10).fill(0).map((_, i) => <div key={i} className="absolute animate-float" style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDuration: `${3 + Math.random() * 7}s`,
        animationDelay: `${Math.random() * 5}s`
      }}>
            {i % 3 === 0 ? <Music size={24} className="text-flyboy-gold" /> : i % 3 === 1 ? <Headphones size={24} className="text-flyboy-gold" /> : <Star size={24} className="text-flyboy-gold" />}
          </div>)}
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-8 pulse-glow">
            <img src="/lovable-uploads/391e10d1-c56a-4816-ad0c-15fd941a3b2f.png" alt="FLY BOY Logo" className="w-40 h-40 object-contain" />
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-white opacity-75 mb-2">
              جميع الحقوق محفوظة &copy; {new Date().getFullYear()} - FLY BOY
            </p>
            <a 
              href="https://www.trndsky.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-flyboy-gold hover:text-white transition-colors text-sm inline-block"
            >
              برمجة وتطوير TRNDSKY
            </a>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;
