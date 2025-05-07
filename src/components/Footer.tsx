
import React from 'react';
import { MessageCircle, Instagram, Twitter, Music, Headphones } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-flyboy-purple py-12 mt-16 relative overflow-hidden">
      {/* Animated music notes */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        {Array(10).fill(0).map((_, i) => (
          <div 
            key={i} 
            className="absolute animate-float"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 7}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            {i % 2 === 0 ? <Music size={24} className="text-flyboy-gold" /> : <Headphones size={24} className="text-flyboy-gold" />}
          </div>
        ))}
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-8 pulse-glow">
            <img 
              src="/lovable-uploads/beedc4c4-95b4-4570-b85b-61e8853a966b.png" 
              alt="FLY BOY Logo" 
              className="w-32 h-32 object-contain"
            />
          </div>
          
          <h3 className="text-flyboy-gold text-xl font-bold mb-4">تابعني على وسائل التواصل الاجتماعي</h3>
          <div className="flex space-x-6 space-x-reverse">
            <a
              href="https://snapchat.com/add/flyboy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-flyboy-gold transition-all duration-300 transform hover:scale-125"
              aria-label="Snapchat"
            >
              <MessageCircle size={30} />
            </a>
            <a
              href="https://instagram.com/flyboy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-flyboy-gold transition-all duration-300 transform hover:scale-125"
              aria-label="Instagram"
            >
              <Instagram size={30} />
            </a>
            <a
              href="https://twitter.com/flyboy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-flyboy-gold transition-all duration-300 transform hover:scale-125"
              aria-label="Twitter"
            >
              <Twitter size={30} />
            </a>
          </div>
          <div className="mt-8 text-center">
            <p className="text-white opacity-75">
              جميع الحقوق محفوظة &copy; {new Date().getFullYear()} - FLY BOY
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
