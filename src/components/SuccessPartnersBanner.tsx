
import React from 'react';

const SuccessPartnersBanner = () => {
  return (
    <div className="bg-flyboy-purple py-4 border-b-2 border-flyboy-gold">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold text-flyboy-gold text-center relative mb-0 pb-1">
          شركاء النجاح المتميزيين
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-36 h-0.5 bg-flyboy-gold"></div>
          <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-flyboy-gold text-sm">★★★</span>
          <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-flyboy-gold text-sm">★★★</span>
        </h2>
        
        <div className="mt-4 overflow-hidden">
          <div className="flex justify-center space-x-8 space-x-reverse animate-marquee">
            {partners.map((partner) => (
              <div 
                key={partner.id} 
                className="partner-item flex-shrink-0"
              >
                <div className="bg-white p-2 rounded-lg flex items-center justify-center transform transition-transform hover:scale-105">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-12 object-contain"
                  />
                </div>
                <h3 className="text-white text-sm font-medium text-center mt-1">{partner.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Partners list (reused from PartnersSection)
const partners = [
  {
    id: 1,
    name: 'Night Vision',
    logo: 'https://images.unsplash.com/photo-1485359466996-ba9c9b4afb63?w=200&h=100&fit=crop&auto=format',
  },
  {
    id: 2,
    name: 'Sound Masters',
    logo: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=100&fit=crop&auto=format',
  },
  {
    id: 3,
    name: 'Sancy Club',
    logo: 'https://images.unsplash.com/photo-1516876437184-593fda40c542?w=200&h=100&fit=crop&auto=format',
  },
  {
    id: 4,
    name: 'Beach Waves',
    logo: 'https://images.unsplash.com/photo-1525268771113-32d9e9021a97?w=200&h=100&fit=crop&auto=format',
  },
];

export default SuccessPartnersBanner;
