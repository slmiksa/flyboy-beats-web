
import React, { useEffect, useState } from 'react';
import { Disc, Phone } from 'lucide-react';

const WhatsAppButton = () => {
  const [isRotating, setIsRotating] = useState(false);
  const phoneNumber = '966508520075';
  
  // Handle the WhatsApp click
  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
  };

  // Add rotating animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsRotating(true);
      
      setTimeout(() => {
        setIsRotating(false);
      }, 3000);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed right-4 top-1/3 z-50 flex flex-col items-center">
      <button
        onClick={handleWhatsAppClick}
        className="group relative flex flex-col items-center"
        aria-label="تواصل معنا عبر واتساب"
      >
        {/* DJ Turntable Design */}
        <div className="relative mb-2">
          <div className="bg-black rounded-full h-16 w-16 flex items-center justify-center shadow-lg">
            <div 
              className={`bg-flyboy-gold rounded-full h-14 w-14 flex items-center justify-center ${isRotating ? 'animate-spin' : ''} transition-all duration-300`}
            >
              <div className="bg-black rounded-full h-4 w-4 absolute" />
              <div className="bg-black rounded-full h-1 w-8 absolute transform rotate-45" />
              <div className="bg-black rounded-full h-1 w-8 absolute transform -rotate-45" />
            </div>
          </div>
          
          {/* WhatsApp Icon */}
          <div className="absolute -bottom-2 -right-2 bg-whatsapp rounded-full p-2 shadow-lg pulse-glow">
            <Phone size={14} className="text-white" />
          </div>
        </div>
        
        {/* Button Text */}
        <div className="bg-flyboy-gold text-black text-xs font-bold py-1 px-3 rounded-full shadow-lg transform transition-transform duration-300 group-hover:scale-110">
          إدارة أعمالي
        </div>
        
        {/* Equalizer Effect */}
        <div className="equalizer-container mt-1">
          <div className="equalizer-bar"></div>
          <div className="equalizer-bar"></div>
          <div className="equalizer-bar"></div>
        </div>
      </button>
    </div>
  );
};

export default WhatsAppButton;
