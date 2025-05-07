
import React from 'react';

// قائمة شركاء النجاح مع 4 لوقوات فقط
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

const PartnersSection = () => {
  return (
    <section className="py-16 bg-flyboy-purple">
      <div className="container">
        <div className="mb-10 flex justify-center">
          <img 
            src="/lovable-uploads/391e10d1-c56a-4816-ad0c-15fd941a3b2f.png" 
            alt="FLY BOY Logo" 
            className="w-32 h-32 object-contain pulse-glow"
          />
        </div>
        
        <h2 className="section-title text-flyboy-gold mb-12">شركاء النجاح</h2>
        
        <div className="relative mx-auto max-w-4xl border-2 border-flyboy-gold rounded-2xl overflow-hidden bg-flyboy-dark p-8">
          <div className="partners-container overflow-hidden">
            <div className="partners-scroll flex">
              {partners.map((partner) => (
                <div 
                  key={partner.id} 
                  className="partner-item flex-shrink-0 flex flex-col items-center justify-center px-8"
                >
                  <div className="w-48 h-36 bg-white p-4 rounded-lg flex items-center justify-center mb-4 transform transition-transform hover:scale-105">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <h3 className="text-white text-lg font-bold text-center mt-2">{partner.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
