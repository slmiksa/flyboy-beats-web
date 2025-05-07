
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Star } from 'lucide-react';

// Distinguished partners - these will be shown in the top banner
const distinguishedPartners = [
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

const DistinguishedPartnersBanner = () => {
  return (
    <div className="bg-flyboy-purple py-5 border-t-2 border-b-2 border-flyboy-gold relative overflow-hidden">
      {/* Gold stars background effect */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        {Array(15).fill(0).map((_, i) => (
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
            <Star size={24} className="text-flyboy-gold" />
          </div>
        ))}
      </div>

      <div className="container">
        <div className="flex flex-col items-center mb-4">
          <div className="flex items-center mb-1">
            <Star className="h-5 w-5 text-flyboy-gold mr-1" fill="#d4af37" />
            <Star className="h-6 w-6 text-flyboy-gold mr-1" fill="#d4af37" />
            <Star className="h-7 w-7 text-flyboy-gold" fill="#d4af37" />
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-flyboy-gold text-center relative mb-2">
            شركاء النجاح المتميزيين
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-40 h-0.5 bg-flyboy-gold"></div>
          </h2>
          
          <div className="flex items-center mt-1">
            <Star className="h-7 w-7 text-flyboy-gold mr-1" fill="#d4af37" />
            <Star className="h-6 w-6 text-flyboy-gold mr-1" fill="#d4af37" />
            <Star className="h-5 w-5 text-flyboy-gold" fill="#d4af37" />
          </div>

          <Badge variant="secondary" className="mt-2 bg-flyboy-gold text-flyboy-purple px-3 py-1">الشركاء المميزون</Badge>
        </div>
        
        <div className="mt-6 overflow-hidden">
          <div className="flex justify-center space-x-10 space-x-reverse">
            {distinguishedPartners.map((partner) => (
              <div 
                key={partner.id} 
                className="flex-shrink-0 group"
              >
                <div className="bg-white p-3 rounded-lg flex items-center justify-center transform transition-transform group-hover:scale-105 border-2 border-flyboy-gold shadow-lg shadow-flyboy-gold/20">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-14 md:h-16 object-contain"
                  />
                </div>
                <div className="relative">
                  <h3 className="text-white text-sm font-medium text-center mt-2">{partner.name}</h3>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex">
                    <Star className="h-3 w-3 text-flyboy-gold" fill="#d4af37" />
                    <Star className="h-3 w-3 text-flyboy-gold" fill="#d4af37" />
                    <Star className="h-3 w-3 text-flyboy-gold" fill="#d4af37" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistinguishedPartnersBanner;
