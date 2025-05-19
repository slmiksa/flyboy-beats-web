
import React, { useEffect, useState } from 'react';
import { PhoneCall } from 'lucide-react';

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
    <div className="fixed right-4 top-[calc(50%+60px)] z-50 flex flex-col items-center">
      <button
        onClick={handleWhatsAppClick}
        className="group relative flex flex-col items-center"
        aria-label="تواصل معنا عبر واتساب"
      >
        {/* DJ Turntable Design - Made smaller to match SubscribeButton */}
        <div className="relative mb-2">
          <div className="bg-black rounded-full h-12 w-12 flex items-center justify-center shadow-lg">
            <div 
              className={`bg-flyboy-gold rounded-full h-10 w-10 flex items-center justify-center ${isRotating ? 'animate-spin' : ''} transition-all duration-300`}
            >
              <div className="bg-black rounded-full h-3 w-3 absolute" />
              <div className="bg-black rounded-full h-1 w-6 absolute transform rotate-45" />
              <div className="bg-black rounded-full h-1 w-6 absolute transform -rotate-45" />
            </div>
          </div>
          
          {/* WhatsApp Icon - Made smaller */}
          <div className="absolute -top-1 -right-1 bg-whatsapp rounded-full p-1.5 shadow-lg pulse-glow">
            <PhoneCall size={12} className="text-white" />
          </div>
        </div>
        
        {/* Button Text - Made smaller */}
        <div className="bg-flyboy-gold text-black text-[10px] font-bold py-1 px-2 rounded-full shadow-lg transform transition-transform duration-300 group-hover:scale-110">
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
